import React from 'react';
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  useDisclosure,
  Center,
} from '@chakra-ui/react';
import { useState } from 'react';
import axios from 'axios';
import ResultMessage from './ResultMessage';

const Environment = ({ onNewEnvironment }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  const handleCreateEnv = async () => {
    if (!name) {
      window.alert('The environment name is required..!');
      return;
    }
    const environment = {
      name,
      description,
    };

    try {
      const response = await axios.post('/environment', environment);
      setMessage(response.data.message);
      setResult(`Name: ${environment.name}`);
      onNewEnvironment();
      onClose();

      // Hacer que los mensajes desaparezcan después de 10 segundos
      setTimeout(() => {
        setMessage('');
        setResult('');
      }, 5000);
    } catch (err) {
      console.error('There was an error!', err);
      window.alert(err.response?.data?.message);
    }
  };
  return (
    <div>
      {/* Botón para crear un nuevo ambiente */}
      <Center>
        <Button colorScheme='teal' onClick={onOpen}>
          Create Environment
        </Button>
      </Center>

      {/* Modal para agregar un nuevo ambiente */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create New Environment</ModalHeader>
          <ModalBody>
            <Input
              placeholder='Name'
              onChange={(e) => setName(e.target.value)}
              mb={3}
            />
            <Input
              placeholder='Description'
              onChange={(e) => setDescription(e.target.value)}
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
      <Center>
        <ResultMessage message={message} error={error} result={result} />
      </Center>
    </div>
  );
};

export default Environment;
