//libraries
import React, { useEffect, useState } from "react";
import { Text, View, FlatList, TouchableOpacity } from "react-native";
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

export default function MatDashboard() {
    const [materials, setMaterials] = useState([]);
    const [visible, setVisible] = useState(false);
    const [selectedMatId, setSelectedMatId] = useState(null);

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
            setVisible(false);
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
        } catch (error) {
            console.error("Error updating material: ", error);
        }
    }

    return (
        <View>
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
                    {selectedMatId ? (
                        <TouchableOpacity
                            onPress={() => onUpdate(selectedMatId, data)}
                        >
                            <Text>Actualizar</Text>
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity onPress={onCreate}>
                            <Text>Crear</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </CustomModal>
        </View>
    );
}
