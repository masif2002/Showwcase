import React, { useState, useRef, useEffect } from 'react'
import {useParams } from 'react-router-dom'
import './Deploy.css'

import { server } from './util/server'
import RFB from "@novnc/novnc/";

const Deploy = () => {
    const [status, setStatus] = useState("IDLE")
    const [disableDeploy, setDisableDeploy] = useState(false)
    const [URL, setURL] = useState(null)
    const [vncpassword, setVncpassword] = useState(null)

    const [RFBobj, setRFBobj] = useState(null)
    const [disabledViewButton, setDisabledViewButton] = useState(true);
    const [disabledDisconnectButton, setdisabledDisconnectButton] = useState(true)

    const screen = useRef(null);


    const userName = useParams().userName;
    const repoName = useParams().repoName;

    useEffect(() => {
        !!URL && setDisabledViewButton(false)

    }, [URL])

    useEffect(() => {
        if (!!URL && !!vncpassword) setDisabledViewButton(false);
        
      }, [URL, vncpassword]);
    

    const initiateDeployment = async (event) => {
        const githubURL = `https://github.com/${userName}/${repoName}`

        setStatus("DEPLOYING ...")
        setDisableDeploy(true)

        const response = await fetch(`${server}/deploy`, {
            method: 'POST',
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                project: githubURL,
            })
        })
        
        const data = await response.json()
        console.log(data)

        setURL(data.url)
        setVncpassword(data.vncpassword)
        setStatus(data.status)

        setDisableDeploy(false)
    }

    const initiateConnection = () => {
        setDisabledViewButton(true)
        setdisabledDisconnectButton(false)
    
        let rfb = new RFB(screen.current, URL, {
            credentials: { password: vncpassword },
        });

        setRFBobj(rfb)
    
        rfb.viewOnly = false;
        rfb.scaleViewport = false;
    }
    
    const disconnect = () => {
        RFBobj.disconnect()
        setDisabledViewButton(false)
        setdisabledDisconnectButton(true)
    }



    return (
        <main className='Deploy'>
            <div className='details'>
                <div className='status'>
                    <h3>
                        Respository: <span>{repoName}</span>.
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

                    <button 
                        className='btn'
                        onClick={initiateConnection}
                        disabled={disabledViewButton}
                    >
                        Connect
                    </button>


                    <button 
                        className='btn margin-left'
                        onClick={disconnect}
                        disabled={disabledDisconnectButton}
                    >
                        Disconnect
                    </button>
                </div>

            </div>
            <div className='renderArea' ref={screen}>
            </div>
        </main>
    )
}

export default Deploy