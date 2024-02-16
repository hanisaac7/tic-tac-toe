const gameboard = (() => {
    const board = ['', '', '', 
                    '', '', '', 
                    '', '', '']

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
        if (gameboard.getBoard()[index] === '') {
            gameboard.getBoard()[index] = currentPlayerMarker
            console.log(currentPlayerMarker + ' marked')
        } else { 
            console.log('Already marked, try again!')
        }
        console.log(gameboard.copyBoard())
    }

    function endGame() {
        if (winnerStatus = false) {
            console.log('Nobody wins')
        } else {
            console.log(currentPlayerName + " wins")
        }
        gameboard.resetBoard()
        winnerStatus = false
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
        let diagonalOne = []
        let diagonalTwo = []

        for (let i = 0; i < 9; i += 4) {
            diagonalOne.push(boxValue[i])
        } 
        for (let i = 2; i < 7; i += 2) {
            diagonalTwo.push(boxValue[i])
        }
        
        if (diagonalOne.every((field) => field === 'X')) {
            gameController.winnerStatus = true
            gameController.endGame()
        } else if (diagonalOne.every((field) => field === 'O')) {
            gameController.winnerStatus = true
            gameController.endGame()
        }
    }

    function tie() {
        if (gameController.winnerStatus === false && gameboard.copyBoard().every((field) => field !== '')) {
            console.log('Tie')
        }
    }
    
    function check() {
        row()
        column()
        diagonal()
        tie()
    }
    
    return {check, diagonal}
})()

let playerOne = player('Isaac', 'X')
let playerTwo = player('Angela', 'O')
gameController.initialize(playerTwo)


const display = (() => {
    let squares = document.querySelectorAll(".square")
    let reset = document.getElementById('reset')

    squares.forEach((square, index) => {
        square.addEventListener('click', () => {
            gameController.markCell(index, gameController.getCurrentPlayer().currentPlayerMarker)
            square.innerText = gameboard.getBoard()[index]
            checkGame.check()
            gameController.switchTurns()
        })
    })     

    reset.addEventListener('click', () => {
        gameController.endGame()
        squares.forEach((square, index) => {
            square.innerText = gameboard.getBoard()[index]
        })
    })
    
})()

