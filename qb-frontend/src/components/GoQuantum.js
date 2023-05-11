import React from 'react';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText,MDBBtn } from 'mdb-react-ui-kit';
import Footer from "./Footer";
import Navbar from "./Navbar";
import {Link} from "react-router-dom";

function GoQuantum() {
    return (
        <div>
        <Navbar />
            <div className="home-page">
                <h1>Welcome to QuantumBuy</h1>
                <p>At QuantumBuy, we're all about making bulk buying and selling easy and affordable. Join us and start saving today!</p>
                <div className="row">
                    <div className="col-md-6 col-lg-6">
                        <MDBCard style={{
                            backgroundImage: `url(${require('./pictures/buypic.jpg')})`,
                            backgroundSize: 'cover',
                            height: '250%'
                        }}>
                            <MDBCardBody className="text-center">
                                <Link to="/Buy">
                                    <MDBBtn color="primary" size="lg">Q - Buy</MDBBtn>
                                </Link>
                                <MDBCardText className='mt-3' style={{ color: '#fff' }}><h3>Start buying now</h3></MDBCardText>
                                <MDBCardText className='mt-3' style={{ color: '#fff' }}><h4>Our selection of products are carefully curated and sourced from the best suppliers.</h4></MDBCardText>
                            </MDBCardBody>
                        </MDBCard>
                    </div>
                    <div className="col-md-6 col-lg-6">
                        <MDBCard style={{
                            backgroundImage: `url(${require('./pictures/sellpic.jpg')})`,
                            backgroundSize: 'cover',
                            height: '250%'
                        }}>
                            <MDBCardBody className="text-center">
                                <Link to="/Sell">
                                    <MDBBtn color="primary" size="lg">Q - Sell</MDBBtn>
                                </Link>
                                <MDBCardText className='mt-3' style={{ color: '#fff' }}><h3>Start Selling Now</h3></MDBCardText>
                                <MDBCardText className='mt-3' style={{ color: '#fff' }}><h4>By selling in bulk, we're able to help you reach a wider audience and increase your profits.</h4></MDBCardText>
                            </MDBCardBody>
                        </MDBCard>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default GoQuantum;
