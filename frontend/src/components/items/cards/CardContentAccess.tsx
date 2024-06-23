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
        <div className=' bg-white-1 border border-gray-1 mb-3 py-2 flex items-center w-full ' >
            <div className='w-4/12 px-2 font-medium ' >
                <p>{nameContent}</p>
            </div>
            <div className='4/12 pr-3' >
                <img src={imagePerfil}/>
                <p>{teacher}</p>
            </div>
            <div className='flex items-center gap-2' >
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