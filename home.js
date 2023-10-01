//Classes
class State {
    constructor(tilesArr) {
        this.map = tilesArr
        this._parseEnteredData()
    }

    _parseEnteredData() {
        //Parse the entered map data to extract relevant world data
        this.noOfEmpties = 0;

        for(let y = 0; y < this.map.length; y++) {
            for(let x = 0; x < this.map[y].length; x++) {
                let currTile = this.map[y][x]

                if(currTile == TileStates.empty) {
                    this.noOfEmpties += 1
                } else if(currTile == TileStates.bot) {
                    //Check if this is the bot tile
                    this.bot = {x,y}
                    this.possibleMoves = []

                    //Check for possible moves in all four directions
                    if ((y-1 > -1) && [TileStates.empty, TileStates.visited].includes(this.map[y-1][x])) {
                        //North
                        this.possibleMoves.push(Moves.North)
                    }

                    if ((y+1 < this.map.length) && [TileStates.empty, TileStates.visited].includes(this.map[y+1][x])) {
                        //South
                        this.possibleMoves.push(Moves.South)
                    }

                    if ((x+1 < this.map[y].length) && [TileStates.empty, TileStates.visited].includes(this.map[y][x+1])) {
                        //East
                        this.possibleMoves.push(Moves.East)
                    }

                    if ((x-1 > -1) && [TileStates.empty, TileStates.visited].includes(this.map[y][x-1])) {
                        //West
                        this.possibleMoves.push(Moves.West)
                    }

                    //If no moves are possible, then add the stop move
                    if(this.possibleMoves.length == 0) {
                        this.possibleMoves.push(Moves.Stop)
                    }
                }
            }
        }

        if(this.noOfEmpties == 0) {
            this.goalStateReached = true
            this.possibleMoves = [Moves.Stop]
        } else {
            this.goalStateReached = false
        }
    }

    //Getter Function

    getValFromMap(x,y) {
        return this.map[y][x]
    }

    getBotData() {
        return this.bot
    }

    getPossibleMoves() {
        return this.possibleMoves
    }

    getReachedGoalState() {
        return this.goalStateReached
    }

    printAllStateData() {
        console.log("State Data")
        console.log("Bot Data", this.bot)
        console.log("Possible Moves", this.possibleMoves)
        console.log("No of Empty Tiles", this.noOfEmpties)
        console.log("Reached Goal State", this.goalStateReached)
        console.log("World Data", this.map)
    }

    //Setter Functions
    setValInMap(newVal,x,y) {
        this.map[y][x] = newVal
    }

    move(direction) {
        if(this.possibleMoves.includes(direction) == false) {
            return "Err"
        }

        if(direction == Moves.Stop) {
            if(this.goalStateReached) {
                return "Goal State Reached"
            } else {
                return "No more moves"
            }
        } else if(direction == Moves.North) {
            this.setValInMap(TileStates.visited,this.bot.x,this.bot.y) 
            this.setValInMap(TileStates.bot,this.bot.x,this.bot.y-1) 
        } else if(direction == Moves.East) {
            this.setValInMap(TileStates.visited,this.bot.x,this.bot.y) 
            this.setValInMap(TileStates.bot,this.bot.x+1,this.bot.y) 
        } else if(direction == Moves.South) {
            this.setValInMap(TileStates.visited,this.bot.x,this.bot.y) 
            this.setValInMap(TileStates.bot,this.bot.x,this.bot.y+1) 
        } else if(direction == Moves.West) {
            this.setValInMap(TileStates.visited,this.bot.x,this.bot.y) 
            this.setValInMap(TileStates.bot,this.bot.x-1, this.bot.y)
        }

        this._parseEnteredData()
        return this
    }
}

class RandomAgent {

    makeMove(state) {
        //check each possible move
        let possibleMoves = state.getPossibleMoves()
        let chosenMove = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
        return state.move(chosenMove)
    }
}

let TileStates = {
    empty: "empty",
    obstacles: "obstacles",
    bot: "bot",
    visited: "visited",
}

let Moves = {
    North: "North",
    East: "East",
    South: "South",
    West: "West",
    Stop: "Stop"
}




let gridEl = document.querySelector('.grid-display')
let nextBtn = document.getElementById('nextBtn')

//Menu Elements
let widthInput = document.getElementById("width-input")
let heightInput = document.getElementById("height-input")
let currWidth, currHeight;


let tileOptions = ["empty", "obstable", "bot"]
let containsBot = false;

let currState;
let agent = new RandomAgent()

//World generation
function generateNewWorld(width, height) {
    currState = {}
    containsBot = false;
    currWidth = width;
    currHeight = height
    gridEl.innerHTML = ""

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
}

function startBotOnClick() {
    if(containsBot == false) {
        console.log("No bot")
        return
    }

    let allTiles = document.getElementsByClassName("tile")
    
    for(let i = 0; i < allTiles.length; i++) {
        allTiles[i].removeEventListener("click", tileOnClick)
    }

    createInitialState()
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