import React, {useState, useMemo} from 'react';

// COMPONENTS
import Input from '../inputs/Input';
import CheckBox from '../inputs/CheckBox';
import HoldDownLink from '../buttons/HoldDownLink';

interface CardContentAccessProps {
    teacher: string,
    nameContent: string,
    finished: string,
    imagePerfil?: string,
    to: string,
}

const CardContentAccess:React.FC<CardContentAccessProps> = ({to, teacher, nameContent, finished, imagePerfil}) => {
    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsChecked(event.target.checked);
        console.log(isChecked)
    };

    return ( 
        <HoldDownLink    
            to={to}
            text={
                <>
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
                </>
            }
            holdDuration={1000} 
            style=' bg-white md:shadow-lg transition-all transform duration-500 hover:border-blue-1 hover:scale-105 border border-gray-1 py-3 flex items-center w-full mb-4'
        />
       
    )
}

export default CardContentAccess;