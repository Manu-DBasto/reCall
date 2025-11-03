import react from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Home from "../screens/Home";
import UsersDashboard from "../screens/UsersDashboard";
import Employee from "../screens/Employee";
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
            <drawer.Screen name="Empleados" component={Employee} />
        </drawer.Navigator>
    );
}
