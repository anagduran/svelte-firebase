import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyD8TIlrMODyepnT2riAcg2NRxyw8Ivbxo0",
    authDomain: "svelte-fire-92e0a.firebaseapp.com",
    databaseURL: "https://svelte-fire-92e0a.firebaseio.com",
    projectId: "svelte-fire-92e0a",
    storageBucket: "svelte-fire-92e0a.appspot.com",
    messagingSenderId: "904052875481",
    appId: "1:904052875481:web:fd41a80b479c698ed05ec8"
  };
// Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export const db = firebase.firestore()
  export const auth = firebase.auth()