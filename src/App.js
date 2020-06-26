import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import produce from 'immer'

const numRows = 35
const numCols = 75

const genGrid = () => {
  const rows = []
  for (let i = 0; i < numRows; i++) {
    rows.push(Array.from(Array(numCols), () => 0))
  }
  return rows
}

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
  console.log('1: ' + grid)
  useEffect(() => {
    const rows = [];
    for (let i = 0; i < numRows; i++) {
      rows.push(
        Array.from(Array(numCols), () =>
          Math.random() > 0.75 ? 1 : 0
        )
      );
    }

    setGrid(rows);
  }, [])
  
  console.log('2: ' + grid)

  const runSim = useCallback(() => {
    setGrid(currGrid => {
      return produce(currGrid, gridCopy => {
        for (let i = 0; i < numRows; i++) {
          for (let j = 0; j < numCols; j++) {
            let neighborCount = 0
            neighborFinder.forEach(([x, y]) => {
              const newI = i + x
              const newJ = j + y

              if (newI >= 0 && newI < numRows && newJ >= 0 && newJ < numCols) {
                neighborCount += currGrid[newI][newJ]
              }
            })

            if (neighborCount < 2 || neighborCount > 3) gridCopy[i][j] = 0
            else if (currGrid[i][j] === 0 && neighborCount === 3) gridCopy[i][j] = 1;
          }
        }
      })
    })
    setTimeout(runSim, 100)
  }, [])
  return (
    <>
      <div className="App" style={{ display: 'grid', gridTemplateColumns: `repeat(${numCols}, 20px)`}}>
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
            style={{width: 20, height: 20, backgroundColor: grid[i][j] ? 'teal' : undefined,
            border: 'solid 1px black'}} />))}
      </div>
      <button onClick={() => runSim()}>Start</button>
    </>
  );
}

export default App;
