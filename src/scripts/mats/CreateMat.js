import { doc, setDoc } from "firebase/firestore";
import { db } from "../database";
import {GetLastMat} from "./GetMats";

export const CreateMat = async ( data) => {
    try {
        // Intentar obtener el último material
        const lastMat = await GetLastMat();

        // Si no hay materiales aún, el id será 1
        const newId = lastMat ? lastMat.id + 1 : 1;

        // Crear el objeto del nuevo material
        const mat = {
            id: newId,
            name: data.name,
            reciclable: data.reciclable,
        };

        // Guardar en la colección "mats" (no "materials", para mantener coherencia)
        await setDoc(doc(db, "mats", String(newId)), mat);

        return {
            success: true,
            message: "Material created successfully",
            mat,
        };
    } catch (error) {
        console.error("Error creating material:", error);
        throw error;
    }
};