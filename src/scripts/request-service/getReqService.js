import { db } from "../database";
import {
    getDoc,
    doc,
    query,
    collection,
    getDocs,
    where,
} from "firebase/firestore";

export async function getReqService(user) {
    const res = await getDocs(
        query(collection(db, "serviceRequest"), where("user", "==", user))
    );
    const data = res.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));
    return data;
}
