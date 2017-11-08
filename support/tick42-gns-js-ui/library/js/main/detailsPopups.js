var _ = require('lodash')
var cuid = require('cuid')
var gns_utils = require('../gns/utilityGns')
var logger = require('js-logger').get('detailsPopups')
var unloader = require('../common/unloader')

var sources = require('./sources')
var categories = require('./categories')

var dWin = module.exports = {}

var nifIdToWinDictionary = {} //{ nifID: {glue window object}, ... }
var nameToNifIdDictionary = {} //{ windowName: nifId, ... }
var grid
var inputMethod = 'GNSUI.DefaultDetailsView'

dWin.init = function(gridRef){
    grid = gridRef

    listenForDefWindowServerMethod()

    unloader.add(function(){
        logger.debug('Closing all default details windows.')
        _.forOwn(nifIdToWinDictionary, function(remote, nifid){
            if(remote && typeof remote.close === 'function') {
                remote.close()
            }
        })
    })
}

function listenForDefWindowServerMethod(){

    glue.agm.server_method_added(function(obj){

        //check method name
        if( obj.method.name !== inputMethod ){
            return
        }

        //extract possible windowName
        if (typeof obj.server.application !== 'string'){
            return
        }

        var windowName = obj.server.application.replace(htmlContainer.containerName, '').slice(1)

        //check in the nameToNif dict
        var nifId = nameToNifIdDictionary[windowName]

        if(typeof nifId !== 'string'){
            return
        }

        sendNotification(nifId, obj.server)

    })

}

function sendNotification(nifId, targetServer){

    var notification
    
    //get the data for this id form the grid
    var searchResult = grid.row(function(idx, rowdata, node){
        return nifId === rowdata.id
    })

    if(searchResult.length <= 0){
        return;
    }

    notification = _.cloneDeep(searchResult.data())

    //merge
    var src = sources.getByName(notification.source)
    var catsOrdered = categories.getOrderedArrWithAncestors(notification.category)
    gns_utils.merge(notification, src, catsOrdered)

    var args = {
        notification: notification
    }

    glue.agm.invoke(inputMethod, args, targetServer, undefined,
        function(d){ logger.debug('Pushed the notification.',d) },
        function(e){ logger.warn('Push failed.', e) }
    )
}

function openOnData(data, forceDefault){

    //merge
    var src = sources.getByName(data.source)
    var catsOrdered = categories.getOrderedArrWithAncestors(data.category)
    gns_utils.merge(data, src, catsOrdered)

    if(data.glueRouting && data.glueRouting.detailMethod && !forceDefault){
        gns_utils.invokeGlueRoutingMethod(data.glueRouting.detailMethod, data)

        return;
    }

    //else find or create the default window
    var defWindow = nifIdToWinDictionary[data.id]

    glue.windows.list(htmlContainer.containerName, function(list) {

        var defWindowIsOpened = false;

        if (defWindow && typeof defWindow.name === 'string' && Array.isArray(list) ) {
            var matchingWindows = list.filter(function(someWindow){
                return defWindow.name === someWindow.name
            })

            defWindowIsOpened = matchingWindows.length > 0
        }

        if(defWindowIsOpened){

            defWindow.focus()

        } else {

            if( defWindow ) { //There was a window, but it was closed at some point
                // clean the dictionaries
                nameToNifIdDictionary[defWindow.name] = undefined
                nifIdToWinDictionary[data.id] = undefined
            }

            //create name + populate the hash(es)

            var name = cuid()

            var oldRef = window.location.href
            var newRef = ( oldRef.replace('index.html', '') ) + 'default.html'

            nameToNifIdDictionary[name] = data.id
            glue.windows.open(
                name, newRef,
                {width: 656, height: 700, minWidth:656, minHeight:400, mode:'html', showInTaskbar:false, isSticky: false},
                function(newDetailsWindow){
                    logger.debug('Opened new details window.', newDetailsWindow)
                    nifIdToWinDictionary[data.id] = newDetailsWindow
                },
                function(e){
                    logger.warn('Failed to open new details window.', e)
                    //TODO clean the dictionaries - but carefully -> another call may have correctly opened a window already
                }
            )
        }
    })
}

dWin.open = function(data, forceDefault) {
    if(data === undefined || data === null || typeof data !== 'object'){
        logger.error('Invalid data parameter.')
        return
    }

    var templateDataClone = _.cloneDeep(data)

    if( ! data.isRead){
        function success(res){
            var nifToBeInserted = _.cloneDeep(data)

            var searchResult = grid.row(function(idx, rowdata, node){
                return data.id === rowdata.id
            })

            if(searchResult.length > 0){
                nifToBeInserted.isRead = true
                searchResult.data(nifToBeInserted) //cloned data gets re-inserted into the grid after modification
                grid.draw('full-hold')

                templateDataClone = _.cloneDeep(nifToBeInserted)
            }

            openOnData(templateDataClone, forceDefault)
        }

        function fail(err){
            logger.warn('Failed to set isRead due to:', err.message)
            openOnData(templateDataClone, forceDefault)
        }

        gns_utils.setIsRead(data.id, true, success, fail)

    } else {

        openOnData(templateDataClone, forceDefault)

    }
    
}