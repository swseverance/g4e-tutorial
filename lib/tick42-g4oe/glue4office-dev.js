(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("glue4office", [], factory);
	else if(typeof exports === 'object')
		exports["glue4office"] = factory();
	else
		root["glue4office"] = factory();
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
/******/ 	return __webpack_require__(__webpack_require__.s = 10);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tick42_glue_core_1 = __webpack_require__(5);
var es6_promise_1 = __webpack_require__(1);
var outlook = __webpack_require__(6).default;
var excel = __webpack_require__(4).default;
var word = __webpack_require__(7).default;
var pjson = __webpack_require__(2);
var config_1 = __webpack_require__(9);
exports.default = function (options) {
    // get config object
    // basically selecting some properties (and defaulting them)
    // it's used to extract things like layouts, appManager, activities etc things
    // that glueCore itself doesn't know about
    options = options || {};
    var glueConfig = config_1.default(options);
    function createOutlook(core) {
        if (glueConfig.outlook) {
            return outlook({ agm: core.agm });
        }
    }
    function createExcel(core) {
        if (glueConfig.excel) {
            return excel({ agm: core.agm });
        }
    }
    function createWord(core) {
        if (glueConfig.word) {
            return word({ agm: core.agm });
        }
    }
    function extendExistingGlue(glue) {
        glue.outlook = createOutlook(glue);
        glue.excel = createExcel(glue);
        glue.word = createWord(glue);
        ext.enrichGlue(glue);
    }
    var ext = {
        // define extra libraries for glue-core to raise
        libs: [
            { name: "outlook", create: createOutlook },
            { name: "excel", create: createExcel },
            { name: "word", create: createWord },
        ],
        version: pjson.version,
        enrichGlue: function (glue) {
            // put some data to config
            glue.config.outlook = glueConfig.outlook;
            glue.config.excel = glueConfig.excel;
            glue.config.word = glueConfig.word;
        },
    };
    // users can pass existing glue object (that can be glue-core or glue)
    // in that case it will be extended with office libs
    if (options.glue) {
        extendExistingGlue(options.glue);
        return es6_promise_1.Promise.resolve(options.glue);
    }
    return tick42_glue_core_1.default(options, ext);
};
//# sourceMappingURL=glue4office.js.map

/***/ }),
/* 1 */
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
    var vertx = __webpack_require__(11);
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

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3), __webpack_require__(8)))

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = {"name":"glue4office","version":"1.0.0","description":"glue for office","main":"dist/node/glue4office.js","browser":"dist/web/glue4office.js","types":"types/index.d.ts","docName":"Glue4Office","scripts":{"clean":"node ./build/scripts/clean.js","pre:build":"npm run tslint && tsc && set NODE_ENV=development && npm run clean","file-versionify":"node ./build/scripts/file-versionify.js","tslint":"tslint -t codeFrame ./src/**/*.ts","tslint:fix":"tslint -t codeFrame --fix ./src/**/*.ts","watch":"onchange ./src/**/*.ts -- npm run build:dev","build:dev":"npm run pre:build && set NODE_ENV=development && webpack && npm run file-versionify && npm run types","build:prod":"npm run pre:build && set NODE_ENV=development && webpack && set NODE_ENV=production && webpack && npm run file-versionify && npm run types","docs":"typedoc --options typedoc.json ./src","types":"node ./build/scripts/copy-types.js","types:merged":"dts-generator --project ./ --out ./types/index.d.ts","generate-docs":"tick42-reference-docs -l 1.0.0,2.1.1 -d D:\\test-reference-docs -p g4o -m tick42-outlook,tick42-excel,tick42-word,tick42-agm","prepublish":"npm update && npm run build:prod"},"author":"Tick42","license":"ISC","precommit":"tslint","devDependencies":{"callback-registry":"^2.3.1","dts-generator":"^2.1.0","es6-promise":"^4.1.1","onchange":"3.*","pre-commit":"^1.1.3","shelljs":"^0.6.0","tick42-webpack-config":"^4.1.6","tslint":"^5.8.0","typedoc":"^0.9.0","typescript":"^2.5.3","webpack":"2.3.3"},"dependencies":{"tick42-excel":"^1.0.2","tick42-glue-core":"^3.5.10","tick42-outlook":"1.0.1","tick42-word":"1.0.0"}}

/***/ }),
/* 3 */
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
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

(function webpackUniversalModuleDefinition(root, factory) {
	if(true)
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("tick42-excel", [], factory);
	else if(typeof exports === 'object')
		exports["tick42-excel"] = factory();
	else
		root["tick42-excel"] = factory();
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
/******/ 	return __webpack_require__(__webpack_require__.s = 15);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var randomFromSeed = __webpack_require__(12);

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

"use strict";


var randomByte = __webpack_require__(11);

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
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var shortid = __webpack_require__(6);
function getColumnsAsJson(columns) {
    var modifiedColumns = columns.map(function (col) {
        var column = {
            name: col.fieldName || "",
            text: col.header || col.fieldName,
            foregroundColor: col.foregroundColor || "",
            backgroundColor: col.backgroundColor || "",
            width: isNumber(col.width) ? col.width : null,
        };
        if (col.validation) {
            column.validation = {
                type: ("xlValidate" + col.validation.type),
                alert: ("xlValidAlert" + col.validation.alert),
                list: col.validation.list || null,
            };
        }
        return column;
    });
    return modifiedColumns;
}
function getDataAsJson(columns, data) {
    var modifiedData = data.map(function (row) {
        var dataList = [];
        columns
            .map(function (col) { return col.fieldName; })
            .forEach(function (name) { return dataList.push(row[name] || ""); });
        return { data: dataList };
    });
    return modifiedData;
}
function getOptions(options) {
    // This is object, which is used to convert options from friendly name to the method's params and sets the default value
    var methodOptions = {
        clearGrid: {
            default: true,
            friendlyName: undefined,
        },
        workbook: {
            default: shortid.generate(),
            friendlyName: undefined,
        },
        dataWorksheet: {
            default: shortid.generate(),
            friendlyName: "worksheet",
        },
        templateWorkbook: undefined,
        viewWorksheet: undefined,
        response: {
            default: "image",
            friendlyName: "payloadType",
        },
        inhibitLocalSave: undefined,
        glueMethod: {
            default: "ValidateShowGrid",
            friendlyName: undefined,
        },
        buttonText: undefined,
        buttonRange: {
            default: "A1",
            friendlyName: undefined,
        },
        topLeft: {
            default: "A1",
            friendlyName: undefined,
        },
        triggers: {
            default: ["save"],
            friendlyName: "updateTrigger",
        },
        dataRangeName: undefined,
        window: undefined,
        chunkSize: {
            default: 1000,
            friendlyName: undefined,
        },
        disableErrorViewer: undefined,
        autostart: undefined,
        displayName: undefined,
    };
    var updatedOptions = {};
    options = options || {};
    Object.keys(methodOptions).forEach(function (key) {
        var value = methodOptions[key];
        var friendlyName = value ? value.friendlyName : undefined;
        var defaultValue = value ? value.default : undefined;
        if (friendlyName) {
            updatedOptions[key] = options[friendlyName];
        }
        else {
            updatedOptions[key] = options[key];
        }
        if (!updatedOptions[key]) {
            updatedOptions[key] = defaultValue;
        }
    });
    return updatedOptions;
}
function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}
function parseAgmResult(r) {
    var resp;
    try {
        resp = JSON.parse(r.returned.result).success;
    }
    catch (error) {
        resp = false;
    }
    return resp;
}
exports.parseAgmResult = parseAgmResult;
function convertParams(columns, data, options, cookie) {
    var params = {
        columnsAsJSON: JSON.stringify(getColumnsAsJson(columns)),
        dataAsJSON: JSON.stringify(getDataAsJson(columns, data)),
        cookie: cookie ? cookie : shortid.generate(),
    };
    var op = getOptions(options);
    Object.assign(params, op);
    return {
        params: params,
        options: op,
    };
}
exports.convertParams = convertParams;
//# sourceMappingURL=utils.js.map

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = {"name":"tick42-excel","version":"1.0.0","description":"A GlueExcel Wrapper.","main":"dist/node/tick42-excel.js","browser":"dist/web/tick42-excel.js","types":"types/index.d.ts","docName":"Excel","scripts":{"clean":"node ./build/scripts/clean.js","pre:build":"npm run tslint && tsc && set NODE_ENV=development && npm run clean","file-versionify":"node ./build/scripts/file-versionify.js","tslint":"tslint -t codeFrame ./src/**/*.ts","tslint:fix":"tslint -t codeFrame --fix ./src/**/*.ts","watch":"onchange ./src/**/*.ts -- npm run build:dev","build:dev":"npm run pre:build && set NODE_ENV=development && webpack && npm run file-versionify && npm run types","build:prod":"npm run pre:build && set NODE_ENV=development && webpack && set NODE_ENV=production && webpack && npm run file-versionify && npm run types","docs":"typedoc --options typedoc.json ./src","types":"node ./build/scripts/copy-types.js","types:merged":"dts-generator --project ./ --out ./types/index.d.ts"},"author":"Tick42","license":"ISC","precommit":"tslint","devDependencies":{"@types/tick42-agm":"^3.5.4","callback-registry":"^2.3.1","dts-generator":"^2.1.0","onchange":"3.*","pre-commit":"^1.1.3","shelljs":"^0.6.0","shortid":"^2.2.8","tick42-webpack-config":"^4.1.6","tslint":"5.*","typedoc":"^0.9.0","typescript":"^2.5.3","webpack":"2.3.3"},"dependencies":{"@types/shortid":"0.0.29"}}

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var callback_registry_1 = __webpack_require__(1);
var const_1 = __webpack_require__(14);
var sheet_1 = __webpack_require__(16);
var utils_1 = __webpack_require__(3);
var ExcelImp = /** @class */ (function () {
    function ExcelImp(agm) {
        var _this = this;
        this._registry = callback_registry_1.default();
        this._sheets = {};
        this._isExcelStarted = false;
        this.openSheet = function (sheetData) {
            return new Promise(function (resolve, reject) {
                if (!sheetData) {
                    reject("Can not open a sheet without config");
                    return;
                }
                if (!sheetData.columnConfig || !Array.isArray(sheetData.columnConfig)) {
                    reject("Missing or incorrect type `columnConfig` property");
                    return;
                }
                if (!sheetData.data || !Array.isArray(sheetData.data)) {
                    reject("Missing or incorrect type of `data` property");
                    return;
                }
                var convertedParams = utils_1.convertParams(sheetData.columnConfig, sheetData.data, sheetData.options);
                var successHandler = function (r) {
                    if (utils_1.parseAgmResult(r)) {
                        var sheet = new sheet_1.default(convertedParams.params.cookie, sheetData, _this.invokeShowGridMethod.bind(_this));
                        _this._sheets[convertedParams.params.cookie] = sheet;
                        resolve(sheet.asSheetAPI);
                    }
                };
                var errorHandler = function (err) {
                    reject(err);
                };
                return _this.invokeShowGridMethod(convertedParams.params).then(successHandler).catch(errorHandler);
            });
        };
        this.onAddinStatusChanged = function (callback) {
            return _this._registry.add("onAddinStatusChanged", callback);
        };
        this._agm = agm;
        this.registerAgmMethod();
    }
    Object.defineProperty(ExcelImp.prototype, "all", {
        get: function () {
            var _this = this;
            return Object.keys(this._sheets).map(function (k) {
                return _this._sheets[k].asSheetAPI;
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ExcelImp.prototype, "addinStatus", {
        get: function () {
            return this._isExcelStarted;
        },
        enumerable: true,
        configurable: true
    });
    ExcelImp.prototype.registerAgmMethod = function () {
        var _this = this;
        this._agm.register({
            name: const_1.ValidateShowGridMethodName,
            accepts: "string cookie, string workbook, string worksheet, string updateType, string dataAsJSON",
        }, function (args, caller) {
            if (args.cookie) {
                var currentSheet = _this._sheets[args.cookie];
                if (currentSheet) {
                    return currentSheet._onUpdate(args);
                }
            }
            return undefined;
        });
        this._agm.methodAdded(function (method) {
            if (method.name === const_1.ShowGridMethodName) {
                _this._isExcelStarted = true;
                _this._registry.execute("onAddinStatusChanged", true);
            }
        });
        this._agm.methodRemoved(function (method) {
            if (method.name === const_1.ShowGridMethodName) {
                _this._isExcelStarted = false;
                _this._registry.execute("onAddinStatusChanged", false);
            }
        });
    };
    ExcelImp.prototype.invokeShowGridMethod = function (params) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (_this._isExcelStarted) {
                _this._agm.invoke(const_1.ShowGridMethodName, params)
                    .then(function (response) {
                    resolve(response);
                }).catch(function (e) {
                    reject(e);
                });
            }
            else {
                reject("Microsoft Excel with Tick42 Add-in is not running");
            }
        });
    };
    return ExcelImp;
}());
exports.default = ExcelImp;
//# sourceMappingURL=excel.js.map

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = __webpack_require__(9);


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var encode = __webpack_require__(2);
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
/* 8 */
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
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var alphabet = __webpack_require__(0);
var encode = __webpack_require__(2);
var decode = __webpack_require__(8);
var build = __webpack_require__(7);
var isValid = __webpack_require__(10);

// if you are using cluster or multiple servers use this to make each instance
// has a unique value for worker
// Note: I don't know if this is automatically set when using third
// party cluster solutions such as pm2.
var clusterWorkerId = __webpack_require__(13) || 0;

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
/* 10 */
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
/* 11 */
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
/* 12 */
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
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = 0;


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.ShowGridMethodName = "T42.ExcelPad.ShowGrid";
exports.ValidateShowGridMethodName = "ValidateShowGrid";
//# sourceMappingURL=const.js.map

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var excel_1 = __webpack_require__(5);
var PackageJson = __webpack_require__(4);
exports.default = function (config) {
    var excel = new excel_1.default(config.agm);
    function ready() {
        return new Promise(function (resolve, reject) {
            resolve(api);
        });
    }
    var api = {
        version: PackageJson.version,
        ready: ready,
        openSheet: excel.openSheet,
        get sheets() {
            return excel.all;
        },
        onAddinStatusChanged: excel.onAddinStatusChanged,
        get addinStatus() {
            return excel.addinStatus;
        },
    };
    return api;
};
//# sourceMappingURL=main.js.map

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var callback_registry_1 = __webpack_require__(1);
var utils_1 = __webpack_require__(3);
var SheetImpl = /** @class */ (function () {
    function SheetImpl(cookie, config, invokeShowGrid) {
        var _this = this;
        this._registry = callback_registry_1.default();
        this.errorCallback = function (errors) {
            _this._validationResponse = {
                isValid: false,
                errorsAsJSON: JSON.stringify(errors),
            };
        };
        this.doneCallback = function () {
            _this._validationResponse = {
                isValid: true,
            };
        };
        this._id = cookie;
        this._name = config.options ? config.options.worksheet : "";
        this._data = config.data;
        this._workbook = config.options ? config.options.workbook : "";
        this._columns = config.columnConfig;
        this._options = config.options;
        this._invokeMethod = invokeShowGrid;
    }
    Object.defineProperty(SheetImpl.prototype, "asSheetAPI", {
        get: function () {
            var _this = this;
            var that = this;
            if (!this._sheet) {
                this._sheet = {
                    name: this._name,
                    workbook: this._workbook,
                    options: this._options,
                    get data() { return that._data; },
                    get columnConfig() { return that._columns; },
                    update: function (data) { return _this.update(data); },
                    onChanged: function (callback) { return _this.onChanged(callback); },
                    changeColumnConfig: function (columnConfig, data) { return _this.changeColumnConfig(columnConfig, data); },
                };
            }
            return this._sheet;
        },
        enumerable: true,
        configurable: true
    });
    SheetImpl.prototype.changeColumnConfig = function (columnConfig, data) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (!columnConfig) {
                reject("Can not change column in the sheet without columnConfig");
                return;
            }
            if (!data) {
                data = _this._data;
            }
            var convertedParams = utils_1.convertParams(columnConfig, data, _this._options, _this._id);
            var successHandler = function () {
                _this._data = data;
                resolve();
            };
            _this._invokeMethod(convertedParams.params)
                .then(successHandler)
                .catch(reject);
        });
    };
    SheetImpl.prototype.update = function (data) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (!data || !Array.isArray(data)) {
                reject("Can not update sheet with empty or incorrect type `data`");
                return;
            }
            var convertedParams = utils_1.convertParams(_this._columns, data, _this._options, _this._id);
            _this._invokeMethod(convertedParams.params)
                .then(function () {
                _this._data = data;
                resolve();
            })
                .catch(reject);
        });
    };
    SheetImpl.prototype.onChanged = function (callback) {
        return this._registry.add("on-changed", callback);
    };
    SheetImpl.prototype._onUpdate = function (args) {
        this._name = args.worksheet;
        this._workbook = args.workbook;
        var rows;
        try {
            rows = JSON.parse(args.dataAsJSON);
        }
        catch (error) {
            console.error(error);
            return;
        }
        // Merge with current data
        this.mergeData(rows);
        this._registry.execute("on-changed", this._data, this.errorCallback, this.doneCallback);
        return this._validationResponse;
    };
    SheetImpl.prototype.mergeData = function (updatedData) {
        var _this = this;
        var dataAfterMerged = [];
        var isRowMode = this._options.payloadType === "row" /* row */;
        if (isRowMode) {
            // We need to add the old data, because our mode is row, so we will receive only the rows, which are modified, deleted and inserted
            dataAfterMerged = this._data;
        }
        updatedData.forEach(function (row) {
            var beforeActualIndex = row.rowBeforeIndex - 1;
            var afterActualIndex = row.rowAfterIndex - 1;
            // This action is used only in image mode, so we need to copy the unchanged data to the updated index
            if (row.action === "unchanged") {
                dataAfterMerged[afterActualIndex] = _this._data[beforeActualIndex];
            }
            else if (row.action === "deleted") {
                // We need to delete a certain row, only if we are in row mode
                // if we are in image mode, we don't care for deleted rows
                if (isRowMode) {
                    dataAfterMerged.splice(beforeActualIndex, 1);
                }
            }
            else if (row.action === "modified") {
                row.row.forEach(function (updateFieldData, i) {
                    if (updateFieldData === null) {
                        // this means that the data in this field is unchanged
                        return;
                    }
                    var fieldName = _this._columns[i].fieldName;
                    var rowData = _this._data[beforeActualIndex];
                    rowData[fieldName] = updateFieldData;
                    dataAfterMerged[beforeActualIndex] = rowData;
                });
            }
            else if (row.action === "inserted") {
                var insertedObj_1 = {};
                row.row.forEach(function (updateFieldData, i) {
                    var fieldName = _this._columns[i].fieldName;
                    insertedObj_1[fieldName] = updateFieldData || undefined;
                });
                dataAfterMerged.splice(afterActualIndex, 0, insertedObj_1);
            }
        });
        this._data = dataAfterMerged;
    };
    return SheetImpl;
}());
exports.default = SheetImpl;
//# sourceMappingURL=sheet.js.map

