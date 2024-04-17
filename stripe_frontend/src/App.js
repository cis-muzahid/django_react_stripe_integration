import React from 'react';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';

import HomePage from './HomePage';
import CancelPage from './Cancel';
import Test from './Test';

const App = () => (
  <Router>
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/cancel' element={<CancelPage />} />
      <Route path='/success' element={<Test />} />
    </Routes>
  </Router>
);

export default App;
