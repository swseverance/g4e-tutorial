var subscriptionCount = 0
var firstPush = true
var sequenceId = 1

Glue(glueConfig).then(function(glue) {
    console.log(glue.version);
    window.glue = glue;
    registerAgmMethod();
}).catch(function(error) {
    console.error(error);
})

// this is the stream where we'll push notifications
var notificationStream

var category = 'MarketData/Alert'
var source = 'MarketDataMonitor'
var type = 'MarketDataAlert'

function raiseMarketDataMonitorNotification(symbol) {

    var notification = {
        id: cuid(),
        //sequenceId: sequenceId++,
        type: type,
        category: category,
        source: source,
        sourceNotificationId: cuid(),
        title: 'Sudden ' + symbol + ' price decrease',
        description: symbol + ' just plummeted',
        notificationTime: new Date(),
        creationTime: new Date(),
        severity: 'High',
        state: 'Active',
        glueRouting: {
            detailMethod: {
                name: 'g42.FindWhoToCall',
                parameters: [{
                        name: 'notification',
                        value: {
                            //type: 'stringValue',
                            stringValue: '$(this)'
                        }
                    },
                    {
                        name: 'symbol',
                        value: {
                            //type: 'stringValue',
                            stringValue: symbol
                        }
                    }
                ]
            }
        }
    }

    console.log('Raising ', notification)

    notificationStream.push({
        items: [notification],
        isSnapshot: firstPush
    })
    firstPush = false
}

// canned response for the *.Categories call
var categories = {
    items: [{
        name: category
    }],
    isSnapshot: true
}

// canned response for the *.Sources call
var sources = {
    items: [{
        name: source
    }],
    isSnapshot: true
}

// helper function to create an AGM Stream
function createStream(streamName, options) {
    options = options || {}
    return glue.agm.createStream({ name: streamName }, // stream definition object (same as AGM method registration)
            { // streaming options
                subscriptionRequestHandler: options.subscriptionRequestHandler,
                subscriptionAddedHandler: options.subscriptionAddedHandler,
                subscriptionRemovedHandler: options.subscriptionRemovedHandler
            })
        .then(function onStreamRegistered(stream) {
            console.log('Registered stream ' + streamName)
            return stream
        })
        .catch(function onStreamError(error) {
            console.error('Failed to register ' + streamName + ': ' + error + ' - ' + error.stack)
        })
}

function registerAgmMethod() {
    // this gets called first in order to determine the GNS server's capabilites
    glue.agm.register({ name: 'T42.GNS.Publish.GetCapabilities' },
        // canned response for the *.Capabilities call - nothing fancy is supported
        function handleCapabilitiesRequested() {
            return {
                result: {}
            }
        })

    createStream(
        'T42.GNS.Publish.Categories', {
            subscriptionAddedHandler: handleCategorySubscriberAdded,
            subscriptionRemovedHandler: handleCategorySubscriberRemoved
        })

    createStream(
        'T42.GNS.Publish.Sources', {
            subscriptionAddedHandler: handleSourceSubscriberAdded,
            subscriptionRemovedHandler: handleSourceSubscriberRemoved
        })

    createStream(
            'T42.GNS.Publish.Notifications', {
                subscriptionAddedHandler: handleNotificationSubscriberAdded,
                subscriptionRemovedHandler: handleNotificationSubscriberRemoved
            })
        .then(function(stream) {
            notificationStream = stream
        })
}

// metadata API implementation
function handleCategorySubscriberAdded(client) {
    console.log(client.instance.application + ' subscribed for categories')
    client.push(categories)
}

function handleCategorySubscriberRemoved(client) {
    console.log(client.instance.application + ' unsubscribed from categories')
}

function handleSourceSubscriberAdded(client) {
    console.log(client.instance.application + ' subscribed for sources')
    client.push(sources)
}

function handleSourceSubscriberRemoved(client) {
    console.log(client.instance.application + ' unsubscribed from sources')
}

// notifications API implementation
function handleNotificationSubscriberAdded(client) {
    if (subscriptionCount++ === 0) {
        firstPush = true
    }
    console.log(client.instance.application + ' subscribed for notifications')
}

function handleNotificationSubscriberRemoved(client) {
    --subscriptionCount
    console.log(client.instance.application + ' unsubscribed from notifications')
}
