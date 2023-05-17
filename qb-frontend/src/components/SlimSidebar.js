import React, { useState, useEffect } from 'react';
import SignUp from './SignUp';
import SignIn from './SignIn';
import { MDBBtn } from 'mdb-react-ui-kit';
import jwt_decode from 'jwt-decode';

function SlimSidebar() {
    const [showSignUpModal, setShowSignUpModal] = useState(false);
    const [showSignInModal, setShowSignInModal] = useState(false);
    const [user, setUser] = useState(null);

    const openSignUpModal = () => {
        setShowSignUpModal(true);
    };

    const closeSignUpModal = () => {
        setShowSignUpModal(false);
    };

    const openSignInModal = () => {
        setShowSignInModal(true);
    };

    const closeSignInModal = () => {
        setShowSignInModal(false);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        console.log('Token:', token);
        if (token) {
            try {
                const decodedToken = jwt_decode(token);
                console.log('Decoded Token:', decodedToken);
                setUser(decodedToken.sub);
            } catch (error) {
                console.error('Error decoding token:', error);
            }
        } else {
            setUser(null);
        }
    }, []);

    const handleLogin = (token) => {
        localStorage.setItem('token', token);
        const decodedToken = jwt_decode(token);
        setUser(decodedToken.sub);
        window.location.reload(); // Reload the page after logging in
    };

    return (
        <>
            <div className="position-fixed top-50 end-0 translate-middle-y p-3" style={{ zIndex: 999, position: 'fixed' }}>
                <div className="bg-light p-3 rounded d-flex flex-column align-items-center">
                    {user ? (
                        <div className="text-center mb-3">
                            <p>Welcome to Quantum</p>
                            <p>You are logged in as </p>
                            <p>
                                <strong>{user}</strong>
                            </p>
                            <a href="/user-page">{user} Page</a>
                            <MDBBtn className="w-100 btn-sm" color="danger" onClick={handleLogout}>
                                Log out
                            </MDBBtn>
                        </div>
                    ) : (
                        <div className="text-center mb-3">
                            <MDBBtn className="w-100 mb-3 btn-sm" onClick={openSignUpModal}>
                                Sign up
                            </MDBBtn>
                            <MDBBtn className="w-100 mb-3 btn-sm" onClick={openSignInModal}>
                                Log in
                            </MDBBtn>
                        </div>
                    )}
                    {!user && <p>You are not signed in.</p>}
                </div>
            </div>
            {showSignUpModal && <SignUp closeModal={closeSignUpModal} />}
            {showSignInModal && <SignIn closeModal={closeSignInModal} handleLogin={handleLogin} />}
        </>
    );
}

export default SlimSidebar;
