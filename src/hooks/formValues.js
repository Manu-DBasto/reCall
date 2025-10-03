import React, { useState } from "react";

export const useTextInput = (formData = {}) => {
    const [data, setData] = useState(formData);

    const onInputChange = (e) => {
        // console.log(e);

        setData({
            ...data,
            [e.target.id]: e.nativeEvent.text,
        });
    };
    return {
        onInputChange,
        data,
    };
};
