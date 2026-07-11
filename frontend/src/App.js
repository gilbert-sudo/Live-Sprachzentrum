import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Kurse from './pages/Kurse';
import Karriere from './pages/Karriere';
import Prufungssimulator from './pages/Prufungssimulator';
import Uebung from './pages/Uebung';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/kurse" element={<Kurse />} />
          <Route path="/karriere" element={<Karriere />} />
          <Route path="/simulator" element={<Prufungssimulator />} />
          <Route path="/uebung" element={<Uebung />} />
          {/* Fallbacks for navigation links to prevent crashing */}
          <Route path="/stammtisch" element={<Dashboard />} />
          <Route path="/profil" element={<Dashboard />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
