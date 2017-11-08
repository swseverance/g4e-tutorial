var moment = require('moment')

var dates = module.exports= {}

dates.renderDate = function(data, type, full, meta){
    if(data === undefined || data === null || data === '') {
        return undefined
    }

    var dateFormat = 'DD/MM/YYYY'
    var timeFormat = '[<strong>]HH:mm:ss[</strong>]'

    moment.updateLocale('en', {
        calendar : {
            lastDay : dateFormat,
            sameDay : timeFormat,
            nextDay : dateFormat,
            lastWeek : dateFormat,
            nextWeek : dateFormat,
            sameElse : dateFormat
        }
    });

    var jsDate = new Date(data)
    var date = moment(jsDate)
    //TODO validate date parsing
    var result = null

    if(type === 'sort'){
        result = date.valueOf()
    } else if (type === 'display') {
        result = '<span title="' + jsDate + '">'+ date.calendar() +'</span>'
    }
    return result
}

/**
 * > converts and agm non-streaming date value like "$date$1434131319879"
 *   to a Date() object
 * > handles the case if the value is already a Date() object
 */
dates.agmDate = function(stringDate){
    if( Object.prototype.toString.call(stringDate) === "[object Date]" ){
        return stringDate
    }

    if(typeof stringDate !== 'string'){
        return;
    }

    var agmDateMarker = '$date$'

    if(stringDate.substr(0, agmDateMarker.length) !== agmDateMarker){
        return;
    }

    var asString = stringDate.substr(agmDateMarker.length)
    var asInt = +asString
    var result = new Date( asInt )

    return result
}