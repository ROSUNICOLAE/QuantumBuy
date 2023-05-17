import React, { useState, useEffect } from 'react';
import SignUp from './SignUp';
import SignIn from './SignIn';
import { MDBBtn } from 'mdb-react-ui-kit';

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
        localStorage.removeItem('accessToken');
        window.location.reload();
    };

    useEffect(() => {
        const fetchUserData = async () => {
            const accessToken = localStorage.getItem('accessToken');
            if (!accessToken) {
                setUser(null);
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
                } else {
                    console.error('Error:', response.status, response.statusText);
                    setUser(null);
                }
            } catch (error) {
                console.error('Error:', error);
                setUser(null);
            }
        };

        fetchUserData();
    }, []);

    console.log('User:', user); // Debug statement to check the user state

    return (
        <>
            <div className="position-fixed top-50 end-0 translate-middle-y p-3" style={{ zIndex: 999, position: 'fixed' }}>
                <div className="bg-light p-3 rounded d-flex flex-column align-items-center">
                    {user ? (
                        <div className="text-center mb-3">
                            <p>Welcome!</p>
                            <p>You are logged in as {user.username}</p>
                            <a href="/user-page">User Page</a>
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
                    {!user && (
                        <p>You are not signed in.</p>
                    )}
                </div>
            </div>
            {showSignUpModal && <SignUp closeModal={closeSignUpModal} />}
            {showSignInModal && <SignIn closeModal={closeSignInModal} />}
        </>
    );
}

export default SlimSidebar;
