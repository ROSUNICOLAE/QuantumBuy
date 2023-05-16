import React from 'react';
import { MDBFooter, MDBContainer, MDBRow, MDBCol } from 'mdb-react-ui-kit';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import { FaHome, FaEnvelope } from 'react-icons/fa';


function Footer() {
    return (
        <MDBFooter bgColor='light' className='text-center text-lg-start text-muted fixed-bottom' >
            <section>
                <MDBContainer className='text-center text-md-start mt-5'>
                    <MDBRow className='mt-sm-1'style={{ height: '20%' }}>
                        <MDBCol md='2' lg='2' xl='2' className='mx-auto mb-4' >
                            <h6 className='text-uppercase fw-bold mb-4'>Products</h6>
                            <p>
                                <a href='#!' className='text-reset'>
                                    Quantum Buy
                                </a>
                            </p>
                            <p>
                                <a href='#!' className='text-reset'>
                                    Quantum Sell
                                </a>
                            </p>
                        </MDBCol>
                        <MDBCol md='3' lg='2' xl='2' className='mx-auto mb-4'>
                            <h6 className='text-uppercase fw-bold mb-4'>Useful links</h6>
                            <p>
                                <a href='#!' className='text-reset'>
                                    Latest sellers
                                </a>
                            </p>
                            <p>
                                <a href='#!' className='text-reset'>
                                    Latest buyers
                                </a>
                            </p>
                        </MDBCol>
                        <MDBCol md='4' lg='3' xl='3' className='mx-auto mb-md-0 mb-4'>
                            <h6 className='text-uppercase fw-bold mb-4'>Contact</h6>
                            <p>
                                <FaHome color='secondary' icon='home' className='me-2'/>
                                Bucharest, 000000, Romania
                            </p>
                            <p>
                                <FaEnvelope color='secondary' icon='envelope' className='me-3'/>
                                info@example.com
                            </p>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </section>
            <div className='text-center p-4' style={{backgroundColor: 'rgba(0, 0, 0, 0.05)'}}>
                © 2023 Copyright:
                <a className='text-reset fw-bold' href='https://mdbootstrap.com/'>
                    CodeCool Web App
                </a>
            </div>
        </MDBFooter>
    );
}

export default Footer;
