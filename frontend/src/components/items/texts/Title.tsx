//REACT
import React from 'react'

interface TitleProps{
    text: string,
    color: string,
}

const Title: React.FC<TitleProps> = ({text, color="black"}) => {     
    return (
        <h1 className={`py-7 font-semibold text-${color} text-2xl sm:text-3xl xl:text-4xl `} >
            {text}
        </h1>
    )
}
export default Title