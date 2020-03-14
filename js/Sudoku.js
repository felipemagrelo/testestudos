///sudoku teste
class Sudoku {
    constructor() {
        this.initialize.apply(this, arguments);
    }
    initialize(side = 9) {
        side = side == undefined ? 9 : side;
        if (side <= 2) {
            side = 2;
            this._n = side;
            this._root = 1;
        }
        else {
            this._root = ~~(side ** 0.5);
            this._n = this._root ** 2;
        }
        this._len = this._n ** 2; //drixr
        this.clearGrid();
        this._empty = 0;
        this._invalids = [this._empty, NaN, undefined, null, Infinity, ''];
    }
    clearGrid() {
        this._grid = [];
        for (let i = 0; i < this._len; i++) {
            this._grid.push(0);
        }
    }
    isValid(test = 1, pos = 0) {
        if (this._invalids.indexOf(test) != -1) {
            return false;
        }
        if (this._items.length != this._n) {
            this.setItems();
        }
        if (this._items.indexOf(test) == -1) {
            return false;
        }
        let lin = ~~(pos / this._n);
        let col = pos % this._n;
        let lBloc = ~~(lin / this._root);
        let cBloc = ~~(col / this._root);
        let colu = '';
        let line = '';
        let bloc = '';
        for (let j = 0; j < this._n; j++) {
            let offset = ~~(j / this._root);
            let newCol = (j * this._n + col);
            let newLin = (lin * this._n) + j;
            let newBlo = (cBloc * this._root) + offset * this._n +
                (j - (offset * this._root)) +
                (lBloc * this._root * this._n);
            colu = newCol == pos ? colu : newCol;
            line = newLin == pos ? line : newLin;
            bloc = newBlo == pos ? bloc : newBlo;
            if (test == this._grid[colu] ||
                test == this._grid[line] ||
                test == this._grid[bloc]) {
                return false;
            }
        }
        return true;
    }
    log() {
        for (let i = 0; i < this._n; i++) {
            console.log(this._grid.slice(i * this._n, (i + 1) * this._n));
        }
    }
    print() {
        let trace= '+';
        let ln = '\n'

        for (let i = 0; i < this._n; i++) {
            trace = (i+1)%this._root == 0 ? trace + "——+": trace + "———";
        }

        trace = trace + ln;

        let things = trace;
        for (let i = 0; i < this._n; i++) {
            
            things = things + "|";
            for (let c = 0; c < this._n; c++) {
                things = things + ('00' + this._grid[(i*(this._n))+c] ).slice(-2);
                things  = (c+1)%this._root == 0 ? things + '|': things + ',';
            }
            things = things + ln;
            if ((i+1)%this._root == 0){ things = things + trace};
            }
        console.log(things);
        }    
    setItems() {
        this._items = [];
        let ini = 0;
        for (let i = 0; i < this._len; i++) {
            let item = this._grid[i];
            if (this._items.length < this._n) {
                if (this._invalids.indexOf(this._grid[i]) == -1
                    && this._items.indexOf(item) == -1) {
                    //testa se o i ñ existe nos invalidos, e nem existe já na lista
                    this._items.push(item);
                }
                if (i + 1 >= this._len) {
                    while (this._items.length < this._n) {
                        ini += 1;
                        item = ini;
                        if (this._items.indexOf(item) == -1) {
                            this._items.push(item);
                        }
                    }
                }
            }
            else {
                break;
            }
        }
        return this._items;
    }
    cicleList(i) {
        let posi = this._items.indexOf(this._grid[i]);
        if ( (posi == -1 || posi == this._n - 1) ) {
            console.log(this._items)
            return this._items;
        }
        else {
            this._items.unshift(this._items.pop());
            this.cicleList(i);
            
        }
    }
    
    fill(maxSolutions = 1) {
        this.setItems();
        this.testa();
    }
    testa() {
        for (let i = 0; i < this._len; i++) {
            // roda por cada espaço do sudoku   
            this.cicleList(this._grid[i]);
            //muda a ordem de teste para otimização
            if (this.isValid(this._grid[i], i) &&
                this._items.indexOf(this._grid[i]) != -1) {
                //se a posição estiver na lista e for valida-
                if ((i + 1) == this._len) {
                    
                    return true;
                }
                //console.log("posição: ", i, " = ", this._grid[i]);
            }
            else { //se a posição for invalida, vai tentar preencher
                for (let j = 0; j < this._n; j++) {
                    //testa cada item(1 - 9)
                    if (this.isValid(this._items[j], i)) {
                        //  se cada item[j] é valido na posição que estava invalida
                        this._grid[i] = this._items[j];
                        //  insere o respectivo item na posição testada se True
                        if ((i + 1) >= this._len) {
                            
                            return true;
                        }
                        if (this.testa()) {
                            break;
                        }
                        else {
                            this._grid[i] = 0;
                        }
                    }
                    else {
                        console.log(this._items[j], " é invalido na pos ", i, "  items: ",this._items);
                    }
                }
                if (this.isValid(this._grid[i], i)) {
                    continue;
                }
                else {
                    this._grid[i] = 0;
                    if (i > 0) {
                        this._grid[i - 1] = 0;
                    }
                    return false;
                }
            }
        }
    }
};

t = new Sudoku(4);
t.fill();
t.print()


// Sudoku.prototype.cicleList = function (i) {
//     if (i%this._n == 0){
//         for (let count = 0; count< this._root; count++ ){
//             this._items.unshift(this._items.pop());
//         }
//     }else{

//         let posi = this._items.indexOf(this._grid[i]);
//         if ( (posi < 0 || posi == this._n - 1) ) {
//             return this._items;
//         }
//         else {
//             this._items.unshift(this._items.pop());
//             this.cicleList(i);
//         }
//     }
// }