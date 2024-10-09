import React, { useState } from 'react';
import TopMenu from './TopMenu';
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
} from '@chakra-ui/react';
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

const HistoryExecution = () => {
  // Datos de ejemplo para el historial de ejecución
  const historyData = [
    {
      id: 1,
      testName: 'Smoke Test',
      status: 'Passed',
      executedAt: '2024-10-08 12:34:56',
    },
    {
      id: 2,
      testName: 'Regression Test',
      status: 'Failed',
      executedAt: '2024-10-07 15:20:00',
    },
    {
      id: 3,
      testName: 'E2E Test',
      status: 'Passed',
      executedAt: '2024-10-06 09:15:34',
    },
    {
      id: 4,
      testName: 'Sanity Test',
      status: 'Failed',
      executedAt: '2024-10-05 10:30:00',
    },
    {
      id: 5,
      testName: 'Smoke Test',
      status: 'Passed',
      executedAt: '2024-10-08 10:34:56',
    },
  ];

  // Estado para almacenar el término de búsqueda
  const [searchTerm, setSearchTerm] = useState('');

  // Función para manejar el cambio en la barra de búsqueda
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Filtrar los datos del historial basados en el término de búsqueda
  const filteredData = historyData.filter(
    (item) =>
      item.testName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Contar cuántos pasaron y cuántos fallaron por tipo de test
  const testTypes = [
    'Smoke Test',
    'Regression Test',
    'E2E Test',
    'Sanity Test',
  ];
  const testResults = testTypes.reduce((acc, type) => {
    const passed = historyData.filter(
      (item) => item.testName === type && item.status === 'Passed'
    ).length;
    const failed = historyData.filter(
      (item) => item.testName === type && item.status === 'Failed'
    ).length;
    acc[type] = { passed, failed };
    return acc;
  }, {});

  // Datos para la gráfica de Barras para cada tipo de test
  const chartDataPerTest = {
    labels: testTypes,
    datasets: [
      {
        label: 'Passed',
        data: testTypes.map((type) => testResults[type].passed),
        backgroundColor: '#68D391', // Color verde para pruebas pasadas
      },
      {
        label: 'Failed',
        data: testTypes.map((type) => testResults[type].failed),
        backgroundColor: '#F56565', // Color rojo para pruebas fallidas
      },
    ],
  };

  // Opciones para la gráfica, asegurando que los valores sean enteros
  const options = {
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1, // Asegura que los números de la escala sean enteros
        },
      },
    },
  };

  // Colores para las filas de la tabla
  const getStatusColor = (status) => {
    return status === 'Passed' ? 'gray.200' : 'gray.300'; // Color plomo para filas
  };

  return (
    <div>
      <TopMenu />
      <Box p={5}>
        <Heading as='h3' size='lg' mb={5}>
          History of Test Executions
        </Heading>

        {/* Barra de búsqueda */}
        <Stack spacing={4} mb={5}>
          <Input
            placeholder='Search by test name or status...'
            value={searchTerm}
            onChange={handleSearchChange}
            size='md'
            focusBorderColor='yellow.500'
          />
        </Stack>

        {/* Tabla con los datos filtrados */}
        <Table variant='striped' colorScheme='none'>
          <Thead>
            <Tr bg='gray.300'>
              <Th>Test Name</Th>
              <Th>Status</Th>
              <Th>Executed At</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredData.map((item) => (
              <Tr key={item.id} bg={getStatusColor(item.status)}>
                <Td>{item.testName}</Td>
                <Td>
                  <Tag colorScheme={item.status === 'Passed' ? 'green' : 'red'}>
                    {item.status}
                  </Tag>
                </Td>
                <Td>{item.executedAt}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>

        {/* Gráfica de Barras mostrando resultados por tipo de test */}
        <Box mt={10}>
          <Heading as='h4' size='md' mb={5}>
            Results by Test Type
          </Heading>
          <Bar data={chartDataPerTest} options={options} />
        </Box>
      </Box>
    </div>
  );
};

export default HistoryExecution;
