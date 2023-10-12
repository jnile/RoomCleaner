import {RandomAgent} from './modules/Agents.js'
import {State, Moves, TileStates} from './modules/State.js'
import {Problem} from './modules/Problem.js'

let gridEl = document.querySelector('.grid-display')

let nextBtn = document.getElementById('nextBtn')
let beginRunBtn = document.getElementById('beginRunBtn')
let setWorldBtn = document.getElementById('setWorldBtn')

//Menu Elements
let widthInput = document.getElementById("width-input")
let heightInput = document.getElementById("height-input")
let currWidth, currHeight;


let tileOptions = ["empty", "obstable", "bot"]
let containsBot = false;

let currState;
let agent = new RandomAgent()
let currProblem;

//Add OnClick Event listeners
beginRunBtn.addEventListener("click", startBotOnClick)
setWorldBtn.addEventListener("click", setWorldOnClick)


//World generation
function generateNewWorld(width, height) {
    currState = {}
    containsBot = false;
    currWidth = width;
    currHeight = height;
    gridEl.innerHTML = "";

    gridEl.style.setProperty("--columns", width)
    gridEl.style.setProperty("--rows", height)

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            let newTile = createTile(x,y)
            newTile.addEventListener("click", tileOnClick)
            gridEl.appendChild(newTile)
        }
    }
}

function createTile(x,y) {
    let tile = document.createElement("div")

    tile.classList.add("tile")
    tile.classList.add("empty")
    tile.id = `tile-${x}-${y}`

    return tile
}

function tileOnClick(e) {
    let tile = e.target

    if(tile.classList.contains("empty")) {
        tile.classList.remove("empty")
        tile.classList.add("obstacles")
        
    } else if(tile.classList.contains("obstacles")){
        tile.classList.remove("obstacles")
        if(containsBot == false) {
            tile.classList.add("bot")
            containsBot = true
        } else {
            tile.classList.add("empty")
        }
    } else {
        tile.classList.remove("bot")
        tile.classList.add("empty")
        containsBot = false
    }
}

function setWorldOnClick() {
    generateNewWorld(widthInput.value, heightInput.value)
    nextBtn.removeEventListener("click", nextFrameOnClick)
}

function startBotOnClick() {
    createProblem()
    if(containsBot == false) {
        console.log("No bot")
        return
    }

    let allTiles = document.getElementsByClassName("tile")
    
    for(let i = 0; i < allTiles.length; i++) {
        allTiles[i].removeEventListener("click", tileOnClick)
    }

    createInitialState()
    nextBtn.addEventListener("click", nextFrameOnClick)
}

function createProblem() {
    //Create world map to know where each item is
    let worldMap = []

    for(let r = 0; r < currHeight; r++) {
        let row = []
        for(let c = 0; c < currWidth; c++) {
            row.push(TileStates.empty)
        }
        worldMap.push(row)
    }

    //Get all tiles
    let allTilesEl = document.getElementsByClassName("tile")
    
    for(let i = 0; i < allTilesEl.length; i++) {
        let tileClassList = allTilesEl[i].classList
        let tileCoords = allTilesEl[i].id.split("-")

        //Convert coordinates from string to int
        tileCoords[1] = parseInt(tileCoords[1])
        tileCoords[2] = parseInt(tileCoords[2])

        //If tile is not empty, set to respective tile state
        if(tileClassList.contains(TileStates.obstacles)) {
            worldMap[tileCoords[2]][tileCoords[1]] = TileStates.obstacles
        } else if (tileClassList.contains(TileStates.bot)) {
            worldMap[tileCoords[2]][tileCoords[1]] = TileStates.bot
        }
    }


    currProblem = new Problem(currWidth, currHeight, worldMap);
    console.log(currProblem)
}

function createInitialState() {    
    //Create Empty World Map
    let emptyWorldMap = []

    for(let r = 0; r < currHeight; r++) {
        let row = []
        for(let c = 0; c < currWidth; c++) {
            row.push(TileStates.empty)
        }
        emptyWorldMap.push(row)
    }

    let allTilesEl = document.getElementsByClassName("tile")
    
    for(let i = 0; i < allTilesEl.length; i++) {
        let tileClassList = allTilesEl[i].classList
        let tileData = allTilesEl[i].id.split("-")

        tileData[1] = parseInt(tileData[1])
        tileData[2] = parseInt(tileData[2])

        //If tile is not empty, set to respective tile state
        if(tileClassList.contains(TileStates.obstacles)) {
            emptyWorldMap[tileData[2]][tileData[1]] = TileStates.obstacles
        } else if (tileClassList.contains(TileStates.bot)) {
            emptyWorldMap[tileData[2]][tileData[1]] = TileStates.bot
        }
    }

    currState = new State(emptyWorldMap)
    
    renderState(currState)
    currState.printAllStateData()
} 

function renderState(stateObj) {
    for(let y = 0; y < currHeight; y++) {
        for(let x = 0; x < currWidth; x++) {
            let tileEl = document.getElementById(`tile-${x}-${y}`)
            tileEl.classList = ["tile"]
            tileEl.classList.add(stateObj.getValFromMap(x,y))
        }
    }
}

function nextFrameOnClick() {
    currState = agent.makeMove(currState)

    if(currState == "Err") {
        nextBtn.onclick = ""
        console.log("Error")
    } else if (currState == "No more moves") {
        nextBtn.onclick = ""
        console.log("No more moves")
    }else if (currState == "Goal State Reached") {
        nextBtn.onclick = ""
        console.log("Goal Reached")
    } else {
        renderState(currState)
    }
}


setWorldOnClick()