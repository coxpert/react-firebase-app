/**
 * App Reducers
 */

import { combineReducers } from 'redux';

import authUserReducer from './AuthUserReducer';
import { firestoreReducer } from 'redux-firestore'
import { firebaseReducer } from 'react-redux-firebase';

const reducers = combineReducers({  
    authUser: authUserReducer, 
    firestore: firestoreReducer,
    firebase: firebaseReducer,
 });
 
 export default reducers;