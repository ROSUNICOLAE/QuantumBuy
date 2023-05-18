import React, { useState, useEffect } from 'react';
import { MDBBtn, MDBCard, MDBCardBody, MDBCardText, MDBInput } from 'mdb-react-ui-kit';
import Navbar from './Navbar';
import Footer from './Footer';
import jwt_decode from 'jwt-decode';

function Sell() {
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedDocumentation, setSelectedDocumentation] = useState(null);
    const [fileErrorMessage, setFileErrorMessage] = useState('');
    const [showInfoPopup, setShowInfoPopup] = useState(false);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [isSeller, setIsSeller] = useState(false);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setSelectedImage(file);
    };

    const handleDocumentationChange = (e) => {
        const file = e.target.files[0];
        setSelectedDocumentation(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('productName', e.target.productName.value);
        formData.append('price', e.target.price.value);
        formData.append('quantity', e.target.quantity.value);
        formData.append('vendorName', e.target.vendorName.value);
        formData.append('productDescription', e.target.productDescription.value);
        formData.append('name', e.target.name.value);
        formData.append('email', e.target.email.value);
        formData.append('additionalNotes', e.target.additionalNotes.value);

        if (selectedImage) {
            formData.append('productImage', selectedImage);
        }

        if (selectedDocumentation) {
            formData.append('documentation', selectedDocumentation);
        }

        try {
            const response = await fetch('http://localhost:8080/api/sellproducts/create', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                body: formData,
            });

            if (response.ok) {
                // Handle successful form submission
            } else {
                // Handle form submission error
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken = jwt_decode(token);
            setUsername(decodedToken.sub);
            setIsSeller(decodedToken.role === 'SELLER');
        } else {
            setUsername('');
            setIsSeller(false);
        }
    }, []);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/auth/user?username=${username}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setEmail(data.email);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        if (username) {
            fetchUserData();
        }
    }, [username]);

    return (
        <div>
            <Navbar />
            <div className="container">
                <h1>Quantum Sell</h1>
                <p>
                    Welcome to the Sell Request Form. Use this form to submit your sell request for a product. Please provide the necessary
                    information below to initiate the process.
                </p>
                <button className="btn btn-primary mb-3" onClick={() => setShowInfoPopup(true)}>
                    Show Info
                </button>
                {isSeller ? (
                    <form onSubmit={handleSubmit}>
                        <MDBCard>
                            <MDBCardBody>
                                <MDBCardText>Product Information</MDBCardText>
                                <MDBInput type="text" label="Product Name" name="productName" required className="mb-3" />
                                <MDBInput type="number" label="Price" name="price" required className="mb-3" />
                                <MDBInput type="number" label="Quantity" name="quantity" required className="mb-3" />
                                <MDBInput type="text" label="Vendor Name" name="vendorName" required className="mb-3" />
                                <MDBInput type="textarea" label="Product Description" name="productDescription" required className="mb-3" />

                                <MDBCardText>Contact Information</MDBCardText>
                                <MDBInput type="text" label="Name" name="name" value={username} readOnly required className="mb-3" />
                                <MDBInput type="email" label="Email" name="email" value={email} readOnly required className="mb-3" />

                                <MDBCardText>Upload Image (Optional)</MDBCardText>
                                <div className="input-group mb-3">
                                    <input type="file" className="form-control" onChange={handleImageChange} />
                                    <label className="input-group-text">{selectedImage ? selectedImage.name : 'Choose file'}</label>
                                </div>
                                {fileErrorMessage && <div className="alert alert-danger">{fileErrorMessage}</div>}

                                <MDBCardText>Upload Technical Documentation (PDF) (Optional)</MDBCardText>
                                <div className="input-group mb-3" style={{ maxHeight: '200px', overflowY: 'auto' }}>
                                    <input
                                        type="file"
                                        className="form-control"
                                        accept=".pdf"
                                        onChange={handleDocumentationChange}
                                    />
                                    <label className="input-group-text">
                                        {selectedDocumentation ? selectedDocumentation.name : 'Choose file'}
                                    </label>
                                </div>
                                {fileErrorMessage && <div className="alert alert-danger">{fileErrorMessage}</div>}

                                <MDBCardText>Additional Information</MDBCardText>
                                <MDBInput type="textarea" label="Additional Notes" name="additionalNotes" required className="mb-3" />

                                <MDBBtn type="submit" color="primary">
                                    Submit Sell Request
                                </MDBBtn>
                            </MDBCardBody>
                        </MDBCard>
                    </form>
                ) : (
                    <div className="alert alert-danger" role="alert">
                        You do not have the required role to submit a sell request.
                    </div>
                )}
            </div>
            <Footer />

            {showInfoPopup && (
                <div className="position-fixed top-0 start-50 translate-middle-x mt-3">
                    <div className="alert alert-info alert-dismissible fade show" role="alert">
                        <div className="info-popup-text" style={{ fontSize: '2rem', maxHeight: '400px', overflowY: 'auto' }}>
                            The "Quantum Sell" page allows users to submit sell requests for products through QuantumBuy. It provides a platform
                            where users can specify the product they want to sell and relevant information to initiate the selling process.
                            <br />
                            <br />
                            On this page, users are presented with a form to enter details about their sell request. They should provide
                            information such as the product name, price, quantity, and any specific details or specifications about the
                            product.
                            <br />
                            <br />
                            To facilitate communication and ensure accurate matching, users are required to provide their contact information,
                            including their name and email address.
                            <br />
                            <br />
                            Once all the necessary information is provided, users can submit their sell request by clicking the "Submit Sell
                            Request" button.
                            <br />
                            <br />
                            The "Submit Your Sell Request" page aims to streamline the process of selling products through QuantumBuy. It offers
                            a user-friendly interface where users can express their selling offerings and connect with potential buyers.
                        </div>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="alert"
                            aria-label="Close"
                            onClick={() => setShowInfoPopup(false)}
                        ></button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Sell;
