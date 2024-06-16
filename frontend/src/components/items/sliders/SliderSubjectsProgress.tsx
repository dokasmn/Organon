// REACT
import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// COMPONENTS
import SubjectProgressCard from '../cards/SubjectProgressCard';

interface SliderSubjectsProgressProps {
  slides: {subject:string, teacher:string, progress:string, image:string}[],
}

const SliderSubjectsProgress:React.FC<SliderSubjectsProgressProps> = ({slides}) => {
  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "10px",
    slidesToShow: 2,
    speed: 500
  };

  return (
    <div className="slider-container mx-auto max-w-full overflow-hidden pt-10">
      <Slider {...settings} >
        {slides.map((slide, index) => (
          <>
            <SubjectProgressCard subject={slide.subject} teacher={slide.teacher} progress={slide.progress} image={slide.image}/>
          </>
        ))}
      </Slider>
    </div>
  );
};

export default SliderSubjectsProgress;