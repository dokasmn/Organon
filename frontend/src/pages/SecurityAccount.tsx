// REACT
import React from 'react';

// COMPONENTS
import ButtonBigMobile from '../components/items/buttons/ButtonBigMobile';
import TitleSection from '../components/layout/TitleSection';
import Input from '../components/items/inputs/Input';
import BottomNavigationBar from '../components/layout/BottomNavigationBar.tsx';
import HorizontalLine from '../components/items/texts/HorizontalLine.tsx';
import Title from '../components/items/texts/Title.tsx';
import TopNavigationBar from '../components/layout/TopNavigationBar.tsx';
import SideBar from '../components/layout/SideBar.tsx';

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
        <section className=''>    
            <TopNavigationBar/>
            <main className='px-5 sm:px-14 md:pl-0 md:ml-10 md:w-128 ' >
                <section className='pb-7 md:pb-0' >
                    <TitleSection title="SECURITY ACCOUNT"/>
                    <div className='hidden md:block pt-20'>
                        <Title text="Account"/>
                    </div>
                </section>
                <section>
                    <p className=' text-gray-1 ' >Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
                    <HorizontalLine style='w-full'/>
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
                            backgroundColor='bg-blue-5' 
                            textColor='white' 
                            hover='bg-blue-5-dark' 
                            type='submit'
                        />
                    </form>
                    <HorizontalLine style='w-full'/>
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
                            backgroundColor='bg-blue-5' 
                            textColor='white' 
                            hover='bg-blue-5-dark' 
                            type='submit'
                        />
                    </form>
                </section>
            </main>
            <BottomNavigationBar />        
        </section>
    )
}

export default SecurityAccount;