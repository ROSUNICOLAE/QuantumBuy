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
    const [scrollableModal, setScrollableModal] = useState(true);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:8080/Users/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ firstname, lastname, email, password })
        });
        console.log(response);
        closeModal();
    };

    return (
        <MDBModal show={scrollableModal} setShow={setScrollableModal} tabIndex='-1'>
            <MDBModalDialog scrollable>
                <MDBModalContent>
                    <MDBModalHeader>
                        <MDBModalTitle>Modal title</MDBModalTitle>
                        <MDBBtn
                            className='btn-close'
                            color='none'
                            onClick={() => {
                                setScrollableModal(false);
                                closeModal();
                            }}
                        ></MDBBtn>
                    </MDBModalHeader>
                    <MDBModalBody>
                        <form onSubmit={handleSubmit}>
                            <MDBInput label='First Name' id='firstname' type='text' value={firstname} onChange={e => setFirstname(e.target.value)} />
                            <MDBInput label='Last Name' id='lastname' type='text' value={lastname} onChange={e => setLastname(e.target.value)} />
                            <MDBInput label='Email' id='email' type='email' value={email} onChange={e => setEmail(e.target.value)} />
                            <MDBInput label='Password' id='password' type='password' value={password} onChange={e => setPassword(e.target.value)} />
                            <MDBBtn MDBBtn outline rounded className='mx-2' color='dark' type="submit">
                                Create Account
                            </MDBBtn>
                        </form>
                    </MDBModalBody>
                    <MDBModalFooter>
                        <MDBBtn color='secondary' onClick={() => {
                            setScrollableModal(false);
                            closeModal();
                        }}>
                            Close
                        </MDBBtn>
                        <MDBBtn>Save changes</MDBBtn>
                    </MDBModalFooter>
                </MDBModalContent>
            </MDBModalDialog>
        </MDBModal>
    );
}

export default SignUp;
