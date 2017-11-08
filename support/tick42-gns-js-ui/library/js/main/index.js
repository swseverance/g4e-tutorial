/*
 Before the app starts glue must be initialized
*/

var initGlue = require('../common/initGlue')
var appMain = require('./main')

initGlue.onGlueInit(appMain)



