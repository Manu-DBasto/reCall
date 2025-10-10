import { NavigationContainer } from "@react-navigation/native";
import { NavigatorHandler } from "./auth/NavigatorHandler";
import { AuthProvider } from "./auth/AuthProvider";

export default function App() {
    return (
        <AuthProvider>
            <NavigationContainer>
                <NavigatorHandler />
            </NavigationContainer>
        </AuthProvider>
    );
}
