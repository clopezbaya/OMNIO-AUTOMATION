import React, { useState, useEffect } from 'react';
import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Tag,
  Center,
} from '@chakra-ui/react';
import axios from 'axios';

const TestResultsModal = ({ isOpen, onClose, selectedTestId }) => {
  const [testResults, setTestResults] = useState([]);

  useEffect(() => {
    if (selectedTestId) {
      const fetchTestResults = async () => {
        try {
          const response = await axios.get(`/testResults/${selectedTestId}`);
          console.log(response.data);
          setTestResults(response.data.result);
        } catch (error) {
          console.error('Error fetching test results:', error);
        }
      };

      fetchTestResults();
    }
  }, [selectedTestId]);

  return (
    <AlertDialog isOpen={isOpen} onClose={onClose}>
      <AlertDialogOverlay>
        <AlertDialogContent>
          <Center>
            <AlertDialogHeader>Results</AlertDialogHeader>
          </Center>
          <AlertDialogBody>
            <Table variant='striped' colorScheme='gray'>
              <Thead>
                <Tr>
                  <Th>Test Name</Th>
                  <Th>Result</Th>
                </Tr>
              </Thead>
              <Tbody>
                {testResults.map((result, index) => (
                  <Tr key={index}>
                    <Td>{result.Test}</Td>
                    <Td>
                      <Tag
                        size='lg'
                        colorScheme={
                          result.result === 'Passed' ? 'green' : 'red'
                        }
                      >
                        {result.result === 'Passed' ? 'Passed' : 'Failed'}
                      </Tag>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button onClick={onClose}>Close</Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default TestResultsModal;
