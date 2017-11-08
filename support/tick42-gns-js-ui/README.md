## tick42-gns-js-ui

### version 1.16.7

### Description
JS-based user interface for viewing and acting on GNS notifications

### Changelog

#### 1.16.7
* fix close main with glue instead of failed native call

#### 1.16.6
* fix toastPool loses frames due to logger call

#### 1.16.5
* fix glue.windows.open call to work with 3-beta-rc-11 
* fix maximize window control
* fix deprecated use of window.opened()

#### 1.16.4
* DPI fixes for new htmlContainer
* bug fix for "Close Toasts" button

#### 1.16.3
* Further fix for glue 3 for toasts
* Minor deprecation fixes

#### 1.16.2
* Update to use glue.js 3.0.0 beta 2
    * more complex way of initialising glue before starting the app

#### 1.16.1
* Dates in the JSON view of single notification
    * should be human-readable, not "$date$1437895961684"

#### 1.16.0
* Major refactoring for remote windows
    * move remotes to separate process
    * communicate via glue.js agm methods
* Add a small config panel, saving config settings to local storage

#### 1.15.1
* Bug fix pause/resume button

#### 1.15.0
* Switch to semantic versions
* Pause/Resume button in List View
* LogViewer button in List View
* Set 'isRead' using subscriber api call

#### 1.0.1.14
* Bug fix addEventListener when no actions

#### 1.0.1.13
* Major Design enhancements, and layout improvements
    * List View (colors, fonts, animations, more readable header)
    * Default Details View ((colors, fonts, animations, fixed header, tabbed content)
* List is paged instead of infinite scroll, for performance reasons
* Default View search tool
* Button to invoke Admin.GetServers
* Updated to glue.js 2.4.2

#### 1.0.1.12
* fix bug empty Category renders as required field
* escape user/notification data in toast, list view, default view and json dump

#### 1.0.1.11
* Support 'url' and 'binary' resources
* Display icons in default details view and toasts
* Fixes for receiving Date objects from DM
* Unit tests and some fixes for GnsValue parsing
* Improved Z-order for toasts

#### 1.0.1.10
* Toast window to maintain its Z-order
* Fixed GNS Value parsing
* Updated to glue.js 2.4.0

#### 1.0.1.9
* Main window set minWidth to prevent table breaking
* Remove blinking in toasts on toast close/shift
* Toasts title limit to 3 lines, add ellipsis if longer 

#### 1.0.1.8
* Styling improvements to main window and toasts
    * Moved buttons to top
    * Colors and fonts
    * Grid header simplified to one line
* Toast only expand if there are actions

#### 1.0.1.7
* Toast slide left on-hover to reveal short list of invokable actions
* Connection square uses events instead of 3 sec. polling
* Updated to glue.js 2.3.2

#### 1.0.1.6
* Checkbox enable/disable toasts
* Click on toast to close it and open details
* Click on collector toast to focus the UI main window

#### 1.0.1.5
* Toasts expire after about 5 sec.
* UI checks and indicates if some required fields are missing from a notification

#### 1.0.1.4
* Modified and enabled toasts

#### 1.0.1.3
* Added source and category streams
* GlueRouting is merged

#### 1.0.1.2
* Added snippets to demonstrate the use of utility functions
* Added $(macros) to parameters when invoking

#### 1.0.1.1
* Added a more detailed Readme.md
* Added snippets.html and associated scripts with sample uility code
* Configured datatables to use a smipler kind of infinite scroll

#### 1.0.1.0
* Added Connection square (red: no method/server, yellow: data not received yet, green: notifications received)
* Added Button to clear all notifications
* Fixed Context menu so that it opens where the user right clicks on a notification


### Existing issues/bugs
* formatting of the default details view needs to be more readable
    * more compact table-like layout with clear separation between key and value
    * routing methods should show 'empty' if no method
    * any 'Invoke' button should be 'disabled' if it's method is not published
* the button GetServers to invoke 'T42.GNS.Admin.GetServers' and display in a JSON window with 'refresh'
* prevent the scrollbar from jumping to the top on every notification

### Install->Run->Use
It is assumed this is run as part the github-based release of GLUE  
Follow the instructions in that package for installation and start-up  
The files reside in GlueSDK\js-demos and are served by the HttpServer in GlueSDK folder  

After starting the AppManager, if configured, the UI will appear as an icon titled 'GNS UI'  
Clicking on it opens an HC window, and loads index.html  

The UI will show a green connection square, if the DM is alive  
The notifications will be displayed as rows in the table in the middle  
Sorting is fixed by 'notificationTime' property  
Above some columns is a search tool (textbox or dropdown) for the corresponding property  
In the top-right is a search box which searches the entire notification object  
Double clicking on a row opens a notification by either its detailMethod (if it has one) or in the default detail view  
Right clicking on a row opens the context menu for a notification  

The default view is a pop-up which shows all the properties of a given notification  
In the default view if there are agm methods specified, an 'Invoke' button will invoke them  
At the bottom of default view, 'Get JSON' button opens a further pop-up for the json-string of the notification  
