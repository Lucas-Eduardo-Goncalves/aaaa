import React from "react";
import { Provider } from "react-redux";
import { CookiesProvider } from "react-cookie";
import { BrowserRouter } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import { LenguageProvider } from "./context/LenguageContext"; 

import { Routes } from "./routes";
import store from "./redux/store";

import { ThemeProvider } from "styled-components";

import config from "./config/config";
import "./static/css/style.css";
const { theme } = config;

const AppComponent = () => {
  return (
    <BrowserRouter>
      <CookiesProvider>
        <AuthProvider>
          <LenguageProvider>
            <ThemeProvider theme={{ ...theme }}>
              <Routes /> 
            </ThemeProvider>
          </LenguageProvider>
        </AuthProvider>
      </CookiesProvider>
    </BrowserRouter>
  );
};

export function App() {
  return (
    <Provider store={store}>
      <AppComponent />
    </Provider>
  );
}
