import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { closeAuthModal, closeWaitlistModal, fetchUserProfile } from './store/authSlice';
import AuthModal from './components/AuthModal';
import WaitlistModal from './components/WaitlistModal';

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
import LandingPage from './pages/LandingPage';
import PendingValidation from './pages/PendingValidation';

// Admin pages
import AdminDashboard from './pages/AdminDashboard';
import StudentManagement from './pages/StudentManagement';
import TeacherManagement from './pages/TeacherManagement';
import AdminManagement from './pages/AdminManagement';



import Lenis from 'lenis';

function App() {
  const dispatch = useDispatch();
  const { isAuthModalOpen, isWaitlistModalOpen, isAuthenticated, user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchUserProfile());
    }
  }, [isAuthenticated, dispatch]);

  // Initialize smooth scrolling with Lenis
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <Router>
          <Routes>
          {/* Landing Page */}
          <Route path="/" element={!isAuthenticated ? <LandingPage /> : <Navigate to="/dashboard" replace />} />
          
          {/* Authenticated Routes */}
          {isAuthenticated ? (
            user?.status === 'pending' ? (
              <Route path="*" element={<PendingValidation />} />
            ) : (
            <>
              <Route path="/room/:roomId" element={<LiveClassroom />} />
              <Route path="*" element={
                <Navbar>
                  <Routes>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/bibliothek" element={<Bibliothek />} />
                    <Route path="/karriere" element={<Karriere />} />
                    <Route path="/campus" element={<VirtualSchool />} />
                    <Route path="/simulator" element={<Prufungssimulator />} />
                    <Route path="/uebung" element={<Uebung />} />
                    <Route path="/stammtisch" element={<Stammtisch />} />
                    <Route path="/profil" element={<Profile />} />

                    {/* Admin Routes */}
                    <Route path="/admin" element={<AdminDashboard />} />
                    <Route path="/admin/students" element={<StudentManagement />} />
                    <Route path="/admin/teachers" element={<TeacherManagement />} />
                    <Route path="/admin/admins" element={<AdminManagement />} />
                    
                    <Route path="*" element={<Navigate to="/dashboard" replace />} />
                  </Routes>
                </Navbar>
              } />
            </>
            )
          ) : (
            <Route path="*" element={<Navigate to="/" replace />} />
          )}
        </Routes>
      </Router>
      <AuthModal isOpen={isAuthModalOpen} onClose={() => dispatch(closeAuthModal())} />
      <WaitlistModal isOpen={isWaitlistModalOpen} onClose={() => dispatch(closeWaitlistModal())} />
    </>
  );
}

export default App;
