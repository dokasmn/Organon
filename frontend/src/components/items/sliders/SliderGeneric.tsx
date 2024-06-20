// REACT
import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { v4 as uuidv4 } from 'uuid';

// COMPONENTS
import CardSubjectNote from '../cards/CardSubjectNotes';
import CardPercentData from '../cards/CardPercentDatas';

interface SliderGenericProps {
  slides: {title: string, data: string}[],
  card: string,
}

const SliderGeneric:React.FC<SliderGenericProps> = ({ slides, card }) => {
  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "78px",
    slidesToShow: 0.98,
    speed: 500
  };

  return (
    <div className="slider-container overflow-hidden pb-10">
      <Slider {...settings} >
        {slides.map((slide, __) => (
          card === "percentDatasCard" ? 
            <CardPercentData key={uuidv4()} title={slide.title} data={slide.data} />
            :
            false 
        ))}
      </Slider>
    </div>
  );
};

export default SliderGeneric;