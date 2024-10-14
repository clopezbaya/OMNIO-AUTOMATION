import {
  Box,
  Button,
  Select,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  useDisclosure,
  Heading,
  Stack,
} from '@chakra-ui/react';
import { useState } from 'react';
import axios from 'axios';
import LoginTest from '../SingleTests/LoginTest';
import ResultMessage from '../ResultMessage';

function ExecuteTestCases() {
  const [message, setMessage] = useState('');
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure(); // Para el modal
  const [environments, setEnvironments] = useState([
    'Production',
    'Staging',
    'Development',
  ]);
  const [newEnv, setNewEnv] = useState({ name: '', description: '' });
  const [selectedEnv, setSelectedEnv] = useState('');

  const handleCreateEnv = () => {
    setEnvironments([...environments, newEnv.name]);
    setNewEnv({ name: '', description: '' });
    onClose();
  };

  const handleExecute = async (testType) => {
    const confirmation = window.confirm(
      `Are you sure you want to execute the ${testType} tests?`
    );
    if (!confirmation) return; // Si el usuario cancela, salir de la función

    try {
      const response = await axios.get(`/${testType}`);
      console.log(response.data);
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
    <Box p={6} backgroundColor='gray.50' minH='100vh'>
      {/* Título grande y centrado */}
      <Heading textAlign='center' mb={8} size='2xl' color='teal.500'>
        Test Automation OMNIO App
      </Heading>
      <Stack spacing={4} maxW='600px' mx='auto'>
        {/* Dropdown para seleccionar el ambiente */}
        <Select
          placeholder='Select environment'
          value={selectedEnv}
          onChange={(e) => setSelectedEnv(e.target.value)}
          size='lg'
          focusBorderColor='teal.400'
        >
          {environments.map((env, idx) => (
            <option key={idx} value={env}>
              {env}
            </option>
          ))}
        </Select>

        {/* Botón para crear un nuevo ambiente */}
        <Button colorScheme='teal' onClick={onOpen}>
          Create Environment
        </Button>

        {/* Modal para agregar un nuevo ambiente */}
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Create New Environment</ModalHeader>
            <ModalBody>
              <Input
                placeholder='Name'
                value={newEnv.name}
                onChange={(e) => setNewEnv({ ...newEnv, name: e.target.value })}
                mb={3}
              />
              <Input
                placeholder='Description'
                value={newEnv.description}
                onChange={(e) =>
                  setNewEnv({ ...newEnv, description: e.target.value })
                }
              />
            </ModalBody>
            <ModalFooter>
              <Button colorScheme='teal' mr={3} onClick={handleCreateEnv}>
                Save
              </Button>
              <Button variant='ghost' onClick={onClose}>
                Cancel
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        {/* Secciones para ejecutar los test suites y los single test cases */}
        <Accordion allowToggle mt={8}>
          {/* Test Suites */}
          <AccordionItem>
            <AccordionButton _expanded={{ bg: 'teal.100', color: 'teal.500' }}>
              <Box flex='1' textAlign='left'>
                Test Suites
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={4}>
              <Button
                colorScheme='teal'
                variant='outline'
                mt={2}
                w='full'
                onClick={() => handleExecute('smoke')}
              >
                Smoke
              </Button>
              <Button
                colorScheme='teal'
                variant='outline'
                mt={2}
                w='full'
                onClick={() => handleExecute('regression')}
              >
                Regression
              </Button>
              <Button
                colorScheme='teal'
                variant='outline'
                mt={2}
                w='full'
                onClick={() => handleExecute('e2e')}
              >
                E2E
              </Button>
              <Button
                colorScheme='teal'
                variant='outline'
                mt={2}
                w='full'
                onClick={() => handleExecute('sanity')}
              >
                Sanity
              </Button>
            </AccordionPanel>
          </AccordionItem>

          {/* Single Test Cases */}
          <AccordionItem>
            <AccordionButton _expanded={{ bg: 'teal.100', color: 'teal.500' }}>
              <Box flex='1' textAlign='left'>
                Single Test Cases
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={4}>
              <LoginTest />
              <Button
                colorScheme='teal'
                variant='outline'
                mt={2}
                w='full'
                onClick={() => console.log('Execute Test Case 2')}
              >
                Test Case 2
              </Button>
              <Button
                colorScheme='teal'
                variant='outline'
                mt={2}
                w='full'
                onClick={() => console.log('Execute Test Case 3')}
              >
                Test Case 3
              </Button>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Stack>
      <ResultMessage message={message} error={error} result={result} />;
    </Box>
  );
}

export default ExecuteTestCases;
