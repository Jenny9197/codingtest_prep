"use strict"

window.addEventListener('load', app);

let gameBoard = ['', '', '', '', '', '', '', '', ''];
let turn = 0;
let winner = false;

//CREATE PLAYER
const player = (name) => {
    name = name;
    return { name };
};

let playerX = player("");
let playerY = player("");

//INITIALIZING APP
function app() {
    let inputField = document.querySelector('.input-field').focus();
    const addPlayerForm = document.getElementById('player-form');
    addPlayerForm.addEventListener('submit', addPlayers);
    let replayButton = document.querySelector('.replay-btn');
    replayButton.addEventListener('click', resetBoard);
}

//ADD PLAYERS
function addPlayers(event) {
    event.preventDefault();
    if (this.player1.value === '' || this.player2.value === '') {
        alert('You must enter a name for each field');
        return;
    }

    const playerFormContainer = document.querySelector('.enter-players');
    const boardMain = document.querySelector('.board_main');
    playerFormContainer.classList.add('hide-container');
    boardMain.classList.remove('hide-container');

    playerX.name = this.player1.value;
    playerY.name = this.player2.value;
    buildBoard();
}

//RETURN CURRENT PLAYER
function currentPlayer() {
    return turn % 2 === 0 ? 'X' : 'O';
}

//Resize squares in event browser is resized
window.addEventListener("resize", onResize);

function onResize() {
    let allCells = document.querySelectorAll('.board__cell');
    let cellHeight = allCells[0].offsetWidth;

    allCells.forEach(cell => {
        cell.getElementsByClassName.height = `${cellHeight}px`;
    });
}

//Build Board
function buildBoard() {
    let resetContainer = document.querySelector('.reset');
    resetContainer.classList.remove('reset--hidden');

    onResize();
    addCellClickListener();
    changeBoardHeaderNames();
}

//CELL CLICK EVENT FOR PLAYER TO ATTEMPT TO MAKE MOVE
function makeMove(event) {
    console.log(turn);

    let currentCell = parseInt(event.currentTarget.firstElementChild.dataset.id);
    let cellToAddToken = document.querySelector(`[data-id='${currentCell}']`);
    if (cellToAddToken.innerHTML !== '') {
        console.log('This cell is already taken.');
        return;
    } else {
        if (currentPlayer() === 'X') {
            cellToAddToken.textContent = currentPlayer();
            gameBoard[currentCell] = 'X';
        } else {
            cellToAddToken.textContent = currentPlayer();
            gameBoard[currentCell] = 'O';
        }
    }


    //WINNER CHECK
    isWinner();

    //UPDATE TURN COUNT SO NEXT PLAYER CAN CHOOSE
    turn++;

    //CHANGE BOARD HEADER INFORMATION
    changeBoardHeaderNames();
}

function checkTie() {
    if (turn > 7) {
        alert('GAMEOVER TIE')
    }
}

function isWinner() {
    const winningSequences = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    winningSequences.forEach(winningCombos => {
        let cellOne = winningCombos[0];
        let cellTwo = winningCombos[1];
        let cellThree = winningCombos[2];
        if (
            gameBoard[cellOne] === currentPlayer() &&
            gameBoard[cellTwo] === currentPlayer() &&
            gameBoard[cellThree] === currentPlayer()
        ) {

            const cells = document.querySelectorAll('.board_cell');
            let letterIdOne = document.querySelector(`[data-id='${cellOne}']`);
            let letterIdTwo = document.querySelector(`[data-id='${cellTwo}']`);
            let letterIdThree = document.querySelector(`[data-id='${cellThree}']`);

            cells.forEach(cell => {
                let cellId = cell.firstElementChild.dataset.id;

                if (cellId == cellOne || cellId == cellTwo || cellId == cellThree) {
                    cell.classList.add('board__cell--winner');
                }
            });

            let currentPlayerText = document.querySelector('.board__player-turn');
            if (currentPlayer() === 'X') {
                currentPlayerText.innerHTML = `
                <div class = "congratulations">Congratulations ${playerX.name}</div>
                <div class = "u-r-winner">You are our winner!</div>
            `;
                winner = true;
                removeCellClickListener();
                return true;
            }
        }
    });

    if (!winner) {
        checkTie();
    }

    return false;
}

function changeBoardHeaderNames() {
    if (!winner) {
        let currentPlayerText = document.querySelector('.board___player-turn');
        if (currentPlayer() === 'X') {
            currentPlayerText.innerHTML = `
        <span class="name--style">${playerX.name}</span>, you are up!
        <div class="u-r-winner"></div>
        `
        } else {
            currentPlayerText.innerHTML = `
        <span class="name--style">${playerY.name}</span>, you are up.
        <div class="u-r-winner"></div>
        `
        }
    }
}

function resetBoard() {
    console.log('resetting');

    gameBoard = ['', '', '', '', '', '', '', '', ''];

    let cellToAddToken = document.querySelectorAll('.letter');
    cellToAddToken.forEach(square => {
        square.textContent = '';
        square.parentElement.classList.remove('board__cell--winner');
    });

    turn = 0;
    winner = false;

    let currentPlayerText = document.querySelector('.board___player-turn');
    currentPlayerText.innerHTML = `
    <span class="name--style">${playerX.name}</span>, you are up!
    <div class="u-r-winner"></div>
    `

    addCellClickListener();
}

function addCellClickListener() {
    const cells = document.querySelectorAll('.board__cell');
    cells.forEach(cell => {
        cell.addEventListener('click', makeMove);
    });
}

function removeCellClickListener() {
    let allCells = document.querySelectorAll('.board__cell');
    allCells.forEach(cell => {
        cell.removeEventListener('click', makeMove);
    });
}