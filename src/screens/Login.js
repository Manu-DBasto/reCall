import { Text, View, Button } from "react-native";

export default function Login({ navigation }) {
    return (
        <View>
            <Text>Login</Text>
            <Button
                title="ir a registro"
                onPress={() => navigation.navigate("Signup")}
            />
        </View>
    );
}
