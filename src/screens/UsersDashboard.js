//libraries
import React, { useEffect, useState } from "react";
import { Text, View, FlatList, TouchableOpacity } from "react-native";
import { DataTable } from "react-native-paper";
//components
import BottomSheetExample from "../components/layout/Modal";

//scripts and functions
import { GetUsers } from "../scripts/users/GetUsers";
import { UpdateUser } from "../scripts/users/UpdateUser";
import { DeleteUser } from "../scripts/users/DeleteUser";
import { GetUserByEmail } from "../scripts/users/GetUsers";

export default function UsersDashboard() {
    const [users, setUsers] = useState([]);

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
                        <TouchableOpacity>
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
            <BottomSheetExample></BottomSheetExample>
        </View>
    );
}
