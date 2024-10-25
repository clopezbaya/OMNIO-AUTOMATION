import {
  Box,
  Flex,
  Button,
  Select,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Heading,
  Stack,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import LoginTest from '../SingleTests/LoginTest';
import ResultMessage from '../ResultMessage';
import Environment from '../Environment';

function ExecuteTestCases() {
  const [message, setMessage] = useState('');
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  const [selectedEnv, setSelectedEnv] = useState('');
  const [environments, setEnvironments] = useState([]);

  // Cargar entornos desde la base de datos
  const fetchEnvironments = async () => {
    try {
      const response = await axios.get('/environments');
      setEnvironments(response.data);
    } catch (err) {
      console.error('Error fetching environments:', err);
      setError('Error fetching environments');
    }
  };

  // Cargar entornos al montar el componente
  useEffect(() => {
    fetchEnvironments();
  }, []);

  const handleNewEnvironment = () => {
    fetchEnvironments();
  };

  const handleExecute = async (testType) => {
    const confirmation = window.confirm(
      `Are you sure you want to execute the ${testType} tests?`
    );
    if (!confirmation) return;

    try {
      const response = await axios.post(`/${testType}`, {
        environment: {
          name: selectedEnv,
        },
      });
      setMessage(`${response.data.message} - ${response.data.resultMail}`);
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
    <Box p={6} backgroundColor='gray.50' minH='100vh'>
      <Heading textAlign='center' mb={8} size='2xl' color='teal.500'>
        Test Automation OMNIO App
      </Heading>
      <Stack spacing={4} maxW='600px' mx='auto'>
        <Select
          placeholder='Select environment'
          value={selectedEnv}
          onChange={(e) => setSelectedEnv(e.target.value)}
          size='lg'
          focusBorderColor='teal.400'
        >
          {environments.map((env) => (
            <option key={env._id} value={env.name}>
              {env.name}
            </option>
          ))}
        </Select>
        <Environment onNewEnvironment={handleNewEnvironment} />

        {/* Condicional para mostrar los acordeones solo si hay un entorno seleccionado */}
        {selectedEnv && (
          <Box mt={8} borderWidth={1} borderRadius='md' overflow='hidden'>
            <Accordion allowToggle>
              {/* Test Suites */}
              <AccordionItem>
                <AccordionButton
                  _expanded={{ bg: 'teal.100', color: 'teal.500' }}
                >
                  <Box flex='1' textAlign='left'>
                    Test Suites
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel pb={4}>
                  <Button
                    colorScheme='teal'
                    variant='outline'
                    m={2}
                    w='45%'
                    onClick={() => handleExecute('smoke')}
                    isDisabled={!selectedEnv} // Deshabilitar si no hay entorno seleccionado
                  >
                    Smoke
                  </Button>
                  <Button
                    colorScheme='teal'
                    variant='outline'
                    m={2}
                    w='45%'
                    onClick={() => handleExecute('regression')}
                    isDisabled={!selectedEnv} // Deshabilitar si no hay entorno seleccionado
                  >
                    Regression
                  </Button>
                  <Button
                    colorScheme='teal'
                    variant='outline'
                    m={2}
                    w='45%'
                    onClick={() => handleExecute('e2e')}
                    isDisabled={!selectedEnv} // Deshabilitar si no hay entorno seleccionado
                  >
                    E2E
                  </Button>
                  <Button
                    colorScheme='teal'
                    variant='outline'
                    m={2}
                    w='45%'
                    onClick={() => handleExecute('sanity')}
                    isDisabled={!selectedEnv} // Deshabilitar si no hay entorno seleccionado
                  >
                    Sanity
                  </Button>
                </AccordionPanel>
              </AccordionItem>

              {/* Single Test Cases */}
              <AccordionItem>
                <AccordionButton
                  _expanded={{ bg: 'teal.100', color: 'teal.500' }}
                >
                  <Box flex='1' textAlign='left'>
                    Single Test Cases
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel pb={4}>
                  <Flex>
                    <Box w={'45%'} m={2}>
                      <LoginTest environment={selectedEnv} />
                    </Box>
                    <Button
                      colorScheme='teal'
                      variant='outline'
                      m={2}
                      w='45%'
                      onClick={() => console.log('Execute Test Case 2')}
                      isDisabled={!selectedEnv} // Deshabilitar si no hay entorno seleccionado
                    >
                      Test Case 2
                    </Button>
                  </Flex>
                  <Button
                    colorScheme='teal'
                    variant='outline'
                    m={2}
                    w='45%'
                    onClick={() => console.log('Execute Test Case 3')}
                    isDisabled={!selectedEnv} // Deshabilitar si no hay entorno seleccionado
                  >
                    Test Case 3
                  </Button>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </Box>
        )}
      </Stack>
      <ResultMessage message={message} error={error} result={result} />
    </Box>
  );
}

export default ExecuteTestCases;
