import React, {useState} from 'react';
import 'bulma/css/bulma.min.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faUser, faLock} from '@fortawesome/free-solid-svg-icons';

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Login attempt with:', {username, password});
        // Here you would typically handle authentication
    };

    return (
        <div className="container">
            <div className="columns is-centered">
                <div className="column is-5-tablet is-4-desktop is-3-widescreen">
                    <div className="box">
                        <h1 className="title has-text-centered">Login</h1>
                        <form onSubmit={handleSubmit}>
                            <div className="field">
                                <label className="label">Username</label>
                                <div className="control has-icons-left">
                                    <input
                                        className="input"
                                        type="text"
                                        placeholder="e.g. johndoe"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        required
                                    />
                                    <span className="icon is-small is-left">
                    <FontAwesomeIcon icon={faUser}/>
                  </span>
                                </div>
                            </div>

                            <div className="field">
                                <label className="label">Password</label>
                                <div className="control has-icons-left">
                                    <input
                                        className="input"
                                        type="password"
                                        placeholder="********"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                    <span className="icon is-small is-left">
                    <FontAwesomeIcon icon={faLock}/>
                  </span>
                                </div>
                            </div>

                            <div className="field">
                                <div className="control">
                                    <label className="checkbox">
                                        <input type="checkbox"/>
                                        {' Remember me'}
                                    </label>
                                </div>
                            </div>

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

export default LoginForm;