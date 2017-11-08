(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("tick42-glue", [], factory);
	else if(typeof exports === 'object')
		exports["tick42-glue"] = factory();
	else
		root["tick42-glue"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 31);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// some small useful functions (so we don't reference underscore or lodash)
Object.defineProperty(exports, "__esModule", { value: true });
function isNumber(arg) {
    return typeof arg === 'number';
}
exports.isNumber = isNumber;
function isString(arg) {
    return typeof arg === 'string';
}
exports.isString = isString;
function isObject(arg) {
    return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;
function isArray(arg) {
    // TODO optimize
    if (Array.isArray) {
        return Array.isArray(arg);
    }
    return toString.call(arg) === '[object Array]';
}
exports.isArray = isArray;
function isUndefined(arg) {
    return typeof arg === 'undefined';
}
exports.isUndefined = isUndefined;
function isUndefinedOrNull(arg) {
    return !arg || typeof arg === 'undefined';
}
exports.isUndefinedOrNull = isUndefinedOrNull;
/** Checks if an object is empty (has no properties)
 * @private
 **/
function isEmpty(arg) {
    for (var prop in arg) {
        if (arg.hasOwnProperty(prop))
            return false;
    }
    return true;
}
exports.isEmpty = isEmpty;
function isFunction(arg) {
    return !!(arg && arg.constructor && arg.call && arg.apply);
}
exports.isFunction = isFunction;
;
function some(array, predicate) {
    for (var index = 0; index < array.length; index++) {
        if (predicate(array[index], index)) {
            return true;
        }
    }
    return false;
}
exports.some = some;
function first(array, predicate) {
    for (var index = 0; index < array.length; index++) {
        if (predicate(array[index], index)) {
            return array[index];
        }
    }
    return undefined;
}
exports.first = first;
//# sourceMappingURL=util.js.map

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var util = __webpack_require__(0);
var LogLevel = /** @class */ (function () {
    function LogLevel() {
    }
    LogLevel.Trace = "trace";
    LogLevel.Debug = "debug";
    LogLevel.Info = "info";
    LogLevel.Warn = "warn";
    LogLevel.Error = "error";
    return LogLevel;
}());
exports.LogLevel = LogLevel;
var Logger = /** @class */ (function () {
    function Logger(name) {
        this._name = name;
        // we have a glue logger let's create a new logger for it
        if (!util.isUndefinedOrNull(Logger.GlueLogger)) {
            this._glueLogger = Logger.GlueLogger.subLogger(name);
        }
    }
    Logger.GetNamed = function (name) {
        return new Logger(name);
    };
    Logger.Get = function (owner) {
        return new Logger(Logger.GetTypeName(owner));
    };
    Logger.prototype.trace = function (message) {
        if (!util.isUndefinedOrNull(this._glueLogger)) {
            this._glueLogger.trace(message);
        }
        else {
            if (Logger.Level === LogLevel.Trace) {
                console.info(this._getMessage(message, LogLevel.Trace));
            }
        }
    };
    Logger.prototype.debug = function (message) {
        if (!util.isUndefinedOrNull(this._glueLogger)) {
            this._glueLogger.debug(message);
        }
        else {
            if (Logger.Level === LogLevel.Debug ||
                Logger.Level === LogLevel.Trace) {
                console.info(this._getMessage(message, LogLevel.Debug));
            }
        }
    };
    Logger.prototype.info = function (message) {
        if (!util.isUndefinedOrNull(this._glueLogger)) {
            this._glueLogger.info(message);
        }
        else {
            if (Logger.Level === LogLevel.Debug ||
                Logger.Level === LogLevel.Trace ||
                Logger.Level === LogLevel.Info) {
                console.info(this._getMessage(message, LogLevel.Info));
            }
        }
    };
    Logger.prototype.warn = function (message) {
        if (!util.isUndefinedOrNull(this._glueLogger)) {
            this._glueLogger.warn(message);
        }
        else {
            if (Logger.Level === LogLevel.Debug ||
                Logger.Level === LogLevel.Trace ||
                Logger.Level === LogLevel.Info ||
                Logger.Level === LogLevel.Warn) {
                console.info(this._getMessage(message, LogLevel.Info));
            }
        }
    };
    Logger.prototype.error = function (message) {
        if (!util.isUndefinedOrNull(this._glueLogger)) {
            this._glueLogger.error(message);
        }
        else {
            console.error(this._getMessage(message, LogLevel.Error));
            console.trace();
        }
    };
    Logger.prototype._getMessage = function (message, level) {
        return "[" + level + "] " + this._name + " - " + message;
    };
    /**
     * Returns the function name for a given object (same as constructor.name but cross-browser)
     */
    Logger.GetTypeName = function (object) {
        var funcNameRegex = /function (.{1,})\(/;
        var results = (funcNameRegex).exec(object.constructor.toString());
        return (results && results.length > 1) ? results[1] : "";
    };
    Logger.Level = LogLevel.Info;
    return Logger;
}());
exports.Logger = Logger;
//# sourceMappingURL=logger.js.map

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var EntityEvent = /** @class */ (function () {
    function EntityEvent(entitiy, context) {
        this.entity = entitiy;
        this.context = context;
    }
    return EntityEvent;
}());
exports.EntityEvent = EntityEvent;
var EntityEventContext = /** @class */ (function () {
    function EntityEventContext(eventType) {
        this.type = eventType;
    }
    return EntityEventContext;
}());
exports.EntityEventContext = EntityEventContext;
var EntityStatusChangeEventContext = /** @class */ (function (_super) {
    __extends(EntityStatusChangeEventContext, _super);
    function EntityStatusChangeEventContext(newStatus, oldStatus) {
        var _this = _super.call(this, EntityEventType.StatusChange) || this;
        _this.newStatus = newStatus;
        _this.oldStatus = oldStatus;
        return _this;
    }
    return EntityStatusChangeEventContext;
}(EntityEventContext));
exports.EntityStatusChangeEventContext = EntityStatusChangeEventContext;
var EntityActivityWindowEventContext = /** @class */ (function (_super) {
    __extends(EntityActivityWindowEventContext, _super);
    function EntityActivityWindowEventContext(activity, event) {
        var _this = _super.call(this, EntityEventType.ActivityWindowEvent) || this;
        _this.activity = activity;
        _this.event = event;
        return _this;
    }
    return EntityActivityWindowEventContext;
}(EntityEventContext));
exports.EntityActivityWindowEventContext = EntityActivityWindowEventContext;
var ActivityContextChangedContext = /** @class */ (function (_super) {
    __extends(ActivityContextChangedContext, _super);
    function ActivityContextChangedContext(context, updated, removed) {
        var _this = _super.call(this, EntityEventType.ActivityContextChange) || this;
        _this.updated = updated;
        _this.removed = removed;
        _this.context = JSON.parse(context);
        return _this;
    }
    return ActivityContextChangedContext;
}(EntityEventContext));
exports.ActivityContextChangedContext = ActivityContextChangedContext;
var EntityEventType = /** @class */ (function () {
    function EntityEventType() {
    }
    EntityEventType.Added = "added";
    EntityEventType.Removed = "removed";
    EntityEventType.Closed = "closed";
    EntityEventType.Updated = "updated";
    EntityEventType.FactoryRegistered = "factoryRegistered";
    EntityEventType.FactoryUnregistered = "factoryUnregistered";
    EntityEventType.StatusChange = "statusChange";
    EntityEventType.ActivityContextChange = "activityContextUpdate";
    EntityEventType.ActivityWindowEvent = "activityWindowEvent";
    return EntityEventType;
}());
exports.EntityEventType = EntityEventType;
//# sourceMappingURL=entityEvent.js.map

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Base class for activity entities with reference to the activity manager
 * @private
 */
var ActivityEntity = /** @class */ (function () {
    function ActivityEntity(id) {
        this._id = id;
    }
    Object.defineProperty(ActivityEntity.prototype, "id", {
        get: function () {
            return this._id;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Updates the properties of the current object using the properties of another object
     * These two should have the same id.
     */
    ActivityEntity.prototype._update = function (other) {
        if (other._id != this._id) {
            throw Error("Can not update from entity with different id.");
        }
        this._updateCore(other);
    };
    ActivityEntity.prototype._updateCore = function (other) {
    };
    ActivityEntity.prototype._beforeDelete = function (other) {
    };
    return ActivityEntity;
}());
exports.default = ActivityEntity;
//# sourceMappingURL=activityEntity.js.map

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var util = __webpack_require__(0);
// A helper class that provides lame activity AGM implementation
// Can be initialized with or without activity - in case no activity (independent windows outside activity) only
// subset of the methods work
var ActivityAGM = /** @class */ (function () {
    function ActivityAGM(activity) {
        this._activity = activity;
    }
    ActivityAGM.prototype.register = function (definition, handler) {
        this._ensureHasAgm();
        ActivityAGM.AGM.register(definition, handler);
    };
    ActivityAGM.prototype.servers = function () {
        this._ensureHasAgm();
        if (util.isUndefinedOrNull(this._activity)) {
            // or return ActivityAGM.AGM.servers()
            return [];
        }
        return this._activity.windows.map(function (w) {
            return w.instance;
        });
    };
    ActivityAGM.prototype.methods = function () {
        this._ensureHasAgm();
        if (util.isUndefinedOrNull(this._activity)) {
            // or return ActivityAGM.AGM.methods()
            return [];
        }
        var windows = this._activity.windows;
        var methodNames = [];
        var methods = [];
        // get all windows and their methods, then assemble distinct methods
        for (var index = 0; index < windows.length; index++) {
            var window_1 = windows[index];
            var windowMethods = this.methodsForWindow(window_1);
            for (var methodIndex = 0; methodIndex < windowMethods.length; methodIndex++) {
                var currentWindowMethod = windowMethods[methodIndex];
                if (methodNames.indexOf(currentWindowMethod.name) === -1) {
                    methodNames.push(currentWindowMethod.name);
                    methods.push(currentWindowMethod);
                }
            }
        }
        return methods;
    };
    ActivityAGM.prototype.methodsForWindow = function (window) {
        this._ensureHasAgm();
        // get instance and use agm to get methods for instance
        if (!window.instance) {
            return [];
        }
        return ActivityAGM.AGM.methodsForInstance(window.instance);
    };
    /** Possible invoke targets
     *
     * "activity.all" - [default]
     * "activity.best"
     * ActivityWindow
     * [ActivityWindow] -
     *
     * classic AGM
     * "all" - agm all
     * "best" - agm best
     * instance - agm
     * [ instances ]
     *
     * **/
    ActivityAGM.prototype.invoke = function (methodName, arg, target, options, success, error) {
        this._ensureHasAgm();
        var activityServers = this.servers();
        var serversToInvokeAgainst = [];
        if (util.isUndefinedOrNull(target)) {
            target = "activity.all";
        }
        if (util.isString(target)) {
            if (target === "activity.all") {
                serversToInvokeAgainst = activityServers;
            }
            else if (target === "activity.best") {
                var potentialTargets = activityServers.filter(function (server) {
                    var methods = ActivityAGM.AGM.methodsForInstance(server);
                    return methods.filter(function (m) {
                        return m.name === methodName;
                    }).length > 0;
                });
                if (potentialTargets.length > 0) {
                    serversToInvokeAgainst = [potentialTargets[0]];
                }
            }
            else if (target === "all" || target === "best") {
                return ActivityAGM.AGM.invoke(methodName, arg, target, options, success, error);
            }
            else {
                throw new Error("Invalid invoke target " + target);
            }
        }
        else if (util.isArray(target)) {
            // if the array is not empty
            if (target.length >= 0) {
                var firstElem = target[0];
                // check argument type
                if (this._isAgmInstance(firstElem)) {
                    serversToInvokeAgainst = target.map(function (instance) { return instance; });
                }
                else if (this._isActivityWindow(firstElem)) {
                    serversToInvokeAgainst = target.map(function (win) { return win.instance; });
                }
                else {
                    throw new Error("Unknown target object");
                }
            }
        }
        else {
            if (this._isAgmInstance(target)) {
                serversToInvokeAgainst = [target];
            }
            else if (this._isActivityWindow(target)) {
                serversToInvokeAgainst = [target.instance];
            }
            else {
                throw new Error("Unknown target object");
            }
        }
        return ActivityAGM.AGM.invoke(methodName, arg, serversToInvokeAgainst, options, success, error);
    };
    ActivityAGM.prototype.unregister = function (definition) {
        this._ensureHasAgm();
        return ActivityAGM.AGM.unregister(definition);
    };
    ActivityAGM.prototype.createStream = function (methodDefinition, subscriberAddedHandler, subscriberRemovedFunction) {
        this._ensureHasAgm();
        ActivityAGM.AGM.createStream(methodDefinition, subscriberAddedHandler, subscriberRemovedFunction);
    };
    ActivityAGM.prototype.subscribe = function (methodDefinition, parameters, target) {
        this._ensureHasAgm();
        var servers = this.servers();
        return ActivityAGM.AGM.subscribe(methodDefinition, parameters, servers);
    };
    ActivityAGM.prototype._ensureHasAgm = function () {
        if (util.isUndefinedOrNull(ActivityAGM.AGM)) {
            throw new Error("Agm should be configured to be used in activity");
        }
    };
    ActivityAGM.prototype._isAgmInstance = function (obj) {
        // lame check
        return obj.application != undefined;
    };
    ActivityAGM.prototype._isActivityWindow = function (obj) {
        return obj.instance !== undefined;
    };
    return ActivityAGM;
}());
exports.ActivityAGM = ActivityAGM;
//# sourceMappingURL=activityAGM.js.map

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var util = __webpack_require__(0);
var nextTick = function (cb) { setTimeout(cb, 0); };
/**
 * Convert a Promise to node style callback
 * @private
 */
function nodeify(promise, callback) {
    if (!util.isFunction(callback)) {
        return promise;
    }
    promise.then(function (resp) {
        nextTick(function () {
            callback(null, resp);
        });
    }, function (err) {
        nextTick(function () {
            callback(err, null);
        });
    });
}
exports.nodeify = nodeify;
;
//# sourceMappingURL=promiseExtensions.js.map

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var activityEntity_1 = __webpack_require__(3);
/**
 * An activity type is a definition template for an activity, consisting of a collection of window types,
 * their layout and an initial activity context.
 *
 * @module activityType
 */
var ActivityType = /** @class */ (function (_super) {
    __extends(ActivityType, _super);
    function ActivityType(name, ownerWindow, helperWindows, description) {
        var _this = _super.call(this, name) || this;
        _this._name = name;
        _this._description = description;
        _this._ownerWindow = ownerWindow;
        _this._helperWindows = helperWindows || [];
        return _this;
    }
    Object.defineProperty(ActivityType.prototype, "name", {
        /**
         * @var {string} name Name of the activity type
         */
        get: function () {
            return this._name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ActivityType.prototype, "description", {
        /**
         * @var {string} description description for the activity type
         */
        get: function () {
            return this._description;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ActivityType.prototype, "helperWindows", {
        /**
         * A list of window types that should be created when initiating a new instance of that activity type
         * @var {windowDefinition[]} helperWindows
         */
        get: function () {
            return this._helperWindows;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ActivityType.prototype, "ownerWindow", {
        /**
         * @var {windowDefinition} ownerWindow Returns the definition of the owner window for that activity type
         */
        get: function () {
            return this._ownerWindow;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Initiates a new activity of this type
     *
     * @function initiate
     * @param {object} context The initial context to be used for the new activity
     * @returns {Promise<activity>}
     */
    ActivityType.prototype.initiate = function (context, callback) {
        return this._manager.initiate(this._name, context, callback);
    };
    ActivityType.prototype._updateCore = function (type) {
        _super.prototype._updateCore.call(this, type);
        this._description = type._description;
        this._ownerWindow = type._ownerWindow;
        this._helperWindows = type._helperWindows;
    };
    return ActivityType;
}(activityEntity_1.default));
exports.default = ActivityType;
//# sourceMappingURL=activityType.js.map

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var logger_1 = __webpack_require__(1);
var util = __webpack_require__(0);
/**
 * Class that can be used as a marker for successful completion of a set of events
 * @private
 * @module readyMarker
 */
var ReadyMarker = /** @class */ (function () {
    /**
     * Creates new marker
     * @param name Name of the marker, useful in logging
       * @param signalsToWait Number of signals(events) that needs to be signaled (completed) before the marker is set as completed
     */
    function ReadyMarker(name, signalsToWait) {
        this._logger = logger_1.Logger.GetNamed("ReadyMarker [" + name + "]");
        this._logger.debug("Initializing ready marker for '" + name + "' with " + signalsToWait + " signals to wait");
        if (signalsToWait <= 0) {
            throw new Error("Invalid signal number. Should be > 0");
        }
        this._signals = signalsToWait;
        this._callbacks = [];
        this._name = name;
    }
    /**
     * Adds a new callback that will be notified when the events are completed (success) or some error happened
     */
    ReadyMarker.prototype.setCallback = function (callback) {
        if (this.isSet()) {
            callback(undefined);
            return;
        }
        else if (this.isError()) {
            callback(this._error);
            return;
        }
        this._callbacks.push(callback);
    };
    /**
     * Signals for a completion of an event. If this is the last event success callbacks will be called
     */
    ReadyMarker.prototype.signal = function (message) {
        this._logger.debug("Signaled - " + message + " - signals left " + (this._signals - 1));
        this._signals--;
        if (this._signals < 0) {
            throw new Error("Error in ready marker '" + this._name + " - signals are " + this._signals);
        }
        if (this.isSet()) {
            this._callbacks.forEach(function (callback) {
                callback(undefined);
            });
        }
    };
    /**
     * Signals for an error in some of the events. This will notify all callbacks that the marker has failed
     */
    ReadyMarker.prototype.error = function (error) {
        this._error = error;
        this._callbacks.forEach(function (errorCallback) {
            errorCallback(error);
        });
    };
    /**
     * Checks if the marker is set (completed)
     */
    ReadyMarker.prototype.isSet = function () {
        if (this.isError()) {
            return false;
        }
        return this._signals === 0;
    };
    /**
     * Checks if the marker has failed (some of the events has failed)
     */
    ReadyMarker.prototype.isError = function () {
        return !util.isUndefined(this._error);
    };
    /**
     * Returns the last reported error (undefined if no error)
     */
    ReadyMarker.prototype.getError = function () {
        return this._error;
    };
    return ReadyMarker;
}());
exports.ReadyMarker = ReadyMarker;
//# sourceMappingURL=readyMarker.js.map

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tick42_glue_core_1 = __webpack_require__(28);
var tick42_windows_1 = __webpack_require__(32);
var tick42_layouts_1 = __webpack_require__(29);
var tick42_app_manager_1 = __webpack_require__(26);
var activity = __webpack_require__(15);
var contexts = __webpack_require__(27);
var pjson = __webpack_require__(10);
var config_1 = __webpack_require__(30);
exports.default = function (options) {
    // get config object
    // basically selecting some properties (and defaulting them)
    // it's used to extract things like layouts, appManager, activities etc things
    // that glueCore itself doesn't know about
    options = options || {};
    var glueConfig = config_1.default(options);
    // Init the GLUE namespace
    var hc = typeof window !== "undefined" && window.htmlContainer;
    var _appManager;
    var _activity;
    var _contexts;
    var _windows;
    // dependency graph:
    //   contexts: nothing
    //   windows: agm
    //   activities: contexts, agm, logger, windows, appManager (via getter)
    //   appManager: agm, windows, logger, activities
    //   layouts: agm, appManager, logger
    function createWindows(core) {
        if (glueConfig.windows) {
            var windowsLogger = getLibLogger("windows", core.logger, glueConfig.windows);
            _windows = tick42_windows_1.default(core.agm, windowsLogger);
            debugLog(_windows);
            return _windows;
        }
    }
    function createActivities(core) {
        if (glueConfig.activities) {
            if ((hc && hc.activityFacade) ||
                (activity.checkIsUsingGW3Implementation && activity.checkIsUsingGW3Implementation(core.connection))) {
                var activityLogger = getLibLogger("activity", core.logger, glueConfig.activities);
                _activity = activity({
                    connection: core.connection,
                    contexts: _contexts,
                    agm: core.agm,
                    logger: activityLogger,
                    windows: _windows,
                    appManagerGetter: function () {
                        return _appManager;
                    },
                    mode: glueConfig.activities.mode,
                    typesToTrack: glueConfig.activities.typesToTrack,
                });
                debugLog(_activity);
                return _activity;
            }
        }
    }
    function createAppManager(core) {
        if (!glueConfig.appManager) {
            return;
        }
        var logger = getLibLogger("appManager", core.logger, glueConfig.appManager);
        // AppManager v3
        _appManager = tick42_app_manager_1.default({
            agm: core.agm,
            windows: _windows,
            logger: logger,
            activities: _activity,
            mode: glueConfig.appManager.mode
        });
        debugLog(_appManager);
        return _appManager;
    }
    function createContexts(core) {
        if (glueConfig.contexts ||
            // NB: GW3 activity uses tick42-contexts
            (glueConfig.activities &&
                activity.checkIsUsingGW3Implementation &&
                activity.checkIsUsingGW3Implementation(core.connection))) {
            var logger = getLibLogger("contexts", core.logger, glueConfig.contexts);
            _contexts = contexts({
                connection: core.connection,
                logger: logger
            });
            debugLog(_contexts);
            return _contexts;
            // NB: The shared contexts data is part of the global domain,
            // which is joined implicitly and there is no 'Success' message
            // to indicate that the initial state has arrived.
            // We're relying on the fact that none of the other Glue libs
            // rely on the shared contexts' state, and that the 'contexts'
            // lib is created first so any other domain's success message
            // will arrive after our state, so the contexts will be visible
            // when the Glue promise resolves.
        }
    }
    function createLayouts(core) {
        if (!glueConfig.layouts) {
            return;
        }
        var logger = getLibLogger("layouts", core.logger, glueConfig.layouts);
        var lay = tick42_layouts_1.default({
            agm: core.agm,
            appManager: _appManager,
            logger: logger,
            mode: glueConfig.layouts.mode,
        });
        debugLog(lay);
        return lay;
    }
    function getLibLogger(loggerName, logger, config) {
        var newLogger = logger.subLogger(loggerName);
        if (config && config.logger) {
            var loggerConfig = config.logger;
            if (loggerConfig.console) {
                newLogger.consoleLevel(loggerConfig.console);
            }
            if (loggerConfig.publish) {
                newLogger.publishLevel(loggerConfig.publish);
            }
            if (loggerConfig.metrics) {
                newLogger.metricsLevel(loggerConfig.metrics);
            }
        }
        return newLogger;
    }
    var ext = {
        // define extra libraries for glue-core to raise
        libs: [
            { name: "contexts", create: createContexts },
            { name: "windows", create: createWindows },
            { name: "activities", create: createActivities },
            { name: "appManager", create: createAppManager },
            { name: "layouts", create: createLayouts },
        ],
        version: pjson.version,
        enrichGlue: function (glue) {
            // put some data to config
            glue.config.contexts = glueConfig.contexts;
            glue.config.activities = glueConfig.activities;
            glue.config.windows = glueConfig.windows;
            glue.config.appManager = glueConfig.appManager;
            glue.config.layouts = glueConfig.layouts;
        },
    };
    var currentLog = [];
    if (typeof window !== "undefined") {
        if (!window.glueFactoryLog) {
            window.glueFactoryLog = [];
        }
        window.glueFactoryLog.push(currentLog);
    }
    function debugLog(entry) {
        currentLog.push(entry);
    }
    return tick42_glue_core_1.default(options, ext);
};
//# sourceMappingURL=glue.js.map

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = {"_from":"tick42-activity@2.12.8","_id":"tick42-activity@2.12.8","_inBundle":false,"_integrity":"sha1-NiJehGg2u7GJ8cEisGa9jI40Am4=","_location":"/tick42-activity","_phantomChildren":{},"_requested":{"type":"version","registry":true,"raw":"tick42-activity@2.12.8","name":"tick42-activity","escapedName":"tick42-activity","rawSpec":"2.12.8","saveSpec":null,"fetchSpec":"2.12.8"},"_requiredBy":["/"],"_resolved":"http://repo.tick42.com:8081/artifactory/api/npm/tick42-npm/tick42-activity/-/tick42-activity-2.12.8.tgz","_shasum":"36225e846836bbb189f1c122b066bd8c8e34026e","_spec":"tick42-activity@2.12.8","_where":"D:\\source\\glue-dev\\js-glue","author":{"name":"Tick42","url":"http://www.tick42.com"},"bin":{"build":"./bin/build.js","clean":"./bin/clean.js","file-versionify":"./bin/file-versionify.js","minify":"./bin/minify.js"},"bugs":{"url":"https://jira.tick42.com/browse/APPCTRL"},"bundleDependencies":false,"deprecated":false,"description":"Tick42 Activities","devDependencies":{"blanket":"^1.1.6","browserify":"^13.0.0","browserify-replacify":"^0.0.4","browserify-versionify":"^1.0.4","docdash":"^0.4.0","jsdom":"^8.1.0","jshint":"^2.9.5","minifyify":"^7.3.2","onchange":"^2.1.2","phantomjs":"^1.9.12","pre-commit":"^1.1.3","qunitjs":"^1.15.0","shelljs":"^0.6.0","tsd":"^0.6.4","tslint":"^2.5.1","typescript":"^2.5.3","uglifyify":"^3.0.1"},"docName":"Activities","keywords":["javascript","library"],"main":"library_js/activityModule.js","name":"tick42-activity","precommit":"lint","repository":{"url":"https://stash.tick42.com/scm/tact/js-actvitiy.git"},"scripts":{"build":"npm run compile:ts & node bin/clean.js & node bin/build.js & node bin/minify & node bin/file-versionify","compile:ts":"tsc --project ./library/","generate-docs":"npm run build && jsdoc -c jsdoc-config.json","lint":"jshint library","prepublish":"npm update & npm run build","test":"npm run lint & mocha --require ./test/test_helper \"test/**/*.js\"","watch":"onchange \"./library/*.ts\" -iv -e \"./bin\" -- npm run build","watch:ts":"tsc -w --project ./library/"},"title":"Activities","types":"./types/index.d.ts","version":"2.12.8"}

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = {"name":"tick42-glue","version":"3.8.5","description":"Tick42 GLUE","main":"./dist/node/tick42-glue.js","browser":"./dist/web/tick42-glue.js","types":"./types/index.d.ts","docName":"Glue","scripts":{"init-dev-mode":"node ./build/scripts/init-dev-mode.js","remove-installed-dependencies":"node ./build/scripts/remove-installed-dependencies.js","clean":"node ./build/scripts/clean.js","file-versionify":"node ./build/scripts/file-versionify.js","pre:build":"npm run tslint && tsc && set NODE_ENV=development && npm run clean","tslint":"tslint -t codeFrame ./src/**.ts","tslint:fix":"tslint -t codeFrame --fix ./src/**.ts","watch":"onchange ./src/**/*.ts -- npm run build:dev","build:dev":"npm run pre:build && set NODE_ENV=development && webpack && npm run file-versionify && npm run types","build:prod":"npm run pre:build && set NODE_ENV=development && webpack && set NODE_ENV=production && webpack && npm run file-versionify  && npm run types","docs":"typedoc --options typedoc.json ./src","types":"node ./build/scripts/copy-types.js","prepublish":"npm run build:prod","test":"npm run build:dev && mocha ./tests","test:only":"mocha ./tests","generate-docs":"tick42-reference-docs -p g4e -m tick42-agm,tick42-windows,tick42-app-manager,tick42-activity,tick42-layouts,tick42-metrics,tick42-contexts,tick42-logger,tick42-gateway-connection"},"repository":{"type":"git","url":"https://stash.tick42.com:8443/scm/ofgw/js-glue.git"},"author":{"name":"Tick42","url":"http://www.glue42.com"},"license":"ISC","dependencies":{"callback-registry":"^2.3.1","tick42-activity":"2.12.8","tick42-app-manager":"3.6.10","tick42-contexts":"0.0.13","tick42-glue-core":"3.5.14","tick42-layouts":"1.7.12","tick42-windows":"3.4.4"},"devDependencies":{"@types/tick42-logger":"^3.0.6","chai":"^4.1.0","es6-promise":"^4.1.1","glue-docs-reference-generator":"*","mocha":"^2.4.5","onchange":"3.*","pre-commit":"^1.1.3","readline-sync":"^1.4.5","shelljs":"^0.6.0","tick42-gateway":"^0.2.2","tick42-webpack-config":"4.1.6","tslint":"^5.5.0","typedoc":"^0.9.0","typescript":"^2.5.3","webpack":"2.3.3"}}

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var promiseExtensions_1 = __webpack_require__(5);
var activityManagementAPI_1 = __webpack_require__(12);
var activityAGM_1 = __webpack_require__(4);
var PackageJson = __webpack_require__(9);
/**
 * The entry points of activities API - accessible from glue.activities
 *
 * @module activities
 */
var ActivityAPI = /** @class */ (function () {
    function ActivityAPI(manager, my) {
        /**
         * The version of the Activity API
         * @var version
         **/
        this.version = PackageJson.version;
        this.__mgr = manager;
        this._my = my;
        this.all = new activityManagementAPI_1.ActivityManagementAPI(manager, my);
    }
    /**
     * The entry point for your activity code.
     *
     * @function ready
     * @returns {Promise<module:activities>} A promise for activity API
     **/
    ActivityAPI.prototype.ready = function (callback) {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            _this.__mgr.ready()
                .then(function () {
                resolve(_this);
            })
                .catch(function (err) {
                reject(err);
            });
        });
        return promiseExtensions_1.nodeify(promise, callback);
    };
    Object.defineProperty(ActivityAPI.prototype, "my", {
        /**
         * A lightweight, single activity oriented subset of the API which should be used by most activity applications
         *
         * @var {module:my} my
         */
        get: function () {
            return this._my;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ActivityAPI.prototype, "aware", {
        /**
         * True if the current window is activity aware - meaning that the window has been created as
         * an activity participant - either a helper or an independent window.
         * Check this after the API is ready.
         *
         * @var {bool} aware
         */
        get: function () {
            return this._my.window !== undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ActivityAPI.prototype, "inActivity", {
        /**
         * Returns true if the current window is activity aware and is currently participating in activity
         *
         * @var {bool} inActivity
         **/
        get: function () {
            return this.aware && this._my.activity !== undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ActivityAPI.prototype, "agm", {
        /**
         * Defines an Activity-specific version of the AGM API which:
         * * restricts method registrations to activity-only windows
         * * restricts method discovery and invocation to activity-only methods, unless you explicitly specify otherwise
         * Other than that, the API is pretty much the same.
         *
         * @var  {module:activityAGM} agm
         */
        get: function () {
            if (!this.aware) {
                // no agm if not activity aware
                return undefined;
            }
            if (!this.inActivity) {
                // if we're not in activity no
                return new activityAGM_1.ActivityAGM(null);
            }
            return this._my.activity.agm;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Returns a list of frame colors that can be used as activity frame colors
     *
     * @returns {string[]}
     */
    ActivityAPI.prototype.getAvailableFrameColors = function () {
        var frameColors;
        var hc = window.htmlContainer;
        if (hc) {
            frameColors = hc.getFrameColors();
        }
        frameColors = frameColors || [];
        return frameColors;
    };
    return ActivityAPI;
}());
exports.ActivityAPI = ActivityAPI;
//# sourceMappingURL=activityAPI.js.map

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var util = __webpack_require__(0);
var ActivityManagementAPI = /** @class */ (function () {
    function ActivityManagementAPI(manager, my) {
        this._m = manager;
        this._my = my;
        this.activityTypes = {
            get: this._getActivityTypesWrapper.bind(this),
            register: this._m.registerActivityType.bind(this._m),
            unregister: this._m.unregisterActivityType.bind(this._m),
            subscribe: this._m.subscribeActivityTypeEvents.bind(this._m),
            unsubscribe: undefined,
            initiate: this._m.initiate.bind(this._m)
        };
        this.windowTypes = {
            get: this._getWindowTypesWrapper.bind(this),
            registerFactory: this._m.registerWindowFactory.bind(this._m),
            unregisterFactory: this._m.unregisterWindowFactory.bind(this._m),
            subscribe: this._m.subscribeWindowTypeEvents.bind(this._m),
            unsubscribe: undefined
        };
        this.windows = {
            get: this._m.getWindows.bind(this._m),
            subscribe: this._m.subscribeWindowEvents.bind(this._m),
            announce: this._m.announceWindow.bind(this._m),
            unsubscribe: undefined,
            create: this._m.createWindow.bind(this._m)
        };
        this.instances = {
            get: this._m.getActivities.bind(this._m),
            subscribe: this._m.subscribeActivityEvents.bind(this._m),
            unsubscribe: undefined
        };
    }
    ActivityManagementAPI.prototype._getActivityTypesWrapper = function (name) {
        if (util.isUndefined(name)) {
            return this._m.getActivityTypes();
        }
        return this._m.getActivityType(name);
    };
    ActivityManagementAPI.prototype._getWindowTypesWrapper = function (name) {
        if (util.isUndefined(name)) {
            return this._m.getWindowTypes();
        }
        return this._m.getWindowType(name);
    };
    ActivityManagementAPI.prototype.onAttached = function (callback) {
        this._m.subscribeActivitiesAttached(callback);
    };
    ActivityManagementAPI.prototype.onDetached = function (callback) {
        this._m.subscribeActivitiesDetached(callback);
    };
    ActivityManagementAPI.prototype.onActivityFrameColorChanged = function (callback) {
        this._m.subscribeActivityFrameColorChanged(callback);
    };
    return ActivityManagementAPI;
}());
exports.ActivityManagementAPI = ActivityManagementAPI;
//# sourceMappingURL=activityManagementAPI.js.map

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var logger_1 = __webpack_require__(1);
var util = __webpack_require__(0);
/**
 * A lightweight, single activity oriented subset of the API which should be used by most activity applications.
 * Provides access to the activity of your application (my.activity) and shortcuts to the most commonly used methods
 * (e.g. my.createWindow is a shortcut for my.activity.createWindow)
 *
 * @module my
 * */
var ActivityMy = /** @class */ (function () {
    function ActivityMy(manager, windows) {
        var _this = this;
        this._myAttached = [];
        this._myDetached = [];
        this._myAttachedTo = [];
        this._myDetachedFrom = [];
        this._myActivityFrameColorChanged = [];
        this._myActivityJoinedCallbacks = [];
        this._myActivityRemovedCallbacks = [];
        this._myContextUpdateCallbacks = [];
        this._logger = logger_1.Logger.Get(this);
        this._m = manager;
        manager.ready()
            .then(function (am) {
            // Subscribe for events for driving "my" logic
            am.subscribeActivityContextChanged(_this._subscribeMyContextChanged.bind(_this));
            am.subscribeWindowEvents(_this._subscribeMyWindowEvent.bind(_this));
            am.subscribeActivitiesAttached(_this._subscribeActivitiesAttached.bind(_this));
            am.subscribeActivitiesDetached(_this._subscribeActivitiesDetached.bind(_this));
            if (windows) {
                windows.onWindowFrameColorChanged(_this._subscribeWindowFrameColorChanged.bind(_this));
            }
        });
    }
    Object.defineProperty(ActivityMy.prototype, "window", {
        /**
         * The current activity window; can be undefined (if the window is not part of any activity)
         *
         * @var {Window} window
         **/
        get: function () {
            if (util.isUndefinedOrNull(this._w)) {
                var announcedWindows = this._m.announcedWindows;
                if (announcedWindows.length > 0) {
                    this._w = announcedWindows[0];
                }
            }
            return this._w;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ActivityMy.prototype, "activity", {
        /**
         * The current activity that the application participates in.
         * Can be undefined (if currently not part of any activity)
         *
         * @var {module:activity} activity
         **/
        get: function () {
            var myWin = this.window;
            if (util.isUndefinedOrNull(myWin)) {
                return undefined;
            }
            return myWin.activity;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Creates a new window and joins it to the activity
     *
     * @function createWindow
     * @param {string| windowDefinition} windowType The type of the window to be created
     * @returns {Promise<module:activityWindow>}
     */
    ActivityMy.prototype.createWindow = function (windowType) {
        return this._m.createWindow(this.activity, windowType);
    };
    /**
     * Creates a stacked set of windows and joins them to the
     *
     * @function createStackedWindows
     * @param {string[] | windowDefinition[]} windowTypes The types of the windows to be created
     * @param {number} timeout
     * @returns {Promise<module:activityWindow[]>}
     */
    ActivityMy.prototype.createStackedWindows = function (windowTypes, timeout) {
        return this._m.createStackedWindows(this.activity, windowTypes, timeout);
    };
    Object.defineProperty(ActivityMy.prototype, "context", {
        /**
         * The current activity context. To update use my.updateContext, to replace my.setContext
         *
         * @var {Object} context
         */
        get: function () {
            var activity = this.activity;
            if (util.isUndefined(activity)) {
                return {};
            }
            return activity.context;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Updates activity context using the properties from the context argument.
     * If old context is {a:1, b:2, c:3} and invoking updateContext({b:3, c:null}) will result a context
     * be {a:1, b:3}
     *
     * @function updateContext
     * @param {Object} context
     * @return {Promise<Object>}
     */
    ActivityMy.prototype.updateContext = function (context, callback) {
        var activity = this.activity;
        if (util.isUndefined(activity)) {
            return new Promise(function (resolve, reject) {
                reject('Not in activity');
            });
        }
        return activity.updateContext(context, callback);
    };
    /**
     * Replaces the activity context with a new one.
     *
     * @function setContext
     * @param {Object} context   The new context
     * @returns {Promise<Object>}
     */
    ActivityMy.prototype.setContext = function (context, callback) {
        var activity = this.activity;
        if (util.isUndefined(activity)) {
            return new Promise(function (resolve, reject) {
                reject('Not in activity');
            });
        }
        return activity.setContext(context, callback);
    };
    ActivityMy.prototype.onActivityJoined = function (callback) {
        this._myActivityJoinedCallbacks.push(callback);
        // replay joined event
        var myWin = this.window;
        if (!util.isUndefinedOrNull(myWin) && !util.isUndefinedOrNull(myWin.activity)) {
            // TODO fix joined
            callback(myWin.activity);
        }
    };
    ActivityMy.prototype.onActivityLeft = function (callback) {
        this._myActivityRemovedCallbacks.push(callback);
    };
    /**
     * Subscribe for context updates
     *
     * @function onContextChanged
     * @param {contextChangedHandler} callback Handler function that will receive context related events
     */
    ActivityMy.prototype.onContextChanged = function (callback) {
        this._myContextUpdateCallbacks.push(callback);
        // publish initial event
        var myWin = this.window;
        if (util.isUndefinedOrNull(myWin)) {
            return;
        }
        var activity = myWin.activity;
        if (util.isUndefinedOrNull(activity)) {
            return;
        }
        callback(activity.context, activity.context, [], activity);
    };
    ActivityMy.prototype.clone = function (options, callback) {
        var act = this.activity;
        return this._m.clone(act, options, callback);
    };
    ActivityMy.prototype.attach = function (activity, tag) {
        var activityId;
        if (typeof activity === 'string') {
            activityId = activity;
        }
        else {
            activityId = activity.id;
        }
        return this._m.attachActivities(activityId, this.activity.id, tag);
    };
    ActivityMy.prototype.onActivityAttached = function (callback) {
        this._myAttached.push(callback);
    };
    ActivityMy.prototype.onActivityDetached = function (callback) {
        this._myDetached.push(callback);
    };
    ActivityMy.prototype.onAttachedToActivity = function (callback) {
        this._myAttachedTo.push(callback);
    };
    ActivityMy.prototype.onDetachedFromActivity = function (callback) {
        this._myDetachedFrom.push(callback);
    };
    Object.defineProperty(ActivityMy.prototype, "attached", {
        get: function () {
            if (!this.activity) {
                return [];
            }
            return this.activity.attached;
        },
        enumerable: true,
        configurable: true
    });
    ActivityMy.prototype._subscribeMyContextChanged = function (activity, context, delta, removed) {
        var myWin = this.window;
        if (util.isUndefinedOrNull(myWin)) {
            return;
        }
        var myActivity = myWin.activity;
        if (util.isUndefinedOrNull(myActivity)) {
            return;
        }
        // ignore events not related to my activity
        if (activity.id !== myActivity.id) {
            return;
        }
        this._notifyMyContextChanged(activity, context, delta, removed);
    };
    ActivityMy.prototype._subscribeMyWindowEvent = function (activity, window, event) {
        if (util.isUndefinedOrNull(this.window)) {
            return;
        }
        // ignore events not related to my window
        if (this.window.id !== window.id) {
            return;
        }
        // TODO fix joined
        if (event === "joined") {
            this._notifyOnJoined(activity);
        }
        else {
            this._notifyMyWindowEvent(activity, this._myActivityRemovedCallbacks);
        }
    };
    ActivityMy.prototype._notifyMyWindowEvent = function (activity, callbackStore) {
        for (var index = 0; index < callbackStore.length; index++) {
            var element = callbackStore[index];
            try {
                element(activity, event);
            }
            catch (e) {
                this._logger.warn('error in user callback ' + e);
            }
        }
    };
    ActivityMy.prototype._notifyMyContextChanged = function (activity, context, delta, removed) {
        delta = delta || {};
        removed = removed || [];
        for (var index = 0; index < this._myContextUpdateCallbacks.length; index++) {
            var element = this._myContextUpdateCallbacks[index];
            try {
                element(context, delta, removed, activity);
            }
            catch (e) {
                this._logger.warn('error in user callback ' + e);
            }
        }
    };
    ActivityMy.prototype._notifyOnJoined = function (activity) {
        // when joined to activity notify for :
        // * joined
        // * context change
        this._notifyMyWindowEvent(activity, this._myActivityJoinedCallbacks);
        this._notifyMyContextChanged(activity, activity.context);
    };
    ActivityMy.prototype._notifyAttached = function (state) {
        this._myAttached.forEach(function (cb) {
            try {
                cb(state);
            }
            catch (e) { }
        });
    };
    ActivityMy.prototype._notifyDetached = function (state) {
        this._myDetached.forEach(function (cb) {
            try {
                cb(state);
            }
            catch (e) { }
        });
    };
    ActivityMy.prototype._notifyAttachedTo = function (state) {
        var _this = this;
        this._myAttachedTo.forEach(function (cb) {
            try {
                cb(_this.activity, state);
            }
            catch (e) { }
        });
    };
    ActivityMy.prototype._notifyDetachedFrom = function (detached, existing, state) {
        this._myDetachedFrom.forEach(function (cb) {
            try {
                cb(detached, existing, state);
            }
            catch (e) { }
        });
    };
    ActivityMy.prototype._subscribeActivitiesAttached = function (newAct, state) {
        var myWin = this.window;
        if (util.isUndefinedOrNull(myWin)) {
            return;
        }
        var myActivity = myWin.activity;
        if (util.isUndefinedOrNull(myActivity)) {
            return;
        }
        // ignore events not related to my activity
        if (newAct.id !== myActivity.id) {
            return;
        }
        if (state.windowIds.indexOf(myWin.id) >= 0) {
            this._notifyAttachedTo(state);
            return;
        }
        this._notifyAttached(state);
    };
    ActivityMy.prototype._subscribeActivitiesDetached = function (newAct, oldAct, state) {
        var myWin = this.window;
        if (util.isUndefinedOrNull(myWin)) {
            return;
        }
        var myActivity = myWin.activity;
        if (util.isUndefinedOrNull(myActivity)) {
            return;
        }
        // ignore events not related to my activity
        if (oldAct.id === myActivity.id) {
            this._notifyDetached(state);
        }
        if (newAct.id == myActivity.id) {
            this._notifyDetachedFrom(newAct, oldAct, state);
        }
    };
    ActivityMy.prototype.setFrameColor = function (color, callback) {
        if (this.activity) {
            return this.activity.setFrameColor(color, callback);
        }
        else {
            return Promise.resolve(null);
        }
    };
    ActivityMy.prototype.getFrameColor = function () {
        if (this.activity) {
            return this.activity.getFrameColor();
        }
        return '';
    };
    ActivityMy.prototype.onFrameColorChanged = function (callback) {
        this._myActivityFrameColorChanged.push(callback);
    };
    ;
    ActivityMy.prototype._subscribeWindowFrameColorChanged = function (window) {
        var act = this.activity;
        if (!act) {
            return;
        }
        if (!act.owner) {
            return;
        }
        if (act.owner.underlyingWindow.id === window.id) {
            this._myActivityFrameColorChanged.forEach(function (callback) {
                callback(window.frameColor);
            });
        }
    };
    return ActivityMy;
}());
exports.default = ActivityMy;
//# sourceMappingURL=activityMyAPI.js.map

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ActivityConfig = /** @class */ (function () {
    function ActivityConfig() {
    }
    return ActivityConfig;
}());
exports.ActivityConfig = ActivityConfig;
//# sourceMappingURL=activityConfig.js.map

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/// <reference path="../typings/es6-promise/es6-promise.d.ts"/>
/// <reference path="../typings/tick42-agm/agm.d.ts"/>
/// <reference path="../typings/tick42-logger/logger.d.ts"/>
var hcBridge_1 = __webpack_require__(16);
var activityManager_1 = __webpack_require__(18);
var activityMyAPI_1 = __webpack_require__(13);
var logger_1 = __webpack_require__(1);
var util = __webpack_require__(0);
var activityConfig_1 = __webpack_require__(14);
var activityAPI_1 = __webpack_require__(11);
var activityAGM_1 = __webpack_require__(4);
/**
 * Activity context update handler - used when we want to subscribe for context changes in a specific activity
 *
 * @callback contextChangedHandler
 * @param {Object} context The full context of the activity after the update
 * @param {Object} delta The delta (contains the added/removed keys at top level)
 * @param {string[]} removed  Array of keys that were removed from context
 * @param {module:activity} activity The activity instance that owns the context
 *
 */
/**
 * @callback windowEventHandler Handler for ActivityWindow events - e.g window joined to activity, window removed from activity
 * @param {module:activity} activity
 * @param {module:activityWindow} window
 * @param {string} event 'joined' or 'removed'
 */
/**
 * @callback activityStatusChangeHandler Handler for activity status changed events
 * @param {module:activity} activity
 * @param {activityStatus} newStatus
 * @param {activityStatus} oldStatus
 *
 */
/**
 * @typedef {Object} windowDefinition
 * @property {string} type
 * @property {string} name
 * @property {Object} arguments
 */
/**
 * @typedef {Object} bounds
 * @param {number} top
 * @param {number} left
 * @param {number} width
 * @param {number} height
 *
 */
/**
 * @typedef {Object} agmInstance
 * @param {string} application
 * @param {string} pid
 * @param {string} machine
 * @param {string} user
 * @param {string} environment
 * @param {string} region
 */
// Factory function for activity API
var activity = function (config) {
    // if no config use the default one
    config = config || new activityConfig_1.ActivityConfig;
    // set log level
    if (!util.isUndefined(config.logLevel)) {
        logger_1.Logger.Level = config.logLevel;
    }
    if (!util.isUndefinedOrNull(config.logger)) {
        logger_1.Logger.GlueLogger = config.logger;
    }
    // choose the correct bridge
    var bridge;
    if (!util.isUndefined(window.htmlContainer)) {
        bridge = new hcBridge_1.default(undefined, config.windows, config.appManagerGetter, config.mode, config.typesToTrack);
    }
    else {
        throw new Error("Activity not supported in in browser");
    }
    if (!bridge) {
        throw new Error("A bridge to native activity is needed to create activity lib.");
    }
    activityAGM_1.ActivityAGM.AGM = config.agm;
    var activityManager = new activityManager_1.default(bridge, !config.disableAutoAnnounce, config.windows);
    var my = new activityMyAPI_1.default(activityManager, config.windows);
    return new activityAPI_1.ActivityAPI(activityManager, my);
};
module.exports = activity;
//# sourceMappingURL=activityModule.js.map

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var entityEvent_1 = __webpack_require__(2);
var activityStatus_1 = __webpack_require__(17);
var activityType_1 = __webpack_require__(6);
var windowType_1 = __webpack_require__(24);
var activity_1 = __webpack_require__(21);
var activityWindow_1 = __webpack_require__(22);
var proxyWindowFactory_1 = __webpack_require__(20);
var logger_1 = __webpack_require__(1);
var entityEvent_2 = __webpack_require__(2);
var readyMarker_1 = __webpack_require__(7);
var util = __webpack_require__(0);
var entityEvent_3 = __webpack_require__(2);
/**
 * HtmlContainer (HC) bridge
 * @private
 * @module hcBridge
 */
var HCBridge = /** @class */ (function () {
    function HCBridge(agm, windows, appManagerGetter, mode, typesToTrack) {
        // HC constants
        this._activityTypeEntityName = "activityType";
        this._windowTypeEntityName = "windowType";
        this._activityEntityName = "activity";
        this._windowEntityName = "activityWindow";
        this._logger = logger_1.Logger.Get(this);
        // event sequences
        this._lastSeq = 0;
        this._eventQueue = [];
        this._activityTypeCallbacks = [];
        this._windowTypeCallbacks = [];
        this._activityCallbacks = [];
        this._windowCallbacks = [];
        this._agm = agm;
        this._windows = windows;
        this._appManagerGetter = appManagerGetter;
        this._mode = mode;
        this._typesToTrack = typesToTrack;
    }
    HCBridge.prototype.init = function () {
        var _this = this;
        this._readyMarker = new readyMarker_1.ReadyMarker("HC Bridge", 1);
        this._htmlContainer = window.htmlContainer.activityFacade;
        if (this._htmlContainer.subscribeForJoinBreakEvents) {
            this._htmlContainer.subscribeForJoinBreakEvents(function (e) {
                _this._handleGenericEvents(e);
            });
        }
        var options = this._agm ? this._agm.instance : undefined;
        var initFunc = this._htmlContainer.init;
        if (this._htmlContainer.init2) {
            initFunc = this._htmlContainer.init2;
            options = {
                jsAgmInstance: options,
                glueVersion: 3,
                mode: this._mode,
                typesToTrack: this._typesToTrack
            };
        }
        initFunc(options, this._hcEventHandler.bind(this), // event listener
        function () {
            _this._readyMarker.signal("Init done from HC");
        }, function (error) {
            _this._readyMarker.error(error);
        });
    };
    HCBridge.prototype.ready = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this._readyMarker.setCallback(function (err) {
                if (!err) {
                    resolve(_this);
                }
                else {
                    _this._logger.error("Error initializing HC bridge - " + err);
                    reject(_this._readyMarker.getError());
                }
            });
        });
    };
    HCBridge.prototype._handleGenericEvents = function (event) {
        this._processEventBySeq(event);
    };
    HCBridge.prototype._hcEventHandler = function (eventJson) {
        this._logger.trace(eventJson);
        var event = JSON.parse(eventJson);
        this._processEventBySeq(event);
    };
    HCBridge.prototype._processEventBySeq = function (event) {
        var seq = event.sequence;
        if (seq === this._lastSeq + 1) {
            // if this is the event we expect process it
            this._processEvent(event);
            this._lastSeq++;
            // empty the next items in the queue - if any
            var nextEvent = this._eventQueue[seq + 1];
            if (!util.isUndefined(nextEvent)) {
                this._logger.debug("replaying message number " + seq);
                this._processEventBySeq(nextEvent);
                delete this._eventQueue[seq + 1];
            }
        }
        else {
            // save in the queue
            this._eventQueue[seq] = event;
            this._logger.debug("Got out of order event with number " + seq + ". Will wait for previous event(s) before replaying.");
        }
    };
    HCBridge.prototype._processEvent = function (event) {
        var _this = this;
        if (event.genericEvent) {
            this._processGenericEvent(event);
            return;
        }
        var entityType = event.entityType;
        var eventContext = this._convertContext(event.context);
        var entity;
        // Hack for Activities .NET api not delivering right context
        if (event.context.type === entityEvent_1.EntityEventType.ActivityContextChange &&
            (!this._htmlContainer.contextUpdateRaceFixed)) {
            // When there is a context update, we will ask the container for all activities
            // and use the context of the returned activity instead of the one we received from the update
            // we should remove this hack once a fix in HC is deployed
            this.getActivities()
                .then(function (activities) {
                var updated = event.context.updated;
                var removed = event.context.removed;
                var activityInEvent = _this._hcToJsActivity(event.entity);
                var contextAsString = event.entity.context;
                activities.forEach(function (activity) {
                    if (activity.id !== activityInEvent.id) {
                        return;
                    }
                    eventContext = new entityEvent_3.ActivityContextChangedContext(contextAsString, updated, removed);
                    _this._publishActivityStatusChange(activityInEvent, eventContext);
                });
            });
            return;
        }
        switch (entityType) {
            case this._activityTypeEntityName:
                entity = HCBridge._hcToJsActivityType(event.entity);
                this._publishActivityTypeStatusChange(entity, eventContext);
                break;
            case this._windowTypeEntityName:
                entity = this._hcToJsWindowType(event.entity);
                this._publishWindowTypeStatusChange(entity, eventContext);
                break;
            case this._activityEntityName:
                entity = this._hcToJsActivity(event.entity);
                this._publishActivityStatusChange(entity, eventContext);
                break;
            case this._windowEntityName:
                entity = this._hcToJsWindow(event.entity);
                this._publishActivityWindowEvent(entity, eventContext);
                break;
        }
    };
    HCBridge.prototype._processGenericEvent = function (event) {
        var info = event.data;
        if (event.type === 'ActivitiesAttached') {
            if (this._activitiesAttachedHandler) {
                this._activitiesAttachedHandler(info);
            }
        }
        else if (event.type === 'ActivitiesDetached') {
            if (this._activitiesDetached) {
                this._activitiesDetached(info);
            }
        }
        else if (event.type === 'ActivityAttachedDescriptorsRefreshed') {
            if (this._activityAttachedDescriptorsRefreshed) {
                this._activityAttachedDescriptorsRefreshed(info);
            }
        }
    };
    HCBridge.prototype._convertContext = function (hcContext) {
        if (hcContext.type === entityEvent_1.EntityEventType.StatusChange) {
            var oldStatus = new activityStatus_1.ActivityStatus(hcContext.oldStatus.state, hcContext.oldStatus.statusMessage, hcContext.oldStatus.statusTime);
            var newStatus = new activityStatus_1.ActivityStatus(hcContext.newStatus.state, hcContext.newStatus.statusMessage, hcContext.newStatus.statusTime);
            return new entityEvent_1.EntityStatusChangeEventContext(newStatus, oldStatus);
        }
        else if (hcContext.type === entityEvent_1.EntityEventType.ActivityWindowEvent) {
            var act = this._hcToJsActivity(hcContext.activity);
            return new entityEvent_1.EntityActivityWindowEventContext(act, hcContext.event);
        }
        else if (hcContext.type === entityEvent_1.EntityEventType.ActivityContextChange) {
            return new entityEvent_3.ActivityContextChangedContext(hcContext.newContext, hcContext.updated, hcContext.removed);
        }
        return new entityEvent_1.EntityEventContext(hcContext.type);
    };
    /** Convert a ActivityWindow entity coming from HC to ActivityWindow */
    HCBridge.prototype._hcToJsWindow = function (hcWindow) {
        var _this = this;
        var windowGetter = function () { return undefined; };
        if (this._windows) {
            if (hcWindow.hcWindowId) {
                windowGetter = function () { return _this._windows.list().filter(function (w) { return w.id === hcWindow.hcWindowId; })[0]; };
            }
            else {
                // backward compatibility for HC < 1.58
                windowGetter = function () { return _this._windows.list().filter(function (w) { return w.application === hcWindow.instance.application; })[0]; };
            }
        }
        return new activityWindow_1.default(hcWindow.id, hcWindow.name, hcWindow.type, hcWindow.activityId, hcWindow.instance, hcWindow.isIndependent, windowGetter, hcWindow.hcWindowId);
    };
    /** Convert an Activity entity from HC to Activity */
    HCBridge.prototype._hcToJsActivity = function (hcAct) {
        var window = hcAct.owner ? this._hcToJsWindow(hcAct.owner) : null;
        var windowId = window ? window.id : null;
        var status = new activityStatus_1.ActivityStatus(hcAct.status.state, hcAct.status.statusMessage, hcAct.status.statusTime);
        var context = JSON.parse(hcAct.context);
        return new activity_1.default(hcAct.id, hcAct.type.name, status, context, windowId);
    };
    /** Convert an ActivityType entity coming from HC to ActivityType */
    HCBridge._hcToJsActivityType = function (hcActType) {
        return new activityType_1.default(hcActType.name, hcActType.ownerWindowType, hcActType.helperWindowTypes, hcActType.description);
    };
    /** Convert a WindowType entity coming from HC to WindowType */
    HCBridge.prototype._hcToJsWindowType = function (hcWinType) {
        var _this = this;
        if (util.isUndefined(hcWinType.factories)) {
            hcWinType.factories = [];
        }
        // lazy init
        if (!this._appByWindowTypeGetter) {
            if (!this._appManagerGetter) {
                this._appByWindowTypeGetter = function () { return undefined; };
            }
            this._appByWindowTypeGetter = function (wt) {
                var appMgr = _this._appManagerGetter();
                return appMgr.applications().filter(function (app) { return app.activityWindowType === wt; })[0];
            };
        }
        return new windowType_1.default(hcWinType.name, this._appByWindowTypeGetter);
    };
    /** Convert a WindowFactory entity coming from HC to WindowFactory */
    HCBridge._hcToJsWindowTypeFactory = function (hcWinTypeFactory) {
        return new proxyWindowFactory_1.ProxyWindowFactory(hcWinTypeFactory.description);
    };
    HCBridge._getURLParameter = function (name) {
        return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [, ""])[1].replace(/\+/g, '%20')) || null;
    };
    HCBridge.prototype.getActivityTypes = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            // get all from HC
            _this._htmlContainer.getActivityTypes(function (infos) {
                var result = [];
                // transform to Activity Js Entities
                for (var index = 0; index < infos.length; index++) {
                    var info = infos[index];
                    var newActivityType = HCBridge._hcToJsActivityType(info);
                    result.push(newActivityType);
                }
                resolve(result);
            }, function (error) {
                reject(error);
            });
        });
    };
    HCBridge.prototype.registerActivityType = function (activityTypeName, ownerWindow, helperWindows, layoutConfig, description) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (helperWindows === undefined) {
                helperWindows = [];
            }
            var config = {
                name: activityTypeName,
                ownerWindowType: ownerWindow,
                helperWindowTypes: helperWindows,
                description: description,
                layoutConfig: JSON.stringify(layoutConfig)
            };
            // pass create request to HC
            _this._htmlContainer.registerActivityType(JSON.stringify(config), function (info) {
                // transform to Activity Js Entity
                var newActivityType = HCBridge._hcToJsActivityType(info);
                resolve(newActivityType);
            }, function (error) {
                reject(error);
            });
        });
    };
    HCBridge.prototype.unregisterActivityType = function (activityTypeName) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            // pass create request to HC
            _this._htmlContainer.unregisterActivityType(activityTypeName, function (info) {
                resolve(true);
            }, function (error) {
                reject(error);
            });
        });
    };
    HCBridge.prototype.getWindowTypes = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            // get all from HC
            _this._htmlContainer.getWindowTypes(function (infos) {
                var result = [];
                // transform to Activity Js Entities
                for (var index = 0; index < infos.length; index++) {
                    var info = infos[index];
                    var newWindowType = _this._hcToJsWindowType(info);
                    result.push(newWindowType);
                }
                resolve(result);
            }, function (error) {
                reject(error);
            });
        });
    };
    HCBridge.prototype.registerWindowFactory = function (windowTypeName, factory) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (util.isUndefinedOrNull(windowTypeName)) {
                reject("windowTypeName should be provided");
                return;
            }
            // pass create request to HC
            _this._htmlContainer.registerWindowFactory(windowTypeName, factory.create.bind(factory), function (info) {
                resolve(true);
            }, function (error) {
                reject(error);
            });
        });
    };
    HCBridge.prototype.initiateActivity = function (activityType, context, callback) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (util.isUndefinedOrNull(activityType)) {
                reject("windowTypeName should be provided");
                return;
            }
            if (util.isUndefinedOrNull(context)) {
                context = {};
            }
            // pass create request to HC
            _this._htmlContainer.initiate(activityType, JSON.stringify(context), function (activityId) {
                resolve(activityId);
            }, function (error) {
                reject(error);
            });
        });
    };
    HCBridge.prototype.getAnnouncementInfo = function () {
        var hc = window.htmlContainer;
        var context = hc.getContext();
        var result = { activityWindowId: "", activityWindowType: "", activityWindowIndependent: false, activityWindowName: "" };
        if (!context.activityId) {
            // in case we're not in activity just return. this will
            // lead to window not registering itself
            return result;
        }
        result.activityWindowType = context.activityWindowType;
        if (util.isUndefined(result.activityWindowType)) {
            result.activityWindowType = HCBridge._getURLParameter("activityWindowType");
        }
        result.activityWindowId = context.activityWindowId;
        if (util.isUndefined(result.activityWindowId)) {
            result.activityWindowId = HCBridge._getURLParameter("activityWindowId");
        }
        result.activityWindowIndependent = context.activityWindowIndependent;
        if (util.isUndefined(result.activityWindowIndependent)) {
            // TODO parse
            //result.activityWindowIndependent = this._getURLParameter("activityWindowIndependent");
        }
        result.activityWindowName = context.activityWindowName;
        if (util.isUndefined(result.activityWindowName)) {
            result.activityWindowName = HCBridge._getURLParameter("activityWindowName");
        }
        return result;
    };
    HCBridge.prototype.announceWindow = function (windowType, activityWindowId) {
        var _this = this;
        if (util.isUndefined(windowType)) {
            throw new Error("can not determine window type");
        }
        if (util.isUndefined(windowType)) {
            throw new Error("can not determine window activityWindowId");
        }
        this._htmlContainer.announceWindow(windowType, activityWindowId, function (error) {
            _this._logger.error("Error announcing activity window with id '" + activityWindowId + "'. " + error);
        });
    };
    HCBridge.prototype.getActivities = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            // get all from HC
            _this._logger.trace("Executing getActivities()");
            _this._htmlContainer.getActivities(function (activitiesStr) {
                // transform to Activity Js Entities
                _this._logger.trace("Got getActivities() :" + activitiesStr);
                var activities = JSON.parse(activitiesStr);
                var result = activities.map(function (act) { return _this._hcToJsActivity(act); });
                resolve(result);
            }, function (error) {
                _this._logger.trace("Error in getActivities() :" + error);
                reject(error);
            });
        });
    };
    HCBridge.prototype.updateActivityContext = function (activity, context, fullReplace, removedKeys) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (util.isUndefined(removedKeys)) {
                removedKeys = [];
            }
            var options = {
                fullReplace: fullReplace,
                removedKeys: removedKeys
            };
            _this._htmlContainer.setActivityContext(activity.id, JSON.stringify(context), JSON.stringify(options), function (newContextString) {
                // receives the new context as string
                var newContext = JSON.parse(newContextString);
                resolve(newContext);
            }, function (error) { return reject(error); });
        });
    };
    HCBridge.prototype.getActivityWindows = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            // get all from HC
            _this._htmlContainer.getWindows(function (windows) {
                // transform to Activity Js Entities
                var result = windows.map(function (wind) { return _this._hcToJsWindow(wind); });
                resolve(result);
            }, function (error) {
                reject(error);
            });
        });
    };
    HCBridge.prototype.stopActivity = function (activity) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this._htmlContainer.stopActivity(activity.id, function (result) {
                resolve(result);
            }, function (error) {
                reject(error);
            });
        });
    };
    HCBridge.prototype.unregisterWindowFactory = function (windowTypeName) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this._htmlContainer.registerWindowFactory(windowTypeName, function (info) {
                resolve(true);
            }, function (error) {
                reject(error);
            });
        });
    };
    HCBridge.prototype.createWindow = function (id, windowDefinition) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var objToSend = windowDefinition;
            var functionToUse = _this._htmlContainer.createWindow2;
            if (!functionToUse) {
                functionToUse = _this._htmlContainer.createWindow;
                objToSend = JSON.stringify(windowDefinition);
            }
            functionToUse(id, objToSend, function (id) {
                resolve(id);
            }, function (error) {
                reject(error);
            });
        });
    };
    HCBridge.prototype.createStackedWindows = function (id, windowDefinitions, timeout) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var objToSend = windowDefinitions;
            var functionToUse = _this._htmlContainer.createStackedWindows2;
            if (!functionToUse) {
                functionToUse = _this._htmlContainer.createStackedWindows;
                objToSend = JSON.stringify(windowDefinitions);
            }
            functionToUse(id, objToSend, timeout, function (id) {
                resolve(id);
            }, function (error) {
                reject(error);
            });
        });
    };
    HCBridge.prototype.onActivityTypeStatusChange = function (callback) {
        this._activityTypeCallbacks.push(callback);
    };
    HCBridge.prototype.onWindowTypeStatusChange = function (callback) {
        this._windowTypeCallbacks.push(callback);
    };
    HCBridge.prototype.onActivityStatusChange = function (callback) {
        this._activityCallbacks.push(callback);
    };
    HCBridge.prototype.onActivityWindowChange = function (callback) {
        this._windowCallbacks.push(callback);
    };
    HCBridge.prototype.getWindowBounds = function (id) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this._htmlContainer.getWindowBounds(id, function (bounds) {
                resolve(bounds);
            }, function (err) {
                reject(err);
            });
        });
    };
    HCBridge.prototype.setWindowBounds = function (id, bounds) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this._htmlContainer.setWindowBounds(id, JSON.stringify(bounds), function () {
                resolve();
            }, function (err) {
                reject(err);
            });
        });
    };
    HCBridge.prototype.registerWindow = function (type, name, independent) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this._htmlContainer.registerWindow(type, name, independent, function (id) {
                resolve(id);
            }, function (error) {
                reject(error);
            });
        });
    };
    HCBridge.prototype.closeWindow = function (id) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this._htmlContainer.closeWindow(id, function () {
                resolve();
            }, function (err) {
                reject(err);
            });
        });
    };
    HCBridge.prototype.activateWindow = function (id, focus) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this._htmlContainer.activateWindow(id, focus, function () {
                resolve();
            }, function (err) {
                reject(err);
            });
        });
    };
    HCBridge.prototype.setWindowVisibility = function (id, visible) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this._htmlContainer.setWindowVisibility(id, visible, function () {
                resolve();
            }, function (err) {
                reject(err);
            });
        });
    };
    HCBridge.prototype.cloneActivity = function (id, options) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this._htmlContainer.cloneActivity(id, options, function (activityId) {
                resolve(activityId);
            }, function (err) {
                reject(err);
            });
        });
    };
    HCBridge.prototype._publishStatusChange = function (entity, context, callbacks) {
        var entityEvent = new entityEvent_2.EntityEvent(entity, context);
        callbacks.forEach(function (callback) {
            callback(entityEvent);
        });
    };
    HCBridge.prototype._publishActivityTypeStatusChange = function (at, context) {
        this._publishStatusChange(at, context, this._activityTypeCallbacks);
    };
    HCBridge.prototype._publishWindowTypeStatusChange = function (wt, context) {
        this._publishStatusChange(wt, context, this._windowTypeCallbacks);
    };
    HCBridge.prototype._publishActivityStatusChange = function (act, context) {
        this._publishStatusChange(act, context, this._activityCallbacks);
    };
    HCBridge.prototype._publishActivityWindowEvent = function (w, context) {
        this._publishStatusChange(w, context, this._windowCallbacks);
    };
    HCBridge.prototype.attachActivities = function (from, to, tag) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this._htmlContainer.attachActivities(from, to, tag, function (state) {
                resolve(state);
            }, function (err) {
                reject(err);
            });
        });
    };
    HCBridge.prototype.detachActivities = function (activityId, newActivityInfo) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this._htmlContainer.detachActivities(activityId, newActivityInfo, function (activityId) {
                resolve(activityId);
            }, function (err) {
                reject(err);
            });
        });
    };
    HCBridge.prototype.onActivitiesAttached = function (callback) {
        this._activitiesAttachedHandler = callback;
    };
    HCBridge.prototype.onActivitiesDetached = function (callback) {
        this._activitiesDetached = callback;
    };
    HCBridge.prototype.onActivityAttachedDescriptorsRefreshed = function (callback) {
        this._activityAttachedDescriptorsRefreshed = callback;
    };
    HCBridge.prototype.getAttachedDescriptors = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (!_this._htmlContainer.getAttachedDescriptors) {
                // support for container that does not have descriptors
                resolve([]);
                return;
            }
            _this._htmlContainer.getAttachedDescriptors(function (result) {
                resolve(result);
            }, function (err) {
                reject(err);
            });
        });
    };
    return HCBridge;
}());
exports.default = HCBridge;
//# sourceMappingURL=hcBridge.js.map

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @typedef {Object} activityStatus Defines activity instance status
 * @property {string} state Current state
 * @property {string} message Message
 * @property {Date} time Time of the last status update
 */
var ActivityStatus = /** @class */ (function () {
    function ActivityStatus(state, message, time) {
        this.state = state;
        this.message = message;
        this.time = time;
    }
    ActivityStatus.prototype.getState = function () {
        return this.state;
    };
    ActivityStatus.prototype.getMessage = function () {
        return this.message;
    };
    ActivityStatus.prototype.getTime = function () {
        return this.time;
    };
    return ActivityStatus;
}());
exports.ActivityStatus = ActivityStatus;
//# sourceMappingURL=activityStatus.js.map

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/// <reference path="../../typings/es6-promise/es6-promise.d.ts"/>
Object.defineProperty(exports, "__esModule", { value: true });
var entityEvent_1 = __webpack_require__(2);
var activityType_1 = __webpack_require__(6);
var promiseExtensions_1 = __webpack_require__(5);
var readyMarker_1 = __webpack_require__(7);
var entityObservableCollection_1 = __webpack_require__(25);
var logger_1 = __webpack_require__(1);
var util = __webpack_require__(0);
var localWindowFactory_1 = __webpack_require__(19);
var ActivityManager = /** @class */ (function () {
    function ActivityManager(bridge, autoAnnounce, windows) {
        var _this = this;
        this._logger = logger_1.Logger.Get(this);
        this._announcedWindows = [];
        this._attachedCallbacks = [];
        this._detachedCallbacks = [];
        this._frameColorChangesCallbacks = [];
        this._bridge = bridge;
        this._activityTypes = new entityObservableCollection_1.EntityObservableCollection(function (e) { return _this._grabEntity(e); });
        this._windowTypes = new entityObservableCollection_1.EntityObservableCollection(function (e) { return _this._grabEntity(e); });
        this._activities = new entityObservableCollection_1.EntityObservableCollection(function (e) { return _this._grabEntity(e); });
        this._windows = new entityObservableCollection_1.EntityObservableCollection(function (e) { return _this._grabEntity(e); });
        // signals to wait for - get AT, get WT, get Activities and get Windows
        this._dataReadyMarker = new readyMarker_1.ReadyMarker("Activity Manager Data", ["GetActivityTypes", "GetWindowTypes", "GetActivities", "GetWindows"].length);
        this._descriptorsMarker = new readyMarker_1.ReadyMarker("Attached Activities Descriptors", ["GetDescriptors"].length);
        if (autoAnnounce) {
            // if auto announce replace the ready marker, so:
            // 1) wait for data
            // 2) announce the current window
            var announceMaker = new readyMarker_1.ReadyMarker("Activity Manager Announce", ["Announcement"].length);
            this._readyMarker = announceMaker;
            this._dataReadyMarker.setCallback(function (dataErr) {
                if (dataErr) {
                    _this._readyMarker.error(dataErr);
                }
                _this._descriptorsMarker.setCallback(function (err) {
                    if (err) {
                        _this._readyMarker.error(err);
                    }
                    _this._logger.debug("Auto announcing window");
                    // signal no matter if it failed or not
                    _this.announceWindow()
                        .then(function (w) {
                        _this._announcedWindows.push(w);
                        _this._readyMarker.signal("Successfully announced window with id '" + w.id + "'");
                    })
                        .catch(function (err) {
                        _this._logger.debug("Will not announce window - " + err);
                        _this._readyMarker.signal();
                    });
                });
                _this.refreshDescriptors();
            });
        }
        else {
            this._readyMarker = this._dataReadyMarker;
        }
        this._bridge.onActivitiesAttached(function (e) { _this._handleActivitiesAttached(e); });
        this._bridge.onActivitiesDetached(function (e) { _this._handleActivitiesDetached(e); });
        this._bridge.onActivityAttachedDescriptorsRefreshed(function (e) { _this._handleActivityDescriptorsRefreshed(e); });
        if (windows) {
            windows.onWindowFrameColorChanged(this._handleWindowFrameColorChanged.bind(this));
        }
        // initialize the bridge
        this._bridge.init();
        // wait for it to become ready and then start getting/subscribing for data
        this._bridge
            .ready()
            .then(function (aw) {
            _this._subscribeForData();
        })
            .catch(function (error) {
            console.log(error);
        });
    }
    Object.defineProperty(ActivityManager.prototype, "announcedWindows", {
        get: function () {
            return this._announcedWindows;
        },
        set: function (v) {
            throw new Error("not allowed");
        },
        enumerable: true,
        configurable: true
    });
    ActivityManager.prototype.ready = function (callback) {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            _this._readyMarker.setCallback(function (err) {
                if (!err) {
                    resolve(_this);
                }
                else {
                    reject(_this._readyMarker.getError());
                }
            });
        });
        return promiseExtensions_1.nodeify(promise, callback);
    };
    /**
     * @returns All known activity types
     */
    ActivityManager.prototype.getActivityTypes = function () {
        return this._activityTypes.get();
    };
    /**
     * Gets ActivityType by name
     * @param name  Name to search for
     * @returns     If found the @type ActivityType; otherwise undefined
     */
    ActivityManager.prototype.getActivityType = function (name) {
        return this._activityTypes.getByName(name);
    };
    /**
     * Registers a new activity type
     * @param activityTypeName      The name of the activity type to be created
     * @param ownerWindowType       The type of the owner window or a WindowDefinition for the owner window
     * @param helperWindowTypes     Types of helper windows (or WindowDefinitions for helper windows) for that activity type
     * @param layoutConfig          Layout config
     * @param description           Description for the new activity type
     * @param callback              (Optional) Callback for results - if not speciefed the method will return a promise
     */
    ActivityManager.prototype.registerActivityType = function (activityTypeName, ownerWindowType, helperWindowTypes, layoutConfig, description, callback) {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            // activityTypeName checks
            if (util.isUndefinedOrNull(activityTypeName)) {
                reject("activityTypeName argument can not be undefined");
            }
            if (!util.isString(activityTypeName)) {
                reject("activityTypeName should be string");
            }
            // check if type is already defined
            var actType = _this.getActivityType(activityTypeName);
            if (!util.isUndefinedOrNull(actType)) {
                reject("Activity type '" + activityTypeName + "' already exists");
            }
            // ownerWindowType checks
            var ownerDefinition;
            if (util.isUndefined(ownerWindowType)) {
                reject("Owner window type can not be undefined");
            }
            if (util.isString(ownerWindowType)) {
                ownerDefinition = { type: ownerWindowType, name: "", isIndependent: false, arguments: {} };
            }
            else {
                ownerDefinition = ownerWindowType;
            }
            // helperWindowTypes checks
            var helperDefinitions = [];
            if (!util.isUndefined(helperWindowTypes) && util.isArray(helperWindowTypes)) {
                for (var index in helperWindowTypes) {
                    var item = helperWindowTypes[index];
                    if (util.isString(item)) {
                        var definition = {
                            type: item,
                            name: "",
                            isIndependent: false,
                            arguments: {},
                            relativeTo: "",
                            relativeDirection: "",
                            windowStyleAttributes: {}
                        };
                        helperDefinitions.push(definition);
                    }
                    else {
                        helperDefinitions.push(item);
                    }
                }
            }
            // redirect to bridge
            _this._bridge
                .registerActivityType(activityTypeName, ownerDefinition, helperDefinitions, layoutConfig, description)
                .then(function (activityType) {
                // add to from collections
                _this._grabEntity(activityType);
                resolve(activityType);
            })
                .catch(function (error) {
                reject(error);
            });
        });
        return promiseExtensions_1.nodeify(promise, callback);
    };
    /**
     * Unregister existing activity type
     * @param type The name of the activity type to be removed
     */
    ActivityManager.prototype.unregisterActivityType = function (type, callback) {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            // check if type is defined
            var actType = _this.getActivityType(type);
            if (util.isUndefined(actType)) {
                reject("Activity type '" + type + "' does not exists");
            }
            return _this._bridge.unregisterActivityType(type);
        });
        return promiseExtensions_1.nodeify(promise, callback);
    };
    /**
     * Initiates a new activity from the given type.
     * @param activityType  The ActivityType to initiate
     * @param context       The initial context of the activity
     * @param callback      Callback for result
     * @returns             Promise for activity
     */
    ActivityManager.prototype.initiate = function (activityType, context, callback) {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            // check if type is defined
            var actType = _this.getActivityType(activityType);
            if (util.isUndefined(actType)) {
                reject("Activity type '" + activityType + "' does not exists");
            }
            _this._bridge
                .initiateActivity(activityType, context)
                .then(function (actId) {
                _this._activities
                    .getOrWait(actId)
                    .then(function (act) {
                    resolve(act);
                })
                    .catch(function (err) { return reject(err); });
            })
                .catch(function (err) {
                reject(err);
            });
        });
        return promiseExtensions_1.nodeify(promise, callback);
    };
    ActivityManager.prototype.subscribeActivityTypeEvents = function (handler) {
        this._activityTypes.subscribe(function (at, context) {
            handler(at, context.type);
        });
    };
    /**
     * @returns All known WindowTypes
     */
    ActivityManager.prototype.getWindowTypes = function () {
        return this._windowTypes.get();
    };
    /**
     * Gets WindowType by name
     * @param name  The name of the type @type WindowType
     * @returns     WindowType if found; undefined otherwise
     */
    ActivityManager.prototype.getWindowType = function (name) {
        return this._windowTypes.getByName(name);
    };
    /**
     * Registers a factory for a given WindowType. The factory will be called once window of that type is requested
     * @param windowType   Window type that will be constructed from the factory. Can be a string (name of the window type)
     * or object that has name, description properties
     * @param factory      The factory that will construct Windows of that type
     * @returns {}
     */
    ActivityManager.prototype.registerWindowFactory = function (windowType, factoryMethod, description, callback) {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            if (util.isUndefinedOrNull(windowType)) {
                reject("no windowType specified");
                return;
            }
            if (util.isObject(windowType)) {
                windowType = windowType.getName();
            }
            else if (!util.isString(windowType)) {
                reject("windowType should be string or object that has getName method");
                return;
            }
            var factory = new localWindowFactory_1.LocalWindowFactory(factoryMethod, description);
            _this._bridge
                .registerWindowFactory(windowType, factory)
                .then(function (v) {
                resolve(v);
            })
                .catch(function (err) {
                reject(err);
            });
        });
        return promiseExtensions_1.nodeify(promise, callback);
    };
    /**
     * Unregisters all factories for a given WindowType.
     * @param windowType   Window type that is constructed from the factory.
     * @param callback
     * @returns {}
     */
    ActivityManager.prototype.unregisterWindowFactory = function (windowType, callback) {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            if (util.isUndefinedOrNull(windowType)) {
                reject("no windowType specified");
                return;
            }
            if (!util.isString(windowType)) {
                reject("windowType should be a string");
                return;
            }
            _this._bridge
                .unregisterWindowFactory(windowType)
                .then(function (v) {
                resolve(v);
            })
                .catch(function (err) {
                reject(err);
            });
        });
        return promiseExtensions_1.nodeify(promise, callback);
    };
    /**
     * @returns All started activities
     * @param activityType Can be a string or @type ActivityType. If string a new activityType will be created using the string for name.
     * @returns Array of Activity objects
     */
    ActivityManager.prototype.getActivities = function (activityType) {
        var act = this._activities.get();
        if (!activityType) {
            return act;
        }
        var types = activityType;
        if (util.isString(activityType)) {
            types = [activityType];
        }
        else if (activityType instanceof activityType_1.default) {
            types = [activityType.name];
        }
        else if (activityType instanceof Array) {
            // TODO check if string array or array of ActivityTypes
        }
        else {
            throw new Error("Invalid input argument 'activityType' = " + activityType);
        }
        return act.filter(function (act) {
            var type = act.type;
            return util.some(types, function (t) {
                return type.id == t.id;
            });
        });
    };
    /**
     * Returns Activity by ID
     */
    ActivityManager.prototype.getActivityById = function (id) {
        return this._activities.getByName(id);
    };
    /**
     * Initialises activity for the current window - by doing this the window is announced as activity aware to the other participants
     * @param windowType            Type of window
     * @param activityWindowId      The id of the window that was created
     * @returns {}                  Promise for an activity window (joined to an activity, if the activity creation fails the promise will be rejected)
     */
    ActivityManager.prototype.announceWindow = function (activityWindowId, windowType) {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            // get the announcement info from the bridge (e.g. the context in HC) - this will be used if no arguments passed
            var announcementInfo = _this._bridge.getAnnouncementInfo();
            if (util.isUndefined(activityWindowId)) {
                activityWindowId = announcementInfo.activityWindowId;
            }
            if (util.isUndefined(windowType)) {
                windowType = announcementInfo.activityWindowType;
            }
            if (util.isUndefinedOrNull(windowType)) {
                throw new Error("Can not announce - unknown windowType");
            }
            // We cover two cases here:
            // * no activityWindowId supplied (neither in arguments or announcement info) - in that case we register new window by type. Most of the time this is the case when an independent window is created outside activity
            // * activityWindowId supplied - window created as part of activity creation
            if (util.isUndefinedOrNull(activityWindowId)) {
                _this._logger.debug("Registering window with type:'" + windowType + "', name:'" + announcementInfo.activityWindowName + "', ind.:'" + announcementInfo.activityWindowIndependent + "'");
                // register new window created outside activity
                _this._bridge.registerWindow(windowType, announcementInfo.activityWindowName, announcementInfo.activityWindowIndependent)
                    .then(_this._windows.getOrWait.bind(_this._windows))
                    .then(function (w) {
                    resolve(w);
                })
                    .catch(function (err) {
                    _this._logger.error(err);
                });
            }
            else {
                // announce new window created in an activity creation process
                _this._logger.debug("Announcing window with id '" + activityWindowId + "' and type '" + windowType + "'");
                // check if the window is already created -
                var currentWindow = _this._windows.getByName(activityWindowId);
                if (!util.isUndefinedOrNull(currentWindow)) {
                    _this._logger.debug("Window with id '" + activityWindowId + "' already announced - reusing the window");
                    resolve(currentWindow);
                    return;
                }
                // window events handler
                var windowEventHandler = function (a, w, e) {
                    if (activityWindowId === w.id) {
                        // TODO joined
                        if (e === "joined") {
                            var activity = w.activity;
                            if (util.isUndefined(activity)) {
                                reject("UNDEFINED ACTIVITY");
                            }
                            _this._logger.trace("Got joined event for id '" + activityWindowId + "'");
                            resolve(w);
                            _this.unsubscribeWindowEvents(windowEventHandler);
                        }
                    }
                };
                _this.subscribeWindowEvents(windowEventHandler);
                _this._logger.trace("Waiting for joined event for id '" + activityWindowId + "'");
                _this._bridge.announceWindow(windowType, activityWindowId);
            }
        });
        return promise;
    };
    /**
     * Allows you to subscribe for windows events, e.g. window type registered
     * @param handler   The handler to receive notifications
     * @returns {}
     */
    ActivityManager.prototype.subscribeWindowTypeEvents = function (handler) {
        this._windowTypes.subscribe(function (wt, context) {
            handler(wt, context.type);
        });
    };
    /**
     * Subscribe for activity status events
     * @param handler Handler function that will receive status notifications
     * @returns {}
     */
    ActivityManager.prototype.subscribeActivityEvents = function (handler) {
        this._activities.subscribe(function (act, context) {
            if (context.type === entityEvent_1.EntityEventType.StatusChange) {
                var p = context;
                handler(act, p.newStatus, p.oldStatus);
            }
        });
    };
    /**
     * Allows you to subscribe for windows events, e.g. window joining to activity
     * @param handler   The handler to receive notifications
     * @returns {}
     */
    ActivityManager.prototype.subscribeWindowEvents = function (handler) {
        this._windows.subscribe(function (window, context) {
            var eventType = context.type;
            if (context.type === entityEvent_1.EntityEventType.ActivityWindowEvent) {
                var p = context;
                eventType = p.event;
            }
            if (eventType === 'added') {
                // rename added to opened (because added is misleading - semantically it's the opposite of remove);
                eventType = 'opened';
            }
            handler(window.activity, window, eventType);
        });
    };
    ActivityManager.prototype.unsubscribeWindowEvents = function (handler) {
        //this._windows.unsubscribe(handler);
    };
    /**
     * Creates a new window from a given type and joins it to an activity
     *
     * @param activity      Activity to join the window to
     * @param windowType    The window type to join (string or window definition)
     * @param callback      (Optional) Result callback
     * @returns             Promise for ActivityWindow
     */
    ActivityManager.prototype.createWindow = function (activity, windowType, callback) {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            if (util.isUndefinedOrNull(activity)) {
                reject("activity is undefined");
            }
            if (util.isUndefinedOrNull(windowType)) {
                reject("windowType is undefined");
            }
            var windowDefinition;
            if (util.isString(windowType)) {
                windowDefinition = { type: windowType, name: "", isIndependent: false, arguments: {} };
            }
            else {
                windowDefinition = windowType;
            }
            var relativeToWindow;
            if (!util.isUndefinedOrNull(windowDefinition.relativeTo)) {
                relativeToWindow = windowDefinition.relativeTo;
                if (typeof relativeToWindow === "string") {
                    var windows = _this.getWindows({ type: relativeToWindow });
                    if (!util.isUndefinedOrNull(windows) && windows.length > 0) {
                        windowDefinition.relativeTo = windows[0].id;
                    }
                }
                else if (!util.isUndefinedOrNull(relativeToWindow.type)) {
                    var windows = _this.getWindows({ type: relativeToWindow.type });
                    if (!util.isUndefinedOrNull(windows) && windows.length > 0) {
                        windowDefinition.relativeTo = windows[0].id;
                    }
                }
                else if (!util.isUndefinedOrNull(relativeToWindow.windowId)) {
                    windowDefinition.relativeTo = relativeToWindow.windowId;
                }
            }
            _this._bridge.createWindow(activity.id, windowDefinition)
                .then(function (wid) {
                _this._logger.debug("Window created, waiting for window entity with id " + wid);
                var handler = function (window, context) {
                    // wait until the window has activity property (this means it was joined)
                    if (window.id === wid && window.activity) {
                        this._logger.debug("Got entity window with id " + wid);
                        resolve(window);
                        this._windows.unsubscribe(handler);
                    }
                }.bind(_this);
                // if we can not get the window right away, wait for event
                _this._windows.subscribe(handler);
            })
                .catch(function (err) {
                reject(err);
            });
        });
        return promiseExtensions_1.nodeify(promise, callback);
    };
    /**
     * Creates relative windows from a given types and joins them to an activity
     *
     * @param activity               Activity to join relative windows to
     * @param relativeWindowTypes    Relative window types to join (string or window definitions array)
     * @param callback               (Optional) Result callback
     * @returns                      Promise for ActivityWindow
     */
    ActivityManager.prototype.createStackedWindows = function (activity, relativeWindowTypes, timeout, callback) {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            if (util.isUndefinedOrNull(activity)) {
                reject("activity is undefined");
            }
            if (util.isUndefinedOrNull(relativeWindowTypes)) {
                reject("relativeWindowTypes is undefined");
            }
            if (!Array.isArray(relativeWindowTypes)) {
                reject("relativeWindowTypes has to be array");
            }
            if (util.isUndefinedOrNull(timeout)) {
                timeout = 20000; //default timeout: 20 seconds
            }
            var relativeWindows = [];
            relativeWindowTypes.forEach(function (element) {
                var windowDefinition;
                if (util.isString(element)) {
                    windowDefinition = { type: element, name: "", isIndependent: false, arguments: {} };
                }
                else {
                    windowDefinition = element;
                }
                var relativeToWindow;
                if (!util.isUndefinedOrNull(windowDefinition.relativeTo)) {
                    // this can not be string, converted in the prev. layer
                    relativeToWindow = windowDefinition.relativeTo;
                    if (!util.isUndefinedOrNull(relativeToWindow.type)) {
                        windowDefinition.relativeTo = relativeToWindow.type;
                    }
                    else if (!util.isUndefinedOrNull(relativeToWindow.windowId)) {
                        var windows = _this.getWindows({ id: relativeToWindow.windowId });
                        if (!util.isUndefinedOrNull(windows) && windows.length > 0) {
                            windowDefinition.relativeTo = windows[0].type.name;
                            windowDefinition.useExisting = true;
                        }
                    }
                }
                relativeWindows.push(windowDefinition);
            });
            _this._bridge.createStackedWindows(activity.id, relativeWindows, timeout)
                .then(function (wid) {
                var activityWindows = [];
                var alreadyCreated = [];
                var handler = function (window, context) {
                    // wait until the window has activity property (this means it was joined)
                    if (wid.indexOf(window.id) >= 0 && alreadyCreated.indexOf(window.id) < 0 && window.activity) {
                        this._logger.debug("Got entity window with id " + wid);
                        activityWindows.push(window);
                        alreadyCreated.push(window.id);
                        if (activityWindows.length == wid.length) {
                            resolve(activityWindows);
                            this._windows.unsubscribe(handler);
                        }
                    }
                }.bind(_this);
                // if we can not get the window right away, wait for event
                _this._windows.subscribe(handler);
            })
                .catch(function (err) {
                reject(err);
            });
        });
        return promiseExtensions_1.nodeify(promise, callback);
    };
    /**
     * Joins a new window from a given type to the activity
     *
     * @param activity      Activity to join the window to
     * @param window        The window to join
     * @param callback      (Optional) Result callback
     * @returns             Promise for ActivityWindow
     */
    ActivityManager.prototype.addWindowToActivity = function (activity, window, callback) {
        return undefined;
    };
    /**
     * Removes a window from the activity
     *
     * @param activity  Activity to remove the window from
     * @param           The window to remove
     * @param           (Optional) Result callback
     * @returns         Promise for ActivityWindow
     */
    ActivityManager.prototype.leaveWindowFromActivity = function (activity, window, callback) {
        return undefined;
    };
    /**
     * Replaces the activity context
     * @param activity  Activity
     * @param context   The new context
     * @param callback  (Optional) Result callback
     * @returns         Promise for Activity
     */
    ActivityManager.prototype.setActivityContext = function (activity, context, callback) {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            if (util.isUndefinedOrNull(activity)) {
                reject("activity can not be null");
            }
            _this._bridge
                .updateActivityContext(activity, context, true)
                .then(function (obj) {
                resolve(obj);
            })
                .catch(function (err) {
                reject(err);
            });
        });
        return promiseExtensions_1.nodeify(promise, callback);
    };
    /**
     * Updates activity context using the properties from  context argument.
     * If old context is {a:1, b:2, c:3} and invoking updateContext({b:3, c:null}) will result a context
     * be {a:1, b:3}
     *
     * @param activity
     * @param context
     */
    ActivityManager.prototype.updateActivityContext = function (activity, context, callback) {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            if (util.isUndefinedOrNull(activity)) {
                reject("activity can not be null");
            }
            var removedKeys = [];
            for (var key in context) {
                if (context.hasOwnProperty(key) && context[key] === null) {
                    removedKeys.push(key);
                }
            }
            _this._bridge
                .updateActivityContext(activity, context, false, removedKeys)
                .then(function (obj) {
                resolve(obj);
            })
                .catch(function (err) {
                reject(err);
            });
        });
        return promiseExtensions_1.nodeify(promise, callback);
    };
    /**
     * Subscribe for activity context update events
     *
     * @param activity  Activity
     * @param handler   Handler function that will receive context related events
     * @returns {}
     */
    ActivityManager.prototype.subscribeActivityContextChanged = function (handler) {
        this._activities.subscribe(function (act, context) {
            if (context.type === entityEvent_1.EntityEventType.ActivityContextChange) {
                // TODO: this is wrong and
                var updateContext = context;
                handler(act, updateContext.context, updateContext.updated, updateContext.removed);
            }
        });
    };
    /**
     * Stops an activity
     * @returns {}
     */
    ActivityManager.prototype.stopActivity = function (activity, callback) {
        var promise = this._bridge.stopActivity(activity);
        return promiseExtensions_1.nodeify(promise, callback);
    };
    /**
     * Returns activity windows based on some filter. If no filter supplied all activity windows are returned.
     * @param filter  Filter that
     * @returns Array of ActivityWindows that match the filter object
     */
    ActivityManager.prototype.getWindows = function (filter) {
        if (util.isUndefined(filter)) {
            return this._windows.get();
        }
        if (!util.isUndefined(filter.id)) {
            return [this._windows.getByName(filter.id)];
        }
        var allWindows = this._windows.get();
        return allWindows.filter(function (w) {
            if (!util.isUndefined(filter.type) && w.type.id !== filter.type) {
                return false;
            }
            if (!util.isUndefined(filter.name) && w.name !== filter.name) {
                return false;
            }
            if (!util.isUndefined(filter.activityId)) {
                if (util.isUndefinedOrNull(w.activity)) {
                    return false;
                }
                if (w.activity.id !== filter.activityId) {
                    return false;
                }
            }
            return true;
        });
    };
    /** Assigns a manager to a given ActivityEntity */
    ActivityManager.prototype._grabEntity = function (entity) {
        entity._manager = this;
    };
    ActivityManager.prototype._subscribeForData = function () {
        var _this = this;
        this._logger.debug("Start getting initial data...");
        // get & subscribe for activity types
        this._bridge.onActivityTypeStatusChange(function (event) {
            _this._activityTypes.process(event);
        });
        this._bridge.getActivityTypes()
            .then(function (at) {
            _this._activityTypes.add(at);
            _this._dataReadyMarker.signal("Got act types");
        })
            .catch(function (error) {
            _this._logger.error(error);
            _this._dataReadyMarker.error("Can not initialize ActivityManager - error getting activity types -" + error);
        });
        // get & subscribe for window types
        this._bridge.onWindowTypeStatusChange(function (event) {
            _this._windowTypes.process(event);
        });
        this._bridge.getWindowTypes()
            .then(function (wt) {
            _this._windowTypes.add(wt);
            _this._dataReadyMarker.signal("Got window types");
        })
            .catch(function (error) {
            _this._logger.error(error);
            _this._dataReadyMarker.error("Can not initialize ActivityManager - error getting window types  " + error);
        });
        // get & subscribe for activity instances
        this._bridge.onActivityStatusChange(function (event) {
            _this._activities.process(event);
        });
        this._bridge.getActivities()
            .then(function (ac) {
            _this._activities.add(ac);
            _this._dataReadyMarker.signal("Got activities");
        })
            .catch(function (error) {
            _this._logger.error(error);
            _this._dataReadyMarker.error("Can not initialize ActivityManager - error getting activity instances -" + error);
        });
        // get & subscribe for activity windows
        this._bridge.onActivityWindowChange(function (event) {
            _this._windows.process(event);
        });
        this._bridge.getActivityWindows()
            .then(function (aw) {
            _this._windows.add(aw);
            _this._dataReadyMarker.signal("Got windows");
        })
            .catch(function (error) {
            _this._logger.error(error);
            _this._dataReadyMarker.error("Can not initialize ActivityManager - error getting activity windows -" + error);
        });
    };
    ActivityManager.prototype.getWindowBounds = function (id) {
        return this._bridge.getWindowBounds(id);
    };
    ActivityManager.prototype.setWindowBounds = function (id, bounds, callback) {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            _this._bridge.setWindowBounds(id, bounds)
                .then(function () { return resolve(); })
                .catch(function (err) { return reject(err); });
        });
        return promiseExtensions_1.nodeify(promise, callback);
    };
    ActivityManager.prototype.closeWindow = function (id) {
        return this._bridge.closeWindow(id);
    };
    ActivityManager.prototype.activateWindow = function (id, focus) {
        return this._bridge.activateWindow(id, focus);
    };
    ActivityManager.prototype.setWindowVisibility = function (id, visible) {
        return this._bridge.setWindowVisibility(id, visible);
    };
    ActivityManager.prototype.clone = function (activity, cloneOptions, callback) {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            if (!activity) {
                reject('activity can not be null');
            }
            _this._bridge.cloneActivity(activity.id, cloneOptions)
                .then(function (activityId) {
                _this._activities
                    .getOrWait(activityId)
                    .then(function (act) {
                    resolve(act);
                })
                    .catch(function (err) { return reject(err); });
            })
                .catch(function (err) { return reject(err); });
        });
        return promiseExtensions_1.nodeify(promise, callback);
    };
    ActivityManager.prototype.attachActivities = function (from, to, tag, callback) {
        var _this = this;
        tag = tag || {};
        var promise = new Promise(function (resolve, reject) {
            var fromActivity = _this._activities.getByName(from);
            if (!fromActivity) {
                reject('can not find activity with id ' + from);
                return;
            }
            var toActivity = _this._activities.getByName(to);
            if (!toActivity) {
                reject('can not find activity with id ' + to);
                return;
            }
            return _this._bridge.attachActivities(from, to, tag)
                .then(function (data) {
                var newActId = data.to;
                var state = data.descriptor;
                var allStates = data.descriptors;
                _this._activities.getOrWait(newActId).then(function (act) {
                    act._updateDescriptors(allStates);
                    var stateWrapped = act.attached.filter(function (u) { return u.ownerId === state.ownerId; })[0];
                    resolve(stateWrapped);
                });
            })
                .catch(function (err) {
                reject(err);
            });
        });
        return promiseExtensions_1.nodeify(promise, callback);
    };
    ActivityManager.prototype.detachActivities = function (activityId, descriptor, callback) {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            return _this._bridge.detachActivities(activityId, descriptor)
                .then(function (params) {
                var oldActId = params.oldActivityId;
                var newActId = params.newActivityId;
                var descriptors = params.descriptors;
                _this._activities
                    .getOrWait(oldActId)
                    .then(function (oldAct) {
                    oldAct._updateDescriptors(descriptors);
                    _this._activities
                        .getOrWait(newActId)
                        .then(function (newAct) {
                        resolve(newAct);
                    });
                })
                    .catch(function (err) { return reject(err); });
            })
                .catch(function (err) {
                reject(err);
            });
        });
        return promiseExtensions_1.nodeify(promise, callback);
    };
    ActivityManager.prototype._handleActivitiesAttached = function (data) {
        var _this = this;
        var newActId = data.to;
        var descriptor = data.descriptor;
        var descriptors = data.descriptors;
        this._activities.getOrWait(newActId).then(function (act) {
            act._updateDescriptors(descriptors);
            var descriptorAsObjectFromAPI = act.attached.filter(function (u) { return u.ownerId === descriptor.ownerId; })[0];
            _this._attachedCallbacks.forEach(function (callback) {
                try {
                    callback(act, descriptorAsObjectFromAPI);
                }
                catch (err) { }
            });
        });
    };
    ActivityManager.prototype._handleActivitiesDetached = function (data) {
        var _this = this;
        var oldActId = data.oldActivityId;
        var newActId = data.newActivityId;
        var descriptors = data.descriptors;
        var descriptor = data.descriptor;
        this._activities.getOrWait(oldActId).then(function (oldAct) {
            oldAct._updateDescriptors(descriptors);
            _this._activities.getOrWait(newActId).then(function (newAct) {
                _this._detachedCallbacks.forEach(function (callback) {
                    try {
                        callback(newAct, oldAct, descriptor);
                    }
                    catch (err) {
                    }
                });
            });
        });
    };
    ActivityManager.prototype._handleActivityDescriptorsRefreshed = function (data) {
        var id = data.id;
        var descriptors = data.descriptors;
        var act = this._activities.getByName(id);
        if (act) {
            act._updateDescriptors(descriptors);
        }
    };
    ActivityManager.prototype.subscribeActivitiesAttached = function (callback) {
        this._attachedCallbacks.push(callback);
    };
    ActivityManager.prototype.subscribeActivitiesDetached = function (callback) {
        this._detachedCallbacks.push(callback);
    };
    ActivityManager.prototype.refreshDescriptors = function () {
        var _this = this;
        this._bridge.getAttachedDescriptors()
            .then(function (map) {
            // populate descriptors
            if (map) {
                Object.keys(map).forEach(function (key) {
                    var actId = key;
                    var descriptors = map[key];
                    var act = _this._activities.getByName(actId);
                    if (act) {
                        act._updateDescriptors(descriptors);
                    }
                });
            }
            _this._descriptorsMarker.signal("Successfully got descriptors");
        })
            .catch(function (err) {
            _this._descriptorsMarker.error('failed to get descriptors - ' + err);
        });
    };
    ActivityManager.prototype.subscribeActivityFrameColorChanged = function (callback) {
        this._frameColorChangesCallbacks.push(callback);
    };
    ActivityManager.prototype._handleWindowFrameColorChanged = function (win) {
        if (!win.activityId) {
            return;
        }
        var act = this._activities.getByName(win.activityId);
        if (!act) {
            return;
        }
        // notify for the owner only
        if (!act.owner) {
            return;
        }
        if (act.owner.underlyingWindow.id !== win.id) {
            return;
        }
        this._frameColorChangesCallbacks.forEach(function (callback) {
            try {
                callback(act, win.frameColor);
            }
            catch (e) { }
        });
    };
    return ActivityManager;
}());
exports.default = ActivityManager;
//# sourceMappingURL=activityManager.js.map

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var LocalWindowFactory = /** @class */ (function () {
    function LocalWindowFactory(createFunction, description) {
        this._createFunction = createFunction;
        this._description = description;
    }
    LocalWindowFactory.prototype.create = function (activityWindowId, context, layout) {
        return this._createFunction(activityWindowId, context, layout);
    };
    LocalWindowFactory.prototype.description = function () {
        return this._description;
    };
    return LocalWindowFactory;
}());
exports.LocalWindowFactory = LocalWindowFactory;
//# sourceMappingURL=localWindowFactory.js.map

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Revise this and REMOVE it if not needed - the idea is that provides access to specific window factory
 * @private
 */
var ProxyWindowFactory = /** @class */ (function () {
    function ProxyWindowFactory(description) {
        this._description = description;
    }
    ProxyWindowFactory.prototype.create = function (activityWindowId, context) {
        // not implemented  - we don't need that at the moment
        return undefined;
    };
    ProxyWindowFactory.prototype.description = function () {
        return this._description;
    };
    return ProxyWindowFactory;
}());
exports.ProxyWindowFactory = ProxyWindowFactory;
//# sourceMappingURL=proxyWindowFactory.js.map

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var activityEntity_1 = __webpack_require__(3);
var activityAGM_1 = __webpack_require__(4);
var attachedActivityDescriptor_1 = __webpack_require__(23);
var promiseExtensions_1 = __webpack_require__(5);
/**
 * Activity is an instance of an activity type just like an object is an instance of a class
 * in class-based languages (and just like ‘John’ is an instance of a 'Person’).
 *
 * Activity is often used as a synonym for activity instance.
 *
 * Each activity instance has a single owner window and can optionally have one or more helper windows.
 *
 * @module activity
 */
var Activity = /** @class */ (function (_super) {
    __extends(Activity, _super);
    function Activity(id, actType, status, context, ownerId) {
        var _this = _super.call(this, id) || this;
        _this._id = id;
        _this._actType = actType;
        _this._status = status;
        _this._context = context;
        _this._ownerId = ownerId;
        _this._agm = new activityAGM_1.ActivityAGM(_this);
        return _this;
    }
    Object.defineProperty(Activity.prototype, "type", {
        /**
         * Activity type
         * @var {module:activityType} type
         */
        get: function () {
            if (this._manager) {
                return this._manager.getActivityType(this._actType);
            }
            return undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Activity.prototype, "context", {
        /**
         * Get current activity context. To update use updateContext , to replace setContext
         * @var {Object} context
         */
        get: function () {
            return this._context;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Activity.prototype, "status", {
        /**
         * Get activity status
         * @var {activityStatus} status
         */
        get: function () {
            return this._status;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Activity.prototype, "owner", {
        /**
         * The owner window
         * @var {module:activityWindow} owner
         */
        get: function () {
            if (!this._ownerId) {
                return null;
            }
            return this._manager.getWindows({ id: this._ownerId })[0];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Activity.prototype, "windows", {
        /**
         * All windows participating in the activity
         * @var {module:activityWindow[]} windows
         */
        get: function () {
            return this._manager.getWindows({ activityId: this._id });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Activity.prototype, "agm", {
        /**
         * @var {module:activityAGM} agm
         */
        get: function () {
            return this._agm;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Joins a specific window to the activity
     *
     * @private
     * @function join
     * @param window    The window to join
     * @param callback  (Optional) Result callback
     * @returns         Promise for ActivityWindow
     */
    Activity.prototype.addWindow = function (window, callback) {
        return this._manager.addWindowToActivity(this, window, callback);
    };
    /**
     * Creates a new window and joins it to the activity
     *
     * @function createWindow
     * @param {string|windowDefinition} windowType The type of the window to be created
     * @returns {Promise<module:activityWindow>}
     */
    Activity.prototype.createWindow = function (windowType, callback) {
        return this._manager.createWindow(this, windowType, callback);
    };
    /**
     * Creates a stacked set of windows and joins them to the
     *
     * @function createStackedWindows
     * @param {string[] | windowDefinition[]} windowTypes The types of the windows to be created
     * @param {number} timeout
     * @returns {Promise<module:activityWindow[]>}
     */
    Activity.prototype.createStackedWindows = function (windowTypes, timeout, callback) {
        return this._manager.createStackedWindows(this, windowTypes, timeout, callback);
    };
    /**
     * Removes a window from the activity
   *
   * @private
     * @param window
     * @param callback
     * @returns     Promise for ActivityWindow
     */
    Activity.prototype.leave = function (window, callback) {
        return this._manager.leaveWindowFromActivity(this, window, callback);
    };
    /**
     * Get all windows participating in the activity from a given type
     *
     * @param {string} windowType
     * @returns {module:activityWindow[]}
     */
    Activity.prototype.getWindowsByType = function (windowType) {
        var filter = { activityId: this._id, type: windowType };
        return this._manager.getWindows(filter);
    };
    /**
     * Replaces the activity context with a new one.
     *
     * @function setContext
     * @param {Object} context   The new context
     * @returns {Promise<Object>}
     */
    Activity.prototype.setContext = function (context, callback) {
        return this._manager.setActivityContext(this, context, callback);
    };
    /**
     * Updates activity context using the properties from the context argument.
     * If old context is {a:1, b:2, c:3} and invoking updateContext({b:3, c:null}) will result a context
     * be {a:1, b:3}
     *
     * @function updateContext
     * @param {Object} context
     * @return {Promise<Object>}
     */
    Activity.prototype.updateContext = function (context, callback) {
        return this._manager.updateActivityContext(this, context, callback);
    };
    /**
     * Subscribe for status change events
     *
     * @function onStatusChange
     *
     * @param {activityStatusChangeHandler} handler Handler function that will receive status notifications
     */
    Activity.prototype.onStatusChange = function (handler) {
        var _this = this;
        this._manager.subscribeActivityEvents(function (a, ns, os) {
            if (a.id === _this.id) {
                handler(a, ns, os);
            }
        });
    };
    /**
     * Subscribe for window related events, like joined, removed from activity
     *
     * @function onWindowEvent
     * @param {windowEventHandler} handler Handler function that will receive windows events
     */
    Activity.prototype.onWindowEvent = function (handler) {
        var _this = this;
        this._manager.subscribeWindowEvents(function (a, w, e) {
            if (a.id === _this.id) {
                handler(a, w, e);
            }
        });
    };
    /**
     * Subscribe for context updates
     *
     * @function onContextChanged
     * @param {contextChangedHandler} handler Handler function that will receive context related events
     */
    Activity.prototype.onContextChanged = function (handler) {
        var _this = this;
        this._manager.subscribeActivityContextChanged(function (act, context, delta, removed) {
            if (act.id === _this.id) {
                handler(context, delta, removed, act);
            }
        });
        try {
            // replay the context at the time of subscribing, swallow user exceptions
            handler(this.context, this.context, [], this);
        }
        catch (e) { }
    };
    /**
     * Stops the activity
     * @function stop
     */
    Activity.prototype.stop = function () {
        this._manager.stopActivity(this);
    };
    /**
     * Clones the activity into a new one
     * @function clone
     * @param {CloneOptions} options
     */
    Activity.prototype.clone = function (options) {
        return this._manager.clone(this, options);
    };
    Activity.prototype.attach = function (activity, tag) {
        var activityId;
        if (typeof activity === 'string') {
            activityId = activity;
        }
        else {
            activityId = activity.id;
        }
        return this._manager.attachActivities(activityId, this.id, tag);
    };
    Activity.prototype.onActivityAttached = function (callback) {
        var _this = this;
        this._manager.subscribeActivitiesAttached(function (newActId, oldActId, descriptor) {
            if (newActId !== _this._id) {
                return;
            }
            callback(descriptor);
        });
    };
    Activity.prototype.onDetached = function (callback) {
        var _this = this;
        this._manager.subscribeActivitiesDetached(function (newAct, originalActivity, state) {
            if (originalActivity.id !== _this._id) {
                return;
            }
            callback(newAct, state);
        });
    };
    Activity.prototype._updateCore = function (activity) {
        _super.prototype._updateCore.call(this, activity);
        this._actType = activity._actType;
        this._context = activity._context;
        this._status = activity._status;
        this._ownerId = activity._ownerId;
    };
    Activity.prototype._updateDescriptors = function (allStates) {
        var _this = this;
        this._attached = allStates.map(function (s) {
            return new attachedActivityDescriptor_1.AttachedActivityDescriptor(_this._manager, _this._id, s);
        });
    };
    Object.defineProperty(Activity.prototype, "attached", {
        get: function () {
            return this._attached;
        },
        enumerable: true,
        configurable: true
    });
    Activity.prototype.setFrameColor = function (color, callback) {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            var callbacksToWait = _this.windows.length;
            if (callbacksToWait === 0) {
                resolve(_this);
            }
            _this.windows.forEach(function (w) {
                w.underlyingWindow.setFrameColor(color, function () {
                    callbacksToWait--;
                    if (callbacksToWait <= 0) {
                        resolve(_this);
                    }
                });
            });
            setTimeout(function () {
                if (callbacksToWait > 0) {
                    reject(_this.id + ' - timed out waiting for setFrameColor with' + color);
                }
            }, 5000);
        });
        return promiseExtensions_1.nodeify(promise, callback);
    };
    Activity.prototype.getFrameColor = function () {
        if (!this.windows || this.windows.length == 0) {
            return '';
        }
        return this.windows[0].underlyingWindow.frameColor;
    };
    return Activity;
}(activityEntity_1.default));
exports.default = Activity;
//# sourceMappingURL=activity.js.map

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var activityEntity_1 = __webpack_require__(3);
var logger_1 = __webpack_require__(1);
var util = __webpack_require__(0);
/**
* A window participating in an activity
 *
 * @module activityWindow
*/
var ActivityWindow = /** @class */ (function (_super) {
    __extends(ActivityWindow, _super);
    function ActivityWindow(id, name, type, activityId, instance, isIndependent, windowGetter, hcWindowId) {
        var _this = _super.call(this, id) || this;
        _this._logger = logger_1.Logger.Get(_this);
        _this._type = type;
        _this._activityId = activityId;
        _this._name = name;
        _this._instance = instance;
        _this._isIndependent = isIndependent;
        _this._windowGetter = windowGetter;
        _this._hcWindowId = hcWindowId;
        return _this;
    }
    /**
     * Return window's title
     * @function getBounds
     * @return {Promise<WindowBounds>}
     */
    ActivityWindow.prototype.getBounds = function () {
        return this._manager.getWindowBounds(this.id);
    };
    Object.defineProperty(ActivityWindow.prototype, "name", {
        /**
         * @var {string} name The window name
         */
        get: function () {
            return this._name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ActivityWindow.prototype, "isIndependent", {
        /**
         * @var {bool} isIndependent True if this is an independent window
         */
        get: function () {
            return this._isIndependent;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ActivityWindow.prototype, "type", {
        /**
         * @var {module:windowType} type The window type
         */
        get: function () {
            if (this._manager) {
                return this._manager.getWindowType(this._type);
            }
            return undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ActivityWindow.prototype, "activity", {
        /**
         * @var {module:activity} activity The activity that the window is part of
         */
        get: function () {
            if (util.isUndefined(this._activityId)) {
                return undefined;
            }
            return this._manager.getActivityById(this._activityId);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ActivityWindow.prototype, "isOwner", {
        /**
         * @var {bool} isOwner True if the window is the owner of the activity.
         */
        get: function () {
            var act = this.activity;
            if (util.isUndefined(act)) {
                return false;
            }
            return act.owner.id === this.id;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Sets window's visibility
     *
     * @function setVisible
     * @param {boolean} isVisible
     * @returns {Promise<module:activityWindow>}
     */
    ActivityWindow.prototype.setVisible = function (isVisible, callback) {
        return this._manager.setWindowVisibility(this.id, isVisible);
    };
    /**
     * Activate window
     * @function activate
     * @param {boolean} focus If true then activate window with focus otherwise activate window without focus
     */
    ActivityWindow.prototype.activate = function (focus) {
        return this._manager.activateWindow(this.id, focus);
    };
    /**
     * Sets window's bounds
     * @function setBounds
     *
     * @param {bounds} bounds The new bounds to be applied
     * @returns  {Promise<module:activityWindow>}
     */
    ActivityWindow.prototype.setBounds = function (bounds, callback) {
        return this._manager.setWindowBounds(this.id, bounds, callback);
    };
    /**
     * Closes the window
     *
     * @function close
     * @returns {Promise}
     */
    ActivityWindow.prototype.close = function () {
        return this._manager.closeWindow(this.id);
    };
    Object.defineProperty(ActivityWindow.prototype, "instance", {
        /**
         * @var {agmInstance} instance The agm instance of that window. You can use this to invoke AGM methods against that window
         */
        get: function () {
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ActivityWindow.prototype, "underlyingWindow", {
        /**
         * Returns the window as object from Windows API (glue.windows).
         *
         * @var {window} underlyingWindow
         */
        get: function () {
            var window = this._windowGetter();
            if (!window) {
                // we don't have the window object any more, let's return as much as we can
                return {
                    id: this._hcWindowId
                };
            }
            return window;
        },
        enumerable: true,
        configurable: true
    });
    ActivityWindow.prototype.onActivityJoined = function (callback) {
        this._subscribeForActivityWindowEvent("joined", callback);
    };
    ActivityWindow.prototype.onActivityRemoved = function (callback) {
        this._subscribeForActivityWindowEvent("removed", callback);
    };
    ActivityWindow.prototype._updateCore = function (other) {
        this._activityId = other._activityId;
        this._isIndependent = other._isIndependent;
        if (!util.isUndefinedOrNull(other._instance)) {
            this._instance = other._instance;
        }
    };
    ActivityWindow.prototype._subscribeForActivityWindowEvent = function (eventName, callback) {
        var _this = this;
        this._manager.subscribeWindowEvents(function (activity, window, event) {
            // ignore events not related to this window
            if (window.id !== _this.id) {
                return;
            }
            if (event === eventName) {
                callback(activity);
            }
        });
    };
    ActivityWindow.prototype._beforeDelete = function (other) {
        this._hcWindowId = other._hcWindowId;
    };
    return ActivityWindow;
}(activityEntity_1.default));
exports.default = ActivityWindow;
//# sourceMappingURL=activityWindow.js.map

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var AttachedActivityDescriptor = /** @class */ (function () {
    function AttachedActivityDescriptor(manager, id, state) {
        this._manager = manager;
        this._ownerActivityId = id;
        this._state = state;
    }
    Object.defineProperty(AttachedActivityDescriptor.prototype, "ownerId", {
        get: function () {
            return this._state.ownerId;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AttachedActivityDescriptor.prototype, "windowIds", {
        get: function () {
            return this._state.windowIds;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AttachedActivityDescriptor.prototype, "frameColor", {
        get: function () {
            return this._state.frameColor;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AttachedActivityDescriptor.prototype, "context", {
        get: function () {
            return this._state.context;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AttachedActivityDescriptor.prototype, "tag", {
        get: function () {
            return this._state.tag;
        },
        enumerable: true,
        configurable: true
    });
    AttachedActivityDescriptor.prototype.detach = function (descriptor) {
        var _this = this;
        descriptor = descriptor || {};
        var merged = {};
        Object.keys(this._state).forEach(function (prop) {
            merged[prop] = _this._state[prop];
        });
        merged.context = descriptor.context || merged.context;
        merged.frameColor = descriptor.frameColor || merged.frameColor;
        return this._manager.detachActivities(this._ownerActivityId, merged);
    };
    return AttachedActivityDescriptor;
}());
exports.AttachedActivityDescriptor = AttachedActivityDescriptor;
//# sourceMappingURL=attachedActivityDescriptor.js.map

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var activityEntity_1 = __webpack_require__(3);
/**
 * A window type is a definition of a window, typically configured in ACS.
 *
 * @module windowType
 */
var WindowType = /** @class */ (function (_super) {
    __extends(WindowType, _super);
    function WindowType(name, appByWindowTypeGetter) {
        var _this = _super.call(this, name) || this;
        _this._name = name;
        _this._appByWindowTypeGetter = appByWindowTypeGetter;
        return _this;
    }
    Object.defineProperty(WindowType.prototype, "name", {
        /**
         * Name of the window type
         * @var {string} name
         */
        get: function () {
            return this._name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WindowType.prototype, "config", {
        /**
         * Returns the ACS configuration related to this window type (as application object from AppManager API)
         * @returns {any}
         */
        get: function () {
            return this._appByWindowTypeGetter(this._name);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WindowType.prototype, "windows", {
        /**
         * @var {activityWindow[]} windows All windows from that type
         */
        get: function () {
            return this._manager.getWindows({ type: this._name });
        },
        enumerable: true,
        configurable: true
    });
    return WindowType;
}(activityEntity_1.default));
exports.default = WindowType;
//# sourceMappingURL=windowType.js.map

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var entityEvent_1 = __webpack_require__(2);
/**
 * Collection of ActivityEntities that provides change notifications
 * @module entityCollection
 * @private
 */
var EntityObservableCollection = /** @class */ (function () {
    function EntityObservableCollection(processNew) {
        this._items = {};
        this._listeners = [];
        this._processNew = processNew;
    }
    /**
     * Adds one item to the collection
     */
    EntityObservableCollection.prototype.addOne = function (item) {
        this.add([item]);
    };
    /**
     * Adds an array of items to the collection
     */
    EntityObservableCollection.prototype.add = function (items) {
        for (var index = 0; index < items.length; index++) {
            var element = items[index];
            this.process(new entityEvent_1.EntityEvent(element, new entityEvent_1.EntityEventContext(entityEvent_1.EntityEventType.Added)));
        }
    };
    /**
     * Process existing EntityEvent
     */
    EntityObservableCollection.prototype.process = function (event) {
        var context = event.context;
        var type = context.type;
        var entity = event.entity;
        // update internal collections (adding the entity or updating existing entity). From that
        // point start using the internalEntity
        var internalEntity = this._updateInternalCollections(entity, type);
        this._notifyListeners(internalEntity, context);
    };
    /**
     * Gets all items from the collection.
     */
    EntityObservableCollection.prototype.get = function () {
        var result = [];
        for (var key in this._items) {
            if (this._items.hasOwnProperty(key)) {
                var element = this._items[key];
                result.push(element);
            }
        }
        return result;
    };
    /**
     * Gets item by name
     * @param name  Name of the item to get
     * @returns     Item if found; undefined if not
     */
    EntityObservableCollection.prototype.getByName = function (name) {
        // this does not work for some reason
        // return this._items[name];
        for (var key in this._items) {
            if (key === name) {
                return this._items[key];
            }
        }
        return undefined;
    };
    /**
     * Gets a item if in the collection or waits for it to appear
     * @param name
     * @returns {Promise<T>}
   */
    EntityObservableCollection.prototype.getOrWait = function (name) {
        var _this = this;
        return new Promise(function (resolve) {
            var entityAddedHandler = function (entity) {
                if (entity.id !== name) {
                    return;
                }
                resolve(entity);
                _this.unsubscribe(entityAddedHandler);
            };
            _this.subscribe(entityAddedHandler);
            // try to get right away - if not here wait for it to appear
            var window = _this.getByName(name);
            if (window) {
                resolve(window);
                return;
            }
        });
    };
    /**
     * Subscribes a listener for changes
     * @param handler Callback for changes
     */
    EntityObservableCollection.prototype.subscribe = function (handler) {
        this._listeners.push(handler);
        // replay existing items for new subscribers
        for (var key in this._items) {
            var element = this._items[key];
            handler(element, new entityEvent_1.EntityEventContext(entityEvent_1.EntityEventType.Added.toString()));
        }
    };
    /** Unsubscribes a listener */
    EntityObservableCollection.prototype.unsubscribe = function (handler) {
        var index = this._listeners.indexOf(handler);
        if (index != -1) {
            this._listeners.splice(index, 1);
        }
    };
    /**
     * Notify all listeners for some event
     */
    EntityObservableCollection.prototype._notifyListeners = function (entity, context) {
        for (var index = 0; index < this._listeners.length; index++) {
            var listener = this._listeners[index];
            try {
                listener(entity, context);
            }
            catch (e) { }
        }
    };
    /**
     * Update internal collections (usually after some kind of modification event has arrived)
     * */
    EntityObservableCollection.prototype._updateInternalCollections = function (entity, type) {
        var entityAsAny = entity;
        // TODO - refactor - currently we apply some rules for each type
        var isActivityDestroy = (type === entityEvent_1.EntityEventType.StatusChange && entityAsAny.status && entityAsAny.status.state === 'destroyed');
        // windows have two states - removed from activity and closed (TODO: this only works in GD 2.1 and later)
        var isWindowClose = type === entityEvent_1.EntityEventType.Closed;
        var isTypeRemove = type === entityEvent_1.EntityEventType.Removed && typeof entityAsAny.isIndependent == 'undefined';
        if (isTypeRemove || isWindowClose || isActivityDestroy) {
            var oldEntity = this._items[entity.id];
            delete this._items[entity.id];
            // on remove return the input entity
            this._processNew(entity);
            if (oldEntity) {
                entity._beforeDelete(oldEntity);
            }
            return entity;
        }
        else {
            var key = entity.id;
            // if new object add, otherwise clone object properties
            if (!this._items.hasOwnProperty(key)) {
                this._processNew(entity);
                this._items[entity.id] = entity;
            }
            else {
                this._items[entity.id]._update(entity);
            }
        }
        return this._items[entity.id];
    };
    return EntityObservableCollection;
}());
exports.EntityObservableCollection = EntityObservableCollection;
//# sourceMappingURL=entityObservableCollection.js.map

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

(function webpackUniversalModuleDefinition(root, factory) {
	if(true)
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("tick42-app-manager", [], factory);
	else if(typeof exports === 'object')
		exports["tick42-app-manager"] = factory();
	else
		root["tick42-app-manager"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 12);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.ShutdownMethodName = "T42.ACS.Shutdown";
exports.FeedackMethodName = "T42.ACS.Feedback";
exports.GetConfigurationRegionMethodName = "T42.ACS.GetConfigurationRegion";
exports.SetConfigurationRegionMethodName = "T42.ACS.SetConfigurationRegion";
exports.GetUserMethodName = "T42.ACS.GetUser";
exports.GetBranchesMethodName = "T42.ACS.GetBranches";
exports.GetCurrentBranchMethodName = "T42.ACS.GetCurrentBranch";
exports.SetCurrentBranchMethodName = "T42.ACS.SetCurrentBranch";
exports.GetFunctionalEntitlementMethodName = "T42.ACS.GetFunctionalEntitlement";
exports.CanIMethodName = "T42.ACS.CanI";
exports.StartApplicationMethodName = "T42.ACS.StartApplication";
exports.StopApplicationMethodName = "T42.ACS.StopApplication";
exports.ActivateApplicationMethodName = "T42.ACS.ActivateApplication";
exports.RunApplicationMethodName = "T42.ACS.RunApplication";
exports.OnEventMethodName = "T42.ACS.OnEvent";
exports.GetApplicationsMethodName = "T42.ACS.GetApplications";
//# sourceMappingURL=agm-names.js.map

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function createRegistry() {
    var callbacks = {};
    function add(key, callback) {
        var callbacksForKey = callbacks[key];
        if (!callbacksForKey) {
            callbacksForKey = [];
            callbacks[key] = callbacksForKey;
        }
        callbacksForKey.push(callback);
        return function () {
            var allForKey = callbacks[key];
            if (!allForKey) {
                return;
            }
            allForKey = allForKey.filter(function (item) {
                return item !== callback;
            });
            callbacks[key] = allForKey;
        };
    }
    function execute(key) {
        var argumentsArr = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            argumentsArr[_i - 1] = arguments[_i];
        }
        var callbacksForKey = callbacks[key];
        if (!callbacksForKey || callbacksForKey.length === 0) {
            return [];
        }
        var results = [];
        callbacksForKey.forEach(function (callback) {
            try {
                var result = callback.apply(undefined, argumentsArr);
                results.push(result);
            }
            catch (err) {
                results.push(undefined);
            }
        });
        return results;
    }
    function clear() {
        callbacks = {};
    }
    return {
        add: add,
        execute: execute,
        clear: clear
    };
}
;
createRegistry.default = createRegistry;
module.exports = createRegistry;
//# sourceMappingURL=index.js.map

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = {
	"name": "tick42-app-manager",
	"version": "3.6.10",
	"description": "A library for interacting with the Glue ACS via agm methods.",
	"main": "dist/node/tick42-app-manager.js",
	"browser": "dist/web/tick42-app-manager.js",
	"types": "types/index.d.ts",
	"docName": "Applications",
	"scripts": {
		"clean": "node ./build/scripts/clean.js",
		"pre:build": "npm run tslint && tsc && set NODE_ENV=development && npm run clean",
		"file-versionify": "node ./build/scripts/file-versionify.js",
		"tslint": "tslint -t codeFrame ./src/**/*.ts",
		"tslint:fix": "tslint -t codeFrame --fix ./src/**/*.ts",
		"watch": "onchange ./src/**/*.ts -- npm run build:dev",
		"build:dev": "npm run pre:build && set NODE_ENV=development && webpack && npm run file-versionify && npm run types",
		"build:prod": "npm run pre:build && set NODE_ENV=development && webpack && set NODE_ENV=production && webpack && npm run file-versionify && npm run types",
		"docs": "typedoc --options typedoc.json ./src",
		"types": "node ./build/scripts/copy-types.js",
		"types:merged": "dts-generator --project ./ --out ./types/index.d.ts",
		"prepublish": "npm run build:prod"
	},
	"author": "Tick42",
	"license": "ISC",
	"precommit": "tslint",
	"devDependencies": {
		"@types/node": "^8.0.26",
		"dts-generator": "^2.1.0",
		"http-server": "^0.9.0",
		"json-loader": "^0.5.4",
		"onchange": "3.*",
		"pre-commit": "^1.1.3",
		"shelljs": "^0.6.0",
		"tick42-activity": "^2.12.4",
		"tick42-agm": "^3.5.17",
		"tick42-gateway-connection": "^2.2.14",
		"tick42-logger": "^3.0.8",
		"tick42-webpack-config": "4.1.6",
		"tick42-windows": "3.3.7",
		"tslint": "5.*",
		"typedoc": "^0.5.10",
		"typescript": "2.4.2",
		"webpack": "2.3.3"
	},
	"dependencies": {
		"callback-registry": "^2.3.1",
		"tick42-promisify": "1.0.3"
	}
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function objectValues(source) {
    if (!source) {
        return [];
    }
    return Object.keys(source).map(function (key) { return source[key]; });
}
exports.objectValues = objectValues;
function objectClone(obj) {
    var result;
    try {
        result = JSON.parse(JSON.stringify(obj || {}));
    }
    catch (error) {
        result = {};
    }
    return result;
}
exports.objectClone = objectClone;
//# sourceMappingURL=helper.js.map

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var application_1 = __webpack_require__(9);
var callback_registry_1 = __webpack_require__(1);
var instance_1 = __webpack_require__(11);
var AppManagerImpl = (function () {
    function AppManagerImpl(_agm, _activities, _windows, _logger) {
        var _this = this;
        this._agm = _agm;
        this._activities = _activities;
        this._windows = _windows;
        this._logger = _logger;
        this._apps = {};
        this._instances = [];
        this._registry = callback_registry_1.default();
        this.application = function (name) {
            return _this._apps[name];
        };
        this.applications = function () {
            return Object.keys(_this._apps).map(function (k) { return _this._apps[k]; });
        };
        this.instances = function () {
            return _this._instances;
        };
        this.getMyInstance = function () {
            if (typeof gd !== "undefined") {
                // GD3 check
                var instanceId_1 = gd.appInstanceId;
                return _this._instances.filter(function (i) { return i.id === instanceId_1; })[0];
            }
            if (typeof htmlContainer !== "undefined") {
                var myWindowId_1 = htmlContainer.windowId;
                var matchingInstances = _this._instances.filter(function (i) { return i.id === myWindowId_1; });
                if (matchingInstances.length < 2) {
                    return matchingInstances[0];
                }
                // If we have two matches - this can happen only when asking for the window
                // of activity owner - so return the instance that is not activity instance
                return matchingInstances.filter(function (i) { return !i.isActivityInstance; })[0];
            }
            return undefined;
        };
        this.handleAppAdded = function (props) {
            var id = _this._getAppId(props);
            _this._logger.trace("adding app " + id);
            _this._apps[id] = new application_1.default(_this, id, _this._agm);
            var app = _this._updateAppFromProps(props);
            _this._registry.execute("appAdded", app);
        };
        this.handleAppUpdated = function (props) {
            // TODO: check side effects, is this._apps updated?
            var app = _this._updateAppFromProps(props);
            _this._registry.execute("appChanged", app);
        };
        this.handleAppRemoved = function (props) {
            var id = _this._getAppId(props);
            _this._logger.trace("removing app " + id);
            var app = _this.application(id);
            // remove all instances related to the app
            _this._instances = _this._instances.filter(function (i) { return i.application.name !== app.name; });
            delete _this._apps[id];
            _this._registry.execute("appRemoved", app);
        };
        this.handleAppReady = function (props) {
            var id = _this._getAppId(props);
            var app = _this._getAppOrThrow(id);
            app.updateFromProps(props);
            if (app.available) {
                _this._registry.execute("appAvailable", app);
            }
            else {
                _this._registry.execute("appUnavailable", app);
            }
        };
        this.handleInstanceStarted = function (props) {
            _this._logger.trace("started app " + props.Name + " " + props.Id);
            var id = _this._getInstanceId(props);
            var app = _this.application(_this._getInstanceAppName(props));
            var instance = new instance_1.default(id, app, _this, _this._agm, _this._activities, _this._windows);
            _this._updateInstanceFromProps(instance, props);
            _this._instances.push(instance);
            _this._registry.execute("instanceStarted", instance);
        };
        this.handleInstanceStopped = function (props) {
            _this._logger.trace("failed to start app " + props.Name + " " + props.Id);
            var id = _this._getInstanceId(props);
            var appName = _this._getInstanceAppName(props);
            var instance = _this._getInstanceOrThrow(id, appName);
            _this._instances = _this._instances.filter(function (i) { return !_this._matchInstance(i, id, appName); });
            _this._registry.execute("instanceStopped", instance);
        };
        this.handleInstanceAgmServerReady = function (props) {
            var id = _this._getInstanceId(props);
            var appName = _this._getInstanceAppName(props);
            var instance = _this._getInstanceOrThrow(id, appName);
            instance.updateAgmInstanceFromProps(props);
            _this._registry.execute("instanceAgmServerReady", instance);
        };
        this.handleInstanceStartFailed = function (props) {
            var id = _this._getInstanceId(props);
            var app = _this.application(_this._getInstanceAppName(props));
            var startFailed = true;
            var instance = new instance_1.default(id, app, undefined, undefined, undefined, undefined, startFailed);
            _this._updateInstanceFromProps(instance, props);
            _this._registry.execute("instanceStartFailed", instance);
        };
        this.handleInstanceUpdated = function (props) {
            var id = _this._getInstanceId(props);
            var app = _this._getInstanceAppName(props);
            var instance = _this._getInstanceOrThrow(id, app);
            _this._updateInstanceFromProps(instance, props);
        };
        /** Event subscription methods */
        this.onInstanceStarted = function (callback) {
            _this._replay(_this._instances, callback);
            return _this._registry.add("instanceStarted", callback);
        };
        this.onInstanceStartFailed = function (callback) {
            return _this._registry.add("instanceStartFailed", callback);
        };
        this.onInstanceStopped = function (callback) {
            return _this._registry.add("instanceStopped", callback);
        };
        this.onInstanceUpdated = function (callback) {
            return _this._registry.add("instanceChanged", callback);
        };
        this.onInstanceAgmServerReady = function (callback) {
            return _this._registry.add("instanceAgmServerReady", callback);
        };
        this.onAppAdded = function (callback) {
            _this._replay(_this._apps, callback);
            return _this._registry.add("appAdded", callback);
        };
        this.onAppRemoved = function (callback) {
            return _this._registry.add("appRemoved", callback);
        };
        this.onAppAvailable = function (callback) {
            return _this._registry.add("appAvailable", callback);
        };
        this.onAppUnavailable = function (callback) {
            return _this._registry.add("appUnavailable", callback);
        };
        this.onAppChanged = function (callback) {
            return _this._registry.add("appChanged", callback);
        };
        //
    }
    AppManagerImpl.prototype._getAppOrThrow = function (id) {
        var result = this.application(id);
        if (!result) {
            throw Error("app with id " + id + " not found");
        }
        return result;
    };
    AppManagerImpl.prototype._getAppId = function (props) {
        return props.Name;
    };
    AppManagerImpl.prototype._matchInstance = function (instance, id, appName) {
        return instance.id === id && instance.application.name === appName;
    };
    AppManagerImpl.prototype._getInstanceByIdAndName = function (id, appName) {
        var _this = this;
        return this._instances.filter(function (i) { return _this._matchInstance(i, id, appName); })[0];
    };
    AppManagerImpl.prototype._getInstanceOrThrow = function (id, appName) {
        var result = this._getInstanceByIdAndName(id, appName);
        if (!result) {
            throw Error("instance with id " + id + " not found");
        }
        return result;
    };
    AppManagerImpl.prototype._getInstanceId = function (props) {
        return props.Id;
    };
    AppManagerImpl.prototype._getInstanceAppName = function (props) {
        return props.Name;
    };
    AppManagerImpl.prototype._updateAppFromProps = function (props) {
        var id = this._getAppId(props);
        this._logger.trace("updating app with  + " + id + ", " + props);
        var app = this._getAppOrThrow(id);
        app.updateFromProps(props);
        return app;
    };
    AppManagerImpl.prototype._updateInstanceFromProps = function (instance, props) {
        this._logger.trace("updating instance with " + this._getInstanceId(props) + " for app " + this._getInstanceAppName(props));
        instance.updateFromProps(props);
    };
    AppManagerImpl.prototype._replay = function (itemsToReplay, callback) {
        if (itemsToReplay) {
            // if not array transform to array using Object.values
            if (Array.isArray(itemsToReplay)) {
                itemsToReplay.forEach(function (item) { return callback(item); });
            }
            else {
                var itemsToReplayArr = Object.keys(itemsToReplay).map(function (key) { return itemsToReplay[key]; });
                itemsToReplayArr.forEach(function (item) { return callback(item); });
            }
        }
    };
    return AppManagerImpl;
}());
exports.default = AppManagerImpl;
//# sourceMappingURL=app-manager.js.map

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var AgmNames = __webpack_require__(0);
var EventNames = __webpack_require__(10);
var helper_1 = __webpack_require__(3);
/** Subscribe for the AGM stream published by ACS and distributes events to applications and instances components */
function createDataSubscription(agm, applications, entitlements, skipIcons) {
    var subscription;
    var start = function () {
        var resolveFunc;
        var rejectFunc;
        var resultPromise = new Promise(function (resolve, reject) {
            resolveFunc = resolve;
            rejectFunc = reject;
        });
        agm.subscribe(AgmNames.OnEventMethodName, { arguments: { skipIcon: skipIcons }, waitTimeoutMs: 10000 })
            .then(function (s) {
            subscription = s;
            subscription.onData(function (streamData) {
                var events = streamData.data;
                helper_1.objectValues(events[EventNames.OnApplicationAddedEvent])
                    .map(function (item) { return applications.handleAppAdded(item); });
                helper_1.objectValues(events[EventNames.OnApplicationChangedEvent])
                    .map(function (item) { return applications.handleAppUpdated(item); });
                helper_1.objectValues(events[EventNames.OnApplicationRemovedEvent])
                    .map(function (item) { return applications.handleAppRemoved(item); });
                helper_1.objectValues(events[EventNames.OnApplicationReadyEvent])
                    .map(function (item) { return applications.handleAppReady(item); });
                helper_1.objectValues(events[EventNames.OnApplicationStartedEvent])
                    .map(function (item) { return applications.handleInstanceStarted(item); });
                helper_1.objectValues(events[EventNames.OnApplicationStartFailedEvent])
                    .map(function (item) { return applications.handleInstanceStartFailed(item); });
                helper_1.objectValues(events[EventNames.OnApplicationStoppedEvent])
                    .map(function (item) { return applications.handleInstanceStopped(item); });
                helper_1.objectValues(events[EventNames.OnApplicationUpdatedEvent])
                    .map(function (item) { return applications.handleInstanceUpdated(item); });
                helper_1.objectValues(events[EventNames.OnApplicationAgmServerReadyEvent])
                    .map(function (item) { return applications.handleInstanceAgmServerReady(item); });
                helper_1.objectValues(events[EventNames.OnBranchChangedEvent])
                    .map(function (item) { return entitlements.handleBranchModified(item); });
                helper_1.objectValues(events[EventNames.OnBranchesModifiedEvent])
                    .map(function (item) { return entitlements.handleBranchesModified(item); });
                resolveFunc();
            });
            subscription.onFailed(function (err) { return rejectFunc(err); });
        })
            .catch(function (err) { return rejectFunc("Error subscribing for " + AgmNames.OnEventMethodName + " stream. Err: " + err); });
        return resultPromise;
    };
    var stop = function () {
        if (subscription) {
            subscription.close();
        }
    };
    return {
        start: start,
        stop: stop
    };
}
exports.default = createDataSubscription;
//# sourceMappingURL=data-subscription.js.map

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var AgmNames = __webpack_require__(0);
var callback_registry_1 = __webpack_require__(1);
var promisify = __webpack_require__(8);
var EntitlementsImpl = (function () {
    function EntitlementsImpl(_agm) {
        var _this = this;
        this._agm = _agm;
        this._registry = callback_registry_1.default();
        this.handleBranchModified = function (branch) {
            _this._registry.execute("branchChanged", branch);
        };
        this.handleBranchesModified = function (branches) {
            _this._registry.execute("branchesChanged", branches);
        };
        this.getRegion = function (success, error) {
            return promisify(_this._agmInvoke(AgmNames.GetConfigurationRegionMethodName, function (e) { return e.returned.Region; }), success, error);
        };
        this.getBranches = function (success, error) {
            var promise = _this._agmInvoke(AgmNames.GetBranchesMethodName, function (e) {
                var obj = e.returned.Branches;
                return Object.keys(obj).map(function (key) { return obj[key]; });
            });
            return promisify(promise, success, error);
        };
        this.getCurrentBranch = function (success, error) {
            var promise = _this._agmInvoke(AgmNames.GetCurrentBranchMethodName, function (e) { return e.returned.Branch; }, undefined);
            return promisify(promise, success, error);
        };
        this.setRegion = function (region, success, error) {
            var promise = _this._agmInvoke(AgmNames.SetConfigurationRegionMethodName, function (e) { return e.returned.ResultMessage; }, { Region: region });
            return promisify(promise, success, error);
        };
        this.setCurrentBranch = function (branch, success, error) {
            var promise = _this._agmInvoke(AgmNames.SetCurrentBranchMethodName, function (e) { return e.returned.ResultMessage; }, { Branch: branch });
            return promisify(promise, success, error);
        };
        this.currentUser = function (success, error) {
            var promise = _this._agmInvoke(AgmNames.GetUserMethodName);
            return promisify(promise, success, error);
        };
        this.getFunctionalEntitlement = function (funct, success, error) {
            var promise = _this._agmInvoke(AgmNames.GetFunctionalEntitlementMethodName, function (e) { return e.returned.Entitlement; }, { Function: funct });
            return promisify(promise, success, error);
        };
        this.getFunctionalEntitlementBranch = function (funct, branch, success, error) {
            var promise = _this._agmInvoke(AgmNames.GetFunctionalEntitlementMethodName, function (e) { return e.returned.Entitlement; }, { Function: funct, Branch: branch });
            return promisify(promise, success, error);
        };
        this.canI = function (func, success, error) {
            var promise = _this._agmInvoke(AgmNames.CanIMethodName, function (e) { return e.returned.Result; }, { Function: func });
            return promisify(promise, success, error);
        };
        this.canIBranch = function (func, branch, success, error) {
            var promise = _this._agmInvoke(AgmNames.CanIMethodName, function (e) { return e.returned.Result; }, { Function: func, Branch: branch });
            return promisify(promise, success, error);
        };
        this.onBranchesChanged = function (callback) {
            _this._registry.add("branchesChanged", callback);
        };
        this.onBranchChanged = function (callback) {
            _this._registry.add("branchChanged", callback);
        };
        this.exit = function (options) {
            return _this._agmInvoke(AgmNames.ShutdownMethodName, null, options);
        };
        this._agmInvoke = function (method, transformFunction, args) {
            args = args || {};
            return new Promise(function (resolve, reject) {
                var errHandler = function (error) { return reject(error); };
                _this._agm.invoke(method, args)
                    .then(function (result) {
                    if (!transformFunction) {
                        transformFunction = function (d) { return d.returned; };
                    }
                    resolve(transformFunction(result));
                })
                    .catch(errHandler);
            });
        };
        //
    }
    return EntitlementsImpl;
}());
exports.default = EntitlementsImpl;
//# sourceMappingURL=entitlements.js.map

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var AgmNames = __webpack_require__(0);
var helper_1 = __webpack_require__(3);
/** Retrieves application snapshot from ACS */
function snapshot(agm, appManager) {
    return new Promise(function (resolve, reject) {
        agm.invoke(AgmNames.GetApplicationsMethodName, { skipIcon: true })
            .then(function (response) {
            var data = response.returned;
            if (!data) {
                resolve();
            }
            var applications = data.applications;
            if (!applications) {
                resolve();
            }
            helper_1.objectValues(applications).map(function (item) { return appManager.handleAppAdded(item); });
            resolve();
        })
            .catch(function (err) { return reject("Error getting application snapshot: " + err.message); });
    });
}
exports.default = snapshot;
//# sourceMappingURL=snapshot.js.map

/***/ }),
/* 8 */
/***/ (function(module, exports) {

var isFunction = function isFunction (arg) {return !!(arg && arg.constructor && arg.call && arg.apply);}
var nextTick = function nextTick (cb) { setTimeout(cb, 0); };

module.exports = function (promise, successCallback, errorCallback) {
    'use strict';
    if (!isFunction(successCallback) && !isFunction(errorCallback)) {
        return promise;
    }

    if (!isFunction(successCallback)) {
        successCallback = function () {};
    } else if (!isFunction(errorCallback)) {
        errorCallback = function () {};        
    }

    promise.then(successCallback, errorCallback);
}


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var AgmNames = __webpack_require__(0);
var callback_registry_1 = __webpack_require__(1);
var helper_1 = __webpack_require__(3);
var ApplicationImpl = (function () {
    function ApplicationImpl(_appManager, _name, _agm) {
        // TODO: Replace string events with constants. The string declaration of the registry event name should only ever appear once. Ever. Period.
        var _this = this;
        this._appManager = _appManager;
        this._name = _name;
        this._agm = _agm;
        this._registry = callback_registry_1.default();
        // subscribe for events from app-manager
        _appManager.onInstanceStarted(function (instance) {
            if (instance.application.name !== _this._name) {
                return;
            }
            _this._registry.execute("instanceStarted", instance);
        });
        _appManager.onInstanceStopped(function (instance) {
            if (instance.application.name !== _this._name) {
                return;
            }
            _this._registry.execute("instanceStopped", instance);
        });
        _appManager.onAppRemoved(function (app) {
            if (app.name !== _this._name) {
                return;
            }
            _this._registry.execute("appRemoved", app);
        });
        _appManager.onAppChanged(function (app) {
            if (app.name !== _this._name) {
                return;
            }
            _this._registry.execute("appChanged", app);
        });
        _appManager.onAppAvailable(function (app) {
            if (app.name !== _this._name) {
                return;
            }
            _this._registry.execute("appAvailable", app);
        });
        _appManager.onAppUnavailable(function (app) {
            if (app.name !== _this._name) {
                return;
            }
            _this._registry.execute("appUnavailable", app);
        });
    }
    Object.defineProperty(ApplicationImpl.prototype, "name", {
        get: function () { return this._name; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ApplicationImpl.prototype, "title", {
        get: function () { return this._props.Title; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ApplicationImpl.prototype, "version", {
        get: function () { return this._props.Version; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ApplicationImpl.prototype, "autoStart", {
        get: function () { return this._props.AutoStart; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ApplicationImpl.prototype, "isShell", {
        get: function () { return this._props.IsShell; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ApplicationImpl.prototype, "caption", {
        get: function () { return this._props.Caption; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ApplicationImpl.prototype, "hidden", {
        get: function () { return this._props.IsHidden; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ApplicationImpl.prototype, "container", {
        get: function () { return this._props.ApplicationName; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ApplicationImpl.prototype, "activityType", {
        get: function () { return this._props.ActivityType; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ApplicationImpl.prototype, "activityWindowType", {
        get: function () { return this._props.ActivityWindowType; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ApplicationImpl.prototype, "windowSettings", {
        get: function () {
            if (!this._props.Arguments) {
                return {};
            }
            return helper_1.objectClone(this._props.Arguments);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ApplicationImpl.prototype, "allowMultiple", {
        get: function () { return this._props.AllowMultiple; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ApplicationImpl.prototype, "available", {
        get: function () { return this._props.IsReady || false; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ApplicationImpl.prototype, "icon", {
        get: function () { return this._props.Icon; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ApplicationImpl.prototype, "iconURL", {
        get: function () { return this._props.IconUrl; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ApplicationImpl.prototype, "sortOrder", {
        get: function () { return this._props.SortOrder; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ApplicationImpl.prototype, "userProperties", {
        get: function () {
            if (!this._props.UserProperties) {
                return {};
            }
            return helper_1.objectClone(this._props.UserProperties);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ApplicationImpl.prototype, "isActivity", {
        get: function () {
            return this._props.ActivityType !== undefined && this._props.ActivityType !== "";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ApplicationImpl.prototype, "configuration", {
        get: function () {
            return {
                autoStart: this._props.AutoStart,
                caption: this._props.Caption,
                hidden: this._props.IsHidden,
                container: this._props.ApplicationName,
                activityType: this._props.ActivityType,
                allowMultiple: this._props.AllowMultiple
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ApplicationImpl.prototype, "instances", {
        get: function () {
            var _this = this;
            return this._appManager.instances().filter(function (instance) { return instance.application.name === _this._name; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ApplicationImpl.prototype, "type", {
        get: function () {
            return this._props.Type;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ApplicationImpl.prototype, "mode", {
        get: function () {
            if (!this._props) {
                // no info about the app
                return "unknown";
            }
            // GD3 - we always have Mode from the stream object
            if (this._props.Mode && typeof this._props.Mode === "string") {
                return this._props.Mode.toLowerCase();
            }
            // GD2
            // return unknown for activity applications
            if (this.isActivity) {
                return "unknown";
            }
            // check definition -> hc.args.mode
            if (this._props.Arguments && this._props.Arguments.mode && typeof this._props.Arguments.mode === "string") {
                return this._props.Arguments.mode.toLowerCase();
            }
            // if no hc.args.mode, check hc.WindowStyleAttributes
            var styleAttributes = this._props.WindowStyleAttributes;
            if (styleAttributes) {
                // WindowStyleAttributes is not a valid JSON, we will need to find mode in the string
                styleAttributes = styleAttributes.split(" ").join("");
                var searchFor = "mode:\"";
                var modeIndex = styleAttributes.indexOf(searchFor);
                if (modeIndex !== -1) {
                    var startModeIndex = modeIndex + searchFor.length;
                    var stopModeIndex = styleAttributes.indexOf("\"", startModeIndex);
                    var style = styleAttributes.substr(startModeIndex, stopModeIndex - startModeIndex);
                    if (style && typeof style === "string") {
                        return style.toLowerCase();
                    }
                }
            }
            // default mode for GD2
            return "flat";
        },
        enumerable: true,
        configurable: true
    });
    ApplicationImpl.prototype.updateFromProps = function (props) {
        var _this = this;
        if (!this._props) {
            this._props = { Name: props.Name };
        }
        Object.keys(props).forEach(function (key) {
            _this._props[key] = props[key];
        });
    };
    ApplicationImpl.prototype.start = function (context, options) {
        var _this = this;
        var name = this._name;
        return new Promise(function (resolve, reject) {
            options = options || {};
            context = context || {};
            context._t42 = { createWindowArgs: options };
            if (typeof options.waitForAGMReady === "undefined") {
                options.waitForAGMReady = true;
            }
            var waitForAGMInstance = options.waitForAGMReady;
            var waitForInstance = !options.waitForAGMReady;
            var waitForApplicationInstance = function (id) {
                return new Promise(function (waiteResolve, waitReject) {
                    // fetch from the current list in app-manager
                    var check = function () {
                        var filtered = _this._appManager.instances().filter(function (i) { return i.id === id; });
                        if (filtered.length === 2) {
                            return filtered[0].isActivityInstance ? filtered[0] : filtered[1];
                        }
                        return filtered[0];
                    };
                    // try to find it in the current list
                    var instances = check();
                    if (instances) {
                        resolve(instances);
                    }
                    else {
                        var unsub_1;
                        // reject after some timeout
                        setTimeout(function () {
                            if (unsub_1) {
                                unsub_1();
                                waitReject("timeout");
                            }
                        }, 5000);
                        // if not there subscribe for instance events
                        unsub_1 = _this._appManager.onInstanceStarted(function (i) {
                            if (i.id === id) {
                                unsub_1();
                                unsub_1 = undefined;
                                // schedule - we need this because there might be more than one
                                // instance with the same id (activity case) - so this handler
                                // will kick for the very first
                                setTimeout(function () {
                                    resolve(check());
                                }, 1);
                            }
                        });
                    }
                });
            };
            _this._agm.invoke(AgmNames.StartApplicationMethodName, {
                Name: name,
                Context: context,
                WaitForAgmInstance: waitForAGMInstance,
                WaitForInstance: waitForInstance
            }, "best", null, function (result) {
                var acsResult = result.returned.Instance_0 || result.returned[0];
                if (acsResult) {
                    return waitForApplicationInstance(acsResult.Id);
                }
                else {
                    // we haven't received instance from ACS - this might happen if the app does not
                    // support tracking instances (e.g. we start internet explorer with some url)
                    resolve(undefined);
                }
            }, function (err) {
                reject(err);
            });
        });
    };
    ApplicationImpl.prototype.onInstanceStarted = function (callback) {
        this._registry.add("instanceStarted", callback);
    };
    ApplicationImpl.prototype.onInstanceStopped = function (callback) {
        this._registry.add("instanceStopped", callback);
    };
    ApplicationImpl.prototype.onAvailable = function (callback) {
        this._registry.add("appAvailable", callback);
    };
    ApplicationImpl.prototype.onUnavailable = function (callback) {
        this._registry.add("appUnavailable", callback);
    };
    ApplicationImpl.prototype.onChanged = function (callback) {
        this._registry.add("appChanged", callback);
    };
    ApplicationImpl.prototype.onRemoved = function (callback) {
        this._registry.add("appRemoved", callback);
    };
    return ApplicationImpl;
}());
exports.default = ApplicationImpl;
//# sourceMappingURL=application.js.map

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.OnNotificationEvent = "OnNotification";
exports.OnBranchChangedEvent = "OnBranchChanged";
exports.OnBranchesModifiedEvent = "OnBranchesModified";
exports.OnApplicationAddedEvent = "OnApplicationAdded";
exports.OnApplicationRemovedEvent = "OnApplicationRemoved";
exports.OnApplicationChangedEvent = "OnApplicationChanged";
exports.OnApplicationReadyEvent = "OnApplicationReady";
exports.OnApplicationStartedEvent = "OnApplicationStarted";
exports.OnApplicationRegisteredEvent = "OnApplicationRegistered";
exports.OnApplicationAgmServerReadyEvent = "OnApplicationAgmServerReady";
exports.OnApplicationUpdatedEvent = "OnApplicationUpdated";
exports.OnApplicationStoppedEvent = "OnApplicationStopped";
exports.OnApplicationStartFailedEvent = "OnApplicationStartFailed";
//# sourceMappingURL=event-names.js.map

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var AgmNames = __webpack_require__(0);
var callback_registry_1 = __webpack_require__(1);
var InstanceImpl = (function () {
    function InstanceImpl(_id, _app, _appManager, _agm, _activities, _windows, startFailed) {
        var _this = this;
        this._id = _id;
        this._app = _app;
        this._appManager = _appManager;
        this._agm = _agm;
        this._activities = _activities;
        this._windows = _windows;
        this.onAgmReady = this._addToRegistry("agmReady");
        this.onStopped = this._addToRegistry("stopped");
        this._registry = callback_registry_1.default();
        if (startFailed) {
            return;
        }
        this._appManager.onInstanceStopped(function (instance) {
            if (instance.id !== _this._id) {
                return;
            }
            _this._registry.execute("instanceStopped", instance);
        });
        this._appManager.onInstanceAgmServerReady(function (instance) {
            if (instance.id !== _this._id) {
                return;
            }
            _this._registry.execute("agmReady", instance);
        });
    }
    Object.defineProperty(InstanceImpl.prototype, "id", {
        get: function () { return this._id; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InstanceImpl.prototype, "application", {
        get: function () { return this._app; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InstanceImpl.prototype, "activity", {
        get: function () {
            var _this = this;
            if (!this._activities) {
                throw new Error("This method requires glue.activities library to be enabled.");
            }
            return this._activities.all.instances.get()
                .filter(function (activityInstance) { return activityInstance.id === _this._activityId; })[0];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InstanceImpl.prototype, "activityInstances", {
        get: function () {
            var _this = this;
            return this._appManager.instances()
                .filter(function (i) { return i.context && (i.context.activityId === _this._activityId); });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InstanceImpl.prototype, "activityOwnerInstance", {
        get: function () {
            return this._appManager.instances()
                .filter(function (instance) {
                if (instance.window && instance.window.context) {
                    var instWinCntx = instance.window.context;
                    if (instWinCntx._t42 && instWinCntx._t42.activityIsOwner) {
                        return true;
                    }
                }
                return false;
            })[0];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InstanceImpl.prototype, "window", {
        get: function () {
            var _this = this;
            if (!this._windows) {
                throw new Error("This method requires glue.windows library to be enabled.");
            }
            return this._windows.list().filter(function (w) { return w.id === _this._id; })[0];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InstanceImpl.prototype, "context", {
        get: function () { return this._startUpContext; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InstanceImpl.prototype, "title", {
        get: function () { return this._title; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InstanceImpl.prototype, "isActivityInstance", {
        get: function () { return this._isActivityInstance; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InstanceImpl.prototype, "activityId", {
        get: function () { return this._activityId; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InstanceImpl.prototype, "inActivity", {
        get: function () { return this._inActivity; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InstanceImpl.prototype, "isSingleWindowApp", {
        get: function () { return !this._inActivity; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InstanceImpl.prototype, "agm", {
        get: function () {
            return {
                machine: this._agmInstance.machine,
                user: this._agmInstance.user,
                environment: this._agmInstance.environment,
                application: this._agmInstance.application
            };
        },
        enumerable: true,
        configurable: true
    });
    InstanceImpl.prototype.updateFromProps = function (props) {
        this._startUpContext = props.Context;
        this._title = props.Title;
        this._isActivityInstance = false;
        if (props.ActivityId && props.ActivityId !== "") {
            this._activityId = props.ActivityId;
            this._isActivityInstance = true;
        }
        if (!this._activityId && this._startUpContext && this._startUpContext.activityId) {
            this._activityId = this._startUpContext.activityId;
        }
        this._inActivity = Boolean(this._activityId);
        this.updateAgmInstanceFromProps(props);
    };
    InstanceImpl.prototype.updateAgmInstanceFromProps = function (props) {
        if (!props.AgmServers) {
            return;
        }
        var propsAgmServer = Object.keys(props.AgmServers)[0];
        if (!propsAgmServer) {
            return;
        }
        var propsAgm = props.AgmServers[propsAgmServer];
        this._agmInstance = {
            machine: propsAgm.machineName,
            user: propsAgm.userName,
            environment: propsAgm.environment,
            application: propsAgm.applicationName,
        };
    };
    InstanceImpl.prototype.stop = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var unsubscribe = _this._appManager.onInstanceStopped(function (instance) {
                if (instance.id === _this._id) {
                    unsubscribe();
                    resolve();
                }
            });
            _this._agm.invoke(AgmNames.StopApplicationMethodName, {
                Name: _this._app.name,
                Id: _this._id
            })
                .catch(function (err) { return reject(err); });
        });
    };
    InstanceImpl.prototype.activate = function () {
        return this._agm.invoke(AgmNames.ActivateApplicationMethodName, { Name: this._app.name, Id: this._id });
    };
    InstanceImpl.prototype._addToRegistry = function (key) {
        var _this = this;
        return function (callback) {
            _this._registry.add(key, callback);
        };
    };
    return InstanceImpl;
}());
exports.default = InstanceImpl;
//# sourceMappingURL=instance.js.map

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var app_manager_1 = __webpack_require__(4);
var entitlements_1 = __webpack_require__(6);
var snapshot_1 = __webpack_require__(7);
var data_subscription_1 = __webpack_require__(5);
var version = __webpack_require__(2).version;
var PackageJson = __webpack_require__(2);
exports.default = function (config) {
    if (!config) {
        throw Error("config not set");
    }
    if (!config.agm) {
        throw Error("config.agm is missing");
    }
    var START_ONLY = "startOnly";
    var SKIP_ICONS = "skipIcons";
    var FULL = "full";
    var mode = config.mode || START_ONLY;
    if (mode !== START_ONLY && mode !== SKIP_ICONS && mode !== FULL) {
        throw new Error("Invalid mode for appManager lib - " + mode + " is not supported");
    }
    var activities = config.activities;
    var agm = config.agm;
    var logger = config.logger;
    var windows = config.windows;
    var appManager = new app_manager_1.default(agm, activities, windows, logger.subLogger("applications"));
    var entitlements = new entitlements_1.default(agm);
    var readyPromise;
    if (mode === START_ONLY) {
        readyPromise = snapshot_1.default(agm, appManager);
    }
    else {
        var subscription = data_subscription_1.default(agm, appManager, entitlements, mode === SKIP_ICONS);
        readyPromise = subscription.start();
    }
    var api = {
        ready: function () { return readyPromise; },
        version: version,
        applications: appManager.applications,
        application: appManager.application,
        onAppAdded: appManager.onAppAdded,
        onAppRemoved: appManager.onAppRemoved,
        onAppChanged: appManager.onAppChanged,
        onAppAvailable: appManager.onAppAvailable,
        onAppUnavailable: appManager.onAppUnavailable,
        instances: appManager.instances,
        get myInstance() {
            return appManager.getMyInstance();
        },
        onInstanceStarted: appManager.onInstanceStarted,
        onInstanceStopped: appManager.onInstanceStopped,
        onInstanceUpdated: appManager.onInstanceUpdated,
        onInstanceStartFailed: appManager.onInstanceStartFailed,
        getRegion: entitlements.getRegion,
        getBranches: entitlements.getBranches,
        getCurrentBranch: entitlements.getCurrentBranch,
        getFunctionalEntitlement: entitlements.getFunctionalEntitlement,
        getFunctionalEntitlementBranch: entitlements.getFunctionalEntitlementBranch,
        setCurrentBranch: entitlements.setCurrentBranch,
        setRegion: entitlements.setRegion,
        currentUser: entitlements.currentUser,
        canI: entitlements.canI,
        canIBranch: entitlements.canIBranch,
        onBranchesChanged: entitlements.onBranchesChanged,
        exit: entitlements.exit
    };
    return api;
};
//# sourceMappingURL=main.js.map

/***/ })
/******/ ]);
});
//# sourceMappingURL=tick42-app-manager.js.map

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

(function webpackUniversalModuleDefinition(root, factory) {
	if(true)
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("tick42-contexts", [], factory);
	else if(typeof exports === 'object')
		exports["tick42-contexts"] = factory();
	else
		root["tick42-contexts"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var gw3Bridge_1 = __webpack_require__(2);
var hcBridge_1 = __webpack_require__(3);
var PackageJson = __webpack_require__(1);
var ContextsModule = (function () {
    function ContextsModule(config) {
        this.config = config;
        this._version = PackageJson.version;
        try {
            if (typeof window !== "undefined" && typeof window.htmlContainer !== "undefined") {
                var hc = window.htmlContainer;
                if (!hc.sharedContextFacade) {
                    throw new Error("Your version of HtmlContainer does not support contexts."
                        + " Get version 1.46.0.0 or later to have that feature.");
                }
                this._bridge = new hcBridge_1.HCBridge(config);
            }
            else if (config.connection.protocolVersion === 3) {
                this._bridge = new gw3Bridge_1.GW3Bridge(config);
            }
            else {
                throw new Error("To use the Contexts library you must run in the"
                    + " HTML Container or using a connection to Gateway v3.");
            }
        }
        catch (err) {
            err._version = this._version;
            throw err;
        }
    }
    Object.defineProperty(ContextsModule.prototype, "version", {
        get: function () {
            return this._version;
        },
        enumerable: true,
        configurable: true
    });
    ContextsModule.prototype.all = function () {
        return this._bridge.all();
    };
    ContextsModule.prototype.update = function (name, data) {
        return this._bridge.update(name, data);
    };
    ContextsModule.prototype.set = function (name, data) {
        return this._bridge.set(name, data);
    };
    ContextsModule.prototype.subscribe = function (name, callback) {
        var _this = this;
        var key = this._bridge.subscribe(name, callback);
        return function () {
            _this._bridge.unsubscribe(key);
        };
    };
    return ContextsModule;
}());
exports.ContextsModule = ContextsModule;
//# sourceMappingURL=contextsModule.js.map

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = {"name":"tick42-contexts","version":"0.0.13","description":"A library for shared contexts","main":"dist/node/tick42-contexts.js","browser":"dist/web/tick42-contexts.js","types":"types/index.d.ts","docName":"Contexts","scripts":{"clean":"node ./build/scripts/clean.js","pre:build":"npm run tslint && tsc && set NODE_ENV=development && npm run clean","file-versionify":"node ./build/scripts/file-versionify.js","tslint":"tslint -t codeFrame ./src/**/*.ts","tslint:fix":"tslint -t codeFrame --fix ./src/**/*.ts","watch":"onchange ./src/**/*.ts -- npm run build:dev","build:dev":"npm run pre:build && set NODE_ENV=development && webpack && npm run file-versionify && npm run types","build:prod":"npm run pre:build && set NODE_ENV=development && webpack && set NODE_ENV=production && webpack && npm run file-versionify && npm run types","docs":"typedoc --options typedoc.json ./src","types":"node ./build/scripts/copy-types.js","types:merged":"dts-generator --project ./ --out ./types/index.d.ts","prepublish":"npm run build:prod"},"repository":{"type":"git","url":"https://stash.tick42.com/scm/tg/js-contexts.git"},"author":"Tick42","license":"ISC","dependencies":{},"precommit":"tslint","devDependencies":{"@types/node":"^8.0.46","dts-generator":"^2.1.0","es6-promise":"^4.1.0","onchange":"3.*","pre-commit":"^1.1.3","shelljs":"^0.6.0","tick42-webpack-config":"4.1.6","tslint":"5.*","typedoc":"^0.5.10","typescript":"2.3.0","webpack":"2.3.3"}}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var GW3Bridge = (function () {
    function GW3Bridge(config) {
        // throw new Error("Not implemented");
    }
    GW3Bridge.prototype.all = function () {
        throw new Error("Not implemented");
    };
    GW3Bridge.prototype.update = function (name, data) {
        throw new Error("Not implemented");
    };
    GW3Bridge.prototype.set = function (name, data) {
        throw new Error("Not implemented");
    };
    GW3Bridge.prototype.subscribe = function (name, callback) {
        throw new Error("Not implemented");
    };
    GW3Bridge.prototype.unsubscribe = function (key) {
        throw new Error("Not implemented");
    };
    return GW3Bridge;
}());
exports.GW3Bridge = GW3Bridge;
//# sourceMappingURL=gw3Bridge.js.map

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var HCBridge = (function () {
    function HCBridge(config) {
        this._facade = window.htmlContainer.sharedContextFacade;
    }
    HCBridge.prototype.all = function () {
        var allObj = this._facade.all();
        if (!allObj || !allObj.keys) {
            return [];
        }
        return allObj.keys;
    };
    HCBridge.prototype.update = function (name, data) {
        return this._facade.update(name, data);
    };
    HCBridge.prototype.set = function (name, data) {
        this._facade.set(name, data);
    };
    HCBridge.prototype.subscribe = function (name, callback) {
        return this._facade.subscribe(name, callback);
    };
    HCBridge.prototype.unsubscribe = function (key) {
        this._facade.unsubscribe(key);
    };
    return HCBridge;
}());
exports.HCBridge = HCBridge;
//# sourceMappingURL=hcBridge.js.map

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var contextsModule_1 = __webpack_require__(0);
module.exports = function (config) { return new contextsModule_1.ContextsModule(config); };
//# sourceMappingURL=main.js.map

/***/ })
/******/ ]);
});
//# sourceMappingURL=tick42-contexts.js.map

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

(function webpackUniversalModuleDefinition(root, factory) {
	if(true)
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("tick42-glue-core", [], factory);
	else if(typeof exports === 'object')
		exports["tick42-glue-core"] = factory();
	else
		root["tick42-glue-core"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 44);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function createRegistry() {
    var callbacks = {};
    function add(key, callback) {
        var callbacksForKey = callbacks[key];
        if (!callbacksForKey) {
            callbacksForKey = [];
            callbacks[key] = callbacksForKey;
        }
        callbacksForKey.push(callback);
        return function () {
            var allForKey = callbacks[key];
            if (!allForKey) {
                return;
            }
            allForKey = allForKey.filter(function (item) {
                return item !== callback;
            });
            callbacks[key] = allForKey;
        };
    }
    function execute(key) {
        var argumentsArr = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            argumentsArr[_i - 1] = arguments[_i];
        }
        var callbacksForKey = callbacks[key];
        if (!callbacksForKey || callbacksForKey.length === 0) {
            return [];
        }
        var results = [];
        callbacksForKey.forEach(function (callback) {
            try {
                var result = callback.apply(undefined, argumentsArr);
                results.push(result);
            }
            catch (err) {
                results.push(undefined);
            }
        });
        return results;
    }
    function clear() {
        callbacks = {};
    }
    return {
        add: add,
        execute: execute,
        clear: clear
    };
}
;
createRegistry.default = createRegistry;
module.exports = createRegistry;
//# sourceMappingURL=index.js.map

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var shortid = __webpack_require__(7);

module.exports = function () {
    'use strict';
    return shortid();
};


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var randomFromSeed = __webpack_require__(18);

var ORIGINAL = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-';
var alphabet;
var previousSeed;

var shuffled;

function reset() {
    shuffled = false;
}

function setCharacters(_alphabet_) {
    if (!_alphabet_) {
        if (alphabet !== ORIGINAL) {
            alphabet = ORIGINAL;
            reset();
        }
        return;
    }

    if (_alphabet_ === alphabet) {
        return;
    }

    if (_alphabet_.length !== ORIGINAL.length) {
        throw new Error('Custom alphabet for shortid must be ' + ORIGINAL.length + ' unique characters. You submitted ' + _alphabet_.length + ' characters: ' + _alphabet_);
    }

    var unique = _alphabet_.split('').filter(function(item, ind, arr){
       return ind !== arr.lastIndexOf(item);
    });

    if (unique.length) {
        throw new Error('Custom alphabet for shortid must be ' + ORIGINAL.length + ' unique characters. These characters were not unique: ' + unique.join(', '));
    }

    alphabet = _alphabet_;
    reset();
}

function characters(_alphabet_) {
    setCharacters(_alphabet_);
    return alphabet;
}

function setSeed(seed) {
    randomFromSeed.seed(seed);
    if (previousSeed !== seed) {
        reset();
        previousSeed = seed;
    }
}

function shuffle() {
    if (!alphabet) {
        setCharacters(ORIGINAL);
    }

    var sourceArray = alphabet.split('');
    var targetArray = [];
    var r = randomFromSeed.nextValue();
    var characterIndex;

    while (sourceArray.length > 0) {
        r = randomFromSeed.nextValue();
        characterIndex = Math.floor(r * sourceArray.length);
        targetArray.push(sourceArray.splice(characterIndex, 1)[0]);
    }
    return targetArray.join('');
}

function getShuffled() {
    if (shuffled) {
        return shuffled;
    }
    shuffled = shuffle();
    return shuffled;
}

/**
 * lookup shuffled letter
 * @param index
 * @returns {string}
 */
function lookup(index) {
    var alphabetShuffled = getShuffled();
    return alphabetShuffled[index];
}

module.exports = {
    characters: characters,
    seed: setSeed,
    lookup: lookup,
    shuffled: getShuffled
};


/***/ }),
/* 4 */
/***/ (function(module, exports) {

/*
* Helper functions used only in this protocol.
* */

function convertInfoToInstance(info) {
    'use strict';

    if (typeof info !== 'object') {
        info = {};
    }

    return {
        application: info.ApplicationName,
        environment: info.Environment,
        machine: info.MachineName,
        pid: info.ProcessId,
        region: info.Region,
        service: info.ServiceName,
        user: info.UserName,
        started: info.ProcessStartTime
    }
}

function isStreamingFlagSet(flags) {
    'use strict';

    if (typeof flags !== 'number' || isNaN(flags)) {
        return false;
    }

    // checking the largest Bit using bitwise ops
    var mask = 32;
    var result = flags & mask;

    return result === mask;
}

module.exports =  {
    isStreamingFlagSet: isStreamingFlagSet,
    convertInfoToInstance: convertInfoToInstance
};


/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = function (promise, successCallback, errorCallback) {
    'use strict';
    if (typeof successCallback !== 'function' && typeof errorCallback !== 'function') {
        return promise;
    }

    if (typeof successCallback !== 'function') {
        successCallback = function () { };
    } else if (typeof errorCallback !== 'function') {
        errorCallback = function () { };
    }

    promise.then(successCallback, errorCallback);
}


/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = {"_args":[[{"raw":"tick42-agm@3.5.21","scope":null,"escapedName":"tick42-agm","name":"tick42-agm","rawSpec":"3.5.21","spec":"3.5.21","type":"version"},"D:\\work\\stash\\GLUE-dev\\dev\\node_modules\\tick42-glue-core"]],"_from":"tick42-agm@3.5.21","_id":"tick42-agm@3.5.21","_inCache":true,"_location":"/tick42-agm","_phantomChildren":{},"_requested":{"raw":"tick42-agm@3.5.21","scope":null,"escapedName":"tick42-agm","name":"tick42-agm","rawSpec":"3.5.21","spec":"3.5.21","type":"version"},"_requiredBy":["/"],"_resolved":"http://repo.tick42.com:8081/artifactory/api/npm/tick42-npm/tick42-agm/-/tick42-agm-3.5.21.tgz","_shasum":"ad3b5217ce9f375c91f09b67712545878f5c9195","_shrinkwrap":null,"_spec":"tick42-agm@3.5.21","_where":"D:\\work\\stash\\GLUE-dev\\dev\\node_modules\\tick42-glue-core","author":{"name":"Tick42","url":"http://www.tick42.com"},"dependencies":{"callback-registry":"^2.2.7","shortid":"^2.2.8","util-deprecate":"^1.0.2"},"description":"JavaScript AGM","devDependencies":{"babel-core":"^6.25.0","babel-loader":"^6.2.5","babel-plugin-add-module-exports":"^0.2.1","babel-plugin-es6-promise":"^1.0.0","babel-preset-es2015":"^6.16.0","babel-preset-stage-2":"^6.22.0","blanket":"^1.1.6","bluebird":"^2.9.30","docdash":"^0.4.0","es6-promise":"^4.1.0","eslint":"^3.1.1","eslint-config-standard":"^5.3.5","eslint-config-tick42":"*","eslint-plugin-promise":"^2.0.0","eslint-plugin-standard":"^2.0.0","http-server":"^0.9.0","minifyify":"^7.3.2","onchange":"^2.1.2","phantomjs":"^1.9.12","pre-commit":"^1.1.3","qunitjs":"^1.15.0","shelljs":"^0.6.0","tick42-webpack-config":"*","webpack":"2.3.3"},"dist":{"tarball":"http://repo.tick42.com:8081/artifactory/api/npm/tick42-npm/tick42-agm/-/tick42-agm-3.5.21.tgz","shasum":"ad3b5217ce9f375c91f09b67712545878f5c9195"},"docName":"Interop","keywords":["agm","javascript","library"],"main":"src/main.js","name":"tick42-agm","optionalDependencies":{},"precommit":"eslint","readme":"ERROR: No README data found!","scripts":{"build":"npm run eslint && webpack","eslint":"eslint library","eslint:fix":"eslint library --fix","generate-docs":"jsdoc -c jsdoc-config.json","prepublish":"npm update & npm run build","serve":"http-server -p 8000 -a 127.0.0.1","test":"npm run eslint && mocha --require ./test/test_helper \"test/**/*.js\"","watch":"onchange \"./library/**/*.js\" -iv -e \"./bin\" -- npm run build","watch-docs":"onchange \"./library/*.js\" -iv -e \"./bin\" -- npm run generate-docs"},"title":"Tick42 AGM","types":"types/index.d.ts","version":"3.5.21"}

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = __webpack_require__(15);


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var randomByte = __webpack_require__(17);

function encode(lookup, number) {
    var loopCounter = 0;
    var done;

    var str = '';

    while (!done) {
        str = str + lookup( ( (number >> (4 * loopCounter)) & 0x0f ) | randomByte() );
        done = number < (Math.pow(16, loopCounter + 1 ) );
        loopCounter++;
    }
    return str;
}

module.exports = encode;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tick42_metrics_1 = __webpack_require__(41);
var tick42_gateway_connection_1 = __webpack_require__(39);
var tick42_logger_1 = __webpack_require__(40);
var tick42_agm_1 = __webpack_require__(28);
var config_1 = __webpack_require__(42);
var dummyConnection_1 = __webpack_require__(43);
var timer_1 = __webpack_require__(45);
var es6_promise_1 = __webpack_require__(10);
var GlueCore = function (userConfig, ext) {
    var glueInitTimer = timer_1.default();
    userConfig = userConfig || {};
    ext = ext || {};
    var internalConfig = config_1.default(userConfig, ext);
    // Init the GLUE namespace
    var hc = typeof window !== "undefined" && window.htmlContainer;
    var _connection;
    var _agm;
    var _logger;
    var _rootMetrics;
    var _metrics;
    var libs = {};
    function registerLib(name, inner, t) {
        inner.initStartTime = t.startTime;
        if (inner.ready) {
            inner.ready().then(function () {
                inner.initTime = t.stop();
                inner.initEndTime = t.endTime;
            });
        }
        else {
            inner.initTime = t.stop();
            inner.initEndTime = t.endTime;
        }
        libs[name] = inner;
        // #deleteme TODO: verify
        GlueCore[name] = inner;
    }
    function setupConnection() {
        var initTimer = timer_1.default();
        internalConfig.connection.logger = _logger.subLogger("connection");
        _connection = tick42_gateway_connection_1.default(internalConfig.connection);
        // gwProtocolVersion 2 requires auth (TODO - we should change 3 to be the same)
        if (internalConfig.connection) {
            if (!internalConfig.auth && internalConfig.connection.protocolVersion > 1) {
                es6_promise_1.Promise.reject("You need to provide auth information");
            }
        }
        if (!internalConfig.auth) {
            registerLib("connection", _connection, initTimer);
            return es6_promise_1.Promise.resolve({});
        }
        // now do the login
        return new es6_promise_1.Promise(function (resolve, reject) {
            var authRequest;
            if (typeof internalConfig.auth === "string" || typeof internalConfig.auth === "number") {
                authRequest = {
                    token: internalConfig.auth
                };
            }
            else if (Object.prototype.toString.call(internalConfig.auth) === "[object Object]") {
                authRequest = internalConfig.auth;
            }
            else {
                throw new Error("Invalid auth object - " + JSON.stringify(internalConfig.auth));
            }
            _connection.login(authRequest)
                .then(function (identity) {
                if (identity) {
                    if (identity.machine) {
                        internalConfig.agm.instance.machine = identity.machine;
                    }
                    if (identity.username) {
                        internalConfig.agm.instance.user = identity.username;
                    }
                }
                registerLib("connection", _connection, initTimer);
                resolve(internalConfig);
            })
                .catch(function (err) {
                reject(err);
            });
        });
    }
    function setupLogger() {
        // Logger
        var initTimer = timer_1.default();
        var loggerConfig = {
            identity: internalConfig.identity,
            getConnection: function () {
                return _connection || dummyConnection_1.default;
            },
            publish: internalConfig.logger.publish || "off",
            console: internalConfig.logger.console || "info",
            metrics: (internalConfig.metrics && internalConfig.logger.metrics) || "off"
        };
        _logger = tick42_logger_1.default(loggerConfig);
        registerLib("logger", _logger, initTimer);
        return es6_promise_1.Promise.resolve(undefined);
    }
    function setupMetrics() {
        if (internalConfig.metrics) {
            var initTimer = timer_1.default();
            _rootMetrics = tick42_metrics_1.default({
                identity: internalConfig.metrics.identity,
                connection: internalConfig.metrics ? _connection : dummyConnection_1.default,
                logger: _logger.subLogger("metrics")
            });
            _metrics = _rootMetrics.subSystem("App");
            _logger.metricsLevel("warn", _metrics.parent.subSystem("LogEvents"));
            registerLib("metrics", _metrics, initTimer);
        }
        return es6_promise_1.Promise.resolve(undefined);
    }
    function setupAGM() {
        var initTimer = timer_1.default();
        // AGM
        var agmConfig = {
            instance: internalConfig.agm.instance,
            connection: _connection,
            logger: _logger.subLogger("agm"),
            metrics: undefined
        };
        if (internalConfig.metrics) {
            agmConfig.metrics = _rootMetrics.subSystem("AGM");
        }
        return new es6_promise_1.Promise(function (resolve, reject) {
            tick42_agm_1.default(agmConfig)
                .then(function (agmLib) {
                _agm = agmLib;
                registerLib("agm", _agm, initTimer);
                resolve(internalConfig);
            })
                .catch(function (err) {
                return reject(err);
            });
        });
    }
    function setupExternalLibs(externalLibs) {
        try {
            externalLibs.forEach(function (lib) {
                setupExternalLib(lib.name, lib.create);
            });
            return es6_promise_1.Promise.resolve();
        }
        catch (e) {
            return es6_promise_1.Promise.reject(e);
        }
    }
    function setupExternalLib(name, createCallback) {
        var initTimer = timer_1.default();
        var lib = createCallback(libs);
        if (lib) {
            registerLib(name, lib, initTimer);
        }
    }
    function waitForLibs() {
        // get all libs that have ready promises and wait for these to be ready
        var libsReadyPromises = Object.keys(libs).map(function (key) {
            var lib = libs[key];
            return lib.ready ?
                lib.ready() : es6_promise_1.Promise.resolve();
        });
        return es6_promise_1.Promise.all(libsReadyPromises);
    }
    function constructGlueObject() {
        var feedbackFunc = function () {
            if (!_agm) {
                return;
            }
            _agm.invoke("T42.ACS.Feedback", {}, "best");
        };
        var info = { glueVersion: internalConfig.version };
        glueInitTimer.stop();
        var glue = {
            feedback: feedbackFunc,
            info: info,
            version: internalConfig.version,
            userConfig: userConfig
        };
        // ver performance
        glue.performance = {
            get browser() {
                return window.performance.timing;
            },
            get memory() {
                return window.performance.memory;
            },
            get initTimes() {
                var result = Object.keys(glue)
                    .filter(function (key) {
                    if (key === "initTimes") {
                        return false;
                    }
                    return glue[key].initTime;
                })
                    .map(function (key) {
                    return {
                        name: key,
                        time: glue[key].initTime,
                        startTime: glue[key].initStartTime,
                        endTime: glue[key].initEndTime
                    };
                });
                // add glue
                result.push({
                    name: "glue",
                    startTime: glueInitTimer.startTime,
                    endTime: glueInitTimer.endTime,
                    time: glueInitTimer.period
                });
                return result;
            }
        };
        // attach each lib to glue && attach versions to info object
        Object.keys(libs).forEach(function (key) {
            var lib = libs[key];
            glue[key] = lib;
            info[key] = lib.version;
        });
        // push perf data to hc if needed
        if (hc && hc.perfDataNeeded && hc.updatePerfData) {
            var delay = hc.perfDataDelay || 100;
            setTimeout(function () {
                hc.updatePerfData(glue.performance);
            }, delay);
        }
        // construct the config object to be exposed to end user
        // transfer config keys from internalConfig and then ext
        glue.config = {};
        if (ext.enrichGlue) {
            ext.enrichGlue(glue);
        }
        Object.keys(internalConfig).forEach(function (k) {
            glue.config[k] = internalConfig[k];
        });
        if (ext.extOptions) {
            Object.keys(ext.extOptions).forEach(function (k) {
                glue.config[k] = ext.extOptions[k];
            });
        }
        return glue;
    }
    return setupLogger()
        .then(setupConnection)
        .then(setupMetrics)
        .then(setupAGM)
        .then(function () {
        return setupExternalLibs(internalConfig.libs || []);
    })
        .then(waitForLibs)
        .then(constructGlueObject)
        .catch(function (err) {
        // if there is some some error include the libs object for debugging purposes
        return es6_promise_1.Promise.reject({
            err: err,
            libs: libs
        });
    });
};
exports.default = GlueCore;
//# sourceMappingURL=glue.js.map

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process, global) {var require;/*!
 * @overview es6-promise - a tiny implementation of Promises/A+.
 * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
 * @license   Licensed under MIT license
 *            See https://raw.githubusercontent.com/stefanpenner/es6-promise/master/LICENSE
 * @version   4.1.1
 */

(function (global, factory) {
	 true ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.ES6Promise = factory());
}(this, (function () { 'use strict';

function objectOrFunction(x) {
  var type = typeof x;
  return x !== null && (type === 'object' || type === 'function');
}

function isFunction(x) {
  return typeof x === 'function';
}

var _isArray = undefined;
if (Array.isArray) {
  _isArray = Array.isArray;
} else {
  _isArray = function (x) {
    return Object.prototype.toString.call(x) === '[object Array]';
  };
}

var isArray = _isArray;

var len = 0;
var vertxNext = undefined;
var customSchedulerFn = undefined;

var asap = function asap(callback, arg) {
  queue[len] = callback;
  queue[len + 1] = arg;
  len += 2;
  if (len === 2) {
    // If len is 2, that means that we need to schedule an async flush.
    // If additional callbacks are queued before the queue is flushed, they
    // will be processed by this flush that we are scheduling.
    if (customSchedulerFn) {
      customSchedulerFn(flush);
    } else {
      scheduleFlush();
    }
  }
};

function setScheduler(scheduleFn) {
  customSchedulerFn = scheduleFn;
}

function setAsap(asapFn) {
  asap = asapFn;
}

var browserWindow = typeof window !== 'undefined' ? window : undefined;
var browserGlobal = browserWindow || {};
var BrowserMutationObserver = browserGlobal.MutationObserver || browserGlobal.WebKitMutationObserver;
var isNode = typeof self === 'undefined' && typeof process !== 'undefined' && ({}).toString.call(process) === '[object process]';

// test for web worker but not in IE10
var isWorker = typeof Uint8ClampedArray !== 'undefined' && typeof importScripts !== 'undefined' && typeof MessageChannel !== 'undefined';

// node
function useNextTick() {
  // node version 0.10.x displays a deprecation warning when nextTick is used recursively
  // see https://github.com/cujojs/when/issues/410 for details
  return function () {
    return process.nextTick(flush);
  };
}

// vertx
function useVertxTimer() {
  if (typeof vertxNext !== 'undefined') {
    return function () {
      vertxNext(flush);
    };
  }

  return useSetTimeout();
}

function useMutationObserver() {
  var iterations = 0;
  var observer = new BrowserMutationObserver(flush);
  var node = document.createTextNode('');
  observer.observe(node, { characterData: true });

  return function () {
    node.data = iterations = ++iterations % 2;
  };
}

// web worker
function useMessageChannel() {
  var channel = new MessageChannel();
  channel.port1.onmessage = flush;
  return function () {
    return channel.port2.postMessage(0);
  };
}

function useSetTimeout() {
  // Store setTimeout reference so es6-promise will be unaffected by
  // other code modifying setTimeout (like sinon.useFakeTimers())
  var globalSetTimeout = setTimeout;
  return function () {
    return globalSetTimeout(flush, 1);
  };
}

var queue = new Array(1000);
function flush() {
  for (var i = 0; i < len; i += 2) {
    var callback = queue[i];
    var arg = queue[i + 1];

    callback(arg);

    queue[i] = undefined;
    queue[i + 1] = undefined;
  }

  len = 0;
}

function attemptVertx() {
  try {
    var r = require;
    var vertx = __webpack_require__(46);
    vertxNext = vertx.runOnLoop || vertx.runOnContext;
    return useVertxTimer();
  } catch (e) {
    return useSetTimeout();
  }
}

var scheduleFlush = undefined;
// Decide what async method to use to triggering processing of queued callbacks:
if (isNode) {
  scheduleFlush = useNextTick();
} else if (BrowserMutationObserver) {
  scheduleFlush = useMutationObserver();
} else if (isWorker) {
  scheduleFlush = useMessageChannel();
} else if (browserWindow === undefined && "function" === 'function') {
  scheduleFlush = attemptVertx();
} else {
  scheduleFlush = useSetTimeout();
}

function then(onFulfillment, onRejection) {
  var _arguments = arguments;

  var parent = this;

  var child = new this.constructor(noop);

  if (child[PROMISE_ID] === undefined) {
    makePromise(child);
  }

  var _state = parent._state;

  if (_state) {
    (function () {
      var callback = _arguments[_state - 1];
      asap(function () {
        return invokeCallback(_state, child, callback, parent._result);
      });
    })();
  } else {
    subscribe(parent, child, onFulfillment, onRejection);
  }

  return child;
}

/**
  `Promise.resolve` returns a promise that will become resolved with the
  passed `value`. It is shorthand for the following:

  ```javascript
  let promise = new Promise(function(resolve, reject){
    resolve(1);
  });

  promise.then(function(value){
    // value === 1
  });
  ```

  Instead of writing the above, your code now simply becomes the following:

  ```javascript
  let promise = Promise.resolve(1);

  promise.then(function(value){
    // value === 1
  });
  ```

  @method resolve
  @static
  @param {Any} value value that the returned promise will be resolved with
  Useful for tooling.
  @return {Promise} a promise that will become fulfilled with the given
  `value`
*/
function resolve$1(object) {
  /*jshint validthis:true */
  var Constructor = this;

  if (object && typeof object === 'object' && object.constructor === Constructor) {
    return object;
  }

  var promise = new Constructor(noop);
  resolve(promise, object);
  return promise;
}

var PROMISE_ID = Math.random().toString(36).substring(16);

function noop() {}

var PENDING = void 0;
var FULFILLED = 1;
var REJECTED = 2;

var GET_THEN_ERROR = new ErrorObject();

function selfFulfillment() {
  return new TypeError("You cannot resolve a promise with itself");
}

function cannotReturnOwn() {
  return new TypeError('A promises callback cannot return that same promise.');
}

function getThen(promise) {
  try {
    return promise.then;
  } catch (error) {
    GET_THEN_ERROR.error = error;
    return GET_THEN_ERROR;
  }
}

function tryThen(then$$1, value, fulfillmentHandler, rejectionHandler) {
  try {
    then$$1.call(value, fulfillmentHandler, rejectionHandler);
  } catch (e) {
    return e;
  }
}

function handleForeignThenable(promise, thenable, then$$1) {
  asap(function (promise) {
    var sealed = false;
    var error = tryThen(then$$1, thenable, function (value) {
      if (sealed) {
        return;
      }
      sealed = true;
      if (thenable !== value) {
        resolve(promise, value);
      } else {
        fulfill(promise, value);
      }
    }, function (reason) {
      if (sealed) {
        return;
      }
      sealed = true;

      reject(promise, reason);
    }, 'Settle: ' + (promise._label || ' unknown promise'));

    if (!sealed && error) {
      sealed = true;
      reject(promise, error);
    }
  }, promise);
}

function handleOwnThenable(promise, thenable) {
  if (thenable._state === FULFILLED) {
    fulfill(promise, thenable._result);
  } else if (thenable._state === REJECTED) {
    reject(promise, thenable._result);
  } else {
    subscribe(thenable, undefined, function (value) {
      return resolve(promise, value);
    }, function (reason) {
      return reject(promise, reason);
    });
  }
}

function handleMaybeThenable(promise, maybeThenable, then$$1) {
  if (maybeThenable.constructor === promise.constructor && then$$1 === then && maybeThenable.constructor.resolve === resolve$1) {
    handleOwnThenable(promise, maybeThenable);
  } else {
    if (then$$1 === GET_THEN_ERROR) {
      reject(promise, GET_THEN_ERROR.error);
      GET_THEN_ERROR.error = null;
    } else if (then$$1 === undefined) {
      fulfill(promise, maybeThenable);
    } else if (isFunction(then$$1)) {
      handleForeignThenable(promise, maybeThenable, then$$1);
    } else {
      fulfill(promise, maybeThenable);
    }
  }
}

function resolve(promise, value) {
  if (promise === value) {
    reject(promise, selfFulfillment());
  } else if (objectOrFunction(value)) {
    handleMaybeThenable(promise, value, getThen(value));
  } else {
    fulfill(promise, value);
  }
}

function publishRejection(promise) {
  if (promise._onerror) {
    promise._onerror(promise._result);
  }

  publish(promise);
}

function fulfill(promise, value) {
  if (promise._state !== PENDING) {
    return;
  }

  promise._result = value;
  promise._state = FULFILLED;

  if (promise._subscribers.length !== 0) {
    asap(publish, promise);
  }
}

function reject(promise, reason) {
  if (promise._state !== PENDING) {
    return;
  }
  promise._state = REJECTED;
  promise._result = reason;

  asap(publishRejection, promise);
}

function subscribe(parent, child, onFulfillment, onRejection) {
  var _subscribers = parent._subscribers;
  var length = _subscribers.length;

  parent._onerror = null;

  _subscribers[length] = child;
  _subscribers[length + FULFILLED] = onFulfillment;
  _subscribers[length + REJECTED] = onRejection;

  if (length === 0 && parent._state) {
    asap(publish, parent);
  }
}

function publish(promise) {
  var subscribers = promise._subscribers;
  var settled = promise._state;

  if (subscribers.length === 0) {
    return;
  }

  var child = undefined,
      callback = undefined,
      detail = promise._result;

  for (var i = 0; i < subscribers.length; i += 3) {
    child = subscribers[i];
    callback = subscribers[i + settled];

    if (child) {
      invokeCallback(settled, child, callback, detail);
    } else {
      callback(detail);
    }
  }

  promise._subscribers.length = 0;
}

function ErrorObject() {
  this.error = null;
}

var TRY_CATCH_ERROR = new ErrorObject();

function tryCatch(callback, detail) {
  try {
    return callback(detail);
  } catch (e) {
    TRY_CATCH_ERROR.error = e;
    return TRY_CATCH_ERROR;
  }
}

function invokeCallback(settled, promise, callback, detail) {
  var hasCallback = isFunction(callback),
      value = undefined,
      error = undefined,
      succeeded = undefined,
      failed = undefined;

  if (hasCallback) {
    value = tryCatch(callback, detail);

    if (value === TRY_CATCH_ERROR) {
      failed = true;
      error = value.error;
      value.error = null;
    } else {
      succeeded = true;
    }

    if (promise === value) {
      reject(promise, cannotReturnOwn());
      return;
    }
  } else {
    value = detail;
    succeeded = true;
  }

  if (promise._state !== PENDING) {
    // noop
  } else if (hasCallback && succeeded) {
      resolve(promise, value);
    } else if (failed) {
      reject(promise, error);
    } else if (settled === FULFILLED) {
      fulfill(promise, value);
    } else if (settled === REJECTED) {
      reject(promise, value);
    }
}

function initializePromise(promise, resolver) {
  try {
    resolver(function resolvePromise(value) {
      resolve(promise, value);
    }, function rejectPromise(reason) {
      reject(promise, reason);
    });
  } catch (e) {
    reject(promise, e);
  }
}

var id = 0;
function nextId() {
  return id++;
}

function makePromise(promise) {
  promise[PROMISE_ID] = id++;
  promise._state = undefined;
  promise._result = undefined;
  promise._subscribers = [];
}

function Enumerator$1(Constructor, input) {
  this._instanceConstructor = Constructor;
  this.promise = new Constructor(noop);

  if (!this.promise[PROMISE_ID]) {
    makePromise(this.promise);
  }

  if (isArray(input)) {
    this.length = input.length;
    this._remaining = input.length;

    this._result = new Array(this.length);

    if (this.length === 0) {
      fulfill(this.promise, this._result);
    } else {
      this.length = this.length || 0;
      this._enumerate(input);
      if (this._remaining === 0) {
        fulfill(this.promise, this._result);
      }
    }
  } else {
    reject(this.promise, validationError());
  }
}

function validationError() {
  return new Error('Array Methods must be provided an Array');
}

Enumerator$1.prototype._enumerate = function (input) {
  for (var i = 0; this._state === PENDING && i < input.length; i++) {
    this._eachEntry(input[i], i);
  }
};

Enumerator$1.prototype._eachEntry = function (entry, i) {
  var c = this._instanceConstructor;
  var resolve$$1 = c.resolve;

  if (resolve$$1 === resolve$1) {
    var _then = getThen(entry);

    if (_then === then && entry._state !== PENDING) {
      this._settledAt(entry._state, i, entry._result);
    } else if (typeof _then !== 'function') {
      this._remaining--;
      this._result[i] = entry;
    } else if (c === Promise$2) {
      var promise = new c(noop);
      handleMaybeThenable(promise, entry, _then);
      this._willSettleAt(promise, i);
    } else {
      this._willSettleAt(new c(function (resolve$$1) {
        return resolve$$1(entry);
      }), i);
    }
  } else {
    this._willSettleAt(resolve$$1(entry), i);
  }
};

Enumerator$1.prototype._settledAt = function (state, i, value) {
  var promise = this.promise;

  if (promise._state === PENDING) {
    this._remaining--;

    if (state === REJECTED) {
      reject(promise, value);
    } else {
      this._result[i] = value;
    }
  }

  if (this._remaining === 0) {
    fulfill(promise, this._result);
  }
};

Enumerator$1.prototype._willSettleAt = function (promise, i) {
  var enumerator = this;

  subscribe(promise, undefined, function (value) {
    return enumerator._settledAt(FULFILLED, i, value);
  }, function (reason) {
    return enumerator._settledAt(REJECTED, i, reason);
  });
};

/**
  `Promise.all` accepts an array of promises, and returns a new promise which
  is fulfilled with an array of fulfillment values for the passed promises, or
  rejected with the reason of the first passed promise to be rejected. It casts all
  elements of the passed iterable to promises as it runs this algorithm.

  Example:

  ```javascript
  let promise1 = resolve(1);
  let promise2 = resolve(2);
  let promise3 = resolve(3);
  let promises = [ promise1, promise2, promise3 ];

  Promise.all(promises).then(function(array){
    // The array here would be [ 1, 2, 3 ];
  });
  ```

  If any of the `promises` given to `all` are rejected, the first promise
  that is rejected will be given as an argument to the returned promises's
  rejection handler. For example:

  Example:

  ```javascript
  let promise1 = resolve(1);
  let promise2 = reject(new Error("2"));
  let promise3 = reject(new Error("3"));
  let promises = [ promise1, promise2, promise3 ];

  Promise.all(promises).then(function(array){
    // Code here never runs because there are rejected promises!
  }, function(error) {
    // error.message === "2"
  });
  ```

  @method all
  @static
  @param {Array} entries array of promises
  @param {String} label optional string for labeling the promise.
  Useful for tooling.
  @return {Promise} promise that is fulfilled when all `promises` have been
  fulfilled, or rejected if any of them become rejected.
  @static
*/
function all$1(entries) {
  return new Enumerator$1(this, entries).promise;
}

/**
  `Promise.race` returns a new promise which is settled in the same way as the
  first passed promise to settle.

  Example:

  ```javascript
  let promise1 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 1');
    }, 200);
  });

  let promise2 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 2');
    }, 100);
  });

  Promise.race([promise1, promise2]).then(function(result){
    // result === 'promise 2' because it was resolved before promise1
    // was resolved.
  });
  ```

  `Promise.race` is deterministic in that only the state of the first
  settled promise matters. For example, even if other promises given to the
  `promises` array argument are resolved, but the first settled promise has
  become rejected before the other promises became fulfilled, the returned
  promise will become rejected:

  ```javascript
  let promise1 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 1');
    }, 200);
  });

  let promise2 = new Promise(function(resolve, reject){
    setTimeout(function(){
      reject(new Error('promise 2'));
    }, 100);
  });

  Promise.race([promise1, promise2]).then(function(result){
    // Code here never runs
  }, function(reason){
    // reason.message === 'promise 2' because promise 2 became rejected before
    // promise 1 became fulfilled
  });
  ```

  An example real-world use case is implementing timeouts:

  ```javascript
  Promise.race([ajax('foo.json'), timeout(5000)])
  ```

  @method race
  @static
  @param {Array} promises array of promises to observe
  Useful for tooling.
  @return {Promise} a promise which settles in the same way as the first passed
  promise to settle.
*/
function race$1(entries) {
  /*jshint validthis:true */
  var Constructor = this;

  if (!isArray(entries)) {
    return new Constructor(function (_, reject) {
      return reject(new TypeError('You must pass an array to race.'));
    });
  } else {
    return new Constructor(function (resolve, reject) {
      var length = entries.length;
      for (var i = 0; i < length; i++) {
        Constructor.resolve(entries[i]).then(resolve, reject);
      }
    });
  }
}

/**
  `Promise.reject` returns a promise rejected with the passed `reason`.
  It is shorthand for the following:

  ```javascript
  let promise = new Promise(function(resolve, reject){
    reject(new Error('WHOOPS'));
  });

  promise.then(function(value){
    // Code here doesn't run because the promise is rejected!
  }, function(reason){
    // reason.message === 'WHOOPS'
  });
  ```

  Instead of writing the above, your code now simply becomes the following:

  ```javascript
  let promise = Promise.reject(new Error('WHOOPS'));

  promise.then(function(value){
    // Code here doesn't run because the promise is rejected!
  }, function(reason){
    // reason.message === 'WHOOPS'
  });
  ```

  @method reject
  @static
  @param {Any} reason value that the returned promise will be rejected with.
  Useful for tooling.
  @return {Promise} a promise rejected with the given `reason`.
*/
function reject$1(reason) {
  /*jshint validthis:true */
  var Constructor = this;
  var promise = new Constructor(noop);
  reject(promise, reason);
  return promise;
}

function needsResolver() {
  throw new TypeError('You must pass a resolver function as the first argument to the promise constructor');
}

function needsNew() {
  throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
}

/**
  Promise objects represent the eventual result of an asynchronous operation. The
  primary way of interacting with a promise is through its `then` method, which
  registers callbacks to receive either a promise's eventual value or the reason
  why the promise cannot be fulfilled.

  Terminology
  -----------

  - `promise` is an object or function with a `then` method whose behavior conforms to this specification.
  - `thenable` is an object or function that defines a `then` method.
  - `value` is any legal JavaScript value (including undefined, a thenable, or a promise).
  - `exception` is a value that is thrown using the throw statement.
  - `reason` is a value that indicates why a promise was rejected.
  - `settled` the final resting state of a promise, fulfilled or rejected.

  A promise can be in one of three states: pending, fulfilled, or rejected.

  Promises that are fulfilled have a fulfillment value and are in the fulfilled
  state.  Promises that are rejected have a rejection reason and are in the
  rejected state.  A fulfillment value is never a thenable.

  Promises can also be said to *resolve* a value.  If this value is also a
  promise, then the original promise's settled state will match the value's
  settled state.  So a promise that *resolves* a promise that rejects will
  itself reject, and a promise that *resolves* a promise that fulfills will
  itself fulfill.


  Basic Usage:
  ------------

  ```js
  let promise = new Promise(function(resolve, reject) {
    // on success
    resolve(value);

    // on failure
    reject(reason);
  });

  promise.then(function(value) {
    // on fulfillment
  }, function(reason) {
    // on rejection
  });
  ```

  Advanced Usage:
  ---------------

  Promises shine when abstracting away asynchronous interactions such as
  `XMLHttpRequest`s.

  ```js
  function getJSON(url) {
    return new Promise(function(resolve, reject){
      let xhr = new XMLHttpRequest();

      xhr.open('GET', url);
      xhr.onreadystatechange = handler;
      xhr.responseType = 'json';
      xhr.setRequestHeader('Accept', 'application/json');
      xhr.send();

      function handler() {
        if (this.readyState === this.DONE) {
          if (this.status === 200) {
            resolve(this.response);
          } else {
            reject(new Error('getJSON: `' + url + '` failed with status: [' + this.status + ']'));
          }
        }
      };
    });
  }

  getJSON('/posts.json').then(function(json) {
    // on fulfillment
  }, function(reason) {
    // on rejection
  });
  ```

  Unlike callbacks, promises are great composable primitives.

  ```js
  Promise.all([
    getJSON('/posts'),
    getJSON('/comments')
  ]).then(function(values){
    values[0] // => postsJSON
    values[1] // => commentsJSON

    return values;
  });
  ```

  @class Promise
  @param {function} resolver
  Useful for tooling.
  @constructor
*/
function Promise$2(resolver) {
  this[PROMISE_ID] = nextId();
  this._result = this._state = undefined;
  this._subscribers = [];

  if (noop !== resolver) {
    typeof resolver !== 'function' && needsResolver();
    this instanceof Promise$2 ? initializePromise(this, resolver) : needsNew();
  }
}

Promise$2.all = all$1;
Promise$2.race = race$1;
Promise$2.resolve = resolve$1;
Promise$2.reject = reject$1;
Promise$2._setScheduler = setScheduler;
Promise$2._setAsap = setAsap;
Promise$2._asap = asap;

Promise$2.prototype = {
  constructor: Promise$2,

  /**
    The primary way of interacting with a promise is through its `then` method,
    which registers callbacks to receive either a promise's eventual value or the
    reason why the promise cannot be fulfilled.
  
    ```js
    findUser().then(function(user){
      // user is available
    }, function(reason){
      // user is unavailable, and you are given the reason why
    });
    ```
  
    Chaining
    --------
  
    The return value of `then` is itself a promise.  This second, 'downstream'
    promise is resolved with the return value of the first promise's fulfillment
    or rejection handler, or rejected if the handler throws an exception.
  
    ```js
    findUser().then(function (user) {
      return user.name;
    }, function (reason) {
      return 'default name';
    }).then(function (userName) {
      // If `findUser` fulfilled, `userName` will be the user's name, otherwise it
      // will be `'default name'`
    });
  
    findUser().then(function (user) {
      throw new Error('Found user, but still unhappy');
    }, function (reason) {
      throw new Error('`findUser` rejected and we're unhappy');
    }).then(function (value) {
      // never reached
    }, function (reason) {
      // if `findUser` fulfilled, `reason` will be 'Found user, but still unhappy'.
      // If `findUser` rejected, `reason` will be '`findUser` rejected and we're unhappy'.
    });
    ```
    If the downstream promise does not specify a rejection handler, rejection reasons will be propagated further downstream.
  
    ```js
    findUser().then(function (user) {
      throw new PedagogicalException('Upstream error');
    }).then(function (value) {
      // never reached
    }).then(function (value) {
      // never reached
    }, function (reason) {
      // The `PedgagocialException` is propagated all the way down to here
    });
    ```
  
    Assimilation
    ------------
  
    Sometimes the value you want to propagate to a downstream promise can only be
    retrieved asynchronously. This can be achieved by returning a promise in the
    fulfillment or rejection handler. The downstream promise will then be pending
    until the returned promise is settled. This is called *assimilation*.
  
    ```js
    findUser().then(function (user) {
      return findCommentsByAuthor(user);
    }).then(function (comments) {
      // The user's comments are now available
    });
    ```
  
    If the assimliated promise rejects, then the downstream promise will also reject.
  
    ```js
    findUser().then(function (user) {
      return findCommentsByAuthor(user);
    }).then(function (comments) {
      // If `findCommentsByAuthor` fulfills, we'll have the value here
    }, function (reason) {
      // If `findCommentsByAuthor` rejects, we'll have the reason here
    });
    ```
  
    Simple Example
    --------------
  
    Synchronous Example
  
    ```javascript
    let result;
  
    try {
      result = findResult();
      // success
    } catch(reason) {
      // failure
    }
    ```
  
    Errback Example
  
    ```js
    findResult(function(result, err){
      if (err) {
        // failure
      } else {
        // success
      }
    });
    ```
  
    Promise Example;
  
    ```javascript
    findResult().then(function(result){
      // success
    }, function(reason){
      // failure
    });
    ```
  
    Advanced Example
    --------------
  
    Synchronous Example
  
    ```javascript
    let author, books;
  
    try {
      author = findAuthor();
      books  = findBooksByAuthor(author);
      // success
    } catch(reason) {
      // failure
    }
    ```
  
    Errback Example
  
    ```js
  
    function foundBooks(books) {
  
    }
  
    function failure(reason) {
  
    }
  
    findAuthor(function(author, err){
      if (err) {
        failure(err);
        // failure
      } else {
        try {
          findBoooksByAuthor(author, function(books, err) {
            if (err) {
              failure(err);
            } else {
              try {
                foundBooks(books);
              } catch(reason) {
                failure(reason);
              }
            }
          });
        } catch(error) {
          failure(err);
        }
        // success
      }
    });
    ```
  
    Promise Example;
  
    ```javascript
    findAuthor().
      then(findBooksByAuthor).
      then(function(books){
        // found books
    }).catch(function(reason){
      // something went wrong
    });
    ```
  
    @method then
    @param {Function} onFulfilled
    @param {Function} onRejected
    Useful for tooling.
    @return {Promise}
  */
  then: then,

  /**
    `catch` is simply sugar for `then(undefined, onRejection)` which makes it the same
    as the catch block of a try/catch statement.
  
    ```js
    function findAuthor(){
      throw new Error('couldn't find that author');
    }
  
    // synchronous
    try {
      findAuthor();
    } catch(reason) {
      // something went wrong
    }
  
    // async with promises
    findAuthor().catch(function(reason){
      // something went wrong
    });
    ```
  
    @method catch
    @param {Function} onRejection
    Useful for tooling.
    @return {Promise}
  */
  'catch': function _catch(onRejection) {
    return this.then(null, onRejection);
  }
};

/*global self*/
function polyfill$1() {
    var local = undefined;

    if (typeof global !== 'undefined') {
        local = global;
    } else if (typeof self !== 'undefined') {
        local = self;
    } else {
        try {
            local = Function('return this')();
        } catch (e) {
            throw new Error('polyfill failed because global object is unavailable in this environment');
        }
    }

    var P = local.Promise;

    if (P) {
        var promiseToString = null;
        try {
            promiseToString = Object.prototype.toString.call(P.resolve());
        } catch (e) {
            // silently ignored
        }

        if (promiseToString === '[object Promise]' && !P.cast) {
            return;
        }
    }

    local.Promise = Promise$2;
}

// Strange compat..
Promise$2.polyfill = polyfill$1;
Promise$2.Promise = Promise$2;

return Promise$2;

})));

//# sourceMappingURL=es6-promise.map

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(12), __webpack_require__(0)))

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = {"name":"tick42-glue-core","version":"3.5.14","description":"Glue42 core library including logger, connection, agm and metrics","main":"./dist/node/tick42-glue-core.js","types":"./glue.d.ts","browser":"./dist/web/tick42-glue-core.js","scripts":{"init-dev-mode":"node ./build/scripts/init-dev-mode.js","remove-installed-dependencies":"node ./build/scripts/remove-installed-dependencies.js","clean":"node ./build/scripts/clean.js","pre:build":"npm run tslint && tsc && set NODE_ENV=development && npm run clean","file-versionify":"node ./build/scripts/file-versionify.js","tslint":"tslint -t codeFrame ./src/**.ts","tslint:fix":"tslint -t codeFrame --fix ./src/**.ts","watch":"onchange ./src/**/*.ts -- npm run build:dev","build:dev":"npm run pre:build && set NODE_ENV=development && webpack && npm run file-versionify && npm run types","build:prod":"npm run pre:build && set NODE_ENV=development && webpack && set NODE_ENV=production && webpack && npm run file-versionify","docs":"typedoc --options typedoc.json ./src","prepublish":"npm run build:prod && npm run test:only","types":"node ./build/scripts/copy-types.js","test":"npm run build:dev && npm run test:only","test:only":"mocha ./tests/ --recursive","test:core":"mocha ./tests/core","test:agm":"mocha ./tests/agm"},"repository":{"type":"git","url":"https://stash.tick42.com/scm/tg/js-glue-core.git"},"author":{"name":"Tick42","url":"http://www.glue42.com"},"license":"ISC","dependencies":{"shortid":"^2.2.6","tick42-agm":"3.5.21","tick42-gateway-connection":"2.4.9","tick42-logger":"3.0.14","tick42-metrics":"2.4.3"},"devDependencies":{"@types/es6-promise":"0.0.32","@types/shortid":"0.0.29","archiver":"^1.3.0","babel-core":"^6.25.0","babel-loader":"^6.4.1","babel-plugin-add-module-exports":"^0.2.1","babel-plugin-es6-promise":"^1.0.0","babel-preset-es2015":"^6.16.0","babel-preset-stage-2":"^6.22.0","chai":"^4.0.2","deep-equal":"^1.0.1","es6-promise":"^4.1.0","mocha":"^2.5.3","onchange":"3.*","pre-commit":"^1.1.3","readline-sync":"^1.4.5","shelljs":"^0.6.0","tick42-gateway":"^0.2.2","tick42-webpack-config":"4.1.6","tslint":"^5.4.3","typedoc":"^0.5.10","typescript":"2.3.0","webpack":"2.3.3"}}

/***/ }),
/* 12 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var encode = __webpack_require__(8);
var alphabet = __webpack_require__(3);

// Ignore all milliseconds before a certain time to reduce the size of the date entropy without sacrificing uniqueness.
// This number should be updated every year or so to keep the generated id short.
// To regenerate `new Date() - 0` and bump the version. Always bump the version!
var REDUCE_TIME = 1459707606518;

// don't change unless we change the algos or REDUCE_TIME
// must be an integer and less than 16
var version = 6;

// Counter is used when shortid is called multiple times in one second.
var counter;

// Remember the last time shortid was called in case counter is needed.
var previousSeconds;

/**
 * Generate unique id
 * Returns string id
 */
function build(clusterWorkerId) {

    var str = '';

    var seconds = Math.floor((Date.now() - REDUCE_TIME) * 0.001);

    if (seconds === previousSeconds) {
        counter++;
    } else {
        counter = 0;
        previousSeconds = seconds;
    }

    str = str + encode(alphabet.lookup, version);
    str = str + encode(alphabet.lookup, clusterWorkerId);
    if (counter > 0) {
        str = str + encode(alphabet.lookup, counter);
    }
    str = str + encode(alphabet.lookup, seconds);

    return str;
}

module.exports = build;


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var alphabet = __webpack_require__(3);

/**
 * Decode the id to get the version and worker
 * Mainly for debugging and testing.
 * @param id - the shortid-generated id.
 */
function decode(id) {
    var characters = alphabet.shuffled();
    return {
        version: characters.indexOf(id.substr(0, 1)) & 0x0f,
        worker: characters.indexOf(id.substr(1, 1)) & 0x0f
    };
}

module.exports = decode;


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var alphabet = __webpack_require__(3);
var encode = __webpack_require__(8);
var decode = __webpack_require__(14);
var build = __webpack_require__(13);
var isValid = __webpack_require__(16);

// if you are using cluster or multiple servers use this to make each instance
// has a unique value for worker
// Note: I don't know if this is automatically set when using third
// party cluster solutions such as pm2.
var clusterWorkerId = __webpack_require__(19) || 0;

/**
 * Set the seed.
 * Highly recommended if you don't want people to try to figure out your id schema.
 * exposed as shortid.seed(int)
 * @param seed Integer value to seed the random alphabet.  ALWAYS USE THE SAME SEED or you might get overlaps.
 */
function seed(seedValue) {
    alphabet.seed(seedValue);
    return module.exports;
}

/**
 * Set the cluster worker or machine id
 * exposed as shortid.worker(int)
 * @param workerId worker must be positive integer.  Number less than 16 is recommended.
 * returns shortid module so it can be chained.
 */
function worker(workerId) {
    clusterWorkerId = workerId;
    return module.exports;
}

/**
 *
 * sets new characters to use in the alphabet
 * returns the shuffled alphabet
 */
function characters(newCharacters) {
    if (newCharacters !== undefined) {
        alphabet.characters(newCharacters);
    }

    return alphabet.shuffled();
}

/**
 * Generate unique id
 * Returns string id
 */
function generate() {
  return build(clusterWorkerId);
}

// Export all other functions as properties of the generate function
module.exports = generate;
module.exports.generate = generate;
module.exports.seed = seed;
module.exports.worker = worker;
module.exports.characters = characters;
module.exports.decode = decode;
module.exports.isValid = isValid;


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var alphabet = __webpack_require__(3);

function isShortId(id) {
    if (!id || typeof id !== 'string' || id.length < 6 ) {
        return false;
    }

    var characters = alphabet.characters();
    var len = id.length;
    for(var i = 0; i < len;i++) {
        if (characters.indexOf(id[i]) === -1) {
            return false;
        }
    }
    return true;
}

module.exports = isShortId;


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var crypto = typeof window === 'object' && (window.crypto || window.msCrypto); // IE 11 uses window.msCrypto

function randomByte() {
    if (!crypto || !crypto.getRandomValues) {
        return Math.floor(Math.random() * 256) & 0x30;
    }
    var dest = new Uint8Array(1);
    crypto.getRandomValues(dest);
    return dest[0] & 0x30;
}

module.exports = randomByte;


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// Found this seed-based random generator somewhere
// Based on The Central Randomizer 1.3 (C) 1997 by Paul Houle (houle@msc.cornell.edu)

var seed = 1;

/**
 * return a random number based on a seed
 * @param seed
 * @returns {number}
 */
function getNextValue() {
    seed = (seed * 9301 + 49297) % 233280;
    return seed/(233280.0);
}

function setSeed(_seed_) {
    seed = _seed_;
}

module.exports = {
    nextValue: getNextValue,
    seed: setSeed
};


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = 0;


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

// This module handles AGM method invocations - validating inputs and delegating to protocol
var random = __webpack_require__(2);

module.exports = function (protocol) {
    'use strict';

    /** Store pending callback **/
    var pendingCallbacks = {};

    /**
     * Invokes an AGM method to a single AGM server, given valid input.
     * @param method
     * @param argumentsObj
     * @param target
     * @param stuff
     * @param success
     * @param error
     */
    function invoke(method, argumentsObj, target, stuff, success, error) {
        // Generate a unique invocation ID, for this invocation
        var invocationId = random();

        // Register the user's callbacks
        registerInvocation(invocationId, {
            method: method,
            calledWith: argumentsObj
        }, success, error, stuff.method_response_timeout);

        protocol.invoke(invocationId, method, argumentsObj, target, stuff);
    }

    /**
     * Register invocation so we can find it later when invocation result is received
     * @param invocationId
     * @param response
     * @param success
     * @param error
     * @param timeout
     */
    function registerInvocation(invocationId, response, success, error, timeout) {
        // Adds the callbacks
        pendingCallbacks[invocationId] = { response: response, success: success, error: error };
        // Schedules to throw a timeout if nobody answers
        setTimeout(function () {
            if (pendingCallbacks[invocationId] === undefined) {
                return;
            }
            error({
                method: response.method,
                called_with: response.calledWith,
                message: 'Timeout reached'
            });
            delete pendingCallbacks[invocationId];
        }, timeout);
    }

    /**
     * Process invocation result received from protocl
     * @param invocationId
     * @param executedBy
     * @param status
     * @param result
     * @param resultMessage
     */
    function processInvocationResult(invocationId, executedBy, status, result, resultMessage) {
        // Finds the appropriate callback
        var callback = pendingCallbacks[invocationId];
        if (callback === undefined) {
            return;
        }
        // If the server returned success, execute the success callback
        if (status === 0 && typeof callback.success === 'function') {

            // Execute the success callback
            callback.success({
                method: callback.response.method.info,
                called_with: callback.response.calledWith,
                executed_by: executedBy,
                returned: result,
                message: resultMessage
                // log_details: message.ResultLogDetails
            });
            // Else, return an error
        } else if (typeof callback.error === 'function') {

            callback.error({
                method: callback.response.method.info,
                called_with: callback.response.calledWith,
                executed_by: executedBy,
                message: resultMessage,
                // log_details: message.ResultLogDetails,
                status: status,
                returned: result
            });
        }
        // Finally, remove the callbacks
        delete pendingCallbacks[invocationId];
    }

    // subscribe for invocation results
    protocol.onInvocationResult(processInvocationResult);

    return { invoke: invoke };
};


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/*
  The AGM Client analyses server presences, collects information about their methods and allows users to invoke these methods.
 */

var ClientInvocationsState = __webpack_require__(20);
var promisify = __webpack_require__(5);

/**
 * @module agm
 */
module.exports = function (protocol, repo, instance, configuration) {
    'use strict';

    // Instantiate the module that handles method execution and responses
    var clientInvocations = new ClientInvocationsState(protocol);

    function getMethods(methodFilter) {
        if (methodFilter === undefined) {
            return repo.getMethods();
        }
        if (typeof methodFilter === 'string') {
            methodFilter = { name: methodFilter };
        }
        return repo.getMethods().filter(function (method) {
            return methodMatch(methodFilter, method.info);
        });
    }

    function getMethodsForInstance(instanceFilter) {
        var allServers = repo.getServers();

        var matchingServers = allServers.filter(function (server) {
            return instanceMatch(instanceFilter, server.info);
        });

        if (matchingServers.length === 0) {
            return [];
        }

        var resultMethodsObject = {};

        if (matchingServers.length === 1) {
            resultMethodsObject = matchingServers[0].methods;
        } else {
            // we have more than one server matching, join all methods
            matchingServers.forEach(function (server) {
                Object.keys(server.methods).forEach(function (methodKey) {
                    var method = server.methods[methodKey];
                    resultMethodsObject[method.id] = method.getInfoForUser();
                })
            });
        }

        // transform the object to array
        return Object.keys(resultMethodsObject)
            .map(function (key) {
                return resultMethodsObject[key]
            });
    }

    function getServers(methodFilter) {
        var servers = repo.getServers();

        // No method - get all getServers
        if (methodFilter === undefined) {
            return servers.map(function (server) {
                return { server: server };
            });
        }
        // Non-existing method - return an empty array
        var methods = getMethods(methodFilter);
        if (methods === undefined) {
            return [];
        }

        return servers.reduce(function (prev, current) {

            var methods = repo.getServerMethodsById(current.id);

            var matchingMethods = methods.filter(function (method) {
                return methodMatch(methodFilter, method.info);
            });

            if (matchingMethods.length > 0) {
                prev.push({ server: current, methods: matchingMethods });
            }

            return prev;
        }, []);
    }

    /**
     * Returns an array of server-methods pairs for all servers that match the target and have at lease one method matching the method filter
     * @private
     * @param methodFilter
     * @param target
     * @returns {*}
     */
    function getServerMethodsByFilterAndTarget(methodFilter, target) {
        // get all servers that have method(s) matching the filter
        var serversMethodMap = getServers(methodFilter);
        // filter the server-method map by target
        return filterByTarget(target, serversMethodMap);
    }

    /**
     * Invokes an AGM method
     * @param {MethodDefinition} methodFilter Method to invoke
     * @param {Object} argumentObj Arguments for the invocation
     * @param {Instance|Instance[]|string} [target] Defines which server(s) to target with the invocation - can be one of:
     * * ’best' - executes the method on the best (or first) server
     * * 'all' - executes the method on all servers offering it
     * * AGM instance (or a subset, used for filtering), e.g. { application: 'appName' }
     * * an array of AGM instances/filters
     * @param {InvocationOptions} [additionalOptions] Additional options for the invocation
     * @param {function} [success] - (use this if you prefer callback style instead of promises)
     * Callback that will be called with {@link InvocationResult} object when the invocation is successful
     * @param {function} [error] -  (use this if you prefer callback style instead of promises)
     * Callback that will be called with {@link InvocationError} object when the invocation is not successful
     * @returns {Promise<InvocationResult>}
     * @example
     * glue.agm.invoke(
     *   'Sum',
     *   { a: 37, b: 5 }) // everything else is optional
     *   .then(
     *      function(result) {
     *      console.log('37 + 5 = ' + result.returned.answer)
     *   })
     *   .catch(
     *      function(err) {
     *      console.error('Failed to execute Sum' + err.message)
     *   })
     **/
    function invoke(methodFilter, argumentObj, target, additionalOptions, success, error) {
        var promise = new Promise(function (resolve, reject) {
            var successProxy, errorProxy;

            successProxy = function (args) {
                // var parsed = JSON.parse(args);
                resolve(args);
            };
            errorProxy = function (args) {
                // var parsed = JSON.parse(args);
                reject(args);
            };
            // Add default params
            if (!argumentObj) {
                argumentObj = {};
            }
            if (!target) {
                target = 'best';
            }
            if (typeof target === 'string' && target !== 'all' && target !== 'best') {
                reject({ message: '"' + target + '" is not a valid target. Valid targets are "all" and "best".' });
            }
            if (!additionalOptions) {
                additionalOptions = {};
            }

            if (additionalOptions.method_response_timeout === undefined) {
                additionalOptions.method_response_timeout = configuration.method_response_timeout;
            }

            if (additionalOptions.waitTimeoutMs === undefined && additionalOptions.wait_for_method_timeout !== undefined) {
                additionalOptions.waitTimeoutMs = additionalOptions.wait_for_method_timeout;
            }

            if (additionalOptions.waitTimeoutMs !== undefined && typeof additionalOptions.waitTimeoutMs !== 'number') {
                reject({ message: '"' + additionalOptions.waitTimeoutMs + '" is not a valid number for \'waitTimeoutMs\'' });
            }

            if (additionalOptions.waitTimeoutMs === undefined) {
                additionalOptions.waitTimeoutMs = configuration.wait_for_method_timeout;
            }

            // Check if the arguments are an object
            if (typeof argumentObj !== 'object') {
                reject({ message: 'The method arguments must be an object.' });
            }

            if (typeof methodFilter === 'string') {
                methodFilter = { name: methodFilter };
            }

            var serversMethodMap = getServerMethodsByFilterAndTarget(methodFilter, target);

            if (serversMethodMap.length === 0) {

                invokeUnexisting(methodFilter, argumentObj, target, additionalOptions, successProxy, errorProxy);

            } else if (serversMethodMap.length === 1) {

                var serverMethodPair = serversMethodMap[0];
                clientInvocations.invoke(serverMethodPair.methods[0], argumentObj, serverMethodPair.server, additionalOptions, successProxy, errorProxy);

            } else {

                invokeOnAll(serversMethodMap, argumentObj, additionalOptions, successProxy, errorProxy);

            }
        });

        return promisify(promise, success, error);
    }

    /**
     * Called when the user tries to invoke a method which does not exist
     * @private
     * @param methodFilter
     * @param argumentObj
     * @param target
     * @param additionalOptions
     * @param success
     * @param error
     */
    function invokeUnexisting(methodFilter, argumentObj, target, additionalOptions, success, error) {
        if (additionalOptions.waitTimeoutMs === 0) {
            callError();
        } else {
            var delayStep = 500;
            var delayTillNow = 0;

            setTimeout(function retry() {
                delayTillNow += delayStep;

                // get all servers that have method(s) matching the filter
                var serversMethodMap = getServerMethodsByFilterAndTarget(methodFilter, target);
                if (serversMethodMap.length > 0) {
                    invoke(methodFilter, argumentObj, target, additionalOptions, success, error);
                } else if (delayTillNow >= additionalOptions.waitTimeoutMs) {
                    callError();
                } else {
                    setTimeout(retry, delayStep);
                }
            }, delayStep);
        }

        function callError() {
            error({
                method: methodFilter,
                called_with: argumentObj,
                message: 'Can not find a method matching ' + JSON.stringify(methodFilter) + ' with server filter ' + JSON.stringify(target)
            });
        }
    }

    /**
     * Calls a method for all servers and unifies the results they return into one:
     * @private
     * @param serverMethodsMap
     * @param argumentObj
     * @param additionalOptions
     * @param success
     * @param error
     */
    function invokeOnAll(serverMethodsMap, argumentObj, additionalOptions, success, error) {
        // Here we will store the results that the getServers return
        var successes = [];
        var errors = [];
        // These are the callbacks
        var successCallback = function (result) {
            successes.push(result);
            sendResponse(successes, errors);
        };
        var errorCallback = function (result) {
            errors.push(result);
            sendResponse(successes, errors);
        };
        // Call the method for all targets
        serverMethodsMap.forEach(function (serverMethodsPair) {
            clientInvocations.invoke(serverMethodsPair.methods[0],
                argumentObj,
                serverMethodsPair.server,
                additionalOptions,
                successCallback,
                errorCallback);
        });

        // Calls the main success and error callbacks with the aggregated results
        function sendResponse() {
            // wait till everybody is finished
            if (successes.length + errors.length < serverMethodsMap.length) {
                return;
            }
            // Execute the "success" callback
            if (successes.length !== 0) {
                var result = successes.reduce(function (obj, success) {
                    obj.method = success.method;
                    obj.called_with = success.called_with;
                    obj.returned = success.returned;
                    obj.all_return_values.push({
                        executed_by: success.executed_by,
                        returned: success.returned
                    });
                    obj.executed_by = success.executed_by;
                    return obj;
                }, { all_return_values: [] });

                // If we get errors from one of the getServers add them to the success object that will be resolved.
                if (errors.length !== 0) {
                    result.all_errors = [];
                    errors.forEach(function (obj) {
                        result.all_errors.push({
                            // executed_by : obj.executed_by, // we don't get executed_by object from the error clientInvocations
                            name: obj.method.name,
                            message: obj.message
                        });
                    });
                }

                success(result);

            } else if (errors.length !== 0) { // Execute the "error" callback
                error(errors.reduce(function (obj, error) {
                    obj.method = error.method;
                    obj.called_with = error.called_with;
                    obj.message = error.message;
                    obj.all_errors.push({
                        executed_by: error.executed_by,
                        message: error.message
                    });
                    // obj.executed_by = success.executed_by;
                    return obj;
                }, { all_errors: [] }));
            }
        }
    }

    /**
     * Filters an array of servers and returns the ones which match the target criteria
     * @private
     * @param target
     * @param serverMethodMap
     * @returns {*}
     * */
    function filterByTarget(target, serverMethodMap) {
        // If the user specified target as string:
        if (typeof target === 'string') {
            if (target === 'all') {
                target = serverMethodMap;
            } else if (target === 'best') {
                // check if there is a server with the same machine as us
                var matchingMachine = serverMethodMap.filter(function (serverMethodPair) {
                    var serverInfo = serverMethodPair.server.info;
                    return serverInfo.machine === instance.machine;
                })[0];
                if (matchingMachine) {
                    return [matchingMachine];
                }

                target = serverMethodMap[0] !== undefined ? [serverMethodMap[0]] : [];  // If the user specified the target as server filter
            }
        } else {
            if (!Array.isArray(target)) {
                target = [target];
            }
            // Retrieve all getServers that match the filters
            target = target.reduce(function (matches, filter) {
                // Add matches for each filter
                var myMatches = serverMethodMap.filter(function (serverMethodPair) {
                    return instanceMatch(filter, serverMethodPair.server.info);
                });
                return matches.concat(myMatches);
            }, []);
        }
        return target;
    }

    /**
     * Matches a server definition against a server filter
     * @private
     * @param instanceFilter
     * @param instanceDefinition
     */
    function instanceMatch(instanceFilter, instanceDefinition) {
        return containsProps(instanceFilter, instanceDefinition);
    }

    /**
     * Matches a method definition against a method filter
     * @private
     * @param methodFilter
     * @param methodDefinition
     */
    function methodMatch(methodFilter, methodDefinition) {
        return containsProps(methodFilter, methodDefinition);
    }

    /**
     * Checks if all properties of filter match properties in object
     * @private
     * @param filter
     * @param object
     * @returns {*}
     */
    function containsProps(filter, object) {
        return Object.keys(filter).reduce(function (match, prop) {
            // ignore undefined properties
            if (!filter[prop]) {
                return match;
            }

            if (filter[prop].constructor === RegExp) {
                if (!filter[prop].test(object[prop])) {
                    return false;
                } else {
                    return match;
                }
            } else {
                if (String(filter[prop]).toLowerCase() !== String(object[prop]).toLowerCase()) {
                    return false;
                } else {
                    return match;
                }
            }
        }, true);
    }

    /**
     * Subscribes to an AGM streaming method
     * @param name
     * @param options
     * @param successCallback
     * @param errorCallback
     * @returns {*}
     */
    function subscribe(name, options, successCallback, errorCallback) {
        // options can have arguments:{}, target: 'best'/'all'/{server_instance}, waitTimeoutMs:3000

        function callProtocolSubscribe(targetServers, stream, options, successProxy, errorProxy) {
            if (global.console !== undefined && configuration.debug === true) {
                console.log('>>> Subscribing to "' + name + '" on ' + targetServers.length + ' servers');
            }

            protocol.subscribe(
                stream,
                options.arguments,
                targetServers,
                { method_response_timeout: options.waitTimeoutMs },
                successProxy,
                errorProxy
            );
        }

        var promise = new Promise(function (resolve, reject) {

            var successProxy = function (args) {
                resolve(args);
            };
            var errorProxy = function (args) {
                reject(args);
            };

            if (options === undefined) {
                options = {};
            }
            var target = options.target;
            if (target === undefined) {
                target = 'best';
            }
            if (typeof target === 'string' && target !== 'all' && target !== 'best') {
                reject({ message: '"' + target + '" is not a valid target. Valid targets are "all", "best", or an instance.' });
            }
            if (typeof options.waitTimeoutMs !== 'number' || options.waitTimeoutMs !== options.waitTimeoutMs /* NaN */) {
                options.waitTimeoutMs = configuration.wait_for_method_timeout;
            }

            var delayStep = 500;
            var delayTillNow = 0;

            // don't check if the method is streaming or not, subscribing to non-streaming
            // method has to invoke it

            // get all servers that have method(s) matching the filter
            var currentServers = getServerMethodsByFilterAndTarget({ name: name }, target);
            if (currentServers.length > 0) {
                callProtocolSubscribe(currentServers, currentServers[0].methods[0], options, successProxy, errorProxy)
            } else {
                setTimeout(function retry() {
                    delayTillNow += delayStep;
                    // get all servers that have method(s) matching the filter
                    var currentServers = getServerMethodsByFilterAndTarget({ name: name }, target);
                    if (currentServers.length > 0) {
                        var streamInfo = currentServers[0].methods[0];
                        callProtocolSubscribe(currentServers, streamInfo, options, successProxy, errorProxy)
                    } else if (delayTillNow >= options.waitTimeoutMs) {
                        callProtocolSubscribe(currentServers, { name: name }, options, successProxy, errorProxy)
                    } else {
                        setTimeout(retry, delayStep);
                    }
                }, delayStep);
            }
        });

        return promisify(promise, successCallback, errorCallback);
    }

    return {
        subscribe: subscribe,

        invoke: invoke,

        /**
         * Returns all servers. If methodFilter is specified will return a list of servers
         * having a method matching the filter.
         * @function servers
         * @param {MethodDefinition} [methodFilter]
         * @returns {Instance[]}
         */
        servers: function (methodFilter) {
            return getServers(methodFilter).map(function (serverMethodMap) {
                return serverMethodMap.server.getInfoForUser();
            })
        },

        /**
         * Returns all methods that match the given filter. If no filter specified returns all methods.
         *
         * @function methods
         * @param {MethodDefinition} [methodFilter] Partial  method definition
         * @return {ServerMethods[]}- methods for each server that match the filter
         **/
        methods: function (methodFilter) {
            return getMethods(methodFilter).map(function (m) {
                return m.getInfoForUser()
            })
        },

        /**
         * Returns all agm method registered by some server
         * @function methodsForInstance
         * @param {Instance} instance
         * @returns {ServerMethod[]}
         */
        methodsForInstance: function (instance) {
            return getMethodsForInstance(instance).map(function (m) {
                return m.getInfoForUser()
            })
        },

        /**
         * Called when a method is added for the first time by any application
         * @function methodAdded
         * @param {MethodCallback} callback
         */
        methodAdded: function (callback) {
            repo.onMethodAdded(function (method) {
                callback(method.getInfoForUser())
            })
        },

        /**
         * Called when a method is removed from the last application offering it
         * @function methodRemoved
         * @param {MethodCallback} callback
         */
        methodRemoved: function (callback) {
            repo.onMethodRemoved(function (method) {
                callback(method.getInfoForUser())
            })
        },

        /**
         * Called when an application offering methods (server) is discovered
         * @param {InstanceCallback} callback Callback that will be invoked with the {@link Instance} of the new sever
         */
        serverAdded: function (callback) {
            repo.onServerAdded(function (server) {
                callback(server.getInfoForUser())
            })
        },

        /**
         * Called when an app offering methods stops offering them or exits
         * @param {InstanceCallback} callback Callback that will be invoked with the {@link Instance} of the removed server
         */
        serverRemoved: function (callback) {
            repo.onServerRemoved(function (server, reason) {
                callback(server.getInfoForUser(), reason)
            })
        },


        /**
         * Called when a method is offered by an application. This will be called for each server offering the method
         * where {@link methodAdded} will be called only for the first time the method is registered.
         *
         * @param {ServerMethodCallback} callback
         */
        serverMethodAdded: function (callback) {
            repo.onServerMethodAdded(function (server, method) {
                callback({ server: server.getInfoForUser(), method: method.getInfoForUser() })
            })
        },

        /**
         * Called when a server stops offering a method
         * @param {ServerMethodCallback} callback
         */
        serverMethodRemoved: function (callback) {
            repo.onServerMethodRemoved(function (server, method) {
                callback({ server: server.getInfoForUser(), method: method.getInfoForUser() })
            })
        }
    };
};

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/*
 The AGM instance collects information about the machine we are in,
 and interacts with the .NET gateway in other ways,
 to deliver full AGM compatibility to AGM.JS.

 To do so, it relies on the default AGM client.
 */

var document = global.document || global.process;
var random = __webpack_require__(2);

module.exports = function (userSubmittedProperties, resolvedIdentity) {
    'use strict';

    var instance = {};
    // Generate default instance properties
    instance.ApplicationName = document.title + random();
    instance.ProcessId = Math.floor(Math.random() * 10000000000); // PID should be integer for protocolVersion 1
    instance.ProcessStartTime = new Date().getTime();

    // Apply user-submitted instance properties
    if (typeof userSubmittedProperties === 'object') {
        if (userSubmittedProperties.application !== undefined) {
            instance.ApplicationName = userSubmittedProperties.application;
        }
        instance.MachineName = userSubmittedProperties.machine;
        instance.UserName = userSubmittedProperties.user;
        instance.Environment = userSubmittedProperties.environment;
        instance.Region = userSubmittedProperties.region;
        instance.State = 1;
    }

    // Apply resolved identity (GW3 case)
    if (typeof resolvedIdentity !== 'undefined') {
        instance.UserName = resolvedIdentity.user;
        instance.Instance = resolvedIdentity.instance;
        instance.ApplicationName = resolvedIdentity.application;
        instance.ProcessId = resolvedIdentity.pid;
        instance.MachineName = resolvedIdentity.machine;
        instance.WindowId = resolvedIdentity.windowId;
    }

    var identityUpdated = false;

    function updateIdentity(newInstance) {
        if (identityUpdated) {
            return;
        }
        if (instance.MachineName === undefined) {
            instance.MachineName = newInstance.MachineName;
        }
        if (instance.UserName === undefined) {
            instance.UserName = newInstance.UserName;
        }
        if (instance.Environment === undefined) {
            instance.Environment = newInstance.Environment;
        }
        if (instance.Region === undefined) {
            instance.Region = newInstance.Region;
        }
        if (instance.State === undefined) {
            instance.State = newInstance.State;
        }
        identityUpdated = true;
    }

    // Create a method for accessing a property
    function createGetter(property) {
        return instance[property];
    }

    // Returns all instance properties
    function info() {
        return instance;
    }

    return {
        _updateIdentity: updateIdentity,
        info: info,
        get application() {
            return createGetter('ApplicationName');
        },
        get pid() {
            return createGetter('ProcessId');
        },
        get user() {
            return createGetter('UserName');
        },
        get machine() {
            return createGetter('MachineName');
        },
        get instance() {
            return createGetter('Instance');
        },
        get windowId() {
            return createGetter('WindowId');
        }
    };
};

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var promisify = __webpack_require__(5);
var pjson = __webpack_require__(6);

module.exports = function (configuration) {
    'use strict';

    // date parsing
    var facade = global.htmlContainer.jsAgmFacade;
    var dateTimeIdentifier = facade.jsonValueDatePrefix;
    var lenOfIdentifier = dateTimeIdentifier.length;

    function stringToObject(param, stringPropName) {
        if (typeof param === 'string') {
            var obj = {};
            obj[stringPropName] = param;
            return obj;
        }

        return param;
    }

    // helper function for parsing dates properly
    function agmParse(str) {
        return JSON.parse(str, function (k, v) {
            if (typeof v !== 'string') {
                return v;
            }

            // pre-seed - this should be a bit faster than indexOf
            if (v[0] !== dateTimeIdentifier[0]) {
                return v;
            }

            if (v.indexOf(dateTimeIdentifier) !== 0) {
                return v;
            }

            var unixTimestampMs = v.substr(lenOfIdentifier);
            return new Date(parseFloat(unixTimestampMs));
        });
    }

    /**
     * Converts a target argument to object ready to be passed to Agm facade
     * @param target
     */
    function targetArgToObject(target) {

        target = target || 'best';

        if (typeof target === 'string') {
            if (target !== 'all' && target !== 'best') {
                throw new Error('"' + target + '" is not a valid target. Valid targets are "all" and "best".');
            }
            return { target: target };
        } else {
            if (!Array.isArray(target)) {
                target = [target];
            }

            target = target.map(function (e) {
                return convertInstanceToRegex(e);
            });

            return { serverFilter: target };
        }
    }

    function convertInstanceToRegex(instance) {
        var instanceConverted = {};

        Object.keys(instance).forEach(function (key) {
            var propValue = instance[key];
            instanceConverted[key] = propValue;

            if (typeof propValue === 'undefined' || propValue === null) {
                return;
            }

            if (typeof propValue === 'string' && propValue !== '') {
                // do exact matching if user passed a string
                instanceConverted[key] = '^' + instance[key] + '$';
            } else if (instance[key].constructor === RegExp) {
                instanceConverted[key] = instance[key].source;
            } else {
                instanceConverted[key] = instance[key];
            }
        });
        return instanceConverted;
    }

    function validateMethodInfo(methodInfo) {
        if (typeof methodInfo === 'undefined') {
            throw Error('methodInfo is required argument');
        }

        if (!methodInfo.name) {
            throw Error('methodInfo object must contain name property');
        }

        if (methodInfo.objectTypes) {
            methodInfo.object_types = methodInfo.objectTypes;
        }

        if (methodInfo.displayName) {
            methodInfo.display_name = methodInfo.displayName;
        }
    }

    return new Promise(function (resolve, reject) {
        var result = {

            version: pjson.version,

            // Registers a JavaScript function as an AGM method, thus making it available other AGM instances on the same transport.
            register: function (methodInfo, callback) {
                var methodInfoAsObject = stringToObject(methodInfo, 'name');
                validateMethodInfo(methodInfoAsObject);

                var pv = this.agmFacade.protocolVersion;
                if (pv && pv >= 3) {
                    // for newer HC use the version where we don't pass arguments as JSON (because of different issues)
                    this.agmFacade.register(JSON.stringify(methodInfoAsObject),
                        callback,
                        true); // return as objects
                } else {
                    this.agmFacade.register(JSON.stringify(methodInfoAsObject),
                        function (arg) {
                            var result = callback(JSON.parse(arg), arguments[1]);
                            return JSON.stringify(result);
                        });
                }
            },

            registerAsync: function (methodInfo, callback) {
                if (!this.agmFacade.registerAsync) {
                    throw new Error('not supported in that version of HtmlContainer');
                }

                var methodInfoAsObject = stringToObject(methodInfo, 'name');
                validateMethodInfo(methodInfoAsObject);

                this.agmFacade.registerAsync(methodInfoAsObject,
                    function (args, instance, tracker) {
                        // execute the user callback
                        callback(args,
                            instance,
                            function (successArgs) {
                                tracker.success(successArgs);
                            },
                            function (error) {
                                tracker.error(error)
                            });
                    });
            },

            unregister: function (methodFilter) {
                this.agmFacade.unregister(JSON.stringify(stringToObject(methodFilter, 'name')));
            },

            // Invokes an AGM method asynchronously.
            invoke: function (methodFilter, args, target, options, successCallback, errorCallback) {

                var promise = new Promise(function (resolve, reject) {

                    if (args === undefined) {
                        args = {};
                    }

                    if (typeof args !== 'object') {
                        reject({ message: 'The method arguments must be an object.' });
                    }

                    if (options === undefined) {
                        options = {};
                    }

                    target = targetArgToObject(target);

                    if (this.agmFacade.invoke2) {
                        // invoke ver2 - do not stringify arguments and result values
                        this.agmFacade.invoke2(
                            JSON.stringify(stringToObject(methodFilter, 'name')),
                            args,
                            JSON.stringify(target),
                            JSON.stringify(options),
                            function (args) {
                                resolve(args)
                            },
                            function (err) {
                                reject(err)
                            }
                        );
                    } else {
                        var successProxy, errorProxy;

                        successProxy = function (args) {
                            var parsed = JSON.parse(args);
                            resolve(parsed);
                        };
                        errorProxy = function (args) {
                            var parsed = JSON.parse(args);
                            reject(parsed);
                        };
                        this.agmFacade.invoke(
                            JSON.stringify(stringToObject(methodFilter, 'name')),
                            JSON.stringify(args),
                            JSON.stringify(target),
                            JSON.stringify(options),
                            successProxy,
                            errorProxy
                        );
                    }

                }.bind(this));

                return promisify(promise, successCallback, errorCallback);
            },

            // Registers a handler which notifies you when a new AGM method is available.
            methodAdded: function (callback) {
                this.agmFacade.methodAdded(callback);
            },

            // Registers a handler which notifies you when an AGM method stops being available.
            methodRemoved: function (callback) {
                this.agmFacade.methodRemoved(callback);
            },

            serverAdded: function (callback) {
                this.agmFacade.serverAdded(callback);
            },

            serverRemoved: function (callback) {
                this.agmFacade.serverRemoved(callback);
            },

            serverMethodAdded: function (callback) {
                this.agmFacade.serverMethodAdded(callback);
            },

            serverMethodRemoved: function (callback) {
                this.agmFacade.serverMethodRemoved(callback);
            },

            // Retrieves a list of AGM servers (instances) optionally filtered by method.
            servers: function (methodFilter) {
                var jsonResult = this.agmFacade.servers(JSON.stringify(stringToObject(methodFilter, 'name')));
                var parsedResult = agmParse(jsonResult);
                parsedResult.forEach(function(server) {
                    server.getMethods = function() {
                        return this.methodsForInstance(server);
                    }.bind(this);
                    server.getStreams = function() {
                        return this.methodsForInstance(server).filter(function (method) {
                            return method.supportsStreaming;
                        });
                    }.bind(this);
                }, this);
                return parsedResult;
            },

            // Retrieves a list of methods that matches a given filter. You can use this to check if a given method exists.
            methods: function (methodFilter) {
                var jsonResult = this.agmFacade.methods(JSON.stringify(stringToObject(methodFilter, 'name')));
                var parsedResult = agmParse(jsonResult);
                parsedResult.forEach(function (method) {
                    method.displayName = method.display_name;
                    method.objectTypes = method.object_types;
                    method.getServers = function () {
                        return this.servers(method.name);
                    }.bind(this);
                }, this);
                return parsedResult;
            },

            methodsForInstance: function (instanceFilter) {
                var jsonResult = this.agmFacade.methodsForInstance(JSON.stringify(instanceFilter));
                return agmParse(jsonResult);
            },

            // streaming support
            subscribe: function (name, options, successCallback, errorCallback) {
                var promise = new Promise(function (resolve, reject) {
                    if (options === undefined) {
                        options = {};
                    }
                    options.args = JSON.stringify(options.arguments || {});
                    options.target = targetArgToObject(options.target);

                    this.agmFacade.subscribe2(name,
                        JSON.stringify(options),
                        function (stream) {
                            resolve(stream);
                        },
                        function (error) {
                            reject(error);
                        }
                    );
                }.bind(this));

                return promisify(promise, successCallback, errorCallback);
            },

            createStream: function (streamDef, callbacks, successCallback, errorCallback) {
                var promise = new Promise(function (resolve, reject) {
                    if (typeof streamDef === 'string') {
                        streamDef = { name: streamDef };
                    }

                    if (!callbacks) {
                        callbacks = {};
                    }

                    this.agmFacade.createStream2(
                        JSON.stringify(streamDef),
                        // TODO - wrap to transform params
                        callbacks.subscriptionRequestHandler,
                        // TODO - wrap to transform params
                        callbacks.subscriptionAddedHandler,
                        // TODO - wrap to transform params
                        callbacks.subscriptionRemovedHandler,
                        // success handler
                        function (stream) {
                            resolve(stream);
                        },
                        // error handler
                        function (error) {
                            reject(error);
                        }
                    );
                }.bind(this));

                return promisify(promise, successCallback, errorCallback);
            }
        };

        // add metrics
        if (configuration !== undefined && configuration.metrics !== undefined) {
            configuration.metrics.metricsIdentity = configuration.metrics.identity;

            // quick and dirty - we need to stringify the configuration so we need to replace the metrics object (which has circular references)
            // with an object that holds only the properties needed
            var metricsConfig = {
                metricsIdentity: configuration.metrics.metricsIdentity,
                path: configuration.metrics.path
            };
            configuration.metrics = metricsConfig;
        }
        // remove the logger - we don't need it in HC and has circular references
        delete configuration.logger;

        // create new AGM façade for this instance
        var successInit = function(instance) {

            result.instance = instance;
            result.agmFacade = facade;

            // deprecated API
            result.create_stream = result.createStream;
            result.methods_for_instance = result.methodsForInstance;
            result.method_added = result.methodAdded;
            result.method_removed = result.methodRemoved;
            result.server_added = result.serverAdded;
            result.server_removed = result.serverRemoved;
            result.server_method_added = result.serverMethodAdded;
            result.server_method_removed = result.serverMethodRemoved;

            resolve(result);
        };

        var cfgAsString = JSON.stringify(configuration);
        var pv = facade.protocolVersion;

        if (pv && pv >= 5 && facade.initAsync) {
            facade.initAsync(cfgAsString,
                successInit,
                function (err) {
                    reject(err);
                });
        } else {
            var instance = facade.init(cfgAsString);
            successInit(instance);
        }
    });
};

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

/*
 * Repository holding servers and methods visible by this peer including those created by the peer itself.
 */

var Callbacks = __webpack_require__(1);

module.exports = function () {
    'use strict';

    // each server has format {id:'', info:{}, methods:{}}
    // where methods has format {id:'', info:{}}
    var servers = {};

    // object keyed by method id - value is number of servers that offer that method
    var methodsCount = {};

    // store for callbacks
    var callbacks = new Callbacks();

    // add a new server to internal collection
    function addServer(info, serverId) {
        var current = servers[serverId];
        if (current) {
            return current.id;
        }

        var serverEntry = { id: serverId, info: info, methods: {} };
        serverEntry.getInfoForUser = function () {
            var serverInfo = createUserServerInfo(serverEntry.info);
            serverInfo.getMethods = function () {
                var methods = getServerMethodById(serverEntry.id);
                return methods.map(function (m) {
                    return m.getInfoForUser()
                });
            };
            serverInfo.getStreams = function () {
                var methods = getServerMethodById(serverEntry.id);
                methods = methods.filter(function (method) {
                    return method.supportsStreaming;
                });
                return methods.map(function (m) {
                    return m.getInfoForUser()
                });

            };
            return serverInfo;
        };

        servers[serverId] = serverEntry;
        callbacks.execute('onServerAdded', serverEntry);
        return serverId;
    }

    function removeServerById(id, reason) {
        var server = servers[id];

        Object.keys(server.methods).forEach(function (methodId) {
            removeServerMethod(id, methodId);
        });

        delete servers[id];
        callbacks.execute('onServerRemoved', server, reason);
    }

    function addServerMethod(serverId, method) {
        var server = servers[serverId];
        if (!server) {
            throw new Error('server does not exists');
        }

        var methodId = createMethodId(method);

        // server already has that method
        if (server.methods[methodId]) {
            return;
        }

        var methodEntity = { id: methodId, info: method };
        methodEntity.getInfoForUser = function () {
            var result = createUserMethodInfo(methodEntity.info);
            result.getServers = function () {
                return getServersByMethod(this.id);
            }.bind(this);
            return result;
        };
        server.methods[methodId] = methodEntity;

        // increase the ref and notify listeners
        if (!methodsCount[methodId]) {
            methodsCount[methodId] = 0;
            callbacks.execute('onMethodAdded', methodEntity);
        }
        methodsCount[methodId] = methodsCount[methodId] + 1;
        callbacks.execute('onServerMethodAdded', server, methodEntity);
    }

    function createMethodId(methodInfo) {
        // Setting properties to defaults:
        var accepts = methodInfo.accepts !== undefined ? methodInfo.accepts : '';
        var returns = methodInfo.returns !== undefined ? methodInfo.returns : '';
        var version = methodInfo.version !== undefined ? methodInfo.version : 0;
        return (methodInfo.name + accepts + returns + version).toLowerCase();
    }

    function removeServerMethod(serverId, methodId) {
        var server = servers[serverId];
        if (!server) {
            throw new Error('server does not exists');
        }

        var method = server.methods[methodId];
        delete server.methods[methodId];

        // update ref counting
        methodsCount[methodId] = methodsCount[methodId] - 1;
        if (methodsCount[methodId] === 0) {
            callbacks.execute('onMethodRemoved', method);
        }

        callbacks.execute('onServerMethodRemoved', server, method);
    }

    function getServersByMethod(id) {
        var allServers = [];
        Object.keys(servers).forEach(function (serverId) {
            var server = servers[serverId];
            Object.keys(server.methods).forEach(function (methodId) {
                if (methodId === id) {
                    allServers.push(server.getInfoForUser());
                }
            })
        });
        return allServers;
    }

    function getMethods() {
        var allMethods = {};
        Object.keys(servers).forEach(function (serverId) {
            var server = servers[serverId];
            Object.keys(server.methods).forEach(function (methodId) {
                var method = server.methods[methodId];
                allMethods[method.id] = method;
            })
        });

        var methodsAsArray = Object.keys(allMethods).map(function (id) {
            return allMethods[id];
        });

        return methodsAsArray;
    }

    function getServers() {
        var allServers = [];
        Object.keys(servers).forEach(function (serverId) {
            var server = servers[serverId];
            allServers.push(server)
        });

        return allServers;
    }

    function getServerMethodById(serverId) {
        var server = servers[serverId];

        return Object.keys(server.methods).map(function (id) {
            return server.methods[id];
        });
    }

    function onServerAdded(callback) {
        callbacks.add('onServerAdded', callback);

        // replay all servers
        getServers().forEach(function (server) {
            callback(server);
        });
    }

    function onMethodAdded(callback) {
        callbacks.add('onMethodAdded', callback);

        // reply all existing methods
        getMethods().forEach(function (method) {
            callback(method);
        })
    }

    function onServerMethodAdded(callback) {
        callbacks.add('onServerMethodAdded', callback);

        // replay all existing server methods
        getServers().forEach(function (server) {
            var methods = server.methods;
            Object.keys(methods).forEach(function (methodId) {
                callback(server, methods[methodId]);
            });
        });
    }

    function getServerById(id) {
        return servers[id];
    }

    /**
     * Transforms internal server object to user object
     * @param server
     * @returns {{machine: *, pid: *, started: *, user: *, application: *, environment: *, region: *, service_name: *, state: *}}
     */
    function createUserServerInfo(serverInfo) {
        return {
            machine: serverInfo.machine,
            pid: serverInfo.pid,
            user: serverInfo.user,
            application: serverInfo.application,
            environment: serverInfo.environment,
            region: serverInfo.region,
            instance: serverInfo.instance,
            windowId: serverInfo.windowId
        };
    }

    /**
     * Transforms internal method object to user object
     * @param method
     * @returns {{name: *, accepts: *, returns: *, description: *, display_name: *, version: *, object_types: (*|Array)}}
     */
    function createUserMethodInfo(methodInfo) {
        return {
            name: methodInfo.name,
            accepts: methodInfo.accepts,
            returns: methodInfo.returns,
            description: methodInfo.description,
            displayName: methodInfo.displayName,
            display_name: methodInfo.displayName,
            version: methodInfo.version,
            objectTypes: methodInfo.objectTypes,
            object_types: methodInfo.objectTypes,
            supportsStreaming: methodInfo.supportsStreaming
        };
    }

    function reset() {
        servers = {};
        methodsCount = {};
    }

    return {
        getServerById: getServerById,
        getServers: getServers,
        getMethods: getMethods,
        getServerMethodsById: getServerMethodById,
        getMethodId: createMethodId,
        addServer: addServer,
        addServerMethod: addServerMethod,
        removeServerById: removeServerById,
        removeServerMethod: removeServerMethod,

        onServerAdded: onServerAdded,
        onServerRemoved: function (callback) {
            callbacks.add('onServerRemoved', callback);
        },
        onMethodAdded: onMethodAdded,
        onMethodRemoved: function (callback) {
            callbacks.add('onMethodRemoved', callback);
        },
        onServerMethodAdded: onServerMethodAdded,
        onServerMethodRemoved: function (callback) {
            callbacks.add('onServerMethodRemoved', callback);
        },

        reset: reset
    }
};


/***/ }),
/* 25 */
/***/ (function(module, exports) {

/*
 The streaming module defines the user objects relevant to the streaming api, and
 attaches to relevant events exposed by the protocol.
 */

module.exports = function (protocol, unregister) {
    'use strict';

    function streamFrontObj(repoMethod) {
        var def = repoMethod.definition;

        return {
            branches: function () {
                var bList = protocol.getBranchList(repoMethod);
                return bList.map(function (branchKey) {
                    return branchFrontObj(repoMethod, branchKey)
                });
            },
            close: function () {
                protocol.closeAllSubscriptions(repoMethod);
                unregister(repoMethod.definition);
            },
            definition: {
                accepts: def.accepts,
                description: def.description,
                displayName: def.displayName,
                name: def.name,
                objectTypes: def.objectTypes,
                returns: def.returns,
                supportsStreaming: def.supportsStreaming
            },
            name: def.name,
            push: function (data, branches) {
                if (typeof branches !== 'string' && !Array.isArray(branches) && branches !== undefined) {
                    throw new Error('invalid branches should be string or string array');
                }
                // TODO validate if is plain object
                if (typeof data !== 'object') {
                    throw new Error('Invalid arguments. Data must be an object.')
                }
                protocol.pushData(repoMethod, data, branches)
            },
            subscriptions: function () {
                var subList = protocol.getSubscriptionList(repoMethod);
                return subList.map(function (sub) {
                    return subscriptionFrontObj(repoMethod, sub)
                });
            }
        }
    }

    function subscriptionFrontObj(repoMethod, subscription) {
        return {
            arguments: subscription.arguments || {},
            branchKey: subscription.branchKey,
            close: function () {
                protocol.closeSingleSubscription(repoMethod, subscription)
            },
            instance: subscription.instance,
            push: function (data) {
                protocol.pushDataToSingle(repoMethod, subscription, data);
            },
            stream: repoMethod.definition
        };
    }

    function branchFrontObj(repoMethod, branchKey) {
        return {
            key: branchKey,
            subscriptions: function () {
                var subList = protocol.getSubscriptionList(repoMethod, branchKey);
                return subList.map(function (sub) {
                    return subscriptionFrontObj(repoMethod, sub)
                });
            },
            close: function () {
                protocol.closeAllSubscriptions(repoMethod, branchKey);
            },
            push: function (data) {
                protocol.pushToBranch(repoMethod, data, branchKey)
            }
        };
    }

    /** Attach to stream 'events' */
    protocol.onSubRequest(function (requestContext, repoMethod) {

        if (!(
            repoMethod &&
            repoMethod.streamCallbacks &&
            typeof repoMethod.streamCallbacks.subscriptionRequestHandler === 'function')
        ) {
            return;
        }

        repoMethod.streamCallbacks.subscriptionRequestHandler({
            accept: function () {
                protocol.acceptRequestOnBranch(requestContext, repoMethod, '');
            },
            acceptOnBranch: function (branch) {
                protocol.acceptRequestOnBranch(requestContext, repoMethod, branch)
            },
            arguments: requestContext.arguments,
            instance: requestContext.instance,
            reject: function (reason) {
                protocol.rejectRequest(requestContext, repoMethod, reason)
            }
        });
    });

    protocol.onSubAdded(function (subscription, repoMethod) {

        if (!(
            repoMethod &&
            repoMethod.streamCallbacks &&
            typeof repoMethod.streamCallbacks.subscriptionAddedHandler === 'function')
        ) {
            return;
        }

        repoMethod.streamCallbacks.subscriptionAddedHandler(subscriptionFrontObj(repoMethod, subscription))

    });

    protocol.onSubRemoved(function (subscriber, repoMethod) {

        if (!(
            repoMethod &&
            repoMethod.streamCallbacks &&
            typeof repoMethod.streamCallbacks.subscriptionRemovedHandler === 'function')
        ) {
            return;
        }

        repoMethod.streamCallbacks.subscriptionRemovedHandler(subscriber)

    });

    return { streamFrontObj: streamFrontObj };
};


/***/ }),
/* 26 */
/***/ (function(module, exports) {

/*
 * A store for holding method back-objects registered by this instance's server
 */
module.exports = function () {
    'use strict';

    var nextId = 0;
    var _methods = [];

    function add(method) {
        if (typeof method !== 'object') {
            return;
        }

        if (method._repoId !== undefined) {
            return;
        }

        // id should be a string
        method._repoId = String(nextId);
        nextId += 1;

        _methods.push(method);

        return method;
    }

    function remove(repoId) {
        if (typeof repoId !== 'string') {
            return new TypeError('Expecting a string');
        }

        _methods = _methods.filter(function (m) {
            return m._repoId !== repoId;
        });
    }

    function getById(id) {
        if (typeof id !== 'string') {
            return new TypeError('Expecting a string');
        }

        return _methods.filter(function (m) {
            return m._repoId === id
        })[0];
    }

    function getList() {
        return _methods.map(function (m) {
            return m;
        });
    }

    function length() {
        return _methods.length;
    }

    function reset() {
        _methods = [];
    }

    return {
        add: add,
        remove: remove,
        getById: getById,
        getList: getList,
        length: length,
        reset: reset
    };
};


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

/*
 The AGM Server allows users register AGM methods.
 It exposes these methods to AGM clients (using presence messages) and listens for their invocation
 */

var Promisify = __webpack_require__(5);
var Streaming = __webpack_require__(25);

/**
 * @module agm
 */
module.exports = function (protocol, vault, instance, configuration) {
    'use strict';

    // Save the reference to the metric function if it exists
    var metric = (configuration.metrics !== undefined) ? configuration.metrics.numberMetric.bind(configuration.metrics) : function () {
    };

    // An array of the server's methods
    var streaming = new Streaming(protocol, unregister);

    protocol.onInvoked(onMethodInvoked);

    var invocations = 0;

    function onMethodInvoked(methodToExecute, invocationId, invocationArgs) {
        metric('Invocations count', invocations++);

        if (!methodToExecute) {
            return;
        }

        // Execute it and save the result
        methodToExecute.theFunction(invocationArgs, function (err, result) {
            if (err) {
                // handle error case
                if (typeof err.message === 'string') {
                    err = err.message;
                } else if (typeof err !== 'string') {
                    err = '';
                }
            }

            // The AGM library only transfers objects. If the result is not an object, put it in one
            if (!result || typeof result !== 'object' || result.constructor === Array) {
                result = { _result: result };
            }

            protocol.methodInvocationResult(methodToExecute, invocationId, err, result)
        });
    }

    /**
     * Registers a new agm method
     * @param {MethodDefinition} methodDefinition
     * @param {MethodHandler} callback Callback that will be called when the AGM server is invoked
     */
    function register(methodDefinition, callback) {

        var wrappedCallbackFunction = function (context, resultCallback) {
            // get the result as direct invocation of the callback and return it using resultCallback
            try {
                var result = callback(context.args, context.instance);
                resultCallback(null, result);
            } catch (e) {
                resultCallback(e, e);
            }
        };

        wrappedCallbackFunction.userCallback = callback;

        registerCore(methodDefinition, wrappedCallbackFunction);
    }

    // registers a new async agm method (the result can be returned in async way)
    function registerAsync(methodDefinition, callback) {

        var wrappedCallback = function (context, resultCallback) {
            // invoke the callback passing success and error callbacks
            try {
                callback(context.args, context.instance,
                    // success callback
                    function (result) {
                        resultCallback(null, result);
                    },
                    // error callback
                    function (e) {
                        resultCallback(e, e);
                    });
            } catch (e) {
                resultCallback(e, null);
            }
        };
        wrappedCallback.userCallback = callback;
        wrappedCallback.isAsync = true;

        registerCore(methodDefinition, wrappedCallback);
    }

    // Registers a new streaming agm method
    function createStream(streamDef, callbacks, successCallback, errorCallback) {
        // in callbacks we have subscriptionRequestHandler, subscriptionAddedHandler, subscriptionRemovedHandler

        var promise = new Promise(function (resolve, reject) {
            if (typeof streamDef === 'string') {

                if (streamDef === '') {
                    reject('Invalid stream name.');
                }

                streamDef = { name: streamDef };
            }

            streamDef.supportsStreaming = true;

            // User-supplied subscription callbacks
            if (!callbacks) {
                callbacks = {};
            }

            if (typeof callbacks.subscriptionRequestHandler !== 'function') {
                callbacks.subscriptionRequestHandler = function (request) {
                    request.accept();
                }
            }

            var repoMethod = {
                method: undefined, // to be initialized by protocol
                definition: streamDef, // store un-formatted definition for checkups in un-register method
                streamCallbacks: callbacks
            };

            // Add the method
            vault.add(repoMethod);

            protocol.createStream(repoMethod, streamDef,
                function protocolSuccess() {
                    metric('Registered methods', vault.length());

                    var streamFrobject = streaming.streamFrontObj(repoMethod);

                    resolve(streamFrobject);
                },
                function protocolFail(err) {
                    vault.remove(repoMethod._repoId);

                    reject(err);
                });
        });

        return new Promisify(promise, successCallback, errorCallback);
    }

    // Core method for registering agm method
    function registerCore(methodDefinition, theFunction) {
        // transform the definition
        if (typeof methodDefinition === 'string') {
            methodDefinition = { name: methodDefinition };
        }

        // Add the method ()
        var repoMethod = vault.add({
            definition: methodDefinition, // store un-formatted definition for checkups in un-register method
            theFunction: theFunction
        });

        protocol.register(repoMethod,
            function protocolSuccess() {
                metric('Registered methods', vault.length());
            },
            function protocolFail() {
                vault.remove(repoMethod._repoId);
            });
    }

    // Converts the method definition from camel case to snake case
    function containsProps(filter, object) {
        var match = true;
        Object.keys(filter).forEach(function (prop) {
            if (filter[prop] !== object[prop]) {
                match = false;
            }
        });
        return match;
    }


    // TODO add success/fail here and at gw1+2 implementations?
    // Unregisters a previously registered AGM method
    function unregister(methodFilter) {
        if (typeof methodFilter === 'string') {
            methodFilter = { name: methodFilter };
        }

        var methodsToBeRemoved = vault.getList().filter(function (method) {
            return containsProps(methodFilter, method.definition);
        });

        // update repository
        methodsToBeRemoved.forEach(function (method) {
            vault.remove(method._repoId);
            protocol.unregister(method);
        });

        metric('Registered methods', vault.length());
    }

    return {
        register: register,
        registerAsync: registerAsync,
        unregister: unregister,
        createStream: createStream
    };
};


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var instance = __webpack_require__(22);
var nativeAgm = __webpack_require__(23);
var pjson = __webpack_require__(6);
var client = __webpack_require__(21);
var server = __webpack_require__(27);
var gW1Protocol = __webpack_require__(31);
var gW3Protocol = __webpack_require__(36);
var repository = __webpack_require__(24);
var vault = __webpack_require__(26);


/**
 * Callback that is invoked with server and method
 * @callback ServerMethodCallback
 * @param {Instance} server
 * @param {MethodDefinition[]} methods
 * */

/**
 * Callback that is invoked with server and method
 * @callback ServerMethodCallback
 * @param {Instance} server
 * @param {MethodDefinition[]} methods
 * */


/**
 * Callback that is invoked with server argument
 * @callback InstanceCallback
 * @param {Instance} server
 * */

/**
 * User provided callback that will be called when the AGM is invoked
 * @callback MethodHandler
 */

/**
 *
 * @callback MethodCallback
 * @param {MethodDefinition} method
 */

/**
 * Each AGM application is identified by its AGM instance, which is a set of known key/value pairs.
 *
 * @typedef Instance
 * @property application
 * @property environment
 * @property machine
 * @property pid
 * @property region
 * @property service
 * @property user
 *
 */

/**
 * Object describing an AGM method registered by some application
 *
 * @typedef MethodDefinition
 * @property name The name of the methods
 * @property {string} [accepts] AGM signature, describing what are the parameters the method expects
 * @property {string} [returns] AGM signature, describing what are the properties of the result object the method returns
 * @property {string} [displayName] The human-readable name of the method, which should be used in UI applications, e.g. ‘Open Client Performance’
 * @property {string} [description] Description of what the method does, useful for documentation purposes, and for UI clients, e.g. 'Launches or activates the Client Performance application’
 * @property {string[]} [objectTypes] The entities this method is meant to work on, e.g. a party (client, prospect, lead), instrument, order, etc. More on this later.
 * @property {boolean} [supportsStreaming] If true the method is a strea
 */

/**
 *
 * @typedef InvocationResult
 * @property {MethodDefinition} method - The invoked method definition
 * @property {Object} called_with - The arguments used for the invocation
 * @property {Object} returned - The data returned from the server
 * @property {InvocationResult[]} all_return_values  - Invoking a method on multiple AGM instances produces multiple results. Use all_return_values to obtain all inner results.
 * all_return_values is an array with the same structure as returned for single app invokes.
 * @property {Instance} executed_by - The server that executed the method. If executed on more than one target check all_return_values
 * @property {InvocationError} all_errors
 */

/**
 * @typedef InvocationError
 * @property {Instance} executed_by The server that returns the error
 * @property {string} message Error message returned from the server
 */

/**
 * Invocation options
 * @typedef InvocationOptions
 * @property {number} wait_for_method_timeout Timeout to discover the method if not immediately available (in ms, default 30 secs)
 * @property {number} method_response_timeout Timeout to wait for a method reply (when using the default async value for call_type (in ms, default 30 secs)
 */

/**
 * Object describing methods registered by some AGM server
 *
 * @typedef ServerMethods
 * @property {Instance} server
 * @property {Method[]} methods
 */

/**
 * @module agm
 */
var agm = function (configuration) {
    'use strict';
    // We will store the library here
    var agm = {};
    agm.version = pjson.version;


    // Init configuration
    if (typeof configuration !== 'object') {
        configuration = {};
    }

    // Validate configuration

    // Init child configuration if it is not already passed by user
    var childConfigurations = ['connection', 'client', 'server'];
    childConfigurations.forEach(function (conf) {
        if (typeof configuration[conf] !== 'object') {
            configuration[conf] = {};
        }
        // Set debug if global debug is not set:
        if (configuration.debug) {
            configuration[conf].debug = true;
        }
    });

    if (typeof configuration.client.remove_server_on_n_missing_heartbeats !== 'number') {
        configuration.client.remove_server_on_n_missing_heartbeats = 3;
    }
    if (typeof configuration.client.method_response_timeout !== 'number') {
        configuration.client.method_response_timeout = 3000;
    }
    if (typeof configuration.client.wait_for_method_timeout !== 'number') {
        configuration.client.wait_for_method_timeout = 3000;
    }

    if (typeof configuration.server.heartbeat_interval !== 'number') {
        configuration.server.heartbeat_interval = 5000;
    }
    if (typeof configuration.server.presence_interval !== 'number') {
        configuration.server.presence_interval = 10000;
    }

    // Determine if we are given a connection object. If not, create it ourselves:
    var c = configuration.connection;
    if (!c) {
        throw new Error('configuration.connection is required');
    }
    agm.connection = c;

    // Create a connection proxy which sets the product name automatically
    var productName = 'agm';
    agm.connection.sendAGM = function (type, message) {
        agm.connection.send(productName, type, message);
    };
    agm.connection.onAGM = function (type, handler) {
        agm.connection.on(productName, type, handler);
    };
    // Save a reference to the root system object that we are given
    var metricsRoot = configuration.metrics;
    // Create subsystems for our modules and save them in their configuration.
    if (metricsRoot !== undefined) {
        configuration.client.metrics = metricsRoot.subSystem('Client');
        configuration.server.metrics = metricsRoot.subSystem('Server');
    }

    // Initialize our modules
    agm.instance = instance(configuration.instance, agm.connection.resolvedIdentity);
    var clientRepository = repository();
    var serverRepository = vault();
    var protocolPromise;
    var protocolVersion = c.protocolVersion;
    if (protocolVersion === 3) {
        var serverGetter = function () {
            return agm.server;
        };
        var clientGetter = function () {
            return agm.client;
        };
        protocolPromise = gW3Protocol(agm.instance, agm.connection, clientRepository, serverRepository, configuration, serverGetter, clientGetter);
    } else {
        protocolPromise = gW1Protocol(agm.instance, agm.connection, clientRepository, serverRepository, configuration);
    }

    return new Promise(function(resolve, reject) {
        // wait for protocol to resolve
        protocolPromise.then(function (protocol) {
            agm.client = client(protocol, clientRepository, agm.instance, configuration.client);
            agm.server = server(protocol, serverRepository, agm.instance, configuration.server);

            // Add method aliases
            agm.invoke = agm.client.invoke;
            agm.register = agm.server.register;
            agm.registerAsync = agm.server.registerAsync;
            agm.unregister = agm.server.unregister;
            agm.createStream = agm.server.createStream;
            agm.subscribe = agm.client.subscribe;
            agm.servers = agm.client.servers;
            agm.methods = agm.client.methods;

            agm.methodsForInstance = agm.client.methodsForInstance;
            agm.method = agm.client.method;
            agm.methodAdded = agm.client.methodAdded;
            agm.methodRemoved = agm.client.methodRemoved;

            agm.serverMethodAdded = agm.client.serverMethodAdded;
            agm.serverMethodRemoved = agm.client.serverMethodRemoved;

            agm.serverAdded = agm.client.serverAdded;
            agm.serverRemoved = agm.client.serverRemoved;

            resolve(agm);

        }).catch(function (err) {
            reject(err);
        });
    });

};
agm = global.htmlContainer !== undefined ? nativeAgm : agm;
// support for es6 imports
agm.default = agm;
module.exports = agm;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var random = __webpack_require__(2);
var helpers = __webpack_require__(4);

module.exports = function (configuration, instance, sendRequest, nextResponseSubject) {
    'use strict';

    var STATUS_AWAITING_ACCEPT = 'awaitingAccept'; // not even one server has accepted yet
    var STATUS_SUBSCRIBED = 'subscribed'; // at least one server has responded as 'Accepting'
    var ERR_MSG_SUB_FAILED = 'Subscription failed.';
    var ERR_MSG_SUB_REJECTED = 'Subscription rejected.';
    var ON_CLOSE_MSG_SERVER_INIT = 'ServerInitiated';
    var ON_CLOSE_MSG_CLIENT_INIT = 'ClientInitiated';

    var subscriptionsList = {};

    function subscribe(streamingMethod, argumentObj, targetServers, stuff, success, error) {
        if (targetServers.length === 0) {
            error(ERR_MSG_SUB_FAILED + ' No available servers matched the target params.');
            return;
        }

        // This same Id will be passed to all the servers (as 'InvocationId')
        // so they can respond back with it during the initial handshake
        var subscriptionId = 'subscriptionId_' + random();

        // Register the user's callbacks
        var pendingSub = registerSubscription(
            subscriptionId,
            streamingMethod,
            argumentObj,
            success,
            error,
            stuff.method_response_timeout
        );

        if (typeof pendingSub !== 'object') {
            error(ERR_MSG_SUB_FAILED + ' Unable to register the user callbacks.');
            return;
        }

        // Send a subscription request to each server
        targetServers.forEach(function (target) {

            // Get a response subject for this invocation
            var responseSubject = nextResponseSubject();

            // Add server to the list of ones the client is expecting a response from
            pendingSub.trackedServers.push({
                server: undefined,
                streamId: undefined,
                streamSubjects: {
                    global: undefined,
                    private: undefined
                },
                methodRequestSubject: streamingMethod.info.requestSubject,
                methodResponseSubject: responseSubject
            });

            // Construct a message
            var message = {
                EventStreamAction: 1, // "Subscribe" = client wishes to subscribe
                MethodRequestSubject: streamingMethod.info.requestSubject,
                MethodResponseSubject: responseSubject,
                Client: instance.info(),
                Context: {
                    ArgumentsJson: argumentObj,
                    InvocationId: subscriptionId,
                    ObjectType: stuff.object_type,
                    DisplayContext: stuff.display_context,
                    MethodName: streamingMethod.info.name,
                    ExecutionServer: target.server.info,
                    Timeout: stuff.method_response_timeout
                }
            };

            // Send it
            sendRequest(message);

            if (global.console !== undefined && configuration.debug === true) {
                console.debug('%c>>> sending MethodInvocationRequestMessage', 'background-color:hsla(198, 51%, 79%, 0.5)');
                console.debug('%c' + JSON.stringify(message), 'background-color:hsla(198, 51%, 79%, 0.5)');
            }
        });
    }

    function registerSubscription(subscriptionId, method, args, success, error, timeout) {

        subscriptionsList[subscriptionId] = {
            status: STATUS_AWAITING_ACCEPT,
            method: method,
            arguments: args,
            success: success,
            error: error,
            trackedServers: [],
            handlers: {
                onData: [],
                onClosed: []
                // onFailed: []
            },
            queued: {
                data: [],
                closers: []
            },
            timeoutId: undefined
        };


        subscriptionsList[subscriptionId].timeoutId = setTimeout(function () {
            if (subscriptionsList[subscriptionId] === undefined) {
                return; // no such subscription
            }

            var subscription = subscriptionsList[subscriptionId];


            if (subscription.status === STATUS_AWAITING_ACCEPT) {
                error({
                    method: method,
                    called_with: args,
                    message: ERR_MSG_SUB_FAILED + ' Subscription attempt timed out after ' + timeout + 'ms.'
                });

                // None of the target servers has answered the subscription attempt
                delete subscriptionsList[subscriptionId];

            } else if (subscription.status === STATUS_SUBSCRIBED &&
                subscription.trackedServers.length > 0) {
                // Clean the trackedServers, removing those without valid streamId
                subscription.trackedServers = subscription.trackedServers.filter(function (server) {
                    return (typeof server.streamId === 'string' && server.streamId !== '')
                });

                subscription.timeoutId = undefined;

                if (subscription.trackedServers.length === 0) {
                    // TODO this might be dead-code, where is closers.push?
                    // There are no open streams, some servers accepted then closed very quickly
                    //	(that's why the status changed but there's no good server with a StreamId)

                    // call the onClosed handlers
                    var closersCount = subscription.queued.closers.length;
                    var closingServer = (closersCount > 0) ? subscription.queued.closers[closersCount - 1] : null;

                    subscription.handlers.onClosed.forEach(function (callback) {
                        if (typeof callback === 'function') {
                            callback({
                                message: ON_CLOSE_MSG_SERVER_INIT,
                                requestArguments: subscription.arguments,
                                server: closingServer,
                                stream: subscription.method
                            })
                        }
                    });

                    delete subscriptionsList[subscriptionId];
                }
            }
        }, timeout);

        return subscriptionsList[subscriptionId]
    }

    function processPublisherMsg(msg) {
        if (!(msg && msg.EventStreamAction && msg.EventStreamAction !== 0)) {
            return;
        }

        if (msg.EventStreamAction === 2) {

            serverIsKickingASubscriber(msg);

        } else if (msg.EventStreamAction === 3) {

            serverAcknowledgesGoodSubscription(msg);

        } else if (msg.EventStreamAction === 5) {

            serverHasPushedSomeDataIntoTheStream(msg);
        }

    }

    /** msg 'Response' Actions */
    // action 2
    function serverIsKickingASubscriber(msg) {
        // Note: this might be either the server rejecting a subscription request OR closing an existing subscription

        // Get ALL subscriptions
        var keys = Object.keys(subscriptionsList);

        // If it is a rejection there may be an InvocationId, it can narrow the search
        if (typeof msg.InvocationId === 'string' && msg.InvocationId !== '') {
            keys = keys.filter(function (k) {
                return k === msg.InvocationId;
            })
        }

        var deletionsList = [];

        // Find the kicking/rejecting server and remove it from the subscription.trackedServers[]
        keys.forEach(function (key) {
            if (typeof subscriptionsList[key] !== 'object') {
                return;
            }

            subscriptionsList[key].trackedServers = subscriptionsList[key].trackedServers.filter(function (server) {
                var isRejecting = (
                    server.methodRequestSubject === msg.MethodRequestSubject && server.methodResponseSubject === msg.MethodResponseSubject
                );

                var isKicking = (
                    server.streamId === msg.StreamId &&
                    (server.streamSubjects.global === msg.EventStreamSubject || server.streamSubjects.private === msg.EventStreamSubject)
                );

                var isRejectingOrKicking = isRejecting || isKicking;

                return !isRejectingOrKicking;
            });

            if (subscriptionsList[key].trackedServers.length === 0) {
                deletionsList.push(key);
            }
        });

        // Call onClosed OR error()
        // and remove the subscription
        deletionsList.forEach(function (key) {
            if (typeof subscriptionsList[key] !== 'object') {
                return;
            }

            if (
                subscriptionsList[key].status === STATUS_AWAITING_ACCEPT &&
                typeof subscriptionsList[key].timeoutId === 'number'
            ) {

                var reason = (typeof msg.ResultMessage === 'string' && msg.ResultMessage !== '') ?
                    ' Publisher said "' + msg.ResultMessage + '".' :
                    ' No reason given.';

                var callArgs = typeof subscriptionsList[key].arguments === 'object' ?
                    JSON.stringify(subscriptionsList[key].arguments) :
                    '{}';

                subscriptionsList[key].error(ERR_MSG_SUB_REJECTED + reason + ' Called with:' + callArgs);
                clearTimeout(subscriptionsList[key].timeoutId);

            } else {

                // The timeout may or may not have expired yet,
                // but the status is 'subscribed' and trackedServers is now empty

                subscriptionsList[key].handlers.onClosed.forEach(function (callback) {
                    if (typeof callback !== 'function') {
                        return;
                    }

                    callback({
                        message: ON_CLOSE_MSG_SERVER_INIT,
                        requestArguments: subscriptionsList[key].arguments,
                        server: helpers.convertInfoToInstance(msg.Server),
                        stream: subscriptionsList[key].method
                    });
                });

            }

            delete subscriptionsList[key];

        });
    }

    // action 3
    function serverAcknowledgesGoodSubscription(msg) {

        var subscriptionId = msg.InvocationId;

        var subscription = subscriptionsList[subscriptionId];

        if (typeof subscription !== 'object') {
            return;
        }

        var acceptingServer = subscription.trackedServers.filter(function (server) {
            return (
                server.methodRequestSubject === msg.MethodRequestSubject &&
                server.methodResponseSubject === msg.MethodResponseSubject
            )
        })[0];

        if (typeof acceptingServer !== 'object') {
            return;
        }

        var isFirstResponse = (subscription.status === STATUS_AWAITING_ACCEPT);

        subscription.status = STATUS_SUBSCRIBED;

        var privateStreamSubject = generatePrivateStreamSubject(subscription.method.name);

        if (typeof acceptingServer.streamId === 'string' && acceptingServer.streamId !== '') {
            return; // already accepted previously
        }

        acceptingServer.server = helpers.convertInfoToInstance(msg.Server);
        acceptingServer.streamId = msg.StreamId;
        acceptingServer.streamSubjects.global = msg.EventStreamSubject;
        acceptingServer.streamSubjects.private = privateStreamSubject;
        // acceptingServer.methodResponseSubject stays the same

        var confirmatoryRequest = {
            EventStreamAction: 3, // "Subscribed" = client confirms intention to subscribe
            EventStreamSubject: privateStreamSubject,
            StreamId: msg.StreamId,
            MethodRequestSubject: msg.MethodRequestSubject,
            MethodResponseSubject: acceptingServer.methodResponseSubject,
            Client: instance.info(),
            Context: {
                ArgumentsJson: subscription.arguments,
                MethodName: subscription.method.name
            }
        };

        sendRequest(confirmatoryRequest);

        if (isFirstResponse) {
            // Pass in the subscription object
            subscription.success({
                onData: function (dataCallback) {
                    if (typeof dataCallback !== 'function') {
                        throw new TypeError('The data callback must be a function.')
                    }

                    this.handlers.onData.push(dataCallback)
                    if (this.handlers.onData.length === 1 && this.queued.data.length > 0) {
                        this.queued.data.forEach(function (dataItem) {
                            dataCallback(dataItem)
                        })
                    }
                }.bind(subscription),
                onClosed: function (closedCallback) {
                    if (typeof closedCallback !== 'function') {
                        throw new TypeError('The callback must be a function.')
                    }
                    this.handlers.onClosed.push(closedCallback)
                }.bind(subscription),
                onFailed: function () { /* Will not be implemented for browser. */
                },
                close: closeSubscription.bind(subscription, subscriptionId),
                requestArguments: subscription.arguments,
                serverInstance: helpers.convertInfoToInstance(msg.Server),
                stream: subscription.method
            });
        }
    }

    // action 5
    function serverHasPushedSomeDataIntoTheStream(msg) {

        // Find the subscription of interest by trawling the dictionary
        for (var key in subscriptionsList) {
            if (subscriptionsList.hasOwnProperty(key) && typeof subscriptionsList[key] === 'object') {

                var isPrivateData;

                var trackedServersFound = subscriptionsList[key].trackedServers.filter(function (ls) {
                    return (
                        ls.streamId === msg.StreamId &&
                        (ls.streamSubjects.global === msg.EventStreamSubject ||
                        ls.streamSubjects.private === msg.EventStreamSubject)
                    );
                });

                if (trackedServersFound.length === 0) {
                    isPrivateData = undefined;
                } else if (trackedServersFound[0].streamSubjects.global === msg.EventStreamSubject) {
                    isPrivateData = false;
                } else if (trackedServersFound[0].streamSubjects.private === msg.EventStreamSubject) {
                    isPrivateData = true;
                }

                if (isPrivateData !== undefined) {
                    // create the arrivedData object
                    var receivedStreamData = {
                        data: msg.ResultContextJson,
                        server: helpers.convertInfoToInstance(msg.Server),
                        requestArguments: subscriptionsList[key].arguments || {},
                        message: msg.ResultMessage,
                        private: isPrivateData
                    };

                    var onDataHandlers = subscriptionsList[key].handlers.onData;
                    var queuedData = subscriptionsList[key].queued.data;

                    if (Array.isArray(onDataHandlers)) {
                        if (onDataHandlers.length > 0) {
                            onDataHandlers.forEach(function (callback) {
                                if (typeof callback === 'function') {
                                    callback(receivedStreamData)
                                }
                            })
                        } else {
                            queuedData.push(receivedStreamData)
                        }
                    }
                }
            }
        }// end for-in
    }

    /** (subscription) Methods */
    function closeSubscription(subId) {

        var responseSubject = nextResponseSubject();

        this.trackedServers.forEach(function (server) {
            sendRequest({
                EventStreamAction: 2,
                Client: instance.info(),
                MethodRequestSubject: server.methodRequestSubject,
                MethodResponseSubject: responseSubject,
                StreamId: server.streamId,
                EventStreamSubject: server.streamSubjects.private
            });
        });

        var sub = this;

        // Call the onClosed handlers
        this.handlers.onClosed.forEach(function (callback) {
            if (typeof callback === 'function') {
                callback({
                    message: ON_CLOSE_MSG_CLIENT_INIT,
                    requestArguments: sub.arguments || {},
                    server: sub.trackedServers[sub.trackedServers.length - 1].server, // the last one of multi-server subscription
                    stream: sub.method
                })
            }
        });

        delete subscriptionsList[subId];
    }

    function generatePrivateStreamSubject(methodName) {

        var appInfo = instance.info();

        var privateStreamSubject = 'ESSpriv-jsb_' +
            appInfo.ApplicationName +
            '_on_' +
            methodName +
            '_' +
            random();

        return privateStreamSubject;
    }

    return { // an instance of the streaming module
        subscribe: subscribe,
        processPublisherMsg: processPublisherMsg
    };
};

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

var random = __webpack_require__(2);
var callbackRegistry = __webpack_require__(1);
var Streaming = __webpack_require__(29);
var helpers = __webpack_require__(4);

module.exports = function (connection, instance, configuration, repository) {
    'use strict';
    var timers = {};
    var respCounter = 0;
    var callbacks = callbackRegistry();

    var streaming = new Streaming(
        configuration,
        instance,
        function (m) {
            connection.sendAGM('MethodInvocationRequestMessage', m)
        },
        nextResponseSubject
    );

    function nextResponseSubject() {
        return 'resp_' + (respCounter++) + '_' + random();
    }

    function createServerInfo(instance) {
        return {
            machine: instance.MachineName,
            pid: instance.ProcessId,
            started: instance.ProcessStartTime,
            user: instance.UserName,
            application: instance.ApplicationName,
            environment: instance.Environment,
            region: instance.Region,
            service_name: instance.ServiceName,
            metrics_repository_id: instance.MetricsRepositoryId,
            state: instance.State
        };
    }

    function createMethod(methodInfo) {
        var method = methodInfo.Method;
        return {
            name: method.Name,
            accepts: method.InputSignature,
            returns: method.ResultSignature,
            requestSubject: methodInfo.MethodRequestSubject,
            description: method.Description,
            displayName: method.DisplayName,
            version: method.Version,
            objectTypes: method.ObjectTypeRestrictions,
            supportsStreaming: helpers.isStreamingFlagSet(method.Flags)
        };
    }

    // Generates a unique ID for a server
    function createServerId(serverInfo) {
        if (serverInfo === undefined) {
            return undefined;
        }

        return [serverInfo.application,
            serverInfo.user,
            serverInfo.machine,
            serverInfo.started,
            serverInfo.pid].join('/').toLowerCase();
    }

    function processServerPresence(presence, isPresence) {

        var instance = presence.Instance;
        var serverInfo = createServerInfo(instance);
        var serverId = createServerId(serverInfo);

        if (isPresence) {
            // test
            // console.debug(new Date(), '  heard presence');
            // if (instance.ApplicationName === 'Dummy server') {
            //     console.debug(new Date(), '  got Dummy server presence', presence);
            // }

            serverId = repository.addServer(serverInfo, serverId);

            if (presence.PublishingInterval) {
                scheduleTimeout(serverId, presence.PublishingInterval);
            }
        } else if (presence.PublishingInterval === 0) {
            // Good bye message from Gateway
            var server = repository.getServerById(serverId);
            if (typeof server !== 'undefined') {
                repository.removeServerById(serverId);
            }
        }

        // Finally, update the methods
        if (presence.MethodDefinitions !== undefined) {
            updateServerMethods(serverId, presence.MethodDefinitions);
        }
    }

    // This function sets a timeout which removes the server unless - the function is called again before the timeout is over
    function scheduleTimeout(serverId, duration) {

        if (duration === -1) {
            return;
        }
        // Stop the previous timeout
        var timer = timers[serverId];
        if (timer !== undefined) {
            clearTimeout(timer);
        }

        // Set a new one
        timers[serverId] = setTimeout(function () {
            repository.removeServerById(serverId);
        }, duration * (configuration.client.remove_server_on_n_missing_heartbeats + 1));
    }

    // Updates the methods of a server
    function updateServerMethods(serverId, newMethods) {

        // Get an array of the methods the server had before we started this
        var oldMethods = repository.getServerMethodsById(serverId);

        // Get an array of the methods that the server has now
        newMethods = newMethods.map(createMethod).reduce(function (obj, method) {
            var methodId = repository.getMethodId(method);
            obj[methodId] = method;
            return obj;
        }, {});

        // For each of the old methods
        Object.keys(oldMethods).forEach(function (methodId) {
            var method = oldMethods[methodId];
            // Check if it is still there
            if (newMethods[method.id] === undefined) {
                // If it isn't, remove it
                repository.removeServerMethod(serverId, method.id);
            } else {
                // If it is there in both the old array and the new one, we don't need to add it again
                delete newMethods[method.id];
            }
        });
        // Now add the new methods
        Object.keys(newMethods).forEach(function (key) {
            var method = newMethods[key];
            repository.addServerMethod(serverId, method);
        });
    }

    function invoke(id, method, args, target, stuff) {

        var methodInfo = method.info;
        // Construct a message
        var message = {
            MethodRequestSubject: methodInfo.requestSubject,
            MethodResponseSubject: nextResponseSubject(),
            Client: instance.info(),
            Context: {
                ArgumentsJson: args,
                InvocationId: id,
                ObjectType: stuff.object_type,
                DisplayContext: stuff.display_context,
                MethodName: methodInfo.name,
                ExecutionServer: target.info,
                Timeout: stuff.method_response_timeout
            }
        };

        connection.sendAGM('MethodInvocationRequestMessage', message);
    }

    function handleInvokeResultMessage(message) {

        // Delegate streaming-related messages to streaming
        if (message && message.EventStreamAction && message.EventStreamAction !== 0) {
            streaming.processPublisherMsg(message);
            return;
        }

        var server = message.Server ? createServerInfo(message.Server) : undefined;

        // parse the result
        var result = message.ResultContextJson;
        // If the result is an empty object, there is no result
        if (result && Object.keys(result).length === 0) {
            result = undefined;
        }

        callbacks.execute('onResult', message.InvocationId, server, message.Status, result, message.ResultMessage);
    }

    function onInvocationResult(callback) {
        callbacks.add('onResult', callback);
    }

    function listenForEvents() {
        connection.onAGM('ServerPresenceMessage', function (msg) {
            processServerPresence(msg, true);
        });
        connection.onAGM('ServerHeartbeatMessage', function (msg) {
            processServerPresence(msg, false);
        });
        connection.onAGM('MethodInvocationResultMessage', handleInvokeResultMessage);
    }

    listenForEvents();

    return {
        invoke: invoke,
        onInvocationResult: onInvocationResult,
        subscribe: streaming.subscribe
    }
};


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

var ServerProtocol = __webpack_require__(33);
var ClientProtocol = __webpack_require__(30);

module.exports = function (instance, connection, repository, vault, configuration) {
    'use strict';
    connection.onAGM('Instance', instance._updateIdentity);

    var serverProtocol = new ServerProtocol(connection, instance, configuration, vault);
    var clientProtocol = new ClientProtocol(connection, instance, configuration, repository);

    return new Promise(function (resolve) {

        resolve({
            // method-related
            invoke: clientProtocol.invoke,
            onInvocationResult: clientProtocol.onInvocationResult,
            register: serverProtocol.register,
            unregister: serverProtocol.unregister,
            onInvoked: serverProtocol.onInvoked,
            methodInvocationResult: serverProtocol.methodInvocationResult,

            // stream-related
            subscribe: clientProtocol.subscribe,
            createStream: serverProtocol.createStream,
            getBranchList: serverProtocol.getBranchList,
            getSubscriptionList: serverProtocol.getSubscriptionList,
            closeAllSubscriptions: serverProtocol.closeAllSubscriptions,
            closeSingleSubscription: serverProtocol.closeSingleSubscription,
            pushData: serverProtocol.pushData,
            pushDataToSingle: serverProtocol.pushDataToSingle,
            onSubRequest: serverProtocol.onSubRequest,
            acceptRequestOnBranch: serverProtocol.acceptRequestOnBranch,
            rejectRequest: serverProtocol.rejectRequest,
            onSubAdded: serverProtocol.onSubAdded,
            onSubRemoved: serverProtocol.onSubRemoved
        });
    });
};


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

var random = __webpack_require__(2);
// TODO use Callbacks = require(~)
var helpers = __webpack_require__(4);

module.exports = function (connection, instance) {
    'use strict';
    // TODO extract these into Callbacks
    var requestHandler = null;
    var subAddedHandler = null;
    var subRemovedHandler = null;

    function sendResult(message) {
        if (typeof message !== 'object') {
            throw new Error('Invalid message.');
        }

        if (typeof message.Status !== 'number') {
            message.Status = 0;
        }

        connection.sendAGM('MethodInvocationResultMessage', message);
    }

    function isStreamMsgForStreamingMethod(msg, method) {
        return (
            msg &&
            msg.EventStreamAction &&
            msg.EventStreamAction !== 0 &&
            typeof method === 'object' &&
            method.definition.supportsStreaming === true
        );
    }

    function processSubscriberMsg(msg, streamingMethod) {
        if (!(msg && msg.EventStreamAction && msg.EventStreamAction !== 0)) {
            return;
        }

        if (msg.EventStreamAction === 1) {
            clientWishesToSubscribe(msg, streamingMethod);

        } else if (msg.EventStreamAction === 2) {
            clientWishesToUnsubscribe(msg, streamingMethod);

        } else if (msg.EventStreamAction === 3) {
            clientAcknowledgesItDidSubscribe(msg, streamingMethod);

        } else if (msg.EventStreamAction === 4) {
            clientPerSubHeartbeat(msg);
        }
    }

    /** msg 'Request' Actions */
    // action 1
    function clientWishesToSubscribe(msg, streamingMethod) {

        var requestContext = {
            msg: msg,
            arguments: msg.Context.ArgumentsJson || {},
            instance: helpers.convertInfoToInstance(msg.Client)
        };

        if (typeof requestHandler === 'function') {
            requestHandler(requestContext, streamingMethod);
        }
    }

    // action 2
    function clientWishesToUnsubscribe(msg, streamingMethod) {

        if (!(
            streamingMethod &&
            Array.isArray(streamingMethod.subscriptions) &&
            streamingMethod.subscriptions.length > 0)
        ) {
            return;
        }

        closeIndividualSubscription(streamingMethod, msg.StreamId, msg.EventStreamSubject, false)
    }

    // action 3
    function clientAcknowledgesItDidSubscribe(msg, streamingMethod) {
        // Client indicates it is listening to a specific StreamId

        if (typeof msg.StreamId !== 'string' || msg.StreamId === '') {
            return;
        }

        var branchKey = getBranchKey(streamingMethod, msg.StreamId);

        if (typeof branchKey !== 'string') {
            return;
        }

        if (!Array.isArray(streamingMethod.subscriptions)) {
            return;
        }

        var subscription = {
            branchKey: branchKey,
            instance: helpers.convertInfoToInstance(msg.Client),
            arguments: msg.Context.ArgumentsJson,
            streamId: msg.StreamId,
            privateEventStreamSubject: msg.EventStreamSubject,
            methodResponseSubject: msg.MethodResponseSubject
        };

        // Subscription back-obj is stored
        streamingMethod.subscriptions.push(subscription);

        if (typeof subAddedHandler === 'function') {
            subAddedHandler(subscription, streamingMethod);
        }
    }

    // action 4
    function clientPerSubHeartbeat() {
        // A client may have multiple subscriptions, each one having its own heartbeat
        // Currently not implemented by the GW or the client
    }


    /** (request) Methods */
    function acceptRequestOnBranch(requestContext, streamingMethod, branch) {
        if (typeof branch !== 'string') {
            branch = '';
        }

        var streamId = getStreamId(streamingMethod, branch);

        var msg = requestContext.msg;

        sendResult({
            EventStreamAction: 3,
            EventStreamSubject: streamingMethod.globalEventStreamSubject,
            InvocationId: msg.Context.InvocationId,
            MethodName: streamingMethod.method.Method.Name,
            MethodRequestSubject: streamingMethod.method.MethodRequestSubject,
            MethodResponseSubject: msg.MethodResponseSubject,
            MethodVersion: streamingMethod.method.Method.Version,
            ResultMessage: 'Accepted',
            Server: instance.info(),
            StreamId: streamId
        });
    }

    function getBranchKey(streamingMethod, streamId) {
        if (typeof streamId !== 'string' || typeof streamingMethod !== 'object') {
            return;
        }

        var needle = streamingMethod.branchKeyToStreamIdMap.filter(function (branch) {
            return branch.streamId === streamId;
        })[0];

        if (typeof needle !== 'object' || typeof needle.key !== 'string') {
            return;
        }

        return needle.key;
    }

    function getStreamId(streamingMethod, branchKey) {
        if (typeof branchKey !== 'string') {
            branchKey = '';
        }

        var needleBranch = streamingMethod.branchKeyToStreamIdMap.filter(function (branch) {
            return branch.key === branchKey;
        })[0];

        var streamId = (needleBranch ? needleBranch.streamId : undefined);

        if (typeof    streamId !== 'string' || streamId === '') {
            streamId = generateNewStreamId(streamingMethod.method.Method.Name);
            streamingMethod.branchKeyToStreamIdMap.push({ key: branchKey, streamId: streamId });
        }

        return streamId;
    }

    function generateNewStreamId(streamingMethodName) {
        var appInfo = instance.info();

        var newStreamId = 'streamId-jsb_of_' +
            streamingMethodName +
            '__by_' +
            appInfo.ApplicationName +
            '_' +
            random();

        return newStreamId;
    }

    function rejectRequest(requestContext, streamingMethod, reason) {
        if (typeof reason !== 'string') {
            reason = '';
        }

        var msg = requestContext.msg;

        sendResult({
            EventStreamAction: 2,
            EventStreamSubject: streamingMethod.globalEventStreamSubject,
            // InvocationId: msg.Context.InvocationId,
            MethodName: streamingMethod.method.Method.Name,
            MethodRequestSubject: streamingMethod.method.MethodRequestSubject,
            MethodResponseSubject: msg.MethodResponseSubject,
            MethodVersion: streamingMethod.method.Method.Version,
            ResultMessage: reason,
            Server: instance.info(),
            StreamId: 'default_rejection_streamId'
        });
    }

    /** (subscription) Methods */
    function closeIndividualSubscription(streamingMethod, streamId, privateEventStreamSubject, sendKickMessage) {

        var subscription = streamingMethod.subscriptions.filter(function (subItem) {
            return (
                subItem.privateEventStreamSubject === privateEventStreamSubject &&
                subItem.streamId === streamId
            );
        })[0];

        if (typeof subscription !== 'object') {
            return; // unrecognised subscription
        }

        var initialLength = streamingMethod.subscriptions.length;

        streamingMethod.subscriptions = streamingMethod.subscriptions.filter(function (subItem) {
            return !(
                subItem.privateEventStreamSubject === subscription.privateEventStreamSubject &&
                subItem.streamId === subscription.streamId
            );
        });

        var filteredLength = streamingMethod.subscriptions.length;

        if (filteredLength !== (initialLength - 1)) {
            return; // the subscription wasn't removed
        }

        if (sendKickMessage === true) {
            sendResult({
                EventStreamAction: 2,
                EventStreamSubject: privateEventStreamSubject,
                MethodName: streamingMethod.method.Method.Name,
                MethodRequestSubject: streamingMethod.method.MethodRequestSubject,
                MethodResponseSubject: subscription.methodResponseSubject,
                MethodVersion: streamingMethod.method.Method.Version,
                ResponseContextJson: {},
                Server: instance.info(),
                StreamId: subscription.streamId,
                Status: 0
            });
        }

        if (typeof subRemovedHandler === 'function') {
            subRemovedHandler(subscription, streamingMethod)
        }
    }

    function closeMultipleSubscriptions(streamingMethod, branchKey) {
        if (typeof streamingMethod !== 'object' || !Array.isArray(streamingMethod.branchKeyToStreamIdMap)) {
            return;
        }

        var streamList = streamingMethod.branchKeyToStreamIdMap;

        if (typeof branchKey === 'string') {
            streamList = streamingMethod.branchKeyToStreamIdMap.filter(function (br) {
                return (typeof br === 'object' && br.key === branchKey);
            });
        }

        // TODO: consider getting the unique branch keys from 'live subscribers'

        streamList.forEach(function (br) {
            var streamId = br.streamId;

            sendResult({
                EventStreamAction: 2,
                EventStreamSubject: streamingMethod.globalEventStreamSubject,
                MethodName: streamingMethod.method.Method.Name,
                MethodRequestSubject: streamingMethod.method.MethodRequestSubject,
                Server: instance.info(),
                StreamId: streamId,
                Status: 0
            });
        });
    }

    function closeSingleSubscription(streamingMethod, subscription) {
        closeIndividualSubscription(
            streamingMethod,
            subscription.streamId,
            subscription.privateEventStreamSubject,
            true
        );
    }

    function pushDataToSingle(streamingMethod, subscription, data) {

        // TODO validate data is a plain object
        if (typeof data !== 'object') {
            throw new Error('Invalid arguments. Data must be an object.');
        }

        sendResult({
            EventStreamAction: 5,
            EventStreamSubject: subscription.privateEventStreamSubject,
            MethodName: streamingMethod.method.Method.Name,
            MethodRequestSubject: streamingMethod.method.MethodRequestSubject,
            ResultContextJson: data,
            Server: instance.info(),
            StreamId: subscription.streamId
        });
    }

    function pushToBranch(streamingMethod, data, branches) {
        if (typeof streamingMethod !== 'object' || !Array.isArray(streamingMethod.branchKeyToStreamIdMap)) {
            return;
        }

        // TODO validate data is a plain object
        if (typeof data !== 'object') {
            throw new Error('Invalid arguments. Data must be an object.');
        }

        if (typeof branches === 'string') {
            branches = [branches]; // user wants to push to single branch
        } else if (!Array.isArray(branches) || branches.length <= 0) {
            branches = null;
        }

        // get the StreamId's from the method's branch map
        var streamIdList = streamingMethod.branchKeyToStreamIdMap
            .filter(function (br) {
                return (
                    branches === null || (Boolean(br) && typeof br.key === 'string' && branches.indexOf(br.key) >= 0)
                );
            }).map(function (br) {
                return br.streamId;
            });

        streamIdList.forEach(function (streamId) {

            sendResult({
                EventStreamAction: 5,
                EventStreamSubject: streamingMethod.globalEventStreamSubject,
                MethodName: streamingMethod.method.Method.Name,
                MethodRequestSubject: streamingMethod.method.MethodRequestSubject,
                ResultContextJson: data,
                Server: instance.info(),
                StreamId: streamId
            });

        });
    }

    function getSubscriptionList(streamingMethod, branchKey) {
        if (typeof streamingMethod !== 'object') {
            return [];
        }

        var subscriptions = [];

        if (typeof branchKey !== 'string') {
            subscriptions = streamingMethod.subscriptions;
        } else {
            subscriptions = streamingMethod.subscriptions.filter(function (sub) {
                return sub.branchKey === branchKey;
            });
        }

        return subscriptions;
    }

    function getBranchList(streamingMethod) {
        if (typeof streamingMethod !== 'object') {
            return [];
        }

        return getUniqueBranchNames(streamingMethod);

        // TODO the agm-api passes each sub to protocol methods for creating the sub front obj
    }

    // Returns the names of branches for which there are live subscriptions
    function getUniqueBranchNames(streamingMethod) {
        var keysWithDuplicates = streamingMethod.subscriptions.map(function (sub) {
            var result = null;
            if (typeof sub === 'object' && typeof sub.branchKey === 'string') {
                result = sub.branchKey;
            }
            return result;
        });

        var seen = [];

        var branchArray = keysWithDuplicates.filter(function (bKey) {
            if (bKey === null || seen.indexOf(bKey) >= 0) {
                return false;
            }
            seen.push(bKey);
            return true;
        });

        return branchArray;
    }

    /** setting user-provided handlers */ // TODO replace innerds with callback.js
    function addRequestHandler(handlerFunc) {
        if (typeof handlerFunc !== 'function') {
            return;
        }

        requestHandler = handlerFunc;
    }

    function addSubAddedHandler(handlerFunc) {
        if (typeof handlerFunc !== 'function') {
            return;
        }

        subAddedHandler = handlerFunc;
    }

    function addSubRemovedHandler(handlerFunc) {
        if (typeof handlerFunc !== 'function') {
            return;
        }

        subRemovedHandler = handlerFunc;
    }

    return { // an instance of the publisher
        isStreamMsg: isStreamMsgForStreamingMethod,
        processSubscriberMsg: processSubscriberMsg,
        pushData: pushToBranch,
        pushDataToSingle: pushDataToSingle,
        closeAllSubscriptions: closeMultipleSubscriptions,
        closeSingleSubscription: closeSingleSubscription,
        getSubscriptionList: getSubscriptionList,
        getBranchList: getBranchList,
        onSubRequest: addRequestHandler,
        acceptRequestOnBranch: acceptRequestOnBranch,
        rejectRequest: rejectRequest,
        onSubAdded: addSubAddedHandler,
        onSubRemoved: addSubRemovedHandler,
        generateNewStreamId: generateNewStreamId

    };
};


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

var random = __webpack_require__(2);
var callbackRegistry = __webpack_require__(1);
var Streaming = __webpack_require__(32);
var helpers = __webpack_require__(4);

module.exports = function (connection, instance, configuration, vault) {
    'use strict';
    var invocationMessagesMap = {};  // {invocationId: Invocation_RequestMessage}

    var reqCounter = 0;
    var presenceTimer;
    var heartbeatTimer;
    var callbacks = callbackRegistry();
    var streaming = new Streaming(connection, instance);

    connection.onAGM('MethodInvocationRequestMessage', handleMethodInvocationMessage);
    sendHeartbeat();
    if (heartbeatTimer === undefined) {
        heartbeatTimer = setInterval(sendHeartbeat, configuration.server.heartbeat_interval);
    }

    function nextRequestSubject() {
        return 'req_' + (reqCounter++) + '_' + random();
    }

    // Constructs a heartbeat message
    function constructHeartbeat() {
        return {
            PublishingInterval: configuration.server.heartbeat_interval,
            Instance: instance.info()
        };
    }

    // Constructs a presence message
    function constructPresence() {
        var methods = vault.getList();

        return {
            PublishingInterval: configuration.server.presence_interval,
            Instance: instance.info(),
            MethodDefinitions: methods.map(function (m) {
                return m.method
            })
        };
    }

    // Sends a presence
    function sendPresence() {
        connection.sendAGM('ServerPresenceMessage', constructPresence());
    }

    // Sends a heartbeat
    function sendHeartbeat() {
        connection.sendAGM('ServerHeartbeatMessage', constructHeartbeat());
    }

    function createNewMethodMessage(methodIdentifier, subject) {
        // If we are given a string instead of an object, we presume that is the method's name:
        if (typeof methodIdentifier === 'string') {
            methodIdentifier = { name: methodIdentifier };
        }

        // Set default values
        if (typeof methodIdentifier.version !== 'number') {
            methodIdentifier.version = 0;
        }

        // Convert the method definition to the format that AGM requires
        return {
            Method: {
                Name: methodIdentifier.name,
                InputSignature: methodIdentifier.accepts,
                ResultSignature: methodIdentifier.returns,
                Description: methodIdentifier.description,
                DisplayName: methodIdentifier.displayName,
                Version: methodIdentifier.version,
                ObjectTypeRestrictions: methodIdentifier.objectTypes
            },
            MethodRequestSubject: subject
        };
    }

    function register(repoMethod, success) {

        // Get a request subject for this method
        var reqSubj = nextRequestSubject();

        repoMethod.method = createNewMethodMessage(repoMethod.definition, reqSubj);

        announceNewMethod();

        success();
    }

    /** Create a streaming method */
    function createStream(repoMethod, streamDef, success) {

        var reqSubj = nextRequestSubject();

        var streamConverted = createNewMethodMessage(streamDef, reqSubj);
        streamConverted.Method.Flags = 32; // 100000 bitmask with the largest flag (streaming: true)

        // Used for presences
        repoMethod.method = streamConverted;

        // Utility things for this protocol
        repoMethod.globalEventStreamSubject = streamDef.name + '.jsStream.' + random();
        repoMethod.subscriptions = [];
        repoMethod.branchKeyToStreamIdMap = []; // [ {branchKey: '', streamId: 'strj_nds7`8`6y2378yb'}, {...}, ...]

        announceNewMethod();

        success();
    }

    function announceNewMethod() {

        // Send presence so the clients know we have it
        sendPresence();

        // Start sending presence regularly (if we aren't already doing it)
        if (presenceTimer === undefined) {
            presenceTimer = setInterval(sendPresence, configuration.server.presence_interval);
        }
    }

    // Listens for method invocations
    function handleMethodInvocationMessage(message) {
        var subject = message.MethodRequestSubject;
        var methodList = vault.getList();

        var method = methodList.filter(function (m) {
            return m.method.MethodRequestSubject === subject;
        })[0];

        // Stop if the message isn't for us
        if (method === undefined) {
            return;
        }

        // TODO see if have to move this earlier - i.e. if some messages from Client don't have MethodRequestSubject
        // Check if message is stream-related : defer to streaming module
        if (streaming.isStreamMsg(message, method)) {
            streaming.processSubscriberMsg(message, method);
            return;
        }

        var invocationId = message.Context.InvocationId;
        invocationMessagesMap[invocationId] = message;

        var invocationArgs = {
            args: message.Context.ArgumentsJson,
            instance: helpers.convertInfoToInstance(message.Client)
        };
        callbacks.execute('onInvoked', method, invocationId, invocationArgs);
    }

    function onInvoked(callback) {
        callbacks.add('onInvoked', callback);
    }

    function methodInvocationResult(executedMethod, invocationId, err, result) {

        var message = invocationMessagesMap[invocationId];
        if (!message) {
            return;
        }

        // Don't send result if the client does not require it
        if (message.MethodResponseSubject === 'null') {
            return;
        }

        if (executedMethod === undefined) {
            return;
        }

        var resultMessage = {
            MethodRequestSubject: message.MethodRequestSubject,
            MethodResponseSubject: message.MethodResponseSubject,
            MethodName: executedMethod.method.Method.Name,
            InvocationId: invocationId,
            ResultContextJson: result,
            Server: instance.info(),
            ResultMessage: err,
            Status: err ? 1 : 0
        };
        // Send result
        connection.sendAGM('MethodInvocationResultMessage', resultMessage);

        delete invocationMessagesMap[invocationId];
    }

    function unregister() {
        sendPresence();
    }

    return {
        register: register,
        onInvoked: onInvoked,
        methodInvocationResult: methodInvocationResult,
        unregister: unregister,

        // stream-related
        createStream: createStream,
        getBranchList: streaming.getBranchList,
        getSubscriptionList: streaming.getSubscriptionList,
        closeAllSubscriptions: streaming.closeAllSubscriptions,
        closeSingleSubscription: streaming.closeSingleSubscription,
        pushDataToSingle: streaming.pushDataToSingle,
        pushData: streaming.pushData,
        onSubRequest: streaming.onSubRequest,
        acceptRequestOnBranch: streaming.acceptRequestOnBranch,
        rejectRequest: streaming.rejectRequest,
        onSubAdded: streaming.onSubAdded,
        onSubRemoved: streaming.onSubRemoved
    }
};


/***/ }),
/* 34 */
/***/ (function(module, exports) {

/**
 * Handles registering methods and sending data to clients
 */


module.exports = function (instance, session, repository, logger) {
    'use strict';
    session.on('subscribed', handleSubscribed);
    session.on('event', handleEventData);
    session.on('subscription-cancelled', handleSubscriptionCancelled);

    var MSG_TYPE_SUBSCRIBE = 'subscribe';
    var STATUS_AWAITING_ACCEPT = 'awaitingAccept'; // not even one server has accepted yet
    var STATUS_SUBSCRIBED = 'subscribed'; // at least one server has responded as 'Accepting'
    var ERR_MSG_SUB_FAILED = 'Subscription failed.';
    var ERR_MSG_SUB_REJECTED = 'Subscription rejected.';
    var ON_CLOSE_MSG_SERVER_INIT = 'ServerInitiated';
    var ON_CLOSE_MSG_CLIENT_INIT = 'ClientInitiated';

    var subscriptionsList = {};
    var subscriptionIdToLocalKeyMap = {};
    var nextSubLocalKey = 0;

    function getNextSubscriptionLocalKey() {
        var current = nextSubLocalKey;
        nextSubLocalKey += 1;

        return current;
    }

    function subscribe(streamingMethod, argumentObj, targetServers, stuff, success, error) {
        if (targetServers.length === 0) {
            error(ERR_MSG_SUB_FAILED + ' No available servers matched the target params.');
            return;
        }

        logger.debug('subscribe to target servers: ', targetServers);

        // Note: used to find the subscription in subList. Do not confuse it with the gw-generated subscription_id
        var subLocalKey = getNextSubscriptionLocalKey();

        var pendingSub = registerSubscription(
            subLocalKey,
            streamingMethod,
            argumentObj,
            success,
            error,
            stuff.method_response_timeout
        );

        if (typeof pendingSub !== 'object') {
            error(ERR_MSG_SUB_FAILED + ' Unable to register the user callbacks.');
            return;
        }

        targetServers.forEach(function(target) {

            var serverId = target.server.id;

            pendingSub.trackedServers.push({
                serverId: serverId,
                subscriptionId: undefined // is assigned by gw3
            });

            var msg = {
                type: MSG_TYPE_SUBSCRIBE,
                server_id: serverId,
                method_id: streamingMethod.info.id,
                arguments_kv: argumentObj
            };

            session.send(msg, { serverId: serverId, subLocalKey: subLocalKey })
                .then(handleSubscribed)
                .catch(handleErrorSubscribing);

        });
    }

    function registerSubscription(subLocalKey, method, args, success, error, timeout) {
        subscriptionsList[subLocalKey] = {
            status: STATUS_AWAITING_ACCEPT,
            method: method,
            arguments: args,
            success: success,
            error: error,
            trackedServers: [],
            handlers: {
                onData: [],
                onClosed: []
                // onFailed: []
            },
            queued: {
                data: [],
                closers: []
            },
            timeoutId: undefined
        };

        subscriptionsList[subLocalKey].timeoutId = setTimeout(function () {
            if (subscriptionsList[subLocalKey] === undefined) {
                return; // no such subscription
            }

            var pendingSub = subscriptionsList[subLocalKey];

            if (pendingSub.status === STATUS_AWAITING_ACCEPT) {
                error({
                    method: method,
                    called_with: args,
                    message: ERR_MSG_SUB_FAILED + ' Subscription attempt timed out after ' + timeout + 'ms.'
                });

                // None of the target servers has answered the subscription attempt
                delete subscriptionsList[subLocalKey];

            } else if (pendingSub.status === STATUS_SUBSCRIBED && pendingSub.trackedServers.length > 0) {
                // Clean the trackedServers, removing those without valid streamId
                pendingSub.trackedServers = pendingSub.trackedServers.filter(function (server) {
                    return (typeof server.subscriptionId !== 'undefined')
                });

                delete pendingSub.timeoutId;

                if (pendingSub.trackedServers.length <= 0) {
                    // There are no open streams, some servers accepted then closed very quickly
                    //  (that's why the status changed but there's no good server with a StreamId)

                    // call the onClosed handlers
                    callOnClosedHandlers(pendingSub);

                    delete subscriptionsList[subLocalKey];
                }
            }
        }, timeout);

        return subscriptionsList[subLocalKey]
    }

    function handleErrorSubscribing(errorResponse) {
        // A target server is rejecting
        logger.debug('Subscription attempt failed', errorResponse);

        var tag = errorResponse._tag;
        var subLocalKey = tag.subLocalKey;

        var pendingSub = subscriptionsList[subLocalKey];

        if (typeof pendingSub !== 'object') {
            return;
        }

        pendingSub.trackedServers = pendingSub.trackedServers.filter(function (server) {
            return server.serverId !== tag.serverId;
        });

        if (pendingSub.trackedServers.length <= 0) {
            clearTimeout(pendingSub.timeoutId);

            if (pendingSub.status === STATUS_AWAITING_ACCEPT) {
                // Reject with reason
                var reason = (typeof errorResponse.reason === 'string' && errorResponse.reason !== '') ?
                    ' Publisher said "' + errorResponse.reason + '".' :
                    ' No reason given.';

                var callArgs = typeof pendingSub.arguments === 'object' ?
                    JSON.stringify(pendingSub.arguments) :
                    '{}';

                pendingSub.error(ERR_MSG_SUB_REJECTED + reason + ' Called with:' + callArgs);


            } else if (pendingSub.status === STATUS_SUBSCRIBED) {
                // The timeout may or may not have expired yet,
                // but the status is 'subscribed' and trackedServers is now empty

                callOnClosedHandlers(pendingSub);
            }


            delete subscriptionsList[subLocalKey];
        }
    }

    function handleSubscribed(msg) {
        logger.debug('handleSubscribed', msg);

        var subLocalKey = msg._tag.subLocalKey;
        var pendingSub = subscriptionsList[subLocalKey];

        if (typeof pendingSub !== 'object') {
            return;
        }

        var serverId = msg._tag.serverId;

        // Add a subscription_id to this trackedServer

        var acceptingServer = pendingSub.trackedServers
            .filter(function(server) {
                return server.serverId === serverId;
            })[0];

        if (typeof acceptingServer !== 'object') {
            return;
        }

        acceptingServer.subscriptionId = msg.subscription_id;
        subscriptionIdToLocalKeyMap[msg.subscription_id] = subLocalKey;

        var isFirstResponse = (pendingSub.status === STATUS_AWAITING_ACCEPT);

        pendingSub.status = STATUS_SUBSCRIBED;

        if (isFirstResponse) {
            // Pass in the subscription object
            pendingSub.success({
                onData: function (dataCallback) {
                    if (typeof dataCallback !== 'function') {
                        throw new TypeError('The data callback must be a function.')
                    }

                    this.handlers.onData.push(dataCallback);
                    if (this.handlers.onData.length === 1 && this.queued.data.length > 0) {
                        this.queued.data.forEach(function (dataItem) {
                            dataCallback(dataItem)
                        })
                    }
                }.bind(pendingSub),
                onClosed: function (closedCallback) {
                    if (typeof closedCallback !== 'function') {
                        throw new TypeError('The callback must be a function.')
                    }
                    this.handlers.onClosed.push(closedCallback)
                }.bind(pendingSub),
                onFailed: function () { /* Will not be implemented for browser. */
                },
                close: closeSubscription.bind(null, subLocalKey),
                requestArguments: pendingSub.arguments,
                serverInstance: repository.getServerById(serverId).getInfoForUser(),
                stream: pendingSub.method
            });
        }
    }

    function handleEventData(msg) {
        logger.debug('handleEventData', msg);

        var subLocalKey = subscriptionIdToLocalKeyMap[msg.subscription_id];

        if (typeof subLocalKey === 'undefined') {
            return;
        }

        var subscription = subscriptionsList[subLocalKey];

        if (typeof subscription !== 'object') {
            return;
        }

        var trackedServersFound = subscription.trackedServers.filter(function (server) {
            return server.subscriptionId === msg.subscription_id;
        });

        if (trackedServersFound.length !== 1) {
            return;
        }

        var isPrivateData = msg.oob && msg.snapshot;

        var sendingServerId = trackedServersFound[0].serverId;

        // Create the arrivedData object, new object for each handler call
        function receivedStreamData() {
            return {
                data: msg.data,
                server: repository.getServerById(sendingServerId).getInfoForUser(),
                requestArguments: subscription.arguments || {},
                message: null,
                private: isPrivateData
            };
        }

        var onDataHandlers = subscription.handlers.onData;
        var queuedData = subscription.queued.data;

        if (onDataHandlers.length > 0) {
            onDataHandlers.forEach(function (callback) {
                if (typeof callback === 'function') {
                    callback(receivedStreamData())
                }
            })
        } else {
            queuedData.push(receivedStreamData())
        }
    }

    function handleSubscriptionCancelled(msg) {
        logger.debug('handleSubscriptionCancelled', msg);

        var subLocalKey = subscriptionIdToLocalKeyMap[msg.subscription_id];

        if (typeof subLocalKey === 'undefined') {
            return;
        }

        var subscription = subscriptionsList[subLocalKey];

        if (typeof subscription !== 'object') {
            return;
        }

        // Filter tracked servers
        var expectedNewLength = subscription.trackedServers.length - 1;

        subscription.trackedServers = subscription.trackedServers.filter(function(server) {
            if (server.subscriptionId === msg.subscription_id) {
                subscription.queued.closers.push(server.serverId);
                return false;
            } else {
                return true;
            }
        });

        // Check if a server was actually removed
        if (subscription.trackedServers.length !== expectedNewLength) {
            return;
        }

        // Check if this was the last remaining server
        if (subscription.trackedServers.length <= 0) {
            clearTimeout(subscription.timeoutId);
            callOnClosedHandlers(subscription);
            delete subscriptionsList[subLocalKey];
        }

        delete subscriptionIdToLocalKeyMap[msg.subscription_id]
    }

    function callOnClosedHandlers(subscription, reason) {

        var closersCount = subscription.queued.closers.length;
        var closingServerId = (closersCount > 0) ? subscription.queued.closers[closersCount - 1] : null;

        var closingServer = null;
        if (typeof closingServerId === 'number') {
            closingServer = repository.getServerById(closingServerId).getInfoForUser();
        }

        subscription.handlers.onClosed.forEach(function (callback) {
            if (typeof callback !== 'function') {
                return;
            }

            callback({
                message: reason || ON_CLOSE_MSG_SERVER_INIT,
                requestArguments: subscription.arguments,
                server: closingServer,
                stream: subscription.method
            });
        });
    }

    function closeSubscription(subLocalKey) {
        logger.debug('closeSubscription', subLocalKey);

        var subscription = subscriptionsList[subLocalKey];

        if (typeof subscription !== 'object') {
            return;
        }

        // Tell each server that we're unsubscribing
        subscription.trackedServers.forEach(function (server) {
            if (typeof server.subscriptionId === 'undefined') {
                return;
            }

            session.sendFireAndForget({
                type: 'unsubscribe',
                subscription_id: server.subscriptionId,
                reason_uri: '',
                reason: ON_CLOSE_MSG_CLIENT_INIT
            });

            delete subscriptionIdToLocalKeyMap[server.subscriptionId];
        });

        subscription.trackedServers = [];

        callOnClosedHandlers(subscription, ON_CLOSE_MSG_CLIENT_INIT);

        delete subscriptionsList[subLocalKey];


    }

    return { subscribe: subscribe };
};


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

var callbackRegistry = __webpack_require__(1);
var Streaming = __webpack_require__(34);

/**
 * Handles session lifetime and events
 */
module.exports = function (instance, session, repository, logger) {
    'use strict';
    session.on('peer-added', handlePeerAdded);
    session.on('peer-removed', handlePeerRemoved);
    session.on('methods-added', handleMethodsAddedMessage);
    session.on('methods-removed', handleMethodsRemovedMessage);

    var callbacks = callbackRegistry();
    var streaming = new Streaming(instance, session, repository, logger);

    function handlePeerAdded(msg) {
        var newPeerId = msg.new_peer_id;
        var remoteId = msg.identity;

        var serverInfo = {
            machine: remoteId.machine,
            pid: remoteId.process,
            instance: remoteId.instance,
            application: remoteId.application,
            environment: remoteId.environment,
            region: remoteId.region,
            user: remoteId.user,
            windowId: remoteId.windowId
        };

        repository.addServer(serverInfo, newPeerId);
    }

    function handlePeerRemoved(msg) {
        var removedPeerId = msg.removed_id;
        var reason = msg.reason;

        repository.removeServerById(removedPeerId, reason);
    }

    function handleMethodsAddedMessage(msg) {
        var serverId = msg.server_id;
        var methods = msg.methods;

        methods.forEach(function (method) {
            var methodInfo = {
                id: method.id,
                name: method.name,
                displayName: method.display_name,
                description: method.description,
                version: method.version,
                objectTypes: method.object_types,
                accepts: method.input_signature,
                returns: method.result_signature,
                supportsStreaming:  typeof method.flags !== 'undefined' ? method.flags.supportsStreaming : false
            };

            repository.addServerMethod(serverId, methodInfo);
        });
    }

    function handleMethodsRemovedMessage(msg) {
        var serverId = msg.server_id;
        var methodIdList = msg.methods;

        var server = repository.getServerById(serverId);

        var serverMethodKeys = Object.keys(server.methods);

        serverMethodKeys.forEach(function (methodKey) {

            var method = server.methods[methodKey];

            if (methodIdList.indexOf(method.info.id) > -1) {

                repository.removeServerMethod(serverId, methodKey)
            }

        });
    }

    function invoke(id, method, args, target) {

        var serverId = target.id;
        var methodId = method.info.id;

        logger.debug('sending call (' + id + ') for method id ' + methodId + ' to server ' + serverId);
        var msg = {
            type: 'call',
            server_id: serverId,
            method_id: methodId,
            arguments_kv: args
        };

        // we transfer the invocation id as tag
        session.send(msg, { invocationId: id, serverId: serverId })
            .then(handleResultMessage)
            .catch(handleInvocationError);
    }

    function onInvocationResult(callback) {
        callbacks.add('onResult', callback);
    }

    function handleResultMessage(msg) {
        logger.debug('handle result message ' + msg);

        var invocationId = msg._tag.invocationId;
        var result = msg.result;
        var serverId = msg._tag.serverId;
        var server = repository.getServerById(serverId);

        callbacks.execute('onResult', invocationId, server.getInfoForUser(), 0, result, '');
    }

    function handleInvocationError(msg) {
        logger.debug('handle invocation error ' + msg);

        var invocationId = msg._tag.invocationId;
        var serverId = msg._tag.serverId;
        var server = repository.getServerById(serverId);
        var message = msg.reason;
        var context = msg.context;
        callbacks.execute('onResult', invocationId, server.getInfoForUser(), 1, context, message);
    }

    return {
        invoke: invoke,
        onInvocationResult: onInvocationResult,
        subscribe: streaming.subscribe
    };
};


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {


var serverFactory = __webpack_require__(38);
var clientFactory = __webpack_require__(35);

module.exports = function (instance, connection, clientRepository, serverRepository, libConfig, serverGetter) {
    'use strict';

    var logger = libConfig.logger.subLogger('gw3-protocol');
    var resolveReadyPromise;

    var readyPromise = new Promise(function (resolve) {
        resolveReadyPromise = resolve;
    });

    // start domain join handshake
    var session = connection.domain('agm', logger.subLogger('domain'), ["subscribed"]);
    var server = serverFactory(instance, session, clientRepository, serverRepository, logger.subLogger('server'));
    var client = clientFactory(instance, session, clientRepository, logger.subLogger('client'));

    function handleReconnect() {
        // we're reconnecting
        logger.info('reconnected - will replay registered methods and subscriptions');

        // Client side
        clientRepository.reset();
        // add our server
        clientRepository.addServer(instance, connection.peerId);
        // TODO - re-subscribe for streams

        // server side
        var registeredMethods = serverRepository.getList();
        serverRepository.reset();

        // replay server methods
        registeredMethods.forEach(function (method) {
            var def = method.definition;
            var userCallback = method.theFunction.userCallback;

            var functionToUse = serverGetter().register;
            if (method.theFunction.isAsync) {
                functionToUse = serverGetter().registerAsync;
            }

            functionToUse(def, userCallback);
        });
    }

    function handleInitialJoin() {
        clientRepository.addServer(instance, connection.peerId);

        resolveReadyPromise({
            invoke: client.invoke,
            onInvocationResult: client.onInvocationResult,
            register: server.register,

            // TODO change params
            unregister: server.unregister,
            onInvoked: server.onInvoked,
            methodInvocationResult: server.methodInvocationResult,

            // stream-related
            subscribe: client.subscribe,
            createStream: server.createStream,
            getBranchList: server.getBranchList,
            getSubscriptionList: server.getSubscriptionList,
            closeAllSubscriptions: server.closeAllSubscriptions,
            closeSingleSubscription: server.closeSingleSubscription,
            pushData: server.pushData,
            pushDataToSingle: server.pushDataToSingle,
            onSubRequest: server.onSubRequest,
            acceptRequestOnBranch: server.acceptRequestOnBranch,
            rejectRequest: server.rejectRequest,
            onSubAdded: server.onSubAdded,
            onSubRemoved: server.onSubRemoved
        });

        resolveReadyPromise = undefined;
    }

    session.onJoined(function (reconnect) {
        if (reconnect) {
            handleReconnect();
        } else {
            handleInitialJoin();
        }
    });

    session.join();

    return readyPromise;
};


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

var callbackRegistry = __webpack_require__(1);

/**
 * Handles registering methods and sending data to clients
 */
module.exports = function (instance, session, repository, vault, logger) {
    'use strict';
    session.on('add-interest', handleAddInterest);
    session.on('remove-interest', handleRemoveInterest);

    var SUBSCRIPTION_REQUEST = 'onSubscriptionRequest';
    var SUBSCRIPTION_ADDED = 'onSubscriptionAdded';
    var SUBSCRIPTION_REMOVED = 'onSubscriptionRemoved';
    var ERR_URI_SUBSCRIPTION_FAILED = 'com.tick42.agm.errors.subscription.failure';
    var callbacks = callbackRegistry();
    var nextStreamId = 0;

    // TODO there are many of these incrementing integer id's -> make a helper module
    function getNextStreamId() {
        var current = nextStreamId;
        nextStreamId += 1;
        return current;
    }

    /**
     * Processes a subscription request
     */
    function handleAddInterest(msg) {

        logger.debug('server_AddInterest ', msg);

        var caller = repository.getServerById(msg.caller_id);
        var instance = (typeof caller.getInfoForUser === 'function') ? caller.getInfoForUser() : null;

        // call subscriptionRequestHandler
        var requestContext = {
            msg: msg,
            arguments: msg.arguments_kv || {},
            instance: instance
        };

        var streamingMethod = vault.getById(msg.method_id);

        if (streamingMethod === undefined) {
            sendSubscriptionFailed(
                'No method with id ' + msg.method_id + ' on this server.',
                msg.subscription_id
            );
            return;
        }

        if (streamingMethod.subscriptionsMap && streamingMethod.subscriptionsMap[msg.subscription_id]) {
            sendSubscriptionFailed(
                'A subscription with id ' + msg.subscription_id + ' already exists.',
                msg.subscription_id
            );
            return;
        }

        callbacks.execute(SUBSCRIPTION_REQUEST, requestContext, streamingMethod);
    }

    function sendSubscriptionFailed(reason, subscriptionId) {
        var errorMessage = {
            type: 'error',
            reason_uri: ERR_URI_SUBSCRIPTION_FAILED,
            reason: reason,
            request_id: subscriptionId // this overrides connection wrapper
        };

        session.sendFireAndForget(errorMessage);
    }

    function acceptRequestOnBranch (requestContext, streamingMethod, branch) {
        if (typeof branch !== 'string') {
            branch = '';
        }

        if (typeof streamingMethod.subscriptionsMap !== 'object') {
            throw new TypeError('The streaming method is missing its subscriptions.');
        }

        if (!Array.isArray(streamingMethod.branchKeyToStreamIdMap)) {
            throw new TypeError('The streaming method is missing its branches.');
        }

        var streamId = getStreamId(streamingMethod, branch);

        // Add a new subscription to the method
        var key = requestContext.msg.subscription_id;

        var subscription = {
            id: key,
            arguments: requestContext.arguments,
            instance: requestContext.instance,
            branchKey: branch,
            streamId: streamId,
            subscribeMsg: requestContext.msg
        };

        streamingMethod.subscriptionsMap[key] = subscription;

        // Inform the gw
        session.sendFireAndForget({
            type: 'accepted',
            subscription_id: key,
            stream_id: streamId
        });

        // Pass state above-protocol for user objects
        callbacks.execute(SUBSCRIPTION_ADDED, subscription, streamingMethod)
    }

    function getStreamId(streamingMethod, branchKey) {
        if (typeof branchKey !== 'string') {
            branchKey = '';
        }

        var needleBranch = streamingMethod.branchKeyToStreamIdMap.filter(function (branch) {
            return branch.key === branchKey;
        })[0];

        var streamId = (needleBranch ? needleBranch.streamId : undefined);

        if (typeof    streamId !== 'string' || streamId === '') {
            streamId = getNextStreamId();
            streamingMethod.branchKeyToStreamIdMap.push({ key: branchKey, streamId: streamId });
        }

        return streamId;
    }

    function rejectRequest(requestContext, streamingMethod, reason) {
        if (typeof reason !== 'string') {
            reason = '';
        }

        sendSubscriptionFailed(
            'Subscription rejected by user. ' + reason,
            requestContext.msg.subscription_id
        )
    }

    function onSubscriptionLifetimeEvent(eventName, handlerFunc) {
        callbacks.add(eventName, handlerFunc)
    }

    function pushToBranch(streamingMethod, data, branches) {
        if (typeof streamingMethod !== 'object' || !Array.isArray(streamingMethod.branchKeyToStreamIdMap)) {
            return;
        }

        // TODO validate data is a plain object
        if (typeof data !== 'object') {
            throw new Error('Invalid arguments. Data must be an object.');
        }

        if (typeof branches === 'string') {
            branches = [branches]; // user wants to push to single branch
        } else if (!Array.isArray(branches) || branches.length <= 0) {
            branches = null;
        }

        // get the StreamId's from the method's branch map
        var streamIdList = streamingMethod.branchKeyToStreamIdMap
            .filter(function (br) {
                return (
                    branches === null || (Boolean(br) && typeof br.key === 'string' && branches.indexOf(br.key) >= 0)
                );
            }).map(function (br) {
                return br.streamId;
            });

        streamIdList.forEach(function (streamId) {
            session.sendFireAndForget({
                type: 'publish',
                stream_id: streamId,
                // sequence: null,  // the streamingMethod might be used for this
                // snapshot: false, // ...and this
                data: data
            })
        });
    }

    function pushDataToSingle(streamingMethod, subscription, data) {
        // TODO validate data is a plain object
        if (typeof data !== 'object') {
            throw new Error('Invalid arguments. Data must be an object.');
        }

        session.sendFireAndForget({
            type: 'post',
            subscription_id: subscription.id,
            // sequence: null,  // the streamingMethod might be used for this
            // snapshot: false, // ...and this
            data: data
        })
    }

    function closeSingleSubscription(streamingMethod, subscription) {

        delete streamingMethod.subscriptionsMap[subscription.id];

        session.sendFireAndForget({
            type: 'drop-subscription',
            subscription_id: subscription.id,
            reason: 'Server dropping a single subscription'
        });

        var subscriber = subscription.instance;

        callbacks.execute(SUBSCRIPTION_REMOVED, subscription, streamingMethod);
    }

    function closeMultipleSubscriptions(streamingMethod, branchKey) {
        if (typeof streamingMethod !== 'object' || typeof streamingMethod.subscriptionsMap !== 'object') {
            return;
        }

        var subscriptionsToClose = Object.keys(streamingMethod.subscriptionsMap)
            .map(function(key) {
                return streamingMethod.subscriptionsMap[key];
            });

        if (typeof branchKey === 'string') {
            subscriptionsToClose = subscriptionsToClose.filter(function(sub) {
                return sub.branchKey === branchKey;
            });
        }

        subscriptionsToClose.forEach(function (subscription) {
            delete streamingMethod.subscriptionsMap[subscription.id];

            session.sendFireAndForget({
                type: 'drop-subscription',
                subscription_id: subscription.id,
                reason: 'Server dropping all subscriptions on stream_id: ' + subscription.streamId
            });
        });
    }

    function getSubscriptionList(streamingMethod, branchKey) {
        if (typeof streamingMethod !== 'object') {
            return [];
        }

        var subscriptions = [];

        var allSubscriptions = Object.keys(streamingMethod.subscriptionsMap).map(function(key) {
            return streamingMethod.subscriptionsMap[key];
        });

        if (typeof branchKey !== 'string') {
            subscriptions = allSubscriptions;
        } else {
            subscriptions = allSubscriptions.filter(function (sub) {
                return sub.branchKey === branchKey;
            });
        }

        return subscriptions;
    }

    function getBranchList(streamingMethod) {
        if (typeof streamingMethod !== 'object') {
            return [];
        }

        var allSubscriptions = Object.keys(streamingMethod.subscriptionsMap).map(function(key) {
            return streamingMethod.subscriptionsMap[key];
        });

        var keysWithDuplicates = allSubscriptions.map(function (sub) {
            var result = null;
            if (typeof sub === 'object' && typeof sub.branchKey === 'string') {
                result = sub.branchKey;
            }
            return result;
        });

        var seen = [];

        var branchArray = keysWithDuplicates.filter(function (bKey) {
            if (bKey === null || seen.indexOf(bKey) >= 0) {
                return false;
            }
            seen.push(bKey);
            return true;
        });

        return branchArray;
    }

    function handleRemoveInterest(msg) {
        logger.debug('handleRemoveInterest', msg);

        var streamingMethod = vault.getById(msg.method_id)

        if (typeof msg.subscription_id !== 'string' ||
            typeof streamingMethod !== 'object' ||
            typeof streamingMethod.subscriptionsMap[msg.subscription_id] !== 'object'
        ) {
            return;
        }

        var subscription = streamingMethod.subscriptionsMap[msg.subscription_id];

        delete streamingMethod.subscriptionsMap[msg.subscription_id];

        callbacks.execute(SUBSCRIPTION_REMOVED, subscription, streamingMethod);
    }

    return {
        pushData: pushToBranch,
        pushDataToSingle: pushDataToSingle,
        onSubRequest: onSubscriptionLifetimeEvent.bind(null, SUBSCRIPTION_REQUEST),
        onSubAdded: onSubscriptionLifetimeEvent.bind(null, SUBSCRIPTION_ADDED),
        onSubRemoved: onSubscriptionLifetimeEvent.bind(null, SUBSCRIPTION_REMOVED),
        acceptRequestOnBranch: acceptRequestOnBranch,
        rejectRequest: rejectRequest,
        getSubscriptionList: getSubscriptionList,
        getBranchList: getBranchList,
        closeSingleSubscription: closeSingleSubscription,
        closeMultipleSubscriptions: closeMultipleSubscriptions
    };
};



/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

var callbackRegistry = __webpack_require__(1);
var Streaming = __webpack_require__(37);

/**
 * Handles registering methods and sending data to clients
 */
module.exports = function (instance, session, repository, vault, logger) {
    'use strict';
    var callbacks = callbackRegistry();
    var streaming = new Streaming(instance, session, repository, vault, logger);

    session.on('invoke', handleInvokeMessage);

    function handleRegisteredMessage(msg) {
        var methodId = msg._tag.methodId;
        var repoMethod = vault.getById(methodId);

        if (repoMethod && repoMethod.registrationCallbacks) {
            logger.debug('registered method ' + repoMethod.definition.name + ' with id ' + methodId);
            repoMethod.registrationCallbacks.success();
        }
    }

    function handleErrorRegister(msg) {
        logger.warn(msg);

        var methodId = msg._tag.methodId;
        var repoMethod = vault.getById(methodId);

        if (repoMethod && repoMethod.registrationCallbacks) {
            logger.debug('failed to register method ' + repoMethod.definition.name + ' with id ' + methodId);
            repoMethod.registrationCallbacks.fail();
        }
    }

    function handleInvokeMessage(msg) {
        var invocationId = msg.invocation_id;
        var callerId = msg.caller_id;
        var methodId = msg.method_id;
        var args = msg.arguments_kv;

        logger.debug('received invocation for method id "' + methodId + '" from peer '+ callerId);

        var methodList = vault.getList();

        var method = methodList.filter(function (m) {
            return m._repoId === methodId;
        })[0];

        // Stop if the message isn't for us
        if (method === undefined) {
            return;
        }

        var client = repository.getServerById(callerId);
        var invocationArgs = { args: args, instance: client.getInfoForUser() };

        callbacks.execute('onInvoked', method, invocationId, invocationArgs);
    }

    function createStream(repoMethod, streamDef, success, fail) {
        var isStreaming = true;

        // Utility things for this protocol
        repoMethod.subscriptionsMap = {}; // ~subscription_id~ : {id:~, branchKey: '~', arguments: {~}, instance:{~}, etc.}
        repoMethod.branchKeyToStreamIdMap = []; // [ {branchKey: '', streamId: 7}, {...}, ...]

        register(repoMethod, success, fail, isStreaming);
    }

    function register(repoMethod, success, fail, isStreaming) {

        var methodDef = repoMethod.definition;

        // TODO review, why is this type of closure necessary
        repoMethod.registrationCallbacks = {
            success: success,
            fail: fail
        };

        var flags = {};
        if (isStreaming === true) {
            flags = { streaming: true }
        }

        logger.debug('registering method "' + methodDef.name + '"');
        var registerMsg = {
            type: 'register',
            methods: [{
                id: repoMethod._repoId,
                name: methodDef.name,
                display_name: methodDef.displayName,
                description: methodDef.description,
                version: methodDef.version,
                flags: flags,
                object_types: methodDef.objectTypes,
                input_signature: methodDef.accepts,
                result_signature: methodDef.returns,
                restrictions: undefined
            }]
        };

        session.send(registerMsg, { methodId: repoMethod._repoId })
            .then(handleRegisteredMessage)
            .catch(handleErrorRegister);
    }

    function onInvoked(callback) {
        callbacks.add('onInvoked', callback);
    }

    function methodInvocationResult(registrationId, invocationId, err, result) {
        var msg;
        if (err) {
            msg = {
                type: 'error',
                request_id: invocationId,
                reason_uri: 'agm.errors.client_error',
                reason: err,
                context: result
            };
        } else {
            msg = {
                type: 'yield',
                invocation_id: invocationId,
                peer_id: session.peerId,
                result: result
            };
        }
        session.sendFireAndForget(msg);
    }

    function unregister(method) {
        var msg = {
            type: 'unregister',
            methods: [method._repoId]
        };

        session.send(msg)
            .then(handleUnregisteredMessage);
    }

    function handleUnregisteredMessage(msg) {
        var requestId = msg.request_id;

        logger.debug('unregistered by requestId ' + requestId);
    }

    return {
        register: register,
        onInvoked: onInvoked,
        methodInvocationResult: methodInvocationResult,
        unregister: unregister,

        createStream: createStream,
        getBranchList: streaming.getBranchList,
        getSubscriptionList: streaming.getSubscriptionList,
        closeAllSubscriptions: streaming.closeMultipleSubscriptions,
        closeSingleSubscription: streaming.closeSingleSubscription,
        pushData: streaming.pushData,
        pushDataToSingle: streaming.pushDataToSingle,
        onSubRequest: streaming.onSubRequest,
        acceptRequestOnBranch: streaming.acceptRequestOnBranch,
        rejectRequest: streaming.rejectRequest,
        onSubAdded: streaming.onSubAdded,
        onSubRemoved: streaming.onSubRemoved
    }
};


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

(function webpackUniversalModuleDefinition(root, factory) {
	if(true)
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("tick42-gateway-connection", [], factory);
	else if(typeof exports === 'object')
		exports["tick42-gateway-connection"] = factory();
	else
		root["tick42-gateway-connection"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 26);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function createRegistry() {
    var callbacks = {};
    function add(key, callback) {
        var callbacksForKey = callbacks[key];
        if (!callbacksForKey) {
            callbacksForKey = [];
            callbacks[key] = callbacksForKey;
        }
        callbacksForKey.push(callback);
        return function () {
            var allForKey = callbacks[key];
            allForKey = allForKey.filter(function (item) {
                return item !== callback;
            });
            callbacks[key] = allForKey;
        };
    }
    function execute(key) {
        var argumentsArr = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            argumentsArr[_i - 1] = arguments[_i];
        }
        var callbacksForKey = callbacks[key];
        if (!callbacksForKey || callbacksForKey.length === 0) {
            return [];
        }
        var results = [];
        callbacksForKey.forEach(function (callback) {
            try {
                var result = callback.apply(undefined, argumentsArr);
                results.push(result);
            }
            catch (err) {
                results.push(undefined);
            }
        });
        return results;
    }
    return {
        add: add,
        execute: execute
    };
}
;
createRegistry.default = createRegistry;
module.exports = createRegistry;
//# sourceMappingURL=index.js.map

/***/ }),
/* 1 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var randomFromSeed = __webpack_require__(23);

var ORIGINAL = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-';
var alphabet;
var previousSeed;

var shuffled;

function reset() {
    shuffled = false;
}

function setCharacters(_alphabet_) {
    if (!_alphabet_) {
        if (alphabet !== ORIGINAL) {
            alphabet = ORIGINAL;
            reset();
        }
        return;
    }

    if (_alphabet_ === alphabet) {
        return;
    }

    if (_alphabet_.length !== ORIGINAL.length) {
        throw new Error('Custom alphabet for shortid must be ' + ORIGINAL.length + ' unique characters. You submitted ' + _alphabet_.length + ' characters: ' + _alphabet_);
    }

    var unique = _alphabet_.split('').filter(function(item, ind, arr){
       return ind !== arr.lastIndexOf(item);
    });

    if (unique.length) {
        throw new Error('Custom alphabet for shortid must be ' + ORIGINAL.length + ' unique characters. These characters were not unique: ' + unique.join(', '));
    }

    alphabet = _alphabet_;
    reset();
}

function characters(_alphabet_) {
    setCharacters(_alphabet_);
    return alphabet;
}

function setSeed(seed) {
    randomFromSeed.seed(seed);
    if (previousSeed !== seed) {
        reset();
        previousSeed = seed;
    }
}

function shuffle() {
    if (!alphabet) {
        setCharacters(ORIGINAL);
    }

    var sourceArray = alphabet.split('');
    var targetArray = [];
    var r = randomFromSeed.nextValue();
    var characterIndex;

    while (sourceArray.length > 0) {
        r = randomFromSeed.nextValue();
        characterIndex = Math.floor(r * sourceArray.length);
        targetArray.push(sourceArray.splice(characterIndex, 1)[0]);
    }
    return targetArray.join('');
}

function getShuffled() {
    if (shuffled) {
        return shuffled;
    }
    shuffled = shuffle();
    return shuffled;
}

/**
 * lookup shuffled letter
 * @param index
 * @returns {string}
 */
function lookup(index) {
    var alphabetShuffled = getShuffled();
    return alphabetShuffled[index];
}

module.exports = {
    characters: characters,
    seed: setSeed,
    lookup: lookup,
    shuffled: getShuffled
};


/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = {"name":"tick42-gateway-connection","version":"2.4.9","description":"Tick42 Gateway Connection.","precommit":"tslint","main":"dist/node/tick42-gateway-connection.js","browser":"dist/web/tick42-gateway-connection.js","types":"types/index.d.ts","docName":"Gateway Connection","scripts":{"clean":"node ./build/scripts/clean.js","pre:build":"npm run tslint && tsc && set NODE_ENV=development && npm run clean","tslint":"tslint -t codeFrame ./src/**/*.ts","tslint:fix":"tslint -t codeFrame --fix ./src/**/*.ts","watch":"onchange ./src/**/*.ts -- npm run build:dev","build:dev":"npm run pre:build && set NODE_ENV=development && webpack && npm run types","build:prod":"npm run pre:build && set NODE_ENV=development && webpack && set NODE_ENV=production && webpack && npm run types","docs":"typedoc --options typedoc.json ./src","types":"node ./build/scripts/copy-types.js","types:merged":"dts-generator --project ./ --out ./types/index.d.ts","prepublish":"npm run build:prod && npm run test:only","test":"npm run build:dev && mocha ./tests","test:only":"mocha ./tests","test:only:reconnect":"mocha ./tests/gw3.reconnect.js"},"devDependencies":{"@types/es6-promise":"0.0.32","@types/shortid":"0.0.28","babel-core":"^6.25.0","babel-loader":"^6.4.1","babel-plugin-add-module-exports":"^0.2.1","babel-plugin-es6-promise":"^1.0.0","babel-preset-es2015":"^6.16.0","babel-preset-stage-2":"^6.22.0","chai":"^4.0.2","dts-generator":"^2.1.0","es6-promise":"^4.1.0","mocha":"^3.4.2","onchange":"3.*","pre-commit":"^1.1.3","shelljs":"^0.6.0","tick42-gateway":"^0.2.2","tick42-logger":"^3.0.8","tick42-webpack-config":"4.1.6","ts-node":"^3.0.6","tslint":"^5.4.3","typedoc":"^0.5.10","typescript":"^2.5.3","webpack":"2.3.3"},"dependencies":{"callback-registry":"^2.2.7","shortid":"^2.2.6","ws":"^0.7.2"}}

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var callback_registry_1 = __webpack_require__(0);
var packageJson = __webpack_require__(3);
/**
 * A template for gateway connections - this is extended from specific protocols and transports.
 */
var ConnectionImpl = (function () {
    function ConnectionImpl(settings) {
        // The message handlers that have to be executed for each received message
        this.messageHandlers = {};
        this.ids = 1;
        this.registry = callback_registry_1.default();
        this._connected = false;
        this._settings = settings;
    }
    ConnectionImpl.prototype.init = function (transport, protocol) {
        this._protocol = protocol;
        this._transport = transport;
        this._transport.onConnectedChanged(this.handleConnectionChanged.bind(this));
        this._transport.onMessage(this.handleTransportMessage.bind(this));
    };
    ConnectionImpl.prototype.send = function (product, type, message, id, options) {
        // create a message using the protocol
        if (this._transport.isObjectBasedTransport) {
            var msg = this._protocol.createObjectMessage(product, type, message, id);
            return this._transport.sendObject(msg, product, type, options);
        }
        else {
            var strMessage = this._protocol.createStringMessage(product, type, message, id);
            return this._transport.send(strMessage, product, type, options);
        }
    };
    ConnectionImpl.prototype.on = function (product, type, messageHandler) {
        type = type.toLowerCase();
        if (this.messageHandlers[type] === undefined) {
            this.messageHandlers[type] = {};
        }
        var id = this.ids++;
        this.messageHandlers[type][id] = messageHandler;
        return {
            type: type,
            id: id,
        };
    };
    // Remove a handler
    ConnectionImpl.prototype.off = function (info) {
        delete this.messageHandlers[info.type.toLowerCase()][info.id];
    };
    Object.defineProperty(ConnectionImpl.prototype, "isConnected", {
        get: function () {
            return this._connected;
        },
        enumerable: true,
        configurable: true
    });
    ConnectionImpl.prototype.connected = function (callback) {
        if (this._connected) {
            callback(this._settings.ws || this._settings.http);
        }
        return this.registry.add("connected", callback);
    };
    ConnectionImpl.prototype.disconnected = function (callback) {
        return this.registry.add("disconnected", callback);
    };
    ConnectionImpl.prototype.login = function (authRequest) {
        // open the protocol in case it was closed by explicity logout
        this._transport.open();
        return this._protocol.login(authRequest);
    };
    ConnectionImpl.prototype.logout = function () {
        this._protocol.logout();
        this._transport.close();
    };
    ConnectionImpl.prototype.loggedIn = function (callback) {
        return this._protocol.loggedIn(callback);
    };
    Object.defineProperty(ConnectionImpl.prototype, "protocolVersion", {
        get: function () {
            return this._settings.protocolVersion || 1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConnectionImpl.prototype, "version", {
        get: function () {
            return this._settings.version;
        },
        enumerable: true,
        configurable: true
    });
    ConnectionImpl.prototype.toAPI = function () {
        var that = this;
        return {
            send: that.send.bind(that),
            on: that.on.bind(that),
            off: that.off.bind(that),
            login: that.login.bind(that),
            logout: that.logout.bind(that),
            loggedIn: that.loggedIn.bind(that),
            connected: that.connected.bind(that),
            disconnected: that.disconnected.bind(that),
            get protocolVersion() {
                return that.protocolVersion;
            },
            get version() {
                return that.version;
            },
        };
    };
    ConnectionImpl.prototype.distributeMessage = function (message, type) {
        // Retrieve handlers for the message type
        var handlers = this.messageHandlers[type.toLowerCase()];
        if (handlers !== undefined) {
            // Execute them
            Object.keys(handlers).forEach(function (handlerId) {
                var handler = handlers[handlerId];
                if (handler !== undefined) {
                    handler(message);
                }
            });
        }
    };
    ConnectionImpl.prototype.handleConnectionChanged = function (connected) {
        if (this._connected === connected) {
            return;
        }
        this._connected = connected;
        if (connected) {
            this.registry.execute("connected");
        }
        else {
            this.registry.execute("disconnected");
        }
    };
    ConnectionImpl.prototype.handleTransportMessage = function (msg) {
        var msgObj;
        if (typeof msg === "string") {
            msgObj = this._protocol.processStringMessage(msg);
        }
        else {
            msgObj = this._protocol.processObjectMessage(msg);
        }
        this.distributeMessage(msgObj.msg, msgObj.msgType);
    };
    return ConnectionImpl;
}());
exports.default = ConnectionImpl;
//# sourceMappingURL=connection.js.map

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var randomByte = __webpack_require__(22);

function encode(lookup, number) {
    var loopCounter = 0;
    var done;

    var str = '';

    while (!done) {
        str = str + lookup( ( (number >> (4 * loopCounter)) & 0x0f ) | randomByte() );
        done = number < (Math.pow(16, loopCounter + 1 ) );
        loopCounter++;
    }
    return str;
}

module.exports = encode;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var connection_1 = __webpack_require__(4);
var GW3ConnectionImpl = (function (_super) {
    __extends(GW3ConnectionImpl, _super);
    function GW3ConnectionImpl(settings) {
        return _super.call(this, settings) || this;
    }
    GW3ConnectionImpl.prototype.init = function (transport, protocol) {
        _super.prototype.init.call(this, transport, protocol);
        this.gw3Protocol = protocol;
    };
    GW3ConnectionImpl.prototype.toAPI = function () {
        var that = this;
        var superAPI = _super.prototype.toAPI.call(this);
        return {
            domain: that.domain.bind(that),
            get peerId() { return that.peerId; },
            get token() { return that.token; },
            get info() { return that.info; },
            get resolvedIdentity() { return that.resolvedIdentity; },
            get availableDomains() { return that.availableDomains; },
            get gatewayToken() { return that.gatewayToken; },
            on: superAPI.on,
            send: superAPI.send,
            off: superAPI.off,
            login: superAPI.login,
            logout: superAPI.logout,
            loggedIn: superAPI.loggedIn,
            connected: superAPI.connected,
            disconnected: superAPI.disconnected,
            get protocolVersion() { return superAPI.protocolVersion; },
            get version() { return superAPI.version; },
        };
    };
    GW3ConnectionImpl.prototype.domain = function (domain, logger, successMessages, errorMessages) {
        return this.gw3Protocol.domain(domain, logger, successMessages, errorMessages);
    };
    return GW3ConnectionImpl;
}(connection_1.default));
exports.default = GW3ConnectionImpl;
//# sourceMappingURL=gw3Connection.js.map

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Connection to gateway V1 - the one that runs on the desktop without authentication
 */
var GW1Protocol = (function () {
    function GW1Protocol() {
    }
    GW1Protocol.prototype.processStringMessage = function (message) {
        // GW1 messages have the following structure
        // {message: object, type: string}
        // so type is outside the message
        var messageObj = JSON.parse(message);
        return {
            msg: messageObj.message,
            msgType: messageObj.type,
        };
    };
    GW1Protocol.prototype.createStringMessage = function (product, type, message, id) {
        return JSON.stringify({
            type: type,
            message: message,
            id: id,
        });
    };
    GW1Protocol.prototype.login = function (message) {
        return Promise.resolve({ application: undefined });
    };
    GW1Protocol.prototype.logout = function () {
        // Do nothing
    };
    GW1Protocol.prototype.loggedIn = function (callback) {
        callback();
        return function () {
            // do nothing
        };
    };
    GW1Protocol.prototype.processObjectMessage = function (message) {
        throw new Error("not supported");
    };
    GW1Protocol.prototype.createObjectMessage = function (product, type, message, id) {
        throw new Error("not supported");
    };
    return GW1Protocol;
}());
exports.default = GW1Protocol;
//# sourceMappingURL=gw1.js.map

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var MESSAGE_LOGIN = "LOGIN";
var MESSAGE_LOGIN_RESPONSE = "LOGIN_RESPONSE";
var MESSAGE_LOGIN_TOKEN = "LOGIN_TOKEN";
var MESSAGE_LOGOUT = "LOGOUT";
var MESSAGE_SEND = "SEND";
// Connection to gateway V2 - gw1 +  authentication
var GW2Protocol = (function () {
    function GW2Protocol(connection) {
        this.connection = connection;
    }
    GW2Protocol.prototype.processStringMessage = function (message) {
        // GW2 messages have the following structure
        // {message: object, type: string}
        // so type is outside the message
        // This is the same protocol sa GW1 except for SEND messages :(
        // They have different structure because of authentication
        var messageObj = JSON.parse(message);
        if (messageObj.type === MESSAGE_SEND) {
            // GW2 introduces a new
            return {
                msg: messageObj.data.message,
                msgType: messageObj.data.type,
            };
        }
        return {
            msg: messageObj,
            msgType: messageObj.type,
        };
    };
    GW2Protocol.prototype.createStringMessage = function (product, type, message, id) {
        // GW2 message madness bellow
        // LOGIN and LOGOUT are kind of special
        if (type === MESSAGE_LOGIN) {
            return JSON.stringify(message);
        }
        if (type === MESSAGE_LOGOUT) {
            return JSON.stringify({ type: "LOGOUT" });
        }
        return JSON.stringify({
            type: MESSAGE_SEND,
            sessionCookie: this.sessionCookie,
            data: {
                type: type,
                message: message,
                id: id,
            },
        });
    };
    GW2Protocol.prototype.login = function (message) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var request;
            if (message.token) {
                request = {
                    token: message.token,
                    type: MESSAGE_LOGIN_TOKEN,
                };
            }
            else if (message.username) {
                request = {
                    user: message.username,
                    password: message.password,
                    type: MESSAGE_LOGIN,
                };
            }
            else {
                throw new Error("Invalid auth message" + JSON.stringify(message));
            }
            var lrSubs = _this.connection.on("", MESSAGE_LOGIN_RESPONSE, function (response) {
                _this.connection.off(lrSubs);
                if (response && !response.errorMessage) {
                    _this.sessionCookie = response.sessionCookie;
                    resolve(response);
                }
                else {
                    reject(response);
                }
            });
            _this.connection.send("", "LOGIN", request);
        });
    };
    GW2Protocol.prototype.logout = function () {
        this.connection.send("", "LOGOUT", {});
    };
    GW2Protocol.prototype.loggedIn = function (callback) {
        callback();
        return function () {
            // do nothing
        };
    };
    GW2Protocol.prototype.processObjectMessage = function (message) {
        throw new Error("not supported");
    };
    GW2Protocol.prototype.createObjectMessage = function (product, type, message, id) {
        throw new Error("not supported");
    };
    return GW2Protocol;
}());
exports.default = GW2Protocol;
//# sourceMappingURL=gw2.js.map

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var gw3Domain_1 = __webpack_require__(27);
var callback_registry_1 = __webpack_require__(0);
function default_1(connection, settings, logger) {
    var datePrefix = "#T42_DATE#";
    var datePrefixLen = datePrefix.length;
    var dateMinLen = datePrefixLen + 1; // prefix + at least one char (1970/01/01 = 0)
    var datePrefixFirstChar = datePrefix[0];
    var registry = callback_registry_1.default();
    /* Flag indicating if the user is currently logged in */
    var isLoggedIn = false;
    /*
     * If true(default) the user wants to be connected.
     * If the user explicitly calls logout this will become false.
     * This is used to determine if it should retry trying to login.
     */
    var shouldTryLogin = true;
    /* True only if this is the initial login attempt. */
    var initialLogin = true;
    var initialLoginAttempts = 3;
    var initialLoginAttemptsInterval = 500;
    var sessions = [];
    var loginConfig;
    connection.disconnected(handleDisconnected.bind(this));
    // for js-activity
    connection.gatewayToken = getGatewayToken();
    ping();
    function processStringMessage(message) {
        var msg = JSON.parse(message, function (key, value) {
            // check for date - we have custom protocol for dates
            if (typeof value !== "string") {
                return value;
            }
            if (value.length < dateMinLen) {
                return value;
            }
            if (value[0] !== datePrefixFirstChar) {
                return value;
            }
            try {
                var milliseconds = parseInt(value.substring(datePrefixLen, value.length), 10);
                if (isNaN(milliseconds)) {
                    return value;
                }
                return new Date(milliseconds);
            }
            catch (ex) {
                return value;
            }
        });
        return {
            msg: msg,
            msgType: msg.type,
        };
    }
    function createStringMessage(product, type, message, id) {
        var oldToJson = Date.prototype.toJSON;
        try {
            Date.prototype.toJSON = function () {
                return datePrefix + this.getTime();
            };
            var result = JSON.stringify(message);
            return result;
        }
        finally {
            Date.prototype.toJSON = oldToJson;
        }
    }
    function processObjectMessage(message) {
        if (!message.type) {
            throw new Error("Object should have type property");
        }
        return {
            msg: message,
            msgType: message.type,
        };
    }
    function createObjectMessage(product, type, message, id) {
        return message;
    }
    function login(config) {
        var _this = this;
        logger.debug("logging in...");
        loginConfig = config;
        if (!loginConfig) {
            // in case of no auth send empty username and password
            loginConfig = { username: "", password: "" };
        }
        shouldTryLogin = true;
        return new Promise(function (resolve, reject) {
            var authentication = {};
            var gwToken = getGatewayToken();
            if (gwToken) {
                authentication.method = "gateway-token";
                authentication.token = gwToken;
            }
            else if (config.token) {
                authentication.method = "access-token";
                authentication.token = config.token;
            }
            else if (config.username) {
                authentication.method = "secret";
                authentication.login = config.username;
                authentication.secret = config.password;
            }
            else {
                throw new Error("invalid auth message" + JSON.stringify(config));
            }
            var helloMsg = {
                type: "hello",
                identity: settings.identity,
                authentication: authentication,
            };
            var globalDomain = gw3Domain_1.default("global", connection, logger, [
                "welcome"
            ]);
            globalDomain.send(helloMsg, undefined, { skipPeerId: true, retryInterval: settings.reconnectInterval, maxRetries: settings.reconnectAttempts })
                .then(function (msg) {
                // we've logged in once - set this to false for the rest of the lifetime
                _this.initialLogin = false;
                logger.debug("login successful with PeerId " + msg.peer_id);
                connection.peerId = msg.peer_id;
                connection.resolvedIdentity = msg.resolved_identity;
                connection.availableDomains = msg.available_domains;
                if (msg.options) {
                    connection.token = msg.options.access_token;
                    connection.info = msg.options.info;
                }
                setLoggedIn(true);
                resolve(msg.resolved_identity);
            })
                .catch(function (err) {
                logger.error("error sending hello message - " + err);
                reject(err);
            });
        });
    }
    function logout() {
        logger.debug("logging out...");
        shouldTryLogin = false;
        // go through all sessions and leave the corresponding domain
        sessions.forEach(function (session) {
            session.leave();
        });
    }
    function loggedIn(callback) {
        if (isLoggedIn) {
            callback();
        }
        return registry.add("onLoggedIn", callback);
    }
    function domain(domainName, domainLogger, successMessages, errorMessages) {
        var session = sessions.filter(function (s) { return s.domain === domainName; })[0];
        if (!session) {
            session = gw3Domain_1.default(domainName, connection, domainLogger, successMessages, errorMessages);
            sessions.push(session);
        }
        return session;
    }
    function getGatewayToken() {
        if (settings.gwTokenProvider) {
            return settings.gwTokenProvider.get();
        }
        if (settings.gatewayToken) {
            return settings.gatewayToken;
        }
        if (typeof location !== "undefined" && location.search) {
            var searchParams = new URLSearchParams(location.search.slice(1));
            return searchParams.get("t42gwtoken");
        }
        return null;
    }
    function handleDisconnected() {
        setLoggedIn(false);
        var tryToLogin = shouldTryLogin;
        if (tryToLogin && initialLogin) {
            if (initialLoginAttempts <= 0) {
                return;
            }
            initialLoginAttempts--;
        }
        logger.debug("disconnected - will try new login?" + shouldTryLogin);
        if (shouldTryLogin) {
            connection.login(loginConfig)
                .catch(function () {
                setTimeout(handleDisconnected, 1000);
            });
        }
    }
    function setLoggedIn(value) {
        isLoggedIn = value;
        if (isLoggedIn) {
            registry.execute("onLoggedIn");
        }
    }
    // ping the server every 30 sec
    function ping() {
        if (isLoggedIn) {
            connection.send("", "", { type: "ping" });
        }
        setTimeout(ping, 30 * 1000);
    }
    return {
        processStringMessage: processStringMessage,
        createStringMessage: createStringMessage,
        createObjectMessage: createObjectMessage,
        processObjectMessage: processObjectMessage,
        login: login,
        logout: logout,
        loggedIn: loggedIn,
        domain: domain,
    };
}
exports.default = default_1;
//# sourceMappingURL=gw3.js.map

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var es6_promise_1 = __webpack_require__(15);
/**
 * Connection to HC
 */
var HCProtocol = (function () {
    function HCProtocol() {
    }
    HCProtocol.prototype.processStringMessage = function (message) {
        var messageObj = JSON.parse(message);
        return {
            msg: messageObj,
            msgType: messageObj.type,
        };
    };
    HCProtocol.prototype.createStringMessage = function (product, type, message, id) {
        return JSON.stringify(message);
    };
    HCProtocol.prototype.login = function (message) {
        return es6_promise_1.Promise.resolve({ application: undefined });
    };
    HCProtocol.prototype.logout = function () {
        // Do nothing
    };
    HCProtocol.prototype.loggedIn = function (callback) {
        callback();
        return function () {
            // do nothing
        };
    };
    HCProtocol.prototype.processObjectMessage = function (message) {
        throw new Error("not supported");
    };
    HCProtocol.prototype.createObjectMessage = function (product, type, message, id) {
        throw new Error("not supported");
    };
    return HCProtocol;
}());
exports.default = HCProtocol;
//# sourceMappingURL=hc.js.map

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Connection to HtmlContainer
 */
var HCTransport = (function () {
    function HCTransport() {
        this.connectionId = Math.floor(1e10 * Math.random()).toString();
    }
    HCTransport.prototype.send = function (message, product, type) {
        if (product === "metrics") {
            global.htmlContainer.metricsFacade.send(type, message);
        }
        else if (product === "log") {
            global.htmlContainer.loggingFacade.send(type, message);
        }
        return Promise.resolve(undefined);
    };
    HCTransport.prototype.onConnectedChanged = function (callback) {
        // always connected;
        callback(true);
    };
    HCTransport.prototype.onMessage = function (callback) {
        // dummy implementation
        // hc transports are one way only
    };
    HCTransport.prototype.close = function () {
        // do nothing
    };
    HCTransport.prototype.open = function () {
        // do nothing
    };
    return HCTransport;
}());
exports.default = HCTransport;
//# sourceMappingURL=hc.js.map
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {
Object.defineProperty(exports, "__esModule", { value: true });
var callback_registry_1 = __webpack_require__(0);
var HTTPTransport = (function () {
    function HTTPTransport(settings, logger) {
        this.registry = callback_registry_1.default();
        this.url = settings.http;
        // polling interval in ms, default is 1 second
        this.interval = settings.httpInterval || 1000;
        this.logger = logger;
        this.logger.debug("Attempting connection to Gateway via HTTP with url " + this.url + " on interval " + this.interval + " ms");
    }
    HTTPTransport.prototype.close = function () {
        // Do nothing
    };
    HTTPTransport.prototype.open = function () {
        // do nothing
    };
    HTTPTransport.prototype.onConnectedChanged = function (callback) {
        callback(true);
    };
    HTTPTransport.prototype.onMessage = function (callback) {
        this.registry.add("onMessage", callback);
    };
    HTTPTransport.prototype.send = function (msg) {
        this.httpPost(this.url, msg);
        return Promise.resolve(undefined);
    };
    /**
     * Polls data from a given url on some interval
     * @param url       Base server url. A sequence url param may be added based on the seq param
     * @param interval  Interval (in ms) between polling requestts
     * @param seq       Next sequence number we should ask for (if 0 the server will return the last known message)
     * @param ondata    Data callback
     */
    HTTPTransport.prototype.poll = function (url, interval, seq, ondata) {
        var _this = this;
        // construct the get Url - if seq != 0 add as url param to get
        // only messages after this sequence
        var getUrl = url;
        if (seq !== 0) {
            getUrl = url + "?sequence=" + seq + "&no-cache=" + new Date().getTime();
        }
        // create a request
        var xmlhttp = this.createCORSRequest("GET", getUrl, function () {
            if (seq === 0) {
                _this.logger.debug("Connected to Gateway on " + url);
            }
            var message = JSON.parse(xmlhttp.responseText);
            // the server returns the number of the next sequence that we must query for
            var nextSeq = message.nextSequence;
            // call user callback
            ondata(message.data);
            // re-schedule
            setTimeout(function () {
                _this.poll(url, interval, nextSeq, ondata);
            }, _this.interval);
        });
        xmlhttp.onerror = function (ev) {
            console.log("Error polling data from http server " + getUrl + " -  + " + ev);
            // re-schedule
            setTimeout(function () {
                _this.poll(url, interval, seq, ondata);
            }, _this.interval);
        };
        xmlhttp.send();
    };
    /**
     * POSTs a message to a given url
     */
    HTTPTransport.prototype.httpPost = function (url, message) {
        // create a request
        var xmlhttp = this.createCORSRequest("POST", url);
        xmlhttp.send(message);
    };
    /**
     * Creates CORS request (cross domain requests) for different browsers - XMLHttpRequest withCredentials
     * for Chrome and FF and XDomainRequest for IE
     */
    HTTPTransport.prototype.createCORSRequest = function (method, url, resultCallback) {
        var xhr = new XMLHttpRequest();
        if ("withCredentials" in xhr) {
            // Check if the XMLHttpRequest object has a "withCredentials" property.
            // "withCredentials" only exists on XMLHTTPRequest2 objects.
            xhr.open(method, url, true);
            if (typeof resultCallback !== "undefined") {
                xhr.onreadystatechange = function () {
                    if (xhr.readyState === 4 && xhr.status === 200) {
                        resultCallback();
                    }
                };
            }
        }
        else if (typeof global.XDomainRequest !== "undefined") {
            // Otherwise, check if XDomainRequest.
            // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
            xhr = new global.XDomainRequest();
            xhr.open(method, url);
            if (typeof resultCallback !== "undefined") {
                xhr.onload = resultCallback;
            }
        }
        else {
            // Otherwise, CORS is not supported by the browser.
            xhr = null;
        }
        return xhr;
    };
    return HTTPTransport;
}());
exports.default = HTTPTransport;
//# sourceMappingURL=http.js.map
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var callback_registry_1 = __webpack_require__(0);
/**
 * Inproc transport for GW3
 */
var Inproc = (function () {
    function Inproc(token, gw, logger) {
        this.registry = callback_registry_1.default();
        this.gw = gw;
        this.gwToken = token;
        this.logger = logger;
        this.connectToken = this.gw.connect(this.gwToken, this.messageHandler.bind(this));
    }
    Object.defineProperty(Inproc.prototype, "isObjectBasedTransport", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Inproc.prototype.sendObject = function (msg) {
        this.logger.debug(JSON.stringify(msg));
        this.gw.send(this.connectToken, msg);
        return Promise.resolve(undefined);
    };
    Inproc.prototype.send = function (msg, product, type) {
        return Promise.reject("not supported");
    };
    Inproc.prototype.onMessage = function (callback) {
        return this.registry.add("onMessage", callback);
    };
    Inproc.prototype.onConnectedChanged = function (callback) {
        callback(true);
    };
    Inproc.prototype.close = function () {
        // DO NOTHING
    };
    Inproc.prototype.open = function () {
        // do nothing
    };
    Inproc.prototype.messageHandler = function (msg) {
        if (this.logger.consoleLevel() === "trace") {
            this.logger.debug(JSON.stringify(msg));
        }
        this.registry.execute("onMessage", msg);
    };
    return Inproc;
}());
exports.default = Inproc;
//# sourceMappingURL=inproc.js.map

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {
Object.defineProperty(exports, "__esModule", { value: true });
var callback_registry_1 = __webpack_require__(0);
var WebSocket = isNode() ? __webpack_require__(25) : global.WebSocket;
function isNode() {
    // Only Node.JS has a process variable that is of [[Class]] process
    try {
        return Object.prototype.toString.call(global.process) === "[object process]";
    }
    catch (e) {
        return false;
    }
}
var WS = (function () {
    function WS(settings, logger) {
        /**
         * If the flag is true the connection should keep trying to connect.
         * If false the user explicitly closed it and it should not reconnect
         */
        this._running = true;
        this._initied = false;
        this._registry = callback_registry_1.default();
        this._settings = settings;
        this._logger = logger;
        this.waitForSocketConnection(undefined, undefined, 1, 0);
    }
    WS.prototype.onMessage = function (callback) {
        return this._registry.add("onMessage", callback);
    };
    // Create a function for sending a message
    WS.prototype.send = function (msg, product, type, options) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            options = options || {};
            _this.waitForSocketConnection(function () {
                try {
                    _this._ws.send(msg);
                    resolve();
                }
                catch (e) {
                    reject(e);
                }
            }, reject, options.maxRetries, options.retryInterval);
        });
    };
    WS.prototype.open = function () {
        this._running = true;
    };
    WS.prototype.close = function () {
        this._running = false;
        this._ws.close();
    };
    WS.prototype.onConnectedChanged = function (callback) {
        return this._registry.add("onConnectedChanged", callback);
    };
    WS.prototype.initiateSocket = function () {
        var _this = this;
        this._logger.debug("initiating _ws...");
        this._ws = new WebSocket(this._settings.ws);
        this._ws.onerror = function (err) {
            _this.notifyStatusChanged(false, err);
        };
        this._ws.onclose = function () {
            _this._logger.debug("_ws closed");
            _this.notifyStatusChanged(false);
        };
        // Log on connection
        this._ws.onopen = function () {
            _this._logger.debug("_ws opened");
            _this.notifyStatusChanged(true);
        };
        // Attach handler
        this._ws.onmessage = function (message) {
            _this._registry.execute("onMessage", message.data);
        };
    };
    // Holds callback execution until socket connection is established.
    WS.prototype.waitForSocketConnection = function (callback, failed, retriesLeft, retryInterval) {
        var _this = this;
        if (!callback) {
            callback = function () { };
        }
        if (!failed) {
            failed = function () { };
        }
        if (retryInterval === undefined) {
            retryInterval = this._settings.reconnectInterval;
        }
        if (retriesLeft !== undefined && retriesLeft === 0) {
            failed("wait for socket on " + this._settings.ws + " failed - no more retires left");
            return;
        }
        // check if we're still running
        if (!this._running) {
            failed("wait for socket on " + this._settings.ws + " failed - socket closed by user");
            return;
        }
        if (!this._ws || this._ws.readyState > 1) {
            // > 1 means closing or closed
            this.initiateSocket();
        }
        else if (this._ws.readyState === 1) {
            return callback();
        }
        setTimeout(function () {
            var retries = retriesLeft === undefined ? undefined : retriesLeft - 1;
            _this.waitForSocketConnection(callback, failed, retries, retryInterval);
        }, retryInterval); // wait X milliseconds for the connection...
    };
    WS.prototype.notifyStatusChanged = function (status, reason) {
        this._registry.execute("onConnectedChanged", status, reason);
    };
    return WS;
}());
exports.default = WS;
//# sourceMappingURL=ws.js.map
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process, global) {var require;/*!
 * @overview es6-promise - a tiny implementation of Promises/A+.
 * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
 * @license   Licensed under MIT license
 *            See https://raw.githubusercontent.com/stefanpenner/es6-promise/master/LICENSE
 * @version   4.1.1
 */

(function (global, factory) {
	 true ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.ES6Promise = factory());
}(this, (function () { 'use strict';

function objectOrFunction(x) {
  var type = typeof x;
  return x !== null && (type === 'object' || type === 'function');
}

function isFunction(x) {
  return typeof x === 'function';
}

var _isArray = undefined;
if (Array.isArray) {
  _isArray = Array.isArray;
} else {
  _isArray = function (x) {
    return Object.prototype.toString.call(x) === '[object Array]';
  };
}

var isArray = _isArray;

var len = 0;
var vertxNext = undefined;
var customSchedulerFn = undefined;

var asap = function asap(callback, arg) {
  queue[len] = callback;
  queue[len + 1] = arg;
  len += 2;
  if (len === 2) {
    // If len is 2, that means that we need to schedule an async flush.
    // If additional callbacks are queued before the queue is flushed, they
    // will be processed by this flush that we are scheduling.
    if (customSchedulerFn) {
      customSchedulerFn(flush);
    } else {
      scheduleFlush();
    }
  }
};

function setScheduler(scheduleFn) {
  customSchedulerFn = scheduleFn;
}

function setAsap(asapFn) {
  asap = asapFn;
}

var browserWindow = typeof window !== 'undefined' ? window : undefined;
var browserGlobal = browserWindow || {};
var BrowserMutationObserver = browserGlobal.MutationObserver || browserGlobal.WebKitMutationObserver;
var isNode = typeof self === 'undefined' && typeof process !== 'undefined' && ({}).toString.call(process) === '[object process]';

// test for web worker but not in IE10
var isWorker = typeof Uint8ClampedArray !== 'undefined' && typeof importScripts !== 'undefined' && typeof MessageChannel !== 'undefined';

// node
function useNextTick() {
  // node version 0.10.x displays a deprecation warning when nextTick is used recursively
  // see https://github.com/cujojs/when/issues/410 for details
  return function () {
    return process.nextTick(flush);
  };
}

// vertx
function useVertxTimer() {
  if (typeof vertxNext !== 'undefined') {
    return function () {
      vertxNext(flush);
    };
  }

  return useSetTimeout();
}

function useMutationObserver() {
  var iterations = 0;
  var observer = new BrowserMutationObserver(flush);
  var node = document.createTextNode('');
  observer.observe(node, { characterData: true });

  return function () {
    node.data = iterations = ++iterations % 2;
  };
}

// web worker
function useMessageChannel() {
  var channel = new MessageChannel();
  channel.port1.onmessage = flush;
  return function () {
    return channel.port2.postMessage(0);
  };
}

function useSetTimeout() {
  // Store setTimeout reference so es6-promise will be unaffected by
  // other code modifying setTimeout (like sinon.useFakeTimers())
  var globalSetTimeout = setTimeout;
  return function () {
    return globalSetTimeout(flush, 1);
  };
}

var queue = new Array(1000);
function flush() {
  for (var i = 0; i < len; i += 2) {
    var callback = queue[i];
    var arg = queue[i + 1];

    callback(arg);

    queue[i] = undefined;
    queue[i + 1] = undefined;
  }

  len = 0;
}

function attemptVertx() {
  try {
    var r = require;
    var vertx = __webpack_require__(28);
    vertxNext = vertx.runOnLoop || vertx.runOnContext;
    return useVertxTimer();
  } catch (e) {
    return useSetTimeout();
  }
}

var scheduleFlush = undefined;
// Decide what async method to use to triggering processing of queued callbacks:
if (isNode) {
  scheduleFlush = useNextTick();
} else if (BrowserMutationObserver) {
  scheduleFlush = useMutationObserver();
} else if (isWorker) {
  scheduleFlush = useMessageChannel();
} else if (browserWindow === undefined && "function" === 'function') {
  scheduleFlush = attemptVertx();
} else {
  scheduleFlush = useSetTimeout();
}

function then(onFulfillment, onRejection) {
  var _arguments = arguments;

  var parent = this;

  var child = new this.constructor(noop);

  if (child[PROMISE_ID] === undefined) {
    makePromise(child);
  }

  var _state = parent._state;

  if (_state) {
    (function () {
      var callback = _arguments[_state - 1];
      asap(function () {
        return invokeCallback(_state, child, callback, parent._result);
      });
    })();
  } else {
    subscribe(parent, child, onFulfillment, onRejection);
  }

  return child;
}

/**
  `Promise.resolve` returns a promise that will become resolved with the
  passed `value`. It is shorthand for the following:

  ```javascript
  let promise = new Promise(function(resolve, reject){
    resolve(1);
  });

  promise.then(function(value){
    // value === 1
  });
  ```

  Instead of writing the above, your code now simply becomes the following:

  ```javascript
  let promise = Promise.resolve(1);

  promise.then(function(value){
    // value === 1
  });
  ```

  @method resolve
  @static
  @param {Any} value value that the returned promise will be resolved with
  Useful for tooling.
  @return {Promise} a promise that will become fulfilled with the given
  `value`
*/
function resolve$1(object) {
  /*jshint validthis:true */
  var Constructor = this;

  if (object && typeof object === 'object' && object.constructor === Constructor) {
    return object;
  }

  var promise = new Constructor(noop);
  resolve(promise, object);
  return promise;
}

var PROMISE_ID = Math.random().toString(36).substring(16);

function noop() {}

var PENDING = void 0;
var FULFILLED = 1;
var REJECTED = 2;

var GET_THEN_ERROR = new ErrorObject();

function selfFulfillment() {
  return new TypeError("You cannot resolve a promise with itself");
}

function cannotReturnOwn() {
  return new TypeError('A promises callback cannot return that same promise.');
}

function getThen(promise) {
  try {
    return promise.then;
  } catch (error) {
    GET_THEN_ERROR.error = error;
    return GET_THEN_ERROR;
  }
}

function tryThen(then$$1, value, fulfillmentHandler, rejectionHandler) {
  try {
    then$$1.call(value, fulfillmentHandler, rejectionHandler);
  } catch (e) {
    return e;
  }
}

function handleForeignThenable(promise, thenable, then$$1) {
  asap(function (promise) {
    var sealed = false;
    var error = tryThen(then$$1, thenable, function (value) {
      if (sealed) {
        return;
      }
      sealed = true;
      if (thenable !== value) {
        resolve(promise, value);
      } else {
        fulfill(promise, value);
      }
    }, function (reason) {
      if (sealed) {
        return;
      }
      sealed = true;

      reject(promise, reason);
    }, 'Settle: ' + (promise._label || ' unknown promise'));

    if (!sealed && error) {
      sealed = true;
      reject(promise, error);
    }
  }, promise);
}

function handleOwnThenable(promise, thenable) {
  if (thenable._state === FULFILLED) {
    fulfill(promise, thenable._result);
  } else if (thenable._state === REJECTED) {
    reject(promise, thenable._result);
  } else {
    subscribe(thenable, undefined, function (value) {
      return resolve(promise, value);
    }, function (reason) {
      return reject(promise, reason);
    });
  }
}

function handleMaybeThenable(promise, maybeThenable, then$$1) {
  if (maybeThenable.constructor === promise.constructor && then$$1 === then && maybeThenable.constructor.resolve === resolve$1) {
    handleOwnThenable(promise, maybeThenable);
  } else {
    if (then$$1 === GET_THEN_ERROR) {
      reject(promise, GET_THEN_ERROR.error);
      GET_THEN_ERROR.error = null;
    } else if (then$$1 === undefined) {
      fulfill(promise, maybeThenable);
    } else if (isFunction(then$$1)) {
      handleForeignThenable(promise, maybeThenable, then$$1);
    } else {
      fulfill(promise, maybeThenable);
    }
  }
}

function resolve(promise, value) {
  if (promise === value) {
    reject(promise, selfFulfillment());
  } else if (objectOrFunction(value)) {
    handleMaybeThenable(promise, value, getThen(value));
  } else {
    fulfill(promise, value);
  }
}

function publishRejection(promise) {
  if (promise._onerror) {
    promise._onerror(promise._result);
  }

  publish(promise);
}

function fulfill(promise, value) {
  if (promise._state !== PENDING) {
    return;
  }

  promise._result = value;
  promise._state = FULFILLED;

  if (promise._subscribers.length !== 0) {
    asap(publish, promise);
  }
}

function reject(promise, reason) {
  if (promise._state !== PENDING) {
    return;
  }
  promise._state = REJECTED;
  promise._result = reason;

  asap(publishRejection, promise);
}

function subscribe(parent, child, onFulfillment, onRejection) {
  var _subscribers = parent._subscribers;
  var length = _subscribers.length;

  parent._onerror = null;

  _subscribers[length] = child;
  _subscribers[length + FULFILLED] = onFulfillment;
  _subscribers[length + REJECTED] = onRejection;

  if (length === 0 && parent._state) {
    asap(publish, parent);
  }
}

function publish(promise) {
  var subscribers = promise._subscribers;
  var settled = promise._state;

  if (subscribers.length === 0) {
    return;
  }

  var child = undefined,
      callback = undefined,
      detail = promise._result;

  for (var i = 0; i < subscribers.length; i += 3) {
    child = subscribers[i];
    callback = subscribers[i + settled];

    if (child) {
      invokeCallback(settled, child, callback, detail);
    } else {
      callback(detail);
    }
  }

  promise._subscribers.length = 0;
}

function ErrorObject() {
  this.error = null;
}

var TRY_CATCH_ERROR = new ErrorObject();

function tryCatch(callback, detail) {
  try {
    return callback(detail);
  } catch (e) {
    TRY_CATCH_ERROR.error = e;
    return TRY_CATCH_ERROR;
  }
}

function invokeCallback(settled, promise, callback, detail) {
  var hasCallback = isFunction(callback),
      value = undefined,
      error = undefined,
      succeeded = undefined,
      failed = undefined;

  if (hasCallback) {
    value = tryCatch(callback, detail);

    if (value === TRY_CATCH_ERROR) {
      failed = true;
      error = value.error;
      value.error = null;
    } else {
      succeeded = true;
    }

    if (promise === value) {
      reject(promise, cannotReturnOwn());
      return;
    }
  } else {
    value = detail;
    succeeded = true;
  }

  if (promise._state !== PENDING) {
    // noop
  } else if (hasCallback && succeeded) {
      resolve(promise, value);
    } else if (failed) {
      reject(promise, error);
    } else if (settled === FULFILLED) {
      fulfill(promise, value);
    } else if (settled === REJECTED) {
      reject(promise, value);
    }
}

function initializePromise(promise, resolver) {
  try {
    resolver(function resolvePromise(value) {
      resolve(promise, value);
    }, function rejectPromise(reason) {
      reject(promise, reason);
    });
  } catch (e) {
    reject(promise, e);
  }
}

var id = 0;
function nextId() {
  return id++;
}

function makePromise(promise) {
  promise[PROMISE_ID] = id++;
  promise._state = undefined;
  promise._result = undefined;
  promise._subscribers = [];
}

function Enumerator$1(Constructor, input) {
  this._instanceConstructor = Constructor;
  this.promise = new Constructor(noop);

  if (!this.promise[PROMISE_ID]) {
    makePromise(this.promise);
  }

  if (isArray(input)) {
    this.length = input.length;
    this._remaining = input.length;

    this._result = new Array(this.length);

    if (this.length === 0) {
      fulfill(this.promise, this._result);
    } else {
      this.length = this.length || 0;
      this._enumerate(input);
      if (this._remaining === 0) {
        fulfill(this.promise, this._result);
      }
    }
  } else {
    reject(this.promise, validationError());
  }
}

function validationError() {
  return new Error('Array Methods must be provided an Array');
}

Enumerator$1.prototype._enumerate = function (input) {
  for (var i = 0; this._state === PENDING && i < input.length; i++) {
    this._eachEntry(input[i], i);
  }
};

Enumerator$1.prototype._eachEntry = function (entry, i) {
  var c = this._instanceConstructor;
  var resolve$$1 = c.resolve;

  if (resolve$$1 === resolve$1) {
    var _then = getThen(entry);

    if (_then === then && entry._state !== PENDING) {
      this._settledAt(entry._state, i, entry._result);
    } else if (typeof _then !== 'function') {
      this._remaining--;
      this._result[i] = entry;
    } else if (c === Promise$2) {
      var promise = new c(noop);
      handleMaybeThenable(promise, entry, _then);
      this._willSettleAt(promise, i);
    } else {
      this._willSettleAt(new c(function (resolve$$1) {
        return resolve$$1(entry);
      }), i);
    }
  } else {
    this._willSettleAt(resolve$$1(entry), i);
  }
};

Enumerator$1.prototype._settledAt = function (state, i, value) {
  var promise = this.promise;

  if (promise._state === PENDING) {
    this._remaining--;

    if (state === REJECTED) {
      reject(promise, value);
    } else {
      this._result[i] = value;
    }
  }

  if (this._remaining === 0) {
    fulfill(promise, this._result);
  }
};

Enumerator$1.prototype._willSettleAt = function (promise, i) {
  var enumerator = this;

  subscribe(promise, undefined, function (value) {
    return enumerator._settledAt(FULFILLED, i, value);
  }, function (reason) {
    return enumerator._settledAt(REJECTED, i, reason);
  });
};

/**
  `Promise.all` accepts an array of promises, and returns a new promise which
  is fulfilled with an array of fulfillment values for the passed promises, or
  rejected with the reason of the first passed promise to be rejected. It casts all
  elements of the passed iterable to promises as it runs this algorithm.

  Example:

  ```javascript
  let promise1 = resolve(1);
  let promise2 = resolve(2);
  let promise3 = resolve(3);
  let promises = [ promise1, promise2, promise3 ];

  Promise.all(promises).then(function(array){
    // The array here would be [ 1, 2, 3 ];
  });
  ```

  If any of the `promises` given to `all` are rejected, the first promise
  that is rejected will be given as an argument to the returned promises's
  rejection handler. For example:

  Example:

  ```javascript
  let promise1 = resolve(1);
  let promise2 = reject(new Error("2"));
  let promise3 = reject(new Error("3"));
  let promises = [ promise1, promise2, promise3 ];

  Promise.all(promises).then(function(array){
    // Code here never runs because there are rejected promises!
  }, function(error) {
    // error.message === "2"
  });
  ```

  @method all
  @static
  @param {Array} entries array of promises
  @param {String} label optional string for labeling the promise.
  Useful for tooling.
  @return {Promise} promise that is fulfilled when all `promises` have been
  fulfilled, or rejected if any of them become rejected.
  @static
*/
function all$1(entries) {
  return new Enumerator$1(this, entries).promise;
}

/**
  `Promise.race` returns a new promise which is settled in the same way as the
  first passed promise to settle.

  Example:

  ```javascript
  let promise1 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 1');
    }, 200);
  });

  let promise2 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 2');
    }, 100);
  });

  Promise.race([promise1, promise2]).then(function(result){
    // result === 'promise 2' because it was resolved before promise1
    // was resolved.
  });
  ```

  `Promise.race` is deterministic in that only the state of the first
  settled promise matters. For example, even if other promises given to the
  `promises` array argument are resolved, but the first settled promise has
  become rejected before the other promises became fulfilled, the returned
  promise will become rejected:

  ```javascript
  let promise1 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 1');
    }, 200);
  });

  let promise2 = new Promise(function(resolve, reject){
    setTimeout(function(){
      reject(new Error('promise 2'));
    }, 100);
  });

  Promise.race([promise1, promise2]).then(function(result){
    // Code here never runs
  }, function(reason){
    // reason.message === 'promise 2' because promise 2 became rejected before
    // promise 1 became fulfilled
  });
  ```

  An example real-world use case is implementing timeouts:

  ```javascript
  Promise.race([ajax('foo.json'), timeout(5000)])
  ```

  @method race
  @static
  @param {Array} promises array of promises to observe
  Useful for tooling.
  @return {Promise} a promise which settles in the same way as the first passed
  promise to settle.
*/
function race$1(entries) {
  /*jshint validthis:true */
  var Constructor = this;

  if (!isArray(entries)) {
    return new Constructor(function (_, reject) {
      return reject(new TypeError('You must pass an array to race.'));
    });
  } else {
    return new Constructor(function (resolve, reject) {
      var length = entries.length;
      for (var i = 0; i < length; i++) {
        Constructor.resolve(entries[i]).then(resolve, reject);
      }
    });
  }
}

/**
  `Promise.reject` returns a promise rejected with the passed `reason`.
  It is shorthand for the following:

  ```javascript
  let promise = new Promise(function(resolve, reject){
    reject(new Error('WHOOPS'));
  });

  promise.then(function(value){
    // Code here doesn't run because the promise is rejected!
  }, function(reason){
    // reason.message === 'WHOOPS'
  });
  ```

  Instead of writing the above, your code now simply becomes the following:

  ```javascript
  let promise = Promise.reject(new Error('WHOOPS'));

  promise.then(function(value){
    // Code here doesn't run because the promise is rejected!
  }, function(reason){
    // reason.message === 'WHOOPS'
  });
  ```

  @method reject
  @static
  @param {Any} reason value that the returned promise will be rejected with.
  Useful for tooling.
  @return {Promise} a promise rejected with the given `reason`.
*/
function reject$1(reason) {
  /*jshint validthis:true */
  var Constructor = this;
  var promise = new Constructor(noop);
  reject(promise, reason);
  return promise;
}

function needsResolver() {
  throw new TypeError('You must pass a resolver function as the first argument to the promise constructor');
}

function needsNew() {
  throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
}

/**
  Promise objects represent the eventual result of an asynchronous operation. The
  primary way of interacting with a promise is through its `then` method, which
  registers callbacks to receive either a promise's eventual value or the reason
  why the promise cannot be fulfilled.

  Terminology
  -----------

  - `promise` is an object or function with a `then` method whose behavior conforms to this specification.
  - `thenable` is an object or function that defines a `then` method.
  - `value` is any legal JavaScript value (including undefined, a thenable, or a promise).
  - `exception` is a value that is thrown using the throw statement.
  - `reason` is a value that indicates why a promise was rejected.
  - `settled` the final resting state of a promise, fulfilled or rejected.

  A promise can be in one of three states: pending, fulfilled, or rejected.

  Promises that are fulfilled have a fulfillment value and are in the fulfilled
  state.  Promises that are rejected have a rejection reason and are in the
  rejected state.  A fulfillment value is never a thenable.

  Promises can also be said to *resolve* a value.  If this value is also a
  promise, then the original promise's settled state will match the value's
  settled state.  So a promise that *resolves* a promise that rejects will
  itself reject, and a promise that *resolves* a promise that fulfills will
  itself fulfill.


  Basic Usage:
  ------------

  ```js
  let promise = new Promise(function(resolve, reject) {
    // on success
    resolve(value);

    // on failure
    reject(reason);
  });

  promise.then(function(value) {
    // on fulfillment
  }, function(reason) {
    // on rejection
  });
  ```

  Advanced Usage:
  ---------------

  Promises shine when abstracting away asynchronous interactions such as
  `XMLHttpRequest`s.

  ```js
  function getJSON(url) {
    return new Promise(function(resolve, reject){
      let xhr = new XMLHttpRequest();

      xhr.open('GET', url);
      xhr.onreadystatechange = handler;
      xhr.responseType = 'json';
      xhr.setRequestHeader('Accept', 'application/json');
      xhr.send();

      function handler() {
        if (this.readyState === this.DONE) {
          if (this.status === 200) {
            resolve(this.response);
          } else {
            reject(new Error('getJSON: `' + url + '` failed with status: [' + this.status + ']'));
          }
        }
      };
    });
  }

  getJSON('/posts.json').then(function(json) {
    // on fulfillment
  }, function(reason) {
    // on rejection
  });
  ```

  Unlike callbacks, promises are great composable primitives.

  ```js
  Promise.all([
    getJSON('/posts'),
    getJSON('/comments')
  ]).then(function(values){
    values[0] // => postsJSON
    values[1] // => commentsJSON

    return values;
  });
  ```

  @class Promise
  @param {function} resolver
  Useful for tooling.
  @constructor
*/
function Promise$2(resolver) {
  this[PROMISE_ID] = nextId();
  this._result = this._state = undefined;
  this._subscribers = [];

  if (noop !== resolver) {
    typeof resolver !== 'function' && needsResolver();
    this instanceof Promise$2 ? initializePromise(this, resolver) : needsNew();
  }
}

Promise$2.all = all$1;
Promise$2.race = race$1;
Promise$2.resolve = resolve$1;
Promise$2.reject = reject$1;
Promise$2._setScheduler = setScheduler;
Promise$2._setAsap = setAsap;
Promise$2._asap = asap;

Promise$2.prototype = {
  constructor: Promise$2,

  /**
    The primary way of interacting with a promise is through its `then` method,
    which registers callbacks to receive either a promise's eventual value or the
    reason why the promise cannot be fulfilled.
  
    ```js
    findUser().then(function(user){
      // user is available
    }, function(reason){
      // user is unavailable, and you are given the reason why
    });
    ```
  
    Chaining
    --------
  
    The return value of `then` is itself a promise.  This second, 'downstream'
    promise is resolved with the return value of the first promise's fulfillment
    or rejection handler, or rejected if the handler throws an exception.
  
    ```js
    findUser().then(function (user) {
      return user.name;
    }, function (reason) {
      return 'default name';
    }).then(function (userName) {
      // If `findUser` fulfilled, `userName` will be the user's name, otherwise it
      // will be `'default name'`
    });
  
    findUser().then(function (user) {
      throw new Error('Found user, but still unhappy');
    }, function (reason) {
      throw new Error('`findUser` rejected and we're unhappy');
    }).then(function (value) {
      // never reached
    }, function (reason) {
      // if `findUser` fulfilled, `reason` will be 'Found user, but still unhappy'.
      // If `findUser` rejected, `reason` will be '`findUser` rejected and we're unhappy'.
    });
    ```
    If the downstream promise does not specify a rejection handler, rejection reasons will be propagated further downstream.
  
    ```js
    findUser().then(function (user) {
      throw new PedagogicalException('Upstream error');
    }).then(function (value) {
      // never reached
    }).then(function (value) {
      // never reached
    }, function (reason) {
      // The `PedgagocialException` is propagated all the way down to here
    });
    ```
  
    Assimilation
    ------------
  
    Sometimes the value you want to propagate to a downstream promise can only be
    retrieved asynchronously. This can be achieved by returning a promise in the
    fulfillment or rejection handler. The downstream promise will then be pending
    until the returned promise is settled. This is called *assimilation*.
  
    ```js
    findUser().then(function (user) {
      return findCommentsByAuthor(user);
    }).then(function (comments) {
      // The user's comments are now available
    });
    ```
  
    If the assimliated promise rejects, then the downstream promise will also reject.
  
    ```js
    findUser().then(function (user) {
      return findCommentsByAuthor(user);
    }).then(function (comments) {
      // If `findCommentsByAuthor` fulfills, we'll have the value here
    }, function (reason) {
      // If `findCommentsByAuthor` rejects, we'll have the reason here
    });
    ```
  
    Simple Example
    --------------
  
    Synchronous Example
  
    ```javascript
    let result;
  
    try {
      result = findResult();
      // success
    } catch(reason) {
      // failure
    }
    ```
  
    Errback Example
  
    ```js
    findResult(function(result, err){
      if (err) {
        // failure
      } else {
        // success
      }
    });
    ```
  
    Promise Example;
  
    ```javascript
    findResult().then(function(result){
      // success
    }, function(reason){
      // failure
    });
    ```
  
    Advanced Example
    --------------
  
    Synchronous Example
  
    ```javascript
    let author, books;
  
    try {
      author = findAuthor();
      books  = findBooksByAuthor(author);
      // success
    } catch(reason) {
      // failure
    }
    ```
  
    Errback Example
  
    ```js
  
    function foundBooks(books) {
  
    }
  
    function failure(reason) {
  
    }
  
    findAuthor(function(author, err){
      if (err) {
        failure(err);
        // failure
      } else {
        try {
          findBoooksByAuthor(author, function(books, err) {
            if (err) {
              failure(err);
            } else {
              try {
                foundBooks(books);
              } catch(reason) {
                failure(reason);
              }
            }
          });
        } catch(error) {
          failure(err);
        }
        // success
      }
    });
    ```
  
    Promise Example;
  
    ```javascript
    findAuthor().
      then(findBooksByAuthor).
      then(function(books){
        // found books
    }).catch(function(reason){
      // something went wrong
    });
    ```
  
    @method then
    @param {Function} onFulfilled
    @param {Function} onRejected
    Useful for tooling.
    @return {Promise}
  */
  then: then,

  /**
    `catch` is simply sugar for `then(undefined, onRejection)` which makes it the same
    as the catch block of a try/catch statement.
  
    ```js
    function findAuthor(){
      throw new Error('couldn't find that author');
    }
  
    // synchronous
    try {
      findAuthor();
    } catch(reason) {
      // something went wrong
    }
  
    // async with promises
    findAuthor().catch(function(reason){
      // something went wrong
    });
    ```
  
    @method catch
    @param {Function} onRejection
    Useful for tooling.
    @return {Promise}
  */
  'catch': function _catch(onRejection) {
    return this.then(null, onRejection);
  }
};

/*global self*/
function polyfill$1() {
    var local = undefined;

    if (typeof global !== 'undefined') {
        local = global;
    } else if (typeof self !== 'undefined') {
        local = self;
    } else {
        try {
            local = Function('return this')();
        } catch (e) {
            throw new Error('polyfill failed because global object is unavailable in this environment');
        }
    }

    var P = local.Promise;

    if (P) {
        var promiseToString = null;
        try {
            promiseToString = Object.prototype.toString.call(P.resolve());
        } catch (e) {
            // silently ignored
        }

        if (promiseToString === '[object Promise]' && !P.cast) {
            return;
        }
    }

    local.Promise = Promise$2;
}

// Strange compat..
Promise$2.polyfill = polyfill$1;
Promise$2.Promise = Promise$2;

return Promise$2;

})));

//# sourceMappingURL=es6-promise.map

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(16), __webpack_require__(1)))

/***/ }),
/* 16 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = __webpack_require__(20);


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var encode = __webpack_require__(5);
var alphabet = __webpack_require__(2);

// Ignore all milliseconds before a certain time to reduce the size of the date entropy without sacrificing uniqueness.
// This number should be updated every year or so to keep the generated id short.
// To regenerate `new Date() - 0` and bump the version. Always bump the version!
var REDUCE_TIME = 1459707606518;

// don't change unless we change the algos or REDUCE_TIME
// must be an integer and less than 16
var version = 6;

// Counter is used when shortid is called multiple times in one second.
var counter;

// Remember the last time shortid was called in case counter is needed.
var previousSeconds;

/**
 * Generate unique id
 * Returns string id
 */
function build(clusterWorkerId) {

    var str = '';

    var seconds = Math.floor((Date.now() - REDUCE_TIME) * 0.001);

    if (seconds === previousSeconds) {
        counter++;
    } else {
        counter = 0;
        previousSeconds = seconds;
    }

    str = str + encode(alphabet.lookup, version);
    str = str + encode(alphabet.lookup, clusterWorkerId);
    if (counter > 0) {
        str = str + encode(alphabet.lookup, counter);
    }
    str = str + encode(alphabet.lookup, seconds);

    return str;
}

module.exports = build;


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var alphabet = __webpack_require__(2);

/**
 * Decode the id to get the version and worker
 * Mainly for debugging and testing.
 * @param id - the shortid-generated id.
 */
function decode(id) {
    var characters = alphabet.shuffled();
    return {
        version: characters.indexOf(id.substr(0, 1)) & 0x0f,
        worker: characters.indexOf(id.substr(1, 1)) & 0x0f
    };
}

module.exports = decode;


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var alphabet = __webpack_require__(2);
var encode = __webpack_require__(5);
var decode = __webpack_require__(19);
var build = __webpack_require__(18);
var isValid = __webpack_require__(21);

// if you are using cluster or multiple servers use this to make each instance
// has a unique value for worker
// Note: I don't know if this is automatically set when using third
// party cluster solutions such as pm2.
var clusterWorkerId = __webpack_require__(24) || 0;

/**
 * Set the seed.
 * Highly recommended if you don't want people to try to figure out your id schema.
 * exposed as shortid.seed(int)
 * @param seed Integer value to seed the random alphabet.  ALWAYS USE THE SAME SEED or you might get overlaps.
 */
function seed(seedValue) {
    alphabet.seed(seedValue);
    return module.exports;
}

/**
 * Set the cluster worker or machine id
 * exposed as shortid.worker(int)
 * @param workerId worker must be positive integer.  Number less than 16 is recommended.
 * returns shortid module so it can be chained.
 */
function worker(workerId) {
    clusterWorkerId = workerId;
    return module.exports;
}

/**
 *
 * sets new characters to use in the alphabet
 * returns the shuffled alphabet
 */
function characters(newCharacters) {
    if (newCharacters !== undefined) {
        alphabet.characters(newCharacters);
    }

    return alphabet.shuffled();
}

/**
 * Generate unique id
 * Returns string id
 */
function generate() {
  return build(clusterWorkerId);
}

// Export all other functions as properties of the generate function
module.exports = generate;
module.exports.generate = generate;
module.exports.seed = seed;
module.exports.worker = worker;
module.exports.characters = characters;
module.exports.decode = decode;
module.exports.isValid = isValid;


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var alphabet = __webpack_require__(2);

function isShortId(id) {
    if (!id || typeof id !== 'string' || id.length < 6 ) {
        return false;
    }

    var characters = alphabet.characters();
    var len = id.length;
    for(var i = 0; i < len;i++) {
        if (characters.indexOf(id[i]) === -1) {
            return false;
        }
    }
    return true;
}

module.exports = isShortId;


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var crypto = typeof window === 'object' && (window.crypto || window.msCrypto); // IE 11 uses window.msCrypto

function randomByte() {
    if (!crypto || !crypto.getRandomValues) {
        return Math.floor(Math.random() * 256) & 0x30;
    }
    var dest = new Uint8Array(1);
    crypto.getRandomValues(dest);
    return dest[0] & 0x30;
}

module.exports = randomByte;


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// Found this seed-based random generator somewhere
// Based on The Central Randomizer 1.3 (C) 1997 by Paul Houle (houle@msc.cornell.edu)

var seed = 1;

/**
 * return a random number based on a seed
 * @param seed
 * @returns {number}
 */
function getNextValue() {
    seed = (seed * 9301 + 49297) % 233280;
    return seed/(233280.0);
}

function setSeed(_seed_) {
    seed = _seed_;
}

module.exports = {
    nextValue: getNextValue,
    seed: setSeed
};


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = 0;


/***/ }),
/* 25 */
/***/ (function(module, exports) {


/**
 * Module dependencies.
 */

var global = (function() { return this; })();

/**
 * WebSocket constructor.
 */

var WebSocket = global.WebSocket || global.MozWebSocket;

/**
 * Module exports.
 */

module.exports = WebSocket ? ws : null;

/**
 * WebSocket constructor.
 *
 * The third `opts` options object gets ignored in web browsers, since it's
 * non-standard, and throws a TypeError if passed to the constructor.
 * See: https://github.com/einaros/ws/issues/227
 *
 * @param {String} uri
 * @param {Array} protocols (optional)
 * @param {Object) opts (optional)
 * @api public
 */

function ws(uri, protocols, opts) {
  var instance;
  if (protocols) {
    instance = new WebSocket(uri, protocols);
  } else {
    instance = new WebSocket(uri);
  }
  return instance;
}

if (WebSocket) ws.prototype = WebSocket.prototype;


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {
Object.defineProperty(exports, "__esModule", { value: true });
var connection_1 = __webpack_require__(4);
var gw3_1 = __webpack_require__(9);
var hc_1 = __webpack_require__(10);
var ws_1 = __webpack_require__(14);
var gw3Connection_1 = __webpack_require__(6);
var gw1_1 = __webpack_require__(7);
var hc_2 = __webpack_require__(11);
var gw2_1 = __webpack_require__(8);
var inproc_1 = __webpack_require__(13);
var http_1 = __webpack_require__(12);
var PackageJson = __webpack_require__(3);
/**
 * Check readme.md for detailed description
 */
exports.default = function (settings) {
    settings = settings || {};
    settings.reconnectAttempts = settings.reconnectAttempts || 10;
    settings.reconnectInterval = settings.reconnectInterval || 500;
    settings.version = PackageJson.version;
    var connection = new connection_1.default(settings);
    var logger = settings.logger;
    if (!logger) {
        throw new Error("please pass a logger object");
    }
    // by default use gw1 protocol and hc transport
    var protocol = new hc_1.default();
    var transport = new hc_2.default();
    if (global.htmlContainer === undefined) {
        if (settings.gw && settings.gw.facade && settings.gw.token && settings.protocolVersion === 3) {
            transport = new inproc_1.default(settings.gw.token, settings.gw.facade, logger.subLogger("inproc"));
        }
        else if (settings.ws !== undefined) {
            transport = new ws_1.default(settings, logger.subLogger("ws"));
        }
        else if (settings.http !== undefined) {
            transport = new http_1.default(settings, logger.subLogger("http"));
        }
        else {
            throw new Error("No connection information specified");
        }
        // if running in the browser - let's check which protocol version user wants
        if (settings.protocolVersion === 3) {
            var gw3Connection = new gw3Connection_1.default(settings);
            var gw3Port = gw3_1.default(gw3Connection, settings, logger.subLogger("gw3"));
            gw3Connection.init(transport, gw3Port);
            return gw3Connection.toAPI();
        }
        else if (settings.protocolVersion === 2) {
            protocol = new gw2_1.default(connection);
        }
        else {
            protocol = new gw1_1.default();
        }
    }
    connection.init(transport, protocol);
    return connection.toAPI();
};
//# sourceMappingURL=main.js.map
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var callbackRegistry = __webpack_require__(0);
var shortid_1 = __webpack_require__(17);
/**
 * Handles domain session lifetime and events for a given connection/domain pair
 */
function default_1(domain, connection, logger, successMessages, errorMessages) {
    if (domain == null) {
        domain = "global";
    }
    var isJoined = false;
    var tryReconnecting = false;
    /** holds latest options passed to join - used when doing reconnects */
    var _latestOptions;
    // #deleteme TODO: verify this gets properly set to true
    var _connectionOn = false;
    var callbacks = callbackRegistry();
    // attach event handlers to connection
    connection.disconnected(handleConnectionDisconnected);
    connection.loggedIn(handleConnectionLoggedIn);
    connection.on(domain, "success", function (msg) { return handleSuccessMessage(msg); });
    connection.on(domain, "error", function (msg) { return handleErrorMessage(msg); });
    connection.on(domain, "result", function (msg) { return handleSuccessMessage(msg); });
    if (successMessages) {
        successMessages.forEach(function (sm) {
            connection.on(domain, sm, function (msg) { return handleSuccessMessage(msg); });
        });
    }
    if (errorMessages) {
        errorMessages.forEach(function (sm) {
            connection.on(domain, sm, function (msg) { return handleErrorMessage(msg); });
        });
    }
    var requestsMap = {};
    function join(options) {
        _latestOptions = options;
        return new Promise(function (resolve, reject) {
            if (isJoined) {
                resolve();
            }
            var joinPromise;
            if (domain === "global") {
                joinPromise = _connectionOn ? Promise.resolve() : Promise.reject("not connected to gateway");
            }
            else {
                logger.debug("joining " + domain);
                var joinMsg = {
                    type: "join",
                    destination: domain,
                    domain: "global",
                    options: options,
                };
                // #deleteme TODO: what happens if multiple clients try to open the same domain?
                // e.g. contexts
                joinPromise = send(joinMsg);
            }
            joinPromise
                .then(function () {
                handleJoined();
                resolve();
            })
                .catch(function (err) {
                logger.debug("error joining " + domain + " domain: " + JSON.stringify(err));
                reject(err);
            });
        });
    }
    // terminology: join vs leave (domain), connect vs login vs disconnect (to/from GW)
    function leave() {
        if (domain === "global") {
            return;
        }
        logger.debug("stopping session " + domain + "...");
        var leaveMsg = {
            type: "leave",
            destination: domain,
            domain: "global",
        };
        // #deleteme - handling
        send(leaveMsg).then(function () {
            isJoined = false;
            callbacks.execute("onLeft");
        });
    }
    function handleJoined() {
        logger.debug("joined " + domain);
        isJoined = true;
        var wasReconnect = tryReconnecting;
        tryReconnecting = false;
        callbacks.execute("onJoined", wasReconnect);
    }
    function handleConnectionDisconnected() {
        _connectionOn = false;
        logger.warn("connection is down");
        isJoined = false;
        tryReconnecting = true;
        callbacks.execute("onLeft", { disconnected: true });
    }
    function handleConnectionLoggedIn() {
        _connectionOn = true;
        if (tryReconnecting) {
            logger.info("connection is now up - trying to reconnect...");
            join(_latestOptions);
        }
    }
    function onJoined(callback) {
        if (isJoined) {
            callback(false);
        }
        return callbacks.add("onJoined", callback);
    }
    function onLeft(callback) {
        if (!isJoined) {
            callback();
        }
        return callbacks.add("onLeft", callback);
    }
    function handleErrorMessage(msg) {
        if (domain !== msg.domain) {
            return;
        }
        var requestId = msg.request_id;
        var entry = requestsMap[requestId];
        if (!entry) {
            return;
        }
        entry.error(msg);
    }
    function handleSuccessMessage(msg) {
        if (msg.domain !== domain) {
            return;
        }
        var requestId = msg.request_id;
        var entry = requestsMap[requestId];
        if (!entry) {
            return;
        }
        entry.success(msg);
    }
    function getNextRequestId() {
        return shortid_1.generate();
    }
    /**
     * Send a message
     * @param msg message to send
     * @param tag a custom object (tag) - it will be transferred to success/error callback
     * @param success
     * @param error
     */
    function send(msg, tag, options) {
        options = options || {};
        // Allows function caller to override request_id
        msg.request_id = msg.request_id || getNextRequestId();
        // Allows function caller to override domain (join/leave messages are in global domain)
        msg.domain = msg.domain || domain;
        if (!options.skipPeerId) {
            msg.peer_id = connection.peerId;
        }
        var requestId = msg.request_id;
        return new Promise(function (resolve, reject) {
            requestsMap[requestId] = {
                success: function (successMsg) {
                    delete requestsMap[requestId];
                    successMsg._tag = tag;
                    resolve(successMsg);
                },
                error: function (errorMsg) {
                    logger.warn("GW error - " + JSON.stringify(errorMsg) + " for request " + JSON.stringify(msg));
                    delete requestsMap[requestId];
                    errorMsg._tag = tag;
                    reject(errorMsg);
                },
            };
            connection
                .send(domain, domain, msg, undefined, options)
                .catch(function (err) {
                requestsMap[requestId].error({ err: err });
            });
        });
    }
    function sendFireAndForget(msg) {
        // Allows function caller to override request_id
        msg.request_id = msg.request_id ? msg.request_id : getNextRequestId();
        // Allows function caller to override domain (join/leave messages are in global domain)
        msg.domain = msg.domain || domain;
        msg.peer_id = connection.peerId;
        connection.send(domain, domain, msg);
    }
    return {
        join: join,
        leave: leave,
        onJoined: onJoined,
        onLeft: onLeft,
        send: send,
        sendFireAndForget: sendFireAndForget,
        on: function (type, callback) {
            connection.on(domain, type, callback);
        },
        loggedIn: function (callback) { return connection.loggedIn(callback); },
        connected: function (callback) { return connection.connected(callback); },
        disconnected: function (callback) { return connection.disconnected(callback); },
        get peerId() {
            return connection.peerId;
        },
        get domain() {
            return domain;
        },
    };
}
exports.default = default_1;
//# sourceMappingURL=gw3Domain.js.map

/***/ }),
/* 28 */
/***/ (function(module, exports) {

/* (ignored) */

/***/ })
/******/ ]);
});
//# sourceMappingURL=tick42-gateway-connection.js.map

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

(function webpackUniversalModuleDefinition(root, factory) {
	if(true)
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("tick42-logger", [], factory);
	else if(typeof exports === 'object')
		exports["tick42-logger"] = factory();
	else
		root["tick42-logger"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", { value: true });
var levels_1 = __webpack_require__(2);
var LoggerImpl = function () {
    function LoggerImpl(name, parent, metricSystem) {
        this._subloggers = [];
        this._name = name;
        this._parent = parent;
        if (parent) {
            this._path = parent.path + "." + name;
        } else {
            this._path = name;
        }
        this._loggerFullName = "[" + this._path + "]";
        // create metric system
        if (typeof metricSystem !== "undefined") {
            this.metricsLevel("warn", metricSystem.subSystem(name));
        }
    }
    Object.defineProperty(LoggerImpl.prototype, "name", {
        get: function get() {
            return this._name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LoggerImpl.prototype, "path", {
        get: function get() {
            return this._path;
        },
        enumerable: true,
        configurable: true
    });
    LoggerImpl.prototype.subLogger = function (name) {
        // Check if the sublogger is already created
        var existingSub = this._subloggers.filter(function (subLogger) {
            return subLogger.name === name;
        })[0];
        if (existingSub !== undefined) {
            return existingSub;
        }
        // Check if the name isn't the same as one of the parent properties
        Object.keys(this).forEach(function (key) {
            if (key === name) {
                throw new Error("This sub logger name is not allowed.");
            }
        });
        var sub = new LoggerImpl(name, this);
        // add sublogger to subloggers array
        this._subloggers.push(sub);
        return sub;
    };
    LoggerImpl.prototype.publishLevel = function (level) {
        if (level !== null && level !== undefined) {
            this._publishLevel = level;
        }
        return this._publishLevel || this._parent.publishLevel();
    };
    LoggerImpl.prototype.consoleLevel = function (level) {
        if (level !== null && level !== undefined) {
            this._consoleLevel = level;
        }
        return this._consoleLevel || this._parent.consoleLevel();
    };
    LoggerImpl.prototype.metricsLevel = function (level, metricsSystem) {
        if (level !== null && level !== undefined) {
            this._metricLevel = level;
        }
        if (metricsSystem !== undefined) {
            if ((typeof metricsSystem === "undefined" ? "undefined" : _typeof(metricsSystem)) === "object" && typeof metricsSystem.objectMetric === "function") {
                this._metricSystem = metricsSystem;
            } else {
                throw new Error("Please specify metric system");
            }
        }
        return this._metricLevel || this._parent.metricsLevel();
    };
    LoggerImpl.prototype.log = function (message, level) {
        this.publishMessage(level || levels_1.default.info, message);
    };
    LoggerImpl.prototype.trace = function (message) {
        this.log(message, levels_1.default.trace);
    };
    LoggerImpl.prototype.debug = function (message) {
        this.log(message, levels_1.default.debug);
    };
    LoggerImpl.prototype.info = function (message) {
        this.log(message, levels_1.default.info);
    };
    LoggerImpl.prototype.warn = function (message) {
        this.log(message, levels_1.default.warn);
    };
    LoggerImpl.prototype.error = function (message) {
        this.log(message, levels_1.default.error);
    };
    LoggerImpl.prototype.toAPIObject = function () {
        var that = this;
        return {
            name: this.name,
            subLogger: this.subLogger.bind(that),
            publishLevel: this.publishLevel.bind(that),
            consoleLevel: this.consoleLevel.bind(that),
            metricsLevel: this.metricsLevel.bind(that),
            log: this.log.bind(that),
            trace: this.trace.bind(that),
            debug: this.debug.bind(that),
            info: this.info.bind(that),
            warn: this.warn.bind(that),
            error: this.error.bind(that)
        };
    };
    LoggerImpl.prototype.publishMessage = function (level, message) {
        // Retrieve logger name and levels
        var loggerName = this._loggerFullName;
        // Add stack trace if the message is an error
        if (level === levels_1.default.error) {
            var e = new Error();
            if (e.stack) {
                message = message + "\n" + e.stack.split("\n").slice(3).join("\n");
            }
        }
        // Publish in console
        if (levels_1.default.canPublish(level, this.consoleLevel())) {
            var toPrint = loggerName + ": " + message;
            switch (level) {
                case levels_1.default.trace:
                    console.trace(toPrint);
                    break;
                case levels_1.default.debug:
                    if (console.debug) {
                        console.debug(toPrint);
                    } else {
                        console.log(toPrint);
                    }
                    break;
                case levels_1.default.info:
                    console.info(toPrint);
                    break;
                case levels_1.default.warn:
                    console.warn(toPrint);
                    break;
                case levels_1.default.error:
                    console.error(toPrint);
                    break;
            }
        }
        // Publish in file
        if (levels_1.default.canPublish(level, this.publishLevel())) {
            LoggerImpl.GetConnection().send("log", "LogMessage", {
                instance: LoggerImpl.Instance,
                level: levels_1.default.order.indexOf(level),
                logger: loggerName,
                message: message
            });
        }
        // Publish in metrics
        if (levels_1.default.canPublish(level, this.metricsLevel())) {
            if (this._metricSystem !== undefined) {
                this._metricSystem.objectMetric("LogMessage", {
                    Level: level,
                    Logger: loggerName,
                    Message: message,
                    Time: new Date()
                });
                if (level === levels_1.default.error) {
                    this._metricSystem.setState(100, message);
                }
            }
        }
    };
    return LoggerImpl;
}();
exports.default = LoggerImpl;
//# sourceMappingURL=logger.js.map

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = {"name":"tick42-logger","version":"3.0.14","docName":"Logger","description":"Glue library for logging","main":"dist/node/tick42-logger.js","browser":"dist/web/tick42-logger.js","types":"./types/index.d.ts","scripts":{"clean":"node ./build/scripts/clean.js","pre:build":"npm run tslint && tsc && set NODE_ENV=development && npm run clean","file-versionify":"node ./build/scripts/file-versionify.js","tslint":"tslint -t codeFrame ./src/**/*.ts","tslint:fix":"tslint -t codeFrame --fix ./src/**/*.ts","watch":"onchange ./src/**/*.ts -- npm run build:dev","build:dev":"npm run pre:build && set NODE_ENV=development && webpack && npm run file-versionify && npm run types","build:prod":"npm run pre:build && set NODE_ENV=development && webpack && set NODE_ENV=production && webpack && npm run file-versionify && npm run types","docs":"typedoc --options typedoc.json ./src","types":"node ./build/scripts/copy-types.js","prepublish":"npm run build:prod","types:merged":"dts-generator --project ./ --out ./types/index.d.ts"},"repository":{"type":"git","url":"https://stash.tick42.com:8443/scm/ofgw/js-logger.git"},"author":"Tick42","license":"ISC","precommit":"tslint:fix","devDependencies":{"@types/node":"^8.0.47","@types/tick42-gateway-connection":"^2.2.3","@types/tick42-logger":"^3.0.6","babel-core":"^6.17.0","babel-loader":"^6.4.1","babel-plugin-add-module-exports":"^0.2.1","babel-plugin-es6-promise":"^1.0.0","babel-preset-es2015":"^6.16.0","babel-preset-stage-2":"^6.22.0","dts-generator":"^2.1.0","es6-promise":"^4.1.0","onchange":"3.*","pre-commit":"^1.1.3","shelljs":"^0.6.0","tick42-metrics":"^2.4.1","tick42-webpack-config":"4.1.1","tslint":"^5.4.3","typedoc":"^0.5.10","typescript":"2.3.0","webpack":"2.3.3"}}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var LogLevel = function () {
    function LogLevel() {}
    LogLevel.canPublish = function (level, restriction) {
        var levelIdx = LogLevel.order.indexOf(level);
        var restrictionIdx = LogLevel.order.indexOf(restriction);
        return levelIdx >= restrictionIdx;
    };
    return LogLevel;
}();
LogLevel.off = "off";
LogLevel.trace = "trace";
LogLevel.debug = "debug";
LogLevel.info = "info";
LogLevel.warn = "warn";
LogLevel.error = "error";
LogLevel.order = [LogLevel.trace, LogLevel.debug, LogLevel.info, LogLevel.warn, LogLevel.error, LogLevel.off];
exports.default = LogLevel;
//# sourceMappingURL=levels.js.map

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var logger_1 = __webpack_require__(0);
var PackageJson = __webpack_require__(1);
exports.default = function (settings) {
    // Convert instance to string, throw exceptions if it is not full
    var identity = settings.identity;
    if (!identity) {
        throw new Error("identity is missing");
    }
    var identityStr = identity.system + "\\" + identity.service + "\\" + identity.instance;
    logger_1.default.Instance = identityStr;
    logger_1.default.GetConnection = settings.getConnection;
    var mainLogger = new logger_1.default("main");
    mainLogger.publishLevel(settings.publish || "off");
    mainLogger.consoleLevel(settings.console || "info");
    mainLogger.metricsLevel(settings.metrics || "off");
    var apiLogger = mainLogger.toAPIObject();
    apiLogger.version = PackageJson.version;
    return apiLogger;
};
//# sourceMappingURL=main.js.map

/***/ })
/******/ ]);
});
//# sourceMappingURL=tick42-logger.js.map

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

(function webpackUniversalModuleDefinition(root, factory) {
	if(true)
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("tick42-metrics", [], factory);
	else if(typeof exports === 'object')
		exports["tick42-metrics"] = factory();
	else
		root["tick42-metrics"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 20);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    DEFAULT: 0,
    STRING: 1,
    NUMBER: 2,
    COUNT: 3,
    RATE: 4,
    STATISTICS: 6,
    TIMESTAMP: 7,
    ADDRESS: 8,
    TIMESPAN: 10,
    OBJECT: 11
};
//# sourceMappingURL=metric-types.js.map

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    validate: function (definition, parent, transport) {
        // TODO: Add validation for parent, transport, system
        if (definition === null || typeof definition !== "object") {
            throw new Error("Missing definition");
        }
        if (parent === null || typeof parent !== "object") {
            throw new Error("Missing parent");
        }
        if (transport === null || typeof transport !== "object") {
            throw new Error("Missing transport");
        }
    },
};
//# sourceMappingURL=helpers.js.map

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = {"name":"tick42-metrics","version":"2.4.3","description":"Metrics","main":"dist/node/tick42-metrics.js","browser":"dist/web/tick42-metrics.js","types":"types/index.d.ts","docName":"Metrics","scripts":{"clean":"node ./build/scripts/clean.js","pre:build":"npm run tslint && tsc && set NODE_ENV=development && npm run clean","file-versionify":"node ./build/scripts/file-versionify.js","tslint":"tslint -t codeFrame ./src/**/*.ts","tslint:fix":"tslint -t codeFrame --fix ./src/**/*.ts","watch":"onchange ./src/**/*.ts -- npm run build:dev","build:dev":"npm run pre:build && set NODE_ENV=development && webpack && npm run file-versionify && npm run types","build:prod":"npm run pre:build && set NODE_ENV=development && webpack && set NODE_ENV=production && webpack && npm run file-versionify && npm run types","docs":"typedoc --options typedoc.json ./src","types":"node ./build/scripts/copy-types.js","prepublish":"npm run build:prod","types:merged":"dts-generator --project ./ --out ./types/index.d.ts"},"author":"Tick42","license":"ISC","precommit":"tslint:fix","devDependencies":{"@types/tick42-gateway-connection":"*","@types/tick42-logger":"^3.0.6","babel-core":"^6.17.0","babel-loader":"^6.4.1","babel-plugin-add-module-exports":"^0.2.1","babel-plugin-es6-promise":"^1.0.0","babel-preset-es2015":"^6.16.0","babel-preset-stage-2":"^6.22.0","dts-generator":"^2.1.0","es6-promise":"^4.1.0","onchange":"3.*","pre-commit":"^1.1.3","shelljs":"^0.6.0","tick42-webpack-config":"*","tslint":"5.*","typedoc":"^0.5.10","typescript":"2.3.0","webpack":"2.3.3"}}

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var serializer_1 = __webpack_require__(18);
function default_1(connection, config) {
    var DEFAULT_HEARTBEAT_INTERVAL = 3000;
    if (!connection || typeof connection !== "object") {
        throw new Error("Connection is required parameter");
    }
    var _connection = connection;
    var heartbeatInterval = config.heartbeatInterval || DEFAULT_HEARTBEAT_INTERVAL;
    var send = function (type, message) {
        _connection.send("metrics", type, message);
    };
    function sendFull(repo) {
        if (!repo.root) {
            return;
        }
        if (repo.root.subSystems.length === 0) {
            return;
        }
        sendFullSystem(repo.root);
    }
    function sendFullSystem(system) {
        createSystem(system);
        system.subSystems.forEach(function (sub) {
            sendFullSystem(sub);
        });
        system.metrics.forEach(function (metric) {
            createMetric(metric);
        });
    }
    function heartbeat(repo) {
        send("HeartbeatMetrics", {
            publishingInterval: heartbeatInterval,
            instance: repo.instance,
        });
    }
    function createSystem(system) {
        if (system.parent !== undefined) {
            send("CreateMetricSystem", {
                id: system.id,
                instance: system.repo.instance,
                definition: {
                    name: system.name,
                    description: system.description,
                    path: system.path,
                },
            });
        }
    }
    function updateSystem(system, state) {
        send("UpdateMetricSystem", {
            id: system.id,
            instance: system.repo.instance,
            state: state,
        });
    }
    function createMetric(metric) {
        send("CreateMetric", serializer_1.default(metric));
    }
    function updateMetric(metric) {
        send("UpdateMetric", serializer_1.default(metric));
    }
    function init(repo) {
        heartbeat(repo);
        _connection.on("metrics", "MetricsSnapshotRequest", function (instanceInfo) {
            if (instanceInfo.Instance !== repo.instance) {
                return;
            }
            sendFull(repo);
        });
        setInterval(function () {
            heartbeat(repo);
        }, heartbeatInterval);
    }
    var me = {
        createSystem: createSystem,
        updateSystem: updateSystem,
        createMetric: createMetric,
        updateMetric: updateMetric,
        init: init,
    };
    return me;
}
exports.default = default_1;
//# sourceMappingURL=gw1.js.map

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var es6_promise_1 = __webpack_require__(6);
var serializer_1 = __webpack_require__(19);
function default_1(connection, config) {
    if (!connection || typeof connection !== "object") {
        throw new Error("Connection is required parameter");
    }
    var joinPromise;
    var session;
    var init = function (repo) {
        var resolveReadyPromise;
        joinPromise = new es6_promise_1.Promise(function (resolve) {
            resolveReadyPromise = resolve;
        });
        session = connection.domain("metrics", config.logger);
        session.onJoined(function (reconnect) {
            if (!reconnect) {
                resolveReadyPromise();
                resolveReadyPromise = undefined;
            }
            // Creating root state metric
            var rootStateMetric = {
                name: "/State",
                type: "object",
                composite: {
                    Description: {
                        type: "string",
                        description: "",
                    },
                    Value: {
                        type: "number",
                        description: "",
                    },
                },
                description: "System state",
                context: {},
            };
            var defineRootMetricsMsg = {
                type: "define",
                metrics: [rootStateMetric],
            };
            session.send(defineRootMetricsMsg);
            if (reconnect) {
                replayRepo(repo);
            }
        });
        session.join(config.identity);
    };
    var replayRepo = function (repo) {
        replaySystem(repo.root);
    };
    var replaySystem = function (system) {
        // replay system
        createSystem(system);
        // replay all metrics in the system
        system.metrics.forEach(function (m) {
            createMetric(m);
        });
        // replay all sub-systems
        system.subSystems.forEach(function (ss) {
            replaySystem(ss);
        });
    };
    var createSystem = function (system) {
        if (system.parent === undefined) {
            return;
        }
        joinPromise.then(function () {
            var metric = {
                name: serializer_1.normalizeMetricName(system.path.join("/") + "/" + system.name + "/State"),
                type: "object",
                composite: {
                    Description: {
                        type: "string",
                        description: "",
                    },
                    Value: {
                        type: "number",
                        description: "",
                    },
                },
                description: "System state",
                context: {},
            };
            var createMetricsMsg = {
                type: "define",
                metrics: [metric],
            };
            session.send(createMetricsMsg);
        });
    };
    var updateSystem = function (system, state) {
        joinPromise.then(function () {
            var shadowedUpdateMetric = {
                type: "publish",
                values: [{
                        name: serializer_1.normalizeMetricName(system.path.join("/") + "/" + system.name + "/State"),
                        value: {
                            Description: state.description,
                            Value: state.state,
                        },
                        timestamp: Date.now(),
                    }],
            };
            session.send(shadowedUpdateMetric);
            var stateObj = serializer_1.composeMsgForRootStateMetric(system);
            var rootMetric = {
                type: "publish",
                peer_id: connection.peerId,
                values: [{
                        name: "/State",
                        value: {
                            Description: stateObj.description,
                            Value: stateObj.value,
                        },
                        timestamp: Date.now(),
                    }],
            };
            session.send(rootMetric);
        });
    };
    var createMetric = function (metric) {
        joinPromise.then(function () {
            var m = serializer_1.serializeMetric(metric);
            var createMetricsMsg = {
                type: "define",
                metrics: [m],
            };
            session.send(createMetricsMsg);
            if (typeof metric.value !== "undefined") {
                updateMetric(metric);
            }
        });
    };
    var updateMetric = function (metric) {
        joinPromise.then(function () {
            var value = serializer_1.getMetricValueByType(metric);
            var publishMetricsMsg = {
                type: "publish",
                values: [{
                        name: serializer_1.normalizeMetricName(metric.path.join("/") + "/" + metric.name),
                        value: value,
                        timestamp: Date.now(),
                    }],
            };
            session.send(publishMetricsMsg);
        });
    };
    return {
        init: init,
        createSystem: createSystem,
        updateSystem: updateSystem,
        createMetric: createMetric,
        updateMetric: updateMetric,
    };
}
exports.default = default_1;
//# sourceMappingURL=gw3.js.map

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var system_1 = __webpack_require__(21);
var PackageJson = __webpack_require__(2);
function repository(options, protocol) {
    if (!options.identity) {
        throw new Error("Identity missing from metrics configuration");
    }
    if (!options.identity.service || typeof options.identity.service !== "string") {
        throw new Error("Service missing or invalid in metrics identity configuration");
    }
    if (!options.identity.system || typeof options.identity.system !== "string") {
        throw new Error("System missing or invalid in metrics identity configuration");
    }
    if (!options.identity.instance || typeof options.identity.instance !== "string") {
        throw new Error("Instance missing or invalid in metrics identity configuration");
    }
    var identity = options.identity;
    var instance = options.identity.system + "/" + options.identity.service + "/" + options.identity.instance;
    var version = PackageJson.version;
    function _initSystemMetrics(rootSystem, useClickStream) {
        // Create some system metrics
        if (typeof navigator !== "undefined") {
            rootSystem.stringMetric("UserAgent", navigator.userAgent);
        }
        if (useClickStream && typeof document !== "undefined") {
            var clickStream_1 = rootSystem.subSystem("ClickStream");
            var documentClickHandler = function (e) {
                if (!e.target) {
                    return;
                }
                var target = e.target;
                clickStream_1.objectMetric("LastBrowserEvent", {
                    type: "click",
                    timestamp: new Date(),
                    target: {
                        className: e.target ? target.className : "",
                        id: target.id,
                        type: "<" + target.tagName.toLowerCase() + ">",
                        href: target.href || "",
                    },
                });
            };
            // Create click stream record
            clickStream_1.objectMetric("Page", {
                title: document.title,
                page: window.location.href,
            });
            if (document.addEventListener) {
                document.addEventListener("click", documentClickHandler);
            }
            else {
                // For IE versions prior to IE9, attachEvent method should be used to register the specified listener
                // to the EventTarget it is called on, for others addEventListener should be used.
                // (<any>document)
                document.attachEvent("onclick", documentClickHandler);
            }
        }
        var startTime = rootSystem.stringMetric("StartTime", (new Date()).toString());
        var urlMetric = rootSystem.stringMetric("StartURL", "");
        var appNameMetric = rootSystem.stringMetric("AppName", "");
        if (typeof window !== "undefined") {
            if (typeof window.location !== "undefined") {
                var startUrl = window.location.href;
                urlMetric.update(startUrl);
            }
            var windowAsAny = window;
            if (typeof windowAsAny.gd !== "undefined") {
                appNameMetric.update(windowAsAny.gd.appName);
            }
        }
    }
    var me = {
        identity: identity,
        instance: instance,
        version: version,
        get root() {
            return _root;
        },
    };
    protocol.init(me);
    var _root = system_1.default("", me, protocol);
    _initSystemMetrics(_root, options.clickStream || options.clickStream === undefined);
    return me;
}
exports.default = repository;
//# sourceMappingURL=repository.js.map

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process, global) {var require;/*!
 * @overview es6-promise - a tiny implementation of Promises/A+.
 * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
 * @license   Licensed under MIT license
 *            See https://raw.githubusercontent.com/stefanpenner/es6-promise/master/LICENSE
 * @version   4.1.1
 */

(function (global, factory) {
	 true ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.ES6Promise = factory());
}(this, (function () { 'use strict';

function objectOrFunction(x) {
  var type = typeof x;
  return x !== null && (type === 'object' || type === 'function');
}

function isFunction(x) {
  return typeof x === 'function';
}

var _isArray = undefined;
if (Array.isArray) {
  _isArray = Array.isArray;
} else {
  _isArray = function (x) {
    return Object.prototype.toString.call(x) === '[object Array]';
  };
}

var isArray = _isArray;

var len = 0;
var vertxNext = undefined;
var customSchedulerFn = undefined;

var asap = function asap(callback, arg) {
  queue[len] = callback;
  queue[len + 1] = arg;
  len += 2;
  if (len === 2) {
    // If len is 2, that means that we need to schedule an async flush.
    // If additional callbacks are queued before the queue is flushed, they
    // will be processed by this flush that we are scheduling.
    if (customSchedulerFn) {
      customSchedulerFn(flush);
    } else {
      scheduleFlush();
    }
  }
};

function setScheduler(scheduleFn) {
  customSchedulerFn = scheduleFn;
}

function setAsap(asapFn) {
  asap = asapFn;
}

var browserWindow = typeof window !== 'undefined' ? window : undefined;
var browserGlobal = browserWindow || {};
var BrowserMutationObserver = browserGlobal.MutationObserver || browserGlobal.WebKitMutationObserver;
var isNode = typeof self === 'undefined' && typeof process !== 'undefined' && ({}).toString.call(process) === '[object process]';

// test for web worker but not in IE10
var isWorker = typeof Uint8ClampedArray !== 'undefined' && typeof importScripts !== 'undefined' && typeof MessageChannel !== 'undefined';

// node
function useNextTick() {
  // node version 0.10.x displays a deprecation warning when nextTick is used recursively
  // see https://github.com/cujojs/when/issues/410 for details
  return function () {
    return process.nextTick(flush);
  };
}

// vertx
function useVertxTimer() {
  if (typeof vertxNext !== 'undefined') {
    return function () {
      vertxNext(flush);
    };
  }

  return useSetTimeout();
}

function useMutationObserver() {
  var iterations = 0;
  var observer = new BrowserMutationObserver(flush);
  var node = document.createTextNode('');
  observer.observe(node, { characterData: true });

  return function () {
    node.data = iterations = ++iterations % 2;
  };
}

// web worker
function useMessageChannel() {
  var channel = new MessageChannel();
  channel.port1.onmessage = flush;
  return function () {
    return channel.port2.postMessage(0);
  };
}

function useSetTimeout() {
  // Store setTimeout reference so es6-promise will be unaffected by
  // other code modifying setTimeout (like sinon.useFakeTimers())
  var globalSetTimeout = setTimeout;
  return function () {
    return globalSetTimeout(flush, 1);
  };
}

var queue = new Array(1000);
function flush() {
  for (var i = 0; i < len; i += 2) {
    var callback = queue[i];
    var arg = queue[i + 1];

    callback(arg);

    queue[i] = undefined;
    queue[i + 1] = undefined;
  }

  len = 0;
}

function attemptVertx() {
  try {
    var r = require;
    var vertx = __webpack_require__(22);
    vertxNext = vertx.runOnLoop || vertx.runOnContext;
    return useVertxTimer();
  } catch (e) {
    return useSetTimeout();
  }
}

var scheduleFlush = undefined;
// Decide what async method to use to triggering processing of queued callbacks:
if (isNode) {
  scheduleFlush = useNextTick();
} else if (BrowserMutationObserver) {
  scheduleFlush = useMutationObserver();
} else if (isWorker) {
  scheduleFlush = useMessageChannel();
} else if (browserWindow === undefined && "function" === 'function') {
  scheduleFlush = attemptVertx();
} else {
  scheduleFlush = useSetTimeout();
}

function then(onFulfillment, onRejection) {
  var _arguments = arguments;

  var parent = this;

  var child = new this.constructor(noop);

  if (child[PROMISE_ID] === undefined) {
    makePromise(child);
  }

  var _state = parent._state;

  if (_state) {
    (function () {
      var callback = _arguments[_state - 1];
      asap(function () {
        return invokeCallback(_state, child, callback, parent._result);
      });
    })();
  } else {
    subscribe(parent, child, onFulfillment, onRejection);
  }

  return child;
}

/**
  `Promise.resolve` returns a promise that will become resolved with the
  passed `value`. It is shorthand for the following:

  ```javascript
  let promise = new Promise(function(resolve, reject){
    resolve(1);
  });

  promise.then(function(value){
    // value === 1
  });
  ```

  Instead of writing the above, your code now simply becomes the following:

  ```javascript
  let promise = Promise.resolve(1);

  promise.then(function(value){
    // value === 1
  });
  ```

  @method resolve
  @static
  @param {Any} value value that the returned promise will be resolved with
  Useful for tooling.
  @return {Promise} a promise that will become fulfilled with the given
  `value`
*/
function resolve$1(object) {
  /*jshint validthis:true */
  var Constructor = this;

  if (object && typeof object === 'object' && object.constructor === Constructor) {
    return object;
  }

  var promise = new Constructor(noop);
  resolve(promise, object);
  return promise;
}

var PROMISE_ID = Math.random().toString(36).substring(16);

function noop() {}

var PENDING = void 0;
var FULFILLED = 1;
var REJECTED = 2;

var GET_THEN_ERROR = new ErrorObject();

function selfFulfillment() {
  return new TypeError("You cannot resolve a promise with itself");
}

function cannotReturnOwn() {
  return new TypeError('A promises callback cannot return that same promise.');
}

function getThen(promise) {
  try {
    return promise.then;
  } catch (error) {
    GET_THEN_ERROR.error = error;
    return GET_THEN_ERROR;
  }
}

function tryThen(then$$1, value, fulfillmentHandler, rejectionHandler) {
  try {
    then$$1.call(value, fulfillmentHandler, rejectionHandler);
  } catch (e) {
    return e;
  }
}

function handleForeignThenable(promise, thenable, then$$1) {
  asap(function (promise) {
    var sealed = false;
    var error = tryThen(then$$1, thenable, function (value) {
      if (sealed) {
        return;
      }
      sealed = true;
      if (thenable !== value) {
        resolve(promise, value);
      } else {
        fulfill(promise, value);
      }
    }, function (reason) {
      if (sealed) {
        return;
      }
      sealed = true;

      reject(promise, reason);
    }, 'Settle: ' + (promise._label || ' unknown promise'));

    if (!sealed && error) {
      sealed = true;
      reject(promise, error);
    }
  }, promise);
}

function handleOwnThenable(promise, thenable) {
  if (thenable._state === FULFILLED) {
    fulfill(promise, thenable._result);
  } else if (thenable._state === REJECTED) {
    reject(promise, thenable._result);
  } else {
    subscribe(thenable, undefined, function (value) {
      return resolve(promise, value);
    }, function (reason) {
      return reject(promise, reason);
    });
  }
}

function handleMaybeThenable(promise, maybeThenable, then$$1) {
  if (maybeThenable.constructor === promise.constructor && then$$1 === then && maybeThenable.constructor.resolve === resolve$1) {
    handleOwnThenable(promise, maybeThenable);
  } else {
    if (then$$1 === GET_THEN_ERROR) {
      reject(promise, GET_THEN_ERROR.error);
      GET_THEN_ERROR.error = null;
    } else if (then$$1 === undefined) {
      fulfill(promise, maybeThenable);
    } else if (isFunction(then$$1)) {
      handleForeignThenable(promise, maybeThenable, then$$1);
    } else {
      fulfill(promise, maybeThenable);
    }
  }
}

function resolve(promise, value) {
  if (promise === value) {
    reject(promise, selfFulfillment());
  } else if (objectOrFunction(value)) {
    handleMaybeThenable(promise, value, getThen(value));
  } else {
    fulfill(promise, value);
  }
}

function publishRejection(promise) {
  if (promise._onerror) {
    promise._onerror(promise._result);
  }

  publish(promise);
}

function fulfill(promise, value) {
  if (promise._state !== PENDING) {
    return;
  }

  promise._result = value;
  promise._state = FULFILLED;

  if (promise._subscribers.length !== 0) {
    asap(publish, promise);
  }
}

function reject(promise, reason) {
  if (promise._state !== PENDING) {
    return;
  }
  promise._state = REJECTED;
  promise._result = reason;

  asap(publishRejection, promise);
}

function subscribe(parent, child, onFulfillment, onRejection) {
  var _subscribers = parent._subscribers;
  var length = _subscribers.length;

  parent._onerror = null;

  _subscribers[length] = child;
  _subscribers[length + FULFILLED] = onFulfillment;
  _subscribers[length + REJECTED] = onRejection;

  if (length === 0 && parent._state) {
    asap(publish, parent);
  }
}

function publish(promise) {
  var subscribers = promise._subscribers;
  var settled = promise._state;

  if (subscribers.length === 0) {
    return;
  }

  var child = undefined,
      callback = undefined,
      detail = promise._result;

  for (var i = 0; i < subscribers.length; i += 3) {
    child = subscribers[i];
    callback = subscribers[i + settled];

    if (child) {
      invokeCallback(settled, child, callback, detail);
    } else {
      callback(detail);
    }
  }

  promise._subscribers.length = 0;
}

function ErrorObject() {
  this.error = null;
}

var TRY_CATCH_ERROR = new ErrorObject();

function tryCatch(callback, detail) {
  try {
    return callback(detail);
  } catch (e) {
    TRY_CATCH_ERROR.error = e;
    return TRY_CATCH_ERROR;
  }
}

function invokeCallback(settled, promise, callback, detail) {
  var hasCallback = isFunction(callback),
      value = undefined,
      error = undefined,
      succeeded = undefined,
      failed = undefined;

  if (hasCallback) {
    value = tryCatch(callback, detail);

    if (value === TRY_CATCH_ERROR) {
      failed = true;
      error = value.error;
      value.error = null;
    } else {
      succeeded = true;
    }

    if (promise === value) {
      reject(promise, cannotReturnOwn());
      return;
    }
  } else {
    value = detail;
    succeeded = true;
  }

  if (promise._state !== PENDING) {
    // noop
  } else if (hasCallback && succeeded) {
      resolve(promise, value);
    } else if (failed) {
      reject(promise, error);
    } else if (settled === FULFILLED) {
      fulfill(promise, value);
    } else if (settled === REJECTED) {
      reject(promise, value);
    }
}

function initializePromise(promise, resolver) {
  try {
    resolver(function resolvePromise(value) {
      resolve(promise, value);
    }, function rejectPromise(reason) {
      reject(promise, reason);
    });
  } catch (e) {
    reject(promise, e);
  }
}

var id = 0;
function nextId() {
  return id++;
}

function makePromise(promise) {
  promise[PROMISE_ID] = id++;
  promise._state = undefined;
  promise._result = undefined;
  promise._subscribers = [];
}

function Enumerator$1(Constructor, input) {
  this._instanceConstructor = Constructor;
  this.promise = new Constructor(noop);

  if (!this.promise[PROMISE_ID]) {
    makePromise(this.promise);
  }

  if (isArray(input)) {
    this.length = input.length;
    this._remaining = input.length;

    this._result = new Array(this.length);

    if (this.length === 0) {
      fulfill(this.promise, this._result);
    } else {
      this.length = this.length || 0;
      this._enumerate(input);
      if (this._remaining === 0) {
        fulfill(this.promise, this._result);
      }
    }
  } else {
    reject(this.promise, validationError());
  }
}

function validationError() {
  return new Error('Array Methods must be provided an Array');
}

Enumerator$1.prototype._enumerate = function (input) {
  for (var i = 0; this._state === PENDING && i < input.length; i++) {
    this._eachEntry(input[i], i);
  }
};

Enumerator$1.prototype._eachEntry = function (entry, i) {
  var c = this._instanceConstructor;
  var resolve$$1 = c.resolve;

  if (resolve$$1 === resolve$1) {
    var _then = getThen(entry);

    if (_then === then && entry._state !== PENDING) {
      this._settledAt(entry._state, i, entry._result);
    } else if (typeof _then !== 'function') {
      this._remaining--;
      this._result[i] = entry;
    } else if (c === Promise$2) {
      var promise = new c(noop);
      handleMaybeThenable(promise, entry, _then);
      this._willSettleAt(promise, i);
    } else {
      this._willSettleAt(new c(function (resolve$$1) {
        return resolve$$1(entry);
      }), i);
    }
  } else {
    this._willSettleAt(resolve$$1(entry), i);
  }
};

Enumerator$1.prototype._settledAt = function (state, i, value) {
  var promise = this.promise;

  if (promise._state === PENDING) {
    this._remaining--;

    if (state === REJECTED) {
      reject(promise, value);
    } else {
      this._result[i] = value;
    }
  }

  if (this._remaining === 0) {
    fulfill(promise, this._result);
  }
};

Enumerator$1.prototype._willSettleAt = function (promise, i) {
  var enumerator = this;

  subscribe(promise, undefined, function (value) {
    return enumerator._settledAt(FULFILLED, i, value);
  }, function (reason) {
    return enumerator._settledAt(REJECTED, i, reason);
  });
};

/**
  `Promise.all` accepts an array of promises, and returns a new promise which
  is fulfilled with an array of fulfillment values for the passed promises, or
  rejected with the reason of the first passed promise to be rejected. It casts all
  elements of the passed iterable to promises as it runs this algorithm.

  Example:

  ```javascript
  let promise1 = resolve(1);
  let promise2 = resolve(2);
  let promise3 = resolve(3);
  let promises = [ promise1, promise2, promise3 ];

  Promise.all(promises).then(function(array){
    // The array here would be [ 1, 2, 3 ];
  });
  ```

  If any of the `promises` given to `all` are rejected, the first promise
  that is rejected will be given as an argument to the returned promises's
  rejection handler. For example:

  Example:

  ```javascript
  let promise1 = resolve(1);
  let promise2 = reject(new Error("2"));
  let promise3 = reject(new Error("3"));
  let promises = [ promise1, promise2, promise3 ];

  Promise.all(promises).then(function(array){
    // Code here never runs because there are rejected promises!
  }, function(error) {
    // error.message === "2"
  });
  ```

  @method all
  @static
  @param {Array} entries array of promises
  @param {String} label optional string for labeling the promise.
  Useful for tooling.
  @return {Promise} promise that is fulfilled when all `promises` have been
  fulfilled, or rejected if any of them become rejected.
  @static
*/
function all$1(entries) {
  return new Enumerator$1(this, entries).promise;
}

/**
  `Promise.race` returns a new promise which is settled in the same way as the
  first passed promise to settle.

  Example:

  ```javascript
  let promise1 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 1');
    }, 200);
  });

  let promise2 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 2');
    }, 100);
  });

  Promise.race([promise1, promise2]).then(function(result){
    // result === 'promise 2' because it was resolved before promise1
    // was resolved.
  });
  ```

  `Promise.race` is deterministic in that only the state of the first
  settled promise matters. For example, even if other promises given to the
  `promises` array argument are resolved, but the first settled promise has
  become rejected before the other promises became fulfilled, the returned
  promise will become rejected:

  ```javascript
  let promise1 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 1');
    }, 200);
  });

  let promise2 = new Promise(function(resolve, reject){
    setTimeout(function(){
      reject(new Error('promise 2'));
    }, 100);
  });

  Promise.race([promise1, promise2]).then(function(result){
    // Code here never runs
  }, function(reason){
    // reason.message === 'promise 2' because promise 2 became rejected before
    // promise 1 became fulfilled
  });
  ```

  An example real-world use case is implementing timeouts:

  ```javascript
  Promise.race([ajax('foo.json'), timeout(5000)])
  ```

  @method race
  @static
  @param {Array} promises array of promises to observe
  Useful for tooling.
  @return {Promise} a promise which settles in the same way as the first passed
  promise to settle.
*/
function race$1(entries) {
  /*jshint validthis:true */
  var Constructor = this;

  if (!isArray(entries)) {
    return new Constructor(function (_, reject) {
      return reject(new TypeError('You must pass an array to race.'));
    });
  } else {
    return new Constructor(function (resolve, reject) {
      var length = entries.length;
      for (var i = 0; i < length; i++) {
        Constructor.resolve(entries[i]).then(resolve, reject);
      }
    });
  }
}

/**
  `Promise.reject` returns a promise rejected with the passed `reason`.
  It is shorthand for the following:

  ```javascript
  let promise = new Promise(function(resolve, reject){
    reject(new Error('WHOOPS'));
  });

  promise.then(function(value){
    // Code here doesn't run because the promise is rejected!
  }, function(reason){
    // reason.message === 'WHOOPS'
  });
  ```

  Instead of writing the above, your code now simply becomes the following:

  ```javascript
  let promise = Promise.reject(new Error('WHOOPS'));

  promise.then(function(value){
    // Code here doesn't run because the promise is rejected!
  }, function(reason){
    // reason.message === 'WHOOPS'
  });
  ```

  @method reject
  @static
  @param {Any} reason value that the returned promise will be rejected with.
  Useful for tooling.
  @return {Promise} a promise rejected with the given `reason`.
*/
function reject$1(reason) {
  /*jshint validthis:true */
  var Constructor = this;
  var promise = new Constructor(noop);
  reject(promise, reason);
  return promise;
}

function needsResolver() {
  throw new TypeError('You must pass a resolver function as the first argument to the promise constructor');
}

function needsNew() {
  throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
}

/**
  Promise objects represent the eventual result of an asynchronous operation. The
  primary way of interacting with a promise is through its `then` method, which
  registers callbacks to receive either a promise's eventual value or the reason
  why the promise cannot be fulfilled.

  Terminology
  -----------

  - `promise` is an object or function with a `then` method whose behavior conforms to this specification.
  - `thenable` is an object or function that defines a `then` method.
  - `value` is any legal JavaScript value (including undefined, a thenable, or a promise).
  - `exception` is a value that is thrown using the throw statement.
  - `reason` is a value that indicates why a promise was rejected.
  - `settled` the final resting state of a promise, fulfilled or rejected.

  A promise can be in one of three states: pending, fulfilled, or rejected.

  Promises that are fulfilled have a fulfillment value and are in the fulfilled
  state.  Promises that are rejected have a rejection reason and are in the
  rejected state.  A fulfillment value is never a thenable.

  Promises can also be said to *resolve* a value.  If this value is also a
  promise, then the original promise's settled state will match the value's
  settled state.  So a promise that *resolves* a promise that rejects will
  itself reject, and a promise that *resolves* a promise that fulfills will
  itself fulfill.


  Basic Usage:
  ------------

  ```js
  let promise = new Promise(function(resolve, reject) {
    // on success
    resolve(value);

    // on failure
    reject(reason);
  });

  promise.then(function(value) {
    // on fulfillment
  }, function(reason) {
    // on rejection
  });
  ```

  Advanced Usage:
  ---------------

  Promises shine when abstracting away asynchronous interactions such as
  `XMLHttpRequest`s.

  ```js
  function getJSON(url) {
    return new Promise(function(resolve, reject){
      let xhr = new XMLHttpRequest();

      xhr.open('GET', url);
      xhr.onreadystatechange = handler;
      xhr.responseType = 'json';
      xhr.setRequestHeader('Accept', 'application/json');
      xhr.send();

      function handler() {
        if (this.readyState === this.DONE) {
          if (this.status === 200) {
            resolve(this.response);
          } else {
            reject(new Error('getJSON: `' + url + '` failed with status: [' + this.status + ']'));
          }
        }
      };
    });
  }

  getJSON('/posts.json').then(function(json) {
    // on fulfillment
  }, function(reason) {
    // on rejection
  });
  ```

  Unlike callbacks, promises are great composable primitives.

  ```js
  Promise.all([
    getJSON('/posts'),
    getJSON('/comments')
  ]).then(function(values){
    values[0] // => postsJSON
    values[1] // => commentsJSON

    return values;
  });
  ```

  @class Promise
  @param {function} resolver
  Useful for tooling.
  @constructor
*/
function Promise$2(resolver) {
  this[PROMISE_ID] = nextId();
  this._result = this._state = undefined;
  this._subscribers = [];

  if (noop !== resolver) {
    typeof resolver !== 'function' && needsResolver();
    this instanceof Promise$2 ? initializePromise(this, resolver) : needsNew();
  }
}

Promise$2.all = all$1;
Promise$2.race = race$1;
Promise$2.resolve = resolve$1;
Promise$2.reject = reject$1;
Promise$2._setScheduler = setScheduler;
Promise$2._setAsap = setAsap;
Promise$2._asap = asap;

Promise$2.prototype = {
  constructor: Promise$2,

  /**
    The primary way of interacting with a promise is through its `then` method,
    which registers callbacks to receive either a promise's eventual value or the
    reason why the promise cannot be fulfilled.
  
    ```js
    findUser().then(function(user){
      // user is available
    }, function(reason){
      // user is unavailable, and you are given the reason why
    });
    ```
  
    Chaining
    --------
  
    The return value of `then` is itself a promise.  This second, 'downstream'
    promise is resolved with the return value of the first promise's fulfillment
    or rejection handler, or rejected if the handler throws an exception.
  
    ```js
    findUser().then(function (user) {
      return user.name;
    }, function (reason) {
      return 'default name';
    }).then(function (userName) {
      // If `findUser` fulfilled, `userName` will be the user's name, otherwise it
      // will be `'default name'`
    });
  
    findUser().then(function (user) {
      throw new Error('Found user, but still unhappy');
    }, function (reason) {
      throw new Error('`findUser` rejected and we're unhappy');
    }).then(function (value) {
      // never reached
    }, function (reason) {
      // if `findUser` fulfilled, `reason` will be 'Found user, but still unhappy'.
      // If `findUser` rejected, `reason` will be '`findUser` rejected and we're unhappy'.
    });
    ```
    If the downstream promise does not specify a rejection handler, rejection reasons will be propagated further downstream.
  
    ```js
    findUser().then(function (user) {
      throw new PedagogicalException('Upstream error');
    }).then(function (value) {
      // never reached
    }).then(function (value) {
      // never reached
    }, function (reason) {
      // The `PedgagocialException` is propagated all the way down to here
    });
    ```
  
    Assimilation
    ------------
  
    Sometimes the value you want to propagate to a downstream promise can only be
    retrieved asynchronously. This can be achieved by returning a promise in the
    fulfillment or rejection handler. The downstream promise will then be pending
    until the returned promise is settled. This is called *assimilation*.
  
    ```js
    findUser().then(function (user) {
      return findCommentsByAuthor(user);
    }).then(function (comments) {
      // The user's comments are now available
    });
    ```
  
    If the assimliated promise rejects, then the downstream promise will also reject.
  
    ```js
    findUser().then(function (user) {
      return findCommentsByAuthor(user);
    }).then(function (comments) {
      // If `findCommentsByAuthor` fulfills, we'll have the value here
    }, function (reason) {
      // If `findCommentsByAuthor` rejects, we'll have the reason here
    });
    ```
  
    Simple Example
    --------------
  
    Synchronous Example
  
    ```javascript
    let result;
  
    try {
      result = findResult();
      // success
    } catch(reason) {
      // failure
    }
    ```
  
    Errback Example
  
    ```js
    findResult(function(result, err){
      if (err) {
        // failure
      } else {
        // success
      }
    });
    ```
  
    Promise Example;
  
    ```javascript
    findResult().then(function(result){
      // success
    }, function(reason){
      // failure
    });
    ```
  
    Advanced Example
    --------------
  
    Synchronous Example
  
    ```javascript
    let author, books;
  
    try {
      author = findAuthor();
      books  = findBooksByAuthor(author);
      // success
    } catch(reason) {
      // failure
    }
    ```
  
    Errback Example
  
    ```js
  
    function foundBooks(books) {
  
    }
  
    function failure(reason) {
  
    }
  
    findAuthor(function(author, err){
      if (err) {
        failure(err);
        // failure
      } else {
        try {
          findBoooksByAuthor(author, function(books, err) {
            if (err) {
              failure(err);
            } else {
              try {
                foundBooks(books);
              } catch(reason) {
                failure(reason);
              }
            }
          });
        } catch(error) {
          failure(err);
        }
        // success
      }
    });
    ```
  
    Promise Example;
  
    ```javascript
    findAuthor().
      then(findBooksByAuthor).
      then(function(books){
        // found books
    }).catch(function(reason){
      // something went wrong
    });
    ```
  
    @method then
    @param {Function} onFulfilled
    @param {Function} onRejected
    Useful for tooling.
    @return {Promise}
  */
  then: then,

  /**
    `catch` is simply sugar for `then(undefined, onRejection)` which makes it the same
    as the catch block of a try/catch statement.
  
    ```js
    function findAuthor(){
      throw new Error('couldn't find that author');
    }
  
    // synchronous
    try {
      findAuthor();
    } catch(reason) {
      // something went wrong
    }
  
    // async with promises
    findAuthor().catch(function(reason){
      // something went wrong
    });
    ```
  
    @method catch
    @param {Function} onRejection
    Useful for tooling.
    @return {Promise}
  */
  'catch': function _catch(onRejection) {
    return this.then(null, onRejection);
  }
};

/*global self*/
function polyfill$1() {
    var local = undefined;

    if (typeof global !== 'undefined') {
        local = global;
    } else if (typeof self !== 'undefined') {
        local = self;
    } else {
        try {
            local = Function('return this')();
        } catch (e) {
            throw new Error('polyfill failed because global object is unavailable in this environment');
        }
    }

    var P = local.Promise;

    if (P) {
        var promiseToString = null;
        try {
            promiseToString = Object.prototype.toString.call(P.resolve());
        } catch (e) {
            // silently ignored
        }

        if (promiseToString === '[object Promise]' && !P.cast) {
            return;
        }
    }

    local.Promise = Promise$2;
}

// Strange compat..
Promise$2.polyfill = polyfill$1;
Promise$2.Promise = Promise$2;

return Promise$2;

})));

//# sourceMappingURL=es6-promise.map

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7), __webpack_require__(8)))

/***/ }),
/* 7 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 8 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var helpers_1 = __webpack_require__(1);
var metric_types_1 = __webpack_require__(0);
function addressMetric(definition, parent, transport, value) {
    helpers_1.default.validate(definition, parent, transport);
    var _transport = transport;
    var _value = value || "";
    var _path = parent.path.slice(0);
    _path.push(parent.name);
    var name = definition.name;
    var description = definition.description;
    var period = definition.period;
    var resolution = definition.resolution;
    var system = parent;
    var repo = parent.repo;
    var id = parent.path + "/" + name;
    var type = metric_types_1.default.ADDRESS;
    function update(newValue) {
        _value = newValue;
        _transport.updateMetric(me);
        // NOTE: Optionally return the updated metric here.
    }
    function getValueType() {
        return undefined;
    }
    var me = {
        name: name,
        description: description,
        period: period,
        resolution: resolution,
        system: system,
        repo: repo,
        id: id,
        type: type,
        get value() {
            return _value;
        },
        get path() {
            return _path;
        },
        update: update,
        getValueType: getValueType,
    };
    _transport.createMetric(me);
    return me;
}
exports.default = addressMetric;
//# sourceMappingURL=address.js.map

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var helpers_1 = __webpack_require__(1);
var metric_types_1 = __webpack_require__(0);
function countMetric(definition, parent, transport, value) {
    helpers_1.default.validate(definition, parent, transport);
    var _transport = transport;
    var _value = value || 0;
    var _path = parent.path.slice(0);
    _path.push(parent.name);
    var name = definition.name;
    var description = definition.description;
    var period = definition.period;
    var resolution = definition.resolution;
    var system = parent;
    var repo = parent.repo;
    var id = parent.path + "/" + name;
    var type = metric_types_1.default.COUNT;
    function update(newValue) {
        _value = newValue;
        _transport.updateMetric(me);
        // NOTE: Optionally return the updated metric here.
    }
    function getValueType() {
        return undefined;
    }
    function incrementBy(num) {
        update(_value + num);
    }
    function increment() {
        incrementBy(1);
    }
    function decrement() {
        incrementBy(-1);
    }
    function decrementBy(num) {
        incrementBy(num * -1);
    }
    var me = {
        name: name,
        description: description,
        period: period,
        resolution: resolution,
        system: system,
        repo: repo,
        id: id,
        type: type,
        get path() {
            return _path;
        },
        get value() {
            return _value;
        },
        update: update,
        getValueType: getValueType,
        incrementBy: incrementBy,
        increment: increment,
        decrement: decrement,
        decrementBy: decrementBy,
    };
    _transport.createMetric(me);
    return me;
}
exports.default = countMetric;
//# sourceMappingURL=count.js.map

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var helpers_1 = __webpack_require__(1);
var metric_types_1 = __webpack_require__(0);
function numberMetric(definition, parent, transport, value) {
    helpers_1.default.validate(definition, parent, transport);
    var _transport = transport;
    var _path = parent.path.slice(0);
    var _value = value || 0;
    var name = definition.name;
    var description = definition.description;
    var period = definition.period;
    var resolution = definition.resolution;
    var system = parent;
    var repo = parent.repo;
    var id = parent.path + "/" + name;
    var type = metric_types_1.default.NUMBER;
    _path.push(parent.name);
    function update(newValue) {
        _value = newValue;
        _transport.updateMetric(me);
        // NOTE: Optionally return the updated metric here.
    }
    function getValueType() {
        return undefined;
    }
    function incrementBy(num) {
        update(_value + num);
    }
    function increment() {
        incrementBy(1);
    }
    function decrement() {
        incrementBy(-1);
    }
    function decrementBy(num) {
        incrementBy(num * -1);
    }
    var me = {
        name: name,
        description: description,
        period: period,
        resolution: resolution,
        system: system,
        repo: repo,
        id: id,
        get value() {
            return _value;
        },
        type: type,
        get path() {
            return _path;
        },
        update: update,
        getValueType: getValueType,
        incrementBy: incrementBy,
        increment: increment,
        decrement: decrement,
        decrementBy: decrementBy,
    };
    _transport.createMetric(me);
    return me;
}
exports.default = numberMetric;
//# sourceMappingURL=number.js.map

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var metric_types_1 = __webpack_require__(0);
var helpers_1 = __webpack_require__(1);
function objectMetric(definition, parent, transport, value) {
    helpers_1.default.validate(definition, parent, transport);
    var _transport = transport;
    var _value = value || "";
    var _path = parent.path.slice(0);
    _path.push(parent.name);
    var name = definition.name;
    var description = definition.description;
    var period = definition.period;
    var resolution = definition.resolution;
    var system = parent;
    var repo = parent.repo;
    var id = parent.path + "/" + name;
    var type = metric_types_1.default.OBJECT;
    function update(newValue) {
        mergeValues(newValue);
        _transport.updateMetric(me);
        // NOTE: Optionally return the updated metric here.
    }
    function getValueType() {
        return undefined;
    }
    function mergeValues(values) {
        return Object.keys(_value).forEach(function (k) {
            if (typeof values[k] !== "undefined") {
                _value[k] = values[k];
            }
        });
    }
    var me = {
        name: name,
        description: description,
        period: period,
        resolution: resolution,
        system: system,
        repo: repo,
        id: id,
        type: type,
        get value() {
            return _value;
        },
        get path() {
            return _path;
        },
        update: update,
        getValueType: getValueType,
    };
    _transport.createMetric(me);
    return me;
}
exports.default = objectMetric;
//# sourceMappingURL=object.js.map

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var helpers_1 = __webpack_require__(1);
var metric_types_1 = __webpack_require__(0);
function rateMetric(definition, parent, transport, value) {
    helpers_1.default.validate(definition, parent, transport);
    var _transport = transport;
    var _value = value || "";
    var _path = parent.path.slice(0);
    _path.push(parent.name);
    var name = definition.name;
    var description = definition.description;
    var period = definition.period;
    var resolution = definition.resolution;
    var system = parent;
    var repo = parent.repo;
    var id = parent.path + "/" + name;
    var type = metric_types_1.default.RATE;
    function update(newValue) {
        _value = newValue;
        _transport.updateMetric(me);
        // NOTE: Optionally return the updated metric here.
    }
    function getValueType() {
        return undefined;
    }
    var me = {
        name: name,
        description: description,
        period: period,
        resolution: resolution,
        system: system,
        repo: repo,
        id: id,
        type: type,
        get value() {
            return _value;
        },
        get path() {
            return _path;
        },
        update: update,
        getValueType: getValueType,
    };
    _transport.createMetric(me);
    return me;
}
exports.default = rateMetric;
//# sourceMappingURL=rate.js.map

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var helpers_1 = __webpack_require__(1);
var metric_types_1 = __webpack_require__(0);
function statisticsMetric(definition, parent, transport, value) {
    helpers_1.default.validate(definition, parent, transport);
    var _transport = transport;
    var _value = value || "";
    var _path = parent.path.slice(0);
    _path.push(parent.name);
    var name = definition.name;
    var description = definition.description;
    var period = definition.period;
    var resolution = definition.resolution;
    var system = parent;
    var repo = parent.repo;
    var id = parent.path + "/" + name;
    var type = metric_types_1.default.STATISTICS;
    function update(newValue) {
        _value = newValue;
        _transport.updateMetric(me);
        // NOTE: Optionally return the updated metric here.
    }
    function getValueType() {
        return undefined;
    }
    var me = {
        name: name,
        description: description,
        period: period,
        resolution: resolution,
        system: system,
        repo: repo,
        id: id,
        type: type,
        get value() {
            return _value;
        },
        get path() {
            return _path;
        },
        update: update,
        getValueType: getValueType,
    };
    _transport.createMetric(me);
    return me;
}
exports.default = statisticsMetric;
//# sourceMappingURL=statistics.js.map

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var helpers_1 = __webpack_require__(1);
var metric_types_1 = __webpack_require__(0);
function stringMetric(definition, parent, transport, value) {
    helpers_1.default.validate(definition, parent, transport);
    var _transport = transport;
    var _value = value || "";
    var _path = parent.path.slice(0);
    _path.push(parent.name);
    var name = definition.name;
    var description = definition.description;
    var period = definition.period;
    var resolution = definition.resolution;
    var system = parent;
    var repo = parent.repo;
    var id = parent.path + "/" + name;
    var type = metric_types_1.default.STRING;
    function update(newValue) {
        _value = newValue;
        _transport.updateMetric(me);
        // NOTE: Optionally return the updated metric here.
    }
    function getValueType() {
        return undefined;
    }
    var me = {
        name: name,
        description: description,
        period: period,
        resolution: resolution,
        system: system,
        repo: repo,
        id: id,
        get value() {
            return _value;
        },
        get path() {
            return _path;
        },
        type: type,
        update: update,
        getValueType: getValueType,
    };
    _transport.createMetric(me);
    return me;
}
exports.default = stringMetric;
//# sourceMappingURL=string.js.map

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var helpers_1 = __webpack_require__(1);
var metric_types_1 = __webpack_require__(0);
function timespanMetric(definition, parent, transport, value) {
    helpers_1.default.validate(definition, parent, transport);
    var _transport = transport;
    var _value = value || "";
    var _path = parent.path.slice(0);
    _path.push(parent.name);
    var name = definition.name;
    var description = definition.description;
    var period = definition.period;
    var resolution = definition.resolution;
    var system = parent;
    var repo = parent.repo;
    var id = parent.path + "/" + name;
    var type = metric_types_1.default.TIMESPAN;
    function update(newValue) {
        _value = newValue;
        _transport.updateMetric(me);
        // NOTE: Optionally return the updated metric here.
    }
    function start() {
        update(true);
    }
    function stop() {
        update(false);
    }
    function getValueType() {
        return undefined;
    }
    var me = {
        name: name,
        description: description,
        period: period,
        resolution: resolution,
        system: system,
        repo: repo,
        id: id,
        type: type,
        get value() {
            return _value;
        },
        get path() {
            return _path;
        },
        update: update,
        start: start,
        stop: stop,
        getValueType: getValueType,
    };
    _transport.createMetric(me);
    return me;
}
exports.default = timespanMetric;
//# sourceMappingURL=timespan.js.map

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var helpers_1 = __webpack_require__(1);
var metric_types_1 = __webpack_require__(0);
function timestampMetric(definition, parent, transport, value) {
    helpers_1.default.validate(definition, parent, transport);
    var _transport = transport;
    var _value = value || "";
    var _path = parent.path.slice(0);
    _path.push(parent.name);
    var name = definition.name;
    var description = definition.description;
    var period = definition.period;
    var resolution = definition.resolution;
    var system = parent;
    var repo = parent.repo;
    var id = parent.path + "/" + name;
    var type = metric_types_1.default.TIMESTAMP;
    function update(newValue) {
        _value = newValue;
        _transport.updateMetric(me);
        // NOTE: Optionally return the updated metric here.
    }
    function now() {
        update(new Date());
    }
    function getValueType() {
        return undefined;
    }
    var me = {
        name: name,
        description: description,
        period: period,
        resolution: resolution,
        system: system,
        repo: repo,
        id: id,
        type: type,
        get value() {
            return _value;
        },
        get path() {
            return _path;
        },
        update: update,
        now: now,
        getValueType: getValueType,
    };
    _transport.createMetric(me);
    return me;
}
exports.default = timestampMetric;
//# sourceMappingURL=timestamp.js.map

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var metric_types_1 = __webpack_require__(0);
function metricToMessage(metric) {
    var definition = getMetricDefinition(metric.name, metric.value, metric.path, metric.type, metric.description, metric.period, metric.resolution);
    function getMetricDefinition(name, value, path, type, description, period, resolution) {
        var _definition = {
            name: name,
            description: description,
            type: type ? type : getTypeFromValue(value),
            path: path,
            resolution: resolution,
            period: period,
        };
        if (_definition.type === metric_types_1.default.OBJECT) {
            _definition.Composite = Object.keys(value).reduce(function (arr, key) {
                var val = value[key];
                arr.push(getMetricDefinition(key, val, path));
                return arr;
            }, []);
        }
        return _definition;
    }
    function serializeValue(value, _metric) {
        if (value && value.constructor === Date) {
            return {
                value: {
                    type: _valueTypes.indexOf("date"),
                    value: value.valueOf(),
                    isArray: false,
                },
            };
        }
        if (typeof value === "object") {
            return {
                CompositeValue: Object.keys(value).reduce(function (arr, key) {
                    var val = serializeValue(value[key]);
                    val.InnerMetricName = key;
                    arr.push(val);
                    return arr;
                }, []),
            };
        }
        var valueType = _metric ? _metric.getValueType() : undefined;
        valueType = valueType || _valueTypes.indexOf(typeof value);
        return {
            value: {
                type: valueType,
                value: value,
                isArray: false,
            },
        };
    }
    function getTypeFromValue(value) {
        var typeAsString = value.constructor === Date ? "timestamp" : typeof value;
        switch (typeAsString) {
            case "string":
                return metric_types_1.default.STRING;
            case "number":
                return metric_types_1.default.NUMBER;
            case "timestamp":
                return metric_types_1.default.TIMESTAMP;
            case "object":
                return metric_types_1.default.OBJECT;
        }
        return 0;
    }
    var _valueTypes = [
        "boolean",
        "int",
        "number",
        "long",
        "string",
        "date",
        "object",
    ];
    return {
        id: metric.id,
        instance: metric.repo.instance,
        definition: definition,
        value: serializeValue(metric.value, metric),
    };
}
exports.default = metricToMessage;
//# sourceMappingURL=serializer.js.map

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var metric_types_1 = __webpack_require__(0);
function getMetricTypeByValue(metric) {
    if (metric.value.constructor === Date || metric.type === metric_types_1.default.TIMESPAN || metric.type === metric_types_1.default.TIMESTAMP) {
        return "timestamp";
    }
    else if (typeof metric.value === "number") {
        return "number";
    }
    else if (typeof metric.value === "string" || metric.type === metric_types_1.default.RATE) {
        return "string";
    }
    else if (typeof metric.value === "object") {
        return "object";
    }
}
function getTypeByValue(value) {
    if (value.constructor === Date) {
        return "timestamp";
    }
    else if (typeof value === "number") {
        return "number";
    }
    else if (typeof value === "string") {
        return "string";
    }
    else if (typeof value === "object") {
        return "object";
    }
    else {
        return "string";
    }
}
function serializeMetric(metric) {
    var serializedMetrics = {};
    var type = getMetricTypeByValue(metric);
    if (type === "object") {
        var values = Object.keys(metric.value).reduce(function (memo, key) {
            var innerType = getTypeByValue(metric.value[key]);
            if (innerType === "object") {
                var composite = defineNestedComposite(metric.value[key]);
                memo[key] = {
                    type: "object",
                    description: "",
                    context: {},
                    composite: composite,
                };
            }
            else {
                memo[key] = {
                    type: innerType,
                    description: "",
                    context: {},
                };
            }
            return memo;
        }, {});
        serializedMetrics.composite = values;
    }
    serializedMetrics.name = normalizeMetricName(metric.path.join("/") + "/" + metric.name);
    serializedMetrics.type = type;
    serializedMetrics.description = metric.description;
    serializedMetrics.context = {};
    return serializedMetrics;
}
exports.serializeMetric = serializeMetric;
function defineNestedComposite(values) {
    return Object.keys(values).reduce(function (memo, key) {
        var type = getTypeByValue(values[key]);
        if (type === "object") {
            memo[key] = {
                type: "object",
                description: "",
                context: {},
                composite: defineNestedComposite(values[key]),
            };
        }
        else {
            memo[key] = {
                type: type,
                description: "",
                context: {},
            };
        }
        return memo;
    }, {});
}
function normalizeMetricName(name) {
    if (typeof name !== "undefined" && name.length > 0 && name[0] !== "/") {
        return "/" + name;
    }
    else {
        return name;
    }
}
exports.normalizeMetricName = normalizeMetricName;
function getMetricValueByType(metric) {
    var type = getMetricTypeByValue(metric);
    if (type === "timestamp") {
        return Date.now();
    }
    else {
        return publishNestedComposite(metric.value);
    }
}
exports.getMetricValueByType = getMetricValueByType;
function publishNestedComposite(values) {
    if (typeof values !== "object") {
        return values;
    }
    return Object.keys(values).reduce(function (memo, key) {
        var value = values[key];
        if (typeof value === "object" && value.constructor !== Date) {
            memo[key] = publishNestedComposite(value);
        }
        else if (value.constructor === Date) {
            memo[key] = new Date(value).getTime();
        }
        else if (value.constructor === Boolean) {
            memo[key] = value.toString();
        }
        else {
            memo[key] = value;
        }
        return memo;
    }, {});
}
function flatten(arr) {
    return arr.reduce(function (flat, toFlatten) {
        return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
    }, []);
}
function getHighestState(arr) {
    return arr.sort(function (a, b) {
        return b.state - a.state;
    })[0];
}
function aggregateDescription(arr) {
    var msg = "";
    arr.forEach(function (m, idx, a) {
        var path = m.path.join(".");
        if (idx === a.length - 1) {
            msg += path + "." + m.name + ": " + m.description;
        }
        else {
            msg += path + "." + m.name + ": " + m.description + ",";
        }
    });
    if (msg.length > 100) {
        return msg.slice(0, 100) + "...";
    }
    else {
        return msg;
    }
}
function composeMsgForRootStateMetric(system) {
    var aggregatedState = system.root.getAggregateState();
    var merged = flatten(aggregatedState);
    var highestState = getHighestState(merged);
    var aggregateDesc = aggregateDescription(merged);
    return {
        description: aggregateDesc,
        value: highestState.state,
    };
}
exports.composeMsgForRootStateMetric = composeMsgForRootStateMetric;
//# sourceMappingURL=serializer.js.map

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var gw1_1 = __webpack_require__(3);
var gw3_1 = __webpack_require__(4);
var repository_1 = __webpack_require__(5);
var version = __webpack_require__(2).version;
var windowAsAny = typeof window === "undefined" ? {} : window;
windowAsAny.tick42 = windowAsAny.tick42 || {};
exports.default = function (settings) {
    var options = {
        connection: settings.connection,
        identity: settings.identity,
        logger: settings.logger,
        heartbeatInterval: settings.heartbeatInterval,
        settings: {},
        clickStream: settings.clickStream,
    };
    if (!options.connection || typeof options.connection !== "object") {
        throw new Error("Connection is required parameter");
    }
    var _protocol;
    if (options.connection.protocolVersion === 3) {
        _protocol = gw3_1.default(options.connection, settings);
    }
    else {
        _protocol = gw1_1.default(options.connection, settings);
    }
    var repo = repository_1.default(options, _protocol);
    var rootSystem = repo.root;
    rootSystem.version = version;
    return rootSystem; // System
};
//# sourceMappingURL=main.js.map

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var address_1 = __webpack_require__(9);
var count_1 = __webpack_require__(10);
var number_1 = __webpack_require__(11);
var object_1 = __webpack_require__(12);
var rate_1 = __webpack_require__(13);
var statistics_1 = __webpack_require__(14);
var string_1 = __webpack_require__(15);
var timespan_1 = __webpack_require__(16);
var timestamp_1 = __webpack_require__(17);
var metric_types_1 = __webpack_require__(0);
function system(name, repo, protocol, parent, description) {
    // Validation
    // if (!name) throw new Error("Name is required. ");
    if (!repo) {
        throw new Error("Repository is required");
    }
    if (!protocol) {
        throw new Error("Transport is required");
    }
    var _transport = protocol;
    var _name = name;
    var _description = description || "";
    var _repo = repo;
    var _parent = parent;
    var _path = _buildPath(parent);
    var _state = {};
    var id = _arrayToString(_path, "/") + name;
    var identity = repo.identity;
    var root = repo.root;
    var _subSystems = [];
    var _metrics = [];
    function subSystem(nameSystem, descriptionSystem) {
        if (!nameSystem || nameSystem.length === 0) {
            throw new Error("name is required");
        }
        var match = _subSystems.filter(function (s) { return s.name === nameSystem; });
        if (match.length > 0) {
            return match[0];
        }
        var _system = system(nameSystem, _repo, _transport, me, descriptionSystem);
        _subSystems.push(_system);
        return _system;
    }
    function setState(state, stateDescription) {
        _state = { state: state, description: stateDescription };
        _transport.updateSystem(me, _state);
    }
    function stringMetric(definition, value) {
        return _getOrCreateMetric.call(me, definition, metric_types_1.default.STRING, value, function (metricDef) { return string_1.default(metricDef, me, _transport, value); });
    }
    function numberMetric(definition, value) {
        return _getOrCreateMetric.call(me, definition, metric_types_1.default.NUMBER, value, function (metricDef) { return number_1.default(metricDef, me, _transport, value); });
    }
    function countMetric(definition, value) {
        return _getOrCreateMetric.call(this, definition, metric_types_1.default.COUNT, value, function (metricDef) { return count_1.default(metricDef, me, _transport, value); });
    }
    function addressMetric(definition, value) {
        return _getOrCreateMetric.call(this, definition, metric_types_1.default.ADDRESS, value, function (metricDef) { return address_1.default(metricDef, me, _transport, value); });
    }
    function objectMetric(definition, value) {
        return _getOrCreateMetric.call(this, definition, metric_types_1.default.OBJECT, value, function (metricDef) { return object_1.default(metricDef, me, _transport, value); });
    }
    function timespanMetric(definition, value) {
        return _getOrCreateMetric.call(this, definition, metric_types_1.default.TIMESPAN, value, function (metricDef) { return timespan_1.default(metricDef, me, _transport, value); });
    }
    function timestampMetric(definition, value) {
        return _getOrCreateMetric.call(this, definition, metric_types_1.default.TIMESTAMP, value, function (metricDef) { return timestamp_1.default(metricDef, me, _transport, value); });
    }
    function rateMetric(definition, value) {
        return _getOrCreateMetric.call(this, definition, metric_types_1.default.RATE, value, function (metricDef) { return rate_1.default(metricDef, me, _transport, value); });
    }
    function statisticsMetric(definition, value) {
        return _getOrCreateMetric.call(this, definition, metric_types_1.default.STATISTICS, value, function (metricDef) { return statistics_1.default(metricDef, me, _transport, value); });
    }
    function _unionToMetricDef(def) {
        var metricDefinition = {};
        // NOTE: Handle undefined
        if (typeof def === "string") {
            metricDefinition.name = def;
        }
        else {
            metricDefinition = def;
        }
        if (metricDefinition.name === undefined) {
            throw new Error("Metric name is required");
        }
        return metricDefinition;
    }
    function _getOrCreateMetric(definition, expectedType, value, createMetric) {
        var metricDefinition = _unionToMetricDef(definition);
        var matching = _metrics.filter(function (shadowedMetric) { return shadowedMetric.name === metricDefinition.name; });
        if (matching.length > 0) {
            var existing = matching[0];
            if (existing.type !== expectedType) {
                // NOTE: Extend the error with the already defined metric?
                throw new Error("A metric named " + metricDefinition.name + " is already defined with different type.");
            }
            if (typeof value !== "undefined") {
                existing.update(value);
            }
            return existing;
        }
        var metric = createMetric(metricDefinition);
        _metrics.push(metric);
        return metric;
    }
    function _buildPath(shadowedSystem) {
        if (!shadowedSystem || !shadowedSystem.parent) {
            return [];
        }
        var path = _buildPath(shadowedSystem.parent);
        path.push(shadowedSystem.name);
        return path;
    }
    function _arrayToString(path, separator) {
        return ((path && path.length > 0) ? path.join(separator) : "");
    }
    function getAggregateState() {
        var aggState = [];
        if (Object.keys(_state).length > 0) {
            aggState.push({
                name: _name,
                path: _path,
                state: _state.state,
                description: _state.description,
            });
        }
        _subSystems.forEach(function (shadowedSubSystem) {
            var result = shadowedSubSystem.getAggregateState();
            if (result.length > 0) {
                aggState.push(result);
            }
        });
        return aggState;
    }
    var me = {
        get name() {
            return _name;
        },
        get description() {
            return _description;
        },
        get repo() {
            return _repo;
        },
        get parent() {
            return _parent;
        },
        path: _path,
        id: id,
        identity: identity,
        root: root,
        get subSystems() {
            return _subSystems;
        },
        get metrics() {
            return _metrics;
        },
        subSystem: subSystem,
        getState: function () {
            return _state;
        },
        setState: setState,
        stringMetric: stringMetric,
        statisticsMetric: statisticsMetric,
        rateMetric: rateMetric,
        timestampMetric: timestampMetric,
        timespanMetric: timespanMetric,
        objectMetric: objectMetric,
        addressMetric: addressMetric,
        countMetric: countMetric,
        numberMetric: numberMetric,
        getAggregateState: getAggregateState,
    };
    _transport.createSystem(me);
    return me;
}
exports.default = system;
//# sourceMappingURL=system.js.map

/***/ }),
/* 22 */
/***/ (function(module, exports) {

/* (ignored) */

/***/ })
/******/ ]);
});
//# sourceMappingURL=tick42-metrics.js.map

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {
Object.defineProperty(exports, "__esModule", { value: true });
var shortid_1 = __webpack_require__(7);
var pjson = __webpack_require__(11);
function default_1(configuration, ext) {
    var hc;
    if (typeof window !== "undefined") {
        hc = window.htmlContainer;
        global = global || window; // ... Safari WebView
    }
    global = global || {}; // ... a bit paranoid
    var gd;
    if (typeof window !== "undefined") {
        gd = window.gd;
    }
    var uid = shortid_1.generate();
    // when searching for a configuration value check the following chain until the value is resolved:
    //
    // 1. global.GLUE_CONFIG            - a way to override user preferences. Use case is GLUE Mobile
    // 2. userConfig                    - user configuration
    // 3. global.GLUE_DEFAULT_CONFIG    - a way to dynamically override hard coded defaults
    // 4. hardDefaults                  - glue.js hard coded defaults
    var masterConfig = global.GLUE_CONFIG || {};
    var dynamicDefaults = global.GLUE_DEFAULT_CONFIG || {};
    var hardDefaults = getHardDefaults();
    var metricsIdentity = {
        system: getConfigProp("metrics", "system"),
        service: getConfigProp("metrics", "service"),
        instance: getConfigProp("metrics", "instance")
    };
    function getMetrics() {
        return ifNotFalse(getConfigProp("metrics"), {
            identity: metricsIdentity
        });
    }
    function getGateway() {
        function detectNode() {
            // Only Node.JS has a process variable that is of [[Class]] process
            try {
                return Object.prototype.toString.call(global.process) === "[object process]";
            }
            catch (e) {
                // catch all
            }
            return false;
        }
        var gw = hc === undefined;
        if (gw) {
            var gwConfig = getConfigProp("gateway");
            var protocolVersion = getConfigProp("gateway", "protocolVersion");
            var reconnectInterval = getConfigProp("gateway", "reconnectInterval");
            var reconnectAttempts = getConfigProp("gateway", "reconnectAttempts");
            var ws = gwConfig.ws;
            var http = gwConfig.http;
            var inproc = gwConfig.inproc;
            // if not we will select endpoint for him
            if (!ws && !http && !inproc) {
                if (detectNode() || ("WebSocket" in window && window.WebSocket.CLOSING === 2)) {
                    // if in node, or we have WebSockets use ws
                    ws = getConfigProp("gateway", "ws");
                }
                else {
                    // fallback to http
                    http = getConfigProp("gateway", "http");
                }
            }
            var windowId = void 0;
            if (hc) {
                windowId = hc.windowId;
            }
            else if (gd) {
                windowId = gd.windowId;
            }
            return {
                gwTokenProvider: gwConfig.gwTokenProvider,
                identity: {
                    application: getApplication(),
                    windowId: windowId,
                },
                reconnectInterval: reconnectInterval,
                ws: ws,
                http: http,
                gw: inproc,
                protocolVersion: protocolVersion,
                reconnectAttempts: reconnectAttempts
            };
        }
        return {};
    }
    function getLogger() {
        return getConfigProp("logger");
    }
    function getAgm() {
        return ifNotFalse(configuration.agm, {
            instance: {
                application: getApplication()
            }
        });
    }
    function getApplication() {
        return getConfigProp("application");
    }
    function getAuth() {
        return getConfigProp("auth");
    }
    function getHardDefaults() {
        function getMetricsDefaults() {
            var documentTitle = typeof document !== "undefined" ? document.title : "unknown";
            // check for empty titles
            documentTitle = documentTitle || "none";
            if (typeof hc === "undefined") {
                return {
                    system: "Connect.Browser",
                    service: configuration.application || documentTitle,
                    instance: "~" + uid
                };
            }
            if (typeof hc.metricsFacade.getIdentity !== "undefined") {
                var identity = hc.metricsFacade.getIdentity();
                return {
                    system: identity.system,
                    service: identity.service,
                    instance: identity.instance
                };
            }
            // backward compatibility for HC <= 1.60
            return {
                system: "HtmlContainer." + hc.containerName,
                service: "JS." + hc.browserWindowName,
                instance: "~" + hc.machineName
            };
        }
        function getGatewayDefaults() {
            function isSecureConnection(protocolVersion) {
                // GW2 and lower in JPM don't have SSL certificates
                if (protocolVersion && protocolVersion <= 2) {
                    return false;
                }
                if (typeof window !== "undefined" && window.location) {
                    return window.location.protocol !== "http:";
                }
                // Defaults to secure for node env.
                return true;
            }
            var defaultProtocol = 1;
            var gatewayURL = "localhost:22037";
            var isSSL = isSecureConnection(defaultProtocol);
            var defaultWs = isSSL ? "wss://" + gatewayURL : "ws://" + gatewayURL;
            var defaultHttp = isSSL ? "https://" + gatewayURL : "http://" + gatewayURL;
            return {
                ws: defaultWs,
                http: defaultHttp,
                protocolVersion: defaultProtocol,
                reconnectInterval: 1000
            };
        }
        function getDefaultApplicationName() {
            if (hc) {
                return hc.containerName + "." + hc.browserWindowName;
            }
            if (typeof window !== "undefined" && typeof document !== "undefined") {
                return (window.agm_application || document.title) + uid;
            }
            else {
                return "NodeJS" + uid;
            }
        }
        return {
            application: getDefaultApplicationName(),
            metrics: getMetricsDefaults(),
            agm: {},
            gateway: getGatewayDefaults(),
            logger: {
                publish: "off",
                console: "info",
                metrics: "off",
            }
        };
    }
    function getConfigProp(prop1, prop2) {
        var masterConfigProp1 = masterConfig[prop1];
        var userProp1 = configuration[prop1];
        var dynamicDefaultsProp1 = dynamicDefaults[prop1];
        var hardDefaultsProp1 = hardDefaults[prop1];
        if (prop2) {
            if (masterConfigProp1 && masterConfigProp1[prop2] !== undefined) {
                return masterConfigProp1[prop2];
            }
            if (userProp1 && userProp1[prop2] !== undefined) {
                return userProp1[prop2];
            }
            if (dynamicDefaultsProp1 && dynamicDefaultsProp1[prop2] !== undefined) {
                return dynamicDefaultsProp1[prop2];
            }
            if (hardDefaultsProp1 && hardDefaultsProp1[prop2] !== undefined) {
                return hardDefaultsProp1[prop2];
            }
        }
        else {
            if (masterConfigProp1 !== undefined) {
                return masterConfigProp1;
            }
            if (userProp1 !== undefined) {
                return userProp1;
            }
            if (dynamicDefaultsProp1 !== undefined) {
                return dynamicDefaultsProp1;
            }
            if (hardDefaultsProp1 !== undefined) {
                return hardDefaultsProp1;
            }
        }
        return undefined;
    }
    function ifNotFalse(what, then) {
        if (typeof what === "boolean" && !what) {
            return undefined;
        }
        else {
            return then;
        }
    }
    return {
        identity: metricsIdentity,
        application: getApplication(),
        auth: getAuth(),
        logger: getLogger(),
        connection: getGateway(),
        metrics: getMetrics(),
        agm: getAgm(),
        version: ext.version || pjson.version,
        libs: ext.libs
    };
}
exports.default = default_1;
//# sourceMappingURL=config.js.map
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var connection = {
    protocolVersion: -1,
    version: "-1",
    send: function (product, type, message, id, options) {
        return Promise.resolve(undefined);
    },
    on: function (product, type, messageHandler) {
        return { type: "1", id: 1 };
    },
    off: function (info) {
    },
    login: function (message) {
        return undefined;
    },
    logout: function () {
    },
    loggedIn: function (callback) {
        return undefined;
    },
    connected: function (callback) {
        return undefined;
    },
    disconnected: function (callback) {
        return undefined;
    },
};
exports.default = connection;
//# sourceMappingURL=dummyConnection.js.map

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var glue_1 = __webpack_require__(9);
if (typeof window !== "undefined") {
    window.GlueCore = glue_1.default;
}
// add default library for ES6 modules
glue_1.default.default = glue_1.default;
module.exports = glue_1.default;
//# sourceMappingURL=main.js.map

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function default_1() {
    function now() {
        return new Date().getTime();
    }
    var startTime = now();
    var endTime;
    var period;
    function stop() {
        endTime = now();
        period = now() - startTime;
        return period;
    }
    return {
        get startTime() {
            return startTime;
        },
        get endTime() {
            return endTime;
        },
        get period() {
            return period;
        },
        stop: stop
    };
}
exports.default = default_1;
//# sourceMappingURL=timer.js.map

/***/ }),
/* 46 */
/***/ (function(module, exports) {

/* (ignored) */

/***/ })
/******/ ]);
});
//# sourceMappingURL=tick42-glue-core.js.map

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

(function webpackUniversalModuleDefinition(root, factory) {
	if(true)
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("tick42-layouts", [], factory);
	else if(typeof exports === 'object')
		exports["tick42-layouts"] = factory();
	else
		root["tick42-layouts"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 19);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var randomFromSeed = __webpack_require__(16);

var ORIGINAL = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-';
var alphabet;
var previousSeed;

var shuffled;

function reset() {
    shuffled = false;
}

function setCharacters(_alphabet_) {
    if (!_alphabet_) {
        if (alphabet !== ORIGINAL) {
            alphabet = ORIGINAL;
            reset();
        }
        return;
    }

    if (_alphabet_ === alphabet) {
        return;
    }

    if (_alphabet_.length !== ORIGINAL.length) {
        throw new Error('Custom alphabet for shortid must be ' + ORIGINAL.length + ' unique characters. You submitted ' + _alphabet_.length + ' characters: ' + _alphabet_);
    }

    var unique = _alphabet_.split('').filter(function(item, ind, arr){
       return ind !== arr.lastIndexOf(item);
    });

    if (unique.length) {
        throw new Error('Custom alphabet for shortid must be ' + ORIGINAL.length + ' unique characters. These characters were not unique: ' + unique.join(', '));
    }

    alphabet = _alphabet_;
    reset();
}

function characters(_alphabet_) {
    setCharacters(_alphabet_);
    return alphabet;
}

function setSeed(seed) {
    randomFromSeed.seed(seed);
    if (previousSeed !== seed) {
        reset();
        previousSeed = seed;
    }
}

function shuffle() {
    if (!alphabet) {
        setCharacters(ORIGINAL);
    }

    var sourceArray = alphabet.split('');
    var targetArray = [];
    var r = randomFromSeed.nextValue();
    var characterIndex;

    while (sourceArray.length > 0) {
        r = randomFromSeed.nextValue();
        characterIndex = Math.floor(r * sourceArray.length);
        targetArray.push(sourceArray.splice(characterIndex, 1)[0]);
    }
    return targetArray.join('');
}

function getShuffled() {
    if (shuffled) {
        return shuffled;
    }
    shuffled = shuffle();
    return shuffled;
}

/**
 * lookup shuffled letter
 * @param index
 * @returns {string}
 */
function lookup(index) {
    var alphabetShuffled = getShuffled();
    return alphabetShuffled[index];
}

module.exports = {
    characters: characters,
    seed: setSeed,
    lookup: lookup,
    shuffled: getShuffled
};


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var randomByte = __webpack_require__(15);

function encode(lookup, number) {
    var loopCounter = 0;
    var done;

    var str = '';

    while (!done) {
        str = str + lookup( ( (number >> (4 * loopCounter)) & 0x0f ) | randomByte() );
        done = number < (Math.pow(16, loopCounter + 1 ) );
        loopCounter++;
    }
    return str;
}

module.exports = encode;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var LayoutImpl = (function () {
    function LayoutImpl(data) {
        this.name = data.name;
        this.type = data.type;
        this.components = data.components;
        this.context = data.context;
    }
    return LayoutImpl;
}());
exports.default = LayoutImpl;
//# sourceMappingURL=layout.js.map

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
// provides a unified way to access layouts array
var LayoutStore = (function () {
    function LayoutStore() {
        this.layouts = [];
    }
    LayoutStore.prototype.removeWhere = function (condition) {
        this.layouts = this.layouts.filter(condition);
    };
    LayoutStore.prototype.add = function (item) {
        this.layouts.push(item);
    };
    Object.defineProperty(LayoutStore.prototype, "all", {
        get: function () {
            return this.layouts;
        },
        enumerable: true,
        configurable: true
    });
    LayoutStore.prototype.where = function (condition) {
        return this.layouts.filter(condition);
    };
    LayoutStore.prototype.first = function (condition) {
        return this.where(condition)[0];
    };
    return LayoutStore;
}());
exports.LayoutStore = LayoutStore;
exports.default = new LayoutStore();
//# sourceMappingURL=store.js.map

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
// A simple transformation that makes object to start with lowercase
// Note that this is not full implementation as it supports only:
// undefined, null, arrays, number, string, bool. Anything out of this
// list is considered Object
function transformACSLayout(something) {
    if (!something) {
        return something;
    }
    if (Array.isArray(something)) {
        return something.map(function (item) {
            return transformACSLayout(item);
        });
    }
    if (typeof something === "string" || typeof something === "number" || typeof something === "boolean") {
        return something;
    }
    var initial = {};
    return Object.keys(something).reduce(function (accumulator, current) {
        var value = something[current];
        var convertedValue = transformACSLayout(value);
        var key = current;
        if (current[0].toLowerCase() !== current[0]) {
            key = current[0].toLowerCase() + current.substr(1);
        }
        accumulator[key] = convertedValue;
        return accumulator;
    }, initial);
}
exports.default = transformACSLayout;
//# sourceMappingURL=transform.js.map

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function createRegistry() {
    var callbacks = {};
    function add(key, callback) {
        var callbacksForKey = callbacks[key];
        if (!callbacksForKey) {
            callbacksForKey = [];
            callbacks[key] = callbacksForKey;
        }
        callbacksForKey.push(callback);
        return function () {
            var allForKey = callbacks[key];
            if (!allForKey) {
                return;
            }
            allForKey = allForKey.filter(function (item) {
                return item !== callback;
            });
            callbacks[key] = allForKey;
        };
    }
    function execute(key) {
        var argumentsArr = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            argumentsArr[_i - 1] = arguments[_i];
        }
        var callbacksForKey = callbacks[key];
        if (!callbacksForKey || callbacksForKey.length === 0) {
            return [];
        }
        var results = [];
        callbacksForKey.forEach(function (callback) {
            try {
                var result = callback.apply(undefined, argumentsArr);
                results.push(result);
            }
            catch (err) {
                results.push(undefined);
            }
        });
        return results;
    }
    function clear() {
        callbacks = {};
    }
    return {
        add: add,
        execute: execute,
        clear: clear
    };
}
;
createRegistry.default = createRegistry;
module.exports = createRegistry;
//# sourceMappingURL=index.js.map

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var store_1 = __webpack_require__(3);
var shortid_1 = __webpack_require__(10);
var contextProvider_1 = __webpack_require__(18);
var transform_1 = __webpack_require__(4);
var layout_1 = __webpack_require__(2);
var pjson = __webpack_require__(9);
var version = pjson.version;
var LayoutsAPIImpl = (function () {
    function LayoutsAPIImpl(config, stream, callbacks) {
        this.config = config;
        this.stream = stream;
        this.callbacks = callbacks;
        this.appManager = config.appManager;
        this.onEvent = stream.onEvent;
        this.provider = new contextProvider_1.default(config.agm, callbacks);
        stream.subscribe();
    }
    Object.defineProperty(LayoutsAPIImpl.prototype, "version", {
        get: function () {
            return version;
        },
        enumerable: true,
        configurable: true
    });
    LayoutsAPIImpl.prototype.ready = function () {
        if (this.config.mode === "fullWaitSnapshot") {
            return this.stream.gotSnapshot;
        }
        return this.stream.ready;
    };
    LayoutsAPIImpl.prototype.save = function (layout) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.verifyNotSlimMode();
            if (!layout.name) {
                throw Error("layout.name argument is required");
            }
            if (!layout.type) {
                layout.type = "Global";
            }
            if (layout.activityId) {
                layout.type = "Activity";
            }
            if (typeof layout.ignoreHidden === "undefined") {
                layout.ignoreHidden = true; // default to true
            }
            var layoutObject = {
                name: layout.name,
                actIds: [],
                appIds: [],
                type: layout.type,
                context: layout.context,
                options: { ignoreLayoutRestrictions: false },
            };
            if (layout.type === "Activity") {
                var actId = layout.activityId;
                if (!actId) {
                    if (!_this.appManager.myInstance.inActivity) {
                        throw new Error("Current application is not in activity. Can not save activity layout for it");
                    }
                    actId = _this.appManager.myInstance.activityId;
                }
                layoutObject.actIds.push(actId);
                layoutObject.options = { ignoreLayoutRestrictions: true };
            }
            else if (layout.type === "Global") {
                var instances = _this.appManager.instances();
                if (layout.ignoreHidden) {
                    instances = instances.filter(function (i) { return _this.isVisibleWindow(i); });
                }
                if (layout.ignoreMyInstance && _this.appManager.myInstance) {
                    instances = instances.filter(function (i) { return i.id !== _this.appManager.myInstance.id; });
                }
                instances.reduce(function (prev, current) {
                    if (!current.id) {
                        return prev;
                    }
                    if (current.inActivity) {
                        var actId = current.activityId;
                        if (prev.actIds.indexOf(actId) === -1) {
                            prev.actIds.push(actId);
                        }
                    }
                    else {
                        prev.appIds.push(current.id);
                    }
                    return prev;
                }, layoutObject);
            }
            else {
                throw new Error("layout type " + layout.type + " not supported");
            }
            _this.invokeMethodAndTrack("T42.ACS.SaveLayout", layoutObject, resolve, reject);
        });
    };
    LayoutsAPIImpl.prototype.restore = function (options) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.verifyNotSlimMode();
            if (typeof options === "undefined") {
                throw Error("options argument is required");
            }
            if (!options.name) {
                throw Error("options.name argument is required");
            }
            if (!options.type) {
                options.type = "Global";
            }
            if (options.activityIdToJoin) {
                options.type = "Activity";
            }
            if (typeof options.restoreActivityOwner === "undefined") {
                options.restoreActivityOwner = false;
            }
            if (typeof options.ignoreActivityWindowTypes === "undefined") {
                options.ignoreActivityWindowTypes = [];
            }
            if (typeof options.setActivityContext === "undefined") {
                options.setActivityContext = true;
            }
            // if no closeOwnRunning we set closeRunningInstance to true; if
            if (typeof options.closeRunningInstance === "undefined") {
                if (options.type === "Global") {
                    options.closeRunningInstance = true;
                }
                else if (options.type === "Activity") {
                    // we don't close anything in case of activity layout type
                    options.closeRunningInstance = false;
                }
            }
            if (typeof options.reuseWindows === "undefined") {
                options.reuseWindows = true;
            }
            options.context = options.context || {};
            var t42 = {
                restoreOptions: {
                    activityToJoin: options.activityIdToJoin,
                    setActivityContext: options.setActivityContext,
                    ignoreActivityWindowTypes: options.ignoreActivityWindowTypes,
                    restoreActivityOwner: options.restoreActivityOwner,
                    closeOldWindows: true,
                    reuseExistingWindows: options.reuseWindows
                }
            };
            var arg = {
                type: options.type,
                name: options.name,
                context: options.context,
                toClose: [],
                splash: options.splash
            };
            if (options.closeRunningInstance) {
                arg.toClose = _this.getInstancesToClose(options);
            }
            arg.context._t42 = t42;
            _this.invokeMethodAndTrack("T42.ACS.RestoreLayout", arg, resolve, reject, true);
        });
    };
    LayoutsAPIImpl.prototype.remove = function (type, name) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.verifyNotSlimMode();
            if (!name) {
                throw Error("name argument is required");
            }
            if (!type) {
                throw Error("type argument is required");
            }
            var msg = {
                type: type,
                name: name,
            };
            _this.invokeMethodAndTrack("T42.ACS.RemoveLayout", msg, resolve, reject);
        });
    };
    LayoutsAPIImpl.prototype.list = function () {
        this.verifyNotSlimMode();
        return store_1.default.all;
    };
    LayoutsAPIImpl.prototype.import = function (layouts, mode) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.verifyNotSlimMode();
            var msg = {
                mode: mode || "replace",
                layouts: layouts
            };
            _this.invokeMethodAndTrack("T42.ACS.ImportLayouts", msg, resolve, reject);
        });
    };
    LayoutsAPIImpl.prototype.export = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var handleResult = function (result) {
                var layouts = _this.getObjectValues(result.Layouts).map(function (t) { return new layout_1.default(transform_1.default(t)); });
                resolve(layouts);
            };
            _this.invokeMethodAndTrack("T42.ACS.ExportLayouts", {}, handleResult, reject, true);
        });
    };
    LayoutsAPIImpl.prototype.rename = function (layout, newName) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.verifyNotSlimMode();
            if (!layout) {
                throw Error("layout argument is required");
            }
            if (!layout.name) {
                throw Error("name argument is required");
            }
            if (!layout.type) {
                throw Error("type argument is required");
            }
            var msg = { type: layout.type, oldName: layout.name, newName: newName };
            _this.invokeMethodAndTrack("T42.ACS.RenameLayout", msg, resolve, reject);
        });
    };
    LayoutsAPIImpl.prototype.onAdded = function (callback) {
        var result = this.callbacks.add("added", callback);
        if (store_1.default.all.length > 0) {
            store_1.default.all.forEach(function (layout) {
                try {
                    callback(layout);
                }
                catch (err) { }
            });
        }
        return result;
    };
    LayoutsAPIImpl.prototype.onRemoved = function (callback) {
        return this.callbacks.add("removed", callback);
    };
    LayoutsAPIImpl.prototype.onChanged = function (callback) {
        return this.callbacks.add("changed", callback);
    };
    LayoutsAPIImpl.prototype.onRenamed = function (callback) {
        return this.callbacks.add("renamed", callback);
    };
    LayoutsAPIImpl.prototype.onEvent = function (callback) {
        return this.stream.onEvent(callback);
    };
    LayoutsAPIImpl.prototype.onSaveRequested = function (callback) {
        return this.provider.onSaveRequested(callback);
    };
    LayoutsAPIImpl.prototype.verifyNotSlimMode = function () {
        if (this.config.mode === "slim") {
            throw Error("Operation not allowed in slim mode. Run in full mode.");
        }
    };
    LayoutsAPIImpl.prototype.isVisibleWindow = function (instance) {
        // GD3 thing - allow exes to participate in layouts
        // TODO - check if the app is layouts aware (has the layouts methods) - if not treat it as not visible window
        if (instance.application.type === "exe") {
            return true;
        }
        if (!instance || !instance.window) {
            return false;
        }
        return instance.window.isVisible;
    };
    LayoutsAPIImpl.prototype.invokeMethodAndTrack = function (methodName, args, resolve, reject, skipStreamEvent) {
        var streamEventReceived = skipStreamEvent;
        var agmResult;
        var token = shortid_1.generate();
        args.token = token;
        var handleResult = function () {
            if (streamEventReceived && agmResult) {
                resolve(agmResult);
            }
        };
        if (!skipStreamEvent) {
            this.stream.waitFor(token)
                .then(function () {
                streamEventReceived = true;
                handleResult();
            })
                .catch(function (err) {
                reject(err);
            });
        }
        var responseHandler = function (result) {
            if (!result.returned) {
                reject("No result from method " + methodName);
            }
            if (result.returned.status && (result.returned.status !== "Success" && result.returned.status !== "PartialSuccess")) {
                reject(result.returned);
            }
            agmResult = result.returned;
            handleResult();
        };
        this.config.agm.invoke(methodName, args, "best", { method_response_timeout: 120 * 1000 })
            .then(responseHandler)
            .catch(function (err) { return reject(err); });
    };
    LayoutsAPIImpl.prototype.getInstancesToClose = function (options) {
        var _this = this;
        var instances = [];
        var shellApp = this.appManager.applications().filter(function (a) { return a.isShell; })[0];
        var shellApplicationName = shellApp ? shellApp.name : "AppManager";
        this.appManager.instances().forEach(function (i) {
            // ignore my instance
            if (_this.appManager.myInstance && i.id === _this.appManager.myInstance.id) {
                return;
            }
            // ignore shell app
            if (i.application.name === shellApplicationName) {
                return;
            }
            // ignore hidden windows
            if (!_this.isVisibleWindow(i)) {
                return;
            }
            // if activity layout stop only the instances
            // running in the same activity
            if (options.type === "Activity") {
                if (i.activityId !== options.activityIdToJoin) {
                    return;
                }
            }
            instances.push({ application: i.application.name, instance: i.id });
        });
        return instances;
    };
    LayoutsAPIImpl.prototype.getObjectValues = function (obj) {
        if (!obj) {
            return [];
        }
        return Object.keys(obj).map(function (k) { return obj[k]; });
    };
    return LayoutsAPIImpl;
}());
exports.default = LayoutsAPIImpl;
//# sourceMappingURL=layouts.js.map

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var store_1 = __webpack_require__(3);
var layout_1 = __webpack_require__(2);
var transform_1 = __webpack_require__(4);
/**
 * ACS event stream related to layouts
 */
var ACSStream = (function () {
    function ACSStream(agm, callbacks) {
        var _this = this;
        this.agm = agm;
        this.callbacks = callbacks;
        this.ready = new Promise(function (resolve, reject) {
            _this.resolveReady = resolve;
            _this.rejectReady = reject;
        });
        this.gotSnapshot = new Promise(function (resolve, reject) {
            _this.resolveGotSnapshot = resolve;
            _this.rejectGotSnapshot = reject;
        });
    }
    ACSStream.prototype.subscribe = function (noRetry) {
        var _this = this;
        var transform = function (obj) {
            return _this.getObjectValues(obj).map(function (t) { return transform_1.default(t); });
        };
        // if we don't have OnLayoutEvent stream  we're running pre 2.1 GD version or outside GD,
        if (!this.checkForLayoutEventMethod()) {
            // if no retry resolve right away
            if (noRetry) {
                this.resolveReady();
            }
            // if we should retry, schedule  one more time
            setTimeout(function () {
                _this.subscribe(true);
            }, 500);
        }
        else {
            this.agm.subscribe("T42.ACS.OnLayoutEvent", { waitTimeoutMs: 10000 })
                .then(function (subs) {
                subs.onData(function (args) {
                    var data = args.data;
                    if (data.IsSnapshot) {
                        _this.resolveGotSnapshot();
                    }
                    _this.addLayouts(transform(data.OnLayoutAdded));
                    _this.removeLayouts(transform(data.OnLayoutRemoved));
                    _this.changeLayouts(transform(data.OnLayoutChanged));
                    _this.renameLayouts(transform(data.OnLayoutRenamed));
                    _this.callbacks.execute("streamEvent", data);
                });
                subs.onFailed(function (err) {
                    var msg = "can not subscribe to T42.ACS.OnLayoutEvent " + err;
                    _this.rejectReady(msg);
                    _this.rejectGotSnapshot(msg);
                });
                _this.resolveReady();
            })
                .catch(function (err) {
                var msg = "Error subscribing for T42.ACS.OnLayoutEvent stream. Err: " + err;
                _this.rejectReady(msg);
                _this.rejectGotSnapshot(msg);
            });
        }
    };
    ACSStream.prototype.onEvent = function (callback) {
        return this.callbacks.add("streamEvent", callback);
    };
    ACSStream.prototype.waitFor = function (token, timeout) {
        var _this = this;
        if (!timeout) {
            timeout = 10000; // default timeout is 10 seconds
        }
        return new Promise(function (resolve, reject) {
            var done = false;
            var unsubscribe = _this.onEvent(function (streamEvent) {
                if (streamEvent.Token === token) {
                    done = true;
                    unsubscribe();
                    resolve();
                }
            });
            setTimeout(function () {
                if (!done) {
                    reject("timed out");
                }
            }, timeout);
        });
    };
    ACSStream.prototype.checkForLayoutEventMethod = function () {
        try {
            return this.agm
                .methods()
                .map(function (m) { return m.name; })
                .indexOf("T42.ACS.OnLayoutEvent") !== -1;
        }
        catch (e) {
            return false;
        }
    };
    ACSStream.prototype.addLayouts = function (layoutsData) {
        var _this = this;
        if (!layoutsData) {
            return;
        }
        layoutsData.forEach(function (layoutData) {
            var layout = new layout_1.default(layoutData);
            store_1.default.add(layout);
            _this.callbacks.execute("added", layout);
        });
    };
    ACSStream.prototype.removeLayouts = function (removedLayouts) {
        var _this = this;
        if (!removedLayouts) {
            return;
        }
        removedLayouts.forEach(function (removedLayout) {
            store_1.default.removeWhere(function (existingLayout) { return !_this.compareLayouts(existingLayout, removedLayout); });
            _this.callbacks.execute("removed", removedLayout);
        });
    };
    ACSStream.prototype.changeLayouts = function (changedLayouts) {
        var _this = this;
        if (!changedLayouts) {
            return;
        }
        changedLayouts.forEach(function (changedLayout) {
            // removed the changed layout and push it again
            store_1.default.removeWhere(function (existingLayout) { return !_this.compareLayouts(existingLayout, changedLayout); });
            store_1.default.add(new layout_1.default(changedLayout));
            // execute callback
            _this.callbacks.execute("changed", changedLayout);
        });
    };
    ACSStream.prototype.renameLayouts = function (renamedLayouts) {
        var _this = this;
        if (!renamedLayouts) {
            return;
        }
        renamedLayouts.forEach(function (renamedLayout) {
            var existingLayout = store_1.default.first(function (current) { return _this.compareLayouts(current, { type: renamedLayout.type, name: renamedLayout.oldName }); });
            if (!existingLayout) {
                throw Error("received rename event for unknown layout with type " + renamedLayout.type + " and name " + renamedLayout.oldName);
            }
            existingLayout.name = renamedLayout.newName;
            _this.callbacks.execute("renamed", existingLayout);
        });
    };
    ACSStream.prototype.compareLayouts = function (layout1, layout2) {
        return layout1.name === layout2.name && layout1.type === layout2.type;
    };
    ACSStream.prototype.getObjectValues = function (obj) {
        if (!obj) {
            return [];
        }
        return Object.keys(obj).map(function (k) { return obj[k]; });
    };
    return ACSStream;
}());
exports.default = ACSStream;
//# sourceMappingURL=acsStream.js.map

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function default_1() {
    return {
        ready: Promise.resolve(undefined),
        subscribe: function () { },
        onEvent: function (callback) { return function () { }; },
        waitFor: function (token, timeout) { return Promise.resolve(undefined); },
        gotSnapshot: Promise.resolve(undefined),
    };
}
exports.default = default_1;
//# sourceMappingURL=nullStream.js.map

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = {"name":"tick42-layouts","version":"1.7.12","description":"","main":"./dist/web/tick42-layouts.js","types":"types/index.d.ts","docName":"Layouts","scripts":{"tslint":"tslint -t codeFrame ./src/**/*.ts","clean":"node ./build/scripts/clean.js","tslint:fix":"tslint -t codeFrame --fix ./src/**/*.ts","pre:build":"npm run tslint && tsc && set NODE_ENV=development && npm run clean","build:dev":"npm run pre:build && set NODE_ENV=development && webpack && npm run types","build:prod":"npm run pre:build && set NODE_ENV=development && webpack && set NODE_ENV=production && webpack && npm run types","generate-docs":"jsdoc -c jsdoc-config.json","prepublish":"npm run build:prod","preversion":"npm run build:prod","types":"node ./build/scripts/copy-types.js"},"author":"","license":"ISC","devDependencies":{"@types/es6-promise":"0.0.32","@types/shortid":"0.0.29","es6-promise":"^4.1.0","eslint":"^3.1.1","eslint-config-standard":"^5.3.5","eslint-config-tick42":"^1.0.0","eslint-plugin-promise":"^2.0.0","eslint-plugin-standard":"^2.0.0","json-loader":"^0.5.4","pre-commit":"^1.1.3","shelljs":"^0.6.0","tick42-activity":"^2.12.4","tick42-agm":"^3.5.14","tick42-app-manager":"^3.6.4","tick42-gateway-connection":"^2.4.4","tick42-logger":"^3.0.9","tick42-metrics":"^2.4.1","tick42-webpack-config":"4.1.6","tick42-windows":"^4.0.4","tslint":"^5.4.3","typescript":"^2.5.3","webpack":"2.3.3"},"dependencies":{"@types/node":"^8.0.26","callback-registry":"^2.3.1","shortid":"^2.2.8"}}

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = __webpack_require__(13);


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var encode = __webpack_require__(1);
var alphabet = __webpack_require__(0);

// Ignore all milliseconds before a certain time to reduce the size of the date entropy without sacrificing uniqueness.
// This number should be updated every year or so to keep the generated id short.
// To regenerate `new Date() - 0` and bump the version. Always bump the version!
var REDUCE_TIME = 1459707606518;

// don't change unless we change the algos or REDUCE_TIME
// must be an integer and less than 16
var version = 6;

// Counter is used when shortid is called multiple times in one second.
var counter;

// Remember the last time shortid was called in case counter is needed.
var previousSeconds;

/**
 * Generate unique id
 * Returns string id
 */
function build(clusterWorkerId) {

    var str = '';

    var seconds = Math.floor((Date.now() - REDUCE_TIME) * 0.001);

    if (seconds === previousSeconds) {
        counter++;
    } else {
        counter = 0;
        previousSeconds = seconds;
    }

    str = str + encode(alphabet.lookup, version);
    str = str + encode(alphabet.lookup, clusterWorkerId);
    if (counter > 0) {
        str = str + encode(alphabet.lookup, counter);
    }
    str = str + encode(alphabet.lookup, seconds);

    return str;
}

module.exports = build;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var alphabet = __webpack_require__(0);

/**
 * Decode the id to get the version and worker
 * Mainly for debugging and testing.
 * @param id - the shortid-generated id.
 */
function decode(id) {
    var characters = alphabet.shuffled();
    return {
        version: characters.indexOf(id.substr(0, 1)) & 0x0f,
        worker: characters.indexOf(id.substr(1, 1)) & 0x0f
    };
}

module.exports = decode;


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var alphabet = __webpack_require__(0);
var encode = __webpack_require__(1);
var decode = __webpack_require__(12);
var build = __webpack_require__(11);
var isValid = __webpack_require__(14);

// if you are using cluster or multiple servers use this to make each instance
// has a unique value for worker
// Note: I don't know if this is automatically set when using third
// party cluster solutions such as pm2.
var clusterWorkerId = __webpack_require__(17) || 0;

/**
 * Set the seed.
 * Highly recommended if you don't want people to try to figure out your id schema.
 * exposed as shortid.seed(int)
 * @param seed Integer value to seed the random alphabet.  ALWAYS USE THE SAME SEED or you might get overlaps.
 */
function seed(seedValue) {
    alphabet.seed(seedValue);
    return module.exports;
}

/**
 * Set the cluster worker or machine id
 * exposed as shortid.worker(int)
 * @param workerId worker must be positive integer.  Number less than 16 is recommended.
 * returns shortid module so it can be chained.
 */
function worker(workerId) {
    clusterWorkerId = workerId;
    return module.exports;
}

/**
 *
 * sets new characters to use in the alphabet
 * returns the shuffled alphabet
 */
function characters(newCharacters) {
    if (newCharacters !== undefined) {
        alphabet.characters(newCharacters);
    }

    return alphabet.shuffled();
}

/**
 * Generate unique id
 * Returns string id
 */
function generate() {
  return build(clusterWorkerId);
}

// Export all other functions as properties of the generate function
module.exports = generate;
module.exports.generate = generate;
module.exports.seed = seed;
module.exports.worker = worker;
module.exports.characters = characters;
module.exports.decode = decode;
module.exports.isValid = isValid;


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var alphabet = __webpack_require__(0);

function isShortId(id) {
    if (!id || typeof id !== 'string' || id.length < 6 ) {
        return false;
    }

    var characters = alphabet.characters();
    var len = id.length;
    for(var i = 0; i < len;i++) {
        if (characters.indexOf(id[i]) === -1) {
            return false;
        }
    }
    return true;
}

module.exports = isShortId;


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var crypto = typeof window === 'object' && (window.crypto || window.msCrypto); // IE 11 uses window.msCrypto

function randomByte() {
    if (!crypto || !crypto.getRandomValues) {
        return Math.floor(Math.random() * 256) & 0x30;
    }
    var dest = new Uint8Array(1);
    crypto.getRandomValues(dest);
    return dest[0] & 0x30;
}

module.exports = randomByte;


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// Found this seed-based random generator somewhere
// Based on The Central Randomizer 1.3 (C) 1997 by Paul Houle (houle@msc.cornell.edu)

var seed = 1;

/**
 * return a random number based on a seed
 * @param seed
 * @returns {number}
 */
function getNextValue() {
    seed = (seed * 9301 + 49297) % 233280;
    return seed/(233280.0);
}

function setSeed(_seed_) {
    seed = _seed_;
}

module.exports = {
    nextValue: getNextValue,
    seed: setSeed
};


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = 0;


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var SaveContextMethodName = "T42.HC.GetSaveContext";
/**
 * Logic for apps that want to provide custom context on save
 */
var ContextProvider = (function () {
    function ContextProvider(agm, callbacks) {
        this.agm = agm;
        this.callbacks = callbacks;
        this.registeredRequestsMethods = false;
    }
    ContextProvider.prototype.onSaveRequested = function (callback) {
        if (!this.registeredRequestsMethods) {
            this.registerRequestMethods();
            this.registeredRequestsMethods = true;
        }
        return this.callbacks.add("saveRequested", callback);
    };
    ContextProvider.prototype.isActivityOwner = function () {
        if (typeof htmlContainer !== "undefined") {
            var context = htmlContainer.getContext();
            return context && context._t42 && context._t42.activityIsOwner;
        }
        return false;
    };
    ContextProvider.prototype.registerRequestMethods = function () {
        var _this = this;
        this.agm.register(SaveContextMethodName, function (args) {
            var requestResult = _this.callbacks.execute("saveRequested", args)[0];
            if (!requestResult) {
                return {};
            }
            requestResult.activityContext = requestResult.activityContext || {};
            requestResult.windowContext = requestResult.windowContext || {};
            // always include the window context
            var result = { windowContext: requestResult.windowContext, activityContext: undefined };
            // if we're the activity owner put the context too
            if (_this.isActivityOwner()) {
                result.activityContext = requestResult.activityContext;
            }
            return result;
        });
    };
    return ContextProvider;
}());
exports.default = ContextProvider;
//# sourceMappingURL=contextProvider.js.map

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var layouts_1 = __webpack_require__(6);
var acsStream_1 = __webpack_require__(7);
var nullStream_1 = __webpack_require__(8);
var callback_registry_1 = __webpack_require__(5);
function default_1(config) {
    if (!config.agm) {
        throw Error("config.agm is required");
    }
    if (!config.logger) {
        throw Error("config.logger is required");
    }
    // default mode to slim
    config.mode = config.mode || "slim";
    var logger = config.logger;
    var callbacks = callback_registry_1.default();
    var acsStream;
    if (config.mode === "full" || "fullWaitSnapshot") {
        acsStream = new acsStream_1.default(config.agm, callbacks);
    }
    else {
        acsStream = nullStream_1.default();
    }
    return new layouts_1.default(config, acsStream, callbacks);
}
exports.default = default_1;
//# sourceMappingURL=main.js.map

/***/ })
/******/ ]);
});
//# sourceMappingURL=tick42-layouts.js.map

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = function (options) {
    // Possible options per lib (this is InputLibConfig type)
    // * false - library is disabled (e.g. config.appManager = false)
    // * true - library is enabled in running in default mode (e.g config.appManager = true).
    //          Exception is if default mode is false - in that case it runs default true mode.
    // * string - start in some mode (e.g. config.appManager = "full")
    // * object - allows further customization (e.g config.appManager = {mode: "full", someSetting: 42})
    //
    // Some libs support different running modes, some do not.
    //
    // Currently defaults are:
    // appManager: disabled
    // layouts: enabled in 'slim' mode
    // activities: enabled in 'trackMyTypeAndInitiatedFromMe' mode
    // windows: enabled (does not support modes)
    // contexts: enabled (does not support modes)
    //
    // InputLibConfig is transformed to LibConfigObject
    /**
     * Transforms InputLibConfig (the config as specified from the user)
     * to LibConfigObject(internal library configuration)
     */
    function getLibConfig(value, defaultMode, trueMode) {
        // if value is false return undefined
        if (typeof value === "boolean" && !value) {
            return undefined;
        }
        // find the mode of the library
        var mode = getModeAsString(value, defaultMode, trueMode);
        // if object we will replace the mode because appManager = {mode: true, setting: 42}
        // should be turned into appManager = {mode: 'slim', setting: 42}
        if (typeof value === "object") {
            value.mode = mode;
            return value;
        }
        return {
            mode: mode,
        };
    }
    /**
     * Finds the mode based for a given library
     * 1. If object we call recursively using object.mode for value
     * 1. If the user hasn't specified anything we use the hard coded defaults
     * 3. If the value is false or it got defaulted to false, we return undefined
     * 4. If the value is true we return trueMode or defaultMode (if trueMode is undefined)
     */
    function getModeAsString(value, defaultMode, trueMode) {
        if (typeof value === "object") {
            // 1. if object
            return getModeAsString(value.mode, defaultMode, trueMode) + "";
        }
        else if (typeof value === "undefined") {
            // 2. if the user does not pass anything
            if (typeof defaultMode === "boolean" && !defaultMode) {
                // 3. if gets defaulted to false, the library should be off
                return undefined;
            }
            else {
                return defaultMode + "";
            }
        }
        else if (typeof value === "boolean") {
            // 4. if the user passes true, use trueMode or defaultMode
            if (value) {
                // if the user passes true, use trueMode or defaultMode
                return ((trueMode === undefined) ? defaultMode : trueMode) + "";
            }
            else {
                // 3. if the user passes false, the library should be off
                return undefined;
            }
        }
        return value + "";
    }
    var appDefaultMode = false;
    var appDefaultTrueMode = "startOnly";
    var activitiesDefaultMode = "trackMyTypeAndInitiatedFromMe";
    var layoutsDefaultMode = "slim";
    return {
        layouts: getLibConfig(options.layouts, layoutsDefaultMode),
        activities: getLibConfig(options.activities, activitiesDefaultMode),
        appManager: getLibConfig(options.appManager, appDefaultMode, appDefaultTrueMode),
        windows: getLibConfig(options.windows, true),
        contexts: getLibConfig(options.contexts, true)
    };
};
//# sourceMappingURL=config.js.map

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var glue_1 = __webpack_require__(8);
if (typeof window !== "undefined") {
    window.Glue = glue_1.default;
}
// add default library for ES6 modules
glue_1.default.default = glue_1.default;
module.exports = glue_1.default;
//# sourceMappingURL=main.js.map

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

(function webpackUniversalModuleDefinition(root, factory) {
	if(true)
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("tick42-windows", [], factory);
	else if(typeof exports === 'object')
		exports["tick42-windows"] = factory();
	else
		root["tick42-windows"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 11);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function createRegistry() {
    var callbacks = {};
    function add(key, callback) {
        var callbacksForKey = callbacks[key];
        if (!callbacksForKey) {
            callbacksForKey = [];
            callbacks[key] = callbacksForKey;
        }
        callbacksForKey.push(callback);
        return function () {
            var allForKey = callbacks[key];
            if (!allForKey) {
                return;
            }
            allForKey = allForKey.filter(function (item) {
                return item !== callback;
            });
            callbacks[key] = allForKey;
        };
    }
    function execute(key) {
        var argumentsArr = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            argumentsArr[_i - 1] = arguments[_i];
        }
        var callbacksForKey = callbacks[key];
        if (!callbacksForKey || callbacksForKey.length === 0) {
            return [];
        }
        var results = [];
        callbacksForKey.forEach(function (callback) {
            try {
                var result = callback.apply(undefined, argumentsArr);
                results.push(result);
            }
            catch (err) {
                results.push(undefined);
            }
        });
        return results;
    }
    function clear() {
        callbacks = {};
    }
    return {
        add: add,
        execute: execute,
        clear: clear
    };
}
;
createRegistry.default = createRegistry;
module.exports = createRegistry;
//# sourceMappingURL=index.js.map

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var CallbackFactory = __webpack_require__(0);
var WindowStore = (function () {
    function WindowStore() {
        this._windows = {};
        this._registry = CallbackFactory();
    }
    WindowStore.prototype.get = function (id) {
        return this._windows[id];
    };
    Object.defineProperty(WindowStore.prototype, "list", {
        get: function () {
            return this._windows;
        },
        enumerable: true,
        configurable: true
    });
    WindowStore.prototype.add = function (window) {
        var isExist = this._windows[window.API.id] ? true : false;
        if (isExist) {
            // logger window with such id already exists
            return;
        }
        this._windows[window.API.id] = window;
        this._registry.execute("on-added", window);
    };
    WindowStore.prototype.remove = function (window) {
        delete this._windows[window.API.id];
        this._registry.execute("on-removed", window);
    };
    WindowStore.prototype.readyToShow = function (window) {
        this._registry.execute("on-ready", this._windows[window.API.id]);
    };
    WindowStore.prototype.onReadyWindow = function (callback) {
        return this._registry.add("on-ready", callback);
    };
    WindowStore.prototype.onAdded = function (callback) {
        return this._registry.add("on-added", callback);
    };
    WindowStore.prototype.onRemoved = function (callback) {
        return this._registry.add("on-removed", callback);
    };
    return WindowStore;
}());
exports.WindowStore = WindowStore;
exports.default = new WindowStore();
//# sourceMappingURL=store.js.map

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = {"name":"tick42-windows","version":"3.4.5","description":"A windowing API for the Tick42 HTML Container","main":"dist/node/tick42-windows.js","browser":"dist/web/tick42-windows.js","types":"types/index.d.ts","docName":"Windows","scripts":{"clean":"node ./build/scripts/clean.js","pre:build":"npm run tslint && tsc && set NODE_ENV=development && npm run clean","file-versionify":"node ./build/scripts/file-versionify.js","tslint":"tslint -t codeFrame ./src/**/*.ts","tslint:fix":"tslint -t codeFrame --fix ./src/**/*.ts","watch":"onchange ./src/**/*.ts -- npm run build:dev","build:dev":"npm run pre:build && set NODE_ENV=development && webpack && npm run file-versionify && npm run types","build:prod":"npm run pre:build && set NODE_ENV=development && webpack && set NODE_ENV=production && webpack && npm run file-versionify && npm run types","docs":"typedoc --options typedoc.json ./src","types":"node ./build/scripts/copy-types.js","types:merged":"dts-generator --project ./ --out ./types/index.d.ts","prepublish":"npm run build:prod"},"author":"Tick42","license":"ISC","precommit":"tslint:fix","devDependencies":{"@types/node":"^8.0.23","@types/tick42-agm":"*","@types/tick42-logger":"^3.0.6","@types/tick42-gateway-connection":"*","callback-registry":"^2.3.1","es6-promise":"^4.1.0","onchange":"3.*","pre-commit":"^1.1.3","shelljs":"^0.6.0","tick42-webpack-config":"*","tslint":"^5.6.0","typescript":"^2.4.2","webpack":"2.3.3"},"dependencies":{}}

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var hc_1 = __webpack_require__(9);
exports.default = function (agm, logger) {
    var _logger = logger;
    return new Promise(function (resolve, reject) {
        if (window.htmlContainer) {
            // We are running in HC
            _logger.trace("running in HC");
            hc_1.default(agm, _logger, window.htmlContainer.containerName, window.htmlContainer.windowId)
                .then(resolve)
                .catch(reject);
        }
        else {
            // We are running in Browser or Node, we should check which stream is available
            // But we need to pass the container as dependency
            var hcPromise = hc_1.default(agm, _logger);
            var wait = function (ms) { return new Promise(function (res, rej) { return setTimeout(function () { rej("timeout waiting for streams"); }, ms); }); };
            Promise.race([hcPromise, wait(10000)])
                .then(resolve)
                .catch(reject);
        }
    });
};
//# sourceMappingURL=detector.js.map

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var CallbackFactory = __webpack_require__(0);
var group_1 = __webpack_require__(10);
var store_1 = __webpack_require__(1);
exports.default = function (environment, logger) {
    var _logger = logger.subLogger("groups");
    var _registry = CallbackFactory();
    var _groups = {};
    // Getting already existing windows and create Group API for each window
    var windows = store_1.default.list;
    Object.keys(windows).forEach(function (k) {
        addNewWindow(windows[k]);
    });
    environment.onCompositionChanged(function (windowInfo) {
        handleCompositionChanged(windowInfo);
    });
    environment.onGroupHeaderVisibilityChanged(function (windowInfo) {
        var group = findGroupByWindow(windowInfo);
        if (typeof group !== "undefined") {
            var groupEvents = _groups[group.id];
            groupEvents.groupInternal.handleGroupHeaderVisibilityChanged(windowInfo);
        }
    });
    store_1.default.onAdded(function (win) {
        addNewWindow(win);
    });
    store_1.default.onRemoved(function (win) {
        removeWindow(win);
    });
    // Methods
    function my() {
        return findGroupByWindow(environment.my());
    }
    function list(success) {
        var result = Object.keys(_groups).map(function (groupId) {
            if (_groups[groupId]) {
                return _groups[groupId].groupAPI;
            }
        });
        if (typeof success === "function") {
            success(result);
        }
        return result;
    }
    function findGroupByWindow(winId, success) {
        var windowId;
        if (typeof winId === "string") {
            windowId = winId;
        }
        else {
            windowId = winId.id;
        }
        var groupFound;
        Object.keys(_groups).forEach(function (groupId) {
            var group = _groups[groupId].groupAPI;
            if (group.find(windowId) !== undefined) {
                groupFound = group;
                return;
            }
        });
        if (typeof success === "function") {
            success(groupFound);
        }
        return groupFound;
    }
    // Events
    function onWindowMoved(callback) {
        return _registry.add("window-moved", callback);
    }
    // Private
    function createOrGetGroup(groupId) {
        if (!_groups.hasOwnProperty(groupId)) {
            var createdGroup = group_1.default(groupId, environment.executor);
            _groups[groupId] = createdGroup;
            return createdGroup;
        }
        else {
            return _groups[groupId];
        }
    }
    function deleteGroup(groupId) {
        if (_groups.hasOwnProperty(groupId) && typeof _groups[groupId] !== "undefined") {
            if (_groups[groupId].groupAPI.windows.length === 0) {
                delete _groups[groupId];
            }
        }
    }
    function addNewWindow(win) {
        _logger.trace("Adding new window " + win.API.id + " to win.API.groupId " + win.API.groupId);
        var group = addWindow(win);
        if (group) {
            _logger.trace("handleGroupAssociation " + win.API.id + " to group.groupAPI.id " + group.groupAPI.id);
            win.Events.handleGroupAssociation(group.groupAPI);
        }
    }
    function addWindow(win, groupId) {
        var windowGroupId = groupId || win.API.groupId;
        var windowId = win.API.id;
        if (typeof windowGroupId === "undefined" || typeof windowId === "undefined") {
            _logger.debug("trying to add a window without group - winId: " + windowId);
            return;
        }
        var group = createOrGetGroup(windowGroupId);
        group.groupInternal.addWindow(windowId);
        return group;
    }
    function removeWindow(win, groupId) {
        var windowId = win.API.id;
        var windowGroupId = groupId || win.API.groupId;
        if (typeof windowGroupId !== "undefined") {
            var group = _groups[windowGroupId];
            group.groupInternal.removeWindow(windowId);
            win.Events.handleGroupAssociation(undefined);
            deleteGroup(windowGroupId);
        }
    }
    function handleCompositionChanged(windowInfo) {
        var newGroupId = windowInfo.groupId;
        var windowId = windowInfo.windowId;
        var oldGroup = findGroupByWindow(windowId);
        var oldGroupId = oldGroup ? oldGroup.id : undefined;
        _logger.trace("handleCompositionChanged newGroupId: " + newGroupId + " windowId: " + windowId + " oldGroup: " + oldGroupId);
        if (oldGroupId === newGroupId) {
            _logger.trace("handleCompositionChanged newGroupId: " + newGroupId + " windowId: " + windowId + " oldGroup: " + oldGroupId + " are the same - returning...");
            return;
        }
        var win = store_1.default.get(windowId);
        var newGroup = addWindow(win, newGroupId);
        win.Events.handleGroupChanged(newGroup.groupAPI, oldGroup);
        if (oldGroup) {
            removeWindow(win, oldGroupId);
            _registry.execute("window-moved", windowId, oldGroup, newGroupId);
        }
    }
    //#region "API"
    var groups = {
        get my() {
            return my();
        },
        list: list,
        findGroupByWindow: findGroupByWindow,
    };
    //#endregion "API
    var events = { onWindowMoved: onWindowMoved };
    return {
        groupsAPI: groups,
        groupsEvents: events,
    };
};
//# sourceMappingURL=groups.js.map

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process, global) {var require;/*!
 * @overview es6-promise - a tiny implementation of Promises/A+.
 * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
 * @license   Licensed under MIT license
 *            See https://raw.githubusercontent.com/stefanpenner/es6-promise/master/LICENSE
 * @version   4.1.1
 */

(function (global, factory) {
	 true ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.ES6Promise = factory());
}(this, (function () { 'use strict';

function objectOrFunction(x) {
  var type = typeof x;
  return x !== null && (type === 'object' || type === 'function');
}

function isFunction(x) {
  return typeof x === 'function';
}

var _isArray = undefined;
if (Array.isArray) {
  _isArray = Array.isArray;
} else {
  _isArray = function (x) {
    return Object.prototype.toString.call(x) === '[object Array]';
  };
}

var isArray = _isArray;

var len = 0;
var vertxNext = undefined;
var customSchedulerFn = undefined;

var asap = function asap(callback, arg) {
  queue[len] = callback;
  queue[len + 1] = arg;
  len += 2;
  if (len === 2) {
    // If len is 2, that means that we need to schedule an async flush.
    // If additional callbacks are queued before the queue is flushed, they
    // will be processed by this flush that we are scheduling.
    if (customSchedulerFn) {
      customSchedulerFn(flush);
    } else {
      scheduleFlush();
    }
  }
};

function setScheduler(scheduleFn) {
  customSchedulerFn = scheduleFn;
}

function setAsap(asapFn) {
  asap = asapFn;
}

var browserWindow = typeof window !== 'undefined' ? window : undefined;
var browserGlobal = browserWindow || {};
var BrowserMutationObserver = browserGlobal.MutationObserver || browserGlobal.WebKitMutationObserver;
var isNode = typeof self === 'undefined' && typeof process !== 'undefined' && ({}).toString.call(process) === '[object process]';

// test for web worker but not in IE10
var isWorker = typeof Uint8ClampedArray !== 'undefined' && typeof importScripts !== 'undefined' && typeof MessageChannel !== 'undefined';

// node
function useNextTick() {
  // node version 0.10.x displays a deprecation warning when nextTick is used recursively
  // see https://github.com/cujojs/when/issues/410 for details
  return function () {
    return process.nextTick(flush);
  };
}

// vertx
function useVertxTimer() {
  if (typeof vertxNext !== 'undefined') {
    return function () {
      vertxNext(flush);
    };
  }

  return useSetTimeout();
}

function useMutationObserver() {
  var iterations = 0;
  var observer = new BrowserMutationObserver(flush);
  var node = document.createTextNode('');
  observer.observe(node, { characterData: true });

  return function () {
    node.data = iterations = ++iterations % 2;
  };
}

// web worker
function useMessageChannel() {
  var channel = new MessageChannel();
  channel.port1.onmessage = flush;
  return function () {
    return channel.port2.postMessage(0);
  };
}

function useSetTimeout() {
  // Store setTimeout reference so es6-promise will be unaffected by
  // other code modifying setTimeout (like sinon.useFakeTimers())
  var globalSetTimeout = setTimeout;
  return function () {
    return globalSetTimeout(flush, 1);
  };
}

var queue = new Array(1000);
function flush() {
  for (var i = 0; i < len; i += 2) {
    var callback = queue[i];
    var arg = queue[i + 1];

    callback(arg);

    queue[i] = undefined;
    queue[i + 1] = undefined;
  }

  len = 0;
}

function attemptVertx() {
  try {
    var r = require;
    var vertx = __webpack_require__(13);
    vertxNext = vertx.runOnLoop || vertx.runOnContext;
    return useVertxTimer();
  } catch (e) {
    return useSetTimeout();
  }
}

var scheduleFlush = undefined;
// Decide what async method to use to triggering processing of queued callbacks:
if (isNode) {
  scheduleFlush = useNextTick();
} else if (BrowserMutationObserver) {
  scheduleFlush = useMutationObserver();
} else if (isWorker) {
  scheduleFlush = useMessageChannel();
} else if (browserWindow === undefined && "function" === 'function') {
  scheduleFlush = attemptVertx();
} else {
  scheduleFlush = useSetTimeout();
}

function then(onFulfillment, onRejection) {
  var _arguments = arguments;

  var parent = this;

  var child = new this.constructor(noop);

  if (child[PROMISE_ID] === undefined) {
    makePromise(child);
  }

  var _state = parent._state;

  if (_state) {
    (function () {
      var callback = _arguments[_state - 1];
      asap(function () {
        return invokeCallback(_state, child, callback, parent._result);
      });
    })();
  } else {
    subscribe(parent, child, onFulfillment, onRejection);
  }

  return child;
}

/**
  `Promise.resolve` returns a promise that will become resolved with the
  passed `value`. It is shorthand for the following:

  ```javascript
  let promise = new Promise(function(resolve, reject){
    resolve(1);
  });

  promise.then(function(value){
    // value === 1
  });
  ```

  Instead of writing the above, your code now simply becomes the following:

  ```javascript
  let promise = Promise.resolve(1);

  promise.then(function(value){
    // value === 1
  });
  ```

  @method resolve
  @static
  @param {Any} value value that the returned promise will be resolved with
  Useful for tooling.
  @return {Promise} a promise that will become fulfilled with the given
  `value`
*/
function resolve$1(object) {
  /*jshint validthis:true */
  var Constructor = this;

  if (object && typeof object === 'object' && object.constructor === Constructor) {
    return object;
  }

  var promise = new Constructor(noop);
  resolve(promise, object);
  return promise;
}

var PROMISE_ID = Math.random().toString(36).substring(16);

function noop() {}

var PENDING = void 0;
var FULFILLED = 1;
var REJECTED = 2;

var GET_THEN_ERROR = new ErrorObject();

function selfFulfillment() {
  return new TypeError("You cannot resolve a promise with itself");
}

function cannotReturnOwn() {
  return new TypeError('A promises callback cannot return that same promise.');
}

function getThen(promise) {
  try {
    return promise.then;
  } catch (error) {
    GET_THEN_ERROR.error = error;
    return GET_THEN_ERROR;
  }
}

function tryThen(then$$1, value, fulfillmentHandler, rejectionHandler) {
  try {
    then$$1.call(value, fulfillmentHandler, rejectionHandler);
  } catch (e) {
    return e;
  }
}

function handleForeignThenable(promise, thenable, then$$1) {
  asap(function (promise) {
    var sealed = false;
    var error = tryThen(then$$1, thenable, function (value) {
      if (sealed) {
        return;
      }
      sealed = true;
      if (thenable !== value) {
        resolve(promise, value);
      } else {
        fulfill(promise, value);
      }
    }, function (reason) {
      if (sealed) {
        return;
      }
      sealed = true;

      reject(promise, reason);
    }, 'Settle: ' + (promise._label || ' unknown promise'));

    if (!sealed && error) {
      sealed = true;
      reject(promise, error);
    }
  }, promise);
}

function handleOwnThenable(promise, thenable) {
  if (thenable._state === FULFILLED) {
    fulfill(promise, thenable._result);
  } else if (thenable._state === REJECTED) {
    reject(promise, thenable._result);
  } else {
    subscribe(thenable, undefined, function (value) {
      return resolve(promise, value);
    }, function (reason) {
      return reject(promise, reason);
    });
  }
}

function handleMaybeThenable(promise, maybeThenable, then$$1) {
  if (maybeThenable.constructor === promise.constructor && then$$1 === then && maybeThenable.constructor.resolve === resolve$1) {
    handleOwnThenable(promise, maybeThenable);
  } else {
    if (then$$1 === GET_THEN_ERROR) {
      reject(promise, GET_THEN_ERROR.error);
      GET_THEN_ERROR.error = null;
    } else if (then$$1 === undefined) {
      fulfill(promise, maybeThenable);
    } else if (isFunction(then$$1)) {
      handleForeignThenable(promise, maybeThenable, then$$1);
    } else {
      fulfill(promise, maybeThenable);
    }
  }
}

function resolve(promise, value) {
  if (promise === value) {
    reject(promise, selfFulfillment());
  } else if (objectOrFunction(value)) {
    handleMaybeThenable(promise, value, getThen(value));
  } else {
    fulfill(promise, value);
  }
}

function publishRejection(promise) {
  if (promise._onerror) {
    promise._onerror(promise._result);
  }

  publish(promise);
}

function fulfill(promise, value) {
  if (promise._state !== PENDING) {
    return;
  }

  promise._result = value;
  promise._state = FULFILLED;

  if (promise._subscribers.length !== 0) {
    asap(publish, promise);
  }
}

function reject(promise, reason) {
  if (promise._state !== PENDING) {
    return;
  }
  promise._state = REJECTED;
  promise._result = reason;

  asap(publishRejection, promise);
}

function subscribe(parent, child, onFulfillment, onRejection) {
  var _subscribers = parent._subscribers;
  var length = _subscribers.length;

  parent._onerror = null;

  _subscribers[length] = child;
  _subscribers[length + FULFILLED] = onFulfillment;
  _subscribers[length + REJECTED] = onRejection;

  if (length === 0 && parent._state) {
    asap(publish, parent);
  }
}

function publish(promise) {
  var subscribers = promise._subscribers;
  var settled = promise._state;

  if (subscribers.length === 0) {
    return;
  }

  var child = undefined,
      callback = undefined,
      detail = promise._result;

  for (var i = 0; i < subscribers.length; i += 3) {
    child = subscribers[i];
    callback = subscribers[i + settled];

    if (child) {
      invokeCallback(settled, child, callback, detail);
    } else {
      callback(detail);
    }
  }

  promise._subscribers.length = 0;
}

function ErrorObject() {
  this.error = null;
}

var TRY_CATCH_ERROR = new ErrorObject();

function tryCatch(callback, detail) {
  try {
    return callback(detail);
  } catch (e) {
    TRY_CATCH_ERROR.error = e;
    return TRY_CATCH_ERROR;
  }
}

function invokeCallback(settled, promise, callback, detail) {
  var hasCallback = isFunction(callback),
      value = undefined,
      error = undefined,
      succeeded = undefined,
      failed = undefined;

  if (hasCallback) {
    value = tryCatch(callback, detail);

    if (value === TRY_CATCH_ERROR) {
      failed = true;
      error = value.error;
      value.error = null;
    } else {
      succeeded = true;
    }

    if (promise === value) {
      reject(promise, cannotReturnOwn());
      return;
    }
  } else {
    value = detail;
    succeeded = true;
  }

  if (promise._state !== PENDING) {
    // noop
  } else if (hasCallback && succeeded) {
      resolve(promise, value);
    } else if (failed) {
      reject(promise, error);
    } else if (settled === FULFILLED) {
      fulfill(promise, value);
    } else if (settled === REJECTED) {
      reject(promise, value);
    }
}

function initializePromise(promise, resolver) {
  try {
    resolver(function resolvePromise(value) {
      resolve(promise, value);
    }, function rejectPromise(reason) {
      reject(promise, reason);
    });
  } catch (e) {
    reject(promise, e);
  }
}

var id = 0;
function nextId() {
  return id++;
}

function makePromise(promise) {
  promise[PROMISE_ID] = id++;
  promise._state = undefined;
  promise._result = undefined;
  promise._subscribers = [];
}

function Enumerator$1(Constructor, input) {
  this._instanceConstructor = Constructor;
  this.promise = new Constructor(noop);

  if (!this.promise[PROMISE_ID]) {
    makePromise(this.promise);
  }

  if (isArray(input)) {
    this.length = input.length;
    this._remaining = input.length;

    this._result = new Array(this.length);

    if (this.length === 0) {
      fulfill(this.promise, this._result);
    } else {
      this.length = this.length || 0;
      this._enumerate(input);
      if (this._remaining === 0) {
        fulfill(this.promise, this._result);
      }
    }
  } else {
    reject(this.promise, validationError());
  }
}

function validationError() {
  return new Error('Array Methods must be provided an Array');
}

Enumerator$1.prototype._enumerate = function (input) {
  for (var i = 0; this._state === PENDING && i < input.length; i++) {
    this._eachEntry(input[i], i);
  }
};

Enumerator$1.prototype._eachEntry = function (entry, i) {
  var c = this._instanceConstructor;
  var resolve$$1 = c.resolve;

  if (resolve$$1 === resolve$1) {
    var _then = getThen(entry);

    if (_then === then && entry._state !== PENDING) {
      this._settledAt(entry._state, i, entry._result);
    } else if (typeof _then !== 'function') {
      this._remaining--;
      this._result[i] = entry;
    } else if (c === Promise$2) {
      var promise = new c(noop);
      handleMaybeThenable(promise, entry, _then);
      this._willSettleAt(promise, i);
    } else {
      this._willSettleAt(new c(function (resolve$$1) {
        return resolve$$1(entry);
      }), i);
    }
  } else {
    this._willSettleAt(resolve$$1(entry), i);
  }
};

Enumerator$1.prototype._settledAt = function (state, i, value) {
  var promise = this.promise;

  if (promise._state === PENDING) {
    this._remaining--;

    if (state === REJECTED) {
      reject(promise, value);
    } else {
      this._result[i] = value;
    }
  }

  if (this._remaining === 0) {
    fulfill(promise, this._result);
  }
};

Enumerator$1.prototype._willSettleAt = function (promise, i) {
  var enumerator = this;

  subscribe(promise, undefined, function (value) {
    return enumerator._settledAt(FULFILLED, i, value);
  }, function (reason) {
    return enumerator._settledAt(REJECTED, i, reason);
  });
};

/**
  `Promise.all` accepts an array of promises, and returns a new promise which
  is fulfilled with an array of fulfillment values for the passed promises, or
  rejected with the reason of the first passed promise to be rejected. It casts all
  elements of the passed iterable to promises as it runs this algorithm.

  Example:

  ```javascript
  let promise1 = resolve(1);
  let promise2 = resolve(2);
  let promise3 = resolve(3);
  let promises = [ promise1, promise2, promise3 ];

  Promise.all(promises).then(function(array){
    // The array here would be [ 1, 2, 3 ];
  });
  ```

  If any of the `promises` given to `all` are rejected, the first promise
  that is rejected will be given as an argument to the returned promises's
  rejection handler. For example:

  Example:

  ```javascript
  let promise1 = resolve(1);
  let promise2 = reject(new Error("2"));
  let promise3 = reject(new Error("3"));
  let promises = [ promise1, promise2, promise3 ];

  Promise.all(promises).then(function(array){
    // Code here never runs because there are rejected promises!
  }, function(error) {
    // error.message === "2"
  });
  ```

  @method all
  @static
  @param {Array} entries array of promises
  @param {String} label optional string for labeling the promise.
  Useful for tooling.
  @return {Promise} promise that is fulfilled when all `promises` have been
  fulfilled, or rejected if any of them become rejected.
  @static
*/
function all$1(entries) {
  return new Enumerator$1(this, entries).promise;
}

/**
  `Promise.race` returns a new promise which is settled in the same way as the
  first passed promise to settle.

  Example:

  ```javascript
  let promise1 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 1');
    }, 200);
  });

  let promise2 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 2');
    }, 100);
  });

  Promise.race([promise1, promise2]).then(function(result){
    // result === 'promise 2' because it was resolved before promise1
    // was resolved.
  });
  ```

  `Promise.race` is deterministic in that only the state of the first
  settled promise matters. For example, even if other promises given to the
  `promises` array argument are resolved, but the first settled promise has
  become rejected before the other promises became fulfilled, the returned
  promise will become rejected:

  ```javascript
  let promise1 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 1');
    }, 200);
  });

  let promise2 = new Promise(function(resolve, reject){
    setTimeout(function(){
      reject(new Error('promise 2'));
    }, 100);
  });

  Promise.race([promise1, promise2]).then(function(result){
    // Code here never runs
  }, function(reason){
    // reason.message === 'promise 2' because promise 2 became rejected before
    // promise 1 became fulfilled
  });
  ```

  An example real-world use case is implementing timeouts:

  ```javascript
  Promise.race([ajax('foo.json'), timeout(5000)])
  ```

  @method race
  @static
  @param {Array} promises array of promises to observe
  Useful for tooling.
  @return {Promise} a promise which settles in the same way as the first passed
  promise to settle.
*/
function race$1(entries) {
  /*jshint validthis:true */
  var Constructor = this;

  if (!isArray(entries)) {
    return new Constructor(function (_, reject) {
      return reject(new TypeError('You must pass an array to race.'));
    });
  } else {
    return new Constructor(function (resolve, reject) {
      var length = entries.length;
      for (var i = 0; i < length; i++) {
        Constructor.resolve(entries[i]).then(resolve, reject);
      }
    });
  }
}

/**
  `Promise.reject` returns a promise rejected with the passed `reason`.
  It is shorthand for the following:

  ```javascript
  let promise = new Promise(function(resolve, reject){
    reject(new Error('WHOOPS'));
  });

  promise.then(function(value){
    // Code here doesn't run because the promise is rejected!
  }, function(reason){
    // reason.message === 'WHOOPS'
  });
  ```

  Instead of writing the above, your code now simply becomes the following:

  ```javascript
  let promise = Promise.reject(new Error('WHOOPS'));

  promise.then(function(value){
    // Code here doesn't run because the promise is rejected!
  }, function(reason){
    // reason.message === 'WHOOPS'
  });
  ```

  @method reject
  @static
  @param {Any} reason value that the returned promise will be rejected with.
  Useful for tooling.
  @return {Promise} a promise rejected with the given `reason`.
*/
function reject$1(reason) {
  /*jshint validthis:true */
  var Constructor = this;
  var promise = new Constructor(noop);
  reject(promise, reason);
  return promise;
}

function needsResolver() {
  throw new TypeError('You must pass a resolver function as the first argument to the promise constructor');
}

function needsNew() {
  throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
}

/**
  Promise objects represent the eventual result of an asynchronous operation. The
  primary way of interacting with a promise is through its `then` method, which
  registers callbacks to receive either a promise's eventual value or the reason
  why the promise cannot be fulfilled.

  Terminology
  -----------

  - `promise` is an object or function with a `then` method whose behavior conforms to this specification.
  - `thenable` is an object or function that defines a `then` method.
  - `value` is any legal JavaScript value (including undefined, a thenable, or a promise).
  - `exception` is a value that is thrown using the throw statement.
  - `reason` is a value that indicates why a promise was rejected.
  - `settled` the final resting state of a promise, fulfilled or rejected.

  A promise can be in one of three states: pending, fulfilled, or rejected.

  Promises that are fulfilled have a fulfillment value and are in the fulfilled
  state.  Promises that are rejected have a rejection reason and are in the
  rejected state.  A fulfillment value is never a thenable.

  Promises can also be said to *resolve* a value.  If this value is also a
  promise, then the original promise's settled state will match the value's
  settled state.  So a promise that *resolves* a promise that rejects will
  itself reject, and a promise that *resolves* a promise that fulfills will
  itself fulfill.


  Basic Usage:
  ------------

  ```js
  let promise = new Promise(function(resolve, reject) {
    // on success
    resolve(value);

    // on failure
    reject(reason);
  });

  promise.then(function(value) {
    // on fulfillment
  }, function(reason) {
    // on rejection
  });
  ```

  Advanced Usage:
  ---------------

  Promises shine when abstracting away asynchronous interactions such as
  `XMLHttpRequest`s.

  ```js
  function getJSON(url) {
    return new Promise(function(resolve, reject){
      let xhr = new XMLHttpRequest();

      xhr.open('GET', url);
      xhr.onreadystatechange = handler;
      xhr.responseType = 'json';
      xhr.setRequestHeader('Accept', 'application/json');
      xhr.send();

      function handler() {
        if (this.readyState === this.DONE) {
          if (this.status === 200) {
            resolve(this.response);
          } else {
            reject(new Error('getJSON: `' + url + '` failed with status: [' + this.status + ']'));
          }
        }
      };
    });
  }

  getJSON('/posts.json').then(function(json) {
    // on fulfillment
  }, function(reason) {
    // on rejection
  });
  ```

  Unlike callbacks, promises are great composable primitives.

  ```js
  Promise.all([
    getJSON('/posts'),
    getJSON('/comments')
  ]).then(function(values){
    values[0] // => postsJSON
    values[1] // => commentsJSON

    return values;
  });
  ```

  @class Promise
  @param {function} resolver
  Useful for tooling.
  @constructor
*/
function Promise$2(resolver) {
  this[PROMISE_ID] = nextId();
  this._result = this._state = undefined;
  this._subscribers = [];

  if (noop !== resolver) {
    typeof resolver !== 'function' && needsResolver();
    this instanceof Promise$2 ? initializePromise(this, resolver) : needsNew();
  }
}

Promise$2.all = all$1;
Promise$2.race = race$1;
Promise$2.resolve = resolve$1;
Promise$2.reject = reject$1;
Promise$2._setScheduler = setScheduler;
Promise$2._setAsap = setAsap;
Promise$2._asap = asap;

Promise$2.prototype = {
  constructor: Promise$2,

  /**
    The primary way of interacting with a promise is through its `then` method,
    which registers callbacks to receive either a promise's eventual value or the
    reason why the promise cannot be fulfilled.
  
    ```js
    findUser().then(function(user){
      // user is available
    }, function(reason){
      // user is unavailable, and you are given the reason why
    });
    ```
  
    Chaining
    --------
  
    The return value of `then` is itself a promise.  This second, 'downstream'
    promise is resolved with the return value of the first promise's fulfillment
    or rejection handler, or rejected if the handler throws an exception.
  
    ```js
    findUser().then(function (user) {
      return user.name;
    }, function (reason) {
      return 'default name';
    }).then(function (userName) {
      // If `findUser` fulfilled, `userName` will be the user's name, otherwise it
      // will be `'default name'`
    });
  
    findUser().then(function (user) {
      throw new Error('Found user, but still unhappy');
    }, function (reason) {
      throw new Error('`findUser` rejected and we're unhappy');
    }).then(function (value) {
      // never reached
    }, function (reason) {
      // if `findUser` fulfilled, `reason` will be 'Found user, but still unhappy'.
      // If `findUser` rejected, `reason` will be '`findUser` rejected and we're unhappy'.
    });
    ```
    If the downstream promise does not specify a rejection handler, rejection reasons will be propagated further downstream.
  
    ```js
    findUser().then(function (user) {
      throw new PedagogicalException('Upstream error');
    }).then(function (value) {
      // never reached
    }).then(function (value) {
      // never reached
    }, function (reason) {
      // The `PedgagocialException` is propagated all the way down to here
    });
    ```
  
    Assimilation
    ------------
  
    Sometimes the value you want to propagate to a downstream promise can only be
    retrieved asynchronously. This can be achieved by returning a promise in the
    fulfillment or rejection handler. The downstream promise will then be pending
    until the returned promise is settled. This is called *assimilation*.
  
    ```js
    findUser().then(function (user) {
      return findCommentsByAuthor(user);
    }).then(function (comments) {
      // The user's comments are now available
    });
    ```
  
    If the assimliated promise rejects, then the downstream promise will also reject.
  
    ```js
    findUser().then(function (user) {
      return findCommentsByAuthor(user);
    }).then(function (comments) {
      // If `findCommentsByAuthor` fulfills, we'll have the value here
    }, function (reason) {
      // If `findCommentsByAuthor` rejects, we'll have the reason here
    });
    ```
  
    Simple Example
    --------------
  
    Synchronous Example
  
    ```javascript
    let result;
  
    try {
      result = findResult();
      // success
    } catch(reason) {
      // failure
    }
    ```
  
    Errback Example
  
    ```js
    findResult(function(result, err){
      if (err) {
        // failure
      } else {
        // success
      }
    });
    ```
  
    Promise Example;
  
    ```javascript
    findResult().then(function(result){
      // success
    }, function(reason){
      // failure
    });
    ```
  
    Advanced Example
    --------------
  
    Synchronous Example
  
    ```javascript
    let author, books;
  
    try {
      author = findAuthor();
      books  = findBooksByAuthor(author);
      // success
    } catch(reason) {
      // failure
    }
    ```
  
    Errback Example
  
    ```js
  
    function foundBooks(books) {
  
    }
  
    function failure(reason) {
  
    }
  
    findAuthor(function(author, err){
      if (err) {
        failure(err);
        // failure
      } else {
        try {
          findBoooksByAuthor(author, function(books, err) {
            if (err) {
              failure(err);
            } else {
              try {
                foundBooks(books);
              } catch(reason) {
                failure(reason);
              }
            }
          });
        } catch(error) {
          failure(err);
        }
        // success
      }
    });
    ```
  
    Promise Example;
  
    ```javascript
    findAuthor().
      then(findBooksByAuthor).
      then(function(books){
        // found books
    }).catch(function(reason){
      // something went wrong
    });
    ```
  
    @method then
    @param {Function} onFulfilled
    @param {Function} onRejected
    Useful for tooling.
    @return {Promise}
  */
  then: then,

  /**
    `catch` is simply sugar for `then(undefined, onRejection)` which makes it the same
    as the catch block of a try/catch statement.
  
    ```js
    function findAuthor(){
      throw new Error('couldn't find that author');
    }
  
    // synchronous
    try {
      findAuthor();
    } catch(reason) {
      // something went wrong
    }
  
    // async with promises
    findAuthor().catch(function(reason){
      // something went wrong
    });
    ```
  
    @method catch
    @param {Function} onRejection
    Useful for tooling.
    @return {Promise}
  */
  'catch': function _catch(onRejection) {
    return this.then(null, onRejection);
  }
};

/*global self*/
function polyfill$1() {
    var local = undefined;

    if (typeof global !== 'undefined') {
        local = global;
    } else if (typeof self !== 'undefined') {
        local = self;
    } else {
        try {
            local = Function('return this')();
        } catch (e) {
            throw new Error('polyfill failed because global object is unavailable in this environment');
        }
    }

    var P = local.Promise;

    if (P) {
        var promiseToString = null;
        try {
            promiseToString = Object.prototype.toString.call(P.resolve());
        } catch (e) {
            // silently ignored
        }

        if (promiseToString === '[object Promise]' && !P.cast) {
            return;
        }
    }

    local.Promise = Promise$2;
}

// Strange compat..
Promise$2.polyfill = polyfill$1;
Promise$2.Promise = Promise$2;

return Promise$2;

})));

//# sourceMappingURL=es6-promise.map

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6), __webpack_require__(7)))

/***/ }),
/* 6 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 7 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var HcExecutor = (function () {
    function HcExecutor() {
    }
    Object.defineProperty(HcExecutor.prototype, "application", {
        get: function () {
            return "HtmlContainer";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HcExecutor.prototype, "hostInstance", {
        get: function () {
            return this.agmTarget;
        },
        enumerable: true,
        configurable: true
    });
    HcExecutor.prototype.init = function (agm, instance) {
        this.agm = agm;
        this.agmTarget = instance;
    };
    HcExecutor.prototype.close = function (resultWindow) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var conditionFunc = function () {
                return resultWindow.url === undefined;
            };
            function successHandler(w) {
                resolve(w);
            }
            function errorHandler(e) {
                reject(e);
            }
            return _this.agmAction(resultWindow, "T42.Wnd.Close", successHandler, errorHandler, {}, conditionFunc, resultWindow.onClose);
        });
    };
    HcExecutor.prototype.navigate = function (resultWindow, newUrl) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var conditionFunc = function () {
                return resultWindow.url === newUrl;
            };
            function successHandler(w) {
                resolve(w);
            }
            function errorHandler(e) {
                reject(e);
            }
            return _this.agmAction(resultWindow, "T42.Html.OpenUrl", successHandler, errorHandler, { url: newUrl }, conditionFunc, resultWindow.onUrlChanged, true);
        });
    };
    HcExecutor.prototype.setStyle = function (resultWindow, style) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            function successHandler(w) {
                resolve(w);
            }
            function errorHandler(e) {
                reject(e);
            }
            return _this.agmAction(resultWindow, "T42.Wnd.SetWindowStyle", successHandler, errorHandler, { windowStyleAttributes: JSON.stringify(style) });
        });
    };
    HcExecutor.prototype.setTitle = function (resultWindow, newTitle) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var conditionFunc = function () {
                return resultWindow.title === newTitle;
            };
            function successHandler(w) {
                resolve(w);
            }
            function errorHandler(e) {
                reject(e);
            }
            return _this.agmAction(resultWindow, "T42.Wnd.SetWindowTitle", successHandler, errorHandler, { title: newTitle }, conditionFunc, resultWindow.onTitleChanged);
        });
    };
    HcExecutor.prototype.moveResize = function (resultWindow, dimensions) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var conditionFunc = function () {
                var b = resultWindow.bounds;
                var isSame = true;
                Object.keys(dimensions).forEach(function (key) {
                    if (dimensions[key] !== b[key]) {
                        isSame = false;
                        return;
                    }
                });
                return isSame;
            };
            function successHandler(w) {
                resolve(w);
            }
            function errorHandler(e) {
                reject(e);
            }
            return _this.agmAction(resultWindow, "T42.Wnd.ResizeAndMove", successHandler, errorHandler, dimensions, conditionFunc, resultWindow.onBoundsChanged);
        });
    };
    HcExecutor.prototype.addFrameButton = function (resultWindow, buttonInfo) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var conditionFunc = function () {
                return false;
            };
            function successHandler(w) {
                resolve(w);
            }
            function errorHandler(e) {
                reject(e);
            }
            return _this.agmAction(resultWindow, "T42.Wnd.AddFrameButton", successHandler, errorHandler, { buttonInfo: buttonInfo }, conditionFunc, resultWindow.onFrameButtonAdded);
        });
    };
    HcExecutor.prototype.removeFrameButton = function (resultWindow, buttonId) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var conditionFunc = function () {
                return false;
            };
            function successHandler(w) {
                resolve(w);
            }
            function errorHandler(e) {
                reject(e);
            }
            return _this.agmAction(resultWindow, "T42.Wnd.RemoveFrameButton", successHandler, errorHandler, { buttonId: buttonId }, conditionFunc, resultWindow.onFrameButtonRemoved);
        });
    };
    HcExecutor.prototype.activate = function (resultWindow) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var conditionFunc = function () {
                return resultWindow.isFocused;
            };
            function successHandler(w) {
                resolve(w);
            }
            function errorHandler(e) {
                reject(e);
            }
            return _this.agmAction(resultWindow, "T42.Wnd.Activate", successHandler, errorHandler, {}, conditionFunc, resultWindow.onFocusChanged);
        });
    };
    HcExecutor.prototype.focus = function (resultWindow) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var conditionFunc = function () {
                return false;
            };
            function successHandler(w) {
                resolve(w);
            }
            function errorHandler(e) {
                reject(e);
            }
            return _this.agmAction(resultWindow, "T42.Wnd.Activate", successHandler, errorHandler, { focus: true }, conditionFunc, resultWindow.onFocusChanged);
        });
    };
    HcExecutor.prototype.maximizeRestore = function (resultWindow) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            function successHandler(w) {
                resolve(w);
            }
            function errorHandler(e) {
                reject(e);
            }
            return _this.agmAction(resultWindow, "T42.Wnd.MaximizeOrRestoreDown", successHandler, errorHandler);
        });
    };
    HcExecutor.prototype.maximize = function (resultWindow) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var conditionFunc = function () {
                return resultWindow.state === "maximized";
            };
            function successHandler(w) {
                resolve(w);
            }
            function errorHandler(e) {
                reject(e);
            }
            return _this.agmAction(resultWindow, "T42.Wnd.Maximize", successHandler, errorHandler, {}, conditionFunc, resultWindow.onMaximized);
        });
    };
    HcExecutor.prototype.restore = function (resultWindow) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var conditionFunc = function () {
                return resultWindow.state === "normal";
            };
            function successHandler(w) {
                resolve(w);
            }
            function errorHandler(e) {
                reject(e);
            }
            return _this.agmAction(resultWindow, "T42.Wnd.Restore", successHandler, errorHandler, {}, conditionFunc, resultWindow.onNormal);
        });
    };
    HcExecutor.prototype.minimize = function (resultWindow) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var conditionFunc = function () {
                return resultWindow.state === "minimized";
            };
            function successHandler(w) {
                resolve(w);
            }
            function errorHandler(e) {
                reject(e);
            }
            return _this.agmAction(resultWindow, "T42.Wnd.Minimize", successHandler, errorHandler, {}, conditionFunc, resultWindow.onMinimized);
        });
    };
    HcExecutor.prototype.collapse = function (resultWindow) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var conditionFunc = function () {
                return resultWindow.isCollapsed;
            };
            function successHandler(w) {
                resolve(w);
            }
            function errorHandler(e) {
                reject(e);
            }
            return _this.agmAction(resultWindow, "T42.Wnd.SetCollapsed", successHandler, errorHandler, { collapsed: true }, conditionFunc, resultWindow.onCollapsed);
        });
    };
    HcExecutor.prototype.expand = function (resultWindow) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var conditionFunc = function () {
                return !resultWindow.isCollapsed;
            };
            function successHandler(w) {
                resolve(w);
            }
            function errorHandler(e) {
                reject(e);
            }
            return _this.agmAction(resultWindow, "T42.Wnd.SetCollapsed", successHandler, errorHandler, { collapsed: false }, conditionFunc, resultWindow.onExpanded);
        });
    };
    HcExecutor.prototype.toggleCollapse = function (resultWindow) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var conditionFunc = function () {
                return false;
            };
            function successHandler(w) {
                resolve(w);
            }
            function errorHandler(e) {
                reject(e);
            }
            var subscribeFunc = resultWindow.isCollapsed ? resultWindow.onExpanded : resultWindow.onCollapsed;
            return _this.agmAction(resultWindow, "T42.Wnd.SetCollapsed", successHandler, errorHandler, { title: "" }, conditionFunc, subscribeFunc);
        });
    };
    HcExecutor.prototype.snap = function (resultWindow, target, direction) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var sourceWindowId = resultWindow.id;
            var targetWindowId;
            var errorMessage = "Invalid target parameter - should be an object with property id or a string. Invoked for source window id:" + resultWindow.id;
            if (!target) {
                reject(errorMessage);
                return;
            }
            if (typeof target === "string") {
                targetWindowId = target;
            }
            else if (typeof target.id !== "undefined") {
                targetWindowId = target.id;
            }
            else {
                reject(errorMessage);
                return;
            }
            var args = {
                sourceWindowId: sourceWindowId,
                targetWindowId: targetWindowId,
            };
            if (direction) {
                args.snappingEdge = direction;
            }
            function successHandler(w) {
                resolve(w);
            }
            function errorHandler(e) {
                reject(e);
            }
            return _this.agmAction(resultWindow, "T42.Wnd.Snap", successHandler, errorHandler, args);
        });
    };
    HcExecutor.prototype.attachTab = function (resultWindow, tab, index) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var sourceWindowId;
            var targetWindowId = resultWindow.id;
            var errorMessage = "Invalid tab parameter - should be an object with property id or a string. Invoked for source window id:" + resultWindow.id;
            if (!tab) {
                reject(errorMessage);
                return;
            }
            if (typeof tab === "string") {
                sourceWindowId = tab;
            }
            else if (typeof tab.id !== "undefined") {
                sourceWindowId = tab.id;
            }
            else {
                reject(errorMessage);
                return;
            }
            var argsForSend = {
                sourceWindowId: sourceWindowId,
                targetWindowId: targetWindowId,
            };
            if (index) {
                argsForSend.index = index;
            }
            function successHandler(w) {
                resolve(w);
            }
            function errorHandler(e) {
                reject(e);
            }
            return _this.agmAction(resultWindow, "T42.Wnd.AttachTab", successHandler, errorHandler, argsForSend);
        });
    };
    HcExecutor.prototype.detachTab = function (resultWindow, opt) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var argsForSend = { windowId: resultWindow.id };
            var _options = opt || {};
            if (typeof _options.relativeTo !== "undefined") {
                if (typeof _options.relativeTo === "string") {
                    argsForSend.relativeTo = _options.relativeTo;
                }
                else if (typeof _options.relativeTo.id !== "undefined") {
                    argsForSend.relativeTo = _options.relativeTo.id;
                }
                if (typeof _options.relativeDirection !== "undefined") {
                    argsForSend.relativeDirection = _options.relativeDirection;
                }
                if (typeof _options.width !== "undefined") {
                    argsForSend.width = _options.width;
                }
                if (typeof _options.height !== "undefined") {
                    argsForSend.height = _options.height;
                }
            }
            if (typeof _options.bounds !== "undefined") {
                argsForSend.bounds = _options.bounds;
            }
            if (typeof _options.hideTabHeader !== "undefined") {
                argsForSend.hideTabHeader = _options.hideTabHeader;
            }
            function successHandler(w) {
                resolve(w);
            }
            function errorHandler(e) {
                reject(e);
            }
            return _this.agmAction(resultWindow, "T42.Wnd.DettachTab", successHandler, errorHandler, argsForSend);
        });
    };
    HcExecutor.prototype.setVisible = function (resultWindow, toBeVisible) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (typeof toBeVisible === "undefined") {
                toBeVisible = true;
            }
            var conditionFunc = function () {
                return resultWindow.isVisible === toBeVisible;
            };
            var styles = { Hidden: !toBeVisible };
            function successHandler(w) {
                resolve(w);
            }
            function errorHandler(e) {
                reject(e);
            }
            return _this.agmAction(resultWindow, "T42.Wnd.SetWindowStyle", successHandler, errorHandler, { windowStyleAttributes: JSON.stringify(styles) }, conditionFunc, resultWindow.onVisibilityChanged);
        });
    };
    HcExecutor.prototype.showLoader = function (resultWindow, loader) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var opt = loader || {};
            opt.enabled = true;
            opt.timeout = opt.timeout || -1; // by default show the loader forever
            var argsForSend = { loader: opt };
            function successHandler(w) {
                resolve(w);
            }
            function errorHandler(e) {
                reject(e);
            }
            return _this.agmAction(resultWindow, "T42.Wnd.UpdateLoader", successHandler, errorHandler, argsForSend);
        });
    };
    HcExecutor.prototype.hideLoader = function (resultWindow) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            function successHandler(w) {
                resolve(w);
            }
            function errorHandler(e) {
                reject(e);
            }
            return _this.agmAction(resultWindow, "T42.Wnd.UpdateLoader", successHandler, errorHandler, { loader: { enabled: false } });
        });
    };
    HcExecutor.prototype.updateContext = function (resultWindow, context) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (!context) {
                reject("Invalid context parameter - should be an object. Invoked for source window id:" + resultWindow.id);
                return;
            }
            var conditionFunc = function () {
                return false;
            };
            function successHandler(w) {
                resolve(w);
            }
            function errorHandler(e) {
                reject(e);
            }
            return _this.agmAction(resultWindow, "T42.Wnd.UpdateContext", successHandler, errorHandler, { context: context }, conditionFunc, resultWindow.onContextUpdated);
        });
    };
    HcExecutor.prototype.lock = function (resultWindow) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var conditionFunc = function () {
                return false;
            };
            function successHandler(w) {
                resolve(w);
            }
            function errorHandler(e) {
                reject(e);
            }
            return _this.agmAction(resultWindow, "T42.Wnd.Lock", successHandler, errorHandler, {}, conditionFunc, resultWindow.onLockingChanged);
        });
    };
    HcExecutor.prototype.unlock = function (resultWindow) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var conditionFunc = function () {
                return false;
            };
            function successHandler(w) {
                resolve(w);
            }
            function errorHandler(e) {
                reject(e);
            }
            return _this.agmAction(resultWindow, "T42.Wnd.Unlock", successHandler, errorHandler, {}, conditionFunc, resultWindow.onLockingChanged);
        });
    };
    // TODO fix me
    HcExecutor.prototype.getIcon = function (resultWindow) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var conditionFunc = function () {
                return resultWindow.title === "";
            };
            function successHandler(w) {
                resolve(w);
            }
            function errorHandler(e) {
                reject(e);
            }
            return _this.agmAction(resultWindow, "T42.Wnd.SetWindowTitle", successHandler, errorHandler, { title: "" }, conditionFunc, resultWindow.onTitleChanged);
        });
    };
    HcExecutor.prototype.setIcon = function (resultWindow, base64Image) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (!base64Image) {
                reject("Invalid base64Image parameter. Invoked for source window id:" + resultWindow.id);
                return;
            }
            function successHandler(w) {
                resolve(w);
            }
            function errorHandler(e) {
                reject(e);
            }
            return _this.agmAction(resultWindow, "T42.Wnd.SetIcon", successHandler, errorHandler, { base64ImageSource: base64Image });
        });
    };
    HcExecutor.prototype.setFrameColor = function (resultWindow, frameColor) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (!frameColor) {
                reject("Invalid frameColor parameter. Invoked for source window id:" + resultWindow.id);
                return;
            }
            var conditionFunc = function () {
                return false;
            };
            function successHandler(w) {
                resolve(w);
            }
            function errorHandler(e) {
                reject(e);
            }
            return _this.agmAction(resultWindow, "T42.Wnd.SetWindowStyle", successHandler, errorHandler, { windowStyleAttributes: JSON.stringify({ stickyFrameColor: frameColor }) }, conditionFunc, resultWindow.onFrameColorChanged);
        });
    };
    HcExecutor.prototype.setTabHeaderVisible = function (resultWindow, toBeTabHeaderVisible) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (typeof toBeTabHeaderVisible === "undefined") {
                toBeTabHeaderVisible = true;
            }
            var conditionFunc = function () {
                return resultWindow.isTabHeaderVisible === toBeTabHeaderVisible;
            };
            function successHandler(w) {
                resolve(w);
            }
            function errorHandler(e) {
                reject(e);
            }
            return _this.agmAction(resultWindow, "T42.Wnd.SetTabHeaderVisible", successHandler, errorHandler, { toShow: toBeTabHeaderVisible }, conditionFunc, resultWindow.onTabHeaderVisibilityChanged);
        });
    };
    HcExecutor.prototype.execute = function (command, options) {
        return this.agm.invoke("T42.Wnd.Execute", {
            command: command,
            options: options,
        });
    };
    /** Groups */
    HcExecutor.prototype.setGroupHeaderVisible = function (windowId, toShow) {
        return this.agm.invoke("T42.Wnd.SetGroupHeaderVisible", {
            windowId: windowId,
            toShow: toShow,
        }, this.agmTarget);
    };
    HcExecutor.prototype.agmAction = function (resultWindow, action, success, error, args, conditionFunc, subscribeFunc, ignoreTimeout) {
        // Stop if the window is closed
        ignoreTimeout = ignoreTimeout || false;
        if (resultWindow.url === undefined) {
            if (typeof error === "function") {
                error("Cannot execute a command on a closed window.");
            }
            return;
        }
        if (typeof conditionFunc === "undefined" || conditionFunc()) {
            this.agmInvoke(resultWindow, action, args, success, error);
        }
        else {
            var removeCallback_1 = function () {
                return;
            };
            var isResolved_1 = false;
            var successHandler = function () {
                isResolved_1 = true;
                removeCallback_1();
                if (typeof success === "function") {
                    success(resultWindow);
                }
            };
            removeCallback_1 = subscribeFunc(successHandler);
            if (!ignoreTimeout) {
                setTimeout(function () {
                    if (!isResolved_1) {
                        if (typeof error === "function") {
                            error("Agm invoke timeout! action: " + action);
                        }
                    }
                }, 2000);
            }
            this.agmInvoke(resultWindow, action, args, function () {
                return;
            }, error);
        }
    };
    HcExecutor.prototype.agmInvoke = function (resultWindow, action, args, success, error) {
        // Add the window ID to the arguments
        args = args || {};
        args.windowId = resultWindow.id;
        // Invoke the AGM method
        this.agm.invoke(action, args, this.agmTarget, {}, successHandler, errorHandler);
        function successHandler() {
            if (typeof success === "function") {
                success(resultWindow);
            }
        }
        function errorHandler(err) {
            if (typeof error === "function") {
                if (err.all_return_values && err.all_return_values.length > 0) {
                    error(err.all_return_values[0].message);
                }
                else {
                    error(err);
                }
            }
        }
    };
    return HcExecutor;
}());
exports.HcExecutor = HcExecutor;
exports.default = new HcExecutor();
//# sourceMappingURL=executor.js.map

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var CallbackFactory = __webpack_require__(0);
var store_1 = __webpack_require__(1);
var window_1 = __webpack_require__(12);
var executor_1 = __webpack_require__(8);
exports.default = function (agm, logger, cntName, wndId) {
    return new Promise(function (resolve, reject) {
        var _registry = CallbackFactory();
        var _logger = logger.subLogger("hc-env");
        var waitTimeout = 10000;
        var _windowId = wndId;
        var hcEnv;
        var instance;
        // We have two cases here:
        // 1. when we are in HC
        // 2. when we are in Browser/Node, but we have also started  HC/GD
        if (typeof cntName !== "undefined") {
            instance = { application: "HtmlContainer." + cntName };
        }
        else {
            instance = "best";
        }
        var streamPromise = new Promise(function (streamResolve, streamReject) {
            agm.subscribe("T42.Wnd.WindowStateChanged", {
                waitTimeoutMs: waitTimeout,
                target: instance,
            })
                .then(function (stream) {
                stream.onData(function (streamData) {
                    instance = streamData.server;
                    updateWindow(streamData.data.state, streamData.data);
                });
                stream.onFailed(function (err) {
                    streamReject(err);
                });
                streamResolve();
            })
                .catch(function (err) {
                streamReject("Can not subscribe for stream T42.Wnd.WindowStateChanged. Err: " + err);
            });
        });
        var listWindowsPromise = new Promise(function (listWndResolve, listWndReject) {
            agm.invoke("T42.Wnd.ListWindows", {}, instance, { waitTimeoutMs: waitTimeout })
                .then(function (result) {
                // add the server object
                instance = result.executed_by;
                // populate windows
                Object.keys(result.returned).forEach(function (existingWindow) {
                    var windowInfo = result.returned[existingWindow];
                    var windowObjAndEvents = createWindow(windowInfo.windowId, windowInfo);
                    // Added to store, showing to world
                    store_1.default.readyToShow(windowObjAndEvents);
                });
                listWndResolve();
            })
                .catch(function (e) {
                listWndReject("Can not invoke T42.Wnd.ListWindows method. Err: " + e);
            });
        });
        Promise.all([streamPromise, listWindowsPromise])
            .then(function () {
            // Init the executor, if we have container name - use it, if not get the first one from the collection
            executor_1.default.init(agm, instance);
            resolve(hcEnv);
        })
            .catch(function (e) {
            reject("can not subscribe for stream T42.Wnd.WindowStateChanged or can not invoke T42.Wnd.ListWindows ");
        });
        function updateWindow(eventType, windowInfo) {
            // if new window handle it separately
            if (eventType === "Created") {
                var win = createWindow(windowInfo.windowId, windowInfo);
                _registry.execute("window-event", windowInfo);
                // if the window has focus, trigger got focus event
                if (windowInfo.focus) {
                    focusChanged(win.Events, win.API, true);
                }
                return;
            }
            // otherwise check if the window is in our internal collections and update its state
            var windowObjectAndEvents = store_1.default.get(windowInfo.windowId);
            if (!windowObjectAndEvents) {
                _logger.error("received update for unknown window. Stream:', " + JSON.stringify(windowInfo, null, 4));
                return;
            }
            var theWindow = windowObjectAndEvents.API;
            var theWindowEvents = windowObjectAndEvents.Events;
            var oldFrameColor = theWindow.frameColor;
            // const property: string = "handle" + eventType;
            // // Try the generic handlers
            // if (theWindowEvents.hasOwnProperty(property)) {
            //     theWindowEvents[property](windowInfo);
            // }
            if (eventType === "Ready") {
                // Add it to store when it is ready for event on window-added
                store_1.default.readyToShow(windowObjectAndEvents);
            }
            if (eventType === "TitleChanged") {
                theWindowEvents.handleTitleChanged(windowInfo.windowTitle);
            }
            if (eventType === "UrlChanged") {
                theWindowEvents.handleUrlChanged(windowInfo.url);
            }
            if (eventType === "WindowStyleChanged") {
                var parsedWsa = parseWindowStyleAttributes(windowInfo.windowStyleAttributes);
                theWindowEvents.handleWindowSettingsChanged(parsedWsa);
                theWindowEvents.handleVisibilityChanged(!parsedWsa.hidden);
            }
            if (eventType === "Normal" ||
                eventType === "Maximized" ||
                eventType === "Minimized" ||
                eventType === "Collapsed" ||
                eventType === "Expanded") {
                var state = eventType.toLowerCase();
                theWindowEvents.handleWindowChangeState(state);
            }
            if (eventType === "ContextUpdated") {
                theWindowEvents.handleContextUpdated(windowInfo.context);
            }
            if (eventType === "FrameButtonAdded") {
                theWindowEvents.handleFrameButtonAdded(windowInfo);
            }
            if (eventType === "FrameButtonRemoved") {
                theWindowEvents.handleFrameButtonRemoved(windowInfo);
            }
            if (eventType === "FrameButtonClicked") {
                theWindowEvents.handleFrameButtonClicked(windowInfo);
            }
            if (eventType === "FrameSelectionChanged") {
                theWindowEvents.handleFrameSelectionChanged(windowInfo.newWindow, windowInfo.prevWindow);
            }
            if (eventType === "FrameIsLockedChanged") {
                theWindowEvents.handleFrameIsLockedChanged(windowInfo.isLocked);
            }
            if (eventType === "TabHeaderVisibilityChanged") {
                theWindowEvents.handleTabHeaderVisibilityChanged(windowInfo.tabHeaderVisible);
            }
            if (eventType === "BoundsChanged") {
                var bounds = {
                    height: windowInfo.height,
                    left: windowInfo.left,
                    top: windowInfo.top,
                    width: windowInfo.width,
                };
                theWindowEvents.handleBoundsChanged(bounds);
            }
            if (eventType === "FocusChanged") {
                focusChanged(theWindowEvents, theWindow, windowInfo.focus);
            }
            if (eventType === "FrameColorChanged") {
                if (oldFrameColor !== windowInfo.frameColor) {
                    theWindowEvents.handleFrameColorChanged(windowInfo.frameColor);
                    _registry.execute("frame-color-changed", theWindow);
                }
            }
            if (eventType === "FrameAttached") {
                theWindowEvents.handleFrameAttached(windowInfo.tabGroupId, windowInfo.tabHeaderVisible);
            }
            if (eventType === "TabAttached") {
                theWindowEvents.handleAttached(windowInfo.tabGroupId, windowInfo.tabHeaderVisible);
                var winsToBeNotified_1 = getWindowsByTabGroupId(theWindow.id, windowInfo.tabGroupId);
                // Getting all windows, except current, with same tabGroupId
                Object.keys(winsToBeNotified_1).forEach(function (id) {
                    var win = winsToBeNotified_1[id];
                    // Executing event windowAttached to all windows
                    win.Events.handleWindowAttached(theWindow);
                });
                _registry.execute("tab-attached", theWindow, windowInfo.tabGroupId, windowInfo.tabHeaderVisible);
            }
            if (eventType === "TabDettached") {
                // In the event, tabGroupId is empty, will be update on the next event FrameAttached
                var oldTabGroupId = theWindow.tabGroupId;
                theWindowEvents.handleDetached(windowInfo.tabGroupId);
                var winsToBeNotified_2 = getWindowsByTabGroupId(theWindow.id, oldTabGroupId);
                Object.keys(winsToBeNotified_2).forEach(function (id) {
                    var win = winsToBeNotified_2[id];
                    win.Events.handleWindowDetached(theWindow);
                });
                _registry.execute("tab-detached", theWindow, windowInfo.tabGroupId, theWindow.tabGroupId);
            }
            if (eventType === "CompositionChanged") {
                theWindowEvents.handleCompositionChanged(windowInfo.neighbours, windowInfo.groupId);
                _registry.execute("composition-changed", windowInfo);
            }
            if (eventType === "GroupHeaderVisibilityChanged") {
                theWindowEvents.handleGroupHeaderVisibilityChanged(windowInfo.groupHeaderVisible);
                _registry.execute("group-header-changed", windowInfo);
            }
            // Clear the window on close event
            if (eventType === "Closed") {
                if (windowInfo.focus) {
                    // raise lost focus event
                    focusChanged(theWindowEvents, theWindow, false);
                }
                store_1.default.remove(windowObjectAndEvents);
                theWindowEvents.handleWindowClose();
            }
            // expose to external listeners
            _registry.execute("window-event", windowInfo);
        }
        function focusChanged(theWindowEvents, theWindow, focus) {
            theWindowEvents.handleFocusChanged(focus);
            if (focus) {
                _registry.execute("got-focus", theWindow);
            }
            else {
                _registry.execute("lost-focus", theWindow);
            }
        }
        function createWindow(windowId, args) {
            var windowObjAndEvents = window_1.default(windowId, mapToWindowConstructorOptions(args), executor_1.default, _logger);
            store_1.default.add(windowObjAndEvents);
            return windowObjAndEvents;
        }
        function open(name, url, options, success, error) {
            options = options || {};
            // relativeTo fix
            if (typeof options.relativeTo !== "undefined" && typeof options.relativeTo !== "string") {
                options.relativeTo = options.relativeTo.id || "";
            }
            options.windowName = name;
            options.url = url;
            agm.invoke("T42.Html.CreateWindow", options)
                .then(function (message) {
                if (message.returned !== undefined) {
                    var id = message.returned.id;
                    success(id);
                }
                else {
                    error("failed to execute T42.Html.CreateWindow - unknown reason");
                }
            }).catch(function (e) {
                if (typeof error === "function") {
                    error(e);
                }
            });
        }
        function tabAttached(callback) {
            return _registry.add("tab-attached", callback);
        }
        function tabDetached(callback) {
            return _registry.add("tab-detached", callback);
        }
        function onWindowFrameColorChanged(callback) {
            return _registry.add("frame-color-changed", callback);
        }
        function onWindowGotFocus(callback) {
            return _registry.add("got-focus", callback);
        }
        function onWindowLostFocus(callback) {
            return _registry.add("lost-focus", callback);
        }
        function onEvent(callback) {
            return _registry.add("window-event", callback);
        }
        function my() {
            return _windowId;
        }
        function onCompositionChanged(callback) {
            return _registry.add("composition-changed", callback);
        }
        function onGroupHeaderVisibilityChanged(callback) {
            return _registry.add("group-header-changed", callback);
        }
        function getWindowsByTabGroupId(windowId, tabGroupId) {
            var windows = store_1.default.list;
            return Object.keys(windows).reduce(function (memo, id) {
                var win = windows[id];
                if (win.API.tabGroupId === tabGroupId && win.API.id !== windowId) {
                    memo[id] = win;
                }
                return memo;
            }, {});
        }
        function mapToWindowConstructorOptions(args) {
            var _state = typeof args.WindowState !== "undefined" ? args.WindowState.toLowerCase() : "normal";
            var windowStyleAttributes = parseWindowStyleAttributes(args.windowStyleAttributes);
            return {
                name: args.windowName,
                url: args.url,
                title: args.windowTitle,
                context: args.context,
                bounds: {
                    height: args.height,
                    left: args.left,
                    top: args.top,
                    width: args.width,
                },
                focus: args.focus,
                frameColor: args.frameColor,
                groupId: args.groupId,
                isCollapsed: args.isCollapsed,
                isGroupHeaderVisible: args.isGroupHeaderVisible,
                isLocked: args.isLocked,
                isTabHeaderVisible: args.isTabHeaderVisible,
                isTabSelected: args.isTabSelected,
                isVisible: !windowStyleAttributes.hidden,
                isFocused: windowStyleAttributes.focus,
                mode: windowStyleAttributes.mode,
                settings: windowStyleAttributes,
                state: _state,
                tabGroupId: args.tabGroupId,
                neighbours: args.neighbours,
            };
        }
        function parseWindowStyleAttributes(windowStyles) {
            if (windowStyles === undefined) {
                return {};
            }
            if (typeof windowStyles !== "object") {
                return JSON.parse(windowStyles);
            }
            return windowStyles;
        }
        hcEnv = {
            my: my,
            onEvent: onEvent,
            open: open,
            tabAttached: tabAttached,
            tabDetached: tabDetached,
            onWindowFrameColorChanged: onWindowFrameColorChanged,
            executor: executor_1.default,
            onCompositionChanged: onCompositionChanged,
            onGroupHeaderVisibilityChanged: onGroupHeaderVisibilityChanged,
            onWindowGotFocus: onWindowGotFocus,
            onWindowLostFocus: onWindowLostFocus,
        };
    });
};
//# sourceMappingURL=hc.js.map

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var CallbackFactory = __webpack_require__(0);
var store_1 = __webpack_require__(1);
exports.default = function (id, executor) {
    var _registry = CallbackFactory();
    var _windowsId = [];
    var isGroupHeaderVisibleCalled;
    //#region "API functions"
    function addWindow(winId) {
        if (_windowsId.indexOf(winId) === -1) {
            _windowsId.push(winId);
            var window_1 = store_1.default.get(winId);
            window_1.Events.handleGroupAssociation(groupObject);
            _registry.execute("window-added", groupObject, window_1.API);
        }
    }
    function removeWindow(winId) {
        var index = _windowsId.indexOf(winId);
        if (index !== -1) {
            _windowsId.splice(index, 1);
            var window_2 = _mapToWindowObject(winId);
            _registry.execute("window-removed", groupObject, window_2);
        }
    }
    function find(window, success) {
        var winId;
        if (typeof window === "string") {
            winId = window;
        }
        else {
            winId = window.id;
        }
        var index = _windowsId.indexOf(winId);
        if (index !== -1) {
            var mappedWindow = _mapToWindowObject(_windowsId[index]);
            if (typeof success === "function") {
                success(mappedWindow);
            }
            return mappedWindow;
        }
    }
    function windows(success) {
        var mappedWindows = _mapToWindowObjects();
        if (typeof success === "function") {
            success(mappedWindows);
        }
        return mappedWindows;
    }
    function showHeader(success, error) {
        return new Promise(function (resolve, reject) {
            executor.setGroupHeaderVisible(_windowsId[0], true)
                .then(function (w) {
                if (typeof success === "function") {
                    success(groupObject);
                }
                resolve(groupObject);
            })
                .catch(function (e) {
                reject(e);
            });
        });
    }
    function hideHeader(success, error) {
        return new Promise(function (resolve, reject) {
            executor.setGroupHeaderVisible(_windowsId[0], false)
                .then(function (w) {
                if (typeof success === "function") {
                    success(groupObject);
                }
                resolve(groupObject);
            })
                .catch(function (e) {
                return;
            });
        });
    }
    function execute(command, options, success, error) {
        return new Promise(function (resolve, reject) {
            executor.execute(command, options)
                .then(function (w) {
                if (typeof success === "function") {
                    success(groupObject);
                }
                resolve(groupObject);
            })
                .catch(function (e) {
                reject(e);
            });
        });
    }
    //#endregion "API functions"
    //#region "Stream function"
    function handleGroupHeaderVisibilityChanged(windowInfo) {
        if (isGroupHeaderVisibleCalled !== windowInfo.groupHeaderVisible) {
            isGroupHeaderVisibleCalled = windowInfo.groupHeaderVisible;
            _registry.execute("header-visibility-changed", groupObject);
        }
    }
    //#endregion "Stream function"
    //#region "Internal function"
    function _mapToWindowObjects() {
        var winObjects = [];
        _windowsId.forEach(function (winId) {
            var windowObject = _mapToWindowObject(winId);
            if (typeof windowObject !== "undefined") {
                winObjects.push(windowObject);
            }
        });
        return winObjects;
    }
    function _mapToWindowObject(windowId) {
        return store_1.default.get(windowId) ? store_1.default.get(windowId).API : undefined;
    }
    function _getGroupHeaderVisibility() {
        // if one of the windows has a flag hideGroupHeader the group header should be off.
        var _isGroupHeaderVisible;
        var result = _mapToWindowObjects().filter(function (w) {
            return !w.isGroupHeaderVisible;
        });
        _isGroupHeaderVisible = result.length === 0;
        return _isGroupHeaderVisible;
    }
    //#endregion "Internal function"
    //#region "Events"
    function onHeaderVisibilityChanged(callback) {
        return _registry.add("header-visibility-changed", callback);
    }
    function onWindowAdded(callback) {
        return _registry.add("window-added", callback);
    }
    function onWindowRemoved(callback) {
        return _registry.add("window-removed", callback);
    }
    //#endregion "Events"
    //#region "API"
    var groupObject = {
        id: id,
        get windows() {
            return windows();
        },
        find: find,
        get isHeaderVisible() {
            return _getGroupHeaderVisibility();
        },
        showHeader: showHeader,
        hideHeader: hideHeader,
        maximize: function (success, error) {
            return execute("maximize", { groupId: id }, success, error);
        },
        restore: function (success, error) {
            return execute("restore", { groupId: id }, success, error);
        },
        onHeaderVisibilityChanged: onHeaderVisibilityChanged,
        onWindowAdded: onWindowAdded,
        onWindowRemoved: onWindowRemoved,
    };
    var internal = {
        addWindow: addWindow,
        removeWindow: removeWindow,
        handleGroupHeaderVisibilityChanged: handleGroupHeaderVisibilityChanged,
    };
    return {
        groupAPI: groupObject,
        groupInternal: internal,
    };
    //#endregion "API"
};
//# sourceMappingURL=group.js.map

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var CallbackFactory = __webpack_require__(0);
var PackageJson = __webpack_require__(2);
var detector_1 = __webpack_require__(3);
var groups_1 = __webpack_require__(4);
var store_1 = __webpack_require__(1);
exports.default = function (agm, logger) {
    var _registry = CallbackFactory();
    var _logger = logger;
    var groups;
    var environment;
    var isReady = new Promise(function (resolve, reject) {
        detector_1.default(agm, _logger)
            .then(function (env) {
            environment = env;
            groups = groups_1.default(env, _logger);
            resolve();
        })
            .catch(function (e) {
            _logger.error("Environment detector fails with: " + e);
        });
    });
    function ready() {
        return isReady;
    }
    function my() {
        return store_1.default.get(environment.my()) ? store_1.default.get(environment.my()).API : undefined;
    }
    function open(name, url, options, success, error) {
        var successHandler = function (id) {
            return;
        };
        if (typeof success === "function") {
            successHandler = function (id) {
                var unsubscribe = windowAdded(function (newWnd) {
                    if (newWnd.id === id) {
                        success(newWnd);
                        unsubscribe();
                    }
                });
            };
        }
        environment.open(name, url, options, successHandler, error);
    }
    function find(name, success, error) {
        var windows = store_1.default.list;
        var windowsForListing = Object.keys(windows).reduce(function (memo, winId) {
            var window = windows[winId];
            if (window && window.API.name === name) {
                memo.push(window.API);
            }
            return memo;
        }, []);
        if (typeof success !== "function") {
            return windowsForListing[0];
        }
        if (windowsForListing.length > 0) {
            success(windowsForListing[0]);
        }
        else {
            if (typeof error === "function") {
                error("There is no window with name:" + name);
            }
        }
    }
    function findById(id, success, error) {
        var windows = store_1.default.list;
        var windowsForListing = Object.keys(windows).reduce(function (memo, winId) {
            var window = windows[winId];
            if (typeof window !== "undefined" && window.API.id === id) {
                memo.push(window.API);
            }
            return memo;
        }, []);
        if (typeof success !== "function") {
            return windowsForListing[0];
        }
        if (windowsForListing.length > 0) {
            success(windowsForListing[0]);
        }
        else {
            if (typeof error === "function") {
                error("There is no window with such id:" + id);
            }
        }
    }
    function list(success) {
        var windows = store_1.default.list;
        var windowsForListing = Object.keys(windows)
            .map(function (k) {
            return windows[k].API;
        });
        if (typeof success !== "function") {
            return windowsForListing;
        }
        success(windowsForListing);
    }
    function windowAdded(callback) {
        return _registry.add("window-added", callback);
    }
    function windowRemoved(callback) {
        return _registry.add("window-removed", callback);
    }
    function tabAttached(callback) {
        return isReady.then(function () {
            environment.tabAttached(callback);
        });
    }
    function tabDetached(callback) {
        return isReady.then(function () {
            environment.tabDetached(callback);
        });
    }
    function onWindowFrameColorChanged(callback) {
        return isReady.then(function () {
            environment.onWindowFrameColorChanged(callback);
        });
    }
    function onWindowGotFocus(callback) {
        var unsubscribe;
        isReady.then(function () {
            unsubscribe = environment.onWindowGotFocus(callback);
        });
        return function () {
            if (unsubscribe) {
                unsubscribe();
            }
        };
    }
    function onWindowLostFocus(callback) {
        var unsubscribe;
        isReady.then(function () {
            unsubscribe = environment.onWindowLostFocus(callback);
        });
        return function () {
            if (unsubscribe) {
                unsubscribe();
            }
        };
    }
    function onEvent(callback) {
        return isReady.then(function () {
            environment.onEvent(callback);
        });
    }
    function handleWindowAdded(w) {
        _registry.execute("window-added", w.API);
    }
    function handleWindowRemoved(w) {
        _registry.execute("window-removed", w.API);
    }
    store_1.default.onReadyWindow(handleWindowAdded);
    store_1.default.onRemoved(handleWindowRemoved);
    // The API itself
    return {
        version: PackageJson.version,
        my: my,
        open: open,
        find: find,
        findById: findById,
        list: list,
        ready: ready,
        onWindowAdded: windowAdded,
        windowAdded: windowAdded,
        onWindowRemoved: windowRemoved,
        windowRemoved: windowRemoved,
        onTabAttached: tabAttached,
        onTabDetached: tabDetached,
        onWindowFrameColorChanged: onWindowFrameColorChanged,
        get groups() {
            return groups.groupsAPI;
        },
        onWindowGotFocus: onWindowGotFocus,
        onWindowLostFocus: onWindowLostFocus,
        onEvent: onEvent,
    };
};
//# sourceMappingURL=main.js.map

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var CallbackFactory = __webpack_require__(0);
var es6_promise_1 = __webpack_require__(5);
var store_1 = __webpack_require__(1);
exports.default = function (id, options, executor, logger) {
    var _registry = CallbackFactory();
    var _logger = logger.subLogger("window " + id);
    var _name = options.name;
    var _mode = options.mode;
    var _url = options.url;
    var _title = options.title;
    var _context = options.context || {};
    var _bounds = options.bounds;
    var _frameColor = options.frameColor;
    var _focus = options.focus;
    var _neighbours = options.neighbours || {};
    var _groupId = options.groupId;
    var _isGroupHeaderVisible = options.isGroupHeaderVisible;
    var _isTabHeaderVisible = options.isTabHeaderVisible;
    var _isTabSelected = options.isTabSelected;
    var _settings = options.settings;
    // is Window visible
    var _isVisible = options.isVisible;
    // Window state Collapsed | Expanded
    var isCollapsed = options.isCollapsed;
    // Window state normal | maximized | minimized
    var _windowState = options.state;
    // tabGroupId only for window with 'Tab' mode
    var _tabGroupId = options.tabGroupId;
    // window is locked or unlocked;
    var _isLocked = options.isLocked;
    var _group;
    var resultWindow;
    // Holding all frame buttons
    var _frameButtons = [];
    //#region "AGM methods"
    function close(success, error) {
        return new es6_promise_1.Promise(function (resolve, reject) {
            executor.close(resultWindow)
                .then(function () {
                if (typeof success === "function") {
                    success(resultWindow);
                }
                resolve(resultWindow);
            })
                .catch(function (e) {
                if (typeof error === "function") {
                    error(e);
                }
                reject(e);
            });
        });
    }
    function navigate(newUrl, success, error) {
        return new es6_promise_1.Promise(function (resolve, reject) {
            executor.navigate(resultWindow, newUrl)
                .then(function () {
                if (typeof success === "function") {
                    success(resultWindow);
                }
                resolve(resultWindow);
            })
                .catch(function (e) {
                if (typeof error === "function") {
                    error(e);
                }
                reject(e);
            });
        });
    }
    function setStyle(style, success, error) {
        return new es6_promise_1.Promise(function (resolve, reject) {
            executor.setStyle(resultWindow, style)
                .then(function () {
                if (typeof success === "function") {
                    success(resultWindow);
                }
                resolve(resultWindow);
            })
                .catch(function (e) {
                if (typeof error === "function") {
                    error(e);
                }
                reject(e);
            });
        });
    }
    function setTitle(newTitle, success, error) {
        return new es6_promise_1.Promise(function (resolve, reject) {
            executor.setTitle(resultWindow, newTitle)
                .then(function () {
                if (typeof success === "function") {
                    success(resultWindow);
                }
                resolve(resultWindow);
            })
                .catch(function (e) {
                if (typeof error === "function") {
                    error(e);
                }
                reject(e);
            });
        });
        // OpTION 2
        // const promise = executor.setTitle(resultWindow, newTitle)
        // return promisify
    }
    function moveResize(dimensions, success, error) {
        return new es6_promise_1.Promise(function (resolve, reject) {
            executor.moveResize(resultWindow, dimensions)
                .then(function () {
                if (typeof success === "function") {
                    success(resultWindow);
                }
                resolve(resultWindow);
            })
                .catch(function (e) {
                if (typeof error === "function") {
                    error(e);
                }
                reject(e);
            });
        });
    }
    function addFrameButton(buttonInfo, success, error) {
        return new es6_promise_1.Promise(function (resolve, reject) {
            if (typeof buttonInfo === "undefined") {
                if (typeof error === "function") {
                    error("No button info");
                    return;
                }
                reject("No button info");
                return;
            }
            if (buttonInfo.buttonId === undefined) {
                if (typeof error === "function") {
                    error("No buttonId");
                    return;
                }
                reject("No buttonId");
                return;
            }
            if (buttonInfo.imageBase64 === undefined) {
                if (typeof error === "function") {
                    error("No imageBase64");
                    return;
                }
                reject("No imageBase64");
                return;
            }
            executor.addFrameButton(resultWindow, buttonInfo)
                .then(function () {
                if (typeof success === "function") {
                    success(resultWindow);
                }
                resolve(resultWindow);
            })
                .catch(function (e) {
                if (typeof error === "function") {
                    error(e);
                }
                reject(e);
            });
        });
    }
    function removeFrameButton(buttonId, success, error) {
        return new es6_promise_1.Promise(function (resolve, reject) {
            if (buttonId === undefined || buttonId === "") {
                if (typeof error === "function") {
                    error("No buttonId");
                    return;
                }
                reject("No buttonId");
                return;
            }
            executor.removeFrameButton(resultWindow, buttonId)
                .then(function () {
                if (typeof success === "function") {
                    success(resultWindow);
                }
                resolve(resultWindow);
            })
                .catch(function (e) {
                if (typeof error === "function") {
                    error(e);
                }
                reject(e);
            });
        });
    }
    function activate(success, error) {
        return new es6_promise_1.Promise(function (resolve, reject) {
            executor.activate(resultWindow)
                .then(function () {
                if (typeof success === "function") {
                    success(resultWindow);
                }
                resolve(resultWindow);
            })
                .catch(function (e) {
                if (typeof error === "function") {
                    error(e);
                }
                reject(e);
            });
        });
    }
    function focus(success, error) {
        return new es6_promise_1.Promise(function (resolve, reject) {
            executor.focus(resultWindow)
                .then(function () {
                if (typeof success === "function") {
                    success(resultWindow);
                }
                resolve(resultWindow);
            })
                .catch(function (e) {
                if (typeof error === "function") {
                    error(e);
                }
                reject(e);
            });
        });
    }
    function maximizeRestore(success, error) {
        return new es6_promise_1.Promise(function (resolve, reject) {
            executor.maximizeRestore(resultWindow)
                .then(function () {
                if (typeof success === "function") {
                    success(resultWindow);
                }
                resolve(resultWindow);
            })
                .catch(function (e) {
                if (typeof error === "function") {
                    error(e);
                }
                reject(e);
            });
        });
    }
    function maximize(success, error) {
        return new es6_promise_1.Promise(function (resolve, reject) {
            executor.maximize(resultWindow)
                .then(function () {
                if (typeof success === "function") {
                    success(resultWindow);
                }
                resolve(resultWindow);
            })
                .catch(function (e) {
                if (typeof error === "function") {
                    error(e);
                }
                reject(e);
            });
        });
    }
    function restore(success, error) {
        return new es6_promise_1.Promise(function (resolve, reject) {
            executor.restore(resultWindow)
                .then(function () {
                if (typeof success === "function") {
                    success(resultWindow);
                }
                resolve(resultWindow);
            })
                .catch(function (e) {
                if (typeof error === "function") {
                    error(e);
                }
                reject(e);
            });
        });
    }
    function minimize(success, error) {
        return new es6_promise_1.Promise(function (resolve, reject) {
            executor.minimize(resultWindow)
                .then(function () {
                if (typeof success === "function") {
                    success(resultWindow);
                }
                resolve(resultWindow);
            })
                .catch(function (e) {
                if (typeof error === "function") {
                    error(e);
                }
                reject(e);
            });
        });
    }
    function collapse(success, error) {
        return new es6_promise_1.Promise(function (resolve, reject) {
            executor.collapse(resultWindow)
                .then(function () {
                if (typeof success === "function") {
                    success(resultWindow);
                }
                resolve(resultWindow);
            })
                .catch(function (e) {
                if (typeof error === "function") {
                    error(e);
                }
                reject(e);
            });
        });
    }
    function expand(success, error) {
        return new es6_promise_1.Promise(function (resolve, reject) {
            executor.expand(resultWindow)
                .then(function () {
                if (typeof success === "function") {
                    success(resultWindow);
                }
                resolve(resultWindow);
            })
                .catch(function (e) {
                if (typeof error === "function") {
                    error(e);
                }
                reject(e);
            });
        });
    }
    function toggleCollapse(success, error) {
        return new es6_promise_1.Promise(function (resolve, reject) {
            executor.toggleCollapse(resultWindow)
                .then(function () {
                if (typeof success === "function") {
                    success(resultWindow);
                }
                resolve(resultWindow);
            })
                .catch(function (e) {
                if (typeof error === "function") {
                    error(e);
                }
                reject(e);
            });
        });
    }
    function snap(target, direction, success, error) {
        return new es6_promise_1.Promise(function (resolve, reject) {
            executor.snap(resultWindow, target, direction)
                .then(function () {
                if (typeof success === "function") {
                    success(resultWindow);
                }
                resolve(resultWindow);
            })
                .catch(function (e) {
                if (typeof error === "function") {
                    error(e);
                }
                reject(e);
            });
        });
    }
    function attachTab(tab, index, success, error) {
        return new es6_promise_1.Promise(function (resolve, reject) {
            executor.attachTab(resultWindow, tab, index)
                .then(function () {
                if (typeof success === "function") {
                    success(resultWindow);
                }
                resolve(resultWindow);
            })
                .catch(function (e) {
                if (typeof error === "function") {
                    error(e);
                }
                reject(e);
            });
        });
    }
    function detachTab(opt, success, error) {
        return new es6_promise_1.Promise(function (resolve, reject) {
            executor.detachTab(resultWindow, opt)
                .then(function () {
                if (typeof success === "function") {
                    success(resultWindow);
                }
                resolve(resultWindow);
            })
                .catch(function (e) {
                if (typeof error === "function") {
                    error(e);
                }
                reject(e);
            });
        });
    }
    function setVisible(toBeVisible, success, error) {
        return new es6_promise_1.Promise(function (resolve, reject) {
            executor.setVisible(resultWindow, toBeVisible)
                .then(function () {
                if (typeof success === "function") {
                    success(resultWindow);
                }
                resolve(resultWindow);
            })
                .catch(function (e) {
                if (typeof error === "function") {
                    error(e);
                }
                reject(e);
            });
        });
    }
    function showLoader(loader) {
        return new es6_promise_1.Promise(function (resolve, reject) {
            executor.showLoader(resultWindow, loader)
                .then(function () {
                resolve(resultWindow);
            })
                .catch(function (e) {
                reject(e);
            });
        });
    }
    function hideLoader() {
        return new es6_promise_1.Promise(function (resolve, reject) {
            executor.hideLoader(resultWindow)
                .then(function () {
                resolve(resultWindow);
            })
                .catch(function (e) {
                reject(e);
            });
        });
    }
    function updateContext(context, success, error) {
        return new es6_promise_1.Promise(function (resolve, reject) {
            executor.updateContext(resultWindow, context)
                .then(function () {
                if (typeof success === "function") {
                    success(resultWindow);
                }
                resolve(resultWindow);
            })
                .catch(function (e) {
                if (typeof error === "function") {
                    error(e);
                }
                reject(e);
            });
        });
    }
    function lock(success, error) {
        return new es6_promise_1.Promise(function (resolve, reject) {
            executor.lock(resultWindow)
                .then(function () {
                if (typeof success === "function") {
                    success(resultWindow);
                }
                resolve(resultWindow);
            })
                .catch(function (e) {
                if (typeof error === "function") {
                    error(e);
                }
                reject(e);
            });
        });
    }
    function unlock(success, error) {
        return new es6_promise_1.Promise(function (resolve, reject) {
            executor.unlock(resultWindow)
                .then(function () {
                if (typeof success === "function") {
                    success(resultWindow);
                }
                resolve(resultWindow);
            })
                .catch(function (e) {
                if (typeof error === "function") {
                    error(e);
                }
                reject(e);
            });
        });
    }
    function getIcon(success, error) {
        var successHandler = function (resp) {
            if (resp.returned && resp.returned.icon) {
                if (typeof success === "function") {
                    success(resp.returned.icon);
                }
            }
        };
        // agm.invoke("T42.Wnd.GetIcon", { windowId: resultWindow.id }, "best", {}, successHandler, error);
    }
    function setIcon(base64Image, success, error) {
        return new es6_promise_1.Promise(function (resolve, reject) {
            executor.setIcon(resultWindow, base64Image)
                .then(function () {
                if (typeof success === "function") {
                    success(resultWindow);
                }
                resolve(resultWindow);
            })
                .catch(function (e) {
                if (typeof error === "function") {
                    error(e);
                }
                reject(e);
            });
        });
    }
    function setFrameColor(frameColor, success, error) {
        return new es6_promise_1.Promise(function (resolve, reject) {
            executor.setFrameColor(resultWindow, frameColor)
                .then(function () {
                if (typeof success === "function") {
                    success(resultWindow);
                }
                resolve(resultWindow);
            })
                .catch(function (e) {
                if (typeof error === "function") {
                    error(e);
                }
                reject(e);
            });
        });
    }
    function setTabHeaderVisible(toBeTabHeaderVisible, success, error) {
        return new es6_promise_1.Promise(function (resolve, reject) {
            executor.setTabHeaderVisible(resultWindow, toBeTabHeaderVisible)
                .then(function () {
                if (typeof success === "function") {
                    success(resultWindow);
                }
                resolve(resultWindow);
            })
                .catch(function (e) {
                if (typeof error === "function") {
                    error(e);
                }
                reject(e);
            });
        });
    }
    //#endregion "AGM methods"
    //#region "Events"
    function onTitleChanged(callback) {
        callback(resultWindow.title, resultWindow);
        return _registry.add("onTitleChanged", callback);
    }
    function onClose(callback) {
        return _registry.add("onClose", callback);
    }
    function onUrlChanged(callback) {
        return _registry.add("onUrlChanged", callback);
    }
    function onFrameButtonAdded(callback) {
        return _registry.add("onFrameButtonAdded", callback);
    }
    function onFrameButtonRemoved(callback) {
        return _registry.add("onFrameButtonRemoved", callback);
    }
    function onFrameButtonClicked(callback) {
        return _registry.add("onFrameButtonClicked", callback);
    }
    function onCollapsed(callback) {
        if (isCollapsed) {
            callback(resultWindow);
        }
        return _registry.add("collapsed", callback);
    }
    function onExpanded(callback) {
        if (!isCollapsed) {
            callback(resultWindow);
        }
        return _registry.add("expanded", callback);
    }
    function onMaximized(callback) {
        if (_windowState === "maximized") {
            callback(resultWindow);
        }
        return _registry.add("maximized", callback);
    }
    function onMinimized(callback) {
        if (_windowState === "minimized") {
            callback(resultWindow);
        }
        return _registry.add("minimized", callback);
    }
    function onNormal(callback) {
        if (_windowState === "normal") {
            callback(resultWindow);
        }
        return _registry.add("normal", callback);
    }
    function onAttached(callback) {
        return _registry.add("attached", callback);
    }
    function onDetached(callback) {
        return _registry.add("detached", callback);
    }
    function onVisibilityChanged(callback) {
        return _registry.add("visibility-changed", callback);
    }
    function onContextUpdated(callback) {
        return _registry.add("context-updated", callback);
    }
    function onLockingChanged(callback) {
        return _registry.add("lock-changed", callback);
    }
    function onBoundsChanged(callback) {
        return _registry.add("bounds-changed", callback);
    }
    function onFocusChanged(callback) {
        return _registry.add("focus-changed", callback);
    }
    function onFrameColorChanged(callback) {
        return _registry.add("frame-color-changed", callback);
    }
    function onTabHeaderVisibilityChanged(callback) {
        return _registry.add("tab-header-visibility-changed", callback);
    }
    function onWindowAttached(callback) {
        return _registry.add("window-attached", callback);
    }
    function onWindowDetached(callback) {
        return _registry.add("window-detached", callback);
    }
    function onGroupChanged(callback) {
        return _registry.add("group-changed", callback);
    }
    function onTabSelectionChanged(callback) {
        return _registry.add("tab-selection-changed", callback);
    }
    //#endregion "Events"
    //#region "Stream function"
    function handleTitleChanged(newTitle) {
        _title = newTitle;
        _registry.execute("onTitleChanged", newTitle, resultWindow);
    }
    function handleUrlChanged(newUrl) {
        _url = newUrl;
        _registry.execute("onUrlChanged", newUrl, resultWindow);
    }
    function handleVisibilityChanged(isVisible) {
        if (isVisible === _isVisible) {
            return;
        }
        _isVisible = isVisible;
        _registry.execute("visibility-changed", resultWindow);
    }
    function handleWindowSettingsChanged(settings) {
        _settings = settings;
        _registry.execute("settings-changed", resultWindow);
    }
    function handleContextUpdated(context) {
        _context = context;
        _registry.execute("context-updated", _context, resultWindow);
    }
    function handleWindowClose() {
        if (resultWindow.id === undefined) {
            return;
        }
        resultWindow.id = undefined;
        _registry.execute("onClose", resultWindow);
    }
    function handleFrameButtonAdded(frameButton) {
        var buttonObj = ["buttonId", "imageBase64", "order", "tooltip"].reduce(function (memo, k) {
            memo[k] = frameButton[k];
            return memo;
        }, {});
        var frameButtonsIds = _frameButtons.map(function (btn) {
            return btn.buttonId;
        });
        if (frameButtonsIds.indexOf(frameButton.buttonId) === -1) {
            _frameButtons.push(buttonObj);
        }
        _registry.execute("onFrameButtonAdded", buttonObj, resultWindow);
    }
    function handleFrameButtonRemoved(frameButton) {
        var button;
        _frameButtons = _frameButtons.reduce(function (memo, btn) {
            if (btn.buttonId === frameButton.buttonId) {
                button = btn;
            }
            else {
                memo.push(btn);
            }
            return memo;
        }, []);
        if (button !== undefined) {
            _registry.execute("onFrameButtonRemoved", button, resultWindow);
        }
    }
    function handleFrameButtonClicked(frameButton) {
        var button = _frameButtons.filter(function (btn) {
            return btn.buttonId === frameButton.buttonId;
        });
        if (button.length > 0) {
            _registry.execute("onFrameButtonClicked", button[0], resultWindow);
        }
    }
    function handleWindowChangeState(state) {
        if (state === "collapsed") {
            isCollapsed = true;
        }
        else if (state === "expanded") {
            isCollapsed = false;
        }
        else {
            _windowState = state;
        }
        _registry.execute(state, resultWindow);
    }
    function handleFrameIsLockedChanged(isLocked) {
        _isLocked = isLocked;
        _registry.execute("lock-changed", resultWindow);
    }
    function handleBoundsChanged(bounds) {
        if (_bounds.top === bounds.top && _bounds.left === bounds.left && _bounds.width === bounds.width && _bounds.height === bounds.height) {
            return;
        }
        _bounds.top = bounds.top;
        _bounds.left = bounds.left;
        _bounds.width = bounds.width;
        _bounds.height = bounds.height;
        _registry.execute("bounds-changed", resultWindow);
    }
    function handleFocusChanged(isFocused) {
        _focus = isFocused;
        _registry.execute("focus-changed", resultWindow);
    }
    function handleFrameColorChanged(frameColor) {
        _frameColor = frameColor;
        _registry.execute("frame-color-changed", resultWindow);
    }
    function handleFrameAttached(tabGroupId, isTabHeaderVisible) {
        _tabGroupId = tabGroupId;
        _isTabHeaderVisible = isTabHeaderVisible;
    }
    function handleCompositionChanged(neighbours, groupId) {
        _neighbours = neighbours;
        _groupId = groupId;
    }
    function handleGroupHeaderVisibilityChanged(isGroupHeaderVisible) {
        _isGroupHeaderVisible = isGroupHeaderVisible;
    }
    function handleTabHeaderVisibilityChanged(isTabHeaderVisible) {
        if (_isTabHeaderVisible !== isTabHeaderVisible) {
            _isTabHeaderVisible = isTabHeaderVisible;
            _registry.execute("tab-header-visibility-changed", resultWindow);
        }
    }
    function handleFrameSelectionChanged(newWindow, prevWindow) {
        var selectedWindow;
        if (typeof newWindow !== "undefined" && newWindow === id) {
            _isTabSelected = true;
            selectedWindow = resultWindow;
        }
        else {
            _isTabSelected = false;
            selectedWindow = store_1.default.get(newWindow) ? store_1.default.get(newWindow).API : undefined;
        }
        var previousWindow = store_1.default.get(prevWindow) ? store_1.default.get(prevWindow).API : undefined;
        _registry.execute("tab-selection-changed", selectedWindow, previousWindow, resultWindow);
    }
    function handleAttached(newTabGroupId, tabHeaderVisible) {
        _tabGroupId = newTabGroupId;
        _isTabHeaderVisible = tabHeaderVisible;
        _registry.execute("attached", resultWindow);
    }
    function handleWindowAttached(win) {
        _registry.execute("window-attached", win);
    }
    function handleDetached(tabGroupId) {
        _tabGroupId = tabGroupId;
        _registry.execute("detached", resultWindow);
    }
    function handleWindowDetached(win) {
        _registry.execute("window-detached", win);
    }
    //#endregion "Stream function"
    //#region "Group Events"
    function handleGroupChanged(newGroup, oldGroup) {
        logger.trace("handle group changed to win: " + id + " with group id: " + newGroup.id);
        _group = newGroup;
        _groupId = newGroup.id;
        _registry.execute("group-changed", resultWindow, newGroup, oldGroup);
    }
    // This is used to set the relation from window to corespondent group API
    function handleGroupAssociation(group) {
        _logger.trace("setting group to win: " + id + " with group id: " + group.id);
        _group = group;
    }
    //#region "Internal function"
    function getAllTabs() {
        var allWindows = store_1.default.list;
        return Object.keys(allWindows).reduce(function (memo, win) {
            var window = allWindows[win];
            if (window
                && window.API.tabGroupId
                && typeof window.API.tabGroupId !== "undefined"
                && typeof resultWindow.tabGroupId !== "undefined"
                && window.API.tabGroupId === resultWindow.tabGroupId) {
                memo.push(window.API);
            }
            return memo;
        }, []);
    }
    function mapWindowIdsToWindowObjects(windowIdArr) {
        return windowIdArr.reduce(function (memo, winId) {
            var window = store_1.default.get(winId);
            if (window) {
                memo.push(window.API);
            }
            return memo;
        }, []);
    }
    function getNeighboursByDirection(direction) {
        var windowIds = _neighbours[direction];
        if (typeof windowIds !== "undefined") {
            return mapWindowIdsToWindowObjects(windowIds);
        }
    }
    //#endregion "Internal function"
    //#region "API"
    resultWindow = {
        get name() {
            return _name;
        },
        get application() {
            return executor.application;
        },
        get hostInstance() {
            return executor.hostInstance;
        },
        get agmInstance() {
            return {
                application: resultWindow.context._APPLICATION_NAME_ || resultWindow.context._t42.application,
            };
        },
        get url() {
            return _url;
        },
        id: id,
        get title() {
            return _title;
        },
        get windowStyleAttributes() {
            return _settings;
        },
        get settings() {
            return _settings;
        },
        get tabGroupId() {
            return _tabGroupId;
        },
        get frameButtons() {
            return _frameButtons;
        },
        get mode() {
            return _mode;
        },
        get state() {
            return _windowState;
        },
        get isCollapsed() {
            return isCollapsed;
        },
        get isVisible() {
            return _isVisible;
        },
        get isLocked() {
            return _isLocked;
        },
        get context() {
            return _context;
        },
        get bounds() {
            return _bounds;
        },
        get isFocused() {
            return _focus;
        },
        get frameColor() {
            return _frameColor;
        },
        get opened() {
            return resultWindow.id === undefined;
        },
        get group() {
            return _group;
        },
        get groupId() {
            return _groupId;
        },
        get topNeighbours() {
            return getNeighboursByDirection("top");
        },
        get leftNeighbours() {
            return getNeighboursByDirection("left");
        },
        get rightNeighbours() {
            return getNeighboursByDirection("right");
        },
        get bottomNeighbours() {
            return getNeighboursByDirection("bottom");
        },
        get isGroupHeaderVisible() {
            return _isGroupHeaderVisible;
        },
        get activityId() {
            if (_context._t42) {
                return _context._t42.activityId;
            }
            return undefined;
        },
        get activityWindowId() {
            if (_context._t42) {
                return _context._t42.activityWindowId;
            }
            return undefined;
        },
        maximize: maximize,
        restore: restore,
        minimize: minimize,
        maximizeRestore: maximizeRestore,
        collapse: collapse,
        expand: expand,
        toggleCollapse: toggleCollapse,
        focus: focus,
        activate: activate,
        moveResize: moveResize,
        setTitle: setTitle,
        setStyle: setStyle,
        navigate: navigate,
        addFrameButton: addFrameButton,
        removeFrameButton: removeFrameButton,
        setVisible: setVisible,
        close: close,
        snap: snap,
        showLoader: showLoader,
        hideLoader: hideLoader,
        updateContext: updateContext,
        lock: lock,
        unlock: unlock,
        getIcon: getIcon,
        setIcon: setIcon,
        setFrameColor: setFrameColor,
        attachTab: attachTab,
        detachTab: detachTab,
        setTabHeaderVisible: setTabHeaderVisible,
        onClose: onClose,
        onUrlChanged: onUrlChanged,
        onTitleChanged: onTitleChanged,
        onFrameButtonAdded: onFrameButtonAdded,
        onFrameButtonRemoved: onFrameButtonRemoved,
        onFrameButtonClicked: onFrameButtonClicked,
        onCollapsed: onCollapsed,
        onExpanded: onExpanded,
        onMinimized: onMinimized,
        onMaximized: onMaximized,
        onNormal: onNormal,
        onAttached: onAttached,
        onDetached: onDetached,
        onVisibilityChanged: onVisibilityChanged,
        onContextUpdated: onContextUpdated,
        onLockingChanged: onLockingChanged,
        onBoundsChanged: onBoundsChanged,
        onFrameColorChanged: onFrameColorChanged,
        onFocusChanged: onFocusChanged,
        onGroupChanged: onGroupChanged,
        onWindowAttached: onWindowAttached,
        onWindowDetached: onWindowDetached,
        onTabSelectionChanged: onTabSelectionChanged,
        onTabHeaderVisibilityChanged: onTabHeaderVisibilityChanged,
        get tabs() {
            return getAllTabs();
        },
        get isTabHeaderVisible() {
            return _isTabHeaderVisible;
        },
        get isTabSelected() {
            return _isTabSelected;
        },
    };
    //#endregion "API"
    //#endregion "Group Events"
    var events = {
        handleWindowClose: handleWindowClose,
        handleWindowChangeState: handleWindowChangeState,
        handleTitleChanged: handleTitleChanged,
        handleVisibilityChanged: handleVisibilityChanged,
        handleUrlChanged: handleUrlChanged,
        handleWindowSettingsChanged: handleWindowSettingsChanged,
        handleContextUpdated: handleContextUpdated,
        handleFrameIsLockedChanged: handleFrameIsLockedChanged,
        handleBoundsChanged: handleBoundsChanged,
        handleFocusChanged: handleFocusChanged,
        handleFrameButtonAdded: handleFrameButtonAdded,
        handleFrameButtonRemoved: handleFrameButtonRemoved,
        handleFrameButtonClicked: handleFrameButtonClicked,
        handleFrameColorChanged: handleFrameColorChanged,
        handleFrameAttached: handleFrameAttached,
        handleFrameSelectionChanged: handleFrameSelectionChanged,
        handleCompositionChanged: handleCompositionChanged,
        handleGroupHeaderVisibilityChanged: handleGroupHeaderVisibilityChanged,
        handleTabHeaderVisibilityChanged: handleTabHeaderVisibilityChanged,
        handleGroupChanged: handleGroupChanged,
        handleGroupAssociation: handleGroupAssociation,
        handleAttached: handleAttached,
        handleDetached: handleDetached,
        handleWindowAttached: handleWindowAttached,
        handleWindowDetached: handleWindowDetached,
    };
    return {
        API: resultWindow,
        Events: events,
    };
};
//# sourceMappingURL=window.js.map

/***/ }),
/* 13 */
/***/ (function(module, exports) {

/* (ignored) */

/***/ })
/******/ ]);
});
//# sourceMappingURL=tick42-windows.js.map

/***/ })
/******/ ]);
});
//# sourceMappingURL=tick42-glue.js.map