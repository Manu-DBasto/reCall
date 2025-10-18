import { db } from "../database";
import { getDoc, doc, query, collection, getDocs } from "firebase/firestore";

export async function GetUsers() {
    const res = await getDocs(query(collection(db, "users")));
    const users = res.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));
    return users;
}

/**
 * Aun estoy trabajando en esta funcion. Funciona pero tengo que proveer un ID y no estoy seguro aun mediante que dato basarlo para obtener un usuario especifico.
 */
export async function GetUserByEmail(email) {
    try {
        const docRef = doc(db, "users", email);
        const document = await getDoc(docRef);
        // console.log(document.data());
        return document.data();
    } catch (error) {
        console.error("Error finding user by email: ", error);
        throw error;
    }
}
