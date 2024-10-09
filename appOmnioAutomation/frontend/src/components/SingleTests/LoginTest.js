import React, { useState, useRef } from 'react';
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
  const [loading, setLoading] = useState(false); // Estado para manejar la carga

  const handleClick = () => setShow(!show);

  const handleOpen = () => {
    setUsername('');
    setPassword('');
    setMessage('');
    setResult('');
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

    const loginData = { username, password }; // Aquí no se envían campos vacíos

    setLoading(true);

    try {
      const response = await axios.post('/login', loginData);
      setMessage(response.data.message);
      setResult(response.data.results || response.data.error);

      // Hacer que los mensajes desaparezcan después de 10 segundos
      setTimeout(() => {
        setMessage('');
        setResult('');
      }, 10000);
    } catch (error) {
      console.error('There was an error!', error);
      setMessage('Login failed!');
      setTimeout(() => {
        setMessage('');
      }, 5000); // Mensaje de error desaparece después de 10 segundos
    } finally {
      setLoading(false);
      onClose();
    }
  };

  return (
    <div>
      <Center>
        <Button colorScheme='orange' onClick={handleOpen}>
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
            <ModalHeader>Enter Test Data</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Username (Email)</FormLabel>
                <Input
                  ref={initialRef}
                  placeholder='Email'
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Password</FormLabel>
                <InputGroup size='md'>
                  <Input
                    pr='4.5rem'
                    type={show ? 'text' : 'password'}
                    placeholder='Enter password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <InputRightElement width='4.5rem'>
                    <Button h='1.75rem' size='sm' onClick={handleClick}>
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
            </ModalBody>

            <ModalFooter>
              <Button
                colorScheme='blue'
                mr={3}
                onClick={handleSubmit}
                isDisabled={loading}
              >
                {loading ? 'Testing...' : 'Init Test'}
              </Button>
              <Button onClick={onClose} isDisabled={loading}>
                Cancel
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Center>

      {message && (
        <Center mt={4}>
          <Box
            bg={
              message === 'Tests executed successfully'
                ? 'green.400'
                : message === 'Tests executed with errors'
                ? 'red.400'
                : 'tomato'
            }
            w='100%'
            p={4}
            color='white'
            textAlign='center'
          >
            {message}
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
    </div>
  );
}

export default LoginForm;
