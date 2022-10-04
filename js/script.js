// Profile info
const overview = document.querySelector(".overview");
const username = "rebecca-moon";
const repoList = document.querySelector(".repo-list");

const information = async function () {
    const response = await fetch(`https://api.github.com/users/${username}`);
    const details = await response.json();
    
    display(details);
};

information();

const display = function (details) {
    const div = document.createElement("div");
    div.classList.add("user-info");
    div.innerHTML = `
        <figure>
            <img alt="user avatar" src=${details.avatar_url} />
        </figure>
        <div>
           <p><strong>Name:</strong> ${details.name}</p>
         <p><strong>Bio:</strong> ${details.bio}</p>
         <p><strong>Location:</strong> ${details.location}</p>
        <p><strong>Number of public repos:</strong> ${details.public_repos}</p> 
        </div>
`
overview.append(div);
repoInfo();
};

const repoInfo = async function () {
    const responseRepos = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const detailsRepos = await responseRepos.json();
    
    displayRepos(detailsRepos);
};

const displayRepos = function (repos) {
    for (const repo of repos) {
        const repoItem = document.createElement("li");
        repoItem.classList.add("repo");
        repoItem.innerHTML = `
        <h3>${repo.name}</h3>`
        repoList.append(repoItem);
    } 
};