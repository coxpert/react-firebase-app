
  /**
 * Firebase Login
 * Reactify comes with built in firebase login feature
 * You Need To Add Your Firsebase App Account Details Here
 */
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';
import "firebase/storage";


// Initialize Firebase 

const firebaseConfig = {
    apiKey: "AIzaSyDWvPbcEEyuvmGrT6S2_iezkUh-ATb52ms",
    authDomain: "myapp-c0f33.firebaseapp.com",
    databaseURL: "https://myapp-c0f33.firebaseio.com",
    projectId: "myapp-c0f33",
    storageBucket: "myapp-c0f33.appspot.com",
    messagingSenderId: "654646746381",
    appId: "1:654646746381:web:cb83cac453248118e76444",
    measurementId: "G-H9966JPHLX"
  };



firebase.initializeApp(firebaseConfig);
firebase.firestore();

export default firebase;
