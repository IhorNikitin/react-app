import { Record, List } from 'immutable';
import { appName } from '../config';
import { put, call, takeEvery } from 'redux-saga/effects';
import { reset } from 'redux-form';
import { generateId } from './utils';

export const moduleName = 'people';
const prefix = `${appName}/${moduleName}`;
export const ADD_PERSON_REQUEST = `${prefix}/ADD_PERSON_REQUEST`;
export const ADD_PERSON = `${prefix}/ADD_PERSON`;

const ReducerState = Record({
    entities: new List([]),
});

const PersonRecord = Record({
    id: null,
    firstName: null,
    lastName: null,
    email: null
});

export default function reducer (state = new ReducerState(), action) {
    const { type, payload } = action;

    switch (type) {
        case ADD_PERSON:
            return state.update('entities', entities => entities.push(new PersonRecord(payload)));
        default:
            return state;
    }
}

export function addPerson (person) {
    return {
        type: ADD_PERSON_REQUEST,
        payload: person,
    }
}

export const addPersonSaga = function* (action) {
    const id = yield call(generateId);
    yield put({
        type: ADD_PERSON,
        payload: {...action.payload, id}
    });
	yield put(reset('people'));
};

export const saga = function* () {
    yield takeEvery(ADD_PERSON_REQUEST, addPersonSaga);
};
