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
                <h1 className=' font-semibold text-2xl flex items-center text-center w-2/4 lg:w-1/4'>SEU PERFIL</h1>
                <ul className='flex h-full text-xl lg:text-base gap-16 lg:gap-8 justify-center lg:justify-end items-center w-2/4 lg:w-3/4'>
                    <li className=' py-1 border-white hover:border-b-2 cursor-pointer ' >
                        <Link text={
                            <>
                                <BsPersonGear className='text-white lg:hidden'/>
                                <span className='hidden lg:block' >Perfil</span>
                            </>
                        } style="" to="/perfil"/>
                    </li>
                    <li className=' py-1 border-white hover:border-b-2 cursor-pointer ' >
                        <Link text={
                            <>
                                <BiBookContent className='text-white lg:hidden'/>
                                <span className='hidden lg:block'>Suas Notas</span>
                            </>
                        } style="" to="/conteudo"/>
                    </li>
                    <li className=' py-1 border-white hover:border-b-2 cursor-pointer '>
                        <>
                            <Link text={
                                <>
                                    <PiLockLight className='text-white lg:hidden' />
                                    <span className='hidden lg:block'>Segurança da Conta</span>
                                </>
                            } style="" to="/seguranca-conta" />
                            
                        </>
                    </li>
                    <li className=' py-1 border-white hover:border-b-2 cursor-pointer '>
                        <Link text={
                            <>
                                <IoRemoveCircleOutline className='text-white lg:hidden'/>
                                <span className='hidden lg:block'>Desativar Conta</span>
                            </>
                        } style="" to="/desativar-conta"/>
                    </li>
                </ul>
            </nav>
        </section>
    )
}

export default TopNavigationBar;