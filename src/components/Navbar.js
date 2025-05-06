import {signOut} from "firebase/auth";
import {auth} from "../firebase";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSignOutAlt} from "@fortawesome/free-solid-svg-icons";
import React from "react";
import {useNavigate} from "react-router-dom";

function Navbar() {
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
        <nav className="navbar" role="navigation" aria-label="main navigation">
            <div id="navbarBasicExample" className="navbar-menu">
                <div className="navbar-start">
                    <a href="/home" className="navbar-item">Home</a>
                    <a href="/manage" className="navbar-item">Manage</a>
                    <a href="/document" className="navbar-item">Document</a>
                </div>

                <div className="navbar-end">
                    <div className="navbar-item">
                        <div className="buttons">
                            <button onClick={handleLogout} className="button is-danger">
                                <span className="icon"><FontAwesomeIcon icon={faSignOutAlt}/></span>
                                <span>Logout</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;