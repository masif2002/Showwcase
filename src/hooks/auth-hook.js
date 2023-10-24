import { useCallback, useState, useEffect } from "react";

let logoutTimer;

export const useAuth = () => {
  const [token, setToken] = useState(false);
  const [userId, setUserId] = useState('');
  const [tokenExpirationDate, setTokenExpirationDate] = useState();
  const [accessToken, setAccessToken] = useState(null);

  const login = useCallback((accessToken) => {
    // setToken(token);
    // setUserId(uid);
    setAccessToken(accessToken)
    localStorage.setItem('accessToken', accessToken);
    // const tokenExpirationDate = expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
    // setTokenExpirationDate(tokenExpirationDate);
    // localStorage.setItem('userData',JSON.stringify({
    //   userId: uid,
    //   token: token,
    //   expiration: tokenExpirationDate.toISOString()
    // }));
  },[])

  const logout = useCallback((uid) => {
    // setToken(null);
    // setUserId(null);
    // setTokenExpirationDate(null);
    setAccessToken(null);
    localStorage.removeItem('accessToken');
  },[])

//   useEffect(() => {
//     if(token && tokenExpirationDate) {
//       const remainingTime = tokenExpirationDate.getTime() - new Date().getTime();
//       logoutTimer = setTimeout(logout, remainingTime)
//     } else {
//       clearTimeout(logoutTimer);
//     }
//   },[token, logout, tokenExpirationDate])

  useEffect(() => {
    // const storedData = JSON.parse(localStorage.getItem('userData'));
    // if(storedData && storedData.token && new Date(storedData.expiration) > new Date()) {
    //   login(storedData.userId, storedData.token, new Date(storedData.expiration));
    // }

    const data = localStorage.getItem('accessToken');
    if(data) {
        login(data);
    }

  }, [login])

  return {token, login, logout, userId, accessToken};
} 

export default useAuth;