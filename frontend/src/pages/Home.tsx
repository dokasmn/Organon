// React
import React, { useEffect } from 'react';

// COMPONENTS
import NavigationSubject from '../components/items/sliders/NavigationSubject';
import SubTitle from "../components/items/texts/SubTitle";
import CardNewContent from "../components/items/cards/CardNewContent";
import SliderContent from '../components/items/sliders/SliderContent';
import GeoGraphySmall from "../assets/images/subjects_image/geography-small.png";
import NoticeCard from '../components/items/cards/NoticeCard';
import Footer from '../components/layout/Footer';
import HeaderHome from '../components/layout/HeaderHome';

// CSS
import "./Home.css";

// TYPES
import { SliderContentInterface } from "../types"

// IMAGES 
import  highSchoolImage from "../assets/images/high_school.png"

const Home:React.FC = () => {
    const slides: SliderContentInterface[] = [
        { subject: 'Geografia', content: 'Globalização', date: '04/06/2023', "image":GeoGraphySmall },
        { subject: 'História', content: 'Revolução Francesa', date: '05/06/2023', "image":GeoGraphySmall },
        { subject: 'Matemática', content: 'Cálculo Diferencial', date: '06/06/2023', "image":GeoGraphySmall },
    ];

    useEffect(() => {
        document.body.classList.add('bg-white-2');
    }, []);

    return (
        <>
            <HeaderHome/>
            <NavigationSubject/>
            <main className={' pt-5 '}>
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
                    <section className='px-5 flex flex-col items-center sm:px-14 md:px-0'>
                        <SubTitle text="Últimas Notícias?" />

                        <NoticeCard 
                            title="Novo ensino médio revogado" 
                            description='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eget ligula eu lectus lobortis condimentum. Aliquam nonummy auctor massa. Pellentesque habitant morbi tristique senectus et netus et malesuada.' 
                            image={highSchoolImage}
                        />
                    </section>
                    
                </section>
            </main>
            <Footer/>
        </>
    )
}

export default Home;