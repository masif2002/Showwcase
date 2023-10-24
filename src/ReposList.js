import React from 'react'
import { useState, useEffect } from 'react'
import './ReposList.css'
import RepoItem from './RepoItem';

const ReposList = (props) => {
    const [userRepos, setUserRepos] = useState(null);

    useEffect(() => {
        const getRepos = async() => {
            await fetch("https://api.github.com/users/" + props.userName + "/repos")
            .then((response) => {
                return response.json();
            }).then((data) => {
                setUserRepos(data);
            }).catch(err => {
                console.log(err);
            })
        }
        getRepos();
    },[props.userName])

    return (
        <>
            <section className="repo-container">
                {userRepos && userRepos.map((repo) => {
                    return (
                       <RepoItem repo = {repo} userName = {props.userName}/>
                    )
                })}
            </section>
        </>
    )
}

export default ReposList