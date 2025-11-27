import React, { useEffect, useMemo, useState } from 'react';
import Board from './components/Board.jsx';

// PUBLIC_INTERFACE
export default function App() {
  /** Root application for the Tic Tac Toe game.
   *  Renders a centered layout with title, status, game board, and controls.
   *  Uses localStorage to persist last game state lightly (optional).
   */
  const [squares, setSquares] = useState(() => {
    try {
      const saved = localStorage.getItem('ttt:squares');
      return saved ? JSON.parse(saved) : Array(9).fill(null);
    } catch {
      return Array(9).fill(null);
    }
  });
  const [xIsNext, setXIsNext] = useState(() => {
    try {
      const saved = localStorage.getItem('ttt:xIsNext');
      return saved ? JSON.parse(saved) : true;
    } catch {
      return true;
    }
  });

  // Persist minimal state
  useEffect(() => {
    try {
      localStorage.setItem('ttt:squares', JSON.stringify(squares));
      localStorage.setItem('ttt:xIsNext', JSON.stringify(xIsNext));
    } catch {
      // ignore storage errors
    }
  }, [squares, xIsNext]);

  // Determine winner and winning line
  const { winner, line } = useMemo(() => calculateWinner(squares), [squares]);

  const isDraw = !winner && squares.every(Boolean);
  const status = winner
    ? `Winner: ${winner}`
    : isDraw
      ? 'Draw game'
      : `Turn: ${xIsNext ? 'X' : 'O'}`;

  function handlePlay(i) {
    if (winner || squares[i]) return; // ignore if game over or cell filled
    const next = squares.slice();
    next[i] = xIsNext ? 'X' : 'O';
    setSquares(next);
    setXIsNext(!xIsNext);
  }

  function handleReset() {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  }

  return (
    <div className="app-shell">
      <header className="app-header" role="banner" aria-label="Tic Tac Toe Header">
        <div className="brand">
          <div className="brand-mark" aria-hidden="true" />
          <h1 className="brand-title">Tic Tac Toe</h1>
        </div>
        <p className="brand-sub">Ocean Professional</p>
      </header>

      <main className="main" role="main">
        <section className="game-card" aria-label="Game area">
          <div className="status-row">
            <span
              className={`status-chip ${winner ? 'status-win' : isDraw ? 'status-draw' : 'status-turn'}`}
              aria-live="polite"
              aria-atomic="true"
            >
              {status}
            </span>
            {!winner && !isDraw && (
              <span className="turn-indicator" aria-hidden="true">
                {xIsNext ? 'X' : 'O'}
              </span>
            )}
          </div>

          <Board
            squares={squares}
            onPlay={handlePlay}
            winningLine={line}
            disabled={Boolean(winner || isDraw)}
            nextPlayer={xIsNext ? 'X' : 'O'}
          />

          <div className="controls">
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleReset}
              aria-label="Start a new game"
            >
              New Game
            </button>
          </div>
        </section>
      </main>

      <footer className="app-footer" role="contentinfo">
        <small>Built with Vite + React</small>
      </footer>
    </div>
  );
}

// PUBLIC_INTERFACE
export function calculateWinner(sq) {
  /** Determine if there's a winner.
   * Returns an object: { winner: 'X' | 'O' | null, line: number[] | null }
   */
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // cols
    [0, 4, 8], [2, 4, 6],            // diags
  ];
  for (const [a, b, c] of lines) {
    if (sq[a] && sq[a] === sq[b] && sq[a] === sq[c]) {
      return { winner: sq[a], line: [a, b, c] };
    }
  }
  return { winner: null, line: null };
}
