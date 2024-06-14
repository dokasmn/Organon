import React, { ReactHTMLElement, ReactNode } from 'react';

interface ArrowSliderProps {
    icon: React.ReactNode,
    handleEvent: () => void,
    style?: string,
}

const ArrowSlider:React.FC<ArrowSliderProps> = ({icon, handleEvent, style}) => {
    return (
        <div className={`absolute top-1/2 transform -translate-y-1/2 ${style}`}>
            <button onClick={handleEvent} className="">
                {icon}
            </button>
        </div>        
    )
}

export default ArrowSlider;