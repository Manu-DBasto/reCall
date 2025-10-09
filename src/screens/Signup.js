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
import {
    getAuth,
    createUserWithEmailAndPassword,
    updateProfile,
} from "firebase/auth";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../../firebase-config";
import { setDoc, getFirestore, doc } from "firebase/firestore";
import { useConnect } from "../hooks/useConnect";
export default function Signup({ navigation }) {
    const { onInputChange, data } = useTextInput({
        name: "",
        email: "",
        password: "",
        confirm_password: "",
    });

    // const { app, db } = useConnect;

    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    const auth = getAuth(app);

    const onSubmit = () => {
        createUserWithEmailAndPassword(auth, data.email, data.password)
            .then((userCredential) => {
                console.log("Usuario creado con exito");
                const user = userCredential.user;
                return updateProfile(user, {
                    displayName: data.name,
                }).then(() => user);
            })
            .then((user) => {
                return setDoc(doc(db, "users", user.uid), {
                    name: data.name,
                    email: data.email,
                    createdAt: new Date(),
                });
            })
            .then(() => {
                console.log("Datos de usuario guardados con exito.");
            })
            .catch((error) => {
                console.log(error);
            });
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
                    <View style={styles.formContainer}>
                        <TextInput
                            id="name"
                            placeholder="Nombre"
                            autoCapitalize="words"
                            style={styles.input}
                            onChangeText={(e) => {
                                onInputChange("name", e);
                            }}
                        />
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
                        <TextInput
                            id="confirm_password"
                            placeholder="Confirmar contraseña"
                            autoCapitalize="none"
                            secureTextEntry
                            style={styles.input}
                            onChangeText={(e) => {
                                onInputChange("confirm_password", e);
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
