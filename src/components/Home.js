import React from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import 'bulma/css/bulma.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const Home = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await signOut(auth);
            console.log('User signed out successfully');
            navigate('/');
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    return (
        <div className="container">
            <div className="columns is-centered">
                <div className="column is-8">
                    <div className="box">
                        <h1 className="title has-text-centered">Home</h1>
                        <p className="has-text-centered">Welcome to the Home page!</p>

                        <div className="has-text-centered mt-5">
                            <button 
                                className="button is-danger" 
                                onClick={handleLogout}
                            >
                                <span className="icon">
                                    <FontAwesomeIcon icon={faSignOutAlt} />
                                </span>
                                <span>Logout</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
