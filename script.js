//you can create a variable using var, let or const but its better to use let
//var-allows for the most changing, you can do anything you want with a var later but it could allow for more bugs
//const-allows for the least amount of changing, once decleared you cannot change/update it
console.log("Script loaded");

let xp = 0;
let health = 150;
let gold = 150;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ["stick (power - 1)"]; //array of 1 string

//you can use const button1 = document.getElementById("button1") or const button1 = document.querySelector("#button1")
const button1 = document.getElementById("button1");
const button2 = document.getElementById("button2");
const button3 = document.getElementById("button3");
const text = document.getElementById("text");
const xpText = document.getElementById("xpText");
const healthText = document.getElementById("healthText");
const goldText = document.getElementById("goldText");
const monsterStats = document.getElementById("monsterStats");
const monsterNameText = document.getElementById("monsterName");
const monsterHealthText = document.getElementById("monsterHealth");

const weapons = [
    {
        name: "stick",
        power: 5
    },
    {
        name: "dagger",
        power: 30
    },
    {
        name: "claw hammer",
        power: 100
    },
    {
        name: "sword",
        power: 100
    }
];

const monsters = [
    {
        name: "slime",
        level: 2,
        health: 15
    },
    {
        name: "fanged beast",
        level: 8,
        health: 60
    },
    {
        name: "dragon",
        level: 20,
        health: 300
    }
];

//To change html elements in js you need to gets a reference to the html element with this id name { let el = document.querySelector("#el") }

