console.log('Events Included!')

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