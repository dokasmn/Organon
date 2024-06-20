// REACT
import React, {useState, useMemo} from 'react';


// COMPONENTS
import HorizontalLine from '../texts/HorizontalLine';

interface NoteProps {
    title: string,
    text: string,
}

const Note:React.FC<NoteProps> = ({title, text}) => {

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
        <div
            className={` rounded-lg flex-col items-center font-semibold bg-white-2 px-3 mb-4`}
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