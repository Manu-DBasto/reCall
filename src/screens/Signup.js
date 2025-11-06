//libraries
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

//components
import UserForm from "../components/users/UserForm";

//scripts and functions
import { useTextInput } from "../hooks/formValues";
import { CreateUser } from "../scripts/users/CreateUser";

import { colors } from "../../assets/colors";

export default function Signup({ navigation }) {
    const { onInputChange, data } = useTextInput({
        name: "",
        email: "",
        password: "",
        confirm_password: "",
    });

    const onSubmit = async () => {
        if (data.password !== data.confirm_password) {
            alert("Las contraseñas no coinciden");
            return;
        }

        try {
            const res = await CreateUser(data);
            console.log(res.message);
            alert("Cuenta creada con exito.");
            navigation.navigate("Login");
        } catch (error) {
            alert("Ocurrio un error.", error.message);
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
                    <Text style={styles.title}>Registrarse</Text>
                    <UserForm
                        onChange={onInputChange}
                        userData={data}
                    ></UserForm>
                    <TouchableOpacity
                        style={styles.submitBtn}
                        onPress={onSubmit}
                    >
                        <Text style={styles.submitText}>Enviar</Text>
                    </TouchableOpacity>
                    <Text>
                        Ya tiene cuenta?{" "}
                        <TouchableOpacity
                            style={styles.link}
                            onPress={() => {
                                navigation.navigate("Login");
                            }}
                        >
                            <Text>Inicie sesion.</Text>
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
        width: "100%",
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
        color: colors.textLight,
    },
});
