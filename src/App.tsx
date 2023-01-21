import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import Navbar from './components/Navbar';
import theme from './config/chakra';
import { UserContextProvider } from './context/UserContext';

export default function App() {
  return (
    <ChakraProvider theme={theme}>
      <UserContextProvider>
        <Navbar />
      </UserContextProvider>
    </ChakraProvider>
  )
}