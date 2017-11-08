var logger = require('js-logger').get('sources')

var sources = module.exports = {}

var sourceHash = {} //{'sourceName':{Source object...}

sources.getByName = function(name){
    if(typeof name !== 'string') {
        return;
    }

    return sourceHash[name]
}

sources.updateSources = function(srcArr){
    sourceHash = {}

    srcArr.forEach(function(src){
        if(src.name){
            sourceHash[src.name] = src
        }
    })
}