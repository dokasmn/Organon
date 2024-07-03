import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

interface LoadingProps {
    visibility: boolean,
}

const Loading: React.FC<LoadingProps> = ({visibility}) => {
  return (
    
      <Box className={`${visibility ? 'flex' : 'hidden'} justify-center items-center absolute z-50 h-full w-full bg-dark-op-2`} >
        <CircularProgress className='' />
      </Box>
    
  );
}

export default Loading;
