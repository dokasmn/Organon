// React
import React, { useState, useEffect } from 'react';
import axiosInstance from '../axiosConfig';

// COMPONENTS
import NavigationSubject from '../components/items/sliders/NavigationSubject';
import SubTitle from "../components/items/texts/SubTitle";
import CardNewContent from "../components/items/cards/CardNewContent";
import SliderContent from '../components/items/sliders/SliderContent';
import GeoGraphySmall from "../assets/images/subjects_image/geography-small.png";
import NoticeCard from '../components/items/cards/NoticeCard';
import Footer from '../components/layout/Footer';
import HeaderHome from '../components/layout/HeaderHome';
import PopupLog from '../components/popups/PopUpLog';

// CSS
import "./Home.css";

// TYPES
import { SliderContentInterface } from "../types"

// IMAGES 
import  highSchoolImage from "../assets/images/high_school.png"

// HOOKS
import { useAuth } from '../contexts/AuthContext';

// TYPES
import { slidesContent } from '../types';

const Home:React.FC = () => {
    const { user } = useAuth();
    const [slides, setSlides] = useState<slidesContent[]>([{
        content_description:"",
        content_id:1,
        content_name:"",
        content_pdf:"",
        content_position:1,
        content_professor_user:"",
        content_subject: "",
        content_video: "",
    }])
    
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredSlides, setFilteredSlides] = useState(slides);

    const fetchData = async () => {
        try {
            const response = await axiosInstance.get('course/content/', {
                headers: {
                    'Authorization': `Token ${user.token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            if (response.status === 200) {
                let contents:any = response.data.results;
                setSlides(contents)
                console.log(contents)
                // contents.map((obj:slideContent) => {
                //     setSlides({subject: obj.content_subject, content: obj.content_name, date:"12/04/2024", image:GeoGraphySmall}) 
                // })
            }
        } catch (error: any) {
            if(error.response?.data?.detail){    
                console.log(error.response.data.detail)
            }else{
                console.log(`Algo deu errado - ${error.response.status}`)
            }
        }
    };

    useEffect(() => {
        fetchData();
        if (searchQuery) {
            setFilteredSlides(slides.filter(slide => 
                slide.content_subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
                slide.content_name.toLowerCase().includes(searchQuery.toLowerCase())
            ));
        } else {
            setFilteredSlides(slides);
        }
    }, [searchQuery])
    
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
                    <section>
                        <section className='py-10' >
                            <SubTitle text="O que há de novo?" />
                            <SliderContent slides={slides} />
                            <SliderContent slides={slides} />
                            <SliderContent slides={slides} />
                        </section>
                        <section>
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
                    </section>
                </main>
            </div>
            <Footer/>
        </>
    )
}

export default Home;