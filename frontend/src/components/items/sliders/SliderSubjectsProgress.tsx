import React from 'react';
import Slider from 'react-slick';
import { v4 as uuidv4 } from 'uuid';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import SubjectProgressCard from '../cards/SubjectProgressCard';
import NextArrow from '../buttons/NextArrow';
import PrevArrow from '../buttons/PrevArrow';

interface SliderSubjectsProgressProps {
  slides: {subject:string, lastContent:string, progress:string, image:string}[],
} 

const SliderSubjectsProgress:React.FC<SliderSubjectsProgressProps> = ({ slides }) => {
  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 2.8,
    slidesToScroll: 3,
    initialSlide: 0,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
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
      {
        breakpoint: 1023,
        settings: {
          slidesToShow: 4.3,
          centerPadding: "0px",
        },
      },
      {
        breakpoint: 1025,
        settings: {
          slidesToShow: 2.5,
          slidesToScroll: 2,
          centerPadding: "0px",
        },
      },
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 2.85,
          slidesToScroll: 2,
          centerPadding: "0px",
        },
      },
      {
        breakpoint: 1536,
        settings: {
          slidesToShow: 2.8,
          slidesToScroll: 3,
          centerPadding: "0px",
        },
      },
    ],
  };

  return (
    <div className="slider-container mx-auto max-w-full ">
      <Slider {...settings} className=" lg:px-20" >
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
