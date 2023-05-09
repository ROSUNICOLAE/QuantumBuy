import React from 'react';import './App.css';

function AboutUs(){
    return (
        <div className="about-us-page">
            <h1>About Us</h1>
            <div className="message-container">
                {/* Your previous message here */}
            </div>
            <h2>Our Mission</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce auctor tortor at est porta, nec feugiat sapien bibendum. Duis id lacus ac sem viverra feugiat eu eget mi. Integer feugiat sem sed odio blandit, vel lacinia nunc gravida. Nullam vel purus et turpis elementum pharetra. </p>
            <h2>Our Team</h2>
            <p>Meet our team of experts who are dedicated to providing you with the best possible service.</p>
            <ul className="team-members">
                <li>
                    <img src="https://via.placeholder.com/150" alt="John Doe" />
                    <h3 className="name">John Doe</h3>
                    <p className="position">CEO</p>
                </li>
                <li>
                    <img src="https://via.placeholder.com/150" alt="Jane Smith" />
                    <h3 className="name">Jane Smith</h3>
                    <p className="position">COO</p>
                </li>
                <li>
                    <img src="https://via.placeholder.com/150" alt="Bob Johnson" />
                    <h3 className="name">Bob Johnson</h3>
                    <p className="position">CTO</p>
                </li>
            </ul>
        </div>
    );
};

export default AboutUs;
