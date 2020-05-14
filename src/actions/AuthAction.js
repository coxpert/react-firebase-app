import { NotificationManager } from 'react-notifications';
import firebase from '../firebase';

import {
   //log in
   LOGIN_USER_START,
   LOGIN_USER_SUCCESS,
   LOGIN_USER_FAILURE,
   //logout
   LOGOUT_USER,
   //sign in
   SIGNUP_USER_START,
   SIGNUP_USER_SUCCESS,
   SIGNUP_USER_FAILURE,
   //send email verification
   SEND_RESETPASSWORD_EMAIL_START,
   SEND_RESETPASSWORD_EMAIL_SUCCESS,
   SEND_RESETPASSWORD_EMAIL_FAILURE,

} from 'Actions/types';


export const signInWithFirebase = (user, history) => async(dispatch, getState, {getFirestore}) =>{

   dispatch({ type: LOGIN_USER_START });

   await firebase.auth().signInWithEmailAndPassword(user.email, user.password)
      .then((success) => {
         
         const firestore = getFirestore();
         firestore.collection('users').doc(success.user.uid).get().then(user=>{
            NotificationManager.success('Logged In successfully.');
            dispatch({ type: LOGIN_USER_SUCCESS, payload: user.data()});
            localStorage.setItem('myapp_user', JSON.stringify(user.data()))
            history.push('/')
         })
      })
      .catch((error) => {
         console.log(error)
         NotificationManager.error(error.message);
         dispatch({ type: LOGIN_USER_FAILURE });
      });
}

export const signUpWithFirebase = (user, history) => async(dispatch, getState, {getFirestore}) => {

   dispatch({ type: SIGNUP_USER_START });
   await firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
      .then((success) => {
         const firestore = getFirestore();
         const userData = {
            id: success.user.uid,
            ...user,
            created_at: firestore.FieldValue.serverTimestamp(),
            updated_at: firestore.FieldValue.serverTimestamp(),
         }
         firestore.collection('users').doc(`${success.user.uid}`).set(userData).then(()=>{
            NotificationManager.success('Account Created Successfully!');
            localStorage.setItem('myapp_user', JSON.stringify(userData))
            dispatch({ type: SIGNUP_USER_SUCCESS, payload: userData });
            history.push('/')
         }).catch((error) => {
            console.log(error)
            NotificationManager.error(error.message);
            dispatch({ type: SIGNUP_USER_FAILURE });
         });
      })
      .catch((error) => {
         console.log(error)
         NotificationManager.error(error.message);
         dispatch({ type: SIGNUP_USER_FAILURE });
      });
}

export const signOutWithFirebase = ( history ) => (dispatch, getState, {getFirestore}) =>{
   firebase.auth().signOut()
   .then(() => {
      dispatch({ type:  LOGOUT_USER});
      localStorage.removeItem('myapp_user');
      NotificationManager.success('User Logout Successfully');
      history.push('/');
   })
   .catch((error) => {
      console.log(error)
      NotificationManager.error(error.message);
   })
}

/**
*Send Email for vrify Code and Password
*/

export const sendEmailforRecovery = (email, history)=>(dispatch)=>{

   dispatch({type: SEND_RESETPASSWORD_EMAIL_START})
   firebase.auth().sendPasswordResetEmail(email).then(function() {
      
      NotificationManager.success("Send Email Success. Please check your email");
      history.push('/sign-in');
      dispatch({type: SEND_RESETPASSWORD_EMAIL_SUCCESS})

    }).catch(function(error) {
         dispatch({type: SEND_RESETPASSWORD_EMAIL_FAILURE})
         NotificationManager.error(error.message);
    });
}

