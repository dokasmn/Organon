import React, { useState } from 'react';
import Input from './Input';
import { IconType } from 'react-icons';

interface InputIconProps {
    id: string;
    style?: string;
    name?: string;
    error?: string | null;
    placeholder?: string;
    type: 'text' | 'password';
    value: string;
    title?: string;
    required?: boolean;
    maxLength?: number;
    minLength?: number;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    icon: IconType;
}

const InputIcon: React.FC<InputIconProps> = (props) => {
    
    return (
        <label htmlFor={props.id} className='border border-gray-1 md:rounded-none flex h-10 my-5 '>
            <div className='bg-white-2 h-full w-10 min-w-8 rounded flex justify-center items-center' >
                <props.icon/>
            </div>
            <Input 
                onChange={props.onChange}
                value={props.value}
                type={props.type} 
                id={props.id}
                placeholder={props.placeholder} 
                name={props.name}
                style={`${props.style} h-full border-none bg-white`}
            />
        </label>
    );
};

export default InputIcon;


