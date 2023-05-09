import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    MDBContainer,
    MDBNavbar,
    MDBNavbarBrand,
    MDBNavbarToggler,
    MDBNavbarNav,
    MDBNavbarItem,
    MDBNavbarLink,
    MDBCollapse,
    MDBIcon
} from 'mdb-react-ui-kit';

function Navbar() {
    const [showNav, setShowNav] = useState(false);

    return (
        <MDBNavbar expand='lg' light bgColor='light'>
            <MDBContainer fluid>
                <MDBNavbarBrand>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <img src={require('./pictures/QuantumLogo.jpg')} alt='Quantum Logo' className='img-fluid' style={{ maxWidth: '100%', maxHeight: '70px' }} />
                        <span style={{ marginLeft: '10px', fontWeight: 'bold' }}>Quantum</span>
                    </div>
                </MDBNavbarBrand>
                <MDBNavbarToggler
                    type='button'
                    aria-expanded='false'
                    aria-label='Toggle navigation'
                    onClick={() => setShowNav(!showNav)}
                >
                    <MDBIcon icon='bars' fas />
                </MDBNavbarToggler>
                <MDBCollapse navbar show={showNav}>
                    <MDBNavbarNav className='justify-content-center'>
                        <MDBNavbarItem className='text-center p-4'>
                            <MDBNavbarLink>
                                <Link to='/'>Home</Link>
                            </MDBNavbarLink>
                        </MDBNavbarItem>
                        <MDBNavbarItem className='text-center p-4'>
                            <MDBNavbarLink href='#'>Features</MDBNavbarLink>
                        </MDBNavbarItem>
                        <MDBNavbarItem className='text-center p-4'>
                            <MDBNavbarLink href='#'>Pricing</MDBNavbarLink>
                        </MDBNavbarItem>
                        <MDBNavbarItem className='text-center p-4'>
                            <MDBNavbarLink>
                                <Link to='/AboutUs'> About </Link>
                            </MDBNavbarLink>
                        </MDBNavbarItem>
                    </MDBNavbarNav>
                </MDBCollapse>
            </MDBContainer>
        </MDBNavbar>
    );
}

export default Navbar;
