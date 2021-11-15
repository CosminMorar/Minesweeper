class Button {
    private line: number;
    private column: number;
    private state: BUTTON_STATE;
    private value: number;
    private neighbours: Button[];

    constructor(line: number, column: number) {
        this.line = line;
        this.column = column;
        this.state = BUTTON_STATE.NOT_PRESSED;
        this.value = 0;
        this.neighbours = null;
    }

    findNeighbours(): void {
        const GAME_TABLE_SIZE = Number(sessionStorage.getItem('SIZE'));
        let buttons: Button[][] = JSON.parse(sessionStorage.getItem('buttons')) as Button[][];
        let neighbours: Button[] = new Array();
        let delta: number[] = [-1, 0, 1];
        delta.forEach(line_delta => {
            delta.forEach(col_delta => {
                let new_line = this.line + line_delta;
                let new_col = this.column + col_delta;
                if (0 <= new_line && new_line < GAME_TABLE_SIZE && 
                    0 <= new_col && new_col < GAME_TABLE_SIZE && 
                    (line_delta || col_delta)) {
                    neighbours.push(buttons[new_line][new_col]);
                }
            });
        });
        console.log(neighbours);
        this.neighbours = neighbours;
        console.log(this.neighbours);
    }

    get getLine(): number {
        return 312;
    }

    get getNeighbours(): Button[] {
        return this.neighbours;
    }
}

enum BUTTON_STATE {
    PRESSED,
    NOT_PRESSED
}