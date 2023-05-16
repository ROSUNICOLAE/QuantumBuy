import React, { useState } from 'react';
import { MDBBtn, MDBCard, MDBCardBody, MDBCardText, MDBInput } from 'mdb-react-ui-kit';
import Navbar from './Navbar';
import Footer from './Footer';

function Sell() {
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
        <>
            <Navbar />
            <div className="container">
                <h1>Quantum Sell</h1>
                <p>
                    Welcome to the Sell Request Form. Use this form to submit your sell request for a product. Please provide
                    the necessary information below to initiate the process.
                </p>
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
                                    Publish Sell Request
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
                            The "Quantum Sell" page allows vendors to sell their products through QuantumBuy. It provides a platform where vendors can showcase their products and reach potential buyers. To start selling, vendors need to complete the form below with the required information.

                            On this page, vendors are presented with a form to enter details about their product. They should provide information such as the product name, price, quantity, and their own vendor name. Additionally, vendors can provide a description of the product, highlighting its features and benefits to attract buyers.

                            To facilitate communication and transactions, vendors are required to provide their contact information, including their name and email address.

                            Vendors can upload an image of the product, which will be displayed to potential buyers. This visual representation helps capture the attention of buyers and provides them with a better understanding of the product being sold.

                            If there are any technical specifications or documentation related to the product, vendors can upload a PDF file containing that information. This allows interested buyers to access detailed documentation before making a purchasing decision.

                            Lastly, vendors can include any additional notes or relevant information in the designated text area.

                            Once all the necessary information is provided, vendors can submit their sell request by clicking the "Publish Sell Request" button.

                            The "Sell Your Product" page is designed to make the selling process straightforward and efficient for vendors. It provides a user-friendly interface where vendors can showcase their products and connect with potential buyers through QuantumBuy.
                        </div>
                        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={() => setShowInfoPopup(false)}></button>
                    </div>
                </div>
            )}

        </>
    );
}

export default Sell;
