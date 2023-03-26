import React from 'react';
import {useLocation, Navigate} from "react-router-dom";


const SecurityChecker = ({children}) => {
    const userId = window.sessionStorage.getItem("userId") || null;
    const isSecurity = window.sessionStorage.getItem("isSecurity") ? true : false;

    const location = useLocation();
    
    if(!userId || userId === null || userId === undefined || isSecurity === null || isSecurity === false)
        return <Navigate to="/signin" state={{ from: location }} />

    return children;
};


export default SecurityChecker;