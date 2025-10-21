import { Text, View, Button, StyleSheet } from "react-native";
import { colors } from "../../assets/colors";


export default function Home() {
    return (
        <View style={styles.body}>
            <Text style={styles.titleText}>Bienvenido</Text>
        </View>
    );
}
const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: colors.background,
        padding: 16,
    },

    // Encabezados del DataTable
    titleText: {
        color: colors.primary,
        fontWeight: "700",
        fontSize: 16,
        textTransform: "uppercase",
        textAlign: "center",
    },


    // Filas del DataTable
    row: {
        backgroundColor: colors.secondary,
        borderBottomWidth: 1,
        borderBottomColor: "#444",
    },
    cellText: {
        color: colors.textDark,
        fontSize: 15,
    },

    // Botones dentro del modal
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 20,
    },
    button: {
        flex: 1,
        marginHorizontal: 5,
        backgroundColor: colors.primary,
        paddingVertical: 10,
        borderRadius: 8,
        alignItems: "center",
    },
    deleteButton: {
        backgroundColor: colors.danger,
    },
    buttonText: {
        color: colors.textLight,
        fontWeight: "600",
        fontSize: 15,
    },
});
