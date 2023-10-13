class Domain {
    constructor() {
        this.types = {
            objects: {
                Location: 'Location',
                Bot: 'Bot',
            },
        };
        this.predicates = {
            atLoc: this.atLoc, 
            nextTo: this.nextTo, 
            visited: this.visited
        };
        this.actions = {
            MOVE: this.MOVE
        };
    }

    // Predicates
    atLoc(bot, loc) {
        return `atLoc ${bot} ${loc}`;
    }

    nextTo(locA, locB) {
        return `nextTo ${locA} ${locB}`;
    }

    visited(loc) {
        return `visited ${loc}`;
    }

    // Actions
    MOVE(currState, bot, locFrom, locTo) {
        console.log(this)
        // Type checks
        if (
            !(bot.type == "Bot" &&
            locFrom.type == "Location" &&
            locTo.type == "Location"
        )) {
            return {};
        }

        // Preconditions
        if (
            !(
                currState[`atLoc ${bot} ${locFrom}`] &&
                currState[`nextTo ${locFrom} ${locTo}`]
            )
        ) {
            return {};
        }

        // Effect
        let effects = {};

        // Deletions
        effects[`atLoc ${bot} ${locFrom}`] = false;

        // Additions
        effects[this.visited(locTo)] = true;
        effects[this.atLoc(bot, locTo)] = true;

        return effects;
    }
}

class PDDLObject {
    constructor(name, type) {
        this.name = name
        this.type = type
    }

    toString() {
        return this.name
    }
}

export { Domain, PDDLObject };
