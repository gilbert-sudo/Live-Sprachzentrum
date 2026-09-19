import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { closeAuthModal, fetchUserProfile } from './store/authSlice';
import AuthModal from './components/AuthModal';

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

// Admin pages
import AdminDashboard from './pages/AdminDashboard';
import StudentManagement from './pages/StudentManagement';
import TeacherManagement from './pages/TeacherManagement';
import AdminManagement from './pages/AdminManagement';

import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const dispatch = useDispatch();
  const { isAuthModalOpen, isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchUserProfile());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
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

                {/* Admin Routes */}
                <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
                <Route path="/admin/students" element={<ProtectedRoute><StudentManagement /></ProtectedRoute>} />
                <Route path="/admin/teachers" element={<ProtectedRoute><TeacherManagement /></ProtectedRoute>} />
                <Route path="/admin/admins" element={<ProtectedRoute><AdminManagement /></ProtectedRoute>} />
                
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Navbar>
          } />
        </Routes>
      </Router>
      <AuthModal isOpen={isAuthModalOpen} onClose={() => dispatch(closeAuthModal())} />
    </>
  );
}

export default App;
