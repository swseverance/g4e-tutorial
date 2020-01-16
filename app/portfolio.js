const RestServerUrl = "http://localhost:22910/";
const RestServerEndpoint = "GetDemoPortfolio";
const symbolPricesStreamName = "T42.MarketStream.Subscribe";

let subscriptions = [];
let searchQuery;
let partyObj;

let serviceMetricsSystem;
let serviceErrorCount;
let lastServiceError;
let serviceLatency;
let logger;

const gatherTabsBtn = {
    buttonId: "gatherTabs",
    tooltip: "Gather all tabs",
    order: 0,
    imageBase64: "iVBORw0KGgoAAAANSUhEUgAAAIAAAAB6CAYAAAB3N1u0AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAACxIAAAsSAdLdfvwAAAAYdEVYdFNvZnR3YXJlAHBhaW50Lm5ldCA0LjAuOWwzfk4AAAOlSURBVHhe7d1NaxNRFMbxfpoL7vyA+QpuXfkKVRdKdSWodKMg7tyIUIQ2xdF2TK2TmdS+kFLP5J5FkKo3sXNy5zzPD4YsPWfu35dpY7pm5eLiIhRF8XQ4HG4iX/t7ew/ae6G3xb92WbkGP4+OjuSVooHeHt9k0XB+fn4n7kxz/AcgS4azs7NHcV/6je8AZMFwfHz8LO5Kl/AbgCwXJpPJq7gn/YHPAGSxMB6P38Ud6S/8BSBLhaqqPsb96B98BSALtb/zv8bdKIGPAGSR2TO+POLXs7Wu0Liqdna2t9/05arr+ruOnqL/AcgS7eHfnq3TjV7dpHK/vK9zp+h3ALJAmE6nD+MunWEAOZLhw8nJyUbco1MMIDcyeJC/71/EHTrHAHIiQwf5h87bOL8JBpALGbh9xv8QZzfDAHIgw7bP+LtxblMMYJVkyNkzftM0P2Yj22MAqyIDdv2Mn4IBrIIM1z7jr8c5V4oBWJPBwunp6ZM448oxAEsyVPuM/zzOlwUGYEUGap/xX8fZssEALMgwYVxV7+NcWWEAFuTwt3Wo3DAACzpQjhiABR0oRwzAgg6UIwZgQQfKEQOwoAPliAFY0IFyxAAs6EA5YgAWdKAcMQALOlCOGIAFHSgrk6ap5KVXn6KBEMAtuQZGV+8+QmU0Gt2VuVP1MoBe/ZFsTe7P7C10iVc+gcswqRiAR3q4KRiAR3q4KRiAR3q4KRiAR3q4KRiAR3q4KRiAR3q4KRiAR3q4KRiAR3q4KRiAR3q4KRiAR3q4KRiAR3q4KRjAnIODg2uHh4c3r/KaTCY35D7bfp8gnm0SBjBnNBp19d/nbe+z/qIpGMAcBgCOAYBjAOAYADgGAI4BgGMA4BgAOAYAjgGAYwDgGAA4BgCOAYBjAOAYADgGAI4BgGMA4BgAOAYAjgGAYwDgGEBmZL5FPqXrv6+maTbltQuWH8c3cBGAzNb+bONPcUxahJcA2pppCQwAHAMAxwDAMQBwDAAcAwDHAMAxAHAMABwDAMcAwDEAcAwAHAMAxwDAMQBwDACclwBCXdf7cUxahIsAWjIf3xS6xOUmAGt8Wzg4BgCOAYBjAOAYADgGAI4BgGMA4BgAOAYAjgGAYwDgGAA4BgAOMQDT71MbXwv/yHbEANz6Vpb39HYkYwCOFJ+LDb0dyRiAIwwAHAMAxwDAMQBwDAAcAwD3pSge6+1I5imAy74yhnYt/JXAra2t67vD3ZdXeZVlub7MLMtbW/sFpubVd+W6GFMAAAAASUVORK5CYII="
};

