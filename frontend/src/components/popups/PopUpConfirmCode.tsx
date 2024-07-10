// REACT
import React, { useEffect, useState } from 'react';

// COMPONENTS
import Input from '../items/inputs/Input';
import Button from '../items/buttons/Button';
import PopUpBase from './PopUpBase';

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
        <PopUpBase onClose={handleClose} onSave={handleSave} title="Confirmar código" isVisible={isVisible} >
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
        </PopUpBase>
    );
}

export default PopUpConfirmCode;
