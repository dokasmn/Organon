// REACT
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

// IMAGES
import { MdArrowRight, MdArrowLeft } from "react-icons/md";

// COMPONENTS
import CardNewContent from "../cards/CardNewContent";
import ArrowSlider from '../cards/ArrowSlider';
import HeaderHome from '../../layout/HeaderHome';

// HOOKS
import useSliderArrow from '../../../hooks/useSliderArrow';

// TYPES
import { SliderContentInterface } from "../../../types"

interface SliderContentProps{
  slides: SliderContentInterface[];
} 

const SliderContent: React.FC<SliderContentProps> = ({slides}) => {

  const { currentSlide, handleNext, handlePrev } = useSliderArrow(
    0, slides
  );

  return (
    <div className="relative w-full rounded overflow-hidden py-10 px-14 sm:px-36 bs:px-44 05xl:px-56 xl:px-72">  
      <div className="flex duration-700 transition-transform" style={{ transform: `translateX(-${currentSlide * 100}%)`}}>
          {slides.map((item, __) => (
            <div key={uuidv4()} className='w-full  flex-shrink-0 flex justify-center items-center' >
              <CardNewContent
                subject={item.contentSubject}
                content={item.contentName}
                date={item.contentDate}
                image={item.contentImage}
              />
            </div>
          ))}
      </div>

      {slides.length > 1 && (
        <>
          <ArrowSlider 
            icon={<MdArrowLeft className='text-3xl' />} 
            handleEvent={handlePrev} 
            style="ml-10 sm:ml-32 bs:ml-40 05xl:ml-52 xl:ml-64 p-1 05xl:p-2.5 rounded-full flex items-center sm:bg-gray-300 left-0 hover:bg-gray-400" 
          />
    
          <ArrowSlider 
            icon={<MdArrowRight className='text-3xl'/>} 
            handleEvent={handleNext} 
            style="mr-10 sm:mr-32 bs:mr-40 05xl:mr-52 xl:mr-64 p-1 05xl:p-2.5 rounded-full flex items-center sm:bg-gray-300 right-0 hover:bg-gray-400"
          />
        </>
      )}

    </div>
  );
};

export default SliderContent;
