import React from 'react';

interface TextAreaProps {
    id: string,
    placeholder: string,
    onChange : (event : 
        React.ChangeEvent<HTMLTextAreaElement>
    ) => void,
    value: string,
    name: string,
    styleProps?: string,
}

const TextArea:React.FC<TextAreaProps> = ({placeholder, id, onChange, value, name, styleProps}) => {
    return (
        <textarea 
            onChange={onChange}  
            id={id}
            name={name}
            value={value}
            placeholder={placeholder} 
            style={{ resize: 'none' }}
            className={`border border-gray-1 outline-none rounded md:rounded-none p-5 bg-white w-full ${styleProps}`}
        >
        </textarea>
    )
}

export default TextArea;