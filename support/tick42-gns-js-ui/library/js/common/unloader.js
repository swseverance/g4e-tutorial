var logger = require('js-logger').get('unloader')

var actList = []
var lastAction

var unloader = module.exports = {}

unloader.init = function(){
    logger.debug('Initializing unloader.')

    window.addEventListener("unload", function executeUnload(ev) {
        logger.debug('Executing unload.')

        actList.forEach(function(action){
            action()
        })

        if(lastAction){
            lastAction()
        }
    })
}

unloader.add = function(action){
    if( typeof action !== 'function' ){
        return;
    }

    actList.push(action)
}

unloader.addLast = function(action){
    if( typeof action !== 'function' ){
        return;
    }

    if( typeof lastAction === 'function' ){
        throw new Error('There is already a last action defined. There can be only one.')
    }

    lastAction = action
}

unloader.closePolitely = function(){
    var evt = new Event('unload')
    window.dispatchEvent(evt)

    glue.windows.my().close()
}