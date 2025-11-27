import React, { useCallback } from 'react';

/**
 * PUBLIC_INTERFACE
 * Square component
 * Represents an interactive cell with keyboard accessibility.
 */
export default function Square({ value, onClick, isWinning, disabled, ariaLabel, nextPlayer }) {
  const handleKeyDown = useCallback(
    (e) => {
      if (disabled) return;
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onClick();
      }
    },
    [disabled, onClick]
  );

  return (
    <button
      type="button"
      className={`square ${isWinning ? 'square-win' : ''} ${value ? 'square-filled' : ''}`}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      disabled={disabled}
      role="gridcell"
      aria-label={ariaLabel}
      aria-disabled={disabled ? 'true' : 'false'}
      title={value ? `Marked ${value}` : `Place ${nextPlayer}`}
    >
      <span className="mark" data-mark={value || ''}>
        {value}
      </span>
    </button>
  );
}
