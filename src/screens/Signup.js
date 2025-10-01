import { Text, View, Button } from "react-native";

export default function Signup({ navigation }) {
    return (
        <View>
            <Text>SignUp</Text>
            <Button
                title="Ir a inicio sesion"
                onPress={() => navigation.navigate("Login")}
            />
        </View>
    );
}
