import styled from '@emotion/styled';
import Dashboard from './pages/layout';
import BasicLineChartt from './components/chart';
import Dashboard1 from './pages/dashboardcompt';
import Tanks from './tanks/tank';
import Devices from './pages/device';
import { Route, Router, Routes, Navigate } from 'react-router-dom';

import React from 'react';

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" />} />
      <Route path="/dashboard" element={<Dashboard />}>
        <Route index element={<Dashboard1 />} />
        <Route path="devices" element={<Devices />} />
      </Route>
    </Routes>
  );
}

export default App;
