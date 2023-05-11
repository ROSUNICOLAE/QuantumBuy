import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function Callback() {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        // extract the code from the query string
        const searchParams = new URLSearchParams(location.search);
        const code = searchParams.get('code');

        // make a POST request to your backend server to exchange the authorization code for an access token
        fetch('/api/oauth2/google', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ code }),
        })
            .then(response => {
                // Redirect the user to the specified URL after successful authentication
                if (response.ok) {
                    navigate('/');
                } else {
                    console.error('Error:', response);
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, [navigate, location.search]);

    return (
        <div>
            <h1>Callback</h1>
        </div>
    );
}

export default Callback;
