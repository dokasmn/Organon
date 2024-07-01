// REACT
import React, { useEffect, useState } from 'react';

// IMAGES
import { IoClose } from "react-icons/io5";

interface PopupLogProps {
  type: 'success' | 'error';
  title: string;
  message: string;
  onClose: () => void;
}

const PopupLog: React.FC<PopupLogProps> = ({ type, title, message, onClose }) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const popupStyle = type === 'success' ? 'bg-green-100 border-green-400 text-green-700' : 'bg-red-100 border-red-400 text-red-700';

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300); // Tempo da animação de saída
  };

  return (
    <div className={`fixed inset-0 z-50 flex items-start justify-center mt-4 ${isVisible ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}>
      <div className="fixed inset-0 bg-black opacity-50" onClick={handleClose}></div>
      <div className={`relative border-l-4 p-4 rounded shadow-lg transform ${isVisible ? 'scale-100' : 'scale-90'} ${popupStyle} transition-transform duration-300`} role="alert">
        <div className="flex justify-between items-center">
          <div>
            <p className="font-bold">{title}</p>
            <p className="text-sm">{message}</p>
          </div>
          <button onClick={handleClose} className="text-lg font-semibold pl-10"><IoClose/></button>
        </div>
      </div>
    </div>
  );
}

export default PopupLog;
