// REACT
import React, { useEffect, useState } from 'react';

// COMPONENTS
import Input from '../items/inputs/Input';
import Button from '../items/buttons/Button';

// IMAGES
import { IoClose } from "react-icons/io5";

interface PopUpConfirmCodeProps {
  onSave: (confirmCode: string) => void;
  onClose: () => void;
}

const PopUpConfirmCode: React.FC<PopUpConfirmCodeProps> = ({ onSave, onClose }) => {
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [confirmCode, setConfirmCode] = useState<string>('');

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const handleSave = () => {
        setIsVisible(false);
        setTimeout(() => {
        onSave(confirmCode);
        onClose();
        }, 300);
    };

    const handleClose = () => {
        setIsVisible(false);
        setTimeout(onClose, 300);
    };

    return (
        <div className={`fixed inset-0 z-50 flex items-start justify-center mt-4 ${isVisible ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}>
        <div className="fixed  inset-0 bg-black opacity-50" onClick={handleClose}></div>
        <div className={`relative md:w-96 border-l-4 p-6 rounded shadow-lg transform ${isVisible ? 'scale-100' : 'scale-90'} bg-white transition-transform duration-300`} role="alert">
            <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold text-lg sm:text-xl mb:text-2xl">Confirmar Código</h2>
            <button onClick={handleClose} className="text-lg font-semibold"><IoClose/></button>
            </div>
            <div className="mb-4">
            <label className="block font-medium text-gray-700 mb-1">Confirmar código de segurança:</label>
            <Input
                type="text"
                value={confirmCode}
                onChange={(e) => setConfirmCode(e.target.value)}
                id='confirm-code-input'
                placeholder='Digite o código aqui'
            />
            </div>
            <div className="flex justify-end">
            <div>
                <Button
                    onClick={handleSave}
                    style="bg-blue-2 text-white py-2 px-4 hover:bg-blue-2-dark"
                    text="Save"
                />
            </div>
            </div>
        </div>
        </div>
    );
}

export default PopUpConfirmCode;
