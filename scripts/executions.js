console.log('Executions Included!')


function createGrid() {
  console.log('CREATE GRID FIRED')
  
  getLevelString()
  for (let i = 0; i < levelRules[levelString].cellCount; i++) {
    const cell = document.createElement('div')
    // Add cell index as the cell id 
    cell.id = i
    cell.classList.add('unopened')

    // Add event listeners to cell
    cell.addEventListener('click', revealSquare) //reveal square on left click
    cell.addEventListener('contextmenu', flagSquare) //flag square on right click

    // Add this item into the grid container
    grid.appendChild(cell)
    // Add the cell to the cells array
    cells.push(cell)
  }
}


// Revealing and Flagging Squares 

// Open new square
function openNewSquare(index = -1) {
  if (-1 < index < levelRules[levelString].cellCount && !openedIndexes.includes(index)) {
    let minesSurrounding = 0
    const indexesSurrounding = getSurroundingIndexes(index)
    const unopenSurrounding = unopenedSurroundingIndexes(indexesSurrounding)
    
    //Check for number of mines surrounding the clicked index
    for (let i = 0; i < indexesSurrounding.length; i++) {
      const squareID = parseFloat(indexesSurrounding[i])
      console.log(squareID)
      if (mineIndexes.includes(squareID)) {
        minesSurrounding++
      }
    }

    //Update the DOM
    console.log('index', index)
    console.log('indexesSurrounding', indexesSurrounding)
    console.log('minesSurrounding', minesSurrounding)
    cells[index].classList.add(`number-${minesSurrounding}`)
    

    // Add index to the openedIndexes array
    openedIndexes.push(index)
    console.log(openedIndexes)

    // If value is 0, open all surrounding squares, ad infinitum
    if (minesSurrounding === 0 && unopenSurrounding.length > 0) {
      for (let i = 0; i < unopenSurrounding.length; i++) {
        openNewSquare(unopenSurrounding[i])
      }
    }
  }
}

function revealSquare(event) {
  console.log('REVEAL SQUARE FIRED ->', event.target.id)

  const selectedIndex = parseFloat(event.target.id)

  if (!openedIndexes.includes(selectedIndex) && !isFlagged.includes(selectedIndex) && !mineIndexes.includes(selectedIndex)) {

    if (openedIndexes.length === 0) {
      startGame()
    } 

    openNewSquare(selectedIndex)
    
    if (openedIndexes.length === levelRules[levelString].cellCount - levelRules[levelString].mineCount) {
      wonGame()
    }
  } else if (!openedIndexes.includes(selectedIndex) && !isFlagged.includes(selectedIndex) && mineIndexes.includes(selectedIndex)) {
    lostGame()
  }

}

function flagSquare() {
  console.log('FLAG SQUARE FIRED')
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


