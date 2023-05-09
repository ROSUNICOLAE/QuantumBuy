import React from 'react';
import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';

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
                                    Settings
                                </a>
                            </p>
                            <p>
                                <a href='#!' className='text-reset'>
                                    Orders
                                </a>
                            </p>

                        </MDBCol>
                        <MDBCol md='4' lg='3' xl='3' className='mx-auto mb-md-0 mb-4'>
                            <h6 className='text-uppercase fw-bold mb-4'>Contact</h6>
                            <p>
                                <MDBIcon color='secondary' icon='home' className='me-2'/>
                                New York, NY 10012, US
                            </p>
                            <p>
                                <MDBIcon color='secondary' icon='envelope' className='me-3'/>
                                info@example.com
                            </p>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </section>

            <div className='text-center p-4' style={{backgroundColor: 'rgba(0, 0, 0, 0.05)'}}>
                © 2021 Copyright:
                <a className='text-reset fw-bold' href='https://mdbootstrap.com/'>
                    MDBootstrap.com
                </a>
            </div>
        </MDBFooter>
    );
}

export default Footer;