/***/ })
/******/ ]);
});
//# sourceMappingURL=tick42-excel.js.map

/***/ }),
/* 5 */
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

module.exports = {"_from":"tick42-agm@3.5.19","_id":"tick42-agm@3.5.19","_inBundle":false,"_integrity":"sha1-8naByIK/r2NjiC4OA9843g3r42A=","_location":"/tick42-agm","_phantomChildren":{},"_requested":{"type":"version","registry":true,"raw":"tick42-agm@3.5.19","name":"tick42-agm","escapedName":"tick42-agm","rawSpec":"3.5.19","saveSpec":null,"fetchSpec":"3.5.19"},"_requiredBy":["/"],"_resolved":"http://repo.tick42.com:8081/artifactory/api/npm/tick42-npm/tick42-agm/-/tick42-agm-3.5.19.tgz","_shasum":"f27681c882bfaf6363882e0e03df38de0debe360","_spec":"tick42-agm@3.5.19","_where":"D:\\source\\glue-dev\\node_modules\\tick42-glue-core","author":{"name":"Tick42","url":"http://www.tick42.com"},"bundleDependencies":false,"dependencies":{"callback-registry":"^2.2.7","shortid":"^2.2.8","util-deprecate":"^1.0.2"},"deprecated":false,"description":"JavaScript AGM","devDependencies":{"babel-core":"^6.25.0","babel-loader":"^6.2.5","babel-plugin-add-module-exports":"^0.2.1","babel-plugin-es6-promise":"^1.0.0","babel-preset-es2015":"^6.16.0","babel-preset-stage-2":"^6.22.0","blanket":"^1.1.6","bluebird":"^2.9.30","docdash":"^0.4.0","es6-promise":"^4.1.0","eslint":"^3.1.1","eslint-config-standard":"^5.3.5","eslint-config-tick42":"*","eslint-plugin-promise":"^2.0.0","eslint-plugin-standard":"^2.0.0","http-server":"^0.9.0","minifyify":"^7.3.2","onchange":"^2.1.2","phantomjs":"^1.9.12","pre-commit":"^1.1.3","qunitjs":"^1.15.0","shelljs":"^0.6.0","tick42-webpack-config":"*","webpack":"2.3.3"},"docName":"Interop","keywords":["agm","javascript","library"],"main":"src/main.js","name":"tick42-agm","precommit":"eslint","scripts":{"build":"npm run eslint && webpack","eslint":"eslint library","eslint:fix":"eslint library --fix","generate-docs":"jsdoc -c jsdoc-config.json","prepublish":"npm update & npm run build","serve":"http-server -p 8000 -a 127.0.0.1","test":"npm run eslint && mocha --require ./test/test_helper \"test/**/*.js\"","watch":"onchange \"./library/**/*.js\" -iv -e \"./bin\" -- npm run build","watch-docs":"onchange \"./library/*.js\" -iv -e \"./bin\" -- npm run generate-docs"},"title":"Tick42 AGM","types":"types/index.d.ts","version":"3.5.19"}

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

module.exports = {"name":"tick42-glue-core","version":"3.5.10","description":"Glue42 core library including logger, connection, agm and metrics","main":"./dist/node/tick42-glue-core.js","types":"./glue.d.ts","browser":"./dist/web/tick42-glue-core.js","scripts":{"init-dev-mode":"node ./build/scripts/init-dev-mode.js","remove-installed-dependencies":"node ./build/scripts/remove-installed-dependencies.js","clean":"node ./build/scripts/clean.js","pre:build":"npm run tslint && tsc && set NODE_ENV=development && npm run clean","file-versionify":"node ./build/scripts/file-versionify.js","tslint":"tslint -t codeFrame ./src/**.ts","tslint:fix":"tslint -t codeFrame --fix ./src/**.ts","watch":"onchange ./src/**/*.ts -- npm run build:dev","build:dev":"npm run pre:build && set NODE_ENV=development && webpack && npm run file-versionify && npm run types","build:prod":"npm run pre:build && set NODE_ENV=development && webpack && set NODE_ENV=production && webpack && npm run file-versionify","docs":"typedoc --options typedoc.json ./src","prepublish":"npm run build:prod && npm run test:only","types":"node ./build/scripts/copy-types.js","test":"npm run build:dev && npm run test:only","test:only":"mocha ./tests/ --recursive","test:core":"mocha ./tests/core","test:agm":"mocha ./tests/agm"},"repository":{"type":"git","url":"https://stash.tick42.com/scm/tg/js-glue-core.git"},"author":{"name":"Tick42","url":"http://www.glue42.com"},"license":"ISC","dependencies":{"shortid":"^2.2.6","tick42-agm":"3.5.19","tick42-gateway-connection":"^2.4.6","tick42-logger":"^3.0.11","tick42-metrics":"^2.4.1"},"devDependencies":{"@types/es6-promise":"0.0.32","@types/shortid":"0.0.29","archiver":"^1.3.0","babel-core":"^6.25.0","babel-loader":"^6.4.1","babel-plugin-add-module-exports":"^0.2.1","babel-plugin-es6-promise":"^1.0.0","babel-preset-es2015":"^6.16.0","babel-preset-stage-2":"^6.22.0","chai":"^4.0.2","deep-equal":"^1.0.1","es6-promise":"^4.1.0","mocha":"^2.5.3","onchange":"3.*","pre-commit":"^1.1.3","readline-sync":"^1.4.5","shelljs":"^0.6.0","tick42-gateway":"^0.2.2","tick42-webpack-config":"4.1.6","tslint":"^5.4.3","typedoc":"^0.5.10","typescript":"2.3.0","webpack":"2.3.3"}}

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

