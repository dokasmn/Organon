import React, { useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';

interface InputProps {
    id: string;
    style?: string;
    name?: string;
    error?: string | null;
    placeholder?: string;
    type: 'text' | 'password';
    value: string;
    title?: string;
    required?: boolean;
    maxLength?: number;
    minLength?: number;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({
    id,
    style = '',
    name,
    error,
    placeholder,
    type,
    value,
    title,
    required = false,
    maxLength,
    minLength,
    onChange,
}) => {

    const [useType, setUseType] = useState<String>('password');

    function changeType() {
        setUseType(useType === 'password' ? 'text' : 'password');
    }

    return (
        <div className='w-full' >
            <div className={`${style} relative border border-black border-opacity-50 transition-all duration-400 rounded md:rounded-none pr-7 ${error ? 'mb-1' : 'mb-5'}`}>
                <input
                    value={value}
                    type={type === 'password' ? useType : type}
                    name={name}
                    id={id}
                    title={title}
                    className="outline-none bg-transparent py-2 px-4 w-full"
                    placeholder={placeholder}
                    required={required}
                    onChange={onChange}
                    maxLength={maxLength}
                    minLength={minLength}
                    autoComplete={id}
                />
                {type === 'password' && (
                    <span
                        className="text-2xl cursor-pointer opacity-50 absolute right-3 top-1/2 transform -translate-y-1/2"
                        onClick={changeType}
                        aria-label={useType === 'password' ? 'Mostrar senha' : 'Ocultar senha'}
                    >
                        {useType === 'password' ? <FaRegEye /> : <FaRegEyeSlash />}
                    </span>
                )}
            </div>
            {error && <div className="text-red-500 mt-1 mb-2">{error}</div>}
        </div>
    );
};

export default Input;
