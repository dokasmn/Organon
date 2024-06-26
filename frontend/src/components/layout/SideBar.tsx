// REACT
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

// COMPONENTS
import HorizontalLine from '../items/texts/HorizontalLine';

// IMAGES
import { FiMoreHorizontal } from "react-icons/fi";
import { IoPersonOutline, IoHomeOutline, IoExitOutline  } from "react-icons/io5";


const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const location = useLocation();

  return (
    
    location.pathname !== '/login' && location.pathname !== '/register' ? 
    
    <div className={`hidden md:flex relative w-28`}>
      <div className={`fixed px-5 z-50 flex flex-col pt-10 h-full bg-gradient-blue-top transition-all duration-500 transform ${isOpen ? 'w-64' : 'w-24 items-center'}`}>
        <section className="flex items-center">
          <button
            onClick={toggleSidebar}
            className={`hover:text-blue-5-dark cursor-pointer p-3`}
          >
            <FiMoreHorizontal className='hover:text-blue-5-dark text-blue-5 text-4xl' />
          </button>
        </section>
        <div className={`mt-5 text-white ${isOpen ? 'w-full' : 'flex flex-col items-center'}`}>
          <ul className='w-full'>
            <li className={`flex items-center mb-2 p-3 hover:bg-blue-1-opacity rounded-md cursor-pointer`}>
              <IoHomeOutline className='text-xl' />
              <span className={`ml-4 ${!isOpen && 'hidden'} transition-opacity duration-500`}>Home</span>
            </li>
            <li className={`flex items-center p-3 hover:bg-blue-1-opacity rounded-md cursor-pointer`}>
              <IoPersonOutline className='text-xl'/>
              <span className={`ml-4 ${!isOpen && 'hidden'} transition-opacity duration-500`}>Perfil</span>
            </li>
          </ul>
        </div>
        <div className='absolute bottom-5 w-9/12'>
          <HorizontalLine style='w-full bg-white h-px mb-5'/>
          <button className={`rounded p-3 flex hover:bg-blue-1-opacity ${isOpen ? 'w-full justify-start' : 'justify-center w-full'}`}>
            <IoExitOutline className='text-white text-2xl' />
          </button>
        </div>
      </div>
    </div>
    
    : 
    false
  );
};

export default Sidebar;
