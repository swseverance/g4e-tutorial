/*
 Layer for working with Notification streams
 Exposes methods for attaching callbacks to
 notification streams

 TBD - stores notifications
 TBD - accepts a filter as argument
 */

//***Dependencies***
//ex. var database = require('../lib/database');

var logViewer = require('./logViewer')
var rootLogger = require('js-logger')
var usingDefaults = rootLogger.useDefaults()
var handleSet = rootLogger.setHandler(function (messages, context) {
    logViewer.pushMsg(messages, context)
})
var appStartMsg = rootLogger.info('--- APPLICATION START ---')
var logger = rootLogger.get('index')
var initGrid = require('./initGrid')
var mockedData = require('./mockedData')
var subscriber = require('./subscriber')
var categories = require('./categories')
var sources = require('./sources')
var _ = require('lodash')
var toasts = require('./toasts')
var clickDistributor = require('./clickDistributor')
var previewPane = require('./previewPane')
var detailsPopups = require('./detailsPopups')
var icons = require('../common/icons')
var dates = require('../common/dates')
var gns_utils = require('../gns/utilityGns')
var diagnoser = require('./diagnoser')
var buffer = require('./buffer')
var unloader = require('../common/unloader')
var config = require('./config')
var cuid = require('cuid')

var grid

//***Mod Def***
module.exports = function appMain() {

    $(document).ready( function () {
        setWindowSize()

        $('#context-menu').hide()

        grid = initGrid()

        config.init()

        detailsPopups.init(grid)

        toasts.init(grid)

        addColumnSearch()
        formatHeader()

        diagnoser.init(subscriber, updateTable, updateSources, updateCategories, handleStreamClosed)
        subscriber.init(diagnoser, updateTable, updateSources, updateCategories, handleStreamClosed, buffer)

        grid_g = grid //testing global for the console

        //testing
        // setTimeout(function(){
        //     for(var i=0; i < 20; i++){
        //         setTimeout(function(){
        //             drawManyMockNotifications(110)
        //         }, 100*i)
        //     }
        // }, 2000)

        listenForResize()

        attachClickDistributor()

        unloader.init()
    })
}



//***Helpers***
/*
 function some_helper(arg1, arg2) {
 return some_result;
 }
 */
function updateTable(returnObj) {
    var notifications = _.values(returnObj.data.items)

    //console.log('data', notifications)

    diagnoser.setDataReceived(true)

    //TODO check id + revision -> remove duplicates from grid, then pass to below for sorting
    //foreach the notifications object
    //call revisionHistory if there is a difference
    notifications.forEach(function(newNif){
        var searchResults = grid.row(function(idx, rowdata){
            return newNif.id === rowdata.id
        })

        if(searchResults.length > 0) {
            searchResults.remove()
        }

    })

    if(returnObj && returnObj.data && returnObj.data.isSnapshot){

        notifications.sort(function(x,y){
            var x_time = dates.renderDate(x.notificationTime, 'sort')
            var y_time = dates.renderDate(y.notificationTime, 'sort')

            if (x_time < y_time) {
                return -1;
            } else {
                return 1;
            }
        })

        logger.info('Snapshot received.')
    }

    $('#table_id_info').show()

    notifications.forEach( function(nif){

        nif.hasReqFields = gns_utils.hasRequiredFields(nif)

        toasts.popup(nif, false)

    })

    grid.rows
        .add(notifications)
        .draw(false)
}

function updateSources(retObj){
    var srcArr = _.values(retObj.data.items)
    sources.updateSources(srcArr)
}

function updateCategories(retObj){
    var catArr = _.values(retObj.data.items)
    categories.updateCategories(catArr)
}

function refreshHistory() {
    //TODO history of nifs
    //  look for nif by id
    //  refresh the dictionary
}

function handleStreamClosed(reason, server){
    //TODO move this into subscriber
    console.warn('notification stream closed')

    diagnoser.setDataReceived(false)
}

function addColumnSearch(){
    $('#table_id').find('thead').append('<tr id="searches" role="row"></tr>')
    $('.dataTables_scrollHeadInner').find('thead').append('<tr id="searches" role="row"></tr>')
    $('.dataTables_scrollHead').css('overflow','visible')
    var columns = mockedData.getColumns()

    _.forEach(columns, function(col, index){
        var headClass = col.title.toLowerCase().replace(' ', '-')
        var inputCell = $('<th class="'+headClass+'"></th>')
        var options

        //console.log(col.title)

        if (col.title === 'State') {
            options = ['Acknowledged', 'Active', 'Closed']
            columnSearchSelect(index, options, inputCell, col.title)
        } else if (col.title === 'Severity') {
            options = ['Low', 'Medium', 'High', 'Critical']
            columnSearchSelect(index, options, inputCell, col.title)
        } else if (col.title === 'Time') {
            //skip Time since it's inserted into the severity Col
            /*
             inputCell.html('<span class="plain-title"><i class="fa fa-clock-o"></i></span>')

             //skip
             $('#searches').append(inputCell)
             */
        }else if (col.title === 'Fields') {
            //TODO disable viewing notifications with missing fields
            var title = $('<span class="plain-title">Missing<br>Fields</span>')
            inputCell.append(title)

            $('#searches').append(inputCell)
        } else {
            var input = $('<input class="form-control input-sm" type="text" placeholder=" '+ col.title +'" size="10"/>')

            inputCell.append(input)

            $('#searches').append(inputCell)

            input.keyup(function () {
                grid
                    .column( index )
                    .search(this.value)
                    .draw()
            })
        }
    })

    //Erase the top column
    $('.dataTables_scrollHeadInner').find('thead').children().first().hide()
}

