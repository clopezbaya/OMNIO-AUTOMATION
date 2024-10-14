// ResultMessage.js
import { Box, Center } from '@chakra-ui/react';

const ResultMessage = ({ message, error, result }) => {
  return (
    <>
      {message && (
        <Center mt={4}>
          <Box bg='green.400' w='100%' p={4} color='white' textAlign='center'>
            {message}
          </Box>
        </Center>
      )}
      {error && (
        <Center mt={4}>
          <Box bg='red.400' w='100%' p={4} color='white' textAlign='center'>
            {error}
          </Box>
        </Center>
      )}
      {result && (
        <Center mt={4}>
          <Box bg='blue.400' w='100%' p={4} color='white' textAlign='center'>
            {`Report: `}
            <a
              href={result}
              target='_blank'
              rel='noopener noreferrer'
              style={{ color: 'white', textDecoration: 'underline' }}
            >
              {result}
            </a>
          </Box>
        </Center>
      )}
    </>
  );
};

export default ResultMessage;
