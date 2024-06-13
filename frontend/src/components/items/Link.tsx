//REACT
import { Link as ReactLink } from 'react-router-dom'
import React from 'react'


interface LinkProps{
    text: React.ReactNode | string ,
    style: string,
    to: string,
}

const Link: React.FC<LinkProps> = ({text, style, to}) => {    

    return <ReactLink className={`${style}`} to={to} >{text}</ReactLink>
}
export default Link