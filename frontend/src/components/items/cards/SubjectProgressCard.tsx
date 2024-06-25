// REACT
import React, {useState, useMemo} from 'react';

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
        <div className='w-40 sm:w-48 md:w-40 h-44 overflow-hidden' >
            <div className='' >
                <img src={image} alt="" height={"h-full w-full"} />
            </div>
            <div className='pt-5 pb-7' >
                <h4 className='font-semibold' >{subject}</h4>
                <p className=' text-sm ' >{lastContent}</p>
            </div>
            <ProgressBar progress={progress} />
        </div>
    )
}

export default SubjectProgressCard;