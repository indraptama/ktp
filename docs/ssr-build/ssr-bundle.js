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
module.exports = {"flex":"flex__ZHp8F","w_50":"w_50__3Y4Cq","mh1":"mh1__37eSl","mr1":"mr1__2OFrI","pl1":"pl1__1eDZH"};

/***/ }),

/***/ "5qQg":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"DropDown":"DropDown__AR0Vc","DropDown_title":"DropDown_title__NV810","DropDown_input":"DropDown_input__1xtsq","DropDown_highlight":"DropDown_highlight___NYpg","DropDown_highlightItem":"DropDown_highlightItem__3QXhO"};

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

/***/ "BrQb":
/***/ (function(module, exports) {

function numToMonth(s) {
  var MonthWord = '';
  var Month = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
  var sNum = parseFloat(s);
  var MonthNumber = sNum - 1;
  MonthWord = Month[MonthNumber];
  return MonthWord;
}

module.exports = numToMonth;

/***/ }),

/***/ "E1C8":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Home; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact__ = __webpack_require__("KM04");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_preact__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__style__ = __webpack_require__("ZAL5");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__style___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__style__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_style__ = __webpack_require__("2AN3");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_style___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__components_style__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_KtpField__ = __webpack_require__("ZwNj");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_KtpResult__ = __webpack_require__("K+dO");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_UserCard__ = __webpack_require__("6ATj");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_ButtonFab__ = __webpack_require__("crmn");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__components_Modal__ = __webpack_require__("TDbV");
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }










var mockupData = {
  _id: "3212015607900005",
  nik: "3212015607900005",
  fullName: "Jessica Veranda",
  bornPlace: "jakarta",
  bornDay: "01",
  bornMonth: "12",
  bornYear: "1985",
  gender: "female",
  streetAddress: "jalan jakarta 48",
  rt: "004",
  rw: "008",
  kelurahanType: "kelurahan",
  kelurahanName: "senayan",
  kecamatan: "senayan",
  cityType: "kota",
  cityName: "jakarta pusat",
  martialStatus: "single",
  occupation: "idol"
};

var _ref = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
  'h6',
  null,
  'Pihak Pertama'
);

var _ref2 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
  'i',
  { 'class': 'material-icons md-24' },
  'add'
);

var Home = function (_Component) {
  _inherits(Home, _Component);

  function Home(props) {
    _classCallCheck(this, Home);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.state = {
      pihak_1: {},
      pihak_2: {},
      modalOpen: false
    };
    _this.handleSaveData = _this.handleSaveData.bind(_this);
    _this.modalOpen = _this.modalOpen.bind(_this);
    _this.modalClose = _this.modalClose.bind(_this);
    return _this;
  }

  Home.prototype.handleSaveData = function handleSaveData(data) {
    var pihak_1 = _extends({}, this.state.pihak_1);
    var noUrut = Object.keys(pihak_1).length - 1 + 1;
    var nik = data.nik;
    pihak_1['' + noUrut] = data;
    // pihak_1[`${noUrut}_${data._id}`] = data;
    // pihak_1[data._id] = data;
    this.setState({
      pihak_1: pihak_1,
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
    var _this2 = this;

    var persons = this.state.pihak_1;

    var userCards = Object.keys(persons).map(function (person) {
      return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
        'div',
        { key: persons[person].nik },
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(__WEBPACK_IMPORTED_MODULE_5__components_UserCard__["a" /* default */], { gender: persons[person].gender,
          fullName: persons[person].fullName,
          nik: persons[person].nik })
      );
    });

    var resultPihaks_1 = Object.keys(persons).map(function (person) {
      return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
        'div',
        { key: persons[person].nik },
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(__WEBPACK_IMPORTED_MODULE_4__components_KtpResult__["a" /* default */], { dataKTP: persons[person], editButton: _this2.modalOpen })
      );
    });

    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
      'div',
      { className: __WEBPACK_IMPORTED_MODULE_1__style___default.a.home },
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
        'div',
        { className: __WEBPACK_IMPORTED_MODULE_2__components_style___default.a.flex },
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
          'div',
          { className: [__WEBPACK_IMPORTED_MODULE_2__components_style___default.a.w_50, __WEBPACK_IMPORTED_MODULE_1__style___default.a.Compasitor].join(' ') },
          __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
            'div',
            { className: __WEBPACK_IMPORTED_MODULE_1__style___default.a.party },
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
              'header',
              { className: __WEBPACK_IMPORTED_MODULE_1__style___default.a.partyHeader },
              _ref
            ),
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
              'div',
              { className: __WEBPACK_IMPORTED_MODULE_1__style___default.a.partyList },
              userCards
            ),
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
              'div',
              { className: __WEBPACK_IMPORTED_MODULE_1__style___default.a.partyFooter },
              __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
                __WEBPACK_IMPORTED_MODULE_6__components_ButtonFab__["a" /* default */],
                { onClick: this.modalOpen },
                _ref2
              )
            )
          )
        ),
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
          'div',
          { className: [__WEBPACK_IMPORTED_MODULE_2__components_style___default.a.w_50, __WEBPACK_IMPORTED_MODULE_1__style___default.a.ResultPaper].join(' ') },
          __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
            'ol',
            null,
            resultPihaks_1
          )
        )
      ),
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
        __WEBPACK_IMPORTED_MODULE_7__components_Modal__["a" /* default */],
        { isActive: this.state.modalOpen },
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(__WEBPACK_IMPORTED_MODULE_3__components_KtpField__["a" /* default */], { outputData: this.handleSaveData, cancelInput: this.modalClose, inputData: mockupData })
      )
    );
  };

  return Home;
}(__WEBPACK_IMPORTED_MODULE_0_preact__["Component"]);




