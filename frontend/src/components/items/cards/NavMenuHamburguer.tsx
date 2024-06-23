import React, {useState, useMemo} from 'react';

// COMPONENTS
import Link from '../buttons/Link';

// IMAGES
import { IoHomeOutline, IoPersonOutline } from "react-icons/io5";
import { IoExitOutline } from "react-icons/io5";


const NavMenuHamburguer:React.FC = () => {
    return (
        <nav className=' bg-blue-5 py-7  ' >
            <ul>
                <li>
                    <Link 
                        style="text-white flex justify-center" 
                        to="" 
                        text={<p className='flex gap-4'><IoHomeOutline className='text-xl' />Home</p>} 
                    />  
                </li>
                <li className='mt-7' >
                    <Link 
                        style="text-white flex justify-center" 
                        to="/perfil" 
                        text={<p className='flex gap-4'><IoPersonOutline className='text-xl' />Perfil</p>} 
                    />
                </li>
                <li className='mt-7' >
                    <Link 
                        style="text-white flex justify-center" 
                        to="/logout" 
                        text={<p className='flex gap-4'><IoExitOutline className='text-xl' />Deslogar</p>} 
                    />
                </li>
            </ul>
        </nav>
    )
}

export default NavMenuHamburguer;