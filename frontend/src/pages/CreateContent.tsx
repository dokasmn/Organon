// REACT
import React, { useEffect } from 'react';

// COMPONENTS
import TitleSection from '../components/layout/TitleSection';
import UploadFileMobile from '../components/items/inputs/UploadFileMobile';
import TextArea from '../components/items/inputs/TextArea';
import HorizontalLine from '../components/items/texts/HorizontalLine';
import BottomNavigationBar from '../components/layout/BottomNavigationBar';
import TopNavigationBar from '../components/layout/TopNavigationBar';
import Button from '../components/items/buttons/Button';

// IMAGES
import { FiBookOpen } from "react-icons/fi";
import { BsNodePlus } from "react-icons/bs";

import useForm from '../hooks/useForm';

const CreateContent:React.FC = () => {

    const { formData, handleChangeSelect , handleSubmit, handleChange, handleChangeTextArea} = useForm(
        { 
            subject: '',
            position: '',
            uploadVideo: File,
            uploadImage: File,
            descriptionContent: '',
            UploadFileMobile: false 
        },
        (data) => {
            console.log(data);

            // A requisição vai aqui
        }
    );

    useEffect(() => {
        console.log(formData)
    }, [formData]);
    
    return (
        <div className="sm:flex justify-center">
            <TopNavigationBar/>
            <div className='sm:flex w-full max-w-7xl'>
                <main className="xs:px-14 md:pt-32 md:px-10 max-w-160 sm:min-w-160" >
                    <section className='px-5 xs:px-0 pb-5 md:px-0'>
                        <TitleSection title="CONTENTS" />
                    </section>
                    <section className='bg-white-2 px-5 py-10 md:shadow-md' >
                        <h3 className=' font-bold text-xl mb-2 ' >Add New Content</h3>
                        <p className='' >Lorem ipsum dolor sit amet, consectetur adipisicing elit.!</p>
                    </section>
                    <form className='w-full p-5 xs:px-0 sm:px-0 md:px-0 flex flex-col gap-5' onSubmit={handleSubmit} >
                        <div className='flex justify-between items-center' >
                            <div className='w-7/12' >
                                <label htmlFor="select-subject" className='block font-semibold mb-5'>Subject</label>
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
                            <div className='w-4/12'>
                                <label htmlFor="select-subject" className='block font-semibold mb-5' >Position</label>
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
                        <div>
                            <label htmlFor="upload-video" className='block font-semibold pb-5'>Video</label>
                            <UploadFileMobile 
                                text="Upload Video" 
                                id="upload-video" 
                                onChange={handleChange}
                            />
                        </div>
                        <div >
                            <label htmlFor="upload-content" className='block font-semibold pb-5'>Content</label>
                            <UploadFileMobile 
                                text="Upload Content"
                                id="upload-content"
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="descriptionContent" className='block font-semibold pb-5'>Description</label>
                            <TextArea 
                                id="descriptionContent"
                                name="descriptionContent" 
                                placeholder='Enter the description of content'
                                onChange={handleChangeTextArea}
                                value = {formData.descriptionContent}
                            />
                        </div>
                        <HorizontalLine style='w-full'/>
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