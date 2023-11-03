import {Domain, PDDLObject} from './Domain.js';

class Problem {
    constructor(width, height, worldMap) {
        this.domain = new Domain()
        this.state = {}
        this.goal = {}
        this.objects = {}
        this.solution = []

        this.generateInitialState(width, height, worldMap)
        this.generateGoalState(width, height, worldMap)
    }

    generateInitialState(width, height, worldMap) {
        //Instantiate all PDDL Objects
        //Naming scheme is set for this specific problem however you can auto generate random text for names with exceptions and checks of course
        //Generate Robot
        this.objects['robot'] = new PDDLObject('robot', this.domain.types.objects.Bot)

        //Generate Locations
        let botCoords;
        for(let y = 0; y< height; y++) {
            for (let x = 0; x < width; x++) {
                if(worldMap[y][x] == "obstacles") {
                    continue;
                } else if(worldMap[y][x] == "bot") {
                    botCoords = {x: x, y: y}
                }

                let newObjName = `loc${x}-${y}`
                this.objects[newObjName] = new PDDLObject(newObjName, this.domain.types.objects.Location)
            }
        }

        //Instantiate predicates
        //Add bot has visited current pos
        this.state[this.domain.predicates.visited(this.objects[`loc${botCoords.x}-${botCoords.y}`])] = true
        this.state[this.domain.predicates.atLoc(this.objects['robot'],this.objects[`loc${botCoords.x}-${botCoords.y}`])] = true
        
        //Add in all connections between tiles
        for(let y = 0; y< height; y++) {
            for (let x = 0; x < width; x++) {
                let currLoc = this.objects[`loc${x}-${y}`]
                
                if(currLoc == undefined) {
                    continue
                }
                

                //Check all four sides to see if a location exists
                //East
                if(this.objects[`loc${x+1}-${y}`] != undefined) {
                    this.state[this.domain.predicates.nextTo(currLoc, this.objects[`loc${x+1}-${y}`])] = true
                }
                //West
                if(this.objects[`loc${x-1}-${y}`] != undefined) {
                    this.state[this.domain.predicates.nextTo(currLoc, this.objects[`loc${x-1}-${y}`])] = true
                }
                //North
                if(this.objects[`loc${x}-${y-1}`] != undefined) {
                    this.state[this.domain.predicates.nextTo(currLoc, this.objects[`loc${x}-${y-1}`])] = true
                }
                //South
                if(this.objects[`loc${x}-${y+1}`] != undefined) {
                    this.state[this.domain.predicates.nextTo(currLoc, this.objects[`loc${x}-${y+1}`])] = true
                }
            }
        }

        //Initial state Generated
        console.log("[Problem] Initial State Generated")
    }

    generateGoalState(width, height, worldMap) {
        //Goal state must have all locations visisted
        let allObjNames = Object.keys(this.objects)

        for(let i = 0; i < allObjNames.length; i++) {
            if(this.objects[allObjNames[i]].type == this.domain.types.objects.Location) {
                this.goal[this.domain.predicates.visited(this.objects[allObjNames[i]])] = true
            }
        }
        console.log("[Problem] Goal State Initiated")
    }
}

export { Problem }