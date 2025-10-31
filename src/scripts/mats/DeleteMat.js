import { deleteDoc, doc } from "firebase/firestore";
import { deleteUser } from "firebase/auth";
import { db, auth } from "../database";

export async function DeleteMat(id = "") {
    try {
        await deleteDoc(doc(db, "mats", String(id)));
        console.log("Material eliminado correctamente");
    } catch (error) {
        console.error("Error eliminando material:", error);
    }   
}