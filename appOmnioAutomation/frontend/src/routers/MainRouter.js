import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import TestEjecution from '../components/TestExecution';
import HistoryExecution from '../components/HistoryExecution';
import ErrorPath from '../components/ErrorPath';

const MainRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<TestEjecution />} />
        <Route path='/History' element={<HistoryExecution />} />
        <Route path='/*' element={<ErrorPath />} />
      </Routes>
    </BrowserRouter>
  );
};

export default MainRouter;