const extractTabsBtn = {
    buttonId: "extractTabs",
    tooltip: "Extract all tabs",
    order: 0,
    imageBase64: "iVBORw0KGgoAAAANSUhEUgAAAIAAAABjCAYAAABT7gjnAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjM2NDE2QTIxQTkyODExRTY4QUY2RTYzRjNEM0ZFRTJBIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjM2NDE2QTIyQTkyODExRTY4QUY2RTYzRjNEM0ZFRTJBIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MzY0MTZBMUZBOTI4MTFFNjhBRjZFNjNGM0QzRkVFMkEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MzY0MTZBMjBBOTI4MTFFNjhBRjZFNjNGM0QzRkVFMkEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7pl9TZAAAEm0lEQVR42uydW08aQRiGnXHDIRViaClNuCgJralpjIXEi/4B/7fXpmurpiSgiRdthdBKcQ2nwk4HgxWJWA6z7Hwz73vljbvMvM93GlaXCSHWIOW621Sm+wfl8CoA9++jSozBAACQEQAAIAAA1kMgAAAkAAAkAAAUekkAAJZnAwBgOQQAwPKSAAAszwYAwHIIAIDlJQEAWJ4NAIDlEDiTN/E8r3RxcdHpdrtRnQC5urqq7e/vf5Q/RgGBuucM2N1X19L4r61WK5/JZCK6rVqa39/Y2PgeiURyJFwSwmdSAd9GyfVvI7xer7uJRGJbR/Nd1/2eSqX6VMynVhLYYDD4xTlP6bjCk5OTo52dnSI1U4ZPBK0gAyjJBkxo+lBgrVY7khmpqFu0jfZrxf4GB4F2APi+v9br9c5jsdgbHczW0WmVEGg1BjYajb7c81oI5ouR3/6D3aRl/r91kARAjp7tzc3N9vr6+qvVNuz3phM0fOkGUQsAzs/Pb3K53DDdJlcYJcIw0xeCIHQAyuWyl8/nhwdSz3RLj4ZAILRtAmXab8nIH0IYpzAzExfTCoBqtfpHjnk9mYE3YHx4EIQCwHDUk/rJOU/D/HBBcOb9zWazOXAc52yZu8fj8ecBmi9G8ztsfjo42EIAdDqdgUzd73TufBncnxkCbtiCoDn3jMN8u8VhvoVhf9/3ky8BMH+BPRv1SIx6BoD5CrI+h/l2zv+UAYD589X7Jx8k5YQXBM0S8uy2z5t6LuJQ8x9nPMulfMoZAJGvIOWTBQCpX03Kp1oCQkv9I+7E2AazWWAN6fuIue/pEIn+tSD3887kCdPYyPBFLulTMJ8KAMqjfyJCyX55OLaOhRdgzV8Hj7cQY3WS9Egxb72nCIBQESVjYU7e9GVTvjUZYMx4borp84541HuApaJ/ZLyJI55ScQK0L5IaTTwuDGRNumaARTt/U8+JA1sXxybZU++NA2BVm0R1xKNaAsSs5pvY6K0aaE418k0zP6xsxjXciFnMR8o3FID/dv/Lnn2jgaVfAmC+qQDMcPiDI13DpwBmQ+Tr1MByzTZmWrSYlPa1WotOAIgnmj6kfEtKgJGpX+czC90zgAmpX+s1aAPAIwMAIxzxjMoaHA03DY2erVOAiSMfAIAAwCwtQKFQ6CL6Z9LAOABkA9g8ODjowfyn1ev1LlzXrRoHgOz/oslkMgqLp2v4XqdIJPI6m82+MLEEDP9ZNACYouPj48/pdLpg9BgIPaquTPn1YrGYNf4cAHoo3/drl5eXIkjzMQZqKs/zTjnnL2W9D7wsAgDNVC6XPyUSife2nQNAcr4/PDysbG1trfRdiegBNJAQ4nelUrnZ29tb+bsSAUDI6nQ6ZxKApIz8UA7BAEDIaT8Wi4VahtEDhDzthf0BAIDlAgAAAAIAEACA7NTcY2Amk4mUSqUGtk6Jbra3tzdJATBU2B8aQgmAAAAEACAAAAEAq6T6zTkAgJiur687AMBieZ73TeX1GN7GRUv9fv+H4zhZlRkAf45FRF+kVJqPEkBIruue7u7uflB9XTZRAVAONFS73T6Lx+Nvg7j2XwEGACbouxHl2VRVAAAAAElFTkSuQmCC"
};

