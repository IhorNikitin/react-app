import firebase from 'firebase';
import { Record, OrderedMap } from 'immutable';
import { appName } from '../config';
import { put, all, take, call } from 'redux-saga/effects';


export const moduleName = 'events';
const prefix = `${appName}/${moduleName}`;

export const FETCH_ALL_REQUEST = `${prefix}/FETCH_ALL_REQUEST`;
export const FETCH_ALL_SUCCESS = `${prefix}/FETCH_ALL_SUCCESS`;


const ReducerState = Record({
    entities: new OrderedMap({}),
	loading: false,
	loaded: false,
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
				.set('entities', new OrderedMap(payload));
        default:
            return state;
    }
}

export const fetchAll = () => ({
	type: FETCH_ALL_REQUEST,
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
