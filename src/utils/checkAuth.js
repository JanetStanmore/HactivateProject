import React from 'react';
import {useLocation, Navigate} from "react-router-dom";


const AuthChecker = (children) => {
    const userId = window.sessionStorage.getItem("userId") || null;
    const location = useLocation();
    
    if(!userId || userId === null || userId === undefined)
        return <Navigate to="/signin" state={{ from: location }} />

    return children;
};


export default AuthChecker;