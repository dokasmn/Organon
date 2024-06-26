//REACT
import {useState} from 'react';
import { useLocation } from 'react-router-dom';
import React from 'react';

//COMPONENTS
import InputSearch from '../items/inputs/InputSearch';

//IMAGES
import flagBrasilDesktop from '../../assets/images/flag_brasil_desktop.png'
import flagSantaCatarinaDesktop from '../../assets/images/flag_santa_catarina_desktop.png'

// UTILS

const HeaderHome:React.FC = () => {
    
    return (
        <>
            <header className='hidden h-16 items-center text-white border-white px-5 md:flex my-5 '>
                <div className={' w-2/12 cursor-pointer'}>
                    <img src={flagSantaCatarinaDesktop} alt="" className={' w-20 '} />
                </div>            
                    
                <div className={'w-8/12 font-semibold'} >
                    <InputSearch id="search-content" placeholder="Pesquisar" />
                </div>

                <div className={' w-2/12 cursor-pointer flex justify-end'}>
                    <img src={flagBrasilDesktop} alt="" className={' w-20 '} />
                </div>    
            </header>
        </>
    )
}

export default HeaderHome