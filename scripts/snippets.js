console.log('Snippets Included!')


// Code snippet that makes checking which level it is more DRY
function getLevelString() {
  console.log('getGridType FIRED')
  if (level === 1) {
    levelString = 'beginner'
  } else if (level === 2) {
    levelString = 'intermediate'
  } else if (level === 3) {
    levelString = 'expert'
  } else {
    console.log(`Level: ${level} doesnt exist`)
  }
}

// Clears cells from the grid
function removeCells(){
  cells = []
  grid.replaceChildren = cells
}


// Getting indexes of the 8 surrounding squares
function getSurroundingIndexes(index = -1) {
  const width = levelRules[levelString].width
  const cellCount = levelRules[levelString].cellCount

  const isTopRow = index < width && index >= 0 ? true : false
  const isLeftColumn = index % width === 0 ? true : false
  const isRightColumn = index % width === width - 1 ? true : false
  const isBottomRow = index >= width*(width-1) ? true : false

  console.log('is it top row?', isTopRow)
  console.log('is it bottom row?', isBottomRow)
  console.log('is it left column?', isLeftColumn)
  console.log('is it right column?', isRightColumn)

  let indexesArray = []

  if (!isTopRow && !isLeftColumn && !isRightColumn && !isBottomRow) {
    indexesArray = [index-width-1, index-width, index-width+1, index-1, index+1, index+width-1, index+width, index+width+1]
  } else if (isTopRow && isLeftColumn) {
    indexesArray = [index+1, index+width, index+width+1]
  } else if (isTopRow && isRightColumn) {
    indexesArray = [index-1, index+width-1, index+width]
  } else if (isBottomRow && isLeftColumn) {
    indexesArray = [index-width, index-width+1, index+1]
  } else if (isBottomRow && isRightColumn) {
    indexesArray = [index-width-1, index-width, index-1]
  } else if (isTopRow) {
    indexesArray = [index-1, index+1, index+width-1, index+width, index+width+1]
  } else if (isLeftColumn) {
    indexesArray = [index-width, index-width+1, index+1, index+width, index+width+1]
  } else if (isRightColumn) {
    indexesArray = [index-width-1, index-width, index-1, index+width-1, index+width]
  } else {
    indexesArray = [index-width-1, index-width, index-width+1, index-1, index+1]
  }
  
  return indexesArray
}

// Get unopened surrounding indexes
function unopenedSurroundingIndexes (indexesArr = []) {
  
  const unopenedArray = []

  for (let i = 0; i < indexesArr.length; i++) {
    if (!mineIndexes.includes(indexesArr[i])) {
      unopenedArray.push(indexesArr[i])
    }
  }

  return unopenedArray
}


// Reveal all unopened indexes 
function revealAllUnopened () {
  
  let allUnopenedIndexesArray = []
  
  for (let i = 0; i < levelRules[levelString].cellCount; i++) {
    if (!openedIndexes.includes(cells[i])) {
      allUnopenedIndexesArray.push(i)
    }
  }

  return allUnopenedIndexesArray
}


// Randomly Assigning Mine Indexes
function assignMineIndexes() {
  console.log('ASSIGN MINE INDEXES FIRED')
  
  // Clear mine indexes array
  mineIndexes = []

  // Set an incrementor
  let numberOfMinesInArray = 0

  console.log('mine count goal ->',levelRules[levelString].mineCount)
  while (numberOfMinesInArray < levelRules[levelString].mineCount) {
    
    // create a random index between zero and number-of-mines-minus-1
    let newIndex = Math.floor(Math.random() * levelRules[levelString].cellCount)
    console.log(newIndex)

    if (!mineIndexes.includes(newIndex)) {
      mineIndexes.push(newIndex)
      numberOfMinesInArray++
    }

    console.log(mineIndexes.length)

  }

  console.log(mineIndexes)

}

// Setting and Clearing the Time Interval

function resetTimer () {
  timerStart = 0
  timer.innerHTML = timerStart
}

function clearTimerInterval() {
  console.log('CLEAR TIMER INTERVAL FIRED')
  clearInterval(timerInterval)
}


function setTimerInterval() {
  console.log('SET TIMER INTERVAL FIRED')
  
  function timerCount() {
    if (0 <= timerStart < 1000) {
      console.log('timer interval really started')
      timerStart++
      timer.innerHTML = timerStart
    } else {
      console.log('timer interval cleared from start')
      clearTimerInterval()
    }  
  }

  timerInterval = setInterval(timerCount, 1000)

}

