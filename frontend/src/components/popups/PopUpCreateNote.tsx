// REACT
import React, { useEffect, useState } from 'react';

// COMPONENTS
import Input from '../items/inputs/Input';
import TextArea from '../items/inputs/TextArea';
import PopUpBase from './PopUpBase';
import ComboBox from '../items/inputs/ComboBox';

// HOOKS
import { usePopupLog } from '../../contexts/PopUpLogContext';
import { useAuth } from '../../contexts/AuthContext';
import useForm from '../../hooks/useForm';
import { useLoading } from '../../contexts/LoadingContext';

// AXIOS
import axiosInstance from '../../axiosConfig';

// IMAGES
import HorizontalLine from '../items/texts/HorizontalLine';

// UTILS
import { subjectsDict, listObjectsToComboBox } from '../../utils';

interface PopUpCreateNoteProps {
  noteContent: string;
  color?: string;
  subject?: boolean;
  onClose: () => void;
}

const PopUpCreateNote: React.FC<PopUpCreateNoteProps> = ({noteContent, color, subject, onClose}) => {
  const { setShowLoading } = useLoading();
  const { user } = useAuth()
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const { handleShowError, handleShowSuccess } = usePopupLog();
  const { formData , handleChange, handleChangeSelect, handleSubmit} = useForm(
    { noteTitle: '', noteText: '', noteSubject: '' , noteContent: ''},
      (data) => {  
      
      const content = subject ? data.noteContent : noteContent
        
      fetchData({'noteTitle': data.noteTitle, 'noteText': data.noteText, 'noteContent': content});
      onClose();
    }
  );

  const [contents, setContents] = useState<{[key: string]: string} >(
    {
      content_name: "--",
    }
  ) 

  useEffect(() => {
    setIsVisible(true);
  }, []);

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
      setShowLoading(false);
      if(error.response?.data?.detail){
        handleShowError(error.response.data.detail);
      }
      handleShowError(`Algo deu errado ${ error.response ? `- ${error.response.status}` : '' }`);
      console.error('Error:', error.message);
    }
  };


  const fetchContentsBySubject = async () => {
    setShowLoading(true);
    try {
        const response = await axiosInstance.get(`course/content/?content_subject=${formData.noteSubject}`, {
            headers: {
                'Authorization': `Token ${user.token}`,
            },
        })
        setShowLoading(false);
        if (response.status === 200) {
          let dict_contents = listObjectsToComboBox(response.data.results, 'content_name');
          setContents(dict_contents);
        }else{
          handleShowError("Resposta inesperada.")
          console.error('Unexpected response status:', response.status);
        }
    } catch (error: any) {
        setShowLoading(false);
        if(error.response.status != 404){
            setShowLoading(false);
            if(error.response?.data?.detail){    
                handleShowError(error.response.data.detail)
                return 
            }
        }
        handleShowError(`Algo deu errado ${ error.response ? `- ${error.response.status}` : '' }`)
        console.error('Error:', error.message);
    }
  }

  const handleSubjectSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    handleChangeSelect(event);
  }

  useEffect(() => {
    if (formData.noteSubject) {
      fetchContentsBySubject();
    }
  }, [formData.noteSubject]);

  return (
    <PopUpBase onSave={handleSubmit} secondButton={{text: "Cancelar", onClick: onClose}} onClose={onClose} title={
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

      {subject && 
        <>
          <ComboBox
            id= "selectSubject"
            list={subjectsDict}
            value={formData.noteSubject}
            onChange={handleSubjectSelect}
            defaultOption="Matérias"
            style='border mb-5 border-gray-1 border-opacity-50'
            name="noteSubject"
          />
          <ComboBox
            id= "selectContent"
            list={contents}
            value={formData.noteContent}
            onChange={handleChangeSelect}
            defaultOption="Conteúdos"
            style='border mb-5 border-gray-1 border-opacity-50'
            name="noteContent"
          />
        </>
      }
    </PopUpBase>
  );
}

export default PopUpCreateNote;
