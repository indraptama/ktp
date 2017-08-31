module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
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
/******/ 	__webpack_require__.p = "/ktp/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "/QC5":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "subscribers", function() { return subscribers; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getCurrentUrl", function() { return getCurrentUrl; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "route", function() { return route; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Router", function() { return Router; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Route", function() { return Route; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Link", function() { return Link; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact__ = __webpack_require__("KM04");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_preact__);


var EMPTY$1 = {};

function assign(obj, props) {
	// eslint-disable-next-line guard-for-in
	for (var i in props) {
		obj[i] = props[i];
	}
	return obj;
}

function exec(url, route, opts) {
	if (opts === void 0) opts = EMPTY$1;

	var reg = /(?:\?([^#]*))?(#.*)?$/,
	    c = url.match(reg),
	    matches = {},
	    ret;
	if (c && c[1]) {
		var p = c[1].split('&');
		for (var i = 0; i < p.length; i++) {
			var r = p[i].split('=');
			matches[decodeURIComponent(r[0])] = decodeURIComponent(r.slice(1).join('='));
		}
	}
	url = segmentize(url.replace(reg, ''));
	route = segmentize(route || '');
	var max = Math.max(url.length, route.length);
	for (var i$1 = 0; i$1 < max; i$1++) {
		if (route[i$1] && route[i$1].charAt(0) === ':') {
			var param = route[i$1].replace(/(^\:|[+*?]+$)/g, ''),
			    flags = (route[i$1].match(/[+*?]+$/) || EMPTY$1)[0] || '',
			    plus = ~flags.indexOf('+'),
			    star = ~flags.indexOf('*'),
			    val = url[i$1] || '';
			if (!val && !star && (flags.indexOf('?') < 0 || plus)) {
				ret = false;
				break;
			}
			matches[param] = decodeURIComponent(val);
			if (plus || star) {
				matches[param] = url.slice(i$1).map(decodeURIComponent).join('/');
				break;
			}
		} else if (route[i$1] !== url[i$1]) {
			ret = false;
			break;
		}
	}
	if (opts.default !== true && ret === false) {
		return false;
	}
	return matches;
}

function pathRankSort(a, b) {
	var aAttr = a.attributes || EMPTY$1,
	    bAttr = b.attributes || EMPTY$1;
	if (aAttr.default) {
		return 1;
	}
	if (bAttr.default) {
		return -1;
	}
	var diff = rank(aAttr.path) - rank(bAttr.path);
	return diff || aAttr.path.length - bAttr.path.length;
}

function segmentize(url) {
	return strip(url).split('/');
}

function rank(url) {
	return (strip(url).match(/\/+/g) || '').length;
}

function strip(url) {
	return url.replace(/(^\/+|\/+$)/g, '');
}

var customHistory = null;

var ROUTERS = [];

var subscribers = [];

var EMPTY = {};

function isPreactElement(node) {
	return node.__preactattr_ != null || typeof Symbol !== 'undefined' && node[Symbol.for('preactattr')] != null;
}

function setUrl(url, type) {
	if (type === void 0) type = 'push';

	if (customHistory && customHistory[type]) {
		customHistory[type](url);
	} else if (typeof history !== 'undefined' && history[type + 'State']) {
		history[type + 'State'](null, null, url);
	}
}

function getCurrentUrl() {
	var url;
	if (customHistory && customHistory.location) {
		url = customHistory.location;
	} else if (customHistory && customHistory.getCurrentLocation) {
		url = customHistory.getCurrentLocation();
	} else {
		url = typeof location !== 'undefined' ? location : EMPTY;
	}
	return "" + (url.pathname || '') + (url.search || '');
}

function route(url, replace) {
	if (replace === void 0) replace = false;

	if (typeof url !== 'string' && url.url) {
		replace = url.replace;
		url = url.url;
	}

	// only push URL into history if we can handle it
	if (canRoute(url)) {
		setUrl(url, replace ? 'replace' : 'push');
	}

	return routeTo(url);
}

/** Check if the given URL can be handled by any router instances. */
function canRoute(url) {
	for (var i = ROUTERS.length; i--;) {
		if (ROUTERS[i].canRoute(url)) {
			return true;
		}
	}
	return false;
}

/** Tell all router instances to handle the given URL.  */
function routeTo(url) {
	var didRoute = false;
	for (var i = 0; i < ROUTERS.length; i++) {
		if (ROUTERS[i].routeTo(url) === true) {
			didRoute = true;
		}
	}
	for (var i$1 = subscribers.length; i$1--;) {
		subscribers[i$1](url);
	}
	return didRoute;
}

function routeFromLink(node) {
	// only valid elements
	if (!node || !node.getAttribute) {
		return;
	}

	var href = node.getAttribute('href'),
	    target = node.getAttribute('target');

	// ignore links with targets and non-path URLs
	if (!href || !href.match(/^\//g) || target && !target.match(/^_?self$/i)) {
		return;
	}

	// attempt to route, if no match simply cede control to browser
	return route(href);
}

function handleLinkClick(e) {
	if (e.button == 0) {
		routeFromLink(e.currentTarget || e.target || this);
		return prevent(e);
	}
}

function prevent(e) {
	if (e) {
		if (e.stopImmediatePropagation) {
			e.stopImmediatePropagation();
		}
		if (e.stopPropagation) {
			e.stopPropagation();
		}
		e.preventDefault();
	}
	return false;
}

function delegateLinkHandler(e) {
	// ignore events the browser takes care of already:
	if (e.ctrlKey || e.metaKey || e.altKey || e.shiftKey || e.button !== 0) {
		return;
	}

	var t = e.target;
	do {
		if (String(t.nodeName).toUpperCase() === 'A' && t.getAttribute('href') && isPreactElement(t)) {
			if (t.hasAttribute('native')) {
				return;
			}
			// if link is handled by the router, prevent browser defaults
			if (routeFromLink(t)) {
				return prevent(e);
			}
		}
	} while (t = t.parentNode);
}

var eventListenersInitialized = false;

function initEventListeners() {
	if (eventListenersInitialized) {
		return;
	}

	if (typeof addEventListener === 'function') {
		if (!customHistory) {
			addEventListener('popstate', function () {
				return routeTo(getCurrentUrl());
			});
		}
		addEventListener('click', delegateLinkHandler);
	}
	eventListenersInitialized = true;
}

var Router = function (Component$$1) {
	function Router(props) {
		Component$$1.call(this, props);
		if (props.history) {
			customHistory = props.history;
		}

		this.state = {
			url: props.url || getCurrentUrl()
		};

		initEventListeners();
	}

	if (Component$$1) Router.__proto__ = Component$$1;
	Router.prototype = Object.create(Component$$1 && Component$$1.prototype);
	Router.prototype.constructor = Router;

	Router.prototype.shouldComponentUpdate = function shouldComponentUpdate(props) {
		if (props.static !== true) {
			return true;
		}
		return props.url !== this.props.url || props.onChange !== this.props.onChange;
	};

	/** Check if the given URL can be matched against any children */
	Router.prototype.canRoute = function canRoute(url) {
		return this.getMatchingChildren(this.props.children, url, false).length > 0;
	};

	/** Re-render children with a new URL to match against. */
	Router.prototype.routeTo = function routeTo(url) {
		this._didRoute = false;
		this.setState({ url: url });

		// if we're in the middle of an update, don't synchronously re-route.
		if (this.updating) {
			return this.canRoute(url);
		}

		this.forceUpdate();
		return this._didRoute;
	};

	Router.prototype.componentWillMount = function componentWillMount() {
		ROUTERS.push(this);
		this.updating = true;
	};

	Router.prototype.componentDidMount = function componentDidMount() {
		var this$1 = this;

		if (customHistory) {
			this.unlisten = customHistory.listen(function (location) {
				this$1.routeTo("" + (location.pathname || '') + (location.search || ''));
			});
		}
		this.updating = false;
	};

	Router.prototype.componentWillUnmount = function componentWillUnmount() {
		if (typeof this.unlisten === 'function') {
			this.unlisten();
		}
		ROUTERS.splice(ROUTERS.indexOf(this), 1);
	};

	Router.prototype.componentWillUpdate = function componentWillUpdate() {
		this.updating = true;
	};

	Router.prototype.componentDidUpdate = function componentDidUpdate() {
		this.updating = false;
	};

	Router.prototype.getMatchingChildren = function getMatchingChildren(children, url, invoke) {
		return children.slice().sort(pathRankSort).map(function (vnode) {
			var attrs = vnode.attributes || {},
			    path = attrs.path,
			    matches = exec(url, path, attrs);
			if (matches) {
				if (invoke !== false) {
					var newProps = { url: url, matches: matches };
					assign(newProps, matches);
					return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["cloneElement"])(vnode, newProps);
				}
				return vnode;
			}
			return false;
		}).filter(Boolean);
	};

	Router.prototype.render = function render(ref, ref$1) {
		var children = ref.children;
		var onChange = ref.onChange;
		var url = ref$1.url;

		var active = this.getMatchingChildren(children, url, true);

		var current = active[0] || null;
		this._didRoute = !!current;

		var previous = this.previousUrl;
		if (url !== previous) {
			this.previousUrl = url;
			if (typeof onChange === 'function') {
				onChange({
					router: this,
					url: url,
					previous: previous,
					active: active,
					current: current
				});
			}
		}

		return current;
	};

	return Router;
}(__WEBPACK_IMPORTED_MODULE_0_preact__["Component"]);

var Link = function Link(props) {
	return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])('a', assign({ onClick: handleLinkClick }, props));
};

var Route = function Route(props) {
	return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(props.component, props);
};

Router.subscribers = subscribers;
Router.getCurrentUrl = getCurrentUrl;
Router.route = route;
Router.Router = Router;
Router.Route = Route;
Router.Link = Link;

/* harmony default export */ __webpack_exports__["default"] = (Router);
//# sourceMappingURL=preact-router.es.js.map

/***/ }),

/***/ "/nBs":
/***/ (function(module, exports, __webpack_require__) {

(function (global, factory) {
   true ? factory(exports, __webpack_require__("6uYi"), __webpack_require__("eW0v"), __webpack_require__("eW0v")) : typeof define === 'function' && define.amd ? define(['exports', 'mobx', 'react', 'react-dom'], factory) : factory(global.mobxReact = global.mobxReact || {}, global.mobx, global.React, global.ReactDOM);
})(this, function (exports, mobx, React, ReactDOM) {
  'use strict';

  var React__default = 'default' in React ? React['default'] : React;
  var ReactDOM__default = 'default' in ReactDOM ? ReactDOM['default'] : ReactDOM;

  var empty = {};

  var empty_1 = empty.unstable_batchedUpdates;

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  };

  var classCallCheck = function classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };

  var createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var inherits = function inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  };

  var possibleConstructorReturn = function possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  };

  var EventEmitter = function () {
    function EventEmitter() {
      classCallCheck(this, EventEmitter);
      this.listeners = [];
    }

    createClass(EventEmitter, [{
      key: "on",
      value: function on(cb) {
        var _this = this;

        this.listeners.push(cb);
        return function () {
          var index = _this.listeners.indexOf(cb);
          if (index !== -1) _this.listeners.splice(index, 1);
        };
      }
    }, {
      key: "emit",
      value: function emit(data) {
        this.listeners.forEach(function (fn) {
          return fn(data);
        });
      }
    }]);
    return EventEmitter;
  }();

  // Copied from React.PropTypes
  function createChainableTypeChecker(validate) {
    function checkType(isRequired, props, propName, componentName, location, propFullName) {
      for (var _len = arguments.length, rest = Array(_len > 6 ? _len - 6 : 0), _key = 6; _key < _len; _key++) {
        rest[_key - 6] = arguments[_key];
      }

      return mobx.untracked(function () {
        componentName = componentName || '<<anonymous>>';
        propFullName = propFullName || propName;
        if (props[propName] == null) {
          if (isRequired) {
            var actual = props[propName] === null ? 'null' : 'undefined';
            return new Error('The ' + location + ' `' + propFullName + '` is marked as required ' + 'in `' + componentName + '`, but its value is `' + actual + '`.');
          }
          return null;
        } else {
          return validate.apply(undefined, [props, propName, componentName, location, propFullName].concat(rest));
        }
      });
    }

    var chainedCheckType = checkType.bind(null, false);
    chainedCheckType.isRequired = checkType.bind(null, true);
    return chainedCheckType;
  }

  // Copied from React.PropTypes
  function isSymbol(propType, propValue) {
    // Native Symbol.
    if (propType === 'symbol') {
      return true;
    }

    // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
    if (propValue['@@toStringTag'] === 'Symbol') {
      return true;
    }

    // Fallback for non-spec compliant Symbols which are polyfilled.
    if (typeof Symbol === 'function' && propValue instanceof Symbol) {
      return true;
    }

    return false;
  }

  // Copied from React.PropTypes
  function getPropType(propValue) {
    var propType = typeof propValue === 'undefined' ? 'undefined' : _typeof(propValue);
    if (Array.isArray(propValue)) {
      return 'array';
    }
    if (propValue instanceof RegExp) {
      // Old webkits (at least until Android 4.0) return 'function' rather than
      // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
      // passes PropTypes.object.
      return 'object';
    }
    if (isSymbol(propType, propValue)) {
      return 'symbol';
    }
    return propType;
  }

  // This handles more types than `getPropType`. Only used for error messages.
  // Copied from React.PropTypes
  function getPreciseType(propValue) {
    var propType = getPropType(propValue);
    if (propType === 'object') {
      if (propValue instanceof Date) {
        return 'date';
      } else if (propValue instanceof RegExp) {
        return 'regexp';
      }
    }
    return propType;
  }

  function createObservableTypeCheckerCreator(allowNativeType, mobxType) {
    return createChainableTypeChecker(function (props, propName, componentName, location, propFullName) {
      return mobx.untracked(function () {
        if (allowNativeType) {
          if (getPropType(props[propName]) === mobxType.toLowerCase()) return null;
        }
        var mobxChecker = void 0;
        switch (mobxType) {
          case 'Array':
            mobxChecker = mobx.isObservableArray;break;
          case 'Object':
            mobxChecker = mobx.isObservableObject;break;
          case 'Map':
            mobxChecker = mobx.isObservableMap;break;
          default:
            throw new Error('Unexpected mobxType: ' + mobxType);
        }
        var propValue = props[propName];
        if (!mobxChecker(propValue)) {
          var preciseType = getPreciseType(propValue);
          var nativeTypeExpectationMessage = allowNativeType ? ' or javascript `' + mobxType.toLowerCase() + '`' : '';
          return new Error('Invalid prop `' + propFullName + '` of type `' + preciseType + '` supplied to' + ' `' + componentName + '`, expected `mobx.Observable' + mobxType + '`' + nativeTypeExpectationMessage + '.');
        }
        return null;
      });
    });
  }

  function createObservableArrayOfTypeChecker(allowNativeType, typeChecker) {
    return createChainableTypeChecker(function (props, propName, componentName, location, propFullName) {
      for (var _len2 = arguments.length, rest = Array(_len2 > 5 ? _len2 - 5 : 0), _key2 = 5; _key2 < _len2; _key2++) {
        rest[_key2 - 5] = arguments[_key2];
      }

      return mobx.untracked(function () {
        if (typeof typeChecker !== 'function') {
          return new Error('Property `' + propFullName + '` of component `' + componentName + '` has ' + 'invalid PropType notation.');
        }
        var error = createObservableTypeCheckerCreator(allowNativeType, 'Array')(props, propName, componentName);
        if (error instanceof Error) return error;
        var propValue = props[propName];
        for (var i = 0; i < propValue.length; i++) {
          error = typeChecker.apply(undefined, [propValue, i, componentName, location, propFullName + '[' + i + ']'].concat(rest));
          if (error instanceof Error) return error;
        }
        return null;
      });
    });
  }

  var observableArray = createObservableTypeCheckerCreator(false, 'Array');
  var observableArrayOf = createObservableArrayOfTypeChecker.bind(null, false);
  var observableMap = createObservableTypeCheckerCreator(false, 'Map');
  var observableObject = createObservableTypeCheckerCreator(false, 'Object');
  var arrayOrObservableArray = createObservableTypeCheckerCreator(true, 'Array');
  var arrayOrObservableArrayOf = createObservableArrayOfTypeChecker.bind(null, true);
  var objectOrObservableObject = createObservableTypeCheckerCreator(true, 'Object');

  var propTypes = Object.freeze({
    observableArray: observableArray,
    observableArrayOf: observableArrayOf,
    observableMap: observableMap,
    observableObject: observableObject,
    arrayOrObservableArray: arrayOrObservableArray,
    arrayOrObservableArrayOf: arrayOrObservableArrayOf,
    objectOrObservableObject: objectOrObservableObject
  });

  /**
   * Copyright 2015, Yahoo! Inc.
   * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
   */
  var REACT_STATICS = {
    childContextTypes: true,
    contextTypes: true,
    defaultProps: true,
    displayName: true,
    getDefaultProps: true,
    mixins: true,
    propTypes: true,
    type: true
  };

  var KNOWN_STATICS = {
    name: true,
    length: true,
    prototype: true,
    caller: true,
    arguments: true,
    arity: true
  };

  var isGetOwnPropertySymbolsAvailable = typeof Object.getOwnPropertySymbols === 'function';

  var index = function hoistNonReactStatics(targetComponent, sourceComponent, customStatics) {
    if (typeof sourceComponent !== 'string') {
      // don't hoist over string (html) components
      var keys = Object.getOwnPropertyNames(sourceComponent);

      /* istanbul ignore else */
      if (isGetOwnPropertySymbolsAvailable) {
        keys = keys.concat(Object.getOwnPropertySymbols(sourceComponent));
      }

      for (var i = 0; i < keys.length; ++i) {
        if (!REACT_STATICS[keys[i]] && !KNOWN_STATICS[keys[i]] && (!customStatics || !customStatics[keys[i]])) {
          try {
            targetComponent[keys[i]] = sourceComponent[keys[i]];
          } catch (error) {}
        }
      }
    }

    return targetComponent;
  };

  function isStateless(component) {
    // `function() {}` has prototype, but `() => {}` doesn't
    // `() => {}` via Babel has prototype too.
    return !(component.prototype && component.prototype.render);
  }

  var injectorContextTypes = {
    mobxStores: objectOrObservableObject
  };
  Object.seal(injectorContextTypes);

  var proxiedInjectorProps = {
    contextTypes: {
      get: function get$$1() {
        return injectorContextTypes;
      },
      set: function set$$1(_) {
        console.warn("Mobx Injector: you are trying to attach `contextTypes` on an component decorated with `inject` (or `observer`) HOC. Please specify the contextTypes on the wrapped component instead. It is accessible through the `wrappedComponent`");
      },
      configurable: true,
      enumerable: false
    },
    isMobxInjector: {
      value: true,
      writable: true,
      configurable: true,
      enumerable: true
    }
  };

  /**
   * Store Injection
   */
  function createStoreInjector(grabStoresFn, component, injectNames) {
    var _class, _temp2;

    var displayName = "inject-" + (component.displayName || component.name || component.constructor && component.constructor.name || "Unknown");
    if (injectNames) displayName += "-with-" + injectNames;

    var Injector = (_temp2 = _class = function (_Component) {
      inherits(Injector, _Component);

      function Injector() {
        var _ref;

        var _temp, _this, _ret;

        classCallCheck(this, Injector);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = Injector.__proto__ || Object.getPrototypeOf(Injector)).call.apply(_ref, [this].concat(args))), _this), _this.storeRef = function (instance) {
          _this.wrappedInstance = instance;
        }, _temp), possibleConstructorReturn(_this, _ret);
      }

      createClass(Injector, [{
        key: 'render',
        value: function render() {
          // Optimization: it might be more efficient to apply the mapper function *outside* the render method
          // (if the mapper is a function), that could avoid expensive(?) re-rendering of the injector component
          // See this test: 'using a custom injector is not too reactive' in inject.js
          var newProps = {};
          for (var key in this.props) {
            if (this.props.hasOwnProperty(key)) {
              newProps[key] = this.props[key];
            }
          }var additionalProps = grabStoresFn(this.context.mobxStores || {}, newProps, this.context) || {};
          for (var _key2 in additionalProps) {
            newProps[_key2] = additionalProps[_key2];
          }

          if (!isStateless(component)) {
            newProps.ref = this.storeRef;
          }

          return React__default.createElement(component, newProps);
        }
      }]);
      return Injector;
    }(React.Component), _class.displayName = displayName, _temp2);

    // Static fields from component should be visible on the generated Injector

    index(Injector, component);

    Injector.wrappedComponent = component;
    Object.defineProperties(Injector, proxiedInjectorProps);

    return Injector;
  }

  function grabStoresByName(storeNames) {
    return function (baseStores, nextProps) {
      storeNames.forEach(function (storeName) {
        if (storeName in nextProps) // prefer props over stores
          return;
        if (!(storeName in baseStores)) throw new Error("MobX injector: Store '" + storeName + "' is not available! Make sure it is provided by some Provider");
        nextProps[storeName] = baseStores[storeName];
      });
      return nextProps;
    };
  }

  /**
   * higher order component that injects stores to a child.
   * takes either a varargs list of strings, which are stores read from the context,
   * or a function that manually maps the available stores from the context to props:
   * storesToProps(mobxStores, props, context) => newProps
   */
  function inject() /* fn(stores, nextProps) or ...storeNames */{
    var grabStoresFn = void 0;
    if (typeof arguments[0] === "function") {
      grabStoresFn = arguments[0];
      return function (componentClass) {
        var injected = createStoreInjector(grabStoresFn, componentClass);
        injected.isMobxInjector = false; // supress warning
        // mark the Injector as observer, to make it react to expressions in `grabStoresFn`,
        // see #111
        injected = observer(injected);
        injected.isMobxInjector = true; // restore warning
        return injected;
      };
    } else {
      var storeNames = [];
      for (var i = 0; i < arguments.length; i++) {
        storeNames[i] = arguments[i];
      }grabStoresFn = grabStoresByName(storeNames);
      return function (componentClass) {
        return createStoreInjector(grabStoresFn, componentClass, storeNames.join("-"));
      };
    }
  }

  /**
   * dev tool support
   */
  var isDevtoolsEnabled = false;

  var isUsingStaticRendering = false;

  var warnedAboutObserverInjectDeprecation = false;

  // WeakMap<Node, Object>;
  var componentByNodeRegistery = typeof WeakMap !== "undefined" ? new WeakMap() : undefined;
  var renderReporter = new EventEmitter();

  function findDOMNode(component) {
    if (ReactDOM__default) {
      try {
        return ReactDOM__default.findDOMNode(component);
      } catch (e) {
        // findDOMNode will throw in react-test-renderer, see:
        // See https://github.com/mobxjs/mobx-react/issues/216
        // Is there a better heuristic?
        return null;
      }
    }
    return null;
  }

  function reportRendering(component) {
    var node = findDOMNode(component);
    if (node && componentByNodeRegistery) componentByNodeRegistery.set(node, component);

    renderReporter.emit({
      event: 'render',
      renderTime: component.__$mobRenderEnd - component.__$mobRenderStart,
      totalTime: Date.now() - component.__$mobRenderStart,
      component: component,
      node: node
    });
  }

  function trackComponents() {
    if (typeof WeakMap === "undefined") throw new Error("[mobx-react] tracking components is not supported in this browser.");
    if (!isDevtoolsEnabled) isDevtoolsEnabled = true;
  }

  function useStaticRendering(useStaticRendering) {
    isUsingStaticRendering = useStaticRendering;
  }

  /**
   * Errors reporter
   */

  var errorsReporter = new EventEmitter();

  /**
   * Utilities
   */

  function patch(target, funcName) {
    var runMixinFirst = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    var base = target[funcName];
    var mixinFunc = reactiveMixin[funcName];
    var f = !base ? mixinFunc : runMixinFirst === true ? function () {
      mixinFunc.apply(this, arguments);
      base.apply(this, arguments);
    } : function () {
      base.apply(this, arguments);
      mixinFunc.apply(this, arguments);
    };

    // MWE: ideally we freeze here to protect against accidental overwrites in component instances, see #195
    // ...but that breaks react-hot-loader, see #231...
    target[funcName] = f;
  }

  function isObjectShallowModified(prev, next) {
    if (null == prev || null == next || (typeof prev === 'undefined' ? 'undefined' : _typeof(prev)) !== "object" || (typeof next === 'undefined' ? 'undefined' : _typeof(next)) !== "object") {
      return prev !== next;
    }
    var keys = Object.keys(prev);
    if (keys.length !== Object.keys(next).length) {
      return true;
    }
    var key = void 0;
    for (var i = keys.length - 1; i >= 0, key = keys[i]; i--) {
      if (next[key] !== prev[key]) {
        return true;
      }
    }
    return false;
  }

  /**
   * ReactiveMixin
   */
  var reactiveMixin = {
    componentWillMount: function componentWillMount() {
      var _this = this;

      if (isUsingStaticRendering === true) return;
      // Generate friendly name for debugging
      var initialName = this.displayName || this.name || this.constructor && (this.constructor.displayName || this.constructor.name) || "<component>";
      var rootNodeID = this._reactInternalInstance && this._reactInternalInstance._rootNodeID;

      /**
       * If props are shallowly modified, react will render anyway,
       * so atom.reportChanged() should not result in yet another re-render
       */
      var skipRender = false;
      /**
       * forceUpdate will re-assign this.props. We don't want that to cause a loop,
       * so detect these changes
       */
      var isForcingUpdate = false;

      function makePropertyObservableReference(propName) {
        var valueHolder = this[propName];
        var atom = new mobx.Atom("reactive " + propName);
        Object.defineProperty(this, propName, {
          configurable: true, enumerable: true,
          get: function get$$1() {
            atom.reportObserved();
            return valueHolder;
          },
          set: function set$$1(v) {
            if (!isForcingUpdate && isObjectShallowModified(valueHolder, v)) {
              valueHolder = v;
              skipRender = true;
              atom.reportChanged();
              skipRender = false;
            } else {
              valueHolder = v;
            }
          }
        });
      }

      // make this.props an observable reference, see #124
      makePropertyObservableReference.call(this, "props");
      // make state an observable reference
      makePropertyObservableReference.call(this, "state");

      // wire up reactive render
      var baseRender = this.render.bind(this);
      var reaction = null;
      var isRenderingPending = false;

      var initialRender = function initialRender() {
        reaction = new mobx.Reaction(initialName + '#' + rootNodeID + '.render()', function () {
          if (!isRenderingPending) {
            // N.B. Getting here *before mounting* means that a component constructor has side effects (see the relevant test in misc.js)
            // This unidiomatic React usage but React will correctly warn about this so we continue as usual
            // See #85 / Pull #44
            isRenderingPending = true;
            if (typeof _this.componentWillReact === "function") _this.componentWillReact(); // TODO: wrap in action?
            if (_this.__$mobxIsUnmounted !== true) {
              // If we are unmounted at this point, componentWillReact() had a side effect causing the component to unmounted
              // TODO: remove this check? Then react will properly warn about the fact that this should not happen? See #73
              // However, people also claim this migth happen during unit tests..
              var hasError = true;
              try {
                isForcingUpdate = true;
                if (!skipRender) React__default.Component.prototype.forceUpdate.call(_this);
                hasError = false;
              } finally {
                isForcingUpdate = false;
                if (hasError) reaction.dispose();
              }
            }
          }
        });
        reactiveRender.$mobx = reaction;
        _this.render = reactiveRender;
        return reactiveRender();
      };

      var reactiveRender = function reactiveRender() {
        isRenderingPending = false;
        var exception = undefined;
        var rendering = undefined;
        reaction.track(function () {
          if (isDevtoolsEnabled) {
            _this.__$mobRenderStart = Date.now();
          }
          try {
            rendering = mobx.extras.allowStateChanges(false, baseRender);
          } catch (e) {
            exception = e;
          }
          if (isDevtoolsEnabled) {
            _this.__$mobRenderEnd = Date.now();
          }
        });
        if (exception) {
          errorsReporter.emit(exception);
          throw exception;
        }
        return rendering;
      };

      this.render = initialRender;
    },

    componentWillUnmount: function componentWillUnmount() {
      if (isUsingStaticRendering === true) return;
      this.render.$mobx && this.render.$mobx.dispose();
      this.__$mobxIsUnmounted = true;
      if (isDevtoolsEnabled) {
        var node = findDOMNode(this);
        if (node && componentByNodeRegistery) {
          componentByNodeRegistery.delete(node);
        }
        renderReporter.emit({
          event: 'destroy',
          component: this,
          node: node
        });
      }
    },

    componentDidMount: function componentDidMount() {
      if (isDevtoolsEnabled) {
        reportRendering(this);
      }
    },

    componentDidUpdate: function componentDidUpdate() {
      if (isDevtoolsEnabled) {
        reportRendering(this);
      }
    },

    shouldComponentUpdate: function shouldComponentUpdate(nextProps, nextState) {
      if (isUsingStaticRendering) {
        console.warn("[mobx-react] It seems that a re-rendering of a React component is triggered while in static (server-side) mode. Please make sure components are rendered only once server-side.");
      }
      // update on any state changes (as is the default)
      if (this.state !== nextState) {
        return true;
      }
      // update if props are shallowly not equal, inspired by PureRenderMixin
      // we could return just 'false' here, and avoid the `skipRender` checks etc
      // however, it is nicer if lifecycle events are triggered like usually,
      // so we return true here if props are shallowly modified.
      return isObjectShallowModified(this.props, nextProps);
    }
  };

  /**
   * Observer function / decorator
   */
  function observer(arg1, arg2) {
    if (typeof arg1 === "string") {
      throw new Error("Store names should be provided as array");
    }
    if (Array.isArray(arg1)) {
      // component needs stores
      if (!warnedAboutObserverInjectDeprecation) {
        warnedAboutObserverInjectDeprecation = true;
        console.warn('Mobx observer: Using observer to inject stores is deprecated since 4.0. Use `@inject("store1", "store2") @observer ComponentClass` or `inject("store1", "store2")(observer(componentClass))` instead of `@observer(["store1", "store2"]) ComponentClass`');
      }
      if (!arg2) {
        // invoked as decorator
        return function (componentClass) {
          return observer(arg1, componentClass);
        };
      } else {
        return inject.apply(null, arg1)(observer(arg2));
      }
    }
    var componentClass = arg1;

    if (componentClass.isMobxInjector === true) {
      console.warn('Mobx observer: You are trying to use \'observer\' on a component that already has \'inject\'. Please apply \'observer\' before applying \'inject\'');
    }

    // Stateless function component:
    // If it is function but doesn't seem to be a react class constructor,
    // wrap it to a react class automatically
    if (typeof componentClass === "function" && (!componentClass.prototype || !componentClass.prototype.render) && !componentClass.isReactClass && !React__default.Component.isPrototypeOf(componentClass)) {
      var _class, _temp;

      return observer((_temp = _class = function (_Component) {
        inherits(_class, _Component);

        function _class() {
          classCallCheck(this, _class);
          return possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
        }

        createClass(_class, [{
          key: 'render',
          value: function render() {
            return componentClass.call(this, this.props, this.context);
          }
        }]);
        return _class;
      }(React.Component), _class.displayName = componentClass.displayName || componentClass.name, _class.contextTypes = componentClass.contextTypes, _class.propTypes = componentClass.propTypes, _class.defaultProps = componentClass.defaultProps, _temp));
    }

    if (!componentClass) {
      throw new Error("Please pass a valid component to 'observer'");
    }

    var target = componentClass.prototype || componentClass;
    mixinLifecycleEvents(target);
    componentClass.isMobXReactObserver = true;
    return componentClass;
  }

  function mixinLifecycleEvents(target) {
    patch(target, "componentWillMount", true);
    ["componentDidMount", "componentWillUnmount", "componentDidUpdate"].forEach(function (funcName) {
      patch(target, funcName);
    });
    if (!target.shouldComponentUpdate) {
      target.shouldComponentUpdate = reactiveMixin.shouldComponentUpdate;
    }
  }

  // TODO: support injection somehow as well?
  var Observer = observer(function (_ref) {
    var children = _ref.children;
    return children();
  });

  Observer.propTypes = {
    children: function children(propValue, key, componentName, location, propFullName) {
      if (typeof propValue[key] !== 'function') return new Error('Invalid prop `' + propFullName + '` of type `' + _typeof(propValue[key]) + '` supplied to' + ' `' + componentName + '`, expected `function`.');
    }
  };

  var _class;
  var _temp;

  var specialReactKeys = { children: true, key: true, ref: true };

  var Provider = (_temp = _class = function (_Component) {
    inherits(Provider, _Component);

    function Provider() {
      classCallCheck(this, Provider);
      return possibleConstructorReturn(this, (Provider.__proto__ || Object.getPrototypeOf(Provider)).apply(this, arguments));
    }

    createClass(Provider, [{
      key: 'render',
      value: function render() {
        return React__default.Children.only(this.props.children);
      }
    }, {
      key: 'getChildContext',
      value: function getChildContext() {
        var stores = {};
        // inherit stores
        var baseStores = this.context.mobxStores;
        if (baseStores) for (var key in baseStores) {
          stores[key] = baseStores[key];
        }
        // add own stores
        for (var _key in this.props) {
          if (!specialReactKeys[_key] && _key !== "suppressChangedStoreWarning") stores[_key] = this.props[_key];
        }return {
          mobxStores: stores
        };
      }
    }, {
      key: 'componentWillReceiveProps',
      value: function componentWillReceiveProps(nextProps) {
        // Maybe this warning is too aggressive?
        if (Object.keys(nextProps).length !== Object.keys(this.props).length) console.warn("MobX Provider: The set of provided stores has changed. Please avoid changing stores as the change might not propagate to all children");
        if (!nextProps.suppressChangedStoreWarning) for (var key in nextProps) {
          if (!specialReactKeys[key] && this.props[key] !== nextProps[key]) console.warn("MobX Provider: Provided store '" + key + "' has changed. Please avoid replacing stores as the change might not propagate to all children");
        }
      }
    }]);
    return Provider;
  }(React.Component), _class.contextTypes = {
    mobxStores: objectOrObservableObject
  }, _class.childContextTypes = {
    mobxStores: objectOrObservableObject.isRequired
  }, _temp);

  var TARGET_LIB_NAME = void 0;
  TARGET_LIB_NAME = 'mobx-react';
  if (!mobx) throw new Error(TARGET_LIB_NAME + ' requires the MobX package');
  if (!React__default) throw new Error(TARGET_LIB_NAME + ' requires React to be available');

  if ("browser" === 'browser' && typeof ReactDOM.unstable_batchedUpdates === "function") mobx.extras.setReactionScheduler(ReactDOM.unstable_batchedUpdates);
  if (false) mobx.extras.setReactionScheduler(empty_1);

  var onError = function onError(fn) {
    return errorsReporter.on(fn);
  };

  /* DevTool support */
  if ((typeof __MOBX_DEVTOOLS_GLOBAL_HOOK__ === 'undefined' ? 'undefined' : _typeof(__MOBX_DEVTOOLS_GLOBAL_HOOK__)) === 'object') {
    var mobxReact = { renderReporter: renderReporter, componentByNodeRegistery: componentByNodeRegistery, trackComponents: trackComponents };
    __MOBX_DEVTOOLS_GLOBAL_HOOK__.injectMobxReact(mobxReact, mobx);
  }

  exports.propTypes = propTypes;
  exports.PropTypes = propTypes;
  exports.onError = onError;
  exports['default'] = exports;
  exports.observer = observer;
  exports.Observer = Observer;
  exports.renderReporter = renderReporter;
  exports.componentByNodeRegistery = componentByNodeRegistery;
  exports.trackComponents = trackComponents;
  exports.useStaticRendering = useStaticRendering;
  exports.Provider = Provider;
  exports.inject = inject;

  Object.defineProperty(exports, '__esModule', { value: true });
});

/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("JkW7");


/***/ }),

/***/ "1lu6":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = DropDown;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact__ = __webpack_require__("KM04");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_preact__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__style__ = __webpack_require__("5qQg");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__style___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__style__);




