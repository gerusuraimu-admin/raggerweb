import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import 'bulma/css/bulma.min.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faUser, faLock} from '@fortawesome/free-solid-svg-icons';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

const LoginForm = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        signInWithEmailAndPassword(auth, username, password)
            .then(() => {
                navigate('/home');
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log('Login error:', errorCode, errorMessage);

                if (errorCode === 'auth/invalid-credential') {
                    setError('Invalid email or password. Please try again.');
                } else if (errorCode === 'auth/user-not-found') {
                    setError('No account found with this email. Please check your email or sign up.');
                } else if (errorCode === 'auth/too-many-requests') {
                    setError('Too many failed login attempts. Please try again later.');
                } else {
                    setError('An error occurred during login. Please try again.');
                }
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <div className="container">
            <div className="columns is-centered">
                <div className="column is-5-tablet is-4-desktop is-3-widescreen">
                    <div className="box">
                        <h1 className="title has-text-centered">Login</h1>
                        <form onSubmit={handleSubmit}>
                            <InputBox 
                                label="Email"
                                type="email"
                                placeholder="address@example.com"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                icon={faUser}
                                required={true}
                            />

                            <InputBox 
                                label="Password"
                                type="password"
                                placeholder="********"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                icon={faLock}
                                required={true}
                            />

                            {error && (
                                <div className="notification is-danger is-light">
                                    <p>{error}</p>
                                </div>
                            )}

                            <div className="field">
                                <button 
                                    className={`button is-primary is-fullwidth ${loading ? 'is-loading' : ''}`} 
                                    type="submit" 
                                    disabled={loading}
                                >
                                    Login
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

function InputBox({ label, type, placeholder, value, onChange, icon, required }) {
    return (
        <div className="field">
            <label className="label">{label}</label>
            <div className="control has-icons-left">
                <input
                    className="input"
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    required={required}
                />
                <span className="icon is-small is-left">
                    <FontAwesomeIcon icon={icon}/>
                </span>
            </div>
        </div>
    );
};

export default LoginForm;
