// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAqMzZVB8x6lH_t2skPpWLA9ZBB9jFvkos",
  authDomain: "help2fix.firebaseapp.com",
  projectId: "help2fix",
  storageBucket: "help2fix.appspot.com",
  messagingSenderId: "904936542587",
  appId: "1:904936542587:web:efd847e7daa4d298ddadde"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const authentication = getAuth(app);