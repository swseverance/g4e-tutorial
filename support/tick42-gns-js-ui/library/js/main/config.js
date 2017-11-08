var logger = require('js-logger').get('config')

var lsKey = 'GNSUI.config'

var config = module.exports = {
    toast: {
        enabled: true,
        hold: false,
        hangTime: 15000 //ms
    },

    save: function(){
        saveToLocal()
        config.close()
    },

    init: function(){

        //TODO attach the change event listener to display the precise value
        var slider = document.querySelector('#toast-persist')
        var displayBox = document.querySelector('#toast-persist-display')
        
        slider.addEventListener('change', function(ev){
            displayBox.value = ev.target.value
        })


        getFromLocal()

    },
    
    open: function(){
        $('#config-modal').show()

        var chbxEnabled = document.querySelector('#enable-toasts')
        chbxEnabled.checked = config.toast.enabled

        var chbxHold = document.querySelector('#hold-toasts')
        chbxHold.checked = config.toast.hold

        var sliderHangTime = document.querySelector('#toast-persist')
        sliderHangTime.value = config.toast.hangTime / 1000

        var displayBox = document.querySelector('#toast-persist-display')
        displayBox.value = sliderHangTime.value
    },
    
    close: function(){
        $('#config-modal').hide()
    }
}

function saveToLocal(){
    //get values from the "form"
    var chbxEnabled = document.querySelector('#enable-toasts')
    var enabled = chbxEnabled.checked
    if(typeof enabled === 'boolean'){
        config.toast.enabled = enabled
    }

    var chbxHold = document.querySelector('#hold-toasts')
    var holding = chbxHold.checked
    if(typeof holding === 'boolean'){
        config.toast.hold = holding
    }

    var sliderHangTime = document.querySelector('#toast-persist')
    var hangTimeSeconds = +sliderHangTime.value
    if(typeof hangTimeSeconds === 'number' && 5 <= hangTimeSeconds && hangTimeSeconds <= 60){
        config.toast.hangTime = (hangTimeSeconds * 1000)
    }

    localStorage.setItem(lsKey, JSON.stringify(config.toast))
}

function getFromLocal(){
    var storedSettings = getStoredSettings()
    if( ! storedSettings){
        return;
    }

    if(typeof storedSettings.enabled === 'boolean'){
        config.toast.enabled = storedSettings.enabled
    }

    if(typeof storedSettings.hold === 'boolean'){
        config.toast.hold = storedSettings.hold
    }

    if(typeof storedSettings.hangTime === 'number' && 5000 <= storedSettings.hangTime && storedSettings.hangTime <= 60000){
        config.toast.hangTime = storedSettings.hangTime
    }
}

function getStoredSettings() {

    var storedSettings = localStorage.getItem(lsKey)
    if( ! storedSettings ){
        return;
    }

    return JSON.parse(storedSettings)
}