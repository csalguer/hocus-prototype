import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box, ChakraProvider } from '@chakra-ui/react';
import { createTheme, MantineProvider } from "@mantine/core";
import { motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Landing from './components/Landing';
import Dashboard from './components/Dashboard';
import Dictionary from './components/Dictionary';
import LessonView from './components/LessonView';
import Practice from './components/Practice';
import Profile from './components/Profile';
import DarkModeButton from './components/DarkModeButton';

const MotionBox = motion(Box);

function App() {
  const theme = createTheme();
  
  return (
    <MantineProvider theme={theme}>
      <ChakraProvider>
        <Router>
          <MotionBox
            minH="100vh"
            bg="gray.50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Navbar />
            <Box as="main" py={8} px={4}>
              <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/dictionary" element={<Dictionary />} />
                <Route path="/lesson/:id" element={<LessonView />} />
                <Route path="/practice" element={<Practice />} />
                <Route path="/profile" element={<Profile />} />
              </Routes>
            </Box>
            <Box 
              as="footer" 
              py={6} 
              borderTop="1px" 
              borderColor="gray.200" 
              bg="white"
            >
              <Box maxW="container.xl" mx="auto" px={4}>
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <div className="text-purple-600">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M22 19V3H2v16h20z" />
                        <path d="M2 7h20" />
                        <path d="M18 3v4" />
                        <path d="M22 19H2" />
                      </svg>
                    </div>
                    <span className="text-gray-600">VietLearn AI</span>
                  </div>
                  <span className="text-sm text-gray-500">© 2024 VietLearn AI. All rights reserved.</span>
                </motion.div>
              </Box>
            </Box>
          </MotionBox>
        </Router>
        <DarkModeButton />
      </ChakraProvider>
    </MantineProvider>
  );
}

export default App;
