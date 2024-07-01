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

// UTILS
import { upperCaseFirstLetter,getRoute } from '../../utils';

const Header:React.FC = () => {
    const location = useLocation();
    
    const [navBar, setNavBar] = useState<boolean>(false);

    const handleClick: React.MouseEventHandler<HTMLDivElement> = () => {
        setNavBar(!navBar);
    };

    const route = getRoute()[0];
    const titleHeader =  upperCaseFirstLetter(route);
    
    return (
        <>
            {
                location.pathname !== "/login" && location.pathname !== "/registrar" && location.pathname !== "/bem-vindo" ?
                <>
                    <header className='bg-blue-5 py-3 text-white sm:px-14 md:hidden xs:px-14 md:pt-32 md:px-10 '>
                        <div className='flex items-center px-5' >
                            {
                                location.pathname === "/home" || location.pathname === "/" ? 
                                    <div className={' w-24 cursor-pointer '}>
                                        <img src={flagSantaCatarina} alt="" className={' w-10 '} />
                                    </div>            
                                :
                                    <div className={' w-24 cursor-pointer max-w-16 '}>
                                        <Link to='/home' text={
                                                <img src={logo} alt="" className={' w-10 '} />
                                            }
                                        />
                                    </div>
                            }

                            <div className={'w-full font-semibold'} >
                                {
                                    location.pathname === "/home" || location.pathname === "/" ? 
                                        <InputSearch id="search-content" placeholder="Pesquisar" />
                                    :
                                        <p>{ titleHeader }</p>
                                }
                            </div>
                            <div className={' w-24 flex justify-end cursor-pointer h-full items-center'} >
                                <div className={' p-3 rounded hover:bg-dark-primary-op-1 '} onClick={handleClick} >
                                    <RiMenu2Fill className={' text-2xl '}/>
                                </div>
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