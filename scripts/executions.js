console.log('Executions Included!')

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
  } else if (!allIndexValuesObj[selectedIndex].opened && !allIndexValuesObj[selectedIndex].hasFlag && allIndexValuesObj[selectedIndex].isMine) {
    lostGame()

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

        addFlag(index)

        if (minesRemainingCount > 0) {
          minesRemainingCount--
          minesRemaining.innerHTML = `${minesRemainingCount}`
        }

      } else {

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
  createGrid()
}


