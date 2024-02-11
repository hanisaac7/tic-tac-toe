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

            if (row.every((field) => field === 'X')) {
                gameController.winnerStatus = true
                gameController.endGame()
                break;
            } else if (row.every((field) => field === 'O')) {
                gameController.winnerStatus = true
                gameController.endGame()
                break;
            } else 

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
            
            if (column.every((field) => field === 'X')) {
                gameController.winnerStatus = true
                gameController.endGame()
                break;
            } else if (column.every((field) => field === 'O')) {
                gameController.winnerStatus = true
                gameController.endGame()
                break;
            } else

            column = []
        }
    }  

    function diagonal() {
        let diagonal = []
        for (let i = 0; i < 2; i++) {
            for (let j = i * 2; j < 9; j += 6){
                diagonal.push(boxValue[j])
            }
            console.log('Diagonal: ' + diagonal)

            if (diagonal.every((field) => field === 'X' && gameboard.copyBoard()[4] === 'X')) {
                gameController.winnerStatus = true
                gameController.endGame()
                break;
            } else if (diagonal.every((field) => field === 'O' && gameboard.copyBoard()[4] === 'O')) {
                gameController.winnerStatus = true
                gameController.endGame()
                break;
            }
            diagonal = []
        }
    }

    function tie() {
        if (gameController.winnerStatus === false && gameboard.copyBoard().every((field) => field !== '')) {
            console.log('Tie')
        } else if (gameController.winnerStatus = true) {
            console.log('Game Over')
        }
    }
    
    return {row, column, diagonal, tie}
})()

let playerOne = player('Isaac', 'X')
let playerTwo = player('Angela', 'O')
gameController.initialize(playerTwo)


const display = (() => {
    let square = document.getElementById("square")
    function displayMarker(index) {
        /* create display element on HTML or through this js method */
        square.innerText = gameboard.getBoard()[index]
        console.log(square.innerText)
    }
    console.log(square)
    return {displayMarker}
})()