Glue(glueConfig)
    .then(glue => {
        window.glue = glue;
        initiateG4O();
        instrumentService();
        onInitializeApp();
        initInstrumentSearch();
        trackTheme();
        console.log(`Glue42 is initialized - Glue42 JavaScript v.${glue.version}`);
    })
    .catch(error => {
        console.error(error.message);
    });

const initiateG4O = () => {

    const glue4OfficeOptions = {
        glue: glue,
        outlook: true,
        excel: true
    };

    Glue4Office(glue4OfficeOptions)
        .then(g4o => {
            window.g4o = g4o;
        })
        .catch(error => {
            console.error(error.message);
        });
};

const instrumentService = () => {

    // Create a logging service.
    logger = glue.logger.subLogger("portfolio-logger");

    // Create a metrics sub-system to store the metrics.
    serviceMetricsSystem = glue.metrics.subSystem("PortfolioMetrics", "Metrics describing the Portfolio app state.");

    // Set initial system state.
    serviceMetricsSystem.setState(0, "Portfolio app initialized.")

    // Metric for counting the failed AJAX requests.
    serviceErrorCount = serviceMetricsSystem.countMetric("RequestErrorCount", 0);

    // Composite metric for holding the last recorded error.
    lastServiceError = serviceMetricsSystem.objectMetric("LastServiceError", { lastError: {} });

    // Metric to track request latency.
    serviceLatency = serviceMetricsSystem.timespanMetric("LatencyMetric", 0);
};

const onInitializeApp = () => {
    if (glue.interop) {
        glue.interop.register({
            name: "Alert symbol",
            objectTypes: ["Instrument"],
        },
            (args) => {
                alert(args.instrument.ric);
            });
        glue.interop.register({
            name: "Alert bpod",
            objectTypes: ["Instrument"],
        },
            (args) => {
                alert(args.instrument.bpod);
            });

    };

    setUpAppContent();
    setUpStreamIndicator();
    setUpGlueIndicator();
    setUpWindowEventsListeners();
};

const initInstrumentSearch = () => {

    const gssOptions = {
        agm: glue.interop,
        defaultQueryLimit: 500,
        measureLatency: false,
        searchTimeoutInMillis: 10000,
        debugGss: false,
        debug: false
    };

    // Create a new search client.
    const searchClient = new gssClientSearch.create(gssOptions);

    // Create a new search query for the entity of interest.
    searchQuery = searchClient.createQuery("Instrument");

    // Subscribe for the event which fires when data is received.
    searchQuery.onData(data => {
        displayResult(data);
    });
};

const trackTheme = () => {

    const setTheme = (name) => {
        $("#themeLink").attr("href", "../lib/themes/css/" + name);
    };

    glue.contexts.subscribe("theme", (context) => {

        let themeName = context.name;

        themeName === "dark" ? setTheme("bootstrap-dark.min.css") : setTheme("bootstrap.min.css");
    });
};

const setUpAppContent = () => {

    const thisPortfolioWindow = glue.windows.my();
    const portfolioContext = thisPortfolioWindow.context;

    if (!portfolioContext.party) {
        // If this is a generic Portfolio window (no `party` in the context),
        // register an Interop method which changes the portfolio in the Portfolio window
        // depending on what client the user has selected in the Clients window.
        registerInteropMethod();
    } else {
        thisPortfolioWindow.setTitle(`${portfolioContext.party.preferredName} - Portfolio`)
            .then(tab => {
                console.log(`Tab title set to ${tab.title}.`);
            }).catch(error => {
                console.error(error.message);
            });

        document.getElementById("title").textContent = portfolioContext.party.preferredName;
        loadPortfolio(portfolioContext.party.pId);
        partyObj = portfolioContext.party;
    };
};

