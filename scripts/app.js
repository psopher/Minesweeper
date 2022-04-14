// Testing
function init() {

  // Array of other script files
  const jsFiles = ['variables', 
                    'elements', 
                    'timer', 
                    'getting-square-values', 
                    'making-grid', 
                    'opening-squares', 
                    'win-lose-start-game', 
                    'flagging-squares', 
                    'executions', 
                    'events',
                    'default-settings']

  // Include the other script files
  function include(filename){
      var head = document.getElementsByTagName('head')[0]

      var script = document.createElement('script')
      script.src = `scripts/${filename}.js`
      script.type = 'text/javascript'

      head.appendChild(script)
  }
  
  // Delay by 5 milli-seconds when including new js files so that the correct files read first
  for (let i = 0; i < jsFiles.length; i++) {
    setTimeout(function timer() {
      include(jsFiles[i])
    }, i * 10)
  }

}

window.addEventListener('DOMContentLoaded', init)