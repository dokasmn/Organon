import React, {useState, useMemo} from 'react';

interface InputSearchProps {
    id: string;
    placeholder: string,
}

const InputSearch:React.FC<InputSearchProps> = ({id, placeholder}) => {
    return (
        <div>
            <input type="search" name={id} id={id} className='text-black bg-white text-sm px-2 outline-none border-2 w-full md:py-2 md:text-base md:px-5'placeholder={placeholder}/>
        </div>
    )
}

export default InputSearch;