const registerInteropMethod = () => {

    // If the Portfolio app is in an Activity, use the Activity context
    // to load the portfolio of the selected client.
    // If not, register the Interop method for setting the correct portfolio.
    if (glue.activities.inActivity) {

        const activityContextHandler = (context) => {
            if (context.party) {
                loadPortfolio(context.party.pId);
                partyObj = context.party;
            }
        }

        glue.activities.my.onContextChanged(activityContextHandler);
    } else {
        glue.interop.register({
            name: "SetParty",
            displayName: "Set Party",
            description: "Updates the application window to work with the specified party.",
            accepts: "composite party"
        },
            (args) => {
                loadPortfolio(args.party.pId);
                partyObj = args.party;
            });
    };
};

const loadPortfolio = (portf) => {

    const serviceUrl = RestServerUrl + RestServerEndpoint;
    const serviceRequest = "xpath=//Portfolios/Portfolio[id=" + portf + "]";
    const requestStart = Date.now();

    // Start measuring request latency.
    serviceLatency.start();

    const ajaxOptions = {
        method: "GET",
        url: serviceUrl,
        data: serviceRequest
    };

    $.ajax(ajaxOptions)
        .done((portfolio) => {
            
            // Stop measuting request latency.
            serviceLatency.stop();

            const elapsedMillis = Date.now() - requestStart;

            if (elapsedMillis >= 1000) {
                const message = "Service at " + serviceUrl + " is lagging.";
                
                // Set system to state to AMBER if the service is slow.
                serviceMetricsSystem.setState(50, message);

            } else {
                // Set the system state to GREEN if everything is normal.
                serviceMetricsSystem.setState(0, "Portfolio received, service is normal.");
            };

            let parsedPortfolio;

            if (typeof portfolio !== "undefined") {
                parsedPortfolio = JSON.parse(portfolio);
            };

            const logMessage = { portfolioId: portf, portfolio: parsedPortfolio };

            logger.info(JSON.stringify(logMessage));

            if (!parsedPortfolio.Portfolios.hasOwnProperty("Portfolio")) {
                console.warn("The client has no portfolio.")
                return;
            }

            unsubscribeSymbolPrices();
            setupPortfolio(parsedPortfolio.Portfolios.Portfolio.Symbols.Symbol);
            subscribeSymbolPrices();
        })
        .fail(function (jqXHR, textStatus) {

            // Stop measuring request latency.
            serviceLatency.stop();

            // Increment the request failure count metric.
            serviceErrorCount.increment();

            const errorMessage = "Service at " + serviceUrl + " failed at " + serviceRequest + " with " + textStatus;

            const errorOptions = {
                clientId: portf,
                message: errorMessage,
                time: new Date(),
                stackTrace: ""
            };

            // Capture the error by updating the composite metric with the last recorded error.
            lastServiceError.update({ lastError: errorOptions });

            // Set the system state to RED when a request fails.
            serviceMetricsSystem.setState(100, errorMessage);
        });
};

const subscribeSymbolPrices = () => {

    const trs = document.querySelectorAll("#portfolioTableData tr");

    trs.forEach((tr) => {
        const symbol = tr.getAttribute("id");

        subscribeBySymbol(symbol, updateInstruments);
    });

    console.log("New subscriptions for portfolio prices.");
};

const unsubscribeSymbolPrices = () => {

    subscriptions.forEach(subscription => {
        subscription.close();
    });

    console.log("Portfolio changed, current symbol price subscriptions closed.");
};

const subscribeBySymbol = (symbol, streamDataHandler) => {

    const subscriptionOptions = {
        arguments: {
            Symbol: symbol
        }
    };

    // Subscribe to the stream providing the symbol prices.
    glue.interop.subscribe(symbolPricesStreamName, subscriptionOptions)
        .then(subscription => {
            subscriptions.push(subscription);
            subscription.onData(streamData => {
                streamDataHandler(streamData);
            });
        })
        .catch(error => {
            console.error(error.message);
        });
};

