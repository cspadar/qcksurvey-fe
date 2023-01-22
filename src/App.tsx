import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import Navbar from './components/navbar/Navbar';
import theme from './config/chakra';
import { UserContextProvider } from './context/UserContext';
import { Route, Routes } from "react-router-dom"
import LoginPage from './pages/Login';

export default function App() {
  return (
    <ChakraProvider theme={theme}>
      <UserContextProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<></>} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </UserContextProvider>
    </ChakraProvider>
  )
}