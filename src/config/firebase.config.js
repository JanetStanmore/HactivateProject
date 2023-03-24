import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB8T-_krtW7DiKt0be7fVbJo151hYN-OFE",
  authDomain: "minutemen-5ca22.firebaseapp.com",
  projectId: "minutemen-5ca22",
  storageBucket: "minutemen-5ca22.appspot.com",
  messagingSenderId: "58415147398",
  appId: "1:58415147398:web:e2d7ec552c4b209d1ce407",
  measurementId: "G-6DZC3NGSV8",
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

export { auth, db };