const addRow = (table, rowData) => {
    
    const row = document.createElement("tr");

    addRowCell(row, rowData.RIC || "");
    addRowCell(row, rowData.Description || "");
    addRowCell(row, rowData.bid || "", "text-right");
    addRowCell(row, rowData.ask || "", "text-right");

    row.onclick = function () {
        
        removeChildNodes("methodsList");

        const availableInstrumentMethods = glue.interop.methods({ objectTypes: ["Instrument"] });

        addAvailableMethods(availableInstrumentMethods, rowData.RIC, rowData.BPOD);
        row.setAttribute("data-toggle", "modal");
        row.setAttribute("data-target", "#instruments");
    }
    row.setAttribute("id", rowData.RIC);
    table.appendChild(row);
};

const addRowCell = (row, cellData, cssClass) => {

    const cell = document.createElement("td");

    cell.innerText = cellData;

    if (cssClass) {
        cell.className = cssClass;
    }
    row.appendChild(cell);
};

const setupPortfolio = (portfolios) => {

    // Updating table with the new portfolio.
    const table = document.getElementById("portfolioTable").getElementsByTagName("tbody")[0];

    // Removing all old data.
    removeChildNodes("portfolioTableData");

    portfolios.forEach((item) => {
        addRow(table, item);
    });

    console.log("New portfolio loaded.")
};

const removeChildNodes = (elementId) => {

    const methodsList = document.getElementById(elementId);

    while (methodsList && methodsList.firstChild) {
        methodsList.removeChild(methodsList.firstChild);
    }
};

const updateInstruments = (streamData) => {

    const data = JSON.parse(streamData.data.data)[0];
    const symbol = data.name;
    const prices = data.image || data.update;

    if (!symbol || !prices) {
        return
    };

    const bid = prices.BID;
    const ask = prices.ASK;

    const symbolRow = document.getElementById(symbol);

    if (symbolRow !== null) {
        const symbolRows = symbolRow.getElementsByTagName("td");
        symbolRows[2].innerHTML = bid || 0;
        symbolRows[3].innerHTML = ask || 0;
    };
};

const addAvailableMethods = (methods, symbol, bpod) => {

    const methodsList = document.getElementById("methodsList");

    methods.forEach((method) => {

        const button = document.createElement("button");

        button.className = "btn btn-default";
        button.setAttribute("type", "button");
        button.setAttribute("data-toggle", "tooltip");
        button.setAttribute("data-placement", "bottom");
        button.setAttribute("title", method.displayName || method.name);
        button.textContent = method.displayName || method.name;

        button.onclick = (event) => {

            const options = {
                instrument: {
                    ric: symbol,
                    bpod: bpod
                }
            };

            invokeInteropMethodByName(method.name, options);
        };

        methodsList.appendChild(button);
    });

    // Enable tooltip.
    $(function () {
        $("[data-toggle=\"tooltip\"]").tooltip()
    });
};

const invokeInteropMethodByName = (methodName, params) => {
    glue.interop.invoke(methodName, params);
};

const displayResult = (result) => {

    removeChildNodes("resultInstrumentTbl");

    const resultInstrumentTbl = document.getElementById("resultInstrumentTbl");

    result.forEach((item) => {
        addTickerRow(resultInstrumentTbl, item);
    });

    $("#searchResult").modal("show");
};

const addTickerRow = (table, item) => {

    const row = document.createElement("tr");
    const portfolioTableDataTbl = document.getElementById("portfolioTableData");

    addRowCell(row, item.RIC || "");
    addRowCell(row, item.Description || "");

    row.onclick = () => {
        addRow(portfolioTableDataTbl, item);
        $("#searchResult").modal("hide");
    };

    table.appendChild(row);

    subscribeBySymbol(item.RIC, updateInstruments);
};

const getCurrentPortfolio = () => {

    const portfolio = [];
    const portfolioTableRows = document.querySelectorAll("#portfolioTableData tr");

    portfolioTableRows.forEach((row) => {

        const symbol = {};
        const tds = row.childNodes;

        tds.forEach((td, index) => {
            switch (index) {
                case 0:
                    symbol.ric = td.textContent;
                    break;
                case 1:
                    symbol.description = td.textContent;
                    break;
                case 2:
                    symbol.bid = td.textContent;
                    break;
                case 3:
                    symbol.ask = td.textContent;
                    break;
            };
        });

        portfolio.push(symbol);
    });

    return portfolio;
};

