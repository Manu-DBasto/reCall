import react from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Home from "../screens/Home";
import UsersDashboard from "../screens/UsersDashboard";

const drawer = createDrawerNavigator();

export default function AppNavigator() {
    return (
        <drawer.Navigator>
            <drawer.Screen name="Inicio" component={Home} />
            <drawer.Screen name="Usuarios" component={UsersDashboard} />
        </drawer.Navigator>
    );
}
