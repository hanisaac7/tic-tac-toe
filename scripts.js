const gameboard = (() => {
    const board = ['', 'X', 'O', 
                    'X', 'X', 'O', 
                    'X', 'O', 'X']

    function getBoard() {
        return board
    }

    function copyBoard() {
        return [...board]
    }

    function resetBoard() {
        for (let i = 0; i < board.length; i++) {
            board[i] = ''
        }
        console.log(gameboard.copyBoard())
    }

    return {getBoard, copyBoard, resetBoard}
})()

const player = (name, marker) => {
    const playerName = name
    const playerMarker = marker

    const getName = () => playerName
    const getMarker = () => playerMarker

/*  OR 
    const getName = function() {
        return playerName
    }
    const getMarker = function() {
        return playerMarker
    }
*/
    return {getMarker, getName}
}

const gameController = (() => {
    let currentPlayerName;
    let currentPlayerMarker;
    let winnerStatus = false

    function initialize(player) {
        currentPlayerName = player.getName()
        currentPlayerMarker = player.getMarker()
        return { currentPlayerName, currentPlayerMarker }
    }

    function getCurrentPlayer() {
        return {currentPlayerName, currentPlayerMarker}
    }
    
    function switchTurns() {
        if (currentPlayerName == playerOne.getName()) {
            currentPlayerName = playerTwo.getName()
            currentPlayerMarker = playerTwo.getMarker()
            console.log(currentPlayerName + "'s turn")
        } else {
            currentPlayerName = playerOne.getName()
            currentPlayerMarker = playerOne.getMarker()
            console.log(currentPlayerName + "'s turn")
        }
    }

    function markCell(index, currentPlayerMarker) {
        if (gameboard.getBoard()[index] == '') {
            gameboard.getBoard()[index] = currentPlayerMarker
            checkGame.row()
            checkGame.column()
            checkGame.diagonal()
            checkGame.tie()
            console.log(currentPlayerMarker + ' marked')
            switchTurns()
        } else { 
            console.log('Already marked, try again!')
        }
        console.log(gameboard.copyBoard())
    }

    function endGame() {
        console.log(currentPlayerName + " wins")
        gameboard.resetBoard()
    }

    return {initialize, getCurrentPlayer, switchTurns, markCell, endGame, winnerStatus}
})()

const checkGame = (() => {
    let boxValue = gameboard.getBoard()

    function row() {
        let row = []    
        for (let i = 0; i < 3; i++) {
            
            for (let j = i * 3; j < i * 3 + 3; j++) {
                row.push(boxValue[j])
            }
            console.log('Row: ' + row)

            row = []
        }
    }
    
    function column() {
        let column = []
        for (let i = 0; i < 3; i++) {
                
            for (let j = i; j < i + 7; j += 3) {
                column.push(boxValue[j])
            }
            console.log('Column: ' + column)  
            
            column = []
        }
    }  

    

    return {row, column}
})()