// REACT
import React, { useEffect, useState } from 'react';

// HOOKS
import { usePopupLog } from './PopUpLogContext';

// IMAGES
import { IoClose } from "react-icons/io5";

const PopupLog: React.FC = () => {
  const { showPopup, popupType, popupTitle, popupMessage, handleClosePopup } = usePopupLog();
  const popupStyle = popupType === 'success' ? 'bg-green-100 border-green-400 text-green-700' : 'bg-red-100 border-red-400 text-red-700';

  if (!showPopup) return null;

  return (
    <div className={`fixed inset-0 z-50 flex items-start justify-center mt-4 ${showPopup ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}>
      <div className="fixed inset-0 bg-black opacity-50" onClick={handleClosePopup}></div>
      <div className={`relative border-l-4 p-4 rounded shadow-lg transform ${showPopup ? 'scale-100' : 'scale-90'} ${popupStyle} transition-transform duration-300`} role="alert">
        <div className="flex justify-between items-center">
          <div>
            <p className="font-bold">{popupTitle}</p>
            <p className="text-sm">{popupMessage}</p>
          </div>
          <button onClick={handleClosePopup} className="text-lg font-semibold pl-10"><IoClose/></button>
        </div>
      </div>
    </div>
  );
}

export default PopupLog;
