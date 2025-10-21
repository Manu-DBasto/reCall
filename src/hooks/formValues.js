import React, { useState } from "react";

//Aqui se pueden agregar hooks para distintos tipos de inputs en formularios

export const useTextInput = (formData = {}) => {
    const [data, setData] = useState(formData);

    const onInputChange = (input, value) => {
        setData({
            ...data,
            [input]: value,
        });
    };

    const handleDataChange = (dataName, dataValue) => {
        setData({
            ...data,
            [dataName]: dataValue,
        });
    };

    const rewriteData = (newValues) => {
        setData(newValues);
    };
    return {
        onInputChange,
        data,
        handleDataChange,
        rewriteData,
    };
};
