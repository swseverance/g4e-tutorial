require('jquery-ui')
var _ = require('lodash')

//TODO change the preview pane to be a separate 'sticky' activity window
var previewPane = module.exports = {}

previewPane.togglePreviewPaneVisibility = function(){
    var $previewPane = $('#preview-pane-container')

    $previewPane.toggleClass('hidden col-md-4')
    //$previewPane.toggleClass('invisible')

    sizeToPane() //could also use https://datatables.net/reference/api/columns.adjust()

    //TODO debug
}

var sizeToPane = function() {
    var chevron = $('#toggle-preview').find('.fa')
    var $previewPane = $('#preview-pane-container')
    //var main = document.getElementById('main')
    var $main = $('#main')
    var wrapper= document.getElementById('wrapper')

    if($previewPane.hasClass('hidden')){
        chevron.toggleClass('fa-chevron-left fa-chevron-right')
        $main.toggleClass('col-md-8 col-md-12')
    } else {
        chevron.toggleClass('fa-chevron-right fa-chevron-left')
        $main.toggleClass('col-md-12 col-md-8')
    }

    $( window).resize()

    //if($previewPane.hasClass('hidden')){
    //    chevron.switchClass('fa-chevron-left', 'fa-chevron-right')
    //    main.style.width = '100%';
    //} else {
    //    chevron.switchClass('fa-chevron-right', 'fa-chevron-left')
    //
    //    var paneWidth = $previewPane.outerWidth(true)
    //
    //    main.style.width = (wrapper.offsetWidth - paneWidth) + 'px'
    //}
}
previewPane.sizeToPane = sizeToPane

previewPane.renderPreview = function(data) {

    //$('#accordion').accordion("destroy")

    var templateHtml = $('#tpl-preview').html()
    var compiled = _.template(templateHtml)

    if (data.reminder === undefined) {
        data.reminder = {remindPeriod: null}
    }
    if (data.target === undefined) {
        data.target = {}
    }

    var result = compiled({data: data})
    $('#preview-pane-container').empty().append(result)

    //$('#accordion').accordion({
    //    collapsible:true,
    //    active: false
    //})
}