{/* <KtpField saveData={this.handleSaveData} /> */}

{/* <UserCard gender={"male"} fullName="Tn. indra pratama putra" nik="12345678912345" onClick={console.log('hallo')}/> */}

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

/***/ "K+dO":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact__ = __webpack_require__("KM04");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_preact__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__library_numtoword__ = __webpack_require__("rkZl");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__library_numtoword___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__library_numtoword__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__library_numtomonth__ = __webpack_require__("BrQb");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__library_numtomonth___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__library_numtomonth__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__style__ = __webpack_require__("dFd0");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__style___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__style__);






var _ref = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
	'span',
	null,
	' (Untuk sementara berada di Kabupaten Bandung).'
);

var _ref2 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])('img', { src: 'assets/icons/edit.svg', alt: '' });

function KtpResult(props) {

	var DataKtp = props.dataKTP;
	var templateSource = {
		nik: DataKtp.nik,
		fullName: DataKtp.fullName,
		bornPlace: DataKtp.bornPlace,
		bornDate: DataKtp.bornDate,
		gender: DataKtp.gender,
		streetAddress: DataKtp.streetAddress,
		rt: DataKtp.rt,
		rw: DataKtp.rw,
		kelurahanType: DataKtp.kelurahanType,
		kelurahanName: DataKtp.kelurahanName,
		kecamatan: DataKtp.kecamatan,
		cityType: DataKtp.cityType,
		cityName: DataKtp.cityName,
		martialStatus: DataKtp.martialStatus,
		occupation: DataKtp.occupation
	};

	var fullNameUpperCase = templateSource.fullName.toUpperCase();
	var personTitle = getTitle(templateSource.gender, templateSource.martialStatus);
	var bornDataArray = templateSource.bornDate.split('-').map(function (key) {
		return parseInt(key, 10);
	});
	var bornDateW = __WEBPACK_IMPORTED_MODULE_1__library_numtoword___default()(bornDataArray[0]);
	var bornMonthW = __WEBPACK_IMPORTED_MODULE_2__library_numtomonth___default()(bornDataArray[1]);
	var bornYearW = __WEBPACK_IMPORTED_MODULE_1__library_numtoword___default()(bornDataArray[2]);

	var bornDateWord = bornDateW + ' ' + bornMonthW + ' ' + bornYearW;
	var cityTypeAndName = templateSource.cityType + +templateSource.cityName;

	var notarisLocation = function notarisLocation(_notarisLocation, peopleLocation) {
		if (_notarisLocation !== peopleLocation) {
			return _ref;
		}
	};

	return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
		'div',
		{ className: __WEBPACK_IMPORTED_MODULE_3__style___default.a.result },
		__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
			'p',
			null,
			personTitle + ' ' + fullNameUpperCase + ', lahir di ' + templateSource.bornPlace + ' pada tanggal ' + templateSource.bornDate + ' (' + bornDateWord + '). ' + templateSource.occupation + '. Pemegang Kartu Tanda Penduduk dengan Nomor Induk Kependudukan (NIK) ' + templateSource.nik + '. Bertempat tinggal di ' + templateSource.cityType + ' ' + templateSource.cityName + ', ' + templateSource.streetAddress + ', Rukun Tetangga ' + templateSource.rt + ', Rukun Warga ' + templateSource.rw + ', ' + templateSource.kelurahanType + ' ' + templateSource.kelurahanName + ', Kecamatan  ' + templateSource.kecamatan + '. Warga Negara Indonesia.',
			notarisLocation('bandung', templateSource.cityName)
		),
		__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
			'div',
			{ className: __WEBPACK_IMPORTED_MODULE_3__style___default.a.resultAction },
			__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
				'a',
				{ href: '#', onClick: props.editButton },
				_ref2
			)
		)
	);
}

