import { doc, setDoc } from "firebase/firestore";

export const CreateMat = async (db, data) => {

    try {
        let mat;
        mat={
            id: data.id,
            name: data.name,
            reciclable: data.reciclable
        }
        await setDoc(doc(db, "materials", data.code), data);
        return {
            success: true,
            message: "Material created successfully",
        };
    } catch {
        console.error("Error creating user:", error);
        throw error;
    }
}