// REACT
import React from 'react';

// CONTENT
import { setColorSubject } from '../../../utils';

// COMPONENTS
import HorizontalLine from '../texts/HorizontalLine';

interface NoteProps {
    title: string,
    text: string,
    subject: string
}

const Note:React.FC<NoteProps> = ({title, text, subject}) => {
    let color: string = setColorSubject(subject);

    return (
        <div
            className={`rounded md:shadow-lg transition-all transform duration-500 hover:border-2 hover:border-blue-1 hover:shadow md:rounded-none cursor-pointer flex-col w-40 05xl:w-52 xs:w-48 items-center font-semibold border border-gray-300 px-3 py-4 mb-4`}
        >   
            <HorizontalLine style={` w-full ${color} rounded py-0.5`} />
            <section className='px-1' >
                <h3>
                    {title}
                </h3>
                <p className='w-full break-words pt-3 pb-5 text-sm' >
                    {text} 
                </p>
            </section>
            
        </div>
        
    )
}

export default Note;