import React from 'react';

interface HorizontalLineProps {
    style: string,
}

const HorizontalLine:React.FC<HorizontalLineProps> = ({style}) => {
    return (
        <section className='py-3'>
            <input type="search" className={`bg-black ${style} h-0.1 opacity-25`}/>
        </section>
    )
}

export default HorizontalLine;