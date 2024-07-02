    // REACT
    import React, { useState, useEffect } from 'react';
    import { useNavigate } from 'react-router-dom';
    import axiosInstance from '../axiosConfig';

    // COMPONENTS
    import Title from '../components/items/texts/Title';
    import InputDark from '../components/items/inputs/Input';
    import Link from '../components/items/buttons/Link';
    import Button from '../components/items/buttons/Button';

    // HOOKS
    import useForm from '../hooks/useForm';
    import { usePopupLog } from '../components/popups/PopUpLogContext';

    // IMAGES
    import loginArt from '../assets/images/svg/login-art.svg';

    //CSS
    import "./Authentication.module.css";

    const Login: React.FC = () => {
        const navigate = useNavigate();
        const [colorCheckRememberMe, setColorCheckRememberMe] = useState<string>("gray-500");
        const { handleShowError } = usePopupLog();
        const { formData, handleChange, handleSubmit } = useForm(

            { email: '', password: '', rememberMe: false },
            (data) => {
                fetchData(data);
            }
        );

        const fetchData = async (data: { email: string, password: string }) => {
            try {
                const response = await axiosInstance.post('login/auth/login/', {
                    email: data.email,
                    password: data.password,
                });
                
                if (response.status === 200) {
                    navigate("/home");
                }else{
                    handleShowError("Resposta inesperada.")
                    console.error('Unexpected response status:', response.status);
                }
            } catch (error: any) {
                if(error.response.data){    
                    handleShowError(error.response.data.detail)
                    console.error('Error:', error.response.data.detail);
                }
                console.error('Error:', error.message);
            }
        };
        
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
                                <div className="pt-7 ">
                                    <InputDark
                                        placeholder="E-mail"
                                        name="email"
                                        type="text"
                                        id="email-input"
                                        value={formData.email}
                                        required
                                        onChange={handleChange}
                                        maxLength={254}
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
                                        style='text-white bg-blue-5-opacity border-blue-1-opacity'
                                    />
                                </div>
                                <div className="flex justify-between items-center pb-5 cursor-pointer">
                                    <Link style="hover:text-blue-1" to="#" text="Esqueceu a senha?" />
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
