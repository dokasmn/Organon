import React, { useState } from 'react';
import { IoSearch } from "react-icons/io5";

interface InputSearchProps {
    id: string,
    placeholder: string,
    value: string,
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void,
    list: string[],
    handleSearchSubmit: (value: string) => void,
}

const InputSearch: React.FC<InputSearchProps> = ({ id, placeholder, value, onChange, onKeyDown, list, handleSearchSubmit }) => {
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        setIsFocused(false);
    };

    return (
        <>
            <div className='w-full max-w-144 relative'>
                <input 
                    type="search" 
                    name={id} 
                    id={id} 
                    className='text-black md:border border-black border-opacity-30 focus:border-blue-1 bg-white text-sm px-2 outline-none w-full py-1 md:text-base md:px-5'
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    onKeyDown={onKeyDown}
                />
                <IoSearch  
                    className={`absolute top-1/4 right-5 ${
                        isFocused ? 'text-blue-1' : 'text-gray-400'
                    }`} 
                />

                
            </div>
            {list && list.length > 0 && (
                <div className='absolute text-black max-w-144 w-8/12 bg-white mt-10 z-50 md:border border-gray-1 border-opacity-30'>
                    {list.map((value, index) => (
                        <div 
                            key={index} 
                            className='p-2 shadow-lg cursor-pointer border-gray-1' 
                            onClick={() => handleSearchSubmit(value)}
                        >
                        <p>{value}</p>
                        </div>
                    ))}
                </div>
            )} 
        </>
    );
}

export default InputSearch;
