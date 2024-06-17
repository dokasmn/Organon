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
        <input type={type} value={text} className={`w-full cursor-pointer hover: bg-${backgroundColor} font-bold text-${textColor} px-5 py-2 rounded hover:bg-${hover}`}/>
    )
}

export default ButtonBigMobile;