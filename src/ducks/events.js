import firebase from 'firebase';
import { Record, OrderedMap, OrderedSet } from 'immutable';
import { appName } from '../config';
import { put, all, take, call } from 'redux-saga/effects';
import { createSelector } from 'reselect';
import { fbDataToEntities } from './utils';

export const moduleName = 'events';
const prefix = `${appName}/${moduleName}`;

export const FETCH_ALL_REQUEST = `${prefix}/FETCH_ALL_REQUEST`;
export const FETCH_ALL_SUCCESS = `${prefix}/FETCH_ALL_SUCCESS`;
export const SELECT_EVENT = `${prefix}/SELECT_EVENT`;


const ReducerState = Record({
    entities: new OrderedMap({}),
    selected: new OrderedSet([]),
	loading: false,
	loaded: false,
});

export const EventRecord = Record({
    uid: null,
    title: null,
    url: null,
    where: null,
    when: null,
    month: null,
    submissionDeadline: null
});

export default function reducer (state = new ReducerState(), action) {
    const { type, payload } = action;

    switch (type) {
		case FETCH_ALL_REQUEST:
			return state
			    .set('loading', true);
		case FETCH_ALL_SUCCESS:
			return state
			    .set('loading', false)
				.set('loaded', false)
				.set('entities', fbDataToEntities(payload, EventRecord));
        case SELECT_EVENT:
            return state.selected.contains(payload)
                ? state.update('selected', selected => selected.remove(payload))
                : state.update('selected', selected => selected.add(payload));
        default:
            return state;
    }
}

export const stateSelector = state => state[moduleName];
export const entitiesSelector = createSelector(stateSelector, state => state.entities);
export const eventListSelector = createSelector(entitiesSelector, entities => (
    entities.valueSeq().toArray()
));

export const fetchAll = () => ({
	type: FETCH_ALL_REQUEST,
});

export const selectEvent = (uid) => ({
    type: SELECT_EVENT,
    payload: uid,
});

export const fetchAllSaga = function * () {
    while (true) {
        yield take(FETCH_ALL_REQUEST);

        const ref = firebase.database().ref('events');

        const data = yield call([ref, ref.once], 'value');

        yield put({
            type: FETCH_ALL_SUCCESS,
            payload: data.val(),
        });
    }
}

export const saga = function* () {
    yield all([
	    fetchAllSaga()
	]);
};
