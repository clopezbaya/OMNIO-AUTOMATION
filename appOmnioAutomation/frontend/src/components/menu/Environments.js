import React, { useState, useEffect, useCallback } from 'react';
import Environment from '../Environment';
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
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Center,
  useToast,
  Text,
} from '@chakra-ui/react';
import axios from 'axios';

const Environments = () => {
  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure();
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();
  const [environments, setEnvironments] = useState([]);
  const [selectedEnv, setSelectedEnv] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const toast = useToast();

  const fetchEnvironments = useCallback(async () => {
    try {
      const response = await axios.get('/environments');
      setEnvironments(response.data);
    } catch (error) {
      console.error('Error fetching environments', error);
      toast({
        title: 'Error fetching environments',
        description: 'Unable to fetch environment data.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  }, [toast]);

  useEffect(() => {
    fetchEnvironments();
  }, [fetchEnvironments]);

  const handleNewEnvironment = () => {
    fetchEnvironments();
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/environment/${selectedEnv._id}`);
      setEnvironments(
        environments.filter((env) => env._id !== selectedEnv._id)
      );
      toast({
        title: 'Environment deleted successfully.',
        description: 'The environment has been deleted.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      onDeleteClose();
    } catch (error) {
      console.error('Error deleting environment', error);
      toast({
        title: 'Error deleting environment',
        description: 'Unable to delete the environment.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleEdit = (env) => {
    setSelectedEnv(env);
    setName(env.name);
    setDescription(env.description);
    onEditOpen();
  };

  const handleSave = async () => {
    try {
      const updatedEnv = { name, description };
      await axios.put(`/environment/${selectedEnv._id}`, updatedEnv);
      setEnvironments(
        environments.map((env) =>
          env._id === selectedEnv._id ? { ...env, ...updatedEnv } : env
        )
      );
      toast({
        title: 'Environment updated successfully.',
        description: `The environment "${name}" has been updated.`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      onEditClose();
    } catch (error) {
      console.error('Error updating environment', error);
      toast({
        title: 'Error updating environment',
        description: 'Unable to update the environment.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <div>
      <Center>
        <Text fontSize='2xl' fontWeight='bold' mt={6} mb={4}>
          Environments
        </Text>
      </Center>

      <Center>
        <Environment onNewEnvironment={handleNewEnvironment} />
      </Center>

      <Center>
        <Table variant='striped' colorScheme='teal'>
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Description</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {environments.map((env) => (
              <Tr key={env._id}>
                <Td>{env.name}</Td>
                <Td>{env.description}</Td>
                <Td>
                  <Button
                    colorScheme='yellow'
                    size='sm'
                    mr={2}
                    onClick={() => handleEdit(env)}
                  >
                    Edit
                  </Button>
                  <Button
                    colorScheme='red'
                    size='sm'
                    onClick={() => {
                      setSelectedEnv(env);
                      onDeleteOpen();
                    }}
                  >
                    Delete
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Center>

      {/* Modal for editing environment */}
      <Modal isOpen={isEditOpen} onClose={onEditClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Environment</ModalHeader>
          <ModalBody>
            <Input
              placeholder='Name'
              value={name}
              onChange={(e) => setName(e.target.value)}
              mb={3}
            />
            <Input
              placeholder='Description'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='teal' mr={3} onClick={handleSave}>
              Save
            </Button>
            <Button variant='ghost' onClick={onEditClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Modal for delete confirmation */}
      <Modal isOpen={isDeleteOpen} onClose={onDeleteClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirm Deletion</ModalHeader>
          <ModalBody>
            <Text>
              Are you sure you want to delete the environment "
              {selectedEnv?.name}"?
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='red' mr={3} onClick={handleDelete}>
              Delete
            </Button>
            <Button variant='ghost' onClick={onDeleteClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Environments;
