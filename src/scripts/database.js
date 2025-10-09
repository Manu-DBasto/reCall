//packages
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../../firebase-config";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
