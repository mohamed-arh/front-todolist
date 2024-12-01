import { createContext, useContext } from "react";

const AppContext = createContext();

export default AppContext;

export function useAppContext() {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error(`useAppContext must be used within a AppContext Provider`);
    }
    return context;
}