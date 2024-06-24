import React from 'react';

// COMPONENT
import Link from '../items/buttons/Link';

// IMAGES
import { PiLockLight } from "react-icons/pi";
import { IoExitOutline, IoRemoveCircleOutline } from "react-icons/io5";
import { BsPersonGear } from "react-icons/bs";
import { BiBookContent } from "react-icons/bi";


const TopNavigationBar:React.FC = () => {
    return (
        <section className={'hidden z-40 absolute top-0 w-full py-5 md:flex justify-center pr-5'} >
            <nav className={'bg-blue-3 flex text-white rounded h-20 w-full px-10'} >
                <h1 className=' font-semibold text-2xl flex items-center text-center w-2/4' >YOUR PROFILE</h1>
                <ul className='flex h-full text-xl gap-8 justify-center items-center w-2/4' >
                    <li className=' p-3 hover:bg-blue-3-dark rounded cursor-pointer ' >
                        <Link text={<BsPersonGear className='text-white'/>} style="" to="/perfil"/>
                    </li>
                    <li className=' p-3 hover:bg-blue-3-dark rounded cursor-pointer ' >
                        <Link text={<BiBookContent className='text-white' />} style="" to="/conteudo"/>
                    </li>
                    <li className=' p-3 hover:bg-blue-3-dark rounded cursor-pointer '>
                        <Link text={<PiLockLight className='text-white' />} style="" to="/segurança-conta" />
                    </li>
                    <li className=' p-3 hover:bg-blue-3-dark rounded cursor-pointer '>
                        <Link text={<IoRemoveCircleOutline className='text-white'/>} style="" to="/desativar-conta" />
                    </li>
                </ul>
            </nav>
        </section>
    )
}

export default TopNavigationBar;