function DropDown(props) {
  var title = null;
  var highlight = null;

  function focusHighlight() {
    title.style.color = '#673AB7';
    highlight.style.transform = 'translate3d(0,0,0)';
    highlight.classList.add('isActive');
  }

  function blurHighlight() {
    title.style.color = 'rgba(0,0,0,.5)';
    highlight.style.transform = 'translate3d(-100%,0,0)';
    highlight.classList.remove('isActive');
  }

  return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
    'label',
    { className: __WEBPACK_IMPORTED_MODULE_1__style___default.a.DropDown },
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
      'span',
      { className: __WEBPACK_IMPORTED_MODULE_1__style___default.a.DropDown_title, ref: function ref(span) {
          title = span;
        } },
      props.title
    ),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
      'select',
      { className: __WEBPACK_IMPORTED_MODULE_1__style___default.a.DropDown_input,
        type: props.type,
        value: props.Value,
        name: props.name,
        placeholder: props.placeholder,
        onChange: props.onChange,
        onFocus: focusHighlight,
        onBlur: blurHighlight },
      props.dataItems.map(function (option) {
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
          'option',
          { className: 'w-100 db', value: option.value },
          option.label
        );
      })
    ),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
      'div',
      { className: __WEBPACK_IMPORTED_MODULE_1__style___default.a.DropDown_highlight },
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])('span', { className: __WEBPACK_IMPORTED_MODULE_1__style___default.a.DropDown_highlightItem, ref: function ref(span) {
          highlight = span;
        } })
    )
  );
}

function DropDownItem(props) {
  return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
    'option',
    { className: 'w-100 db', value: props.value },
    props.label
  );
}

/***/ }),

/***/ "2AN3":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"flex":"flex__3lumJ","w_50":"w_50__2C09r","mh1":"mh1__2CWTA","mr1":"mr1__3FgBK","pl1":"pl1__3cIwU"};

/***/ }),

/***/ "5D9O":
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

if (false) {
  var REACT_ELEMENT_TYPE = typeof Symbol === 'function' && Symbol.for && Symbol.for('react.element') || 0xeac7;

  var isValidElement = function isValidElement(object) {
    return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
  };

  // By explicitly using `prop-types` you are opting into new development behavior.
  // http://fb.me/prop-types-in-prod
  var throwOnDirectAccess = true;
  module.exports = require('./factoryWithTypeCheckers')(isValidElement, throwOnDirectAccess);
} else {
  // By explicitly using `prop-types` you are opting into new production behavior.
  // http://fb.me/prop-types-in-prod
  module.exports = __webpack_require__("wVGV")();
}

/***/ }),

/***/ "5htX":
/***/ (function(module, exports, __webpack_require__) {

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

!function (e, t) {
   true ? module.exports = t(__webpack_require__("eW0v"), __webpack_require__("6uYi"), __webpack_require__("/nBs")) : "function" == typeof define && define.amd ? define(["react", "mobx", "mobx-react"], t) : "object" == typeof exports ? exports.mobxDevtools = t(require("react"), require("mobx"), require("mobx-react")) : e.mobxDevtools = t(e.React, e.mobx, e.mobxReact);
}(this, function (e, t, n) {
  return function (e) {
    function t(r) {
      if (n[r]) return n[r].exports;var o = n[r] = { exports: {}, id: r, loaded: !1 };return e[r].call(o.exports, o, o.exports, t), o.loaded = !0, o.exports;
    }var n = {};return t.m = e, t.c = n, t.p = "", t(0);
  }([function (e, t, n) {
    "use strict";
    function r(e) {
      return e && e.__esModule ? e : { default: e };
    }Object.defineProperty(t, "__esModule", { value: !0 }), t.setLogEnabled = t.setGraphEnabled = t.setUpdatesEnabled = t.configureDevtool = t.UpdatesControl = t.LogControl = t.GraphControl = t.default = void 0;var o = n(1);Object.defineProperty(t, "default", { enumerable: !0, get: function get() {
        return r(o).default;
      } });var i = n(19);Object.defineProperty(t, "GraphControl", { enumerable: !0, get: function get() {
        return r(i).default;
      } });var a = n(20);Object.defineProperty(t, "LogControl", { enumerable: !0, get: function get() {
        return r(a).default;
      } });var u = n(21);Object.defineProperty(t, "UpdatesControl", { enumerable: !0, get: function get() {
        return r(u).default;
      } });var l = n(37),
        s = r(l),
        c = n(12);s.default.polyfill();var f = t.configureDevtool = function (e) {
      var t = e.logEnabled,
          n = e.updatesEnabled,
          r = e.graphEnabled,
          o = e.logFilter,
          i = {};void 0 !== t && (i.logEnabled = Boolean(t)), void 0 !== n && (i.updatesEnabled = Boolean(n)), void 0 !== r && (i.graphEnabled = Boolean(r)), "function" == typeof o && (i.logFilter = o), (0, c.setGlobalState)(i);
    };t.setUpdatesEnabled = function (e) {
      return f({ updatesEnabled: e });
    }, t.setGraphEnabled = function (e) {
      return f({ graphEnabled: e });
    }, t.setLogEnabled = function (e) {
      return f({ logEnabled: e });
    };
  }, function (e, t, n) {
    "use strict";
    function r(e) {
      return e && e.__esModule ? e : { default: e };
    }function o(e, t) {
      if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
    }function i(e, t) {
      if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return !t || "object" != typeof t && "function" != typeof t ? e : t;
    }function a(e, t) {
      if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t);
    }Object.defineProperty(t, "__esModule", { value: !0 });var u = function () {
      function e(e, t) {
        for (var n = 0; n < t.length; n++) {
          var r = t[n];r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
        }
      }return function (t, n, r) {
        return n && e(t.prototype, n), r && e(t, r), t;
      };
    }(),
        l = n(2),
        s = r(l),
        c = n(3),
        f = r(c),
        d = n(12),
        p = n(18),
        h = r(p),
        g = n(31),
        y = r(g),
        b = n(33),
        v = r(b),
        m = function (e) {
      function t() {
        var e, n, r, a;o(this, t);for (var u = arguments.length, l = Array(u), s = 0; s < u; s++) {
          l[s] = arguments[s];
        }return n = r = i(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [this].concat(l))), r.handleUpdate = function () {
          return r.setState((0, d.getGlobalState)());
        }, r.handleToggleGraph = function () {
          r.setState({ hoverBoxes: [], graphEnabled: !r.state.graphEnabled });
        }, a = n, i(r, a);
      }return a(t, e), u(t, [{ key: "componentWillMount", value: function value() {
          this.setState((0, d.getGlobalState)());
        } }, { key: "componentDidMount", value: function value() {
          d.eventEmitter.on("update", this.handleUpdate);
        } }, { key: "componentWillUnmount", value: function value() {
          d.eventEmitter.removeListener("update", this.handleUpdate);
        } }, { key: "render", value: function value() {
          var e = this.props,
              t = e.noPanel,
              n = e.highlightTimeout,
              r = this.state,
              o = r.renderingBoxes,
              i = r.hoverBoxes;return s.default.createElement("div", null, t !== !0 && s.default.createElement(h.default, { position: this.props.position, highlightTimeout: n }), s.default.createElement(y.default, { boxes: o.concat(i) }), s.default.createElement(v.default, null));
        } }]), t;
    }(l.Component);m.propTypes = { highlightTimeout: f.default.number, position: f.default.object, noPanel: f.default.bool }, m.defaultProps = { noPanel: !1 }, t.default = m;
  }, function (t, n) {
    t.exports = e;
  }, function (e, t, n) {
    (function (t) {
      if ("production" !== t.env.NODE_ENV) {
        var r = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103,
            o = function o(e) {
          return "object" == typeof e && null !== e && e.$$typeof === r;
        },
            i = !0;e.exports = n(5)(o, i);
      } else e.exports = n(11)();
    }).call(t, n(4));
  }, function (e, t) {
    function n() {
      throw new Error("setTimeout has not been defined");
    }function r() {
      throw new Error("clearTimeout has not been defined");
    }function o(e) {
      if (c === setTimeout) return setTimeout(e, 0);if ((c === n || !c) && setTimeout) return c = setTimeout, setTimeout(e, 0);try {
        return c(e, 0);
      } catch (t) {
        try {
          return c.call(null, e, 0);
        } catch (t) {
          return c.call(this, e, 0);
        }
      }
    }function i(e) {
      if (f === clearTimeout) return clearTimeout(e);if ((f === r || !f) && clearTimeout) return f = clearTimeout, clearTimeout(e);try {
        return f(e);
      } catch (t) {
        try {
          return f.call(null, e);
        } catch (t) {
          return f.call(this, e);
        }
      }
    }function a() {
      g && p && (g = !1, p.length ? h = p.concat(h) : y = -1, h.length && u());
    }function u() {
      if (!g) {
        var e = o(a);g = !0;for (var t = h.length; t;) {
          for (p = h, h = []; ++y < t;) {
            p && p[y].run();
          }y = -1, t = h.length;
        }p = null, g = !1, i(e);
      }
    }function l(e, t) {
      this.fun = e, this.array = t;
    }function s() {}var c,
        f,
        d = e.exports = {};!function () {
      try {
        c = "function" == typeof setTimeout ? setTimeout : n;
      } catch (e) {
        c = n;
      }try {
        f = "function" == typeof clearTimeout ? clearTimeout : r;
      } catch (e) {
        f = r;
      }
    }();var p,
        h = [],
        g = !1,
        y = -1;d.nextTick = function (e) {
      var t = new Array(arguments.length - 1);if (arguments.length > 1) for (var n = 1; n < arguments.length; n++) {
        t[n - 1] = arguments[n];
      }h.push(new l(e, t)), 1 !== h.length || g || o(u);
    }, l.prototype.run = function () {
      this.fun.apply(null, this.array);
    }, d.title = "browser", d.browser = !0, d.env = {}, d.argv = [], d.version = "", d.versions = {}, d.on = s, d.addListener = s, d.once = s, d.off = s, d.removeListener = s, d.removeAllListeners = s, d.emit = s, d.prependListener = s, d.prependOnceListener = s, d.listeners = function (e) {
      return [];
    }, d.binding = function (e) {
      throw new Error("process.binding is not supported");
    }, d.cwd = function () {
      return "/";
    }, d.chdir = function (e) {
      throw new Error("process.chdir is not supported");
    }, d.umask = function () {
      return 0;
    };
  }, function (e, t, n) {
    (function (t) {
      "use strict";
      var r = n(6),
          o = n(7),
          i = n(8),
          a = n(9),
          u = n(10);e.exports = function (e, n) {
        function l(e) {
          var t = e && (P && e[P] || e[T]);if ("function" == typeof t) return t;
        }function s(e, t) {
          return e === t ? 0 !== e || 1 / e === 1 / t : e !== e && t !== t;
        }function c(e) {
          this.message = e, this.stack = "";
        }function f(e) {
          function r(r, s, f, d, p, h, g) {
            if (d = d || A, h = h || f, g !== a) if (n) o(!1, "Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types");else if ("production" !== t.env.NODE_ENV && "undefined" != typeof console) {
              var y = d + ":" + f;!u[y] && l < 3 && (i(!1, "You are manually calling a React.PropTypes validation function for the `%s` prop on `%s`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details.", h, d), u[y] = !0, l++);
            }return null == s[f] ? r ? new c(null === s[f] ? "The " + p + " `" + h + "` is marked as required " + ("in `" + d + "`, but its value is `null`.") : "The " + p + " `" + h + "` is marked as required in " + ("`" + d + "`, but its value is `undefined`.")) : null : e(s, f, d, p, h);
          }if ("production" !== t.env.NODE_ENV) var u = {},
              l = 0;var s = r.bind(null, !1);return s.isRequired = r.bind(null, !0), s;
        }function d(e) {
          function t(t, n, r, o, i, a) {
            var u = t[n],
                l = E(u);if (l !== e) {
              var s = j(u);return new c("Invalid " + o + " `" + i + "` of type " + ("`" + s + "` supplied to `" + r + "`, expected ") + ("`" + e + "`."));
            }return null;
          }return f(t);
        }function p() {
          return f(r.thatReturnsNull);
        }function h(e) {
          function t(t, n, r, o, i) {
            if ("function" != typeof e) return new c("Property `" + i + "` of component `" + r + "` has invalid PropType notation inside arrayOf.");var u = t[n];if (!Array.isArray(u)) {
              var l = E(u);return new c("Invalid " + o + " `" + i + "` of type " + ("`" + l + "` supplied to `" + r + "`, expected an array."));
            }for (var s = 0; s < u.length; s++) {
              var f = e(u, s, r, o, i + "[" + s + "]", a);if (f instanceof Error) return f;
            }return null;
          }return f(t);
        }function g() {
          function t(t, n, r, o, i) {
            var a = t[n];if (!e(a)) {
              var u = E(a);return new c("Invalid " + o + " `" + i + "` of type " + ("`" + u + "` supplied to `" + r + "`, expected a single ReactElement."));
            }return null;
          }return f(t);
        }function y(e) {
          function t(t, n, r, o, i) {
            if (!(t[n] instanceof e)) {
              var a = e.name || A,
                  u = C(t[n]);return new c("Invalid " + o + " `" + i + "` of type " + ("`" + u + "` supplied to `" + r + "`, expected ") + ("instance of `" + a + "`."));
            }return null;
          }return f(t);
        }function b(e) {
          function n(t, n, r, o, i) {
            for (var a = t[n], u = 0; u < e.length; u++) {
              if (s(a, e[u])) return null;
            }var l = JSON.stringify(e);return new c("Invalid " + o + " `" + i + "` of value `" + a + "` " + ("supplied to `" + r + "`, expected one of " + l + "."));
          }return Array.isArray(e) ? f(n) : ("production" !== t.env.NODE_ENV ? i(!1, "Invalid argument supplied to oneOf, expected an instance of array.") : void 0, r.thatReturnsNull);
        }function v(e) {
          function t(t, n, r, o, i) {
            if ("function" != typeof e) return new c("Property `" + i + "` of component `" + r + "` has invalid PropType notation inside objectOf.");var u = t[n],
                l = E(u);if ("object" !== l) return new c("Invalid " + o + " `" + i + "` of type " + ("`" + l + "` supplied to `" + r + "`, expected an object."));for (var s in u) {
              if (u.hasOwnProperty(s)) {
                var f = e(u, s, r, o, i + "." + s, a);if (f instanceof Error) return f;
              }
            }return null;
          }return f(t);
        }function m(e) {
          function n(t, n, r, o, i) {
            for (var u = 0; u < e.length; u++) {
              var l = e[u];if (null == l(t, n, r, o, i, a)) return null;
            }return new c("Invalid " + o + " `" + i + "` supplied to " + ("`" + r + "`."));
          }if (!Array.isArray(e)) return "production" !== t.env.NODE_ENV ? i(!1, "Invalid argument supplied to oneOfType, expected an instance of array.") : void 0, r.thatReturnsNull;for (var o = 0; o < e.length; o++) {
            var u = e[o];if ("function" != typeof u) return i(!1, "Invalid argument supplid to oneOfType. Expected an array of check functions, but received %s at index %s.", O(u), o), r.thatReturnsNull;
          }return f(n);
        }function I() {
          function e(e, t, n, r, o) {
            return x(e[t]) ? null : new c("Invalid " + r + " `" + o + "` supplied to " + ("`" + n + "`, expected a ReactNode."));
          }return f(e);
        }function w(e) {
          function t(t, n, r, o, i) {
            var u = t[n],
                l = E(u);if ("object" !== l) return new c("Invalid " + o + " `" + i + "` of type `" + l + "` " + ("supplied to `" + r + "`, expected `object`."));for (var s in e) {
              var f = e[s];if (f) {
                var d = f(u, s, r, o, i + "." + s, a);if (d) return d;
              }
            }return null;
          }return f(t);
        }function x(t) {
          switch (typeof t) {case "number":case "string":case "undefined":
              return !0;case "boolean":
              return !t;case "object":
              if (Array.isArray(t)) return t.every(x);if (null === t || e(t)) return !0;var n = l(t);if (!n) return !1;var r,
                  o = n.call(t);if (n !== t.entries) {
                for (; !(r = o.next()).done;) {
                  if (!x(r.value)) return !1;
                }
              } else for (; !(r = o.next()).done;) {
                var i = r.value;if (i && !x(i[1])) return !1;
              }return !0;default:
              return !1;}
        }function _(e, t) {
          return "symbol" === e || "Symbol" === t["@@toStringTag"] || "function" == typeof Symbol && t instanceof Symbol;
        }function E(e) {
          var t = typeof e;return Array.isArray(e) ? "array" : e instanceof RegExp ? "object" : _(t, e) ? "symbol" : t;
        }function j(e) {
          if ("undefined" == typeof e || null === e) return "" + e;var t = E(e);if ("object" === t) {
            if (e instanceof Date) return "date";if (e instanceof RegExp) return "regexp";
          }return t;
        }function O(e) {
          var t = j(e);switch (t) {case "array":case "object":
              return "an " + t;case "boolean":case "date":case "regexp":
              return "a " + t;default:
              return t;}
        }function C(e) {
          return e.constructor && e.constructor.name ? e.constructor.name : A;
        }var P = "function" == typeof Symbol && Symbol.iterator,
            T = "@@iterator",
            A = "<<anonymous>>",
            M = { array: d("array"), bool: d("boolean"), func: d("function"), number: d("number"), object: d("object"), string: d("string"), symbol: d("symbol"), any: p(), arrayOf: h, element: g(), instanceOf: y, node: I(), objectOf: v, oneOf: b, oneOfType: m, shape: w };return c.prototype = Error.prototype, M.checkPropTypes = u, M.PropTypes = M, M;
      };
    }).call(t, n(4));
  }, function (e, t) {
    "use strict";
    function n(e) {
      return function () {
        return e;
      };
    }var r = function r() {};r.thatReturns = n, r.thatReturnsFalse = n(!1), r.thatReturnsTrue = n(!0), r.thatReturnsNull = n(null), r.thatReturnsThis = function () {
      return this;
    }, r.thatReturnsArgument = function (e) {
      return e;
    }, e.exports = r;
  }, function (e, t, n) {
    (function (t) {
      "use strict";
      function n(e, t, n, o, i, a, u, l) {
        if (r(t), !e) {
          var s;if (void 0 === t) s = new Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");else {
            var c = [n, o, i, a, u, l],
                f = 0;s = new Error(t.replace(/%s/g, function () {
              return c[f++];
            })), s.name = "Invariant Violation";
          }throw s.framesToPop = 1, s;
        }
      }var r = function r(e) {};"production" !== t.env.NODE_ENV && (r = function r(e) {
        if (void 0 === e) throw new Error("invariant requires an error message argument");
      }), e.exports = n;
    }).call(t, n(4));
  }, function (e, t, n) {
    (function (t) {
      "use strict";
      var r = n(6),
          o = r;"production" !== t.env.NODE_ENV && !function () {
        var e = function e(_e) {
          for (var t = arguments.length, n = Array(t > 1 ? t - 1 : 0), r = 1; r < t; r++) {
            n[r - 1] = arguments[r];
          }var o = 0,
              i = "Warning: " + _e.replace(/%s/g, function () {
            return n[o++];
          });"undefined" != typeof console && console.error(i);try {
            throw new Error(i);
          } catch (e) {}
        };o = function o(t, n) {
          if (void 0 === n) throw new Error("`warning(condition, format, ...args)` requires a warning message argument");if (0 !== n.indexOf("Failed Composite propType: ") && !t) {
            for (var r = arguments.length, o = Array(r > 2 ? r - 2 : 0), i = 2; i < r; i++) {
              o[i - 2] = arguments[i];
            }e.apply(void 0, [n].concat(o));
          }
        };
      }(), e.exports = o;
    }).call(t, n(4));
  }, function (e, t) {
    "use strict";
    var n = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";e.exports = n;
  }, function (e, t, n) {
    (function (t) {
      "use strict";
      function r(e, n, r, l, s) {
        if ("production" !== t.env.NODE_ENV) for (var c in e) {
          if (e.hasOwnProperty(c)) {
            var f;try {
              o("function" == typeof e[c], "%s: %s type `%s` is invalid; it must be a function, usually from React.PropTypes.", l || "React class", r, c), f = e[c](n, c, l, r, null, a);
            } catch (e) {
              f = e;
            }if (i(!f || f instanceof Error, "%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", l || "React class", r, c, typeof f), f instanceof Error && !(f.message in u)) {
              u[f.message] = !0;var d = s ? s() : "";i(!1, "Failed %s type: %s%s", r, f.message, null != d ? d : "");
            }
          }
        }
      }if ("production" !== t.env.NODE_ENV) var o = n(7),
          i = n(8),
          a = n(9),
          u = {};e.exports = r;
    }).call(t, n(4));
  }, function (e, t, n) {
    "use strict";
    var r = n(6),
        o = n(7),
        i = n(9);e.exports = function () {
      function e(e, t, n, r, a, u) {
        u !== i && o(!1, "Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");
      }function t() {
        return e;
      }e.isRequired = e;var n = { array: e, bool: e, func: e, number: e, object: e, string: e, symbol: e, any: e, arrayOf: t, element: e, instanceOf: t, node: e, objectOf: t, oneOf: t, oneOfType: t, shape: t };return n.checkPropTypes = r, n.PropTypes = n, n;
    };
  }, function (e, t, n) {
    "use strict";
    function r(e) {
      return e && e.__esModule ? e : { default: e };
    }Object.defineProperty(t, "__esModule", { value: !0 }), t._handleClick = t._handleMouseMove = t.restoreLogFromLocalstorage = t.restoreUpdatesFromLocalstorage = t.getGlobalState = t.setGlobalState = t.eventEmitter = void 0;var o = n(13),
        i = n(14),
        a = n(15),
        u = r(a),
        l = n(16),
        s = r(l),
        c = n(17),
        f = r(c),
        d = "mobx-react-devtool__updatesEnabled",
        p = "mobx-react-devtool__logEnabled",
        h = { updatesEnabled: !1, graphEnabled: !1, logEnabled: !1, hoverBoxes: [], renderingBoxes: [], logFilter: function logFilter() {
        return !0;
      } },
        g = t.eventEmitter = new u.default();g.setMaxListeners(1 / 0);var y = void 0,
        b = t.setGlobalState = function (e) {
      h.logEnabled !== e.logEnabled && (e.logEnabled === !0 ? (y && y(), y = (0, o.spy)(function (e) {
        return (0, f.default)(e, h.logFilter);
      })) : e.logEnabled === !1 && y && y()), "undefined" != typeof window && window.localStorage && (e.updatesEnabled === !0 ? window.localStorage.setItem(d, "YES") : e.updatesEnabled === !1 && window.localStorage.removeItem(d), e.logEnabled === !0 ? window.localStorage.setItem(p, "YES") : e.logEnabled === !1 && window.localStorage.removeItem(p)), e.graphEnabled === !1 && (e.hoverBoxes = []), h = _extends({}, h, e), g.emit("update");
    },
        v = (t.getGlobalState = function () {
      return h;
    }, t.restoreUpdatesFromLocalstorage = function () {
      if ("undefined" != typeof window && window.localStorage) {
        var e = "YES" === window.localStorage.getItem(d);b({ updatesEnabled: e });
      }
    }, t.restoreLogFromLocalstorage = function () {
      if ("undefined" != typeof window && window.localStorage) {
        var e = "YES" === window.localStorage.getItem(p);b({ logEnabled: e });
      }
    }, function (e) {
      for (var t = e, n = void 0; t;) {
        if (n = i.componentByNodeRegistery.get(t)) return { component: n, node: t };t = t.parentNode;
      }return { component: void 0, node: void 0 };
    });t._handleMouseMove = function (e) {
      if (h.graphEnabled) {
        var t = e.target,
            n = v(t).node;if (n) {
          var r = n.getBoundingClientRect();b({ hoverBoxes: [{ id: "the hovered node", type: "hover", x: r.left, y: r.top, width: r.width, height: r.height, lifeTime: 1 / 0 }] });
        }
      }
    }, t._handleClick = function (e) {
      if (h.graphEnabled) {
        var t = e.target,
            n = v(t).component;if (n) {
          e.stopPropagation(), e.preventDefault();var r = o.extras.getDependencyTree(n.render.$mobx);(0, s.default)(r), b({ dependencyTree: r, hoverBoxes: [], graphEnabled: !1 });
        }
      }
    };
  }, function (e, n) {
    e.exports = t;
  }, function (e, t) {
    e.exports = n;
  }, function (e, t) {
    function n() {
      this._events = this._events || {}, this._maxListeners = this._maxListeners || void 0;
    }function r(e) {
      return "function" == typeof e;
    }function o(e) {
      return "number" == typeof e;
    }function i(e) {
      return "object" == typeof e && null !== e;
    }function a(e) {
      return void 0 === e;
    }e.exports = n, n.EventEmitter = n, n.prototype._events = void 0, n.prototype._maxListeners = void 0, n.defaultMaxListeners = 10, n.prototype.setMaxListeners = function (e) {
      if (!o(e) || e < 0 || isNaN(e)) throw TypeError("n must be a positive number");return this._maxListeners = e, this;
    }, n.prototype.emit = function (e) {
      var t, n, o, u, l, s;if (this._events || (this._events = {}), "error" === e && (!this._events.error || i(this._events.error) && !this._events.error.length)) {
        if (t = arguments[1], t instanceof Error) throw t;var c = new Error('Uncaught, unspecified "error" event. (' + t + ")");throw c.context = t, c;
      }if (n = this._events[e], a(n)) return !1;if (r(n)) switch (arguments.length) {case 1:
          n.call(this);break;case 2:
          n.call(this, arguments[1]);break;case 3:
          n.call(this, arguments[1], arguments[2]);break;default:
          u = Array.prototype.slice.call(arguments, 1), n.apply(this, u);} else if (i(n)) for (u = Array.prototype.slice.call(arguments, 1), s = n.slice(), o = s.length, l = 0; l < o; l++) {
        s[l].apply(this, u);
      }return !0;
    }, n.prototype.addListener = function (e, t) {
      var o;if (!r(t)) throw TypeError("listener must be a function");return this._events || (this._events = {}), this._events.newListener && this.emit("newListener", e, r(t.listener) ? t.listener : t), this._events[e] ? i(this._events[e]) ? this._events[e].push(t) : this._events[e] = [this._events[e], t] : this._events[e] = t, i(this._events[e]) && !this._events[e].warned && (o = a(this._maxListeners) ? n.defaultMaxListeners : this._maxListeners, o && o > 0 && this._events[e].length > o && (this._events[e].warned = !0, console.error("(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.", this._events[e].length), "function" == typeof console.trace && console.trace())), this;
    }, n.prototype.on = n.prototype.addListener, n.prototype.once = function (e, t) {
      function n() {
        this.removeListener(e, n), o || (o = !0, t.apply(this, arguments));
      }if (!r(t)) throw TypeError("listener must be a function");var o = !1;return n.listener = t, this.on(e, n), this;
    }, n.prototype.removeListener = function (e, t) {
      var n, o, a, u;if (!r(t)) throw TypeError("listener must be a function");if (!this._events || !this._events[e]) return this;if (n = this._events[e], a = n.length, o = -1, n === t || r(n.listener) && n.listener === t) delete this._events[e], this._events.removeListener && this.emit("removeListener", e, t);else if (i(n)) {
        for (u = a; u-- > 0;) {
          if (n[u] === t || n[u].listener && n[u].listener === t) {
            o = u;break;
          }
        }if (o < 0) return this;1 === n.length ? (n.length = 0, delete this._events[e]) : n.splice(o, 1), this._events.removeListener && this.emit("removeListener", e, t);
      }return this;
    }, n.prototype.removeAllListeners = function (e) {
      var t, n;if (!this._events) return this;if (!this._events.removeListener) return 0 === arguments.length ? this._events = {} : this._events[e] && delete this._events[e], this;if (0 === arguments.length) {
        for (t in this._events) {
          "removeListener" !== t && this.removeAllListeners(t);
        }return this.removeAllListeners("removeListener"), this._events = {}, this;
      }if (n = this._events[e], r(n)) this.removeListener(e, n);else if (n) for (; n.length;) {
        this.removeListener(e, n[n.length - 1]);
      }return delete this._events[e], this;
    }, n.prototype.listeners = function (e) {
      var t;return t = this._events && this._events[e] ? r(this._events[e]) ? [this._events[e]] : this._events[e].slice() : [];
    }, n.prototype.listenerCount = function (e) {
      if (this._events) {
        var t = this._events[e];if (r(t)) return 1;if (t) return t.length;
      }return 0;
    }, n.listenerCount = function (e, t) {
      return e.listenerCount(t);
    };
  }, function (e, t) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });var n = function e(t) {
      if (t.dependencies) {
        for (var n = t.dependencies.length - 1; n >= 0; n--) {
          for (var r = t.dependencies[n].name, o = n - 1; o >= 0; o--) {
            if (t.dependencies[o].name === r) {
              t.dependencies[o].dependencies = [].concat(t.dependencies[o].dependencies || [], t.dependencies[n].dependencies || []), t.dependencies.splice(n, 1);break;
            }
          }
        }t.dependencies.forEach(e);
      }
    };t.default = n;
  }, function (e, t, n) {
    "use strict";
    function r(e, t) {
      b === !1 && "undefined" != typeof navigator && navigator.userAgent.indexOf("Chrome") === -1 && (console.warn("The output of the MobX logger is optimized for Chrome"), b = !0);var n = e.spyReportStart === !0,
          r = e.spyReportEnd === !0,
          h = void 0;if (0 === v ? (h = t(e), n && !h && (m = !0)) : r && m && 1 === v ? (h = !1, m = !1) : h = m !== !0, h && r) i(e.time);else if (h) {
        var g = n ? o : a;switch (e.type) {case "action":
            g("%caction '%s' %s", "color:dodgerblue", e.name, c("(", p(e.target))), a(e.arguments), l();break;case "transaction":
            g("%ctransaction '%s' %s", "color:gray", e.name, c("(", p(e.target)));break;case "scheduled-reaction":
            g("%cscheduled async reaction '%s'", "color:#10a210", f(e.object));break;case "reaction":
            g("%creaction '%s'", "color:#10a210", f(e.object)), l();break;case "compute":
            o("%ccomputed '%s' %s", "color:#10a210", f(e.object), c("(", p(e.target))), i();break;case "error":
            g("%cerror: %s", "color:tomato", e.message), l(), s();break;case "update":
            (0, y.isObservableArray)(e.object) ? g("updated '%s[%s]': %s (was: %s)", f(e.object), e.index, d(e.newValue), d(e.oldValue)) : (0, y.isObservableObject)(e.object) ? g("updated '%s.%s': %s (was: %s)", f(e.object), e.name, d(e.newValue), d(e.oldValue)) : g("updated '%s': %s (was: %s)", f(e.object), d(e.newValue), d(e.oldValue)), u({ newValue: e.newValue, oldValue: e.oldValue }), l();break;case "splice":
            g("spliced '%s': index %d, added %d, removed %d", f(e.object), e.index, e.addedCount, e.removedCount), u({ added: e.added, removed: e.removed }), l();break;case "add":
            g("set '%s.%s': %s", f(e.object), e.name, d(e.newValue)), u({ newValue: e.newValue }), l();break;case "delete":
            g("removed '%s.%s' (was %s)", f(e.object), e.name, d(e.oldValue)), u({ oldValue: e.oldValue }), l();break;case "create":
            g("set '%s': %s", f(e.object), d(e.newValue)), u({ newValue: e.newValue }), l();break;default:
            g(e.type), u(e);}
      }n && v++, r && v--;
    }function o() {
      console[I ? "groupCollapsed" : "log"].apply(console, arguments), w++;
    }function i(e) {
      w--, "number" == typeof e && a("%ctotal time: %sms", "color:gray", e), I && console.groupEnd();
    }function a() {
      console.log.apply(console, arguments);
    }function u() {
      console.dir.apply(console, arguments);
    }function l() {
      console.trace("stack");
    }function s() {
      for (var e = 0, t = w; e < t; e++) {
        i();
      }
    }function c(e, t) {
      return t ? (e || "") + t + (x[e] || "") : "";
    }function f(e) {
      return e ? y.extras.getDebugName(e) : String(e);
    }function d(e) {
      return h(e) ? "string" == typeof e && e.length > 100 ? e.substr(0, 97) + "..." : e : c("(", p(e));
    }function p(e) {
      if (null === e || void 0 === e) return "";if (e && "object" === ("undefined" == typeof e ? "undefined" : g(e))) {
        if (e && e.$mobx) return e.$mobx.name;if (e.constructor) return e.constructor.name || "object";
      }return "" + ("undefined" == typeof e ? "undefined" : g(e));
    }function h(e) {
      return null === e || void 0 === e || "string" == typeof e || "number" == typeof e || "boolean" == typeof e;
    }Object.defineProperty(t, "__esModule", { value: !0 });var g = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
      return typeof e;
    } : function (e) {
      return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
    };t.default = r;var y = n(13),
        b = !1,
        v = 0,
        m = !1,
        I = "function" == typeof console.groupCollapsed,
        w = 0,
        x = { '"': '"', "'": "'", "(": ")", "[": "]", "<": "]", "#": "" };
  }, function (e, t, n) {
    "use strict";
    function r(e) {
      if (e && e.__esModule) return e;var t = {};if (null != e) for (var n in e) {
        Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
      }return t.default = e, t;
    }function o(e) {
      return e && e.__esModule ? e : { default: e };
    }function i(e, t) {
      if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
    }function a(e, t) {
      if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return !t || "object" != typeof t && "function" != typeof t ? e : t;
    }function u(e, t) {
      if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t);
    }Object.defineProperty(t, "__esModule", { value: !0 });var l = function () {
      function e(e, t) {
        for (var n = 0; n < t.length; n++) {
          var r = t[n];r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
        }
      }return function (t, n, r) {
        return n && e(t.prototype, n), r && e(t, r), t;
      };
    }(),
        s = n(2),
        c = o(s),
        f = n(3),
        d = o(f),
        p = n(12),
        h = n(19),
        g = o(h),
        y = n(20),
        b = o(y),
        v = n(21),
        m = o(v),
        I = n(23),
        w = o(I),
        x = n(24),
        _ = r(x),
        E = function (e) {
      function t() {
        var e, n, r, o;i(this, t);for (var u = arguments.length, l = Array(u), s = 0; s < u; s++) {
          l[s] = arguments[s];
        }return n = r = a(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [this].concat(l))), r.handleUpdate = function () {
          return r.setState({});
        }, o = n, a(r, o);
      }return u(t, e), l(t, [{ key: "componentDidMount", value: function value() {
          p.eventEmitter.on("update", this.handleUpdate);
        } }, { key: "componentWillUnmount", value: function value() {
          p.eventEmitter.removeListener("update", this.handleUpdate);
        } }, { key: "render", value: function value() {
          var e = this.props,
              t = e.position,
              n = e.highlightTimeout,
              r = {};return t ? (r.top = t.top, r.right = t.right, r.bottom = t.bottom, r.left = t.left) : (r.top = "0px", r.right = "20px"), c.default.createElement("div", null, c.default.createElement("div", { style: _extends({}, _.panel, r) }, c.default.createElement(m.default, { highlightTimeout: n }, c.default.createElement(w.default, { id: "buttonUpdates" })), c.default.createElement(g.default, null, c.default.createElement(w.default, { id: "buttonGraph" })), c.default.createElement(b.default, null, c.default.createElement(w.default, { id: "buttonLog" }))));
        } }]), t;
    }(s.Component);E.propTypes = { highlightTimeout: d.default.number }, t.default = E;
  }, function (e, t, n) {
    "use strict";
    function r(e) {
      return e && e.__esModule ? e : { default: e };
    }function o(e, t) {
      if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
    }function i(e, t) {
      if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return !t || "object" != typeof t && "function" != typeof t ? e : t;
    }function a(e, t) {
      if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t);
    }Object.defineProperty(t, "__esModule", { value: !0 });var u = function () {
      function e(e, t) {
        for (var n = 0; n < t.length; n++) {
          var r = t[n];r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
        }
      }return function (t, n, r) {
        return n && e(t.prototype, n), r && e(t, r), t;
      };
    }(),
        l = n(2),
        s = r(l),
        c = n(3),
        f = (r(c), n(14)),
        d = n(12),
        p = function (e) {
      function t() {
        var e, n, r, a;o(this, t);for (var u = arguments.length, l = Array(u), s = 0; s < u; s++) {
          l[s] = arguments[s];
        }return n = r = i(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [this].concat(l))), r.handleUpdate = function () {
          return r.setState({});
        }, r.handleToggleGraph = function () {
          var e = (0, d.getGlobalState)(),
              t = e.graphEnabled;(0, d.setGlobalState)({ hoverBoxes: [], graphEnabled: !t });
        }, a = n, i(r, a);
      }return a(t, e), u(t, [{ key: "componentWillMount", value: function value() {
          this.setState({});
        } }, { key: "componentDidMount", value: function value() {
          (0, f.trackComponents)(), d.eventEmitter.on("update", this.handleUpdate), "undefined" != typeof window && "undefined" != typeof document && (document.body.addEventListener("mousemove", d._handleMouseMove, !0), document.body.addEventListener("click", d._handleClick, !0));
        } }, { key: "componentWillUnmount", value: function value() {
          d.eventEmitter.removeListener("update", this.handleUpdate), "undefined" != typeof document && (document.body.removeEventListener("mousemove", d._handleMouseMove, !0), document.body.removeEventListener("click", d._handleMouseMove, !0));
        } }, { key: "render", value: function value() {
          var e = (0, d.getGlobalState)(),
              t = e.graphEnabled,
              n = this.props.children;return s.default.cloneElement(n, { onToggle: this.handleToggleGraph, active: t });
        } }]), t;
    }(l.Component);t.default = p;
  }, function (e, t, n) {
    "use strict";
    function r(e) {
      return e && e.__esModule ? e : { default: e };
    }function o(e, t) {
      if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
    }function i(e, t) {
      if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return !t || "object" != typeof t && "function" != typeof t ? e : t;
    }function a(e, t) {
      if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t);
    }Object.defineProperty(t, "__esModule", { value: !0 });var u = function () {
      function e(e, t) {
        for (var n = 0; n < t.length; n++) {
          var r = t[n];r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
        }
      }return function (t, n, r) {
        return n && e(t.prototype, n), r && e(t, r), t;
      };
    }(),
        l = n(2),
        s = r(l),
        c = n(3),
        f = (r(c), n(12)),
        d = function (e) {
      function t() {
        var e, n, r, a;o(this, t);for (var u = arguments.length, l = Array(u), s = 0; s < u; s++) {
          l[s] = arguments[s];
        }return n = r = i(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [this].concat(l))), r.handleUpdate = function () {
          r.setState({});
        }, r.handleToggleLog = function () {
          var e = (0, f.getGlobalState)(),
              t = e.logEnabled;(0, f.setGlobalState)({ logEnabled: !t });
        }, a = n, i(r, a);
      }return a(t, e), u(t, [{ key: "componentDidMount", value: function value() {
          f.eventEmitter.on("update", this.handleUpdate), (0, f.restoreLogFromLocalstorage)();
        } }, { key: "componentWillUnmount", value: function value() {
          f.eventEmitter.removeListener("update", this.handleUpdate);
        } }, { key: "render", value: function value() {
          var e = (0, f.getGlobalState)(),
              t = e.logEnabled,
              n = this.props.children;return s.default.cloneElement(n, { onToggle: this.handleToggleLog, active: t });
        } }]), t;
    }(l.Component);t.default = d;
  }, function (e, t, n) {
    "use strict";
    function r(e) {
      return e && e.__esModule ? e : { default: e };
    }function o(e, t) {
      if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
    }function i(e, t) {
      if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return !t || "object" != typeof t && "function" != typeof t ? e : t;
    }function a(e, t) {
      if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t);
    }Object.defineProperty(t, "__esModule", { value: !0 });var u = function () {
      function e(e, t) {
        for (var n = 0; n < t.length; n++) {
          var r = t[n];r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
        }
      }return function (t, n, r) {
        return n && e(t.prototype, n), r && e(t, r), t;
      };
    }(),
        l = n(2),
        s = r(l),
        c = n(3),
        f = r(c),
        d = n(22),
        p = r(d),
        h = n(12),
        g = function (e) {
      function t() {
        var e, n, r, a;o(this, t);for (var u = arguments.length, l = Array(u), s = 0; s < u; s++) {
          l[s] = arguments[s];
        }return n = r = i(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [this].concat(l))), r.handleUpdate = function () {
          return r.setState({});
        }, r.handleToggleUpdates = function () {
          var e = (0, h.getGlobalState)(),
              t = e.updatesEnabled;(0, h.setGlobalState)({ updatesEnabled: !t });
        }, a = n, i(r, a);
      }return a(t, e), u(t, [{ key: "componentDidMount", value: function value() {
          h.eventEmitter.on("update", this.handleUpdate);var e = this.props.highlightTimeout;this.renderingMonitor = new p.default({ highlightTimeout: e }), (0, h.restoreUpdatesFromLocalstorage)();
        } }, { key: "componentWillUnmount", value: function value() {
          h.eventEmitter.removeListener("update", this.handleUpdate), this.renderingMonitor.dispose();
        } }, { key: "render", value: function value() {
          var e = (0, h.getGlobalState)(),
              t = e.updatesEnabled,
              n = this.props.children;return s.default.cloneElement(n, { onToggle: this.handleToggleUpdates, active: t });
        } }]), t;
    }(l.Component);g.propTypes = { highlightTimeout: f.default.number }, g.defaultProps = { highlightTimeout: 1500 }, t.default = g;
  }, function (e, t, n) {
    "use strict";
    function r(e, t) {
      if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
    }Object.defineProperty(t, "__esModule", { value: !0 });var o = function () {
      function e(e, t) {
        for (var n = 0; n < t.length; n++) {
          var r = t[n];r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
        }
      }return function (t, n, r) {
        return n && e(t.prototype, n), r && e(t, r), t;
      };
    }(),
        i = n(14),
        a = n(12),
        u = function u(e) {
      switch (!0) {case e < 25:
          return "cheap";case e < 100:
          return "acceptable";default:
          return "expensive";}
    },
        l = function () {
      function e(t) {
        var n = this,
            o = t.highlightTimeout;r(this, e), this._boxesRegistry = "undefined" != typeof WeakMap ? new WeakMap() : new Map(), this._renderReporterDisposer = i.renderReporter.on(function (e) {
          if ((0, a.getGlobalState)().updatesEnabled === !0) switch (e.event) {case "render":
              if (!e.node || isNaN(e.renderTime)) return;var t = e.node.getBoundingClientRect(),
                  r = n.getBoxForNode(e.node);r.type = "rendering", r.y = t.top, r.x = t.left, r.width = t.width, r.height = t.height, r.renderInfo = { count: r.renderInfo && ++r.renderInfo.count || 1, renderTime: e.renderTime, totalTime: e.totalTime, cost: u(e.renderTime) }, r.lifeTime = o;var i = (0, a.getGlobalState)().renderingBoxes;return i.indexOf(r) === -1 && (i = i.concat([r])), (0, a.setGlobalState)({ renderingBoxes: i }), r._timeout && clearTimeout(r._timeout), void (r._timeout = setTimeout(function () {
                return n.removeBox(e.node, !0);
              }, o));case "destroy":
              return n.removeBox(e.node), void n._boxesRegistry.delete(e.node);default:
              return;}
        });
      }return o(e, [{ key: "getBoxForNode", value: function value(e) {
          if (this._boxesRegistry.has(e)) return this._boxesRegistry.get(e);var t = { id: Math.random().toString(32).substr(2) };return this._boxesRegistry.set(e, t), t;
        } }, { key: "dispose", value: function value() {
          this._renderReporterDisposer();
        } }, { key: "removeBox", value: function value(e) {
          if (this._boxesRegistry.has(e) !== !1) {
            var t = (0, a.getGlobalState)().renderingBoxes,
                n = t.indexOf(this._boxesRegistry.get(e));n !== -1 && (t = t.slice(0, n).concat(t.slice(n + 1)), (0, a.setGlobalState)({ renderingBoxes: t }));
          }
        } }]), e;
    }();t.default = l;
  }, function (e, t, n) {
    "use strict";
    function r(e) {
      if (e && e.__esModule) return e;var t = {};if (null != e) for (var n in e) {
        Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
      }return t.default = e, t;
    }function o(e) {
      return e && e.__esModule ? e : { default: e };
    }function i(e, t) {
      if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
    }function a(e, t) {
      if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return !t || "object" != typeof t && "function" != typeof t ? e : t;
    }function u(e, t) {
      if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t);
    }Object.defineProperty(t, "__esModule", { value: !0 });var l = function () {
      function e(e, t) {
        for (var n = 0; n < t.length; n++) {
          var r = t[n];r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
        }
      }return function (t, n, r) {
        return n && e(t.prototype, n), r && e(t, r), t;
      };
    }(),
        s = n(2),
        c = o(s),
        f = n(3),
        d = o(f),
        p = n(24),
        h = r(p),
        g = function (e) {
      function t() {
        var e, n, r, o;i(this, t);for (var u = arguments.length, l = Array(u), s = 0; s < u; s++) {
          l[s] = arguments[s];
        }return n = r = a(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [this].concat(l))), r.state = { hovered: !1 }, r.handleMouseOver = function () {
          return r.setState({ hovered: !0 });
        }, r.handleMouseOut = function () {
          return r.setState({ hovered: !1 });
        }, o = n, a(r, o);
      }return u(t, e), l(t, [{ key: "render", value: function value() {
          var e = this.props,
              t = e.active,
              n = e.id,
              r = e.onToggle,
              o = this.state.hovered,
              i = function () {
            switch (n) {case "buttonUpdates":
                return t ? h.buttonUpdatesActive : h.buttonUpdates;case "buttonGraph":
                return t ? h.buttonGraphActive : h.buttonGraph;case "buttonLog":
                return t ? h.buttonLogActive : h.buttonLog;}
          }(),
              a = function () {
            switch (n) {case "buttonUpdates":
                return "Visualize component re-renders";case "buttonGraph":
                return "Select a component and show its dependency tree";case "buttonLog":
                return "Log all MobX state changes and reactions to the browser console (use F12 to show / hide the console). Use Chrome / Chromium for an optimal experience";}
          }(),
              u = _extends({}, h.button, i, t && h.button.active, o && h.button.hover);return c.default.createElement("button", { type: "button", onClick: r, title: a, style: u, onMouseOver: this.handleMouseOver, onMouseOut: this.handleMouseOut });
        } }]), t;
    }(s.Component);g.props = { onToggle: d.default.bool.isRequired, active: d.default.bool.isRequired, name: d.default.oneOf(["buttonUpdates", "buttonGraph", "buttonLog"]).isRequired }, t.default = g;
  }, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });t.panel = { position: "fixed", height: "26px", backgroundColor: "#fff", color: "rgba(0, 0, 0, 0.8)", borderRadius: "0 0 2px 2px", borderStyle: "solid", borderWidth: "0 1px 1px", borderColor: "rgba(0, 0, 0, 0.1)", zIndex: "65000", fontFamily: "Helvetica, sans-serif", display: "flex", padding: "0 5px" }, t.button = { opacity: .45, background: "transparent none center / 16px 16px no-repeat", width: "26px", margin: "0 10px", cursor: "pointer", border: "none", hover: { opacity: .7 }, active: { opacity: 1, ":hover": { opacity: 1 } } }, t.buttonLog = { backgroundImage: "url(" + n(25) + ")" }, t.buttonLogActive = { backgroundImage: "url(" + n(26) + ")" }, t.buttonUpdates = { backgroundImage: "url(" + n(27) + ")" }, t.buttonUpdatesActive = { backgroundImage: "url(" + n(28) + ")" }, t.buttonGraph = { backgroundImage: "url(" + n(29) + ")" }, t.buttonGraphActive = { backgroundImage: "url(" + n(30) + ")" };
  }, function (e, t) {
    e.exports = "data:image/svg+xml;base64,PHN2ZyBiYXNlUHJvZmlsZT0iYmFzaWMiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmlld0JveD0iMCAwIDE2IDE2IiBoZWlnaHQ9IjE2IiB3aWR0aD0iMTYiPgogICAgPGcgc3Ryb2tlPSIjMDAwIiBmaWxsPSJub25lIiBzdHJva2Utd2lkdGg9IjEiPgogICAgICAgIDxwYXRoIGQ9Ik0xMi41IDMuNWgtOGMtMS4xIDAtMiAuOS0yIDJ2NWMwIDEuMS45IDIgMiAyaDF2Mmw1LTJoMmMxLjEgMCAyLS45IDItMnYtNWMwLTEuMS0uOS0yLTItMnoiLz4KICAgICAgICA8cGF0aCBkPSJNNSA2LjVoNyIvPgogICAgICAgIDxwYXRoIGQ9Ik01IDkuNWg3Ii8+CiAgICA8L2c+Cjwvc3ZnPgo=";
  }, function (e, t) {
    e.exports = "data:image/svg+xml;base64,PHN2ZyBiYXNlUHJvZmlsZT0iYmFzaWMiIGlkPSJMYXllcl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNiAxNiIgaGVpZ2h0PSIxNiIgd2lkdGg9IjE2Ij4KICAgIDxnIHN0cm9rZT0iIzE3ODBmYSIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxLjI1Ij4KICAgICAgICA8cGF0aCBkPSJNMTIuNSAzLjVoLThjLTEuMSAwLTIgLjktMiAydjVjMCAxLjEuOSAyIDIgMmgxdjJsNS0yaDJjMS4xIDAgMi0uOSAyLTJ2LTVjMC0xLjEtLjktMi0yLTJ6Ii8+CiAgICAgICAgPHBhdGggZD0iTTUgNi41aDciLz4KICAgICAgICA8cGF0aCBkPSJNNSA5LjVoNyIvPgogICAgPC9nPgo8L3N2Zz4K";
  }, function (e, t) {
    e.exports = "data:image/svg+xml;base64,PHN2ZyBiYXNlUHJvZmlsZT0iYmFzaWMiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmlld0JveD0iMCAwIDE2IDE2IiBoZWlnaHQ9IjE2IiB3aWR0aD0iMTYiPgogICAgPGcgc3Ryb2tlPSIjMDAwIiBmaWxsPSJub25lIiBzdHJva2Utd2lkdGg9IjEiPgogICAgICAgIDxjaXJjbGUgY3g9IjguNSIgY3k9IjguNSIgcj0iNiIvPgogICAgICAgIDxwYXRoIGQ9Ik04LjUgMTBWNCIvPgogICAgPC9nPgogICAgPGcgc3Ryb2tlPSJub25lIiBmaWxsPSIjMDAwIj4KICAgICAgICA8Y2lyY2xlIGN4PSI4LjUiIGN5PSI4LjUiIHI9IjEiLz4KICAgICAgICA8cGF0aCBkPSJNNy41IDFoMnYxLjVoLTJ6Ii8+CiAgICAgICAgPHBhdGggZD0iTTE0IDEuNmwtLjcuNy4zLjMtLjcuOC43LjcuOC0uNy4zLjMuNy0uN3oiLz4KICAgIDwvZz4KPC9zdmc+Cg==";
  }, function (e, t) {
    e.exports = "data:image/svg+xml;base64,PHN2ZyBiYXNlUHJvZmlsZT0iYmFzaWMiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmlld0JveD0iMCAwIDE2IDE2IiBoZWlnaHQ9IjE2IiB3aWR0aD0iMTYiPgogICAgPGcgc3Ryb2tlPSIjMTc4MGZhIiBmaWxsPSJub25lIiBzdHJva2Utd2lkdGg9IjEuMjUiPgogICAgICAgIDxjaXJjbGUgY3g9IjguNSIgY3k9IjguNSIgcj0iNiIvPgogICAgICAgIDxwYXRoIGQ9Ik04LjUgMTBWNCIvPgogICAgPC9nPgogICAgPGcgc3Ryb2tlPSJub25lIiBmaWxsPSIjMTc4MGZhIj4KICAgICAgICA8Y2lyY2xlIGN4PSI4LjUiIGN5PSI4LjUiIHI9IjEiLz4KICAgICAgICA8cGF0aCBkPSJNNy41IDFoMnYxLjVoLTJ6Ii8+CiAgICAgICAgPHBhdGggZD0iTTE0IDEuNmwtLjcuNy4zLjMtLjcuOC43LjcuOC0uNy4zLjMuNy0uN3oiLz4KICAgIDwvZz4KPC9zdmc+Cg==";
  }, function (e, t) {
    e.exports = "data:image/svg+xml;base64,PHN2ZyBiYXNlUHJvZmlsZT0iYmFzaWMiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmlld0JveD0iMCAwIDE2IDE2IiBoZWlnaHQ9IjE2IiB3aWR0aD0iMTYiPgogICAgPGcgc3Ryb2tlPSIjMDAwIiBmaWxsPSJub25lIiBzdHJva2Utd2lkdGg9IjEiPgogICAgICAgIDxwYXRoIGQ9Ik0yLjUgMi41aDl2MmgtOXoiLz4KICAgICAgICA8cGF0aCBkPSJNNy41IDcuNWg3djJoLTd6Ii8+CiAgICAgICAgPHBhdGggZD0iTTcuNSAxMi41aDd2MmgtN3oiLz4KICAgICAgICA8cGF0aCBkPSJNNC41IDQuNXY5aDMiLz4KICAgICAgICA8cGF0aCBkPSJNNy41IDguNWgtMyIvPgogICAgPC9nPgo8L3N2Zz4K";
  }, function (e, t) {
    e.exports = "data:image/svg+xml;base64,PHN2ZyBiYXNlUHJvZmlsZT0iYmFzaWMiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmlld0JveD0iMCAwIDE2IDE2IiBoZWlnaHQ9IjE2IiB3aWR0aD0iMTYiPgogICAgPGcgc3Ryb2tlPSIjMTc4MGZhIiBmaWxsPSJub25lIiBzdHJva2Utd2lkdGg9IjEuMjUiPgogICAgICAgIDxwYXRoIGQ9Ik0yLjUgMi41aDl2MmgtOXoiLz4KICAgICAgICA8cGF0aCBkPSJNNy41IDcuNWg3djJoLTd6Ii8+CiAgICAgICAgPHBhdGggZD0iTTcuNSAxMi41aDd2MmgtN3oiLz4KICAgICAgICA8cGF0aCBkPSJNNC41IDQuNXY5aDMiLz4KICAgICAgICA8cGF0aCBkPSJNNy41IDguNWgtMyIvPgogICAgPC9nPgo8L3N2Zz4K";
  }, function (e, t, n) {
    "use strict";
    function r(e) {
      if (e && e.__esModule) return e;var t = {};if (null != e) for (var n in e) {
        Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
      }return t.default = e, t;
    }function o(e) {
      return e && e.__esModule ? e : { default: e };
    }function i(e, t) {
      if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
    }function a(e, t) {
      if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return !t || "object" != typeof t && "function" != typeof t ? e : t;
    }function u(e, t) {
      if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t);
    }Object.defineProperty(t, "__esModule", { value: !0 });var l = function () {
      function e(e, t) {
        for (var n = 0; n < t.length; n++) {
          var r = t[n];r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
        }
      }return function (t, n, r) {
        return n && e(t.prototype, n), r && e(t, r), t;
      };
    }(),
        s = n(2),
        c = o(s),
        f = n(3),
        d = o(f),
        p = n(32),
        h = r(p),
        g = function (e) {
      function t() {
        return i(this, t), a(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments));
      }return u(t, e), l(t, [{ key: "componentWillAppear", value: function value(e) {
          this.props.willAppear(e);
        } }, { key: "componentWillLeave", value: function value() {
          this.props.willLeave();
        } }, { key: "render", value: function value() {
          return this.props.children;
        } }]), t;
    }(s.Component);g.propTypes = { willAppear: d.default.function, willLeave: d.default.function }, g.defaultProps = { willAppear: function willAppear() {}, willLeave: function willLeave() {} };var y = function (e) {
      function t() {
        return i(this, t), a(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments));
      }return u(t, e), l(t, [{ key: "renderBox", value: function value(e) {
          switch (e.type) {case "rendering":
              var t = h.rendering[e.renderInfo.cost] || {};return c.default.createElement("div", { key: e.id, ref: function ref(t) {
                  return setTimeout(function () {
                    t && (t.style.opacity = 0);
                  }, e.lifeTime - 500);
                }, style: _extends({}, h.box, h.rendering, t, { left: e.x, top: e.y, width: e.width, height: e.height }) }, c.default.createElement("span", { style: _extends({}, h.text, t.text) }, e.renderInfo.count, "x | ", e.renderInfo.renderTime, " / ", e.renderInfo.totalTime, " ms"));case "hover":
              return c.default.createElement("div", { key: e.id, style: _extends({}, h.box, h.hover, { left: e.x, top: e.y, width: e.width, height: e.height }) });default:
              throw new Error();}
        } }, { key: "render", value: function value() {
          var e = this,
              t = this.props.boxes;return c.default.createElement("div", null, t.map(function (t) {
            return e.renderBox(t);
          }));
        } }]), t;
    }(s.Component);y.propTypes = { boxes: d.default.arrayOf(d.default.shape({ type: d.default.oneOf(["rendering", "hover"]).isRequired, x: d.default.number.isRequired, y: d.default.number.isRequired, width: d.default.number.isRequired, height: d.default.number.isRequired, renderInfo: d.default.shape({ count: d.default.number.isRequired, renderTime: d.default.number.isRequired, totalTime: d.default.number.isRequired, cost: d.default.oneOf(["cheap", "acceptable", "expensive"]).isRequired }), lifeTime: d.default.number.isRequired })).isRequired }, t.default = y;
  }, function (e, t) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });t.box = { display: "block", position: "fixed", zIndex: "64998", minWidth: "60px", outline: "3px solid", pointerEvents: "none", transition: "opacity 500ms ease-in" }, t.text = { fontFamily: "verdana, sans-serif", padding: "0 4px 2px", color: "rgba(0, 0, 0, 0.6)", fontSize: "10px", lineHeight: "12px", pointerEvents: "none", float: "right", borderBottomRightRadius: "2px", maxWidth: "100%", maxHeight: "100%", overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }, t.rendering = { cheap: { outlineColor: "rgba(182, 218, 146, 0.75)", text: { backgroundColor: "rgba(182, 218, 146, 0.75)" } }, acceptable: { outlineColor: "rgba(228, 195, 66, 0.85)", text: { backgroundColor: "rgba(228, 195, 66, 0.85)" } }, expensive: { outlineColor: "rgba(228, 171, 171, 0.95)", text: { backgroundColor: "rgba(228, 171, 171, 0.95)" } } }, t.hover = { outlineColor: "rgba(128, 128, 255, 0.5)" };
  }, function (e, t, n) {
    "use strict";
    function r(e) {
      if (e && e.__esModule) return e;var t = {};if (null != e) for (var n in e) {
        Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
      }return t.default = e, t;
    }function o(e) {
      return e && e.__esModule ? e : { default: e };
    }function i(e, t) {
      if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
    }function a(e, t) {
      if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return !t || "object" != typeof t && "function" != typeof t ? e : t;
    }function u(e, t) {
      if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t);
    }Object.defineProperty(t, "__esModule", { value: !0 });var l = function () {
      function e(e, t) {
        for (var n = 0; n < t.length; n++) {
          var r = t[n];r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
        }
      }return function (t, n, r) {
        return n && e(t.prototype, n), r && e(t, r), t;
      };
    }(),
        s = n(2),
        c = o(s),
        f = n(3),
        d = (o(f), n(34)),
        p = o(d),
        h = n(12),
        g = n(36),
        y = r(g),
        b = function (e) {
      function t() {
        var e, n, r, o;i(this, t);for (var u = arguments.length, l = Array(u), s = 0; s < u; s++) {
          l[s] = arguments[s];
        }return n = r = a(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [this].concat(l))), r.handleUpdate = function () {
          return r.setState({});
        }, r.handleClose = function () {
          return (0, h.setGlobalState)({ dependencyTree: void 0 });
        }, o = n, a(r, o);
      }return u(t, e), l(t, [{ key: "componentDidMount", value: function value() {
          h.eventEmitter.on("update", this.handleUpdate);
        } }, { key: "componentWillUnmount", value: function value() {
          h.eventEmitter.removeListener("update", this.handleUpdate);
        } }, { key: "renderTreeItem", value: function value(e, t, n) {
          var r = e.name,
              o = e.dependencies,
              i = this;return c.default.createElement("div", { style: y.item, key: r }, c.default.createElement("span", { style: _extends({}, y.box, n && y.box.root) }, r), o && c.default.createElement("div", { style: y.tree }, o.map(function (e, t) {
            return i.renderTreeItem(e, t == o.length - 1);
          })), !n && c.default.createElement("span", { style: y.itemHorisontalDash }), !n && c.default.createElement("span", { style: _extends({}, y.itemVericalStick, t && y.itemVericalStick.short) }));
        } }, { key: "render", value: function value() {
          var e = (0, h.getGlobalState)(),
              t = e.dependencyTree;return c.default.createElement(p.default, { onOverlayClick: this.handleClose }, t && c.default.createElement("div", { style: y.graph }, c.default.createElement("span", { style: y.close, onClick: this.handleClose }, "×"), c.default.createElement("div", { style: y.tree }, this.renderTreeItem(t, !0, !0))));
        } }]), t;
    }(s.Component);t.default = b;
  }, function (e, t, n) {
    "use strict";
    function r(e) {
      if (e && e.__esModule) return e;var t = {};if (null != e) for (var n in e) {
        Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
      }return t.default = e, t;
    }function o(e) {
      return e && e.__esModule ? e : { default: e };
    }function i(e, t) {
      if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
    }function a(e, t) {
      if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return !t || "object" != typeof t && "function" != typeof t ? e : t;
    }function u(e, t) {
      if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t);
    }Object.defineProperty(t, "__esModule", { value: !0 });var l = function () {
      function e(e, t) {
        for (var n = 0; n < t.length; n++) {
          var r = t[n];r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
        }
      }return function (t, n, r) {
        return n && e(t.prototype, n), r && e(t, r), t;
      };
    }(),
        s = n(2),
        c = o(s),
        f = n(3),
        d = o(f),
        p = n(35),
        h = r(p),
        g = function (e) {
      function t() {
        var e, n, r, o;i(this, t);for (var u = arguments.length, l = Array(u), s = 0; s < u; s++) {
          l[s] = arguments[s];
        }return n = r = a(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [this].concat(l))), r.stopPropogation = function (e) {
          return e.stopPropagation();
        }, o = n, a(r, o);
      }return u(t, e), l(t, [{ key: "componentDidUpdate", value: function value(e) {
          var t = document.body.parentNode;if (e.children && !this.props.children) this.rightOffset = 0, t.style.borderRight = null, t.style.overflow = null;else if (!e.children && this.props.children) {
            var n = t.offsetWidth;t.style.overflow = "hidden";var r = t.offsetWidth,
                o = Math.max(0, r - n);t.style.borderRight = o + "px solid transparent";
          }
        } }, { key: "render", value: function value() {
          var e = this.props,
              t = e.children,
              n = e.onOverlayClick;return t ? c.default.createElement("div", { style: h.overlay, onClick: n }, c.default.createElement("div", { key: "content", style: h.modal, onClick: this.stopPropogation }, t)) : null;
        } }]), t;
    }(s.Component);g.propTypes = { children: d.default.node, onOverlayClick: d.default.func.isRequired }, t.default = g;
  }, function (e, t) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });t.overlay = { position: "fixed", top: 0, right: 0, bottom: 0, left: 0, zIndex: 66e3, overflow: "auto", WebkitOverflowScrolling: "touch", outline: 0, backgroundColor: "rgba(40, 40, 50, 0.5)", transformOrigin: "50% 25%" }, t.modal = { position: "relative", width: "auto", margin: "5% 10%", zIndex: 1060 };
  }, function (e, t) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });t.graph = { background: "white", padding: "40px" }, t.close = { color: "rgba(0, 0, 0, 0.2)", fontSize: "36px", position: "absolute", top: "5px", right: "5px", width: "40px", height: "40px", lineHeight: "34px", textAlign: "center", cursor: "pointer", ":hover": { color: "rgba(0, 0, 0, 0.5)" } }, t.tree = { position: "relative", paddingLeft: "25px" }, t.item = { position: "relative" }, t.box = { padding: "4px 10px", background: "rgba(0, 0, 0, 0.05)", display: "inline-block", marginBottom: "8px", color: "#000", root: { fontSize: "15px", fontWeight: "bold", padding: "6px 13px" } }, t.itemHorisontalDash = { position: "absolute", left: "-12px", borderTop: "1px solid rgba(0, 0, 0, 0.2)", top: "14px", width: "12px", height: "0" }, t.itemVericalStick = { position: "absolute", left: "-12px", borderLeft: "1px solid rgba(0, 0, 0, 0.2)", height: "100%", width: 0, top: "-8px", short: { height: "23px" } };
  }, function (e, t) {
    "use strict";
    function n(e, t) {
      if (void 0 === e || null === e) throw new TypeError("Cannot convert first argument to object");for (var n = Object(e), r = 1; r < arguments.length; r++) {
        var o = arguments[r];if (void 0 !== o && null !== o) for (var i = Object.keys(Object(o)), a = 0, u = i.length; a < u; a++) {
          var l = i[a],
              s = Object.getOwnPropertyDescriptor(o, l);void 0 !== s && s.enumerable && (n[l] = o[l]);
        }
      }return n;
    }function r() {
      Object.assign || Object.defineProperty(Object, "assign", { enumerable: !1, configurable: !0, writable: !0, value: n });
    }e.exports = { assign: n, polyfill: r };
  }]);
});

