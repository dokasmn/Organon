import React, { ReactHTMLElement, ReactNode } from 'react';

interface ArrowSliderProps {
    icon: React.ReactNode,
    handleEvent: () => void,
    left?: boolean, 
    style?: string,
}

const ArrowSlider:React.FC<ArrowSliderProps> = ({icon, handleEvent, left, style}) => {

    let position = "right";
    left ? position = "left" : false; 

    return (
        <div className={`absolute top-1/2 transform -translate-y-1/2 ${position}-0 ${style}`}>
            <button onClick={handleEvent} className="">
                {icon}
            </button>
        </div>        
    )
}

export default ArrowSlider;