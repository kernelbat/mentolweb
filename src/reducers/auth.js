import{
    LOGIN,
    LOGIN_SUCCESS,
    API_FAILED,
    SIGNUP,
    SIGNUP_SUCCESS,
    EDIT_PROFILE,
    EDIT_PROFILE_SUCCESS
} from '../actions/actionTypes';
import {NotificationManager} from 'react-notifications';

const INIT_STATE = {
    loader: false,
    alertMessage: '',
    showMessage: false,
    initURL: '',
    authUser: localStorage.getItem('token'),
    user_details:{
        email:'test@test.com',
        name:'avanish',
        username:'user',
        password:'user',
        contact:'9955887755'
    }
  
};

export default(state = INIT_STATE,action)=>{
    switch(action.type){

        case LOGIN:
            return{
                ...state
            }
        case LOGIN_SUCCESS:
            return{
                ...state,
                user_details:action.payload
            }
        case API_FAILED:
            NotificationManager.error(action.payload)
            return{
                ...state
            }
        
            case SIGNUP:
                return{
                    ...state
                }
            case SIGNUP_SUCCESS:
                NotificationManager.success('Account created successfully')
                return{
                    ...state,
                    user_details:action.payload
                }
                case EDIT_PROFILE:
                    return{
                        ...state
                    }
                case EDIT_PROFILE_SUCCESS:
                    NotificationManager.success('Profile updated successfully')
                    return{
                        ...state,
                        user_details:action.payload
                    }
        default:
        return state;
    }
}