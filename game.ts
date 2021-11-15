function setup(): void {
    const GAME_TABLE_SIZE = Number(sessionStorage.getItem('SIZE'));
    const BOMB_COUNT = Number(sessionStorage.getItem('BOMB_COUNT'));
    sessionStorage.setItem('emptyButtonsCount', String(GAME_TABLE_SIZE * GAME_TABLE_SIZE - BOMB_COUNT))
    initializeGameTable();
    updateEmptyButtonsDisplayer();
}

function initializeGameTable(): void {
    const GAME_TABLE_SIZE = Number(sessionStorage.getItem('SIZE'));
    let buttons: Button[][] = new Array();
    for (let line: number = 0; line < GAME_TABLE_SIZE; ++line) {
        buttons[line] = new Array();
        for (let col: number = 0; col < GAME_TABLE_SIZE; ++col) {
            buttons[line][col] = new Button(line, col);
        }
    }
    let gameTable: HTMLElement = document.getElementById('gameTable');
    for (let line: number = 0; line < GAME_TABLE_SIZE; ++line) {
        let rowOfButtons: string = "<tr>";
        for (let col: number = 0; col < GAME_TABLE_SIZE; ++col) {
            let buttonId: string =  "" + line + "_" + col;
            let buttonHTML: string = "<button class=\"gameTableButton\"id=\"button_" + buttonId + "\"></button>";
            rowOfButtons += "<td>" + buttonHTML + "</td>";
        }
        rowOfButtons += "</tr>";
        gameTable.innerHTML += rowOfButtons;
    }
    console.log(JSON.stringify(buttons));
    sessionStorage.setItem('buttons', JSON.stringify(buttons));
    for (let line: number = 0; line < GAME_TABLE_SIZE; ++line) {
        for (let col: number = 0; col < GAME_TABLE_SIZE; ++col) {
            buttons[line][col].findNeighbours();
            console.log("Neighbours of " + line + " " + col + " are: ");

            let neighbours: Button[] = buttons[line][col].getNeighbours;

            console.log(neighbours);
            let neighbour: Button = neighbours[0];
            console.log(neighbour);
            // neighbours.forEach((neighbour: Button) => {
            //     console.log("" + neighbour.getLine + " " + neighbour.getColumn);
            // });
        }
    }
}

function updateEmptyButtonsDisplayer(): void {
    const GAME_TABLE_SIZE = Number(sessionStorage.getItem('SIZE'));
    const BOMB_COUNT = Number(sessionStorage.getItem('BOMB_COUNT'));
    let emptyButtonsDisplayer: HTMLElement = document.getElementById('emptyButtonsDisplayer');
    emptyButtonsDisplayer.innerHTML = String(GAME_TABLE_SIZE * GAME_TABLE_SIZE - BOMB_COUNT);
}