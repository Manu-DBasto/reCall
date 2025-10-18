import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../database";
import { GetUserByEmail } from "./GetUsers";

export async function LoginUser(data) {
    try {
        // const userCredentials = await signInWithEmailAndPassword(
        //     auth,
        //     data.email,
        //     data.password
        // );
        // const user = userCredentials.user;
        // console.log("Authorized access: ", user);
        // return user;
        const account = await GetUserByEmail(data.email);
        if (!account) {
            console.error("Error loging user: Incorrect password or email");
            return;
        }
        if (account.password == data.password) {
            return {
                user: account,
                success: true,
                message: "User authorized",
            };
        } else {
            console.error("Error loging user: Incorrect password or email");
            return;
        }
    } catch (error) {
        console.error("Error loging in user: ", error);
        throw error;
    }
}
