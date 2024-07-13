// REACT
import React, {useState, useMemo} from 'react';

// UTILS
import { setColorSubject } from '../../../utils'  

interface CardSubjectNoteProps {
    title: string,
    key: string,
    onClick: () => void,
}

const CardSubjectNote:React.FC<CardSubjectNoteProps> = ({title, key, onClick}) => {
    
    let color: string = setColorSubject(title);

    return (
        <div onClick={onClick} className={`rounded md:rounded-none shadow-lg cursor-pointer opacity-85 hover:opacity-100 w-32 md:w-40 h-12 font-semibold flex justify-center items-center ${color}`} >        
            <p 
                key={key}
            >
                {title} 
            </p>
        </div>
    )
}

export default CardSubjectNote;