import { db } from "../database";
import { doc, updateDoc } from "firebase/firestore";

export async function UpdateMat(id, data) {
    try {
        const matRef = doc(db, "mats", String(id)); 
        await updateDoc(matRef, {
            name: data.name,
            reciclable: data.reciclable,
        });
        console.log("✅ Material actualizado correctamente");
    } catch (error) {
        console.error("🔥 Error en UpdateMat:", error);
    }
}
