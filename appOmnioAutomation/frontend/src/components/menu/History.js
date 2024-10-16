import React, { useState, useEffect } from 'react';
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

ChartJS.register(BarElement, Tooltip, Legend, CategoryScale, LinearScale);

function History() {
  const [historyData, setHistoryData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;

  // Recuperar los datos desde el backend con axios
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

                  return {
                    testName: test.testType,
                    environment: env.name,
                    status: status,
                    date: new Date(test.date).toLocaleString(),
                  };
                }
                return null;
              })
              .filter((item) => item !== null);
          })
          .flat();

        setHistoryData(mappedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  // Función para manejar el cambio en la barra de búsqueda
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(0); // Resetear a la primera página al buscar
  };

  // Filtrar los datos del historial basados en el término de búsqueda
  const filteredData = historyData.filter(
    (item) =>
      item.testName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.environment.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Paginar los datos filtrados
  const paginatedData = filteredData.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  // Contar cuántos pasaron y cuántos fallaron
  const testResults = filteredData.reduce(
    (acc, item) => {
      acc[item.status] = (acc[item.status] || 0) + 1;
      return acc;
    },
    { Passed: 0, Failed: 0 }
  );

  // Datos para las gráficas
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

  return (
    <Box>
      <Heading textAlign='center' mb={4} color='teal.500' as='h2' size='xl'>
        Test History
      </Heading>
      <Input
        placeholder='Search by test name, status, or environment'
        value={searchTerm}
        onChange={handleSearchChange}
        mb={4}
      />
      <Table variant='simple'>
        <Thead>
          <Tr>
            <Th>TEST NAME</Th>
            <Th>ENVIRONMENT</Th>
            <Th>STATUS</Th>
            <Th>DATE</Th>
          </Tr>
        </Thead>
        <Tbody>
          {paginatedData.map((item, index) => (
            <Tr key={index}>
              <Td>{item.testName}</Td>
              <Td>{item.environment}</Td>
              <Td>
                <Tag colorScheme={item.status === 'Passed' ? 'green' : 'red'}>
                  {item.status}
                </Tag>
              </Td>
              <Td>{item.date}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
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
    </Box>
  );
}

export default History;
