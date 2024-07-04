// REACT
import React from 'react';

// COMPONENTS
import ProgressBar from '../inputs/ProgressBar';

interface SubjectProgressCardProps {
    subject: string,
    lastContent: string,
    progress: string,
    image: string,
}

const SubjectProgressCard:React.FC<SubjectProgressCardProps> = ({subject, lastContent, progress, image}) => {
    return (
        <div className='w-40 sm:w-48 md:w-40 lg:w-56 xl:w-64 h-48 my-10 p-1.5 hover:border border-gray-300 hover:bg-white transition-all duration-300 hover:transform hover:shadow-xl hover:shadow-blue-1-opacity overflow-hidden' >
            <div className='' >
                <img src={image} alt="" height={"h-full w-full"} />
            </div>
            <div className='pt-5 pb-5' >
                <h4 className='font-semibold' >{subject}</h4>
                <p className=' text-sm ' >{lastContent}</p>
            </div>
            <ProgressBar progress={progress} />
        </div>
    )
}

export default SubjectProgressCard;