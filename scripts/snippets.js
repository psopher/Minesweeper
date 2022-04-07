console.log('Snippets Included!')


// Code snippet that makes createGrid more DRY
function getGridType() {
  console.log('getGridType FIRED')
  if (level === 1) {
    return 'beginner'
  } else if (level === 2) {
    return 'intermediate' 
  } else if (level === 3) {
    return 'expert'
  } else {
    console.log(`Level: ${level} doesnt exist`)
  }
}

// Clears cells from the grid
function removeCells(){
  cells = []
  grid.replaceChildren = cells
}




// Randomly Assigning Mine Indexes
function assignMineIndexes() {
  console.log('ASSIGN MINE INDEXES FIRED')
}

// Setting and Clearing the Time Interval
function setTimerInterval() {
  console.log('SET TIMER INTERVAL FIRED')
}

function clearTimerInterval() {
  console.log('CLEAR TIMER INTERVAL FIRED')
}