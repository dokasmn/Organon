// REACT
import React from 'react';

// COMPONENTS
import ButtonBigMobile from '../components/items/buttons/ButtonBigMobile';
import TitleSection from '../components/layout/TitleSection';
import Input from '../components/items/inputs/Input';
import BottomNavigationBar from '../components/layout/BottomNavigationBar.tsx';
import HorizontalLine from '../components/items/texts/HorizontalLine.tsx';

// HOOKS
import useForm from '../hooks/useForm.tsx';

const SecurityAccount:React.FC = () => {

    const { formData, handleChange, handleSubmit, resetForm } = useForm(
        { email: '', password: '', rememberMe: false },
        (data) => {
            console.log(data);
            // A requisição vai aqui
        }
    );

    return (
        <>
            <main className='px-5' >
                <section className='pb-7' >
                    <TitleSection title="SECURITY ACCOUNT" />
                </section>
                <section>
                    <section>
                        <p className=' text-gray-1 ' >Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
                    </section>
                    <HorizontalLine width='w-full'/>
                    <form className='flex flex-col gap-2' onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="email-input-reset" className=' font-semibold '  >Email</label>
                            <Input 
                                placeholder="E-mail"
                                name="email-input-reset"
                                type="text"
                                id="email-input-reset"
                                value={"daniellimafreita@gmail.com"}
                                title="Digite um e-mail válido."
                                required={true}
                                maxLength={254}
                                style='text-black bg-white'
                                onChange={handleChange}
                            />
                        </div>
                        <ButtonBigMobile 
                            text='Mudar Email' 
                            backgroundColor='blue-5' 
                            textColor='white' 
                            hover='blue-5-dark' 
                            type='submit'
                        />
                    </form>
                    <HorizontalLine width='w-full'/>
                    <form className='flex flex-col gap-2' onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="email-input-reset" className=' font-semibold '  >Password</label>
                            <Input 
                                placeholder="Digite uma nova senha"
                                name="senha-input-reset"
                                type="password"
                                id="senha-input-reset"
                                value={""}
                                required
                                maxLength={64}
                                minLength={8}
                                style='text-black bg-white'
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="email-input-reset" className=' font-semibold ' >Confirm Password</label>
                            <Input 
                                placeholder="Confirmar nova senha"
                                name="confirm-password-input-reset"
                                type="password"
                                id="confirm-password-input-reset"
                                value={""}
                                required={true}
                                maxLength={254}
                                style='text-black bg-white'
                                onChange={handleChange}
                            />
                        </div>
                        <ButtonBigMobile 
                            text='Mudar Senha' 
                            backgroundColor='blue-5' 
                            textColor='white' 
                            hover='blue-5-dark' 
                            type='submit'
                        />
                    </form>
                </section>
            </main>
            <BottomNavigationBar/>        
        </>
    )
}

export default SecurityAccount;