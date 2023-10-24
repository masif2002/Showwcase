import React from 'react'
import './RepoItem.css'

const RepoItem = ({repo, userName}) => {
    const goToRepo = (event) => {
        // await fetch("https://api.github.com/" + userName + "/" + repoName + ".git")
        // .then((response) => {
        //     return response.json();
        // }).then((data) => {
        //     setUserRepos(data);
        // }).catch(err => {
        //     console.log(err);
        // })
        event.stopPropagation();
        console.log(event.target.getAttribute('data-name'));
        window.location.assign("https://github.com/" + userName + "/" + event.target.getAttribute('data-name') + ".git");
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