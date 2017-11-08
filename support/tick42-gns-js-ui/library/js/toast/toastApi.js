var gns_utils = require('../gns/utilityGns')
var startingDimensions = require('./startingDimensions')
var logger = require('../common/remoteLogger').get('toastApi')

var toastApi = module.exports = {
    isExpanded: false,
    lockExpansion: false,
    actionCount: 0,
    isCollector: false,
    mergedNif: undefined,
    nifId: undefined,
    setToast: setToast
}


function setToast(parameters){

    var toHidden = parameters.hidden
    var nif = parameters.notification
    var isCollector = parameters.isCollector
    var collectedCount = parameters.collectedCount
    
    console.log(Date('now'), 'setToast', toHidden)

    console.log(nif, isCollector, collectedCount)

    toastApi.lockExpansion = true

    /* Clear */
    clear()

    if( toHidden === false && (nif !== undefined || isCollector) ) {
        /* Write Toast */
        writeToast(nif, isCollector, collectedCount)
    }

    /* Collapse */
    glue.windows.my().moveResize(
        {
            left: startingDimensions.X,
            top: startingDimensions.Y,
            width: startingDimensions.width,
            height: startingDimensions.height
        },
        function(d){
            console.log(Date('now'), 'collapse success on rewrite')
            toastApi.isExpanded = false

            var actionsGreen = document.querySelector('#actions-green-box')
            actionsGreen.style.display = 'none'

            setTimeout(function(){
                toastApi.lockExpansion = false
            }, 1000)

            /* Set Hidden */
            setHidden(toHidden)

        },
        function(e){
            console.log(Date('now'),'ERROR move_resize')
            toastApi.lockExpansion = false
        }
    )
}

function clear(){
    console.log(Date('now'), 'clear')

    var titlebar = document.querySelector('#titlebar')
    titlebar.innerHTML = ''
    nifId = undefined
    toastApi.isCollector = false
    mergedNif = undefined
    toastApi.actionCount = 0

    var indicies = [0,1,2]
    indicies.forEach(function(i){
        var li = document.querySelector('#act-'+i)
        li.innerText = '~'
    })
}

function writeToast(nif, isCollector, collectedCount){
    console.log(Date('now'), 'write')

    var btn = document.querySelector('#close-btn')
    btn.style.backgroundColor = ''
    var flexCon = document.querySelector('.flex-container')
    flexCon.style.color = ''

    var titlebar = document.querySelector('#titlebar')

    if(isCollector){
        titlebar.innerHTML = "Received " + collectedCount + " more..."
        toastApi.isCollector = true

    } else {

        titlebar.innerText = ''

        if(nif.title){
            var titleText = document.createTextNode(nif.title)
            titlebar.appendChild(titleText)
        } else {
            titlebar.innerHTML = '<span class="no-title">- no title -</span>'
        }

        toastApi.nifId = nif.id
        toastApi.mergedNif = nif

        if(nif.glueRouting && nif.glueRouting.actions && nif.glueRouting.actions.items){
            var items = nif.glueRouting.actions.items
            toastApi.actionCount = items.length
            var indicies = [0,1,2]
            indicies.forEach(function(i){
                if(items[i]){
                    var li = document.querySelector('#act-'+i)
                    li.innerText = ''

                    if(typeof items[i].image === 'string'){
                        var imgTag = document.createElement('img')
                        imgTag.classList.add('action-icon')
                        imgTag.setAttribute('data-act', i)
                        var pic = gns_utils.getResource(items[i].image, mergedNif)
                        imgTag.src = pic ? pic.data : '';
                        imgTag.onerror = function(){
                            this.classList.add("notfound")
                        }
                        li.appendChild(imgTag)
                    }

                    var actionTitle = items[i].displayName || items[i].description || items[i].name
                    var textNode = document.createTextNode(actionTitle)
                    li.appendChild(textNode)
                }
            })
        }
    }
}

function setHidden(hidden){

    console.log(Date('now'), 'setHidden', hidden)

    glue.windows.my().setStyle(
        {hidden: hidden},
        function() {
            console.log(Date('now'), 'glue setHidden success:', hidden)
        },
        function(e) {
            console.log(Date('now'), 'setHidden ERROR', e)
        }
    )
    
}