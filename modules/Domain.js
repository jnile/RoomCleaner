class Domain {
    constructor() {
        this.state = {}
        this.types = {
            object: [Location, Bot]
        }
        this.predicates = [
            atLoc,
            nextTo,
            visited
        ]
        this.actions = []
    }

    //Predicates
    atLoc(bot, loc) {
        this.state[`atLoc ${bot} ${loc}`] = true
    }

    nextTo(locA, locB) {
        this.state[`nextTo ${locA} ${locB}`] = true
    }

    visited(loc) {
        this.state[`visited ${loc}`] = true
    }

    //Actions
    MOVE(bot,locFrom,locTo) {
        //Preconditions
        if(!(this.state[`atLoc ${bot} ${locFrom}`]
            && this.state[`nextTo ${locFrom} ${locTo}`])) {
            return false
        }

        //Effect
        //Deletions
        this.state[`atLoc ${bot} ${locFrom}`] = false
        //Additions
        this.visited(locTo)
        this.atLoc(bot, locTo)
        return true
    }
}

class Location {
    constructor(name) {
        this.name = name
    }
}

class Bot {
    constructor(name) {
        this.name = name
    }
}

module.exports = {Domain}