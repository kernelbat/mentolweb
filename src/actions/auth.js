import {
    LOGIN,
    LOGIN_SUCCESS,
    API_FAILED,
    SIGNUP,
    SIGNUP_SUCCESS,
    ADD_MENTOR,
    ADD_MENTOR_SUCCESS,
    GET_ACTIONS,
    GET_ACTIONS_SUCCESS,
    LIST_MENTOR,
    LIST_MENTOR_SUCCESS
} from './actionTypes'

export const login = (data, history) => ({
    type: LOGIN,
    payload: { data, history }
})

export const loginSuccess = (data) => ({
    type: LOGIN_SUCCESS,
    payload: data
})

export const apiFailed = (data) => ({
    type: API_FAILED,
    payload: data
})

export const signup = (data) => ({
    type: SIGNUP,
    payload: data
})

export const signupSuccess = (data) => ({
    type: SIGNUP_SUCCESS,
    payload: data
})

export const addMentor = (data, history) => ({
    type: ADD_MENTOR,
    payload: { data, history }
})

export const addMentorSuccess = (data) => ({
    type: ADD_MENTOR_SUCCESS,
    payload: data
})

export const getActions = (data) => ({
    type: GET_ACTIONS,
    payload: data
})
export const getActionSuccess = (data) => ({
    type: GET_ACTIONS_SUCCESS,
    payload: data
})
export const listMentor = (data, history) => ({
    type: LIST_MENTOR,
    payload: { data, history }
})
export const listMentorSuccess = (data) => ({
    type: LIST_MENTOR_SUCCESS,
    payload: data
})