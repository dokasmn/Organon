import React from 'react';
import { ArrowProps } from 'slick-carousel';
import { MdArrowRight } from 'react-icons/md';

const NextArrow: React.FC<ArrowProps> = ({ className, style, onClick }) => {
    return (
        <div
            className={`hidden lg:flex absolute top-8 transform hover:bg-gray-400 bg-gray-300 p-3 rounded-full items-center right-0 z-10 cursor-pointer`}
            onClick={onClick}
        >
            <MdArrowRight className="text-black text-4xl" />
        </div>
    );
};

export default NextArrow;
