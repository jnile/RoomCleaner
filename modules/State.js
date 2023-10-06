const TileStates = {
    empty: "empty",
    obstacles: "obstacles",
    bot: "bot",
    visited: "visited",
}

const Moves = {
    North: "North",
    East: "East",
    South: "South",
    West: "West",
    Stop: "Stop"
}

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

export {State, TileStates, Moves}