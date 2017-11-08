if(module){ //default.html defines module as false
    var logger = require('js-logger').get('utilityGns')

    module.exports = {
        merge: merge,
        invokeGlueRoutingMethod: invokeGlueRoutingMethod,
        hasRequiredFields: hasRequiredFields,
        getResource: getResource,
        setIsRead: setIsRead
    }

} else {
    logger = console
}

/**
 * > checks that a notifications contains all
 * the required fields
 * > attaches hasReqFields property (boolean)
 */
function hasRequiredFields(nif){
    var requiredProps = [
        'id',
        'type',
        'notificationTime',
        'creationTime',
        'source',
        'sourceNotificationId',
        'title',
        'severity',
        'state',
        'sequenceId'
    ]

    var valid = true

    requiredProps.forEach(function(propKey){
        var propValue = nif[propKey]
        if(propValue === undefined || typeof propValue !== 'string' || propValue === ''){
            valid = false
        }
    })

    return valid
}

/**
 * > takes a string input and extracts
 * all the $(macro) elements and returns an
 * array of literals and macros
 */
function parseMacro(text){

    var tokens = []

    var start = 0
    var pos = text.indexOf('$(', start)

    while(pos >= 0){
        //we only step into the while if there's a '$(' starting combo

        tokens.push( { literal: text.slice(start, pos) } )
        //tokens.push( text.slice(start, pos) )

        start = text.indexOf(')', pos) // the end of the macro

        if(start >= 0){
            tokens.push( { macro: text.slice(pos+2, start) } )
            //tokens.push( "~" + text.slice(pos+2, start) + "~")

            start += 1
            pos = text.indexOf('$(', start)
        } else {
            //there is no end ')' brace

            start = pos //to pick up the malformed macro as a literal
            break;
        }
    }

    if(start < text.length && start >= 0){
        tokens.push( { literal:text.slice(start, text.length) } )
    }

    return tokens
}

/**
 * > takes a macro input and interprets it
 * in the context of the htmlContainer,
 * returning a string
 * > the 'counter' is a UI-specific function
 * which counts all notifications with the
 * same correlationId
 */
function interpretMacro(macro, notification, counter){
    var result

    //standard macros (env, sys, etc...)
    if(macro.indexOf('env::') === 0){
        var expression = macro.slice(5)
        var conditionalAt = expression.indexOf('?')
        var envType = (conditionalAt > -1) ? expression.slice(0, conditionalAt) : expression
        var defaultValue = (conditionalAt > -1) ? expression.slice(conditionalAt + 1, expression.length) : undefined
        var envValue = htmlContainer.env[envType]

        result = (envValue) ? envValue : defaultValue

    } else if (macro.indexOf('sys::') === 0) {
        var sysType = macro.slice(5)

        if(sysType === 'count'){
            //must call custom function which counts the number of notifications with the same 'correlationId'
            result = counter(notification.correlationId)
        }

    } else {
        var tokens = macro.split('.')
        var property = tokens.reduce(function(ref, currEl){
            if(ref && currEl) {
                var open = currEl.indexOf('[')
                var close = currEl.indexOf(']')
                if(close > open && open > -1 && close === (currEl.length - 1)){
                    var collectionName = currEl.slice(0, open)
                    var collIndex = currEl.slice(open + 1, close)

                    ref = (ref[collectionName] && ref[collectionName][collIndex])
                        ? ref[collectionName][collIndex]
                        : undefined

                } else {
                    ref = ref[currEl] ? ref[currEl] : undefined
                }
            }
            return ref
        }, notification)

        result = property ? property.toString() : undefined

        //TODO: gnsServer.yaml#559: Format we need to agree on (something sensible which can be used by native (.NET) and JavaScript apps), e.g. '##0.00', etc.
    }

    return result
}

/**
 * > parses and interprets a string with macros
 * returning a string
 */
