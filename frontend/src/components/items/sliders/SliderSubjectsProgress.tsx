import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { v4 as uuidv4 } from 'uuid';

// COMPONENTS
import SubjectProgressCard from '../cards/SubjectProgressCard';

interface SliderSubjectsProgressProps {
  slides: { subject: string, lastContent: string, progress: string, image: string }[],
}

const SliderSubjectsProgress: React.FC<SliderSubjectsProgressProps> = ({ slides }) => {

  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    centerPadding: "0px", // Adjust this value to your desired spacing
    responsive: [
      {
        breakpoint: 400,
        settings: {
          slidesToShow: 1.6,
          centerPadding: "16px",
        },
      },
      {
        breakpoint: 420,
        settings: {
          slidesToShow: 2,
          centerPadding: "0px",
        },
      },
      {
        breakpoint: 450,
        settings: {
          slidesToShow: 2,
          centerPadding: "20px",
        },
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 2.3,
          centerPadding: "10px",
        },
      },
      {
        breakpoint: 550,
        settings: {
          slidesToShow: 2.6,
          centerPadding: "10px",
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          centerPadding: "10px",
        },
      },
      {
        breakpoint: 850,
        settings: {
          slidesToShow: 2.7,
          centerPadding: "0px",
        },
      },
      {
        breakpoint: 950,
        settings: {
          slidesToShow: 3.5,
          centerPadding: "5px",
        },
      },
    ],
  };

  return (
    <div className="slider-container mx-auto max-w-full overflow-hidden">
      <Slider {...settings}>
        {slides.map((slide) => (
          <div key={uuidv4()}> 
            <SubjectProgressCard
              subject={slide.subject}
              lastContent={slide.lastContent}
              progress={slide.progress}
              image={slide.image}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default SliderSubjectsProgress;
