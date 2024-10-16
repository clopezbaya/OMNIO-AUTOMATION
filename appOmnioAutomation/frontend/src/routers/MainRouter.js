import React, { useState } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import ErrorPath from '../components/ErrorPath';
import Sidebar from '../components/menu/Sidebar';
import { Box, Button } from '@chakra-ui/react';
import ExecuteTestCases from '../components/menu/ExecuteTestCases';
import History from '../components/menu/History';

const MainRouter = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false); // Estado para controlar el Sidebar

  // Función para alternar el estado del Sidebar
  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <BrowserRouter>
      {/* Botón para abrir el Sidebar */}
      <Button
        w='10%'
        size='lg'
        colorScheme='teal'
        onClick={toggleSidebar}
        position='fixed'
        top='10px'
        left='10px'
      >
        Menu
      </Button>

      {/* Sidebar que se muestra u oculta dependiendo del estado */}
      <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />

      {/* Contenedor principal para las rutas */}
      <Box ml={isSidebarOpen ? '250px' : '0'} p={4}>
        <Routes>
          <Route path='/' element={<ExecuteTestCases />} />
          <Route path='/History' element={<History />} />
          <Route path='/*' element={<ErrorPath />} />
        </Routes>
      </Box>
    </BrowserRouter>
  );
};

export default MainRouter;
