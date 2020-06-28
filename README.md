# Conway's Game of Life, A project for Lambda School


## What is Conway's Game of Life?
The Game of Life was contructed by John Conway in the 1970s. It's main premise is for cellular automation. A single cell  
at any given time can only be alive or dead, in order for a cell to be either be alive or dead it must follow some rules:  
1. If the cell has less than two neighbors, it dies from underpopulation and if it has more than three, it dies from overpopulation.
2. If a cell has either two or three cells, it lives on to the next generation of cells.
3. A dead cell can be brought back to life if it has exactly three live neighbors.

## Extras
Something I would've liked to have added would be for the user to input their name and from that, the grid would fill in with cells that are alive writing out their name.

## Difficulties
Most of my headache was caused by having to go back to React Hooks, because when I did my React course I didn't do Hooks, I only did Redux which I had a hard time understanding.
Also:
1. Could not get the generations to stop counting after all the cells have died
2. Could not get user to input size of the grid to work or speed at which the cells form
3. Did not implement any presets that a user can choose from
4. A step through button to go generation by generation