import react from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../screens/Login";
import Signup from "../screens/Signup";

const stack = createStackNavigator();

export default function AuthNavigator() {
    return (
        <stack.Navigator screenOptions={{ headerShown: false }}>
            <stack.Screen name="Login" component={Login} />
            <stack.Screen name="Signup" component={Signup} />
        </stack.Navigator>
    );
}
