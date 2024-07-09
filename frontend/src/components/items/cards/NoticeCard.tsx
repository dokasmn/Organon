// REACT
import React from 'react';

// COMPONENTS
import SeeMore from '../buttons/seeMore';

interface NoticeCardProps {
    title: string,
    description: string,
    image: string,
    alt?: string,
}

const NoticeCard:React.FC<NoticeCardProps> = ({title, description, image, alt=`${title} - Imagem`}) => {
    return (
        <div className='' >
            <div className='w-full md:border border-black border-opacity-30 md:shadow-md rounded overflow-hidden md:flex md:flex-row-reverse bg-white p-7 my-10 h-112 sm:h-128 max-w-112 md:max-w-full transition-all transform duration-500 hover:border-2 hover:border-blue-1 hover:shadow '>
                <div className='flex justify-center md:w-2/4 md:py-10 w-full md:pl-5'>
                    <div className='md:bg-gray-1'>
                        <img src={image} alt="title-image" className='w-full h-full object-contain'/>
                    </div>
                </div>
                <div className='py-7 md:py-0 text-justify flex flex-col justify-around md:w-2/4 lg:pr-10' >
                    <div >
                        <h3 className='text-lg font-semibold pb-5 sm:text-xl md:text-2xl lg:text-3xl'>{title}</h3>
                        <p>{description}</p>
                    </div>
                    
                    <div className='hidden sm:flex py-10 justify-center'>
                        <SeeMore to='/' />
                    </div>
                    
                </div>
            </div>
        </div>
        
    )
}

export default NoticeCard;