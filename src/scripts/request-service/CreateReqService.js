import React from "react";
import { doc, setDoc, addDoc, collection } from "firebase/firestore";
import { db } from "../database";

export async function CreateReqService(data) {
    try {
        const docRef = await addDoc(collection(db, "serviceRequest"), data);
        return {
            success: true,
            id: docRef.id,
            data: data,
            message: "Service request created successfully",
        };
    } catch (error) {
        console.error("Error creating service request:", error);
        throw error;
    }
}
