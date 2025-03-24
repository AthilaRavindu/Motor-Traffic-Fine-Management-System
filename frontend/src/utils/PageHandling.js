import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PageHandling = () => {
    const navigate = useNavigate();


    const isAdmin = JSON.parse(localStorage.getItem('isAdmin') || "false");

    console.log('admin check', isAdmin);

    useEffect(() => {
        if (isAdmin) {
            navigate('/dashbord');
        } else {
            navigate('/civilUserDash');
        }

    }, [isAdmin, navigate]);

    return null; 
};

export default PageHandling;
