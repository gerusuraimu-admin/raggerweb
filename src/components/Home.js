import React from 'react';
import 'bulma/css/bulma.min.css';
import Navbar from '../components/Navbar';
import "./CommonStyle.css"

const Home = () => {
    return (
        <div className="base">
            <Navbar/>
            <div className="base-contents">
                <h2>Welcome!</h2>
            </div>
        </div>
    );
};

export default Home;
