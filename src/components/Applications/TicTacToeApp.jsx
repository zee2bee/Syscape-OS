"use client";

import React, { useState, useEffect } from "react";

export default function TicTacToeApp() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [statusText, setStatusText] = useState("YOUR TURN (OPERATOR X)");
  const [aiThinking, setAiThinking] = useState(false);

  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // Rows
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // Columns
    [0, 4, 8],
    [2, 4, 6], // Diagonals
  ];

  const checkWinner = (squares) => {
    for (let combo of winningCombinations) {
      const [a, b, c] = combo;
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return { winner: squares[a], combo };
      }
    }
    if (squares.every((square) => square !== null)) {
      return { winner: "Draw", combo: [] };
    }
    return null;
  };

  const gameResult = checkWinner(board);

  // Computer Algorithm Execution Hook
  useEffect(() => {
    if (!isXNext && !gameResult && !aiThinking) {
      setAiThinking(true);
      setStatusText("CYBER_CORE CORE THINKING...");

      // Simulate network lag latency to mimic API processing
      const timer = setTimeout(() => {
        makeComputerMove();
      }, 600);

      return () => clearTimeout(timer);
    }
  }, [isXNext, board, gameResult]);

  const makeComputerMove = () => {
    const cpBoard = [...board];

    // 1. Can Computer Win right now?
    for (let i = 0; i < cpBoard.length; i++) {
      if (cpBoard[i] === null) {
        cpBoard[i] = "O";
        if (checkWinner(cpBoard)?.winner === "O") {
          executeMove(i);
          return;
        }
        cpBoard[i] = null;
      }
    }

    // 2. Can Computer block a winning path for user X?
    for (let i = 0; i < cpBoard.length; i++) {
      if (cpBoard[i] === null) {
        cpBoard[i] = "X";
        if (checkWinner(cpBoard)?.winner === "X") {
          executeMove(i);
          return;
        }
        cpBoard[i] = null;
      }
    }

    // 3. Take center if vacant
    if (cpBoard[4] === null) {
      executeMove(4);
      return;
    }

    // 4. Move to random open corner or remaining slot
    const availableIndices = cpBoard
      .map((val, idx) => (val === null ? idx : null))
      .filter((v) => v !== null);
    if (availableIndices.length > 0) {
      const randomChoice =
        availableIndices[Math.floor(Math.random() * availableIndices.length)];
      executeMove(randomChoice);
    }
  };

  const executeMove = (index) => {
    const newBoard = [...board];
    newBoard[index] = "O";
    setBoard(newBoard);
    setIsXNext(true);
    setAiThinking(false);

    const nextCheck = checkWinner(newBoard);
    if (!nextCheck) {
      setStatusText("YOUR TURN (OPERATOR X)");
    } else {
      updateEndGameStatus(nextCheck);
    }
  };

  const handlePlayerClick = (index) => {
    if (board[index] || !isXNext || gameResult || aiThinking) return;

    const newBoard = [...board];
    newBoard[index] = "X";
    setBoard(newBoard);
    setIsXNext(false);

    const nextCheck = checkWinner(newBoard);
    if (nextCheck) {
      updateEndGameStatus(nextCheck);
    }
  };

  const updateEndGameStatus = (res) => {
    if (res.winner === "Draw") {
      setStatusText("MATRIX COLLISION: DRAW SYSTEM STATE");
    } else if (res.winner === "X") {
      setStatusText("SUCCESS: OPERATOR DEFEATED CYBER_CORE!");
    } else {
      setStatusText("CRITICAL FAILURE: CYBER_CORE WIN");
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setAiThinking(false);
    setStatusText("YOUR TURN (OPERATOR X)");
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-between bg-black/40 font-mono p-4 text-white rounded">
      {/* Telemetry Header */}
      <div
        className={`w-full text-center border p-2 rounded text-[10px] font-bold tracking-widest uppercase ${
          gameResult?.winner === "X"
            ? "bg-cyber-success/10 border-cyber-success text-cyber-success shadow-[0_0_8px_rgba(57,255,20,0.2)]"
            : gameResult?.winner === "O"
              ? "bg-cyber-secondary/10 border-cyber-secondary text-cyber-secondary shadow-[0_0_8px_rgba(161,37,89,0.2)]"
              : "bg-white/5 border-white/10 text-white/70"
        }`}
      >
        {statusText}
      </div>

      {/* Main Grid Field */}
      <div className="grid grid-cols-3 gap-2.5 my-4 w-56 h-56">
        {board.map((value, idx) => {
          const isWinningSquare = gameResult?.combo?.includes(idx);
          return (
            <button
              key={idx}
              type="button"
              onClick={() => handlePlayerClick(idx)}
              className={`rounded border flex items-center justify-center font-black text-2xl transition-all duration-150 ${
                value === null && !gameResult
                  ? "hover:bg-white/5 cursor-pointer active:scale-95"
                  : "cursor-default"
              } ${
                isWinningSquare
                  ? "bg-white/10 border-white text-white scale-105 shadow-neon"
                  : "bg-black/30 border-white/10"
              }`}
            >
              {value === "X" && (
                <span className="text-cyber-primary drop-shadow-[0_0_8px_rgba(0,255,255,0.6)] animate-fade-in">
                  X
                </span>
              )}
              {value === "O" && (
                <span className="text-cyber-secondary drop-shadow-[0_0_8px_rgba(161,37,89,0.6)] animate-fade-in">
                  O
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Controls Footer Engine */}
      <button
        onClick={resetGame}
        className="w-full py-2 bg-white/5 border border-white/10 rounded font-bold text-[10px] tracking-wider hover:bg-white/10 text-white transition-all active:scale-98"
      >
        FLUSH MATRIX GRID // RESTART
      </button>
    </div>
  );
}
