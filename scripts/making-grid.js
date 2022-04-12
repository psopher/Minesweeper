console.log('Making-Grid.js Included!')

// Randomly Assigning Mine Indexes
// Called in Create Grid
function assignMineIndexes() {
  console.log('ASSIGN MINE INDEXES FIRED')
  
  // Clear mine indexes array
  mineIndexes = []

  // Set an incrementor
  let numberOfMinesInArray = 0

  while (numberOfMinesInArray < levelRules[levelString].mineCount) {
    // create a random index between zero and number-of-mines-minus-1
    let newIndex = Math.floor(Math.random() * levelRules[levelString].cellCount)

    if (!mineIndexes.includes(newIndex)) {
      mineIndexes.push(newIndex)
      numberOfMinesInArray++
    }
  }

  getAllIndexValues() // Have to do this after defining the mine indexes because cells wont have proper values until then
}

// Reassign Mine Indexes if the first square selected is not a 0
// Only reassigns mines from the selected index and the indexes surrounding it so that the first square will be a zero; not reassigning all mine indexes
// Called in startGame
function reAssignMineIndexes(index = -1) { 
  console.log('REASSIGN MINE INDEXES FIRED')

  let numberOfMinesInArray = mineIndexes.length

  let surroundingIndexes = getSurroundingIndexes(index)
  
  if (allIndexValuesObj[index].isMine) {

    mineIndexes.splice(mineIndexes.indexOf(index), 1)
    numberOfMinesInArray--

  }

  for (let i = 0; i < surroundingIndexes.length; i++) {
    let indexOnObj = surroundingIndexes[i]

    if (allIndexValuesObj[indexOnObj].isMine) {

      mineIndexes.splice(mineIndexes.indexOf(indexOnObj), 1)
      numberOfMinesInArray--

    } 

  }

  let gridNeedsChanging = numberOfMinesInArray < levelRules[levelString].mineCount ? true : false

  if (gridNeedsChanging) {

    while (numberOfMinesInArray < levelRules[levelString].mineCount) {

      let newIndex = Math.floor(Math.random() * levelRules[levelString].cellCount)

      if (!mineIndexes.includes(newIndex) && newIndex !== index && !surroundingIndexes.includes(newIndex)) {
        
        mineIndexes.push(newIndex)
        numberOfMinesInArray++

      }    
    }

    getAllIndexValues() // Have to do this after defining the mine indexes because cell values have now changed
  }

  openNewSquare(index) // Have to call this to start the game

}

// Create the Grid
// Called every time page loads or the reset button is pressed
function createGrid() {
  console.log('CREATE GRID FIRED')

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

  assignMineIndexes() // Call this after creating the grid
}