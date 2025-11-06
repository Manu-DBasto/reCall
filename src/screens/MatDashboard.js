//libraries
import React, { useEffect, useState } from "react";
import {
    Text,
    View,
    FlatList,
    TouchableOpacity,
    StyleSheet,
} from "react-native";
import { DataTable } from "react-native-paper";

//components
import CustomModal from "../components/general/CustomModal";
import MatForm from "../components/mats/MatForm";

//hooks
import { useTextInput } from "../hooks/formValues";

//scripts
import { GetMats } from "../scripts/mats/GetMats";
import { CreateMat } from "../scripts/mats/CreateMat";
import { UpdateMat } from "../scripts/mats/UpdateMat";
import { DeleteMat } from "../scripts/mats/DeleteMat";

//colors
import { colors } from "../../assets/colors";

export default function MatDashboard() {
    const [materials, setMaterials] = useState([]);
    const [visible, setVisible] = useState(false);
    const [selectedMatId, setSelectedMatId] = useState(null);
    const [visible2, setVisible2] = useState(false);

    const { data, onInputChange, rewriteData } = useTextInput({});

    // Cargar materiales
    async function fetchMats() {
        try {
            const materiales = await GetMats();
            setMaterials(materiales);
            rewriteData({ name: "", reciclable: false });
        } catch (error) {
            console.error("Error fetching materials: ", error);
        }
    }

    useEffect(() => {
        fetchMats();
    }, []);

    // Crear material
    async function onCreate() {
        try {
            await CreateMat(data);
            setVisible2(false);
            await fetchMats();
            setSelectedMatId(null);
        } catch (error) {
            console.error("Error creating material: ", error);
        }
    }

    // Actualizar material
    async function onUpdate(id, data) {
        try {
            await UpdateMat(id, data);
            setVisible(false);
            await fetchMats();
            setSelectedMatId(null);
        } catch (error) {
            console.error("Error updating material: ", error);
        }
    }

    async function onDelete(id) {
        try {
            await DeleteMat(id);
            setVisible(false);
            setSelectedMatId(null);
            await fetchMats();
        } catch (error) {
            console.error("Error deleting material: ", error);
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.tableContainer}>
                <DataTable>
                    <DataTable.Header style={styles.header}>
                        <DataTable.Title textStyle={styles.headerText}>
                            ID
                        </DataTable.Title>
                        <DataTable.Title textStyle={styles.headerText}>
                            Nombre
                        </DataTable.Title>
                        <DataTable.Title textStyle={styles.headerText}>
                            Reciclable
                        </DataTable.Title>
                    </DataTable.Header>

                    <FlatList
                        data={materials}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={styles.rowTouchable}
                                onPress={() => {
                                    rewriteData(item);
                                    setSelectedMatId(item.id);
                                    setVisible(true);
                                }}
                            >
                                <DataTable.Row style={styles.row}>
                                    <DataTable.Cell>
                                        <Text style={styles.cellText}>
                                            {item.id}
                                        </Text>
                                    </DataTable.Cell>
                                    <DataTable.Cell>
                                        <Text style={styles.cellText}>
                                            {item.name}
                                        </Text>
                                    </DataTable.Cell>
                                    <DataTable.Cell>
                                        <Text
                                            style={
                                                item.reciclable
                                                    ? styles.adminYes
                                                    : styles.adminNo
                                            }
                                        >
                                            {item.reciclable ? "Sí" : "No"}
                                        </Text>
                                    </DataTable.Cell>
                                </DataTable.Row>
                            </TouchableOpacity>
                        )}
                    />
                </DataTable>
            </View>

            {/* Modal Editar */}
            <CustomModal
                visible={visible}
                title="Editar material"
                onClose={() => {
                    setVisible(false);
                    setSelectedMatId(null);
                    rewriteData({ name: "", reciclable: false });
                }}
            >
                <MatForm onChange={onInputChange} matData={data} />
                <View style={styles.modalButtons}>
                    <TouchableOpacity
                        style={[styles.button, styles.acceptButton]}
                        onPress={() => onUpdate(selectedMatId, data)}
                    >
                        <Text style={styles.buttonText}>Actualizar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.button, styles.deleteButton]}
                        onPress={() => onDelete(selectedMatId)}
                    >
                        <Text style={styles.buttonText}>Eliminar</Text>
                    </TouchableOpacity>
                </View>
            </CustomModal>

            {/* Botón flotante */}
            <TouchableOpacity
                style={styles.fab}
                onPress={() => setVisible2(true)}
            >
                <Text style={styles.fabText}>+</Text>
            </TouchableOpacity>

            {/* Modal Crear */}
            <CustomModal
                visible={visible2}
                title="Nuevo material"
                onClose={() => {
                    setVisible2(false);
                    rewriteData({ name: "", reciclable: false });
                }}
            >
                <MatForm onChange={onInputChange} matData={data} />
                <TouchableOpacity
                    style={[styles.button, styles.acceptButton, { marginTop: 20 }]}
                    onPress={onCreate}
                >
                    <Text style={styles.buttonText}>Crear</Text>
                </TouchableOpacity>
            </CustomModal>
        </View>
    );
}

// --- ESTILOS ---
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        padding: 16,
    },
    tableContainer: {
        backgroundColor: colors.textLight,
        borderRadius: 10,
        overflow: "hidden",
        elevation: 3,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    header: {
        backgroundColor: colors.primary,
        height: 50,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    headerText: {
        color: colors.textLight,
        fontWeight: "bold",
    },
    rowTouchable: {
        borderBottomColor: colors.background,
        borderBottomWidth: 1,
    },
    row: {
        backgroundColor: colors.textLight,
        minHeight: 45,
        
    },
    cellText: {
        color: colors.textDark,
        fontSize: 14,
    },
    adminYes: {
        color: colors.success,
        fontWeight: "bold",
    },
    adminNo: {
        color: colors.danger,
        fontWeight: "bold",
    },
    modalButtons: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 20,
    },
    button: {
        flex: 1,
        paddingVertical: 10,
        marginHorizontal: 5,
        borderRadius: 8,
        alignItems: "center",
    },
    acceptButton: {
        backgroundColor: colors.success,
    },
    deleteButton: {
        backgroundColor: colors.danger,
    },
    buttonText: {
        color: colors.textLight,
        fontWeight: "bold",
        fontSize: 16,
    },
    fab: {
        position: "absolute",
        right: 20,
        bottom: 30,
        backgroundColor: colors.primary,
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: "center",
        alignItems: "center",
        elevation: 6,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    fabText: {
        color: colors.textLight,
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 3,
    },
});
