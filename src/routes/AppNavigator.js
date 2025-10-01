import react from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Dashboard from "../screens/Dashboard";

const drawer = createDrawerNavigator();

export default function AppNavigator() {
    return (
        <drawer.Navigator>
            <drawer.Screen name="dashboard" component={Dashboard} />
        </drawer.Navigator>
    );
}
