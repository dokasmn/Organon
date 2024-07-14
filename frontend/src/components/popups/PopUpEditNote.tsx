// REACT
import React, { useEffect, useState } from 'react';

// COMPONENTS
import Input from '../items/inputs/Input';
import TextArea from '../items/inputs/TextArea';
import PopUpBase from './PopUpBase';

// HOOKS
import { useAuth } from '../../contexts/AuthContext';
import useForm from '../../hooks/useForm';
import { useLoading } from '../../contexts/LoadingContext';
import useShowError from '../../hooks/useRequests';

// AXIOS
import axiosInstance from '../../axiosConfig';

// IMAGES
import HorizontalLine from '../items/texts/HorizontalLine';

interface PopUpEditNoteProps {
    noteTitle: string;
    color?: string;
    noteId: string;
    noteText: string;
    onClose: () => void;
}

const PopUpEditNote: React.FC<PopUpEditNoteProps> = ({ color, noteTitle, noteText, noteId, onClose }) => {
    const { showError, showUnespectedResponse } = useShowError()
    const { setShowLoading } = useLoading();
    const { user } = useAuth()
    const [isVisible, setIsVisible] = useState<boolean>(true);
    const { formData , handleChange, handleSubmit} = useForm(
        { noteTitle: noteTitle, noteText: noteText},
            (data) => {  
            
            updateNote({'noteTitle': data.noteTitle, 'noteText': data.noteText, 'noteId': noteId });
            onClose();
        }
    );

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const updateNote = async (data: { 
        noteTitle: string,
        noteText: string,
        noteId: string,
    }) => {
        setShowLoading(true);
        try {
        const response = await axiosInstance.put(`perfil/note/${data.noteId}/`, {
            note_title: data.noteTitle,
            note_text: data.noteText,
        }, {
            headers: {
            'Authorization': `Token ${user.token}`,
            'Content-Type': 'application/json'
            },
        });

        if (response.status === 200) {
            window.location.reload();
        }else{
            setShowLoading(false);
            showUnespectedResponse(response);
        }
        } catch (error: any) {
            showError(error);
        }
    };

    const removeNote = async () => {
        try {
        const response = await axiosInstance.delete(`perfil/note/${noteId}/`, {
            headers: {
            'Authorization': `Token ${user.token}`,
            },
        });
        
        if (response.status === 204) {
            window.location.reload();
        }else{
            showUnespectedResponse(response);
        }
        } catch (error: any) {
            showError(error);
        }
    };

    return (
        <PopUpBase onSave={handleSubmit} secondButton={{text: "Deletar", onClick: removeNote}} onClose={onClose} title={
        <HorizontalLine style={`w-full mb-0 rounded py-1 ${color}`}/>
        } isVisible={isVisible}>
        
        <div className="mb-4">
            <Input
            id="title-note"
            type="text"
            value={formData.noteTitle}
            onChange={handleChange}
            placeholder='Titulo da anotação'
            name='noteTitle'
            style='border-gray-1'
            />
        </div>

        <div className="mb-4 ">
            <TextArea
            id="description-note"
            value={formData.noteText}
            onChange={handleChange}
            placeholder='Inserir descrição da nota'
            name='noteText'
            styleProps='border-opacity-50'
            />
        </div>
        </PopUpBase>
    );
}

export default PopUpEditNote;
