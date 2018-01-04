(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * Starts glue using the glueConfig.js file in project root,
 * which must be included in the html as a script, before
 * the target file.
 *
 * To use: pass the application start code as a parameter when calling.
 */

if(module){
    module.exports = {
        onGlueInit: onGlueInit
    }
}

function onGlueInit(appMain){
    if (typeof appMain !== 'function') {
        throw new TypeError('The argument must be a function.')
    }

    if (typeof window !== 'object'
        || typeof window.Glue !== 'function'
        || typeof window.gnsUiGlueConfig !== 'object'
    ){
        console.log('Unable to try initializing Glue.')
        return;
    }

    Glue(gnsUiGlueConfig)
        .then(function(glue){
            //check glue.agm and glue.agm.subscribe <-- function
            if (glue && glue.agm && typeof glue.agm.subscribe === 'function') {
                //attach glue to window for the rest of the app to use
                window.glue = glue

                //go app async
                setTimeout(function(){
                    appMain()
                }, 0)
            } else {
                console.log('Error attaching glue object to window.')
            }
        })
        .catch(function(error){
            console.log('Error initialising Glue: ', error)
        })
}
},{}],2:[function(require,module,exports){
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
},{"../common/initGlue":1}]},{},[2])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJsaWJyYXJ5L2pzL2NvbW1vbi9pbml0R2x1ZS5qcyIsImxpYnJhcnkvanMvbG9nL2xvZy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvKipcbiAqIFN0YXJ0cyBnbHVlIHVzaW5nIHRoZSBnbHVlQ29uZmlnLmpzIGZpbGUgaW4gcHJvamVjdCByb290LFxuICogd2hpY2ggbXVzdCBiZSBpbmNsdWRlZCBpbiB0aGUgaHRtbCBhcyBhIHNjcmlwdCwgYmVmb3JlXG4gKiB0aGUgdGFyZ2V0IGZpbGUuXG4gKlxuICogVG8gdXNlOiBwYXNzIHRoZSBhcHBsaWNhdGlvbiBzdGFydCBjb2RlIGFzIGEgcGFyYW1ldGVyIHdoZW4gY2FsbGluZy5cbiAqL1xuXG5pZihtb2R1bGUpe1xuICAgIG1vZHVsZS5leHBvcnRzID0ge1xuICAgICAgICBvbkdsdWVJbml0OiBvbkdsdWVJbml0XG4gICAgfVxufVxuXG5mdW5jdGlvbiBvbkdsdWVJbml0KGFwcE1haW4pe1xuICAgIGlmICh0eXBlb2YgYXBwTWFpbiAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdUaGUgYXJndW1lbnQgbXVzdCBiZSBhIGZ1bmN0aW9uLicpXG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICdvYmplY3QnXG4gICAgICAgIHx8IHR5cGVvZiB3aW5kb3cuR2x1ZSAhPT0gJ2Z1bmN0aW9uJ1xuICAgICAgICB8fCB0eXBlb2Ygd2luZG93Lmduc1VpR2x1ZUNvbmZpZyAhPT0gJ29iamVjdCdcbiAgICApe1xuICAgICAgICBjb25zb2xlLmxvZygnVW5hYmxlIHRvIHRyeSBpbml0aWFsaXppbmcgR2x1ZS4nKVxuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgR2x1ZShnbnNVaUdsdWVDb25maWcpXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uKGdsdWUpe1xuICAgICAgICAgICAgLy9jaGVjayBnbHVlLmFnbSBhbmQgZ2x1ZS5hZ20uc3Vic2NyaWJlIDwtLSBmdW5jdGlvblxuICAgICAgICAgICAgaWYgKGdsdWUgJiYgZ2x1ZS5hZ20gJiYgdHlwZW9mIGdsdWUuYWdtLnN1YnNjcmliZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgIC8vYXR0YWNoIGdsdWUgdG8gd2luZG93IGZvciB0aGUgcmVzdCBvZiB0aGUgYXBwIHRvIHVzZVxuICAgICAgICAgICAgICAgIHdpbmRvdy5nbHVlID0gZ2x1ZVxuXG4gICAgICAgICAgICAgICAgLy9nbyBhcHAgYXN5bmNcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgIGFwcE1haW4oKVxuICAgICAgICAgICAgICAgIH0sIDApXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdFcnJvciBhdHRhY2hpbmcgZ2x1ZSBvYmplY3QgdG8gd2luZG93LicpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChmdW5jdGlvbihlcnJvcil7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnRXJyb3IgaW5pdGlhbGlzaW5nIEdsdWU6ICcsIGVycm9yKVxuICAgICAgICB9KVxufSIsInZhciBpbml0R2x1ZSA9IHJlcXVpcmUoJy4uL2NvbW1vbi9pbml0R2x1ZScpXG5cbndpbmRvdy5vbmxvYWQgPSAoZnVuY3Rpb24gbG9nKCl7XG5cbiAgICBpbml0R2x1ZS5vbkdsdWVJbml0KGZ1bmN0aW9uKCl7XG5cbiAgICAgICAgdmFyIHRwbEVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RwbC1lbnRyaWVzJylcbiAgICAgICAgdmFyIHRlbXBsYXRlSHRtbCA9IHRwbEVsLmlubmVySFRNTFxuICAgICAgICB2YXIgY29tcGlsZWRUZW1wbGF0ZSA9IEhhbmRsZWJhcnMuY29tcGlsZSh0ZW1wbGF0ZUh0bWwpXG5cbiAgICAgICAgSGFuZGxlYmFycy5yZWdpc3RlckhlbHBlciggXCJleHBhbmRcIiwgZnVuY3Rpb24gKCBvYmogKXtcbiAgICAgICAgICAgIGlmKHR5cGVvZiBvYmogPT09ICdvYmplY3QnKVxuICAgICAgICAgICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShvYmopXG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgcmV0dXJuIG9ialxuICAgICAgICB9KVxuXG4gICAgICAgIEhhbmRsZWJhcnMucmVnaXN0ZXJIZWxwZXIoIFwicm93Q2xhc3NcIiwgZnVuY3Rpb24gKCBvYmogKXtcbiAgICAgICAgICAgIGlmKCFvYmopIHJldHVybiAnYXBwLXN0YXJ0J1xuICAgICAgICB9KVxuXG4gICAgICAgIHZhciBtZXRob2REZWZpbml0aW9uID0ge1xuICAgICAgICAgICAgbmFtZTogJ0dOU1VJLkRpc3BsYXlMb2cnLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246ICdEaXNwbGF5cyBhIGxpc3Qgb2YgbWVzc2FnZXMgcGFzc2VkIGZyb20gdGhlIG1haW4gTGlzdCBWaWV3IHdpbmRvdyBvZiB0aGUgR05TIFVJJyxcbiAgICAgICAgICAgIHZlcnNpb246IDFcbiAgICAgICAgfVxuXG4gICAgICAgIGdsdWUuYWdtLnJlZ2lzdGVyKG1ldGhvZERlZmluaXRpb24sIGZ1bmN0aW9uIGRpc3BsYXlMb2coYXJncyl7XG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKCdhcmdzICAtLS0gJywgYXJncylcblxuICAgICAgICAgICAgaWYoYXJncy5zaW5nbGVFbnRyeSl7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGFkZFNpbmdsZUVudHJ5KGFyZ3Muc2luZ2xlRW50cnkpXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmKCAhIChhcmdzLmFsbEVudHJpZXMgJiYgQXJyYXkuaXNBcnJheShhcmdzLmFsbEVudHJpZXMpKSApe1xuICAgICAgICAgICAgICAgIHJldHVybiB7cmVuZGVyZWQ6ZmFsc2UsIG1lc3NhZ2U6IFwiQXJncyBkb2VzIG5vdCBjb250YWluIGFuIGFycmF5IG9mIG1lc3NhZ2VzXCJ9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICBhcmdzLmFsbEVudHJpZXMgPSBhcmdzLmFsbEVudHJpZXMubWFwKGZ1bmN0aW9uKG1zZ0pzb24pe1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcGFyc2VFbnRyeShtc2dKc29uKVxuICAgICAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgICAgICB2YXIgcmVzdWx0ID0gY29tcGlsZWRUZW1wbGF0ZSh7XG4gICAgICAgICAgICAgICAgICAgIGVudHJpZXM6YXJncy5hbGxFbnRyaWVzXG4gICAgICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgICAgIHZhciBsaXN0Q29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xpc3QtY29udGFpbmVyJylcbiAgICAgICAgICAgICAgICBpZihsaXN0Q29udGFpbmVyKXtcbiAgICAgICAgICAgICAgICAgICAgbGlzdENvbnRhaW5lci5pbm5lckhUTUwgPSByZXN1bHRcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCAwKVxuXG4gICAgICAgICAgICByZXR1cm4ge3JlbmRlcmVkOiB0cnVlLCBtZXNzYWdlOiBcIlN1Y2Nlc3NmdWxseSByZW5kZXJlZCB0ZW1wbGF0ZS5cIn1cbiAgICAgICAgfSlcblxuICAgICAgICBmdW5jdGlvbiBhZGRTaW5nbGVFbnRyeShlbnRyeSl7XG5cbiAgICAgICAgICAgIHZhciByb3dUZXh0ID0gY29tcGlsZWRUZW1wbGF0ZSh7XG4gICAgICAgICAgICAgICAgZW50cmllczogW3BhcnNlRW50cnkoZW50cnkpXVxuICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgdmFyIGNydXRjaFRib2R5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGJvZHknKVxuXG4gICAgICAgICAgICBjcnV0Y2hUYm9keS5pbm5lckhUTUwgPSByb3dUZXh0XG5cbiAgICAgICAgICAgIHZhciBsaXN0Q29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xpc3QtY29udGFpbmVyJylcbiAgICAgICAgICAgIGlmKGxpc3RDb250YWluZXIgJiYgY3J1dGNoVGJvZHkuZmlyc3RDaGlsZCl7XG4gICAgICAgICAgICAgICAgbGlzdENvbnRhaW5lci5hcHBlbmRDaGlsZChjcnV0Y2hUYm9keS5maXJzdENoaWxkKVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4ge3JlbmRlcmVkOiB0cnVlLCBtZXNzYWdlOiBcIlN1Y2Nlc3NmdWxseSBhZGRlZCBzaW5nbGUgZW50cnkuXCJ9XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBwYXJzZUVudHJ5KGVudHJ5KXtcbiAgICAgICAgICAgIHZhciByZXNcblxuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICByZXMgPSBKU09OLnBhcnNlKGVudHJ5KVxuICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oZXJyb3IpXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiByZXNcbiAgICAgICAgfVxuICAgIH0pXG5cbn0oKSkiXX0=
