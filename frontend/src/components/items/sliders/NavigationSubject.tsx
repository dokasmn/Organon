// REACT
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

// COMPONENTS
import ArrowSlider from '../cards/ArrowSlider';
import Link from '../buttons/Link';

// IMAGES
import { MdArrowRight, MdArrowLeft } from "react-icons/md";

// HOOKS
import useSliderArrow from '../../../hooks/useSliderArrow';

const NavigationSubject = () => {

  const slides: string[][] = [
    ["Matemática", "Gramática", "Filosofia", "Inglês"],
    ["Sociologia", "História", "Física", "Química"],
    ["Biologia", "Artes", "Literatura", "Geografia"],
  ];

  const { currentSlide, handleNext, handlePrev } = useSliderArrow(
    0, slides
  );

  return (
    <header className='max-w-7xl w-full' >  
      <div className="relative w-full bg-white rounded overflow-hidden py-5 md:shadow-md md:border border-black border-opacity-30">
          <div className="flex transition-transform duration-500" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
              {slides.map((words, __) => (
              <div key={uuidv4()} className="w-full flex-shrink-0 flex justify-center items-center">
                  {words.map((word, __) => (
                    <Link
                      key={uuidv4()}
                      to={`/materia/${word}`}
                      style="mx-3 sm:mx-10 hover:text-blue-1-dark cursor-pointer"
                      text={word}
                    />
                  ))}
              </div>
              ))}
          </div>
    
          <ArrowSlider icon={<MdArrowLeft className='text-xl' />} handleEvent={handlePrev} style="left-0 sm:left-5 sm:bg-gray-300 sm:p-1 flex items-center rounded-full hover:bg-gray-400" />
          <ArrowSlider icon={<MdArrowRight className='text-xl'/>} handleEvent={handleNext} style="right-0 sm:right-5 sm:bg-gray-300 sm:p-1 flex items-center rounded-full hover:bg-gray-400"/>
      </div>
  </header>
  );
};

export default NavigationSubject;
