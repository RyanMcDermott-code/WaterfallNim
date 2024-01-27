let currentPlayer = 1;
let board = [];
let playerNames = [];
let activeRow = null;

function startGame() {
    activeRow = null;
    playerNames[0] = "test1"
    //prompt("Enter name for Player 1") || 'Player 1';
    playerNames[1] = "test"
    //prompt("Enter name for Player 2") || 'Player 2';

    let difficulty = "Medium"
    //prompt("Choose difficulty: Easy, Medium, Hard") || 'Easy';
    initializeBoard(difficulty);
    updateBoardDisplay();
}

function initializeBoard(difficulty) {
    switch(difficulty) {
        case "Easy":
            board = [1, 3, 5];
            break;
        case "Medium":
            board = [1, 3, 5, 7];
            break;
        case "Hard":
            board = [3, 5, 7, 9, 11];
            break;
    }
}

function updateBoardDisplay() {
    let boardHtml = '';
    for (let i = 0; i < board.length; i++) {
        boardHtml += '<div class="row">';
        boardHtml += '<button class="remove-match" onclick="removeMatch(' + i + ')">Row ' + (i+1) + ': Remove Match</button>';
        for (let j = 0; j < board[i]; j++) {
            boardHtml += '<img class="matchstick" src="../assets/matchstick_tip.png" alt="matchstick"> ';
        }
        boardHtml += '</div>';
    }
    document.getElementById('gameBoard').innerHTML = boardHtml;
}



function removeMatch(row) {
    if (activeRow !== null && activeRow !== row) {
        alert("You can only remove matches from the same row or end your turn.");
        return;
    }

    if (board[row] > 0) {
        board[row]--;
        activeRow = row;
        updateBoardDisplay();

        if (checkWin()) {
            console.log(playerNames[currentPlayer - 1] + " wins!");
            let restart = confirm("Would you like to play again?");
            if (restart) {
                startGame();
            }
        }
    }
}

function checkWin() {
    for (let i = 0; i < board.length; i++) {
        if (board[i] > 0) {
            return false;
        }
    }
    alert(playerNames[currentPlayer - 1] + " wins!");
    return true;
}

function endTurn() {
    activeRow = null;
    currentPlayer = 3 - currentPlayer;
}

window.onload = function() {
    startGame();
}