import React, { useState,useEffect } from 'react';
import {
    MDBBtn,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,
    MDBInput,
} from 'mdb-react-ui-kit';
import jwt_decode from "jwt-decode";

function SignIn({ closeModal }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [token, setToken] = useState(localStorage.getItem("token"));


    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            const decodedToken = jwt_decode(token);
            console.log(decodedToken);
            setUsername(decodedToken.sub);
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8080/api/auth/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json', // Add this line
                },
                body: JSON.stringify({
                    username,
                    password,
                }),
                mode: 'cors', // Add this line to enable CORS
            });

            if (response.ok) {
                // Sign-in successful
                // You can handle the success response here
                localStorage.setItem("token", response.headers.get("Authorization"));
                setToken(response.headers.get("Authorization"));
                closeModal();
            } else {
                // Sign-in failed
                // You can handle the error response here
                const data = await response.json();
                setErrorMessage(data.message);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <MDBModal show={true} tabIndex='-1'>
            <MDBModalDialog>
                <MDBModalContent>
                    <MDBModalHeader>
                        <MDBModalTitle>Sign In</MDBModalTitle>
                    </MDBModalHeader>
                    <MDBModalBody>
                        {errorMessage && (
                            <div className='alert alert-danger' role='alert'>
                                {errorMessage}
                            </div>
                        )}
                        <form onSubmit={handleSubmit}>
                            <MDBInput
                                label='Username'
                                id='username'
                                type='text'
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <br />
                            <MDBInput
                                label='Password'
                                id='password'
                                type='password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <br />
                            <MDBBtn outline rounded className='mx-2' color='dark' type='submit'>
                                Sign In
                            </MDBBtn>
                        </form>
                    </MDBModalBody>
                    <MDBModalFooter>
                        <MDBBtn color='secondary' onClick={() => closeModal()}>
                            Close
                        </MDBBtn>
                    </MDBModalFooter>
                </MDBModalContent>
            </MDBModalDialog>
        </MDBModal>
    );
}

export default SignIn;
