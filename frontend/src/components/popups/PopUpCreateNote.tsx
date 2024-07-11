// REACT
import React, { useEffect, useState } from 'react';

// COMPONENTS
import Input from '../items/inputs/Input';
import TextArea from '../items/inputs/TextArea';
import PopUpBase from './PopUpBase';

// HOOKS
import { usePopupLog } from '../../contexts/PopUpLogContext';
import { useAuth } from '../../contexts/AuthContext';

// AXIOS
import axiosInstance from '../../axiosConfig';




interface PopUpCreateNoteProps {
  noteContent: string;
}

const PopUpCreateNote: React.FC<PopUpCreateNoteProps> = ({noteContent}) => {
  const { user } = useAuth()
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const { handleShowError, handleShowSuccess } = usePopupLog();

  const [title, setTitle] = useState<string>("")
  const [noteText, setNoteText] = useState<string>("")

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const onClose = () => {
    setIsVisible(false)
  }
  console.log(noteContent)
  const onSave = () => {
    
    fetchData({'noteTitle': title, 'noteText': noteText, 'noteContent': noteContent})
  }

  const handleSave = () => {
    setIsVisible(false);
    setTimeout(() => {
      onSave();
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
    try {
      const response = await axiosInstance.post('perfil/note/', {
        note_title: data.noteTitle,
        note_text: data.noteText,
        note_content: data.noteContent
      }, {
        headers: {
          'Authorization': `Token ${user.token}`,
          'Content-Type': 'application/json'
        },
      });

      if (response.status === 201) {
        handleShowSuccess("Anotação criada com sucesso")
      }else{
        handleShowError(`Resposta inesperada - ${response.status}`)
        console.error('Unexpected response status:', response.status);
      }
    } catch (error: any) {
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
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder='Inserir título da nota'
          name='titleNote'
        />
      </div>
      <div className="mb-4">
        <TextArea
            id="description-note"
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            placeholder='Inserir descrição da nota'
            name='descriptionNote'
        />
      </div>
    </PopUpBase>
  );
}

export default PopUpCreateNote;
