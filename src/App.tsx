import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Header } from './components/header';
import { Registration } from './components/registration';
import { Login } from './components/login';
import { Transportations } from './components/transportations';
import { AccessDenied } from './components/acces-denied';
import { Countries } from './components/countries';
import { Areas } from './components/areas';
import { Localities } from './components/localities';
import { Users } from './components/users';
import { Logout } from './components/logout';
import { Counterpartes } from './components/counterpartes';

// window.addEventListener("beforeunload", () => {
//   localStorage.clear();
// });

function App() {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/counterpartes" element={<Counterpartes />} />
        // counterpartes
        <Route path="/access-denied" element={<AccessDenied />} />
        <Route path="/transportations" element={<Transportations />} />
        <Route path="/countries" element={<Countries />} />
        <Route path="/areas" element={<Areas />} />
        <Route path="/localities" element={<Localities />} />
        <Route path="/users" element={<Users />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;
