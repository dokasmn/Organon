// REACT
import React from 'react';
import { useNavigate } from 'react-router-dom';

// COMPONENTS
import TitleSection from '../components/layout/TitleSection';
import BottomNavigationBar from '../components/layout/BottomNavigationBar.tsx';
import HorizontalLine from '../components/items/texts/HorizontalLine.tsx';
import TopNavigationBar from '../components/layout/TopNavigationBar.tsx';
import Title from '../components/items/texts/Title.tsx';
import Button from '../components/items/buttons/Button.tsx';

// AXIOS
import axiosInstance from '../axiosConfig.ts';

// HOOKS
import useRequests from '../hooks/useRequests.tsx';

const CloseAccount:React.FC = () => {
    let navigate = useNavigate(); 

    const { showError, showUnespectedResponse, headersJsonToken } = useRequests();

    const fetchDataCloseAccount = async () => {
        try {
          const response = await axiosInstance.post('login/user/close_account/', {}, {
            headers: headersJsonToken,
          });
          if (response.status === 200) {
            navigate("/login")
          }else{
            showUnespectedResponse(response);
          }
        } catch (error: any) {
          showError(error);
        }
      };

    return (
        <div className='sm:flex justify-center'>
            <TopNavigationBar/>
            <div className=''>
                <main className='px-5 xs:px-14 md:pt-40 md:px-10 max-w-160 sm:min-w-160' >
                    <section className='pb-5 md:pb-0 ' >
                        <TitleSection title="FECHAR CONTA" />
                        <div className='hidden md:block mb-5'>
                            <Title text="Conteúdos"/>
                        </div>
                        <HorizontalLine style='w-full hidden md:block mb-5'/>
                    </section>
                    <section>
                        <div className='p-5 bg-red-100 md:shadow-md mb-5' >
                            <p className='text-red-2 font-semibold pb-2' >Alerta</p>
                            <p className=' text-gray-1 ' >A sua conta será desativada permanentemente.</p>
                        </div>
                        <HorizontalLine style='w-full mb-5'/>
                        <Button 
                            text='Desativar Conta'
                            onClick={() => {fetchDataCloseAccount()}}
                        />
                    </section>
                </main>
                <BottomNavigationBar/>   
            </div>     
        </div>
    )
}

export default CloseAccount;