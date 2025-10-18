import { deleteDoc, doc } from "firebase/firestore";
import { deleteUser } from "firebase/auth";
import { db, auth } from "../database";

export async function DeleteUser(id = "") {
    try {
        await deleteDoc(doc(db, "users", id));
        console.log("User Deleted");
    } catch (error) {
        console.error(error);
    }
    /**
     * ==============Eliminar usuario de autenticathion====================
     * No tienen que hacerlo en sus flujos normales.
     */
}
