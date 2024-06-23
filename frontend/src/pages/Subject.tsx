// REACT
import React, {useState, useMemo} from 'react';
import { v4 as uuidv4 } from 'uuid';

// COMPONENTS
import HorizontalLine from '../components/items/texts/HorizontalLine.tsx';
import ArrowSlider from '../components/items/cards/ArrowSlider.tsx';
import CardContentAccess from '../components/items/cards/CardContentAccess.tsx';
import FooterSubject from '../components/layout/FooterSubject.tsx';

// UTILS
import { getImageSubject, setColorSubject } from '../utils.ts'

// HOOKS
import useSliderArrow from '../hooks/useSliderArrow.tsx';

// IMAGES
import { MdArrowRight, MdArrowLeft } from "react-icons/md";

const Subject:React.FC = () => {
    const urlSplit = location.pathname.split("/")
    const subject = urlSplit[urlSplit.length-1].toLocaleUpperCase();
    
    const encodedString = subject;
    const decodedString =  decodeURIComponent(encodedString).toUpperCase();
    const imageSubject = getImageSubject(decodedString)

    const pages = [1,2,4,5,6,7,8,9]
    const contents = [
        {teacher:'Nome do pr...', nameContent:"Logaritmo", finished:"checked", imagePerfil:''},
        {teacher:'Nome do pr...', nameContent:"Logaritmo", finished:"checked", imagePerfil:''},
        {teacher:'Nome do pr...', nameContent:"Logaritmo", finished:"checked", imagePerfil:''},
        {teacher:'Nome do pr...', nameContent:"Logaritmo", finished:"checked", imagePerfil:''},
    ]
    const teacherEmail = "Cauan@gmail.com"  
    const colorSubject = setColorSubject(decodedString);

    const { currentSlide, handleNext, handlePrev } = useSliderArrow(
        0, pages
    );

    return (
        <section className='pt-7' >
            <header className=' flex items-center px-5'>
                <section className=' w-2/5 ' >
                    <h1 className=' font-semibold ' >{ decodedString }</h1>
                    <p className=' rounded-full ' >Bons estudos!</p>
                </section>
                <section className='w-3/5' >
                    {imageSubject ? 
                        <img src={ imageSubject } alt="" />
                        :
                        false
                    }
                </section>
            </header>   
            <HorizontalLine style='w-full' />         
            <main className='my-0 py-0 px-5' >
                <h2 className='font-semibold text-xl flex justify-center' >Módule {currentSlide+1}</h2>
                <section className=' py-5 ' >
                    {contents.map((content) => (
                        <CardContentAccess
                            key={uuidv4()} 
                            teacher={content.teacher} 
                            nameContent={content.nameContent}
                            finished={content.finished} 
                            imagePerfil={content.imagePerfil}
                        />
                    ))}
                </section>
                <section className='px-12 ' >
                    <div className='flex justify-center items-center relative' >
                        <ArrowSlider icon={<MdArrowLeft className='text-3xl' />} handleEvent={handlePrev} style="left-0" />
                        <p className='p-0 m-0'> {currentSlide+1} </p>
                        <ArrowSlider icon={<MdArrowRight className='text-3xl'/>} handleEvent={handleNext} style="right-0"/>
                    </div>
                </section>
            </main>
            <FooterSubject 
                    emailTeacher={teacherEmail}
                    backgroundColor={`bg-blue-5`}  
            />
        </section>
    )
}

export default Subject;