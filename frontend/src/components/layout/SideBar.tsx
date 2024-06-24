// REACT
import React, { useState } from 'react';

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

  return (
    <div className="hidden md:flex relative ">
      <div className={` hidden md:flex fixed z-50 top-0 left-0 h-full bg-gradient-blue-top  transition-width duration-300 ${isOpen ? 'w-64 pl-5' : 'w-24 justify-center'}`}>
        <button
          onClick={toggleSidebar}
          className={`absolute top-5 rounded-full focus:outline-none transform transition-transform ${isOpen ? 'ml-3' : false}`}
        >
            <FiMoreHorizontal className=' text-blue-5 text-4xl ' />
        </button>
        <div className="mt-20 text-white">
          <ul>
            <li className="flex items-center mb-2 p-3 hover:bg-blue-1-opacity rounded-md">
              <IoHomeOutline className='text-xl' />
              <span className={`ml-4 ${!isOpen && 'hidden'}`}>Home</span>
            </li>
            <li className="flex items-center p-3 hover:bg-blue-1-opacity rounded-md">
              <IoPersonOutline className='text-xl'/>
              <span className={`ml-4 ${!isOpen && 'hidden'}`}>About</span>
            </li>
          </ul>

          
            
        </div>
        
        <label className='absolute bottom-5    ' >
            <HorizontalLine style='w-full bg-white'/>
            <button
                className={`rounded p-3 flex hover:bg-blue-1-opacity `}
            >
                
                <IoExitOutline className=' text-white text-2xl   ' />
            </button>
        </label>
        
        
        
               
        
      </div>
    </div>
  );
};

export default Sidebar;
