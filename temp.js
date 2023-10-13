actionMove(currState, bot, locFrom, locTo) {
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