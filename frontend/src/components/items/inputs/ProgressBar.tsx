import React, { useState } from 'react';

interface ProgressBarProps {
    progress: number
}

const ProgressBar:React.FC<ProgressBarProps> = ({progress}) => {
  return (
    <>
        <div className="bg-gray-200 overflow-hidden">
            <div className="h-1 w-6/12 bg-blue-5 text-white" style={{ width: `${progress}%` }}>
            </div>
        </div>
        <div className=' flex justify-end font-semibold'>
            {progress}%
        </div>
    </>
  );
};

export default ProgressBar;