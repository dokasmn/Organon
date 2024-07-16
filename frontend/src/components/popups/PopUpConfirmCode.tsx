// REACT
import React, { useEffect, useState } from 'react';

// COMPONENTS
import Input from '../items/inputs/Input';
import PopUpBase from './PopUpBase';

// HOOKS
import useRequests from '../../hooks/useRequests';

// AXIOS
import axiosInstance from '../../axiosConfig';

interface PopUpConfirmCodeProps {
  onSave: (confirmCode: string) => void,
  onClose: () => void,
  userEmail: string,
}

const PopUpConfirmCode: React.FC<PopUpConfirmCodeProps> = ({ onSave, onClose, userEmail }) => {
    const { showError, showUnespectedResponse } = useRequests();
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

    const resendData = async (): Promise<void> => {
        try {
            const response = await axiosInstance.post('login/user/resend_code/', {
                email: `${userEmail}`
            });
            if (response.status === 200) {
                console.log(response)
            } else {
                showUnespectedResponse(response);
            }
        } catch (error: any) {
            showError(error);
        }
    };

    return (
        <PopUpBase secondButton={{'text': 'Reenviar', onClick: () => {resendData()}}} onClose={handleClose} onSave={(handleSave)} title="Confirmar código" isVisible={isVisible} >
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
