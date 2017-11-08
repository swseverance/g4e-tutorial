var logger = require('js-logger').get('revisionHistory')
//TODO require('deep-diff') , https://github.com/flitbit/diff

var revHist = module.exports = {}

var hash = {} //{id: [nif_rev3.current, nif_rev2, nif_rev1]} array of notifications sorted by version

revHist.view = function view(id){
    logger.debug('Opening history for:', id)

    //TODO open a history viewer that shows the property for just the notification

    //TODO use deep-diff to show changes from version to version

}