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

