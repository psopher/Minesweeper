console.log('Flagging-Squares.js Included!')

function removeFlag(index = -1) {
  console.log('ADD FLAG FIRED')

  if (index >= 0) {
    cells[index].className = ''
    cells[index].classList.add('unopened')

    const indexOnIsFlagged = isFlagged.indexOf(index)
    isFlagged.splice(indexOnIsFlagged, 1)

    allIndexValuesObj[index].hasFlag = false
  }

}

function addFlag(index = -1) {
  console.log('ADD FLAG FIRED')

  if (index >= 0) {
    cells[index].className = ''
    cells[index].classList.add('flagged')
    
    isFlagged.push(index)

    allIndexValuesObj[index].hasFlag = true
  }
}

function flagRemainingSquares () {
  console.log('FLAG REMAINING FIRED')

  for (let i = 0; i < mineIndexes.length; i++) {
    const mineIndex = mineIndexes[i]

    if (!allIndexValuesObj[mineIndex].hasFlag) {
      addFlag(mineIndex)
    }
  }
  
  minesRemaining.innerHTML = `0`

}