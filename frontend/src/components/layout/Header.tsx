//REACT
import {useState} from 'react';
import { useLocation } from 'react-router-dom';
import React from 'react';

//COMPONENTS
import InputSearch from '../items/inputs/InputSearch';
import NavMenuHamburguer from '../items/cards/NavMenuHamburguer';
import Link from '../items/buttons/Link';

//IMAGES
import logo from '../../assets/images/logo.png';
import flagSantaCatarina from '../../assets/images/flag_santa_catarina.png'
import { RiMenu2Fill } from "react-icons/ri";

const Header:React.FC = () => {
    const location = useLocation();
    
    let [navBar, setNavBar] = useState<boolean>(false);

    const handleClick: React.MouseEventHandler<HTMLDivElement> = (event) => {
        setNavBar(!navBar);
    };
    return (
        <>
            {
                location.pathname !== "/login" && location.pathname !== "/registrar" && location.pathname !== "/bem-vindo" ?
                <>
                    <header className='bg-blue-5 h-16 flex items-center text-white border-white px-5 '>
                        <div className={' w-3/12 cursor-pointer'}>
                            {
                                location.pathname === "/home" || location.pathname === "/" ? 
                                    <img src={flagSantaCatarina} alt="" className={' w-14 '} />
                                    
                                :
                                <Link to='/home' text={
                                        <img src={logo} alt="" className={' w-10 '} />
                                    }
                                />
                            }
                        </div>
                        <div className={'w-8/12 font-semibold max-w'} >
                            {
                                location.pathname === "/home" || location.pathname === "/" ? 
                                    <InputSearch id="search-content" placeholder="Pesquisar" />
                                :
                                    <p>Perfil</p>
                            }
                        </div>
                        <div className={' w-4/12 flex justify-end cursor-pointer h-full items-center'} >
                            <div className={' p-3 rounded hover:bg-dark-primary-op-1 '} onClick={handleClick} >
                                <RiMenu2Fill className={' text-2xl '}/>
                            </div>
                        </div>
                    </header>
                    {
                        navBar ? 
                        <NavMenuHamburguer/>
                        :
                        false
                    }
                </>
                :
                false 
            }
            
        </>  
    )
}

export default Header