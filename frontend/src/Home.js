import React,{useEffect, useState} from 'react'
import './Home.css'
import ReposList from './ReposList';
import LoadingSpinner from './UIelement/LoadingSpinner'

const Home = () => {
    const [userData, setUserData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

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
                setIsLoading(false);
            })
            .catch((err) => {
                console.log(err);           
            }) 
        }
        getUserData();
    }, [])
    
    return (
        <React.Fragment>
            {isLoading && (
                <div className="center">
                    <LoadingSpinner/>
                </div>
            )}
            {!isLoading && <main className='Home'>
                {userData && 
                    <h2>
                        Hello <span className='userName'>{userData.login} </span> ! 
                    </h2>
                }
                <h3>
                    Please select a GitHub repository to deploy  
                </h3>            
                {userData && <ReposList userName = {userData.login}/>}
            </main>}
        </React.Fragment>
        
    )
}

export default Home