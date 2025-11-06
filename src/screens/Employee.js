// src/screens/Employee.js
import React, { useState, useEffect } from "react";
import {
    View,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    Text,
} from "react-native";
import { Card } from "react-native-paper";
import {
    collection,
    addDoc,
    getDocs,
    updateDoc,
    deleteDoc,
    doc,
} from "firebase/firestore";

import { db } from "../scripts/database";
import { colors } from "../../assets/colors";

// componentes reutilizables
import CustomModal from "../components/general/CustomModal";
import { TextInput, Button } from "react-native-paper";

export default function Employee() {
    const [nombreEmpleado, setNombreEmpleado] = useState("");
    const [numeroVehiculo, setNumeroVehiculo] = useState("");
    const [empleados, setEmpleados] = useState([]);
    const [editId, setEditId] = useState(null);
    const [visible, setVisible] = useState(false);

    const empleadosCollection = collection(db, "empleados");

    // Leer datos de Firestore
    const obtenerEmpleados = async () => {
        try {
            const data = await getDocs(empleadosCollection);
            const empleadosData = data.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }));
            setEmpleados(empleadosData);
        } catch (error) {
            console.error("❌ Error al obtener empleados:", error);
        }
    };

    useEffect(() => {
        obtenerEmpleados();
    }, []);

    // Crear o actualizar empleado
    const guardarEmpleado = async () => {
        try {
            if (editId) {
                const empleadoDoc = doc(db, "empleados", editId);
                await updateDoc(empleadoDoc, { nombreEmpleado, numeroVehiculo });
            } else {
                await addDoc(empleadosCollection, { nombreEmpleado, numeroVehiculo });
            }

            setNombreEmpleado("");
            setNumeroVehiculo("");
            setEditId(null);
            setVisible(false);
            obtenerEmpleados();
        } catch (error) {
            console.error("❌ Error al guardar empleado:", error);
        }
    };

    // Editar empleado
    const editarEmpleado = (empleado) => {
        setNombreEmpleado(empleado.nombreEmpleado);
        setNumeroVehiculo(empleado.numeroVehiculo);
        setEditId(empleado.id);
        setVisible(true);
    };

    // Eliminar empleado
    const eliminarEmpleado = async (id) => {
        try {
            const empleadoDoc = doc(db, "empleados", id);
            await deleteDoc(empleadoDoc);
            obtenerEmpleados();
            setVisible(false);
        } catch (error) {
            console.error("❌ Error al eliminar empleado:", error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Empleados</Text>

            <FlatList
                data={empleados}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => editarEmpleado(item)}>
                        <Card style={styles.card}>
                            <Card.Content>
                                <Text style={styles.cardText}>👤 {item.nombreEmpleado}</Text>
                                <Text style={styles.cardSubtext}>🚗 Vehículo: {item.numeroVehiculo}</Text>
                            </Card.Content>
                        </Card>
                    </TouchableOpacity>
                )}
            />

            {/* Botón flotante "+" */}
            <TouchableOpacity
                style={styles.fab}
                onPress={() => {
                    setVisible(true);
                    setNombreEmpleado("");
                    setNumeroVehiculo("");
                    setEditId(null);
                }}
            >
                <Text style={styles.fabText}>+</Text>
            </TouchableOpacity>

            {/* Modal para crear / editar empleado */}
            <CustomModal
                visible={visible}
                title={editId ? "Editar empleado" : "Nuevo empleado"}
                onClose={() => {
                    setVisible(false);
                    setEditId(null);
                    setNombreEmpleado("");
                    setNumeroVehiculo("");
                }}
            >
                <View>
                    <TextInput
                        label="Nombre del empleado"
                        value={nombreEmpleado}
                        onChangeText={setNombreEmpleado}
                        style={styles.input}
                        mode="outlined"
                    />
                    <TextInput
                        label="Número de vehículo"
                        value={numeroVehiculo}
                        onChangeText={setNumeroVehiculo}
                        keyboardType="numeric"
                        style={styles.input}
                        mode="outlined"
                    />

                    <TouchableOpacity style={styles.actionButton} onPress={guardarEmpleado}>
                        <Text style={styles.actionButtonText}>
                            {editId ? "Actualizar" : "Agregar"}
                        </Text>
                    </TouchableOpacity>

                    {editId && (
                        <TouchableOpacity
                            style={[styles.actionButton, styles.deleteButton]}
                            onPress={() => eliminarEmpleado(editId)}
                        >
                            <Text style={styles.actionButtonText}>Eliminar</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </CustomModal>
        </View>
    );
}

// 💅 Estilos coherentes con el resto de dashboards
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        padding: 12,
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        color: colors.textDark,
        textAlign: "center",
        marginBottom: 12,
    },
    card: {
        backgroundColor: colors.textLight,
        borderRadius: 10,
        padding: 10,
        marginVertical: 6,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
    },
    cardText: {
        fontSize: 16,
        color: colors.textDark,
        fontWeight: "500",
    },
    cardSubtext: {
        fontSize: 14,
        color: colors.secondary,
        marginTop: 4,
    },
    input: {
        marginBottom: 10,
        backgroundColor: colors.textLight,
    },
    actionButton: {
        backgroundColor: colors.success,
        paddingVertical: 10,
        borderRadius: 8,
        alignItems: "center",
        marginTop: 10,
    },
    actionButtonText: {
        color: colors.textLight,
        fontWeight: "bold",
        fontSize: 16,
    },
    deleteButton: {
        backgroundColor: colors.danger,
    },
    fab: {
        position: "absolute",
        bottom: 20,
        right: 20,
        backgroundColor: colors.primary,
        width: 60,
        height: 60,
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center",
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
    },
    fabText: {
        color: colors.textLight,
        fontSize: 30,
        fontWeight: "bold",
    },
});
