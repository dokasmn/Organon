import React from 'react';
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
<<<<<<< HEAD
        <div className={`mb-5 ${props.style}`}>
            <label htmlFor={props.id} className='border border-gray-1 md:rounded-none flex h-10'>
                <div className='bg-white-2 h-full w-10 min-w-8 rounded flex justify-center items-center'>
                    <props.icon />
                </div>
                <Input
                    onChange={props.onChange}
                    value={props.value}
                    type={props.type}
                    id={props.id}
                    placeholder={props.placeholder}
                    name={props.name}
                    style={`h-full border-none bg-white`}
                />
            </label>
            {props.error && <p className="text-red-500 text-sm mt-1">{props.error}</p>}
=======
        <div className='my-5'>
            <label htmlFor={props.id} className='border border-gray-1 md:rounded-none flex h-10'>
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
            {props.error && <div className="text-red-500 mt-1 mb-2">{props.error}</div>}
>>>>>>> 540905221f7fcb626e0ea5f1eb7c7344a0ab7484
        </div>
    );
};

export default InputIcon;
