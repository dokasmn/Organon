// REACT
import React, { useEffect, useState } from 'react';
import axiosInstance from '../axiosConfig';
import { v4 as uuidv4 } from 'uuid';

// COMPONENTS
import TitleSection from '../components/layout/TitleSection';
import UploadFileMobile from '../components/items/inputs/UploadFile';
import TextArea from '../components/items/inputs/TextArea';
import HorizontalLine from '../components/items/texts/HorizontalLine';
import BottomNavigationBar from '../components/layout/BottomNavigationBar';
import TopNavigationBar from '../components/layout/TopNavigationBar';
import Button from '../components/items/buttons/Button';
import Input from '../components/items/inputs/Input';

// HOOKS
import { usePopupLog } from '../contexts/PopUpLogContext';
import { useLoading } from '../contexts/LoadingContext';
import useForm from '../hooks/useForm';
import { useAuth } from '../contexts/AuthContext';

// IMAGES
import { FiBookOpen } from "react-icons/fi";
import { BsNodePlus } from "react-icons/bs";
import { IoCreateOutline } from "react-icons/io5";

// UTILS
import { subjects } from '../utils';

// IMAGES

const CreateContent:React.FC = () => {
    const { user } = useAuth()
    const { setShowLoading } = useLoading();
    const { handleShowError, handleShowSuccess } = usePopupLog();

    const { formData, handleChangeSelect , handleSubmit, handleChange, handleFileChange} = useForm(
        { 
            title: '',
            subject: subjects[0],
            position: '',
            uploadVideo: null,
            uploadImage: null,
            descriptionContent: '',
        },
        (data) => {
            console.log(data)
            fetchData(data);
        }
    );

    const fetchData = async (data: { 
                                title: string,
                                subject: string, 
                                position: string, 
                                uploadVideo: File | null,
                                uploadImage: File | null, 
                                descriptionContent: string
    }) => {
        setShowLoading(true);

        const formData = new FormData();
        formData.append('content_name', data.title);
        formData.append('content_description', data.descriptionContent);

        if (data.uploadVideo) {
            console.log("vai adicionar video")
            formData.append('content_video', data.uploadVideo);
        }

        if (data.uploadImage) {
            console.log("vai adicionar pdf")
            formData.append('content_pdf', data.uploadImage);
        }

        formData.append('content_subject', data.subject);
        formData.append('content_position', data.position);

        console.log(formData);

        try {
            const response = await axiosInstance.post('home/content/', formData, {
                headers: {
       
                    'Authorization': `Token ${user.token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            setShowLoading(false);
            if (response.status === 201) {
                handleShowSuccess("Conteúdo criado com sucesso")
            }else{
                handleShowError("Resposta inesperada.")
                console.error('Unexpected response status:', response.status);
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
        <div className="sm:flex justify-center">
            <TopNavigationBar/>
            <div>
                <main className="xs:px-14 md:pt-40 md:px-10 max-w-160 sm:min-w-160" >
                    <section className='px-5 xs:px-0 mb-5 md:mb-0 md:px-0'>
                        <TitleSection title="CONTENTS" />
                    </section>
                    <section className='bg-white-2 px-5 py-10 md:shadow-md' >
                        <h3 className=' font-bold text-xl mb-2'>Adicionar Conteúdo</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.!</p>
                    </section>
                    <form className='w-full p-5 xs:px-0 sm:px-0 md:px-0 flex flex-col gap-5' onSubmit={handleSubmit} >
                        <div>
                            <label htmlFor="title-content" className='block font-semibold mb-5'>Título:</label>
                            <label htmlFor="title-content" className='border border-black rounded md:rounded-none flex h-10' >
                                <div className='bg-white-2 h-full w-10 min-w-8 rounded flex justify-center items-center ' >
                                    <IoCreateOutline/>
                                </div>
                                <Input 
                                    onChange={handleChange}
                                    value={formData.title}
                                    type='text' 
                                    id='title-content' 
                                    placeholder='Matrizes' 
                                    name='title'
                                    style='h-full border-none bg-white'
                                />
                            </label>
                        </div>
                        <div className='flex justify-between items-center' >
                            <div className='w-8/12 mr-2' >
                                <label htmlFor="select-subject" className='block font-semibold mb-5'>Matéria:</label>
                                <label htmlFor="" className='border border-black rounded md:rounded-none flex h-10'>
                                    <div className='bg-white-2 h-full w-10 min-w-8 rounded flex justify-center items-center' >
                                        <FiBookOpen/>
                                    </div>
                                    <select name="subject" onChange={handleChangeSelect} value={formData.subject} id="select-subject" className='p-0.5 px-3 bg-white rounded w-full'>
                                        {subjects.map((subj) => (
                                            <option key={uuidv4()} value={subj}>{subj}</option>
                                        ))}
                                    </select>
                                </label>
                            </div>
                            <div className='w-4/12 ml-2 '>
                                <label htmlFor="select-subject" className='block font-semibold mb-5' >Posição:</label>
                                <label htmlFor="position-content" className='border border-black rounded md:rounded-none flex h-10' >
                                    <div className='bg-white-2 h-full w-10 min-w-8 rounded flex justify-center items-center ' >
                                        <BsNodePlus/>    
                                    </div>
                                    <Input 
                                        onChange={handleChange}
                                        value={formData.position}
                                        type="number"
                                        id='position-content' 
                                        placeholder='1º' 
                                        name="position"
                                        style="h-full border-none bg-white"
                                    />
                                </label>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="upload-video" className='block font-semibold pb-5'>Vídeo:</label>
                            <UploadFileMobile 
                                text="Upload Vídeo" 
                                id="uploadVideo" 
                                onChange={handleFileChange}
                            />
                        </div>
                        <div >
                            <label htmlFor="upload-content" className='block font-semibold pb-5'>Conteúdo:</label>
                            <UploadFileMobile 
                                text="Upload Conteúdo"
                                id="uploadImage"
                                onChange={handleFileChange}
                            />
                        </div>
                        <div className='mb-5' >
                            <label htmlFor="descriptionContent" className='block font-semibold pb-5'>Descrição:</label>
                            <TextArea 
                                id="descriptionContent"
                                name="descriptionContent" 
                                placeholder='Hoje iremos estudar sobre...'
                                onChange={handleChange}
                                value = {formData.descriptionContent}
                            />
                        </div>
                        <HorizontalLine style='w-full mb-5'/>
                        <div >
                            <Button 
                                text='Save' 
                                type='submit'
                                style='mb-5 bg-blue-5 hover:bg-blue-5-dark'
                            />
                            <Button 
                                text='Cancel' 
                                style='bg-white-2-dark hover:bg-gray-1 ' 
                            />
                        </div>
                    </form>
                </main>
                <BottomNavigationBar/>
            </div>
        </div> 
    )
}

export default CreateContent;