class RandomAgent {

    makeMove(state) {
        //check each possible move
        let possibleMoves = state.getPossibleMoves()
        let chosenMove = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
        return state.move(chosenMove)
    }
}

export {RandomAgent}