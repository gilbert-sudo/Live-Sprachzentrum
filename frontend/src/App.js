import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Kurse from './pages/Kurse';
import Karriere from './pages/Karriere';
import Prufungssimulator from './pages/Prufungssimulator';
import Uebung from './pages/Uebung';
import Profile from './pages/Profile';
import Stammtisch from './pages/Stammtisch';

function App() {
  return (
    <Router>
      <Navbar>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/kurse" element={<Kurse />} />
          <Route path="/karriere" element={<Karriere />} />
          <Route path="/simulator" element={<Prufungssimulator />} />
          <Route path="/uebung" element={<Uebung />} />
          {/* Fallbacks for navigation links to prevent crashing */}
          <Route path="/stammtisch" element={<Stammtisch />} />
          <Route path="/profil" element={<Profile />} />
        </Routes>
      </Navbar>
    </Router>
  );
}

export default App;
