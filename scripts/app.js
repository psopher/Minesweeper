// Testing
function init () {

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
  const include = async (filename) => {
      var head = await document.getElementsByTagName('head')[0]

      var script = await document.createElement('script')
      script.src = `scripts/${filename}.js`
      script.type = 'text/javascript'

      await head.appendChild(script)
  }
  
  // Delay by 5 milli-seconds when including new js files so that the correct files read first
  for (let i = 0; i < jsFiles.length; i++) {
    setTimeout(function timer() {
      include(jsFiles[i])
    }, i * 10)
  }

  // await include('variables')
  // await include('elements')
  // await include('timer')
  // await include('getting-square-values')
  // await include('making-grid')
  // await include('opening-squares')
  // await include('win-lose-start-game')
  // await include('flagging-squares')
  // await include('executions')
  // await include('events')
  // await include('default-settings')


}

window.addEventListener('DOMContentLoaded', init)