import { useRef } from "react";
import { db } from "../database";
import { doc, updateDoc } from "firebase/firestore";
import { DeleteMat } from "./DeleteMat";
import { CreateMat } from "./CreateMat";

export async function UpdateMat(id, data) {
    try {
        if (id === data.id) {
            const matRef = doc(db, "mats", id);
            await updateDoc(matRef, {
                name: data.name,
                reciclable: data.reciclable,
            });
            console.log("Material Updated");
        } else {
            await CreateMat(data);
            await DeleteMat(id);
            console.log("Registro creado y eliminado");
        }
    } catch (error) {
        console.error(error);
    }
}
