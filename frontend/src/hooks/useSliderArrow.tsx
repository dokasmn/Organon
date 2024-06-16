import { useState } from 'react';

const useSliderArrow = (startSlide = 0, slides:object[] = []) => {
  const [currentSlide, setCurrentSlide] = useState(startSlide);

  const handleNext = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  };

  const handlePrev = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length);
  };

  return {
    currentSlide,
    handleNext,
    handlePrev,
  };
};

export default useSliderArrow;