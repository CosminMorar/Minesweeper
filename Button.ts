class Button {
    private id: number;
    private state: BUTTON_STATE;
    private bombNeighCount: number;
    private neighbours: number[];

    constructor(line: number, column: number) {
        this.id = line * GAME_TABLE_SIZE + column;
        this.state = BUTTON_STATE.NOT_PRESSED;
        this.bombNeighCount = 0;
        this.neighbours = new Array();
    }

    public addNeighbour(neighLine: number, neighCol: number, neighId: number): void {
        this.neighbours.push(neighId);
        if (buttons[neighLine][neighCol].getState == BUTTON_STATE.BOMB_NOT_PRESSED) {
            ++this.bombNeighCount;
        }
    }

    public press(): void {
        switch (this.state) {
            case BUTTON_STATE.BOMB_NOT_PRESSED:
                endGame();
            case BUTTON_STATE.PRESSED:
                break;
            case BUTTON_STATE.NOT_PRESSED:
                this.state = BUTTON_STATE.PRESSED;
                let buttonElem: HTMLInputElement = document.getElementById('button' + this.id) as HTMLInputElement;
                buttonElem.disabled = true;
                buttonElem.innerHTML = "" + this.bombNeighCount;
                --emptyButtonsCount;
                updateEmptyButtonsDisplayer();
        }
    }

    get getState(): BUTTON_STATE {
        return this.state;
    }

    set setState(state: BUTTON_STATE) {
        this.state = state;
    }

    get getBombNeighCount(): number {
        return this.bombNeighCount;
    }

    get getNeighbours(): number[] {
        return this.neighbours;
    }
}

enum BUTTON_STATE {
    PRESSED,
    NOT_PRESSED,
    BOMB_NOT_PRESSED 
}