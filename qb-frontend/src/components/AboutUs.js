import React from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';
import './AboutUs.css';
import Navbar from "./Navbar";
import Footer from "./Footer";

function AboutUs() {
    return (
        <div>
            <Navbar />
        <MDBContainer className='about-us-container'>
            <MDBRow>
                <MDBCol>
                    <h1>About Us</h1>
                    <p className='sub-header'>Welcome to QuantumBuy, the next-generation bulk buying platform that is revolutionizing the way people shop. Our mission is to help savvy shoppers like you to save money by purchasing goods together at a lower cost, while also providing a seamless, futuristic shopping experience.

                        At QuantumBuy, we believe that buying in bulk shouldn't be a hassle. That's why we have created a state-of-the-art platform that leverages the power of technology to make the process effortless and enjoyable. With just a few clicks, you can join a group of like-minded shoppers, browse our selection of high-quality products, and place your order at a discounted price.

                        We know that your time is valuable, which is why we have designed QuantumBuy to be user-friendly and intuitive. Whether you are a seasoned bulk buyer or a first-time user, you will find our platform easy to navigate and use. And with our advanced algorithms and data analysis, we can provide you with personalized recommendations and insights to help you make informed purchasing decisions.

                        Our team is dedicated to providing you with the best possible shopping experience. If you have any questions or concerns, our friendly customer support team is always here to help. And if you ever need to return a product, our hassle-free return policy makes the process simple and stress-free.

                        Thank you for choosing QuantumBuy as your go-to bulk buying platform. We are excited to help you save money and discover new products, all while enjoying a futuristic, effortless shopping experience.</p>
                </MDBCol>
            </MDBRow>
            <MDBRow>
                <MDBCol>
                    <h2>Our Mission</h2>
                    <p>
                        Our mission at QuantumBuy is to provide a seamless and futuristic bulk buying experience that helps savvy shoppers save money by purchasing goods together at a lower cost.
                    </p>
                </MDBCol>
            </MDBRow>
            <MDBRow>
                <MDBCol>
                    <h2>Our Members</h2>
                    <MDBRow>
                        <MDBCol md='4'>
                            <div className='team-member'>
                                <MDBIcon icon='user-tie' className='team-member-icon' />
                                <h3 className='name'>Buyers</h3>
                                <p className='position'>No. :</p>
                            </div>
                        </MDBCol>
                        <MDBCol md='4'>
                            <div className='team-member'>
                                <MDBIcon icon='user-graduate' className='team-member-icon' />
                                <h3 className='name'>Sellers :</h3>
                                <p className='position'>No. :</p>
                            </div>
                        </MDBCol>
                        <MDBCol md='4'>
                            <div className='team-member'>
                                <MDBIcon icon='user' className='team-member-icon' />
                                <h3 className='name'>Closed Transactions</h3>
                                <p className='position'>No. :</p>
                            </div>
                        </MDBCol>
                    </MDBRow>
                </MDBCol>
            </MDBRow>
            <MDBRow>
                <MDBCol>
                    <h2>Our Values</h2>
                    <MDBRow>
                        <MDBCol md='4'>
                            <div className='value'>
                                <h3>Customer Focus</h3>
                                <p>We always put our customers first, and strive to exceed their expectations.</p>
                            </div>
                        </MDBCol>
                        <MDBCol md='4'>
                            <div className='value'>
                                <h3>Innovation</h3>
                                <p>We are constantly exploring new ways to improve and innovate.</p>
                            </div>
                        </MDBCol>
                        <MDBCol md='4'>
                            <div className='value'>
                                <h3>Integrity</h3>
                                <p>We always act with integrity and treat our customers and team members with respect.</p>
                            </div>
                        </MDBCol>
                    </MDBRow>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
            <Footer />
        </div>
    );
}

export default AboutUs;
