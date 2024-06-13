//REACT
import {Link} from 'react-router-dom';
import {useState} from 'react';
import { useLocation } from 'react-router-dom';
import React from 'react';

//COMPONENTS
import InputSearch from '../items/InputSearch';
import NavMenuHamburguer from '../items/NavMenuHamburguer';

//IMAGES
import logo from '../../assets/images/logo.png';
import menuHamburguer from '../../assets/icons/menuHamburguer.png'
import { RiMenu2Fill } from "react-icons/ri";

// interface HeaderProps{
//     search?: boolean,
// }

const Header:React.FC = () => {
    const location = useLocation();
    console.log(location)
    let [navBar, setNavBar] = useState<boolean>(false);

    const handleClick: React.MouseEventHandler<HTMLDivElement> = (event) => {
        setNavBar(!navBar);
    };

    return (
        <>
            <section className='bg-blue-5 h-16 flex items-center text-white'>
                <div className={' w-4/12 flex justify-center cursor-pointer'}>
                    <img src={logo} alt="" className={' w-10 '} />
                </div>
                <div className={' w-7/12 font-semibold'} >
                    {
                        location.pathname === "/home" || location.pathname === "/" ? 
                            <InputSearch id="search-content" placeholder="Pesquisar" />
                        :
                            <p>Perfil</p>
                    }
                    
                </div>
                <div className={' w-4/12 flex justify-center cursor-pointer h-full items-center'} >
                    <div className={' p-3 rounded hover:bg-dark-primary-op-1 '} onClick={handleClick} >
                        <RiMenu2Fill className={' text-2xl '}/>
                    </div>
                </div>
                
            </section>

            {
                navBar ? 
                <NavMenuHamburguer/>
                :
                false
            }
            
        </>
        
    )
}


export default Header