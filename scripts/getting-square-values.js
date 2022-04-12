console.log('Getting-Square-Values.js Included!')


// Get all index values and populate big Object
function getAllIndexValues() {
  console.log('GET ALL INDEX VALUES FIRED')

  let indexesObj = {}

  // Loop through every cell in grid and figure out how many mines are surrounding each cell
  for (let index = 0; index < levelRules[levelString].cellCount; index++) {
    
    const indexesSurrounding = getSurroundingIndexes(index)
    let minesSurrounding = 0
    let indexObj = {}

    if (!mineIndexes.includes(index)) {
      // If the square is not a mine...
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
      // If the square is a mine...
      indexObj.isMine = true
      indexObj.revealValue = 'mine-unopened'
      indexObj.revealNumber = -1

    }

    indexObj.neighborIndexes = indexesSurrounding
    
    indexObj.opened = false
    indexObj.hasFlag = false

    indexesObj[index] = indexObj

  }

  // Set the global variable equal to the local variable
  allIndexValuesObj = indexesObj
}


// Getting indexes of the 8, 5, or 3 surrounding squares depending on where the square is in the grid
// Called in the function above
// Improves speed to have these values on the big Object
function getSurroundingIndexes(index = -1) {
  // local variables for width, height, and cellCount
  const width = levelRules[levelString].width
  const height = levelRules[levelString].height
  const cellCount = levelRules[levelString].cellCount

  // Booleans indicating whether the cell is on an edge
  const isTopRow = index < width && index >= 0 ? true : false
  const isLeftColumn = index % width === 0 ? true : false
  const isRightColumn = index % width === width - 1 ? true : false
  const isBottomRow = index >= width*(height-1)  ? true : false

  let indexesArray = []

  // If statements that populate the array with all of the neighboring cell indexes
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
// This is called when the value of a cell is zero, so you have to open all the unopened cells around it
function unopenedSurroundingIndexes (indexesArr = []) {
  
  const unopenedArray = []

  for (let i = 0; i < indexesArr.length; i++) {
    let objIndex = indexesArr[i]
    
    if (!allIndexValuesObj[objIndex].isMine && !allIndexValuesObj[objIndex].opened) {
      unopenedArray.push(indexesArr[i])
    }
  }

  // Returns an array of cells that should be opened when a 0 is pressed
  return unopenedArray
}


// Reveal all unopened mine indexes 
// Called after you lose
function revealAllUnopened () {
  
  let allUnopenedIndexesArray = []
  
  for (let i = 0; i < levelRules[levelString].cellCount; i++) {

    // Reveals all mines but not unopened squares that arent mines
    if (allIndexValuesObj[i].isMine && !allIndexValuesObj[i].hasFlag) {
      allUnopenedIndexesArray.push(i)
    } else if ((allIndexValuesObj[i].hasFlag && !allIndexValuesObj[i].isMine)) {
      flagIncorrect(i)
    } else if (!allIndexValuesObj[i].opened && !allIndexValuesObj[i].hasFlag) {
      cells[i].className = ''
      cells[i].classList.add('unopened-inactive')
    }

  }

  return allUnopenedIndexesArray
}