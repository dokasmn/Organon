import React from 'react';

interface VideoProps {
    path: string,
}

const Video:React.FC<VideoProps> = ({path}) => {
  return (
    <div>
      <video width="600" controls className='' >
        <source src="path_to_your_video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default Video;