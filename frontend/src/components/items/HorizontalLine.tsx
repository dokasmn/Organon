import React, {useState, useMemo} from 'react';

interface HorizontalLineProps {
    width: string,
}

const HorizontalLine:React.FC<HorizontalLineProps> = ({width}) => {
    return (
        <>
            <input type="search" className={`bg-black ${width} h-0.5 opacity-25 `}/>
        </>
    )
}

export default HorizontalLine;