//libraries
import {
    Text,
    View,
    TouchableOpacity,
    FlatList,
    StyleSheet,
    TextInput,
} from "react-native";
import { useEffect, useState } from "react";
import { DataTable } from "react-native-paper";
import DropdownSelect from "react-native-input-select";
import { Picker } from "@react-native-picker/picker";
import { shareAsync } from "expo-sharing";
import * as Print from "expo-print";

//components
import CustomModal from "../components/general/CustomModal";

//scripts
import { GetMats } from "../scripts/mats/GetMats";
import { getEmployees } from "../scripts/employees/getEmployees";
import { useAuth } from "../auth/AuthProvider";
import { CreateReqService } from "../scripts/request-service/CreateReqService";
import { getReqService } from "../scripts/request-service/getReqService";
//others
import { colors } from "../../assets/colors";

export default function Home() {
    const { user } = useAuth();
    const [visible, setVisible] = useState(false);
    const [formData, setFormData] = useState({
        user: user.email,
        username: user.name,
        status: "pendiente",
        material: "",
        employee: "",
        vehicle: "",
        address: "",
        created_at: new Date(),
    });
    const [reqService, setReqService] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [materials, setMaterials] = useState([]);
    const [serviceReg, setServiceReg] = useState({});

    async function fetchMats() {
        try {
            const materiales = await GetMats();
            setMaterials(materiales);
        } catch (error) {
            console.error("Error fetching materials: ", error);
        }
    }

    async function fetchEmployees() {
        try {
            const empleados = await getEmployees();
            setEmployees(empleados);
        } catch (error) {
            console.error("Error fetching materials: ", error);
        }
    }

    async function fetchReqService() {
        try {
            const service = await getReqService(user.email);
            setReqService(service);
            console.log(service);
        } catch (error) {
            console.error("Error fetching materials: ", error);
        }
    }

    useEffect(() => {
        fetchEmployees();
        fetchMats();
        fetchReqService();
    }, []);

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

    async function onSubmit() {
        try {
            console.log(formData);
            const res = await CreateReqService(formData);
            await setServiceReg(formData);
            await fetchReqService();
            setVisible(false);
            print();
            setServiceReg({});
            console.log(res.message);
            alert("Servicio solicitado.");
        } catch (error) {
            alert("Ocurrio un error.", error.message);
        }
    }

    //===============pdf functionality=================
    const html = `
<html>
    <h1>
      Hello Expo!
    </h1>
  </body>
</html>
`;
    const [selectedPrinter, setSelectedPrinter] = useState();

    const print = async () => {
        // On iOS/android prints the given html. On web prints the HTML from the current page.
        await Print.printAsync({
            html,
            printerUrl: selectedPrinter?.url, // iOS only
        });
    };

    const printToFile = async () => {
        // On iOS/android prints the given html. On web prints the HTML from the current page.
        const { uri } = await Print.printToFileAsync({ html });
        console.log("File has been saved to:", uri);
        await shareAsync(uri, { UTI: ".pdf", mimeType: "application/pdf" });
    };

    const selectPrinter = async () => {
        const printer = await Print.selectPrinterAsync(); // iOS only
        setSelectedPrinter(printer);
    };

    return (
        <View 
        
        >
            <TouchableOpacity
                onPress={() => {
                    setVisible(!visible);
                }}
            >
                <Text>Solicitar servicio</Text>
            </TouchableOpacity>
            <View style={styles.tableContainer}>
                <FlatList
                    data={reqService}
                    keyExtractor={(reqService) => reqService.id}
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
            <CustomModal
                visible={visible}
                title="Servicio"
                onClose={() => {
                    setVisible(false);
                }}
            >
                {Object.keys(serviceReg).length > 1 ? (
                    <View style={styles.ticketContainer}>
                        <Text style={styles.ticketTitle}>
                            🎫 Recibo de Solicitud 🎫
                        </Text>
                        <Text style={styles.ticketHeader}>
                            ID Solicitud: {serviceReg.id || "Generando..."}
                        </Text>
                        <Text style={styles.ticketHeader}>
                            Fecha:{" "}
                            {serviceReg.created_at
                                ? new Date(
                                      serviceReg.created_at
                                  ).toLocaleDateString()
                                : "N/A"}{" "}
                            {serviceReg.created_at
                                ? new Date(
                                      serviceReg.created_at
                                  ).toLocaleTimeString()
                                : ""}
                        </Text>
                        <View style={styles.ticketDivider} />

                        <View style={styles.ticketItem}>
                            <Text>Solicitante:</Text>
                            <Text style={{ fontWeight: "bold" }}>
                                {serviceReg.username || "N/A"}
                            </Text>
                        </View>
                        <View style={styles.ticketItem}>
                            <Text>Dirección de Servicio:</Text>
                            <Text style={{ fontWeight: "bold" }}>
                                {serviceReg.address || "N/A"}
                            </Text>
                        </View>
                        <View style={styles.ticketDivider} />

                        <View style={styles.ticketItem}>
                            <Text>Material:</Text>
                            <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                                {serviceReg.material || "N/A"}
                            </Text>
                        </View>
                        <View style={styles.ticketDivider} />

                        <View style={styles.ticketItem}>
                            <Text>Empleado Asignado:</Text>
                            <Text>{serviceReg.employee || "Pendiente"}</Text>
                        </View>
                        <View style={styles.ticketItem}>
                            <Text>Vehículo:</Text>
                            <Text>{serviceReg.vehicle || "Pendiente"}</Text>
                        </View>
                        <View style={styles.ticketItem}>
                            <Text>Estado:</Text>
                            <Text
                                style={{
                                    ...setStatusStyles(serviceReg.status),
                                    padding: 0,
                                }}
                            >
                                {serviceReg.status || "pendiente"}
                            </Text>
                        </View>
                        <View style={styles.ticketDivider} />
                        <Text style={styles.ticketFooter}>
                            ¡Gracias por su solicitud!
                        </Text>
                        <Text style={styles.ticketFooterNote}>
                            * Este no es un comprobante de pago.
                        </Text>

                        {/* Botón para imprimir el ticket (opcional) */}
                        <TouchableOpacity
                            style={{
                                ...styles.submitBtn,
                                backgroundColor: colors.success,
                                marginTop: 15,
                            }}
                            onPress={printToFile}
                        >
                            <Text style={styles.submitText}>
                                Imprimir / Guardar PDF
                            </Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <View style={styles.formContainer}>
                        <TextInput
                            id="address"
                            placeholder="Direccion"
                            autoCapitalize="words"
                            style={styles.input}
                            onChangeText={(e) => {
                                setFormData({
                                    ...formData,
                                    address: e,
                                });
                            }}
                        />
                        <Picker
                            style={styles.input}
                            onValueChange={(itemValue) => {
                                setFormData({
                                    ...formData,
                                    material: itemValue,
                                });
                            }}
                        >
                            <>
                                <Picker.Item
                                    label="Seleccione una opcion..."
                                    value={""}
                                />
                                {materials.map((item) => (
                                    <Picker.Item
                                        key={item.id}
                                        label={item.name}
                                        value={item.name}
                                    />
                                ))}
                            </>
                        </Picker>
                        <Picker
                            style={styles.input}
                            onValueChange={(itemValue, itemIndex) => {
                                const selectedEmployee =
                                    employees[itemIndex - 1];

                                setFormData({
                                    ...formData,
                                    employee: selectedEmployee.nombreEmpleado, // Usar la propiedad del objeto
                                    vehicle: selectedEmployee.numeroVehiculo, // Agregar la otra propiedad
                                });
                            }}
                        >
                            <>
                                <Picker.Item
                                    label="Seleccione una opcion..."
                                    value={""}
                                />
                                {employees.map((item) => (
                                    <Picker.Item
                                        key={item.id}
                                        label={item.nombreEmpleado}
                                        value={item.nombreEmpleado}
                                    />
                                ))}
                            </>
                        </Picker>

                        <TouchableOpacity
                            style={styles.submitBtn}
                            onPress={onSubmit}
                        >
                            <Text style={styles.submitText}>Enviar</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </CustomModal>
        </View>
    );
}

const styles = StyleSheet.create({
    body:{
        backgroundColor: colors.background,
    },
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
    formContainer: {
        minWidth: 250,
        maxWidth: 300,
        gap: 10,
    },
    input: {
        borderColor: colors.secondary,
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
    },
    switchInput: {
        flexDirection: "row",
        gap: 10,
    },
    submitBtn: {
        marginTop: 5,
        backgroundColor: colors.primary,
        padding: 15,
        borderRadius: 5,
    },
    submitText: {
        color: colors.textLight,
        fontWeight: 600,
        textAlign: "center",
    },


    // === NUEVOS ESTILOS PARA EL TICKET ===
    ticketContainer: {
        width: 300,
        backgroundColor: colors.textLight, 
        padding: 15,
        borderWidth: 1,
        borderColor: colors.textDark, 
        borderRadius: 5,
        gap: 8,
    },
    ticketTitle: {
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 5,
        color: colors.textDark,
    },
    ticketHeader: {
        fontSize: 12,
        textAlign: "center",
        color: colors.textDark,
    },
    ticketItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    ticketDivider: {
        borderBottomColor: colors.textDark,
        borderBottomWidth: 1,
        borderStyle: "dashed", 
        marginVertical: 5,
    },
    ticketFooter: {
        textAlign: "center",
        marginTop: 10,
        fontWeight: "bold",
    },
    ticketFooterNote: {
        textAlign: "center",
        fontSize: 10,
        color: colors.textDark,
    },
});
