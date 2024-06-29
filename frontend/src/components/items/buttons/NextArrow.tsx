import React from 'react';
import { ArrowProps } from 'slick-carousel';
import { MdArrowRight } from 'react-icons/md';

const NextArrow: React.FC<ArrowProps> = ({ style, onClick }) => {
    return (
        <div
            className={`${style} hidden lg:flex absolute transform p-2 top-1/4 hover:bg-gray-400 bg-gray-300  rounded-full items-center right-0 z-10 cursor-pointer`}
            onClick={onClick}
        >
            <MdArrowRight className="text-black text-4xl" />
        </div>
    );
};

export default NextArrow;
