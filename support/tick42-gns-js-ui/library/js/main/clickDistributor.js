require('jquery-ui')
var _ = require('lodash')
var previewPane = require('./previewPane')
var logViewer = require('./logViewer')
var serversDump = require('./serversDump')
var logger = require('js-logger').get('clickDistributor')
var unloader = require('../common/unloader')
var config = require('./config')

var contextMenu

module.exports = function clickDistributor(event, grid, detailsPopups, sources, categories, toasts, subscriber) {
    if( ! contextMenu ){ contextMenu = $('#context-menu') }
    contextMenu.hide()

    var actionAttr = event.target.getAttribute('data-action')

    if ((actionAttr === null && typeof actionAttr === "object") || actionAttr === 'nif_row') {
        //check if this was a click on a row
        var trIndex = _.findIndex(event.path, function (el) {
            return el.nodeName === 'TR'
        })

        if (trIndex >= 0) {
            var targetRow = event.path[trIndex]
            actionAttr = targetRow.getAttribute('data-action')
            if (actionAttr === 'nif_row') {
                var nifId = targetRow.getAttribute('id')//

                var rowData = grid.row(targetRow).data()
                //previewPane.renderPreview(rowData)

                if(event.type === 'dblclick') {
                    detailsPopups.open(rowData, false, sources, categories)
                    //console.log(rowData)
                    clearSelection()
                    //$(targetRow).removeClass('unread') //this is not the clickDist's job
                }

                if(event.type === 'contextmenu') {
                    //console.log('show ctx click x -- y', event.x, event.y)

                    //console.log('css left/top before', contextMenu.css('left'), contextMenu.css('top'))
                    var width = 130
                    var leftness = ( event.x > (window.innerWidth-width) ) ? (event.x - width) : event.x
                    contextMenu.css('left', leftness)
                    contextMenu.css('top', event.y)
                    //console.log('css left/top after', contextMenu.css('left'), contextMenu.css('top'))

                    contextMenu.show()

                    var btnOpenDef = document.getElementById('btn-open-default')
                    btnOpenDef.setAttribute('data-nifid', nifId)
                }

                //TODO open the actions floating panel dialog
            }
        }

        //check if it was click on a column search dropdown
        var optionIndex = _.findIndex(event.path, function (el) {
            return (el.nodeName === 'LI' && el.className === "select-icon")
        })

        if (optionIndex >= 0) {
            var targetItem = event.path[optionIndex]
            var colIndex = targetItem.getAttribute('data-colindex')
            var itemValue = targetItem.getAttribute('data-value')
            grid.column(colIndex)
                .search(itemValue, false, false)
                .draw()
        }

    } else if (actionAttr === 'respond') {
        console.log('sending response')
        //TODO invoke the response
    } else if (actionAttr === 'toggle-preview' && event.type === 'click') {
        previewPane.togglePreviewPaneVisibility()
    } else if (actionAttr === 'open-default' && event.type === 'click') {

        var nifId = event.target.getAttribute('data-nifid')

        var node = document.getElementById(nifId)

        var rowData = grid.row(node).data()

        detailsPopups.open(rowData, true, sources, categories)

        //$(node).removeClass('unread') not the click-distributor's job

    } else if (actionAttr === 'show-event-log' && event.type === 'click') {
        eventLog.open()
    } else if (actionAttr === 'clr-all-data' && event.type === 'click') {
        grid.clear().draw()
    } else if (actionAttr === 'close-all-toasts' && event.type === 'click') {
        toasts.closeAll()
    } else if (actionAttr === 'open-config-modal' && event.type === 'click') {
        config.open()
    } else if (actionAttr === 'close-config-modal' && event.type === 'click') {
        config.close()
    } else if (actionAttr === 'save-config-modal' && event.type === 'click') {
        config.save()
    } else if (actionAttr === 'get-servers' && event.type === 'click') {
        serversDump.refresh()
    } else if (actionAttr === 'open-snippets' && event.type === 'click') {
        var oldRef = window.location.href
        var newRef = ( oldRef.replace('index.html', '') ) + 'snippets.html'
        popup = window.open(newRef, '_blank')
    } else if (actionAttr === "page-size" && event.type === 'click'){
        var newSize = event.target.getAttribute('data-value')
        if(0 < newSize && newSize <= 100){
            grid.page.len(newSize).draw(false)
            $('#page-size-current').text(newSize.toString())
        }
    } else if (actionAttr === "buffer-toggle" && event.type === 'click'){
        subscriber.toggleBuffering()
        var bfrIcon = document.querySelector('#buffer-toggle i')
        if( ! bfrIcon ) {
            return
        }
        bfrIcon.classList.toggle('fa-pause')
        bfrIcon.classList.toggle('fa-play')
        var bfrButton = document.querySelector('#buffer-toggle')
        if( ! bfrButton ) {
            return
        }
        bfrButton.classList.toggle('btn-default')
        bfrButton.classList.toggle('btn-danger')
    } else if (actionAttr === "open-logger" && event.type === 'click'){
        logViewer.open()
    } else if (actionAttr === "wincon-minimize" && event.type === 'click'){
        glue.windows.my().minimize()
    } else if (actionAttr === "wincon-maximize" && event.type === 'click'){
        glue.windows.my().maximizeRestore()
    } else if (actionAttr === "wincon-close" && event.type === 'click'){
        unloader.closePolitely()
    }

}

//clears text selection caused by dblclick-ing
function clearSelection() {
    if(document.selection && document.selection.empty) {
        document.selection.empty();
    } else if(window.getSelection) {
        var sel = window.getSelection();
        sel.removeAllRanges();
    }
}