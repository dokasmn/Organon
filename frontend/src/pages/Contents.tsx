// REACT
import React, { useState, useEffect } from 'react';
import HorizontalLine from '../components/items/texts/HorizontalLine.tsx';
import { v4 as uuidv4 } from 'uuid';

// COMPONENTS
import TitleSection from '../components/layout/TitleSection.tsx';
import ContentCrud from '../components/items/cards/ContentCrud.tsx';
import BottomNavigationBar from '../components/layout/BottomNavigationBar.tsx';
import Link from '../components/items/buttons/Link.tsx';
import Title from '../components/items/texts/Title.tsx';
import TopNavigationBar from '../components/layout/TopNavigationBar.tsx';

// HOOKS
import { usePopupLog } from '../contexts/PopUpLogContext.tsx';
import { useLoading } from '../contexts/LoadingContext.tsx';
import { useAuth } from '../contexts/AuthContext.tsx';

// AXIOS
import axiosInstance from '../axiosConfig.ts';

// UTILS
import { getImageSubject } from '../utils.ts';

interface contentInterface {
    content_name: string,
    content_subject: string,
    image: string,
}

const Contents:React.FC = () => {
    const { setShowLoading } = useLoading();
    const { handleShowError } = usePopupLog();
    const { user } = useAuth();

    const [contents, setContents] = useState<contentInterface[]>([
        {
            content_name:"", 
            content_subject:"",
            image:"",
        }
    ]);
    
    useEffect(() => {
        if(user.token){
            fetchData();
        }
    }, [user])

    const fetchData = async () => {
        try {
            const response = await axiosInstance.get(`home/content/?content_professor_user=1`, {
                headers: {
                    'Authorization': `Token ${user.token}`,
                },
            })
            setShowLoading(false);
            if (response.status === 200) {
                setContents(response.data.results)
            }else{
                handleShowError("Resposta inesperada.")
                console.error('Unexpected response status:', response.status);
            }
        } catch (error: any) {
            setShowLoading(false);
            if(error.response){    
                handleShowError(error.response.data.detail)
            }else{
                handleShowError(error.message)
            }
            console.error('Error:', error.message);
        }
    }

    return (
        <div className='sm:flex justify-center'>  
            <TopNavigationBar/>
            <div className=''>
                <main className={'px-5 xs:px-14 md:pt-40 md:px-10 max-w-160 sm:min-w-160'} >
                    <section className='pb-5 md:pb-0'>
                        <TitleSection title="CONTENTS"/>
                        <div className='hidden md:block'>
                            <Title text="Conteúdos"/>
                        </div>
                        <HorizontalLine style='w-full p-0 hidden md:block mt-5'/>
                    </section>
                    <section>
                        {contents.length > 0 ? 
                            contents.map((content) => (
                                <ContentCrud
                                    key={uuidv4()}
                                    content={content.content_name}
                                    subject={content.content_subject}
                                    image={getImageSubject(content.content_subject, "square")}
                                />
                            ))
                            :
                            <div className='pb-5' >
                                <section className='px-5 xs:px-0 mb-5 md:mb-0 md:px-0'>
                                    <TitleSection title="CONTENTS" />
                                </section>
                                <section className='bg-white-2 px-5 py-10 md:shadow-md' >
                                    <h3 className='text-xl'>Você não possui conteúdos ainda</h3>
                                </section>
                            </div>
                            
                        }
                    </section>
                    <HorizontalLine style='w-full'/>
                    <Link
                        text="Add Content"
                        style='flex justify-center md:bg-blue-5 md:text-white md:hover:bg-blue-5-dark md:shadow-md w-full text-black bg-white-2 hover:bg-white-2-dark rounded md:rounded-none font-bold py-3'
                        to='/perfil/conteudo/criar-conteudo'
                    />
                </main>
                <BottomNavigationBar/>
            </div>
        </div>
    )
}

export default Contents;