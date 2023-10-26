import React, {Suspense} from 'react';
import { BrowserRouter, Route, Navigate, Routes } from 'react-router-dom';
import Auth from './Auth';
import Home from './Home';
import Navigation from './Navigation';
import Welcome from './Welcome';
import LoadingSpinner from './UIelement/LoadingSpinner';
import {useAuth} from './hooks/auth-hook'
import { AuthContext } from './context/auth-context';
import Deploy from './Deploy';

function App() {
  const {token, login, logout, userId, accessToken} = useAuth();

  let routes;

  if(accessToken) {
    routes = (
      <Routes>
        <Route path = 'home' element = {<Home/>}/>
        <Route path = 'deploy/:userName/:repoName' element = {<Deploy/>}/>
        <Route path = '/' element = {<Welcome/>}/>
        <Route path = '*' element={<Navigate to ="/home" replace/>}/>
      </Routes>
      
    )
  }
  else {
    console.log("No token.")
    routes = (
      <Routes>
        <Route path='auth' element={<Auth/>}/>
        <Route path='/' element={<Welcome/>}/>
        <Route path = '*' element={<Navigate to ="/" />}/>
      </Routes>  
    )
  }

    return (
      <AuthContext.Provider value = {{isLoggedIn: !!token || !!accessToken, accessToken: accessToken, token:token, userId: userId,login: login, logout: logout}}>
        <BrowserRouter>
          <Navigation/>
          <main>
            <Suspense 
                fallback = {
                  <div className='center'>
                    <LoadingSpinner/>
                  </div>
                }
            >
              {routes}
            </Suspense>
          </main>
        </BrowserRouter>
      </AuthContext.Provider>
    );
  
}

export default App;
