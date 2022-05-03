import { initializeApp } from "firebase/app";
import {getFirestore} from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAqCuqtGMxRqmXwCqje1ObWVyXPhdAkJJo",
  authDomain: "horse-race-betting-f2aed.firebaseapp.com",
  projectId: "horse-race-betting-f2aed",
  storageBucket: "horse-race-betting-f2aed.appspot.com",
  messagingSenderId: "404744991143",
  appId: "1:404744991143:web:f1c886fbe5e1d2c2b14682",
  measurementId: "G-B84WE4B6ZR",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
