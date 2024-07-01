import React, {useState, useMemo} from 'react';

interface CardNewContentProps {
    subject: string,
    content: string,
    date: string,
    image: string,
}

const CardNewContent:React.FC<CardNewContentProps> = ({subject, content, date, image}) => {
    return (
        <div className='rounded-xl w-52 sm:w-64 xl:w-96 md:shadow-lg h-60 md:border border-black border-opacity-30 sm:h-72 xl:h-96 sm:rounded overflow-hidden bg-white transition-all transform duration-500 hover:scale-105 hover:border-2 hover:border-blue-1 hover:shadow' >
            <div className='w-full ' >
                <img src={image} alt="" className={"h-full w-full"} />
            </div>
            <div className='px-3 py-7' >
                <div className='flex flex-col items-center justify-center ' >
                    <div>
                        <h2 className=' text-base sm:text-lg md:text-xl lg:text-2xl font-bold ' >{content}</h2>
                        <p  className='flex justify-end' >{subject}</p>
                    </div>
                </div>
                <div className='mt-4' >
                    <p>Data:</p>
                    <p>{date}</p>
                </div>
            </div>
        </div>
    )
}

export default CardNewContent;