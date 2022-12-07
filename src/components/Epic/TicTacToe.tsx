import { useEffect } from 'react'

import { useLocalStorageState } from './hooks/useLocalStorage'

function Board({
  squares,
  onClick,
}: {
  squares: string[]
  onClick: (x: number) => void
}) {
  function renderSquare(idx: number) {
    return (
      <button
        className='h-16 w-16 border border-slate-600 text-4xl font-medium'
        onClick={() => onClick(idx)}
      >
        {squares[idx]}
      </button>
    )
  }

  return (
    <div className='flex max-w-sm flex-col text-black'>
      <div className='flex'>
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className='flex'>
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className='flex'>
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  )
}

function Game() {
  const initialSquares = {
    type: 'value' as const,
    value: [Array<string>(9).fill('')],
  }
  const [history, setHistory] = useLocalStorageState<string[][]>(
    'ttt:history',
    initialSquares
  )

  const initialStep = {
    type: 'value' as const,
    value: 0,
  }
  const [currentStep, setCurrentStep] = useLocalStorageState<number>(
    'ttt:step',
    initialStep
  )

  const currentSquares = history[currentStep]
  const nextValue = getNextValue(currentSquares)
  const winner = getWinner(currentSquares)
  const status = getStatus(winner, currentSquares, nextValue)

  function selectSquare(idx: number) {
    if (winner || currentSquares[idx]) {
      return
    }
    const newHistory = history.slice(0, currentStep + 1)
    const squares = [...currentSquares]

    squares[idx] = nextValue
    setHistory([...newHistory, squares])
    setCurrentStep(newHistory.length)
  }

  function restart() {
    setHistory(initialSquares.value)
    setCurrentStep(0)
  }

  const moves = history.map((stepSquares, step) => {
    const desc = step ? `Go to move #${step}` : 'Go to game start'
    const isCurrentStep = step === currentStep
    return (
      <li key={step}>
        <button disabled={isCurrentStep} onClick={() => setCurrentStep(step)}>
          {desc} {isCurrentStep ? '(current)' : null}
        </button>
      </li>
    )
  })

  return (
    <div>
      <div>
        <Board onClick={selectSquare} squares={currentSquares} />
        <button onClick={restart}>Restart</button>
      </div>
      <div>
        <div>{status}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  )
}

export default Game

function getStatus(
  winner: string | null,
  squares: string[],
  nextValue: string
) {
  return winner
    ? `Winner: ${winner}`
    : squares.every(Boolean)
    ? `Scratch: Cat's game`
    : `Next player: ${nextValue}`
}

function getNextValue(squares: string[]) {
  return squares.filter(Boolean).length % 2 === 0 ? 'X' : 'O'
}

function getWinner(squares: string[]) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null
}
