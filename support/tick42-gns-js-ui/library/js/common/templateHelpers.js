var icons = require('./icons')
var dates = require('./dates')
var utilityGns = require('../gns/utilityGns')

var helpers = module.exports = {}

var validTypes = [
    "boolValue",
    "intValue",
    "longValue",
    "doubleValue",
    "dateTimeValue",
    "stringValue",
    "boolValues",
    "intValues",
    "longValues",
    "doubleValues",
    "dateTimeValues",
    "stringValues"
]


helpers.register = function(){
    Handlebars.registerHelper( "displayGnsValue", function ( data ){

        //TODO refactor to use utilityGns.js -> show raw vs macro-parsed ???
        //console.log(data)

        var result

        var propNames = []

        validTypes.forEach( function(type) {
            if( data.hasOwnProperty(type) ){
                propNames.push(type)
            }
        })

        if(propNames.length === 1){
            var prop = propNames[0]

            if(Array.isArray(data[prop])) {
                result = data[prop].join(', ')
            } else {
                if(prop === 'dateTimeValue'){
                    result = dates.agmDate(data[prop])
                } else {
                    result = data[prop]
                }
            }
        } else if(propNames.length > 1) {
            //TODO gnsServer.yaml#810: If more properties are filled in, the one depending on the notification option's field type will be used
            console.log('multiple types in GNSValue')
        }

        return result
    })

    Handlebars.registerHelper( "setIcon", function ( data ){
        return icons.setIcon(data, 'display')
    })

    Handlebars.registerHelper( "renderDate", function ( data ){
        if(typeof data === 'string'){
            data = dates.agmDate(data)
        }

        return dates.renderDate(data, 'display')
    })

    Handlebars.registerHelper( "markBool", function ( data ){
        var icon = ''
        var title = ''

        if(data === true){
            icon = 'sticky-note-o'
            title = 'true'
        } else if(data === false) {
            icon = 'sticky-note'
            title = 'false'
        } else {
            return ''
        }

        var resultHtml = '<i class="fa fa-' + icon + '" data-toggle="tooltip" title="' + title + '"></i>'

        return resultHtml
    })

    function imgData ( image ){
        if( image
            && typeof image.data === 'string'
            && (image.format === 'url' || image.format === 'binary') )
        {
            return image.data
        }
    }

    Handlebars.registerHelper( "getImgData", imgData)

    Handlebars.registerHelper( "getImgDataByName", function ( name, mergedNif ){
        //console.log('name', name)
        //console.log('mergedNif', mergedNif)

        var image = utilityGns.getResource(name, mergedNif)

        //console.log('image', image)
        if(! image || ! image.data) {return}

        var srcData = image.data

        //console.log('srcData', srcData)

        return srcData
    })

    Handlebars.registerHelper( "agmDate", dates.agmDate)
}