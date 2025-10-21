//libraries
import React, { useEffect, useState } from "react";
import { Text, View, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { DataTable } from "react-native-paper";

import { colors } from "../../assets/colors.js";


//components
import CustomModal from "../components/general/CustomModal";
import UserForm from "../components/users/UserForm";

//hooks
import { useTextInput } from "../hooks/formValues";

//scripts and functions
import { GetUsers } from "../scripts/users/GetUsers";
import { UpdateUser } from "../scripts/users/UpdateUser";
import { DeleteUser } from "../scripts/users/DeleteUser";

export default function UsersDashboard() {
    const [users, setUsers] = useState([]);
    const [visible, setVisible] = useState(false);
    const [ogEmail, setOgEmail] = useState("");

    const { data, setData, onInputChange, handleDataChange } = useTextInput({});

    async function handleRole(role) {
        await handleDataChange("isAdmin", !role);
    }

    async function fetchUsers() {
        try {
            const data = await GetUsers();
            setUsers(data);
        } catch (error) {
            console.error("Error fetching users: ", error);
            throw error;
        }
    }

    useEffect(() => {
        fetchUsers();
    }, []);

    async function onUpdate(email, data) {
        try {
            await UpdateUser(email, data);
            setVisible(false);
            await fetchUsers();
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async function onDelete(email) {
        try {
            await DeleteUser(email);
            setVisible(false);
            await fetchUsers();
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    return (
        <View style={styles.body}>
            {/* Tabla de usuarios */}
            <View>
                <DataTable.Header>
                    <DataTable.Title textStyle={styles.titleText}>Nombre</DataTable.Title>
                    <DataTable.Title textStyle={styles.titleText}>Email</DataTable.Title>
                    <DataTable.Title textStyle={styles.titleText}>
                        Permisos de administrador
                    </DataTable.Title>
                </DataTable.Header>

                <FlatList
                    data={users}
                    keyExtractor={(users) => users.email}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            activeOpacity={0.7}
                            onPress={() => {
                                setData(item);
                                setVisible(true);
                                setOgEmail(item.email);
                            }}
                        >
                            <DataTable.Row style={styles.row}>
                                <DataTable.Cell textStyle={styles.cellText}>{item.name}</DataTable.Cell>
                                <DataTable.Cell textStyle={styles.cellText}>{item.email}</DataTable.Cell>
                                <DataTable.Cell textStyle={styles.cellText}>
                                    {item.isAdmin ? "Sí" : "No"}
                                </DataTable.Cell>
                            </DataTable.Row>
                        </TouchableOpacity>
                    )}
                />
            </View>

            {/* Modal para edición */}
            <CustomModal
                visible={visible}
                title="Usuario"
                onClose={() => setVisible(false)}
            >
                <UserForm
                    onChange={onInputChange}
                    userData={data}
                    changeRole={handleRole}
                />

                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => onUpdate(ogEmail, data)}
                    >
                        <Text style={styles.buttonText}>Actualizar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.button, styles.deleteButton]}
                        onPress={() => onDelete(data.email)}
                    >
                        <Text style={styles.buttonText}>Eliminar</Text>
                    </TouchableOpacity>
                </View>
            </CustomModal>
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


