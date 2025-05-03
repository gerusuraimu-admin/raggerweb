import React, {useState} from 'react';
import 'bulma/css/bulma.min.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faUser, faLock} from '@fortawesome/free-solid-svg-icons';

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would typically handle authentication
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
                                <button className="button is-primary is-fullwidth" type="submit">
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
