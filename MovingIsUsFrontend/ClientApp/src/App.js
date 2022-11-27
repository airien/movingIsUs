import React, { Component } from 'react';
import AppRoutes from './AppRoutes';
import { Route, Routes } from 'react-router-dom';
import { createHashHistory } from "history"
import { Layout } from './components/Layout';
import { AuthProvider } from './context/auth.context';
import { ProtectedRoute } from "./ProtectedRoute";
import './custom.css';
import { theme } from './theme'
import { ThemeProvider } from '@mui/material/styles';
import { RequireAuth } from './RequireAuth'

export const history = createHashHistory();
let user = localStorage.getItem("user");
user = JSON.parse(user);
export default function App() {
    return (
      <ThemeProvider theme={theme}>
        <AuthProvider userData={user}>
          <Layout>
            <Routes>
              {AppRoutes.map((route, index) => {
                const { element, ...rest } = route;
                  return (
                    <Route key={index} {...rest} element={element} />
                  )
              })}
            </Routes>
          </Layout>
        </AuthProvider>
      </ThemeProvider>
    );
}
