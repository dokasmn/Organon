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
        <section className={' fixed bottom-0 w-full px-6 py-5 '} >
            <nav className={'bg-blue-3 rounded h-14 '} >
                <ul className='flex h-full text-xl gap-8 justify-center items-center  ' >
                    <li className=' p-3 hover:bg-blue-3-dark rounded cursor-pointer ' >
                        <Link text={<IoPersonOutline className='text-white'/>} style="" to="/profile" />
                    </li>
                    <li className=' p-3 hover:bg-blue-3-dark rounded cursor-pointer ' >
                        <Link text={<GoInbox className='text-white' />} style="" to="/contents" />
                    </li>
                    <li className=' p-3 hover:bg-blue-3-dark rounded cursor-pointer '>
                        <Link text={<PiLockLight className='text-white' />} style="" to="/security-account" />
                    </li>
                    <li className=' p-3 hover:bg-blue-3-dark rounded cursor-pointer '>
                        <Link text={<IoExitOutline className='text-white'/>} style="" to="/close-account" />
                    </li>
                </ul>
            </nav>
        </section>
    )
}

export default BottomNavigationBar;