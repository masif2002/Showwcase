import React, {useEffect, useContext} from 'react'
import { AuthContext } from './context/auth-context';
import { useNavigate } from 'react-router-dom';
import './Welcome.css'

const Welcome = () => {
    const auth = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const codeParam = urlParams.get("code");
        console.log(codeParam);

        if(codeParam && (localStorage.getItem("accessToken") === null)) {
            const getAccessToken = async () => {
                await fetch("http://localhost:4000/getAccessToken?code=" + codeParam, {
                    method: "GET"
                }).then((response) => {
                    return response.json();
                }).then((data) => {
                    console.log(data);
                    if(data.access_token) {
                        auth.login(data.access_token);
                    }
                })
                navigate('/home');
            }
            getAccessToken(); 
        }
    }, [auth])

    return (
        <h2 className='Welcome'>
            Welcome to <span>Mobile App Showcase!</span>
        </h2>
    )
}

export default Welcome