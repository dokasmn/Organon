import { useState, useEffect } from 'react';

const useValidateFields = () => {
    const [passwordIsValid, setPasswordIsValid] = useState<boolean>(false);
    const [emailIsvalid, setEmailIsValid] = useState<boolean>(false)
    const [confirmPasswordIsValid, setconfirmPasswordIsValid] = useState<boolean>(false);
    const [emailError, setEmailError] = useState<string>('');
    const [passwordError, setPasswordError] = useState<string>('');
    const [confirmPasswordError, setconfirmPasswordError] = useState<string>('');

    const validateEmail = (email: string) => {
        const emailRegex: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        
        let regex = emailRegex.test(email);

        if (!regex) {
            setEmailError('Por favor, insira um e-mail válido.');
            setEmailIsValid(false);
        } else {
            setEmailIsValid(true);
            setEmailError('');
        }
    };

    const validatePassword = (password: string) => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
        let regex = passwordRegex.test(password);

        if (!regex) {
            setPasswordError('A senha deve conter no mínimo 8 caracteres, incluindo pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial.');
            setPasswordIsValid(false);
        } else {
            setPasswordError('');
            setPasswordIsValid(true);
        }
    };

    const validateConfirmPassword = (password: string, confirmPassowrd: string) => {
        if(password === confirmPassowrd){
            setconfirmPasswordIsValid(true);
            setconfirmPasswordError('')
        }else{
            setconfirmPasswordIsValid(false);
            setconfirmPasswordError("A confirmação da senha não confere")
        }
    };

    return {
        passwordIsValid, 
        setPasswordIsValid,
        emailIsvalid,
        setEmailIsValid,
        validateEmail,
        validatePassword,
        validateConfirmPassword,
        passwordError,
        emailError,
        confirmPasswordIsValid,
        confirmPasswordError
    };
};

export default useValidateFields;



