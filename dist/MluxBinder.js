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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

(function (factory) {
    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' ? module.exports = factory() :  true ? !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : window.TypeDetector = factory();
})(function factory() {
    'use strict';

    var OPToString = Object.prototype.toString;
    var hasDontEnumBug = !{
        'toString': null
    }.propertyIsEnumerable('toString');
    var hasProtoEnumBug = function () {}.propertyIsEnumerable('prototype');
    var dontEnums = ['toString', 'toLocaleString', 'valueOf', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable', 'constructor'];
    var dontEnumsLength = dontEnums.length;
    var keys = Object.keys || function (object) {
        var theKeys = [];
        var skipProto = hasProtoEnumBug && typeof object === 'function';
        if (typeof object === 'string' || object && object.callee) {
            for (var i = 0; i < object.length; ++i) {
                theKeys.push(String(i));
            }
        } else {
            for (var name in object) {
                if (!(skipProto && name === 'prototype') && ohasOwn.call(object, name)) {
                    theKeys.push(String(name));
                }
            }
        }

        if (hasDontEnumBug) {
            var ctor = object.constructor,
                skipConstructor = ctor && ctor.prototype === object;
            for (var j = 0; j < dontEnumsLength; j++) {
                var dontEnum = dontEnums[j];
                if (!(skipConstructor && dontEnum === 'constructor') && ohasOwn.call(object, dontEnum)) {
                    theKeys.push(dontEnum);
                }
            }
        }
        return theKeys;
    };
    var testFunctionName = /function\s+(\w+)\s*\(/;

    function is(object) {
        var type = OPToString.call(object).slice(8, -1);
        if (type !== 'Object') {
            return type;
        } else if (testFunctionName.test(object.constructor.toString())) {
            type = RegExp.$1;
            return type;
        }
        return type;
    }
    var isArray = Array.isArray || function (value) {
        return OPToString.call(value) === '[object Array]';
    };
    function isEmptyArray(value) {
        return isArray(value) && value.length <= 0;
    }

    function isNative(fn) {
        return (/\[native code\]/.test(fn)
        );
    }

    function isUndefined(value) {
        return value === void 0;
    }

    function isNull(value) {
        return value === null;
    }
    function isNumber(value) {
        return typeof value === 'number';
    }
    function isZero(value) {
        return 0 === value;
    }
    function isNegative(value) {
        return isNumber(value) && value >>> 0 !== value;
    }
    function isBoolean(value) {
        return typeof value === 'boolean';
    }
    /**
     * @description 是否对象
     * 
     * @param {any} value 
     * @returns 
     */
    function isObject(value) {
        return (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object';
    }
    /**
     * @description 对象实例中是否含有可枚举的值（例如{}）
     * 
     * @param {any} value 
     * @returns 
     */
    function hasEnumerableProperty(value) {
        return is(value) === 'Object' && keys(value).length <= 0;
    }
    /**
     * @description 是否字符串
     * 
     * @param {any} value 
     * @returns {boolean}
     */
    function isString(value) {
        return typeof value === 'string';
    }
    var testEmptyString = /^[\s\uFEFF\xA0]*&/;
    /**
     * @description 是否空字符串 '' ' '都被认为是空字符串
     * 
     * @param {any} value 
     * @returns {boolean}
     */
    function isEmptyString(value) {
        return isString(value) && testEmptyString.test(value);
    }
    /**
     * @description 是否function类型
     * 
     * @param {any} value 
     * @returns {boolean}
     */
    function isFunction(value) {
        return OPToString.call(value) === '[object Function]';
    }

    /**
     * @description 返回是否空值 空数组 对象中是否含有可枚举的值（例如{}） 空字符都认为是空对象
     * 
     * @param {any} value 
     * @returns {boolean}
     */
    function isEmptyValue(value) {
        return isNull(value) || isUndefined(value) || isEmptyString(value) || isEmptyArray(value) || hasEnumerableProperty(value);
    }

    function isStrictFalse(value) {
        return value === false;
    }
    function isFalse(value) {
        return !!value;
    }
    /**
     * @description 返回空对象 null undefined ''
     * 
     * @param {any} value 
     * @returns 
     */
    function isEmpty(value) {
        return isNull(value) || isUndefined(value) || isEmptyString(value);
    }

    var TypeDetector = {
        is: is,
        isArray: isArray,
        isBoolean: isBoolean,
        isFunction: isFunction,
        isNative: isNative,
        isObject: isObject,
        isNull: isNull,
        isNumber: isNumber,
        isZero: isZero,
        isNegative: isNegative,
        isString: isString,
        isUndefined: isUndefined,
        isEmptyString: isEmptyString,
        isEmptyArray: isEmptyArray,
        isEmptyValue: isEmptyValue,
        isEmpty: isEmpty,
        isNaN: isNaN,
        isStrictFalse: isStrictFalse,
        isFalse: isFalse
    };
    return TypeDetector;
});

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";



Object.defineProperty(exports, "__esModule", {
    value: true
});

var _jsTypeDetector = __webpack_require__(0);

var _jsTypeDetector2 = _interopRequireDefault(_jsTypeDetector);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var id = 1;
var PERFIX = 'BINDER_STORE_';

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
        if (_jsTypeDetector2.default.isArray(stores)) {
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
        if (_jsTypeDetector2.default.isFunction(this.listener)) {
            this.listener();
        }
    }
};

function fackContextCreator(realContenxt) {
    function FakeContent() {
        this.props = assign({}, realContenxt.props);
    };
    FakeContent.prototype = realContenxt;
    return new FakeContent();
}

function createClass(ReactComponent) {
    function BinderComponent(props, context) {
        var _this2 = this;

        ReactComponent.call(this, props, context);
        this._storePublisher = new StorePublisher(this);
        this._storePublisher.setStores(props.bind);
        this._storePublisher.setListener(function () {
            _this2.forceUpdate();
        });
        this._isMounted = false;
        this._fakeContext = fackContextCreator(this);
        this._setPropsToFakeContext = function (props) {
            if (props.propsUpdater) {
                assign(this._fakeContext.props, props);
                assign(this._fakeContext.props, props.propsUpdater());
            }
        };
        this.shouldComponentUpdate = function (nextProps, nextState) {
            return true;
        };
        this.componentWillReceiveProps = function (nextProps) {
            this._storePublisher.setStores(nextProps.bind);
            BinderComponent.prototype.componentWillReceiveProps && BinderComponent.prototype.componentWillReceiveProps.call(this._fakeContext);
        };
        this.componentWillUpdate = function (nextProps, nextState) {
            this._setPropsToFakeContext(nextProps);
            BinderComponent.prototype.componentWillUpdate && BinderComponent.prototype.componentWillUpdate.call(this._fakeContext, nextProps, nextState);
        };

        this.componentDidMount = function () {
            this._isMounted = true;
            BinderComponent.prototype.componentDidMount && BinderComponent.prototype.componentDidMount.call(this._fakeContext);
        };
        this.componentWillUnmount = function () {
            this._isMounted = false;
            this._storePublisher.release();
            BinderComponent.prototype.componentWillUnmount && BinderComponent.prototype.componentWillUnmount.call(this._fakeContext);
        };
        this.render = function () {
            return BinderComponent.prototype.render.call(this._fakeContext);
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