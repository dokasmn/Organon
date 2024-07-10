// REACT
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosConfig';

// COMPONENTS
import Title from '../components/items/texts/Title';
import InputDark from '../components/items/inputs/Input';
import Link from '../components/items/buttons/Link';
import Button from '../components/items/buttons/Button';
import PopUpConfirmCode from '../components/popups/PopUpConfirmCode';
import ComboBox from '../components/items/inputs/ComboBox';

// HOOKS
import useForm from '../hooks/useForm';
import useValidateFields from '../hooks/useValidateFields';
import { usePopupLog } from '../contexts/PopUpLogContext';
import { useAuth } from '../contexts/AuthContext';
import { useLoading } from '../contexts/LoadingContext';

// IMAGES
import registerArt from '../assets/images/svg/register-art.svg';

// UTILS
import { states } from '../utils';

const Register: React.FC = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const { handleShowError } = usePopupLog();
    const {showLoading, setShowLoading} = useLoading();
    const [showConfirmCodePopup, setShowConfirmCodePopup] = useState<boolean>(false);
    const [confirmEmail, setConfirmEmail] = useState<string>('');

    const {
        passwordIsValid,
        passwordError,
        emailError,
        emailIsvalid,
        validateEmail,
        validatePassword,
        confirmPasswordError,
        validateConfirmPassword
    } = useValidateFields();

    const { formData, handleChange, handleSubmit, handleChangeSelect } = useForm(
        { name: '', email: '', password: '', confirmPassword: '', state:'', school:'' },
        async (data) => {
            if (passwordIsValid && emailIsvalid) {
                await fetchData(data);
            }
        }
    );

    const fetchData = async (data: { name: string, email: string, password: string, confirmPassword: string, state: string, school: string }) => {
        setShowLoading(true);
        try {
            const response = await axiosInstance.post('login/user/register/', {
                username: data.name,
                email: data.email,
                password: data.password,
                re_password: data.confirmPassword,
                state: data.state,
                school: data.school
            });
            setShowLoading(false);
            setConfirmEmail(data.email);

            if (response.status === 201) {
                setShowConfirmCodePopup(true);
                setConfirmEmail(data.email);
            }
        } catch (error: any) {
            setShowLoading(false);
            if (error.response && error.response.data) {
                handleShowError(error.response.data.detail);
            } else {
                handleShowError(error.message);
            }
            console.error('Error:', error.message);
        }
    };

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        validateEmail(value);
        handleChange(event);
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        validatePassword(value);
        handleChange(event);
    };

    const handleConfirmPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        validateConfirmPassword(value, formData.password);
        handleChange(event);
    };

    const confirmData = async (data: { email: string, confirmationCode: string }): Promise<void> => {
        try {
            const response = await axiosInstance.post('login/user/confirm_email/', {
                email: data.email,
                confirmation_code: data.confirmationCode,
            });

            if (response.status === 200) {
                login(response.data);                
                navigate('/home');
            } else {
                handleShowError("Resposta inesperada.");
                console.error('Unexpected response status:', response.status);
            }
        } catch (error: any) {
            if (error.response && error.response.data) {
                handleShowError(error.response.data);
            }
            handleShowError(error.message);
            console.error('Error:', error.message);
        }
    };

    const handleSaveConfirmCode = (code: string): void => {
        confirmData({ email: confirmEmail, confirmationCode: code });
    };

    return (
        <div className="bg-blue-5 sm:bg-gradient-blue-bottom 2xl:flex 2xl:justify-center">
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
                        <Title color="white" text="Bem Vindo!" />
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
                                    maxLength={40}
                                    style='text-white bg-blue-5-opacity border-blue-1-opacity'
                                />
                                <InputDark
                                    placeholder="E-mail"
                                    name="email"
                                    type="text"
                                    id="email"
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
                                    onChange={handleConfirmPassword}
                                    maxLength={64}
                                    minLength={8}
                                    error={confirmPasswordError}
                                    style='text-white bg-blue-5-opacity border-blue-1-opacity'
                                />
                                <div className='md:flex gap-5' >        
                                    <ComboBox
                                        name="state"
                                        id="state"
                                        value={formData.state}
                                        required
                                        onChange={handleChangeSelect}
                                        style='text-white bg-blue-5-opacity border-blue-1-opacity mb-5 border focus:border-blue-1 '
                                        styleOption='bg-white text-black rounded-none border-none outline-none'
                                        defaultOption="Estado"
                                        list={states}
                                    />
                                    <InputDark
                                        placeholder="Escola"
                                        name="school"
                                        type="text"
                                        id="school"
                                        value={formData.school}
                                        required
                                        onChange={handleChange}
                                        maxLength={100}
                                        minLength={2}
                                        style='text-white bg-blue-5-opacity border-blue-1-opacity'
                                    />
                                </div>
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
