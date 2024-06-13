// React
import React from 'react';

// COMPONENTS
import NavigationSubject from '../components/items/NavigationSubject';
import SubTitle from "../components/items/SubTitle";
import CardNewContent from "../components/items/CardNewContent";
import SliderContent from '../components/items/SliderContent';
import  GeoGraphySmall from "../assets/images/subjects_image/geography-small.png";

// CSS
import "./Home.css";

// TYPES
import { SliderContentInterface } from "../types"

const Home:React.FC = () => {

    const slides: SliderContentInterface[] = [
        { subject: 'Geografia', content: 'Globalização', date: '04/06/2023', "image":GeoGraphySmall },
        { subject: 'História', content: 'Revolução Francesa', date: '05/06/2023', "image":GeoGraphySmall },
        { subject: 'Matemática', content: 'Cálculo Diferencial', date: '06/06/2023', "image":GeoGraphySmall },
    ];

    return (
        <>
            <NavigationSubject/>
            <main className={' h-100vh '}>
                <section className={' relative w-screen overflow-hidden h-128 '} >
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
                <section className=' bg-white-2 ' >
                    <SubTitle text="O que há de novo?" />
                    <section className='py-10' >
                        <SliderContent slides={slides} />
                        <SliderContent slides={slides} />
                        <SliderContent slides={slides} />
                    </section>
                </section>
            </main>
        </>
        
    )
}

export default Home;