var dates = require('./dates')

var icons = module.exports= {}

var setEnumIcon = function (data, iconMap) {
    var icon = iconMap[data.toLowerCase()]
    return '<i class="fa fa-' + icon + '"title="' + Handlebars.escapeExpression(data) + '"></i>'
}

icons.setIcon = function(data, type, full, meta) {
    if(data === undefined || data === null || data === '') {
        return undefined
    }

    var result = null

    if(type === 'display') {
        var severityIconMap = {
            low: "info-circle",
            medium: "warning",
            high: "exclamation-circle",
            critical: "fire",
            active: "line-chart",
            closed: "times",
            acknowledged: "check"
        }

        result = setEnumIcon(data, severityIconMap)
    } else if(type === 'filter') {
        result = data
    }

    return result
}

icons.boolean = function(data, type, full, meta){

    var icon = ''

    if(data === false) {
        icon = '<i class="fa fa-chain-broken"></i>'
    }

    return icon
}

icons.severityWithDate = function(data, type, full, meta){
    if(data === undefined || data === null || data === '') {
        return undefined
    }

    var result = icons.setIcon(data, type, full ,meta)

    if(type === 'display'){
        var dateHtml = dates.renderDate(full.notificationTime, type, full, meta)
        result += dateHtml
    }

    return result
}
