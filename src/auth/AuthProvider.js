import { createContext, useContext, useState } from "react";

const AuthContext = createContext({
    isAuthenticated: false,
    user: {},
});

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState({});

    const StoreUser = (data) => {
        setUser(data);
        setIsAuthenticated(true);
    };

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                user,
                StoreUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
