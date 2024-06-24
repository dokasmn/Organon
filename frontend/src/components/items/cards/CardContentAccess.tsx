import React, {useState, useMemo} from 'react';

// COMPONENTS
import Input from '../inputs/Input';

interface CardContentAccessProps {
    teacher: string,
    nameContent: string,
    finished: string,
    imagePerfil?: string,
}

const CardContentAccess:React.FC<CardContentAccessProps> = ({teacher, nameContent, finished, imagePerfil}) => {
    return ( 
        <div className=' bg-white-1 border border-gray-1 py-3 flex items-center w-full mb-4' >
            <div className='w-4/12 pl-2 sm:pl-7  font-medium ' >
                <p>{nameContent}</p>
            </div>
            <div className='w-4/12 sm:pl-7 ' >
                <img src={imagePerfil}/>
                <p>{teacher}</p>
            </div>
            <div className='w-4/12 justify-end pr-3 sm:pr-7 flex items-center gap-2  ' >
                <p>Finished?</p>
                <Input 
                    type="checkbox" 
                    name="finishedCheckBox" 
                    id="finishedCheckBox" 
                    value={finished}  
                    style=""
                />
            </div>
        </div>  
    )
}

export default CardContentAccess;