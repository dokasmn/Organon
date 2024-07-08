import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

// HOOKS
import { useLoading } from '../../../contexts/LoadingContext';

const Loading: React.FC = () => {

  const { showLoading } = useLoading();

  return (
      <Box className={`${showLoading ? 'flex' : 'hidden'} justify-center items-center fixed z-50 h-full w-full bg-dark-op-2`} >
        <CircularProgress className='' />
      </Box>
  );
}

export default Loading;
