import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css';
import LoginForm from './components/LoginForm';
import Home from './components/Home';
import ProtectedRoute from './components/ProtectedRoute';
import TokenManager from './components/TokenManager';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginForm/>}/>
                <Route path="/home" element={
                    <ProtectedRoute><Home/></ProtectedRoute>
                }/>
                <Route path="/manage" element={
                    <ProtectedRoute><TokenManager/></ProtectedRoute>
                }/>
            </Routes>
        </Router>
    );
}

export default App;
