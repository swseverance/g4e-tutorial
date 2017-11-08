var _ = require('lodash')
var logger = require('js-logger').get('buffer')

var cache = []
var active = false

var buffer = module.exports = {}

buffer.fillWith = function fillWith(newDataObj){

    cache.push(newDataObj)

}

buffer.drain = function drain(){

    var clone = _.clone(cache)
    cache = []

    return clone
}

buffer.count = function count(){
    return cache.length
}

buffer.isActive = function isActive(){
    return active
}

buffer.setActive = function setActive(state){
    if(typeof state !== 'boolean'){
        logger.warn('Active state must be boolean!')
        throw new TypeError('Active state must be boolean!')
    }

    active = state
    logger.info('Buffer active state: ', active)
}