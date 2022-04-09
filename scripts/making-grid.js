console.log('Making-Grid.js Included!')

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

  getAllIndexValues() // Have to do this after defining the mine indexes because cells wont have proper values until then
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
}