// REACT
import React from 'react';

// COMPONENTS
import TitleSection from '../components/layout/TitleSection';
import Input from '../components/items/inputs/Input';
import BottomNavigationBar from '../components/layout/BottomNavigationBar.tsx';
import HorizontalLine from '../components/items/texts/HorizontalLine.tsx';
import Title from '../components/items/texts/Title.tsx';
import TopNavigationBar from '../components/layout/TopNavigationBar.tsx';
import Button from '../components/items/buttons/Button.tsx';
import InputIcon from '../components/items/inputs/InputIcon.tsx';

// HOOKS
import useForm from '../hooks/useForm.tsx';
import { useAuth } from '../contexts/AuthContext.tsx';
import { useLoading } from '../contexts/LoadingContext.tsx';
import useRequests from '../hooks/useRequests.tsx';

// IMAGES
import { IoMailOutline } from "react-icons/io5";
import { PiPasswordLight } from "react-icons/pi";
import { RiLockPasswordLine } from "react-icons/ri";

// AXIOS
import axiosInstance from '../axiosConfig.ts';

const SecurityAccount:React.FC = () => {
    const { user, changeEmail } = useAuth();
    const { setShowLoading } = useLoading();
    const { showError, showUnespectedResponse, headersJsonToken } = useRequests();

    const { formData, handleChange, handleSubmit } = useForm(
        { emailReset: user.email, passwordReset: '', confirmPasswordReset:'',  },
        (data) => {
            console.log(data);
            if(data.emailReset.length > 4){
                updateEmail(data.emailReset);      
            }
        }
    );

    const updateEmail = async (emailReset: string) => {
        setShowLoading(true);
        
        try {
            const response = await axiosInstance.put(`login/user/${user.user_id}/`, {email: emailReset, username: user.username}, 
            {
                headers: headersJsonToken,
            });
            setShowLoading(false);        
            
            if (response.status === 200) {
                changeEmail(response.data.email);
                window.location.reload();
            }else{
                showUnespectedResponse(response);
            }
        } catch (error: any) {
            setShowLoading(false);
            showError(error);
        }
    };

    return (
        <div className='sm:flex justify-center' >    
            <TopNavigationBar/>
            <div className=''>
                <main className='px-5 xs:px-14 md:pt-40 md:px-10 max-w-160 sm:min-w-160'>
                    <section className='mb-5' >
                        <TitleSection title="SEGURANÇA DA CONTA"/>
                        <div className='hidden md:block'>
                            <Title text="Account"/>
                            <p className='text-gray-1 mt-2'>Ao alterar os campos abaixo, você precisará fazer login novamente para confirmar sua identidade e proteger sua conta.</p>
                        </div>
                    </section>
                    <section>
                        <HorizontalLine style='w-full mb-5'/>
                        <form className='' onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="email-reset" className='font-semibold '>Email:</label>
                                <InputIcon 
                                    placeholder="E-mail"
                                    name="emailReset"
                                    type="text"
                                    id="email-reset"
                                    value={formData.emailReset}
                                    title="Digite um e-mail válido."
                                    required={true}
                                    maxLength={254}
                                    onChange={handleChange}
                                    icon={IoMailOutline}
                                />
                            </div>
                            <Button 
                                text='Mudar Email' 
                                style='rounded bg-blue-5 hover:bg-blue-5-dark text-white '
                                type='submit'
                            />
                        </form>
                        <HorizontalLine style='w-full mb-5'/>
                        <form onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="password-reset" className='font-semibold'>Password:</label>
                                <InputIcon 
                                    placeholder="Digite uma nova senha"
                                    name="passwordReset"
                                    type="password"
                                    id="password-reset"
                                    value={formData.passwordReset}
                                    required
                                    maxLength={64}
                                    minLength={8}
                                    onChange={handleChange}
                                    icon={PiPasswordLight}
                                />
                            </div>
                            <div>
                                <label htmlFor="confirm-password-reset" className=' font-semibold ' >Confirm Password:</label>
                                <InputIcon 
                                    placeholder="Confirmar nova senha"
                                    name="confirmPasswordReset"
                                    type="password"
                                    id="confirm-password-reset"
                                    value={formData.confirmPasswordReset}
                                    required={true}
                                    maxLength={254}
                                    onChange={handleChange}
                                    icon={RiLockPasswordLine}
                                />
                            </div>
                            <Button 
                                text='Mudar Senha' 
                                style='rounded bg-blue-5 hover:bg-blue-5-dark text-white '
                                type='submit'
                            />
                        </form>
                    </section>
                </main>
                <BottomNavigationBar />
            </div>        
        </div>
    )
}

export default SecurityAccount;