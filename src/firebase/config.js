import app from 'firebase/app';
import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyAMZV6fZ68SGY2M7htK_NFQ_Ak16I0cPRE",
    authDomain: "proyecto2-19d7e.firebaseapp.com",
    projectId: "proyecto2-19d7e",
    storageBucket: "proyecto2-19d7e.appspot.com",
    messagingSenderId: "104189557205",
    appId: "1:104189557205:web:7b8a25143561f62d90255c"
  };

  app.initializeApp(firebaseConfig);

  export const auth = firebase.auth();
  export const storage = app.storage();
  export const db = app.firestore();