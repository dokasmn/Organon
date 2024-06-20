// // REACT
// import React, { useState } from 'react';

// COMPONENTS
import TitleSection from '../components/layout/TitleSection';
import UploadFileMobile from '../components/items/inputs/UploadFileMobile';
import TextArea from '../components/items/inputs/TextArea';
import ButtonBigMobile from '../components/items/buttons/ButtonBigMobile';
import HorizontalLine from '../components/items/texts/HorizontalLine';
import BottomNavigationBar from '../components/layout/BottomNavigationBar';

// IMAGES
import { FiBookOpen } from "react-icons/fi";
import { BsNodePlus } from "react-icons/bs";

import useForm from '../hooks/useForm';

const CreateContent:React.FC = () => {

    const { formData, handleChangeSelect , handleSubmit, handleChange} = useForm(
        { 
            subject: '',
            position: '',
            uploadVideo: File,
            uploadImage: File,
            description: '',
            UploadFileMobile: false 
        },
        (data) => {
            console.log(data);

            // A requisição vai aqui
        }
    );
    
    return (
        <>
            <main>
                    <section className='pb-7 px-5' >
                        <TitleSection title="CONTENTS" />
                    </section>
                    <section className='bg-white-2 px-5 py-10' >
                        <h3 className=' font-bold text-xl mb-2 ' >Add New Content</h3>
                        <p className='' >Lorem ipsum dolor sit amet, consectetur adipisicing elit.!</p>
                    </section>
                    <form className='p-5 flex flex-col gap-5' onSubmit={handleSubmit} >
                        <div className='flex justify-between items-center h-14' >
                            <div className='flex flex-col gap-2 w-7/12 py-2' >
                                <label htmlFor="select-subject" className='font-semibold'>Subject</label>
                                <label htmlFor="" className='border border-black rounded flex h-7'>
                                    <div className='bg-white-2 h-full w-10 rounded flex justify-center items-center' >
                                        <FiBookOpen/>
                                    </div>
                                    <select name="subject" onChange={handleChangeSelect} value={formData.subject} id="select-subject" className='p-0.5 px-3 bg-white rounded w-full'>
                                        <option value="mat">Matemática</option>
                                        <option value="por">Português</option>
                                        <option value="edf">Educação Física</option>
                                        <option value="fis">Física</option>
                                        <option value="pdv">Projeto de Vida</option>
                                    </select>
                                </label>
                            </div>
                            <div className='flex flex-col gap-2 w-4/12 py-2'>
                                <label htmlFor="select-subject" className='font-semibold' >Position</label>
                                <label htmlFor="position-content" className='border border-black rounded flex h-7' >
                                    <div className='bg-white-2 h-full w-10 rounded flex justify-center items-center ' >
                                        <BsNodePlus/>    
                                    </div>
                                    <input 
                                        onChange={handleChange}
                                        value={formData.position}
                                        type="number" 
                                        className='px-3 bg-white rounded w-full outline-none' 
                                        id='position-content' 
                                        placeholder='1º' 
                                    />
                                </label>
                            </div>
                        </div>
                        <div className='flex flex-col gap-2' >
                            <label htmlFor="upload-video" className='font-semibold'>Video</label>
                            <UploadFileMobile 
                                text="Upload Video" 
                                id="upload-video" 
                                onChange={handleChange}
                                value ={formData.uploadVideo}
                            />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <label htmlFor="upload-content" className='font-semibold'>Content</label>
                            <UploadFileMobile 
                                text="Upload Content"
                                id="upload-content"
                                onChange={handleChange}
                                value={formData.uploadImage}
                            />
                        </div>
                        <div className='pt-2 flex flex-col gap-2'>
                            <label htmlFor="description-content" className='font-semibold'>Description</label>
                            <TextArea 
                                id="description-content" 
                                placeholder='Enter the description of content'
                                onChange={handleChange}
                                value = {formData.description}
                            />
                        </div>
                        <HorizontalLine width='w-full'/>
                        <div className='flex flex-col gap-5' >
                            <ButtonBigMobile  text='Save' textColor='white' backgroundColor='blue-1' hover='blue-1-dark' type='submit'/>
                            <ButtonBigMobile text='Cancel' textColor='black' backgroundColor='white-2' hover='white-2-dark'/>
                        </div>
                    </form>
           </main>
            <BottomNavigationBar/>
        </>
    )
}

export default CreateContent;