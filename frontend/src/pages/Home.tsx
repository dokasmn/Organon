// REACT
import React, { useState, useEffect } from 'react';
import axiosInstance from '../axiosConfig';

// COMPONENTS
import NavigationSubject from '../components/items/sliders/NavigationSubject';
import SubTitle from "../components/items/texts/SubTitle";
import CardNewContent from "../components/items/cards/CardNewContent";
import SliderContent from '../components/items/sliders/SliderContent';
import NoticeCard from '../components/items/cards/NoticeCard';
import Footer from '../components/layout/Footer';
import HeaderHome from '../components/layout/HeaderHome';

// CSS
import "./Home.css";

// TYPES
import { slidesContent } from '../types';

// IMAGES 
import highSchoolImage from "../assets/images/high_school.png"

// HOOKS
import { useAuth } from '../contexts/AuthContext';
import useRequests from '../hooks/useRequests';

// UTILS
import { getSubjectImage } from '../utils';

const Home: React.FC = () => {
    const { showError, showUnespectedResponse, headersJsonToken } = useRequests();
    const [slides, setSlides] = useState<slidesContent[]>([]);
    
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredSlides, setFilteredSlides] = useState<slidesContent[]>([]);

    const fetchData = async () => {
        try {
            const response = await axiosInstance.get('course/content/', {
                headers: headersJsonToken,
            });
            if (response.status === 200) {
                let objContents: any = response.data.results;
                let cont: number = 0;
                let objContentCard: slidesContent[] = [];
                if (objContents.length != 0) {
                    for (let content of objContents.reverse()) {
                        objContentCard.push({
                            contentSubject: content.content_subject,
                            contentName: content.content_name,
                            contentDate: content.content_date,
                            contentImage: getSubjectImage(content.content_subject)
                        });
                        cont++;
                        if (cont === 8) {
                            break;
                        }
                    }
                    setSlides(objContentCard);
                }
            }else{
                showUnespectedResponse(response);
            }
        } catch (error: any) {
            showError(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (searchQuery) {
            setFilteredSlides(slides.filter(slide =>
                slide.contentSubject.toLowerCase().includes(searchQuery.toLowerCase()) ||
                slide.contentName.toLowerCase().includes(searchQuery.toLowerCase())
            ));
        } else {
            setFilteredSlides(slides);
        }
    }, [searchQuery, slides]);


    return (
        <>
            <div className='xl:flex xl:flex-col xl:items-center'>
                <HeaderHome searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
                <NavigationSubject/>
                <main className={' pt-5 max-w-7xl w-full '}>
                    <section className={' relative w-full overflow-hidden h-128 '} >
                        <div className='bg-black-opacity-65 absolute h-full w-full text-white px-10 flex justify-center items-center '>
                            <div>
                                <h1 className='font-bold text-3xl pb-3' >
                                    Olá, usuário!
                                </h1>
                                <p className='semibold text-justify' >
                                    É ótimo tê-lo de volta, nossas trilhas já estão disponíveis para o seu aprendizado
                                </p>
                            </div>
                        </div>
                        <div className='welcome-container-home h-full w-full'></div>
                    </section>
                    {filteredSlides.length > 0 && (
                        <section className='py-10' >
                            <SubTitle text="O que há de novo?" />
                            <SliderContent slides={filteredSlides} />
                        </section>
                    )}
                    <section className={filteredSlides.length > 0 ? 'my-0' : 'my-20'}>
                        <div className='flex justify-center' >
                            <SubTitle text="Últimas Notícias?" />
                        </div>
                        <div className='flex justify-center'>
                            <NoticeCard 
                                title="Novo ensino médio revogado" 
                                description='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eget ligula eu lectus lobortis condimentum. Aliquam nonummy auctor massa. Pellentesque habitant morbi tristique senectus et netus et malesuada.' 
                                image={highSchoolImage}
                            />          
                        </div>
                    </section>
                </main>
            </div>
            <Footer/>
        </>
    )
}

export default Home;
