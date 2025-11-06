//libraries
import React, { useEffect, useState } from "react";
import { Text, View, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { DataTable } from "react-native-paper";

//components
import CustomModal from "../components/general/CustomModal";
import UserForm from "../components/users/UserForm";

//hooks
import { useTextInput } from "../hooks/formValues";

//scripts
import { GetUsers } from "../scripts/users/GetUsers";
import { UpdateUser } from "../scripts/users/UpdateUser";
import { DeleteUser } from "../scripts/users/DeleteUser";

//theme
import { colors } from "../../assets/colors";

export default function UsersDashboard() {
    const [users, setUsers] = useState([]);
    const [visible, setVisible] = useState(false);
    const [ogEmail, setOgEmail] = useState("");

    const { data, onInputChange, handleDataChange, rewriteData } = useTextInput({});

    async function handleRole(role) {
        await handleDataChange("isAdmin", !role);
    }

    async function fetchUsers() {
        try {
            const data = await GetUsers();
            setUsers(data);
        } catch (error) {
            console.error("Error fetching users: ", error);
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
        }
    }

    async function onDelete(email) {
        try {
            await DeleteUser(email);
            setVisible(false);
            await fetchUsers();
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.tableContainer}>
                <DataTable.Header style={styles.header}>
                    <DataTable.Title textStyle={styles.headerText}>Usuario</DataTable.Title>
                    <DataTable.Title textStyle={styles.headerText}>Correo</DataTable.Title>
                    <DataTable.Title textStyle={styles.headerText}>Admin</DataTable.Title>
                </DataTable.Header>

                <FlatList
                    data={users}
                    keyExtractor={(user) => user.email}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={styles.rowTouchable}
                            activeOpacity={0.7}
                            onPress={() => {
                                rewriteData(item);
                                setVisible(true);
                                setOgEmail(item.email);
                            }}
                        >
                            <DataTable.Row style={styles.row}>
                                <DataTable.Cell textStyle={styles.cellText}>{item.name}</DataTable.Cell>
                                <DataTable.Cell textStyle={styles.cellText}>{item.email}</DataTable.Cell>
                                <DataTable.Cell>
                                    <Text
                                        style={item.isAdmin ? styles.adminYes : styles.adminNo}
                                    >
                                        {item.isAdmin ? "Sí" : "No"}
                                    </Text>
                                </DataTable.Cell>
                            </DataTable.Row>
                        </TouchableOpacity>
                    )}
                />
            </View>

            <CustomModal
                visible={visible}
                title="Información del usuario"
                onClose={() => setVisible(false)}
            >
                <UserForm
                    onChange={onInputChange}
                    userData={data}
                    changeRole={handleRole}
                />

                <View style={styles.modalButtons}>
                    <TouchableOpacity
                        style={[styles.button, styles.acceptButton]}
                        onPress={() => onUpdate(ogEmail, data)}
                    >
                        <Text style={styles.buttonText}>Aceptar</Text>
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

// =====================
// 🎨 ESTILOS
// =====================
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        padding: 12,
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
});
