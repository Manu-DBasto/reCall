import { NavigationContainer } from "@react-navigation/native";
import { NavigatorHandler } from "./auth/NavigatorHandler";
import { AuthProvider } from "./auth/AuthProvider";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function App() {
    return (
        <GestureHandlerRootView>
            <AuthProvider>
                <NavigationContainer>
                    <NavigatorHandler />
                </NavigationContainer>
            </AuthProvider>
        </GestureHandlerRootView>
    );
}
