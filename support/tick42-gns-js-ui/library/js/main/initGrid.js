var mockedData = require('./mockedData')
var icons = require('../common/icons')
var dates = require('../common/dates')
var logger = require('js-logger').get('initGrid')

var missingDisplayProp = '<span class="missing-req-prop">-required-</span>'

module.exports = function initGrid () {

    var grid = $('#table_id').DataTable({
        searching: true,
        lengthChange: false,
        deferRender: true,
        scrollY: 400,
        scroller: false,
        paging: true,
        //lengthMenu: [[10, 25, 50],['10 per page', '25 per page', '50 per page']],
        rowId:'id',
        order: [[0, 'desc']],
        columns: mockedData.getColumns(),
        columnDefs: [{
                targets: 0, //Time
                visible: false,
                orderable: false,
                type: 'num',
                render: dates.renderDate,
                defaultContent: missingDisplayProp
            }, {
                targets: 1, //Severity
                render: icons.severityWithDate,
                orderable: false,
                defaultContent: missingDisplayProp
                //width: '45px'
            }, {
                targets: 2, //Type
                orderable: false,
                render: renderDefault
            }, {
                targets: 3, //Title
                orderable: false,
                render: renderDefault
                //width: '372px'
            }, {
                targets: 4, //Category
                orderable: false,
                render: renderCategory,
                defaultContent: ''
            }, {
                targets: 5, //Source
                orderable: false,
                render: renderDefault
            }, {
                targets: 6, //State
                orderable: false,
                render: icons.setIcon,
                defaultContent: missingDisplayProp
                //width: '45px'
            }
            /*, {
                targets: 7, //hasRequiredFields
                orderable: false,
                render: icons.boolean,
                defaultContent: ''
                //width: '45px'
            }*/
        ],

        dom:
        "<'row'<'col-sm-12 controls-container'lf>>" +
        "<'row'<'col-sm-12'tr>>" +
        "<'row'<'col-sm-5'i><'col-sm-7'p>>"
        
        ,

        select: {
            style: 'single',
            info: false, //TODO see https://datatables.net/reference/option/language.select.rows for more details
            blurable: false
        },

        createdRow: addAttributes,

        rowCallback: function(row, data, index){
            if(data.isRead){
                row.classList.remove('unread')
            } else {
                row.classList.add('unread')
            }
        },

        fnDrawCallback: function () {
            //console.log('draw')
        },

        initComplete: function () {
            logger.info('Initialized datatables grid.')
        }
    })
    
    return grid
}

var addAttributes = function(row, data, index){
    row.setAttribute('data-action','nif_row')
}

var renderDefault = function(data, type, full, meta) {
    if(data === undefined || data === null || data === '') {
        return missingDisplayProp
    } else {
        return Handlebars.escapeExpression(data)
    }
}

var renderCategory = function(data, type, full, meta) {
    return Handlebars.escapeExpression(data)
}
