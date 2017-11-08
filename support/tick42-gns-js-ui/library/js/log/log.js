var initGlue = require('../common/initGlue')

window.onload = (function log(){

    initGlue.onGlueInit(function(){

        var tplEl = document.getElementById('tpl-entries')
        var templateHtml = tplEl.innerHTML
        var compiledTemplate = Handlebars.compile(templateHtml)

        Handlebars.registerHelper( "expand", function ( obj ){
            if(typeof obj === 'object')
                return JSON.stringify(obj)
            else
                return obj
        })

        Handlebars.registerHelper( "rowClass", function ( obj ){
            if(!obj) return 'app-start'
        })

        var methodDefinition = {
            name: 'GNSUI.DisplayLog',
            description: 'Displays a list of messages passed from the main List View window of the GNS UI',
            version: 1
        }

        glue.agm.register(methodDefinition, function displayLog(args){
            //console.log('args  --- ', args)

            if(args.singleEntry){
                return addSingleEntry(args.singleEntry)
            }

            if( ! (args.allEntries && Array.isArray(args.allEntries)) ){
                return {rendered:false, message: "Args does not contain an array of messages"}
            }

            setTimeout(function(){
                args.allEntries = args.allEntries.map(function(msgJson){
                    return parseEntry(msgJson)
                })

                var result = compiledTemplate({
                    entries:args.allEntries
                })

                var listContainer = document.getElementById('list-container')
                if(listContainer){
                    listContainer.innerHTML = result
                }
            }, 0)

            return {rendered: true, message: "Successfully rendered template."}
        })

        function addSingleEntry(entry){

            var rowText = compiledTemplate({
                entries: [parseEntry(entry)]
            })

            var crutchTbody = document.createElement('tbody')

            crutchTbody.innerHTML = rowText

            var listContainer = document.getElementById('list-container')
            if(listContainer && crutchTbody.firstChild){
                listContainer.appendChild(crutchTbody.firstChild)
            }

            return {rendered: true, message: "Successfully added single entry."}
        }

        function parseEntry(entry){
            var res

            try {
                res = JSON.parse(entry)
            } catch (error) {
                console.warn(error)
            }

            return res
        }
    })

}())