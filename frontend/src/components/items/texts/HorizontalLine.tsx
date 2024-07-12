import React from 'react';

interface HorizontalLineProps {
    style: string,
}

const HorizontalLine:React.FC<HorizontalLineProps> = ({style}) => {
    return (
        <div className={`bg-black h-0.1 opacity-30 ${style}`}></div>
    )
}

export default HorizontalLine;