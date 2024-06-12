import React, {useState, useMemo} from 'react';

// COMPONENTS
import ButtonSmallMobile from './ButtonSmallMobile';


// IMAGES
import { FaQuestion } from "react-icons/fa6";
import { SlOptionsVertical } from "react-icons/sl";

interface ContentCrudProps {
    content: string,
    subject: string,
    image?: string,
}

const ContentCrud:React.FC<ContentCrudProps> = ({content, subject, image}) => {
    return (
        
        <div className=' bg-white-2 py-3 px-2 flex items-center rounded mb-5 ' >
            <div className={'w-2/4 flex items-center'} >
                <div className={' w-2/6 flex justify-center items-center h-full'} >
                    {
                        image ? 
                            <img className=' p-1.5 rounded ' src={image} alt="" />
                        :
                        <div className=' p-1.5 bg-gray-300 rounded ' >
                            <FaQuestion className='text-xl' />
                        </div>   
                    }
                    
                </div>
                <div className={' w-4/6 px-2 '}>
                    <h2 className={' text-sm '} >
                        {content}
                    </h2>
                    <p className={' text-xs '}>
                        {subject}
                    </p>
                </div>
            </div>
            <div className={'w-2/4 flex '} >
                <div className={' w-5/6 flex justify-center items-center '} >
                    <ButtonSmallMobile text='View' textColor="white" backgroundColor='blue-5' hover="blue-5-dark" />
                </div>
                <div className={' w-1/6 flex items-center justify-center cursor-pointer hover:bg-gray-300 rounded px-1 py-2'} >
                    <SlOptionsVertical  className=' text-xl ' />
                </div>
            </div>
        </div>
        
    )
}

export default ContentCrud;