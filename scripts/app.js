// Testing
function init() {

  // ? Link in other script files

  const jsFiles = ['variables', 'elements', 'snippets', 'executions', 'events', 'default-setup']
  
  function include(filename){
      var head = document.getElementsByTagName('head')[0]

      var script = document.createElement('script')
      script.src = `scripts/${filename}.js`
      script.type = 'text/javascript'

      head.appendChild(script)
  }
  
  for (let i = 0; i < jsFiles.length; i++) {
    include(jsFiles[i])
  }

}

window.addEventListener('DOMContentLoaded', init)