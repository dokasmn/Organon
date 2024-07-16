import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import HorizontalLine from '../components/items/texts/HorizontalLine';
import TitleSection from '../components/layout/TitleSection';
import ContentCrud from '../components/items/cards/ContentCrud';
import BottomNavigationBar from '../components/layout/BottomNavigationBar';
import TopNavigationBar from '../components/layout/TopNavigationBar';
import { usePopupLog } from '../contexts/PopUpLogContext';
import { useLoading } from '../contexts/LoadingContext';
import { useAuth } from '../contexts/AuthContext';
import axiosInstance from '../axiosConfig';
import { getImageSubject } from '../utils';
import Link from '../components/items/buttons/Link.tsx';
import Title from '../components/items/texts/Title.tsx';
import PopUpEditContent from '../components/popups/PopUpEditContent.tsx';

interface ContentInterface {
    content_id: string,
    content_name: string;
    content_subject: string;
    image: string | null;
}

const Contents: React.FC = () => {
    const { setShowLoading } = useLoading();
    const { handleShowError } = usePopupLog();
    const { user } = useAuth();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get('search') ?? '';
    const [showEditContent, setShowEditContent] = useState<{id:string, visibility:boolean}>({id:"0", visibility:false});  

    const [contents, setContents] = useState<ContentInterface[]>([]);

    useEffect(() => {
        if (user.token) {
            fetchData();
        }
    }, [user, query]);

    const fetchData = async () => {
        setShowLoading(true);
        try {
            const response = await axiosInstance.get(`home/content/?search=${query}&content_professor_user__professor_auth_user__email=${user.email}`, {
                headers: {
                    Authorization: `Token ${user.token}`,
                },
            });
            setShowLoading(false);
            if (response.status === 200) {
                setContents(response.data.results);
            } else {
                handleShowError("Resposta inesperada.");
                console.error('Unexpected response status:', response.status);
            }
        } catch (error) {
            setShowLoading(false);
            handleShowError("Erro inesperado ao buscar os conteúdos.");
            console.error('Error fetching contents:', error);
        }
    };

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
                        <HorizontalLine style='w-full p-0 hidden md:block my-5'/>
                    </section>
                    <section>
                        {contents.length > 0 && contents[0].content_name !== "default" ? 
                            contents.map((content, index) => (
                                <div key={content.content_id} className='relative'>
                                    <ContentCrud
                                        content={content.content_name}
                                        subject={content.content_subject}
                                        image={getImageSubject(content.content_subject, "square") || ''}
                                        onClick={() => {setShowEditContent({id: content.content_id, visibility: true})}} 
                                    />
                                    {content.content_id === showEditContent.id && showEditContent.visibility && 
                                        <PopUpEditContent
                                            contentId={showEditContent.id}
                                            onClose={() => {setShowEditContent({id: showEditContent.id, visibility: false})}}
                                        />
                                    }
                                </div>
                            ))
                            :
                            <div className='pb-5'>
                                <section className='px-5 xs:px-0 mb-5 md:mb-0 md:px-0'>
                                    <TitleSection title="CONTENTS" />
                                </section>
                                <section className='bg-white-2 px-5 py-10 md:shadow-md'>
                                    <h3 className='text-xl'>Você não possui conteúdos ainda!</h3>
                                </section>
                            </div>
                        }
                    </section>
                    <HorizontalLine style='w-full mb-5'/>
                    <Link
                        text="Add Content"
                        style='flex justify-center md:bg-blue-5 md:text-white md:hover:bg-blue-5-dark md:shadow-md w-full text-black bg-white-2 hover:bg-white-2-dark rounded md:rounded-none font-semibold py-3'
                        to='/perfil/conteudo/criar-conteudo'
                    />
                </main>
                <BottomNavigationBar/>
            </div>
        </div>
    );
}

export default Contents;
