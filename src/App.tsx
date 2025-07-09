import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './homePage';
import UserManagement from './userManagement';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/userManagement" element={<UserManagement />} />
      </Routes>
    </BrowserRouter>
  );
}
