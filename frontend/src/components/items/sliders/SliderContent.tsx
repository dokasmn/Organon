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
    <div className="relative w-full rounded overflow-hidden py-10 px-14 sm:px-36 bs:px-44">  
      <div className="flex duration-700 transition-transform" style={{ transform: `translateX(-${currentSlide * 100}%)`}}>
          {slides.map((item, __) => (
            <div key={uuidv4()} className='w-full flex-shrink-0 flex justify-center items-center' >
              <CardNewContent
                subject={item.subject}
                content={item.content}
                date={item.date}
                image={item.image}
              />
            </div>
          ))}
      </div>

      <ArrowSlider 
        icon={<MdArrowLeft className='text-3xl' />} 
        handleEvent={handlePrev} 
        style="ml-10 sm:ml-32 bs:ml-40 p-1 rounded-full flex items-center sm:bg-gray-300 left-0" 
      />

      <ArrowSlider 
        icon={<MdArrowRight className='text-3xl'/>} 
        handleEvent={handleNext} 
        style="mr-10 sm:mr-32 bs:mr-40 p-1 rounded-full flex items-center sm:bg-gray-300 right-0"
      />

    </div>
  );
};

export default SliderContent;