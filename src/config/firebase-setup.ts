import { initializeApp } from 'firebase/app';
import {getFirestore} from 'firebase/firestore'
export const firebaseConfig = {
  production: false,
    apiKey: "AIzaSyBbK1Us_lbJytCFTrLzFjy2CN1gYA3sla0",
    authDomain: "cancha-angular.firebaseapp.com",
    databaseURL: "https://cancha-angular-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "cancha-angular",
    storageBucket: "cancha-angular.appspot.com",
    messagingSenderId: "731488175013",
    appId: "1:731488175013:web:6c62e9f77407a855119e4c",
    measurementId: "G-2SC9QSB2WG"
  };
  export const firebaseApp = initializeApp(firebaseConfig);
  export const db = getFirestore(firebaseApp);