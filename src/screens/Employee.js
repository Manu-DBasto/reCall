// src/screens/Employee.js
import React, { useState, useEffect } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { TextInput, Button, Card, Text } from "react-native-paper";
import { db } from "../scripts/database"; 
import {
    collection,
    addDoc,
    getDocs,
    updateDoc,
    deleteDoc,
    doc,
} from "firebase/firestore";

export default function Employee() {
    console.log("✅ Employee Screen Loaded");

    const [nombreEmpleado, setNombreEmpleado] = useState("");
    const [numeroVehiculo, setNumeroVehiculo] = useState("");
    const [empleados, setEmpleados] = useState([]);
    const [editId, setEditId] = useState(null);

    const empleadosCollection = collection(db, "empleados");

    // 🔹 Leer los datos desde Firestore
    const obtenerEmpleados = async () => {
        try {
            const data = await getDocs(empleadosCollection);
            const empleadosData = data.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }));
            setEmpleados(empleadosData);
            console.log("📋 Empleados cargados:", empleadosData);
        } catch (error) {
            console.error("❌ Error al obtener empleados:", error);
        }
    };

    useEffect(() => {
        obtenerEmpleados();
    }, []);

    // 🔹 Crear o actualizar empleado
    const guardarEmpleado = async () => {
        try {
            if (editId) {
                const empleadoDoc = doc(db, "empleados", editId);
                await updateDoc(empleadoDoc, {
                    nombreEmpleado,
                    numeroVehiculo,
                });
                setEditId(null);
            } else {
                await addDoc(empleadosCollection, {
                    nombreEmpleado,
                    numeroVehiculo,
                });
            }
            setNombreEmpleado("");
            setNumeroVehiculo("");
            obtenerEmpleados();
        } catch (error) {
            console.error("❌ Error al guardar empleado:", error);
        }
    };

    // 🔹 Editar empleado
    const editarEmpleado = (empleado) => {
        setNombreEmpleado(empleado.nombreEmpleado);
        setNumeroVehiculo(empleado.numeroVehiculo);
        setEditId(empleado.id);
    };

    // 🔹 Eliminar empleado
    const eliminarEmpleado = async (id) => {
        try {
            const empleadoDoc = doc(db, "empleados", id);
            await deleteDoc(empleadoDoc);
            obtenerEmpleados();
        } catch (error) {
            console.error("❌ Error al eliminar empleado:", error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Empleados</Text>

            <TextInput
                label="Nombre del Empleado"
                value={nombreEmpleado}
                onChangeText={setNombreEmpleado}
                style={styles.input}
            />
            <TextInput
                label="Número de Vehículo"
                value={numeroVehiculo}
                onChangeText={setNumeroVehiculo}
                keyboardType="numeric"
                style={styles.input}
            />

            <Button
                mode="contained"
                onPress={guardarEmpleado}
                style={styles.boton}
            >
                {editId ? "Actualizar" : "Agregar"}
            </Button>

            <FlatList
                data={empleados}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <Card style={styles.card}>
                        <Card.Content>
                            <Text>👤 {item.nombreEmpleado}</Text>
                            <Text>🚗 Vehículo: {item.numeroVehiculo}</Text>
                        </Card.Content>
                        <Card.Actions>
                            <Button onPress={() => editarEmpleado(item)}>
                                Editar
                            </Button>
                            <Button onPress={() => eliminarEmpleado(item.id)}>
                                Eliminar
                            </Button>
                        </Card.Actions>
                    </Card>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: "#f8f9fa" },
    titulo: {
        fontSize: 22,
        textAlign: "center",
        marginVertical: 15,
        fontWeight: "bold",
    },
    input: { marginBottom: 10 },
    boton: { marginBottom: 20 },
    card: { marginVertical: 6 },
});
