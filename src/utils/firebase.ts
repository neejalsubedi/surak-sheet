// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth";
const firebaseConfig = {
    apiKey: "AIzaSyD5tjn9Wg-tgKCo9TeeAVoC1He8hetccFo",
    authDomain: "surakshit-app-f8241.firebaseapp.com",
    projectId: "surakshit-app-f8241",
    storageBucket: "surakshit-app-f8241.firebasestorage.app",
    messagingSenderId: "607296009851",
    appId: "1:607296009851:web:b869634869fa08fc47d4de",
    measurementId: "G-JX13FZFEMK"
};


const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth=getAuth(app)
export const db = getFirestore(app);