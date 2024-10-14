import React, { useState, useRef } from 'react';
import ResultMessage from '../ResultMessage';
import axios from 'axios';
import {
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Spinner,
} from '@chakra-ui/react';

function LoginForm() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef(null);
  const finalRef = useRef(null);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState('');
  const [result, setResult] = useState('');
  const [error, setError] = useState(''); // Estado para manejar errores
  const [loading, setLoading] = useState(false); // Estado para manejar la carga

  const handleClick = () => setShow(!show);

  const handleOpen = () => {
    setUsername('');
    setPassword('');
    setMessage('');
    setResult('');
    setError(''); // Limpiar error al abrir el modal
    setLoading(false);
    onOpen();
  };

  const handleSubmit = async () => {
    // Mensaje de advertencia si hay campos vacíos
    if (!username || !password) {
      const confirmation = window.confirm(
        'If you leave at least one field empty, the test will run with generic test data. Are you okay with this?'
      );
      if (confirmation) {
        setUsername('');
        setPassword('');
      } else {
        return;
      }
    }

    const loginData = {
      username,
      password,
      environment: {
        name: '',
        description: '',
      },
    }; // Aquí no se envían campos vacíos

    setLoading(true);
    setError(''); // Limpiar errores previos

    try {
      const response = await axios.post('/login', loginData);
      setMessage(response.data.message);
      setResult(response.data.results || response.data.error);
      setError('');

      // Hacer que los mensajes desaparezcan después de 10 segundos
      setTimeout(() => {
        setMessage('');
        setResult('');
        setError('');
      }, 10000);
    } catch (err) {
      console.error('There was an error!', err);
      setMessage('Login failed!'); // Mensaje de error específico
      setResult('');
      setError(err.response?.data?.error || 'An error occurred'); // Manejo de errores

      // Mensaje de error desaparece después de 5 segundos
      setTimeout(() => {
        setError('');
      }, 5000);
    } finally {
      setLoading(false);
      onClose();
    }
  };

  return (
    <div>
      <Center>
        <Button
          colorScheme='teal'
          variant='outline'
          mt={2}
          w='full'
          onClick={handleOpen}
        >
          Login Test
        </Button>
        <Modal
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader color='teal.600' fontWeight='bold'>
              Enter Test Data
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel color='gray.600'>Username (Email)</FormLabel>
                <Input
                  ref={initialRef}
                  placeholder='Email'
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel color='gray.600'>Password</FormLabel>
                <InputGroup size='md'>
                  <Input
                    pr='4.5rem'
                    type={show ? 'text' : 'password'}
                    placeholder='Enter password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <InputRightElement width='4.5rem'>
                    <Button
                      colorScheme='teal'
                      variant='outline'
                      mt={2}
                      h='1.75rem'
                      size='sm'
                      onClick={handleClick}
                    >
                      {show ? 'Hide' : 'Show'}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>

              {loading && (
                <Center mt={4}>
                  <Spinner size='lg' />
                  <Box mt={2}>Waiting while tests are executed...</Box>
                </Center>
              )}

              {error && (
                <Center mt={4}>
                  <Box
                    bg='red.400'
                    w='100%'
                    p={4}
                    color='white'
                    textAlign='center'
                  >
                    {error}
                  </Box>
                </Center>
              )}
            </ModalBody>

            <ModalFooter>
              <Button
                colorScheme='teal'
                variant='outline'
                mt={2}
                mr={3}
                onClick={handleSubmit}
                isDisabled={loading}
              >
                {loading ? 'Testing...' : 'Init Test'}
              </Button>
              <Button
                colorScheme='teal'
                variant='outline'
                mt={2}
                onClick={onClose}
                isDisabled={loading}
              >
                Cancel
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Center>
      <ResultMessage message={message} error={error} result={result} />
    </div>
  );
}

export default LoginForm;
