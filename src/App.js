import React, { useState, useCallback, useRef } from 'react'
import './App.css'
import produce from 'immer'

const numRows = 25
const numCols = 25

const genGrid = () => {
  const rows = []
  for (let i = 0; i < numRows; i++) {
    rows.push(Array.from(Array(numCols), () => 0))
  }
  return rows
} // Create initial grid, fill it in with all dead cells 

const neighborFinder = [
  [1, 0], //North
  [0, 1], //East
  [-1, 0], // South
  [0, -1], //West
  [1, -1], //North West
  [-1, -1], //South West
  [1, 1], //North East
  [-1, 1] //South East
]

function App() {
  const [grid, setGrid] = useState(() => {
    return genGrid()
  })

  const [running, setRunning] = useState(false)

  const runningRef = useRef(running)
  runningRef.current = running

  const CreateRandomGrid = () => {
    const rows = [];
    for (let i = 0; i < numRows; i++) {
      rows.push(
        Array.from(Array(numCols), () =>
          Math.random() > 0.75 ? 1 : 0
        )
      )
    }
    setGrid(rows)
  }// Randomly fill in the grid

  const runSim = useCallback(() => {
    if (!runningRef.current) {
      return
    }

    setGrid(currGrid => {
      return produce(currGrid, gridCopy => {
        for (let i = 0; i < numRows; i++) {
          for (let j = 0; j < numCols; j++) {
            let neighborCount = 0
            neighborFinder.forEach(([x, y]) => {
              const newI = i + x
              const newJ = j + y // Searches for neighbors
              if (newI >= 0 && newI < numRows && newJ >= 0 && newJ < numCols) {
                neighborCount += currGrid[newI][newJ]
              } // Checks to make sure that it doesn't go out of bounds
            })
            /* Makes the cell alive or dead depending on the cell */
            if (neighborCount < 2 || neighborCount > 3) gridCopy[i][j] = 0
            else if (currGrid[i][j] === 0 && neighborCount === 3) gridCopy[i][j] = 1
          }
        }
      })
    })
    setTimeout(runSim, 500)
  }, [])
  return (
    <div className='contentHolder'>
      <div className="App" style={{ display: 'grid', gridTemplateColumns: `repeat(${numCols}, 20px)`, backgroundColor: 'black'}}>
        {grid.map((rows, i) => 
          rows.map((col, j) => 
            <div 
            onLoad={() => {
              // runSim()
              const newGrid = produce(grid, gridCopy => {
                gridCopy[i][j] = grid[i][j] ? 0 : 1
              })
              setGrid(newGrid)
            }}
            key={`${i}-${j}`}
            style={{width: 20, height: 20, backgroundColor: grid[i][j] ? `#${(Math.random()*0xFFFFFF<<0).toString(16)}` : undefined,
            border: 'solid 1px black'}} />))}
      </div>
      <button onClick={() => {
        setRunning(!running)
        if (!running) runningRef.current = true
        runSim()
        }
      }>{running ? 'Stop' : 'Start'}</button>
      <button onClick={() => setGrid(genGrid())}>Clear</button>
      <button onClick={() => CreateRandomGrid()}>Random</button>
    </div>
  )
}

export default App
