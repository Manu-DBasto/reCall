import { auth, db } from "../database";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { GetUserByEmail } from "./GetUsers";

export const CreateUser = async (data) => {
    try {
        /**
         * ==============Autenticacion===============
         * Esta parte del codigo solo es necesaria por que debo crear un usuario en la tabla de autenticacion y luego sus demas datos se guardan en firestore. Que es la base de datos que se estará utilizando, por lo tanto es la que usarán.
         */
        // const userCredential = await createUserWithEmailAndPassword(
        //     auth,
        //     data.email,
        //     data.password
        // );
        // const user = userCredential.user;
        // await updateProfile(user, { displayName: data.name });

        /**
         * ==============Creacion de usuario en firestore==========
         */
        if (!(await GetUserByEmail(data.email))) {
            if (data.isAdmin) {
                const user = {
                    name: data.name,
                    email: data.email,
                    isAdmin: data.isAdmin,
                    password: data.password,
                    createdAt: new Date(),
                };
            } else {
                const user = {
                    name: data.name,
                    email: data.email,
                    isAdmin: false,
                    password: data.password,
                    createdAt: new Date(),
                };
            }
            const user = {
                name: data.name,
                email: data.email,
                isAdmin: data.isAdmin,
                password: data.password,
                createdAt: new Date(),
            };
            await setDoc(doc(db, "users", user.email), user);
            return {
                success: true,
                user: user,
                message: "User created succesfully",
            };
        } else {
            console.error("Error creating user: User already exists");
            return;
        }
    } catch (error) {
        console.error("Error creating user:", error);
        throw error;
    }
};
