import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyD0VywyehzOIwSEbbRe97r5JKjTmeTxiUo",
  authDomain: "stefanini-pokemons.firebaseapp.com",
  projectId: "stefanini-pokemons",
  storageBucket: "stefanini-pokemons.appspot.com",
  messagingSenderId: "790451474538",
  appId: "1:790451474538:web:b9c5cab4d5ffa0fc54fa13",
  measurementId: "G-14RP37DYVM"
};

  firebase.initializeApp(firebaseConfig);

export default firebase;