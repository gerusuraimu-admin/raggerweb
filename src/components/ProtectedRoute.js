import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';

const ProtectedRoute = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, []);

    if (loading) {
        // You could render a loading spinner here
        return (
            <div className="container">
                <div className="columns is-centered">
                    <div className="column is-8">
                        <div className="box">
                            <p className="has-text-centered">Loading...</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (!user) {
        // Redirect to login page if not authenticated
        return <Navigate to="/" />;
    }

    // If authenticated, render the protected component
    return children;
};

export default ProtectedRoute;