/***/ }),

/***/ "5qQg":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"DropDown":"DropDown__kaDqD","DropDown_title":"DropDown_title__SNash","DropDown_input":"DropDown_input__1P29g","DropDown_highlight":"DropDown_highlight__3s9Lo","DropDown_highlightItem":"DropDown_highlightItem__2mV-j"};

/***/ }),

/***/ "6ATj":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = UserCard;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact__ = __webpack_require__("KM04");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_preact__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__style__ = __webpack_require__("ZzoW");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__style___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__style__);




function UserCard(props) {
  var userSex = props.gender === "female" ? "genderBgFemale" : "genderBgMale";
  var sexColor = props.gender === "female" ? "#E91E63" : "#673AB7";
  var sexAvatar = props.gender === "female" ? genderStyle.female : genderStyle.male;
  return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
    'div',
    { href: '#', className: [__WEBPACK_IMPORTED_MODULE_1__style___default.a.UserCard, userSex].join(' ') },
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
      'div',
      { className: __WEBPACK_IMPORTED_MODULE_1__style___default.a.UserCard_img, style: sexAvatar },
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])('img', { src: props.image, alt: '' })
    ),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
      'div',
      { className: __WEBPACK_IMPORTED_MODULE_1__style___default.a.UserCard_desc },
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
        'h6',
        { className: __WEBPACK_IMPORTED_MODULE_1__style___default.a.UserCard_name },
        props.fullName
      ),
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
        'span',
        { className: __WEBPACK_IMPORTED_MODULE_1__style___default.a.UserCard_nik },
        props.nik
      )
    )
  );
}

var genderStyle = {
  male: {
    backgroundColor: "#2196F3",
    backgroundImage: "url('assets/icons/male.svg')"
  },
  female: {
    backgroundColor: "#E91E63",
    backgroundImage: "url('assets/icons/female.svg')"
  }
};

/***/ }),

