import React from 'react';

interface ButtonProps {
    text: string,
    type?: string,
    style?: string,
}

const Button:React.FC<ButtonProps> = ({text, type="button", style="bg-blue-5 hover:bg-blue-5-dark text-white"}) => {
    return (
        <input 
            type={type} 
            value={text} 
            className={`w-full cursor-pointer shadow font-semibold px-5 py-2 ${style}`}
        />
    )
}

export default Button;