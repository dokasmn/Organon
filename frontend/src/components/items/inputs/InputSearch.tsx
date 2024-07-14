import React, { useState } from 'react';
import { IoSearch } from "react-icons/io5";

interface InputSearchProps {
    id: string,
    placeholder: string,
    value: string,
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void,
    list: string[],
    handleSearchSubmit: (value: string) => void,
    style?: string,
    icon?: boolean,
}

const InputSearch: React.FC<InputSearchProps> = ({ id, placeholder, value, onChange, list, handleSearchSubmit, style, icon }) => {

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {

            const input = event.target as HTMLInputElement;
            handleSearchSubmit(input.value);
        }
    };

    return (
        <div className='relative w-full max-w-144' >
            <div className='w-full relative'>
                <input 
                    type="search" 
                    name={id} 
                    id={id} 
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    onKeyDown={handleKeyDown}
                    className={`text-black border border-gray-1 px-2 outline-none w-full py-2 md:text-base md:px-5 ${style}`}
                />
                {
                    icon && 
                        <IoSearch  
                            className={`absolute top-1/3 right-5 ${
                                'text-gray-400'
                            }`} 
                        />
                }
            </div>
            
            {list && list.length > 0 && (
                <div className='absolute text-black w-full max-w-144 bg-white mt-2 z-50 md:border border-gray-1 border-opacity-30'>
                    {list.map((value, index) => (
                        <div 
                            key={index} 
                            className='p-2 border-b cursor-pointer border-gray-1 border-opacity-30 hover:bg-white-1' 
                            onClick={() => handleSearchSubmit(value)}
                        >
                        <p>{value}</p>
                        </div>
                    ))}
                </div>
            )} 
        </div>
    );
}

export default InputSearch;
