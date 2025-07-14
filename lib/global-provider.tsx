import React, { createContext, useContext, ReactNode } from "react";

import { getCurrentUser } from "./appwrite";
import { useAppwrite } from "./useAppwrite";

// Defines the shape of the global context.
interface GlobalContextType {
    isLogged: boolean;
    user: User | null;
    loading: boolean;
    refetch: () => void;
}

// Defines the structure of the user object.
interface User {
    $id: string;
    name: string;
    email: string;
    avatar: string;
}

// Creates the React context with an initial undefined value.
const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

interface GlobalProviderProps {
    children: ReactNode;
}

// The provider component that will wrap the application.
export const GlobalProvider = ({ children }: GlobalProviderProps) => {
    // Use the custom hook to get the current user session.
    const {
        data: user,
        loading,
        refetch,
    } = useAppwrite({
        fn: getCurrentUser,
    });

    // Determine if the user is logged in by checking if the user object exists.
    const isLogged = !!user;

    return (
        <GlobalContext.Provider
            value={{
                isLogged,
                user,
                loading,
                refetch,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};

// Custom hook to easily consume the GlobalContext in any component.
export const useGlobalContext = (): GlobalContextType => {
    const context = useContext(GlobalContext);
    if (!context)
        throw new Error("useGlobalContext must be used within a GlobalProvider");

    return context;
};

export default GlobalProvider;