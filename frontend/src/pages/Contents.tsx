import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import HorizontalLine from '../components/items/texts/HorizontalLine';
import { v4 as uuidv4 } from 'uuid';
import TitleSection from '../components/layout/TitleSection';
import ContentCrud from '../components/items/cards/ContentCrud';
import BottomNavigationBar from '../components/layout/BottomNavigationBar';
import TopNavigationBar from '../components/layout/TopNavigationBar';
import { usePopupLog } from '../contexts/PopUpLogContext';
import { useLoading } from '../contexts/LoadingContext';
import { useAuth } from '../contexts/AuthContext';
import axiosInstance from '../axiosConfig';
import { getImageSubject } from '../utils';

interface ContentInterface {
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
        <>
            <TopNavigationBar />
            <main className="max-w-7xl mx-auto mt-2">
                <section className="my-2">
                    <TitleSection title="Conteúdos" />
                    <HorizontalLine style="mb-3" />
                    <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {contents.map(content => (
                            <ContentCrud
                                key={uuidv4()}
                                content={content.content_name}
                                subject={content.content_subject}
                                image={getImageSubject(content.content_subject) || ''} // Converte null para string vazia
                            />
                        ))}
                    </div>
                </section>
            </main>
            <BottomNavigationBar />
        </>
    );
};

export default Contents;
