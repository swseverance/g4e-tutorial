var logger = require('js-logger').get('diagnoser')

var diagnoser = module.exports = {}

var dataReceived = false
var needToResubscribe = false
var connectionSquare

diagnoser.init = function diagnose(subscriber, updateTable, updateSources, updateCategories, handleStreamClosed){
    connectionSquare = $('#connection-square')
    
    var level = 'red'

    var methodNotifications = subscriber.methodNotifications
    var serverNotifications = subscriber.serverNotifications

    var methods = glue.agm.methods({"name": methodNotifications})
    if( methods && (Array.isArray(methods)) && (methods.length > 0) ){
        var servers = glue.agm.servers({"name": methodNotifications})
        if( servers && (Array.isArray(servers)) && (servers.length > 0) ){
            level = 'yellow'

            if(dataReceived) {
                level = 'green'
            }
        }
    }

    connectionSquare.css('color', level)

    glue.agm.server_method_added(function(obj){
        //console.log('added', obj.server.application, obj.method.name)

        if( obj.server
            && obj.method
            && obj.server.application === serverNotifications
            && obj.method.name === methodNotifications
        )
        {
            logger.info('Server-method added.')

            connectionSquare.css('color', 'yellow')

            if(needToResubscribe){
                logger.info('Attempting to resubscribe.')
                subscriber.subscribe(updateTable, handleStreamClosed)
                subscriber.subSources(updateSources, function(){logger.info('sources closed')})
                subscriber.subCategories(updateCategories, function(){logger.info('sources closed')})
            }
        }
    })

    glue.agm.server_method_removed(function(obj){
        //console.log('removed', obj.server.application, obj.method.name)

        if( obj.server
            && obj.method
            && obj.server.application === serverNotifications
            && obj.method.name === methodNotifications
        )
        {
            logger.info('Server-method removed.')

            connectionSquare.css('color', 'red')
            needToResubscribe = true
        }
    })
}

diagnoser.setDataReceived = function(hasReceived) {
    if(hasReceived === true){
        dataReceived = true
        connectionSquare.css('color', 'green')
        logger.debug('Data received. Connection is at level green.')
    } else if (hasReceived === false){
        dataReceived = false
    }
}

diagnoser.setNeedToResubscribe = function(resub) {
    if(typeof resub === 'boolean'){
        needToResubscribe = resub
    }
}

