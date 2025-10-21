//libraries
import React, { useEffect, useState } from "react";
import { Text, View, FlatList, TouchableOpacity } from "react-native";
import { DataTable } from "react-native-paper";

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
        <View>
            <View>
                <DataTable.Header>
                    <DataTable.Title>Nombre</DataTable.Title>
                    <DataTable.Title>Email</DataTable.Title>
                    <DataTable.Title>Permisos de administrador</DataTable.Title>
                </DataTable.Header>
                <FlatList
                    data={users}
                    keyExtractor={(users) => users.email}
                    renderItem={({ item, index }) => (
                        <TouchableOpacity
                            onPress={() => {
                                setData(item);
                                setVisible(true);
                                setOgEmail(item.email);
                            }}
                        >
                            <DataTable.Row>
                                <DataTable.Cell>{item.name}</DataTable.Cell>
                                <DataTable.Cell>{item.email}</DataTable.Cell>
                                <DataTable.Cell>
                                    <Text>{item.isAdmin ? "Si" : "No"}</Text>
                                </DataTable.Cell>
                            </DataTable.Row>
                        </TouchableOpacity>
                    )}
                />
            </View>
            <CustomModal
                visible={visible}
                title="Usuario"
                onClose={() => {
                    setVisible(false);
                }}
            >
                <UserForm
                    onChange={onInputChange}
                    userData={data}
                    changeRole={handleRole}
                ></UserForm>
                <View>
                    <TouchableOpacity
                        onPress={() => {
                            onUpdate(ogEmail, data);
                        }}
                    >
                        <Text>Actualizar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            onDelete(data.email);
                        }}
                    >
                        <Text>Eliminar</Text>
                    </TouchableOpacity>
                </View>
            </CustomModal>
        </View>
    );
}
