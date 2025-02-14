var cash = 2000;
var guests = 0;
var rooms = 1;
var energy = 5;
var currentTick = 0;
var flagStatus = "false"
let activeScreen = "none"
var income = 1;



// Inital setup function
function initalSetup(x,y,z,a) {
    // Sets the correct amount for the different status variables
    let cash = String(x);
    let income = String(y);
    let rooms = String(z);
    let energy = String(a);
    // Gets elements  from the doc
    let incomeAmount = document.getElementById("incomeAmount").innerHTML;
    let roomAmount = document.getElementById("availRooms").innerHTML;
    let moneyAmount = document.getElementById("moneyAmount").innerHTML;
    let energyAmount = document.getElementById("energy").innerHTML;
    //Updates them with the new values
    document.getElementById("moneyAmount").innerHTML = moneyAmount.replace(moneyAmount, cash);
    document.getElementById("incomeAmount").innerHTML = incomeAmount.replace(incomeAmount, income);
    document.getElementById("availRooms").innerHTML = roomAmount.replace(roomAmount, rooms);
    document.getElementById("energy").innerHTML = roomAmount.replace(energyAmount, energy);

    //Sets up the buttons that initally go on the page
    document.addEventListener('click', (Btn) => {
    let clicked = Btn.target;
    console.log(clicked);

    //If the button clicked was the turnBtn it sets whether the ticker is running or paused
    if (clicked == turnBtn){
        if (flagStatus == "false") {
            flagStatus = "true";
            clicked.innerText = "Pause"
            console.log("Unpaused");
        }
        else {
            flagStatus = "false";
            clicked.innerText = "Resume"
            console.log("Paused")
        }
     }


     // Button that starts the game and hows the turnBtn
    if (clicked == beginBtn) {
        console.log("You did it")
        // Shows the start and pause button
        document.getElementById("turnBtn").style.visibility="visible";
        document.getElementById("turnBar").style.visibility="visible";
        document.getElementById("btnHome").style.visibility="visible";
        document.getElementById("btnUpgrade").style.visibility="visible";
        document.getElementById("stockButton").style.visibility="visible";

        activeScreen = "screenHome";

        //Hides the elements in paragraphBox
        document.getElementById("beginBtn").style.visibility="hidden";
        var hidePara = document.getElementsByClassName("innerMainParagraph");
        var length = hidePara.length;
        for (var i = 0; i < length; i++) {
            hidePara[i].style.visibility = "hidden";
            hidePara[i].style.display = "none";
        }
        screenHome();


    }
    //Call the upgrade button to return to the upgrade screen
    if (clicked == btnUpgrade) {
        upgradeScreen();

    }
    //Call the home button to return to the home screen
    if (clicked == btnHome) {
        screenHome();
    }

    if (clicked == stockButton) {
        stockScreen();
    }

    });
}
//Calling the inital setup function
initalSetup(cash, income, rooms, energy);


//---INCOME---//

// Handles all the income and current cash amount
function nextTurnCash(x,y) {
    income = incomeCheck()
    var oldCash = Number(x)
    oldCash = oldCash + income;
    let cash = String(oldCash);
    let moneyAmount = document.getElementById("moneyAmount").innerHTML;
    document.getElementById("moneyAmount").innerHTML = moneyAmount.replace(moneyAmount, cash);
    return cash;
}

function incomeCheck() {
    var totalQual = qualityCheck() / 2;
    var incomeTotal = totalQual + 1
    let incomeAmount = document.getElementById("incomeAmount").innerHTML;
    document.getElementById("incomeAmount").innerHTML = incomeAmount.replace(incomeAmount, incomeTotal);
    return incomeTotal;
}

function qualityCheck() {
    var tavQuality = 0;

    var lvlQual = [
        {level:"lvl1", qual: 0},
        {level:"lvl2", qual: 2.5},
        {level:"lvl3", qual:5},
        {level:"lvl4", qual:10},
    ]

    if (upgrades) {
        lvlLen = lvlQual.length;
        length = upgrades.length;
        for(var i = 0; i < length; i++) {
            if(upgrades[i].active == "true") {
                for (var k = 0; k < lvlLen; k++ ) {
                    if (upgrades[i].subType == lvlQual[k].level) {
                        tavQuality += lvlQual[k].qual
                        console.log("Tav quality is now " + tavQuality);
                    }
                }
            }
        }
        return tavQuality;
    }
}

//---TURN TICKER---//

