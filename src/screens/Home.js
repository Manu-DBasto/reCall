//libraries
import {
    Text,
    View,
    TouchableOpacity,
    FlatList,
    StyleSheet,
} from "react-native";
import { useState } from "react";
import { DataTable } from "react-native-paper";
//components
import CustomModal from "../components/general/CustomModal";

//others
import { colors } from "../../assets/colors";

export default function Home() {
    const [visible, setVisible] = useState(false);

    const serviceRequest = [
        {
            id: "perez@gmail.copm",
            username: "Ana Perez",
            status: "pendiente",
            material: "Papel",
            employee: "Raul Torres",
            vehicle: "001",
        },
        {
            id: "hernandez@gmail.copm",
            username: "Luis Hernandez",
            status: "en camino",
            material: "Latas",
            employee: "Adolfo Hidalgo",
            vehicle: "002",
        },
    ];

    const setStatusStyles = (status) => {
        switch (status) {
            case "pendiente":
                return styles.statusPending;
            case "en camino":
                return styles.statusOnRoad;
            case "completado":
                return styles.statusCompleted;
            default:
                console.log("Invalid status");
        }
    };

    return (
        <View>
            <View style={styles.tableContainer}>
                <FlatList
                    data={serviceRequest}
                    keyExtractor={(serviceRequest) => serviceRequest.id}
                    renderItem={({ item, index }) => (
                        <View style={styles.row}>
                            <View style={styles.reqContainer}>
                                <View style={styles.headerInfo}>
                                    <Text style={styles.info}>
                                        {item.material}
                                    </Text>
                                    <Text style={setStatusStyles(item.status)}>
                                        {item.status}
                                    </Text>
                                </View>
                                <View style={styles.serviceInfo}>
                                    <Text style={styles.info}>
                                        Empleado: {item.employee}
                                    </Text>
                                    <Text style={styles.info}>
                                        Vehiculo: {item.vehicle}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    )}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    row: {
        padding: 10,
    },
    reqContainer: {
        backgroundColor: colors.secondary,
        borderRadius: 10,
        padding: 5,
        gap: 10,
    },
    headerInfo: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    serviceInfo: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    info: {
        color: colors.textDark,
    },
    statusCompleted: {
        backgroundColor: colors.success,
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 20,
        color: colors.textLight,
    },
    statusOnRoad: {
        backgroundColor: colors.warning,
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 20,
        color: colors.textLight,
    },
    statusPending: {
        backgroundColor: colors.danger,
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 20,
        color: colors.textLight,
    },
});
