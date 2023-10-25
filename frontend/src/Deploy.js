import React from 'react'
import {useParams } from 'react-router-dom'
import './Deploy.css'

const Deploy = () => {
    const userName = useParams().userName;
    const repoName = useParams().repoName;

    const linkHandler = (event) => {
        event.stopPropagation();
        window.location.assign("https://github.com/" + userName + "/" + repoName + ".git")
    }

    return (
        <main className='Deploy'>
            <div className='details'>
                <div className='status'>
                    <h3>
                        You are currently viewing <span>{repoName}</span>.
                    </h3>
                    <h3>Progress: <span>Uploading...</span></h3>
                </div>
                
                <button className = 'btn' onClick={linkHandler}>Github Link</button>
            </div>
            <div className='renderArea'>
                Render Area
            </div>
        </main>
    )
}

export default Deploy