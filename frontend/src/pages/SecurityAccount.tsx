// REACT
import React from 'react';

// COMPONENTS
import TitleSection from '../components/layout/TitleSection';
import Input from '../components/items/inputs/Input';
import BottomNavigationBar from '../components/layout/BottomNavigationBar.tsx';
import HorizontalLine from '../components/items/texts/HorizontalLine.tsx';
import Title from '../components/items/texts/Title.tsx';
import TopNavigationBar from '../components/layout/TopNavigationBar.tsx';
import SideBar from '../components/layout/SideBar.tsx';
import Button from '../components/items/buttons/Button.tsx';

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
        <div className='sm:flex justify-center' >    
            <TopNavigationBar/>
            {/* sm:flex w-full max-w-7xl */}
            <div className=''>
                <main className='px-5 xs:px-14 md:pt-40 md:px-10 max-w-160 sm:min-w-160'>
                    <section className='mb-5' >
                        <TitleSection title="SEGURANÇA DA CONTA"/>
                        <div className='hidden md:block'>
                            <Title text="Account"/>
                            <p className='text-gray-1 mt-2'>A alteração de qualquer dado pessoal exige uma verificação de dois fatores.</p>
                        </div>
                    </section>
                    <section>
                        <HorizontalLine style='w-full'/>
                        <form className='' onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="email-input-reset" className='font-semibold'>Email</label>
                                <Input 
                                    placeholder="E-mail"
                                    name="email-input-reset"
                                    type="text"
                                    id="email-input-reset"
                                    value={"daniellimafreita@gmail.com"}
                                    title="Digite um e-mail válido."
                                    required={true}
                                    maxLength={254}
                                    style='text-black bg-white my-5'
                                    onChange={handleChange}
                                />
                            </div>
                            <Button 
                                text='Mudar Email' 
                                style='rounded bg-blue-5 hover:bg-blue-5-dark text-white '
                                type='submit'
                            />
                        </form>
                        <HorizontalLine style='w-full'/>
                        <form onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="email-input-reset" className=' font-semibold ' >Password</label>
                                <Input 
                                    placeholder="Digite uma nova senha"
                                    name="senha-input-reset"
                                    type="password"
                                    id="senha-input-reset"
                                    value={""}
                                    required
                                    maxLength={64}
                                    minLength={8}
                                    style=' my-5 bg-white'
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
                                    style='my-5 bg-white'
                                    onChange={handleChange}
                                />
                            </div>
                            <Button 
                                text='Mudar Email' 
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