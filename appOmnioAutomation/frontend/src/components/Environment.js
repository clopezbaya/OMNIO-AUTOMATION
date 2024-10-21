import React, { useState } from 'react';
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
  useToast, // Importar useToast
} from '@chakra-ui/react';
import axios from 'axios';

const Environment = ({ onNewEnvironment }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const toast = useToast(); // Inicializar useToast

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
      await axios.post('/environment', environment);
      onNewEnvironment();
      onClose();

      // Mostrar mensaje de confirmación
      toast({
        title: 'Environment created.',
        description: `The environment "${environment.name}" has been created successfully.`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (err) {
      console.error('There was an error!', err);

      // Mostrar mensaje de error en caso de falla
      toast({
        title: 'Error creating environment.',
        description: err.response?.data?.message || 'There was an error.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
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
    </div>
  );
};

export default Environment;
