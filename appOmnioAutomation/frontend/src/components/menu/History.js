import React, { useState, useEffect, useRef } from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box,
  Heading,
  Input,
  Stack,
  Tag,
  Button,
  HStack,
  IconButton,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  useToast, // Importar useToast
} from '@chakra-ui/react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
} from 'chart.js';
import { DeleteIcon, ViewIcon } from '@chakra-ui/icons';
import TestResultsModal from './TestResultModal';
//import { FaTrashAlt, FaViewIcon } from 'react-icons/fa'; // Importar ícono de basurero

ChartJS.register(BarElement, Tooltip, Legend, CategoryScale, LinearScale);

function History() {
  const [historyData, setHistoryData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTestId, setSelectedTestId] = useState(null);
  const [selectedReportId, setSelectedReportId] = useState(null);
  const cancelRef = useRef();
  const toast = useToast(); // Inicializar toast

  useEffect(() => {
    const fetchData = async () => {
      try {
        const environmentResponse = await axios.get('/environments');
        const testResultsResponse = await axios.get('/testResults');
        const environments = environmentResponse.data;
        const testResults = testResultsResponse.data;

        const mappedData = environments
          .map((env) => {
            return env.tests
              .map((testId) => {
                const test = testResults.find((t) => t._id === testId);
                if (test) {
                  const status = test.result
                    ? test.result.every((r) => r.result === 'Passed')
                      ? 'Passed'
                      : 'Failed'
                    : 'Unknown';

                  // Formatear la fecha solo con el día, mes y año (sin la hora)
                  const date = new Date(test.date);
                  const formattedDate = date.toLocaleDateString();

                  return {
                    testName: test.testType,
                    environment: env.name,
                    status: status,
                    date: date, // Almacenar el objeto Date para ordenarlo
                    formattedDate: formattedDate, // Solo para mostrar
                    id: test._id,
                  };
                }
                return null;
              })
              .filter((item) => item !== null);
          })
          .flat();

        // Ordenar por fecha descendente
        const sortedData = mappedData.sort((a, b) => b.date - a.date);

        setHistoryData(sortedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const openDeleteConfirmation = (id) => {
    setSelectedReportId(id);
    setIsOpen(true);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/testResults/${selectedReportId}`);
      setHistoryData(
        historyData.filter((item) => item.id !== selectedReportId)
      );

      // Mostrar el mensaje de confirmación
      toast({
        title: 'Report deleted.',
        description: 'The report has been successfully deleted.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error deleting report:', error);
    } finally {
      setIsOpen(false); // Cerrar el cuadro de diálogo después de eliminar
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(0); // Resetear a la primera página al buscar
  };

  const openTestResultsModal = (testId) => {
    setSelectedTestId(testId);
    setIsModalOpen(true);
  };

  const filteredData = historyData.filter(
    (item) =>
      item.testName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.environment.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedData = filteredData.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const testResults = filteredData.reduce(
    (acc, item) => {
      acc[item.status] = (acc[item.status] || 0) + 1;
      return acc;
    },
    { Passed: 0, Failed: 0 }
  );

  const data = {
    labels: ['Passed', 'Failed'],
    datasets: [
      {
        label: 'Test Results',
        data: [testResults.Passed, testResults.Failed],
        backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)'],
      },
    ],
  };

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const getStatusColor = (status) => {
    return status === 'Passed' ? 'gray.100' : 'gray.200';
  };

  return (
    <Box>
      <Heading textAlign='center' mb={4} color='teal.500' as='h2' size='xl'>
        Test History
      </Heading>
      <Stack spacing={4} mb={5}>
        <Input
          placeholder='Search by test name or status...'
          value={searchTerm}
          onChange={handleSearchChange}
          size='md'
          focusBorderColor='teal.500'
        />
      </Stack>
      <Table variant='striped' colorScheme='none'>
        <Thead>
          <Tr bg='gray.400'>
            <Th>TEST NAME</Th>
            <Th>ENVIRONMENT</Th>
            <Th>STATUS</Th>
            <Th>DATE</Th>
            <Th>ACTIONS</Th>
          </Tr>
        </Thead>
        <Tbody>
          {paginatedData.map((item, index) => (
            <Tr key={index} bg={getStatusColor(item.status)}>
              <Td>{item.testName}</Td>
              <Td>{item.environment}</Td>
              <Td>
                <Tag colorScheme={item.status === 'Passed' ? 'green' : 'red'}>
                  {item.status}
                </Tag>
              </Td>
              <Td>{item.formattedDate}</Td>{' '}
              {/* Mostrar solo la fecha formateada */}
              <Td>
                {item.testName !== 'Single' && (
                  <IconButton
                    aria-label='View report'
                    icon={<ViewIcon />}
                    colorScheme='yellow'
                    m={2}
                    onClick={() => openTestResultsModal(item.id)}
                  />
                )}
                <IconButton
                  aria-label='Delete report'
                  icon={<DeleteIcon />}
                  colorScheme='red'
                  m={2}
                  onClick={() => openDeleteConfirmation(item.id)}
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      {/* Aquí puedes agregar el componente TestResultsModal */}
      <TestResultsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedTestId={selectedTestId}
      />

      <HStack mt={4} justifyContent='space-between'>
        <Button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
          disabled={currentPage === 0}
        >
          Previous
        </Button>
        <Button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1))
          }
          disabled={currentPage === totalPages - 1}
        >
          Next
        </Button>
      </HStack>

      <Box mt={8}>
        <Heading textAlign='center' mb={4} color='teal.500' as='h2' size='xl'>
          Test Results Chart
        </Heading>
        <Bar data={data} />
      </Box>

      {/* Cuadro de confirmación */}
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={() => setIsOpen(false)}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Confirm Deletion
            </AlertDialogHeader>
            <AlertDialogBody>
              Are you sure you want to delete this report? This action cannot be
              undone.
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button colorScheme='red' onClick={handleDelete} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
}

export default History;
