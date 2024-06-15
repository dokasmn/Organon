// REACT
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

// IMAGES
import { MdArrowRight, MdArrowLeft } from "react-icons/md";

// COMPONENTS
import CardNewContent from "../cards/CardNewContent";
import ArrowSlider from '../cards/ArrowSlider';

// TYPES
import { SliderContentInterface } from "../../../types"

interface SliderContentProps{
  slides: SliderContentInterface[];
} 

const SliderContent: React.FC<SliderContentProps> = ({slides}) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  };

  const handlePrev = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative w-full rounded overflow-hidden py-10 px-14">
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

        <ArrowSlider icon={<MdArrowLeft className='text-3xl' />} handleEvent={handlePrev} style="px-10 left-0" />
        <ArrowSlider icon={<MdArrowRight className='text-3xl'/>} handleEvent={handleNext} style="px-10 right-0 "/>
    </div>
  );
};

export default SliderContent;