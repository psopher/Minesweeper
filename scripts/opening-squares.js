console.log('Opening-Squares.js Included!')

// Open new square
function openNewSquare(index = -1) {

  const indexOnObj = allIndexValuesObj[index]

  if (gameFinished && !minesShown && -1 < index < levelRules[levelString].cellCount) {
    
    
    // Setting the that was clicked to the mine-opened class
    indexOnObj.isMine = false
    indexOnObj.opened = true
    cells[index].className = ''
    cells[index].classList.add('mine-opened')
    openedIndexes.push(index)

    //Revealing all mine squares after the game is lost
    let allUnopenedArray = revealAllUnopened()

    for (let i = 0; i < allUnopenedArray.length; i++) {
      let indexValue = allUnopenedArray[i]
      cells[indexValue].className = ''
      cells[indexValue].classList.add(indexOnObj.revealValue)
      openedIndexes.push(indexValue)
    }
    

    //Setting this to true so that this method only fires once, since mines are now revealed
    minesShown = true
  
  } else if (-1 < index < levelRules[levelString].cellCount && !allIndexValuesObj[index].opened && !allIndexValuesObj[index].hasFlag && !minesShown) {  

    // Opening an index during the course of a game
    indexOnObj.opened = true
    
    let minesSurrounding = 0

    const indexesSurrounding = indexOnObj.neighborIndexes
    const unopenSurrounding = unopenedSurroundingIndexes(indexesSurrounding)

    cells[index].className = ''
    cells[index].classList.add(indexOnObj.revealValue)
    openedIndexes.push(index)
    
    // If value is 0, open all surrounding squares, ad infinitum
    if (indexOnObj.revealNumber === 0 && unopenSurrounding.length > 0) {
      for (let i = 0; i < unopenSurrounding.length; i++) {
        openNewSquare(unopenSurrounding[i])
      }
    } 
  } 
}