import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import Button from './Button'
import './Navigation.css'
import { AuthContext } from './context/auth-context'

const Navigation = () => {
    const auth  = useContext(AuthContext);
  return (
    <header>
        <a className="logo">mobileapp showcase</a>
        <ul>
            <li>
                <NavLink to = "/" exact>About</NavLink>
            </li>
            {/* <li>
                <NavLink to = '/about'>About</NavLink>    
            </li> */}
            {auth.isLoggedIn && (
                <li>
                    <NavLink to = '/home'>Home</NavLink>    
                </li>
            )}
            {!auth.isLoggedIn && (
                <li>
                    <NavLink to = '/auth'>Authenticate</NavLink>
                </li>
            )}
            {auth.isLoggedIn && (
                <li>
                    <Button onClick = {auth.logout} content = "logout"></Button>    
                </li>
            )}
        </ul>
    </header>
  )
}

export default Navigation