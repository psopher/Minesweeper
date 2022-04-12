console.log('Variables Included!')

// Level Indicators
let level = 1 // 1 is beginner level, 2 is intermediate, 3 is expert
let levelString = 'beginner'

// Start Clock at 0 seconds
let timerStart = 0

// Intervals
let timerInterval

// Bools
let gameFinished = true
let minesShown = false

// Arrays
let mineIndexes = []
let openedIndexes = []
let isFlagged = []
let cells = []

// Objects
let allIndexValuesObj = {} // The big Object containing all cell information

const levelRules = 
{
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
