import React from 'react';
import { ArrowProps } from 'slick-carousel';
import { MdArrowLeft } from 'react-icons/md';

const PrevArrow: React.FC<ArrowProps> = ({ className, style, onClick }) => {
    return (
        <div
            className={`hidden lg:flex absolute top-8 transform hover:bg-gray-400 bg-gray-300 p-3 flex rounded-full items-center left-0 z-10 cursor-pointer`}
            onClick={onClick}
        >
            <MdArrowLeft className="text-black text-4xl" />
        </div>
    );
};

export default PrevArrow;
