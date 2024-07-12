// REACT
import React, { useState } from 'react';

// COMPONENTES
import Button from '../buttons/Button';

// HOOKS
import useForm from '../../../hooks/useForm';
import { useLoading } from '../../../contexts/LoadingContext';
import { usePopupLog } from '../../../contexts/PopUpLogContext';

// IMAGES
import { IoSendOutline } from "react-icons/io5";
import InputIcon from './InputIcon';

// AXIOS
import axiosInstance from '../../../axiosConfig';
import { useAuth } from '../../../contexts/AuthContext';

interface CommentInputProps{
    contentSubjectId: Number
}

const CommentInput: React.FC<CommentInputProps> = ({contentSubjectId}) => {

    const { setShowLoading } = useLoading();
    const { handleShowError, handleShowSuccess } = usePopupLog();
    const { user } = useAuth()
    const { formData, handleChange, handleSubmit } = useForm(
        { comment: '' },
        (data) => {
            fetchData(data);
        }
    )

    const fetchData = async (data: { comment: string }) => {
        setShowLoading(true);
        try {
            const response = await axiosInstance.post('course/comment/', {
                comment_text: data.comment,
                fk_user: user.id,
                fk_content: contentSubjectId
            }, {
                headers: {
       
                    'Authorization': `Token ${user.token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            setShowLoading(false);
            
            const token = response.data.token
            localStorage.setItem('authToken', token);
            
            if  (response.status !== 201) {
                handleShowError("Resposta inesperada.");
                console.error('Unexpected response status:', response.status);
            }else{
                handleShowSuccess("SUCCESS!");
            }
        } catch (error: any) {
            setShowLoading(false);
            if(error.response?.data?.detail){    
                handleShowError(error.response.data.detail)
                return 
            }
            handleShowError(`Algo deu errado ${ error.response ? `- ${error.response.status}` : '' }`)
            console.error('Error:', error.message);
        }
    };

    return (
        <form className='w-full max-w-160' onSubmit={handleSubmit} >
            <InputIcon
                value={formData.comment}
                type="text"
                name="comment"
                id="comment-input"
                placeholder="Escreva aqui"
                required
                onChange={handleChange}
                maxLength={75}
                minLength={2}
                icon={IoSendOutline}
            />
            <div className='flex justify-end' >
                <div className='w-24' >
                    <Button type='submit' text="Enviar" style='bg-blue-1 hover:bg-blue-1-dark ' />
                </div>
            </div>
        </form>
    );
};

export default CommentInput;