module.exports = {"name":"tick42-gateway-connection","version":"2.4.6","description":"Tick42 Gateway Connection.","precommit":"tslint","main":"dist/node/tick42-gateway-connection.js","browser":"dist/web/tick42-gateway-connection.js","types":"types/index.d.ts","docName":"Gateway Connection","scripts":{"clean":"node ./build/scripts/clean.js","pre:build":"npm run tslint && tsc && set NODE_ENV=development && npm run clean","tslint":"tslint -t codeFrame ./src/**/*.ts","tslint:fix":"tslint -t codeFrame --fix ./src/**/*.ts","watch":"onchange ./src/**/*.ts -- npm run build:dev","build:dev":"npm run pre:build && set NODE_ENV=development && webpack && npm run types","build:prod":"npm run pre:build && set NODE_ENV=development && webpack && set NODE_ENV=production && webpack && npm run types","docs":"typedoc --options typedoc.json ./src","types":"node ./build/scripts/copy-types.js","types:merged":"dts-generator --project ./ --out ./types/index.d.ts","prepublish":"npm run build:prod && npm run test:only","test":"npm run build:dev && mocha ./tests","test:only":"mocha ./tests","test:only:reconnect":"mocha ./tests/gw3.reconnect.js"},"devDependencies":{"@types/es6-promise":"0.0.32","@types/shortid":"0.0.28","babel-core":"^6.25.0","babel-loader":"^6.4.1","babel-plugin-add-module-exports":"^0.2.1","babel-plugin-es6-promise":"^1.0.0","babel-preset-es2015":"^6.16.0","babel-preset-stage-2":"^6.22.0","chai":"^4.0.2","dts-generator":"^2.1.0","es6-promise":"^4.1.0","mocha":"^3.4.2","onchange":"3.*","pre-commit":"^1.1.3","shelljs":"^0.6.0","tick42-gateway":"^0.2.2","tick42-logger":"^3.0.8","tick42-webpack-config":"4.1.6","ts-node":"^3.0.6","tslint":"^5.4.3","typedoc":"^0.5.10","typescript":"^2.5.3","webpack":"2.3.3"},"dependencies":{"callback-registry":"^2.2.7","shortid":"^2.2.6","ws":"^0.7.2"}}

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
var ConnectionImpl = /** @class */ (function () {
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
var GW3ConnectionImpl = /** @class */ (function (_super) {
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
var GW1Protocol = /** @class */ (function () {
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
var GW2Protocol = /** @class */ (function () {
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
        // TODO fix for Technologica IE 11 - revise URLSearchParams
        if (typeof location !== "undefined" && location.search && typeof URLSearchParams !== "undefined") {
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
var HCProtocol = /** @class */ (function () {
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
var HCTransport = /** @class */ (function () {
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
var HTTPTransport = /** @class */ (function () {
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
var Inproc = /** @class */ (function () {
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
var WS = /** @class */ (function () {
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

module.exports = {"name":"tick42-logger","version":"3.0.11","docName":"Logger","description":"Glue library for logging","main":"dist/node/tick42-logger.js","browser":"dist/web/tick42-logger.js","types":"./types/index.d.ts","scripts":{"clean":"node ./build/scripts/clean.js","pre:build":"npm run tslint && tsc && set NODE_ENV=development && npm run clean","file-versionify":"node ./build/scripts/file-versionify.js","tslint":"tslint -t codeFrame ./src/**/*.ts","tslint:fix":"tslint -t codeFrame --fix ./src/**/*.ts","watch":"onchange ./src/**/*.ts -- npm run build:dev","build:dev":"npm run pre:build && set NODE_ENV=development && webpack && npm run file-versionify && npm run types","build:prod":"npm run pre:build && set NODE_ENV=development && webpack && set NODE_ENV=production && webpack && npm run file-versionify && npm run types","docs":"typedoc --options typedoc.json ./src","types":"node ./build/scripts/copy-types.js","prepublish":"npm run build:prod","types:merged":"dts-generator --project ./ --out ./types/index.d.ts"},"repository":{"type":"git","url":"https://stash.tick42.com:8443/scm/ofgw/js-logger.git"},"author":"Tick42","license":"ISC","precommit":"tslint:fix","devDependencies":{"babel-core":"^6.17.0","json-loader":"^0.5.7","babel-loader":"^6.4.1","babel-plugin-add-module-exports":"^0.2.1","babel-plugin-es6-promise":"^1.0.0","babel-preset-es2015":"^6.16.0","babel-preset-stage-2":"^6.22.0","dts-generator":"^2.1.0","es6-promise":"^4.1.0","onchange":"3.*","pre-commit":"^1.1.3","shelljs":"^0.6.0","tick42-webpack-config":"4.1.1","tslint":"^5.4.3","typedoc":"^0.5.10","typescript":"2.3.0","webpack":"2.3.3"},"dependencies":{"@types/node":"^8.0.47","@types/tick42-gateway-connection":"^2.2.8","@types/tick42-metrics":"^2.3.1"}}

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


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    validate: function validate(definition, parent, transport) {
        // TODO: Add validation for parent, transport, system
        if (definition === null || (typeof definition === "undefined" ? "undefined" : _typeof(definition)) !== "object") {
            throw new Error("Missing definition");
        }
        if (parent === null || (typeof parent === "undefined" ? "undefined" : _typeof(parent)) !== "object") {
            throw new Error("Missing parent");
        }
        if (transport === null || (typeof transport === "undefined" ? "undefined" : _typeof(transport)) !== "object") {
            throw new Error("Missing transport");
        }
    }
};
//# sourceMappingURL=helpers.js.map

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = {
	"name": "tick42-metrics",
	"version": "2.4.1",
	"description": "",
	"main": "dist/node/tick42-metrics.js",
	"browser": "dist/web/tick42-metrics.js",
	"types": "types/index.d.ts",
	"docName": "Metrics",
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
		"prepublish": "npm run build:prod",
		"types:merged": "dts-generator --project ./ --out ./types/index.d.ts"
	},
	"author": "Tick42",
	"license": "ISC",
	"precommit": "tslint:fix",
	"devDependencies": {
		"@types/tick42-gateway-connection": "*",
		"@types/tick42-logger": "^3.0.6",
		"babel-core": "^6.17.0",
		"babel-loader": "^6.4.1",
		"babel-plugin-add-module-exports": "^0.2.1",
		"babel-plugin-es6-promise": "^1.0.0",
		"babel-preset-es2015": "^6.16.0",
		"babel-preset-stage-2": "^6.22.0",
		"dts-generator": "^2.1.0",
		"es6-promise": "^4.1.0",
		"onchange": "3.*",
		"pre-commit": "^1.1.3",
		"shelljs": "^0.6.0",
		"tick42-webpack-config": "*",
		"tslint": "5.*",
		"typedoc": "^0.5.10",
		"typescript": "2.3.0",
		"webpack": "2.3.3"
	}
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", { value: true });
var serializer_1 = __webpack_require__(18);
function default_1(connection, config) {
    var DEFAULT_HEARTBEAT_INTERVAL = 3000;
    if (!connection || (typeof connection === "undefined" ? "undefined" : _typeof(connection)) !== "object") {
        throw new Error("Connection is required parameter");
    }
    var _connection = connection;
    var heartbeatInterval = config.heartbeatInterval || DEFAULT_HEARTBEAT_INTERVAL;
    var send = function send(type, message) {
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
            instance: repo.instance
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
                    path: system.path
                }
            });
        }
    }
    function updateSystem(system, state) {
        send("UpdateMetricSystem", {
            id: system.id,
            instance: system.repo.instance,
            state: state
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
        init: init
    };
    return me;
}
exports.default = default_1;
//# sourceMappingURL=gw1.js.map

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", { value: true });
var es6_promise_1 = __webpack_require__(6);
var serializer_1 = __webpack_require__(19);
function default_1(connection, config) {
    if (!connection || (typeof connection === "undefined" ? "undefined" : _typeof(connection)) !== "object") {
        throw new Error("Connection is required parameter");
    }
    var joinPromise;
    var session;
    var init = function init(repo) {
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
                        description: ""
                    },
                    Value: {
                        type: "number",
                        description: ""
                    }
                },
                description: "System state",
                context: {}
            };
            var defineRootMetricsMsg = {
                type: "define",
                metrics: [rootStateMetric]
            };
            session.send(defineRootMetricsMsg);
            if (reconnect) {
                replayRepo(repo);
            }
        });
        session.join(config.identity);
    };
    var replayRepo = function replayRepo(repo) {
        replaySystem(repo.root);
    };
    var replaySystem = function replaySystem(system) {
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
    var createSystem = function createSystem(system) {
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
                        description: ""
                    },
                    Value: {
                        type: "number",
                        description: ""
                    }
                },
                description: "System state",
                context: {}
            };
            var createMetricsMsg = {
                type: "define",
                metrics: [metric]
            };
            session.send(createMetricsMsg);
        });
    };
    var updateSystem = function updateSystem(system, state) {
        joinPromise.then(function () {
            var shadowedUpdateMetric = {
                type: "publish",
                values: [{
                    name: serializer_1.normalizeMetricName(system.path.join("/") + "/" + system.name + "/State"),
                    value: {
                        Description: state.description,
                        Value: state.state
                    },
                    timestamp: Date.now()
                }]
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
                        Value: stateObj.value
                    },
                    timestamp: Date.now()
                }]
            };
            session.send(rootMetric);
        });
    };
    var createMetric = function createMetric(metric) {
        joinPromise.then(function () {
            var m = serializer_1.serializeMetric(metric);
            var createMetricsMsg = {
                type: "define",
                metrics: [m]
            };
            session.send(createMetricsMsg);
            if (typeof metric.value !== "undefined") {
                updateMetric(metric);
            }
        });
    };
    var updateMetric = function updateMetric(metric) {
        joinPromise.then(function () {
            var value = serializer_1.getMetricValueByType(metric);
            var publishMetricsMsg = {
                type: "publish",
                values: [{
                    name: serializer_1.normalizeMetricName(metric.path.join("/") + "/" + metric.name),
                    value: value,
                    timestamp: Date.now()
                }]
            };
            session.send(publishMetricsMsg);
        });
    };
    return {
        init: init,
        createSystem: createSystem,
        updateSystem: updateSystem,
        createMetric: createMetric,
        updateMetric: updateMetric
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
            var documentClickHandler = function documentClickHandler(e) {
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
                        href: target.href || ""
                    }
                });
            };
            // Create click stream record
            clickStream_1.objectMetric("Page", {
                title: document.title,
                page: window.location.href
            });
            if (document.addEventListener) {
                document.addEventListener("click", documentClickHandler);
            } else {
                // For IE versions prior to IE9, attachEvent method should be used to register the specified listener
                // to the EventTarget it is called on, for others addEventListener should be used.
                // (<any>document)
                document.attachEvent("onclick", documentClickHandler);
            }
        }
        var startTime = rootSystem.stringMetric("StartTime", new Date().toString());
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
        }
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

"use strict";
/* WEBPACK VAR INJECTION */(function(process, global) {var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;var require;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*!
 * @overview es6-promise - a tiny implementation of Promises/A+.
 * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
 * @license   Licensed under MIT license
 *            See https://raw.githubusercontent.com/stefanpenner/es6-promise/master/LICENSE
 * @version   4.1.0
 */

(function (global, factory) {
  ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' ? module.exports = factory() :  true ? !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : global.ES6Promise = factory();
})(undefined, function () {
  'use strict';

  function objectOrFunction(x) {
    return typeof x === 'function' || (typeof x === 'undefined' ? 'undefined' : _typeof(x)) === 'object' && x !== null;
  }

  function isFunction(x) {
    return typeof x === 'function';
  }

  var _isArray = undefined;
  if (!Array.isArray) {
    _isArray = function _isArray(x) {
      return Object.prototype.toString.call(x) === '[object Array]';
    };
  } else {
    _isArray = Array.isArray;
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
  var isNode = typeof self === 'undefined' && typeof process !== 'undefined' && {}.toString.call(process) === '[object process]';

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
  function resolve(object) {
    /*jshint validthis:true */
    var Constructor = this;

    if (object && (typeof object === 'undefined' ? 'undefined' : _typeof(object)) === 'object' && object.constructor === Constructor) {
      return object;
    }

    var promise = new Constructor(noop);
    _resolve(promise, object);
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

  function tryThen(then, value, fulfillmentHandler, rejectionHandler) {
    try {
      then.call(value, fulfillmentHandler, rejectionHandler);
    } catch (e) {
      return e;
    }
  }

  function handleForeignThenable(promise, thenable, then) {
    asap(function (promise) {
      var sealed = false;
      var error = tryThen(then, thenable, function (value) {
        if (sealed) {
          return;
        }
        sealed = true;
        if (thenable !== value) {
          _resolve(promise, value);
        } else {
          fulfill(promise, value);
        }
      }, function (reason) {
        if (sealed) {
          return;
        }
        sealed = true;

        _reject(promise, reason);
      }, 'Settle: ' + (promise._label || ' unknown promise'));

      if (!sealed && error) {
        sealed = true;
        _reject(promise, error);
      }
    }, promise);
  }

  function handleOwnThenable(promise, thenable) {
    if (thenable._state === FULFILLED) {
      fulfill(promise, thenable._result);
    } else if (thenable._state === REJECTED) {
      _reject(promise, thenable._result);
    } else {
      subscribe(thenable, undefined, function (value) {
        return _resolve(promise, value);
      }, function (reason) {
        return _reject(promise, reason);
      });
    }
  }

  function handleMaybeThenable(promise, maybeThenable, then$$) {
    if (maybeThenable.constructor === promise.constructor && then$$ === then && maybeThenable.constructor.resolve === resolve) {
      handleOwnThenable(promise, maybeThenable);
    } else {
      if (then$$ === GET_THEN_ERROR) {
        _reject(promise, GET_THEN_ERROR.error);
        GET_THEN_ERROR.error = null;
      } else if (then$$ === undefined) {
        fulfill(promise, maybeThenable);
      } else if (isFunction(then$$)) {
        handleForeignThenable(promise, maybeThenable, then$$);
      } else {
        fulfill(promise, maybeThenable);
      }
    }
  }

  function _resolve(promise, value) {
    if (promise === value) {
      _reject(promise, selfFulfillment());
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

  function _reject(promise, reason) {
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
        _reject(promise, cannotReturnOwn());
        return;
      }
    } else {
      value = detail;
      succeeded = true;
    }

    if (promise._state !== PENDING) {
      // noop
    } else if (hasCallback && succeeded) {
      _resolve(promise, value);
    } else if (failed) {
      _reject(promise, error);
    } else if (settled === FULFILLED) {
      fulfill(promise, value);
    } else if (settled === REJECTED) {
      _reject(promise, value);
    }
  }

  function initializePromise(promise, resolver) {
    try {
      resolver(function resolvePromise(value) {
        _resolve(promise, value);
      }, function rejectPromise(reason) {
        _reject(promise, reason);
      });
    } catch (e) {
      _reject(promise, e);
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

  function Enumerator(Constructor, input) {
    this._instanceConstructor = Constructor;
    this.promise = new Constructor(noop);

    if (!this.promise[PROMISE_ID]) {
      makePromise(this.promise);
    }

    if (isArray(input)) {
      this._input = input;
      this.length = input.length;
      this._remaining = input.length;

      this._result = new Array(this.length);

      if (this.length === 0) {
        fulfill(this.promise, this._result);
      } else {
        this.length = this.length || 0;
        this._enumerate();
        if (this._remaining === 0) {
          fulfill(this.promise, this._result);
        }
      }
    } else {
      _reject(this.promise, validationError());
    }
  }

  function validationError() {
    return new Error('Array Methods must be provided an Array');
  };

  Enumerator.prototype._enumerate = function () {
    var length = this.length;
    var _input = this._input;

    for (var i = 0; this._state === PENDING && i < length; i++) {
      this._eachEntry(_input[i], i);
    }
  };

  Enumerator.prototype._eachEntry = function (entry, i) {
    var c = this._instanceConstructor;
    var resolve$$ = c.resolve;

    if (resolve$$ === resolve) {
      var _then = getThen(entry);

      if (_then === then && entry._state !== PENDING) {
        this._settledAt(entry._state, i, entry._result);
      } else if (typeof _then !== 'function') {
        this._remaining--;
        this._result[i] = entry;
      } else if (c === Promise) {
        var promise = new c(noop);
        handleMaybeThenable(promise, entry, _then);
        this._willSettleAt(promise, i);
      } else {
        this._willSettleAt(new c(function (resolve$$) {
          return resolve$$(entry);
        }), i);
      }
    } else {
      this._willSettleAt(resolve$$(entry), i);
    }
  };

  Enumerator.prototype._settledAt = function (state, i, value) {
    var promise = this.promise;

    if (promise._state === PENDING) {
      this._remaining--;

      if (state === REJECTED) {
        _reject(promise, value);
      } else {
        this._result[i] = value;
      }
    }

    if (this._remaining === 0) {
      fulfill(promise, this._result);
    }
  };

  Enumerator.prototype._willSettleAt = function (promise, i) {
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
  function all(entries) {
    return new Enumerator(this, entries).promise;
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
  function race(entries) {
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
  function reject(reason) {
    /*jshint validthis:true */
    var Constructor = this;
    var promise = new Constructor(noop);
    _reject(promise, reason);
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
  function Promise(resolver) {
    this[PROMISE_ID] = nextId();
    this._result = this._state = undefined;
    this._subscribers = [];

    if (noop !== resolver) {
      typeof resolver !== 'function' && needsResolver();
      this instanceof Promise ? initializePromise(this, resolver) : needsNew();
    }
  }

  Promise.all = all;
  Promise.race = race;
  Promise.resolve = resolve;
  Promise.reject = reject;
  Promise._setScheduler = setScheduler;
  Promise._setAsap = setAsap;
  Promise._asap = asap;

  Promise.prototype = {
    constructor: Promise,

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

  function polyfill() {
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

    local.Promise = Promise;
  }

  // Strange compat..
  Promise.polyfill = polyfill;
  Promise.Promise = Promise;

  return Promise;
});
//# sourceMappingURL=es6-promise.map
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7), __webpack_require__(8)))

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


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
function defaultClearTimeout() {
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
})();
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
    } catch (e) {
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch (e) {
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
    } catch (e) {
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e) {
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
    while (len) {
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

process.listeners = function (name) {
    return [];
};

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () {
    return '/';
};
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function () {
    return 0;
};

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var g;

// This works in non-strict mode
g = function () {
	return this;
}();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1, eval)("this");
} catch (e) {
	// This works if the window reference is available
	if ((typeof window === "undefined" ? "undefined" : _typeof(window)) === "object") g = window;
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
        getValueType: getValueType
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
        decrementBy: decrementBy
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
        decrementBy: decrementBy
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
        getValueType: getValueType
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
        getValueType: getValueType
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
        getValueType: getValueType
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
        getValueType: getValueType
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
        getValueType: getValueType
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
        getValueType: getValueType
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


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

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
            period: period
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
                    isArray: false
                }
            };
        }
        if ((typeof value === "undefined" ? "undefined" : _typeof(value)) === "object") {
            return {
                CompositeValue: Object.keys(value).reduce(function (arr, key) {
                    var val = serializeValue(value[key]);
                    val.InnerMetricName = key;
                    arr.push(val);
                    return arr;
                }, [])
            };
        }
        var valueType = _metric ? _metric.getValueType() : undefined;
        valueType = valueType || _valueTypes.indexOf(typeof value === "undefined" ? "undefined" : _typeof(value));
        return {
            value: {
                type: valueType,
                value: value,
                isArray: false
            }
        };
    }
    function getTypeFromValue(value) {
        var typeAsString = value.constructor === Date ? "timestamp" : typeof value === "undefined" ? "undefined" : _typeof(value);
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
    var _valueTypes = ["boolean", "int", "number", "long", "string", "date", "object"];
    return {
        id: metric.id,
        instance: metric.repo.instance,
        definition: definition,
        value: serializeValue(metric.value, metric)
    };
}
exports.default = metricToMessage;
//# sourceMappingURL=serializer.js.map

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", { value: true });
var metric_types_1 = __webpack_require__(0);
function getMetricTypeByValue(metric) {
    if (metric.value.constructor === Date || metric.type === metric_types_1.default.TIMESPAN || metric.type === metric_types_1.default.TIMESTAMP) {
        return "timestamp";
    } else if (typeof metric.value === "number") {
        return "number";
    } else if (typeof metric.value === "string" || metric.type === metric_types_1.default.RATE) {
        return "string";
    } else if (_typeof(metric.value) === "object") {
        return "object";
    }
}
function getTypeByValue(value) {
    if (value.constructor === Date) {
        return "timestamp";
    } else if (typeof value === "number") {
        return "number";
    } else if (typeof value === "string") {
        return "string";
    } else if ((typeof value === "undefined" ? "undefined" : _typeof(value)) === "object") {
        return "object";
    } else {
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
                    composite: composite
                };
            } else {
                memo[key] = {
                    type: innerType,
                    description: "",
                    context: {}
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
                composite: defineNestedComposite(values[key])
            };
        } else {
            memo[key] = {
                type: type,
                description: "",
                context: {}
            };
        }
        return memo;
    }, {});
}
function normalizeMetricName(name) {
    if (typeof name !== "undefined" && name.length > 0 && name[0] !== "/") {
        return "/" + name;
    } else {
        return name;
    }
}
exports.normalizeMetricName = normalizeMetricName;
function getMetricValueByType(metric) {
    var type = getMetricTypeByValue(metric);
    if (type === "timestamp") {
        return Date.now();
    } else {
        return publishNestedComposite(metric.value);
    }
}
exports.getMetricValueByType = getMetricValueByType;
function publishNestedComposite(values) {
    if ((typeof values === "undefined" ? "undefined" : _typeof(values)) !== "object") {
        return values;
    }
    return Object.keys(values).reduce(function (memo, key) {
        var value = values[key];
        if ((typeof value === "undefined" ? "undefined" : _typeof(value)) === "object" && value.constructor !== Date) {
            memo[key] = publishNestedComposite(value);
        } else if (value.constructor === Date) {
            memo[key] = new Date(value).getTime();
        } else if (value.constructor === Boolean) {
            memo[key] = value.toString();
        } else {
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
        } else {
            msg += path + "." + m.name + ": " + m.description + ",";
        }
    });
    if (msg.length > 100) {
        return msg.slice(0, 100) + "...";
    } else {
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
        value: highestState.state
    };
}
exports.composeMsgForRootStateMetric = composeMsgForRootStateMetric;
//# sourceMappingURL=serializer.js.map

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

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
        clickStream: settings.clickStream
    };
    if (!options.connection || _typeof(options.connection) !== "object") {
        throw new Error("Connection is required parameter");
    }
    var _protocol;
    if (options.connection.protocolVersion === 3) {
        _protocol = gw3_1.default(options.connection, settings);
    } else {
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
        var match = _subSystems.filter(function (s) {
            return s.name === nameSystem;
        });
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
        return _getOrCreateMetric.call(me, definition, metric_types_1.default.STRING, value, function (metricDef) {
            return string_1.default(metricDef, me, _transport, value);
        });
    }
    function numberMetric(definition, value) {
        return _getOrCreateMetric.call(me, definition, metric_types_1.default.NUMBER, value, function (metricDef) {
            return number_1.default(metricDef, me, _transport, value);
        });
    }
    function countMetric(definition, value) {
        return _getOrCreateMetric.call(this, definition, metric_types_1.default.COUNT, value, function (metricDef) {
            return count_1.default(metricDef, me, _transport, value);
        });
    }
    function addressMetric(definition, value) {
        return _getOrCreateMetric.call(this, definition, metric_types_1.default.ADDRESS, value, function (metricDef) {
            return address_1.default(metricDef, me, _transport, value);
        });
    }
    function objectMetric(definition, value) {
        return _getOrCreateMetric.call(this, definition, metric_types_1.default.OBJECT, value, function (metricDef) {
            return object_1.default(metricDef, me, _transport, value);
        });
    }
    function timespanMetric(definition, value) {
        return _getOrCreateMetric.call(this, definition, metric_types_1.default.TIMESPAN, value, function (metricDef) {
            return timespan_1.default(metricDef, me, _transport, value);
        });
    }
    function timestampMetric(definition, value) {
        return _getOrCreateMetric.call(this, definition, metric_types_1.default.TIMESTAMP, value, function (metricDef) {
            return timestamp_1.default(metricDef, me, _transport, value);
        });
    }
    function rateMetric(definition, value) {
        return _getOrCreateMetric.call(this, definition, metric_types_1.default.RATE, value, function (metricDef) {
            return rate_1.default(metricDef, me, _transport, value);
        });
    }
    function statisticsMetric(definition, value) {
        return _getOrCreateMetric.call(this, definition, metric_types_1.default.STATISTICS, value, function (metricDef) {
            return statistics_1.default(metricDef, me, _transport, value);
        });
    }
    function _unionToMetricDef(def) {
        var metricDefinition = {};
        // NOTE: Handle undefined
        if (typeof def === "string") {
            metricDefinition.name = def;
        } else {
            metricDefinition = def;
        }
        if (metricDefinition.name === undefined) {
            throw new Error("Metric name is required");
        }
        return metricDefinition;
    }
    function _getOrCreateMetric(definition, expectedType, value, createMetric) {
        var metricDefinition = _unionToMetricDef(definition);
        var matching = _metrics.filter(function (shadowedMetric) {
            return shadowedMetric.name === metricDefinition.name;
        });
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
        return path && path.length > 0 ? path.join(separator) : "";
    }
    function getAggregateState() {
        var aggState = [];
        if (Object.keys(_state).length > 0) {
            aggState.push({
                name: _name,
                path: _path,
                state: _state.state,
                description: _state.description
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
        getState: function getState() {
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
        getAggregateState: getAggregateState
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
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

(function webpackUniversalModuleDefinition(root, factory) {
	if(true)
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("tick42-outlook", [], factory);
	else if(typeof exports === 'object')
		exports["tick42-outlook"] = factory();
	else
		root["tick42-outlook"] = factory();
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
/******/ 	return __webpack_require__(__webpack_require__.s = 16);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var es6_promise_1 = __webpack_require__(1);
var types_1 = __webpack_require__(18);
exports.CreateItemDictionary = {};
exports.GetAttachmentDictionary = {};
exports.GetItemAsMsgDictionary = {};
exports.ChunkDataDictionary = {};
exports.TrackEmailDictionary = {};
exports.TrackItemDictionary = {};
exports.OnSendMethod = "T42.Outlook.OnSendMethod";
exports.OnCancelMethod = "T42.Outlook.OnCancelMethod";
exports.OnTrackEmailMethodName = "T42.CRM.TrackEmail";
exports.OnUntrackEmailMethodName = "T42.CRM.UntrackEmail";
exports.OnTrackItemMethodName = "T42.CRM.TrackCalendarItem";
exports.OnUntrackItemMethodName = "T42.CRM.UntrackCalendarItem";
exports.isOutlookEnabled = function (agm) { return agm.methods({ name: "T42.Outlook.CreateItem" }).length > 0; };
var attachmentsErrorMessage = "Invalid type of \"attachments\" element, expected array of strings for existing " +
    "attachments or array of \"{data: string, fileName: string}\" for dynamically created attachments";
var parseAndValidateCreateItemParams = function (params) {
    if (params.subject) {
        params.subject = params.subject.toString();
    }
    if (params.body) {
        params.body = params.body.toString();
    }
    var attachments = params.attachments;
    if (attachments) {
        if (!Array.isArray(attachments)) {
            return { isValid: false, errorMessage: attachmentsErrorMessage };
        }
        else {
            if (attachments.length === 0) {
                return { isValid: true, errorMessage: "" };
            }
            if (attachments[0].data) {
                attachments.forEach(function (att) {
                    if (!att.data || !att.fileName) {
                        params.attachments = [];
                        window.console.warn(attachmentsErrorMessage);
                        return;
                    }
                    att.data = att.data.toString();
                    att.fileName = att.fileName.toString();
                });
            }
            else {
                attachments.forEach(function (att, idx) {
                    attachments[idx] = att.toString();
                });
            }
        }
    }
    if (params.bodyHtml) {
        params.bodyHtml = params.bodyHtml.toString();
    }
    if (params.sender) {
        params.sender.toString();
    }
    if (params.startDate) {
        var date = new Date(params.startDate);
        var dateUnix = +date;
        if (isNaN(dateUnix)) {
            params.startDate = undefined;
            window.console.warn("Invalid type of \"startDate\", expected \"Date\" or unix timpestamp number");
        }
    }
    if (params.dueDate) {
        var date = new Date(params.dueDate);
        var dateUnix = +date;
        if (isNaN(dateUnix)) {
            params.dueDate = undefined;
            window.console.warn("Invalid type of \"dueDate\", expected \"Date\" or unix timpestamp number");
        }
    }
    if (params.reminderTime) {
        var date = new Date(params.reminderTime);
        var dateUnix = +date;
        if (isNaN(dateUnix)) {
            params.reminderTime = undefined;
            window.console.warn("Invalid type of \"reminderTime\", expected \"Date\" or unix timpestamp number");
        }
    }
    if (params.priority) {
        var listOfPriorities = ["low", "normal", "high"];
        if (typeof params.priority === "string") {
            if (listOfPriorities.indexOf(params.priority) < 0) {
                return {
                    isValid: false,
                    errorMessage: "Invalid type of \"priority\", expected \"string\", one of: \"low\", \"normal\" or \"high\"",
                };
            }
        }
        else {
            window.console.warn("Invalid type of \"priority\", expected \"string\", one of: \"low\", \"normal\" or \"high\"");
        }
    }
    return { isValid: true, errorMessage: "" };
};
var validateOptions = function (options) {
    if (options.onSent && typeof options.onSent !== "function") {
        return { isValid: false, errorMessage: "Invalid type of \"onSent\" callback, expected function" };
    }
    if (options.onSaved && typeof options.onSaved !== "function") {
        return { isValid: false, errorMessage: "Invalid type of \"onSaved\" callback, expected function" };
    }
    if (options.onCanceled && typeof options.onCanceled !== "function") {
        return { isValid: false, errorMessage: "Invalid type of \"onCanceled\" callback, expected function" };
    }
    return { isValid: true, errorMessage: "" };
};
exports.createItem = function (agm, item, itemType, options, action) {
    var isT42Email = itemType === "email";
    var isT42Task = itemType === "task";
    options = options ? options : {};
    var onCanceled = options.onCanceled;
    return new es6_promise_1.Promise(function (resolve, reject) {
        var createItemValidation = parseAndValidateCreateItemParams(item);
        if (!createItemValidation.isValid) {
            reject(createItemValidation.errorMessage);
            return;
        }
        var optionsValidation = validateOptions(options);
        if (!optionsValidation.isValid) {
            reject(optionsValidation.errorMessage);
            return;
        }
        var internalCookie = new Date().getTime().toString();
        var createItemObject = {
            ItemType: itemType,
            Cookie: internalCookie,
            OnSendMethod: exports.OnSendMethod,
            OnCancelMethod: exports.OnCancelMethod,
        };
        if (isT42Email) {
            var recipientsValidation = exports.validateRecipients(item);
            if (!recipientsValidation.isValid) {
                reject(recipientsValidation.errorMessage);
                return;
            }
            createItemObject.t42value = exports.convertToT42Email(item);
        }
        else if (isT42Task) {
            createItemObject.t42value = convertToT42Task(item);
        }
        var successHandler = function () {
            var onSent = isT42Email
                ? options.onSent
                : options.onSaved;
            exports.CreateItemDictionary[internalCookie] = {
                onSent: onSent,
                onCanceled: onCanceled,
            };
            resolve();
        };
        var errorHandler = function (err) {
            reject(err.message);
            return;
        };
        var showItem = function (r) {
            var showItemObject = r.returned;
            if (action) {
                r.returned.displaySettings = { action: action };
            }
            agm.invoke("T42.Outlook.ShowItem", showItemObject)
                .then(successHandler)
                .catch(errorHandler);
        };
        var attachments = item.attachments;
        if (attachments && attachments.length > 0) {
            if (!isT42Email) {
                createItemObject.AttachFiles = [];
            }
            else {
                createItemObject.t42value.attachments = [];
            }
            if (attachments[0].data) {
                es6_promise_1.Promise.all(attachments.map(function (file) {
                    file.truncate = true;
                    return agm.invoke("T42.TmpFiles.Append", file)
                        .then(function (returnedFile) {
                        var fileName = returnedFile.returned.Filename;
                        if (isT42Email) {
                            createItemObject.t42value.attachments.push({ name: fileName });
                        }
                        else {
                            createItemObject.AttachFiles.push(fileName);
                        }
                    })
                        .catch(reject);
                }))
                    .then(function () {
                    agm.invoke("T42.Outlook.CreateItem", createItemObject)
                        .then(showItem)
                        .catch(reject);
                })
                    .catch(reject);
            }
            else if (typeof attachments[0] === "string") {
                es6_promise_1.Promise.all(attachments.map(function (file) {
                    return isT42Email
                        ? createItemObject.t42value.attachments.push({ name: file })
                        : createItemObject.AttachFiles.push(file);
                }))
                    .then(function () {
                    agm.invoke("T42.Outlook.CreateItem", createItemObject)
                        .then(showItem)
                        .catch(function (err) {
                        reject(err.message);
                    });
                })
                    .catch(reject);
            }
            else {
                reject(attachmentsErrorMessage);
            }
        }
        else {
            agm.invoke("T42.Outlook.CreateItem", createItemObject)
                .then(showItem)
                .catch(reject);
        }
    });
};
exports.concatChunkData = function (data) {
    var result = "";
    data.forEach(function (chunk) {
        result += exports.encodeData(chunk);
    });
    return result;
};
exports.encodeData = function (data) { return atob(data); };
exports.decodeData = function (data) { return btoa(data); };
exports.generateConversationId = function () {
    return {
        systemName: Math.random().toString(36).substr(2, 10),
        nativeId: new Date().getTime().toString(),
    };
};
exports.validateRecipients = function (email) {
    ["to", "cc", "bcc"].forEach(function (contactListName) {
        var receiver = email[contactListName];
        if (receiver) {
            if (!Array.isArray(receiver)) {
                email[contactListName] = [receiver.toString()];
            }
            else {
                receiver.forEach(function (contactEmail, idx) {
                    email[contactListName][idx] = contactEmail.toString();
                });
            }
        }
    });
    return { isValid: true, errorMessage: "" };
};
exports.convertToT42Email = function (email) {
    var t42ValueEmail = {
        attachments: email.attachments,
        body: email.body,
        bodyHtml: email.bodyHtml,
        subject: email.subject,
    };
    ["to", "cc", "bcc"].forEach(function (contactListName) {
        var receiver = email[contactListName];
        if (receiver) {
            var newList_1 = [];
            receiver.forEach(function (contactEmail) {
                newList_1.push({ emails: [contactEmail] });
            });
            t42ValueEmail[contactListName] = newList_1;
        }
        if (email.sender) {
            t42ValueEmail.sender = { emails: [email.sender] };
        }
    });
    return t42ValueEmail;
};
var convertToT42Task = function (task) {
    return {
        attachments: task.attachments,
        body: task.body,
        dueDate: task.dueDate,
        importance: getTaskImportance(task.priority),
        reminderTime: task.reminderTime,
        startDate: task.startDate,
        subject: task.subject,
    };
};
var getTaskImportance = function (priority) {
    return typeof types_1.TaskPriority[priority] === "number" ? types_1.TaskPriority[priority] : types_1.TaskPriority.normal;
};
exports.getTaskPriority = function (importance) {
    if (types_1.TaskPriority.low === importance) {
        return "low";
    }
    else if (types_1.TaskPriority.high === importance) {
        return "high";
    }
    return "normal";
};
exports.validateId = function (id) {
    if (!id.systemName || !id.nativeId) {
        return {
            isValid: false,
            errorMessage: "Invalid type of conversationId, expected \"{systemName: string, nativeId: string\"",
        };
    }
    var systemName = id.systemName.toString();
    var nativeId = id.nativeId.toString();
    return { isValid: true, errorMessage: "", id: { systemName: systemName, nativeId: nativeId } };
};
//# sourceMappingURL=helpers.js.map

/***/ }),
/* 1 */
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
    var vertx = __webpack_require__(19);
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

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(13), __webpack_require__(14)))

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var es6_promise_1 = __webpack_require__(1);
var helpers_1 = __webpack_require__(0);
var Manager = /** @class */ (function () {
    function Manager() {
    }
    Manager.prototype.init = function (agm) {
        this.agm = agm;
    };
    Manager.prototype.showItemMethod = function (ids, methodName) {
        var _this = this;
        return new es6_promise_1.Promise(function (resolve, reject) {
            if (!helpers_1.isOutlookEnabled(_this.agm)) {
                reject("The method \"" + methodName + "\" is not available");
                return;
            }
            var idsValidation = _this.validateIds(ids);
            if (!idsValidation.isValid) {
                reject(idsValidation.errorMessage);
                return;
            }
            else {
                ids = idsValidation.ids;
            }
            var successHandler = function () {
                resolve(ids);
            };
            var errorHandler = function (err) {
                reject(err);
                return;
            };
            _this.agm.invoke("T42.Outlook.ShowItem", { itemT42Ids: ids })
                .then(function () { return successHandler(); })
                .catch(function (err) { return errorHandler(err); });
        });
    };
    Manager.prototype.saveItemMethod = function (ids, methodName) {
        var _this = this;
        return new es6_promise_1.Promise(function (resolve, reject) {
            if (!helpers_1.isOutlookEnabled(_this.agm)) {
                reject("The method \"" + methodName + "\" is not available");
                return;
            }
            var successHandler = function (r) {
                resolve(r.returned.url);
            };
            var errorHandler = function (err) {
                reject(err.message);
                return;
            };
            _this.agm.invoke("T42.Outlook.SaveItem", { itemT42Ids: ids })
                .then(function (r) { return successHandler(r); })
                .catch(function (err) { return errorHandler(err); });
        });
    };
    Manager.prototype.getItemAsMsg = function (ids) {
        var _this = this;
        return new es6_promise_1.Promise(function (resolve, reject) {
            if (!helpers_1.isOutlookEnabled(_this.agm)) {
                reject("The method \"getAsMsg\" is not available");
                return;
            }
            var cookie = new Date().getTime().toString();
            var successHandler = function () {
                helpers_1.GetItemAsMsgDictionary[cookie] = {
                    resolve: resolve,
                    reject: reject,
                };
            };
            var errorHandler = function (err) {
                reject(err.message);
                return;
            };
            var getItemOptions = {
                itemIds: ids,
                callback: "T42.Outlook.GetItemAsMsgMethod",
                cookie: cookie,
            };
            _this.agm.invoke("T42.CRM.GetItemAsMsg", getItemOptions)
                .then(function () { return successHandler(); })
                .catch(function (err) { return errorHandler(err); });
        });
    };
    Manager.prototype.handleTrackingEmails = function (action, emailIds, conversationId) {
        var _this = this;
        return new es6_promise_1.Promise(function (resolve, reject) {
            if (!helpers_1.isOutlookEnabled(_this.agm)) {
                reject("The method \"" + action + "\" is not available");
                return;
            }
            if (conversationId) {
                var validConversationId = helpers_1.validateId(conversationId);
                if (validConversationId.isValid) {
                    conversationId = validConversationId.id;
                }
                else {
                    reject(validConversationId.errorMessage);
                    return;
                }
            }
            var isTrackEmail = action === "track";
            var conversationIds = _this.combineConversationIds(emailIds, conversationId, isTrackEmail);
            var successHandler = function () {
                resolve({ emailIds: emailIds, conversationIds: conversationIds });
                if (!isTrackEmail) {
                    var emailOutlookId = _this.getEmailOutlookId(emailIds);
                    helpers_1.TrackEmailDictionary[emailOutlookId] = helpers_1.TrackEmailDictionary[emailOutlookId]
                        .filter(function (id) { return id.systemName === "Outlook.ConversationId"; });
                }
            };
            var errorHandler = function (err) {
                reject(err.message);
                return;
            };
            var methodName = isTrackEmail ? "T42.CRM.SyncTrackEmail" : "T42.CRM.SyncUntrackEmail";
            var params = { emailIds: emailIds, conversationIds: conversationIds };
            return _this.agm.invoke(methodName, params)
                .then(function (res) { return successHandler(); })
                .catch(function (err) { return errorHandler(err); });
        });
    };
    Manager.prototype.validateIds = function (ids) {
        if (!ids) {
            return { isValid: false, errorMessage: "\"ids\" are mandatory" };
        }
        if (!Array.isArray(ids) || ids.length === 0) {
            return { isValid: false, errorMessage: "Invalid type of ids" };
        }
        var validIds = [];
        var errorMessage = "";
        ids.forEach(function (id) {
            var validId = helpers_1.validateId(id);
            if (!validId.isValid) {
                validIds = [];
                errorMessage = validId.errorMessage;
                return;
            }
            validIds.push(validId.id);
        });
        return validIds.length > 0
            ? { isValid: true, errorMessage: "", ids: validIds }
            : { isValid: false, errorMessage: errorMessage };
    };
    Manager.prototype.combineConversationIds = function (ids, conversationId, isTrackEmail) {
        var emailOutlookId = this.getEmailOutlookId(ids);
        if (!helpers_1.TrackEmailDictionary[emailOutlookId]) {
            helpers_1.TrackEmailDictionary[emailOutlookId] = [];
        }
        var conversationIds = helpers_1.TrackEmailDictionary[emailOutlookId];
        if (isTrackEmail) {
            var newConversationIds = conversationId ? conversationId : helpers_1.generateConversationId();
            conversationIds.push(newConversationIds);
        }
        return conversationIds;
    };
    Manager.prototype.getEmailOutlookId = function (ids) {
        return ids.filter(function (id) { return id.systemName === "Outlook"; })[0].nativeId;
    };
    return Manager;
}());
exports.Manager = Manager;
exports.default = new Manager();
//# sourceMappingURL=Manager.js.map

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var EmailImplementation_1 = __webpack_require__(5);
var TaskImplementation_1 = __webpack_require__(15);
var helpers_1 = __webpack_require__(0);
var registerOnEmailReceived = function (agm, callbacks) {
    return agm.register("T42.Outlook.OnEmailReceived", function (args) {
        var email = new EmailImplementation_1.EmailImpl(args.email, agm);
        callbacks.execute("onEmailReceived", email);
        return { email: email };
    });
};
var registerOnTaskCreated = function (agm, callbacks) {
    return agm.register("T42.Outlook.OnTaskCreated", function (args) {
        var task = new TaskImplementation_1.TaskImpl(args, agm);
        callbacks.execute("onTaskCreated", task);
        return { task: task };
    });
};
var registerOnSendMethod = function (agm) {
    return agm.register(helpers_1.OnSendMethod, function (args) {
        var cookie = args.cookie, email = args.email, task = args.task;
        if (!helpers_1.CreateItemDictionary[cookie] || typeof helpers_1.CreateItemDictionary[cookie].onSent !== "function") {
            return;
        }
        if (email && !task) {
            helpers_1.CreateItemDictionary[cookie].onSent(new EmailImplementation_1.EmailImpl(email, agm));
            return { cookie: cookie, email: email };
        }
        else if (!email && task) {
            helpers_1.CreateItemDictionary[cookie].onSent(new TaskImplementation_1.TaskImpl(task, agm));
            return { cookie: cookie, task: task };
        }
        delete helpers_1.CreateItemDictionary[cookie];
    });
};
var registerOnCancelMethod = function (agm) {
    return agm.register(helpers_1.OnCancelMethod, function (args) {
        var cookie = args.cookie;
        if (!helpers_1.CreateItemDictionary[cookie] || typeof helpers_1.CreateItemDictionary[cookie].onCanceled !== "function") {
            return;
        }
        helpers_1.CreateItemDictionary[cookie].onCanceled();
        delete helpers_1.CreateItemDictionary[cookie];
        return { cookie: cookie };
    });
};
var addChunkDataToDictionary = function (cookie, data) {
    if (!helpers_1.ChunkDataDictionary[cookie]) {
        helpers_1.ChunkDataDictionary[cookie] = { data: [data] };
    }
    else {
        helpers_1.ChunkDataDictionary[cookie].data.push(data);
    }
};
var getChunkDataSuccessCallback = function (methodCallbacksDictionary, cookie) {
    var attachmentData = helpers_1.concatChunkData(helpers_1.ChunkDataDictionary[cookie].data);
    if (methodCallbacksDictionary[cookie] && typeof methodCallbacksDictionary[cookie].resolve === "function") {
        methodCallbacksDictionary[cookie].resolve(helpers_1.decodeData(attachmentData));
    }
    delete helpers_1.ChunkDataDictionary[cookie];
    delete methodCallbacksDictionary[cookie];
};
var getChunkDataErrorCallback = function (methodCallbacksDictionary, cookie, errorMessage) {
    if (methodCallbacksDictionary[cookie] && typeof methodCallbacksDictionary[cookie].reject === "function") {
        methodCallbacksDictionary[cookie].reject(errorMessage);
    }
    delete helpers_1.ChunkDataDictionary[cookie];
    delete methodCallbacksDictionary[cookie];
};
var executeGetDataCallback = function (percent, cookie) {
    if (helpers_1.GetAttachmentDictionary[cookie] && typeof helpers_1.GetAttachmentDictionary[cookie].callback === "function") {
        if (percent <= 100) {
            helpers_1.GetAttachmentDictionary[cookie].callback(percent);
        }
    }
};
var registerGetAttachment = function (agm) {
    var percent = 0;
    return agm.register("T42.Outlook.GetAttachment", function (args) {
        var cookie = args.cookie, data = args.data, errorMessage = args.errorMessage, success = args.success, more = args.more, length = args.length, totalLength = args.totalLength;
        addChunkDataToDictionary(cookie, data);
        if (success) {
            percent += (length / totalLength) * 100;
            executeGetDataCallback(percent, cookie);
            if (!more) {
                if (percent < 100) {
                    executeGetDataCallback(100, cookie);
                }
                percent = 0;
                getChunkDataSuccessCallback(helpers_1.GetAttachmentDictionary, cookie);
            }
        }
        else {
            percent = 0;
            getChunkDataErrorCallback(helpers_1.GetAttachmentDictionary, cookie, errorMessage);
        }
        return {};
    });
};
var registerGetItemAsMsgMethod = function (agm) {
    return agm.register("T42.Outlook.GetItemAsMsgMethod", function (args) {
        var cookie = args.cookie, data = args.data, errorMessage = args.errorMessage, success = args.success, more = args.more;
        addChunkDataToDictionary(cookie, data);
        if (success) {
            if (!more) {
                getChunkDataSuccessCallback(helpers_1.GetItemAsMsgDictionary, cookie);
            }
        }
        else {
            getChunkDataErrorCallback(helpers_1.GetItemAsMsgDictionary, cookie, errorMessage);
        }
        return {};
    });
};
exports.registerCRMTrackEmail = function (agm, callbacks) {
    return agm.register(helpers_1.OnTrackEmailMethodName, function (args) {
        var conversationIds = args.conversationIds;
        var email = new EmailImplementation_1.EmailImpl(args.email, agm);
        var emailOutlookId = email.ids.filter(function (id) { return id.systemName === "Outlook"; })[0];
        helpers_1.TrackEmailDictionary[emailOutlookId.nativeId] = conversationIds;
        callbacks.execute("onEmailTracked", { conversationIds: conversationIds, email: email });
        return {};
    });
};
exports.registerCRMUntrackEmail = function (agm, callbacks) {
    return agm.register(helpers_1.OnUntrackEmailMethodName, function (args) {
        var conversationIds = args.conversationIds, emailIds = args.emailIds;
        callbacks.execute("onEmailUntracked", { conversationIds: conversationIds, emailIds: emailIds });
        return {};
    });
};
exports.registerCRMTrackItem = function (agm, callbacks) {
    return agm.register(helpers_1.OnTrackItemMethodName, function (args) {
        var conversationIds = args.conversationIds, item = args.item;
        var itemOutlookId = item.ids.filter(function (id) { return id.systemName === "Outlook"; })[0];
        helpers_1.TrackItemDictionary[itemOutlookId.nativeId] = conversationIds;
        callbacks.execute("onItemTracked", { conversationIds: conversationIds, event: item });
        return { conversationIds: conversationIds, event: item };
    });
};
exports.registerCRMUntrackItem = function (agm, callbacks) {
    return agm.register(helpers_1.OnUntrackItemMethodName, function (args) {
        var conversationIds = args.conversationIds, itemIds = args.itemIds;
        callbacks.execute("onItemUntracked", { conversationIds: conversationIds, eventIds: itemIds });
        return { conversationIds: conversationIds, eventIds: itemIds };
    });
};
var registerSecureReply = function (agm, callbacks) {
    return agm.register("T42.CRM.SecureReply", function (args) {
        var email = new EmailImplementation_1.EmailImpl(args.inReplyToMail, agm);
        callbacks.execute("onSecureReply", email);
        return { email: email };
    });
};
var registerDisplaySecureEmail = function (agm, callbacks) {
    return agm.register("T42.CRM.DisplaySecureMail", function (args) {
        var email = new EmailImplementation_1.EmailImpl(args.inReplyToMail, agm);
        callbacks.execute("onDisplaySecureEmail", email);
        return { email: email };
    });
};
exports.registerAgmMethods = function (agm, callbacks) {
    registerOnEmailReceived(agm, callbacks);
    registerOnTaskCreated(agm, callbacks);
    registerOnSendMethod(agm);
    registerOnCancelMethod(agm);
    registerGetItemAsMsgMethod(agm);
    registerGetAttachment(agm);
    registerSecureReply(agm, callbacks);
    registerDisplaySecureEmail(agm, callbacks);
};
//# sourceMappingURL=registerAgmMethods.js.map

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var getAttachment_1 = __webpack_require__(17);
var AttachmentImpl = /** @class */ (function () {
    function AttachmentImpl(attachment, parent, agm) {
        this.cookie = attachment.cookie;
        this.emailIds = attachment.emailIds;
        this.data = attachment.data;
        this.ids = attachment.ids;
        this.name = attachment.name;
        this.sizeHint = attachment.sizeHint;
        this.errorMessage = attachment.errorMessage;
        this.more = attachment.more;
        this.success = attachment.success;
        this.parent = parent;
        this.agm = agm;
    }
    AttachmentImpl.prototype.getData = function (callback) {
        return getAttachment_1.getAttachment(this.agm, this.emailIds, this.ids, callback);
    };
    return AttachmentImpl;
}());
exports.AttachmentImpl = AttachmentImpl;
//# sourceMappingURL=AttachmentImplementation.js.map

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Manager_1 = __webpack_require__(2);
var AttachmentImplementation_1 = __webpack_require__(4);
var EmailImpl = /** @class */ (function () {
    function EmailImpl(email, agm) {
        var _this = this;
        if (email.attachments && email.attachments.length > 0) {
            this.attachments = [];
            email.attachments.forEach(function (att) {
                _this.attachments.push(new AttachmentImplementation_1.AttachmentImpl(att, _this, agm));
            });
        }
        this.bcc = email.bcc;
        this.body = email.body;
        this.bodyHtml = email.bodyHtml;
        this.cc = email.cc;
        this.date = email.date;
        this.ids = email.ids;
        this.sender = email.sender;
        this.subject = email.subject;
        this.to = email.to;
        this.entityType = email.entityType;
    }
    EmailImpl.prototype.show = function () {
        return Manager_1.default.showItemMethod(this.ids, "showEmail");
    };
    EmailImpl.prototype.saveToFile = function () {
        return Manager_1.default.saveItemMethod(this.ids, "saveEmail");
    };
    EmailImpl.prototype.getAsMsg = function () {
        return Manager_1.default.getItemAsMsg(this.ids);
    };
    EmailImpl.prototype.track = function (conversationId) {
        return Manager_1.default.handleTrackingEmails("track", this.ids, conversationId);
    };
    EmailImpl.prototype.untrack = function () {
        return Manager_1.default.handleTrackingEmails("untrack", this.ids);
    };
    return EmailImpl;
}());
exports.EmailImpl = EmailImpl;
//# sourceMappingURL=EmailImplementation.js.map

/***/ }),
/* 6 */
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
/* 7 */
/***/ (function(module, exports) {

module.exports = {"name":"tick42-outlook","version":"1.0.1","description":"Outlook wrapper is an API which allows a JavaScript application to be integrated with Outlook","main":"dist/node/tick42-outlook.js","browser":"dist/web/tick42-outlook.js","types":"types/index.d.ts","docName":"Outlook","scripts":{"clean":"node ./build/scripts/clean.js","pre:build":"npm run tslint && tsc && set NODE_ENV=development && npm run clean","file-versionify":"node ./build/scripts/file-versionify.js","tslint":"tslint -t codeFrame ./src/**/*.ts","tslint:fix":"tslint -t codeFrame --fix ./src/**/*.ts","watch":"onchange ./src/**/*.ts -- npm run build:dev","build:dev":"npm run pre:build && set NODE_ENV=development && webpack && npm run file-versionify && npm run types","build:prod":"npm run pre:build && set NODE_ENV=development && webpack && set NODE_ENV=production && webpack && npm run file-versionify && npm run types","docs":"typedoc --options typedoc.json ./src","types":"node ./build/scripts/copy-types.js","types:merged":"dts-generator --project ./ --out ./types/index.d.ts","prepublish":"npm run build:prod","test":"mocha --recursive"},"author":"Tick42","license":"ISC","precommit":"tslint","devDependencies":{"babel-core":"^6.17.0","babel-loader":"^6.4.1","babel-plugin-add-module-exports":"^0.2.1","babel-plugin-es6-promise":"^1.0.0","babel-preset-es2015":"^6.16.0","babel-preset-stage-2":"^6.22.0","callback-registry":"^2.3.1","chai":"^4.0.2","dts-generator":"^2.1.0","es6-promise":"^4.1.0","mocha":"^3.4.2","onchange":"3.*","pre-commit":"^1.1.3","shelljs":"^0.6.0","tick42-agm":"^3.5.18","tick42-webpack-config":"4.1.6","tslint":"5.*","typedoc":"^0.9.0","typescript":"2.5.3","webpack":"2.3.3"},"dependencies":{}}

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var es6_promise_1 = __webpack_require__(1);
var helpers_1 = __webpack_require__(0);
exports.createEmail = function (agm, email, options, action) {
    return new es6_promise_1.Promise(function (resolve, reject) {
        if (!helpers_1.isOutlookEnabled(agm)) {
            reject("The method \"createEmail\" is not available");
            return;
        }
        return helpers_1.createItem(agm, email, "email", options, action)
            .then(function () { return resolve(); })
            .catch(reject);
    });
};
//# sourceMappingURL=createEmail.js.map

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var es6_promise_1 = __webpack_require__(1);
var helpers_1 = __webpack_require__(0);
var EmailImplementation_1 = __webpack_require__(5);
var validateParameters = function (agm, localEmailParams) {
    if (!helpers_1.isOutlookEnabled(agm)) {
        return { isValid: false, errorMessage: "The method \"createLocalEmail\" is not available" };
    }
    if (!localEmailParams) {
        return { isValid: false, errorMessage: "\"localEmailParams\" of type object are mandatory" };
    }
    if (!localEmailParams.sender) {
        return { isValid: false, errorMessage: "The property \"sender\" in \"localEmailParams\" is mandatory" };
    }
    else if (typeof localEmailParams.sender !== "string") {
        return { isValid: false, errorMessage: "Invalid type of \"sender\", expected string" };
    }
    if (!localEmailParams.to) {
        return { isValid: false, errorMessage: "The property \"to\" in \"localEmailParams\" is mandatory" };
    }
    else if (typeof localEmailParams.to !== "string" && !Array.isArray(localEmailParams.to)) {
        return { isValid: false, errorMessage: "Invalid type of \"to\", expected string or string[]" };
    }
    if (!localEmailParams.subject) {
        return { isValid: false, errorMessage: "The property \"subject\" in \"localEmailParams\" is mandatory" };
    }
    else if (typeof localEmailParams.subject !== "string") {
        return { isValid: false, errorMessage: "Invalid type of \"subject\", expected string" };
    }
    return { isValid: true, errorMessage: "" };
};
var createLocalEmail = function (ids, emailParams) {
    var localEmail = __assign({}, helpers_1.convertToT42Email(emailParams), { ids: ids });
    Object.keys(localEmail).forEach(function (key) {
        if (!localEmail[key]) {
            delete localEmail[key];
        }
    });
    return localEmail;
};
var validateLocation = function (location) {
    if (typeof location !== "string" && !location.ids) {
        return { isValid: false, errorMessage: "Invalid location" };
    }
    if (typeof location === "string" && location.indexOf("$") === 0) {
        var defaultFolders = getOlDefaultFolders();
        if (typeof defaultFolders[location] !== "number") {
            return { isValid: false, errorMessage: "Invalid location" };
        }
    }
    return { isValid: true, errorMessage: "" };
};
exports.createLocalEmailMethod = function (agm, localEmailParams) {
    return new es6_promise_1.Promise(function (resolve, reject) {
        var paramsValidation = validateParameters(agm, localEmailParams);
        if (!paramsValidation.isValid) {
            reject(paramsValidation.errorMessage);
            return;
        }
        var successHandler = function (res, emailParams) {
            var recipientsValidation = helpers_1.validateRecipients(emailParams);
            if (!recipientsValidation.isValid) {
                reject(recipientsValidation.errorMessage);
                return;
            }
            var localEmail = new EmailImplementation_1.EmailImpl(createLocalEmail(res.returned.localEmailIds, emailParams), agm);
            resolve(localEmail);
        };
        var errorHandler = function (err) {
            reject(err.message);
            return;
        };
        var localRecipientsValidation = helpers_1.validateRecipients(localEmailParams);
        if (!localRecipientsValidation.isValid) {
            reject(localRecipientsValidation.errorMessage);
            return;
        }
        if (localEmailParams.location) {
            var locationValidation = validateLocation(localEmailParams.location);
            if (!locationValidation.isValid) {
                reject(locationValidation.errorMessage);
                return;
            }
        }
        return agm.invoke("T42.Outlook.CreateLocalEmail", getParams(localEmailParams))
            .then(function (res) { return successHandler(res, localEmailParams); })
            .catch(function (err) { return errorHandler(err); });
    });
};
var getT42Email = function (localEmailParams) {
    return Object.keys(localEmailParams).reduce(function (obj, key) {
        if (key === "additionalProps") {
            return obj;
        }
        obj[key] = localEmailParams[key];
        return obj;
    }, {});
};
var getOlDefaultFolders = function () {
    return {
        $SentMail: 5,
        $Inbox: 6,
    };
};
var getLocation = function (location) {
    var defaultFolders = getOlDefaultFolders();
    if (!location) {
        return { defaultFolderIndex: defaultFolders.$Inbox };
    }
    var emailIds = location.ids;
    if (emailIds && emailIds[0].nativeId && emailIds[0].systemName) {
        return { parentItemIds: emailIds };
    }
    if (typeof location === "string") {
        if (location.indexOf("$") < 0) {
            return { folderPath: location };
        }
        if (typeof defaultFolders[location] === "number") {
            return { defaultFolderIndex: defaultFolders[location] };
        }
    }
    return { defaultFolderIndex: defaultFolders.$Inbox };
};
var getParams = function (localEmailParams) {
    var params = {
        location: getLocation(localEmailParams.location),
        email: helpers_1.convertToT42Email(getT42Email(localEmailParams)),
    };
    if (localEmailParams.additionalProps) {
        params.additionalProps = localEmailParams.additionalProps;
    }
    return params;
};
//# sourceMappingURL=createLocalEmail.js.map

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var es6_promise_1 = __webpack_require__(1);
var helpers_1 = __webpack_require__(0);
exports.createTask = function (agm, task, options) {
    return new es6_promise_1.Promise(function (resolve, reject) {
        if (!helpers_1.isOutlookEnabled(agm)) {
            reject("The method \"createTask\" is not available");
            return;
        }
        helpers_1.createItem(agm, task, "task", options)
            .then(function () { return resolve(); })
            .catch(reject);
    });
};
//# sourceMappingURL=createTask.js.map

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var es6_promise_1 = __webpack_require__(1);
var helpers_1 = __webpack_require__(0);
var validateParameters = function (agm, action, event) {
    if (!helpers_1.isOutlookEnabled(agm)) {
        var methodName = action === "track" ? "trackEmail" : "untrackEmail";
        return { isValid: false, errorMessage: "The method " + methodName + " is not available" };
    }
    if (!event || (!event.ids || event.ids.length === 0)) {
        return { isValid: false, errorMessage: "Invalid type of email" };
    }
    return { isValid: true, errorMessage: "" };
};
var getEmailOutlookId = function (event) {
    return event.ids.filter(function (id) { return id.systemName === "Outlook"; })[0].nativeId;
};
var combineConversationIds = function (event, convId, isTrackEmail) {
    var emailOutlookId = getEmailOutlookId(event);
    if (!helpers_1.TrackEmailDictionary[emailOutlookId]) {
        helpers_1.TrackEmailDictionary[emailOutlookId] = [];
    }
    var conversationIds = helpers_1.TrackEmailDictionary[emailOutlookId];
    if (isTrackEmail) {
        var newConversationIds = convId ? convId : helpers_1.generateConversationId();
        conversationIds.push(newConversationIds);
    }
    return conversationIds;
};
exports.handleTrackingItems = function (agm, action, event, conversationId) {
    return new es6_promise_1.Promise(function (resolve, reject) {
        var paramsValidation = validateParameters(agm, action, event);
        if (!paramsValidation.isValid) {
            reject(paramsValidation.errorMessage);
            return;
        }
        if (conversationId) {
            var validConversationId = helpers_1.validateId(conversationId);
            if (validConversationId.isValid) {
                conversationId = validConversationId.id;
            }
            else {
                reject(validConversationId.errorMessage);
                return;
            }
        }
        var isTrackItem = action === "track";
        var conversationIds = combineConversationIds(event, conversationId, isTrackItem);
        var successHandler = function () {
            var response = { event: event, conversationIds: conversationIds };
            resolve(response);
            if (!isTrackItem) {
                var emailOutlookId = getEmailOutlookId(event);
                helpers_1.TrackEmailDictionary[emailOutlookId] = helpers_1.TrackEmailDictionary[emailOutlookId]
                    .filter(function (id) { return id.systemName === "Outlook.ConversationId"; });
            }
        };
        var errorHandler = function (err) {
            reject(err.message);
            return;
        };
        var methodName = isTrackItem ? "T42.CRM.SyncTrackCalendarItem" : "T42.CRM.SyncUntrackCalendarItem";
        var params = { itemIds: event.ids, conversationIds: conversationIds };
        return agm.invoke(methodName, params)
            .then(function (res) { return successHandler(); })
            .catch(function (err) { return errorHandler(err); });
    });
};
//# sourceMappingURL=handleTrackingItems.js.map

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var helpers_1 = __webpack_require__(0);
var registerAgmMethods_1 = __webpack_require__(3);
exports.connected = false;
var onOutlookEnabled = function (agm, callbacks) {
    if (helpers_1.isOutlookEnabled(agm)) {
        exports.connected = true;
    }
    agm.methodAdded(function (m) {
        if (m.name === "T42.Outlook.CreateItem") {
            if (exports.connected === false) {
                exports.connected = true;
                callbacks.execute("onAddinStatusChanged", { connected: exports.connected });
            }
        }
    });
};
var onOutlookDisabled = function (agm, callbacks) {
    agm.methodRemoved(function (m) {
        if (m.name === "T42.Outlook.CreateItem") {
            exports.connected = false;
            callbacks.execute("onAddinStatusChanged", { connected: exports.connected });
        }
    });
};
exports.registerEventListeners = function (agm, callbacks) {
    onOutlookEnabled(agm, callbacks);
    onOutlookDisabled(agm, callbacks);
};
exports.registerOnAddinStatusChanged = function (agm, callback, callbacks) {
    callback({ connected: exports.connected });
    return callbacks.add("onAddinStatusChanged", callback);
};
exports.registerOnEmailReceived = function (agm, callback, callbacks) {
    return callbacks.add("onEmailReceived", callback);
};
exports.registerOnTaskCreated = function (agm, callback, callbacks) {
    return callbacks.add("onTaskCreated", callback);
};
exports.registerTrackEmail = function (agm, callback, callbacks) {
    if (agm.methods({ name: helpers_1.OnTrackEmailMethodName }).length === 0) {
        registerAgmMethods_1.registerCRMTrackEmail(agm, callbacks);
        return callbacks.add("onEmailTracked", callback);
    }
    else {
        throw Error("Another client has already subscribed for tracking emails");
    }
};
exports.registerUntrackEmail = function (agm, callback, callbacks) {
    if (agm.methods({ name: helpers_1.OnUntrackEmailMethodName }).length === 0) {
        registerAgmMethods_1.registerCRMUntrackEmail(agm, callbacks);
        return callbacks.add("onEmailUntracked", callback);
    }
    else {
        throw Error("Another client has already subscribed for untracking emails");
    }
};
exports.registerTrackItem = function (agm, callback, callbacks) {
    if (agm.methods({ name: helpers_1.OnTrackItemMethodName }).length === 0) {
        registerAgmMethods_1.registerCRMTrackItem(agm, callbacks);
        return callbacks.add("onItemTracked", callback);
    }
    else {
        throw Error("Another client has already subscribed for tracking calendar events");
    }
};
exports.registerUntrackItem = function (agm, callback, callbacks) {
    if (agm.methods({ name: helpers_1.OnUntrackItemMethodName }).length === 0) {
        registerAgmMethods_1.registerCRMUntrackItem(agm, callbacks);
        return callbacks.add("onItemUntracked", callback);
    }
    else {
        throw Error("Another client has already subscribed for untracking calendar events");
    }
};
exports.registerSecureReply = function (agm, callback, callbacks) {
    return callbacks.add("onSecureReply", callback);
};
exports.registerDisplaySecureEmail = function (agm, callback, callbacks) {
    return callbacks.add("onDisplaySecureEmail", callback);
};
//# sourceMappingURL=registerEventListeners.js.map

/***/ }),
/* 13 */
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
/* 14 */
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
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Manager_1 = __webpack_require__(2);
var AttachmentImplementation_1 = __webpack_require__(4);
var helpers_1 = __webpack_require__(0);
var TaskImpl = /** @class */ (function () {
    function TaskImpl(task, agm) {
        var _this = this;
        if (task.attachments && task.attachments.length > 0) {
            this.attachments = [];
            task.attachments.forEach(function (att) {
                _this.attachments.push(new AttachmentImplementation_1.AttachmentImpl(att, _this, agm));
            });
        }
        this.actualWork = task.actualWork;
        this.body = task.body;
        this.creationTime = task.creationTime;
        this.dateCompleted = task.dateCompleted;
        this.dueDate = task.dueDate;
        this.ids = task.ids;
        this.priority = helpers_1.getTaskPriority(task.importance);
        this.reminderTime = task.reminderTime;
        this.startDate = task.startDate;
        this.subject = task.subject;
        this.entityType = task.entityType;
    }
    TaskImpl.prototype.show = function () {
        return Manager_1.default.showItemMethod(this.ids, "showTask");
    };
    TaskImpl.prototype.saveToFile = function () {
        return Manager_1.default.saveItemMethod(this.ids, "saveTask");
    };
    return TaskImpl;
}());
exports.TaskImpl = TaskImpl;
//# sourceMappingURL=TaskImplementation.js.map

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var callback_registry_1 = __webpack_require__(6);
var es6_promise_1 = __webpack_require__(1);
var Manager_1 = __webpack_require__(2);
var createEmail_1 = __webpack_require__(8);
var createLocalEmail_1 = __webpack_require__(9);
var createTask_1 = __webpack_require__(10);
var registerAgmMethods_1 = __webpack_require__(3);
var handleTrackingItems_1 = __webpack_require__(11);
var registerEventListeners_1 = __webpack_require__(12);
var version = __webpack_require__(7).version;
function default_1(config) {
    var outlook;
    if (!config.agm) {
        throw Error("config.agm is required");
    }
    var callbacks = callback_registry_1.default();
    var agm = config.agm;
    Manager_1.default.init(agm);
    registerAgmMethods_1.registerAgmMethods(agm, callbacks);
    registerEventListeners_1.registerEventListeners(agm, callbacks);
    var onAddinStatusChanged = function (callback) {
        return registerEventListeners_1.registerOnAddinStatusChanged(agm, callback, callbacks);
    };
    var onEmailReceived = function (callback) {
        return registerEventListeners_1.registerOnEmailReceived(agm, callback, callbacks);
    };
    var onTaskCreated = function (callback) {
        return registerEventListeners_1.registerOnTaskCreated(agm, callback, callbacks);
    };
    var onTrackEmail = function (callback) {
        return registerEventListeners_1.registerTrackEmail(agm, callback, callbacks);
    };
    var onUntrackEmail = function (callback) {
        return registerEventListeners_1.registerUntrackEmail(agm, callback, callbacks);
    };
    var onTrackCalendarEvent = function (callback) {
        return registerEventListeners_1.registerTrackItem(agm, callback, callbacks);
    };
    var onUntrackCalendarEvent = function (callback) {
        return registerEventListeners_1.registerUntrackItem(agm, callback, callbacks);
    };
    var onSecureReply = function (callback) {
        return registerEventListeners_1.registerSecureReply(agm, callback, callbacks);
    };
    var onDisplaySecureEmail = function (callback) {
        return registerEventListeners_1.registerDisplaySecureEmail(agm, callback, callbacks);
    };
    var ready = function () { return new es6_promise_1.Promise(function (resolve) {
        resolve(outlook);
    }); };
    var newEmail = function (emailParams, options, action) {
        if (emailParams === void 0) { emailParams = {}; }
        return createEmail_1.createEmail(agm, emailParams, options, action);
    };
    var trackCalendarEvent = function (event, conversationId) {
        return handleTrackingItems_1.handleTrackingItems(agm, "track", event, conversationId);
    };
    var untrackCalendarEvent = function (event) {
        return handleTrackingItems_1.handleTrackingItems(agm, "untrack", event);
    };
    var createLocalEmail = function (localEmailParams) {
        return createLocalEmail_1.createLocalEmailMethod(agm, localEmailParams);
    };
    var newTask = function (taskParams, options) {
        if (taskParams === void 0) { taskParams = {}; }
        return createTask_1.createTask(agm, taskParams, options);
    };
    var showEmail = function (ids) {
        return Manager_1.default.showItemMethod(ids, "showEmail");
    };
    var showTask = function (ids) {
        return Manager_1.default.showItemMethod(ids, "showTask");
    };
    outlook = {
        ready: ready,
        newEmail: newEmail,
        trackCalendarEvent: trackCalendarEvent,
        untrackCalendarEvent: untrackCalendarEvent,
        createLocalEmail: createLocalEmail,
        newTask: newTask,
        showEmail: showEmail,
        showTask: showTask,
        onAddinStatusChanged: onAddinStatusChanged,
        onEmailReceived: onEmailReceived,
        onTaskCreated: onTaskCreated,
        onTrackEmail: onTrackEmail,
        onUntrackEmail: onUntrackEmail,
        onTrackCalendarEvent: onTrackCalendarEvent,
        onUntrackCalendarEvent: onUntrackCalendarEvent,
        onSecureReply: onSecureReply,
        onDisplaySecureEmail: onDisplaySecureEmail,
        version: version,
        get addinStatus() {
            return registerEventListeners_1.connected;
        },
    };
    return outlook;
}
exports.default = default_1;
//# sourceMappingURL=main.js.map

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var es6_promise_1 = __webpack_require__(1);
var helpers_1 = __webpack_require__(0);
exports.getAttachment = function (agm, emailIds, ids, callback) {
    return new es6_promise_1.Promise(function (resolve, reject) {
        if (!helpers_1.isOutlookEnabled(agm)) {
            reject("The method \"getAttachments\" is not available");
            return;
        }
        var cookie = new Date().getTime().toString();
        var successHandler = function () {
            helpers_1.GetAttachmentDictionary[cookie] = {
                callback: callback,
                resolve: resolve,
                reject: reject,
            };
        };
        var errorHandler = function (err) {
            reject(err.message);
            return;
        };
        var getAttachmentOptions = {
            emailIds: emailIds,
            attachmentIds: ids,
            callback: "T42.Outlook.GetAttachment",
            cookie: cookie,
        };
        return agm.invoke("T42.CRM.GetAttachment", getAttachmentOptions)
            .then(function () { return successHandler(); })
            .catch(function (err) { return errorHandler(err); });
    });
};
//# sourceMappingURL=getAttachment.js.map

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var TaskPriority;
(function (TaskPriority) {
    TaskPriority[TaskPriority["low"] = 0] = "low";
    TaskPriority[TaskPriority["normal"] = 1] = "normal";
    TaskPriority[TaskPriority["high"] = 2] = "high";
})(TaskPriority = exports.TaskPriority || (exports.TaskPriority = {}));
//# sourceMappingURL=types.js.map

/***/ }),
/* 19 */
/***/ (function(module, exports) {

/* (ignored) */

/***/ })
/******/ ]);
});
//# sourceMappingURL=tick42-outlook.js.map

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

