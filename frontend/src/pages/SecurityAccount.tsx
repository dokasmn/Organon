// src/pages/SecurityAccount.tsx
import React, { useState } from 'react';

// COMPONENTS
import TitleSection from '../components/layout/TitleSection';
import BottomNavigationBar from '../components/layout/BottomNavigationBar.tsx';
import HorizontalLine from '../components/items/texts/HorizontalLine.tsx';
import Title from '../components/items/texts/Title.tsx';
import TopNavigationBar from '../components/layout/TopNavigationBar.tsx';
import Button from '../components/items/buttons/Button.tsx';
import InputIcon from '../components/items/inputs/InputIcon.tsx';
import PopUpConfirmCode from '../components/popups/PopUpConfirmCode.tsx';

// HOOKS
import useForm from '../hooks/useForm.tsx';
import { useAuth } from '../contexts/AuthContext.tsx';
import { useLoading } from '../contexts/LoadingContext.tsx';
import useRequests from '../hooks/useRequests.tsx';
import useValidateFields from '../hooks/useValidateFields.tsx';

// IMAGES
import { IoMailOutline } from "react-icons/io5";
import { PiPasswordLight } from "react-icons/pi";
import { RiLockPasswordLine } from "react-icons/ri";

// AXIOS
import axiosInstance from '../axiosConfig.ts';

const SecurityAccount: React.FC = () => {
    const { user, changeEmail } = useAuth();
    const { setShowLoading } = useLoading();
    const { showError, showUnespectedResponse, headersJsonToken } = useRequests();
    const [showConfirmCodePopup, setShowConfirmCodePopup] = useState<boolean>(false);
    const {
        validateConfirmPassword, 
        validatePassword, 
        emailError, 
        passwordError, 
        validateEmail, 
        confirmPasswordError, 
        passwordIsValid, 
        confirmPasswordIsValid
    } = useValidateFields()

    const [emailReset, setEmailReset] = useState<string>("");
    const [passwordReset, setPasswordReset] = useState<string>("");
    const [confirmPasswordReset, setConfirmPasswordReset] = useState<string>("");

    const changePassword = () => {
        let valid = true;

        if (!passwordIsValid) {
            valid = false;
        }

        if (!confirmPasswordIsValid) {
            valid = false;
        }

        if (valid) {
            sendConfirmationUpdatePassword();
        }
    }

    const updateEmail = async () => {
        setShowLoading(true);
        try {
            const response = await axiosInstance.patch(`login/user/${user.id}/`, { email: emailReset}, {
                headers: headersJsonToken,
            });
            setShowLoading(false);
            if (response.status === 200) {
                changeEmail(response.data.email);
                window.location.reload();
            } else {
                showUnespectedResponse(response);
            }
        } catch (error: any) {
            setShowLoading(false);
            showError(error);
        }
    };

    const sendConfirmationUpdatePassword = async () => {
        setShowLoading(true);
        try {
            console.log(headersJsonToken)
            const response = await axiosInstance.post(`login/user/invite_update_password_auth/`, {user_id:user.id}, {
                headers: headersJsonToken,
            });
            setShowLoading(false);
            if (response.status === 200) {
                setShowConfirmCodePopup(true);
            } else {
                showUnespectedResponse(response);
            }
        } catch (error: any) {
            setShowLoading(false);
            showError(error);
        }
    };

    const updatePassword = async (code: string, passwordReset: string): Promise<void> => {
        setShowLoading(true);
        try {
            const response = await axiosInstance.put('login/user/set_password/', {
                password: passwordReset,
                code: code,
            },{
                headers: headersJsonToken,
            });
            setShowLoading(false);
            if (response.status === 200) {
                console.log(response.data.success);
            } else {
                showUnespectedResponse(response);
            }
        } catch (error: any) {
            setShowLoading(false);
            showError(error);
        }
    };

    const handleSetUpdatedPassword = (code: string) => {
        updatePassword(code, passwordReset);
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const { value } = event.target;
        validatePassword(value);
        setPasswordReset(value);
    };

    const handleConfirmPassword = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const { value } = event.target;
        validateConfirmPassword(value, passwordReset);
        setConfirmPasswordReset(value);
    };

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const { value } = event.target;
        validateEmail(value);
        setEmailReset(value);
    };

    return (
        <div className='sm:flex justify-center'>
            {showConfirmCodePopup && (
                <PopUpConfirmCode
                    onSave={handleSetUpdatedPassword}
                    onClose={() => setShowConfirmCodePopup(false)}
                    userEmail={user.email}
                />
            )}
            <TopNavigationBar />
            <div className=''>
                <main className='px-5 xs:px-14 md:pt-40 md:px-10 max-w-160 sm:min-w-160'>
                    <section className='mb-5'>
                        <TitleSection title="SEGURANÇA DA CONTA" />
                        <div className='hidden md:block'>
                            <Title text="Account" />
                            <p className='text-gray-1 mt-2'>Ao alterar os campos abaixo, você precisará fazer login novamente para confirmar sua identidade e proteger sua conta.</p>
                        </div>
                    </section>
                    <section>
                        <HorizontalLine style='w-full mb-5' />
                        <form className='' onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
                                event.preventDefault();
                                updateEmail();
                            }
                        }>
                            <div>
                                <label htmlFor="email-reset" className='font-semibold'>Email:</label>
                                <InputIcon
                                    placeholder="E-mail"
                                    name="emailReset"
                                    type="text"
                                    id="email-reset"
                                    value={emailReset}
                                    title="Digite um e-mail válido."
                                    required={true}
                                    maxLength={254}
                                    onChange={handleEmailChange}
                                    icon={IoMailOutline}
                                    error={emailError}
                                    style='mt-5'
                                />
                            </div>
                            <Button
                                text='Mudar Email'
                                style='rounded bg-blue-5 hover:bg-blue-5-dark text-white'
                                type='submit'
                            />
                        </form>
                        <HorizontalLine style='w-full mb-5' />
                        <form onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
                                event.preventDefault();
                                changePassword();
                            }
                        }>
                            <div>
                                <label htmlFor="password-reset" className='font-semibold mb-5'>Password:</label>
                                <InputIcon
                                    placeholder="Digite uma nova senha"
                                    name="passwordReset"
                                    type="password"
                                    id="password-reset"
                                    value={passwordReset}
                                    required
                                    maxLength={64}
                                    minLength={8}
                                    error={passwordError}
                                    onChange={handlePasswordChange}
                                    icon={PiPasswordLight}
                                    style='mt-5'
                                />
                            </div>
                            <div>
                                <label htmlFor="confirm-password-reset" className='font-semibold mb-5'>Confirm Password:</label>
                                <InputIcon
                                    placeholder="Confirmar nova senha"
                                    name="confirmPasswordReset"
                                    type="password"
                                    id="confirm-password-reset"
                                    value={confirmPasswordReset}
                                    required={true}
                                    maxLength={64}
                                    minLength={8}
                                    error={confirmPasswordError}
                                    onChange={handleConfirmPassword}
                                    icon={RiLockPasswordLine}
                                    style='mt-5'
                                />
                            </div>
                            <Button
                                text='Mudar Senha'
                                style='rounded bg-blue-5 hover:bg-blue-5-dark text-white'
                                type='submit'
                            />
                        </form>
                    </section>
                </main>
                <BottomNavigationBar />
            </div>
        </div>
    );
}

export default SecurityAccount;
