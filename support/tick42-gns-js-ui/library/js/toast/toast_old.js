;return;

window.onload = function(){
    glue.windows.my().get_details(
        function(details){
            console.log('success get_details onload')

            console.log('screenX ', window.screenX)
            console.log('details.left ', details.left)

            if(window.screenX !== details.left){
                console.log('Left position missed')
            }

            window.toastApi.startingDimensions = {
                X: details.left,
                Y: details.top,
                width: details.width,
                height: details.height
            }

            window.opener.postMessage({isReady: window.htmlContainer.windowId}, '*')

            //Windows Z-order correction
            setInterval(function(){
                glue.windows.my().set_style(
                    {onTop:false},
                    function(d){
                        //console.log(Date('now'),'success onTop:false')
                        glue.windows.my().set_style(
                            {onTop:true},
                            function(d){/*console.log(Date('now'),'success onTop:true')*/},
                            function(e){console.log(Date('now'),'ERROR onTop:true')}
                        )
                    },
                    function(e){console.log(Date('now'),'ERROR onTop:false')}
                )
            }, 4000)
        }
    )

    window.addEventListener('mouseover', function hoverSlide(ev){
        if(window.toastApi.lockExpansion
            || window.toastApi.isExpanded
            || window.toastApi.isCollector
            || window.toastApi.actionCount <= 0
        ){
            return;
        }

        window.toastApi.lockExpansion = true
        console.log(Date('now'), 'lock on Expand')

        glue.windows.my().move_resize(
            {
                left: window.toastApi.startingDimensions.X - window.toastApi.startingDimensions.width,
                top: window.toastApi.startingDimensions.Y,
                width: 2 * window.toastApi.startingDimensions.width,
                height: window.toastApi.startingDimensions.height
            },
            function(d){
                console.log(Date('now'), 'expand success')
                window.toastApi.isExpanded = true

                var actionsGreen = document.querySelector('#actions-green-box')
                actionsGreen.style.display = 'block'

                setTimeout(function(){
                    window.toastApi.lockExpansion = false
                }, 1000)
            },
            function(e){
                console.log(Date('now'),'ERROR move_resize')
                window.toastApi.lockExpansion = false
            }
        )
    })

    window.addEventListener('mouseout', function snapBack(ev){
        if(ev.toElement !== null || window.toastApi.lockExpansion || window.toastApi.isExpanded === false){
            return;
        }

        window.toastApi.lockExpansion = true
        console.log(Date('now'), 'lock on Collapse')

        glue.windows.my().move_resize(
            {
                left: window.toastApi.startingDimensions.X,
                top: window.toastApi.startingDimensions.Y,
                width: window.toastApi.startingDimensions.width,
                height: window.toastApi.startingDimensions.height
            },
            function(d){
                console.log(Date('now'), 'collapse success')
                window.toastApi.isExpanded = false

                var actionsGreen = document.querySelector('#actions-green-box')
                actionsGreen.style.display = 'none'

                setTimeout(function(){
                    window.toastApi.lockExpansion = false
                }, 1000)
            },
            function(e){
                console.log(Date('now'),'ERROR move_resize')
                window.toastApi.lockExpansion = false
            }
        )
    })
}



