/**
 * Starts glue using the glueConfig.js file in project root,
 * which must be included in the html as a script, before
 * the target file.
 *
 * To use: pass the application start code as a parameter when calling.
 */

if(module){
    module.exports = {
        onGlueInit: onGlueInit
    }
}

function onGlueInit(appMain){
    if (typeof appMain !== 'function') {
        throw new TypeError('The argument must be a function.')
    }

    if (typeof window !== 'object'
        || typeof window.Glue !== 'function'
        || typeof window.gnsUiGlueConfig !== 'object'
    ){
        console.log('Unable to try initializing Glue.')
        return;
    }

    Glue(gnsUiGlueConfig)
        .then(function(glue){
            //check glue.agm and glue.agm.subscribe <-- function
            if (glue && glue.agm && typeof glue.agm.subscribe === 'function') {
                //attach glue to window for the rest of the app to use
                window.glue = glue

                //go app async
                setTimeout(function(){
                    appMain()
                }, 0)
            } else {
                console.log('Error attaching glue object to window.')
            }
        })
        .catch(function(error){
            console.log('Error initialising Glue: ', error)
        })
}