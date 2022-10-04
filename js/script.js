// Profile info
const overview = document.querySelector(".overview");
const username = "rebecca-moon";

const information = async function () {
    const response = await fetch(`https://api.github.com/users/${username}`);
    const details = await response.json();
    
    display(details);
};

information();

const display = function (details) {
    const div = document.createElement("div");
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
};