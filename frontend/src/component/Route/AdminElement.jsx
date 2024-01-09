import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const AdminElement = ({ children }) => {

    const { isAuthenticated, user } = useSelector(state => state.user);

    if (isAuthenticated) {

        if (user.role === "admin") {
            return <>{children}</>
        }
        else {
            return <Navigate to={"/"} />
        }

    }
    else {
        return <Navigate to={"/"} />
    }
}

export default AdminElement;
