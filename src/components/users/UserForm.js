//libraries
import { TextInput, StyleSheet, View, Switch, Text } from "react-native";

//scripts and functions
import { useAuth } from "../../auth/AuthProvider";

import { colors } from "../../../assets/colors";

export default function UserForm({ onChange }) {
    const { user } = useAuth();

    return (
        <View style={styles.formContainer}>
            <TextInput
                id="name"
                placeholder="Nombre"
                autoCapitalize="words"
                style={styles.input}
                onChangeText={(e) => {
                    onChange("name", e);
                }}
            />
            <TextInput
                id="email"
                placeholder="E-mail"
                autoCapitalize="words"
                keyboardType="email-address"
                style={styles.input}
                onChangeText={(e) => {
                    onChange("email", e);
                }}
            />
            <TextInput
                id="password"
                placeholder="Contraseña"
                autoCapitalize="none"
                secureTextEntry
                style={styles.input}
                onChangeText={(e) => {
                    onChange("password", e);
                }}
            />
            {user ? (
                <TextInput
                    id="confirm_password"
                    placeholder="Confirmar contraseña"
                    autoCapitalize="none"
                    secureTextEntry
                    style={styles.input}
                    onChangeText={(e) => {
                        onChange("confirm_password", e);
                    }}
                />
            ) : null}
            {user.isAdmin === true ? (
                <View style={styles.switchInput}>
                    <Text>Es administrador?</Text>
                    <Switch />
                </View>
            ) : null}
        </View>
    );
}

const styles = StyleSheet.create({
    formContainer: {
        minWidth: 250,
        maxWidth: 300,
        gap: 10,
    },
    input: {
        borderColor: colors.secondary,
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
    },
    switchInput: {
        flexDirection: "row",
        gap: 10,
    },
});
