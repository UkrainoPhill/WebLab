import React, {ReactNode, useEffect, useState} from 'react';
import './ProtectedRoute.css';
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, check, logout, RootState} from "../../../store";
import {Navigate, useLocation} from "react-router-dom";
import AuthService from "../../../services/UserService";

interface ProtectedRouteProps{
    children: ReactNode,
}

const ProtectedRoute : React.FC<ProtectedRouteProps> = (props) => {
    const [valid, setValid] = useState<boolean | null>(null);
    const token = localStorage.getItem('token');
    const location = useLocation();
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        if (token){
            dispatch(check(token)).unwrap().then(res => {
                setValid(res.data)
            }).catch(() => {
                setValid(false);
                dispatch(logout());
            })
        }else{
            setValid(false);
            dispatch(logout());
        }
    }, [token, dispatch]);

    if (valid === null){
        return <div>Loading...</div>
    }

    if(!valid) {
        return <Navigate to={'/register'} state={{from: location}} replace/>
    }
    return <>{props.children}</>;
};

export default ProtectedRoute;