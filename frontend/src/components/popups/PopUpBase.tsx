// REACT
import React, { ReactNode } from 'react';

// COMPONENTS
import Button from '../items/buttons/Button';

// IMAGES
import { IoClose } from "react-icons/io5";

interface PopUpBaseProps {
  onClose: () => void;
  onSave: () => void;
  children: ReactNode;
  title: string;
  isVisible: boolean;
  secondButton?: {text: string, onClick: () => void};
}

const PopUpBase: React.FC<PopUpBaseProps> = ({ onClose, onSave, title, children, isVisible, secondButton }) => {

  return (
    <div className={`fixed inset-0 z-100 ${isVisible ? 'flex' : 'hidden' } items-start justify-center mt-4 ${isVisible ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}>
      <div className="fixed  inset-0 bg-black opacity-50" onClick={onClose}></div>
      <div className={`relative md:w-96 border-l-4 p-6 rounded shadow-lg transform ${isVisible ? 'scale-100' : 'scale-90'} bg-white transition-transform duration-300`} role="alert">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-bold text-xl">{ title }</h2>
          <button onClick={onClose} className="text-lg font-semibold"><IoClose/></button>
        </div>
        { children }
        <div className="flex justify-end">
        {secondButton ? 
          <div className='mr-3' >
            <Button
              text={secondButton.text}
              onClick={secondButton.onClick}
              style="bg-blue-5 hover:bg-blue-5-dark text-white font-semibold py-2 "
            />
          </div>  
          :
          false
        }
        <div>
          <Button
            text='Salvar'
            onClick={onSave}
            style="bg-blue-2 hover:bg-blue-2-dark text-white font-semibold py-2"
          />
        </div>
      </div>
      </div>
    </div>
  );
}

export default PopUpBase;
