import React, {useState, useMemo} from 'react';

// IMAGES


interface CardSubjectApresentationProps {
    numberContent: string,
    title: string,
    image: string
}

const CardSubjectApresentation:React.FC<CardSubjectApresentationProps> = ({title, image, numberContent}) => {
    return (
        <div className='w-72 sm:w-72 xs:w-80 h-56 bs:h-60 overflow-hidden mb-10 bg-white-opacity-15 rounded md:rounded-none md:shadow-lg transition-all transform duration-500 hover:scale-105 hover:border-2 hover:border-blue-1 hover:shadow '>
            
            <div className=' overflow-hidden h-20 relative' >
                <div className=' bg-black absolute h-full w-full opacity-15 '></div>
                <img src={image} alt="title-image" className={"w-full"} />
            </div>
            <div className='px-5 py-7' >
                <span className=' bg-blue-1 rounded-full text-blue-4-dark font-semibold px-7 py-1 text-center'>
                    {numberContent} Contents
                </span>
                <h3 className='text-lg font-semibold pt-5'>{title}</h3>
            </div>
        </div>
    )
}

export default CardSubjectApresentation;