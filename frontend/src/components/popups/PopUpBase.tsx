// REACT
import React, { ReactNode } from 'react';

// COMPONENTS
import Button from '../items/buttons/Button';
import HorizontalLine from '../items/texts/HorizontalLine';

// IMAGES
import { IoClose } from "react-icons/io5";

interface PopUpBaseProps {
  onClose: () => void;
  onSave: (event: React.FormEvent<HTMLFormElement>) => void;
  children: ReactNode;
  title: string | ReactNode;
  isVisible: boolean;
  secondButton?: {text: string, onClick: () => void};
}

const PopUpBase: React.FC<PopUpBaseProps> = (
  { 
    onClose, 
    onSave, 
    title, 
    children, 
    isVisible, 
    secondButton,
  }
) => {

  return (
    <form onSubmit={onSave} className={`fixed  inset-0 z-100 ${isVisible ? 'flex' : 'hidden' } items-start justify-center mt-4 ${isVisible ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}>
      <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
      <div className={`relative md:w-96 border-l-4 p-6 rounded md:rounded-none shadow-lg transform ${isVisible ? 'scale-100' : 'scale-90'} bg-white transition-transform duration-300`} role="alert">
        <div className="flex justify-between items-center mb-5">
          <h2 className="font-bold text-xl w-10/12 p-0">{ title }</h2> 
          <button type='button' onClick={onClose} className="text-lg font-semibold" >{<IoClose/>}</button>
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
            type='submit'
            text='Salvar'
            style="bg-blue-2 hover:bg-blue-2-dark text-white font-semibold py-2"
          />
        </div>
      </div>
      </div>
    </form>
  );
}

export default PopUpBase;
