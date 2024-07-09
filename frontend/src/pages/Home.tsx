// React
import React, { useState } from 'react';

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

const Home:React.FC = () => {
    const slides: SliderContentInterface[] = [
        { subject: 'Geografia', content: 'Globalização', date: '04/06/2023', "image":GeoGraphySmall },
        { subject: 'História', content: 'Revolução Francesa', date: '05/06/2023', "image":GeoGraphySmall },
        { subject: 'Matemática', content: 'Cálculo Diferencial', date: '06/06/2023', "image":GeoGraphySmall },
    ];
    
    return (
        <>
            <div className='xl:flex xl:flex-col xl:items-center'>
                <HeaderHome/>
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
                        <section className=''>
                            <div className='flex justify-center' >
                                <SubTitle text="Últimas Notícias?" />
                            </div>

                            <NoticeCard 
                                title="Novo ensino médio revogado" 
                                description='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eget ligula eu lectus lobortis condimentum. Aliquam nonummy auctor massa. Pellentesque habitant morbi tristique senectus et netus et malesuada.' 
                                image={highSchoolImage}
                            />          
                        </section>
                    </section>
                </main>
            </div>
            <Footer/>
        </>
    )
}

export default Home;