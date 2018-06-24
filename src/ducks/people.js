import { reset } from 'redux-form';
import { createSelector } from 'reselect';
import { Record, List } from 'immutable';
import { delay, eventChannel } from 'redux-saga';
import { all, put, call, take, takeEvery, select, fork, spawn, cancel, cancelled, race } from 'redux-saga/effects';
import firebase from 'firebase';

import { appName } from '../config';
import { fbDataToEntities } from './utils';

export const moduleName = 'people';
const prefix = `${appName}/${moduleName}`;

export const FETCH_ALL_PERSON_REQUEST = `${prefix}/FETCH_ALL_PERSON_REQUEST`;
export const FETCH_ALL_PERSON_SUCCESS = `${prefix}/FETCH_ALL_PERSON_SUCCESS`;
export const ADD_PERSON_REQUEST = `${prefix}/ADD_PERSON_REQUEST`;
export const ADD_PERSON_SUCCESS = `${prefix}/ADD_PERSON_SUCCESS`;
export const ADD_EVENT_REQUEST = `${prefix}/ADD_EVENT_REQUEST`;
export const ADD_EVENT_SUCCESS = `${prefix}/ADD_EVENT_SUCCESS`;

const ReducerState = Record({
    entities: new List([]),
    loading: null,
});

const PersonRecord = Record({
    uid: null,
    firstName: null,
    lastName: null,
    email: null,
    events: [],
});

export default function reducer (state = new ReducerState(), action) {
    const { type, payload } = action;

    switch (type) {
        case FETCH_ALL_PERSON_REQUEST:
        case ADD_EVENT_REQUEST:
            return state.set('loading', true);
        case FETCH_ALL_PERSON_SUCCESS:
            return state
                .set('loading', false)
                .set('entities', fbDataToEntities(payload, PersonRecord));
        case ADD_EVENT_SUCCESS:
            return state.setIn(['entities', payload.personUid, 'events'], payload.events);
        case ADD_PERSON_SUCCESS:
            return state
                .set('loading', false)
                .setIn(['entities', payload.uid], new PersonRecord(payload));
        default:
            return state;
    }
}

export const stateSelector = state => state[moduleName];
export const entitiesSelector = createSelector(stateSelector, state => state.entities);
export const peopleListSelector = createSelector(entitiesSelector, entities => (
    entities.valueSeq().toArray()
));
export const idSelector = (_, props) => props.uid;
export const personSelector = createSelector(entitiesSelector, idSelector, (entities, id) => entities.get(id));

export const fetchAll = () => ({
    type: FETCH_ALL_PERSON_REQUEST,
});

export const addEventToPerson = (eventUid, personUid) => ({
    type: ADD_EVENT_REQUEST,
    payload: { eventUid, personUid }
});

export const addEventSaga = function* (action) {
    const { eventUid, personUid } = action.payload;
    const eventsRef = firebase.database().ref(`/people/${personUid}/events`);

    const state = yield select(stateSelector);
    const events = state.getIn(['entities', personUid, 'events']).concat(eventUid);

    try {
        yield call([eventsRef, eventsRef.set], events);
        yield put({
            type: ADD_EVENT_SUCCESS,
            payload: {
                personUid,
                events
            }
        });
    } catch (_) {
    }
};

export function addPerson (person) {
    return {
        type: ADD_PERSON_REQUEST,
        payload: person,
    }
}

export const addPersonSaga = function* (action) {
    const peopleRef = firebase.database().ref('/people');

    try {
        const ref = yield call([peopleRef, peopleRef.push], action.payload);

        yield put({
            type: ADD_PERSON_SUCCESS,
            payload: {...action.payload, uid: ref.key}
        });

        yield put(reset('people'));

    } catch(error) {

    }
};

export const fetchAllPeopleSaga = function * () {
    const ref = firebase.database().ref('people');
    const data = yield call([ref, ref.once], 'value');

    yield put({
        type: FETCH_ALL_PERSON_SUCCESS,
        payload: data.val(),
    });
};

export const backendSyncSaga = function* () {
    try {
        while (true) {
            yield call(fetchAllPeopleSaga);
            yield delay(2000);
        }
    } finally {
        if ( yield cancelled() ) {
            console.log('cancelled saga');
        }
    }
};

export const cancelledSaga = function* () {
    yield race({
        sync: realtimeSync(),
        delay: delay(7000)
    });
    // const task = yield fork(backendSyncSaga);
    // yield delay(7000);
    // yield cancel(task);
};

const createPeopleSocket = () => eventChannel(emmit => {
    const ref = firebase.database().ref('people');
    const callback = data => emmit({data});
    ref.on('value', callback);

    return () => {
        console.log('---', 'unsubscribing');
        ref.off('value', callback)
    };
});

export const realtimeSync = function* () {
    const channel = yield call(createPeopleSocket);
    try {
        while (true) {
            const { data } = yield take(channel);
            console.log('-----', data.val());

            yield put({
                type: FETCH_ALL_PERSON_SUCCESS,
                payload: data.val()
            });
        }
    } finally {
        yield call([channel, channel.close]);
        console.log('-----', 'cancelled realtime sync');
    }
};

export const saga = function* () {
    yield spawn(cancelledSaga);
    yield all([
        takeEvery(ADD_PERSON_REQUEST, addPersonSaga),
        takeEvery(ADD_EVENT_REQUEST, addEventSaga),
        takeEvery(FETCH_ALL_PERSON_REQUEST, fetchAllPeopleSaga)
    ]);
};
