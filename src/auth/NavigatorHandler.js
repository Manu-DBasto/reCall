import { useAuth } from "./AuthProvider";
import AppNavigator from "../routes/AppNavigator";
import AuthNavigator from "../routes/AuthNavigator";

export const NavigatorHandler = () => {
    const { isAuthenticated } = useAuth();
    return <> {isAuthenticated ? <AppNavigator /> : <AuthNavigator />} </>;
};
