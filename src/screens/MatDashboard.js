//libraries
import React, { useEffect, useState } from "react";
import { Text, View, FlatList, TouchableOpacity, StyleSheet, Alert } from "react-native";

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

export default function MatDashboard() {
    const [materials, setMaterials] = useState([]);
    const [visible, setVisible] = useState(false);
    const [selectedMatId, setSelectedMatId] = useState(null);
    const [visible2, setVisible2] = useState(false);

    const { data, onInputChange, rewriteData } = useTextInput({});

    // Cargar materiales
    async function fetchMats() {
        try {
            const data = await GetMats();
            setMaterials(data);
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
        <View
            style={styles.container}
        >
            <DataTable>
                <DataTable.Header>
                    <DataTable.Title>ID</DataTable.Title>
                    <DataTable.Title>Nombre</DataTable.Title>
                    <DataTable.Title>Reciclable</DataTable.Title>
                </DataTable.Header>

                <FlatList
                    data={materials}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            onPress={() => {
                                rewriteData(item);
                                setSelectedMatId(item.id);
                                setVisible(true);
                            }}
                        >
                            <DataTable.Row>
                                <DataTable.Cell>{item.id}</DataTable.Cell>
                                <DataTable.Cell>{item.name}</DataTable.Cell>
                                <DataTable.Cell>
                                    <Text>{item.reciclable ? "Sí" : "No"}</Text>
                                </DataTable.Cell>
                            </DataTable.Row>
                        </TouchableOpacity>
                    )}
                />
            </DataTable>

            <CustomModal
                visible={visible}
                title={selectedMatId ? "Editar material" : "Nuevo material"}
                onClose={() => {
                    setVisible(false);
                    setSelectedMatId(null);
                }}
            >
                <MatForm onChange={onInputChange} matData={data} />

                <View>
                    <TouchableOpacity
                        onPress={() => onUpdate(selectedMatId, data)}
                    >
                        <Text>Actualizar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => onDelete(selectedMatId)}
                    >
                        <Text>Eliminar</Text>
                    </TouchableOpacity>
                </View>
            </CustomModal>


            <TouchableOpacity
                style={styles.fab}
                onPress={() => {
                    console.log("✅ Botón presionado");
                    setVisible2(true);


                }}
            >
                <Text style={styles.fabText}>+</Text>
            </TouchableOpacity>

            <CustomModal
                visible={visible2}
                title="Nuevo material"
                onClose={() => setVisible2(false)}
            >
                <MatForm onChange={onInputChange} matData={data} />

                <TouchableOpacity style={styles.actionButton} onPress={onCreate}>
                    <Text style={styles.actionButtonText}>Crear</Text>
                </TouchableOpacity>
            </CustomModal>


        </View>

    );
}

// --- Estilos ---
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        position: "relative",
    },
    fab: {
        position: "absolute",
        bottom: 20,
        right: 20,
        backgroundColor: "#2196F3",
        borderRadius: 50,
        width: 60,
        height: 60,
        alignItems: "center",
        justifyContent: "center",
        elevation: 8,
        zIndex: 100,
    },
    fabText: {
        color: "#fff",
        fontSize: 32,
        lineHeight: 32,
        marginBottom: 2,
    },
    actionButton: {
        backgroundColor: "#2196F3",
        padding: 12,
        borderRadius: 8,
        marginTop: 10,
        alignItems: "center",
    },
    actionButtonText: {
        color: "#fff",
        fontWeight: "bold",
    },
});

