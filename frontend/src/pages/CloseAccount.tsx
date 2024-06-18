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

const CloseAccount:React.FC = () => {

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
                    <TitleSection title="CLOSE ACCOUNT" />
                </section>
                <section>
                    <div className='p-5 bg-red-1' >
                        <p className='text-red-2 font-semibold pb-2' >ALERT</p>
                        <p className=' text-gray-1 ' >Lorem ipsum dolor, sit amet consectetur adipisicing elit. Lorem ipsum dolor sit.</p>
                    </div>
                    <HorizontalLine width='w-full'/>
                    <ButtonBigMobile 
                        text='Desativar Conta' 
                        backgroundColor='blue-5' 
                        textColor='white' 
                        hover='blue-5-dark' 
                        type='submit'
                    />
                </section>
            </main>
            <BottomNavigationBar/>        
        </>
    )
}

export default CloseAccount;