import React from 'react';

interface HorizontalLineProps {
    style: string,
}

const HorizontalLine:React.FC<HorizontalLineProps> = ({style}) => {
    return (
        <div className={`bg-black my-5 ${style} h-0.1 opacity-30`}></div>
    )
}

export default HorizontalLine;