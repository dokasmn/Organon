// REACT
import React, {useState, useMemo} from 'react';
import { v4 as uuidv4 } from 'uuid';

// COMPONENT
import Button from '../components/items/buttons/Button';
import SliderGeneric from '../components/items/sliders/SliderGeneric';
import CardSubjectApresentation from '../components/items/cards/CardSubjectApresentation';
import Link from '../components/items/buttons/Link';
import CardPercentData from '../components/items/cards/CardPercentDatas';

// IMAGES
import logo from '../assets/images/logo.png'
import geographySmall from '../assets/images/subjects_image/geography-small.png'
import artsSmall from '../assets/images/subjects_image/arts-small.png'
import biologySmall from '../assets/images/subjects_image/biology-small.png'
import chemicalSmall from '../assets/images/subjects_image/chemical-small.png'
import englishSmall from '../assets/images/subjects_image/english-small.png'
import grammarSmall from '../assets/images/subjects_image/grammar-small.png'
import historySmall from '../assets/images/subjects_image/history-small.png'
import literatureSmall from '../assets/images/subjects_image/literature-small.png'
import mathematicsSmall from '../assets/images/subjects_image/mathematics-small.png'
import philosophySmall from '../assets/images/subjects_image/philosophy-small.png'
import physicsSmall from '../assets/images/subjects_image/physics-small.png'
import sociologySmall from '../assets/images/subjects_image/sociology-small.png'

const Welcome:React.FC = () => {

    const percentdatasList = [
        {title:"Lorem", data:"50 lorem"},
        {title:"Lorem", data:"50 lorem"},
        {title:"Lorem", data:"50 lorem"},
    ]

    const subjects:{title:string, numberContents:string, image:string}[] = [
        {title:"Matemática",numberContents:"23", image:mathematicsSmall},
        {title:"Gramática",numberContents:"23", image:grammarSmall},
        {title:"Filosofia",numberContents:"23", image:philosophySmall},
        {title:"Inglês",numberContents:"23", image:englishSmall},
        {title:"Sociologia",numberContents:"23", image:sociologySmall},
        {title:"História",numberContents:"23", image:historySmall},
        {title:"Química",numberContents:"23", image:chemicalSmall},
        {title:"Biologia",numberContents:"23", image:biologySmall},
        {title:"Artes",numberContents:"23", image:artsSmall},
        {title:"Literatura",numberContents:"23", image:literatureSmall},
        {title:"Geografia",numberContents:"23", image:geographySmall},
        {title:"Física",numberContents:"23", image:physicsSmall},
    ];

    return (
        <div className=' bg-gradient-blue-bottom min-h-screen sm:flex flex-col items-center'>  
            <header className='h-8 flex px-5 pt-10 mb-5 w-full max-w-5xl'>
                <div className='w-2/6' >
                    <img src={logo} alt="" className={'w-10'} />
                </div>
                <div className='w-4/6 flex justify-end gap-3 '>
                    <Link to="/login" text={
                        <Button text='Login' style='bg-blue-3 hover:bg-blue-3-dark' />
                    }/>
                    <Link to="/registrar" text={
                        <Button text='Cadastro' style='bg-white-opacity-15 hover:bg-gray-1'/>
                    }/>
                    
                </div>
            </header>      
            <main className='text-white max-w-5xl'>
                <div className='px-5' >
                    <h1 className='pt-3 font-semibold text-3xl'>Organon</h1>
                    <p className='pt-5 max-w-120 ' >Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda molestias, debitis pariatur.</p>
                </div>
                <div>
                    <SliderGeneric card="percentDatasCard" slides={percentdatasList}  />
                    <div className='hidden sm:flex justify-between px-5 py-10 ' >
                        {
                            percentdatasList.map((slide) => (
                                <CardPercentData key={uuidv4()} title={slide.title} data={slide.data} />
                            ))
                        }                    
                    </div>
                </div>
                
                <div className='flex justify-center' >                
                    <section className='px-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-14 ' >
                        {
                            subjects.map((subject, index) => (
                                <CardSubjectApresentation key={index} title={subject.title} image={subject.image} numberContent={subject.numberContents} />
                            ))
                        }
                        
                    </section>
                </div>
            </main>
            
        </div>
    )
}

export default Welcome;