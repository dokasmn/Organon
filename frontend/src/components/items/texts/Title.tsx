//REACT
import React from 'react'

interface TitleProps{
    text: string,
    color?: string,
}

const Title: React.FC<TitleProps> = ({text, color="black"}) => {     
    return (
        <h1 className={`font-semibold text-${color} text-2xl`} >
            {text}
        </h1>
    )
}
export default Title