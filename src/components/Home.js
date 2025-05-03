import React from 'react';
import 'bulma/css/bulma.min.css';

const Home = () => {
    return (
        <div className="container">
            <div className="columns is-centered">
                <div className="column is-8">
                    <div className="box">
                        <h1 className="title has-text-centered">Home</h1>
                        <p className="has-text-centered">Welcome to the Home page!</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;