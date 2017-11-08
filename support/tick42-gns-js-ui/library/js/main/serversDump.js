var logger = require('js-logger').get('serversDump')

var view

var serversDump = module.exports = {}

serversDump.refresh = function(){

    if (view && ! view.closed) {
        view.glue.windows.my().focus()
        view.dumpApi.getServers()

        logger.debug('Refreshing servers.')
    } else {
        var oldRef = window.location.href
        var newRef = ( oldRef.replace('index.html', '') ) + 'servers.html'
        view = window.open(newRef, '_blank')

        logger.info('Opening dump window.')
    }
}
