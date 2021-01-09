import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import {
    LOGIN,
    SIGNUP,
    ADD_MENTOR,
    GET_ACTIONS,
    LIST_MENTOR
} from '../actions/actionTypes'
import {
    loginSuccess,
    apiFailed,
    signupSuccess,
    addMentorSuccess,
    getActionSuccess,
    listMentorSuccess
} from '../actions'
import Axios from 'util/axiosRequest'

const User = {
    email: 'test@test.com',
    name: 'avanish',
    username: 'user',
    password: 'user',
    contact: '9955887755'
}



function* signInUserFunction({ payload }) {
    const { history, data } = payload
    try {
        const signInResponse = yield call(Axios.axiosHelperFunc, 'post', 'user/signin', data)
        if (signInResponse.data.error === true) {
            yield put(apiFailed(signInResponse.data.title))
        } else {

            localStorage.setItem('token', signInResponse.data.token)
            yield put(loginSuccess(signInResponse.data))
            history.push('/user/home')


        }

    } catch (error) {
        console.log('catch', error)
    }


}

export function* signInUser() {
    yield takeEvery(LOGIN, signInUserFunction);
}

function* signupFunction({ payload }) {
    const { email, name, username, contact, password, history } = payload
    try {
        localStorage.setItem('email', email)
        yield put(signupSuccess({ email, name, username, contact, password }))
        history.push('/user/home')
    } catch (error) {

    }


}

export function* signUpUser() {
    yield takeEvery(SIGNUP, signupFunction);
}


function* addMentorFunction({ payload }) {
    const { data, history } = payload
    try {
        const getAddMentorResponse = yield call(Axios.axiosHelperFunc, 'post', 'user/addMentor', data)
        if (getAddMentorResponse.data.error === true) {
            yield put(apiFailed(getAddMentorResponse.data.title))
        } else {
            yield put(addMentorSuccess(getAddMentorResponse.data))
        }
        history.push('/user/home')
    } catch (error) {

    }


}

export function* addMentorDispatcher() {
    yield takeEvery(ADD_MENTOR, addMentorFunction);
}

function* getActionsFunction() {
    try {
        const getActionsReposnse = yield call(Axios.axiosHelperFunc, 'get', 'action/get')
        if (getActionsReposnse.data.error === true) {
            yield put(apiFailed(getActionsReposnse.data.title))
        } else {
            yield put(getActionSuccess(getActionsReposnse.data.data))
        }
    } catch (error) {

    }


}

export function* getActionsDispatcher() {
    yield takeEvery(GET_ACTIONS, getActionsFunction);
}

function* listMentorsFunction({ payload }) {
    const { data, history } = payload
    try {
        const listMentorsReposnse = yield call(Axios.axiosHelperFunc, 'get', `user/getMentors?${data.url}`)
        console.log('listMentorsReposnse', listMentorsReposnse.data)
        if (listMentorsReposnse.data.error === true) {
            yield put(apiFailed(listMentorsReposnse.data.title))
        } else {
            yield put(listMentorSuccess({ ...listMentorsReposnse.data, page: data.page }))
        }
    } catch (error) {

    }


}

export function* listMentorsDispatcher() {
    yield takeEvery(LIST_MENTOR, listMentorsFunction);
}
export default function* rootSaga() {
    yield all([fork(signInUser),
    fork(signUpUser),
    fork(addMentorDispatcher),
    fork(getActionsDispatcher),
    fork(listMentorsDispatcher)
    ]);
}