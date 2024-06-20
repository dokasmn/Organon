import React from 'react';

interface TextAreaProps {
    id: string,
    placeholder: string,
    onChange : (event : React.ChangeEvent<HTMLTextAreaElement>) => void,
}

const TextArea:React.FC<TextAreaProps> = ({placeholder, id, onChange}) => {
    return (
        <textarea 
            onChange={onChange}  
            id={id}
            placeholder={placeholder} 
            className='border border-black rounded p-5 bg-white w-full'>
        </textarea>
    )
}

export default TextArea;