import React, { useState } from "react";

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
