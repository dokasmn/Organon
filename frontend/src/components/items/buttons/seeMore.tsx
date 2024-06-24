// REACT
import React from 'react';

// COMPONENTS
import Link from './Link';

interface SeeMoreProps {
    to: string, 
}

const SeeMore:React.FC<SeeMoreProps> = ({to}) => {
    return (
        <Link 
            to={to} 
            text="Ver mais" 
            style='w-44 text-center cursor-pointer border border-blue-1 text-blue-1 font-semibold px-5 py-1 rounded hover:bg-white-2 ' 
        />
    )
}

export default SeeMore;