import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { collection, getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyB5PI2Cdq-WloYC70C8LyBosxA9AXkI8xU",
  authDomain: "gmeet-8d471.firebaseapp.com",
  projectId: "gmeet-8d471",
  storageBucket: "gmeet-8d471.appspot.com",
  messagingSenderId: "782479278172",
  appId: "1:782479278172:web:49196385cfffb340782699",
  measurementId: "G-ZZ56XVRCZS",
};

const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);
export const firebaseDB = getFirestore(app);

export const usersRef = collection(firebaseDB, "users");
export const meetingsRef = collection(firebaseDB, "meetings");
