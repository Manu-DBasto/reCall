import React, { useState } from "react";

//Aqui se pueden agregar hooks para distintos tipos de inputs en formularios

export const useTextInput = (formData = {}) => {
    const [data, setData] = useState(formData);

    const onInputChange = (input, value) => {
        // console.log(e);

        setData({
            ...data,
            [input]: value,
        });
    };
    return {
        onInputChange,
        data,
    };
};