// Turn ticker to track the game turns
window.setInterval(function(){
        tick = currentTick;
        const completeTick = 10;

        if (tick < completeTick && flagStatus != "false") {
            currentTick = tick + 1;
            turnBar(currentTick, completeTick)
            console.log(tick)
            console.log(activeScreen)


        }
        else if(tick = completeTick && flagStatus != "false") {
        console.log("I have made a full turn")
        cash = nextTurnCash(cash, income)
        currentTick = 0;
        }
        else {
            console.log("I am paused like a basic bitch")
        }
}, 1000);
// Turn progress bar setup
function turnBar(x, y) {
    const turnBar = document.getElementById("turnBarProgress");

    let turnBarProgress = currentTick * 10 ;
    const completeTick = y * 10;


    if (turnBarProgress < completeTick) {
        turnBarProgress += 10;
        console.log(turnBarProgress)
        turnBar.style.width = turnBarProgress + '%';

    }

    else if( turnBarProgress >= completeTick) {
        turnBar.style.width = '0%';
    }
}

//---SCREEN CHANGES---//

// Switches to the home screen
function screenHome() {
    screenClear()
    activeScreen = "screenHome";

    let screenHome = document.getElementById("screenHome");
    let tavDescription = document.getElementById("tavDesc")


    let tavUpgStr = upgradeDescCheck();

    let tavDescStr = 'You take a keen look at your tavern. ' + tavUpgStr;
    tavDescription.innerText = tavDescStr;

    screenHome.style.display = "block";
    tavDescription.style.visibility = "visible";
    tavDescription.style.display = "block";
}

// Switches to the upgrade screen
function upgradeScreen() {
    //Hide prior screen
    screenClear()
    //Change the active screen
    activeScreen = "upgradeScreen";

    //Remove old upgrade screens
    const removeOldUpg =  document.getElementById("upgradeScreen");
    removeOldUpg.remove();

    //Creates new updated screen
    const upgradeScreen = document.createElement("div")
    upgradeScreen.setAttribute("class", "upgradeScreen")
    upgradeScreen.setAttribute("id", "upgradeScreen")
    document.getElementById("screenBox").appendChild(upgradeScreen)

    //Creates new divs in upgrade screen
    const upgradeScreenMainPanel = document.createElement("div")
    const upgradeScreenSidePanel = document.createElement("div")

    upgradeScreenMainPanel.setAttribute("class", "upgradeScreenMainPanel")
    upgradeScreenMainPanel.setAttribute("id", "upgradeScreenMainPanel")

    upgradeScreenSidePanel.setAttribute("class", "upgradeScreenSidePanel")
    upgradeScreenSidePanel.setAttribute("id", "upgradeScreenSidePanel")

    document.getElementById("upgradeScreen").appendChild(upgradeScreenMainPanel)
    document.getElementById("upgradeScreen").appendChild(upgradeScreenSidePanel)


// Sets the length variable so the for loops know how much to loop through
    length = upgrades.length;
    currentType = 'none'
    let currentDiv = 'none'
// Creates a div for each type of the array
    for (var i = 0; i < length; i++) {
        if(upgrades[i].type != currentType) {
            currentType = upgrades[i].type
            currentDiv = document.createElement("div")
            currentDiv.setAttribute("class", "currentDiv")
            upgradeScreenMainPanel.appendChild(currentDiv);
        }
// Checks to see if the type is already active and sets their class accordingly
        if(upgrades[i].active == "true") {
            let upgradeBtn = document.createElement('button');
            upgradeBtn.addEventListener('click', (upgBtn) => {
                console.log(upgradeBtn);
                });
            upgradeBtn.setAttribute("class", "upgradeScreenBtnActive")
            upgradeBtn.innerText = upgrades[i].name;
            currentDiv.appendChild(upgradeBtn);
        }
// Checks to see if the type is not already active and sets their class accordingly
        if(upgrades[i].active == "false") {
            let upgradeBtn = document.createElement('button');
            let subtype = upgrades[i].subType;
            let type = upgrades[i].type


            upgradeBtn.addEventListener('click', (upgBtn) => {
                var btnClicked = upgBtn.target;
                console.log(btnClicked);
                upgradeCheck(type, subtype, btnClicked);
                });

            upgradeBtn.setAttribute("class", "upgradeScreenBtn")
            upgradeBtn.innerText = upgrades[i].name;
            currentDiv.appendChild(upgradeBtn);
        }
// Checks to see if the type was previously active and sets their class accordingly
        if(upgrades[i].active == "depreciated") {
            let upgradeBtn = document.createElement('button');
            let subtype = upgrades[i].subType;
            let type = upgrades[i].type


            upgradeBtn.addEventListener('click', (upgBtn) => {
                var btnClicked = upgBtn.target;
                console.log(btnClicked);
                });

            upgradeBtn.setAttribute("class", "upgradeScreenBtnDep")
            upgradeBtn.innerText = upgrades[i].name;
            currentDiv.appendChild(upgradeBtn);
        }
    }
    // Displays the newly updated screen
    upgradeScreen.style.display = "flex";
    qualityCheck()
    incomeCheck()
}
// Displays the stock screen
function stockScreen() {
     //Hide prior screen
     screenClear()
     activeScreen = "stockScreen";

      //Remove old upgrade screens
    const removeOldStock =  document.getElementById("stockScreen");
    removeOldStock.remove();

    //Creates new updated screen
    const stockScreen = document.createElement("div")
    stockScreen.setAttribute("class", "stockScreen")
    stockScreen.setAttribute("id", "stockScreen")
    document.getElementById("screenBox").appendChild(stockScreen)
    //Creates the sidePanel and mainDiv
    var stockScreenSidePanel = document.createElement("div")
    var stockScreenMain = document.createElement("div")

    stockScreenSidePanel.setAttribute("id", "stockScreenSidePanel")
    stockScreenSidePanel.setAttribute("class", "stockScreenSidePanel")

    stockScreenMain.setAttribute("id", "stockScreenMain")
    stockScreenMain.setAttribute("class", "stockScreenMain")


    stockScreen.appendChild(stockScreenSidePanel);
    stockScreen.appendChild(stockScreenMain);

    //Sets up the inner divs for the side panel
    localMarketDiv = document.createElement("div");
    ServingDiv = document.createElement("div");
    localMarketDiv.innerText = "Local Market";
    ServingDiv.innerText = "Currently Serving";

    stockScreenSidePanel.appendChild(localMarketDiv);
    stockScreenSidePanel.appendChild(ServingDiv);

    //sets up the inner divs for the main panel
    regionalMarketDiv = document.createElement("div");
    stockDiv = document.createElement("div");
    regionalMarketDiv.innerText = "Regional Market";
    stockDiv.innerText = "Storage";

    stockScreenMain.appendChild(regionalMarketDiv);
    stockScreenMain.appendChild(stockDiv);

    stockScreen.style.display = "flex";

}


