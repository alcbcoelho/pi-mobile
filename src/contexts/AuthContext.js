import { createContext, useState } from "react";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
    const [ user, setUser] = useState({ loggedIn: false });

    const login = function(email) {
        setUser({ email, loggedIn: true });
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