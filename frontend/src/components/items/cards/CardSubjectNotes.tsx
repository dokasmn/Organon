// REACT
import React, {useState, useMemo} from 'react';

// UTILS
import { setColorSubject } from '../../../utils'  

interface CardSubjectNoteProps {
    title: string,
    key: string,
}

const CardSubjectNote:React.FC<CardSubjectNoteProps> = ({title, key}) => {
    
    let color: string = setColorSubject(title);

    return (
        <div className={`rounded md:rounded-none md:shadow-lg w-32 md:w-40 h-12 font-semibold flex justify-center items-center ${color}`} >        
            <p 
                key={key}
            >
                {title} 
            </p>
        </div>
    )
}

export default CardSubjectNote;