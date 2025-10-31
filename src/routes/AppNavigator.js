import react from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Home from "../screens/Home";
import UsersDashboard from "../screens/UsersDashboard";
import MatDashboard from "../screens/MatDashboard";
import { useAuth } from "../auth/AuthProvider";
const drawer = createDrawerNavigator();

export default function AppNavigator() {
    const { user } = useAuth();
    return (
        <drawer.Navigator>
            <drawer.Screen name="Inicio" component={Home} />
            {user.isAdmin ? (
                <drawer.Screen name="Usuarios" component={UsersDashboard} />
            ) : null}

            {user.isAdmin ? (
                <drawer.Screen name="Materiales" component={MatDashboard} />
            ) : null}
        </drawer.Navigator>
    );
}
