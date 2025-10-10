import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../database";

export async function LoginUser(data) {
    try {
        const userCredentials = await signInWithEmailAndPassword(
            auth,
            data.email,
            data.password
        );
        const user = userCredentials.user;
        console.log("Authorized access: ", user);
        return user;
    } catch (error) {
        console.error("Error loging in user: ", error);
        throw error;
    }
}
