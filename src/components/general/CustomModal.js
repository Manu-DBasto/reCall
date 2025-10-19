import React, { useState } from "react";
import { View, Text, Modal, StyleSheet, TouchableOpacity } from "react-native";

import { colors } from "../../../assets/colors";

/** alt + z -> Para ver correctamente
 * Para usar este componente se deben de pasar 4 props especificamente:
 * Visible - Debe ser un estado que se ponga en el componente padre y debe ser boleano. A su vez, seria necesario hacer funciones para controlar el cambio de estado
 *
 * onClose - es la funcion que servirá para cerrar el modal. Osea pora que el estado cambie a false.
 *
 * title - Es una cadena de texto que se agrega como titulo del modal. Ej: "Usuarios"
 *
 * children - Es el contenido que estará dentro del modal, por ejemplo un formulario. Este se pone dentro de las etiquetas que conforman al componente. Ej:
 * <CustomModal><Text>Hola</Text></CustomModal>
 */

export default function CustomModal({
    visible = false,
    onClose,
    title = "",
    children,
    data = {},
}) {
    return (
        <Modal animationType="fade" transparent={true} visible={visible}>
            <View style={styles.overlay}>
                <View style={styles.modalContainer}>
                    <View style={styles.header}>
                        <Text style={styles.title}>{title}</Text>
                        <TouchableOpacity
                            onPress={onClose}
                            accessibilityLabel="Cerrar modal"
                            style={styles.closeButton}
                        >
                            <Text style={styles.closeButtonText}>✕</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.content}>{children}</View>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)", // oscurece el fondo
        justifyContent: "center",
        alignItems: "center",
    },
    modalContainer: {
        width: "85%",
        maxWidth: 480,
        backgroundColor: colors.background, // fondo blanco del modal
        borderRadius: 10,
        paddingTop: 15,
        paddingBottom: 10,
        // Sombra para iOS
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.2,
        shadowRadius: 12,
        // Sombra para Android
        elevation: 10,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 15,
        paddingBottom: 5,
    },
    title: {
        fontSize: 20,
        fontWeight: "700",
        color: colors.textDark,
    },
    closeButton: {
        width: 30,
        height: 30,
        borderRadius: 15,
        alignItems: "center",
        justifyContent: "center",
    },
    closeButtonText: {
        fontSize: 15,
        color: colors.secondary,
    },
    content: {
        paddingHorizontal: 15,
        paddingVertical: 10,
        alignItems: "center",
    },
});
