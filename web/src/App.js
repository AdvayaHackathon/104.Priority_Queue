import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CareChainWelcome from './WelcomePage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CareChainWelcome />} />
      </Routes>
    </Router>
  );
};

export default App;