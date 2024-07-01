import React from 'react';

interface ButtonProps {
    text: string,
    type?: string,
    style?: string,
    handleClick?: () => void;
}

const defaultStyle = "bg-blue-5 hover:bg-blue-5-dark"

const Button:React.FC<ButtonProps> = ({text, type="button", style=defaultStyle, handleClick}) => {
    return (
        <input 
            type={type} 
            value={text} 
            className={`text-white w-full rounded md:shadow-md md:rounded-none cursor-pointer font-semibold px-5 py-1.5 ${style}`}
            onClick={handleClick}
        />
    )
}

export default Button;