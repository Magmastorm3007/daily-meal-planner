import { initializeApp } from "firebase/app";
import { GoogleAuthProvider,getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {

  apiKey: "AIzaSyDVp0XnX5GC36iEZq0nUpfvlFCx9zcuT2E",

  authDomain: "meal-planner-4642a.firebaseapp.com",

  projectId: "meal-planner-4642a",

  storageBucket: "meal-planner-4642a.firebasestorage.app",

  messagingSenderId: "875903423611",

  appId: "1:875903423611:web:d9c3585e30c152c0d63ede",

  measurementId: "G-Y1CH8KDGB0"

};


// Initialize Firebase

 const app = initializeApp(firebaseConfig);
 export const auth=getAuth(app)
 export const storage=getStorage(app)
 export const provider=new GoogleAuthProvider(app)
 export const db = getFirestore(app);

