// REACT
import React from 'react';

// COMPONENTS
import ButtonBigMobile from '../components/items/buttons/ButtonBigMobile';
import TitleSection from '../components/layout/TitleSection';
import Input from '../components/items/inputs/Input';
import BottomNavigationBar from '../components/layout/BottomNavigationBar.tsx';
import HorizontalLine from '../components/items/texts/HorizontalLine.tsx';
import TopNavigationBar from '../components/layout/TopNavigationBar.tsx';
import Title from '../components/items/texts/Title.tsx';

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
        <>
            <TopNavigationBar/>
            <main className='px-5 sm:px-14 md:mt-32 md:px-10 md:max-w-160' >
                <section className='pb-7 md:pb-0 ' >
                    <TitleSection title="CLOSE ACCOUNT" />
                    <div className='hidden md:block'>
                        <Title text="Conteúdos"/>
                    </div>
                    <HorizontalLine style='w-full hidden md:block'/>
                </section>
                <section>
                    <div className='p-5 bg-red-1' >
                        <p className='text-red-2 font-semibold pb-2' >ALERT</p>
                        <p className=' text-gray-1 ' >Lorem ipsum dolor, sit amet consectetur adipisicing elit. Lorem ipsum dolor sit.</p>
                    </div>
                    <HorizontalLine style='w-full'/>
                    <ButtonBigMobile 
                        text='Desativar Conta' 
                        backgroundColor='bg-blue-5' 
                        textColor='white' 
                        hover='hover:bg-blue-5-dark' 
                        type='submit'
                    />
                </section>
            </main>
            <BottomNavigationBar/>        
        </>
    )
}

export default CloseAccount;