/***/ "6uYi":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "extras", function() { return extras; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Reaction", function() { return Reaction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "untracked", function() { return untracked; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IDerivationState", function() { return IDerivationState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Atom", function() { return Atom; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BaseAtom", function() { return BaseAtom; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useStrict", function() { return useStrict; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isStrictModeEnabled", function() { return isStrictModeEnabled; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spy", function() { return spy; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "comparer", function() { return comparer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "asReference", function() { return asReference; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "asFlat", function() { return asFlat; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "asStructure", function() { return asStructure; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "asMap", function() { return asMap; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isModifierDescriptor", function() { return isModifierDescriptor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isObservableObject", function() { return isObservableObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isBoxedObservable", function() { return isObservableValue; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isObservableArray", function() { return isObservableArray; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ObservableMap", function() { return ObservableMap; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isObservableMap", function() { return isObservableMap; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "map", function() { return map; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "transaction", function() { return transaction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "observable", function() { return observable; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IObservableFactories", function() { return IObservableFactories; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "computed", function() { return computed; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isObservable", function() { return isObservable; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isComputed", function() { return isComputed; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "extendObservable", function() { return extendObservable; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "extendShallowObservable", function() { return extendShallowObservable; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "observe", function() { return observe; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "intercept", function() { return intercept; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "autorun", function() { return autorun; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "autorunAsync", function() { return autorunAsync; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "when", function() { return when; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "reaction", function() { return reaction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "action", function() { return action; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isAction", function() { return isAction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "runInAction", function() { return runInAction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "expr", function() { return expr; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toJS", function() { return toJS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createTransformer", function() { return createTransformer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "whyRun", function() { return whyRun; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isArrayLike", function() { return isArrayLike; });
/** MobX - (c) Michel Weststrate 2015, 2016 - MIT Licensed */
/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
    d.__proto__ = b;
} || function (d, b) {
    for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
    }
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() {
        this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

/**
 * Anything that can be used to _store_ state is an Atom in mobx. Atoms have two important jobs
 *
 * 1) detect when they are being _used_ and report this (using reportObserved). This allows mobx to make the connection between running functions and the data they used
 * 2) they should notify mobx whenever they have _changed_. This way mobx can re-run any functions (derivations) that are using this atom.
 */
var BaseAtom = function () {
    /**
     * Create a new atom. For debugging purposes it is recommended to give it a name.
     * The onBecomeObserved and onBecomeUnobserved callbacks can be used for resource management.
     */
    function BaseAtom(name) {
        if (name === void 0) {
            name = "Atom@" + getNextId();
        }
        this.name = name;
        this.isPendingUnobservation = true; // for effective unobserving. BaseAtom has true, for extra optimization, so its onBecomeUnobserved never gets called, because it's not needed
        this.observers = [];
        this.observersIndexes = {};
        this.diffValue = 0;
        this.lastAccessedBy = 0;
        this.lowestObserverState = IDerivationState.NOT_TRACKING;
    }
    BaseAtom.prototype.onBecomeUnobserved = function () {
        // noop
    };
    /**
     * Invoke this method to notify mobx that your atom has been used somehow.
     */
    BaseAtom.prototype.reportObserved = function () {
        reportObserved(this);
    };
    /**
     * Invoke this method _after_ this method has changed to signal mobx that all its observers should invalidate.
     */
    BaseAtom.prototype.reportChanged = function () {
        startBatch();
        propagateChanged(this);
        endBatch();
    };
    BaseAtom.prototype.toString = function () {
        return this.name;
    };
    return BaseAtom;
}();
var Atom = function (_super) {
    __extends(Atom, _super);
    /**
     * Create a new atom. For debugging purposes it is recommended to give it a name.
     * The onBecomeObserved and onBecomeUnobserved callbacks can be used for resource management.
     */
    function Atom(name, onBecomeObservedHandler, onBecomeUnobservedHandler) {
        if (name === void 0) {
            name = "Atom@" + getNextId();
        }
        if (onBecomeObservedHandler === void 0) {
            onBecomeObservedHandler = noop;
        }
        if (onBecomeUnobservedHandler === void 0) {
            onBecomeUnobservedHandler = noop;
        }
        var _this = _super.call(this, name) || this;
        _this.name = name;
        _this.onBecomeObservedHandler = onBecomeObservedHandler;
        _this.onBecomeUnobservedHandler = onBecomeUnobservedHandler;
        _this.isPendingUnobservation = false; // for effective unobserving.
        _this.isBeingTracked = false;
        return _this;
    }
    Atom.prototype.reportObserved = function () {
        startBatch();
        _super.prototype.reportObserved.call(this);
        if (!this.isBeingTracked) {
            this.isBeingTracked = true;
            this.onBecomeObservedHandler();
        }
        endBatch();
        return !!globalState.trackingDerivation;
        // return doesn't really give useful info, because it can be as well calling computed which calls atom (no reactions)
        // also it could not trigger when calculating reaction dependent on Atom because Atom's value was cached by computed called by given reaction.
    };
    Atom.prototype.onBecomeUnobserved = function () {
        this.isBeingTracked = false;
        this.onBecomeUnobservedHandler();
    };
    return Atom;
}(BaseAtom);
var isAtom = createInstanceofPredicate("Atom", BaseAtom);

function hasInterceptors(interceptable) {
    return interceptable.interceptors && interceptable.interceptors.length > 0;
}
function registerInterceptor(interceptable, handler) {
    var interceptors = interceptable.interceptors || (interceptable.interceptors = []);
    interceptors.push(handler);
    return once(function () {
        var idx = interceptors.indexOf(handler);
        if (idx !== -1) interceptors.splice(idx, 1);
    });
}
function interceptChange(interceptable, change) {
    var prevU = untrackedStart();
    try {
        var interceptors = interceptable.interceptors;
        if (interceptors) for (var i = 0, l = interceptors.length; i < l; i++) {
            change = interceptors[i](change);
            invariant(!change || change.type, "Intercept handlers should return nothing or a change object");
            if (!change) break;
        }
        return change;
    } finally {
        untrackedEnd(prevU);
    }
}

function hasListeners(listenable) {
    return listenable.changeListeners && listenable.changeListeners.length > 0;
}
function registerListener(listenable, handler) {
    var listeners = listenable.changeListeners || (listenable.changeListeners = []);
    listeners.push(handler);
    return once(function () {
        var idx = listeners.indexOf(handler);
        if (idx !== -1) listeners.splice(idx, 1);
    });
}
function notifyListeners(listenable, change) {
    var prevU = untrackedStart();
    var listeners = listenable.changeListeners;
    if (!listeners) return;
    listeners = listeners.slice();
    for (var i = 0, l = listeners.length; i < l; i++) {
        listeners[i](change);
    }
    untrackedEnd(prevU);
}

function isSpyEnabled() {
    return !!globalState.spyListeners.length;
}
function spyReport(event) {
    if (!globalState.spyListeners.length) return;
    var listeners = globalState.spyListeners;
    for (var i = 0, l = listeners.length; i < l; i++) {
        listeners[i](event);
    }
}
function spyReportStart(event) {
    var change = objectAssign({}, event, { spyReportStart: true });
    spyReport(change);
}
var END_EVENT = { spyReportEnd: true };
function spyReportEnd(change) {
    if (change) spyReport(objectAssign({}, change, END_EVENT));else spyReport(END_EVENT);
}
function spy(listener) {
    globalState.spyListeners.push(listener);
    return once(function () {
        var idx = globalState.spyListeners.indexOf(listener);
        if (idx !== -1) globalState.spyListeners.splice(idx, 1);
    });
}

function iteratorSymbol() {
    return typeof Symbol === "function" && Symbol.iterator || "@@iterator";
}
var IS_ITERATING_MARKER = "__$$iterating";
function arrayAsIterator(array) {
    // returning an array for entries(), values() etc for maps was a mis-interpretation of the specs..,
    // yet it is quite convenient to be able to use the response both as array directly and as iterator
    // it is suboptimal, but alas...
    invariant(array[IS_ITERATING_MARKER] !== true, "Illegal state: cannot recycle array as iterator");
    addHiddenFinalProp(array, IS_ITERATING_MARKER, true);
    var idx = -1;
    addHiddenFinalProp(array, "next", function next() {
        idx++;
        return {
            done: idx >= this.length,
            value: idx < this.length ? this[idx] : undefined
        };
    });
    return array;
}
function declareIterator(prototType, iteratorFactory) {
    addHiddenFinalProp(prototType, iteratorSymbol(), iteratorFactory);
}

var MAX_SPLICE_SIZE = 10000; // See e.g. https://github.com/mobxjs/mobx/issues/859
// Detects bug in safari 9.1.1 (or iOS 9 safari mobile). See #364
var safariPrototypeSetterInheritanceBug = function () {
    var v = false;
    var p = {};
    Object.defineProperty(p, "0", { set: function set() {
            v = true;
        } });
    Object.create(p)["0"] = 1;
    return v === false;
}();
/**
 * This array buffer contains two lists of properties, so that all arrays
 * can recycle their property definitions, which significantly improves performance of creating
 * properties on the fly.
 */
var OBSERVABLE_ARRAY_BUFFER_SIZE = 0;
// Typescript workaround to make sure ObservableArray extends Array
var StubArray = function () {
    function StubArray() {}
    return StubArray;
}();
function inherit(ctor, proto) {
    if (typeof Object["setPrototypeOf"] !== "undefined") {
        Object["setPrototypeOf"](ctor.prototype, proto);
    } else if (typeof ctor.prototype.__proto__ !== "undefined") {
        ctor.prototype.__proto__ = proto;
    } else {
        ctor["prototype"] = proto;
    }
}
inherit(StubArray, Array.prototype);
var ObservableArrayAdministration = function () {
    function ObservableArrayAdministration(name, enhancer, array, owned) {
        this.array = array;
        this.owned = owned;
        this.values = [];
        this.lastKnownLength = 0;
        this.interceptors = null;
        this.changeListeners = null;
        this.atom = new BaseAtom(name || "ObservableArray@" + getNextId());
        this.enhancer = function (newV, oldV) {
            return enhancer(newV, oldV, name + "[..]");
        };
    }
    ObservableArrayAdministration.prototype.dehanceValue = function (value) {
        if (this.dehancer !== undefined) return this.dehancer(value);
        return value;
    };
    ObservableArrayAdministration.prototype.dehanceValues = function (values) {
        if (this.dehancer !== undefined) return values.map(this.dehancer);
        return values;
    };
    ObservableArrayAdministration.prototype.intercept = function (handler) {
        return registerInterceptor(this, handler);
    };
    ObservableArrayAdministration.prototype.observe = function (listener, fireImmediately) {
        if (fireImmediately === void 0) {
            fireImmediately = false;
        }
        if (fireImmediately) {
            listener({
                object: this.array,
                type: "splice",
                index: 0,
                added: this.values.slice(),
                addedCount: this.values.length,
                removed: [],
                removedCount: 0
            });
        }
        return registerListener(this, listener);
    };
    ObservableArrayAdministration.prototype.getArrayLength = function () {
        this.atom.reportObserved();
        return this.values.length;
    };
    ObservableArrayAdministration.prototype.setArrayLength = function (newLength) {
        if (typeof newLength !== "number" || newLength < 0) throw new Error("[mobx.array] Out of range: " + newLength);
        var currentLength = this.values.length;
        if (newLength === currentLength) return;else if (newLength > currentLength) {
            var newItems = new Array(newLength - currentLength);
            for (var i = 0; i < newLength - currentLength; i++) {
                newItems[i] = undefined;
            } // No Array.fill everywhere...
            this.spliceWithArray(currentLength, 0, newItems);
        } else this.spliceWithArray(newLength, currentLength - newLength);
    };
    // adds / removes the necessary numeric properties to this object
    ObservableArrayAdministration.prototype.updateArrayLength = function (oldLength, delta) {
        if (oldLength !== this.lastKnownLength) throw new Error("[mobx] Modification exception: the internal structure of an observable array was changed. Did you use peek() to change it?");
        this.lastKnownLength += delta;
        if (delta > 0 && oldLength + delta + 1 > OBSERVABLE_ARRAY_BUFFER_SIZE) reserveArrayBuffer(oldLength + delta + 1);
    };
    ObservableArrayAdministration.prototype.spliceWithArray = function (index, deleteCount, newItems) {
        var _this = this;
        checkIfStateModificationsAreAllowed(this.atom);
        var length = this.values.length;
        if (index === undefined) index = 0;else if (index > length) index = length;else if (index < 0) index = Math.max(0, length + index);
        if (arguments.length === 1) deleteCount = length - index;else if (deleteCount === undefined || deleteCount === null) deleteCount = 0;else deleteCount = Math.max(0, Math.min(deleteCount, length - index));
        if (newItems === undefined) newItems = [];
        if (hasInterceptors(this)) {
            var change = interceptChange(this, {
                object: this.array,
                type: "splice",
                index: index,
                removedCount: deleteCount,
                added: newItems
            });
            if (!change) return EMPTY_ARRAY;
            deleteCount = change.removedCount;
            newItems = change.added;
        }
        newItems = newItems.map(function (v) {
            return _this.enhancer(v, undefined);
        });
        var lengthDelta = newItems.length - deleteCount;
        this.updateArrayLength(length, lengthDelta); // create or remove new entries
        var res = this.spliceItemsIntoValues(index, deleteCount, newItems);
        if (deleteCount !== 0 || newItems.length !== 0) this.notifyArraySplice(index, newItems, res);
        return this.dehanceValues(res);
    };
    ObservableArrayAdministration.prototype.spliceItemsIntoValues = function (index, deleteCount, newItems) {
        if (newItems.length < MAX_SPLICE_SIZE) {
            return (_a = this.values).splice.apply(_a, [index, deleteCount].concat(newItems));
        } else {
            var res = this.values.slice(index, index + deleteCount);
            this.values = this.values.slice(0, index).concat(newItems, this.values.slice(index + deleteCount));
            return res;
        }
        var _a;
    };
    ObservableArrayAdministration.prototype.notifyArrayChildUpdate = function (index, newValue, oldValue) {
        var notifySpy = !this.owned && isSpyEnabled();
        var notify = hasListeners(this);
        var change = notify || notifySpy ? {
            object: this.array,
            type: "update",
            index: index, newValue: newValue, oldValue: oldValue
        } : null;
        if (notifySpy) spyReportStart(change);
        this.atom.reportChanged();
        if (notify) notifyListeners(this, change);
        if (notifySpy) spyReportEnd();
    };
    ObservableArrayAdministration.prototype.notifyArraySplice = function (index, added, removed) {
        var notifySpy = !this.owned && isSpyEnabled();
        var notify = hasListeners(this);
        var change = notify || notifySpy ? {
            object: this.array,
            type: "splice",
            index: index, removed: removed, added: added,
            removedCount: removed.length,
            addedCount: added.length
        } : null;
        if (notifySpy) spyReportStart(change);
        this.atom.reportChanged();
        // conform: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/observe
        if (notify) notifyListeners(this, change);
        if (notifySpy) spyReportEnd();
    };
    return ObservableArrayAdministration;
}();
var ObservableArray = function (_super) {
    __extends(ObservableArray, _super);
    function ObservableArray(initialValues, enhancer, name, owned) {
        if (name === void 0) {
            name = "ObservableArray@" + getNextId();
        }
        if (owned === void 0) {
            owned = false;
        }
        var _this = _super.call(this) || this;
        var adm = new ObservableArrayAdministration(name, enhancer, _this, owned);
        addHiddenFinalProp(_this, "$mobx", adm);
        if (initialValues && initialValues.length) {
            _this.spliceWithArray(0, 0, initialValues);
        }
        if (safariPrototypeSetterInheritanceBug) {
            // Seems that Safari won't use numeric prototype setter untill any * numeric property is
            // defined on the instance. After that it works fine, even if this property is deleted.
            Object.defineProperty(adm.array, "0", ENTRY_0);
        }
        return _this;
    }
    ObservableArray.prototype.intercept = function (handler) {
        return this.$mobx.intercept(handler);
    };
    ObservableArray.prototype.observe = function (listener, fireImmediately) {
        if (fireImmediately === void 0) {
            fireImmediately = false;
        }
        return this.$mobx.observe(listener, fireImmediately);
    };
    ObservableArray.prototype.clear = function () {
        return this.splice(0);
    };
    ObservableArray.prototype.concat = function () {
        var arrays = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            arrays[_i] = arguments[_i];
        }
        this.$mobx.atom.reportObserved();
        return Array.prototype.concat.apply(this.peek(), arrays.map(function (a) {
            return isObservableArray(a) ? a.peek() : a;
        }));
    };
    ObservableArray.prototype.replace = function (newItems) {
        return this.$mobx.spliceWithArray(0, this.$mobx.values.length, newItems);
    };
    /**
     * Converts this array back to a (shallow) javascript structure.
     * For a deep clone use mobx.toJS
     */
    ObservableArray.prototype.toJS = function () {
        return this.slice();
    };
    ObservableArray.prototype.toJSON = function () {
        // Used by JSON.stringify
        return this.toJS();
    };
    ObservableArray.prototype.peek = function () {
        this.$mobx.atom.reportObserved();
        return this.$mobx.dehanceValues(this.$mobx.values);
    };
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find
    ObservableArray.prototype.find = function (predicate, thisArg, fromIndex) {
        if (fromIndex === void 0) {
            fromIndex = 0;
        }
        var idx = this.findIndex.apply(this, arguments);
        return idx === -1 ? undefined : this.get(idx);
    };
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex
    ObservableArray.prototype.findIndex = function (predicate, thisArg, fromIndex) {
        if (fromIndex === void 0) {
            fromIndex = 0;
        }
        var items = this.peek(),
            l = items.length;
        for (var i = fromIndex; i < l; i++) {
            if (predicate.call(thisArg, items[i], i, this)) return i;
        }return -1;
    };
    /*
        functions that do alter the internal structure of the array, (based on lib.es6.d.ts)
        since these functions alter the inner structure of the array, the have side effects.
        Because the have side effects, they should not be used in computed function,
        and for that reason the do not call dependencyState.notifyObserved
        */
    ObservableArray.prototype.splice = function (index, deleteCount) {
        var newItems = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            newItems[_i - 2] = arguments[_i];
        }
        switch (arguments.length) {
            case 0:
                return [];
            case 1:
                return this.$mobx.spliceWithArray(index);
            case 2:
                return this.$mobx.spliceWithArray(index, deleteCount);
        }
        return this.$mobx.spliceWithArray(index, deleteCount, newItems);
    };
    ObservableArray.prototype.spliceWithArray = function (index, deleteCount, newItems) {
        return this.$mobx.spliceWithArray(index, deleteCount, newItems);
    };
    ObservableArray.prototype.push = function () {
        var items = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            items[_i] = arguments[_i];
        }
        var adm = this.$mobx;
        adm.spliceWithArray(adm.values.length, 0, items);
        return adm.values.length;
    };
    ObservableArray.prototype.pop = function () {
        return this.splice(Math.max(this.$mobx.values.length - 1, 0), 1)[0];
    };
    ObservableArray.prototype.shift = function () {
        return this.splice(0, 1)[0];
    };
    ObservableArray.prototype.unshift = function () {
        var items = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            items[_i] = arguments[_i];
        }
        var adm = this.$mobx;
        adm.spliceWithArray(0, 0, items);
        return adm.values.length;
    };
    ObservableArray.prototype.reverse = function () {
        // reverse by default mutates in place before returning the result
        // which makes it both a 'derivation' and a 'mutation'.
        // so we deviate from the default and just make it an dervitation
        var clone = this.slice();
        return clone.reverse.apply(clone, arguments);
    };
    ObservableArray.prototype.sort = function (compareFn) {
        // sort by default mutates in place before returning the result
        // which goes against all good practices. Let's not change the array in place!
        var clone = this.slice();
        return clone.sort.apply(clone, arguments);
    };
    ObservableArray.prototype.remove = function (value) {
        var idx = this.$mobx.dehanceValues(this.$mobx.values).indexOf(value);
        if (idx > -1) {
            this.splice(idx, 1);
            return true;
        }
        return false;
    };
    ObservableArray.prototype.move = function (fromIndex, toIndex) {
        function checkIndex(index) {
            if (index < 0) {
                throw new Error("[mobx.array] Index out of bounds: " + index + " is negative");
            }
            var length = this.$mobx.values.length;
            if (index >= length) {
                throw new Error("[mobx.array] Index out of bounds: " + index + " is not smaller than " + length);
            }
        }
        checkIndex.call(this, fromIndex);
        checkIndex.call(this, toIndex);
        if (fromIndex === toIndex) {
            return;
        }
        var oldItems = this.$mobx.values;
        var newItems;
        if (fromIndex < toIndex) {
            newItems = oldItems.slice(0, fromIndex).concat(oldItems.slice(fromIndex + 1, toIndex + 1), [oldItems[fromIndex]], oldItems.slice(toIndex + 1));
        } else {
            newItems = oldItems.slice(0, toIndex).concat([oldItems[fromIndex]], oldItems.slice(toIndex, fromIndex), oldItems.slice(fromIndex + 1));
        }
        this.replace(newItems);
    };
    // See #734, in case property accessors are unreliable...
    ObservableArray.prototype.get = function (index) {
        var impl = this.$mobx;
        if (impl) {
            if (index < impl.values.length) {
                impl.atom.reportObserved();
                return impl.dehanceValue(impl.values[index]);
            }
            console.warn("[mobx.array] Attempt to read an array index (" + index + ") that is out of bounds (" + impl.values.length + "). Please check length first. Out of bound indices will not be tracked by MobX");
        }
        return undefined;
    };
    // See #734, in case property accessors are unreliable...
    ObservableArray.prototype.set = function (index, newValue) {
        var adm = this.$mobx;
        var values = adm.values;
        if (index < values.length) {
            // update at index in range
            checkIfStateModificationsAreAllowed(adm.atom);
            var oldValue = values[index];
            if (hasInterceptors(adm)) {
                var change = interceptChange(adm, {
                    type: "update",
                    object: this,
                    index: index, newValue: newValue
                });
                if (!change) return;
                newValue = change.newValue;
            }
            newValue = adm.enhancer(newValue, oldValue);
            var changed = newValue !== oldValue;
            if (changed) {
                values[index] = newValue;
                adm.notifyArrayChildUpdate(index, newValue, oldValue);
            }
        } else if (index === values.length) {
            // add a new item
            adm.spliceWithArray(index, 0, [newValue]);
        } else {
            // out of bounds
            throw new Error("[mobx.array] Index out of bounds, " + index + " is larger than " + values.length);
        }
    };
    return ObservableArray;
}(StubArray);
declareIterator(ObservableArray.prototype, function () {
    return arrayAsIterator(this.slice());
});
Object.defineProperty(ObservableArray.prototype, "length", {
    enumerable: false,
    configurable: true,
    get: function get() {
        return this.$mobx.getArrayLength();
    },
    set: function set(newLength) {
        this.$mobx.setArrayLength(newLength);
    }
});
/**
 * Wrap function from prototype
 */
["every", "filter", "forEach", "indexOf", "join", "lastIndexOf", "map", "reduce", "reduceRight", "slice", "some", "toString", "toLocaleString"].forEach(function (funcName) {
    var baseFunc = Array.prototype[funcName];
    invariant(typeof baseFunc === "function", "Base function not defined on Array prototype: '" + funcName + "'");
    addHiddenProp(ObservableArray.prototype, funcName, function () {
        return baseFunc.apply(this.peek(), arguments);
    });
});
/**
 * We don't want those to show up in `for (const key in ar)` ...
 */
makeNonEnumerable(ObservableArray.prototype, ["constructor", "intercept", "observe", "clear", "concat", "get", "replace", "toJS", "toJSON", "peek", "find", "findIndex", "splice", "spliceWithArray", "push", "pop", "set", "shift", "unshift", "reverse", "sort", "remove", "move", "toString", "toLocaleString"]);
// See #364
var ENTRY_0 = createArrayEntryDescriptor(0);
function createArrayEntryDescriptor(index) {
    return {
        enumerable: false,
        configurable: false,
        get: function get() {
            // TODO: Check `this`?, see #752?
            return this.get(index);
        },
        set: function set(value) {
            this.set(index, value);
        }
    };
}
function createArrayBufferItem(index) {
    Object.defineProperty(ObservableArray.prototype, "" + index, createArrayEntryDescriptor(index));
}
function reserveArrayBuffer(max) {
    for (var index = OBSERVABLE_ARRAY_BUFFER_SIZE; index < max; index++) {
        createArrayBufferItem(index);
    }OBSERVABLE_ARRAY_BUFFER_SIZE = max;
}
reserveArrayBuffer(1000);
var isObservableArrayAdministration = createInstanceofPredicate("ObservableArrayAdministration", ObservableArrayAdministration);
function isObservableArray(thing) {
    return isObject(thing) && isObservableArrayAdministration(thing.$mobx);
}

var UNCHANGED = {};
var ObservableValue = function (_super) {
    __extends(ObservableValue, _super);
    function ObservableValue(value, enhancer, name, notifySpy) {
        if (name === void 0) {
            name = "ObservableValue@" + getNextId();
        }
        if (notifySpy === void 0) {
            notifySpy = true;
        }
        var _this = _super.call(this, name) || this;
        _this.enhancer = enhancer;
        _this.hasUnreportedChange = false;
        _this.dehancer = undefined;
        _this.value = enhancer(value, undefined, name);
        if (notifySpy && isSpyEnabled()) {
            // only notify spy if this is a stand-alone observable
            spyReport({ type: "create", object: _this, newValue: _this.value });
        }
        return _this;
    }
    ObservableValue.prototype.dehanceValue = function (value) {
        if (this.dehancer !== undefined) return this.dehancer(value);
        return value;
    };
    ObservableValue.prototype.set = function (newValue) {
        var oldValue = this.value;
        newValue = this.prepareNewValue(newValue);
        if (newValue !== UNCHANGED) {
            var notifySpy = isSpyEnabled();
            if (notifySpy) {
                spyReportStart({
                    type: "update",
                    object: this,
                    newValue: newValue, oldValue: oldValue
                });
            }
            this.setNewValue(newValue);
            if (notifySpy) spyReportEnd();
        }
    };
    ObservableValue.prototype.prepareNewValue = function (newValue) {
        checkIfStateModificationsAreAllowed(this);
        if (hasInterceptors(this)) {
            var change = interceptChange(this, { object: this, type: "update", newValue: newValue });
            if (!change) return UNCHANGED;
            newValue = change.newValue;
        }
        // apply modifier
        newValue = this.enhancer(newValue, this.value, this.name);
        return this.value !== newValue ? newValue : UNCHANGED;
    };
    ObservableValue.prototype.setNewValue = function (newValue) {
        var oldValue = this.value;
        this.value = newValue;
        this.reportChanged();
        if (hasListeners(this)) {
            notifyListeners(this, {
                type: "update",
                object: this,
                newValue: newValue, oldValue: oldValue
            });
        }
    };
    ObservableValue.prototype.get = function () {
        this.reportObserved();
        return this.dehanceValue(this.value);
    };
    ObservableValue.prototype.intercept = function (handler) {
        return registerInterceptor(this, handler);
    };
    ObservableValue.prototype.observe = function (listener, fireImmediately) {
        if (fireImmediately) listener({
            object: this,
            type: "update",
            newValue: this.value,
            oldValue: undefined
        });
        return registerListener(this, listener);
    };
    ObservableValue.prototype.toJSON = function () {
        return this.get();
    };
    ObservableValue.prototype.toString = function () {
        return this.name + "[" + this.value + "]";
    };
    ObservableValue.prototype.valueOf = function () {
        return toPrimitive(this.get());
    };
    return ObservableValue;
}(BaseAtom);
ObservableValue.prototype[primitiveSymbol()] = ObservableValue.prototype.valueOf;
var isObservableValue = createInstanceofPredicate("ObservableValue", ObservableValue);

var messages = {
    "m001": "It is not allowed to assign new values to @action fields",
    "m002": "`runInAction` expects a function",
    "m003": "`runInAction` expects a function without arguments",
    "m004": "autorun expects a function",
    "m005": "Warning: attempted to pass an action to autorun. Actions are untracked and will not trigger on state changes. Use `reaction` or wrap only your state modification code in an action.",
    "m006": "Warning: attempted to pass an action to autorunAsync. Actions are untracked and will not trigger on state changes. Use `reaction` or wrap only your state modification code in an action.",
    "m007": "reaction only accepts 2 or 3 arguments. If migrating from MobX 2, please provide an options object",
    "m008": "wrapping reaction expression in `asReference` is no longer supported, use options object instead",
    "m009": "@computed can only be used on getter functions, like: '@computed get myProps() { return ...; }'. It looks like it was used on a property.",
    "m010": "@computed can only be used on getter functions, like: '@computed get myProps() { return ...; }'",
    "m011": "First argument to `computed` should be an expression. If using computed as decorator, don't pass it arguments",
    "m012": "computed takes one or two arguments if used as function",
    "m013": "[mobx.expr] 'expr' should only be used inside other reactive functions.",
    "m014": "extendObservable expected 2 or more arguments",
    "m015": "extendObservable expects an object as first argument",
    "m016": "extendObservable should not be used on maps, use map.merge instead",
    "m017": "all arguments of extendObservable should be objects",
    "m018": "extending an object with another observable (object) is not supported. Please construct an explicit propertymap, using `toJS` if need. See issue #540",
    "m019": "[mobx.isObservable] isObservable(object, propertyName) is not supported for arrays and maps. Use map.has or array.length instead.",
    "m020": "modifiers can only be used for individual object properties",
    "m021": "observable expects zero or one arguments",
    "m022": "@observable can not be used on getters, use @computed instead",
    "m023": "Using `transaction` is deprecated, use `runInAction` or `(@)action` instead.",
    "m024": "whyRun() can only be used if a derivation is active, or by passing an computed value / reaction explicitly. If you invoked whyRun from inside a computation; the computation is currently suspended but re-evaluating because somebody requested its value.",
    "m025": "whyRun can only be used on reactions and computed values",
    "m026": "`action` can only be invoked on functions",
    "m028": "It is not allowed to set `useStrict` when a derivation is running",
    "m029": "INTERNAL ERROR only onBecomeUnobserved shouldn't be called twice in a row",
    "m030a": "Since strict-mode is enabled, changing observed observable values outside actions is not allowed. Please wrap the code in an `action` if this change is intended. Tried to modify: ",
    "m030b": "Side effects like changing state are not allowed at this point. Are you trying to modify state from, for example, the render function of a React component? Tried to modify: ",
    "m031": "Computed values are not allowed to cause side effects by changing observables that are already being observed. Tried to modify: ",
    "m032": "* This computation is suspended (not in use by any reaction) and won't run automatically.\n	Didn't expect this computation to be suspended at this point?\n	  1. Make sure this computation is used by a reaction (reaction, autorun, observer).\n	  2. Check whether you are using this computation synchronously (in the same stack as they reaction that needs it).",
    "m033": "`observe` doesn't support the fire immediately property for observable maps.",
    "m034": "`mobx.map` is deprecated, use `new ObservableMap` or `mobx.observable.map` instead",
    "m035": "Cannot make the designated object observable; it is not extensible",
    "m036": "It is not possible to get index atoms from arrays",
    "m037": "Hi there! I'm sorry you have just run into an exception.\nIf your debugger ends up here, know that some reaction (like the render() of an observer component, autorun or reaction)\nthrew an exception and that mobx caught it, to avoid that it brings the rest of your application down.\nThe original cause of the exception (the code that caused this reaction to run (again)), is still in the stack.\n\nHowever, more interesting is the actual stack trace of the error itself.\nHopefully the error is an instanceof Error, because in that case you can inspect the original stack of the error from where it was thrown.\nSee `error.stack` property, or press the very subtle \"(...)\" link you see near the console.error message that probably brought you here.\nThat stack is more interesting than the stack of this console.error itself.\n\nIf the exception you see is an exception you created yourself, make sure to use `throw new Error(\"Oops\")` instead of `throw \"Oops\"`,\nbecause the javascript environment will only preserve the original stack trace in the first form.\n\nYou can also make sure the debugger pauses the next time this very same exception is thrown by enabling \"Pause on caught exception\".\n(Note that it might pause on many other, unrelated exception as well).\n\nIf that all doesn't help you out, feel free to open an issue https://github.com/mobxjs/mobx/issues!\n",
    "m038": "Missing items in this list?\n    1. Check whether all used values are properly marked as observable (use isObservable to verify)\n    2. Make sure you didn't dereference values too early. MobX observes props, not primitives. E.g: use 'person.name' instead of 'name' in your computation.\n"
};
function getMessage(id) {
    return messages[id];
}

function createAction(actionName, fn) {
    invariant(typeof fn === "function", getMessage("m026"));
    invariant(typeof actionName === "string" && actionName.length > 0, "actions should have valid names, got: '" + actionName + "'");
    var res = function res() {
        return executeAction(actionName, fn, this, arguments);
    };
    res.originalFn = fn;
    res.isMobxAction = true;
    return res;
}
function executeAction(actionName, fn, scope, args) {
    var runInfo = startAction(actionName, fn, scope, args);
    try {
        return fn.apply(scope, args);
    } finally {
        endAction(runInfo);
    }
}
function startAction(actionName, fn, scope, args) {
    var notifySpy = isSpyEnabled() && !!actionName;
    var startTime = 0;
    if (notifySpy) {
        startTime = Date.now();
        var l = args && args.length || 0;
        var flattendArgs = new Array(l);
        if (l > 0) for (var i = 0; i < l; i++) {
            flattendArgs[i] = args[i];
        }spyReportStart({
            type: "action",
            name: actionName,
            fn: fn,
            object: scope,
            arguments: flattendArgs
        });
    }
    var prevDerivation = untrackedStart();
    startBatch();
    var prevAllowStateChanges = allowStateChangesStart(true);
    return {
        prevDerivation: prevDerivation,
        prevAllowStateChanges: prevAllowStateChanges,
        notifySpy: notifySpy,
        startTime: startTime
    };
}
function endAction(runInfo) {
    allowStateChangesEnd(runInfo.prevAllowStateChanges);
    endBatch();
    untrackedEnd(runInfo.prevDerivation);
    if (runInfo.notifySpy) spyReportEnd({ time: Date.now() - runInfo.startTime });
}
function useStrict(strict) {
    invariant(globalState.trackingDerivation === null, getMessage("m028"));
    globalState.strictMode = strict;
    globalState.allowStateChanges = !strict;
}
function isStrictModeEnabled() {
    return globalState.strictMode;
}
function allowStateChanges(allowStateChanges, func) {
    // TODO: deprecate / refactor this function in next major
    // Currently only used by `@observer`
    // Proposed change: remove first param, rename to `forbidStateChanges`,
    // require error callback instead of the hardcoded error message now used
    // Use `inAction` instead of allowStateChanges in derivation.ts to check strictMode
    var prev = allowStateChangesStart(allowStateChanges);
    var res;
    try {
        res = func();
    } finally {
        allowStateChangesEnd(prev);
    }
    return res;
}
function allowStateChangesStart(allowStateChanges) {
    var prev = globalState.allowStateChanges;
    globalState.allowStateChanges = allowStateChanges;
    return prev;
}
function allowStateChangesEnd(prev) {
    globalState.allowStateChanges = prev;
}

/**
 * Constructs a decorator, that normalizes the differences between
 * TypeScript and Babel. Mainly caused by the fact that legacy-decorator cannot assign
 * values during instance creation to properties that have a getter setter.
 *
 * - Sigh -
 *
 * Also takes care of the difference between @decorator field and @decorator(args) field, and different forms of values.
 * For performance (cpu and mem) reasons the properties are always defined on the prototype (at least initially).
 * This means that these properties despite being enumerable might not show up in Object.keys() (but they will show up in for...in loops).
 */
function createClassPropertyDecorator(
/**
 * This function is invoked once, when the property is added to a new instance.
 * When this happens is not strictly determined due to differences in TS and Babel:
 * Typescript: Usually when constructing the new instance
 * Babel, sometimes Typescript: during the first get / set
 * Both: when calling `runLazyInitializers(instance)`
 */
onInitialize, _get, _set, enumerable,
/**
 * Can this decorator invoked with arguments? e.g. @decorator(args)
 */
allowCustomArguments) {
    function classPropertyDecorator(target, key, descriptor, customArgs, argLen) {
        if (argLen === void 0) {
            argLen = 0;
        }
        invariant(allowCustomArguments || quacksLikeADecorator(arguments), "This function is a decorator, but it wasn't invoked like a decorator");
        if (!descriptor) {
            // typescript (except for getter / setters)
            var newDescriptor = {
                enumerable: enumerable,
                configurable: true,
                get: function get() {
                    if (!this.__mobxInitializedProps || this.__mobxInitializedProps[key] !== true) typescriptInitializeProperty(this, key, undefined, onInitialize, customArgs, descriptor);
                    return _get.call(this, key);
                },
                set: function set(v) {
                    if (!this.__mobxInitializedProps || this.__mobxInitializedProps[key] !== true) {
                        typescriptInitializeProperty(this, key, v, onInitialize, customArgs, descriptor);
                    } else {
                        _set.call(this, key, v);
                    }
                }
            };
            if (arguments.length < 3 || arguments.length === 5 && argLen < 3) {
                // Typescript target is ES3, so it won't define property for us
                // or using Reflect.decorate polyfill, which will return no descriptor
                // (see https://github.com/mobxjs/mobx/issues/333)
                Object.defineProperty(target, key, newDescriptor);
            }
            return newDescriptor;
        } else {
            // babel and typescript getter / setter props
            if (!hasOwnProperty(target, "__mobxLazyInitializers")) {
                addHiddenProp(target, "__mobxLazyInitializers", target.__mobxLazyInitializers && target.__mobxLazyInitializers.slice() || [] // support inheritance
                );
            }
            var value_1 = descriptor.value,
                initializer_1 = descriptor.initializer;
            target.__mobxLazyInitializers.push(function (instance) {
                onInitialize(instance, key, initializer_1 ? initializer_1.call(instance) : value_1, customArgs, descriptor);
            });
            return {
                enumerable: enumerable, configurable: true,
                get: function get() {
                    if (this.__mobxDidRunLazyInitializers !== true) runLazyInitializers(this);
                    return _get.call(this, key);
                },
                set: function set(v) {
                    if (this.__mobxDidRunLazyInitializers !== true) runLazyInitializers(this);
                    _set.call(this, key, v);
                }
            };
        }
    }
    if (allowCustomArguments) {
        /** If custom arguments are allowed, we should return a function that returns a decorator */
        return function () {
            /** Direct invocation: @decorator bla */
            if (quacksLikeADecorator(arguments)) return classPropertyDecorator.apply(null, arguments);
            /** Indirect invocation: @decorator(args) bla */
            var outerArgs = arguments;
            var argLen = arguments.length;
            return function (target, key, descriptor) {
                return classPropertyDecorator(target, key, descriptor, outerArgs, argLen);
            };
        };
    }
    return classPropertyDecorator;
}
function typescriptInitializeProperty(instance, key, v, onInitialize, customArgs, baseDescriptor) {
    if (!hasOwnProperty(instance, "__mobxInitializedProps")) addHiddenProp(instance, "__mobxInitializedProps", {});
    instance.__mobxInitializedProps[key] = true;
    onInitialize(instance, key, v, customArgs, baseDescriptor);
}
function runLazyInitializers(instance) {
    if (instance.__mobxDidRunLazyInitializers === true) return;
    if (instance.__mobxLazyInitializers) {
        addHiddenProp(instance, "__mobxDidRunLazyInitializers", true);
        instance.__mobxDidRunLazyInitializers && instance.__mobxLazyInitializers.forEach(function (initializer) {
            return initializer(instance);
        });
    }
}
function quacksLikeADecorator(args) {
    return (args.length === 2 || args.length === 3) && typeof args[1] === "string";
}

var actionFieldDecorator = createClassPropertyDecorator(function (target, key, value, args, originalDescriptor) {
    var actionName = args && args.length === 1 ? args[0] : value.name || key || "<unnamed action>";
    var wrappedAction = action(actionName, value);
    addHiddenProp(target, key, wrappedAction);
}, function (key) {
    return this[key];
}, function () {
    invariant(false, getMessage("m001"));
}, false, true);
var boundActionDecorator = createClassPropertyDecorator(function (target, key, value) {
    defineBoundAction(target, key, value);
}, function (key) {
    return this[key];
}, function () {
    invariant(false, getMessage("m001"));
}, false, false);
var action = function action(arg1, arg2, arg3, arg4) {
    if (arguments.length === 1 && typeof arg1 === "function") return createAction(arg1.name || "<unnamed action>", arg1);
    if (arguments.length === 2 && typeof arg2 === "function") return createAction(arg1, arg2);
    if (arguments.length === 1 && typeof arg1 === "string") return namedActionDecorator(arg1);
    return namedActionDecorator(arg2).apply(null, arguments);
};
action.bound = function boundAction(arg1, arg2, arg3) {
    if (typeof arg1 === "function") {
        var action_1 = createAction("<not yet bound action>", arg1);
        action_1.autoBind = true;
        return action_1;
    }
    return boundActionDecorator.apply(null, arguments);
};
function namedActionDecorator(name) {
    return function (target, prop, descriptor) {
        if (descriptor && typeof descriptor.value === "function") {
            // TypeScript @action method() { }. Defined on proto before being decorated
            // Don't use the field decorator if we are just decorating a method
            descriptor.value = createAction(name, descriptor.value);
            descriptor.enumerable = false;
            descriptor.configurable = true;
            return descriptor;
        }
        // bound instance methods
        return actionFieldDecorator(name).apply(this, arguments);
    };
}
function runInAction(arg1, arg2, arg3) {
    var actionName = typeof arg1 === "string" ? arg1 : arg1.name || "<unnamed action>";
    var fn = typeof arg1 === "function" ? arg1 : arg2;
    var scope = typeof arg1 === "function" ? arg2 : arg3;
    invariant(typeof fn === "function", getMessage("m002"));
    invariant(fn.length === 0, getMessage("m003"));
    invariant(typeof actionName === "string" && actionName.length > 0, "actions should have valid names, got: '" + actionName + "'");
    return executeAction(actionName, fn, scope, undefined);
}
function isAction(thing) {
    return typeof thing === "function" && thing.isMobxAction === true;
}
function defineBoundAction(target, propertyName, fn) {
    var res = function res() {
        return executeAction(propertyName, fn, target, arguments);
    };
    res.isMobxAction = true;
    addHiddenProp(target, propertyName, res);
}

function identityComparer(a, b) {
    return a === b;
}
function structuralComparer(a, b) {
    if (typeof a === 'number' && typeof b === 'number' && isNaN(a) && isNaN(b)) {
        return true;
    }
    return deepEqual(a, b);
}
function defaultComparer(a, b) {
    if (typeof a === 'number' && typeof b === 'number' && isNaN(a) && isNaN(b)) {
        return true;
    }
    return identityComparer(a, b);
}
var comparer = {
    identity: identityComparer,
    structural: structuralComparer,
    default: defaultComparer
};

function autorun(arg1, arg2, arg3) {
    var name, view, scope;
    if (typeof arg1 === "string") {
        name = arg1;
        view = arg2;
        scope = arg3;
    } else {
        name = arg1.name || "Autorun@" + getNextId();
        view = arg1;
        scope = arg2;
    }
    invariant(typeof view === "function", getMessage("m004"));
    invariant(isAction(view) === false, getMessage("m005"));
    if (scope) view = view.bind(scope);
    var reaction = new Reaction(name, function () {
        this.track(reactionRunner);
    });
    function reactionRunner() {
        view(reaction);
    }
    reaction.schedule();
    return reaction.getDisposer();
}
function when(arg1, arg2, arg3, arg4) {
    var name, predicate, effect, scope;
    if (typeof arg1 === "string") {
        name = arg1;
        predicate = arg2;
        effect = arg3;
        scope = arg4;
    } else {
        name = "When@" + getNextId();
        predicate = arg1;
        effect = arg2;
        scope = arg3;
    }
    var disposer = autorun(name, function (r) {
        if (predicate.call(scope)) {
            r.dispose();
            var prevUntracked = untrackedStart();
            effect.call(scope);
            untrackedEnd(prevUntracked);
        }
    });
    return disposer;
}
function autorunAsync(arg1, arg2, arg3, arg4) {
    var name, func, delay, scope;
    if (typeof arg1 === "string") {
        name = arg1;
        func = arg2;
        delay = arg3;
        scope = arg4;
    } else {
        name = arg1.name || "AutorunAsync@" + getNextId();
        func = arg1;
        delay = arg2;
        scope = arg3;
    }
    invariant(isAction(func) === false, getMessage("m006"));
    if (delay === void 0) delay = 1;
    if (scope) func = func.bind(scope);
    var isScheduled = false;
    var r = new Reaction(name, function () {
        if (!isScheduled) {
            isScheduled = true;
            setTimeout(function () {
                isScheduled = false;
                if (!r.isDisposed) r.track(reactionRunner);
            }, delay);
        }
    });
    function reactionRunner() {
        func(r);
    }
    r.schedule();
    return r.getDisposer();
}
function reaction(expression, effect, arg3) {
    if (arguments.length > 3) {
        fail(getMessage("m007"));
    }
    if (isModifierDescriptor(expression)) {
        fail(getMessage("m008"));
    }
    var opts;
    if (typeof arg3 === "object") {
        opts = arg3;
    } else {
        opts = {};
    }
    opts.name = opts.name || expression.name || effect.name || "Reaction@" + getNextId();
    opts.fireImmediately = arg3 === true || opts.fireImmediately === true;
    opts.delay = opts.delay || 0;
    opts.compareStructural = opts.compareStructural || opts.struct || false;
    // TODO: creates ugly spy events, use `effect = (r) => runInAction(opts.name, () => effect(r))` instead
    effect = action(opts.name, opts.context ? effect.bind(opts.context) : effect);
    if (opts.context) {
        expression = expression.bind(opts.context);
    }
    var firstTime = true;
    var isScheduled = false;
    var value;
    var equals = opts.equals ? opts.equals : opts.compareStructural || opts.struct ? comparer.structural : comparer.default;
    var r = new Reaction(opts.name, function () {
        if (firstTime || opts.delay < 1) {
            reactionRunner();
        } else if (!isScheduled) {
            isScheduled = true;
            setTimeout(function () {
                isScheduled = false;
                reactionRunner();
            }, opts.delay);
        }
    });
    function reactionRunner() {
        if (r.isDisposed) return;
        var changed = false;
        r.track(function () {
            var nextValue = expression(r);
            changed = firstTime || !equals(value, nextValue);
            value = nextValue;
        });
        if (firstTime && opts.fireImmediately) effect(value, r);
        if (!firstTime && changed === true) effect(value, r);
        if (firstTime) firstTime = false;
    }
    r.schedule();
    return r.getDisposer();
}

/**
 * A node in the state dependency root that observes other nodes, and can be observed itself.
 *
 * ComputedValue will remember result of the computation for duration of a batch, or being observed
 * During this time it will recompute only when one of its direct dependencies changed,
 * but only when it is being accessed with `ComputedValue.get()`.
 *
 * Implementation description:
 * 1. First time it's being accessed it will compute and remember result
 *    give back remembered result until 2. happens
 * 2. First time any deep dependency change, propagate POSSIBLY_STALE to all observers, wait for 3.
 * 3. When it's being accessed, recompute if any shallow dependency changed.
 *    if result changed: propagate STALE to all observers, that were POSSIBLY_STALE from the last step.
 *    go to step 2. either way
 *
 * If at any point it's outside batch and it isn't observed: reset everything and go to 1.
 */
var ComputedValue = function () {
    /**
     * Create a new computed value based on a function expression.
     *
     * The `name` property is for debug purposes only.
     *
     * The `equals` property specifies the comparer function to use to determine if a newly produced
     * value differs from the previous value. Two comparers are provided in the library; `defaultComparer`
     * compares based on identity comparison (===), and `structualComparer` deeply compares the structure.
     * Structural comparison can be convenient if you always produce an new aggregated object and
     * don't want to notify observers if it is structurally the same.
     * This is useful for working with vectors, mouse coordinates etc.
     */
    function ComputedValue(derivation, scope, equals, name, setter) {
        this.derivation = derivation;
        this.scope = scope;
        this.equals = equals;
        this.dependenciesState = IDerivationState.NOT_TRACKING;
        this.observing = []; // nodes we are looking at. Our value depends on these nodes
        this.newObserving = null; // during tracking it's an array with new observed observers
        this.isPendingUnobservation = false;
        this.observers = [];
        this.observersIndexes = {};
        this.diffValue = 0;
        this.runId = 0;
        this.lastAccessedBy = 0;
        this.lowestObserverState = IDerivationState.UP_TO_DATE;
        this.unboundDepsCount = 0;
        this.__mapid = "#" + getNextId();
        this.value = new CaughtException(null);
        this.isComputing = false; // to check for cycles
        this.isRunningSetter = false;
        this.name = name || "ComputedValue@" + getNextId();
        if (setter) this.setter = createAction(name + "-setter", setter);
    }
    ComputedValue.prototype.onBecomeStale = function () {
        propagateMaybeChanged(this);
    };
    ComputedValue.prototype.onBecomeUnobserved = function () {
        clearObserving(this);
        this.value = undefined;
    };
    /**
     * Returns the current value of this computed value.
     * Will evaluate its computation first if needed.
     */
    ComputedValue.prototype.get = function () {
        invariant(!this.isComputing, "Cycle detected in computation " + this.name, this.derivation);
        if (globalState.inBatch === 0) {
            // This is an minor optimization which could be omitted to simplify the code
            // The computedValue is accessed outside of any mobx stuff. Batch observing should be enough and don't need
            // tracking as it will never be called again inside this batch.
            startBatch();
            if (shouldCompute(this)) this.value = this.computeValue(false);
            endBatch();
        } else {
            reportObserved(this);
            if (shouldCompute(this)) if (this.trackAndCompute()) propagateChangeConfirmed(this);
        }
        var result = this.value;
        if (isCaughtException(result)) throw result.cause;
        return result;
    };
    ComputedValue.prototype.peek = function () {
        var res = this.computeValue(false);
        if (isCaughtException(res)) throw res.cause;
        return res;
    };
    ComputedValue.prototype.set = function (value) {
        if (this.setter) {
            invariant(!this.isRunningSetter, "The setter of computed value '" + this.name + "' is trying to update itself. Did you intend to update an _observable_ value, instead of the computed property?");
            this.isRunningSetter = true;
            try {
                this.setter.call(this.scope, value);
            } finally {
                this.isRunningSetter = false;
            }
        } else invariant(false, "[ComputedValue '" + this.name + "'] It is not possible to assign a new value to a computed value.");
    };
    ComputedValue.prototype.trackAndCompute = function () {
        if (isSpyEnabled()) {
            spyReport({
                object: this.scope,
                type: "compute",
                fn: this.derivation
            });
        }
        var oldValue = this.value;
        var newValue = this.value = this.computeValue(true);
        return isCaughtException(oldValue) || isCaughtException(newValue) || !this.equals(oldValue, newValue);
    };
    ComputedValue.prototype.computeValue = function (track) {
        this.isComputing = true;
        globalState.computationDepth++;
        var res;
        if (track) {
            res = trackDerivedFunction(this, this.derivation, this.scope);
        } else {
            try {
                res = this.derivation.call(this.scope);
            } catch (e) {
                res = new CaughtException(e);
            }
        }
        globalState.computationDepth--;
        this.isComputing = false;
        return res;
    };

    ComputedValue.prototype.observe = function (listener, fireImmediately) {
        var _this = this;
        var firstTime = true;
        var prevValue = undefined;
        return autorun(function () {
            var newValue = _this.get();
            if (!firstTime || fireImmediately) {
                var prevU = untrackedStart();
                listener({
                    type: "update",
                    object: _this,
                    newValue: newValue,
                    oldValue: prevValue
                });
                untrackedEnd(prevU);
            }
            firstTime = false;
            prevValue = newValue;
        });
    };
    ComputedValue.prototype.toJSON = function () {
        return this.get();
    };
    ComputedValue.prototype.toString = function () {
        return this.name + "[" + this.derivation.toString() + "]";
    };
    ComputedValue.prototype.valueOf = function () {
        return toPrimitive(this.get());
    };

    ComputedValue.prototype.whyRun = function () {
        var isTracking = Boolean(globalState.trackingDerivation);
        var observing = unique(this.isComputing ? this.newObserving : this.observing).map(function (dep) {
            return dep.name;
        });
        var observers = unique(getObservers(this).map(function (dep) {
            return dep.name;
        }));
        return "\nWhyRun? computation '" + this.name + "':\n * Running because: " + (isTracking ? "[active] the value of this computation is needed by a reaction" : this.isComputing ? "[get] The value of this computed was requested outside a reaction" : "[idle] not running at the moment") + "\n" + (this.dependenciesState === IDerivationState.NOT_TRACKING ? getMessage("m032") : " * This computation will re-run if any of the following observables changes:\n    " + joinStrings(observing) + "\n    " + (this.isComputing && isTracking ? " (... or any observable accessed during the remainder of the current run)" : "") + "\n\t" + getMessage("m038") + "\n\n  * If the outcome of this computation changes, the following observers will be re-run:\n    " + joinStrings(observers) + "\n");
    };
    return ComputedValue;
}();
ComputedValue.prototype[primitiveSymbol()] = ComputedValue.prototype.valueOf;
var isComputedValue = createInstanceofPredicate("ComputedValue", ComputedValue);

var ObservableObjectAdministration = function () {
    function ObservableObjectAdministration(target, name) {
        this.target = target;
        this.name = name;
        this.values = {};
        this.changeListeners = null;
        this.interceptors = null;
    }
    /**
        * Observes this object. Triggers for the events 'add', 'update' and 'delete'.
        * See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/observe
        * for callback details
        */
    ObservableObjectAdministration.prototype.observe = function (callback, fireImmediately) {
        invariant(fireImmediately !== true, "`observe` doesn't support the fire immediately property for observable objects.");
        return registerListener(this, callback);
    };
    ObservableObjectAdministration.prototype.intercept = function (handler) {
        return registerInterceptor(this, handler);
    };
    return ObservableObjectAdministration;
}();
function asObservableObject(target, name) {
    if (isObservableObject(target) && target.hasOwnProperty('$mobx')) return target.$mobx;
    invariant(Object.isExtensible(target), getMessage("m035"));
    if (!isPlainObject(target)) name = (target.constructor.name || "ObservableObject") + "@" + getNextId();
    if (!name) name = "ObservableObject@" + getNextId();
    var adm = new ObservableObjectAdministration(target, name);
    addHiddenFinalProp(target, "$mobx", adm);
    return adm;
}
function defineObservablePropertyFromDescriptor(adm, propName, descriptor, defaultEnhancer) {
    if (adm.values[propName]) {
        // already observable property
        invariant("value" in descriptor, "The property " + propName + " in " + adm.name + " is already observable, cannot redefine it as computed property");
        adm.target[propName] = descriptor.value; // the property setter will make 'value' reactive if needed.
        return;
    }
    // not yet observable property
    if ("value" in descriptor) {
        // not a computed value
        if (isModifierDescriptor(descriptor.value)) {
            // x : ref(someValue)
            var modifierDescriptor = descriptor.value;
            defineObservableProperty(adm, propName, modifierDescriptor.initialValue, modifierDescriptor.enhancer);
        } else if (isAction(descriptor.value) && descriptor.value.autoBind === true) {
            defineBoundAction(adm.target, propName, descriptor.value.originalFn);
        } else if (isComputedValue(descriptor.value)) {
            // x: computed(someExpr)
            defineComputedPropertyFromComputedValue(adm, propName, descriptor.value);
        } else {
            // x: someValue
            defineObservableProperty(adm, propName, descriptor.value, defaultEnhancer);
        }
    } else {
        // get x() { return 3 } set x(v) { }
        defineComputedProperty(adm, propName, descriptor.get, descriptor.set, comparer.default, true);
    }
}
function defineObservableProperty(adm, propName, newValue, enhancer) {
    assertPropertyConfigurable(adm.target, propName);
    if (hasInterceptors(adm)) {
        var change = interceptChange(adm, {
            object: adm.target,
            name: propName,
            type: "add",
            newValue: newValue
        });
        if (!change) return;
        newValue = change.newValue;
    }
    var observable = adm.values[propName] = new ObservableValue(newValue, enhancer, adm.name + "." + propName, false);
    newValue = observable.value; // observableValue might have changed it
    Object.defineProperty(adm.target, propName, generateObservablePropConfig(propName));
    notifyPropertyAddition(adm, adm.target, propName, newValue);
}
function defineComputedProperty(adm, propName, getter, setter, equals, asInstanceProperty) {
    if (asInstanceProperty) assertPropertyConfigurable(adm.target, propName);
    adm.values[propName] = new ComputedValue(getter, adm.target, equals, adm.name + "." + propName, setter);
    if (asInstanceProperty) {
        Object.defineProperty(adm.target, propName, generateComputedPropConfig(propName));
    }
}
function defineComputedPropertyFromComputedValue(adm, propName, computedValue) {
    var name = adm.name + "." + propName;
    computedValue.name = name;
    if (!computedValue.scope) computedValue.scope = adm.target;
    adm.values[propName] = computedValue;
    Object.defineProperty(adm.target, propName, generateComputedPropConfig(propName));
}
var observablePropertyConfigs = {};
var computedPropertyConfigs = {};
function generateObservablePropConfig(propName) {
    return observablePropertyConfigs[propName] || (observablePropertyConfigs[propName] = {
        configurable: true,
        enumerable: true,
        get: function get() {
            return this.$mobx.values[propName].get();
        },
        set: function set(v) {
            setPropertyValue(this, propName, v);
        }
    });
}
function generateComputedPropConfig(propName) {
    return computedPropertyConfigs[propName] || (computedPropertyConfigs[propName] = {
        configurable: true,
        enumerable: false,
        get: function get() {
            return this.$mobx.values[propName].get();
        },
        set: function set(v) {
            return this.$mobx.values[propName].set(v);
        }
    });
}
function setPropertyValue(instance, name, newValue) {
    var adm = instance.$mobx;
    var observable = adm.values[name];
    // intercept
    if (hasInterceptors(adm)) {
        var change = interceptChange(adm, {
            type: "update",
            object: instance,
            name: name, newValue: newValue
        });
        if (!change) return;
        newValue = change.newValue;
    }
    newValue = observable.prepareNewValue(newValue);
    // notify spy & observers
    if (newValue !== UNCHANGED) {
        var notify = hasListeners(adm);
        var notifySpy = isSpyEnabled();
        var change = notify || notifySpy ? {
            type: "update",
            object: instance,
            oldValue: observable.value,
            name: name, newValue: newValue
        } : null;
        if (notifySpy) spyReportStart(change);
        observable.setNewValue(newValue);
        if (notify) notifyListeners(adm, change);
        if (notifySpy) spyReportEnd();
    }
}
function notifyPropertyAddition(adm, object, name, newValue) {
    var notify = hasListeners(adm);
    var notifySpy = isSpyEnabled();
    var change = notify || notifySpy ? {
        type: "add",
        object: object, name: name, newValue: newValue
    } : null;
    if (notifySpy) spyReportStart(change);
    if (notify) notifyListeners(adm, change);
    if (notifySpy) spyReportEnd();
}
var isObservableObjectAdministration = createInstanceofPredicate("ObservableObjectAdministration", ObservableObjectAdministration);
function isObservableObject(thing) {
    if (isObject(thing)) {
        // Initializers run lazily when transpiling to babel, so make sure they are run...
        runLazyInitializers(thing);
        return isObservableObjectAdministration(thing.$mobx);
    }
    return false;
}

/**
    * Returns true if the provided value is reactive.
    * @param value object, function or array
    * @param property if property is specified, checks whether value.property is reactive.
    */
function isObservable(value, property) {
    if (value === null || value === undefined) return false;
    if (property !== undefined) {
        if (isObservableArray(value) || isObservableMap(value)) throw new Error(getMessage("m019"));else if (isObservableObject(value)) {
            var o = value.$mobx;
            return o.values && !!o.values[property];
        }
        return false;
    }
    // For first check, see #701
    return isObservableObject(value) || !!value.$mobx || isAtom(value) || isReaction(value) || isComputedValue(value);
}

function createDecoratorForEnhancer(enhancer) {
    invariant(!!enhancer, ":(");
    return createClassPropertyDecorator(function (target, name, baseValue, _, baseDescriptor) {
        assertPropertyConfigurable(target, name);
        invariant(!baseDescriptor || !baseDescriptor.get, getMessage("m022"));
        var adm = asObservableObject(target, undefined);
        defineObservableProperty(adm, name, baseValue, enhancer);
    }, function (name) {
        var observable = this.$mobx.values[name];
        if (observable === undefined) return undefined;
        return observable.get();
    }, function (name, value) {
        setPropertyValue(this, name, value);
    }, true, false);
}

function extendObservable(target) {
    var properties = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        properties[_i - 1] = arguments[_i];
    }
    return extendObservableHelper(target, deepEnhancer, properties);
}
function extendShallowObservable(target) {
    var properties = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        properties[_i - 1] = arguments[_i];
    }
    return extendObservableHelper(target, referenceEnhancer, properties);
}
function extendObservableHelper(target, defaultEnhancer, properties) {
    invariant(arguments.length >= 2, getMessage("m014"));
    invariant(typeof target === "object", getMessage("m015"));
    invariant(!isObservableMap(target), getMessage("m016"));
    properties.forEach(function (propSet) {
        invariant(typeof propSet === "object", getMessage("m017"));
        invariant(!isObservable(propSet), getMessage("m018"));
    });
    var adm = asObservableObject(target);
    var definedProps = {};
    // Note could be optimised if properties.length === 1
    for (var i = properties.length - 1; i >= 0; i--) {
        var propSet = properties[i];
        for (var key in propSet) {
            if (definedProps[key] !== true && hasOwnProperty(propSet, key)) {
                definedProps[key] = true;
                if (target === propSet && !isPropertyConfigurable(target, key)) continue; // see #111, skip non-configurable or non-writable props for `observable(object)`.
                var descriptor = Object.getOwnPropertyDescriptor(propSet, key);
                defineObservablePropertyFromDescriptor(adm, key, descriptor, defaultEnhancer);
            }
        }
    }
    return target;
}

var deepDecorator = createDecoratorForEnhancer(deepEnhancer);
var shallowDecorator = createDecoratorForEnhancer(shallowEnhancer);
var refDecorator = createDecoratorForEnhancer(referenceEnhancer);
var deepStructDecorator = createDecoratorForEnhancer(deepStructEnhancer);
var refStructDecorator = createDecoratorForEnhancer(refStructEnhancer);
/**
 * Turns an object, array or function into a reactive structure.
 * @param v the value which should become observable.
 */
function createObservable(v) {
    if (v === void 0) {
        v = undefined;
    }
    // @observable someProp;
    if (typeof arguments[1] === "string") return deepDecorator.apply(null, arguments);
    invariant(arguments.length <= 1, getMessage("m021"));
    invariant(!isModifierDescriptor(v), getMessage("m020"));
    // it is an observable already, done
    if (isObservable(v)) return v;
    // something that can be converted and mutated?
    var res = deepEnhancer(v, undefined, undefined);
    // this value could be converted to a new observable data structure, return it
    if (res !== v) return res;
    // otherwise, just box it
    return observable.box(v);
}
var IObservableFactories = function () {
    function IObservableFactories() {}
    IObservableFactories.prototype.box = function (value, name) {
        if (arguments.length > 2) incorrectlyUsedAsDecorator("box");
        return new ObservableValue(value, deepEnhancer, name);
    };
    IObservableFactories.prototype.shallowBox = function (value, name) {
        if (arguments.length > 2) incorrectlyUsedAsDecorator("shallowBox");
        return new ObservableValue(value, referenceEnhancer, name);
    };
    IObservableFactories.prototype.array = function (initialValues, name) {
        if (arguments.length > 2) incorrectlyUsedAsDecorator("array");
        return new ObservableArray(initialValues, deepEnhancer, name);
    };
    IObservableFactories.prototype.shallowArray = function (initialValues, name) {
        if (arguments.length > 2) incorrectlyUsedAsDecorator("shallowArray");
        return new ObservableArray(initialValues, referenceEnhancer, name);
    };
    IObservableFactories.prototype.map = function (initialValues, name) {
        if (arguments.length > 2) incorrectlyUsedAsDecorator("map");
        return new ObservableMap(initialValues, deepEnhancer, name);
    };
    IObservableFactories.prototype.shallowMap = function (initialValues, name) {
        if (arguments.length > 2) incorrectlyUsedAsDecorator("shallowMap");
        return new ObservableMap(initialValues, referenceEnhancer, name);
    };
    IObservableFactories.prototype.object = function (props, name) {
        if (arguments.length > 2) incorrectlyUsedAsDecorator("object");
        var res = {};
        // convert to observable object
        asObservableObject(res, name);
        // add properties
        extendObservable(res, props);
        return res;
    };
    IObservableFactories.prototype.shallowObject = function (props, name) {
        if (arguments.length > 2) incorrectlyUsedAsDecorator("shallowObject");
        var res = {};
        asObservableObject(res, name);
        extendShallowObservable(res, props);
        return res;
    };
    IObservableFactories.prototype.ref = function () {
        if (arguments.length < 2) {
            // although ref creates actually a modifier descriptor, the type of the resultig properties
            // of the object is `T` in the end, when the descriptors are interpreted
            return createModifierDescriptor(referenceEnhancer, arguments[0]);
        } else {
            return refDecorator.apply(null, arguments);
        }
    };
    IObservableFactories.prototype.shallow = function () {
        if (arguments.length < 2) {
            // although ref creates actually a modifier descriptor, the type of the resultig properties
            // of the object is `T` in the end, when the descriptors are interpreted
            return createModifierDescriptor(shallowEnhancer, arguments[0]);
        } else {
            return shallowDecorator.apply(null, arguments);
        }
    };
    IObservableFactories.prototype.deep = function () {
        if (arguments.length < 2) {
            // although ref creates actually a modifier descriptor, the type of the resultig properties
            // of the object is `T` in the end, when the descriptors are interpreted
            return createModifierDescriptor(deepEnhancer, arguments[0]);
        } else {
            return deepDecorator.apply(null, arguments);
        }
    };
    IObservableFactories.prototype.struct = function () {
        if (arguments.length < 2) {
            // although ref creates actually a modifier descriptor, the type of the resultig properties
            // of the object is `T` in the end, when the descriptors are interpreted
            return createModifierDescriptor(deepStructEnhancer, arguments[0]);
        } else {
            return deepStructDecorator.apply(null, arguments);
        }
    };
    return IObservableFactories;
}();
var observable = createObservable;
// weird trick to keep our typings nicely with our funcs, and still extend the observable function
// ES6 class methods aren't enumerable, can't use Object.keys
Object.getOwnPropertyNames(IObservableFactories.prototype).filter(function (name) {
    return name !== "constructor";
}).forEach(function (name) {
    return observable[name] = IObservableFactories.prototype[name];
});
observable.deep.struct = observable.struct;
observable.ref.struct = function () {
    if (arguments.length < 2) {
        return createModifierDescriptor(refStructEnhancer, arguments[0]);
    } else {
        return refStructDecorator.apply(null, arguments);
    }
};
function incorrectlyUsedAsDecorator(methodName) {
    fail("Expected one or two arguments to observable." + methodName + ". Did you accidentally try to use observable." + methodName + " as decorator?");
}

function isModifierDescriptor(thing) {
    return typeof thing === "object" && thing !== null && thing.isMobxModifierDescriptor === true;
}
function createModifierDescriptor(enhancer, initialValue) {
    invariant(!isModifierDescriptor(initialValue), "Modifiers cannot be nested");
    return {
        isMobxModifierDescriptor: true,
        initialValue: initialValue,
        enhancer: enhancer
    };
}
function deepEnhancer(v, _, name) {
    if (isModifierDescriptor(v)) fail("You tried to assign a modifier wrapped value to a collection, please define modifiers when creating the collection, not when modifying it");
    // it is an observable already, done
    if (isObservable(v)) return v;
    // something that can be converted and mutated?
    if (Array.isArray(v)) return observable.array(v, name);
    if (isPlainObject(v)) return observable.object(v, name);
    if (isES6Map(v)) return observable.map(v, name);
    return v;
}
function shallowEnhancer(v, _, name) {
    if (isModifierDescriptor(v)) fail("You tried to assign a modifier wrapped value to a collection, please define modifiers when creating the collection, not when modifying it");
    if (v === undefined || v === null) return v;
    if (isObservableObject(v) || isObservableArray(v) || isObservableMap(v)) return v;
    if (Array.isArray(v)) return observable.shallowArray(v, name);
    if (isPlainObject(v)) return observable.shallowObject(v, name);
    if (isES6Map(v)) return observable.shallowMap(v, name);
    return fail("The shallow modifier / decorator can only used in combination with arrays, objects and maps");
}
function referenceEnhancer(newValue) {
    // never turn into an observable
    return newValue;
}
function deepStructEnhancer(v, oldValue, name) {
    // don't confuse structurally compare enhancer with ref enhancer! The latter is probably
    // more suited for immutable objects
    if (deepEqual(v, oldValue)) return oldValue;
    // it is an observable already, done
    if (isObservable(v)) return v;
    // something that can be converted and mutated?
    if (Array.isArray(v)) return new ObservableArray(v, deepStructEnhancer, name);
    if (isES6Map(v)) return new ObservableMap(v, deepStructEnhancer, name);
    if (isPlainObject(v)) {
        var res = {};
        asObservableObject(res, name);
        extendObservableHelper(res, deepStructEnhancer, [v]);
        return res;
    }
    return v;
}
function refStructEnhancer(v, oldValue, name) {
    if (deepEqual(v, oldValue)) return oldValue;
    return v;
}

/**
 * @deprecated
 * During a transaction no views are updated until the end of the transaction.
 * The transaction will be run synchronously nonetheless.
 *
 * Deprecated to simplify api; transactions offer no real benefit above actions.
 *
 * @param action a function that updates some reactive state
 * @returns any value that was returned by the 'action' parameter.
 */
function transaction(action, thisArg) {
    if (thisArg === void 0) {
        thisArg = undefined;
    }
    deprecated(getMessage("m023"));
    return runInTransaction.apply(undefined, arguments);
}
function runInTransaction(action, thisArg) {
    if (thisArg === void 0) {
        thisArg = undefined;
    }
    return executeAction("", action);
}

var ObservableMapMarker = {};
var ObservableMap = function () {
    function ObservableMap(initialData, enhancer, name) {
        if (enhancer === void 0) {
            enhancer = deepEnhancer;
        }
        if (name === void 0) {
            name = "ObservableMap@" + getNextId();
        }
        this.enhancer = enhancer;
        this.name = name;
        this.$mobx = ObservableMapMarker;
        this._data = Object.create(null);
        this._hasMap = Object.create(null); // hasMap, not hashMap >-).
        this._keys = new ObservableArray(undefined, referenceEnhancer, this.name + ".keys()", true);
        this.interceptors = null;
        this.changeListeners = null;
        this.dehancer = undefined;
        this.merge(initialData);
    }
    ObservableMap.prototype._has = function (key) {
        return typeof this._data[key] !== "undefined";
    };
    ObservableMap.prototype.has = function (key) {
        if (!this.isValidKey(key)) return false;
        key = "" + key;
        if (this._hasMap[key]) return this._hasMap[key].get();
        return this._updateHasMapEntry(key, false).get();
    };
    ObservableMap.prototype.set = function (key, value) {
        this.assertValidKey(key);
        key = "" + key;
        var hasKey = this._has(key);
        if (hasInterceptors(this)) {
            var change = interceptChange(this, {
                type: hasKey ? "update" : "add",
                object: this,
                newValue: value,
                name: key
            });
            if (!change) return this;
            value = change.newValue;
        }
        if (hasKey) {
            this._updateValue(key, value);
        } else {
            this._addValue(key, value);
        }
        return this;
    };
    ObservableMap.prototype.delete = function (key) {
        var _this = this;
        this.assertValidKey(key);
        key = "" + key;
        if (hasInterceptors(this)) {
            var change = interceptChange(this, {
                type: "delete",
                object: this,
                name: key
            });
            if (!change) return false;
        }
        if (this._has(key)) {
            var notifySpy = isSpyEnabled();
            var notify = hasListeners(this);
            var change = notify || notifySpy ? {
                type: "delete",
                object: this,
                oldValue: this._data[key].value,
                name: key
            } : null;
            if (notifySpy) spyReportStart(change);
            runInTransaction(function () {
                _this._keys.remove(key);
                _this._updateHasMapEntry(key, false);
                var observable$$1 = _this._data[key];
                observable$$1.setNewValue(undefined);
                _this._data[key] = undefined;
            });
            if (notify) notifyListeners(this, change);
            if (notifySpy) spyReportEnd();
            return true;
        }
        return false;
    };
    ObservableMap.prototype._updateHasMapEntry = function (key, value) {
        // optimization; don't fill the hasMap if we are not observing, or remove entry if there are no observers anymore
        var entry = this._hasMap[key];
        if (entry) {
            entry.setNewValue(value);
        } else {
            entry = this._hasMap[key] = new ObservableValue(value, referenceEnhancer, this.name + "." + key + "?", false);
        }
        return entry;
    };
    ObservableMap.prototype._updateValue = function (name, newValue) {
        var observable$$1 = this._data[name];
        newValue = observable$$1.prepareNewValue(newValue);
        if (newValue !== UNCHANGED) {
            var notifySpy = isSpyEnabled();
            var notify = hasListeners(this);
            var change = notify || notifySpy ? {
                type: "update",
                object: this,
                oldValue: observable$$1.value,
                name: name, newValue: newValue
            } : null;
            if (notifySpy) spyReportStart(change);
            observable$$1.setNewValue(newValue);
            if (notify) notifyListeners(this, change);
            if (notifySpy) spyReportEnd();
        }
    };
    ObservableMap.prototype._addValue = function (name, newValue) {
        var _this = this;
        runInTransaction(function () {
            var observable$$1 = _this._data[name] = new ObservableValue(newValue, _this.enhancer, _this.name + "." + name, false);
            newValue = observable$$1.value; // value might have been changed
            _this._updateHasMapEntry(name, true);
            _this._keys.push(name);
        });
        var notifySpy = isSpyEnabled();
        var notify = hasListeners(this);
        var change = notify || notifySpy ? {
            type: "add",
            object: this,
            name: name,
            newValue: newValue
        } : null;
        if (notifySpy) spyReportStart(change);
        if (notify) notifyListeners(this, change);
        if (notifySpy) spyReportEnd();
    };
    ObservableMap.prototype.get = function (key) {
        key = "" + key;
        if (this.has(key)) return this.dehanceValue(this._data[key].get());
        return this.dehanceValue(undefined);
    };
    ObservableMap.prototype.dehanceValue = function (value) {
        if (this.dehancer !== undefined) {
            return this.dehancer(value);
        }
        return value;
    };
    ObservableMap.prototype.keys = function () {
        return arrayAsIterator(this._keys.slice());
    };
    ObservableMap.prototype.values = function () {
        return arrayAsIterator(this._keys.map(this.get, this));
    };
    ObservableMap.prototype.entries = function () {
        var _this = this;
        return arrayAsIterator(this._keys.map(function (key) {
            return [key, _this.get(key)];
        }));
    };
    ObservableMap.prototype.forEach = function (callback, thisArg) {
        var _this = this;
        this.keys().forEach(function (key) {
            return callback.call(thisArg, _this.get(key), key, _this);
        });
    };
    /** Merge another object into this object, returns this. */
    ObservableMap.prototype.merge = function (other) {
        var _this = this;
        if (isObservableMap(other)) {
            other = other.toJS();
        }
        runInTransaction(function () {
            if (isPlainObject(other)) Object.keys(other).forEach(function (key) {
                return _this.set(key, other[key]);
            });else if (Array.isArray(other)) other.forEach(function (_a) {
                var key = _a[0],
                    value = _a[1];
                return _this.set(key, value);
            });else if (isES6Map(other)) other.forEach(function (value, key) {
                return _this.set(key, value);
            });else if (other !== null && other !== undefined) fail("Cannot initialize map from " + other);
        });
        return this;
    };
    ObservableMap.prototype.clear = function () {
        var _this = this;
        runInTransaction(function () {
            untracked(function () {
                _this.keys().forEach(_this.delete, _this);
            });
        });
    };
    ObservableMap.prototype.replace = function (values) {
        var _this = this;
        runInTransaction(function () {
            _this.clear();
            _this.merge(values);
        });
        return this;
    };
    Object.defineProperty(ObservableMap.prototype, "size", {
        get: function get() {
            return this._keys.length;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Returns a shallow non observable object clone of this map.
     * Note that the values might still be observable. For a deep clone use mobx.toJS.
     */
    ObservableMap.prototype.toJS = function () {
        var _this = this;
        var res = {};
        this.keys().forEach(function (key) {
            return res[key] = _this.get(key);
        });
        return res;
    };
    ObservableMap.prototype.toJSON = function () {
        // Used by JSON.stringify
        return this.toJS();
    };
    ObservableMap.prototype.isValidKey = function (key) {
        if (key === null || key === undefined) return false;
        if (typeof key === "string" || typeof key === "number" || typeof key === "boolean") return true;
        return false;
    };
    ObservableMap.prototype.assertValidKey = function (key) {
        if (!this.isValidKey(key)) throw new Error("[mobx.map] Invalid key: '" + key + "', only strings, numbers and booleans are accepted as key in observable maps.");
    };
    ObservableMap.prototype.toString = function () {
        var _this = this;
        return this.name + "[{ " + this.keys().map(function (key) {
            return key + ": " + ("" + _this.get(key));
        }).join(", ") + " }]";
    };
    /**
     * Observes this object. Triggers for the events 'add', 'update' and 'delete'.
     * See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/observe
     * for callback details
     */
    ObservableMap.prototype.observe = function (listener, fireImmediately) {
        invariant(fireImmediately !== true, getMessage("m033"));
        return registerListener(this, listener);
    };
    ObservableMap.prototype.intercept = function (handler) {
        return registerInterceptor(this, handler);
    };
    return ObservableMap;
}();
declareIterator(ObservableMap.prototype, function () {
    return this.entries();
});
function map(initialValues) {
    deprecated("`mobx.map` is deprecated, use `new ObservableMap` or `mobx.observable.map` instead");
    return observable.map(initialValues);
}
/* 'var' fixes small-build issue */
var isObservableMap = createInstanceofPredicate("ObservableMap", ObservableMap);

var EMPTY_ARRAY = [];
Object.freeze(EMPTY_ARRAY);
function getGlobal() {
    return typeof window !== 'undefined' ? window : global;
}
function getNextId() {
    return ++globalState.mobxGuid;
}
function fail(message, thing) {
    invariant(false, message, thing);
    throw "X"; // unreachable
}
function invariant(check, message, thing) {
    if (!check) throw new Error("[mobx] Invariant failed: " + message + (thing ? " in '" + thing + "'" : ""));
}
/**
 * Prints a deprecation message, but only one time.
 * Returns false if the deprecated message was already printed before
 */
var deprecatedMessages = [];
function deprecated(msg) {
    if (deprecatedMessages.indexOf(msg) !== -1) return false;
    deprecatedMessages.push(msg);
    console.error("[mobx] Deprecated: " + msg);
    return true;
}
/**
 * Makes sure that the provided function is invoked at most once.
 */
function once(func) {
    var invoked = false;
    return function () {
        if (invoked) return;
        invoked = true;
        return func.apply(this, arguments);
    };
}
var noop = function noop() {};
function unique(list) {
    var res = [];
    list.forEach(function (item) {
        if (res.indexOf(item) === -1) res.push(item);
    });
    return res;
}
function joinStrings(things, limit, separator) {
    if (limit === void 0) {
        limit = 100;
    }
    if (separator === void 0) {
        separator = " - ";
    }
    if (!things) return "";
    var sliced = things.slice(0, limit);
    return "" + sliced.join(separator) + (things.length > limit ? " (... and " + (things.length - limit) + "more)" : "");
}
function isObject(value) {
    return value !== null && typeof value === "object";
}
function isPlainObject(value) {
    if (value === null || typeof value !== "object") return false;
    var proto = Object.getPrototypeOf(value);
    return proto === Object.prototype || proto === null;
}
function objectAssign() {
    var res = arguments[0];
    for (var i = 1, l = arguments.length; i < l; i++) {
        var source = arguments[i];
        for (var key in source) {
            if (hasOwnProperty(source, key)) {
                res[key] = source[key];
            }
        }
    }
    return res;
}
var prototypeHasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwnProperty(object, propName) {
    return prototypeHasOwnProperty.call(object, propName);
}
function makeNonEnumerable(object, propNames) {
    for (var i = 0; i < propNames.length; i++) {
        addHiddenProp(object, propNames[i], object[propNames[i]]);
    }
}
function addHiddenProp(object, propName, value) {
    Object.defineProperty(object, propName, {
        enumerable: false,
        writable: true,
        configurable: true,
        value: value
    });
}
function addHiddenFinalProp(object, propName, value) {
    Object.defineProperty(object, propName, {
        enumerable: false,
        writable: false,
        configurable: true,
        value: value
    });
}
function isPropertyConfigurable(object, prop) {
    var descriptor = Object.getOwnPropertyDescriptor(object, prop);
    return !descriptor || descriptor.configurable !== false && descriptor.writable !== false;
}
function assertPropertyConfigurable(object, prop) {
    invariant(isPropertyConfigurable(object, prop), "Cannot make property '" + prop + "' observable, it is not configurable and writable in the target object");
}
function getEnumerableKeys(obj) {
    var res = [];
    for (var key in obj) {
        res.push(key);
    }return res;
}
/**
 * Naive deepEqual. Doesn't check for prototype, non-enumerable or out-of-range properties on arrays.
 * If you have such a case, you probably should use this function but something fancier :).
 */
function deepEqual(a, b) {
    if (a === null && b === null) return true;
    if (a === undefined && b === undefined) return true;
    if (typeof a !== "object") return a === b;
    var aIsArray = isArrayLike(a);
    var aIsMap = isMapLike(a);
    if (aIsArray !== isArrayLike(b)) {
        return false;
    } else if (aIsMap !== isMapLike(b)) {
        return false;
    } else if (aIsArray) {
        if (a.length !== b.length) return false;
        for (var i = a.length - 1; i >= 0; i--) {
            if (!deepEqual(a[i], b[i])) return false;
        }return true;
    } else if (aIsMap) {
        if (a.size !== b.size) return false;
        var equals_1 = true;
        a.forEach(function (value, key) {
            equals_1 = equals_1 && deepEqual(b.get(key), value);
        });
        return equals_1;
    } else if (typeof a === "object" && typeof b === "object") {
        if (a === null || b === null) return false;
        if (isMapLike(a) && isMapLike(b)) {
            if (a.size !== b.size) return false;
            // Freaking inefficient.... Create PR if you run into this :) Much appreciated!
            return deepEqual(observable.shallowMap(a).entries(), observable.shallowMap(b).entries());
        }
        if (getEnumerableKeys(a).length !== getEnumerableKeys(b).length) return false;
        for (var prop in a) {
            if (!(prop in b)) return false;
            if (!deepEqual(a[prop], b[prop])) return false;
        }
        return true;
    }
    return false;
}
function createInstanceofPredicate(name, clazz) {
    var propName = "isMobX" + name;
    clazz.prototype[propName] = true;
    return function (x) {
        return isObject(x) && x[propName] === true;
    };
}
/**
 * Returns whether the argument is an array, disregarding observability.
 */
function isArrayLike(x) {
    return Array.isArray(x) || isObservableArray(x);
}
function isMapLike(x) {
    return isES6Map(x) || isObservableMap(x);
}
function isES6Map(thing) {
    if (getGlobal().Map !== undefined && thing instanceof getGlobal().Map) return true;
    return false;
}
function primitiveSymbol() {
    return typeof Symbol === "function" && Symbol.toPrimitive || "@@toPrimitive";
}
function toPrimitive(value) {
    return value === null ? null : typeof value === "object" ? "" + value : value;
}

/**
 * These values will persist if global state is reset
 */
var persistentKeys = ["mobxGuid", "resetId", "spyListeners", "strictMode", "runId"];
var MobXGlobals = function () {
    function MobXGlobals() {
        /**
         * MobXGlobals version.
         * MobX compatiblity with other versions loaded in memory as long as this version matches.
         * It indicates that the global state still stores similar information
         */
        this.version = 5;
        /**
         * Currently running derivation
         */
        this.trackingDerivation = null;
        /**
         * Are we running a computation currently? (not a reaction)
         */
        this.computationDepth = 0;
        /**
         * Each time a derivation is tracked, it is assigned a unique run-id
         */
        this.runId = 0;
        /**
         * 'guid' for general purpose. Will be persisted amongst resets.
         */
        this.mobxGuid = 0;
        /**
         * Are we in a batch block? (and how many of them)
         */
        this.inBatch = 0;
        /**
         * Observables that don't have observers anymore, and are about to be
         * suspended, unless somebody else accesses it in the same batch
         *
         * @type {IObservable[]}
         */
        this.pendingUnobservations = [];
        /**
         * List of scheduled, not yet executed, reactions.
         */
        this.pendingReactions = [];
        /**
         * Are we currently processing reactions?
         */
        this.isRunningReactions = false;
        /**
         * Is it allowed to change observables at this point?
         * In general, MobX doesn't allow that when running computations and React.render.
         * To ensure that those functions stay pure.
         */
        this.allowStateChanges = true;
        /**
         * If strict mode is enabled, state changes are by default not allowed
         */
        this.strictMode = false;
        /**
         * Used by createTransformer to detect that the global state has been reset.
         */
        this.resetId = 0;
        /**
         * Spy callbacks
         */
        this.spyListeners = [];
        /**
         * Globally attached error handlers that react specifically to errors in reactions
         */
        this.globalReactionErrorHandlers = [];
    }
    return MobXGlobals;
}();
var globalState = new MobXGlobals();
var shareGlobalStateCalled = false;
var runInIsolationCalled = false;
var warnedAboutMultipleInstances = false;
{
    var global_1 = getGlobal();
    if (!global_1.__mobxInstanceCount) {
        global_1.__mobxInstanceCount = 1;
    } else {
        global_1.__mobxInstanceCount++;
        setTimeout(function () {
            if (!shareGlobalStateCalled && !runInIsolationCalled && !warnedAboutMultipleInstances) {
                warnedAboutMultipleInstances = true;
                console.warn("[mobx] Warning: there are multiple mobx instances active. This might lead to unexpected results. See https://github.com/mobxjs/mobx/issues/1082 for details.");
            }
        });
    }
}
function isolateGlobalState() {
    runInIsolationCalled = true;
    getGlobal().__mobxInstanceCount--;
}
function shareGlobalState() {
    // TODO: remove in 4.0; just use peer dependencies instead.
    deprecated("Using `shareGlobalState` is not recommended, use peer dependencies instead. See https://github.com/mobxjs/mobx/issues/1082 for details.");
    shareGlobalStateCalled = true;
    var global = getGlobal();
    var ownState = globalState;
    /**
     * Backward compatibility check
     */
    if (global.__mobservableTrackingStack || global.__mobservableViewStack) throw new Error("[mobx] An incompatible version of mobservable is already loaded.");
    if (global.__mobxGlobal && global.__mobxGlobal.version !== ownState.version) throw new Error("[mobx] An incompatible version of mobx is already loaded.");
    if (global.__mobxGlobal) globalState = global.__mobxGlobal;else global.__mobxGlobal = ownState;
}
function getGlobalState() {
    return globalState;
}

/**
 * For testing purposes only; this will break the internal state of existing observables,
 * but can be used to get back at a stable state after throwing errors
 */
function resetGlobalState() {
    globalState.resetId++;
    var defaultGlobals = new MobXGlobals();
    for (var key in defaultGlobals) {
        if (persistentKeys.indexOf(key) === -1) globalState[key] = defaultGlobals[key];
    }globalState.allowStateChanges = !globalState.strictMode;
}

function hasObservers(observable) {
    return observable.observers && observable.observers.length > 0;
}
function getObservers(observable) {
    return observable.observers;
}
function addObserver(observable, node) {
    // invariant(node.dependenciesState !== -1, "INTERNAL ERROR, can add only dependenciesState !== -1");
    // invariant(observable._observers.indexOf(node) === -1, "INTERNAL ERROR add already added node");
    // invariantObservers(observable);
    var l = observable.observers.length;
    if (l) {
        observable.observersIndexes[node.__mapid] = l;
    }
    observable.observers[l] = node;
    if (observable.lowestObserverState > node.dependenciesState) observable.lowestObserverState = node.dependenciesState;
    // invariantObservers(observable);
    // invariant(observable._observers.indexOf(node) !== -1, "INTERNAL ERROR didn't add node");
}
function removeObserver(observable, node) {
    // invariant(globalState.inBatch > 0, "INTERNAL ERROR, remove should be called only inside batch");
    // invariant(observable._observers.indexOf(node) !== -1, "INTERNAL ERROR remove already removed node");
    // invariantObservers(observable);
    if (observable.observers.length === 1) {
        // deleting last observer
        observable.observers.length = 0;
        queueForUnobservation(observable);
    } else {
        // deleting from _observersIndexes is straight forward, to delete from _observers, let's swap `node` with last element
        var list = observable.observers;
        var map = observable.observersIndexes;
        var filler = list.pop(); // get last element, which should fill the place of `node`, so the array doesn't have holes
        if (filler !== node) {
            var index = map[node.__mapid] || 0; // getting index of `node`. this is the only place we actually use map.
            if (index) {
                map[filler.__mapid] = index;
            } else {
                delete map[filler.__mapid];
            }
            list[index] = filler;
        }
        delete map[node.__mapid];
    }
    // invariantObservers(observable);
    // invariant(observable._observers.indexOf(node) === -1, "INTERNAL ERROR remove already removed node2");
}
function queueForUnobservation(observable) {
    if (!observable.isPendingUnobservation) {
        // invariant(globalState.inBatch > 0, "INTERNAL ERROR, remove should be called only inside batch");
        // invariant(observable._observers.length === 0, "INTERNAL ERROR, should only queue for unobservation unobserved observables");
        observable.isPendingUnobservation = true;
        globalState.pendingUnobservations.push(observable);
    }
}
/**
 * Batch starts a transaction, at least for purposes of memoizing ComputedValues when nothing else does.
 * During a batch `onBecomeUnobserved` will be called at most once per observable.
 * Avoids unnecessary recalculations.
 */
function startBatch() {
    globalState.inBatch++;
}
function endBatch() {
    if (--globalState.inBatch === 0) {
        runReactions();
        // the batch is actually about to finish, all unobserving should happen here.
        var list = globalState.pendingUnobservations;
        for (var i = 0; i < list.length; i++) {
            var observable = list[i];
            observable.isPendingUnobservation = false;
            if (observable.observers.length === 0) {
                observable.onBecomeUnobserved();
                // NOTE: onBecomeUnobserved might push to `pendingUnobservations`
            }
        }
        globalState.pendingUnobservations = [];
    }
}
function reportObserved(observable) {
    var derivation = globalState.trackingDerivation;
    if (derivation !== null) {
        /**
         * Simple optimization, give each derivation run an unique id (runId)
         * Check if last time this observable was accessed the same runId is used
         * if this is the case, the relation is already known
         */
        if (derivation.runId !== observable.lastAccessedBy) {
            observable.lastAccessedBy = derivation.runId;
            derivation.newObserving[derivation.unboundDepsCount++] = observable;
        }
    } else if (observable.observers.length === 0) {
        queueForUnobservation(observable);
    }
}
/**
 * NOTE: current propagation mechanism will in case of self reruning autoruns behave unexpectedly
 * It will propagate changes to observers from previous run
 * It's hard or maybe impossible (with reasonable perf) to get it right with current approach
 * Hopefully self reruning autoruns aren't a feature people should depend on
 * Also most basic use cases should be ok
 */
// Called by Atom when its value changes
function propagateChanged(observable) {
    // invariantLOS(observable, "changed start");
    if (observable.lowestObserverState === IDerivationState.STALE) return;
    observable.lowestObserverState = IDerivationState.STALE;
    var observers = observable.observers;
    var i = observers.length;
    while (i--) {
        var d = observers[i];
        if (d.dependenciesState === IDerivationState.UP_TO_DATE) d.onBecomeStale();
        d.dependenciesState = IDerivationState.STALE;
    }
    // invariantLOS(observable, "changed end");
}
// Called by ComputedValue when it recalculate and its value changed
function propagateChangeConfirmed(observable) {
    // invariantLOS(observable, "confirmed start");
    if (observable.lowestObserverState === IDerivationState.STALE) return;
    observable.lowestObserverState = IDerivationState.STALE;
    var observers = observable.observers;
    var i = observers.length;
    while (i--) {
        var d = observers[i];
        if (d.dependenciesState === IDerivationState.POSSIBLY_STALE) d.dependenciesState = IDerivationState.STALE;else if (d.dependenciesState === IDerivationState.UP_TO_DATE) observable.lowestObserverState = IDerivationState.UP_TO_DATE;
    }
    // invariantLOS(observable, "confirmed end");
}
// Used by computed when its dependency changed, but we don't wan't to immediately recompute.
function propagateMaybeChanged(observable) {
    // invariantLOS(observable, "maybe start");
    if (observable.lowestObserverState !== IDerivationState.UP_TO_DATE) return;
    observable.lowestObserverState = IDerivationState.POSSIBLY_STALE;
    var observers = observable.observers;
    var i = observers.length;
    while (i--) {
        var d = observers[i];
        if (d.dependenciesState === IDerivationState.UP_TO_DATE) {
            d.dependenciesState = IDerivationState.POSSIBLY_STALE;
            d.onBecomeStale();
        }
    }
    // invariantLOS(observable, "maybe end");
}

var IDerivationState;
(function (IDerivationState) {
    // before being run or (outside batch and not being observed)
    // at this point derivation is not holding any data about dependency tree
    IDerivationState[IDerivationState["NOT_TRACKING"] = -1] = "NOT_TRACKING";
    // no shallow dependency changed since last computation
    // won't recalculate derivation
    // this is what makes mobx fast
    IDerivationState[IDerivationState["UP_TO_DATE"] = 0] = "UP_TO_DATE";
    // some deep dependency changed, but don't know if shallow dependency changed
    // will require to check first if UP_TO_DATE or POSSIBLY_STALE
    // currently only ComputedValue will propagate POSSIBLY_STALE
    //
    // having this state is second big optimization:
    // don't have to recompute on every dependency change, but only when it's needed
    IDerivationState[IDerivationState["POSSIBLY_STALE"] = 1] = "POSSIBLY_STALE";
    // A shallow dependency has changed since last computation and the derivation
    // will need to recompute when it's needed next.
    IDerivationState[IDerivationState["STALE"] = 2] = "STALE";
})(IDerivationState || (IDerivationState = {}));
var CaughtException = function () {
    function CaughtException(cause) {
        this.cause = cause;
        // Empty
    }
    return CaughtException;
}();
function isCaughtException(e) {
    return e instanceof CaughtException;
}
/**
 * Finds out whether any dependency of the derivation has actually changed.
 * If dependenciesState is 1 then it will recalculate dependencies,
 * if any dependency changed it will propagate it by changing dependenciesState to 2.
 *
 * By iterating over the dependencies in the same order that they were reported and
 * stopping on the first change, all the recalculations are only called for ComputedValues
 * that will be tracked by derivation. That is because we assume that if the first x
 * dependencies of the derivation doesn't change then the derivation should run the same way
 * up until accessing x-th dependency.
 */
function shouldCompute(derivation) {
    switch (derivation.dependenciesState) {
        case IDerivationState.UP_TO_DATE:
            return false;
        case IDerivationState.NOT_TRACKING:
        case IDerivationState.STALE:
            return true;
        case IDerivationState.POSSIBLY_STALE:
            {
                var prevUntracked = untrackedStart(); // no need for those computeds to be reported, they will be picked up in trackDerivedFunction.
                var obs = derivation.observing,
                    l = obs.length;
                for (var i = 0; i < l; i++) {
                    var obj = obs[i];
                    if (isComputedValue(obj)) {
                        try {
                            obj.get();
                        } catch (e) {
                            // we are not interested in the value *or* exception at this moment, but if there is one, notify all
                            untrackedEnd(prevUntracked);
                            return true;
                        }
                        // if ComputedValue `obj` actually changed it will be computed and propagated to its observers.
                        // and `derivation` is an observer of `obj`
                        if (derivation.dependenciesState === IDerivationState.STALE) {
                            untrackedEnd(prevUntracked);
                            return true;
                        }
                    }
                }
                changeDependenciesStateTo0(derivation);
                untrackedEnd(prevUntracked);
                return false;
            }
    }
}
function isComputingDerivation() {
    return globalState.trackingDerivation !== null; // filter out actions inside computations
}
function checkIfStateModificationsAreAllowed(atom) {
    var hasObservers$$1 = atom.observers.length > 0;
    // Should never be possible to change an observed observable from inside computed, see #798
    if (globalState.computationDepth > 0 && hasObservers$$1) fail(getMessage("m031") + atom.name);
    // Should not be possible to change observed state outside strict mode, except during initialization, see #563
    if (!globalState.allowStateChanges && hasObservers$$1) fail(getMessage(globalState.strictMode ? "m030a" : "m030b") + atom.name);
}
/**
 * Executes the provided function `f` and tracks which observables are being accessed.
 * The tracking information is stored on the `derivation` object and the derivation is registered
 * as observer of any of the accessed observables.
 */
function trackDerivedFunction(derivation, f, context) {
    // pre allocate array allocation + room for variation in deps
    // array will be trimmed by bindDependencies
    changeDependenciesStateTo0(derivation);
    derivation.newObserving = new Array(derivation.observing.length + 100);
    derivation.unboundDepsCount = 0;
    derivation.runId = ++globalState.runId;
    var prevTracking = globalState.trackingDerivation;
    globalState.trackingDerivation = derivation;
    var result;
    try {
        result = f.call(context);
    } catch (e) {
        result = new CaughtException(e);
    }
    globalState.trackingDerivation = prevTracking;
    bindDependencies(derivation);
    return result;
}
/**
 * diffs newObserving with observing.
 * update observing to be newObserving with unique observables
 * notify observers that become observed/unobserved
 */
function bindDependencies(derivation) {
    // invariant(derivation.dependenciesState !== IDerivationState.NOT_TRACKING, "INTERNAL ERROR bindDependencies expects derivation.dependenciesState !== -1");
    var prevObserving = derivation.observing;
    var observing = derivation.observing = derivation.newObserving;
    var lowestNewObservingDerivationState = IDerivationState.UP_TO_DATE;
    derivation.newObserving = null; // newObserving shouldn't be needed outside tracking
    // Go through all new observables and check diffValue: (this list can contain duplicates):
    //   0: first occurrence, change to 1 and keep it
    //   1: extra occurrence, drop it
    var i0 = 0,
        l = derivation.unboundDepsCount;
    for (var i = 0; i < l; i++) {
        var dep = observing[i];
        if (dep.diffValue === 0) {
            dep.diffValue = 1;
            if (i0 !== i) observing[i0] = dep;
            i0++;
        }
        // Upcast is 'safe' here, because if dep is IObservable, `dependenciesState` will be undefined,
        // not hitting the condition
        if (dep.dependenciesState > lowestNewObservingDerivationState) {
            lowestNewObservingDerivationState = dep.dependenciesState;
        }
    }
    observing.length = i0;
    // Go through all old observables and check diffValue: (it is unique after last bindDependencies)
    //   0: it's not in new observables, unobserve it
    //   1: it keeps being observed, don't want to notify it. change to 0
    l = prevObserving.length;
    while (l--) {
        var dep = prevObserving[l];
        if (dep.diffValue === 0) {
            removeObserver(dep, derivation);
        }
        dep.diffValue = 0;
    }
    // Go through all new observables and check diffValue: (now it should be unique)
    //   0: it was set to 0 in last loop. don't need to do anything.
    //   1: it wasn't observed, let's observe it. set back to 0
    while (i0--) {
        var dep = observing[i0];
        if (dep.diffValue === 1) {
            dep.diffValue = 0;
            addObserver(dep, derivation);
        }
    }
    // Some new observed derivations might become stale during this derivation computation
    // so say had no chance to propagate staleness (#916)
    if (lowestNewObservingDerivationState !== IDerivationState.UP_TO_DATE) {
        derivation.dependenciesState = lowestNewObservingDerivationState;
        derivation.onBecomeStale();
    }
}
function clearObserving(derivation) {
    // invariant(globalState.inBatch > 0, "INTERNAL ERROR clearObserving should be called only inside batch");
    var obs = derivation.observing;
    derivation.observing = [];
    var i = obs.length;
    while (i--) {
        removeObserver(obs[i], derivation);
    }derivation.dependenciesState = IDerivationState.NOT_TRACKING;
}
function untracked(action) {
    var prev = untrackedStart();
    var res = action();
    untrackedEnd(prev);
    return res;
}
function untrackedStart() {
    var prev = globalState.trackingDerivation;
    globalState.trackingDerivation = null;
    return prev;
}
function untrackedEnd(prev) {
    globalState.trackingDerivation = prev;
}
/**
 * needed to keep `lowestObserverState` correct. when changing from (2 or 1) to 0
 *
 */
function changeDependenciesStateTo0(derivation) {
    if (derivation.dependenciesState === IDerivationState.UP_TO_DATE) return;
    derivation.dependenciesState = IDerivationState.UP_TO_DATE;
    var obs = derivation.observing;
    var i = obs.length;
    while (i--) {
        obs[i].lowestObserverState = IDerivationState.UP_TO_DATE;
    }
}

var Reaction = function () {
    function Reaction(name, onInvalidate) {
        if (name === void 0) {
            name = "Reaction@" + getNextId();
        }
        this.name = name;
        this.onInvalidate = onInvalidate;
        this.observing = []; // nodes we are looking at. Our value depends on these nodes
        this.newObserving = [];
        this.dependenciesState = IDerivationState.NOT_TRACKING;
        this.diffValue = 0;
        this.runId = 0;
        this.unboundDepsCount = 0;
        this.__mapid = "#" + getNextId();
        this.isDisposed = false;
        this._isScheduled = false;
        this._isTrackPending = false;
        this._isRunning = false;
    }
    Reaction.prototype.onBecomeStale = function () {
        this.schedule();
    };
    Reaction.prototype.schedule = function () {
        if (!this._isScheduled) {
            this._isScheduled = true;
            globalState.pendingReactions.push(this);
            runReactions();
        }
    };
    Reaction.prototype.isScheduled = function () {
        return this._isScheduled;
    };
    /**
     * internal, use schedule() if you intend to kick off a reaction
     */
    Reaction.prototype.runReaction = function () {
        if (!this.isDisposed) {
            startBatch();
            this._isScheduled = false;
            if (shouldCompute(this)) {
                this._isTrackPending = true;
                this.onInvalidate();
                if (this._isTrackPending && isSpyEnabled()) {
                    // onInvalidate didn't trigger track right away..
                    spyReport({
                        object: this,
                        type: "scheduled-reaction"
                    });
                }
            }
            endBatch();
        }
    };
    Reaction.prototype.track = function (fn) {
        startBatch();
        var notify = isSpyEnabled();
        var startTime;
        if (notify) {
            startTime = Date.now();
            spyReportStart({
                object: this,
                type: "reaction",
                fn: fn
            });
        }
        this._isRunning = true;
        var result = trackDerivedFunction(this, fn, undefined);
        this._isRunning = false;
        this._isTrackPending = false;
        if (this.isDisposed) {
            // disposed during last run. Clean up everything that was bound after the dispose call.
            clearObserving(this);
        }
        if (isCaughtException(result)) this.reportExceptionInDerivation(result.cause);
        if (notify) {
            spyReportEnd({
                time: Date.now() - startTime
            });
        }
        endBatch();
    };
    Reaction.prototype.reportExceptionInDerivation = function (error) {
        var _this = this;
        if (this.errorHandler) {
            this.errorHandler(error, this);
            return;
        }
        var message = "[mobx] Encountered an uncaught exception that was thrown by a reaction or observer component, in: '" + this;
        var messageToUser = getMessage("m037");
        console.error(message || messageToUser /* latter will not be true, make sure uglify doesn't remove */, error);
        /** If debugging brought you here, please, read the above message :-). Tnx! */
        if (isSpyEnabled()) {
            spyReport({
                type: "error",
                message: message,
                error: error,
                object: this
            });
        }
        globalState.globalReactionErrorHandlers.forEach(function (f) {
            return f(error, _this);
        });
    };
    Reaction.prototype.dispose = function () {
        if (!this.isDisposed) {
            this.isDisposed = true;
            if (!this._isRunning) {
                // if disposed while running, clean up later. Maybe not optimal, but rare case
                startBatch();
                clearObserving(this);
                endBatch();
            }
        }
    };
    Reaction.prototype.getDisposer = function () {
        var r = this.dispose.bind(this);
        r.$mobx = this;
        r.onError = registerErrorHandler;
        return r;
    };
    Reaction.prototype.toString = function () {
        return "Reaction[" + this.name + "]";
    };
    Reaction.prototype.whyRun = function () {
        var observing = unique(this._isRunning ? this.newObserving : this.observing).map(function (dep) {
            return dep.name;
        });
        return "\nWhyRun? reaction '" + this.name + "':\n * Status: [" + (this.isDisposed ? "stopped" : this._isRunning ? "running" : this.isScheduled() ? "scheduled" : "idle") + "]\n * This reaction will re-run if any of the following observables changes:\n    " + joinStrings(observing) + "\n    " + (this._isRunning ? " (... or any observable accessed during the remainder of the current run)" : "") + "\n\t" + getMessage("m038") + "\n";
    };
    return Reaction;
}();
function registerErrorHandler(handler) {
    invariant(this && this.$mobx && isReaction(this.$mobx), "Invalid `this`");
    invariant(!this.$mobx.errorHandler, "Only one onErrorHandler can be registered");
    this.$mobx.errorHandler = handler;
}
function onReactionError(handler) {
    globalState.globalReactionErrorHandlers.push(handler);
    return function () {
        var idx = globalState.globalReactionErrorHandlers.indexOf(handler);
        if (idx >= 0) globalState.globalReactionErrorHandlers.splice(idx, 1);
    };
}
/**
 * Magic number alert!
 * Defines within how many times a reaction is allowed to re-trigger itself
 * until it is assumed that this is gonna be a never ending loop...
 */
var MAX_REACTION_ITERATIONS = 100;
var reactionScheduler = function reactionScheduler(f) {
    return f();
};
function runReactions() {
    // Trampolining, if runReactions are already running, new reactions will be picked up
    if (globalState.inBatch > 0 || globalState.isRunningReactions) return;
    reactionScheduler(runReactionsHelper);
}
function runReactionsHelper() {
    globalState.isRunningReactions = true;
    var allReactions = globalState.pendingReactions;
    var iterations = 0;
    // While running reactions, new reactions might be triggered.
    // Hence we work with two variables and check whether
    // we converge to no remaining reactions after a while.
    while (allReactions.length > 0) {
        if (++iterations === MAX_REACTION_ITERATIONS) {
            console.error("Reaction doesn't converge to a stable state after " + MAX_REACTION_ITERATIONS + " iterations." + (" Probably there is a cycle in the reactive function: " + allReactions[0]));
            allReactions.splice(0); // clear reactions
        }
        var remainingReactions = allReactions.splice(0);
        for (var i = 0, l = remainingReactions.length; i < l; i++) {
            remainingReactions[i].runReaction();
        }
    }
    globalState.isRunningReactions = false;
}
var isReaction = createInstanceofPredicate("Reaction", Reaction);
function setReactionScheduler(fn) {
    var baseScheduler = reactionScheduler;
    reactionScheduler = function reactionScheduler(f) {
        return fn(function () {
            return baseScheduler(f);
        });
    };
}

function asReference(value) {
    deprecated("asReference is deprecated, use observable.ref instead");
    return observable.ref(value);
}
function asStructure(value) {
    deprecated("asStructure is deprecated. Use observable.struct, computed.struct or reaction options instead.");
    return observable.struct(value);
}
function asFlat(value) {
    deprecated("asFlat is deprecated, use observable.shallow instead");
    return observable.shallow(value);
}
function asMap(data) {
    deprecated("asMap is deprecated, use observable.map or observable.shallowMap instead");
    return observable.map(data || {});
}

function createComputedDecorator(equals) {
    return createClassPropertyDecorator(function (target, name, _, __, originalDescriptor) {
        invariant(typeof originalDescriptor !== "undefined", getMessage("m009"));
        invariant(typeof originalDescriptor.get === "function", getMessage("m010"));
        var adm = asObservableObject(target, "");
        defineComputedProperty(adm, name, originalDescriptor.get, originalDescriptor.set, equals, false);
    }, function (name) {
        var observable = this.$mobx.values[name];
        if (observable === undefined) return undefined;
        return observable.get();
    }, function (name, value) {
        this.$mobx.values[name].set(value);
    }, false, false);
}
var computedDecorator = createComputedDecorator(comparer.default);
var computedStructDecorator = createComputedDecorator(comparer.structural);
/**
 * Decorator for class properties: @computed get value() { return expr; }.
 * For legacy purposes also invokable as ES5 observable created: `computed(() => expr)`;
 */
var computed = function computed(arg1, arg2, arg3) {
    if (typeof arg2 === "string") {
        return computedDecorator.apply(null, arguments);
    }
    invariant(typeof arg1 === "function", getMessage("m011"));
    invariant(arguments.length < 3, getMessage("m012"));
    var opts = typeof arg2 === "object" ? arg2 : {};
    opts.setter = typeof arg2 === "function" ? arg2 : opts.setter;
    var equals = opts.equals ? opts.equals : opts.compareStructural || opts.struct ? comparer.structural : comparer.default;
    return new ComputedValue(arg1, opts.context, equals, opts.name || arg1.name || "", opts.setter);
};
computed.struct = computedStructDecorator;
computed.equals = createComputedDecorator;

function getAtom(thing, property) {
    if (typeof thing === "object" && thing !== null) {
        if (isObservableArray(thing)) {
            invariant(property === undefined, getMessage("m036"));
            return thing.$mobx.atom;
        }
        if (isObservableMap(thing)) {
            var anyThing = thing;
            if (property === undefined) return getAtom(anyThing._keys);
            var observable = anyThing._data[property] || anyThing._hasMap[property];
            invariant(!!observable, "the entry '" + property + "' does not exist in the observable map '" + getDebugName(thing) + "'");
            return observable;
        }
        // Initializers run lazily when transpiling to babel, so make sure they are run...
        runLazyInitializers(thing);
        if (property && !thing.$mobx) thing[property]; // See #1072 // TODO: remove in 4.0
        if (isObservableObject(thing)) {
            if (!property) return fail("please specify a property");
            var observable = thing.$mobx.values[property];
            invariant(!!observable, "no observable property '" + property + "' found on the observable object '" + getDebugName(thing) + "'");
            return observable;
        }
        if (isAtom(thing) || isComputedValue(thing) || isReaction(thing)) {
            return thing;
        }
    } else if (typeof thing === "function") {
        if (isReaction(thing.$mobx)) {
            // disposer function
            return thing.$mobx;
        }
    }
    return fail("Cannot obtain atom from " + thing);
}
function getAdministration(thing, property) {
    invariant(thing, "Expecting some object");
    if (property !== undefined) return getAdministration(getAtom(thing, property));
    if (isAtom(thing) || isComputedValue(thing) || isReaction(thing)) return thing;
    if (isObservableMap(thing)) return thing;
    // Initializers run lazily when transpiling to babel, so make sure they are run...
    runLazyInitializers(thing);
    if (thing.$mobx) return thing.$mobx;
    invariant(false, "Cannot obtain administration from " + thing);
}
function getDebugName(thing, property) {
    var named;
    if (property !== undefined) named = getAtom(thing, property);else if (isObservableObject(thing) || isObservableMap(thing)) named = getAdministration(thing);else named = getAtom(thing); // valid for arrays as well
    return named.name;
}

function isComputed(value, property) {
    if (value === null || value === undefined) return false;
    if (property !== undefined) {
        if (isObservableObject(value) === false) return false;
        var atom = getAtom(value, property);
        return isComputedValue(atom);
    }
    return isComputedValue(value);
}

function observe(thing, propOrCb, cbOrFire, fireImmediately) {
    if (typeof cbOrFire === "function") return observeObservableProperty(thing, propOrCb, cbOrFire, fireImmediately);else return observeObservable(thing, propOrCb, cbOrFire);
}
function observeObservable(thing, listener, fireImmediately) {
    return getAdministration(thing).observe(listener, fireImmediately);
}
function observeObservableProperty(thing, property, listener, fireImmediately) {
    return getAdministration(thing, property).observe(listener, fireImmediately);
}

function intercept(thing, propOrHandler, handler) {
    if (typeof handler === "function") return interceptProperty(thing, propOrHandler, handler);else return interceptInterceptable(thing, propOrHandler);
}
function interceptInterceptable(thing, handler) {
    return getAdministration(thing).intercept(handler);
}
function interceptProperty(thing, property, handler) {
    return getAdministration(thing, property).intercept(handler);
}

/**
    * expr can be used to create temporarily views inside views.
    * This can be improved to improve performance if a value changes often, but usually doesn't affect the outcome of an expression.
    *
    * In the following example the expression prevents that a component is rerender _each time_ the selection changes;
    * instead it will only rerenders when the current todo is (de)selected.
    *
    * reactiveComponent((props) => {
    *     const todo = props.todo;
    *     const isSelected = mobx.expr(() => props.viewState.selection === todo);
    *     return <div className={isSelected ? "todo todo-selected" : "todo"}>{todo.title}</div>
    * });
    *
    */
function expr(expr, scope) {
    if (!isComputingDerivation()) console.warn(getMessage("m013"));
    // optimization: would be more efficient if the expr itself wouldn't be evaluated first on the next change, but just a 'changed' signal would be fired
    return computed(expr, { context: scope }).get();
}

function toJS(source, detectCycles, __alreadySeen) {
    if (detectCycles === void 0) {
        detectCycles = true;
    }
    if (__alreadySeen === void 0) {
        __alreadySeen = [];
    }
    // optimization: using ES6 map would be more efficient!
    // optimization: lift this function outside toJS, this makes recursion expensive
    function cache(value) {
        if (detectCycles) __alreadySeen.push([source, value]);
        return value;
    }
    if (isObservable(source)) {
        if (detectCycles && __alreadySeen === null) __alreadySeen = [];
        if (detectCycles && source !== null && typeof source === "object") {
            for (var i = 0, l = __alreadySeen.length; i < l; i++) {
                if (__alreadySeen[i][0] === source) return __alreadySeen[i][1];
            }
        }
        if (isObservableArray(source)) {
            var res = cache([]);
            var toAdd = source.map(function (value) {
                return toJS(value, detectCycles, __alreadySeen);
            });
            res.length = toAdd.length;
            for (var i = 0, l = toAdd.length; i < l; i++) {
                res[i] = toAdd[i];
            }return res;
        }
        if (isObservableObject(source)) {
            var res = cache({});
            for (var key in source) {
                res[key] = toJS(source[key], detectCycles, __alreadySeen);
            }return res;
        }
        if (isObservableMap(source)) {
            var res_1 = cache({});
            source.forEach(function (value, key) {
                return res_1[key] = toJS(value, detectCycles, __alreadySeen);
            });
            return res_1;
        }
        if (isObservableValue(source)) return toJS(source.get(), detectCycles, __alreadySeen);
    }
    return source;
}

function createTransformer(transformer, onCleanup) {
    invariant(typeof transformer === "function" && transformer.length < 2, "createTransformer expects a function that accepts one argument");
    // Memoizes: object id -> reactive view that applies transformer to the object
    var objectCache = {};
    // If the resetId changes, we will clear the object cache, see #163
    // This construction is used to avoid leaking refs to the objectCache directly
    var resetId = globalState.resetId;
    // Local transformer class specifically for this transformer
    var Transformer = function (_super) {
        __extends(Transformer, _super);
        function Transformer(sourceIdentifier, sourceObject) {
            var _this = _super.call(this, function () {
                return transformer(sourceObject);
            }, undefined, comparer.default, "Transformer-" + transformer.name + "-" + sourceIdentifier, undefined) || this;
            _this.sourceIdentifier = sourceIdentifier;
            _this.sourceObject = sourceObject;
            return _this;
        }
        Transformer.prototype.onBecomeUnobserved = function () {
            var lastValue = this.value;
            _super.prototype.onBecomeUnobserved.call(this);
            delete objectCache[this.sourceIdentifier];
            if (onCleanup) onCleanup(lastValue, this.sourceObject);
        };
        return Transformer;
    }(ComputedValue);
    return function (object) {
        if (resetId !== globalState.resetId) {
            objectCache = {};
            resetId = globalState.resetId;
        }
        var identifier = getMemoizationId(object);
        var reactiveTransformer = objectCache[identifier];
        if (reactiveTransformer) return reactiveTransformer.get();
        // Not in cache; create a reactive view
        reactiveTransformer = objectCache[identifier] = new Transformer(identifier, object);
        return reactiveTransformer.get();
    };
}
function getMemoizationId(object) {
    if (typeof object === 'string' || typeof object === 'number') return object;
    if (object === null || typeof object !== "object") throw new Error("[mobx] transform expected some kind of object or primitive value, got: " + object);
    var tid = object.$transformId;
    if (tid === undefined) {
        tid = getNextId();
        addHiddenProp(object, "$transformId", tid);
    }
    return tid;
}

function log(msg) {
    console.log(msg);
    return msg;
}
function whyRun(thing, prop) {
    switch (arguments.length) {
        case 0:
            thing = globalState.trackingDerivation;
            if (!thing) return log(getMessage("m024"));
            break;
        case 2:
            thing = getAtom(thing, prop);
            break;
    }
    thing = getAtom(thing);
    if (isComputedValue(thing)) return log(thing.whyRun());else if (isReaction(thing)) return log(thing.whyRun());
    return fail(getMessage("m025"));
}

function getDependencyTree(thing, property) {
    return nodeToDependencyTree(getAtom(thing, property));
}
function nodeToDependencyTree(node) {
    var result = {
        name: node.name
    };
    if (node.observing && node.observing.length > 0) result.dependencies = unique(node.observing).map(nodeToDependencyTree);
    return result;
}
function getObserverTree(thing, property) {
    return nodeToObserverTree(getAtom(thing, property));
}
function nodeToObserverTree(node) {
    var result = {
        name: node.name
    };
    if (hasObservers(node)) result.observers = getObservers(node).map(nodeToObserverTree);
    return result;
}

function interceptReads(thing, propOrHandler, handler) {
    var target;
    if (isObservableMap(thing) || isObservableArray(thing) || isObservableValue(thing)) {
        target = getAdministration(thing);
    } else if (isObservableObject(thing)) {
        if (typeof propOrHandler !== "string") return fail("InterceptReads can only be used with a specific property, not with an object in general");
        target = getAdministration(thing, propOrHandler);
    } else {
        return fail("Expected observable map, object or array as first array");
    }
    if (target.dehancer !== undefined) return fail("An intercept reader was already established");
    target.dehancer = typeof propOrHandler === "function" ? propOrHandler : handler;
    return function () {
        target.dehancer = undefined;
    };
}

/**
 * (c) Michel Weststrate 2015 - 2016
 * MIT Licensed
 *
 * Welcome to the mobx sources! To get an global overview of how MobX internally works,
 * this is a good place to start:
 * https://medium.com/@mweststrate/becoming-fully-reactive-an-in-depth-explanation-of-mobservable-55995262a254#.xvbh6qd74
 *
 * Source folders:
 * ===============
 *
 * - api/     Most of the public static methods exposed by the module can be found here.
 * - core/    Implementation of the MobX algorithm; atoms, derivations, reactions, dependency trees, optimizations. Cool stuff can be found here.
 * - types/   All the magic that is need to have observable objects, arrays and values is in this folder. Including the modifiers like `asFlat`.
 * - utils/   Utility stuff.
 *
 */
var extras = {
    allowStateChanges: allowStateChanges,
    deepEqual: deepEqual,
    getAtom: getAtom,
    getDebugName: getDebugName,
    getDependencyTree: getDependencyTree,
    getAdministration: getAdministration,
    getGlobalState: getGlobalState,
    getObserverTree: getObserverTree,
    interceptReads: interceptReads,
    isComputingDerivation: isComputingDerivation,
    isSpyEnabled: isSpyEnabled,
    onReactionError: onReactionError,
    reserveArrayBuffer: reserveArrayBuffer,
    resetGlobalState: resetGlobalState,
    isolateGlobalState: isolateGlobalState,
    shareGlobalState: shareGlobalState,
    spyReport: spyReport,
    spyReportEnd: spyReportEnd,
    spyReportStart: spyReportStart,
    setReactionScheduler: setReactionScheduler
};
var everything = {
    Reaction: Reaction,
    untracked: untracked,
    Atom: Atom, BaseAtom: BaseAtom,
    useStrict: useStrict, isStrictModeEnabled: isStrictModeEnabled,
    spy: spy,
    comparer: comparer,
    asReference: asReference, asFlat: asFlat, asStructure: asStructure, asMap: asMap,
    isModifierDescriptor: isModifierDescriptor,
    isObservableObject: isObservableObject,
    isBoxedObservable: isObservableValue,
    isObservableArray: isObservableArray,
    ObservableMap: ObservableMap, isObservableMap: isObservableMap, map: map,
    transaction: transaction,
    observable: observable,
    computed: computed,
    isObservable: isObservable,
    isComputed: isComputed,
    extendObservable: extendObservable, extendShallowObservable: extendShallowObservable,
    observe: observe,
    intercept: intercept,
    autorun: autorun, autorunAsync: autorunAsync, when: when, reaction: reaction,
    action: action, isAction: isAction, runInAction: runInAction,
    expr: expr,
    toJS: toJS,
    createTransformer: createTransformer,
    whyRun: whyRun,
    isArrayLike: isArrayLike,
    extras: extras
};
var warnedAboutDefaultExport = false;
var _loop_1 = function _loop_1(p) {
    var val = everything[p];
    Object.defineProperty(everything, p, {
        get: function get() {
            if (!warnedAboutDefaultExport) {
                warnedAboutDefaultExport = true;
                console.warn('Using default export (`import mobx from \'mobx\'`) is deprecated ' + 'and won’t work in mobx@4.0.0\n' + 'Use `import * as mobx from \'mobx\'` instead');
            }
            return val;
        }
    });
};
for (var p in everything) {
    _loop_1(p);
}
if (typeof __MOBX_DEVTOOLS_GLOBAL_HOOK__ === "object") {
    __MOBX_DEVTOOLS_GLOBAL_HOOK__.injectMobx({ spy: spy, extras: extras });
}

/* harmony default export */ __webpack_exports__["default"] = (everything);

/***/ }),

/***/ "Asjh":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */



var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

module.exports = ReactPropTypesSecret;

/***/ }),

/***/ "E1C8":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Home; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact__ = __webpack_require__("KM04");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_preact__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__style__ = __webpack_require__("ZAL5");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__style___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__style__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_mobx_react__ = __webpack_require__("/nBs");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_mobx_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_mobx_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_UserCard__ = __webpack_require__("6ATj");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_KtpField__ = __webpack_require__("ZwNj");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_Modal__ = __webpack_require__("TDbV");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_ButtonFab__ = __webpack_require__("crmn");
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _class;



function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }





// import Components





var Home = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_mobx_react__["observer"])(_class = function (_Component) {
	_inherits(Home, _Component);

	function Home(props) {
		_classCallCheck(this, Home);

		var _this = _possibleConstructorReturn(this, _Component.call(this, props));

		_this.state = {
			modalOpen: false
		};
		return _this;
	}

	Home.prototype.handleSaveData = function handleSaveData(data) {
		var dataKtps = _extends({}, this.props.store.dataKtp);
		this.props.store.addNewKtp(data);
		this.setState({
			modalOpen: false
		});
	};

	Home.prototype.modalOpen = function modalOpen(e) {
		e.preventDefault();
		this.setState({
			modalOpen: true
		});
	};

	Home.prototype.modalClose = function modalClose(e) {
		e.preventDefault();
		this.setState({
			modalOpen: false
		});
	};

	Home.prototype.render = function render() {
		var dataKtp = this.props.store.dataKtp;

		var Cards = dataKtp.map(function (key) {
			return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(__WEBPACK_IMPORTED_MODULE_3__components_UserCard__["a" /* default */], { nik: key.nik,
				gender: key.gender,
				fullName: key.fullName });
		});
		return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
			'div',
			{ className: __WEBPACK_IMPORTED_MODULE_1__style___default.a.home },
			__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
				'div',
				{ style: 'display:flex' },
				__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
					'div',
					{ style: "width:50%" },
					__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(__WEBPACK_IMPORTED_MODULE_6__components_ButtonFab__["a" /* default */], { onClick: this.modalOpen.bind(this) })
				),
				__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
					'div',
					{ style: "width:50%" },
					__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
						'div',
						{ style: 'display:flex;flex-wrap:wrap' },
						Cards
					)
				)
			),
			__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
				__WEBPACK_IMPORTED_MODULE_5__components_Modal__["a" /* default */],
				{ isActive: this.state.modalOpen },
				__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(__WEBPACK_IMPORTED_MODULE_4__components_KtpField__["a" /* default */], { outputData: this.handleSaveData.bind(this), cancelInput: this.modalClose.bind(this), defaultData: true })
			)
		);
	};

	return Home;
}(__WEBPACK_IMPORTED_MODULE_0_preact__["Component"])) || _class;



/***/ }),

/***/ "JkW7":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__style__ = __webpack_require__("rq4c");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__style___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__style__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_app__ = __webpack_require__("qLaj");



/* harmony default export */ __webpack_exports__["default"] = (__WEBPACK_IMPORTED_MODULE_1__components_app__["a" /* default */]);

/***/ }),

