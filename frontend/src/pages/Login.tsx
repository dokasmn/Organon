// REACT
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import axiosInstance from '../axiosConfig';
import CryptoJS from 'crypto-js';

// COMPONENTS
import Title from '../components/items/texts/Title';
import InputDark from '../components/items/inputs/Input';
import ButtonBigMobile from '../components/items/buttons/ButtonBigMobile';
import Link from '../components/items/buttons/Link';

// HOOKS
import useForm from '../hooks/useForm';

// IMAGES
import logo from '../assets/images/logo.png'

const Login: React.FC = () => {
    const navigate = useNavigate();

    const [passwordIsValid, setPasswordIsValid] = useState<boolean>(false);
    const [emailIsvalid, setEmailIsValid] = useState<boolean>(false)
    const [colorCheckRememberMe, setColorCheckRememberMe] = useState<string>("gray-500");
    const [emailError, setEmailError] = useState<string>('');
    const [passwordError, setPasswordError] = useState<string>('');
    
    const { formData, handleChange, handleSubmit, resetForm } = useForm(
        { email: '', password: '', rememberMe: false },
        (data) => {
            console.log(data);

            // A requisição vai aqui
            if(passwordIsValid){
                fetchData(data);
            }
        }
    );

    const fetchData = async (data: { email: string, password: string }) => {

        const hashedPassword = CryptoJS.SHA256(data.password).toString();
        
        axiosInstance.post('login/api/token/', 
            { 
                username: data.email, 
                password: hashedPassword, 
            }
        )
        .then(response => {
            console.log('Success:', response.data);
            navigate("/home")

            localStorage.setItem('access_token', response.data.access);
            localStorage.setItem('refresh_token', response.data.refresh);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };

    const handleClickRememberMe = () => {
        handleChange({
            target: {
                name: 'rememberMe',
                value: !formData.rememberMe,
            },
        } as React.ChangeEvent<HTMLInputElement>);
    };

    useEffect(() => {
        if(formData.rememberMe){
            setColorCheckRememberMe("blue-1")
        }else{
            setColorCheckRememberMe("gray-500")
        }
    }, [formData.rememberMe]);

    const validateEmail = (email: string): boolean => {
        const emailRegex: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    };

    const validatePassword = (password: string): boolean => {
        
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
        return passwordRegex.test(password);
    };

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        handleChange(event);

        if (!validateEmail(value)) {
            setEmailError('Por favor, insira um e-mail válido.');
            setEmailIsValid(false);
        } else {
            setEmailIsValid(true);
            setEmailError('');
        }
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        handleChange(event);

        if (!validatePassword(value)) {
            setPasswordError('A senha deve conter no mínimo 8 caracteres, incluindo pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial.');
            setPasswordIsValid(false);
        } else {
            setPasswordError('');
            setPasswordIsValid(true);
        }
    };
    
    return (
        <main className="bg-gradient-blue-bottom h-screen px-7 flex justify-center items-center pb-0 pt-0">
            <form className="w-full text-white relative" onSubmit={handleSubmit}>
                <img src={logo} alt="" className={'absolute w-10 -top-20 right-0 '} />
                <Title color="white" text="BEM VINDO DE VOLTA!" />
                <section>
                    <div className="pb-7">
                    <InputDark
                        placeholder="E-mail"
                        name="email"
                        type="text"
                        id="email-input"
                        value={formData.email}
                        required
                        onChange={handleEmailChange}
                        maxLength={254}
                        error={emailError}
                        style='text-white bg-blue-5-opacity border-blue-1-opacity'
                    />
                    <InputDark
                        placeholder="Senha"
                        name="password"
                        type="password"
                        id="password-input"
                        value={formData.password}
                        required
                        onChange={handlePasswordChange}
                        maxLength={64}
                        minLength={8}
                        error={passwordError}
                        style='text-white bg-blue-5-opacity border-blue-1-opacity'
                    />
                    </div>
                    <div className="flex justify-between items-center pb-10">
                        <label className="flex gap-2 items-center" htmlFor="remember-me-checkbox">
                            <input
                                type="checkbox"
                                name="rememberMe"
                                id="remember-me-checkbox"
                                checked={formData.rememberMe}
                                onChange={handleClickRememberMe} 
                                className='hidden'
                            />
                            <div className={`relative w-10 h-5 rounded-3xl transition-all duration-500 bg-${colorCheckRememberMe} flex items-center`} >
                                <div className={`absolute transition-all duration-300 transform ${formData.rememberMe ? 'translate-x-full' : 'translate-x-0'} bg-white w-5 h-5 rounded-full`} >
                                </div>
                            </div>
                            <span className="text-sm">Lembrar de mim</span>
                        </label>
                        <Link style="text-sm hover:text-blue-1" to="#" text="Esqueceu a senha?" />
                    </div>
                </section>
                <ButtonBigMobile type="submit" text="Logar" backgroundColor="blue-3" textColor="white" hover="blue-4-dark"/>
                <p className="pt-7">
                    Não possui uma conta? <Link 
                                            to="/register" 
                                            text="Registrar" 
                                            style="text-blue-1 hover:text-blue-1-dark"
                                        />
                </p>
            </form>
        </main>
    );
};

export default Login;
