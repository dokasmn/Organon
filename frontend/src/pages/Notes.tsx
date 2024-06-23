// React
import React from 'react';

// COMPONENTS
import TitleSection from '../components/layout/TitleSection';
import BottomNavigationBar from '../components/layout/BottomNavigationBar';
import SliderSubjectNotes from '../components/items/sliders/SliderSubjectNotes';
import Note from '../components/items/cards/Note';
import { v4 as uuidv4 } from 'uuid';

// UTILS
import { subjects } from '../utils';

interface NotesProps {
    notesUser: {title:string, text:string}[],
}

const Notes:React.FC<NotesProps> = () => {

    const notesUser = [
        {title:"Matemática", text:"loremlorem"},
        {title:"Matemática", text:"loremlorem"},
        {title:"Matemática", text:"loremlorem"},
        {title:"Matemática", text:"loremlorem"},
        {title:"Matemática", text:"loremlorem"},
        {title:"Matemática", text:"loremlorem"},
    ]

    return (
        <>
            <main>
                <section className='pb-7 px-5' >
                    <TitleSection title="CONTENTS" />
                </section>
                <SliderSubjectNotes slides={subjects} />
                <section className='px-5 columns-2' >
                    {
                        notesUser.map((field, __) => (
                            <Note 
                                title={field.title} 
                                text={field.text} 
                                key={uuidv4()}
                            />
                        ))
                    }
                </section>
            </main>
            <BottomNavigationBar/>
        </>
    )
}

export default Notes;