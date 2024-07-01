// REACT
import React, {useState, useMemo} from 'react';


interface CardPercentDataProps {
    title: string,
    data: string,
}

const CardPercentData:React.FC<CardPercentDataProps> = ({title, data}) => {
    return (
        <div
            className={`rounded gap-4 w-48 lg:w-72 md:rounded-none md:shadow-lg h-16 my-6 flex justify-center items-center bg-white-opacity-15`}
        >
            <h4 className='font-semibold text-lg' >{title}</h4>
            <p>{data}</p> 
        </div>
    )
}

export default CardPercentData;