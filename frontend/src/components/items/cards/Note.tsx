// REACT
import React, { ReactNode } from 'react';

// UTILS
import { setColorSubject } from '../../../utils';

// COMPONENTS
import HorizontalLine from '../texts/HorizontalLine';

// TYPES
import { note } from '../../../types';

interface NoteProps {
    title: string,
    text: string | ReactNode,
    subject: string,
    content?: string,
    onClick: (props: note) => void,
}

const Note:React.FC<NoteProps> = ({title, text, subject, content="", onClick}) => {
    let color: string = setColorSubject(subject);

    return (
        <div
            onClick={() => {onClick({color, title, text, subject, content})}}
            className={`rounded md:shadow-lg transition-all transform duration-500 hover:border-1 hover:border-blue-1 hover:shadow md:rounded-none hover:bg-gray-400 hover:bg-opacity-5 cursor-pointer flex-col w-40 05xl:w-52 xs:w-48 items-center font-semibold border border-gray-300 px-3 py-4 mb-4`}
        >   
            <HorizontalLine style={` w-full ${color} rounded py-0.5 mb-5`} />
            <section className='px-1' >
                <h3 className='text-xl break-all ' >
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