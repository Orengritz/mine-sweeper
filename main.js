'use strict'

var gBoard = []

var MINE = 'B'
var EMPTY = ''
var NUM = 'num'

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
    // // This is called when page loads
    // function initGame()
    buildBoard(gBoard)
    // console.table(gBoard)
    // console.log(gBoard)
    renderBoard(gBoard)
}


// gBoard = buildBoard()
// Builds the board
// Set mines at random locations
// Call setMinesNegsCount()
// Return the created board
function buildBoard() {

    // DONE: Create the Matrix 10 * 12
    // DONE: Put FLOOR everywhere and WALL at edges
    const size = gLevel.SIZE

    for (var i = 0; i < size; i++) {
        gBoard[i] = []
        for (var j = 0; j < size; j++) {
            gBoard[i][j] = {
                minesAroundCount: null,
                isShown: false,
                isMine: false,
                isMarked: true,

            }

            if (i === 1 && j === 0 || i === 3 && j === 2) {
                gBoard[i][j].isMine = true

            }
            gBoard[i][j].minesAroundCount = setMinesNegsCount(gBoard, i, j)

        }
    }
}
console.log(gBoard);



// // ) Count mines around each cell
// // and set the cell's
// // minesAroundCount.

function setMinesNegsCount(board, celli, cellj) {
    var negs = []

    for (var i = celli - 1; i <= celli + 1; i++) {
        if (i < 0 || i >= gLevel.SIZE) continue
        for (var j = cellj - 1; j <= cellj + 1; j++) {
            if (i === celli && j === cellj) continue
            if (j < 0 || j >= gLevel.SIZE) continue
            negs.push({ i: i, j: j })
        }
    }
    return negs
}


// // Render the board as a <table>
// // to the page
function renderBoard(board) {
    var strHTML = ''
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < board[0].length; j++) {
            var currCell = board[i][j]

            if (currCell.isMine) {

                strHTML += `<td data-i="${i}" data-j="${j}" onclick="onCellClicked(this, ${currCell})" >${MINE}</td>`
            }
            else strHTML += `<td data-i="${i}" data-j="${j}" onclick="onCellClicked(this, ${currCell})" >${''}</td>`

        }

        strHTML += '</tr>'
    }
    const elBoard = document.querySelector('.board')
    elBoard.innerHTML += strHTML
}


// // Game ends when all mines are
// // marked, and all the other cells
// // are shown
// function cellClicked(elCell, i, j)



// When user clicks a cell with no
// mines around, we need to open
// not only that cell, but also its
// neighbors.
// NOTE: start with a basic
// implementation that only opens
// the non-mine 1st degree
// neighbors
// BONUS: if you have the time
// later, try to work more like the
// real algorithm (see description
// at the Bonuses section below)
// function expandShown(board, elCell,
//     i, j) {



// }


