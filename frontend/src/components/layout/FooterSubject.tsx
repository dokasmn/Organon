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
        <footer className={`h-20 mt-20 flex items-center text-white justify-between px-5 sm:px-14 w-full ${backgroundColor}`}>            
            <p>
                Entre em contato:    
            </p>
            <div className='flex gap-3 items-center'>
                <MdOutlineAttachEmail className='text-xl'/>
                {
                    <p>{emailTeacher}</p>
                }
            </div>
        </footer>      
    )
}

export default FooterSubject