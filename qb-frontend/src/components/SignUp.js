import React, { useState } from 'react';
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

function SignUp({ closeModal }) {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [role, setRole] = useState('buyer'); // <-- Add role state
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            console.error('Error: Passwords do not match');
            return;
        }
        try {
            const response = await fetch('http://localhost:8080/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    email,
                    password,
                    role: role, // <-- Convert Set to an array
                }),
                mode: 'cors', // Add this line to enable CORS
            });
            console.log(response);
            setShowSuccessMessage(true);
            setTimeout(() => {
                setShowSuccessMessage(false);
                closeModal();
            }, 2000);
        } catch (error) {
            console.error('Error:', error);
        }
    };
    return (
        <MDBModal show={true} tabIndex='-1'>
            <MDBModalDialog>
                <MDBModalContent>
                    <MDBModalHeader>
                        <MDBModalTitle>Create Account</MDBModalTitle>
                    </MDBModalHeader>
                    <MDBModalBody>
                        {showSuccessMessage && (
                            <div className='alert alert-success' role='alert'>
                                Account created successfully!
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
                                label='Email'
                                id='email'
                                type='email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
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
                            <MDBInput
                                label='Confirm Password'
                                id='confirmPassword'
                                type='password'
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                            <br />
                            <label htmlFor='role'>Select Role:</label>
                            <br />
                            <select id='role' value={role} onChange={(e) => setRole(e.target.value)}>
                                <option value='BUYER'>BUYER</option>
                                <option value='SELLER'>SELLER</option>
                            </select>
                            <br />
                            <MDBBtn outline rounded className='mx-2' color='dark' type='submit'>
                                Create Account
                            </MDBBtn>
                        </form>
                    </MDBModalBody>
                    <MDBModalFooter>
                        <MDBBtn
                            color='secondary'
                            onClick={() => {
                                closeModal();
                            }}
                        >
                            Close
                        </MDBBtn>
                    </MDBModalFooter>
                </MDBModalContent>
            </MDBModalDialog>
        </MDBModal>
    );
}
export default SignUp;
