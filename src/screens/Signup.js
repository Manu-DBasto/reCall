import { useState } from "react";
import {
    Text,
    View,
    KeyboardAvoidingView,
    ScrollView,
    StyleSheet,
    TextInput,
    Button,
    Platform,
    TouchableOpacity,
} from "react-native";
import { useTextInput } from "../hooks/formValues";

export default function Signup({ navigation }) {
    const { onInputChange, data } = useTextInput({
        name: "",
        email: "",
        password: "",
        confirm_password: "",
    });
    const onSubmit = () => {
        console.log(data);
    };

    return (
        <KeyboardAvoidingView
            behavior="padding"
            keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
        >
            <ScrollView style={styles.formContainer}>
                <Text style={styles.title}>Registrarse</Text>
                <TextInput
                    id="name"
                    placeholder="Nombre"
                    autoCapitalize="words"
                    style={styles.input}
                    onChange={onInputChange}
                />
                <TextInput
                    id="email"
                    placeholder="E-mail"
                    autoCapitalize="words"
                    keyboardType="email-address"
                    style={styles.input}
                    onChange={onInputChange}
                />
                <TextInput
                    id="password"
                    placeholder="Contraseña"
                    autoCapitalize="none"
                    secureTextEntry
                    style={styles.input}
                    onChange={onInputChange}
                />
                <TextInput
                    id="confirm_password"
                    placeholder="Confirmar contraseña"
                    autoCapitalize="none"
                    secureTextEntry
                    style={styles.input}
                    onChange={onInputChange}
                />
                <TouchableOpacity style={styles.submitBtn} onPress={onSubmit}>
                    <Text>Enviar</Text>
                </TouchableOpacity>
            </ScrollView>
            <Button
                title="hola"
                onPress={() => {
                    navigation.navigate("Login");
                }}
            ></Button>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({});
