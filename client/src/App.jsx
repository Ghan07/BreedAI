import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AnimatePresence } from 'framer-motion';
import useThemeStore from './stores/themeStore';
import useAuthStore from './stores/authStore';
import AppLayout from './components/layout/AppLayout';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Classify from './pages/Classify';
import History from './pages/History';
import Settings from './pages/Settings';

const App = () => {
  const { init } = useThemeStore();
  const { token, fetchMe } = useAuthStore();

  useEffect(() => { init(); }, [init]);
  useEffect(() => { if (token) fetchMe(); }, [token]);

  return (
    <>
      <Toaster position="top-right" toastOptions={{ duration: 3000, style: { borderRadius: '10px', background: '#333', color: '#fff' } }} />
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/classify" element={<Classify />} />
            <Route path="/history" element={<History />} />
            <Route path="/history/:id" element={<History />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
        </Routes>
      </AnimatePresence>
    </>
  );
};

export default App;
