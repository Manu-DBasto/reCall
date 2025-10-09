import { auth, db } from "../database";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

export const CreateUser = async (data) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(
            auth,
            data.email,
            data.password
        );

        const user = userCredential.user;

        // Actualizar el perfil de Firebase Auth
        await updateProfile(user, { displayName: data.name });

        // Guardar los datos en Firestore
        await setDoc(doc(db, "users", user.uid), {
            name: data.name,
            email: data.email,
            createdAt: new Date(),
        });

        console.log("User created succesfully");
        return user;
    } catch (error) {
        console.error("Error creating user:", error);
        throw error;
    }
};
