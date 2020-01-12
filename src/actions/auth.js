import {
    LOGIN,
    LOGIN_SUCCESS,
    API_FAILED,
    SIGNUP,
    SIGNUP_SUCCESS,
    EDIT_PROFILE,
    EDIT_PROFILE_SUCCESS
} from './actionTypes'

export const login = (data)=>({
    type:LOGIN,
    payload:data
})

export const loginSuccess = (data)=>({
    type:LOGIN_SUCCESS,
    payload:data
})

export const apiFailed = (data)=>({
    type:API_FAILED,
    payload:data
})

export const signup = (data)=>({
    type:SIGNUP,
    payload:data
})

export const signupSuccess = (data)=>({
    type:SIGNUP_SUCCESS,
    payload:data
})

export const editProfile = (data)=>({
    type:EDIT_PROFILE,
    payload:data
})

export const editProfileSuccess = (data)=>({
    type:EDIT_PROFILE_SUCCESS,
    payload:data
})