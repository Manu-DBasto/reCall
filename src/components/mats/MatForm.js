//libraries
import { TextInput, StyleSheet, View, Switch, Text } from "react-native";
import { colors } from "../../../assets/colors";


export default function MatForm({ onChange, matData = {} }) {
    return (
        <View style={styles.formContainer}>
            {/* Campo de nombre */}
            <TextInput
                id="name"
                placeholder="Nombre del material"
                autoCapitalize="words"
                style={styles.input}
                value={matData.name}
                onChangeText={(text) => onChange("name", text)}
            />

            {/* Switch reciclable */}
            <View style={styles.switchInput}>
                <Text>¿Es reciclable?</Text>
                <Switch
                    id="recyclable"
                    value={matData.reciclable}
                    onValueChange={(value) => onChange("reciclable", value)}
                />
            </View>
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
