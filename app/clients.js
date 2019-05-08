const RestServerUrl = 'http://localhost:22910/';
const RestServerEndpoint = 'Clients';
const MethodName = 'SetParty';


// TUTOR_TODO Chapter 1.2 Task 3
// Call the Glue factory function and pass in the `glueConfig` object, which is registered by `tick42-glue-config.js`
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

            const myWin = glue.windows.my();

            // TUTOR_TODO Chapter 4.1 Task 2
            // Call openWindow with a window name, current window instance and a direction.

        }
    }

    const setUpPortfolioFrameButton = () => {

        // TUTOR_TODO Chapter 4.4 Task 1
        // Use the windows API to create a new frame button.
        //
        // const buttonOptions = {
        //     buttonId: 'portfolio-btn',
        //     tooltip: 'Open a portfolio',
        //     order: 1,
        //     imageBase64: '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'
        // };

    };

    const setUpFrameButtonClick = () => {

        // TUTOR_TODO Chapter 4.4 Task 4
        // Use the windows API for handling frame button clicks to handle a frame button click, check the Id and open a portfolio window.
        // Pass the result of getWindowDirection as a second argument for openWindow

    };

    // TUTOR_TODO Chapter 11 Task 1
    // Check if you are in an activity and setup the frame buttons and events only if you are NOT
    setUpPortfolioFrameButton();
    setUpFrameButtonClick();
};

const setupClients = () => {

    const addRow = (table, client) => {
        const row = document.createElement('tr');
        addRowCell(row, client.name || '');
        addRowCell(row, client.pId || '');
        addRowCell(row, client.gId || '');
        addRowCell(row, client.accountManager || '');

        row.onclick = () => {

            // TUTOR_TODO Chapter 11 Task 2
            // Check if you are in an activity and either update the activity context or open a tab window and invoke the agm method

            const direction = getWindowDirection();

            // TUTOR_TODO Chapter 4.4 Task 3
            // Pass the result of getWindowDirection as a second argument for openTabWindow

            openTabWindow(client, 'right');
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

        // TUTOR_TODO chapter 4.2 Task 3
        // Start the loader here.

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
                console.error('Request failed: ' + textStatus);
            })
            .always(() => {
                // TUTOR_TODO chapter 4.2 Task 4
                // Stop the loader here.
            });
    }

    getClients(5, handleClients);
};

const registerGlueMethods = () => {

    // TUTOR_TODO Chapter 7
    // Register an Interop method "g42.FindWhoToCall", the handler should open the 'symbolPopup.html' window.

};

const trackTheme = () => {

    const setTheme = (name) => {
        $('#themeLink').attr('href', '../lib/themes/css/' + name);
    };

    // TUTOR_TODO Chapter 10 task 1
    // Subscribe for context changes and call setTheme with either 'bootstrap-dark.min.css' or 'bootstrap.min.css'
};

const invokeAgMethod = (client) => {

    // TUTOR_TODO Chapter 2.2
    // Invoke the 'SetParty' Interop method passing the client object for the party argument.

};

const getWindowDirection = () => {

    // TUTOR_TODO Chapter 4.4 Task 2
    // Get the primary monitor;
    // Get the bottom neightbours;
    // Get the working area height;
    // Calculate the window bottom;
    // Pass 'bottom' if there is enough space for a portfolio window, else pass right.

}

const openWindow = (windowName, myWin, direction) => {

    // TUTOR_TODO Chapter 4.2 Task 1
    // Add additional properties or modify the existing ones in the options object in order to open a portfolio window which:
    // is mode: 'flat', cannot be minimized, maximized, collapsed or closed, has minimum height 400 and minimum width 600
    // create a context object inside the options and pass your window's id 'glue.windows.my().id'

    // TUTOR_TODO Chapter 4.1 Task 3
    // Create an options object and define mode, relativeTo and relativeDirection properties
    // Use the Windows API to open a window with the provided windowName, options object and correct URL

    // TUTOR_TODO Chapter 5 Task 1
    // Modify split the current options object into two separate objects - context and windowSettings;
    // Use the Application Management API to open a portfolio instance.
};

const openTabWindow = (party, direction) => {

    // TUTOR_TODO Chapter 4.3 Task 1
    // Implement the functionality to open and stack tab windows;
    // Use the provided options object to create the tab;
    // First check if there is a tab frame created already (maybe by checking if there is a window whose name contains 'PortfolioTabs'?);
    // If there aren't any tabs, add the relativeTo and relativeDirection keys to the object.
    // Note: you only need those for the first tab - the one that creates the frame, subsequent tabs should not specify them.
    // Finally, create a window using the method you are already familiar with - glue.windows.open(). But don't forget to check if the client's portfolio is already opened.
    // If that is the case you should activate() the tab.

    // const options = {
    //     mode: 'tab',
    //     tabGroupId: 'MyTabGroupId',
    //     context: {
    //         party: party,
    //         winId: glue.windows.my().id,
    //     }
    // }

    // TUTOR_TODO Chapter 5 Task 2
    // Modify split the current options object into two separate objects - context and windowSettings;
    // Use the Application Management API to open a portfolio tab instance;
    // Note that using the Application Management API your window gets a default name, so you can't reuse the filter condition to check for open tabs so you need to get creative. What else is unique to the tabs that we can filter on?

};
