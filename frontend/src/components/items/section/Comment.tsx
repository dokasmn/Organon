import React, {useState, useMemo} from 'react';

// COMPONENTS
import ButtonSmallMobile from '../buttons/ButtonSmallMobile';
import Input from '../inputs/Input';


// IMAGES
import { FaQuestion } from "react-icons/fa6";
import { SlOptionsVertical } from "react-icons/sl";

interface CommentProps {
    photoPerfil: string,
    userName: string,
    comment: string,
}

const Comment:React.FC<CommentProps> = ({photoPerfil, userName, comment}) => {
    return ( 
        <div className=' flex pb-5' >
            <div className='w-2/12' >
                <img 
                    src={photoPerfil} 
                    alt="Foto do usuário" 
                    className="rounded-full border border-black h-10 w-10 "
                />
            </div>
            <div className='w-10/12'>
                <h3 className=' font-bold pb-2 ' >
                    { userName }
                </h3>
                <p className='text-justify' >
                    { comment }
                </p>
            </div>
        </div>
    )
}

export default Comment;