const setUpStreamIndicator = () => {

    const toggleStreamAvailable = (available) => {
        toggleStatusLabel("priceSpan", "Price feed is", available);
    };

    glue.interop.methodAdded((method) => {
        if (method.name === symbolPricesStreamName && method.supportsStreaming) {
            toggleStreamAvailable(true);
        };
    });

    glue.interop.methodRemoved((method) => {
        if (method.name === symbolPricesStreamName && method.supportsStreaming) {
            toggleStreamAvailable(false);
        };
    });
};

const setUpGlueIndicator = () => {

    const toggleGlueAvailable = (available) => {
        toggleStatusLabel("glueSpan", "Glue42 is", available);
    };

    glue.connection.connected(() => {
        toggleGlueAvailable(true);
    });

    glue.connection.disconnected(() => {
        toggleGlueAvailable(false);
    });
};

const toggleStatusLabel = (elementId, text, available) => {

    const span = document.getElementById(elementId);

    if (available) {
        span.classList.remove("label-warning");
        span.classList.add("label-success");
        span.textContent = text + " available";
    } else {
        span.classList.remove("label-success");
        span.classList.add("label-warning");
        span.textContent = text + " unavailable";
    };
};

const setUpWindowEventsListeners = () => {

    const thisPortfolioWindow = glue.windows.my();
    const clientsWindowID = thisPortfolioWindow.context.ownerWindowID;
    const clientsWindow = glue.windows.findById(clientsWindowID);
    let isRefreshed = window.sessionStorage.getItem(thisPortfolioWindow.name + "-isRefreshed");

    // Listen for the event whether the Clients window, owner of the Portfolio window, 
    // has been closed in order to close this Portfolio window too.
    glue.windows.onWindowRemoved((window) => {
        if (window.id === clientsWindowID) {
            thisPortfolioWindow.close()
                .catch(error => {
                    console.error(error.message);
                });
        } else {
            return;
        };
    });

    // TAB CONTROLS

    // Setup and handle frame buttons if this Portfolio window is a tab.
    if (thisPortfolioWindow.mode !== "tab") {
        return;
    } else {

        // Add an Extract Tabs button when first creating the Portfolio tab.
        // Check whether the window has just been refreshed
        // in order to preserve the current frame button state.
        if (!isRefreshed) {
            thisPortfolioWindow.addFrameButton(extractTabsBtn);
        };

        // Handle frame button clicks.
        thisPortfolioWindow.onFrameButtonClicked((button) => {
            switch (button.buttonId) {

                case "gatherTabs": 
                    gatherTabs(); 
                    break;

                case "extractTabs": 
                    extractTabs(); 
                    break;

                default: break;
            };
        });

        // Check where (relative to the Clients window) to gather the extracted tabs.
        const getWindowDirection = () => {

            const primaryMonitor = glue42gd.monitors.find(monitor => monitor.isPrimary === true);
            const bottomNeighbors = clientsWindow.bottomNeighbours;
            // This checks whether at least one bottom neighbor is a Portfolio window in order to snap the Portfolio tab group to the bottom if so.
            const areNeighborsPortfolios = bottomNeighbors.filter(tab => tab.title.includes(" - Portfolio")).length > 0 ? true : false;
            const availableSpaceBelow = primaryMonitor.workingAreaHeight - (clientsWindow.bounds.top + clientsWindow.bounds.height);

            // If there are no bottom neighbors and there is available space, or if the bottom neighbors are Portfolios 
            // gather the Portfolios below the Clients, otherwise - to the right.
            return (bottomNeighbors.length === 0 && availableSpaceBelow >= thisPortfolioWindow.bounds.height) || areNeighborsPortfolios ? "bottom" : "right";
        }

        // Handle the Gather Tabs button
        const gatherTabs = () => {

            // Find all currently open Portfolio tabs which belong to the Clients window
            // that is the owner of the current tab.
            // This is necessary if the user is running multiple instances of the Clients application.
            const tabsToGather = glue.windows.list().filter(tab => {
                if (tab.title.includes(" - Portfolio") && tab.context.ownerWindowID === clientsWindowID) {
                    return tab;
                };
            });

            // Attach all scattered tabs to the current tab.
            const attachPortfolioTabs = () => {

                let promises = [];

                tabsToGather.forEach(tab => {

                    const promise = thisPortfolioWindow.attachTab(tab);

                    promises.push(promise);
                });

                return Promise.all(promises);
            }

            attachPortfolioTabs()
                .then(() => {
                    console.log("Tabs attached successfully.");
                })
                .catch(error => {
                    console.error(error.message);
                });

            // Snap the current tab to the Clients window.
            const direction = getWindowDirection();

            thisPortfolioWindow.snap(clientsWindow, direction)
                .then(() => {
                    console.log(`Portfolio window with ID ${thisPortfolioWindow.id} was snapped to the Clients window.`);
                })
                .catch(error => {
                    console.error(error);
                });
        };

        // Handle the Extract Tabs button
        const extractTabs = () => {

            // Get the tabs attached only to the current Portfolio tab.
            // This is in case the user has extracted the Portfolio tabs
            // and then has closed some of them, or opened new ones, or grouped several of them in another group, etc.
            const tabsToExtract = thisPortfolioWindow.tabs;

            tabsToExtract
                .forEach(tab => {
                    tab.detachTab()
                            .then(() => {
                                console.log("The tab was detached.")
                            })
                            .catch(error => {
                                console.error(error.message)
                            })
                        }
                );
        };

        const checkIfButtonExists = (buttonID) => {
            const doesButtonExist =
                thisPortfolioWindow.frameButtons
                    .find(({ buttonId }) => buttonId === buttonID) !== undefined ? true : false;

            return doesButtonExist;
        }
        
        // Set up frame buttons on the Portfolio tabs when scattering/gathering tabs.
        const setupFrameButtons = (buttonToRemove, buttonToAdd) => {

            let buttonToRemoveExists;
            let buttonToAddExists;

            if (buttonToRemove && typeof buttonToRemove === "object") {

                buttonToRemoveExists = checkIfButtonExists(buttonToRemove.buttonId);

                if (buttonToRemoveExists) {
                    thisPortfolioWindow.removeFrameButton(buttonToRemove.buttonId)
                        .then(() => {
                            console.log(`${buttonToRemove.buttonId} button successfully removed.`);
                        })
                        .catch(error => {
                            console.error(error.message);
                        });
                };
            };

            if (buttonToAdd && typeof buttonToAdd === "object") {

                buttonToAddExists = checkIfButtonExists(buttonToAdd.buttonId);

                if (!buttonToAddExists) {
                    thisPortfolioWindow.addFrameButton(buttonToAdd)
                        .then(() => {
                            console.log(`${buttonToAdd.buttonId} button successfully added.`);
                        })
                        .catch(error => {
                            console.error(error.message);
                        });
                };
            };
        };

        // Handle button changes for the window to which tabs are being attached/detached.
        thisPortfolioWindow.onWindowAttached(() => {
            if (thisPortfolioWindow.frameButtons[0].buttonId &&
                thisPortfolioWindow.frameButtons[0].buttonId === gatherTabsBtn.buttonId) {
                setupFrameButtons(gatherTabsBtn, extractTabsBtn);
            };
        });

        thisPortfolioWindow.onWindowDetached(() => {
            if (thisPortfolioWindow.tabs.length === 2 &&
                thisPortfolioWindow.frameButtons[0].buttonId &&
                thisPortfolioWindow.frameButtons[0].buttonId === extractTabsBtn.buttonId) {
                setupFrameButtons(extractTabsBtn, gatherTabsBtn);
            };
        });

        // !!! onAttached() DOES NOT fire when the tab is simultaneously created and 
        // attached to a tab group via glue.windows.open() !!!
        // This event fires only when the tab has already been created and then is attached
        // to a tab group.

        // handle button changes for the window which is being attached/detached to another window
        thisPortfolioWindow.onAttached(() => {
            if (thisPortfolioWindow.frameButtons[0].buttonId &&
                thisPortfolioWindow.frameButtons[0].buttonId === gatherTabsBtn.buttonId) {
                setupFrameButtons(gatherTabsBtn, extractTabsBtn);
            };
        });

        thisPortfolioWindow.onDetached(() => {
            if (thisPortfolioWindow.frameButtons[0].buttonId &&
                thisPortfolioWindow.frameButtons[0].buttonId === extractTabsBtn.buttonId) {
                setupFrameButtons(extractTabsBtn, gatherTabsBtn);
            };
        });

        // Handle refreshing the window to avoid the simultaneous appearance of both buttons,
        // or unnecessary creation of the same button.
        thisPortfolioWindow.onRefreshing(() => {
            window.sessionStorage.setItem(thisPortfolioWindow.name + "-isRefreshed", true);
        });

        thisPortfolioWindow.onClosing(() => {
            window.sessionStorage.removeItem(thisPortfolioWindow.name + "-isRefreshed");
        });
    };
};

