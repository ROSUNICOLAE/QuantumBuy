import React from 'react';
import { MDBBtn, MDBIcon } from 'mdb-react-ui-kit';

function SlimSidebar() {
    return (
        <div className="position-fixed top-50 end-0 translate-middle-y p-3" style={{ zIndex: 999 }}>
            <div className="bg-light p-3 rounded d-flex flex-column align-items-center">
                <div className="text-center mb-3">
                    <p>Logged in as John Doe</p>
                </div>
                <MDBBtn className="w-100 mb-3 btn-sm">Log in</MDBBtn>
                <MDBBtn className="w-100 mb-3 btn-sm">Sign up</MDBBtn>
                <MDBBtn className="w-100 btn-sm" color="danger"><MDBIcon fas icon="sign-out-alt" className="me-2"/>Log out</MDBBtn>
                {/* Add additional buttons or links for user features here */}
            </div>
        </div>
    );
}

export default SlimSidebar;
