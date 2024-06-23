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
        <p 
            className={`rounded w-32 h-12 flex justify-center items-center font-semibold ${color}`}
            key={key}
        >
            {title} 
        </p>
    )
}

export default CardSubjectNote;