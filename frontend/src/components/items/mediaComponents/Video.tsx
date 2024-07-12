import React from 'react';

interface VideoProps {
    path: string,
}

const Video:React.FC<VideoProps> = ({path}) => {
  const linkVideo = path.split("/videos/");

  return (
    <div  >
      <video width="600" controls className='w-full ' >
        {linkVideo[1] ? 
          <source src={`http://res.cloudinary.com/du7qknrlm/video/upload/v1720356893/content_organon/videos/${linkVideo[1]}`} type="video/mp4" />
          :
          false  
        }
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default Video;