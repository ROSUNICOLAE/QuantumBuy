import React, { useState, useEffect } from 'react';
import SignUp from './SignUp';
import { MDBBtn, MDBIcon } from 'mdb-react-ui-kit';

function SlimSidebar() {
    const [showModal, setShowModal] = useState(false);
    const [user, setUser] = useState(null);

    const openModal = () => {
        const serverUrl = 'http://localhost:3000';
        const redirectUrl = `http://localhost:3000/users/oauth2/callback/google`;
        const clientId = '93882205022-tvclhr0t1e1ricnatjub6adtn28ad8u5.apps.googleusercontent.com';
        const authUrl = `https://accounts.google.com/o/oauth2/auth?response_type=code&client_id=${clientId}&redirect_uri=${redirectUrl}&scope=email%20profile`;
        window.location = authUrl;
    };

    const closeModal = () => {
        setShowModal(false);
        document.body.style.overflow = 'auto';
    };

    const handleLogout = () => {
        // clear the access token from local storage and reload the page to log the user out
        localStorage.removeItem('accessToken');
        window.location.reload();
    };

    const fetchUserData = () => {
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
            return;
        }
        fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            },
        })
            .then(response => response.json())
            .then(data => {
                setUser(data);

                // set the access token in local storage
                localStorage.setItem('accessToken', accessToken);

                // redirect the user to the homepage with the access token set in local storage
                window.location.href = '/';
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    return (
        <>
            <div
                className="position-fixed top-50 end-0 translate-middle-y p-3"
                style={{ zIndex: 999, position: 'fixed' }}
            >
                <div className="bg-light p-3 rounded d-flex flex-column align-items-center">
                    {user && (
                        <div className="text-center mb-3">
                            <p>Logged in as {user ? user.name : ''}</p>
                        </div>
                    )}
                    <MDBBtn className="w-100 mb-3 btn-sm" onClick={openModal}>
                        <MDBIcon fab icon="google" className="me-2" />
                        Sign up with Google
                    </MDBBtn>
                    <MDBBtn className="w-100 mb-3 btn-sm">Log in</MDBBtn>
                    <MDBBtn className="w-100 btn-sm" color="danger" onClick={handleLogout}>
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
