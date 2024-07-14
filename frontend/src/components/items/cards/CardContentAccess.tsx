import React, { useState, useEffect } from 'react';
import axiosInstance from '../../../axiosConfig';
import { useAuth } from '../../../contexts/AuthContext';
import CheckBox from '../inputs/CheckBox';
import HoldDownLink from '../buttons/HoldDownLink';

interface CardContentAccessProps {
    pk: number;
    teacher: string;
    nameContent: string;
    finished: boolean;
    imagePerfil?: string;
    to: string;
}

const CardContentAccess: React.FC<CardContentAccessProps> = ({ pk, to, teacher, nameContent, finished, imagePerfil }) => {

    const { user } = useAuth();
    const [isChecked, setIsChecked] = useState<boolean>(finished);

    useEffect(() => {
        setIsChecked(finished);
    }, [finished]);

    const handleCheckboxChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const checked = event.target.checked;
        setIsChecked(checked);
        try {
            const response = await axiosInstance.post(`course/content/${pk}/finished/`, { finished: checked }, {
                headers: {
                    'Authorization': `Token ${user.token}`,
                    'Content-Type': 'application/json',
                },
            });
            if (response.status === 200) {
                console.log("Status do conteúdo atualizado no backend.");
            }
        } catch (error: any) {
            console.log(`Erro ao atualizar status do conteúdo: ${error}`);
        }
    };

    return (
        <HoldDownLink    
            to={to}
            text={
                <>
                    <div className='w-4/12 pl-2 sm:pl-7 font-medium'>
                        <p>{nameContent}</p>
                    </div>
                    <div className='w-4/12 sm:pl-7'>
                        {imagePerfil && <img src={imagePerfil} alt={`${teacher}'s profile`} />}
                        <p>{teacher}</p>
                    </div>
                    <div className='w-4/12 justify-end pr-3 sm:pr-7 flex items-center gap-2'>
                        <p>Finished?</p>
                        <CheckBox name="finishedCheckBox" checked={isChecked} onChange={handleCheckboxChange} />
                    </div>
                </>
            }
            holdDuration={1000} 
            style='bg-white md:shadow-lg transition-all transform duration-500 hover:border-blue-1 hover:scale-105 border border-gray-1 py-3 flex items-center w-full mb-4'
        />
    );
}

export default CardContentAccess;
