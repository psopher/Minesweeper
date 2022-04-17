console.log('Executions Included!')

//Reveal Square click event
function revealSquare(event) {
  console.log('REVEAL SQUARE FIRED ->', event.target.id)

  const selectedIndex = parseFloat(event.target.id)

  if (openedIndexes.length === 0) {
    //If its the first square clicked, then start the game
    startGame(selectedIndex)

  } else if (!allIndexValuesObj[selectedIndex].opened && !allIndexValuesObj[selectedIndex].hasFlag && !allIndexValuesObj[selectedIndex].isMine) { 
    //If its not the first square clicked, not already opened, not flagged, and not a mine, then open the square
    openNewSquare(selectedIndex)

    if (openedIndexes.length === levelRules[levelString].cellCount - levelRules[levelString].mineCount) {
      //If the number of opened indexes equals cellCount minus mineCount, you won
      wonGame()
    }
  } else if (!allIndexValuesObj[selectedIndex].opened && !allIndexValuesObj[selectedIndex].hasFlag && allIndexValuesObj[selectedIndex].isMine) {
    //If you clicked on a mine, you lost
    lostGame()

    //Open all mine squares to show the grid after losing
    openNewSquare(selectedIndex)
  }
}

// Flag Square click event
function flagSquare(event) {
  console.log('FLAG SQUARE FIRED')

  if (!gameFinished) { //Cant flag a square before starting game or after finishing game
    
    const index = parseFloat(event.target.id)

    let minesRemainingCount = parseFloat(levelRules[levelString].mineCount - isFlagged.length)

    if (index >= 0 && index < levelRules[levelString].cellCount && !allIndexValuesObj[index].opened) {

      if (!allIndexValuesObj[index].hasFlag) {  
        //if square is not flagged, then add a flag
        addFlag(index)

        if (minesRemainingCount > 0) {
          minesRemainingCount--
          minesRemaining.innerHTML = `${minesRemainingCount}`
        }

      } else {
        //if square is flagged, then remove the flag
        removeFlag(index)

        if (minesRemainingCount < levelRules[levelString].mineCount) {
          minesRemainingCount++
          minesRemaining.innerHTML = `${minesRemainingCount}`
        }
      }
    }
  }
}

// Set Level click event
function setLevel(event) {
  console.log('SET LEVEL FIRED')

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

    handleReset()
  }
}

// Handle Reset click event
function handleReset() {
  console.log('HANDLE RESET FIRED')

  resetBtn.className = ''
  resetBtn.classList.add('not-won')

  minesRemaining.innerHTML = levelRules[levelString].mineCount

  clearTimerInterval()
  resetTimer()
  grid.replaceChildren()
  mineIndexes = []
  openedIndexes = []
  isFlagged = []
  cells = []
  allIndexValuesObj = {}
  gameFinished = true
  minesShown = false
  createGrid()
}



// Button events
resetBtn.addEventListener('click', handleReset)
beginnerBtn.addEventListener('click', setLevel)
intermediateBtn.addEventListener('click', setLevel)
expertBtn.addEventListener('click', setLevel)

