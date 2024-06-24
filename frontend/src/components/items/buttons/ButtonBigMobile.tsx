import React from 'react';

interface ButtonBigMobileProps {
    text: string,
    backgroundColor: string,
    textColor: string,
    hover: string,
    type?: string,
}

const ButtonBigMobile:React.FC<ButtonBigMobileProps> = ({backgroundColor, text, textColor, hover, type="button"}) => {
    return (
        <input 
            type={type} 
            value={text} 
            className={`w-full cursor-pointer hover:${hover} shadow ${backgroundColor} font-semibold text-${textColor} px-5 py-2 rounded ${hover}`}
        />
    )
}

export default ButtonBigMobile;