import React, { ReactNode } from 'react';

interface ButtonProps {
    text: string | ReactNode,
    type?: string,
    style?: string,
    onClick?: () => void;
}

const defaultStyle = "bg-blue-5 hover:bg-blue-5-dark"

const Button:React.FC<ButtonProps> = ({text, type="button", style=defaultStyle, onClick}) => {
    return (
        <input 
            type={type} 
            value={text} 
            className={`text-white w-full rounded md:shadow-md md:rounded-none cursor-pointer font-semibold px-5 py-2 ${style}`}
            onClick={onClick}
        />
    )
}

export default Button;