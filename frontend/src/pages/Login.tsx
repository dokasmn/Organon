    // REACT
    import React, { useState, useEffect } from 'react';
    import { useNavigate } from 'react-router-dom';
    import axiosInstance from '../axiosConfig';

    // COMPONENTS
    import Title from '../components/items/texts/Title';
    import InputDark from '../components/items/inputs/Input';
    import ButtonBigMobile from '../components/items/buttons/ButtonBigMobile';
    import Link from '../components/items/buttons/Link';
    import Button from '../components/items/buttons/Button';

    // HOOKS
    import useForm from '../hooks/useForm';

    // IMAGES
    import logo from '../assets/images/logo.png'
    import loginArt from '../assets/images/svg/login-art.svg';

    //CSS
    import "./Authentication.module.css";

    const Login: React.FC = () => {
        const navigate = useNavigate();
        const [colorCheckRememberMe, setColorCheckRememberMe] = useState<string>("gray-500");
        const [emailError, setEmailError] = useState<string>('');
        const [passwordError, setPasswordError] = useState<string>('');
        const { formData, handleChange, handleSubmit } = useForm(

            { email: '', password: '', rememberMe: false },
            (data) => {
                console.log(data);
                fetchData(data);
            }
        );

        const fetchData = async (data: { email: string, password: string }) => {
            axiosInstance.post('login/auth/login/', 
                { 
                    email: data.email, 
                    password: data.password, 
                }
            )
            .then(response => {
                console.log(response.data);
                navigate("/home")
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
        
        return (
            <div className="sm:bg-gradient-blue-bottom 2xl:flex 2xl:justify-center">
                <main className="min-h-screen px-7 relative flex justify-center items-center py-0 2xl:px-32" style={{ maxWidth: `2000px` }}>
                
                    <div className='hidden w-2/4 2xl:flex justify-center ' >
                        <img src={loginArt} alt="Your SVG" className="" />
                    </div>
                    <div className="text-white w-full 2xl:w-2/4 flex justify-center">
                        <form className="text-white w-full max-w-96" onSubmit={handleSubmit}>
                            <Title color="white" text="Bem Vindo de Volta!"/>
                            <section>
                                <div className="py-7">
                                    <InputDark
                                        placeholder="E-mail"
                                        name="email"
                                        type="text"
                                        id="email-input"
                                        value={formData.email}
                                        required
                                        onChange={handleChange}
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
                                        onChange={handleChange}
                                        maxLength={64}
                                        minLength={8}
                                        error={passwordError}
                                        style='text-white bg-blue-5-opacity border-blue-1-opacity'
                                    />
                                </div>
                                <div className="flex justify-between items-center pb-5 cursor-pointer">
                                    <label className="flex gap-2 items-center cursor-pointer" htmlFor="remember-me-checkbox">
                                        <input
                                            type="checkbox"
                                            name="rememberMe"
                                            id="remember-me-checkbox"
                                            checked={formData.rememberMe}
                                            onChange={handleClickRememberMe} 
                                            className='hidden cursor-pointer'
                                        />
                                        <div className={`relative w-10 h-5 rounded-3xl transition-all duration-500 bg-${colorCheckRememberMe} flex items-center cursor-pointer`} >
                                            <div className={`cursor-pointer absolute transition-all duration-300 transform ${formData.rememberMe ? 'translate-x-full' : 'translate-x-0'} bg-white w-5 h-5 rounded-full`} >
                                            </div>
                                        </div>
                                        <span className="text-sm cursor-pointer">Lembrar de mim</span>
                                    </label>
                                    <Link style="text-sm hover:text-blue-1" to="#" text="Esqueceu a senha?" />
                                </div>
                            </section>
                            <Button 
                                type="submit" 
                                text="Logar" 
                                style='bg-blue-3 hover:bg-blue-3-dark text-white rounded my-5' />
                            <p>
                                Não possui uma conta? <Link 
                                                        to="/registrar" 
                                                        text="Registrar" 
                                                        style="text-blue-1 hover:text-blue-1-dark "
                                                    />
                            </p>
                        </form>
                    </div>
                    
                </main>
            </div>
        );
    };

    export default Login;
