import React, { useState, useRef, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import './Deploy.css'
import LoadingSpinner from './UIelement/LoadingSpinner'

import { server } from './util/server'

const Deploy = () => {
    const [status, setStatus] = useState("IDLE")
    const [URL, setURL] = useState(null)
    
    const [disableDeploy, setDisableDeploy] = useState(false)
    const [isDeploying, setIsDeploying] = useState(false);


    const userName = useParams().userName;
    const repoName = useParams().repoName;


    const initiateDeployment = async (event) => {

        const githubURL = `https://github.com/${userName}/${repoName}`

        setStatus("DEPLOYING ...")
        setDisableDeploy(true)
        setIsDeploying(true)
<<<<<<< HEAD
        const token = prompt("Token required:")
        const response = await fetch(`${server}/deploy?token=${token}`, {
            method: 'POST',
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                project: githubURL,
=======

        try {

            const response = await fetch(`${server}/deploy`, {
                method: 'POST',
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    project: githubURL,
                })
>>>>>>> main
            })
            
            const data = await response.json()
            console.log(data)
    
            setStatus(data.status)
            setURL(window.location.origin + `/view/${data.uid}`)
    
            setDisableDeploy(false)
            setIsDeploying(false)

        } catch {
            setStatus("IDLE")
            setDisableDeploy(false)
            setIsDeploying(false)
            alert("Something went wrong!")
        }
    }


    return (
        <main className='Deploy'>
            <div className='details'>
                <div className='status'>
                    <h3>
                        Repository: <span>{repoName}</span>.
                    </h3>
                    <h3>Status: <span>{status}</span></h3>
                </div>
                
                <div className='btn-container'>
                    <button 
                        className='btn'
                        onClick={initiateDeployment}
                        disabled={disableDeploy}
                    >
                        Deploy
                    </button>

                  
                </div>

            </div>
            {isDeploying && 
                <div className="center">
                    <LoadingSpinner/>
                </div>
            }

            {URL &&
                <h3 className='m-10'>
                    You can view your deployment at: 
                    <a href={URL} className='ml-5'>
                        <span>{URL}</span>
                    </a>
                </h3>
            }
        </main>
    )
}

export default Deploy