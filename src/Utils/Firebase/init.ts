// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

import { getAuth } from "firebase/auth";
import { initializeFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyAjljL1SE8qU2IJwhx1qcJ6RFL0UlA2Km8",
  authDomain: "intresting-2cfb2.firebaseapp.com",
  projectId: "intresting-2cfb2",
  storageBucket: "intresting-2cfb2.appspot.com",
  messagingSenderId: "23725437785",
  appId: "1:23725437785:web:d6a185f65db213ccd19248",
  measurementId: "G-G7L5C254VX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app


export const auth = getAuth(app)
export const firestore = initializeFirestore(app, { ignoreUndefinedProperties: true })


