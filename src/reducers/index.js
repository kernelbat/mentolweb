import {combineReducers} from 'redux'
import{connectRouter} from 'connected-react-router';
import Auth from './auth';
import{reducer as reduxFormReducer} from 'redux-form';

export default (history)=>combineReducers({
    router:connectRouter(history),
    form:reduxFormReducer,
    auth:Auth
})