const search = (event) => {

    event.preventDefault();

    const searchValue = document.getElementById("ticker").value;

    searchQuery.search(searchValue);
};

const sendPortfolioAsEmailClicked = (event) => {

    event.preventDefault();

    const sendPortfolioAsEmail = (client, portfolio) => {

        const getEmailContent = (client, portfolio) => {

            const props = ["ric", "description", "bid", "ask"];

            const csv = props.join(", ") + "\n" +
                portfolio.map((row) => {
                    return props.map((prop, index) => {
                        let value = row[prop];

                        if (index === 1) {
                            value = "\"" + value + "\""
                        };

                        return value;
                    }).join(", ")
                }).join("\n");

            const html = "<html>\n<body>\n<table>\n<tr><th>" + props.join("</th><th>") + "</th></tr>" +
                portfolio.map((row) => {
                    return "<tr><td>" + props.map((prop) => {
                        const value = row[prop];
                        return value;
                    }).join("</td><td>") + "</td></tr>"
                }).join("\n") + "\n</table>\n</body>\</html>\n";

            const fileName = "client-" + client.pId + "-portfolio.csv";

            const file = {
                fileName: fileName,
                data: csv,
            };

            const newEmail = {
                to: "john.doe@domain.com",
                subject: "Hey John, look at " + client.name + "'s portfolio",
                bodyHtml: html,
                attachments: [file]
            };

            return newEmail;
        };

        const content = getEmailContent(client, portfolio);

        g4o.outlook.newEmail(content)
            .then(() => {
                console.log("Email template created.")
            })
            .catch(error => {
                console.error(error.message)
            });
    };

    const portfolio = getCurrentPortfolio();

    sendPortfolioAsEmail(partyObj, portfolio);
};

