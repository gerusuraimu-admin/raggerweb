import React, {useState} from 'react';
import 'bulma/css/bulma.min.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faUser, faLock} from '@fortawesome/free-solid-svg-icons';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        // Send login request to Firebase Authentication
        signInWithEmailAndPassword(auth, username, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log('Login successful:', user);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log('Login error:', errorCode, errorMessage);
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
