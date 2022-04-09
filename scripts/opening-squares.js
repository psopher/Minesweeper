console.log('Opening-Squares.js Included!')

// Open new square
function openNewSquare(index = -1) {
  if (-1 < index < levelRules[levelString].cellCount && !allIndexValuesObj[index].opened && !allIndexValuesObj[index].hasFlag) {  
    const indexOnObj = allIndexValuesObj[index]
    indexOnObj.opened = true
    const indexesSurrounding = indexOnObj.neighborIndexes
    const unopenSurrounding = unopenedSurroundingIndexes(indexesSurrounding)
    
    let minesSurrounding = 0

    cells[index].classList.add(indexOnObj.revealValue)

    openedIndexes.push(index)

    // If value is 0, open all surrounding squares, ad infinitum
    if (indexOnObj.revealNumber === 0 && unopenSurrounding.length > 0 && !gameFinished) {

      for (let i = 0; i < unopenSurrounding.length; i++) {
        openNewSquare(unopenSurrounding[i])
      }
    } else if (gameFinished) {
      let allUnopenedArray = revealAllUnopened()

      for (let i = 0; i < allUnopenedArray.length; i++) {
        openNewSquare(allUnopenedArray[i])
      }
    }
  }
}