(function webpackUniversalModuleDefinition(root, factory) {
	if(true)
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("tick42-word", [], factory);
	else if(typeof exports === 'object')
		exports["tick42-word"] = factory();
	else
		root["tick42-word"] = factory();
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
/******/ 	return __webpack_require__(__webpack_require__.s = 18);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var randomFromSeed = __webpack_require__(15);

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

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.CloseMethodName = "T42.WordEditor.Closed";
exports.EditHtmlMethodName = "T42.Word.HtmlEdit";
exports.ReceiveHtmlMethodName = "T42.Word.HtmlReceive";
//# sourceMappingURL=const.js.map

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var randomByte = __webpack_require__(14);

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
/* 4 */
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
    var vertx = __webpack_require__(19);
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

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8), __webpack_require__(17)))

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = {"name":"tick42-word","version":"1.0.0","description":"A GlueWord Wrapper.","main":"dist/node/tick42-word.js","browser":"dist/web/tick42-word.js","types":"types/index.d.ts","docName":"Word","scripts":{"clean":"node ./build/scripts/clean.js","pre:build":"npm run tslint && tsc && set NODE_ENV=development && npm run clean","file-versionify":"node ./build/scripts/file-versionify.js","tslint":"tslint -t codeFrame ./src/**/*.ts","tslint:fix":"tslint -t codeFrame --fix ./src/**/*.ts","watch":"onchange ./src/**/*.ts -- npm run build:dev","build:dev":"npm run pre:build && set NODE_ENV=development && webpack && npm run file-versionify && npm run types","build:prod":"npm run pre:build && set NODE_ENV=development && webpack && set NODE_ENV=production && webpack && npm run file-versionify && npm run types","docs":"typedoc --options typedoc.json ./src","types":"node ./build/scripts/copy-types.js","types:merged":"dts-generator --project ./ --out ./types/index.d.ts"},"author":"Tick42","license":"ISC","precommit":"tslint","devDependencies":{"tick42-agm":"3.5.18","callback-registry":"^2.2.7","dts-generator":"^2.1.0","es6-promise":"^4.1.0","onchange":"3.*","pre-commit":"^1.1.3","shelljs":"^0.6.0","shortid":"^2.2.8","tick42-webpack-config":"^4.1.1","tslint":"^5.4.3","typedoc":"^0.5.10","typescript":"2.3.0","webpack":"2.3.3"}}

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var CallbackFactory = __webpack_require__(1);
exports.default = function (cookie, config) {
    var _registry = CallbackFactory();
    var name = config.name;
    var data = config.data;
    function onClose(callback) {
        return _registry.add("on-closed", callback);
    }
    function _close() {
        _registry.execute("on-closed");
    }
    function _onChanged(newData) {
        // We have all document in one chunk
        if (newData.length === newData.totalLength) {
            api.data = newData.html;
            _registry.execute("on-changed", api.data);
        }
        else {
            // We have multiple chunks
            if (newData.offset === 0) {
                api.data = "";
            }
            api.data = api.data.substr(0, newData.offset) + newData.html +
                api.data.substr(newData.offset + newData.length);
            if ((newData.totalLength === api.data.length) && (newData.totalLengthDocx === api.data.length)) {
                // Execute when all chunks are received
                _registry.execute("on-changed", api.data);
            }
        }
    }
    function onChanged(callback) {
        return _registry.add("on-changed", callback);
    }
    var api = {
        name: name,
        data: data,
        onClose: onClose,
        onChanged: onChanged,
    };
    var events = {
        _onChanged: _onChanged,
        _close: _close,
    };
    return {
        documentApi: api,
        documentEvents: events,
    };
};
//# sourceMappingURL=document.js.map

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var const_1 = __webpack_require__(2);
var shortid = __webpack_require__(9);
function mapOptions(data) {
    var mappedOptions = {
        cookie: shortid.generate(),
        displayName: "",
        documentName: data.name,
        templateName: data.templateName,
        onSaved: const_1.ReceiveHtmlMethodName,
        onClosed: const_1.CloseMethodName,
    };
    if (data.isDocx) {
        mappedOptions.docx = data.data;
        mappedOptions.offsetDocx = 0;
        mappedOptions.totalLengthDocx = data.data.length;
        mappedOptions.lengthDocx = data.data.length;
        mappedOptions.sendDocx = true;
    }
    else {
        mappedOptions.html = data.data;
        mappedOptions.length = data.data.length;
        mappedOptions.totalLength = data.data.length;
        mappedOptions.offset = 0;
        mappedOptions.sendDocx = false;
    }
    return mappedOptions;
}
exports.mapOptions = mapOptions;
//# sourceMappingURL=utils.js.map

