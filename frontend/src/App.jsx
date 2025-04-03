import {Route, Routes , useNavigate}from 'react-router';
import React, { useEffect } from 'react'
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import NotFound from "./pages/NotFound";
import ForgetPassword from './pages/ForgetPassword';
import ResetPassword from './pages/ResetPassword';
import EmailVerification from "./pages/EmailVerification";
import './index.css'

import CicrleShape from './components/FloatlingShape';
import Preloader from './components/loading';

import toast, { Toaster } from 'react-hot-toast'
import {useAuthStore} from '.././store/authStore';

// Protcet routes require authenticated 
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    } else if (!user?.isVerified) {
      navigate('/verify-email');
    }
  }, [isAuthenticated, user, navigate]);

  if (!isAuthenticated || !user?.isVerified) {
    return null; // Optionally, show a loading spinner or placeholder
  }

  return children;
};
// Redirect authenticated users to home page
const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && user?.isVerified) {
      navigate('/'); 
    }
  }, [isAuthenticated, user, navigate]);
  return children;
};

function App() {


  const { checkAuth ,isCheckingAuth} = useAuthStore();
  useEffect(() => {
    checkAuth();
  }, [checkAuth ]);
  
  if (isCheckingAuth) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900">
        <Preloader />
      </div>
    );
  }


  return (
    <div className=" h-screen bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900 flex
    items-center justify-center font-audiowide"
>
      <CicrleShape color='bg-green-500' size='w-50 h-50'  top='-5%' left='10%'/>
      <CicrleShape color='bg-green-500' size='w-32 h-32'  top='50%' left='30%'/>


    <Routes>
      <Route path="/" element={<ProtectedRoute>
        <Home />
      </ProtectedRoute>} />
      <Route path="/signup" element={<RedirectAuthenticatedUser>
        <SignUp />
      </RedirectAuthenticatedUser>} />
      <Route path="/login" element={<RedirectAuthenticatedUser>
        <Login />
      </RedirectAuthenticatedUser>}  />
      <Route path="/verify-email" element={<EmailVerification />} />
      <Route path="/forgot-password" element={<RedirectAuthenticatedUser>
        <ForgetPassword />
      </RedirectAuthenticatedUser>} />
      <Route path="/reset-password/:token" element={<RedirectAuthenticatedUser>
        <ResetPassword  />
      </RedirectAuthenticatedUser>} />
      <Route path="*" element={<NotFound />} />
    </Routes>
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          className: '',
          duration: 2000,
          style: {
            background: '#122f2c',
            color: '#fff',
          },
        }}
      />
    </div>
  )
}

export default App
