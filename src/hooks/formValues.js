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
        console.log(dataName, dataValue);

        setData({
            ...data,
            [dataName]: dataValue,
        });
    };
    return {
        onInputChange,
        data,
        handleDataChange,
    };
};
