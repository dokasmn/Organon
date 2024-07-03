import React, { createContext, useContext, useState, ReactNode } from 'react';

interface PopupLogContextProps {
    showPopup: boolean;
    popupType: string;
    popupTitle: string;
    popupMessage: string;
    handleShowSuccess: (message: string) => void;
    handleShowError: (message: string) => void;
    handleClosePopup: () => void;
}

const PopupLogContext = createContext<PopupLogContextProps | undefined>(undefined);

export const PopupLogProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [showPopup, setShowPopup] = useState<boolean>(false);
    const [popupType, setPopupType] = useState<string>('');
    const [popupTitle, setPopupTitle] = useState<string>('');
    const [popupMessage, setPopupMessage] = useState<string>('');

    const handleShowSuccess = (message: string) => {
        setShowPopup(true);
        setPopupType('success');
        setPopupTitle('Success');
        setPopupMessage(message);
    };

    const handleShowError = (message: string) => {
        setShowPopup(true);
        setPopupType('error');
        setPopupTitle('Error');
        setPopupMessage(message);
    };

    const handleClosePopup = () => {
        setShowPopup(false);
        setPopupType('');
        setPopupTitle('');
        setPopupMessage('');
    };

    return (
        <PopupLogContext.Provider value={{ showPopup, popupType, popupTitle, popupMessage, handleShowSuccess, handleShowError, handleClosePopup }}>
            {children}
        </PopupLogContext.Provider>
    );
};

export const usePopupLog = (): PopupLogContextProps => {
    const context = useContext(PopupLogContext);
    if (context === undefined) {
        throw new Error('usePopupLog must be used within a PopupLogProvider');
    }
    return context;
};