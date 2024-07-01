// REACT
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosConfig';

// COMPONENTS
import Title from '../components/items/texts/Title';
import InputDark from '../components/items/inputs/Input';
import Link from '../components/items/buttons/Link';
import Button from '../components/items/buttons/Button';
import PopUpConfirmCode from '../components/popups/PopUpConfirmCode';

// HOOKS
import useForm from '../hooks/useForm';
import useValidateFields from '../hooks/useValidateFields';

// IMAGES
import logo from '../assets/images/logo.png'
import registerArt from '../assets/images/svg/register-art.svg'

const Register: React.FC = () => {
    const navigate = useNavigate();

    const [showConfirmCodePopup, setShowConfirmCodePopup] = useState<boolean>(false);
    const [confirmEmail, setConfirmEmail] = useState<string>('');
    const {passwordIsValid, setPasswordIsValid, emailIsvalid, setEmailIsValid, validateEmail, validatePassword,} = useValidateFields();
    const [emailError, setEmailError] = useState<string>('');
    const [passwordError, setPasswordError] = useState<string>('');
    const { formData, handleChange, handleSubmit } = useForm(
        { name: '', email: '', password: '', confirmPassword: '' },
        (data) => {
            console.log(data);

            if(passwordIsValid && emailIsvalid){
                fetchData(data);
            }
        }
    );

    const fetchData = async (data: {name: string, email: string, password: string, confirmPassword: string }) => {
        axiosInstance.post('login/register/', 
            { 
                username: data.name, 
                email:data.email,
                password: data.password,
                re_password: data.password,
            }
        ).then(response => {
            // Armazena o token de acesso da auth no cache do navegador
            // localStorage.setItem('access_token', response.data.access); 

            // Armazena o token de atualização, para quando o primeiro expirar
            // localStorage.setItem('refresh_token', response.data.refresh); 
            
            if(response.status == 201){
                setShowConfirmCodePopup(true);
                let email = response.data["email"]
                setConfirmEmail(email);

            }else{
                return
            }
        }).catch(error => {
            console.error('Error:', error);
        });
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

    const confirmData = async (data: { email: string, confirmationCode: string }) => {
        axiosInstance.post('login/confirm-email/', 
            { 
                email: data.email, 
                confirmation_code: data.confirmationCode, 
            }
        )
        .then(response => {
            if(response.status == 200){
                navigate('/login')
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };

    const handleSaveConfirmCode = (code: string): void => {
        console.log(confirmEmail)
        console.log(code)
        confirmData({email: confirmEmail, confirmationCode:code})
    }
    
    return (
        <div className="sm:bg-gradient-blue-bottom 2xl:flex 2xl:justify-center">
            {
                showConfirmCodePopup && (
                    <PopUpConfirmCode
                        onSave={handleSaveConfirmCode}
                        onClose={() => setShowConfirmCodePopup(false)}
                    />
                )
            }
            
            <main className="min-h-screen px-7 relative flex justify-center items-center py-0 2xl:px-32" style={{ maxWidth: `2000px` }}>
                <div className='hidden w-2/4 2xl:flex justify-center ' >
                    <img src={registerArt} alt="Arte da página de registro"/>
                </div>
                <div className="text-white w-full 2xl:w-2/4 flex justify-center">
                    <form className="text-white w-full max-w-96" onSubmit={handleSubmit}>
                        <Title color="white" text="Bem Vindo!"/>
                        <section>
                            <div className="py-7">
                                <InputDark
                                    placeholder="Nome"
                                    name="name"
                                    type="text"
                                    id="name-input"
                                    onChange={handleChange}
                                    value={formData.name}
                                    required
                                    maxLength={254}
                                    style='text-white bg-blue-5-opacity border-blue-1-opacity'
                                />
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
                                <InputDark
                                    placeholder="Confirmar senha"
                                    name="confirmPassword"
                                    type="password"
                                    id="confirmPassword-input"
                                    value={formData.confirmPassword}
                                    required
                                    onChange={handleChange}
                                    maxLength={64}
                                    minLength={8}
                                    style='text-white bg-blue-5-opacity border-blue-1-opacity'
                                />
                            </div>                            
                        </section>

                        <Button 
                            type="submit" 
                            text="Registrar" 
                            style='bg-blue-3 hover:bg-blue-3-dark text-white rounded mb-5'
                        />

                        <p>
                            Já possui uma conta? <Link 
                                                    to="/login" 
                                                    text="Logar" 
                                                    style="text-blue-1 hover:text-blue-1-dark "
                                                />
                        </p>
                    </form>
                </div>
                
            </main>
        </div>
    );
};

export default Register;


