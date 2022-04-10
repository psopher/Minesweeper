console.log('Making-Grid.js Included!')

// Randomly Assigning Mine Indexes
// function assignMineIndexes(index = -1) {
function assignMineIndexes() {
  console.log('ASSIGN MINE INDEXES FIRED')
  
  // Clear mine indexes array
  mineIndexes = []

  // Set an incrementor
  let numberOfMinesInArray = 0

  // let surroundingIndexes = getSurroundingIndexes(index)

  while (numberOfMinesInArray < levelRules[levelString].mineCount) {
    
    // create a random index between zero and number-of-mines-minus-1
    let newIndex = Math.floor(Math.random() * levelRules[levelString].cellCount)

    // if (!mineIndexes.includes(newIndex) && newIndex !== index && !surroundingIndexes.includes(newIndex)) {
    if (!mineIndexes.includes(newIndex)) {
      mineIndexes.push(newIndex)
      numberOfMinesInArray++
    }

  }

  getAllIndexValues() // Have to do this after defining the mine indexes because cells wont have proper values until then
}

function reAssignMineIndexes(index = -1) {
  
  let numberOfMinesInArray = mineIndexes.length

  let surroundingIndexes = getSurroundingIndexes(index)

  let indexOnMineIndexes 
  
  if (allIndexValuesObj[index].isMine) {
    indexOnMineIndexes= mineIndexes.indexOf(index)
    mineIndexes.splice(indexOnMineIndexes, 1)
    numberOfMinesInArray--
  }

  for (let i = 0; i < surroundingIndexes.length; i++) {
    let indexOnObj = surroundingIndexes[i]

    if (allIndexValuesObj[indexOnObj].isMine) {

      indexOnMineIndexes = mineIndexes.indexOf(indexOnObj)
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

    getAllIndexValues() // Have to do this after defining the mine indexes because cells wont have proper values until then
  }

  openNewSquare(index)

}


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


  assignMineIndexes()
}