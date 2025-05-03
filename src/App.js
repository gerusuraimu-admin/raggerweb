import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import LoginForm from './components/LoginForm';
import Home from './components/Home';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
    return (
        <Router>
            <div className="App">
                <section className="section" style={{ 
                    minHeight: '100vh', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center' 
                }}>
                    <Routes>
                        <Route path="/" element={<LoginForm />} />
                        <Route path="/home" element={
                            <ProtectedRoute>
                                <Home />
                            </ProtectedRoute>
                        } />
                    </Routes>
                </section>
            </div>
        </Router>
    );
}

export default App;
