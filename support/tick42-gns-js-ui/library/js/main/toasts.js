var _ = require('lodash')
var cuid = require('cuid')
var gns_utils = require('../gns/utilityGns')
var config = require('./config')
var logger = require('js-logger').get('toasts')
var unloader = require('../common/unloader')

var categories = require('./categories')
var sources = require('./sources')
var detailsPopups = require('./detailsPopups')
var grid

var MAX_POPUPS = 5 //TODO: move this to config - need more advanced toastPool management
var inputMethod = 'GNSUI.ToastFrame.Port'
var feedbackMethod = 'GNSUI.ToastManager.Port'

var loadedCounter = 0 //when this reaches MAX_POPUPS -> all toast frames have init'ed

var toastNifs = [] //latest pushed is at the right-most slot

//TODO rename this to "framePool" because it holds the toasts frames
var toastPool = [] //top ToastFrame is at the right-most slot
// {frame: {glue_win_obj}, server: {obj.server}}, {frame: ...}

var debouncedDistribution = _.debounce(function(){toastDistributor()}, 300, {maxWait: 1000})

var toasts = module.exports = {}

toasts.popup = function popup(nif, forceToast){
    if( ! config.toast.enabled){
        return;
    }
    
    nif = _.cloneDeep(nif)

    //merge
    var src = sources.getByName(nif.source)
    var catsOrdered = categories.getOrderedArrWithAncestors(nif.category)
    gns_utils.merge(nif, src, catsOrdered)

    if(nif.glueRouting && nif.glueRouting.popupMethod && !forceToast){
        gns_utils.invokeGlueRoutingMethod(nif.glueRouting.popupMethod, nif)
    } else {
        nativeToast(nif)
    }
}

toasts.init = function initToastPool(gridRef){

    //TODO break this up into listeners, sizePositions, hangTimeInterval

    grid = gridRef

    registerToastManager()

    unloader.add(function closeToastPool() {
        logger.debug('Closing all toast windows.')
        //close all the toastFrame on refresh
        toastPool.forEach(function(t){ t.frame.close() })
    })

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

        //check in the framePool
        var searchRes = toastPool.filter(function(item){
            return item.frameName === windowName
        })
        if(searchRes.length === 1){
            searchRes[0].server = obj.server
            loadedCounter++
            if(loadedCounter >= MAX_POPUPS){
                //console.log('All popups are loaded')
                //console.log(toastPool)
                nativeToast() //to load the immediate snapshot
            }
        }

    })

    var oldRef = window.location.href
    var newRef = oldRef.replace('index.html', '') + 'toast.html'

    /* DPI corrections */
    var primaryPos = htmlContainer.monitors.map(function(el){
        return el.isPrimary
    }).indexOf(true)

    var primary = htmlContainer.monitors[primaryPos]

    var bottomOfWorkArea = primary.workingAreaHeight
    var rightOfWorkArea = primary.workingAreaWidth

    var width = 200
    var height = 50

    var marginRight = 20
    var marginBottom = 15

    var topPositions = []

    var currentTopPosn = bottomOfWorkArea

    for(var i = 0; i < MAX_POPUPS; i += 1){
        var top = currentTopPosn - ((i+1)*(height + marginBottom))
        topPositions.push(top)
    }

    var left = (rightOfWorkArea) - (width + marginRight)

    //console.log(left)

    topPositions.forEach(function(tPos){

        var windowStyle = {
            isSticky:false,
            onTop:true,
            focus:false,
            mode:'html',
            showInTaskbar:false,
            hidden:true,
            hasSizeAreas:false,
            hasMoveAreas:false,
            allowClose:false,
            allowCollapse:false,
            allowMinimize:false,
            allowMaximize:false
            // moveAreaTopMargin:'0,0,0,0'
        }

        var dimensions = {top: tPos, left: left, width: width, height: height}

        var name = cuid()

        var toastRef = {
            frameName: name,
            frame: undefined,
            server: undefined
        }

        toastPool.push(toastRef)

        var options = _.assign({}, dimensions, windowStyle)

        glue.windows.open(
            name, newRef, options,
            function(returnedFrame){
                //logger.debug('Created frame.', returnedFrame)
                toastRef.frame = returnedFrame
            },
            function(e){
                logger.warn('Failed to create frame', e)
                // log the error
                // clean the dictionaries - but carefully -> another call may have correctly opened a window already
            }
        )

        //toastPool[0] is the collector if more than 5 new notifications

    })

    logger.info('Toast pool initialized with: ', {poolLength: toastPool.length})

    setInterval(function filterOldPopups(){
        if(config.toast.hold){
            return;
        }

        var now = Date.now()
        var oldLength = toastNifs.length

        toastNifs = toastNifs.filter(function(el){
            return (now - el.toastTimestamp) < config.toast.hangTime
        })

        if(toastNifs.length !== oldLength){
            nativeToast()
        }

    }, 1200)
    logger.debug('Filtering toasts at 1200ms for configured hang time')
}

