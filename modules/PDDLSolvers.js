class PDDL_Solver {
    constructor(problem) {
        this.problem = problem;
        this.stateHistory = [this.problem.state]
        this.actionHistory = []
    }

    getPossibleMoves() {
        let possibleActions = []

        //get a list of all objects for each type of object
        let allObjs = {}

        let objTypes = Object.keys(this.problem.domain.types.objects)
        let currObjsKeys = Object.keys(this.problem.objects)

        for(let i = 0; i < currObjsKeys.length; i++) {
            let currObj = this.problem.objects[currObjsKeys[i]]
            
            if(allObjs[currObj.type] == undefined) {
                allObjs[currObj.type] = [currObj]
            } else {
                allObjs[currObj.type].push(currObj)
            }
        }

        console.log(allObjs)

        //Since we only have 1 possible action, to make it simple, I will simply code it for that
        //Typically for each possible action check all combinations that are possible
        let currBot = allObjs[this.problem.domain.types.objects.Bot][0]
        let locObjs = allObjs[this.problem.domain.types.objects.Location]
        let currState = this.stateHistory[this.stateHistory.length-1]

        //for each possible combination of loc, loc (no bot since there is only 1 bot obj)
        for(let i = 0 ; i < locObjs.length; i++) {
            for(let j = 0 ; j < locObjs.length; j++) {
                //Check if this move is possible
                let parameters = [currBot, locObjs[i], locObjs[j]]
                let effects = this.problem.domain.MOVE(currState, parameters[0], parameters[1], parameters[2])
                if (Object.keys(effects).length > 0) {
                    possibleActions.push({
                        parameters: parameters,
                        action: this.problem.domain.MOVE,
                        effects: effects
                    })
                }
            }
        }

        console.log(possibleActions)
    }
}


export {PDDL_Solver}