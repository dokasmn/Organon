import React, {useState, useMemo} from 'react';

interface CardNewContentProps {
    subject: string,
    content: string,
    date: string,
    image: string,
}

const CardNewContent:React.FC<CardNewContentProps> = ({subject, content, date, image}) => {
    return (
        <div className='rounded-xl w-52 h-60 overflow-hidden bg-white ' >
            <div className='' >
                <img src={image} alt="" height={"h-full"} />
            </div>
            <div className='px-3 py-7' >
                <div className='flex flex-col items-center justify-center ' >
                    <div>
                        <h3 className=' text-lg font-semibold ' >{content}</h3>
                        <p  className='flex justify-end' >{subject}</p>
                    </div>
                </div>
                <div className='mt-4' >
                    <p>Data: </p>
                    <p>{date}</p>
                </div>
            </div>
        </div>
    )
}

export default CardNewContent;