function processMacro(text, notification, counter){
    var tokenArr = parseMacro(text)
    var resArr = tokenArr.map(function(token){
        var mapRes = ''

        if(token.macro){
            mapRes = interpretMacro(token.macro, notification, counter)
        } else if (token.literal) {
            mapRes = token.literal
        }

        return mapRes
    })
    return resArr.join('')
}

function gnsValueToPlainJsValue(data, notification, counter){

    //TODO: implement sys::count for this UI
    counter = function(){return 'sys::count not supported in this UI'}

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

    var result

    var propNames = []

    //TODO change the logic
    // pull all properties -> in the own properties trip the 'type' flag
    // if there are not 2 or the type flag is not tripped -> return undefined
    // check that the other property is valid key
    // check that key type matches enum type ->use the MAP
    // verify that the data-type is matches the key-enum pair

    validTypes.forEach( function(type) {
        if( data.hasOwnProperty(type) ){
            propNames.push(type)
        }
    })

    if(propNames.length === 1){
        var prop = propNames[0]

        if( prop === 'stringValue' && (typeof data[prop] === 'string') ) {
            result = processMacro(data[prop], notification, counter)

        } else if( prop === 'stringValues' && Array.isArray(data[prop]) ) {
            result = data[prop].map(function(dataEl){
                if(typeof dataEl === 'string'){
                    return processMacro(dataEl, notification, counter)
                }
            })

        } else {
            result = data[prop]
        }

    } else if(propNames.length > 1) {

        //logger.error('multiple types in GNSValue')


    }

    return result
}

function invokeSuccess(data){
    logger.info('Success invoking', data)
}

function invokeError(data){
    logger.warn('ERROR invoking', data)
}

function invokeGlueRoutingMethod(glueRoutingMethod, notification){
    var methodName = glueRoutingMethod.name
    if(typeof methodName !== 'string' || methodName.length <= 0)
    {
        logger.warn('ERROR Invoking. Invalid methodName!', glueRoutingMethod)
        return;
    }

    var parameters = glueRoutingMethod.parameters
    var invokeParameters = {}

    for (var index in parameters){
        var value = (parameters[index].value.stringValue ==='$(this)')
            ? notification
            : gnsValueToPlainJsValue(parameters[index].value, notification);
        if (value !== undefined) {
            invokeParameters[parameters[index].name] = value;
        }
    }

    logger.debug('Invoking',methodName,'with parameters:', invokeParameters)

    glue.agm.invoke(methodName, invokeParameters, 'best', {}, invokeSuccess, invokeError)
}

function setIsRead(notificationId, isRead, success, error) {
    if(typeof notificationId !== 'string') {
        logger.error('The notificationId must be a string.')
        return
    }

    if(typeof isRead !== 'boolean') {
        logger.error('The isRead parameter must be boolean.')
        return
    }

    if( ! success ) {
        success = function(d){ logger.debug('Just set isRead for:', notificationId, d) }
    }

    if( ! error ) {
        error = function(e){ logger.warn('Failed to set isRead for:', notificationId, e) }
    }

    logger.debug('Attempting to set isRead.')

    glue.agm.invoke(
        'T42.GNS.Subscribe.SetReadState',
        {id: notificationId, isRead: isRead},
        'best',
        {},
        success,
        error
    )
}

function collectionObjToArray(collection) {
    if(collection === null || collection === undefined || typeof collection !== 'object'){
        return
    }

    if(Array.isArray(collection)){
        return collection
    }

    var collArr = []

    for(var index in collection){
        var el = collection[index]
        collArr.push(el)
    }
    return collArr
}

function getActionItemsArray(object){
    var itemsArray = []
    if(object.glueRouting
        && object.glueRouting.actions) {
        itemsArray = collectionObjToArray(object.glueRouting.actions.items)
    }
    return itemsArray
}

