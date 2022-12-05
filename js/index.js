
function renderMonster(monster){
    const monsterContainer = document.getElementById('monster-container');
    const monsterName = document.createElement('h3');
    monsterName.setAttribute('id', `${monster.id}`);
    monsterName.textContent = monster.name;
/////////////////////////////////////////////////////////////////////////////////
    const monsterAge = document.createElement('p');
    monsterAge.setAttribute('id', 'monster-age');
    monsterAge.textContent = `Age: ${monster.age}`;
/////////////////////////////////////////////////////////////////////////////////
   const monsterDescription = document.createElement('p'); 
   monsterDescription.setAttribute('id', 'monster-description');
   monsterDescription.textContent = `Description: ${monster.description}`;
   /////////////////////////////////////////////////////////////////////////////////
   const monsterDiv = document.createElement('div');
   monsterDiv.setAttribute('id','monster-div');
   monsterDiv.append(monsterName, monsterAge, monsterDescription);
   monsterContainer.append(monsterDiv);
   
}

///////////////////////////////////////////////////////////////////////////////////
const monsterForm = document.getElementById('add-new-monster');
monsterForm.addEventListener('submit', (e) => {
    addMonster(e);
})

function addMonster(e) {
    //e.preventDefeault();
    const newName = document.getElementById('name');
    const newAge = document.getElementById('age');
    const newDescription = document.getElementById('description');
    const newMonsterData = {
        name: newName.value,
        age: newAge.value,
        description: newDescription.value
    }
    fetch("http://localhost:3000/monsters",{
        method: "POST",
        headers: {
            'Content-Type' : 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify(newMonsterData)
        })
    renderMonster(newMonsterData);
    }
    /////////////////////////////////////////////////////////////////////////////////////////
    let pNum = 1;
    let page = `http://localhost:3000/monsters/?_limit=50&_page=${pNum}`;
    console.log(page)
    ///////////////////////////////////////////////////////////////////////////////////////////
    let forwardButton = document.getElementById('forward');
    let backButton = document.getElementById('back');
    /////////////////////////////////////////////////////////////////////////////////////////
    function back(){
        pNum--;
        console.log(page);
        page = `http://localhost:3000/monsters/?_limit=50&_page=${pNum - 1}`;
        if(pNum === 1){
            backButton.disabled = true;
        }
        forwardButton.disabled = false;
        fetchMonsters();
    }
    //back();   
    backButton.addEventListener('click', () => {
        back();
        removePrevPage();
     });
    ///////////////////////////////////////////////////////////////////////////////////////
    function forward(){
        pNum++;
        console.log(page);
        page = `http://localhost:3000/monsters/?_limit=50&_page=${pNum}`;
        if (pNum === 20){
            forwardButton.disabled = true;
        }
        backButton.disabled = false;
        fetchMonsters();
    }
    //forward();   
    forwardButton.addEventListener('click', () => {
        forward();
        removePrevPage();
    });
/////////////////////////////////////////////////////////////////////////////////
function removePrevPage(){
    while(document.getElementById("monster-container").firstChild){
        const oldMonster = document.getElementById("monster-div");
        oldMonster.remove();
    }
}
///////////////////////////////////////////////////////////////////////////////////
function fetchMonsters(){
    fetch(`http://localhost:3000/monsters/?_limit=50&_page=${pNum}`)
    .then(res => res.json())
    .then(monsterData => monsterData.forEach(monster => renderMonster(monster)))
}

function initialize(){
    fetchMonsters();
}
initialize();
///////////////////////////////////////////////////////////////////////////