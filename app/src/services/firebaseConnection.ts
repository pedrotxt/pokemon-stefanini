import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCKeixrJlNbolro5rorkM7-s92cJyt2_78",
  authDomain: "pokemon-stefanini.firebaseapp.com",
  projectId: "pokemon-stefanini",
  storageBucket: "pokemon-stefanini.appspot.com",
  messagingSenderId: "654028157659",
  appId: "1:654028157659:web:c8c4aebcdf52dd882612fe",
  measurementId: "G-J1P74G3JKG"
};

  firebase.initializeApp(firebaseConfig);

export default firebase;