// REACT
import React, { useMemo } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { v4 as uuidv4 } from 'uuid';

// COMPONENTS
import SubjectProgressCard from '../cards/SubjectProgressCard';

// HOOKS
import useGetWidthPage from '../../../hooks/useGetWidthPage';

interface SliderSubjectsProgressProps {
  slides: {subject:string, lastContent:string, progress:string, image:string}[],
}

const SliderSubjectsProgress:React.FC<SliderSubjectsProgressProps> = ({slides}) => {

  const { windowWidth } = useGetWidthPage();

  const getSlidesToShow = ():number => {
    if (windowWidth >= 500 && windowWidth < 600 ) {
      return 2.6;
    }else if (windowWidth >= 600) {
      return 3;
    }else {
      return 2;
    }
  }

  const getCenterPadding = ():string => {
    if (windowWidth >= 420 && windowWidth < 450) {
      return "25px";
    } else if (windowWidth >= 450 && windowWidth < 500){
      return "35px";

    }else if (windowWidth >= 500 && windowWidth <= 550){
      return "15px";
    }else if (windowWidth >= 550 && windowWidth < 640){
      return "30px";
    }else if (windowWidth >= 640){
     return "10px";
    }else{
      return "10px"
    }
  }

  const attributeSettings = useMemo(() => {
    return {
      centerPadding: getCenterPadding(),
      slidesToShow: getSlidesToShow()
    };
  }, [windowWidth]);
  
  const settings = useMemo(() => {
    return {
      className: "center",
      centerMode: true,
      infinite: true,
      centerPadding: attributeSettings.centerPadding,
      slidesToShow: attributeSettings.slidesToShow,
      speed: 500
    }
  }, [attributeSettings])

  return (
    <div key={uuidv4()} className="slider-container mx-auto max-w-full overflow-hidden pt-10">
      <Slider {...settings} >
        {slides.map((slide, __) => (
          <SubjectProgressCard key={uuidv4()} subject={slide.subject} lastContent={slide.lastContent} progress={slide.progress} image={slide.image}/>
        ))}
      </Slider>
    </div>
  );
};

export default SliderSubjectsProgress;