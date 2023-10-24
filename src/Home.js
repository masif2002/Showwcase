import React,{useEffect, useState} from 'react'
import './Home.css'
import ReposList from './ReposList';

const Home = () => {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const getUserData = async () => {
            await fetch("http://localhost:4000/getUserData", {
                method: "GET",
                headers: {
                    "Authorization": "token " + localStorage.getItem("accessToken")
                }
            }).then((response) => {
                console.log(response)
                return response.json();
            }).then((data) => {
                console.log(data);
                setUserData(data);
            })
            .catch((err) => {
                console.log(err);        
            }) 
        }
        getUserData();
    }, [])
    
    return (
        <main className='Home'>
            {userData && 
                <h2>
                    Hello <span className='userName'>{userData.login} </span> ! 
                </h2>
            }
            <h3>
                Select a repository to containerize.  
            </h3>            
            {userData && <ReposList userName = {userData.login}/>}
        </main>
    )
}

export default Home