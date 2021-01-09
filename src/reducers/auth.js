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
} from '../actions/actionTypes';
import { NotificationManager } from 'react-notifications';

const INIT_STATE = {
    loader: false,
    alertMessage: '',
    showMessage: false,
    initURL: '',
    authUser: localStorage.getItem('token'),
    user_details: {
        email: 'test@test.com',
        name: 'avanish',
        username: 'user',
        password: 'user',
        contact: '9955887755'
    },
    actions: [],
    mentorList: [],
    count: 0,
    page: 1

};

export default (state = INIT_STATE, action) => {
    switch (action.type) {

        case LOGIN:
            return {
                ...state
            }
        case LOGIN_SUCCESS:
            return {
                ...state,
                user_details: action.payload
            }
        case API_FAILED:
            NotificationManager.error(action.payload ? action.payload : 'Something went wrong!')
            return {
                ...state
            }

        case SIGNUP:
            return {
                ...state
            }
        case SIGNUP_SUCCESS:
            NotificationManager.success('Account created successfully')
            return {
                ...state,
                user_details: action.payload
            }
        case ADD_MENTOR:
            return {
                ...state,
                mentorList: []
            }
        case ADD_MENTOR_SUCCESS:
            NotificationManager.success(action.payload.title)
            return {
                ...state,
            }
        case GET_ACTIONS:
            return {
                ...state
            }
        case GET_ACTIONS_SUCCESS:
            return {
                ...state,
                actions: action.payload
            }
        case LIST_MENTOR:
            return {
                ...state,
            }
        case LIST_MENTOR_SUCCESS:
            console.log('action.payload', action.payload.data)
            if (!action.payload.page) {
                return {
                    ...state,
                    mentorList: action.payload.data,
                    count: action.payload.count,
                }
            }
            return {
                ...state,
                count: action.payload.count,
                mentorList: [...state.mentorList, ...action.payload.data]
            }
        default:
            return state;
    }
}