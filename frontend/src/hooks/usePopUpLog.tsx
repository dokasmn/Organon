import { useState, useEffect } from 'react';

const usePopUpLog = () => {
    const [showPopup, setShowPopup] = useState<boolean>(false);
    const [popupType, setPopupType] = useState<'success' | 'error'>('success');
    const [popupTitle, setPopupTitle] = useState<string>('Success');
    const [popupMessage, setPopupMessage] = useState<string>('This is a success message.');

    const handleShowSuccess = (message: string) => {
        setPopupType('success');
        setPopupTitle('Success');
        setPopupMessage(message);
        setShowPopup(true);
    };
    
    const handleShowError = (message: string) => {
        setPopupType('error');
        setPopupTitle('Error');
        setPopupMessage(message);
        setShowPopup(true);
    };

    return {
        showPopup, 
        popupType,
        popupTitle,
        popupMessage,
        handleShowSuccess,
        handleShowError,
    };
};

export default usePopUpLog;



