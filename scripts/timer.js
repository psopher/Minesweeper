console.log('Timer.js Included!')


// Setting and Clearing the Time Interval

function resetTimer () {
  console.log('RESET TIMER INTERVAL FIRED')
  timerStart = 0
  timer.innerHTML = timerStart
}

function clearTimerInterval() {
  console.log('CLEAR TIMER INTERVAL FIRED')
  if (timerInterval) {
    clearInterval(timerInterval)
  }
}

function setTimerInterval() {
  console.log('SET TIMER INTERVAL FIRED')
  
  function timerCount() {
    if (0 <= timerStart < 1000) {
      timerStart++
      timer.innerHTML = timerStart
    } else {
      clearTimerInterval()
    }  
  }

  timerInterval = setInterval(timerCount, 1000)

}
