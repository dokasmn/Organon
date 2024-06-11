import React, { useState } from 'react';
import 'tailwindcss/tailwind.css'; // Certifique-se de que o Tailwind CSS está sendo importado corretamente
import { MdArrowRight, MdArrowLeft } from "react-icons/md";

const NavigationSubject = () => {
  const slides = [
    ["Matemática", "Gramática", "Filosofia", "Inglês"],
    ["Sociologia", "História", "Física", "Química"],
    ["Biologia", "Artes", "Literatura", "Geografia"],
  ];
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  };

  const handlePrev = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length);
  };

  return (

    <div className="relative w-full bg-white rounded overflow-hidden py-5">
        <div className="flex transition-transform duration-500" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
            {slides.map((words, index) => (
            <div key={index} className="w-full flex-shrink-0 flex justify-center items-center">
                {words.map((word, idx) => (
                <span key={idx} className="mx-3 hover:text-blue-1-dark cursor-pointer">{word}</span>
                ))}
            </div>
            ))}
        </div>
        <div className="absolute top-1/2 transform -translate-y-1/2 left-0">
            <button onClick={handlePrev} className="">
            <MdArrowLeft className='text-xl' />
            </button>
        </div>
        <div className="absolute top-1/2 transform -translate-y-1/2 right-0">
            <button onClick={handleNext} className='text-xl'>
            <MdArrowRight/>
            </button>
        </div>
    </div>
    
  );
};

export default NavigationSubject;
