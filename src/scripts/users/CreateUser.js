import { auth, db } from "../database";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

export const CreateUser = async (data) => {
    try {
        /**
         * ==============Autenticacion===============
         * Esta parte del codigo solo es necesaria por que debo crear un usuario en la tabla de autenticacion y luego sus demas datos se guardan en firestore. Que es la base de datos que se estará utilizando, por lo tanto es la que usarán.
         */
        const userCredential = await createUserWithEmailAndPassword(
            auth,
            data.email,
            data.password
        );
        const user = userCredential.user;
        await updateProfile(user, { displayName: data.name });

        /**
         * ==============Creacion de usuario en firestore==========
         */
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