/***/ "KM04":
/***/ (function(module, exports, __webpack_require__) {

!function () {
  "use strict";
  function e() {}function t(t, n) {
    var o,
        r,
        i,
        l,
        a = E;for (l = arguments.length; l-- > 2;) {
      W.push(arguments[l]);
    }n && null != n.children && (W.length || W.push(n.children), delete n.children);while (W.length) {
      if ((r = W.pop()) && void 0 !== r.pop) for (l = r.length; l--;) {
        W.push(r[l]);
      } else "boolean" == typeof r && (r = null), (i = "function" != typeof t) && (null == r ? r = "" : "number" == typeof r ? r += "" : "string" != typeof r && (i = !1)), i && o ? a[a.length - 1] += r : a === E ? a = [r] : a.push(r), o = i;
    }var u = new e();return u.nodeName = t, u.children = a, u.attributes = null == n ? void 0 : n, u.key = null == n ? void 0 : n.key, void 0 !== S.vnode && S.vnode(u), u;
  }function n(e, t) {
    for (var n in t) {
      e[n] = t[n];
    }return e;
  }function o(e, o) {
    return t(e.nodeName, n(n({}, e.attributes), o), arguments.length > 2 ? [].slice.call(arguments, 2) : e.children);
  }function r(e) {
    !e.__d && (e.__d = !0) && 1 == A.push(e) && (S.debounceRendering || P)(i);
  }function i() {
    var e,
        t = A;A = [];while (e = t.pop()) {
      e.__d && k(e);
    }
  }function l(e, t, n) {
    return "string" == typeof t || "number" == typeof t ? void 0 !== e.splitText : "string" == typeof t.nodeName ? !e._componentConstructor && a(e, t.nodeName) : n || e._componentConstructor === t.nodeName;
  }function a(e, t) {
    return e.__n === t || e.nodeName.toLowerCase() === t.toLowerCase();
  }function u(e) {
    var t = n({}, e.attributes);t.children = e.children;var o = e.nodeName.defaultProps;if (void 0 !== o) for (var r in o) {
      void 0 === t[r] && (t[r] = o[r]);
    }return t;
  }function _(e, t) {
    var n = t ? document.createElementNS("http://www.w3.org/2000/svg", e) : document.createElement(e);return n.__n = e, n;
  }function p(e) {
    var t = e.parentNode;t && t.removeChild(e);
  }function c(e, t, n, o, r) {
    if ("className" === t && (t = "class"), "key" === t) ;else if ("ref" === t) n && n(null), o && o(e);else if ("class" !== t || r) {
      if ("style" === t) {
        if (o && "string" != typeof o && "string" != typeof n || (e.style.cssText = o || ""), o && "object" == typeof o) {
          if ("string" != typeof n) for (var i in n) {
            i in o || (e.style[i] = "");
          }for (var i in o) {
            e.style[i] = "number" == typeof o[i] && !1 === V.test(i) ? o[i] + "px" : o[i];
          }
        }
      } else if ("dangerouslySetInnerHTML" === t) o && (e.innerHTML = o.__html || "");else if ("o" == t[0] && "n" == t[1]) {
        var l = t !== (t = t.replace(/Capture$/, ""));t = t.toLowerCase().substring(2), o ? n || e.addEventListener(t, f, l) : e.removeEventListener(t, f, l), (e.__l || (e.__l = {}))[t] = o;
      } else if ("list" !== t && "type" !== t && !r && t in e) s(e, t, null == o ? "" : o), null != o && !1 !== o || e.removeAttribute(t);else {
        var a = r && t !== (t = t.replace(/^xlink\:?/, ""));null == o || !1 === o ? a ? e.removeAttributeNS("http://www.w3.org/1999/xlink", t.toLowerCase()) : e.removeAttribute(t) : "function" != typeof o && (a ? e.setAttributeNS("http://www.w3.org/1999/xlink", t.toLowerCase(), o) : e.setAttribute(t, o));
      }
    } else e.className = o || "";
  }function s(e, t, n) {
    try {
      e[t] = n;
    } catch (e) {}
  }function f(e) {
    return this.__l[e.type](S.event && S.event(e) || e);
  }function d() {
    var e;while (e = D.pop()) {
      S.afterMount && S.afterMount(e), e.componentDidMount && e.componentDidMount();
    }
  }function h(e, t, n, o, r, i) {
    H++ || (R = null != r && void 0 !== r.ownerSVGElement, j = null != e && !("__preactattr_" in e));var l = m(e, t, n, o, i);return r && l.parentNode !== r && r.appendChild(l), --H || (j = !1, i || d()), l;
  }function m(e, t, n, o, r) {
    var i = e,
        l = R;if (null != t && "boolean" != typeof t || (t = ""), "string" == typeof t || "number" == typeof t) return e && void 0 !== e.splitText && e.parentNode && (!e._component || r) ? e.nodeValue != t && (e.nodeValue = t) : (i = document.createTextNode(t), e && (e.parentNode && e.parentNode.replaceChild(i, e), b(e, !0))), i.__preactattr_ = !0, i;var u = t.nodeName;if ("function" == typeof u) return U(e, t, n, o);if (R = "svg" === u || "foreignObject" !== u && R, u += "", (!e || !a(e, u)) && (i = _(u, R), e)) {
      while (e.firstChild) {
        i.appendChild(e.firstChild);
      }e.parentNode && e.parentNode.replaceChild(i, e), b(e, !0);
    }var p = i.firstChild,
        c = i.__preactattr_,
        s = t.children;if (null == c) {
      c = i.__preactattr_ = {};for (var f = i.attributes, d = f.length; d--;) {
        c[f[d].name] = f[d].value;
      }
    }return !j && s && 1 === s.length && "string" == typeof s[0] && null != p && void 0 !== p.splitText && null == p.nextSibling ? p.nodeValue != s[0] && (p.nodeValue = s[0]) : (s && s.length || null != p) && v(i, s, n, o, j || null != c.dangerouslySetInnerHTML), g(i, t.attributes, c), R = l, i;
  }function v(e, t, n, o, r) {
    var i,
        a,
        u,
        _,
        c,
        s = e.childNodes,
        f = [],
        d = {},
        h = 0,
        v = 0,
        y = s.length,
        g = 0,
        w = t ? t.length : 0;if (0 !== y) for (var C = 0; C < y; C++) {
      var x = s[C],
          N = x.__preactattr_,
          k = w && N ? x._component ? x._component.__k : N.key : null;null != k ? (h++, d[k] = x) : (N || (void 0 !== x.splitText ? !r || x.nodeValue.trim() : r)) && (f[g++] = x);
    }if (0 !== w) for (var C = 0; C < w; C++) {
      _ = t[C], c = null;var k = _.key;if (null != k) h && void 0 !== d[k] && (c = d[k], d[k] = void 0, h--);else if (!c && v < g) for (i = v; i < g; i++) {
        if (void 0 !== f[i] && l(a = f[i], _, r)) {
          c = a, f[i] = void 0, i === g - 1 && g--, i === v && v++;break;
        }
      }c = m(c, _, n, o), u = s[C], c && c !== e && c !== u && (null == u ? e.appendChild(c) : c === u.nextSibling ? p(u) : e.insertBefore(c, u));
    }if (h) for (var C in d) {
      void 0 !== d[C] && b(d[C], !1);
    }while (v <= g) {
      void 0 !== (c = f[g--]) && b(c, !1);
    }
  }function b(e, t) {
    var n = e._component;n ? L(n) : (null != e.__preactattr_ && e.__preactattr_.ref && e.__preactattr_.ref(null), !1 !== t && null != e.__preactattr_ || p(e), y(e));
  }function y(e) {
    e = e.lastChild;while (e) {
      var t = e.previousSibling;b(e, !0), e = t;
    }
  }function g(e, t, n) {
    var o;for (o in n) {
      t && null != t[o] || null == n[o] || c(e, o, n[o], n[o] = void 0, R);
    }for (o in t) {
      "children" === o || "innerHTML" === o || o in n && t[o] === ("value" === o || "checked" === o ? e[o] : n[o]) || c(e, o, n[o], n[o] = t[o], R);
    }
  }function w(e) {
    var t = e.constructor.name;(I[t] || (I[t] = [])).push(e);
  }function C(e, t, n) {
    var o,
        r = I[e.name];if (e.prototype && e.prototype.render ? (o = new e(t, n), T.call(o, t, n)) : (o = new T(t, n), o.constructor = e, o.render = x), r) for (var i = r.length; i--;) {
      if (r[i].constructor === e) {
        o.__b = r[i].__b, r.splice(i, 1);break;
      }
    }return o;
  }function x(e, t, n) {
    return this.constructor(e, n);
  }function N(e, t, n, o, i) {
    e.__x || (e.__x = !0, (e.__r = t.ref) && delete t.ref, (e.__k = t.key) && delete t.key, !e.base || i ? e.componentWillMount && e.componentWillMount() : e.componentWillReceiveProps && e.componentWillReceiveProps(t, o), o && o !== e.context && (e.__c || (e.__c = e.context), e.context = o), e.__p || (e.__p = e.props), e.props = t, e.__x = !1, 0 !== n && (1 !== n && !1 === S.syncComponentUpdates && e.base ? r(e) : k(e, 1, i)), e.__r && e.__r(e));
  }function k(e, t, o, r) {
    if (!e.__x) {
      var i,
          l,
          a,
          _ = e.props,
          p = e.state,
          c = e.context,
          s = e.__p || _,
          f = e.__s || p,
          m = e.__c || c,
          v = e.base,
          y = e.__b,
          g = v || y,
          w = e._component,
          x = !1;if (v && (e.props = s, e.state = f, e.context = m, 2 !== t && e.shouldComponentUpdate && !1 === e.shouldComponentUpdate(_, p, c) ? x = !0 : e.componentWillUpdate && e.componentWillUpdate(_, p, c), e.props = _, e.state = p, e.context = c), e.__p = e.__s = e.__c = e.__b = null, e.__d = !1, !x) {
        i = e.render(_, p, c), e.getChildContext && (c = n(n({}, c), e.getChildContext()));var U,
            T,
            M = i && i.nodeName;if ("function" == typeof M) {
          var W = u(i);l = w, l && l.constructor === M && W.key == l.__k ? N(l, W, 1, c, !1) : (U = l, e._component = l = C(M, W, c), l.__b = l.__b || y, l.__u = e, N(l, W, 0, c, !1), k(l, 1, o, !0)), T = l.base;
        } else a = g, U = w, U && (a = e._component = null), (g || 1 === t) && (a && (a._component = null), T = h(a, i, c, o || !v, g && g.parentNode, !0));if (g && T !== g && l !== w) {
          var E = g.parentNode;E && T !== E && (E.replaceChild(T, g), U || (g._component = null, b(g, !1)));
        }if (U && L(U), e.base = T, T && !r) {
          var P = e,
              V = e;while (V = V.__u) {
            (P = V).base = T;
          }T._component = P, T._componentConstructor = P.constructor;
        }
      }if (!v || o ? D.unshift(e) : x || (e.componentDidUpdate && e.componentDidUpdate(s, f, m), S.afterUpdate && S.afterUpdate(e)), null != e.__h) while (e.__h.length) {
        e.__h.pop().call(e);
      }H || r || d();
    }
  }function U(e, t, n, o) {
    var r = e && e._component,
        i = r,
        l = e,
        a = r && e._componentConstructor === t.nodeName,
        _ = a,
        p = u(t);while (r && !_ && (r = r.__u)) {
      _ = r.constructor === t.nodeName;
    }return r && _ && (!o || r._component) ? (N(r, p, 3, n, o), e = r.base) : (i && !a && (L(i), e = l = null), r = C(t.nodeName, p, n), e && !r.__b && (r.__b = e, l = null), N(r, p, 1, n, o), e = r.base, l && e !== l && (l._component = null, b(l, !1))), e;
  }function L(e) {
    S.beforeUnmount && S.beforeUnmount(e);var t = e.base;e.__x = !0, e.componentWillUnmount && e.componentWillUnmount(), e.base = null;var n = e._component;n ? L(n) : t && (t.__preactattr_ && t.__preactattr_.ref && t.__preactattr_.ref(null), e.__b = t, p(t), w(e), y(t)), e.__r && e.__r(null);
  }function T(e, t) {
    this.__d = !0, this.context = t, this.props = e, this.state = this.state || {};
  }function M(e, t, n) {
    return h(n, e, {}, !1, t, !1);
  }var S = {},
      W = [],
      E = [],
      P = "function" == typeof Promise ? Promise.resolve().then.bind(Promise.resolve()) : setTimeout,
      V = /acit|ex(?:s|g|n|p|$)|rph|ows|mnc|ntw|ine[ch]|zoo|^ord/i,
      A = [],
      D = [],
      H = 0,
      R = !1,
      j = !1,
      I = {};n(T.prototype, { setState: function setState(e, t) {
      var o = this.state;this.__s || (this.__s = n({}, o)), n(o, "function" == typeof e ? e(o, this.props) : e), t && (this.__h = this.__h || []).push(t), r(this);
    }, forceUpdate: function forceUpdate(e) {
      e && (this.__h = this.__h || []).push(e), k(this, 2);
    }, render: function render() {} });var $ = { h: t, createElement: t, cloneElement: o, Component: T, render: M, rerender: i, options: S }; true ? module.exports = $ : self.preact = $;
}();
//# sourceMappingURL=preact.min.js.map

/***/ }),

