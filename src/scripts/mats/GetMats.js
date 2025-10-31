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
export async function GetLastMat(db) {
    const res = await getDocs(query(collection(db, "mats")));

    if (res.empty) return null; // Si no hay documentos, retornar null

    // Obtener el último material (por posición)
    const lastMatDoc = res.docs[res.docs.length - 1];
    return {
        id: Number(lastMatDoc.data().id),
        ...lastMatDoc.data(),
    };
}