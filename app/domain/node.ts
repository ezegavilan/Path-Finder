export class Node {
    x: number;
    y: number;
    isStart: boolean;
    isEnd: boolean;
    distance: number;
    isVisited: boolean;
    previousNode?: Node;
    
    constructor(x: number, y: number, isStart: boolean, isEnd: boolean) {
        this.x = x;
        this.y = y;
        this.isStart = isStart;
        this.isEnd = isEnd;
        this.distance = Infinity;
        this.isVisited = false;
    }
}