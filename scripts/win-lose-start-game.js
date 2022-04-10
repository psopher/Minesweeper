console.log('Win-Lose-Start-Game.js Included!')

// Won and Lost
function wonGame() {
  console.log('WON GAME FIRED')
  
  gameFinished = true
  clearTimerInterval()
  
  flagRemainingSquares()

  resetBtn.className = ''
  resetBtn.classList.add('won-game')
}

function lostGame() {
  console.log('LOST GAME FIRED')

  gameFinished = true
  clearTimerInterval()
}

// Start Game
function startGame(index = -1) {
  console.log('START GAME FIRED')
  
  gameFinished = false

  reAssignMineIndexes(index)

  setTimerInterval()
}