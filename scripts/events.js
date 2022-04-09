console.log('Events Included!')

// Prevent right-click default
window.addEventListener('contextmenu', e => e.preventDefault());

// Button events
resetBtn.addEventListener('click', handleReset)
beginnerBtn.addEventListener('click', setLevel)
intermediateBtn.addEventListener('click', setLevel)
expertBtn.addEventListener('click', setLevel)

// Reveal square and flag square click events defined in createGrid function
// Important to run createGrid at end of all js files loading
createGrid()
