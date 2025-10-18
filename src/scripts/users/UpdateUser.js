import { useRef } from "react";
import { db } from "../database";
import { doc, updateDoc } from "firebase/firestore";

export async function UpdateUser(id, data) {
    /**Aun no lo he probado, quiza cambie en el futuro. Pero en mi teoria, en la interfaz se mostrará un formulario con los datos del usuario ya cargado y el formulario en total se enviará. De forma que los datos que se mantengan igual se mantendran y los cambiados se verán reflejados. Puede que este enfoque no funcione para todo. */
    /**
     * ==============Actualizar datos de firestore=========================
     */
    try {
        const userRef = doc(db, "users", id);
        await updateDoc(userRef, {
            name: data.name,
            email: data.email,
        });
        console.log("User Updated");
    } catch (error) {
        console.error(error);
    }
}
