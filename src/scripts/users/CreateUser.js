import { auth, db } from "../database";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { GetUserByEmail } from "./GetUsers";

export const CreateUser = async (data) => {
    try {
        /**
         * ==============Creacion de usuario en firestore==========
         */
        if (!(await GetUserByEmail(data.email))) {
            let user;
            if (data.isAdmin) {
                user = {
                    name: data.name,
                    email: data.email,
                    isAdmin: data.isAdmin,
                    password: data.password,
                    createdAt: new Date(),
                };
            } else {
                user = {
                    name: data.name,
                    email: data.email,
                    isAdmin: false,
                    password: data.password,
                    createdAt: new Date(),
                };
            }
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
