const GAME_TABLE_SIZE = Number(sessionStorage.getItem('SIZE'));
const BOMB_COUNT = Number(sessionStorage.getItem('BOMB_COUNT'));

let emptyButtonsCount: number;
let buttons: Button[][];
let gameTable: HTMLElement;

function setup(): void {
    emptyButtonsCount = GAME_TABLE_SIZE * GAME_TABLE_SIZE - BOMB_COUNT;
    initializeGameTable();
    initializeButtons();
    updateEmptyButtonsDisplayer();
}

function initializeGameTable(): void {
    gameTable = document.getElementById('gameTable');
    for (let line: number = 0; line < GAME_TABLE_SIZE; ++line) {
        let rowOfButtons: string = "<tr>";
        for (let col: number = 0; col < GAME_TABLE_SIZE; ++col) {
            let buttonId: number = line * GAME_TABLE_SIZE + col;
            let buttonHTML: string = "<button class=\"gameTableButton\"id=\"button" + buttonId + "\"" + 
            " onclick=\"pressButton(" + buttonId + ")\"></button>";
            rowOfButtons += "<td>" + buttonHTML + "</td>";
        }
        rowOfButtons += "</tr>";
        gameTable.innerHTML += rowOfButtons;
    }
}

function pressButton(buttonId: number): void {
    let line: number = Math.floor(buttonId / GAME_TABLE_SIZE);
    let col: number = buttonId % GAME_TABLE_SIZE;
    buttons[line][col].press();
}

function initializeButtons(): void {
    buttons = new Array();
    for (let line: number = 0; line < GAME_TABLE_SIZE; ++line) {
        buttons[line] = new Array();
        for (let col: number = 0; col < GAME_TABLE_SIZE; ++col) {
            buttons[line][col] = new Button(line, col);
        }
    }
    chooseBombButtons();
    for (let line: number = 0; line < GAME_TABLE_SIZE; ++line) {
        for (let col: number = 0; col < GAME_TABLE_SIZE; ++col) {
            findNeighbours(line, col);
        }
    }
}

function chooseBombButtons() {
    let bombsPlaced: number = 0
    while (bombsPlaced < BOMB_COUNT) {
        let line: number = Math.floor(Math.random() * GAME_TABLE_SIZE);
        let col: number = Math.floor(Math.random() * GAME_TABLE_SIZE);
        if (buttons[line][col].getState != BUTTON_STATE.BOMB_NOT_PRESSED) {
            buttons[line][col].setState = BUTTON_STATE.BOMB_NOT_PRESSED;
            ++bombsPlaced;
        }
    }
}

function findNeighbours(line: number, col: number): void {
    let delta: number[] = [-1, 0, 1];
    delta.forEach(line_delta => {
        delta.forEach(col_delta => {
            const neighLine = line + line_delta;
            const neighCol = col + col_delta;
            const neighId = neighLine * GAME_TABLE_SIZE + neighCol;
            if (0 <= neighLine && neighLine < GAME_TABLE_SIZE && 
                0 <= neighCol && neighCol < GAME_TABLE_SIZE && 
                (line_delta || col_delta)) {
                buttons[line][col].addNeighbour(neighLine, neighCol, neighId);
            }
        });
    });
}

function updateEmptyButtonsDisplayer(): void {
    let emptyButtonsDisplayer: HTMLElement = document.getElementById('emptyButtonsDisplayer');
    emptyButtonsDisplayer.innerHTML = String(emptyButtonsCount);
    if (emptyButtonsCount == 0) {
        winGame();
    }
}

function endGame(): void {
    document.getElementsByTagName('body')[0].innerHTML += "YOU LOST!" + 
        "<div><button type=\"button\" class=\"btn btn-danger\" onclick=\"loadPage('menu.html')\">Go back to the main menu</button></div>";
    uncoverBombs();
}

function winGame(): void {
    document.getElementsByTagName('body')[0].innerHTML += "YOU WON!" + 
        "<div><button type=\"button\" class=\"btn btn-success\" onclick=\"loadPage('menu.html')\">Go back to the main menu</button></div>";
    uncoverBombs();
}

function uncoverBombs(): void {
    for (let id: number = 0; id < GAME_TABLE_SIZE * GAME_TABLE_SIZE; ++id) {
        let buttonElem: HTMLInputElement = document.getElementById('button' + id) as HTMLInputElement;
        buttonElem.disabled = true;
        let line = Math.floor(id / GAME_TABLE_SIZE);
        let col = id % GAME_TABLE_SIZE;
        if (buttons[line][col].getState == BUTTON_STATE.BOMB_NOT_PRESSED) {
            buttonElem.style.backgroundColor = 'red';
        }
    }
}

