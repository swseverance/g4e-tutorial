var categories = module.exports = {}
var logger = require('js-logger').get('categories')

var categoryHash = {} //{'sourceName':{Source object...}

categories.getOrderedArrWithAncestors = function(name){
    if(typeof name !== 'string') {
        return;
    }

    //the last element is the root-most category

    var result = name
        .split('/')
        .map(function(curEl, index, arr){
            var catName = arr.slice(0, index + 1).join('/')
            var result = categoryHash[catName] ? categoryHash[catName] : undefined

            return result
        })
        .filter(function(el){return el})
        .reverse()

    logger.debug('Getting ancestor list for:', name)
    return result
}

categories.updateCategories = function(catArr){
    categoryHash = {}

    catArr.forEach(function(cat){
        if(cat.name){
            categoryHash[cat.name] = cat
        }
    })
}
