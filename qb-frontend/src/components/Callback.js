import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function Callback() {
    const history = useNavigate();
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
            .then(response => response.json())
            .then(data => {
                // set the access token in local storage
                localStorage.setItem('accessToken', data.accessToken);

                // redirect the user to the dashboard page
                history.push('/');
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, [history, location.search]);

    return (
        <div>
            <h1>Callback</h1>
        </div>
    );
}

export default Callback;
