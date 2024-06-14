// REACT
import React from 'react';

// COMPONENTS
import TitleSection from '../components/layout/TitleSection';
import UploadFileMobile from '../components/items/UploadFileMobile';
import TextArea from '../components/items/TextArea';
import ButtonBigMobile from '../components/items/ButtonBigMobile';
import HorizontalLine from '../components/items/HorizontalLine';

// IMAGES
import { FiBookOpen } from "react-icons/fi";
import { BsNodePlus } from "react-icons/bs";

const Contents:React.FC = () => {
    return (
        <main className={'py-5'}>
                <section className='pb-7 px-6' >
                    <TitleSection title="CONTENTS" />
                </section>
                <section className='bg-white-2 px-6 py-10' >
                    <h2 className=' font-bold text-xl mb-2 ' >Add New Content</h2>
                    <p className='' >Lorem ipsum dolor sit amet, consectetur adipisicing elit.!</p>
                </section>
                <form className='p-5 flex flex-col gap-5' >
                    <div className='flex justify-between items-center h-14' >
                        <div className='flex flex-col gap-2 w-7/12 py-2' >
                            <label htmlFor="select-subject" className='font-semibold'>Subject</label>
                            <label htmlFor="" className='border border-black rounded flex h-7'>
                                <div className='bg-white-2 h-full w-10 rounded flex justify-center items-center' >
                                    <FiBookOpen/>
                                </div>
                                <select id="select-subject" className='p-0.5 px-3 bg-white rounded w-full'>
                                    <option value="">Matemática</option>
                                    <option value="">Matemática</option>
                                    <option value="">Matemática</option>
                                    <option value="">Matemática</option>
                                    <option value="">Matemática</option>
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
                        />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="upload-content" className='font-semibold'>Content</label>
                        <UploadFileMobile 
                            text="Upload Content" 
                            id="upload-content" 
                        />
                    </div>
                    <div className='pt-2 flex flex-col gap-2'>
                        <label htmlFor="description-content" className='font-semibold'>Description</label>
                        <TextArea 
                            id="description-content" 
                            placeholder='Enter the description of content'
                        />
                    </div>
                    <HorizontalLine width='w-full'/>
                    <div className='flex flex-col gap-5' >
                        <ButtonBigMobile text='Save' textColor='white' backgroundColor='blue-1' hover='blue-1-dark'/>
                        <ButtonBigMobile text='Cancel' textColor='black' backgroundColor='white-2' hover='white-2-dark'/>
                    </div>
                </form>
        </main>
    )
}

export default Contents;