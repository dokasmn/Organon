//REACT
import React from 'react';

//COMPONENTS
import InputSearch from '../items/InputSearch';

//IMAGES
import logo from '../../assets/images/logo.png';
import menuHamburguer from '../../assets/icons/menuHamburguer.png'

interface TitleSectionProps{
    title: string,
}

const TitleSection:React.FC<TitleSectionProps> = ({title}) => {
    return (
        <section className={' w-full bg-blue-3 text-white py-2 flex justify-center font-bold rounded '} >
            <h1>
                {title}
            </h1>
        </section>
    )
}

export default TitleSection