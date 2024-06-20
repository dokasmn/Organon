// REACT
import React, {useState, useMemo} from 'react';
import { v4 as uuidv4 } from 'uuid';

// COMPONENT
import ButtonSmallMobile from '../components/items/buttons/ButtonSmallMobile';
import SliderGeneric from '../components/items/sliders/SliderGeneric';
import CardSubjectApresentation from '../components/items/cards/CardSubjectApresentation';

// IMAGES
import logo from '../assets/images/logo.png'
import geography from '../assets/images/subjects_image/geography-small.png'

const Welcome:React.FC = () => {

    const percentdatasList = [
        {title:"Lorem", data:"50 lorem"},
        {title:"Lorem", data:"50 lorem"},
        {title:"Lorem", data:"50 lorem"},
        {title:"Lorem", data:"50 lorem"},
    ]

    const subjects:{title:string, numberContents:string, image:string}[] = [
        {title:"Matemática",numberContents:"23", image:geography},
        {title:"Gramática",numberContents:"23", image:geography},
        {title:"Filosofia",numberContents:"23", image:geography},
        {title:"Inglês",numberContents:"23", image:geography},
        {title:"Sociologia",numberContents:"23", image:geography},
        {title:"História",numberContents:"23", image:geography},
        {title:"Química",numberContents:"23", image:geography},
        {title:"Biologia",numberContents:"23", image:geography},
        {title:"Artes",numberContents:"23", image:geography},
        {title:"Literatura",numberContents:"23", image:geography},
        {title:"Geografia",numberContents:"23", image:geography},
    ];

    return (
        <div className='bg-gradient-blue-bottom min-h-screen'>  
            <header className='h-16 flex items-end px-5'>
                <div className='w-2/6' >
                    <img src={logo} alt="" className={'w-10'} />
                </div>
                <div className='w-4/6 flex  justify-end gap-3 '>
                    <ButtonSmallMobile text='Login' textColor='white' backgroundColor='bg-blue-3' hover='bg-blue-3-dark'/>
                    <ButtonSmallMobile text='Cadastro' textColor='white' backgroundColor='bg-white-opacity-15' hover='bg-gray-1'/>
                </div>
            </header>      
            <main className='text-white'>
                <div className='px-5' >
                    <h1 className='pt-3 font-semibold text-3xl'>Organon</h1>
                    <p className='py-7' >Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda molestias, debitis pariatur.</p>
                </div>
                
                <SliderGeneric card="percentDatasCard" slides={percentdatasList}  />
                <section className='px-5' >
                    {
                        subjects.map((subject, index) => (
                            <CardSubjectApresentation title={subject.title} image={subject.image} numberContent={subject.numberContents} />
                        ))
                    }
                    
                </section>
            </main>
            
        </div>
    )
}

export default Welcome;