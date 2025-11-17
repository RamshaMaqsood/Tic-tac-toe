// import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
// import "./App.css";

// function Square({ value, onSquareClick }) {
//   return (
//     <button className="square" onClick={onSquareClick}>
//       {value}
//     </button>
//   );
// }
// function Board({ xIsNext, squares, onPlay }) {
//   // const [xIsNext, setXIsNext] = useState(true);
//   // const [squares, setSquares] = useState(Array(9).fill(null));
//   function handleClick(i) {
//     if (squares[i] || calculateWinner(squares)) {
//       return;
//     }
//     const nextSquares = squares.slice();
//     if (xIsNext) {
//       nextSquares[i] = "X";
//     } else {
//       nextSquares[i] = "O";
//     }
//     onPlay(nextSquares);

//   }
//   const winner = calculateWinner(squares);
//   let status;
//   if (winner) {
//     status = "Winner: " + winner;
//   } else {
//     status = "Next player: " + (xIsNext ? "X" : "O");
//   }
//   return (
//     <>
//       <div className="status">{status}</div>
//       <div className="board-row">
//         <Square
//           value={squares[0]}
//           onSquareClick={() => {
//             handleClick(0);
//           }}
//         />
//         <Square
//           value={squares[1]}
//           onSquareClick={() => {
//             handleClick(1);
//           }}
//         />
//         <Square
//           value={squares[2]}
//           onSquareClick={() => {
//             handleClick(2);
//           }}
//         />
//       </div>
//       <div className="board-row">
//         <Square
//           value={squares[3]}
//           onSquareClick={() => {
//             handleClick(3);
//           }}
//         />
//         <Square
//           value={squares[4]}
//           onSquareClick={() => {
//             handleClick(4);
//           }}
//         />
//         <Square
//           value={squares[5]}
//           onSquareClick={() => {
//             handleClick(5);
//           }}
//         />
//       </div>
//       <div className="board-row">
//         <Square
//           value={squares[6]}
//           onSquareClick={() => {
//             handleClick(6);
//           }}
//         />
//         <Square
//           value={squares[7]}
//           onSquareClick={() => {
//             handleClick(7);
//           }}
//         />
//         <Square
//           value={squares[8]}
//           onSquareClick={() => {
//             handleClick(8);
//           }}
//         />
//       </div>
//     </>
//   );
// }
// function calculateWinner(squares) {
//   const lines = [
//     [0, 1, 2],
//     [3, 4, 5],
//     [6, 7, 8],
//     [0, 3, 6],
//     [1, 4, 7],
//     [2, 5, 8],
//     [0, 4, 8],
//     [2, 4, 6],
//   ];
//   for (let i = 0; i < lines.length; i++) {
//     const [a, b, c] = lines[i];
//     if (squares[a] === squares[b] && squares[a] === squares[c]) {
//       return squares[a];
//     }
//   }
//   return null;
// }

// import React from 'react'

// export default function Game() {
//   const [xIsNext, setXIsNext] = useState(true);
//   const [history, setHistory] = useState([Array(9).fill(null)]);
//   const currentSquares = history[history.length - 1];


//   // function handlePlay(currentSquares){
//     // ToDo
//   // }

//   function handlePlay(nextSquares) {
//     setHistory([...history, nextSquares]);
//     setXIsNext(!xIsNext);
// }


//   return (
//     <div className="game">
//       <div className="game-board">
//         <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay}/>
//       </div>
//       <div className="game-info">
//         {/* <ol>{Todo}</ol> */}
//       </div>
//     </div>
//   )
// }


import { useState } from "react";
import "./App.css";

// 🔹 Square Component
function Square({ value, onSquareClick, highlight }) {
  return (
    <button className={`square ${highlight ? "highlight" : ""}`} onClick={onSquareClick}>
      {value}
    </button>
  );
}

// 🔹 Board Component
function Board({ xIsNext, squares, onPlay }) {
  function handleClick(i) {
    const winner = calculateWinner(squares);
    if (squares[i] || winner) return;

    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? "X" : "O";
    onPlay(nextSquares);
  }

  const result = calculateWinner(squares);
  const winner = result?.winner;
  const winningLine = result?.line;

  // ⭐ STATUS TEXT LOGIC
  const gameStarted = squares.some((sq) => sq !== null);
  let status = "";

  if (winner) {
    status = "Winner: " + winner;
  } else if (!gameStarted) {
    status = "Start";
  } else {
    status = "Next Player: " + (xIsNext ? "X" : "O");
  }

  return (
    <>
      <div className="status">{status}</div>

      <div className="board-row">
        <Square value={squares[0]} highlight={winningLine?.includes(0)} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} highlight={winningLine?.includes(1)} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} highlight={winningLine?.includes(2)} onSquareClick={() => handleClick(2)} />
      </div>

      <div className="board-row">
        <Square value={squares[3]} highlight={winningLine?.includes(3)} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} highlight={winningLine?.includes(4)} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} highlight={winningLine?.includes(5)} onSquareClick={() => handleClick(5)} />
      </div>

      <div className="board-row">
        <Square value={squares[6]} highlight={winningLine?.includes(6)} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} highlight={winningLine?.includes(7)} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} highlight={winningLine?.includes(8)} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

// 🔹 Winner Logic (returns winner + winning indexes)
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let line of lines) {
    const [a, b, c] = line;
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line };
    }
  }
  return null;
}

// 🔹 Main Game Component
export default function Game() {
  const [xIsNext, setXIsNext] = useState(true);
  const [history, setHistory] = useState([Array(9).fill(null)]);

  const currentSquares = history[history.length - 1];

  function handlePlay(nextSquares) {
    setHistory([...history, nextSquares]);
    setXIsNext(!xIsNext);
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info"></div>
    </div>
  );
}
