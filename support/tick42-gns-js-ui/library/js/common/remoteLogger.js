var _ = require('lodash')
var rootLogger = require('js-logger')
var usingDefaults = rootLogger.useDefaults()
var handleSet = rootLogger.setHandler(function (messages, context) {
    sendToMain(messages, context)
})

var pushMethod = 'GNSUI.LoggingPort'

var remLog = module.exports = rootLogger

function sendToMain(messages, context){

    messages = _.values(messages)

    var remEntry = {
        time: Date.now(),
        messages:messages,
        context:context
    }

    if(remEntry.context.name){
        remEntry.context.name += (' _' + glue.windows.my().name)
    }

    //console.debug('remEntry', remEntry)

    var args = {serializedEntry: JSON.stringify(remEntry)}

    glue.agm.invoke(pushMethod, args, 'best', {},
        function(d){
            //console.log('Success invoke ' + pushMethod, d)
        },
        function(e){
            console.warn('Failed to send log entry to main.', e) //to console since obviously the log doesn't work
        }
    )

}

