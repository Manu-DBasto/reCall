import React from "react";
import {
    collection,
    addDoc,
    getDocs,
    updateDoc,
    deleteDoc,
    doc,
    query,
} from "firebase/firestore";
import { db } from "../database";

export async function getEmployees() {
    const data = await getDocs(query(collection(db, "empleados")));
    const empleadosData = data.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));
    return empleadosData;
}
