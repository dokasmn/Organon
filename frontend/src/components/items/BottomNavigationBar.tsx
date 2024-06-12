import React from 'react';

// COMPONENT
import Link from './Link';

// IMAGES
import { IoPersonOutline } from "react-icons/io5";
import { PiLockLight } from "react-icons/pi";
import { IoExitOutline } from "react-icons/io5";
import { GoInbox } from "react-icons/go";

const ButtonNavigationBar:React.FC = () => {
    return (
        <section className={' fixed bottom-0 w-full px-6 py-5 '} >
            <nav className={'bg-blue-3 rounded h-14 '} >
                <ul className='flex h-full text-xl gap-8 justify-center items-center  ' >
                    <li className=' p-3 hover:bg-blue-3-dark rounded cursor-pointer ' >
                        <Link text={<IoPersonOutline className='text-white'/>} style="" to="" />
                    </li>
                    <li className=' p-3 hover:bg-blue-3-dark rounded cursor-pointer ' >
                        <Link text={<GoInbox className='text-white' />} style="" to="" />
                    </li>
                    <li className=' p-3 hover:bg-blue-3-dark rounded cursor-pointer '>
                        <Link text={<PiLockLight className='text-white' />} style="" to="" />
                    </li>
                    <li className=' p-3 hover:bg-blue-3-dark rounded cursor-pointer '>
                        <Link text={<IoExitOutline className='text-white'/>} style="" to="" />
                    </li>
                </ul>
            </nav>
        </section>
    )
}

export default ButtonNavigationBar;