// Testing
function init() {

  // ? Link in other script files

  const jsFiles = ['variables', 
                    'elements', 
                    'timer-snippets', 
                    'getting-square-values', 
                    'making-grid', 
                    'opening-squares', 
                    'win-lose-start-game', 
                    'flagging-squares', 
                    'executions', 
                    'events']

  function include(filename){
      var head = document.getElementsByTagName('head')[0]

      var script = document.createElement('script')
      script.src = `scripts/${filename}.js`
      script.type = 'text/javascript'

      head.appendChild(script)
  }
  
  for (let i = 0; i < jsFiles.length; i++) {
    setTimeout(function timer() {
      include(jsFiles[i])
    }, i * 5)
  }

}

window.addEventListener('DOMContentLoaded', init)