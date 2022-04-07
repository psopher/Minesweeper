console.log('Executions Included!')


function createGrid() {
  console.log('CREATE GRID FIRED')
  
  const gridType = getGridType()
  for (let i = 0; i < levelRules[gridType].cellCount; i++) {
    const cell = document.createElement('div')
    // Add cell index as the cell id 
    cell.id = i
    cell.classList.add('unopened')
    // Add this item into the grid container
    grid.appendChild(cell)
    // Add the cell to the cells array
    cells.push(cell)
  }
}


// Revealing and Flagging Squares 
function revealSquare() {
  console.log('REVEAL SQUARE FIRED')
}

function flagSquare() {
  console.log('FLAG SQUARE FIRED')
}

function revealSurroundingSquares() {
  console.log('REVEAL SURROUNDING SQUARES FIRED')
}


// Handling Buttons
function handleReset() {
  console.log('HANDLE RESET FIRED')
}

function setLevel() {
  console.log('SET LEVEL FIRED')
}

function startGame() {
  console.log('START GAME FIRED')
}

// Won and Lost
function wonGame() {
  console.log('WON GAME FIRED')
}

function lostGame() {
  console.log('LOST GAME FIRED')
}