window.toastApi = {
    isExpanded: false,
    lockExpansion: false,
    startingDimensions: {X:undefined, Y:undefined, width: undefined, height: undefined},
    nifId: undefined,
    mergedNif: undefined,
    actionCount: 0,
    isCollector: false,
    setToast: function(toHidden, nif, isCollector, collectedCount){
        console.log(Date('now'), 'setToast', toHidden)

        console.log(nif, isCollector, collectedCount)

        window.toastApi.lockExpansion = true

        /* Clear */
        window.toastApi.clear()

        if( toHidden === false && (nif !== undefined || isCollector) ) {
            /* Write Toast */
            window.toastApi.writeToast(nif, isCollector, collectedCount)
        }

        /* Collapse */
        glue.windows.my().move_resize(
            {
                left: window.toastApi.startingDimensions.X,
                top: window.toastApi.startingDimensions.Y,
                width: window.toastApi.startingDimensions.width,
                height: window.toastApi.startingDimensions.height
            },
            function(d){
                console.log(Date('now'), 'collapse success on rewrite')
                window.toastApi.isExpanded = false

                var actionsGreen = document.querySelector('#actions-green-box')
                actionsGreen.style.display = 'none'

                setTimeout(function(){
                    window.toastApi.lockExpansion = false
                }, 1000)

                /* Set Hidden */
                window.toastApi.setHidden(toHidden)

            },
            function(e){
                console.log(Date('now'),'ERROR move_resize')
                window.toastApi.lockExpansion = false
            }
        )
    },
    setHidden: function(hidden){
        console.log(Date('now'), 'setHidden', hidden)

        glue.windows.my().set_style(
            {hidden: hidden},
            function() {
                console.log(Date('now'), 'glue setHidden success:', hidden)
            },
            function(e) {
                console.log(Date('now'), 'setHidden ERROR', e)
            }
        )
    },
    clear: function(){
        console.log(Date('now'), 'clear')

        var titlebar = document.querySelector('#titlebar')
        titlebar.innerHTML = ''
        window.toastApi.nifId = undefined
        window.toastApi.isCollector = false
        window.toastApi.mergedNif = undefined
        window.toastApi.actionCount = 0

        var indicies = [0,1,2]
        indicies.forEach(function(i){
            var li = document.querySelector('#act-'+i)
            li.innerText = '~'
        })
    },
    writeToast: function(nif, isCollector, collectedCount){
        console.log(Date('now'), 'write')

        var titlebar = document.querySelector('#titlebar')

        if(isCollector){
            titlebar.innerHTML = "Received " + collectedCount + " more..."
            window.toastApi.isCollector = true

        } else {

            titlebar.innerText = ''

            if(nif.title){
                var titleText = document.createTextNode(nif.title)
                titlebar.appendChild(titleText)
            } else {
                titlebar.innerHTML = '<span class="no-title">- no title -</span>'
            }

            window.toastApi.nifId = nif.id
            window.toastApi.mergedNif = nif

            if(nif.glueRouting && nif.glueRouting.actions && nif.glueRouting.actions.items){
                var items = nif.glueRouting.actions.items
                window.toastApi.actionCount = items.length
                var indicies = [0,1,2]
                indicies.forEach(function(i){
                    if(items[i]){
                        var li = document.querySelector('#act-'+i)
                        li.innerText = ''

                        if(typeof items[i].image === 'string'){
                            var imgTag = document.createElement('img')
                            imgTag.classList.add('action-icon')
                            imgTag.setAttribute('data-act', i)
                            var pic = getResource(items[i].image, window.toastApi.mergedNif)
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
    },
    registerCloseListener: function(parentCloseToast){
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
                var nif = window.toastApi.mergedNif

                if( nif.glueRouting
                    && nif.glueRouting.actions
                    && nif.glueRouting.actions.items
                    && nif.glueRouting.actions.items[actIndex] ){

                    var glueAction = nif.glueRouting.actions.items[actIndex]

                    //console.log('invokeGlueRoutingMethod', glueAction, nif)
                    invokeGlueRoutingMethod(glueAction, nif)
                }

            } else if(ev.target.id === 'close-btn' || ev.target.parentElement.id === 'close-btn'){
                msg += 'close-btn'
                parentCloseToast(window.toastApi.isCollector, window.toastApi.nifId)
            } else if(window.toastApi.isCollector) {
                msg += 'somewhere collect'
                window.opener.glue.windows.my().focus()
            } else {
                msg += 'somewhere details'
                var nif = window.toastApi.mergedNif
                var showDetails = false

                if( nif.glueRouting && nif.glueRouting.detailsMethod ){
                    showDetails = false

                    var glueAction = nif.glueRouting.detailsMethod

                    //console.log('invokeGlueRoutingMethod', glueAction, nif)
                    invokeGlueRoutingMethod(glueAction, nif)

                } else {
                    showDetails = true
                }

                parentCloseToast(window.toastApi.isCollector, window.toastApi.nifId, showDetails, nif)
            }

            console.log(Date('now'), msg)
        })
    }
}