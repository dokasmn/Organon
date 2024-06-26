import React from 'react';

interface ButtonSmallMobileProps {
    text: string,
    backgroundColor: string,
    textColor: string,
    hover: string,
}

const ButtonSmallMobile:React.FC<ButtonSmallMobileProps> = ({backgroundColor, text, textColor, hover}) => {
    return (
        <>
            <input type="button" value={text} className={`cursor-pointer font-semibold hover:${hover} ${backgroundColor} text-${textColor} px-5 py-1 sm:px-10 rounded hover:bg-${hover} `}/>
        </>
    )
}

export default ButtonSmallMobile;