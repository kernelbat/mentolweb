import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import{
    LOGIN,
    SIGNUP,
    EDIT_PROFILE
}from '../actions/actionTypes'
import {
    loginSuccess,
    apiFailed,
    signupSuccess,
    editProfileSuccess
} from '../actions'


const User = {
    email:'test@test.com',
    name:'avanish',
    username:'user',
    password:'user',
    contact:'9955887755'
}



function* signInUserFunction({payload}){
    const{email,password,history} = payload
    try {
        if(email==User.email&&password==User.password){
            localStorage.setItem('email',email)
            yield put(loginSuccess(User))
            history.push('/user/home')
        }else{
            yield put(apiFailed('Invalid credentials'))
        }
    } catch (error) {
        
    }
    

}

export function* signInUser() {
    yield takeEvery(LOGIN, signInUserFunction);
  }

  function* signupFunction({payload}){
    const{email,name,username,contact,password,history} = payload
    try {
        localStorage.setItem('email',email)
            yield put(signupSuccess({email,name,username,contact,password}))
            history.push('/user/home')
    } catch (error) {
        
    }
    

}

export function* signUpUser() {
    yield takeEvery(SIGNUP, signupFunction);
  }
  function* editProfileFunction({payload}){
    const{email,name,username,contact,password,history} = payload
    try {
        localStorage.setItem('email',email)
        yield put(editProfileSuccess({email,name,username,contact,password}))
        history.push('/user/home')
    } catch (error) {
        
    }
    

}

export function* editProfileDispatcher() {
    yield takeEvery(EDIT_PROFILE, editProfileFunction);
  }
export default function* rootSaga() {
    yield all([fork(signInUser),
        fork(signUpUser),
        fork(editProfileDispatcher)
    ]);
  }