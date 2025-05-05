import React, {useEffect, useState} from 'react';
import {Navigate} from 'react-router-dom';
import {onAuthStateChanged} from 'firebase/auth';
import {auth} from '../firebase';
import './CommonStyle.css'

const ProtectedRoute = ({children}) => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    if (loading) {
        return (
            <div className="base">
                <div className="base-contents">
                    <p>Loading...</p>
                </div>
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/"/>;
    }

    return children;
};

export default ProtectedRoute;