const sendPortfolioToExcelClicked = (event) => {

    event.preventDefault();

    const sendPortfolioToExcel = (client, portfolio) => {

        const config = {
            columnConfig: [{
                fieldName: "ric",
                header: "RIC"
            }, {
                fieldName: "description",
                header: "Description"
            }, {
                fieldName: "bid",
                header: "Bid Price"
            }, {
                fieldName: "ask",
                header: "Ask Price"
            }],
            data: portfolio,
            options: {
                worksheet: client.name,
                workbook: "ExportedPortfolios"
            }
        };

        const loadPortfolioFromExcel = (portfolio) => {

            unsubscribeSymbolPrices();

            removeChildNodes("portfolioTableData");

            const table = document.getElementById("portfolioTable").getElementsByTagName("tbody")[0];

            portfolio.forEach((item) => {
                item.RIC = item.ric;
                item.Description = item.description;
                addRow(table, item);
            });

            subscribeSymbolPrices();
        };

        g4o.excel.openSheet(config)
            .then(sheet => {
                
                const handleSheetChanges = (data, errorHandler, doneHandler, delta) => {
                    
                    loadPortfolioFromExcel(data);

                    delta.forEach(item => {
                        console.log(item);
                    });

                    doneHandler();
                };

                sheet.onChanged(handleSheetChanges);

                console.log(`New Excel Sheet with name ${sheet.name} opened.`)
            })
            .catch(error => {
                console.error(error.message)
            });
    };

    const portfolio = getCurrentPortfolio();

    sendPortfolioToExcel(partyObj, portfolio);
};