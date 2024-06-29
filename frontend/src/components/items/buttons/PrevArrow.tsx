import React from 'react';
import { ArrowProps } from 'slick-carousel';
import { MdArrowLeft } from 'react-icons/md';

const PrevArrow: React.FC<ArrowProps> = ({ className, style, onClick }) => {
    return (
        <div
            className={`hidden lg:flex absolute transform hover:bg-gray-400 bg-gray-300 p-2 top-1/4 rounded-full items-center left-0 z-10 cursor-pointer`}
            onClick={onClick}
        >
            <MdArrowLeft className="text-black text-4xl" />
        </div>
    );
};

export default PrevArrow;
