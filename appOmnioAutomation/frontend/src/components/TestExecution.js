import React, { useState } from 'react';
import TopMenu from './TopMenu';
import { Center, Heading, Button, Stack, Box } from '@chakra-ui/react';
import axios from 'axios';
import LoginTest from './SingleTests/LoginTest';

const TestEjecution = () => {
  const [message, setMessage] = useState('');
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  const handleExecute = async (testType) => {
    const confirmation = window.confirm(
      `Are you sure you want to execute the ${testType} tests?`
    );
    if (!confirmation) return; // Si el usuario cancela, salir de la función

    try {
      const response = await axios.get(`/${testType}`);
      setMessage(response.data.message);
      setResult(response.data.results || response.data.error);
      setError('');
    } catch (err) {
      console.error('There was an error executing the tests!', err);
      setMessage('Error executing tests');
      setResult('');
      setError(err.response?.data?.error || 'An error occurred');
    }

    // Mensaje de resultado desaparece después de 10 segundos
    setTimeout(() => {
      setMessage('');
      setResult('');
      setError('');
    }, 10000);
  };

  return (
    <div>
      <TopMenu />
      <Center flexDirection='column' mt={10}>
        <Heading as='h5' size='2xl' noOfLines={1}>
          Execute Tests Suites
        </Heading>
        <Stack
          direction='row'
          spacing={5}
          mt={5}
          justifyContent='center'
          align='center'
          m={10}
        >
          <Button colorScheme='yellow' onClick={() => handleExecute('smoke')}>
            Smoke
          </Button>
          <Button
            colorScheme='yellow'
            onClick={() => handleExecute('regression')}
          >
            Regression
          </Button>
          <Button colorScheme='yellow' onClick={() => handleExecute('sanity')}>
            Sanity
          </Button>
          <Button colorScheme='yellow' onClick={() => handleExecute('e2e')}>
            E2E
          </Button>
        </Stack>

        <Heading as='h5' size='2xl' noOfLines={1} lineHeight={'shorter'}>
          Execute Single Tests
        </Heading>
        <Stack
          direction='row'
          spacing={5}
          mt={5}
          justifyContent='center'
          align='center'
          m={10}
        >
          <LoginTest />
        </Stack>

        {/* Mostrar mensajes de resultado */}
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
              {`Report : `}
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
      </Center>
    </div>
  );
};

export default TestEjecution;
