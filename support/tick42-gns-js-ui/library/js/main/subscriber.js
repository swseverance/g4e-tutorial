var mockedData = require('./mockedData')
var logger = require('js-logger').get('subscriber')

var subscriber = module.exports = {}

var methodNotifications = "T42.GNS.Subscribe.Notifications"
var serverNotifications = "GnsDesktopManager"
var diagnoser
var buffer
var handleNewData
var bufferDisplay

subscriber.methodNotifications = methodNotifications

subscriber.serverNotifications = serverNotifications

subscriber.init = function(refDiagnoser, updateTable, updateSources, updateCategories, handleStreamClosed, refBuffer) {
    subSources(updateSources)
    subCategories(updateCategories)
    subscribe(updateTable, handleStreamClosed)

    diagnoser = refDiagnoser
    buffer = refBuffer
    bufferDisplay = document.querySelector('#buffer-display')
}

subscriber.subSources = subSources
subscriber.subCategories = subCategories
subscriber.subscribe = subscribe
subscriber.toggleBuffering = toggleBuffering
subscriber.bufferSize = bufferSize

function subSources(handleStreamData, handleStreamClosed){
    logger.info('Subscribing to sources.')

    glue.agm.subscribe("T42.GNS.Subscribe.Sources", {target:'best'})
        .then(function(subscription){
            subscription.onData(handleStreamData)
            subscription.onClosed(function(d){logger.warn('sources stream closed')})
            subscription.onFailed(function(d){logger.warn('sources stream failed')})
        })
        .catch(function(error){
            logger.warn('Failed to subscribe to sources stream. ', error)
        })
}

function subCategories(handleStreamData, handleStreamClosed){
    logger.info('Subscribing to categories.')

    glue.agm.subscribe("T42.GNS.Subscribe.Categories", {target:'best'})
        .then(function(subscription){
            subscription.onData(handleStreamData)
            subscription.onClosed(function(d){logger.warn('Categories stream closed.')})
            subscription.onFailed(function(d){logger.warn('Categories stream failed.')})
        })
        .catch(function(error){
            logger.warn('Failed to subscribe to categories stream. ', error)
        })
}

function subscribe(handleStreamData, handleStreamClosed) {
    logger.info('Subscribing to notification stream.')

    var options={
        arguments: {},
        target: 'best',
        waitTimeoutMs: 3000 // ms to wait for the stream to appear, if not available after subscribe will fail - default 3000
    }

    glue.agm.subscribe(methodNotifications, options)
        .then(function(subscription){
            handleNewData = handleStreamData


            subscription.onData(function(returnObj){

                if(buffer && buffer.isActive()) {

                    buffer.fillWith(returnObj)

                    if(bufferDisplay){
                        bufferDisplay.innerText = buffer.count()
                    }

                    return

                } else {

                    handleNewData(returnObj)

                }
            })
            subscription.onClosed(handleStreamClosed)
            subscription.onFailed(handleStreamClosed)
        })
        .catch(function(error){
            logger.warn('Failed to subscribe to notification stream. ', error)
            diagnoser.setNeedToResubscribe(true)
        })


    //full signature
    //T42.GNS.Subscribe.Notifications (Composite:{String[]? attributes, String[]? categories, Bool? includePayload, DateTime? lastModifiedSince, Long? lastSequenceId, Int? limit, String[]? sources, String[]? states, Int? throttlingRate, String[]? types} subscriptionArgs)


    /* testing buttons below */
/*
    $('#test-btn').click(function(e){
        var data = {
            returned:{
                items: mockedData.getData()
            }
        }
        handleStreamData(data)
    })

    $('#get-one-btn').click(function(e){
        var data = {
            returned:{
                items: mockedData.getOne()
            }
        }
        handleStreamData(data)
    })
*/
}

function toggleBuffering(){
    if(! buffer){
        throw new ReferenceError('The buffer is not defined.')
    }

    if(buffer.isActive() ){
        stopBuffering()
    } else {
        beginBuffering()
    }
}

function beginBuffering(){
    buffer.setActive(true)

    if(bufferDisplay){
        bufferDisplay.classList.remove('hidden')
    }
}

function stopBuffering(){
    if( ! buffer.isActive()){
        logger.warn('Cannot stop buffer when it is not active.')
        return
    }

    var cache = null

    buffer.setActive(false)
    if(typeof handleNewData !== 'function'){
        logger.warn('The data handler must be a function.')
        throw new TypeError('The data handler must be a function.')
    }

    cache = buffer.drain()

    if( ! Array.isArray(cache) ){
        throw new TypeError('The buffer must return an array.')
    }

    cache.forEach(function(retObj){
        handleNewData(retObj)
    })

    if(bufferDisplay){
        bufferDisplay.classList.add('hidden')
        bufferDisplay.innerText = 0
    }
}

function bufferSize(){
    if(! buffer){
        logger.warn('The buffer is not defined.')
        throw new ReferenceError('The buffer is not defined.')
    }

    return buffer.count()
}