/***/ "PdBQ":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function nikParser(nik) {
	var result = {};
	var arrayNik = nik.split('').map(function (key) {
		return parseInt(key, 10);
	});
	var cityCode = arrayNik.slice(0, 4).join('');
	var kecamatanCode = arrayNik.slice(0, 6).join('');
	var bornDate = arrayNik.slice(6, 8).join('');
	var bornMonth = arrayNik.slice(8, 10).join('');
	var bornYear = arrayNik.slice(10, 12).join('');

	var date = parseFloat(bornDate) >= 40 ? parseFloat(bornDate) - 40 : parseFloat(bornDate);
	var dateZero = date.toString().length === 1 ? '0' + date.toString() : date.toString();
	var month = parseFloat(bornMonth);
	var year = parseFloat('19' + bornYear);
	var gender = parseInt(bornDate, 10) >= 40 ? 'female' : 'male';

	var dateAll = dateZero + '-' + bornMonth + '-19' + bornYear;

	result.cityCode = cityCode;
	result.kecamatanCode = kecamatanCode;
	result.bornDate = dateAll;
	result.bornDay = dateZero;
	result.bornMonth = month;
	result.bornYear = year;
	result.gender = gender;

	return result;
}

/* harmony default export */ __webpack_exports__["a"] = (nikParser);

