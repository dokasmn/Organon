import React, { useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

interface InputProps {
    id: string,
    placeholder: string,
    type: string,
    value: string,
    title?: string,
    required?: boolean,
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void, 
    name: string,
    maxLength?: number,
    minLength?: number,
    error?: string | null,
    style: string
}

const Input:React.FC<InputProps> = ({id, style, name, error, placeholder, type, value, title, required=false, maxLength, minLength, onChange}) => {
    
    const [useType, setUseType] = useState<string>(type)

    function changeType(){
        useType === "password" ? setUseType("text") : setUseType("password")
    }

    return (
        <div className='relative' >
            <input 
                value={value} 
                type={type == "password" ? useType : type} 
                name={name} 
                id={id} 
                title={title}
                className={`${style} my-2 outline-none border-2 transition-colors duration-400 focus:border-blue-1-dark rounded py-2 px-4 w-full`}
                placeholder={placeholder}
                required={required}
                onChange={onChange}
                maxLength={maxLength}
                minLength={minLength}
            />

            {
                type === "password" ? 
                    useType === "password" ? 
                        <FaRegEye 
                            className='text-2xl cursor-pointer opacity-50 absolute right-5 top-5' 
                            onClick={changeType} 
                        /> 
                    : 
                        <FaRegEyeSlash 
                            className='text-2xl cursor-pointer opacity-40 absolute right-5 top-5' 
                            onClick={changeType}
                        /> 
                : false
            }

            {error && <div className="error-message">{error}</div>}
        </div>
    )
}

export default Input;