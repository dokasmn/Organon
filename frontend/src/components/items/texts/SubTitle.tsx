//REACT
import React from 'react'

interface SubTitleProps{
    text: string ,
}

const SubTitle: React.FC<SubTitleProps> = ({text}) => {    
    const wordList = text.split(' '); 

    return <>
        <h2 className={`py-5 font-bold text-center `} >
            {
                wordList.map((word, index) => (
                    index % 2 == 0 ?  
                    <span key={`${word}-${index}`} className={`text-black text-2xl sm:text-3xl lg:text-4xl`}>{word} </span> 
                    : 
                    <span key={`${word}-${index}`} className={`text-gray-1 text-2xl sm:text-3xl lg:text-4xl`}>{word} </span> 
                    
                ))
            }
        </h2>
    </>
}
export default SubTitle