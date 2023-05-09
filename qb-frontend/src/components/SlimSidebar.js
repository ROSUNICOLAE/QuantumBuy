import React, { useState } from 'react';
import SignUp from './SignUp';
import { MDBBtn, MDBIcon } from 'mdb-react-ui-kit';

function SlimSidebar() {
    const [showModal, setShowModal] = useState(false);

    const openModal = () => {
        setShowModal(true);
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        setShowModal(false);
        document.body.style.overflow = 'auto';
    };

    return (
        <>
            <div
                className="position-fixed top-50 end-0 translate-middle-y p-3"
                style={{ zIndex: 999, position: 'fixed' }}
            >
                <div className="bg-light p-3 rounded d-flex flex-column align-items-center">
                    <div className="text-center mb-3">
                        <p>Logged in as John Doe</p>
                    </div>
                    <button className="w-100 mb-3 btn-sm" onClick={openModal}>
                        Sign up
                    </button>
                    <MDBBtn className="w-100 mb-3 btn-sm">Log in</MDBBtn>
                    <MDBBtn className="w-100 btn-sm" color="danger">
                        <MDBIcon fas icon="sign-out-alt" className="me-2" />
                        Log out
                    </MDBBtn>
                    {/* Add additional buttons or links for user features here */}
                </div>
            </div>
            {showModal && <SignUp closeModal={closeModal} />}
        </>
    );
}

export default SlimSidebar;
