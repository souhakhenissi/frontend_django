// App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';
import Login from './pages/Login';
import Home from './pages/Home';
import Employee from './pages/Employee'; // Importation de Employee
import AdminDashboard from './pages/Admin';
import AdminDocuments from './pages/adminDocuments';
import AdminWorkflows from './pages/adminWorkflows';
import Manager from './pages/Manager';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/employee" element={<Employee />} />
        <Route path="/admin" element={<AdminDashboard />}/>
        <Route path="/documents" element={<AdminDocuments />}/>
        <Route path="/workflows" element={<AdminWorkflows />} />
        <Route path="/manager" element={<Manager />} />
      </Routes>
    </Router>
  );
};

export default App;
