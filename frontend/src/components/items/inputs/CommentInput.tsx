import React, { useState } from 'react';
import { IoSendOutline } from "react-icons/io5";
import InputIcon from './InputIcon';
import Button from '../buttons/Button';

interface CommentInputProps {
    id: string;
    name?: string;
    value: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const CommentInput: React.FC<CommentInputProps> = ({
    id,
    name,
    value,
    onChange,
}) => {
    return (
        <div className='w-full max-w-160 '>
            <InputIcon
                value={value}
                type="text"
                name={name}
                id={id}
                placeholder="Escreva aqui"
                required
                onChange={onChange}
                maxLength={75}
                minLength={2}
                icon={IoSendOutline}
            />
            <div className='flex justify-end' >
                <div className='w-24' >
                    <Button text="Enviar" style='bg-blue-1 hover:bg-blue-1-dark ' />
                </div>
                
            </div>
            
        </div>
    );
};

export default CommentInput;
