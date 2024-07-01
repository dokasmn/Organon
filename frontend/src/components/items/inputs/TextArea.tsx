import React from 'react';

interface TextAreaProps {
    id: string,
    placeholder: string,
    onChange : (event : 
        React.ChangeEvent<HTMLTextAreaElement>
    ) => void,
    value: string,
    name: string,
}

const TextArea:React.FC<TextAreaProps> = ({placeholder, id, onChange, value, name}) => {
    return (
        <textarea 
            onChange={onChange}  
            id={id}
            name={name}
            value={value}
            placeholder={placeholder} 
            className='border border-black rounded p-5 bg-white w-full'>
        </textarea>
    )
}

export default TextArea;