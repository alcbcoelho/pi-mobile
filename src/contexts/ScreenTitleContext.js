import { createContext, useState } from "react";

export const ScreenTitleContext = createContext();

export default function ScreenTitleProvider({ children }) {
    const [title, setTitle] = useState("");

    return (
        <ScreenTitleContext.Provider value={{title, setTitle}}>
            {children}
        </ScreenTitleContext.Provider>
    )
}