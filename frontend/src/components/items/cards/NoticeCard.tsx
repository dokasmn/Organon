import React, {useState, useMemo} from 'react';

interface NoticeCardProps {
    title: string,
    description: string,
    image: string,
    alt?: string,
}

const NoticeCard:React.FC<NoticeCardProps> = ({title, description, image, alt=`${title} - Imagem`}) => {
    return (
        <div className='w-full overflow-hidden bg-white p-5 my-10 h-112 transition-all transform duration-500 hover:scale-105 hover:border-2 hover:border-blue-1 hover:shadow '>
            <div className='flex justify-center'>
                <img src={image} alt="title-image" height={"w-full"}/>
            </div>
            <div className='px-3 py-7 flex flex-col justify-center ' >
                <h3 className='text-lg font-semibold pb-5'>{title}</h3>
                <p>{description}</p>
            </div>
        </div>
    )
}

export default NoticeCard;