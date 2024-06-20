// REACT
import React, {useState, useMemo} from 'react';


interface CardSubjectNoteProps {
    title: string,
    key: string,
}

const CardSubjectNote:React.FC<CardSubjectNoteProps> = ({title, key}) => {

    let color: string = "bg-red-subject";

    if(title === "Matemática"){
        color = "bg-blue-subject" 
    }else if(title === "Biologia"){
        color = "bg-green-subject" 
    }else if(title === "Física"){
        color = "bg-purple-subject" 
    }else if(title === "Geografia"){
        color = "bg-yellow-subject" 
    }else if(title === "História"){
        color = "bg-yellow-orange-subject" 
    }

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