// Clear the current screen for the new one
function screenClear() {
    let screenOld = document.getElementById(activeScreen);
    screenOld.style.display = 'none';
}


//---UPGRADES---//

function upgradeDescCheck() {
    let fullDesc = ' ';
    if (upgrades) {
        length = upgrades.length;
        for(var i = 0; i < length; i++) {
            if(upgrades[i].active == "true") {
                console.log("Current upgrades are " + upgrades[i].name)
                fullDesc += ' ';
                fullDesc += upgrades[i].desc;
            }
        }
    }
    return fullDesc;
}
// Checks to see what you are upgrading to and if you can afford it / prior upgrades have already been completed
function upgradeCheck(x, y, z) {
    let clicked = z;
    let selectedUpgradeType = x;
    let selectedUpgradeSubType = y;
    let length = upgrades.length;

    for(let i = 0; i < length; i++) {
        if (upgrades[i].type == selectedUpgradeType && upgrades[i].subType == selectedUpgradeSubType) {
            console.log(upgrades[i].name);
           var cost = parseInt(upgrades[i].cost)
            if (upgrades[i].active == "false" && upgrades[i - 1].active != "false" && cash >= cost) {
                console.log("You have" + cash);
                console.log("You bought " + upgrades[i].name)
                upgrades[i].active = "true";
                upgrades[i - 1].active = "depreciated";
                console.log(upgrades[i - 1].name + " is now " + upgrades[i - 1].active)
                clicked.setAttribute("class", "upgradeScreenBtnActive");
                cash = cash - upgrades[i].cost;
                let moneyAmount = document.getElementById("moneyAmount").innerHTML;
                document.getElementById("moneyAmount").innerHTML = moneyAmount.replace(moneyAmount, cash);
                upgradeScreen()
            }
        }
    }
}