function columnSearchSelect(index, options, inputCell, title) {
    var list = $('<ul class="dropdown-menu"></ul>')

    list.append('<li class="select-icon" data-value="" data-colindex="'+ index +'">All</li>')

    _.forEach(options, function(option){
        list.append('<li class="select-icon" data-value="'
            + option.toLowerCase() + '" data-colindex="'+ index
            + '" data-toggle="tooltip" title="' + option + '">'
            + icons.setIcon(option.toLowerCase(), 'display')
            + ' ' + option + ' '
            + '</li>')
    })

    var divButton = $('<div class="dropdown">'
        + '<button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown">'
        + title
        + ' <span class="caret"></span>'
        + '</button></div>')

    divButton.append(list)

    inputCell.append(divButton)
    $('#searches').append(inputCell)
}

function setWindowSize(){
    var styleProps = {
        minWidth:1126,
        minHeight:400,
        allowCollapse:false,
        allowClose:false
    }

    glue.windows.my().setStyle(
        styleProps,
        function() {
            logger.info('ListView set style.', styleProps)
        },
        function(e) {
            logger.warn('ListView failed to set style.', e)
        }
    )
}

function formatHeader(){
    //moves the buttons, version string and get-server btn down into the sm-12 controls container
    $('.controls-container')
        .prepend( $('.buttons-top-left') )
        .append( $('#version') )

    //formats the main search, removing the label
    $('#table_id_filter').find('input').attr('placeholder', 'search')
    $('#table_id_filter').find('label').contents().filter(function () {
        return (this.nodeType === 3)
    }).remove()
}

function listenForResize(){
    var resizeHandler = function(e){
        var nifTable = document.querySelector('.dataTables_scrollBody')
        nifTable.style.height = Math.floor(window.innerHeight - 128) + 'px'
        //console.log(Date.now(), 'fire resize')
    }
    window.addEventListener('resize', _.debounce(resizeHandler, 150, {maxWait: 1000}))
}

function attachClickDistributor(){
    var body = document.getElementById('body')
    body.addEventListener('click', function(e) {
        clickDistributor(e, grid, detailsPopups, sources, categories, toasts, subscriber)
    })
    body.addEventListener('dblclick', function(e) {
        clickDistributor(e, grid, detailsPopups, sources, categories, toasts, subscriber)
    })
    body.addEventListener('contextmenu', function(e) {
        clickDistributor(e, grid, detailsPopups, sources, categories, toasts, subscriber)
    })
}

function drawManyMockNotifications(quantity){
    var data = {}
    data.items = []

    var i;
    for(i=0; i < quantity; i++){
        var notification = {
            "id": "oooooo"+i+"nnnn"+cuid(),
            "sequenceId": null,
            "type": "Activity",
            "source": "GNS",
            "sourceNotificationId": "GNS_cihrjxakc0004joh3r3yklvin",
            "title": "500_Pusi toti jipinasa zonibo cihak wamac cehoja zuignug nazkauku.",
            "notificationTime": new Date("3079-11-02T08:12:28.832Z"),//new Date("1979-11-02T08:12:28.832Z"),
            "creationTime": new Date("2015-12-04T10:51:46.236Z"),
            "severity": "Warn",
            "description": "Nag ce sivasti ziv vanep adaujufic zuj hi kazho.",
            "state": "Active",
            "isRead": false,
            "revision": 0,
            "attributes": [
                {
                    "key": "ozkige",
                    "value": {
                        "stringValue": "tero"
                    }
                },
                {
                    "key": "ruwifuf",
                    "value": {
                        "stringValue": "so"
                    }
                }
            ],
            "lifetime": {
                "expiresAt": "2094-10-15T05:35:00.321Z"
            },
            "target": {
                "users": [
                    "Marcus Strickland",
                    "Herbert Bates",
                    "Marian Gill"
                ]
            },
            "reminder": {
                "remindPeriod": 120
            }
        }

        data.items.push(notification)
    }

    var returnObj = {data: data}

    logger.info('Adding many mock notifications: ', quantity)

    console.log(Date.now(),'Adding many mock notifications: ', quantity)

    updateTable(returnObj)
}