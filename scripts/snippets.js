console.log('Snippets Included!')


// Code snippet for checking which level it is
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


// Get all index values and populate object
function getAllIndexValues() {

  console.log('GET ALL INDEX VALUES FIRED')

  let indexesObj = {}

  for (let index = 0; index < levelRules[levelString].cellCount; index++) {
    
    const indexesSurrounding = getSurroundingIndexes(index)
    let minesSurrounding = 0
    let indexObj = {}

    if (!mineIndexes.includes(index)) {
      indexObj.isMine = false
      
      //Check for number of mines surrounding the clicked index
      for (let i = 0; i < indexesSurrounding.length; i++) {
        const squareID = parseFloat(indexesSurrounding[i])
        if (mineIndexes.includes(squareID)) {
          minesSurrounding++
        }
      }

      indexObj.revealValue = `number-${minesSurrounding}`
      indexObj.revealNumber = minesSurrounding
    } else {
      indexObj.isMine = true
      indexObj.revealValue = 'mine-unopened'
      indexObj.revealNumber = -1
    }

    indexObj.neighborIndexes = getSurroundingIndexes(index)
    
    indexObj.opened = false
    indexObj.hasFlag = false

    indexesObj[index] = indexObj

  }

  allIndexValuesObj = indexesObj
}


// Getting indexes of the 8 surrounding squares
function getSurroundingIndexes(index = -1) {
  const width = levelRules[levelString].width
  const height = levelRules[levelString].height
  const cellCount = levelRules[levelString].cellCount

  const isTopRow = index < width && index >= 0 ? true : false
  const isLeftColumn = index % width === 0 ? true : false
  const isRightColumn = index % width === width - 1 ? true : false
  const isBottomRow = index >= width*(height-1)  ? true : false

  let indexesArray = []

  if (!isTopRow && !isLeftColumn && !isRightColumn && !isBottomRow) { // Interior Cells
    indexesArray = [index-width-1, index-width, index-width+1, index-1, index+1, index+width-1, index+width, index+width+1]
  } else if (isTopRow && isLeftColumn) { // Top Left Corner
    indexesArray = [index+1, index+width, index+width+1]
  } else if (isTopRow && isRightColumn) { // Top Right Corner
    indexesArray = [index-1, index+width-1, index+width]
  } else if (isBottomRow && isLeftColumn) { // Bottom Left Corner
    indexesArray = [index-width, index-width+1, index+1]
  } else if (isBottomRow && isRightColumn) { // Bottom Right Corner
    indexesArray = [index-width-1, index-width, index-1]
  } else if (isTopRow) { // Top Row, Except Corners
    indexesArray = [index-1, index+1, index+width-1, index+width, index+width+1]
  } else if (isLeftColumn) { // Left Column, Except Corners
    indexesArray = [index-width, index-width+1, index+1, index+width, index+width+1]
  } else if (isRightColumn) { // Right Column, Except Corners
    indexesArray = [index-width-1, index-width, index-1, index+width-1, index+width]
  } else { // Bottom Row, Except Corners
    indexesArray = [index-width-1, index-width, index-width+1, index-1, index+1]
  }
  
  return indexesArray
}

// Get unopened surrounding indexes
function unopenedSurroundingIndexes (indexesArr = []) {
  
  const unopenedArray = []

  for (let i = 0; i < indexesArr.length; i++) {
    let objIndex = indexesArr[i]
    
    if (!allIndexValuesObj[objIndex].isMine && !allIndexValuesObj[objIndex].opened) {
      unopenedArray.push(indexesArr[i])
    }
  }

  return unopenedArray
}


// Reveal all unopened indexes 
function revealAllUnopened () {
  
  let allUnopenedIndexesArray = []
  
  for (let i = 0; i < levelRules[levelString].cellCount; i++) {
    
    if (!allIndexValuesObj[i].opened && !allIndexValuesObj[i].hasFlag) {
      allUnopenedIndexesArray.push(i)
    } else if ((allIndexValuesObj[i].hasFlag && !allIndexValuesObj[i].isMine)) {
      cells[i].className = ''
      cells[i].classList.add('unopened')

      const indexOnIsFlagged = isFlagged.indexOf(i)
      isFlagged.splice(indexOnIsFlagged, 1)

      allUnopenedIndexesArray.push(i)
    }
  }

  return allUnopenedIndexesArray
}


// Randomly Assigning Mine Indexes
function assignMineIndexes(index = -1) {
  console.log('ASSIGN MINE INDEXES FIRED')
  
  // Clear mine indexes array
  mineIndexes = []

  // Set an incrementor
  let numberOfMinesInArray = 0

  while (numberOfMinesInArray < levelRules[levelString].mineCount) {
    
    // create a random index between zero and number-of-mines-minus-1
    let newIndex = Math.floor(Math.random() * levelRules[levelString].cellCount)

    if (!mineIndexes.includes(newIndex) && newIndex !== index) {
      mineIndexes.push(newIndex)
      numberOfMinesInArray++
    }

  }

  getAllIndexValues() // Have to all this after defining the mine indexes because cells wont have proper values until then
}

// Setting and Clearing the Time Interval

function resetTimer () {
  timerStart = 0
  timer.innerHTML = timerStart
}

function clearTimerInterval() {
  console.log('CLEAR TIMER INTERVAL FIRED')
  if (timerInterval) {
    clearInterval(timerInterval)
  }
}


function setTimerInterval() {
  console.log('SET TIMER INTERVAL FIRED')
  
  function timerCount() {
    if (0 <= timerStart < 1000) {
      timerStart++
      timer.innerHTML = timerStart
    } else {
      clearTimerInterval()
    }  
  }

  timerInterval = setInterval(timerCount, 1000)

}

function flagRemainingSquares () {
  console.log('FLAG REMAINING FIRED')

  if (isFlagged.length > 0) {
    for (let i = 0; i < mineIndexes.length; i++) {
      const mineIndex = mineIndexes[i]

      if (!allIndexValuesObj[mineIndex].hasFlag) {
  
        cells[mineIndex].className = ''
        cells[mineIndex].classList.add('flagged')
        isFlagged.push(mineIndex)
  
        minesRemaining.innerHTML = `0`
      }
    }
    
  } else {
    for (let i = 0; i < mineIndexes.length; i++) {
      const mineIndex = mineIndexes[i]

      cells[mineIndex].className = ''
      cells[mineIndex].classList.add('flagged')
      isFlagged.push(mineIndex)

      minesRemaining.innerHTML = `0`
    }

  }

}
