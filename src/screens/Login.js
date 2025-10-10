import { colors } from "../../assets/colors";
import {
    Text,
    View,
    KeyboardAvoidingView,
    ScrollView,
    StyleSheet,
    TextInput,
    Platform,
    TouchableOpacity,
} from "react-native";
import { useTextInput } from "../hooks/formValues";
import { LoginUser } from "../scripts/users/LoginUser";
import { useAuth } from "../auth/AuthProvider";

export default function Login({ navigation }) {
    const { AuthUser } = useAuth();
    const { onInputChange, data } = useTextInput({
        email: "",
        password: "",
    });

    const onSubmit = async () => {
        try {
            const user = await LoginUser(data);
            AuthUser(user);
            alert("Acceso autorizado");
        } catch (error) {
            alert("Ocurrio un error. ", error.message);
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.body}
            behavior="padding"
            keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
        >
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.wrapper}>
                    <Text style={styles.title}>Iniciar Sesión</Text>
                    <View style={styles.formContainer}>
                        <TextInput
                            id="email"
                            placeholder="E-mail"
                            autoCapitalize="words"
                            keyboardType="email-address"
                            style={styles.input}
                            onChangeText={(e) => {
                                onInputChange("email", e);
                            }}
                        />
                        <TextInput
                            id="password"
                            placeholder="Contraseña"
                            autoCapitalize="none"
                            secureTextEntry
                            style={styles.input}
                            onChangeText={(e) => {
                                onInputChange("password", e);
                            }}
                        />
                        <TouchableOpacity
                            style={styles.submitBtn}
                            onPress={onSubmit}
                        >
                            <Text style={styles.submitText}>Enviar</Text>
                        </TouchableOpacity>
                    </View>
                    <Text>
                        No tiene cuenta?{" "}
                        <TouchableOpacity
                            style={styles.link}
                            onPress={() => {
                                navigation.navigate("Signup");
                            }}
                        >
                            <Text>Registrese</Text>
                        </TouchableOpacity>
                    </Text>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    body: {
        backgroundColor: colors.background,
        flex: 1,
        padding: 20,
    },
    scrollContainer: {
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    wrapper: {
        borderColor: colors.secondary,
        borderWidth: 1,
        borderRadius: 10,
        alignItems: "center",
        padding: 20,
        gap: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 600,
    },
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
    submitBtn: {
        marginTop: 5,
        backgroundColor: colors.primary,
        padding: 15,
        borderRadius: 5,
    },
    submitText: {
        color: colors.textLight,
        fontWeight: 600,
        textAlign: "center",
    },
    link: {
        color: "#2e8ebaff",
    },
});
