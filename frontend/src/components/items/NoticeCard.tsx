import React, {useState, useMemo} from 'react';

interface NoticeCardProps {
    title: string,
    description: string,
    image: string,
}

const NoticeCard:React.FC<NoticeCardProps> = ({title, description, image}) => {
    return (
        <div className='w-full h-64 overflow-hidden bg-white p-7 flex justify-center'>
            <div>
                <img src={image} alt="" height={"h-full"}/>
            </div>
            <div className='px-3 py-7' >
                <h3 className='text-lg font-semibold'>{title}</h3>
                <p>{description}</p>
            </div>
        </div>
    )
}

export default NoticeCard;