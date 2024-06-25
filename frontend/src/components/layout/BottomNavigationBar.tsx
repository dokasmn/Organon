import React from 'react';

// COMPONENT
import Link from '../items/buttons/Link';

// IMAGES
import { IoPersonOutline } from "react-icons/io5";
import { PiLockLight } from "react-icons/pi";
import { IoExitOutline } from "react-icons/io5";
import { GoInbox } from "react-icons/go";

const BottomNavigationBar:React.FC = () => {
    return (
        <section className={'z-50 fixed bottom-0 w-full py-5 flex justify-center px-5 sm:px-14 md:hidden'} >
            <nav className={'bg-blue-3 rounded h-14 min-w-80 w-full'} >
                <ul className='flex h-full text-xl gap-8 sm:gap-16 justify-center items-center  ' >
                    <li className=' p-3 hover:bg-blue-3-dark rounded cursor-pointer ' >
                        <Link text={<IoPersonOutline className='text-white'/>} style="" to="/perfil"/>
                    </li>
                    <li className=' p-3 hover:bg-blue-3-dark rounded cursor-pointer ' >
                        <Link text={<GoInbox className='text-white' />} style="" to="perfil/conteudo"/>
                    </li>
                    <li className=' p-3 hover:bg-blue-3-dark rounded cursor-pointer '>
                        <Link text={<PiLockLight className='text-white' />} style="" to="perfil/seguranca-conta" />
                    </li>
                    <li className=' p-3 hover:bg-blue-3-dark rounded cursor-pointer '>
                        <Link text={<IoExitOutline className='text-white'/>} style="" to="perfil/desativar-conta" />
                    </li>
                </ul>
            </nav>
        </section>
    )
}

export default BottomNavigationBar;