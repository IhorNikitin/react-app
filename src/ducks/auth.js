import firebase from 'firebase';
import { Record } from 'immutable';
import { appName } from '../config';
import { all, take, takeEvery, call, put, cps } from 'redux-saga/effects';
import { push } from 'react-router-redux';

export const moduleName = 'auth';
export const SIGN_UP_REQUEST = `${appName}/${moduleName}/SIGN_UP_REQUEST`;
export const SIGN_UP_SUCCESS = `${appName}/${moduleName}/SIGN_UP_SUCCESS`;
export const SIGN_UP_ERROR = `${appName}/${moduleName}/SIGN_UP_ERROR`;
export const SIGN_IN_REQUEST = `${appName}/${moduleName}/SIGN_IN_REQUEST`;
export const SIGN_IN_SUCCESS = `${appName}/${moduleName}/SIGN_IN_SUCCESS`;
export const SIGN_IN_ERROR = `${appName}/${moduleName}/SIGN_IN_ERROR`;
export const SIGN_OUT_REQUEST = `${appName}/${moduleName}/SIGN_OUT_REQUEST`;
export const SIGN_OUT_SUCCESS = `${appName}/${moduleName}/SIGN_OUT_SUCCESS`;
export const SIGN_OUT_ERROR = `${appName}/${moduleName}/SIGN_OUT_ERROR`;

const RecordReducer = Record({
    user: null,
    error: null,
    loading: false,
});

export default function reducer (state = new RecordReducer(), action) {
    const { type, payload, error } = action;

    switch (type) {
        case SIGN_UP_REQUEST:
            return state.set('loading', true);
		case SIGN_IN_REQUEST:
            return state.set('loading', true);
		case SIGN_OUT_REQUEST:
            return state.set('loading', true);
        case SIGN_UP_SUCCESS:
            return state
                .set('loading', false)
                .set('user', payload.user)
                .set('error', null);
		case SIGN_UP_ERROR:
            return state
                .set('loading', false)
                .set('error', error);
        case SIGN_IN_SUCCESS:
            return state
                .set('loading', false)
                .set('user', payload.user)
                .set('error', null);
		case SIGN_IN_ERROR:
            return state
                .set('loading', false)
                .set('error', error);
		case SIGN_OUT_SUCCESS:
            return state
                .set('loading', false)
                .set('user', null)
                .set('error', null);
		case SIGN_OUT_ERROR:
            return state
                .set('loading', false)
                .set('error', error);
        default:
            return state;
    }
}

export function signUp(email, pass) {
    return ({
		type: SIGN_UP_REQUEST,
		payload: { email, pass },
	});
}

export function signIn(email, pass) {console.log(email, pass);
    return ({
		type: SIGN_IN_REQUEST,
		payload: { email, pass },
	});
}

export function signOut() {
    return ({
		type: SIGN_OUT_REQUEST,
	});
}

export const signUpSaga = function* () {
	const auth = firebase.auth();
	
	while(true) {
		const action = yield take(SIGN_UP_REQUEST);
		
		try {
			const user = yield call(
				[auth, auth.createUserWithEmailAndPassword],
				action.payload.email,
				action.payload.pass
			);
		
			yield put({
				type: SIGN_UP_SUCCESS,
				payload: user
			});
			
			yield put(push('/admin'));
		} catch (error) {
			yield put({
				type: SIGN_UP_ERROR,
				error
			});
		}
	}
};

export const signInSaga = function* () {
	const auth = firebase.auth();
	
	const action = yield take(SIGN_IN_REQUEST);
	
	try {
		const user = yield call(
			[auth, auth.signInWithEmailAndPassword],
			action.payload.email,
			action.payload.pass
		);

		yield put({
			type: SIGN_IN_SUCCESS,
			payload: user
		});
		
		yield put(push('/admin'));
	} catch (error) {
		yield put({
			type: SIGN_IN_ERROR,
			error
		});
	}
};

export const signOutSaga = function* (action) {
	const auth = firebase.auth();
	
	try {
		yield call([auth, auth.signOut]);
	
		yield put({
			type: SIGN_OUT_SUCCESS,
		});
		
		yield put(push('/auth/signin'));
		
	} catch (error) {
		yield put({
			type: SIGN_OUT_ERROR,
			error
		});
	}
};

export const watchChangeStatusSaga = function* () {
	const auth = firebase.auth();
	
	try {
	    yield cps([auth, auth.onAuthStateChanged]);	
	} catch(user) {
		yield put({
			type: SIGN_IN_SUCCESS,
			payload: {user},
        });
		yield put(push('/admin'));
	}
	
}; 

export const saga = function* () {
    yield all([
	    signUpSaga(),
		signInSaga(),
		yield takeEvery(SIGN_OUT_REQUEST, signOutSaga),
		watchChangeStatusSaga()
	]);
};