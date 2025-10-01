import react from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthNavigator from "./routes/AuthNavigator";
import AppNavigator from "./routes/AppNavigator";

const user = false;

export default function App() {
    return (
        <NavigationContainer>
            {user ? <AppNavigator /> : <AuthNavigator />}
        </NavigationContainer>
    );
}
