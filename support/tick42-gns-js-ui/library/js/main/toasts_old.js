require('jquery-ui')
var _ = require('lodash')
var gns_utils = require('../gns/utilityGns')
var config = require('./config')
var logger = require('js-logger').get('toasts')

var categories
var sources
var detailsPopups
var grid

var MAX_POPUPS = 5 //TODO: move this to config - need more advanced toastPool management
var HANG_TIME = config.toast.hangTime //milliseconds

var loadedCounter = 0 //when this reaches MAX_POPUPS -> all toast frames have init'ed

var toastNifs = [] //latest pushed is at the right-most slot
var toastPool = [] //top Toast is at the right-most slot

var toasts = module.exports = {}

toasts.popup = function popup(nif, forceToast){
    var checkbox = document.querySelector('#enable-toasts')
    if( ! checkbox.checked){
        return;
    }

    nif = _.cloneDeep(nif)
    var src = nif.source ? sources.getByName(nif.source) : undefined
    var catsOrdered = nif.category ? categories.getOrderedArrWithAncestors(nif.category) : []
    gns_utils.merge(nif, src, catsOrdered)

    if(nif.glueRouting && nif.glueRouting.popupMethod && !forceToast){
        gns_utils.invokeGlueRoutingMethod(nif.glueRouting.popupMethod, nif)
    } else {
        nativeToast(nif)
    }
}

toasts.init = function initToastPool(cats, srcs, details, gridRef){
    categories = cats
    sources = srcs
    detailsPopups = details
    grid = gridRef

    window.addEventListener("unload", function closeToastPool(ev) {
        logger.debug('Closing all toast windows.')
        //close all the toasts on refresh
        toastPool.forEach(function(t){ t.close() })
    })

    window.addEventListener("message", function getMsg(ev){
        //console.log('message', ev)
        if(ev.data.isReady !== undefined) {
        //console.log(loadedCounter, ev)

            ev.source.toastApi.registerCloseListener(closeToast)
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

    var bottomOfWorkArea = primary.workingAreaHeight * primary.scaleY
    var rightOfWorkArea = primary.workingAreaWidth * primary.scaleX

    var width = 200
    var height = 50

    var marginRight = 20 * primary.scaleY//multiply by scaleFactor if need to maintain 'physical' margin size
    var marginBottom = 15 * primary.scaleX

    var topPositions = []

    var currentTopPosn = bottomOfWorkArea

    for(var i = 0; i < MAX_POPUPS; i += 1){
        var top = currentTopPosn - ((i+1)*(height + marginBottom))
        topPositions.push(top)
    }

    var left = (rightOfWorkArea) - (width + marginRight)

    var size = "width=" + width + ", height=" + height + ","

    var windowStyleAttributes = "{isSticky:false,windowStyleAttributes:{"
        + "onTop:true,"
        + "focus:false,"
        + "mode:'html',"
        + "showInTaskbar:false,"
        + "hidden:true,"
        + "hasSizeAreas:false,"
        + "hasMoveAreas:false,"
        + "allowClose:false,"
        + "allowMinimize:false,"
        + "allowMaximize:false,"
        //+ "moveAreaTopMargin:'0,0,0,0'"
        + "}}"

    //console.log(left)

    topPositions.forEach(function(tPos){
        var position = "top=" + tPos + ", left=" + left + ","
        var config = position + size + windowStyleAttributes
        var toast = window.open(newRef, '_blank', config)
        toastPool.push(toast) //toastPool[0] is the collector if more than 5 new notifications
    })

    logger.info('Toast pool initialized with: ', {poolLength: toastPool.length})

    setInterval(function filterOldPopups(){
        var holdToasts = document.querySelector('#hold-toasts')
        if(holdToasts.checked){
            return;
        }

        var now = Date.now()
        var oldLength = toastNifs.length

        toastNifs = toastNifs.filter(function(el){
            return (now - el.toastTimestamp) < HANG_TIME
        })

        if(toastNifs.length !== oldLength){
            nativeToast()
        }

    }, 1200)
    logger.debug('Filtering toasts at 1200ms for hang time of: ', HANG_TIME )
}

toasts.closeAll = function closeAllToasts(){
    toastNifs = []
    nativeToast()
}

function nativeToast(nif){

    if(nif){
        var toastTimestamp = Date.now()
        nif.toastTimestamp = toastTimestamp

        toastNifs.push(nif)
    }

    if(loadedCounter < MAX_POPUPS){
        //the toasts have not loaded yet - prevent calling toastApi methods on undefined
        return;
    }

    var nifCount = toastNifs.length

    var poolLength = toastPool.length

    if(nifCount <= poolLength){
        for(var i = 0; i < poolLength; i += 1){
            if(toastPool[i].toastApi){
                if( i < nifCount){

                    toastPool[i].toastApi.setToast(false, _.cloneDeep(toastNifs[i]), false)

                } else {

                    toastPool[i].toastApi.setToast(true)

                }
            }
        }
    } else {
        //console.log('collecting')

        var collectedCount = nifCount - (poolLength - 1)

        var i = 1
        var j = collectedCount

        while( i < poolLength && j < nifCount ){
            toastPool[i].toastApi.setToast(false, toastNifs[j], false)

            i++
            j++
        }

        //console.log(i, j, toastPool)

        //the collector
        var bottomToast = toastPool[0]
        bottomToast.toastApi.setToast(false, undefined, true, collectedCount)
    }
}

function closeToast(isCollector, nifId, showDetails, mergedNif){

    if(isCollector){
        var sliceStart = 1 - MAX_POPUPS
        toastNifs = toastNifs.slice(sliceStart)

    } else if(nifId !== undefined) {
        var elementPos = toastNifs
            .map(function(el) {
                return el.id
            })
            .indexOf(nifId)

        toastNifs.splice(elementPos, 1)

        if(showDetails){

            var rowData = mergedNif

            detailsPopups.open(rowData, false, sources, categories)

        }
    }

    nativeToast()
}