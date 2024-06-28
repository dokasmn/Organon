import React, {useState, useMemo} from 'react';

// COMPONENTS
import Input from '../inputs/Input';
import CheckBox from '../inputs/ChekBox';

interface CardContentAccessProps {
    teacher: string,
    nameContent: string,
    finished: string,
    imagePerfil?: string,
}

const CardContentAccess:React.FC<CardContentAccessProps> = ({teacher, nameContent, finished, imagePerfil}) => {
    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsChecked(event.target.checked);
        console.log(isChecked)
    };

    return ( 
        <div className=' bg-white md:shadow-lg transition-all transform duration-500 hover:border-blue-1 hover:scale-105 border border-gray-1 py-3 flex items-center w-full mb-4' >
            <div className='w-4/12 pl-2 sm:pl-7  font-medium ' >
                <p>{nameContent}</p>
            </div>
            <div className='w-4/12 sm:pl-7 ' >
                <img src={imagePerfil}/>
                <p>{teacher}</p>
            </div>
            <div className='w-4/12 justify-end pr-3 sm:pr-7 flex items-center gap-2' >
                <p>Finished?</p>
                <CheckBox name="finishedCheckBox" checked={isChecked} onChange={handleCheckboxChange} />
            </div>
        </div>  
    )
}

export default CardContentAccess;