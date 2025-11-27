import React from 'react';
import Square from './Square.jsx';

/**
 * PUBLIC_INTERFACE
 * Board component
 * Renders a 3x3 grid of squares and highlights the winning line.
 */
export default function Board({ squares, onPlay, winningLine, disabled, nextPlayer }) {
  const renderSquare = (i) => {
    const isWinning = winningLine?.includes(i);
    return (
      <Square
        key={i}
        value={squares[i]}
        onClick={() => onPlay(i)}
        isWinning={!!isWinning}
        disabled={disabled || Boolean(squares[i])}
        ariaLabel={`Square ${i + 1}, ${squares[i] ? `occupied by ${squares[i]}` : 'empty'}${isWinning ? ', part of winning line' : ''}`}
        nextPlayer={nextPlayer}
      />
    );
  };

  return (
    <div
      className="board"
      role="grid"
      aria-label="Tic Tac Toe board"
      aria-readonly={disabled ? 'true' : 'false'}
    >
      {[0, 1, 2].map((row) => (
        <div className="board-row" role="row" key={row}>
          {[0, 1, 2].map((col) => {
            const i = row * 3 + col;
            return renderSquare(i);
          })}
        </div>
      ))}
    </div>
  );
}
