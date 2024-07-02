import { useState, useEffect } from 'react';

const useValidateFields = () => {
    const [passwordIsValid, setPasswordIsValid] = useState<boolean>(false);
    const [emailIsvalid, setEmailIsValid] = useState<boolean>(false)

    const validateEmail = (email: string): boolean => {
        const emailRegex: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    };

    const validatePassword = (password: string): boolean => {
        
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
        return passwordRegex.test(password);
    };

    return {
        passwordIsValid, 
        setPasswordIsValid,
        emailIsvalid,
        setEmailIsValid,
        validateEmail,
        validatePassword,
    };
};

export default useValidateFields;



