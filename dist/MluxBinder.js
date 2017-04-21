(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["MluxBinder"] = factory();
	else
		root["MluxBinder"] = factory();
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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";



Object.defineProperty(exports, "__esModule", {
    value: true
});
var id = 1;
var PERFIX = 'BINDER_STORE_';

function isArray(source) {
    return {}.toString.call(source) === '[object Array]';
}
function isFunction(source) {
    return {}.toString.call(source) === '[object Function]';
}
function getId() {
    id++;
    return PERFIX + id;
}
function assign(dst, src) {
    for (var o in src) {
        dst[o] = src[o];
    }
    return dst;
}
function StorePublisher() {
    this.stores = {};
    this.listener;
    this._receviers = {};
}

StorePublisher.prototype = {
    constructor: StorePublisher,
    setStores: function setStores(stores) {
        var _this = this;

        if (!stores) {
            return;
        }
        this.release();
        if (isArray(stores)) {
            stores.forEach(function (store) {
                _this._receviers[store.getStoreName()] = store.addListener('change', function () {
                    _this.publish();
                });
            });
        }
    },
    setListener: function setListener(listener) {
        this.listener = listener;
    },
    release: function release() {
        for (var key in this._receviers) {
            this._receviers[key].remove();
        }
    },
    publish: function publish() {
        if (isFunction(this.listener)) {
            this.listener();
        }
    }
};

function createClass(ReactComponent) {
    function BinderComponent(props, context) {
        ReactComponent.call(this, props, context);
        this._storePublisher = new StorePublisher(this);
        this._storePublisher.setStores(props.bind);
        var self = this;
        this._storePublisher.setListener(function () {
            if (self.props.propsUpdater) {
                assign(self._nextProps, self.props.propsUpdater());
            }
            self.forceUpdate();
        });
        this._isMounted = false;
        this._nextProps = assign({}, props);
        if (props.propsUpdater) {
            assign(this._nextProps, props.propsUpdater());
        }
        this.componentWillMount = function () {
            this.props = this._nextProps;
            BinderComponent.prototype.componentWillMount && BinderComponent.prototype.componentWillMount.call(this);
        };
        this.componentWillReceiveProps = function (nextProps) {
            this._storePublisher.setStores(nextProps.bind);
            this._nextProps = assign({}, nextProps);
            if (nextProps.propsUpdater) {
                assign(this._nextProps, nextProps.propsUpdater);
            }
            BinderComponent.prototype.componentWillReceiveProps && BinderComponent.prototype.componentWillReceiveProps.call(this, this._nextProps);
        };

        this.shouldComponentUpdate = function (nextProps, nextState) {
            var shouldUpdate = true;
            if (BinderComponent.prototype.shouldComponentUpdate) {
                var result = BinderComponent.prototype.shouldComponentUpdate.call(this);
                if (result === false) {
                    shouldUpdate = false;
                }
            }
            return shouldUpdate;
        };

        this.componentWillUpdate = function (nextProps, nextState) {
            BinderComponent.prototype.componentWillUpdate && BinderComponent.prototype.componentWillUpdate.call(this, this._nextProps, nextState);
        };
        this.componentDidMount = function () {
            this._isMounted = true;
            BinderComponent.prototype.componentDidMount && BinderComponent.prototype.componentDidMount.call(this);
        };
        this.componentWillUnmount = function () {
            this._isMounted = false;
            this._storePublisher.release();
            BinderComponent.prototype.componentWillUnmount && BinderComponent.prototype.componentWillUnmount.call(this);
        };
        this.render = function () {
            this.props = this._nextProps;
            return BinderComponent.prototype.render.call(this);
        };
    }
    BinderComponent.prototype = new ReactComponent({});
    BinderComponent.prototype.constructor = BinderComponent;
    return BinderComponent;
}
exports.default = {
    createClass: createClass
};

/***/ })
/******/ ]);
});