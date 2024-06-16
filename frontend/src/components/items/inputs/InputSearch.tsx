import React, {useState, useMemo} from 'react';

interface InputSearchProps {
    id: string;
    placeholder: string,
}

const InputSearch:React.FC<InputSearchProps> = ({id, placeholder}) => {
    return (
        <div>
            <input type="search" name={id} id={id} className='text-black bg-white text-sm px-2 outline-none border-2 w-full border-slate-200'placeholder={placeholder}/>
        </div>
    )
}

export default InputSearch;