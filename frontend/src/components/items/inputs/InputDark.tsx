import React from 'react';

interface InputDarkProps {
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
    error: string,
}

    const InputDark:React.FC<InputDarkProps> = ({id, name, error, placeholder, type, value, title, required=false, maxLength, minLength, onChange}) => {
    return (
        <div>
            <input 
                value={value} 
                type={type} 
                name={name} 
                id={id} 
                title={title}  
                className='text-white bg-blue-5-opacity my-2 outline-none border-2 focus:border-blue-1-dark transition-colors duration-400 rounded py-2 px-4 w-full border-blue-1-opacity'
                placeholder={placeholder}
                required={required}
                onChange={onChange}
                maxLength={maxLength}
                minLength={minLength}
            />
            {error && <div className="error-message">{error}</div>}
        </div>
    )
}

export default InputDark;