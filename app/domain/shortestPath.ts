import type { Node } from '~/domain/node';

export const findShortestPath = (board: Node[][], startNode: Node, endNode: Node): Node[] => {
    const visitedNodesInOrder: Node[] = [];
    startNode.distance = 0;
    const unvisitedNodes: Node[] = getAllNodes(board);
    while (unvisitedNodes.length) {
        sortNodesByDistance(unvisitedNodes);
        const closestNode: Node = unvisitedNodes.shift()!;
        if (closestNode.distance === Infinity) return visitedNodesInOrder;
        visitedNodesInOrder.push(closestNode);
        if (closestNode === endNode) return visitedNodesInOrder;
        updateUnvisitedNeighbors(closestNode, board);
    }
    return [];
}

const getAllNodes = (board: Node[][]): Node[] => {
    const nodes: Node[] = [];
    for (const row of board) {
        for (const node of row) {
          nodes.push(node);
        }
      }
      return nodes;
}

const sortNodesByDistance = (nodes: Node[]) => {
    nodes.sort((nodeA: Node, nodeB: Node) => nodeA.distance! - nodeB.distance!);
}

const updateUnvisitedNeighbors = (node: Node, board: Node[][]) => {
    const neighbors = getNeighbors(node, board);
    for (const neighbor of neighbors) {
        neighbor.distance = node.distance! + 1;
        neighbor.previousNode = node;
    }
}

const getNeighbors = (node: Node, board: Node[][]) => {
    const neighbors = [];
    const { x, y } = node;
    if (x > 0) neighbors.push(board[x - 1][y]);
    if (x < board.length - 1) neighbors.push(board[x + 1][y]);
    if (y > 0) neighbors.push(board[x][y - 1]);
    if (y < board[0].length - 1) neighbors.push(board[x][y + 1]);
    return neighbors;
}
