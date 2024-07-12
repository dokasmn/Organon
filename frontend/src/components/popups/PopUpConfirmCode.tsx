// REACT
import React, { useEffect, useState } from 'react';

// COMPONENTS
import Input from '../items/inputs/Input';
import PopUpBase from './PopUpBase';

// HOOKS
import { useLoading } from '../../contexts/LoadingContext';
import { usePopupLog } from '../../contexts/PopUpLogContext';

// AXIOS
import axiosInstance from '../../axiosConfig';

interface PopUpConfirmCodeProps {
  onSave: (confirmCode: string) => void;
  onClose: () => void;
}

const PopUpConfirmCode: React.FC<PopUpConfirmCodeProps> = ({ onSave, onClose }) => {
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [confirmCode, setConfirmCode] = useState<string>('');
    const { handleShowError } = usePopupLog();
    const { showLoading, setShowLoading } = useLoading()

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

    const resendData = async (): Promise<void> => {
        try {
            const response = await axiosInstance.post('login/user/resend_code/');
            if (response.status === 200) {
                return
            } else {
                handleShowError("Resposta inesperada.");
                console.error('Unexpected response status:', response.status);
            }
        } catch (error: any) {
            setShowLoading(false);
            if(error.response?.data?.detail){
                handleShowError(error.response.data.detail);
            }
            
            handleShowError(`Algo deu errado ${ error.response ? `- ${error.response.status}` : '' }`);
            console.error('Error:', error.message);
        }
    };

    return (
        <PopUpBase secondButton={{'text': 'Reenviar', onClick: () => {resendData()}}} onClose={handleClose} onSave={handleSave} title="Confirmar código" isVisible={isVisible} >
            <div className="mb-4">
            <label className="block font-medium text-gray-700 mb-1">Token:</label>
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
