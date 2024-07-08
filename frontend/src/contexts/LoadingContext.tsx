import React, { createContext, useContext, useState, ReactNode } from 'react';

interface LoadingContextProps {
    showLoading: boolean;
    setShowLoading: (showLoading: boolean) => void;
}

const LoadingContext = createContext<LoadingContextProps | undefined>(undefined);

export const LoadingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [showLoading, setShowLoading] = useState<boolean>(false);

    return (
        <LoadingContext.Provider value={{ showLoading, setShowLoading }}>
            {children}
        </LoadingContext.Provider>
    );
};

export const useLoading = (): LoadingContextProps => {
    const context = useContext(LoadingContext);
    if (context === undefined) {
        throw new Error('Loading failed');
    }
    return context;
};