import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import Navbar from './components/navbar/Navbar';
import theme from './config/chakra';
import { UserContextProvider } from './context/UserContext';
import { Route, Router, Routes } from "react-router-dom"
import LoginPage from './pages/Login';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import MySurveysPage from './pages/MySurveys';
import SurveyEdit from './pages/SurveyEdit';

const queryClient = new QueryClient();

export default function App() {
  return (
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <UserContextProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<></>} />
            <Route path="login" element={<LoginPage />} />

            <Route path="survey" element={<MySurveysPage />} />
            <Route path="survey/edit" element={<SurveyEdit />} />
            <Route path="survey/edit/:id" element={<SurveyEdit />} />

          </Routes>
        </UserContextProvider>
      </QueryClientProvider>
    </ChakraProvider>
  )
}