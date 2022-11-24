'use strict'
var MINE = '💣'
var EMPTY = ''
var gBoard = []

var gLevel = {
    SIZE: 4,
    MINES: 2
}


var gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0
}
initGame()
function initGame() {
    createBoard()
    mineNgsSet()
    renderBoard(gBoard)
    console.log(gBoard);


}


createBoard()
function createBoard() {
    var size = gLevel.SIZE
    const board = []
    for (var i = 0; i < size; i++) {
        board[i] = []
        for (var j = 0; j < size; j++) {
            board[i][j] = {
                minesAroundCount: 0,
                isShown: false,
                isMine: false,
                isMarked: false
            }

        }
    }
    for (var i = 0; i < gLevel.MINES; i++) {
        board[getRandomInt(0, board.length)][getRandomInt(0, board.length)].isMine = true;
    }
    mineNgsSet()
    gBoard = board

}

// mineNgsSet()
function mineNgsSet() {
    for (var i = 0; i < gBoard.length; i++) {

        for (var j = 0; j < gBoard[0].length; j++) {
            gBoard[i][j].minesAroundCount = setMinesNegsCount(gBoard, i, j)
        }
    }
    // console.log(gBoard);
}








function setMinesNegsCount(board, rowIdx, colIdx) {
    var ngsCount = 0
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i >= board.length) continue
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (j < 0 || j >= board[0].length) continue
            if (i === rowIdx && j === colIdx) continue
            if (board[i][j].isMine) ngsCount++



        }

    }
    return (ngsCount > 0) ? ngsCount : EMPTY
}





// renderBoard(gBoard)

function renderBoard(board) {
    var strHTML = ''
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < board[0].length; j++) {
            var currCell = board[i][j]



            if (currCell.isMine) strHTML += `<td class=mine onclick="cellClicked(this,${i},${j})" >${MINE}</td>`
            if (!currCell.isMine) strHTML += `<td class=cell onclick="cellClicked(this,${i},${j})" >${currCell.minesAroundCount}</td>`


        }

        strHTML += '</tr>'


    }
    const elBoard = document.querySelector('.board')
    elBoard.innerHTML += strHTML
}

function cellClicked(cell, i, j) {
    var elCell = document.querySelector('cell')

    cell.style.backgroundColor = " gray";
    cell.isShown = true
    checkGameOver()
    cell.style.fontSize = '13'
    // console.log(cell);
    gBoard[i][j].isShown = true
    // expandShown(gBoard, elCell, i, j)
    console.log(gBoard);


}


function checkGameOver() {
    var isShownCounter = 0
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard.length; j++) {
            if (gBoard[i][j].isShown) isShownCounter++

        }
        if (isShownCounter === gBoard.length * gBoard.length - gLevel.MINES - 1) console.log('gameover');
    }
}

function expandShown(board, rowIdx, colIdx) {
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i >= board.length) continue
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (i === rowIdx && j === colIdx) continue
            if (j < 0 || j >= board[0].length) continue
            var currCell = board[i][j]
            if (currCell.minesAroundCount === 0) cell.style.backgroundColor = " gray";
        }
    }
}


function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}




