// REACT
import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { v4 as uuidv4 } from 'uuid';

// COMPONENTS
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
    slidesToShow: 2,
    speed: 500,
    responsive: [
      {
        breakpoint: 400,
        settings: {
          slidesToShow: 1,

        },
      },
      {
        breakpoint: 450,
        settings: {
          slidesToShow: 1.2,
        },
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 1.4,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1.7,
        },
      },

    ]
  };

  return (
    <div className="slider-container overflow-hidden pb-10 sm:hidden">
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