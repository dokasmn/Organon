// REACT
import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { v4 as uuidv4 } from 'uuid';

// COMPONENTS
import CardSubjectNote from '../cards/CardSubjectNotes';
import NextArrow from '../buttons/NextArrow';
import PrevArrow from '../buttons/PrevArrow';

// HOOKS
import { useLoading } from '../../../contexts/LoadingContext';
import useShowError from '../../../hooks/useShowError';
import { useAuth } from '../../../contexts/AuthContext';

// AXIOS
import axiosInstance from '../../../axiosConfig';

interface SliderSubjectNotesProps {
  returnSubjectId: (id: string) => void;
}

const SliderSubjectNotes:React.FC<SliderSubjectNotesProps> = ({returnSubjectId}) => {

  const { showError, showUnespectedResponse } = useShowError();
  const { user } = useAuth();
  const { setShowLoading } = useLoading();
  const [slidesSubject, setSlidesSubject] = useState<{id: string, subject_name: string}[]>([{id:'', subject_name:''}]);

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

  useEffect(() => {
    const fetchData = async () => {
      setShowLoading(true);
      try {
        
        const response = await axiosInstance.get(`course/subject/`, {
            headers: {
                'Authorization': `Token ${user.token}`,
            },
        })
        setShowLoading(false);
        if (response.status === 200) {
          console.log(response.data.results);
          setSlidesSubject(response.data.results)
        }else{
          showUnespectedResponse(response);
        }
      } catch (error: any) {
        showError(error);
      }
    }
    
    fetchData();
  }, [])
  
  return (
    <div className="slider-container py-10 md:py-0 md:pr-0 max-w-160 lg:max-w-4xl">
      
      <Slider {...settings} className=" lg:pl-20 lg:px-16 lg:pt-5 pb-2" >
        <CardSubjectNote key={uuidv4()} title={"Sem filtro"} onClick={() => {returnSubjectId('sem filtro')}} />
        {slidesSubject.map((slide: any, __) => (
          <CardSubjectNote key={uuidv4()} title={slide.subject_name} onClick={() => {returnSubjectId(slide.id)}} />
        ))}
      </Slider>
    </div>
  );
};

export default SliderSubjectNotes;