import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBBtn, MDBInput } from 'mdb-react-ui-kit';
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
        console.log('Token:', token); // Check the token value
        if (token) {
            const decodedToken = jwt_decode(token);
            console.log('Decoded token:', decodedToken); // Check the decoded token object
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
        console.log('isBuyer:', isBuyer); // Add this line
        if (!isBuyer) {
            return (
                <div className="alert alert-danger" role="alert">
                    You do not have the required role to submit a buy request.
                </div>
            );
        }

        return (
            <form onSubmit={handleSubmit}>
                <div style={{ maxHeight: '700px', overflowY: 'scroll' }}>
                    <MDBCard>
                        <MDBCardBody>
                            <MDBCardText>Product Information</MDBCardText>
                            <MDBInput type="text" label="Product Name" required className="mb-3" />
                            <MDBInput type="number" label="Price Range" required className="mb-3" />
                            <MDBInput type="number" label="Quantity" required className="mb-3" />
                            <MDBInput type="text" label="Vendor Name" required className="mb-3" />
                            <MDBInput type="textarea" label="Product Description" required className="mb-3" />

                            <MDBCardText>Contact Information</MDBCardText>
                            <MDBInput type="text" label="Name" required className="mb-3" />
                            <MDBInput type="email" label="Email" required className="mb-3" />

                            <MDBCardText>Upload Image</MDBCardText>
                            <div className="input-group mb-3">
                                <input type="file" className="form-control" required onChange={handleImageChange} />
                                <label className="input-group-text" htmlFor="inputGroupFile01">
                                    {selectedImage ? selectedImage.name : 'Choose file'}
                                </label>
                            </div>
                            {fileErrorMessage && (
                                <div className="alert alert-danger" role="alert">
                                    {fileErrorMessage}
                                </div>
                            )}

                            <MDBCardText>Upload Technical Documentation (PDF)</MDBCardText>
                            <div className="input-group mb-3" style={{ maxHeight: '200px', overflowY: 'auto' }}>
                                <input
                                    type="file"
                                    className="form-control"
                                    required
                                    accept=".pdf"
                                    onChange={handleDocumentationChange}
                                />
                                <label className="input-group-text" htmlFor="inputGroupFile02">
                                    {selectedDocumentation ? selectedDocumentation.name : 'Choose file'}
                                </label>
                            </div>
                            {fileErrorMessage && (
                                <div className="alert alert-danger" role="alert">
                                    {fileErrorMessage}
                                </div>
                            )}

                            <MDBCardText>Additional Information</MDBCardText>
                            <MDBInput type="textarea" label="Additional Notes" required className="mb-3" />

                            <MDBBtn type="submit" color="primary">
                                Submit Buy Request
                            </MDBBtn>
                        </MDBCardBody>
                    </MDBCard>
                </div>
            </form>
        );
    };

    return (
        <>
            <Navbar />
            <div className="container">
                <h1>Quantum Buy</h1>
                <p>
                    Welcome to the Buy Request Form. Use this form to submit your buy request for a product. Please provide the necessary information below to initiate the process.
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
                            The "Quantum Buy" page allows users to submit buy requests for products through QuantumBuy. It provides a platform where users can specify their desired product and relevant information to initiate the buying process.
                            <br />
                            <br />
                            On this page, users are presented with a form to enter details about their buy request. They should provide information such as the product name, price range, quantity, vendor name, and a description of the product.
                            <br />
                            <br />
                            To facilitate communication and ensure accurate matching, users are required to provide their contact information, including their name and email address.
                            <br />
                            <br />
                            Users can also upload an image of the desired product to give sellers a visual representation.
                            <br />
                            <br />
                            If there are any technical specifications or documentation related to the desired product, users can upload a PDF file containing that information.
                            <br />
                            <br />
                            Lastly, users can include any additional notes or relevant information in the designated text area.
                            <br />
                            <br />
                            Once all the necessary information is provided, users can submit their buy request by clicking the "Submit Buy Request" button.
                            <br />
                            <br />
                            The "Quantum Buy" page aims to streamline the process of finding and acquiring desired products for users. It offers a user-friendly interface where users can express their buying needs and connect with sellers through QuantumBuy.
                        </div>
                        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={() => setShowInfoPopup(false)}></button>
                    </div>
                </div>
            )}
        </>
    );
}

export default Buy;