/***/ }),

/***/ "TDbV":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = Modal;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact__ = __webpack_require__("KM04");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_preact__);
var _ModalActive;




function Modal(props) {

  var active = props.isActive ? Style.ModalActive : Style.ModalOff;

  return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
    "div",
    { style: active },
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
      "div",
      { style: Style.ModalContainer },
      props.children
    )
  );
}

var Style = {
  ModalActive: (_ModalActive = {
    display: "block",
    position: "fixed",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    zIndex: 999,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,.5)"
  }, _ModalActive["display"] = "flex", _ModalActive.alignItems = "center", _ModalActive.justifyContent = "center", _ModalActive),
  ModalOff: {
    display: "none"
  },

  ModalContainer: {
    maxHeight: "90%",
    overflowY: "scroll",
    borderRadius: "2px",
    boxShadow: "0px 5px 5px -3px rgba(0, 0, 0, 0.2), 0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12)"
  }
};

/***/ }),

/***/ "UQex":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */

function makeEmptyFunction(arg) {
  return function () {
    return arg;
  };
}

/**
 * This function accepts and discards inputs; it has no side effects. This is
 * primarily useful idiomatically for overridable function endpoints which
 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
 */
var emptyFunction = function emptyFunction() {};

emptyFunction.thatReturns = makeEmptyFunction;
emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
emptyFunction.thatReturnsNull = makeEmptyFunction(null);
emptyFunction.thatReturnsThis = function () {
  return this;
};
emptyFunction.thatReturnsArgument = function (arg) {
  return arg;
};

module.exports = emptyFunction;

/***/ }),

/***/ "ZAL5":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"home":"home__2Q5nZ","Compasitor":"Compasitor__1l5Sc","ResultPaper":"ResultPaper__1uSML","partyHeader":"partyHeader__pmm78","partyList":"partyList__2YJsk","partyFooter":"partyFooter__Lyjld"};

/***/ }),

/***/ "ZwNj":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return KtpField; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact__ = __webpack_require__("KM04");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_preact__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__library_nikparser_js__ = __webpack_require__("PdBQ");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__style__ = __webpack_require__("aDwu");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__style___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__style__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__style__ = __webpack_require__("2AN3");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__style___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__style__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__TextInput__ = __webpack_require__("g3LN");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__DropDown__ = __webpack_require__("1lu6");


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }



// import Library





// Import Components



var _ref = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])('img', { src: 'assets/icons/ktp.svg', alt: '' });

var _ref2 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
  'h3',
  null,
  'Isilah data berikut sesuai dengan Kartu Identitas Penghadap'
);

var _ref3 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
  'li',
  null,
  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
    'h4',
    null,
    'Informasi Pribadi'
  )
);

var _ref4 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
  'li',
  null,
  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
    'h4',
    null,
    'Alamat'
  )
);

var _ref5 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
  'li',
  null,
  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
    'h4',
    null,
    'Pekerjaan & Status Pernikahan'
  )
);

var _ref6 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])('li', null);

var KtpField = function (_Component) {
  _inherits(KtpField, _Component);

  function KtpField(props) {
    _classCallCheck(this, KtpField);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.state = {
      _id: _this.props.defaultData._id,
      nik: _this.props.defaultData.nik,
      fullName: _this.props.defaultData.fullName,
      bornPlace: _this.props.defaultData.bornPlace,
      bornDay: _this.props.defaultData.bornDay,
      bornMonth: _this.props.defaultData.bornMonth,
      bornYear: _this.props.defaultData.bornYear,
      gender: _this.props.defaultData.gender,
      streetAddress: _this.props.defaultData.streetAddress,
      rt: _this.props.defaultData.rt,
      rw: _this.props.defaultData.rw,
      kelurahanType: _this.props.defaultData.kelurahanType,
      kelurahanName: _this.props.defaultData.kelurahanName,
      kecamatan: _this.props.defaultData.kecamatan,
      cityType: _this.props.defaultData.cityType,
      cityName: _this.props.defaultData.cityName,
      martialStatus: _this.props.defaultData.martialStatus,
      occupation: _this.props.defaultData.occupation
    };
    _this.handleInputChange = _this.handleInputChange.bind(_this);
    _this.handleInputNik = _this.handleInputNik.bind(_this);
    return _this;
  }

  KtpField.prototype.handleSave = function handleSave(e) {
    e.preventDefault();
    var dataKTP = {
      _id: this.state.nik,
      nik: this.state.nik,
      fullName: this.state.fullName,
      bornPlace: this.state.bornPlace,
      bornDate: this.state.bornDay + '-' + this.state.bornMonth + '-' + this.state.bornYear,
      gender: this.state.gender,
      streetAddress: this.state.streetAddress,
      rt: this.state.rt,
      rw: this.state.rw,
      kelurahanType: this.state.kelurahanType,
      kelurahanName: this.state.kelurahanName,
      kecamatan: this.state.kecamatan,
      cityType: this.state.cityType,
      cityName: this.state.cityName,
      martialStatus: this.state.martialStatus,
      occupation: this.state.occupation

      //  Export state to Parent Components as Object
    };this.props.outputData(dataKTP);

    // Reset State to initial Value
    this.setState({
      _id: this.props.defaultData._id,
      nik: this.props.defaultData.nik,
      fullName: this.props.defaultData.fullName,
      bornPlace: this.props.defaultData.bornPlace,
      bornDay: this.props.defaultData.bornDay,
      bornMonth: this.props.defaultData.bornMonth,
      bornYear: this.props.defaultData.bornYear,
      gender: this.props.defaultData.gender,
      streetAddress: this.props.defaultData.streetAddress,
      rt: this.props.defaultData.rt,
      rw: this.props.defaultData.rw,
      kelurahanType: this.props.defaultData.kelurahanType,
      kelurahanName: this.props.defaultData.kelurahanName,
      kecamatan: this.props.defaultData.kecamatan,
      cityType: this.props.defaultData.cityType,
      cityName: this.props.defaultData.cityName,
      martialStatus: this.props.defaultData.martialStatus,
      occupation: this.props.defaultData.occupation
    });
  };

  KtpField.prototype.handleInputChange = function handleInputChange(event) {
    var _setState;

    var target = event.target;
    var value = target.type === 'checkbox' ? target.checked : target.value;
    var name = target.name;
    this.setState((_setState = {}, _setState[name] = value, _setState));
  };

  KtpField.prototype.handleInputNik = function handleInputNik(event) {
    var _this2 = this;

    var Value = event.target.value;
    var NikResult = function NikResult(NIK) {
      if (NIK.length === 16) {
        var NIKParser = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__library_nikparser_js__["a" /* default */])(NIK);
        _this2.setState({
          nik: Value,
          bornDay: NIKParser.bornDay,
          bornMonth: NIKParser.bornMonth,
          bornYear: NIKParser.bornYear,
          gender: NIKParser.gender
        });
      } else {
        _this2.setState({
          nik: Value
        });
      }
    };
    NikResult(Value);
  };

  KtpField.prototype.render = function render() {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
      'div',
      { className: __WEBPACK_IMPORTED_MODULE_2__style___default.a.KtpField },
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
        'header',
        { className: __WEBPACK_IMPORTED_MODULE_2__style___default.a.KtpField_header },
        _ref,
        _ref2
      ),
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
        'form',
        null,
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
          'ul',
          null,
          _ref3,
          __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
            'li',
            null,
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(__WEBPACK_IMPORTED_MODULE_4__TextInput__["a" /* default */], { Value: this.state.nik, title: 'Nomor Induk Kependudukan', name: 'nik', isNumeric: true, maxlength: '16', onChange: this.handleInputNik })
          ),
          __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
            'li',
            null,
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(__WEBPACK_IMPORTED_MODULE_4__TextInput__["a" /* default */], { Value: this.state.fullName, title: 'Nama Lengkap', name: 'fullName', onChange: this.handleInputChange })
          ),
          __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
            'li',
            { className: __WEBPACK_IMPORTED_MODULE_3__style___default.a.flex },
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
              'div',
              { className: __WEBPACK_IMPORTED_MODULE_3__style___default.a.w_50 },
              __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(__WEBPACK_IMPORTED_MODULE_4__TextInput__["a" /* default */], { Value: this.state.bornPlace, title: 'Kota Kelahiran', name: 'bornPlace', onChange: this.handleInputChange })
            ),
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
              'div',
              { className: [__WEBPACK_IMPORTED_MODULE_3__style___default.a.flex, __WEBPACK_IMPORTED_MODULE_3__style___default.a.w_50].join(' ') },
              __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(__WEBPACK_IMPORTED_MODULE_4__TextInput__["a" /* default */], { Value: this.state.bornDay, title: 'Tgl.Lahir', name: 'bornDay', isNumeric: true, maxlength: '2', onChange: this.handleInputChange }),
              __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
                'div',
                { className: __WEBPACK_IMPORTED_MODULE_3__style___default.a.mh1 },
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(__WEBPACK_IMPORTED_MODULE_4__TextInput__["a" /* default */], { Value: this.state.bornMonth, title: 'Bln.Lahir', name: 'bornMonth', isNumeric: true, maxlength: '2', onChange: this.handleInputChange })
              ),
              __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(__WEBPACK_IMPORTED_MODULE_4__TextInput__["a" /* default */], { Value: this.state.bornYear, title: 'Thn.lahir', name: 'bornYear', isNumeric: true, maxlength: '4', onChange: this.handleInputChange })
            )
          ),
          __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
            'li',
            null,
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(__WEBPACK_IMPORTED_MODULE_5__DropDown__["a" /* default */], { Value: this.state.gender, dataItems: gender, title: 'jenis Kelamin', name: 'gender', onChange: this.handleInputChange })
          ),
          _ref4,
          __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
            'li',
            { className: __WEBPACK_IMPORTED_MODULE_3__style___default.a.flex },
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
              'div',
              { className: __WEBPACK_IMPORTED_MODULE_3__style___default.a.w_50 },
              __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(__WEBPACK_IMPORTED_MODULE_4__TextInput__["a" /* default */], { Value: this.state.streetAddress, title: 'alamat', name: 'streetAddress', onChange: this.handleInputChange })
            ),
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
              'div',
              { className: [__WEBPACK_IMPORTED_MODULE_3__style___default.a.flex, __WEBPACK_IMPORTED_MODULE_3__style___default.a.w_50].join(' ') },
              __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
                'div',
                { className: __WEBPACK_IMPORTED_MODULE_3__style___default.a.mr1 },
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(__WEBPACK_IMPORTED_MODULE_4__TextInput__["a" /* default */], { Value: this.state.rt, title: 'RT', name: 'rt', isNumeric: true, maxlength: '3', onChange: this.handleInputChange })
              ),
              __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(__WEBPACK_IMPORTED_MODULE_4__TextInput__["a" /* default */], { Value: this.state.rw, title: 'RW', name: 'rw', isNumeric: true, maxlength: '3', onChange: this.handleInputChange })
            )
          ),
          __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
            'li',
            { className: [__WEBPACK_IMPORTED_MODULE_3__style___default.a.flex] },
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(__WEBPACK_IMPORTED_MODULE_5__DropDown__["a" /* default */], { Value: this.state.kelurahanType, dataItems: kelurahan, title: 'jenis administrasi', name: 'kelurahanType', onChange: this.handleInputChange }),
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(__WEBPACK_IMPORTED_MODULE_4__TextInput__["a" /* default */], { Value: this.state.kelurahanName, title: 'Nama Desa/Kelurahan', name: 'kelurahanName', onChange: this.handleInputChange })
          ),
          __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
            'li',
            null,
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(__WEBPACK_IMPORTED_MODULE_4__TextInput__["a" /* default */], { Value: this.state.kecamatan, title: 'Kecamatan', name: 'kecamatan', onChange: this.handleInputChange })
          ),
          __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
            'li',
            { className: [__WEBPACK_IMPORTED_MODULE_3__style___default.a.flex] },
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(__WEBPACK_IMPORTED_MODULE_5__DropDown__["a" /* default */], { Value: this.state.cityType, dataItems: city, title: 'jenis administrasi', name: 'cityType', onChange: this.handleInputChange }),
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(__WEBPACK_IMPORTED_MODULE_4__TextInput__["a" /* default */], { Value: this.state.cityName, title: 'Kota/Kabupaten', name: 'cityName', onChange: this.handleInputChange })
          ),
          _ref5,
          __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
            'li',
            { className: [__WEBPACK_IMPORTED_MODULE_3__style___default.a.flex] },
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(__WEBPACK_IMPORTED_MODULE_5__DropDown__["a" /* default */], { Value: this.state.martialStatus, dataItems: martialStatus, title: 'Status Pernikahan', name: 'martialStatus', onChange: this.handleInputChange }),
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(__WEBPACK_IMPORTED_MODULE_4__TextInput__["a" /* default */], { Value: this.state.occupation, title: 'Pekerjaan', name: 'occupation', onChange: this.handleInputChange })
          ),
          _ref6
        ),
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
          'div',
          { className: __WEBPACK_IMPORTED_MODULE_2__style___default.a.KtpField_action },
          __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
            'button',
            { className: __WEBPACK_IMPORTED_MODULE_2__style___default.a.KtpField_buttonCancel, onClick: this.props.cancelInput },
            'Cancel'
          ),
          __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
            'button',
            { className: __WEBPACK_IMPORTED_MODULE_2__style___default.a.KtpField_buttonSave, onClick: this.handleSave.bind(this) },
            'Save'
          )
        )
      )
    );
  };

  return KtpField;
}(__WEBPACK_IMPORTED_MODULE_0_preact__["Component"]);




