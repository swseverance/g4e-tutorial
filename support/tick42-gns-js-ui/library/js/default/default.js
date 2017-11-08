var initGlue = require('../common/initGlue')
var gns_utils = require('../gns/utilityGns')
var logger = console // require('js-logger') OR glue.logger
var helpers = require('../common/templateHelpers')
var dates = require('../common/dates')
var windowName

var compiledTemplate = null

initGlue.onGlueInit(function(){
    $(document).ready( function () {

        windowName = glue.windows.my().name

        setWindowStyle()

        helpers.register()

        compileTemplate()

        registerInputMethod()

    })
})



function setWindowStyle(){
    glue.windows.my().setStyle(
        {minWidth:656, minHeight:400},
        function() {
            console.log('set minWidth, minHeight')
        },
        function(e) {
            console.log('set minWidth, minHeight ERROR', e)
        }
    )
}

function compileTemplate(){
    var tplEl = document.getElementById('tpl-details')
    var templateHtml = tplEl.innerHTML
    compiledTemplate = Handlebars.compile(templateHtml)
}

function registerInputMethod(){
    var methodDefinition = {
        name: 'GNSUI.DefaultDetailsView',
        description: 'Shows the details for a gns notification in a separate window',
        version: 1
    }

    glue.agm.register(methodDefinition, displayLog)
}

function displayLog(args){
    console.log('args  --- ',args)

    if( typeof args.notification !== 'object' ){
        return {rendered:false, message: "Args does not contain a notification object"}
    }
    
    var result = compiledTemplate(args.notification)
    var body = document.getElementById('body')
    body.innerHTML = result

    $('[data-toggle="tooltip"]').tooltip()
    
    window.notification = args.notification
    
    window.notification.notificationTime = dates.agmDate(args.notification.notificationTime)
    window.notification.creationTime = dates.agmDate(args.notification.creationTime)
    window.notification.modificationTime = dates.agmDate(args.notification.modificationTime)
    if(window.notification.lifetime && window.notification.lifetime.expiresAt){
        window.notification.lifetime.expiresAt = dates.agmDate(args.notification.lifetime.expiresAt)
    }

    registerGlueRoutingHandlers()
    
    registerJsonViewHandler()
    
    configureSearchAndHighlight()

    return {rendered: true, message: "Successfully rendered template."}
}

function registerGlueRoutingHandlers(){
    function specialMethodHandler(e){
        var validSpecialMethods = ['popupMethod', 'detailMethod']

        var target = e.target

        //check if button has highlighting
        if(e.target.nodeName === 'EM'){
            target = e.target.parentElement
        }

        if (validSpecialMethods.indexOf(target.id) < 0) {
            console.error(target.id + ' is not a valid specialMethod')
            return;
        }

        var nif = window.notification
        var specialMethod = target.id
        var method = nif.glueRouting[specialMethod]

        gns_utils.invokeGlueRoutingMethod(method, nif)
    }

    var detailsButton = document.querySelector('#detailMethod')
    if(detailsButton){
        detailsButton.addEventListener('click', specialMethodHandler)
    }

    var popupButton = document.querySelector('#popupMethod')
    if(popupButton) {
        popupButton.addEventListener('click', specialMethodHandler)
    }

    var actionsList = document.querySelector('#actions-list')
    if(actionsList) {
        actionsList.addEventListener('click', function(e){
            var target = e.target

            //check if button has highlighting
            if(e.target.nodeName === 'EM'){
                target = e.target.parentElement
            }

            var itemKey = target.getAttribute('data-itemkey')

            if(!itemKey) {
                return
            }

            var nif = window.notification
            var method = nif.glueRouting.actions.items[itemKey]

            gns_utils.invokeGlueRoutingMethod(method, nif)
        })
    }
}

function registerJsonViewHandler(){
    var dumperButton = document.querySelector('#dumperButton')

    var textNode = document.createTextNode(JSON.stringify(window.notification, null, 2))
    var preTag = document.createElement('pre')
    preTag.appendChild(textNode)
    var nifTag = document.createElement('div')
    nifTag.id = "notification"
    nifTag.appendChild(preTag)

    dumperButton.addEventListener('click', function(e){
        var oldRef = window.location.href
        var newRef = ( oldRef.replace('default.html', '') ) + 'jsonclip.html'
        var newDiv = document.createElement('div')
        newDiv.appendChild(nifTag)
        var dumper = window.open(newRef, '_blank')
        dumper.nifDiv = newDiv
    })
}

function configureSearchAndHighlight(){
    window.searchApi = {
        myHilitor: new Hilitor("content"),
        resultSet: [],
        resDex: -1,
        term: '', //used to help detect if the input has changed
        nextResult: function nRes(goBack){
            //goBack ? console.log('prev result') : console.log('next result');
            //console.log('resultSet', searchApi.resultSet)
            //console.log('resDex', searchApi.resDex)

            if(goBack){
                searchApi.resDex -= 1
            } else {
                searchApi.resDex += 1
            }

            var length = searchApi.resultSet.length

            if( searchApi.resDex >= length ){
                searchApi.resDex = 0
            } else if ( searchApi.resDex < 0 ){
                searchApi.resDex = length - 1
            }

            if(length > 0 && searchApi.resDex < length){
                var resEm = searchApi.resultSet[searchApi.resDex]

                //check if parent is tab-pane and if it is active
                var parents = $(resEm).closest('.tab-pane')
                //console.log('parents', parents)
                if(parents.length > 0){
                    //is in a Tab's content
                    var parent = $(parents[0])

                    if(! parent.hasClass('active')){
                        //open the Tab
                        var id = parents[0].id
                        $('ul.nav-tabs a[href="#'+id+'"]').tab('show')
                    }
                }

                //scroll to the element and highlight it slightly differently
                resEm.scrollIntoView()
                Array.prototype.forEach.call(searchApi.resultSet, function(em){
                    em.style.backgroundColor = '#c25563'
                })

                resEm.style.backgroundColor = '#d3dd26'
            }

        }
    }

    searchApi.myHilitor.setMatchType("open")

    $(window).keyup(function(e) {
        var searchBox = $('#search-box')

        if(e.ctrlKey && e.keyCode === 70){
            //console.log('open search')
            searchBox.focus()

        }
        else if(e.keyCode === 27){
            searchBox.blur()
            searchBox.val('')
            searchApi.myHilitor.remove()
        }
    })

    $('#search-box').on('keyup', function(e){
        //console.log('keyup on the #search-box')
        //console.log(e.shiftKey, e.keyCode)

        var needle = $(this).val()
        if (needle === '' ){//|| needle.length < 3){
            searchApi.myHilitor.remove()
            searchApi.resDex = -1
            return
        } else if( (e.shiftKey && e.keyCode === 13) || e.keyCode === 38) {
            //'Shift+Enter' or up-arrow
            searchApi.nextResult(true)

        } else if(e.keyCode === 13 || e.keyCode === 40) {
            //'Enter' or down-arrow
            searchApi.nextResult()

        } else if(needle === searchApi.term) {
            //do nothing - prevents inadvertently clearing the search with 'Shift', 'Ctrl', etc.

        } else {
            searchApi.myHilitor.apply(needle)
            searchApi.term = needle
            searchApi.resultSet = document.querySelectorAll('em')
            searchApi.resDex = -1
        }
    })
}