function getTitle(gender, martialStatus) {
	if (gender === 'male') {
		return 'Tuan';
	} else if (gender === 'female' && martialStatus === 'single') {
		return 'Nona';
	}
	return 'Nyonya';
}

/* harmony default export */ __webpack_exports__["a"] = (KtpResult);

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

/***/ "ZAL5":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"home":"home__MseGd","Compasitor":"Compasitor__ZgeZB","ResultPaper":"ResultPaper__3dMT2","partyHeader":"partyHeader__1j1b1","partyList":"partyList__3LWq1","partyFooter":"partyFooter__3NBMQ"};

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
      _id: _this.props.inputData._id,
      nik: _this.props.inputData.nik,
      fullName: _this.props.inputData.fullName,
      bornPlace: _this.props.inputData.bornPlace,
      bornDay: _this.props.inputData.bornDay,
      bornMonth: _this.props.inputData.bornMonth,
      bornYear: _this.props.inputData.bornYear,
      gender: _this.props.inputData.gender,
      streetAddress: _this.props.inputData.streetAddress,
      rt: _this.props.inputData.rt,
      rw: _this.props.inputData.rw,
      kelurahanType: _this.props.inputData.kelurahanType,
      kelurahanName: _this.props.inputData.kelurahanName,
      kecamatan: _this.props.inputData.kecamatan,
      cityType: _this.props.inputData.cityType,
      cityName: _this.props.inputData.cityName,
      martialStatus: _this.props.inputData.martialStatus,
      occupation: _this.props.inputData.occupation
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
      //  Export State to Parent Components as Object
    };this.props.outputData(dataKTP);

    // Reset State to initial Value
    this.setState({
      _id: '',
      nik: '',
      fullName: '',
      bornPlace: '',
      bornDay: '',
      bornMonth: '',
      bornYear: '',
      gender: 'male',
      streetAddress: '',
      rt: '',
      rw: '',
      kelurahanType: 'desa',
      kelurahanName: '',
      kecamatan: '',
      cityType: 'kabupaten',
      cityName: '',
      martialStatus: 'single',
      occupation: ''
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
        console.log(NIKParser);
        _this2.setState({
          nik: Value,
          bornDay: NIKParser.bornDay,
          bornMonth: NIKParser.bornMonth,
          bornYear: NIKParser.bornYear,
          gender: NIKParser.gender
        });
      } else {
        console.log('error');
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
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(__WEBPACK_IMPORTED_MODULE_4__TextInput__["a" /* default */], { Value: this.state.kelurahanName, title: 'Nama Desa/Kelurahan', name: 'kelurahanName', placeholder: 'contoh: Desa Bersemi Indah', onChange: this.handleInputChange })
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
module.exports = {"UserCard":"UserCard__29FHg","UserCard_img":"UserCard_img__SWDzD","UserCard_desc":"UserCard_desc__ogYKZ"};

/***/ }),

/***/ "aDwu":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"KtpField":"KtpField__2BBBY","KtpField_header":"KtpField_header__jll1w","KtpField_action":"KtpField_action__1TM8l","KtpField_buttonSave":"KtpField_buttonSave__1i4Il"};

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

