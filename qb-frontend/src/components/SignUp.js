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
    MDBInput
} from 'mdb-react-ui-kit';

function SignUp({ closeModal }) {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:8080/Users/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ firstname, lastname, email, password, role })
        });
        console.log(response);
        setShowSuccessMessage(true);
        setTimeout(() => {
            setShowSuccessMessage(false);
            closeModal();
        }, 2000);
    };

    return (
        <MDBModal show={true} tabIndex='-1'>
            <MDBModalDialog>
                <MDBModalContent>
                    <MDBModalHeader>
                        <MDBModalTitle>Create Account</MDBModalTitle>
                        <MDBBtn
                            className='btn-close'
                            color='none'
                            onClick={() => {
                                closeModal();
                            }}
                        ></MDBBtn>
                    </MDBModalHeader>
                    <MDBModalBody>
                        {showSuccessMessage && (
                            <div className='alert alert-success' role='alert'>
                                Account created successfully!
                            </div>
                        )}
                        <form onSubmit={handleSubmit}>
                            <MDBInput label='First Name' id='firstname' type='text' value={firstname} onChange={e => setFirstname(e.target.value)} />
                            <MDBInput label='Last Name' id='lastname' type='text' value={lastname} onChange={e => setLastname(e.target.value)} />
                            <MDBInput label='Email' id='email' type='email' value={email} onChange={e => setEmail(e.target.value)} />
                            <MDBInput label='Password' id='password' type='password' value={password} onChange={e => setPassword(e.target.value)} />
                            <div className='my-3'>
                                <label htmlFor='role' className='form-label'>
                                    Role
                                </label>
                                <select className='form-select' id='role' value={role} onChange={e => setRole(e.target.value)}>
                                    <option value=''>Select role...</option>
                                    <option value='BUYER'>Buyer</option>
                                    <option value='SELLER'>Seller</option>
                                </select>
                            </div>
                            <MDBBtn outline rounded className='mx-2' color='dark' type='submit' disabled={!role}>
                                Create Account
                            </MDBBtn>
                        </form>
                    </MDBModalBody>
                    <MDBModalFooter>
                        <MDBBtn color='secondary' onClick={() => {
                            closeModal();
                        }}>
                            Close
                        </MDBBtn>
                    </MDBModalFooter>
                </MDBModalContent>
            </MDBModalDialog>
        </MDBModal>
    );
}

export default SignUp;
