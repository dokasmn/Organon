// REACT
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

// COMPONENTS
import ArrowSlider from '../cards/ArrowSlider';

// IMAGES
import { MdArrowRight, MdArrowLeft } from "react-icons/md";

// HOOKS
import useSliderArrow from '../../../hooks/useSliderArrow';

const NavigationSubject = () => {
  const slides = [
    ["Matemática", "Gramática", "Filosofia", "Inglês"],
    ["Sociologia", "História", "Física", "Química"],
    ["Biologia", "Artes", "Literatura", "Geografia"],
  ];

  const { currentSlide, handleNext, handlePrev } = useSliderArrow(
    0, slides
  );

  return (
    <div className="relative w-full bg-white rounded overflow-hidden py-5 ">
        <div className="flex transition-transform duration-500" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
            {slides.map((words, __) => (
            <div key={uuidv4()} className="w-full flex-shrink-0 flex justify-center items-center">
                {words.map((word, __) => (
                <span key={uuidv4()} className="mx-3 hover:text-blue-1-dark cursor-pointer">{word}</span>
                ))}
            </div>
            ))}
        </div>
        
        <ArrowSlider icon={<MdArrowLeft className='text-xl' />} handleEvent={handlePrev} style="left-0" />
        <ArrowSlider icon={<MdArrowRight className='text-xl'/>} handleEvent={handleNext} style="right-0"/>
    </div>
  );
};

export default NavigationSubject;