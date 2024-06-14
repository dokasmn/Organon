import React from 'react';

interface TextAreaProps {
    id: string,
    placeholder: string,
}

const TextArea:React.FC<TextAreaProps> = ({placeholder, id}) => {
    return (
        <textarea id={id} placeholder={placeholder} className='border border-black rounded p-5 bg-white w-full'></textarea>
    )
}

export default TextArea;