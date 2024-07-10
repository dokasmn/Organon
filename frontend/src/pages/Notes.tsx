// React
import React, { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosConfig';


// COMPONENTS
import TitleSection from '../components/layout/TitleSection';
import BottomNavigationBar from '../components/layout/BottomNavigationBar';
import SliderSubjectNotes from '../components/items/sliders/SliderSubjectNotes';
import Note from '../components/items/cards/Note';
import TopNavigationBar from '../components/layout/TopNavigationBar';
import HorizontalLine from '../components/items/texts/HorizontalLine';


// HOOKS
import { usePopupLog } from '../contexts/PopUpLogContext';
import { useLoading } from '../contexts/LoadingContext';
import useForm from '../hooks/useForm';
import { useAuth } from '../contexts/AuthContext';


// UTILS
import { subjects } from '../utils';

interface NotesProps {
    notesUser: {title:string, text:string}[],
}

const Notes:React.FC<NotesProps> = () => {
    const { user } = useAuth()
    const { setShowLoading } = useLoading();
    const { handleShowError, handleShowSuccess } = usePopupLog();
    
    useEffect(()=>{
        const fetchDataNotes = async ()=>
            {
                try {
                    setShowLoading(true);
                    const response = await axiosInstance.get('perfil/note/', {
                    headers: {
                        'Authorization': `Token ${user.token}`
                    },
                });
                setShowLoading(false);
                if (response.status === 200) {
                    handleShowSuccess("Conteúdo carregado com sucesso")
                    console.log(response.data)
                }else{
                    handleShowError("Resposta inesperada.")
                    console.error('Unexpected response status:', response.status);
                }
            } catch (error) {
                console.log("Erro ao realizar a requisição!!")
                console.log(error)
            }    
        }
     
        fetchDataNotes();
    },[])
    
    const notesUser = [
        {title:"Matemática", text:"loremlorem"},
        {title:"Matemática", text:"loremlorem"},
        {title:"Matemática", text:"loremlorem"},
        {title:"Matemática", text:"loremlorem"},
        {title:"Matemática", text:"loremlorem"},
        {title:"Matemática", text:"loremlorem"},
    ]

    return (
        <div className='sm:flex justify-center' >
            <TopNavigationBar/>             
            <main className='xs:px-14 md:pt-32 md:px-5 max-w-160 sm:min-w-160 md:max-w-6xl' >
                <section className='px-5 xs:px-0' >
                    <TitleSection title="CONTENTS" />
                </section>
                <div className='md:px-5'>
                    <SliderSubjectNotes slides={subjects} />
                    <HorizontalLine style='hidden md:block mt-7 max-w-160 md:max-w-6xl' />       
                </div>
                
                <section className='flex justify-center md:px-5' >
                    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-10 lg:gap-5 md:w-full' >
                        {
                            notesUser.map((field, __) => (
                                <Note 
                                    title={field.title} 
                                    text={field.text} 
                                    key={uuidv4()}
                                />
                            ))
                        }
                    </div>
                </section>
            </main>
            <BottomNavigationBar/>
        </div>
    )
}

export default Notes;