var gender = [{
  label: 'Laki-laki',
  value: 'male'
}, {
  label: 'Perempuan',
  value: 'female'
}];

var kelurahan = [{
  label: 'Desa',
  value: 'desa'
}, {
  label: 'Kelurahan',
  value: 'kelurahan'
}];

var city = [{
  label: 'Kabupaten',
  value: 'kabupaten'
}, {
  label: 'Kota',
  value: 'kota'
}];

var martialStatus = [{
  label: 'Belum Menikah',
  value: 'single'
}, {
  label: 'Menikah',
  value: 'marriage'
}, {
  label: 'Cerai Hidup',
  value: 'divorced'
}, {
  label: 'Cerai Mati',
  value: 'widowed'
}];

/***/ }),

/***/ "ZzoW":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"UserCard":"UserCard__257aD","UserCard_img":"UserCard_img__3lkWd","UserCard_desc":"UserCard_desc__V96C6"};

/***/ }),

/***/ "aDwu":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"KtpField":"KtpField__3MCbQ","KtpField_header":"KtpField_header__3sAZW","KtpField_action":"KtpField_action__3w3Be","KtpField_buttonSave":"KtpField_buttonSave__32IQA"};

/***/ }),

/***/ "crmn":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = ButtonFab;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact__ = __webpack_require__("KM04");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_preact__);



function ButtonFab(props) {
  var Type = props.buttonType;
  return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
    "button",
    { onClick: props.onClick, style: Style.fab },
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
      "span",
      { style: Style.span },
      props.children
    )
  );
}

var Style = {
  fab: {
    width: 48,
    height: 48,
    backgroundColor: "#673AB7",
    color: "#fff",
    margin: 0,
    lineHeight: "48px",
    borderRadius: 500,
    border: "none",
    fontSize: 24,
    outline: "none",
    position: "relative",
    verticalAlign: "middle"
  },
  span: {
    margin: 0,
    verticalAlign: "middle",
    lineHeight: 1,
    padding: 0
  }
};

/***/ }),

/***/ "eW0v":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "version", function() { return version; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DOM", function() { return DOM; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Children", function() { return Children; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render$1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createClass", function() { return createClass; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createFactory", function() { return createFactory; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createElement", function() { return createElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cloneElement", function() { return cloneElement$1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isValidElement", function() { return isValidElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "findDOMNode", function() { return findDOMNode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "unmountComponentAtNode", function() { return unmountComponentAtNode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Component", function() { return Component$1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PureComponent", function() { return PureComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "unstable_renderSubtreeIntoContainer", function() { return renderSubtreeIntoContainer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__spread", function() { return extend; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_prop_types__ = __webpack_require__("5D9O");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_preact__ = __webpack_require__("KM04");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_preact___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_preact__);
/* harmony reexport (default from non-hamory) */ __webpack_require__.d(__webpack_exports__, "PropTypes", function() { return __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a; });



var version = '15.1.0'; // trick libraries to think we are react

var ELEMENTS = 'a abbr address area article aside audio b base bdi bdo big blockquote body br button canvas caption cite code col colgroup data datalist dd del details dfn dialog div dl dt em embed fieldset figcaption figure footer form h1 h2 h3 h4 h5 h6 head header hgroup hr html i iframe img input ins kbd keygen label legend li link main map mark menu menuitem meta meter nav noscript object ol optgroup option output p param picture pre progress q rp rt ruby s samp script section select small source span strong style sub summary sup table tbody td textarea tfoot th thead time title tr track u ul var video wbr circle clipPath defs ellipse g image line linearGradient mask path pattern polygon polyline radialGradient rect stop svg text tspan'.split(' ');

var REACT_ELEMENT_TYPE = typeof Symbol !== 'undefined' && Symbol.for && Symbol.for('react.element') || 0xeac7;

var COMPONENT_WRAPPER_KEY = typeof Symbol !== 'undefined' ? Symbol.for('__preactCompatWrapper') : '__preactCompatWrapper';

// don't autobind these methods since they already have guaranteed context.
var AUTOBIND_BLACKLIST = {
	constructor: 1,
	render: 1,
	shouldComponentUpdate: 1,
	componentWillReceiveProps: 1,
	componentWillUpdate: 1,
	componentDidUpdate: 1,
	componentWillMount: 1,
	componentDidMount: 1,
	componentWillUnmount: 1,
	componentDidUnmount: 1
};

var CAMEL_PROPS = /^(?:accent|alignment|arabic|baseline|cap|clip|color|fill|flood|font|glyph|horiz|marker|overline|paint|stop|strikethrough|stroke|text|underline|unicode|units|v|vector|vert|word|writing|x)[A-Z]/;

var BYPASS_HOOK = {};

/*global process*/
var DEV = typeof process === 'undefined' || !process.env || "production" !== 'production';

// a component that renders nothing. Used to replace components for unmountComponentAtNode.
function EmptyComponent() {
	return null;
}

// make react think we're react.
var VNode = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_preact__["h"])('a', null).constructor;
VNode.prototype.$$typeof = REACT_ELEMENT_TYPE;
VNode.prototype.preactCompatUpgraded = false;
VNode.prototype.preactCompatNormalized = false;

Object.defineProperty(VNode.prototype, 'type', {
	get: function get() {
		return this.nodeName;
	},
	set: function set(v) {
		this.nodeName = v;
	},
	configurable: true
});

Object.defineProperty(VNode.prototype, 'props', {
	get: function get() {
		return this.attributes;
	},
	set: function set(v) {
		this.attributes = v;
	},
	configurable: true
});

var oldEventHook = __WEBPACK_IMPORTED_MODULE_1_preact__["options"].event;
__WEBPACK_IMPORTED_MODULE_1_preact__["options"].event = function (e) {
	if (oldEventHook) {
		e = oldEventHook(e);
	}
	e.persist = Object;
	e.nativeEvent = e;
	return e;
};

var oldVnodeHook = __WEBPACK_IMPORTED_MODULE_1_preact__["options"].vnode;
__WEBPACK_IMPORTED_MODULE_1_preact__["options"].vnode = function (vnode) {
	if (!vnode.preactCompatUpgraded) {
		vnode.preactCompatUpgraded = true;

		var tag = vnode.nodeName,
		    attrs = vnode.attributes = extend({}, vnode.attributes);

		if (typeof tag === 'function') {
			if (tag[COMPONENT_WRAPPER_KEY] === true || tag.prototype && 'isReactComponent' in tag.prototype) {
				if (vnode.children && String(vnode.children) === '') {
					vnode.children = undefined;
				}
				if (vnode.children) {
					attrs.children = vnode.children;
				}

				if (!vnode.preactCompatNormalized) {
					normalizeVNode(vnode);
				}
				handleComponentVNode(vnode);
			}
		} else {
			if (vnode.children && String(vnode.children) === '') {
				vnode.children = undefined;
			}
			if (vnode.children) {
				attrs.children = vnode.children;
			}

			if (attrs.defaultValue) {
				if (!attrs.value && attrs.value !== 0) {
					attrs.value = attrs.defaultValue;
				}
				delete attrs.defaultValue;
			}

			handleElementVNode(vnode, attrs);
		}
	}

	if (oldVnodeHook) {
		oldVnodeHook(vnode);
	}
};

function handleComponentVNode(vnode) {
	var tag = vnode.nodeName,
	    a = vnode.attributes;

	vnode.attributes = {};
	if (tag.defaultProps) {
		extend(vnode.attributes, tag.defaultProps);
	}
	if (a) {
		extend(vnode.attributes, a);
	}
}

function handleElementVNode(vnode, a) {
	var shouldSanitize, attrs, i;
	if (a) {
		for (i in a) {
			if (shouldSanitize = CAMEL_PROPS.test(i)) {
				break;
			}
		}
		if (shouldSanitize) {
			attrs = vnode.attributes = {};
			for (i in a) {
				if (a.hasOwnProperty(i)) {
					attrs[CAMEL_PROPS.test(i) ? i.replace(/([A-Z0-9])/, '-$1').toLowerCase() : i] = a[i];
				}
			}
		}
	}
}

// proxy render() since React returns a Component reference.
function render$1(vnode, parent, callback) {
	var prev = parent && parent._preactCompatRendered && parent._preactCompatRendered.base;

	// ignore impossible previous renders
	if (prev && prev.parentNode !== parent) {
		prev = null;
	}

	// default to first Element child
	if (!prev && parent) {
		prev = parent.firstElementChild;
	}

	// remove unaffected siblings
	for (var i = parent.childNodes.length; i--;) {
		if (parent.childNodes[i] !== prev) {
			parent.removeChild(parent.childNodes[i]);
		}
	}

	var out = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_preact__["render"])(vnode, parent, prev);
	if (parent) {
		parent._preactCompatRendered = out && (out._component || { base: out });
	}
	if (typeof callback === 'function') {
		callback();
	}
	return out && out._component || out;
}

var ContextProvider = function ContextProvider() {};

ContextProvider.prototype.getChildContext = function () {
	return this.props.context;
};
ContextProvider.prototype.render = function (props) {
	return props.children[0];
};

function renderSubtreeIntoContainer(parentComponent, vnode, container, callback) {
	var wrap = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_preact__["h"])(ContextProvider, { context: parentComponent.context }, vnode);
	var renderContainer = render$1(wrap, container);
	var component = renderContainer._component || renderContainer.base;
	if (callback) {
		callback.call(component, renderContainer);
	}
	return component;
}

function unmountComponentAtNode(container) {
	var existing = container._preactCompatRendered && container._preactCompatRendered.base;
	if (existing && existing.parentNode === container) {
		__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_preact__["render"])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_preact__["h"])(EmptyComponent), container, existing);
		return true;
	}
	return false;
}

var ARR = [];

// This API is completely unnecessary for Preact, so it's basically passthrough.
var Children = {
	map: function map(children, fn, ctx) {
		if (children == null) {
			return null;
		}
		children = Children.toArray(children);
		if (ctx && ctx !== children) {
			fn = fn.bind(ctx);
		}
		return children.map(fn);
	},
	forEach: function forEach(children, fn, ctx) {
		if (children == null) {
			return null;
		}
		children = Children.toArray(children);
		if (ctx && ctx !== children) {
			fn = fn.bind(ctx);
		}
		children.forEach(fn);
	},
	count: function count(children) {
		return children && children.length || 0;
	},
	only: function only(children) {
		children = Children.toArray(children);
		if (children.length !== 1) {
			throw new Error('Children.only() expects only one child.');
		}
		return children[0];
	},
	toArray: function toArray(children) {
		if (children == null) {
			return [];
		}
		return ARR.concat(children);
	}
};

/** Track current render() component for ref assignment */
var currentComponent;

function createFactory(type) {
	return createElement.bind(null, type);
}

var DOM = {};
for (var i = ELEMENTS.length; i--;) {
	DOM[ELEMENTS[i]] = createFactory(ELEMENTS[i]);
}

function upgradeToVNodes(arr, offset) {
	for (var i = offset || 0; i < arr.length; i++) {
		var obj = arr[i];
		if (Array.isArray(obj)) {
			upgradeToVNodes(obj);
		} else if (obj && typeof obj === 'object' && !isValidElement(obj) && (obj.props && obj.type || obj.attributes && obj.nodeName || obj.children)) {
			arr[i] = createElement(obj.type || obj.nodeName, obj.props || obj.attributes, obj.children);
		}
	}
}

function isStatelessComponent(c) {
	return typeof c === 'function' && !(c.prototype && c.prototype.render);
}

// wraps stateless functional components in a PropTypes validator
function wrapStatelessComponent(WrappedComponent) {
	return createClass({
		displayName: WrappedComponent.displayName || WrappedComponent.name,
		render: function render() {
			return WrappedComponent(this.props, this.context);
		}
	});
}

function statelessComponentHook(Ctor) {
	var Wrapped = Ctor[COMPONENT_WRAPPER_KEY];
	if (Wrapped) {
		return Wrapped === true ? Ctor : Wrapped;
	}

	Wrapped = wrapStatelessComponent(Ctor);

	Object.defineProperty(Wrapped, COMPONENT_WRAPPER_KEY, { configurable: true, value: true });
	Wrapped.displayName = Ctor.displayName;
	Wrapped.propTypes = Ctor.propTypes;
	Wrapped.defaultProps = Ctor.defaultProps;

	Object.defineProperty(Ctor, COMPONENT_WRAPPER_KEY, { configurable: true, value: Wrapped });

	return Wrapped;
}

function createElement() {
	var args = [],
	    len = arguments.length;
	while (len--) {
		args[len] = arguments[len];
	}upgradeToVNodes(args, 2);
	return normalizeVNode(__WEBPACK_IMPORTED_MODULE_1_preact__["h"].apply(void 0, args));
}

function normalizeVNode(vnode) {
	vnode.preactCompatNormalized = true;

	applyClassName(vnode);

	if (isStatelessComponent(vnode.nodeName)) {
		vnode.nodeName = statelessComponentHook(vnode.nodeName);
	}

	var ref = vnode.attributes.ref,
	    type = ref && typeof ref;
	if (currentComponent && (type === 'string' || type === 'number')) {
		vnode.attributes.ref = createStringRefProxy(ref, currentComponent);
	}

	applyEventNormalization(vnode);

	return vnode;
}

function cloneElement$1(element, props) {
	var children = [],
	    len = arguments.length - 2;
	while (len-- > 0) {
		children[len] = arguments[len + 2];
	}if (!isValidElement(element)) {
		return element;
	}
	var elementProps = element.attributes || element.props;
	var node = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_preact__["h"])(element.nodeName || element.type, elementProps, element.children || elementProps && elementProps.children);
	// Only provide the 3rd argument if needed.
	// Arguments 3+ overwrite element.children in preactCloneElement
	var cloneArgs = [node, props];
	if (children && children.length) {
		cloneArgs.push(children);
	} else if (props && props.children) {
		cloneArgs.push(props.children);
	}
	return normalizeVNode(__WEBPACK_IMPORTED_MODULE_1_preact__["cloneElement"].apply(void 0, cloneArgs));
}

function isValidElement(element) {
	return element && (element instanceof VNode || element.$$typeof === REACT_ELEMENT_TYPE);
}

function createStringRefProxy(name, component) {
	return component._refProxies[name] || (component._refProxies[name] = function (resolved) {
		if (component && component.refs) {
			component.refs[name] = resolved;
			if (resolved === null) {
				delete component._refProxies[name];
				component = null;
			}
		}
	});
}

function applyEventNormalization(ref) {
	var nodeName = ref.nodeName;
	var attributes = ref.attributes;

	if (!attributes || typeof nodeName !== 'string') {
		return;
	}
	var props = {};
	for (var i in attributes) {
		props[i.toLowerCase()] = i;
	}
	if (props.ondoubleclick) {
		attributes.ondblclick = attributes[props.ondoubleclick];
		delete attributes[props.ondoubleclick];
	}
	// for *textual inputs* (incl textarea), normalize `onChange` -> `onInput`:
	if (props.onchange && (nodeName === 'textarea' || nodeName.toLowerCase() === 'input' && !/^fil|che|rad/i.test(attributes.type))) {
		var normalized = props.oninput || 'oninput';
		if (!attributes[normalized]) {
			attributes[normalized] = multihook([attributes[normalized], attributes[props.onchange]]);
			delete attributes[props.onchange];
		}
	}
}

function applyClassName(vnode) {
	var a = vnode.attributes || (vnode.attributes = {});
	classNameDescriptor.enumerable = 'className' in a;
	if (a.className) {
		a.class = a.className;
	}
	Object.defineProperty(a, 'className', classNameDescriptor);
}

var classNameDescriptor = {
	configurable: true,
	get: function get() {
		return this.class;
	},
	set: function set(v) {
		this.class = v;
	}
};

function extend(base, props) {
	var arguments$1 = arguments;

	for (var i = 1, obj = void 0; i < arguments.length; i++) {
		if (obj = arguments$1[i]) {
			for (var key in obj) {
				if (obj.hasOwnProperty(key)) {
					base[key] = obj[key];
				}
			}
		}
	}
	return base;
}

function shallowDiffers(a, b) {
	for (var i in a) {
		if (!(i in b)) {
			return true;
		}
	}
	for (var i$1 in b) {
		if (a[i$1] !== b[i$1]) {
			return true;
		}
	}
	return false;
}

function findDOMNode(component) {
	return component && component.base || component;
}

function F() {}

function createClass(obj) {
	function cl(props, context) {
		bindAll(this);
		Component$1.call(this, props, context, BYPASS_HOOK);
		newComponentHook.call(this, props, context);
	}

	obj = extend({ constructor: cl }, obj);

	// We need to apply mixins here so that getDefaultProps is correctly mixed
	if (obj.mixins) {
		applyMixins(obj, collateMixins(obj.mixins));
	}
	if (obj.statics) {
		extend(cl, obj.statics);
	}
	if (obj.propTypes) {
		cl.propTypes = obj.propTypes;
	}
	if (obj.defaultProps) {
		cl.defaultProps = obj.defaultProps;
	}
	if (obj.getDefaultProps) {
		cl.defaultProps = obj.getDefaultProps();
	}

	F.prototype = Component$1.prototype;
	cl.prototype = extend(new F(), obj);

	cl.displayName = obj.displayName || 'Component';

	return cl;
}

// Flatten an Array of mixins to a map of method name to mixin implementations
function collateMixins(mixins) {
	var keyed = {};
	for (var i = 0; i < mixins.length; i++) {
		var mixin = mixins[i];
		for (var key in mixin) {
			if (mixin.hasOwnProperty(key) && typeof mixin[key] === 'function') {
				(keyed[key] || (keyed[key] = [])).push(mixin[key]);
			}
		}
	}
	return keyed;
}

// apply a mapping of Arrays of mixin methods to a component prototype
function applyMixins(proto, mixins) {
	for (var key in mixins) {
		if (mixins.hasOwnProperty(key)) {
			proto[key] = multihook(mixins[key].concat(proto[key] || ARR), key === 'getDefaultProps' || key === 'getInitialState' || key === 'getChildContext');
		}
	}
}

function bindAll(ctx) {
	for (var i in ctx) {
		var v = ctx[i];
		if (typeof v === 'function' && !v.__bound && !AUTOBIND_BLACKLIST.hasOwnProperty(i)) {
			(ctx[i] = v.bind(ctx)).__bound = true;
		}
	}
}

function callMethod(ctx, m, args) {
	if (typeof m === 'string') {
		m = ctx.constructor.prototype[m];
	}
	if (typeof m === 'function') {
		return m.apply(ctx, args);
	}
}

function multihook(hooks, skipDuplicates) {
	return function () {
		var arguments$1 = arguments;
		var this$1 = this;

		var ret;
		for (var i = 0; i < hooks.length; i++) {
			var r = callMethod(this$1, hooks[i], arguments$1);

			if (skipDuplicates && r != null) {
				if (!ret) {
					ret = {};
				}
				for (var key in r) {
					if (r.hasOwnProperty(key)) {
						ret[key] = r[key];
					}
				}
			} else if (typeof r !== 'undefined') {
				ret = r;
			}
		}
		return ret;
	};
}

function newComponentHook(props, context) {
	propsHook.call(this, props, context);
	this.componentWillReceiveProps = multihook([propsHook, this.componentWillReceiveProps || 'componentWillReceiveProps']);
	this.render = multihook([propsHook, beforeRender, this.render || 'render', afterRender]);
}

function propsHook(props, context) {
	if (!props) {
		return;
	}

	// React annoyingly special-cases single children, and some react components are ridiculously strict about this.
	var c = props.children;
	if (c && Array.isArray(c) && c.length === 1 && (typeof c[0] === 'string' || typeof c[0] === 'function' || c[0] instanceof VNode)) {
		props.children = c[0];

		// but its totally still going to be an Array.
		if (props.children && typeof props.children === 'object') {
			props.children.length = 1;
			props.children[0] = props.children;
		}
	}

	// add proptype checking
	if (DEV) {
		var ctor = typeof this === 'function' ? this : this.constructor,
		    propTypes = this.propTypes || ctor.propTypes;
		var displayName = this.displayName || ctor.name;

		if (propTypes) {
			__WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.checkPropTypes(propTypes, props, 'prop', displayName);
		}
	}
}

function beforeRender(props) {
	currentComponent = this;
}

function afterRender() {
	if (currentComponent === this) {
		currentComponent = null;
	}
}

function Component$1(props, context, opts) {
	__WEBPACK_IMPORTED_MODULE_1_preact__["Component"].call(this, props, context);
	this.state = this.getInitialState ? this.getInitialState() : {};
	this.refs = {};
	this._refProxies = {};
	if (opts !== BYPASS_HOOK) {
		newComponentHook.call(this, props, context);
	}
}
extend(Component$1.prototype = new __WEBPACK_IMPORTED_MODULE_1_preact__["Component"](), {
	constructor: Component$1,

	isReactComponent: {},

	replaceState: function replaceState(state, callback) {
		var this$1 = this;

		this.setState(state, callback);
		for (var i in this$1.state) {
			if (!(i in state)) {
				delete this$1.state[i];
			}
		}
	},

	getDOMNode: function getDOMNode() {
		return this.base;
	},

	isMounted: function isMounted() {
		return !!this.base;
	}
});

function PureComponent(props, context) {
	Component$1.call(this, props, context);
}
F.prototype = Component$1.prototype;
PureComponent.prototype = new F();
PureComponent.prototype.isPureReactComponent = true;
PureComponent.prototype.shouldComponentUpdate = function (props, state) {
	return shallowDiffers(this.props, props) || shallowDiffers(this.state, state);
};

var index = {
	version: version,
	DOM: DOM,
	PropTypes: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a,
	Children: Children,
	render: render$1,
	createClass: createClass,
	createFactory: createFactory,
	createElement: createElement,
	cloneElement: cloneElement$1,
	isValidElement: isValidElement,
	findDOMNode: findDOMNode,
	unmountComponentAtNode: unmountComponentAtNode,
	Component: Component$1,
	PureComponent: PureComponent,
	unstable_renderSubtreeIntoContainer: renderSubtreeIntoContainer,
	__spread: extend
};

/* harmony default export */ __webpack_exports__["default"] = (index);
//# sourceMappingURL=preact-compat.es.js.map

/***/ }),

/***/ "g3LN":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = TextInput;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact__ = __webpack_require__("KM04");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_preact__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__style__ = __webpack_require__("ifb1");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__style___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__style__);




function TextInput(props) {
	var title = null;
	var highlight = null;

	function focusHighlight() {
		title.style.color = '#673AB7';
		highlight.style.transform = 'translate3d(0,0,0)';
		highlight.classList.add('isActive');
	}

	function blurHighlight() {
		title.style.color = 'rgba(0,0,0,.5)';
		highlight.style.transform = 'translate3d(-100%,0,0)';
		highlight.classList.remove('isActive');
	}

	function onlyNumeric(event) {
		if (event.keyCode < 48 || event.keyCode > 57) {
			event.preventDefault();
		}
	}

	function defaultInput(event) {}

	return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
		'label',
		{ className: __WEBPACK_IMPORTED_MODULE_1__style___default.a.TextInput },
		__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
			'span',
			{ className: __WEBPACK_IMPORTED_MODULE_1__style___default.a.TextInput_title, ref: function ref(span) {
					title = span;
				} },
			props.title
		),
		__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])('input', { className: __WEBPACK_IMPORTED_MODULE_1__style___default.a.TextInput_input,
			type: props.type,
			name: props.name,
			value: props.Value,
			placeholder: props.placeholder,
			maxlength: props.maxlength,
			onChange: props.onChange,
			onFocus: focusHighlight,
			onBlur: blurHighlight,
			onKeyPress: props.isNumeric ? onlyNumeric : defaultInput }),
		__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
			'div',
			{ className: __WEBPACK_IMPORTED_MODULE_1__style___default.a.TextInput_highlight },
			__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])('span', { className: __WEBPACK_IMPORTED_MODULE_1__style___default.a.TextInput_highlightItem, ref: function ref(span) {
					highlight = span;
				} })
		)
	);
}

/***/ }),

/***/ "ifb1":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"TextInput":"TextInput__1aqNj","TextInput_title":"TextInput_title__1qH4m","TextInput_input":"TextInput_input__2p7TV","TextInput_highlight":"TextInput_highlight__Yi5YI","TextInput_highlightItem":"TextInput_highlightItem__2Re2t"};

/***/ }),

/***/ "pT/t":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mobx__ = __webpack_require__("6uYi");
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _desc, _value, _class, _descriptor, _desc2, _value2, _class3, _descriptor2;

function _initDefineProp(target, property, descriptor, context) {
  if (!descriptor) return;
  Object.defineProperty(target, property, {
    enumerable: descriptor.enumerable,
    configurable: descriptor.configurable,
    writable: descriptor.writable,
    value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
  });
}

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

function _initializerWarningHelper(descriptor, context) {
  throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
}



var person = (_class = function person() {
  _classCallCheck(this, person);

  _initDefineProp(this, "id", _descriptor, this);
}, (_descriptor = _applyDecoratedDescriptor(_class.prototype, "id", [__WEBPACK_IMPORTED_MODULE_0_mobx__["observable"]], {
  enumerable: true,
  initializer: null
})), _class);
var KtpStore = (_class3 = function () {
  function KtpStore() {
    _classCallCheck(this, KtpStore);

    _initDefineProp(this, "dataKtp", _descriptor2, this);
  }

  KtpStore.prototype.addNewKtp = function addNewKtp(value) {
    var pihak = _extends({}, this.dataKtp);
    var noUrut = Object.keys(pihak).length - 1 + 1;
    // pihak[`${noUrut}`] = value;
    // pihak[value.nik] = value;
    this.dataKtp.push(value);
  };

  return KtpStore;
}(), (_descriptor2 = _applyDecoratedDescriptor(_class3.prototype, "dataKtp", [__WEBPACK_IMPORTED_MODULE_0_mobx__["observable"]], {
  enumerable: true,
  initializer: function initializer() {
    return [];
  }
})), _class3);


/* harmony default export */ __webpack_exports__["a"] = (new KtpStore());

// @observable dataKtp = {
//   0: {
//     nik: "3204070911850005",
//     gender: "male",
//     fullName: "Indra pratama putra"
//   },
//   1: {
//     nik:"3204070911850005",
//     gender: "female",
//     fullName: "Indra pratama putra"
//   },
// };

/***/ }),

/***/ "qLaj":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return App; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact__ = __webpack_require__("KM04");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_preact__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__header__ = __webpack_require__("sIAo");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__routes_home__ = __webpack_require__("E1C8");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__store_ktpStore__ = __webpack_require__("pT/t");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_mobx_react_devtools__ = __webpack_require__("5htX");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_mobx_react_devtools___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_mobx_react_devtools__);


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }


// import { Router } from 'preact-router';





// import Profile from '../routes/profile';
// import Home from 'async!./home';
// import Profile from 'async!./profile';

var _ref = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
	'div',
	{ id: 'app' },
	__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(__WEBPACK_IMPORTED_MODULE_4_mobx_react_devtools___default.a, null),
	__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(__WEBPACK_IMPORTED_MODULE_1__header__["a" /* default */], null),
	__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(__WEBPACK_IMPORTED_MODULE_2__routes_home__["a" /* default */], { store: __WEBPACK_IMPORTED_MODULE_3__store_ktpStore__["a" /* default */] })
);

var App = function (_Component) {
	_inherits(App, _Component);

	function App() {
		_classCallCheck(this, App);

		return _possibleConstructorReturn(this, _Component.apply(this, arguments));
	}

	App.prototype.render = function render() {
		return _ref;
	};

	return App;
}(__WEBPACK_IMPORTED_MODULE_0_preact__["Component"]);



/***/ }),

/***/ "rq4c":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "sIAo":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Header; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact__ = __webpack_require__("KM04");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_preact__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_preact_router_match__ = __webpack_require__("sw5u");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_preact_router_match___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_preact_router_match__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__style__ = __webpack_require__("u3et");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__style___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__style__);


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }





var _ref = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
	'h1',
	null,
	'Komparisi Generator'
);

var Header = function (_Component) {
	_inherits(Header, _Component);

	function Header() {
		_classCallCheck(this, Header);

		return _possibleConstructorReturn(this, _Component.apply(this, arguments));
	}

	Header.prototype.render = function render() {
		return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
			'header',
			{ 'class': __WEBPACK_IMPORTED_MODULE_2__style___default.a.header },
			_ref
		);
	};

	return Header;
}(__WEBPACK_IMPORTED_MODULE_0_preact__["Component"]);



/***/ }),

/***/ "sw5u":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Link = exports.Match = undefined;

var _extends = Object.assign || function (target) {
	for (var i = 1; i < arguments.length; i++) {
		var source = arguments[i];for (var key in source) {
			if (Object.prototype.hasOwnProperty.call(source, key)) {
				target[key] = source[key];
			}
		}
	}return target;
};

var _preact = __webpack_require__("KM04");

var _preactRouter = __webpack_require__("/QC5");

function _objectWithoutProperties(obj, keys) {
	var target = {};for (var i in obj) {
		if (keys.indexOf(i) >= 0) continue;if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;target[i] = obj[i];
	}return target;
}

function _classCallCheck(instance, Constructor) {
	if (!(instance instanceof Constructor)) {
		throw new TypeError("Cannot call a class as a function");
	}
}

function _possibleConstructorReturn(self, call) {
	if (!self) {
		throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	}return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
	if (typeof superClass !== "function" && superClass !== null) {
		throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
	}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var Match = exports.Match = function (_Component) {
	_inherits(Match, _Component);

	function Match() {
		var _temp, _this, _ret;

		_classCallCheck(this, Match);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.update = function (url) {
			_this.nextUrl = url;
			_this.setState({});
		}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	Match.prototype.componentDidMount = function componentDidMount() {
		_preactRouter.subscribers.push(this.update);
	};

	Match.prototype.componentWillUnmount = function componentWillUnmount() {
		_preactRouter.subscribers.splice(_preactRouter.subscribers.indexOf(this.update) >>> 0, 1);
	};

	Match.prototype.render = function render(props) {
		var url = this.nextUrl || (0, _preactRouter.getCurrentUrl)(),
		    path = url.replace(/\?.+$/, '');
		this.nextUrl = null;
		return props.children[0] && props.children[0]({
			url: url,
			path: path,
			matches: path === props.path
		});
	};

	return Match;
}(_preact.Component);

var Link = function Link(_ref) {
	var activeClassName = _ref.activeClassName,
	    path = _ref.path,
	    props = _objectWithoutProperties(_ref, ['activeClassName', 'path']);

	return (0, _preact.h)(Match, { path: path || props.href }, function (_ref2) {
		var matches = _ref2.matches;
		return (0, _preact.h)(_preactRouter.Link, _extends({}, props, { 'class': [props.class || props.className, matches && activeClassName].filter(Boolean).join(' ') }));
	});
};

exports.Link = Link;
exports.default = Match;

Match.Link = Link;

/***/ }),

/***/ "u3et":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"header":"header__2MqSo","active":"active__27Q54"};

/***/ }),

/***/ "wRU+":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var validateFormat = function validateFormat(format) {};

if (false) {
  validateFormat = function validateFormat(format) {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  };
}

function invariant(condition, format, a, b, c, d, e, f) {
  validateFormat(format);

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(format.replace(/%s/g, function () {
        return args[argIndex++];
      }));
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
}

module.exports = invariant;

/***/ }),

/***/ "wVGV":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */



var emptyFunction = __webpack_require__("UQex");
var invariant = __webpack_require__("wRU+");
var ReactPropTypesSecret = __webpack_require__("Asjh");

module.exports = function () {
  function shim(props, propName, componentName, location, propFullName, secret) {
    if (secret === ReactPropTypesSecret) {
      // It is still safe when called from React.
      return;
    }
    invariant(false, 'Calling PropTypes validators directly is not supported by the `prop-types` package. ' + 'Use PropTypes.checkPropTypes() to call them. ' + 'Read more at http://fb.me/use-check-prop-types');
  };
  shim.isRequired = shim;
  function getShim() {
    return shim;
  };
  // Important!
  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
  var ReactPropTypes = {
    array: shim,
    bool: shim,
    func: shim,
    number: shim,
    object: shim,
    string: shim,
    symbol: shim,

    any: shim,
    arrayOf: getShim,
    element: shim,
    instanceOf: getShim,
    node: shim,
    objectOf: getShim,
    oneOf: getShim,
    oneOfType: getShim,
    shape: getShim
  };

  ReactPropTypes.checkPropTypes = emptyFunction;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};

/***/ })

/******/ });
//# sourceMappingURL=ssr-bundle.js.map