//document.addEventListener('DOMContentLoaded', (event) => {
    console.log("DOM fully loaded and parsed");

    const locations = [
        {
            name: "town square",
            "button text": ["Go To Store", "Go To Cave", "Fight Dragon"],
            "button functions": [goToStore, goToCave, fightDragon],
            text: "You are in the town square. You see a sign that says \"Store\" and another that says \"Cave\"."
        },
        {
            name: "store",
            "button text": ["Buy 10 health points (10 gold)", "Buy weapon (30 gold)", "Go back to town square"],
            "button functions": [buyHealth, buyWeapon, goToTown],
            text: "You have entered the store. You can select what you would like to purchase or return to the town square."
        },
        {
            name: "cave",
            "button text": ["Fight Slime", "Fight Fanged Beast", "Go back to town square"],
            "button functions": [fightSlime, fightBeast, goToTown],
            text: "You have entered the cave. You see some monsters. You can choose to fight a monster or run away to the town square."
        },
        {
            name: "fight",
            "button text": ["Attack", "Dodge", "Run"],
            "button functions": [attack, dodge, goToTown],
            text: "You are fighting a monster. You can choose your next move."
        },
        {
            name: "killMonster",
            "button text": ["Go back to town square!", "Go back to town square!!", "Go back to town square!!!"],
            "button functions": [goToTown, goToTown, easterEgg],
            text: "The monster screams \"Arg!\" as it DIES. You gained experience points and found some gold. Now go back to town!"
        },
        {
            name: "lose",
            "button text": ["REPLAY", "REPLAY?", "REPLAY!"],
            "button functions": [restart, restart, restart],
            text: "You die. RIP!!! Now you have to start all over again."
        },
        {
            name: "win",
            "button text": ["REPLAY", "REPLAY?", "REPLAY!"],
            "button functions": [restart, restart, restart],
            text: "You defeated the main boss dragon! YOU WIN THE GAME!!! Would you like to restart the game?."
        },
        {
            name: "easter egg",
            "button text": ["2", "8", "Exit Game"],
            "button functions": [pickTwo, pickEight, goToTown],
            text: "You found a secret game! Pick a number above. Ten numbers will be randomly chosen between 0 and 10. If the number you choose matches one of the random numbers, you WIN!"
        }                
    ];

    let currentLocation = locations[0];

    //initializing game
    initializeGame()

    //functions
    function initializeGame(){
        button1.addEventListener('click', goToStore);
        button2.addEventListener('click', goToCave);
        button3.addEventListener('click', fightDragon);
    }

    function update(location){
        monsterStats.style.display = "none";

        button1.textContent = location["button text"][0];
        button2.textContent = location["button text"][1];
        button3.textContent = location["button text"][2];

        //the onClick properties of the buttons need to change
        remove(currentLocation);
        
        button1.addEventListener('click', location["button functions"][0]);
        button2.addEventListener('click', location["button functions"][1]);
        button3.addEventListener('click', location["button functions"][2]);

        text.textContent = location.text; //only works if it is not a list
    }

    function remove(location){
        button1.removeEventListener('click', location["button functions"][0]);
        button2.removeEventListener('click', location["button functions"][1]);
        button3.removeEventListener('click', location["button functions"][2]);
    }

    function goToTown(){
        //console.log("Going back to the town.");
        
        update(locations[0]);
        currentLocation = locations[0];
    }

    function goToStore(){
        //console.log("Going to the store.");
        
        update(locations[1]);
        currentLocation = locations[1];
    }

    function goToCave(){
        update(locations[2]);
        currentLocation = locations[2];
    }

    function buyWeapon(){
        //console.log("Buying new weapon.");
        if(currentWeapon < weapons.length - 1){
            if(gold >= 30){
                gold -= 30;
                goldText.textContent = gold;
                currentWeapon += 1;

                let newWeapon = weapons[currentWeapon].name + " (power - " + weapons[currentWeapon].power + ")";
                inventory.push(newWeapon);

                text.innerHTML = "You now have a new weapon --> " + newWeapon + ". <br>In your inventory you currently have: " + inventory.join(", ");
            }
            else{
                text.textContent = "You do not have enough gold to buy a weapon. Purchase another item or return to the town square.";
            }
        }
        else{
            text.textContent = "You already have the most powerful weapon we have in store! You can sell the weapons in your inventory for some gold.";
            
            button2.textContent = "Sell weapon for 15 gold";
            button2.addEventListener('click', sellWeapon);
        }
    }

    function sellWeapon(){
        if(inventory.length > 1){
            gold += 15;
            goldText.textContent = gold;
            //since we're using 'let' the variable is scoped within the if statement, if we used 'var' it could be used outside the if statement.
            let currentWeapon = inventory.shift(); //shift removes the FIRST element of the array
            text.innerHTML = "You just sold your " + currentWeapon + ". <br>Now in your inventory, you have: " + inventory.join(", ");
        }
        else{
            text.innerHTML = "You can't sell your only weapon."; 
        }
    }

    function buyHealth(){
        //console.log("Buying health points.");
        if(gold >= 10){
            gold -= 10;
            health += 10;
            goldText.textContent = gold;
            healthText.textContent = health;
            text.textContent = "You just purchased 10 health points. You can purchase another item or return to the town square."; 
        }
        else{
            text.textContent = "You do not have enough gold to buy health points. Purchase another item or return to the town square."; 
        }
    }  

    function fightSlime(){
        //console.log("Fighting the slime.");
        fighting = 0;
        goFight();
    }

    function fightBeast(){
        //console.log("Fighting the fanged beast.");
        fighting = 1;
        goFight();
    }

    function fightDragon(){
        //console.log("Fighting the dragon.");
        fighting = 2;
        goFight();
    }

    function goFight(){
        update(locations[3]);
        currentLocation = locations[3];
        monsterNameText.innerText = monsters[fighting].name;
        monsterHealth = monsters[fighting].health;
        monsterHealthText.innerText = monsterHealth;
        monsterStats.style.display = "block";
    }

    function attack(){
        text.innerHTML = "The " + monsters[fighting].name + " attacks. <br>You attack it with your "
            + weapons[currentWeapon].name + ".";
        
        //health -= monsters[fighting].level;
        if(isMonsterHit()){
            health -= getMonsterAttackValue(monsters[fighting].level);
        }
        else{
            text.innerText = "You missed."
        }

        monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;
        
        healthText.innerText = health;
        monsterHealthText.innerText = monsterHealth;

        if(health <= 0){
            lose();
        }
        else if(monsterHealth <= 0){
            //if(monsters[fighting].name === "dragon"){ winGame(); } else{ defeatMonster(); }
           //OR
           monsters[fighting].name === "dragon" ? winGame() : defeatMonster();
        }

        if(Math.random() <= 0.1 && inventory.length !== 1){
            text.innerHTML = "Your " + inventory.pop() + " breaks. <br>" + text.innerText;
            currentWeapon--;
        }
    }

    function dodge(){
        text.innerText = "You dodge the attack from the " + monsters[fighting].name + ".";
    }

    function getMonsterAttackValue(level){
        let hit = (level * 5) - (Math.floor(Math.random() * xp));
        console.log(hit);
        return hit;
    }

    //a randomized function to make it so that 20%of the time its a miss and 80% of the time uts a hity
    function isMonsterHit(){
        return Math.random() > 0.2 || health < 20;
    }

    function defeatMonster(){
        gold += Math.floor(monsters[fighting].level * 6.7);
        xp += monsters[fighting].level;
        goldText.innerText = gold;
        xpText.innerText = xp;
        update(locations[4]);
        currentLocation = locations[4];
    }

    function lose(){
        update(locations[5]);
        currentLocation = locations[5];
    }

    function restart(){
        xp = 0;
        health = 100;
        gold = 150;
        currentWeapon = 0;
        inventory = ["stick: power - 1"];
        goldText.innerText = gold;
        healthText.innerText = health;
        xpText.innerText = xp;
        goToTown();
    }

    function winGame(){
        update(locations[6]);
        currentLocation = locations[6];
    }

    function easterEgg(){
        update(locations[7]);
        currentLocation = locations[7];
    }

    function pickTwo(){
        pick(2);
    }

    function pickEight(){
        pick(8);
    }

    function pick(guess){
        let numbers = [];

        while(numbers.length < 10){
            numbers.push(Math.floor(Math.random() * 11)); //random number b/w 1 and 10
        }

        text.innerText = "You picked " + guess + ". Here are the random numbers:\n";

        for(let i = 0; i < 10; i++){
            text.innerText += numbers[i] + "\n";
        }

        if(numbers.indexOf(guess) !== -1){
            text.innerText += "Right! You win 20 gold!";
            gold += 20;
            goldText.innerText = gold;
        }
        else{
            text.innerText += "Wrong! You lose 10 health!";
            health -= 10;
            healthText.innerText = health;

            if(health <= 0){
                lose();
            }
        }
    }
//});