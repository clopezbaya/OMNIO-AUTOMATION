import React from 'react';
import { Alert } from '@chakra-ui/react';
import { AlertIcon } from '@chakra-ui/icons';

const ErrorPath = () => {
  return (
    <div>
      <Alert status='error'>
        <AlertIcon />
        ERROR 404 This path dont exist.!!!!!!
      </Alert>
    </div>
  );
};

export default ErrorPath;
