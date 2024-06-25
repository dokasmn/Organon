// REACT
import React, { useState } from 'react';

// COMPONENTS
import HorizontalLine from '../items/texts/HorizontalLine';

// IMAGES
import { FiMoreHorizontal } from "react-icons/fi";
import { IoPersonOutline, IoHomeOutline, IoExitOutline  } from "react-icons/io5";
import { useLocation } from 'react-router-dom';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const location = useLocation();

  return (
    
    location.pathname !== '/login' && location.pathname !== '/register' ? 
    <>
    <div className={`hidden md:flex relative `}>
      <div className={`hidden md:flex fixed z-50 top-0 left-0 h-full bg-gradient-blue-top transition-width duration-300 transform transition-transform ${isOpen ? 'w-64 pl-5 px-5' : 'w-24 justify-center'}`}>
        <section  >
            <button
              onClick={toggleSidebar}
              className={`hover:text-blue-5-dark absolute top-5 rounded-md transform transition-transform ${isOpen ? 'rotate-0' : 'rotate-180'}`}
              >
            <FiMoreHorizontal className='hover:text-blue-5-dark text-blue-5 text-4xl ' />  
            </button>
        </section> 
        
          
        <div className={`mt-20 ${isOpen ? 'w-full' : 'flex'} text-white`}>
          <ul>
            <li className={`flex items-center  mb-2 p-3 hover:bg-blue-1-opacity rounded-md`}>
              <IoHomeOutline className='text-xl' />
              <span className={`ml-4 ${!isOpen && 'hidden'}`}>Home</span>
            </li>
            <li className={`flex items-center p-3 hover:bg-blue-1-opacity rounded-md `}>
              <IoPersonOutline className='text-xl'/>
              <span className={`ml-4 ${!isOpen && 'hidden'}`}>Perfil</span>
            </li>
          </ul>
        </div>
        <label className='absolute bottom-5 w-9/12' >
          <HorizontalLine style='w-full bg-white'/>
          <button className={`rounded p-3 flex hover:bg-blue-1-opacity ${isOpen ? 'w-full justify-start': 'justify-center w-full'} `}> 
            <IoExitOutline className=' text-white text-2xl   ' />
          </button>
        </label>
      </div>
    </div>
    <section className="w-16 mr-9"></section>
    </>
    : 
    false
  );
};

export default Sidebar;
