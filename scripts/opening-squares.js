console.log('Opening-Squares.js Included!')

// Open new square
function openNewSquare(index = -1) {

  const indexOnObj = allIndexValuesObj[index]

  if (gameFinished) {
    let allUnopenedArray = revealAllUnopened()

    for (let i = 0; i < allUnopenedArray.length; i++) {
      let indexValue = allUnopenedArray[i]
      cells[indexValue].classList.add(indexOnObj.revealValue)
      openedIndexes.push(indexValue)
    }
    minesShown = true
  
  } else if (-1 < index < levelRules[levelString].cellCount && !allIndexValuesObj[index].opened && !allIndexValuesObj[index].hasFlag) {  

    indexOnObj.opened = true
    
    let minesSurrounding = 0

    const indexesSurrounding = indexOnObj.neighborIndexes
    const unopenSurrounding = unopenedSurroundingIndexes(indexesSurrounding)

    if (!minesShown) {
      cells[index].classList.add(indexOnObj.revealValue)
      openedIndexes.push(index)
    }
    

    // If value is 0, open all surrounding squares, ad infinitum
    if (indexOnObj.revealNumber === 0 && unopenSurrounding.length > 0) {
      for (let i = 0; i < unopenSurrounding.length; i++) {
        openNewSquare(unopenSurrounding[i])
      }
    } 
  } 
}