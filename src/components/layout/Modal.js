import React, { useMemo, useRef, useCallback } from "react";
import { View, Text, Button, StyleSheet, SafeAreaView } from "react-native";
import BottomSheet from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const BottomSheetExample = () => {
    // Referencia al BottomSheet
    const sheetRef = useRef(null);

    // Altura del sheet cuando está desplegado
    const snapPoints = useMemo(() => ["25%", "50%"], []);

    // Función para abrir el bottom sheet
    const openSheet = useCallback(() => {
        sheetRef.current?.expand();
    }, []);

    // Función para cerrar (opcional)
    const closeSheet = useCallback(() => {
        sheetRef.current?.close();
    }, []);

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaView style={styles.container}>
                <View style={styles.content}>
                    <Text style={styles.title}>Demo de Bottom Sheet</Text>
                    <Button title="Abrir Bottom Sheet" onPress={openSheet} />
                </View>

                <BottomSheet
                    ref={sheetRef}
                    index={-1} // cerrado inicialmente
                    snapPoints={snapPoints}
                    enablePanDownToClose
                    style={styles.sheet}
                >
                    <View style={styles.sheetContent}>
                        <Text style={styles.sheetText}>Hola</Text>
                        <Button title="Cerrar" onPress={closeSheet} />
                    </View>
                </BottomSheet>
            </SafeAreaView>
        </GestureHandlerRootView>
    );
};

export default BottomSheetExample;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        padding: 16,
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
    },
    title: {
        fontSize: 20,
        marginBottom: 12,
    },
    sheet: {
        // Puedes personalizar la apariencia del wrapper del sheet
    },
    sheetContent: {
        padding: 24,
        alignItems: "center",
    },
    sheetText: {
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 12,
    },
});