function getResourcesImagesArray(object){
    var imagesArray = []
    if(object.resources ){
        imagesArray = collectionObjToArray(object.resources.images)
    }
    return imagesArray
}

/**
 * > merges glueRouting and resources according to rules in the gnsServer.yaml
 * > 'categories' parameter is an sorted array of the Category objects
 *   where the last element is the root-most category, which
 *   in the sample data is 'News'
 */
function merge(notification, source, categories){
    if(! notification){
        return
    }

    if(! source){
        source = {}
    }

    if(! categories){
        categories = []
    }

    ['detailMethod','popupMethod'].forEach(function(specialMethod){
        if (notification.glueRouting && notification.glueRouting[specialMethod]){
            //notification takes precedence
        } else if (source.glueRouting && source.glueRouting[specialMethod]) {
            if( ! notification.glueRouting) { notification.glueRouting = {} }
            notification.glueRouting[specialMethod] = source.glueRouting[specialMethod]
        } else {
            var length = categories.length
            for(var i = 0; i < length; i += 1){
                if(categories[i].glueRouting && categories[i].glueRouting[specialMethod]){
                    if( ! notification.glueRouting) { notification.glueRouting = {} }
                    notification.glueRouting[specialMethod] = categories[i].glueRouting[specialMethod]
                    break
                }
            }
        }
    })

    //Actions
    var nifActions = getActionItemsArray(notification)
    var sourceActions = getActionItemsArray(source)
    var catActions = categories
        .map(function(cat){
            return getActionItemsArray(cat)
        })
        .reduce(function(prev, curr){
            return prev.concat(curr)
        }, [])

    var allItems = nifActions.concat(sourceActions, catActions)

    var mergedItemsHash = {} //{name: {GlueRoutingMethod} }
    var items = []
    allItems.forEach(function(item){
        var key = item.name
        if( ! mergedItemsHash[key] ) {
            mergedItemsHash[key] = item
            items.push(item)
        }
    })

    if(items.length > 0) {
        if(! notification.glueRouting) notification.glueRouting = {}
        if(! notification.glueRouting.actions) notification.glueRouting.actions = {}
        notification.glueRouting.actions.items = items
    }

    //Resources
    var sourceRes = getResourcesImagesArray(source)
    var catRes = categories
        .map(function(cat){
            return getResourcesImagesArray(cat)
        })
        .reduce(function(prev, curr){
            return prev.concat(curr)
        }, [])

    var allImages = sourceRes.concat(catRes)
    var mergedImagesHash = {} //{name: {GlueRoutingMethod} }
    var images = []
    allImages.forEach(function(image){
        var key = image.name
        if( ! mergedImagesHash[key] ) {
            mergedImagesHash[key] = image
            images.push(image)
        }
    })

    if(images.length > 0) {
        if(! notification.resources) notification.resources = {}
        notification.resources.images = images
    }
}

/**
 * > finds an image url resource by 'name'
 * >
 */
function getResource(name, mergedNif){

    /*
    var ex = {
        "resources": {
            "images": [
                {
                    "data": "/tick42-gns-js-ui/library/js/_images/rocket.png",
                    "format": "url",
                    "name": "EikonIcon",
                    "resourceType": "image"
                },
                {
                    "data": "url/pointing/to/RssIcon.png",
                    "format": "url",
                    "name": "newsImage"
                },
                {
                    "data": "url/pointing/to/envelope.jpg",
                    "format": "url",
                    "name": "EmailIcon"
                }
            ]
        }
    }
    */

    if( ! (mergedNif && mergedNif.resources && mergedNif.resources
        && Array.isArray(mergedNif.resources.images)
        && typeof name === 'string') )
    {
        return
    }

    var images = mergedNif.resources.images

    var pic = images.filter(function(item){
            return (item && item.name && item.name === name)
    })[0]

    if( pic
        && (pic.format === 'url' || pic.format === 'binary')
        && typeof pic.data === 'string' )
    {
        return pic
    }
}