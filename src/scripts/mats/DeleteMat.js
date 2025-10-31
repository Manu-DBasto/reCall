import { deleteDoc, doc } from "firebase/firestore";
import { deleteUser } from "firebase/auth";
import { db, auth } from "../database";

export async function DeleteMat(id = "") {
    try {
        await deleteDoc(doc(db, "mats", id));
        console.log("Material Deleted");
    } catch (error) {
        console.error(error);
    }   
}