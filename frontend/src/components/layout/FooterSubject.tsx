//REACT
import React from 'react';

// IMAGES
import { MdOutlineAttachEmail } from "react-icons/md";

interface FooterSubjectProps {
    backgroundColor: string,
    emailTeacher: string, 
}

const FooterSubject:React.FC<FooterSubjectProps> = (backgroundColor, emailTeacher) => {
    return (
        <section className={`h-16 flex absolute top-full items-center text-white justify-between px-5 w-screen bg-blue-5 ${backgroundColor}`}>            
            <p>
                Entre em contato:    
            </p>
            <div className='flex gap-3 items-center'>
                <MdOutlineAttachEmail/>
                {
                    <p>emailTeacher</p>
                    
                }
            </div>
        </section>      
    )
}

export default FooterSubject