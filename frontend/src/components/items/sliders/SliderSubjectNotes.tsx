// REACT
import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { v4 as uuidv4 } from 'uuid';

// COMPONENTS
import CardSubjectNote from '../cards/CardSubjectNotes';
import NextArrow from '../buttons/NextArrow';
import PrevArrow from '../buttons/PrevArrow';

interface SliderSubjectNotesProps {
  slides: string[],
}

const SliderSubjectNotes:React.FC<SliderSubjectNotesProps> = ({slides}) => {
  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3.5,
          centerPadding: "16px",
        },
      },
      {
        breakpoint: 840,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3.2,
        },
      },
      {
        breakpoint: 550,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 520,
        settings: {
          slidesToShow: 2.3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2.7,
        },
      },
    ]
  };

  return (
    <div className="slider-container overflow-hidden py-10 md:py-0 sm:px-3 md:pl-50 md:pr-0 max-w-160 lg:max-w-4xl">
      <Slider {...settings} className=" lg:pl-20 lg:px-16 lg:pt-5" >
        {slides.map((slide, __) => (
          <CardSubjectNote key={uuidv4()} title={slide} />
        ))}
      </Slider>
    </div>
  );
};

export default SliderSubjectNotes;