toasts.closeAll = function closeAllToasts(){
    toastNifs = []
    nativeToast()
}

function registerToastManager(){
    var methodDefinition = {
        name: feedbackMethod,
        description: 'Allows toasts to talk to the main window when closing or invoking detailMethod.',
        version: 1
    }

    glue.agm.register(methodDefinition, function(toastMsg){

        var isCollector = toastMsg.isCollector
        var nifId = toastMsg.nifId
        var showDetails = toastMsg.showDetails


        if(isCollector){
            var sliceStart = 1 - MAX_POPUPS
            toastNifs = toastNifs.slice(sliceStart)
            glue.windows.my().focus()

        } else if(nifId !== undefined) {
            var elementPos = toastNifs
                .map(function(el) {
                    return el.id
                })
                .indexOf(nifId)

            toastNifs.splice(elementPos, 1)

            if(showDetails){

                var searchResult = grid.row(function(idx, rowdata, node){
                    return nifId === rowdata.id
                })

                if(searchResult.length === 1){
                    var rowData = searchResult.data()
                    detailsPopups.open(rowData, false) //false since source/cat detail method could've just arrived
                } else {
                    logger.warn('Unable to find notification with id:', nifId)
                }
            }
        }

        nativeToast()
    })

}

function nativeToast(nif){

    if(nif){
        var toastTimestamp = Date.now()
        nif.toastTimestamp = toastTimestamp

        toastNifs.push(nif)
    }

    if(loadedCounter < MAX_POPUPS){
        //the toasts have not loaded yet - prevent invoking inputMethod
        return;
    }

    // this way the nif gets pushed in the toastNifs[], but
    // rendering async calls only fire every 300ms at the fastest
    debouncedDistribution()
}

function toastDistributor(){
    // console.log('called distributor')

    var nifCount = toastNifs.length

    var poolLength = toastPool.length

    if(nifCount <= poolLength){

        for(var i = 0; i < poolLength; i += 1){

            //TODO add check to make sure this is a functional frame
            if(true){
                if( i < nifCount){

                    setToast(toastPool[i], false, _.cloneDeep(toastNifs[i]), false)

                } else {

                    setToast(toastPool[i], true) //hide

                }
            }
        }

    } else {
        //console.log('collecting')

        var collectedCount = nifCount - (poolLength - 1)

        var i = 1
        var j = collectedCount

        while( i < poolLength && j < nifCount ){
            setToast(toastPool[i], false, toastNifs[j], false)

            i++
            j++
        }

        //console.log(i, j, toastPool)

        //the collector
        var bottomToast = toastPool[0]
        setToast(bottomToast, false, undefined, true, collectedCount)
    }
}

function setToast(toastFrame, hide, mergedNif, isCollector, collectedCount){

    var target = toastFrame.server

    if( !target ){
        return;
    }

    var parameters = {
        hidden: hide,
        notification: mergedNif,
        isCollector: isCollector,
        collectedCount: collectedCount
    }

    glue.agm.invoke(inputMethod, parameters, target, undefined,
        function(d){ logger.debug('Sent toast nif to frame',d) },
        function(e){ logger.warn('Failed to send toast', e) }
    )
}