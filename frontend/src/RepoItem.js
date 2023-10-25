import React from 'react'
import './RepoItem.css'
import { Navigate, useNavigate } from 'react-router-dom'

const RepoItem = ({repo, userName}) => {
    const navigate = useNavigate();

    const goToRepo = (event) => {
        
        event.stopPropagation();
        console.log(event.target.getAttribute('data-name'));
        const repoName = event.target.getAttribute('data-name');

        // window.location.assign("https://github.com/" + userName + "/" + event.target.getAttribute('data-name') + ".git");
        navigate(`/deploy/${userName}/${repoName}`);
    }

    return (
        <div className="repo-card" key={repo.id} data-name={repo.name} onClick={goToRepo}>
            <h3 className="repo-name">{repo.name}</h3>
            <div className='content'>
                <p className="lang">Language: {repo.language === null ? "none" : repo.language}</p>
                <p className="date">Start date & time: {repo.created_at}</p>
                <p className="visibility">Visibility: {repo.visibility}</p>
            </div>
        </div>
    )
}

export default RepoItem