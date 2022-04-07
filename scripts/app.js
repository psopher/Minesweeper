// Testing
function init() {

  // ? Variables

  // Numbers
  let level = 1 // 1 is beginner level, 2 is intermediate, 3 is expert
  let timerStart = 0
  
  // Intervals
  let timerInterval
  
  // Arrays
  const mineIndexes = []
  const openedIndexes = []
  const isFlagged = []
  const cells = []

  // Objects
  const levelRules = {
    beginner: {
      mineCount: 10,
      width: 8,
      height: 8,
      cellCount: 64
    },
    intermediate: {
      mineCount: 20,
      width: 16,
      height: 16,
      cellCount: 256
    },
    expert: {
      mineCount: 99,
      width: 30,
      height: 16,
      cellCount: 480
    }
  }


  // ? Elements

  // Grid
  const grid = document.querySelector('#grid')
  
  // Counts
  const timer = document.querySelector('#timer')
  const minesRemaining = document.querySelector('mines-remaining')

  // Buttons
  const resetBtn = document.querySelector('#reset')
  const beginnerBtn = document.querySelector('#beginner')
  const intermediateBtn = document.querySelector('#intermediate')
  const expertBtn = document.querySelector('#expert')




  // ? Execution

  // Create the grid
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

  function createGrid() {
    console.log('CREATE GRID FIRED')
    
    const gridType = getGridType()
    for (let i = 0; i < levelRules[gridType].cellCount; i++) {
      const cell = document.createElement('div')
      // Add cell index as the cell id 
      cell.id = i
      cell.classList.add('unopened')
      // Add this item into the grid container
      grid.appendChild(cell)
      // Add the cell to the cells array
      cells.push(cell)
    }
  }

  function removeCells(){
    cells = []
  }


  // Revealing and Flagging Squares 
  function revealSquare() {
    console.log('REVEAL SQUARE FIRED')
  }

  function flagSquare() {
    console.log('FLAG SQUARE FIRED')
  }

  function revealSurroundingSquares() {
    console.log('REVEAL SURROUNDING SQUARES FIRED')
  }


  // Handling Buttons
  function handleReset() {
    console.log('HANDLE RESET FIRED')
  }

  function setLevel() {
    console.log('SET LEVEL FIRED')
  }

  function startGame() {
    console.log('START GAME FIRED')
  }

  // Won and Lost
  function wonGame() {
    console.log('WON GAME FIRED')
  }

  function lostGame() {
    console.log('LOST GAME FIRED')
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




  // ? Events
  
  // Prevent right-click default
  window.addEventListener('contextmenu', e => e.preventDefault());
  
  // Execute flagSquare function on right-click
  cells.forEach(cell => cell.addEventListener('contextmenu', flagSquare))
  
  // Execute revealSquare function on left-click
  cells.forEach(cell => cell.addEventListener('click', revealSquare))
  
  // Button events
  resetBtn.addEventListener('click', handleReset)
  beginnerBtn.addEventListener('click', setLevel)
  intermediateBtn.addEventListener('click', setLevel)
  expertBtn.addEventListener('click', setLevel)




  // ? Default set-up
  
  //Create the grid
  createGrid()

}

window.addEventListener('DOMContentLoaded', init)