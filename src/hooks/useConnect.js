import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { firebaseConfig } from "../../firebase-config";
export const useConnect = () => {
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    return {
        app,
        db,
    };
};
