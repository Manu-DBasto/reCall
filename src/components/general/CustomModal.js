import React, { useState } from "react";
import { View, Text, Modal, StyleSheet, TouchableOpacity } from "react-native";

export default function CustomModal({ visible, onClose, title, children }) {
    return (
        <Modal
            animationType="fade" // puedes usar 'slide' o 'none'
            transparent={true} // importante para el overlay
            visible={true}
            onRequestClose={onClose} // para Android con el botón de back
            hardwareAccelerated={true}
        >
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
    // Fondo de la pantalla
    screen: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f2f2f2",
        padding: 16,
    },
    // Botón para abrir el modal
    openButton: {
        backgroundColor: "#1e90ff",
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
    },
    openButtonText: {
        color: "#fff",
        fontWeight: "600",
    },
    // Overlay que oscurece el fondo
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)", // oscurece el fondo
        justifyContent: "center",
        alignItems: "center",
    },
    // Contenedor del modal (fondo blanco)
    modalContainer: {
        width: "85%",
        maxWidth: 480,
        backgroundColor: "#ffffff", // fondo blanco del modal
        borderRadius: 12,
        paddingTop: 14,
        paddingBottom: 8,
        // Sombra para iOS
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.2,
        shadowRadius: 12,
        // Sombra para Android
        elevation: 10,
    },
    // Cabecera con título y botón de cerrar
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 14,
        paddingBottom: 6,
    },
    title: {
        fontSize: 18,
        fontWeight: "700",
        color: "#333",
    },
    closeButton: {
        width: 32,
        height: 32,
        borderRadius: 16,
        alignItems: "center",
        justifyContent: "center",
    },
    closeButtonText: {
        fontSize: 18,
        color: "#666",
    },
    // Contenido del modal
    content: {
        paddingHorizontal: 14,
        paddingVertical: 8,
    },
    paragraph: {
        fontSize: 15,
        color: "#444",
        marginBottom: 12,
    },
    // Área de acciones
    actionsRow: {
        flexDirection: "row",
        justifyContent: "flex-end",
        paddingHorizontal: 14,
        paddingTop: 6,
    },
    primaryButton: {
        backgroundColor: "#1e90ff",
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 6,
        marginLeft: 8,
    },
    primaryButtonText: {
        color: "#fff",
        fontWeight: "600",
    },
    secondaryButton: {
        backgroundColor: "#eaeef3",
        paddingVertical: 10,
        paddingHorizontal: 12,
        borderRadius: 6,
    },
    secondaryButtonText: {
        color: "#333",
        fontWeight: "600",
    },
});
