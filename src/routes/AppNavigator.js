import React from "react";
import { StyleSheet } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Home from "../screens/Home";
import UsersDashboard from "../screens/UsersDashboard";
import MatDashboard from "../screens/MatDashboard";
import Employee from "../screens/Employee";
import { useAuth } from "../auth/AuthProvider";
import { colors } from "../../assets/colors";

const Drawer = createDrawerNavigator();

export default function AppNavigator() {
    const { user } = useAuth();

    return (
        <Drawer.Navigator
            screenOptions={{
                headerStyle: styles.header,
                headerTintColor: styles.headerTint.color,
                headerTitleStyle: styles.headerTitle,
                drawerStyle: styles.drawer,
                drawerLabelStyle: styles.drawerLabel,
                drawerActiveTintColor: styles.drawerActiveTint.color,
                drawerInactiveTintColor: styles.drawerInactiveTint.color,
                drawerActiveBackgroundColor:
                    styles.drawerActiveBackground.backgroundColor,
                drawerInactiveBackgroundColor:
                    styles.drawerInactiveBackground.backgroundColor,
            }}
        >
            <Drawer.Screen
                name="Inicio"
                component={Home}
                options={{ title: "Inicio" }}
            />
            {user.isAdmin && (
                <Drawer.Screen
                    name="Usuarios"
                    component={UsersDashboard}
                    options={{ title: "Usuarios" }}
                />
            )}
            {user.isAdmin && (
                <Drawer.Screen
                    name="Materiales"
                    component={MatDashboard}
                    options={{ title: "Materiales" }}
                />
            )}
            {user.isAdmin && (
                <Drawer.Screen
                    name="Empleados"
                    component={Employee}
                    options={{ title: "Empleados" }}
                />
            )}
        </Drawer.Navigator>
    );
}

const styles = StyleSheet.create({
    // 🎨 Header
    header: {
        backgroundColor: colors.primary,
    },
    headerTint: {
        color: colors.textLight,
    },
    headerTitle: {
        fontWeight: "bold",
        fontSize: 18,
    },

    // 🗂️ Drawer
    drawer: {
        backgroundColor: colors.background,
        width: 250,
    },
    drawerLabel: {
        fontSize: 16,
        marginLeft: -10,
    },
    drawerActiveTint: {
        color: colors.textLight,
    },
    drawerInactiveTint: {
        color: colors.textDark,
    },
    drawerActiveBackground: {
        backgroundColor: colors.primary,
    },
    drawerInactiveBackground: {
        backgroundColor: "transparent",
    },
});
