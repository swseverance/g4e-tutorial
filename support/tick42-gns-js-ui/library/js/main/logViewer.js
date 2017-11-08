var _ = require('lodash')
var cuid = require('cuid')
var logger = require('js-logger').get('logViewer')
var unloader = require('../common/unloader')

var logViewer = module.exports = {}

var lsKey = 'GNSUI.log'
var allEntries = getStoredLogs()
var viewPane
var displayMethod = 'GNSUI.DisplayLog'
var inputMethod = 'GNSUI.LoggingPort'


// TODO replace this logger with glue logging


logViewer.pushMsg = function(messages, context){

    //disables logger-caused error
    return;

    messages = _.values(messages)

    var entry = {
        time: Date.now(),
        messages:messages, 
        context:context
    }

    var stringer = JSON.stringify(entry)

    allEntries.push(stringer)//because the AGM does not like nested arrays of mixed types...yet.

    if(viewPane && viewPane.opened()){
        sendNewLogEntry(stringer)
    }
}

logViewer.open = function(){
    if(viewPane && viewPane.opened()){
        viewPane.focus(
            function(d){logger.info('Focused the log window.', d)},
            function(e){logger.warn('Failed to focus the log window.', e)}
        )
    } else if(viewPane) {
        viewPane.open( {},{},
            function(d){logger.info('Reopened the log window.', d)},
            function(e){logger.warn('Failed to reopen the log window.', e)})
    } else {
        var oldRef = window.location.href
        var newRef = ( oldRef.replace('index.html', '') ) + 'log.html'

        glue.windows.open('log-viewer', newRef, {},
            function success(containerWindow){
                viewPane = containerWindow
                logger.info('Opened log viewer.', viewPane)
            },
            function error(reason){
                logger.warn('Failed to open log viewer.',reason)
            }
        )
    }
}

/**
 * Provides a way for remote windows to send their log entries to the main
 */
//TODO extract both into an init() method and figure out when/where to call it
/*glue.agm.register(inputMethod, function(args){
    
    if(typeof args.serializedEntry !== 'string'){
        return;
    }

    allEntries.push(args.serializedEntry)

    if(viewPane && viewPane.opened()){
        sendNewLogEntry(args.serializedEntry)
    }
})

/**
 * Detects when the display window is open and ready to receive all the logs
 */
/*glue.agm.server_method_added(function(obj){
    if( obj.server
        && obj.method
        && obj.method.name === displayMethod
    )
    {
        //console.log('server_method_added', obj.method.name, obj.server.application)
        //console.log('allEntries for the invoke', allEntries)
        sendCurrentLogs()
    }
})

/**
 * Makes sure the logs get saved and the display window is closed, but only 
 * after all other unload actions are performed (i.e. close toasts)
 */
unloader.addLast(function closeLogWindow() {
    logger.debug('Attempting to close log window.')

    localStorage.setItem(lsKey, JSON.stringify(allEntries))
    
    if(viewPane){
        viewPane.close()
    }
})

function getStoredLogs() {
    var storedLogs = localStorage.getItem(lsKey)
    if( ! storedLogs ){
        return []
    }

    var logsArr = JSON.parse(storedLogs)
    if ( ! Array.isArray(logsArr)){
        return []
    }

    return logsArr
}

/**
 * Send a snapshot of all the logs accumulated up tot his point
 */
function sendCurrentLogs(){
    var invoCuid = cuid()

    glue.agm.invoke(
        displayMethod,
        {allEntries: allEntries, invoCuid: invoCuid},
        'best',
        {},
        function(d){
            //console.log('Success invoke ' + displayMethod, d)
        },
        function(e){
            console.warn('Failed to send current logs.', invoCuid, e) //to console since obviously the log doesn't work
        }
    )
}

function sendNewLogEntry(stringEntry){
    glue.agm.invoke(
        displayMethod,
        {singleEntry: stringEntry},
        'best',
        {},
        function(d){
            //console.log('Success invoke ' + displayMethod, d)
        },
        function(e){
            console.warn('Failed to send single entry.', e) //to console since obviously the log doesn't work
        }
    )
}