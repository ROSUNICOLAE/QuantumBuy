import React, { useState } from 'react';
import { MDBBtn, MDBCard, MDBCardBody, MDBCardText, MDBInput } from 'mdb-react-ui-kit';
import Navbar from './Navbar';
import Footer from './Footer';

function Buy() {
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedDocumentation, setSelectedDocumentation] = useState(null);
    const [fileErrorMessage, setFileErrorMessage] = useState('');
    const [showInfoPopup, setShowInfoPopup] = useState(false);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        // Validate file format
        const allowedFormats = ['image/jpeg', 'image/png', 'image/gif'];
        if (file && !allowedFormats.includes(file.type)) {
            setFileErrorMessage('Please choose a valid image format (JPEG, PNG, GIF).');
        } else {
            setFileErrorMessage('');
            setSelectedImage(file);
        }
    };

    const handleDocumentationChange = (e) => {
        const file = e.target.files[0];
        // Validate file format
        if (file && file.type !== 'application/pdf') {
            setFileErrorMessage('Please choose a valid PDF file.');
        } else {
            setFileErrorMessage('');
            setSelectedDocumentation(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        // You can access form input values using the event.target elements
    };

    return (
        <div>
            <Navbar/>
            <div className="container">
                <h1>Quantum Buy</h1>
                <p>Welcome to the Buy Request Form. Use this form to submit your buy request for a product. Please
                    provide the necessary information below to initiate the process.</p>
                <button className="btn btn-primary mb-3" onClick={() => setShowInfoPopup(true)}>
                    Show Info
                </button>
                <form onSubmit={handleSubmit}>
                    <div style={{ maxHeight: '700px', overflowY: 'scroll' }}>
                        <MDBCard>
                            <MDBCardBody>
                                <MDBCardText>Product Information</MDBCardText>
                                <MDBInput type="text" label="Product Name" required className="mb-3" />
                                <MDBInput type="number" label="Price" required className="mb-3" />
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
                                    Publish Buy Request
                                </MDBBtn>
                            </MDBCardBody>
                        </MDBCard>
                    </div>
                </form>
            </div>
            <Footer />
            {/* Info Popup */}
            {showInfoPopup && (
                <div className="position-fixed top-0 start-50 translate-middle-x mt-3">
                    <div className="alert alert-info alert-dismissible fade show" role="alert">
                        <div className="info-popup-text" style={{ fontSize: '2rem', maxHeight: '400px', overflowY: 'auto' }}>
                            The "Quantum Buy" page allows users to submit buy requests for products through QuantumBuy. It provides a platform where users can specify their desired product and relevant information to initiate the buying process.

                            On this page, users are presented with a form to enter details about their buy request. They should provide information such as the product name, desired quantity, price range, and any specific requirements or preferences they may have.

                            To facilitate communication and ensure accurate matching, users are required to provide their contact information, including their name and email address.

                            Once all the necessary information is provided, users can submit their buy request by clicking the "Submit Buy Request" button.

                            The "Submit Your Buy Request" page aims to streamline the process of finding and acquiring desired products for users. It offers a user-friendly interface where users can express their buying needs and connect with sellers through QuantumBuy.
                        </div>

                        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={() => setShowInfoPopup(false)}></button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Buy;

