import React, { useState, useEffect } from 'react';
import SignUp from './SignUp';
import {
    MDBBtn
} from 'mdb-react-ui-kit';

function SlimSidebar() {
    const [showModal, setShowModal] = useState(false);
    const [user, setUser] = useState(null);

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const handleLogout = () => {
        // Clear the access token from local storage and reload the page to log the user out
        localStorage.removeItem('accessToken');
        window.location.reload();
    };

    const fetchUserData = async () => {
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
            return;
        }
        try {
            const response = await fetch('http://localhost:8080/api/auth/user', {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            });
            if (response.ok) {
                const data = await response.json();
                setUser(data);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    return (
        <>
            <div className="position-fixed top-50 end-0 translate-middle-y p-3" style={{ zIndex: 999, position: 'fixed' }}>
                <div className="bg-light p-3 rounded d-flex flex-column align-items-center">
                    {user && (
                        <div className="text-center mb-3">
                            <p>Logged in as {user ? user.username : ''}</p>
                        </div>
                    )}
                    <MDBBtn className="w-100 mb-3 btn-sm" onClick={openModal}>
                        Sign up
                    </MDBBtn>
                    <MDBBtn className="w-100 mb-3 btn-sm">Log in</MDBBtn>
                    <MDBBtn className="w-100 btn-sm" color="danger" onClick={handleLogout}>
                        Log out
                    </MDBBtn>
                </div>
            </div>
            {showModal && <SignUp closeModal={closeModal} />}
        </>
    );
}

export default SlimSidebar;
