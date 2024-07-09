// REACT
import React from 'react';

// COMPONENTS
import TitleSection from '../components/layout/TitleSection';
import BottomNavigationBar from '../components/layout/BottomNavigationBar.tsx';
import HorizontalLine from '../components/items/texts/HorizontalLine.tsx';
import TopNavigationBar from '../components/layout/TopNavigationBar.tsx';
import Title from '../components/items/texts/Title.tsx';
import Button from '../components/items/buttons/Button.tsx';

// HOOKS
import useForm from '../hooks/useForm.tsx';

const CloseAccount:React.FC = () => {

    // const { formData, handleChange, handleSubmit, resetForm } = useForm(
    //     { email: '', password: '', rememberMe: false },
    //     (data) => {
    //         console.log(data);
    //         // A requisição vai aqui
    //     }
    // );

    return (
        <div className='sm:flex justify-center'>
            <TopNavigationBar/>
            {/* sm:flex w-full max-w-7xl */}
            <div className=''>
                <main className='px-5 xs:px-14 md:pt-40 md:px-10 max-w-160 sm:min-w-160' >
                    <section className='pb-5 md:pb-0 ' >
                        <TitleSection title="FECHAR CONTA" />
                        <div className='hidden md:block mb-5'>
                            <Title text="Conteúdos"/>
                        </div>
                        <HorizontalLine style='w-full hidden md:block'/>
                    </section>
                    <section>
                        <div className='p-5 bg-red-100 md:shadow-md mb-5' >
                            <p className='text-red-2 font-semibold pb-2' >ALERT</p>
                            <p className=' text-gray-1 ' >Lorem ipsum dolor, sit amet consectetur adipisicing elit. Lorem ipsum dolor sit.</p>
                        </div>
                        <HorizontalLine style='w-full'/>
                        <Button 
                            text='Desativar Conta'
                            
                        />
                    </section>
                </main>
                <BottomNavigationBar/>   
            </div>     
        </div>
    )
}

export default CloseAccount;