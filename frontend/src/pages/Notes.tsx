// React
import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

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
import { useAuth } from '../contexts/AuthContext';


// UTILS
import { subjects } from '../utils';

type notesList = {
    note_content:{note_content: string, subject: string},
    note_text:string,
    note_title:string,
}[]

const Notes:React.FC = () => {
    const { user } = useAuth()
    const { setShowLoading } = useLoading();
    const { handleShowError, handleShowSuccess } = usePopupLog();
    const [notesOfUser, setNotesOfUser] = useState<notesList>([{
        note_content:{note_content:"", subject:""},
        note_text:"",
        note_title:""
    }]);

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
                    setNotesOfUser(response.data.results)
                    console.log(response.data)
                }else{
                    handleShowError("Resposta inesperada.")
                    console.error('Unexpected response status:', response.status);
                }
            } catch (error: any) {
                if(error.response?.data?.detail){    
                    handleShowError(error.response.data.detail)
                }else{
                    handleShowError(`Algo deu errado - ${error.response.status}`)
                }
                console.error('Error:', error.message);
            }    
        }
        fetchDataNotes();
    },[])

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
                            notesOfUser.map((note, __) => (
                                <Note 
                                    title={note.note_title} 
                                    text={note.note_text}
                                    subject={note.note_content.subject} 
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