/***/ "dFd0":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"result":"result__3Uy9H","resultAction":"resultAction__3EQ9Q"};

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
module.exports = {"TextInput":"TextInput__2w7dK","TextInput_title":"TextInput_title__2LaeE","TextInput_input":"TextInput_input__1t_xF","TextInput_highlight":"TextInput_highlight__16Rj0","TextInput_highlightItem":"TextInput_highlightItem__1Sz3I"};

/***/ }),

/***/ "qLaj":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return App; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact__ = __webpack_require__("KM04");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_preact__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_preact_router__ = __webpack_require__("/QC5");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__header__ = __webpack_require__("sIAo");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__routes_home__ = __webpack_require__("E1C8");


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }






// import Profile from '../routes/profile';
// import Home from 'async!./home';
// import Profile from 'async!./profile';

var _ref = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(__WEBPACK_IMPORTED_MODULE_2__header__["a" /* default */], null);

var _ref2 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(__WEBPACK_IMPORTED_MODULE_3__routes_home__["a" /* default */], { path: '/ktp/' });

var App = function (_Component) {
	_inherits(App, _Component);

	function App() {
		var _temp, _this, _ret;

		_classCallCheck(this, App);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.handleRoute = function (e) {
			_this.currentUrl = e.url;
		}, _temp), _possibleConstructorReturn(_this, _ret);
	}
	/** Gets fired when the route changes.
  *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
  *	@param {string} event.url	The newly routed URL
  */


	App.prototype.render = function render() {
		return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
			'div',
			{ id: 'app' },
			_ref,
			__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
				__WEBPACK_IMPORTED_MODULE_1_preact_router__["Router"],
				{ onChange: this.handleRoute },
				_ref2
			)
		);
	};

	return App;
}(__WEBPACK_IMPORTED_MODULE_0_preact__["Component"]);



/***/ }),

/***/ "rkZl":
/***/ (function(module, exports) {

// Function for convert number to Indonesian Word
function numToWord(s) {
    var th = ['', 'ribu', 'juta', 'milyar', 'triliun'];
    var dg = ['nol', 'satu', 'dua', 'tiga', 'empat', 'lima', 'enam', 'tujuh', 'delapan', 'sembilan'];
    var tn = ['sepuluh', 'sebelas', 'dua belas', 'tiga belas', 'empat belas', 'lima belas', 'enam belas', 'tujuh belas', 'delapan belas', 'sembilan belas'];
    var tw = ['dua puluh', 'tiga puluh', 'empat puluh', 'lima puluh', 'enam puluh', 'tujuh puluh', 'delapan puluh', 'sembilan puluh'];

    s = s.toString();
    s = s.replace(/[, ]/g, '');
    if (s != parseFloat(s)) return 'XXXX';

    // handle koma
    var x = s.indexOf(',');
    if (x === -1) x = s.length;
    if (x > 15) return 'nomor terlalu besar';

    var n = s.split('');
    var str = '';
    var sk = 0;

    for (var i = 0; i < x; i++) {
        if ((x - i) % 3 === 2) {
            if (n[i] === '1') {
                str += tn[Number(n[i + 1])] + ' ';
                i++;
                sk = 1;
            } else if (n[i] !== 0) {
                str += tw[n[i] - 2] + ' ';
                sk = 1;
            }
        } else if (n[i] !== 0) {
            str += dg[n[i]] + ' ';
            if ((x - i) % 3 === 0) str += 'ratus ';
            sk = 1;
        }

        if ((x - i) % 3 === 1) {
            if (sk) str += th[(x - i - 1) / 3] + ' ';
            sk = 0;
        }
    }
    if (x !== s.length) {
        var y = s.length;
        str += 'koma';
        for (var j = x + 1; j < y; j++) {
            str += dg[n[j]] + ' ';
        }
    }
    return str.replace(/\s+/g, ' ').replace("satu ratus", "seratus").replace("satu ribu", "seribu").replace("satu puluh", "sepuluh");
};

module.exports = numToWord;

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
module.exports = {"header":"header__3QGkI","active":"active__3gItZ"};

/***/ })

/******/ });
//# sourceMappingURL=ssr-bundle.js.map