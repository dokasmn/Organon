//REACT
import React from 'react'

interface SubTitleProps{
    text: string ,
}

const SubTitle: React.FC<SubTitleProps> = ({text}) => {    
    const wordList = text.split(' '); 

    return <>
        <h2 className={`text-2xl py-7 font-bold text-center`} >
            {
                wordList.map((word, index) => (
                    index % 2 == 0 ?  
                    <span key={`${word}-${index}`} className={`text-black`}>{word}  </span> 
                    : 
                    <span key={`${word}-${index}`} className={`text-gray-1`}>{word}  </span> 
                    
                ))
            }
        </h2>
    </>
}
export default SubTitle