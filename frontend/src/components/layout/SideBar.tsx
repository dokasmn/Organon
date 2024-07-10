// REACT
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

// COMPONENTS
import HorizontalLine from '../items/texts/HorizontalLine';
import Link from '../items/buttons/Link';

// IMAGES
import { FiMoreHorizontal } from "react-icons/fi";
import { IoPersonOutline, IoHomeOutline, IoExitOutline, IoAddCircleOutline  } from "react-icons/io5";

// HOOKS
import { useAuth } from '../../contexts/AuthContext';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth()

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const location = useLocation();

  return (
    location.pathname !== '/login' && location.pathname !== '/registrar' && location.pathname !== '/bem-vindo' ? 

    <div className={`hidden md:flex relative min-w-24`}>
      <div className={`fixed shadow-xl-right px-5 z-50 flex flex-col pt-5 h-full bg-gradient-blue-top transition-all duration-500 ${isOpen ? 'w-64' : 'w-24 items-center'}`}>
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
              <Link 
                style='flex items-center'
                text={  
                <>
                  <IoHomeOutline className='text-xl' />
                  <span className={`ml-4 transition-all duration-600 ${!isOpen && 'invisible opacity-0 absolute'}`}>Home</span>
                </>
              } to="/home" />
            </li>
            <li className={` p-3 mb-2 hover:bg-blue-1-opacity rounded-md cursor-pointer `}>
              <Link 
                style='flex items-center'
                text={
                <>
                  <IoPersonOutline className='text-xl'/>
                  <span className={`ml-4 transition-all duration-600 ${!isOpen && 'invisible opacity-0 absolute'}`}>Perfil</span>
                </>
                }
                to="/perfil"
              />
              
            </li>
            { user.is_school_user &&  
              <li className={` p-3 hover:bg-blue-1-opacity rounded-md cursor-pointer`}>
                <Link 
                  style='flex items-center'
                  text={
                  <>
                    <IoAddCircleOutline className='text-xl'/>
                    <span className={`ml-4 transition-all duration-500 min-w-36 ${!isOpen && 'invisible opacity-0 absolute'}`}>Adicionar Professor</span>
                  </>
                  }
                  to="/adicionar_professor"
                />
              </li>
            }
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
