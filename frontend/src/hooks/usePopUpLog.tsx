import { useState, useEffect } from 'react';

const usePopUpLog = () => {
    const [showPopup, setShowPopup] = useState<boolean>(false);
    const [popupType, setPopupType] = useState<'success' | 'error'>('success');
    const [popupTitle, setPopupTitle] = useState<string>('Success');
    const [popupMessage, setPopupMessage] = useState<string>('This is a success message.');

    const handleShowSuccess = () => {
        setPopupType('success');
        setPopupTitle('Success');
        setPopupMessage('This is a success message.');
        setShowPopup(true);
    };
    
    const handleShowError = () => {
        setPopupType('error');
        setPopupTitle('Error');
        setPopupMessage('This is an error message.');
        setShowPopup(true);
    };

    return {
        showPopup, 
        setShowPopup,
        popupType,
        popupTitle,
        popupMessage,
    };
};

export default usePopUpLog;



