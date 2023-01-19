import React from 'react';
import { useNavigate } from 'react-router-dom';

const Unauthorized = () => {
    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1);
        window.scrollTo(0, 0);
    };

    return (
        <section>
            <h1>You're not authorized to access this page</h1>
            <p>
                Unauthorized access to this page is not allowed to access this page.
            </p>
            <button onClick={goBack}>Go back</button>
        </section>
    );

}

export default Unauthorized;