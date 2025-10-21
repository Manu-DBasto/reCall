import react from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Home from "../screens/Home";
import UsersDashboard from "../screens/UsersDashboard";
import { useAuth } from "../auth/AuthProvider";
import {colors} from "../../assets/colors";
const drawer = createDrawerNavigator();

export default function AppNavigator() {
    const { user } = useAuth();
    return (
        <drawer.Navigator
            screenOptions={{
                headerStyle: { backgroundColor: colors.primary },   // color del header
                headerTintColor: "#fff",                       // color del texto del header
                drawerStyle: { backgroundColor: "#222" },       // color de fondo del drawer
                drawerActiveTintColor: colors.formInput,               // color del texto/icono activo
                drawerInactiveTintColor: "#ccc",                // color del texto/icono inactivo
                drawerLabelStyle: { fontSize: 16 },             // estilo del texto
            }}>
            <drawer.Screen name="Inicio" component={Home} />
            {user.isAdmin ? (
                <drawer.Screen name="Usuarios" component={UsersDashboard} />
            ) : null}
        </drawer.Navigator>
    );
}

