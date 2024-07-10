// REACT
import React, { useEffect, useState } from 'react';

// COMPONENTS
import Input from '../items/inputs/Input';
import TextArea from '../items/inputs/TextArea';
import PopUpBase from './PopUpBase';

// HOOKS
import { useLoading } from '../../contexts/LoadingContext';
import { usePopupLog } from '../../contexts/PopUpLogContext';
import { useAuth } from '../../contexts/AuthContext';

// AXIOS
import axiosInstance from '../../axiosConfig';

interface PopUpCreateNoteProps {
  initialUsername: string;
  initialProfilePic: string;
  onSave: (username: string, profilePic: string) => void;
  onClose: () => void;
}

const PopUpCreateNote: React.FC<PopUpCreateNoteProps> = ({ initialUsername, initialProfilePic, onSave, onClose }) => {
  const { user } = useAuth()
  const { showLoading, setShowLoading } = useLoading();
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [username, setUsername] = useState<string>(initialUsername);
  const [profilePic, setProfilePic] = useState<string>(initialProfilePic);
  const { handleShowError, handleShowSuccess } = usePopupLog();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleSave = () => {
    setIsVisible(false);
    setTimeout(() => {
      onSave(username, profilePic);
      // fetchData();
      onClose();
    }, 300);
  };

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  const fetchData = async (data: { 
    noteTitle: string,
    noteText: string,
    noteContent: string,
    
  }) => {
  setShowLoading(true);
  try {
    const response = await axiosInstance.post('home/content/', {
      note_title: data.noteTitle,
      note_text: data.noteText,
      note_content: data.noteContent
    }, {
      headers: {
        'Authorization': `Token ${user.token}`,
        'Content-Type': 'application/json'
      },
    });
      setShowLoading(false);
      if (response.status === 201) {
        handleShowSuccess("Anotação criada com sucesso")
      }else{
        handleShowError(`Resposta inesperada - ${response.status}`)
        console.error('Unexpected response status:', response.status);
      }
    } catch (error: any) {
      setShowLoading(false);
      try{
        if(error.response.data && error.response.data.detail){    
            handleShowError(error.response.data.detail)
        }else{
            handleShowError(`Algo deu errado - ${error.response.status}`)    
        }
      }catch{
          handleShowError(`Algo deu errado - ${error.response.status}`)
      }
      console.error('Error:', error.message);
    }
  };

  return (
    <PopUpBase onSave={handleSave} onClose={handleClose} title="Criar Uma Nota" isVisible={isVisible}>
      <div className="mb-4">
        <label className="block text-gray-700 mb-3">Título:</label>
        <Input
          id="title-note"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder='Inserir título da nota'
          name='titleNote'
        />
      </div>
      <div className="mb-4">
        <TextArea
            id="description-note"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder='Inserir descrição da nota'
            name='descriptionNote'
        />
      </div>
    </PopUpBase>
  );
}

export default PopUpCreateNote;
