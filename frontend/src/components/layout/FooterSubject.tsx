//REACT
import React from 'react';

// IMAGES
import { MdOutlineAttachEmail } from "react-icons/md";

interface FooterSubjectProps {
    backgroundColor: string,
    emailTeacher: string, 
}

const FooterSubject:React.FC<FooterSubjectProps> = ({ backgroundColor, emailTeacher }) => {
    return (
        <footer className={`h-20 mt-20 flex xl:justify-center text-white rounded md:rounded-none px-5 mb-5 sm:px-14 w-full ${backgroundColor}`}>            
            <div className='w-full max-w-6xl flex items-center justify-between xl:px-10 ' >
                <p>
                    Entre em contato:
                </p>
                <div className='flex gap-3 items-center'>
                    <MdOutlineAttachEmail className='text-xl'/>
                    {
                        <p>{emailTeacher}</p>
                    }
                </div>
            </div>
        </footer>      
    )
}

export default FooterSubject