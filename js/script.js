// Profile info
const overview = document.querySelector(".overview");
const username = "rebecca-moon";
//Repo info
const repoList = document.querySelector(".repo-list");
const repoSection = document.querySelector(".repos");
const repoData = document.querySelector(".repo-data");
//back to gallery button
const backToGallery = document.querySelector(".view-repos");
const filterInput = document.querySelector(".filter-repos")


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
gitRepos();
};

const gitRepos = async function () {
    const responseRepos = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const detailsRepos = await responseRepos.json();
    
    displayRepos(detailsRepos);
};

const displayRepos = function (repos) {
    filterInput.classList.remove("hide");
    for (const repo of repos) {
        const repoItem = document.createElement("li");
        repoItem.classList.add("repo");
        repoItem.innerHTML = `
        <h3>${repo.name}</h3>`
        repoList.append(repoItem);
    } 
};

repoList.addEventListener("click", function (e) {
    if(e.target.matches("h3")) {
        const repoName = e.target.innerText;
        getSpecificInfo(repoName);
    };
    
});

const getSpecificInfo = async function (repoName) {
    const fetchInfo = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
    const repoInfo = await fetchInfo.json();
    //console.log(repoInfo);

    const fetchLanguages = await fetch(repoInfo.languages_url);
    const languageData = await fetchLanguages.json();
    //console.log(languageData);

    const languages = [];
    for (let language in languageData) {
        languages.push(language);
    };
    //console.log(languages);

    displaySpecificInfo(repoInfo, languages);
};

const displaySpecificInfo = function (repoInfo, languages) {
    repoData.innerHTML = ``;
    const div = document.createElement("div");
    div.innerHTML = `
    <h3>Name: ${repoInfo.name}</h3>
    <p>Description: ${repoInfo.description}</p>
    <p>Default Branch: ${repoInfo.default_branch}</p>
    <p>Languages: ${languages.join(", ")}</p>
    <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>
    `
    repoData.append(div);
    repoData.classList.remove("hide");
    repoSection.classList.add("hide");
    backToGallery.classList.remove("hide");
};

backToGallery.addEventListener("click", function () {
    repoSection.classList.remove("hide");
    repoData.classList.add("hide");
    backToGallery.classList.add("hide");
});

filterInput.addEventListener("input", function(e) {
    const searchFilter = e.target.value;
    const repos = document.querySelectorAll(".repo");
    const lowerCaseSearch = searchFilter.toLowerCase();

    for (const repo of repos) {
        const lowerCaseRepo = repo.innerText.toLowerCase();
        
        if (lowerCaseRepo.includes(lowerCaseSearch)) {
            repo.classList.remove("hide");
        } else {
            repo.classList.add("hide");
        }
    };

});