// last value cache keyed by symbol
var priceCache = {}

// holds the stream object created by this sample
var priceStream

Glue(glueConfig)
    .then((glue) => {
        window.glue = glue;
        initiateStream();
    })
    .catch((err) => {

    });

const initiateStream = () => {
    glue.agm.createStream(
        // stream definition
        {
            name: 'T42.MarketStream.Subscribe',
            accepts: 'String Symbol'
        },
        // optional callbacks
        {
            subscriptionRequestHandler: onSubscriptionRequest,
            subscriptionAddedHandler: onSubscriptionAdded,
            subscriptionRemovedHandler: onSubscriptionRemoved
        })
        .then(function onStreamCreated(stream) {
            console.log('Stream T42.MarketStream.Subscribe created successfully')
            priceStream = stream
        })
        .catch(function onStreamFailed(error) {
            console.error('Failed to register T42.MarketStream.Subscribe: ' + error)
        })
};

var RefCountedSymbolCache = function (symbol) {
    var subscriptions = {}

    // track subscriptions using the
    // AGM instance application name
    function add(subscription) {
        var app = subscription.instance.application
        if (!subscriptions[app]) {
            subscriptions[app] = 0
        }
        ++subscriptions[app]
    }

    function remove(subscription) {
        var app = subscription.instance.application
        if (--subscriptions[app] === 0) {
            delete subscriptions[app]
        }
    }

    function empty() {
        return subscriptions.length === 0
    }

    return {
        symbol: symbol,
        add: add,
        remove: remove,
        empty: empty,
        lastTradePrice: undefined,
        pollTask: undefined
    }
}

function onSubscriptionRequest(request) {
    var app = request.instance.application
    var symbol = request.arguments.Symbol
    if (!symbol) {
        console.warn(['Rejecting ', app, '- symbol not specified'].join(' '))
    }
    else {
        console.info(['Accepted ', app, 'subscription on branch', symbol].join(' '))
        request.acceptOnBranch(symbol)
        // request.accept()
    }
}

function onSubscriptionAdded(subscription) {
    var symbol = subscription.arguments.Symbol
    var symbolCache = priceCache[symbol]
    var firstSubscription = !symbolCache
    if (firstSubscription) {
        symbolCache = RefCountedSymbolCache(symbol)
        priceCache[symbol] = symbolCache
    }
    symbolCache.add(subscription)
    if (firstSubscription) {
        subscribeOnUnderlying(symbolCache)
    }
    if (!symbolCache.lastTradePrice) {
        // nothing in cache, client should wait for data
        // to become available on the underlying source
        return
    }
    // successive subscription and data is available
    // unicast directly to this client
    var payload = toPublisherFormat(symbol, symbolCache.lastTradePrice)
    console.log('unicasting to ', subscription.instance.application, payload)
    subscription.push(payload)
}

function onSubscriptionRemoved(subscription) {
    var symbol = subscription.arguments.Symbol
    var symbolCache = priceCache[symbol]
    if (symbolCache &&
        symbolCache.remove(subscription) &&
        symbolCache.empty()) {
        unsubscribeOnUnderlying(symbolCache)
        delete priceCache[symbol]
    }
}

function subscribeOnUnderlying(symbolCache) {
    // set up a timer task to pull data using AJAX
    // requests every 5 seconds
    var fun = fetchLastTradePrice.bind(
        null,
        symbolCache.symbol,
        function onData(ticker, lastTradePrice) {
            symbolCache.lastTradePrice = lastTradePrice
            // broadcast to all subscribers on this branch (all subscribers for this symbol)
            var payload = toPublisherFormat(symbolCache.symbol, symbolCache.lastTradePrice)
            console.log('broadcasting on ', symbolCache.symbol, payload)
            priceStream.push(payload, [symbolCache.symbol])
            // priceStream.push(payload /*, [symbolCache.symbol] */)
        })
    fun()
    symbolCache.pollTask = setInterval(fun, 1000)
}

function unsubscribeOnUnderlying(symbolCache) {
    clearInterval(symbolCache.pollTask)
}

function toPublisherFormat(symbol, tradePrice) {
    var data = {
        name: symbol,
        image: {
            BID: parseFloat(tradePrice - Math.random()).toFixed(2),
            ASK: parseFloat(tradePrice + Math.random()).toFixed(2),
        }
    }
    var payload = {
        data: JSON.stringify([data], undefined, 2)
    }
    return payload
}

function fetchLastTradePrice(ticker, callback) {
    // place for async requst
    let mockPrice = Math.random() * (1000 - 500) + 500;
    callback(ticker, mockPrice);
}