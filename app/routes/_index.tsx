import type { LinksFunction, MetaFunction } from "@remix-run/node";
import { useState } from "react";
import { Node } from '~/domain/node';
import { findShortestPath } from "~/domain/shortestPath";
import styles from '~/styles/style.css';

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: styles }]
}

export default function FinderPage() {
  const startBoard: Node[][] =
    Array.from({ length: 30 }, (_, row) =>
      Array.from({ length: 30 }, (_, col) => {
        return new Node(row, col, (col === 15 && row === 12), (col === 7 && row === 20));
      })
    );

  const [board, setBoard] = useState(startBoard);

  return (
    <>
      <div className="container">
        <Title value="Path Finder" />
        <Board board={board} setBoard={setBoard} />
      </div>
    </>
  );
}

interface TitleProps {
  value: string
}

const Title = ({ value }: TitleProps) => {
  return (
    <h1 className="title">{value}</h1>
  )
}

const Board = ({ board, setBoard }: any) => {
  const animate = (visitedNodes: Node[]) => {
    for (let index = 0; index < visitedNodes.length; index++) {
        setTimeout(() => {          
          const node = visitedNodes[index];
          setBoard((prevBoard: Node[][]) => {
            const newBoard = [...prevBoard];
            const newNode = { ...node, isVisited: true };
            newBoard[node.x][node.y] = newNode;
            return newBoard;
          });
        }, 7 * index);
      }
  }

  const handleFindShortestPath = () => {
    const visitedNodes = findShortestPath(board, board[12][15], board[20][7]);
    animate(visitedNodes);
  }

  return (
    <div className="board">
      {
        board.map((row: Node[], rowIdx: number) => (
          <div key={rowIdx} className="row">
            {row.map((node: Node, colIdx: number) => (
              <NodeComponent key={colIdx} node={node} />
            ))}
          </div>
        ))
      }
      <span className="cta" onClick={handleFindShortestPath}>Find Shortest Path</span>
    </div>
  )
}

interface NodeComponentProps {
  node: Node
}

const NodeComponent = ({ node }: NodeComponentProps) => {
  const { isStart, isEnd, isVisited } = node;
  const nodeStyle = isStart ? 'start-node' : isEnd ? 'end-node' : isVisited ? 'visited-node' : '';

  return (
    <div className={`node ${nodeStyle}`}></div>
  )
}
