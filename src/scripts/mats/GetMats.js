import { db } from "../database";
import { getDoc, doc, query, collection, getDocs } from "firebase/firestore";
export async function GetMats() {
    const res = await getDocs(query(collection(db, "mats")));
    const mats = res.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));
    return mats;
}
export async function GetMatById(matId) {
    try {
        const docRef = doc(db, "mats", matId);
        const document = await getDoc(docRef);
        return document.data();
    } catch (error) {
        console.error("Error finding mat by ID: ", error);
        throw error;
    }
}
export async function GetLastMat(){
    const rest = await getDocs(query(collection(db, "mats")));
    const lastMat = rest.docs[rest.docs.length - 1];
    return {
        id: lastMat.id,
        ...lastMat.data(),
    };
}