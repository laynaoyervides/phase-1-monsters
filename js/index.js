//new monster form (already created)
//needs name, age, and description 

document.addEventListener('DOMContentLoaded', () => {
    const monsterContainer = document.getElementById('monster-container');
    const backButton = document.getElementById('back');
    const forwardButton = document.getElementById('forward');
    const formContainer = document.getElementById('create-monster');
    let pageNum =2;

    const monsterForm = document.createElement("form")
    monsterForm.innerHTML = `
        <label>Name</label>
        <input type="text" id="monster-name"/>
        <label>Age</label>
        <input type="number" id="monster-age"/>
        <label>Description</label>
        <input type="text" id="monster-description"/>
        <input type="submit" id="monster-submit" value="RAWR">Create Monster! RAWR!</input>    
    `
    formContainer.append(monsterForm);

    monsterForm.addEventListener("submit", (event) =>{
        event.preventDefault()
        fetch ("https://localhost:3000/monsters", {
            method: postMessage,
            headers: {"Accept": "application/json",
            "Content-type": "application/json"}
            body: JSON.stringinfy({
                name: document.getElementById('monster-name').value , 
                age: document.getElementById('monster-age'). value , 
                description: document.getElementById('monster-description'). value, 
            })
        })
        .then(resp => resp.json()
        )
    })

    fetch (`http://localhost:3000/monsters/?_limit=50${pageNum}`)
    .then(resp => resp.json)
    .then((monsters)=> {
        monsters.forEach((monster)=> {
            monsterContainer.append(renderMonster(monster), document.createElement('hr'))
        })
    })
} )
backButton.addEventListener("click", () => {
    if(pageNum === 1){
        window.alert("No More Monsters Back Here :(")
    }
    else {
        pageNum -= 1
    fetch (`http://localhost:3000/monsters/?_limit=50${pageNum}`)
    .then(resp => resp.json)
    .then((monsters)=> {
        monsterContainer.innerHTML = `On Page ${pageNum}`
        monsters.forEach((monster)=> {
            monsterContainer.append(renderMonster(monster), document.createElement('hr'))
        })
    
    })
})

function renderMonster(monster){
    const monsterSpan = document.createElement("span")
    monsterSpan.innerHTML = `
    <h1>Name: ${monster.name}</h1>
    <h1>Age: ${monster.age}</h4>
    <p>Description: ${monster.description}</p>
    `

//monsterSpan.dataset.id = monster.id
monsterSpan.setAttribute("data-id", monster.id);
monsterSpan.style.color = 'red';
return monsterSpan;
}