import { useRef } from "react";
import { db } from "../database";
import { doc, updateDoc } from "firebase/firestore";
import { DeleteUser } from "./DeleteUser";
import { CreateUser } from "./CreateUser";

export async function UpdateUser(id, data) {
    try {
        if (id === data.email) {
            const userRef = doc(db, "users", id);
            await updateDoc(userRef, {
                name: data.name,
                isAdmin: data.isAdmin,
            });
            console.log("User Updated");
        } else {
            await CreateUser(data);
            await DeleteUser(id);
            console.log("Registro creado y eliminado");
        }
    } catch (error) {
        console.error(error);
    }
}
