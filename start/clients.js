const RestServerUrl = 'http://localhost:22910/';
const RestServerEndpoint = 'Clients';
const MethodName = 'SetParty';


// TUTOR_TODO Chapter 1.2 - Call the Glue factory function and pass in the `glueConfig` object, which is registered by `tick42-glue-config.js`
// When the promise is resolved, attach the received glue instance to `window` so it can be globally accessible
// Then call the following functions:

// checkGlueConnection();
// setUpUi();
// setupClients();
// registerGlueMethods();
// trackTheme();

// Don't forget to catch any errors.

const checkGlueConnection = () => {

    const toggleStatusLabel = (elementId, text, available) => {
        const span = document.getElementById(elementId);
        if (available) {
            span.classList.remove('label-warning');
            span.classList.add('label-success');
            span.textContent = text + ' available';
        } else {
            span.classList.remove('label-success');
            span.classList.add('label-warning');
            span.textContent = text + ' unavailable';
        }
    }

    const toggleGlueAvailable = (available) => {
        toggleStatusLabel('glueSpan', 'Glue is', available);
    }

    glue.connection.connected(() => {
        toggleGlueAvailable(true);
    });

    glue.connection.disconnected(() => {
        toggleGlueAvailable(false);
    });
};

const setUpUi = () => {

    const portfolioButton = document.getElementById('portfolioBtn');

    if (portfolioButton) {

        portfolioButton.onclick = () => {

            // TUTOR_TODO Chapter 4.1 - Call openWindow with a window name, current window instance and a direction
            const myWin = glue.windows.my();

            openWindow('Portfolio', myWin, 'bottom');
        }
    }

    const setUpPortfolioFrameButton = () => {

        // TUTOR_TODO Chapter 4.4 - Use the windows API to create a new frame button

    };

    const setUpFrameButtonClick = () => {

        // TUTOR_TODO Chapter 4.4 - Use the windows API for handling frame button clicks to handle a frame button click, check the Id and open a portfolio window

    };

    // TUTOR_TODO Chapter 11 - check if you are in an activity and setup the frame buttons and events only if you are NOT
    setUpPortfolioFrameButton();
    setUpFrameButtonClick();
};

const setupClients = () => {

    const addRow = (table, client) => {
        const row = document.createElement('tr');
        addRowCell(row, client.name || '');
        addRowCell(row, client.eciId || '');
        addRowCell(row, client.gwmId || '');
        addRowCell(row, client.accountManager || '');

        row.onclick = () => {

            // TUTOR_TODO Chapter 11 - check if you are in an activity and either update the activity context or open a tab window and invoke the agm method
            openTabWindow(client);
            invokeAgMethod(client);

        }
        table.appendChild(row);
    }

    const addRowCell = (row, cellData, cssClass) => {

        const cell = document.createElement('td');

        cell.innerText = cellData;

        if (cssClass) {
            cell.className = cssClass;
        }
        row.appendChild(cell);
    }

    const handleClients = (clients) => {
        const table = document.getElementById('clientsTable').getElementsByTagName('tbody')[0];

        clients.forEach((client) => {
            addRow(table, client);
        })
    }

    const getClients = (count, callback) => {

        // TUTOR_TODO chapter 4.2 - start the loader here

        $.ajax({
            method: 'GET',
            url: RestServerUrl + RestServerEndpoint
        })
            .done((clients) => {

                if (typeof clients !== 'undefined') {
                    const parsedClients = JSON.parse(clients);
                    const slicedClients = parsedClients.Clients.Client.slice(0, count);

                    if (typeof callback !== 'undefined' && typeof callback === 'function') {
                        callback(slicedClients);
                    }
                }
            })
            .fail((jqXHR, textStatus) => {
                // TUTOR_TODO chapter 4.2 - stop the loader here

                console.error('Request failed: ' + textStatus);
            })
            .always(() => {
                // TUTOR_TODO chapter 4.2 - stop the loader here
            });
    }

    getClients(5, handleClients);
};

const registerGlueMethods = () => {

    // TUTOR_TODO Chapter 7 - register an AGM method "GWM.FindWhoToCall", the handler should open the 'symbolPopup.html' window.
};

const trackTheme = () => {

    const setTheme = (name) => {
        $('#themeLink').attr('href', '../lib/themes/css/' + name);
    };

    // TUTOR_TODO Chapter 10 - subscribe for context changes and call setTheme with either 'bootstrap-dark.min.css' or 'bootstrap.min.css'
};

const invokeAgMethod = (client) => {

    // TUTOR_TODO Chapter 2.2 - Invoke the 'SetParty' AGM method passing the client object for the party argument.

};

const openWindow = (windowName, myWin, direction) => {

    // TUTOR_TODO Chapter 4.2 - Add additional properties or modify the existing ones in the options object in order to open a portfolio window which:
    // is mode: 'flat', cannot be minimized, maximized, collapsed or closed, has minimum height 400 and minimum width 600
    // create a context object inside the options and pass your window's id 'glue.windows.my().id'

    // TUTOR_TODO Chapter 4.1 - create an options object and define mode, relativeTo and relativeDirection properties
    // Use the Windows API to open a window with the provided windowName, options object and correct URL

    // TUTOR_TODO Chapter 5 - Modify split the current options object into two separate objects - context and windowSettings
    // use the Application Management API to open a portfolio instance
};

const openTabWindow = (party) => {

    // TUTOR_TODO Chapter 4.3 - Implement the functionality to open and stack tab windows
    // Use the provided options object to create the tab
    // First check if there is a tab frame created already (maybe by checking if there is a window whose name contains 'PortfolioTabs'?)
    // If there aren't any tabs, add the relativeTo and relativeDirection keys to the object
    // Note: you only need those for the first tab - the one that creates the frame, subsequent tabs should not specify them.
    // Finally, create a window using the method you are already familiar with - glue.windows.open()

    // const options = {
    //     mode: 'tab',
    //     tabGroupId: 'MyTabGroupId',
    //     context: {
    //         party: party,
    //         winId: glue.windows.my().id,
    //     }
    // }

    // TUTOR_TODO Chapter 5 - Modify split the current options object into two separate objects - context and windowSettings
    // use the Application Management API to open a portfolio tab instance

};
