import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import jwt_decode from 'jwt-decode';

function Buy() {
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedDocumentation, setSelectedDocumentation] = useState(null);
    const [fileErrorMessage, setFileErrorMessage] = useState('');
    const [showInfoPopup, setShowInfoPopup] = useState(false);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [isBuyer, setIsBuyer] = useState(false);

    const handleImageChange = (e) => {
        // Handle image change logic
    };

    const handleDocumentationChange = (e) => {
        // Handle documentation change logic
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Handle form submission logic
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken = jwt_decode(token);
            const role = decodedToken.role;
            console.log('User role:', role);
            setUsername(decodedToken.sub);
            setEmail(decodedToken.email);
            setIsBuyer(role === 'BUYER');
        } else {
            setUsername('');
            setEmail('');
            setIsBuyer(false);
        }
    }, []);

    const renderBuyForm = () => {
        if (!isBuyer) {
            return (
                <div className="alert alert-danger" role="alert">
                    You do not have the required role to submit a buy request.
                </div>
            );
        }

        return (
            <form onSubmit={handleSubmit}>
                {/* Form fields */}
                <button type="submit" className="btn btn-primary">
                    Submit Buy Request
                </button>
            </form>
        );
    };

    return (
        <div>
            <Navbar />
            <div className="container">
                <h1>Quantum Buy</h1>
                <p>
                    Welcome to the Buy Request Form. Use this form to submit your buy request for a product. Please provide the necessary information below
                    to initiate the process.
                </p>
                <button className="btn btn-primary mb-3" onClick={() => setShowInfoPopup(true)}>
                    Show Info
                </button>
                {renderBuyForm()}
            </div>
            <Footer />
            {/* Info Popup */}
            {showInfoPopup && (
                <div className="position-fixed top-0 start-50 translate-middle-x mt-3">
                    <div className="alert alert-info alert-dismissible fade show" role="alert">
                        <div className="info-popup-text" style={{ fontSize: '2rem', maxHeight: '400px', overflowY: 'auto' }}>
                            The "Quantum Buy" page allows users to submit buy requests for products through QuantumBuy. It provides a platform where users can
                            specify their desired product and relevant information to initiate the buying process.
                            <br />
                            <br />
                            On this page, users are presented with a form to enter details about their buy request. They should provide information such as the
                            product name, desired quantity, price range, and any specific requirements or preferences they may have.
                            <br />
                            <br />
                            To facilitate communication and ensure accurate matching, users are required to provide their contact information, including their
                            name and email address.
                            <br />
                            <br />
                            Once all the necessary information is provided, users can submit their buy request by clicking the "Submit Buy Request" button.
                            <br />
                            <br />
                            The "Submit Your Buy Request" page aims to streamline the process of finding and acquiring desired products for users. It offers a
                            user-friendly interface where users can express their buying needs and connect with sellers through QuantumBuy.
                        </div>
                        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={() => setShowInfoPopup(false)}></button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Buy;
