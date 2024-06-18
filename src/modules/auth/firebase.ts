// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyBhUnMS8NaNNBbSS0eJcLqi4SpB4wf_oSE",
  authDomain: "nex-gpt.firebaseapp.com",
  projectId: "nex-gpt",
  storageBucket: "nex-gpt.appspot.com",
  messagingSenderId: "560247412553",
  appId: "1:560247412553:web:328eeb80e2cb81b3756c98",
  measurementId: "G-0D27MWDD15",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
getAnalytics(app);

export const auth = getAuth();
