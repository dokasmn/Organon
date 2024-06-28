import React, {useState, useMemo} from 'react';
import { IoSearch } from "react-icons/io5";

interface InputSearchProps {
    id: string;
    placeholder: string,
}

const InputSearch:React.FC<InputSearchProps> = ({id, placeholder}) => {

    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = () => {
      setIsFocused(true);
    };
  
    const handleBlur = () => {
      setIsFocused(false);
    };

    return (
        <div className='w-full max-w-144 relative  ' >
            <input 
                type="search" 
                name={id} 
                id={id} 
                className='text-black md:border border-black border-opacity-30  focus:border-blue-1 bg-white text-sm px-2 outline-none w-full py-1 md:text-base md:px-5 '
                placeholder={placeholder}
                onFocus={handleFocus}
                onBlur={handleBlur}
            />
            <IoSearch  
                className={`absolute top-1/4 right-5 ${
                    isFocused ? 'text-blue-1' : 'text-gray-400'
                }`} 
            />
        </div>
    )
}

export default InputSearch;