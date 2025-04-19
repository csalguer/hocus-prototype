import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';
import { MantineProvider } from '@mantine/core';
import App from './App.tsx';
import '@mantine/core/styles.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MantineProvider>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </MantineProvider>
  </StrictMode>
);
