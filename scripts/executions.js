console.log('Executions Included!')


function createGrid() {
  console.log('CREATE GRID FIRED')
  gameFinished = false

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
  if (-1 < index < levelRules[levelString].cellCount && !openedIndexes.includes(index) && !isFlagged.includes(index)) {
    
    // const indexesSurrounding = getSurroundingIndexes(index)
    const indexOnObj = allIndexValuesObj[index]
    const indexesSurrounding = indexOnObj.neighborIndexes
    const unopenSurrounding = unopenedSurroundingIndexes(indexesSurrounding)
    
    let minesSurrounding = 0

    cells[index].classList.add(indexOnObj.revealValue)

    openedIndexes.push(index)

    // If value is 0, open all surrounding squares, ad infinitum
    if (indexOnObj.revealNumber === 0 && unopenSurrounding.length > 0 && !gameFinished) {
      console.log('Method Fires')

      for (let i = 0; i < unopenSurrounding.length; i++) {
        openNewSquare(unopenSurrounding[i])
      }
    } else if (gameFinished) {
      let allUnopenedArray = revealAllUnopened()

      for (let i = 0; i < allUnopenedArray.length; i++) {
        openNewSquare(allUnopenedArray[i])
      }
    }
  }
}

// Won and Lost
function wonGame() {
  console.log('WON GAME FIRED')
  gameFinished = true
  clearTimerInterval()

  resetBtn.classList.add('won-game')
}

function lostGame() {
  console.log('LOST GAME FIRED')
  gameFinished = true
  clearTimerInterval()
}

// Start Game
function startGame(index = -1) {
  console.log('START GAME FIRED')

  assignMineIndexes(index)

  setTimerInterval()
}

//Reveal Square click event
function revealSquare(event) {
  console.log('REVEAL SQUARE FIRED ->', event.target.id)

  const selectedIndex = parseFloat(event.target.id)

  if (!openedIndexes.includes(selectedIndex) && !isFlagged.includes(selectedIndex) && !mineIndexes.includes(selectedIndex)) {

    if (openedIndexes.length === 0) {
      startGame(selectedIndex)
    } 

    openNewSquare(selectedIndex)
    
    if (openedIndexes.length === levelRules[levelString].cellCount - levelRules[levelString].mineCount) {
      wonGame()
    }
  } else if (!openedIndexes.includes(selectedIndex) && !isFlagged.includes(selectedIndex) && mineIndexes.includes(selectedIndex)) {
    lostGame()

    openNewSquare(selectedIndex)
  }

}

function flagSquare(event) {
  console.log('FLAG SQUARE FIRED')
  
  const index = parseFloat(event.target.id)

  let minesRemainingCount = parseFloat(levelRules[levelString].mineCount - isFlagged.length)

  if (index >= 0 && index < levelRules[levelString].cellCount && !openedIndexes.includes(index) && !gameFinished) {

    cells[index].className = ''

    if (!isFlagged.includes(index)) {
      cells[index].classList.add('flagged')
      isFlagged.push(index)

      if (minesRemainingCount > 0) {
        minesRemainingCount--
        minesRemaining.innerHTML = `${minesRemainingCount}`
      }

    } else {
      cells[index].classList.add('unopened')

      const indexOnIsFlagged = isFlagged.indexOf(index)
      isFlagged.splice(indexOnIsFlagged, 1)

      if (minesRemainingCount < levelRules[levelString].mineCount) {
        minesRemainingCount++
        minesRemaining.innerHTML = `${minesRemainingCount}`
      }


    }

  }

  console.log('flagged array', isFlagged)
}


// Handling Buttons Events
function setLevel(event) {
  console.log('SET LEVEL FIRED')
  console.log('set level innerHTML',event.target.innerHTML.toLowerCase())

  if (levelString !== event.target.innerHTML.toLowerCase()) {

    levelString = event.target.innerHTML.toLowerCase()

    beginnerBtn.className = ''
    intermediateBtn.className = ''
    expertBtn.className = ''
    grid.className = ''
    scoreboardDiv.className = ''

    if (levelString === 'beginner') {
      level = 1
      beginnerBtn.classList.add('level-selected')
      grid.classList.add('beginner-grid')
      scoreboardDiv.classList.add('beginner-scoreboard')
    } else if (levelString === 'intermediate') {
      level = 2
      intermediateBtn.classList.add('level-selected')
      grid.classList.add('intermediate-grid')
      scoreboardDiv.classList.add('intermediate-scoreboard')
    } else {
      level = 3
      expertBtn.classList.add('level-selected')
      grid.classList.add('expert-grid')
      scoreboardDiv.classList.add('expert-scoreboard')
    }

    clearTimerInterval()
    resetTimer()
    grid.replaceChildren()
    mineIndexes = []
    openedIndexes = []
    isFlagged = []
    cells = []
    gameFinished = false
    createGrid()
  }
}

function handleReset() {
  console.log('HANDLE RESET FIRED')



  gameFinished = false
}