// Array of upgrades
let upgrades = [
    //Floor Upgrades
        { type: "floorUpg", subType: "lvl1", name: 'Cracked Wooden Floors', desc: "The floors are primarily rotten wood, with cracks and small crevices making their way across it like small canyons.", active: "true", cost: "0" },
        { type: "floorUpg", subType: "lvl2",  name: 'Wooden Floors', desc: "The floors are primarily made of plain wood.", active: "false", cost: "50"},
        { type: "floorUpg", subType: "lvl3",  name: 'Good Wooden Floors', desc: "The floors are primarily rotten wood, with cracks and small crevices making their way across it like small canyons.", active: "false", cost: "100"},
        { type: "floorUpg", subType: "lvl4",  name: 'Noble Wooden Floors', desc: "The floors are primarily rotten wood, with cracks and small crevices making their way across it like small canyons.", active: "false", cost: "200"},

    //Ceiling Upgrades
        { type:"ceilingUpg", subType: "lvl1",  name: "Broken Ceiling", desc: "The ceiling is broken in multiple places, with a barely boarded up hole on the north side of the roof letting in the elements.", active: "true", cost: "0"},
        { type:"ceilingUpg", subType: "lvl2",  name: "Patched Ceiling", desc: "The ceiling is mostly together, with patches thrown here and there.", active: "false", cost: "50"},
        { type:"ceilingUpg", subType: "lvl3",  name: "Normal Ceiling", desc: "The ceiling is broken in multiple places, with a barely boarded up hole on the north side of the roof letting in the elements.", active: "false", cost: "100"},
        { type:"ceilingUpg", subType: "lvl4",  name: "Noble Ceiling", desc: "The ceiling is broken in multiple places, with a barely boarded up hole on the north side of the roof letting in the elements.", active: "false", cost: "200"},

    //Chair/Table Upgrades
        { type:"chairTblUpg", subType: "lvl1", name: "Rotting Furniture", desc: "Dusty rotted chairs are huddled around shaky tables, like monks gathered in a state of permant vigil.", active: "true", cost: "0"},
        { type:"chairTblUpg", subType: "lvl2", name: "Plain Furniture", desc: "Dusty rotted chairs are huddled around shaky tables, like monks gathered in a state of permant vigil.", active: "false", cost: "50"},
        { type:"chairTblUpg", subType: "lvl3", name: "Normal Furniture", desc: "Dusty rotted chairs are huddled around shaky tables, like monks gathered in a state of permant vigil.", active: "false", cost: "100"},
        { type:"chairTblUpg", subType: "lvl4", name: "Noble Furniture", desc: "Dusty rotted chairs are huddled around shaky tables, like monks gathered in a state of permant vigil.", active: "false", cost: "200"},

    //Bar Upgrades
        { type:"barUpg", subType: "lvl1", name: "Decrepit Bar", desc: "A small workbench with some stools gathered in front of it sits in the back. You'd hardly recognize what is supposed to be the bar if it wasn't for the small shelves of booze behind it.", active: "true", cost: "0"},
        { type:"barUpg", subType: "lvl2", name: "Plain Bar", desc: "A small workbench with some stools gathered in front of it sits in the back. You'd hardly recognize what is supposed to be the bar if it wasn't for the small shelves of booze behind it.", active: "false", cost: "50"},
        { type:"barUpg", subType: "lvl3", name: "Normal Bar", desc: "A small workbench with some stools gathered in front of it sits in the back. You'd hardly recognize what is supposed to be the bar if it wasn't for the small shelves of booze behind it.", active: "false", cost: "100"},
        { type:"barUpg", subType: "lvl4", name: "Noble Bar", desc: "A small workbench with some stools gathered in front of it sits in the back. You'd hardly recognize what is supposed to be the bar if it wasn't for the small shelves of booze behind it.", active: "false", cost: "200"},

    //Lighting Upgrades
        {type:"lightUpg", subType: "lvl1", name: "Weak Candles", desc: "The walls dance with the dim flicker of candle light. Its hard to make out much beyond whats immediately in front of you, which might be for the best in this case.", active: "true", cost: "0"},
        {type:"lightUpg", subType: "lvl2", name: "Plain Candles", desc: "The walls dance with the dim flicker of candle light. Its hard to make out much beyond whats immediately in front of you, which might be for the best in this case.", active: "false", cost: "50"},
        {type:"lightUpg", subType: "lvl3", name: "Good Candles", desc: "The walls dance with the dim flicker of candle light. Its hard to make out much beyond whats immediately in front of you, which might be for the best in this case.", active: "false", cost: "100"},
        {type:"lightUpg", subType: "lvl4", name: "Noble Candles", desc: "The walls dance with the dim flicker of candle light. Its hard to make out much beyond whats immediately in front of you, which might be for the best in this case.", active: "false", cost: "200"},
]


