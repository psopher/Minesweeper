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

    indexesObj[index] = indexObj
  }

  allIndexValuesObj = indexesObj
  console.log(allIndexValuesObj)
}


// Getting indexes of the 8 surrounding squares
function getSurroundingIndexes(index = -1) {
  const width = levelRules[levelString].width
  const height = levelRules[levelString].height
  const cellCount = levelRules[levelString].cellCount
  console.log('index is ->', index)
  console.log('cellCount is ->', cellCount)
  console.log('width is ->', width)

  const isTopRow = index < width && index >= 0 ? true : false
  const isLeftColumn = index % width === 0 ? true : false
  const isRightColumn = index % width === width - 1 ? true : false
  const isBottomRow = index >= width*(height-1)  ? true : false

  console.log('isBottom row ->', isBottomRow)
  console.log('isTop row ->', isTopRow)
  console.log('isLeft column ->', isLeftColumn)
  console.log('isRight column ->', isRightColumn)

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
    // if (!mineIndexes.includes(indexesArr[i])) {
    let objIndex = indexesArr[i]

    if (!allIndexValuesObj[objIndex].isMine && !openedIndexes.includes(indexesArr[i])) {
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

  getAllIndexValues()
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

