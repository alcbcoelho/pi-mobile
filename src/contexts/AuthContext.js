import { createContext, useContext, useState } from "react";
import { DataMockupContext } from "./DataMockupContext";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
    const { userData } = useContext(DataMockupContext);
    
    const [user, setUser] = useState({ loggedIn: false });

    const login = function(email) {
        const id = userData[userData.findIndex(user => user.email === email)].id;

        setUser({ id, email, loggedIn: true });
    }

    const logout = function() {
        setUser({ loggedIn: false });
    }

    const context = {
        user,
        login,
        logout
    }

    return (
        <AuthContext.Provider value={context}>
            {children}
        </AuthContext.Provider>
    )
}