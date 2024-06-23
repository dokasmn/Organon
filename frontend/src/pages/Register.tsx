// import React from 'react';

// // COMPONENTS
// import Title from '../components/items/texts/Title';
// import InputDark from '../components/items/inputs/Input';
// import ButtonBigMobile from '../components/items/buttons/ButtonBigMobile';
// import Link from '../components/items/buttons/Link';
// import { useNavigate } from 'react-router-dom';

// // HOOKS
// import useForm from '../hooks/useForm';

// const Register: React.FC = () => {
//     const navigate = useNavigate();
    
//     const { formData, handleChange, handleSubmit } = useForm(
//         { name: '', email: '', password: '', confirmPassword: '' },
//         (data) => {
//             console.log(data);
//             // A requisição vai aqui
//             navigate('/login');
//         }
//     );

//     return (
//         <main className={'bg-gradient-blue-bottom h-screen px-7 flex items-center pb-0'}>
//             <form className='w-full text-white' onSubmit={handleSubmit}>
//                 <Title color="white" text="BEM VINDO!" />
//                 <section>
//                     <div className='pb-7'>
//                         <InputDark
//                             placeholder="Nome"
//                             name="name"
//                             type="text"
//                             id="name-input"
//                             value={formData.name}
//                             title="Digite um nome válido."
//                             required={true}
//                             onChange={handleChange}
//                             maxLength={80}
//                             minLength={2}
//                             style='text-white bg-blue-5-opacity border-blue-1-opacity'
//                         />
//                         <InputDark
//                             placeholder="E-mail"
//                             name="email"
//                             type="text"
//                             id="email-input"
//                             value={formData.email}
//                             title="Digite um email válido."
//                             required={true}
//                             onChange={handleChange}
//                             maxLength={254}
//                             style='text-white bg-blue-5-opacity border-blue-1-opacity'
//                         />
//                         <InputDark
//                             placeholder="Senha"
//                             name="password"
//                             type="password"
//                             id="password-input"
//                             value={formData.password}
//                             title="A senha deve conter no mínimo 8 caracteres, incluindo pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial."
//                             required={true}
//                             onChange={handleChange}
//                             maxLength={64}
//                             minLength={8}
//                             style='text-white bg-blue-5-opacity border-blue-1-opacity'
//                         />
//                         <InputDark
//                             placeholder="Confirmar senha"
//                             name="confirmPassword"
//                             type="password"
//                             id="confirmPassword-input"
//                             value={formData.confirmPassword}
//                             title="A senha deve conter no mínimo 8 caracteres, incluindo pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial."
//                             required={true}
//                             onChange={handleChange}
//                             maxLength={64}
//                             minLength={8}
//                             style='text-white bg-blue-5-opacity border-blue-1-opacity'
//                         />
//                     </div>
//                 </section>
//                 <ButtonBigMobile type="submit" text="Registrar" backgroundColor='bg-blue-3' textColor='white' hover="bg-blue-4-dark" />
//                 <p className='pt-7'>Possui uma conta? <Link to="/login" text="Logar" style="text-blue-1 hover:text-blue-1-dark" /></p>
//             </form>
//         </main>
//     );
// };

// export default Register;

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
import loginArt from '../assets/images/svg/register-art.svg';

const Register: React.FC = () => {
    const navigate = useNavigate();

    const [passwordIsValid, setPasswordIsValid] = useState<boolean>(false);
    const [emailIsvalid, setEmailIsValid] = useState<boolean>(false)
    const [emailError, setEmailError] = useState<string>('');
    const [passwordError, setPasswordError] = useState<string>('');

    const { formData, handleChange, handleSubmit } = useForm(
        { name: '', email: '', password: '', confirmPassword: '' },
        (data) => {
            console.log(data);
            // A requisição vai aqui
            if(passwordIsValid && emailIsvalid){
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
            navigate('/login');
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };

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

    useEffect(() => {
        document.body.classList.add('bg-blue-5');
        
      }, []);
    
    return (
        <div className="sm:bg-gradient-blue-bottom 2xl:flex 2xl:justify-center">
            <main className="min-h-screen px-7 relative flex justify-center items-center py-0 2xl:px-32" style={{ maxWidth: `2000px` }}>
                <img src={logo} alt="" className={'absolute w-10 top-8 right-7 '}/>
                <div className='hidden w-2/4 2xl:flex justify-center ' >
                    <img src={loginArt} alt="Your SVG" className="" />
                </div>
                <div className="text-white w-full 2xl:w-2/4 flex justify-center">
                    <form className="text-white w-full max-w-96 " onSubmit={handleSubmit}>
                        <Title color="white" text="Bem Vindo!" />
                        <section>
                            <div className="pb-7">
                                <InputDark
                                    placeholder="Nome"
                                    name="name"
                                    type="text"
                                    id="name-user"
                                    value={formData.name}
                                    required
                                    onChange={handleChange}
                                    maxLength={80}
                                    minLength={2}
                                    error={null}
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
                                    placeholder="Confirmar Senha"
                                    name="confirmPassword"
                                    type="password"
                                    id="confirm-password"
                                    value={formData.confirmPassword}
                                    required
                                    onChange={handlePasswordChange}
                                    maxLength={80}
                                    minLength={2}
                                    error={null}
                                    style='text-white bg-blue-5-opacity border-blue-1-opacity'
                                />
                            </div>
                        </section>
                        <ButtonBigMobile type="submit" text="Registrar" backgroundColor="bg-blue-3" textColor="white" hover="hover:bg-blue-2-dark"/>
                        <p className="pt-7 ">
                            Possui uma conta? <Link 
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

