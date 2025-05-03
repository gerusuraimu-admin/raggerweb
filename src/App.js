import React from 'react';
import './App.css';
import LoginForm from './components/LoginForm';

function App() {
    return (
        <div className="App">
            <section className="section" style={{ 
                minHeight: '100vh', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center' 
            }}>
                <LoginForm/>
            </section>
        </div>
    );
}

export default App;
