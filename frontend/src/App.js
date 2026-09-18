import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Karriere from './pages/Karriere';
import Prufungssimulator from './pages/Prufungssimulator';
import Uebung from './pages/Uebung';
import Profile from './pages/Profile';
import Stammtisch from './pages/Stammtisch';
import Bibliothek from './pages/Bibliothek';

// New Virtual School pages
import LiveClassroom from './pages/LiveClassroom';
import VirtualSchool from './pages/VirtualSchool';

// Auth Components
import { AuthProvider } from './context/AuthContext';
import { LibraryProvider } from './context/LibraryContext';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <LibraryProvider>
        <Router>
          <Routes>
          {/* Full screen routes without Navbar */}
          <Route path="/room/:roomId" element={
            <ProtectedRoute>
              <LiveClassroom />
            </ProtectedRoute>
          } />
          
          {/* Routes with Navbar */}
          <Route path="*" element={
            <Navbar>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/bibliothek" element={<Bibliothek />} />
                <Route path="/karriere" element={<Karriere />} />
                
                {/* Protected Routes */}
                <Route path="/campus" element={<ProtectedRoute><VirtualSchool /></ProtectedRoute>} />
                <Route path="/simulator" element={<ProtectedRoute><Prufungssimulator /></ProtectedRoute>} />
                <Route path="/uebung" element={<ProtectedRoute><Uebung /></ProtectedRoute>} />
                <Route path="/stammtisch" element={<ProtectedRoute><Stammtisch /></ProtectedRoute>} />
                <Route path="/profil" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Navbar>
          } />
        </Routes>
        </Router>
      </LibraryProvider>
    </AuthProvider>
  );
}

export default App;