/***/ }),
/* 8 */
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
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = __webpack_require__(12);


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var encode = __webpack_require__(3);
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
/* 11 */
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
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var alphabet = __webpack_require__(0);
var encode = __webpack_require__(3);
var decode = __webpack_require__(11);
var build = __webpack_require__(10);
var isValid = __webpack_require__(13);

// if you are using cluster or multiple servers use this to make each instance
// has a unique value for worker
// Note: I don't know if this is automatically set when using third
// party cluster solutions such as pm2.
var clusterWorkerId = __webpack_require__(16) || 0;

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
/* 13 */
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
/* 14 */
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
/* 15 */
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
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = 0;


/***/ }),
/* 17 */
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
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var es6_promise_1 = __webpack_require__(4);
var const_1 = __webpack_require__(2);
var document_1 = __webpack_require__(6);
var utils_1 = __webpack_require__(7);
var PackageJson = __webpack_require__(5);
var CallbackFactory = __webpack_require__(1);
exports.default = function (config) {
    var agm = config.agm;
    var _registry = CallbackFactory();
    var connected = false;
    var documents = {};
    function openDocument(options) {
        return new es6_promise_1.Promise(function (resolve, reject) {
            var internalConfig = utils_1.mapOptions(options);
            var successHandler = function (args) {
                // Create a new document object and resolve the Promise
                var doc = document_1.default(internalConfig.cookie, options);
                documents[internalConfig.cookie] = doc;
                resolve(doc.documentApi);
            };
            var errorHandler = function (e) {
                console.warn(e);
                reject(e);
            };
            invokeEditHtmlMethod(internalConfig).then(successHandler).catch(errorHandler);
        });
    }
    // #region "Internal functions"
    agm.methodAdded(function (method) {
        if (method.name === const_1.EditHtmlMethodName) {
            if (connected === false) {
                connected = true;
                _registry.execute("onStatusChanged", { connected: connected });
            }
        }
    });
    agm.methodRemoved(function (method) {
        if (method.name === const_1.EditHtmlMethodName) {
            connected = false;
            _registry.execute("onStatusChanged", { connected: connected });
        }
    });
    // OnDocumentChanged
    agm.register(const_1.ReceiveHtmlMethodName, function (args, caller) {
        var document = documents[args.cookie];
        if (document) {
            document.documentEvents._onChanged(args);
        }
        return undefined;
    });
    // Closing method
    agm.register({
        name: const_1.CloseMethodName,
        accepts: "String documentName, String cookie",
    }, function (args, caller) {
        // Get cookie and delete the document and execute callback onClosed
        var document = documents[args.cookie];
        if (document) {
            document.documentEvents._close();
        }
        delete documents[args.cookie];
        return undefined;
    });
    function invokeEditHtmlMethod(options) {
        return new es6_promise_1.Promise(function (resolve, reject) {
            if (!connected) {
                reject("Microsoft Word with Tick42 Add-in is not running");
            }
            else {
                agm.invoke(const_1.EditHtmlMethodName, options).then(resolve).catch(reject);
            }
        });
    }
    // #endregion "Internal functions"
    function ready() {
        return new es6_promise_1.Promise(function (resolve, reject) {
            resolve(api);
        });
    }
    function onAddinStatusChanged(callback) {
        if (agm.methods(const_1.EditHtmlMethodName).length > 0) {
            connected = true;
        }
        callback({ connected: connected });
        return _registry.add("onStatusChanged", callback);
    }
    var api = {
        version: PackageJson.version,
        get all() {
            return Object.keys(documents).map(function (k) {
                return documents[k].documentApi;
            });
        },
        openDocument: openDocument,
        ready: ready,
        onAddinStatusChanged: onAddinStatusChanged,
        get addinStatus() {
            return connected;
        },
    };
    return api;
};
//# sourceMappingURL=main.js.map

/***/ }),
/* 19 */
/***/ (function(module, exports) {

/* (ignored) */

/***/ })
/******/ ]);
});
//# sourceMappingURL=tick42-word.js.map

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
        // 1. if object
        if (typeof value === "object") {
            return getModeAsString(value.mode, defaultMode, trueMode) + "";
        }
        else if (typeof value === "undefined") {
            // 2. if the user does not pass anything
            // 3. if gets defaulted to false, the library should be off
            if (typeof defaultMode === "boolean" && !defaultMode) {
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
    return {
        outlook: getLibConfig(options.outlook, true),
        excel: getLibConfig(options.excel, true),
        word: getLibConfig(options.word, true),
    };
};
//# sourceMappingURL=config.js.map

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var glue4office_1 = __webpack_require__(0);
if (typeof window !== "undefined") {
    window.Glue4Office = glue4office_1.default;
}
// add default library for ES6 modules
glue4office_1.default.default = glue4office_1.default;
module.exports = glue4office_1.default;
//# sourceMappingURL=main.js.map

/***/ }),
/* 11 */
/***/ (function(module, exports) {

/* (ignored) */

/***/ })
/******/ ]);
});
//# sourceMappingURL=glue4office.js.map