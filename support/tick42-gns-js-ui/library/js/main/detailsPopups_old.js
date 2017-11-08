;return;

var _ = require('lodash')
var gns_utils = require('../gns/utilityGns')
var logger = require('js-logger').get('detailsPopups')

var dWin = module.exports = {}

var windHash = {} //{ nifID: {popup window object}, ... }
var grid

dWin.init = function(gridRef){
    grid = gridRef
}

function openOnData(data, forceDefault, sources, categories){
    //get the source
    var src = data.source ? sources.getByName(data.source) : undefined

    var catsOrdered = data.category ? categories.getOrderedArrWithAncestors(data.category) : []

    //merge data(notification) with source + categories
    gns_utils.merge(data, src, catsOrdered)

    if(hasDetailMethod(data) && !forceDefault){
        gns_utils.invokeGlueRoutingMethod(data.glueRouting.detailMethod, data)

        return;
    }

    var oldRef = window.location.href
    var newRef = ( oldRef.replace('index.html', '') ) + 'default.html'

    // check if the name is in the bag
    var nifId = data.id
    var popup = windHash[nifId]

    if( popup && (popup.closed !== true) ) {
        popup.glue.windows.my().focus()
        popup.focusAnimation()
    } else {
        popup = window.open(newRef, '_blank', "width=656,height=715,{isSticky:false,windowStyleAttributes:{mode:'html'}}")

        popup.addEventListener('load', function(ev){
            writeNif(popup, data)
        }, false)

        windHash[nifId] = popup

        logger.debug('Opened details for:', nifId)
    }
}

dWin.open = function(data, forceDefault, sources, categories) {
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

            openOnData(templateDataClone, forceDefault, sources, categories)
        }

        function fail(err){
            logger.warn('Failed to set isRead due to:', err.message)
            openOnData(templateDataClone, forceDefault, sources, categories)
        }

        gns_utils.setIsRead(data.id, true, success, fail)

    } else {

        openOnData(templateDataClone, forceDefault, sources, categories)

    }


}

function writeNif(popup, data) {

    //TODO move this to either init() or lazy evaluate it
    var templateHtml = $('#tpl-details').html()
    var compiledTemplate = Handlebars.compile(templateHtml)

    var result = compiledTemplate(data)
    result = '<div id="preview-pane-container">' + result + '</div>'

    //console.log(result)

    var body = ( popup.document.getElementsByTagName('body') )[0]
    body.innerHTML = result

    popup.applyUxWidgets()

    popup.notification = _.cloneDeep(data)
    popup.initInvokers()
}

function hasDetailMethod(nif){
    if(nif.glueRouting && nif.glueRouting.detailMethod) {
        return true
    } else {
        return false
    }
}


