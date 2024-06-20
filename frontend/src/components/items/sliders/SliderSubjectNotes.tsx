// REACT
import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { v4 as uuidv4 } from 'uuid';

// COMPONENTS
import CardSubjectNote from '../cards/CardSubjectNotes';

interface SliderSubjectNotesProps {
  slides: string[],
}

const SliderSubjectNotes:React.FC<SliderSubjectNotesProps> = ({slides}) => {
  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "45px",
    slidesToShow: 2,
    speed: 500
  };

  return (
    <div className="slider-container overflow-hidden pb-10">
      <Slider {...settings} >
        {slides.map((slide, __) => (
          <CardSubjectNote key={uuidv4()} title={slide} />
        ))}
      </Slider>
    </div>
  );
};

export default SliderSubjectNotes;