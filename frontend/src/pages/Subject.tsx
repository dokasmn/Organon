// REACT
import React, {useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

// COMPONENTS
import HorizontalLine from '../components/items/texts/HorizontalLine.tsx';
import ArrowSlider from '../components/items/cards/ArrowSlider.tsx';
import CardContentAccess from '../components/items/cards/CardContentAccess.tsx';
import FooterSubject from '../components/layout/FooterSubject.tsx';

// UTILS
import { getImageSubject, setColorSubject, getRoute, decodeStringUrl, quickSort } from '../utils.ts'

// HOOKS
import useSliderArrow from '../hooks/useSliderArrow.tsx';
import { useAuth } from '../contexts/AuthContext.tsx';
import { usePopupLog } from '../contexts/PopUpLogContext.tsx';
import { useLoading } from '../contexts/LoadingContext.tsx';

// IMAGES
import { MdArrowRight, MdArrowLeft } from "react-icons/md";

// AXIOS
import axiosInstance from '../axiosConfig.ts';

interface contentsInterface {
    content_professor_user:string, 
    content_name:string, 
    finished:string, 
    imagePerfil:string
}

const Subject:React.FC = () => {
    const { setShowLoading } = useLoading();
    const { handleShowError } = usePopupLog();
    const { user } = useAuth();
    
    const [contents, setContents] = useState([
        {
            content_description: "",
            content_name: "",
            content_pdf: "",
            content_position: 0,
            content_professor_user: "",
            content_subject: "",
            content_video: ""
        }
    ]) 

    const route: string[] = getRoute();
    const subject: string = route[route.length-1].toLocaleUpperCase()

    const decodeSubject = decodeStringUrl(subject).toUpperCase();
    const imageSubject = getImageSubject(decodeSubject)
    const imageSubjectMedium = getImageSubject(decodeSubject, "medium")

    const pages = [1,2,4,5,6,7,8,9]
    const teacherEmail = "Cauan@gmail.com"  
    const colorSubject = `${setColorSubject(decodeSubject)}`;   

    const { currentSlide, handleNext, handlePrev } = useSliderArrow(
        0, pages
    );

    useEffect(() => {
        if(user.token){
            fetchData();
        }
    }, [user])

    const fetchData = async () => {
        setShowLoading(true);
        try {
            const response = await axiosInstance.get(`home/content/?content_subject=${decodeSubject}`, {
                headers: {
                    'Authorization': `Token ${user.token}`,
                },
            })
            setShowLoading(false);
            if (response.status === 200) {
                console.log(response.data.results)
                
                const ordenedList: contentsInterface[] = quickSort(response.data.results, "content_position");
                setContents(ordenedList);
                
            }else{
                handleShowError("Resposta inesperada.")
                console.error('Unexpected response status:', response.status);
            }
        } catch (error: any) {
            setShowLoading(false);
            if(error.response.data){    
                handleShowError(error.response.data.detail)
            }else{
                handleShowError(error.message)
            }
            console.error('Error:', error.message);
        }
    }

    return (
        <section className='pt-5 min-h-screen md:pt-5 flex flex-col items-center '  >
            <header className=' flex items-center px-5 sm:px-14 md:px-10 w-full pb-5 sm:min-w-160 md:max-w-6xl'>
                <section className=' w-2/5 ' >
                    <h1 className=' font-semibold sm:text-xl md:text-2xl lg:text-3xl ' >{ decodeSubject }</h1>
                    <p className=' rounded-full ' >Bons estudos!</p>
                </section>
                <section className='w-3/5 flex justify-end' >
                    {imageSubject && imageSubjectMedium ?
                        <>
                            <img src={ imageSubject } alt="" className='md:hidden' />
                            <img src={ imageSubjectMedium } alt="" className='hidden md:block' />
                        </> 
                        :
                        false
                    }
                </section>
                
            </header>   
            <HorizontalLine style='w-full' />  
            <main className='my-0 py-0 px-5 xs:px-14 md:px-10 max-w-160 sm:min-w-160 w-full'>
                <h2 className='font-semibold text-lg md:text-xl lg:text-2xl flex justify-center' >Módule {currentSlide+1}</h2>
                <section className='py-5 sm:py-14 ' >
                    {contents.map((content) => (
                        <CardContentAccess
                            key={uuidv4()} 
                            teacher={content.content_professor_user} 
                            nameContent={content.content_name}
                            finished={content.finished} 
                            // imagePerfil={content.imagePerfil}
                            to={content.content_name}
                        />
                    ))}
                </section>
                <section className='px-12'>
                    <div className='flex justify-center items-center relative' >
                        <ArrowSlider icon={<MdArrowLeft className='text-3xl sm:bg-gray-300 hover:bg-gray-400 rounded-full'/>} handleEvent={handlePrev} style="left-0" />
                        <p className='p-0 m-0'> {currentSlide+1} </p>
                        <ArrowSlider icon={<MdArrowRight className='text-3xl sm:bg-gray-300 hover:bg-gray-400 rounded-full'/>} handleEvent={handleNext} style="right-0"/>
                    </div>
                </section>
            </main>
            <FooterSubject 
                emailTeacher={teacherEmail}
                backgroundColor={colorSubject}  
            />
        </section>
    )
}

export default Subject;