import React, { useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
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
        <div>
            <div className={`relative border border-black border-opacity-50 transition-all duration-400 rounded focus-within:border-blue-1 md:min-w-160 max-w-160`}>
                <input
                    value={value}
                    type="text"
                    name={name}
                    id={id}
                    className="outline-none bg-transparent py-2 px-4 w-full"
                    placeholder="Escreva aqui"
                    required
                    onChange={onChange}
                    maxLength={75}
                    minLength={2}
                />
            </div>
            <div className='flex justify-end' >
                <div className='w-24 pt-5' >
                    <Button text="Enviar" style='bg-blue-1 hover:bg-blue-1-dark ' />
                </div>
                
            </div>
            
        </div>
    );
};

export default CommentInput;
