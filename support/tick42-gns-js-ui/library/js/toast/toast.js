var initGlue = require('../common/initGlue')
var toastApi = require('./toastApi')
var startingDimensions = require('./startingDimensions')
var gns_utils = require('../gns/utilityGns')
var logger = require('../common/remoteLogger').get('toast')

var inputMethod = 'GNSUI.ToastFrame.Port'
var feedbackMethod = 'GNSUI.ToastManager.Port'


initGlue.onGlueInit(main)

function main(){

    var details = glue.windows.my().bounds

    console.log('success get_details onload', details)

    console.log('screenX ', window.screenX)
    console.log('details.left ', details.left)

    if(window.screenX !== details.left){
        console.log('Left position missed')
    }

    startingDimensions.X = details.left
    startingDimensions.Y = details.top
    startingDimensions.width = details.width
    startingDimensions.height = details.height

    //Windows Z-order correction
    setInterval(function(){
        glue.windows.my().setStyle(
            {onTop:false},
            function(d){
                //console.log(Date('now'),'success onTop:false')
                glue.windows.my().setStyle(
                    {onTop:true},
                    function(d){/*console.log(Date('now'),'success onTop:true')*/},
                    function(e){console.log(Date('now'),'ERROR onTop:true')}
                )
            },
            function(e){console.log(Date('now'),'ERROR onTop:false')}
        )
    }, 4000)

    window.addEventListener('mouseover', function hoverSlide(ev){
        if(toastApi.lockExpansion
            || toastApi.isExpanded
            || toastApi.isCollector
            || toastApi.actionCount <= 0
        ){
            return;
        }

        toastApi.lockExpansion = true
        console.log(Date('now'), 'lock on Expand')

        glue.windows.my().moveResize(
            {
                left: startingDimensions.X - startingDimensions.width,
                top: startingDimensions.Y,
                width: 2 * startingDimensions.width,
                height: startingDimensions.height
            },
            function(d){
                console.log(Date('now'), 'expand success')
                toastApi.isExpanded = true

                var actionsGreen = document.querySelector('#actions-green-box')
                actionsGreen.style.display = 'block'

                setTimeout(function(){
                    toastApi.lockExpansion = false
                }, 1000)
            },
            function(e){
                console.log(Date('now'),'ERROR move_resize')
                toastApi.lockExpansion = false
            }
        )
    })

    window.addEventListener('mouseout', function snapBack(ev){
        if(ev.toElement !== null || toastApi.lockExpansion || toastApi.isExpanded === false){
            return;
        }

        toastApi.lockExpansion = true
        console.log(Date('now'), 'lock on Collapse')

        glue.windows.my().moveResize(
            {
                left: startingDimensions.X,
                top: startingDimensions.Y,
                width: startingDimensions.width,
                height: startingDimensions.height
            },
            function(d){
                console.log(Date('now'), 'collapse success')
                toastApi.isExpanded = false

                var actionsGreen = document.querySelector('#actions-green-box')
                actionsGreen.style.display = 'none'

                setTimeout(function(){
                    toastApi.lockExpansion = false
                }, 1000)
            },
            function(e){
                console.log(Date('now'),'ERROR move_resize')
                toastApi.lockExpansion = false
            }
        )
    })
    
    registerInputMethod()

    registerClickListener()
}

function registerInputMethod(){
    var methodDefinition = {
        name: inputMethod,
        description: 'Activates the toastFrame with a particular notification',
        version: 1
    }

    glue.agm.register(methodDefinition, toastApi.setToast)
}

function registerClickListener(){
    var body = document.querySelector('body')

    body.addEventListener('click', function(ev){
        var msg = 'clicked '
        var targetId = ev.target.id
        var parentId = ev.target.parentElement.id

        if (   targetId === 'act-0' || targetId === 'act-1' || targetId === 'act-2'
            || parentId === 'act-0' || parentId === 'act-1' || parentId === 'act-2' )
        {
            msg += targetId || parentId

            var actIndex = ev.target.getAttribute('data-act')
            var nif = toastApi.mergedNif

            if( nif.glueRouting
                && nif.glueRouting.actions
                && nif.glueRouting.actions.items
                && nif.glueRouting.actions.items[actIndex] ){

                var glueAction = nif.glueRouting.actions.items[actIndex]

                //console.log('invokeGlueRoutingMethod', glueAction, nif)
                gns_utils.invokeGlueRoutingMethod(glueAction, nif)
            }

        } else if(ev.target.id === 'close-btn' || ev.target.parentElement.id === 'close-btn'){
            msg += 'close-btn'
            closeToast(toastApi.isCollector, toastApi.nifId)

        } else if(toastApi.isCollector) {
            //do nothing since click was on the title of the collector
            msg += 'somewhere collect'
            
        } else {
            msg += 'somewhere details'
            var nif = toastApi.mergedNif
            var showDetails = false

            if( nif.glueRouting && nif.glueRouting.detailsMethod ){
                showDetails = false

                var glueAction = nif.glueRouting.detailsMethod

                //console.log('invokeGlueRoutingMethod', glueAction, nif)
                gns_utils.invokeGlueRoutingMethod(glueAction, nif)

            } else {
                showDetails = true
            }

            closeToast(toastApi.isCollector, toastApi.nifId, showDetails)
        }

        console.log(Date('now'), msg)
    })
}

function closeToast(isCollector, nifId, showDetails){
    var btn = document.querySelector('#close-btn')
    btn.style.backgroundColor = '#333333'
    var flexCon = document.querySelector('.flex-container')
    flexCon.style.color = '#333333'

    var parameters = {
        isCollector: isCollector,
        nifId: nifId,
        showDetails: showDetails
    }

    glue.agm.invoke(
        feedbackMethod, parameters, 'best', undefined,
        function(d){
            console.debug('Closed toast', parameters, d)
        },
        function(e){
            console.warn('Unable to close toast with parameters:', parameters, e)
        }
    )

}