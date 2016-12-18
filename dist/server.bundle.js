/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 46);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	module.exports = require("react");

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = require("react-redux");

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.audioURL = exports.quarters = exports.getStep = exports.getSteps = undefined;

	var _LearnActions = __webpack_require__(5);

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	// Initial State
	var initialState = { data: [] };

	var LearnReducer = function LearnReducer() {
	  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
	  var action = arguments[1];

	  switch (action.type) {
	    case _LearnActions.ADD_STEP:
	      return {
	        data: [action.step].concat(_toConsumableArray(state.data))
	      };

	    case _LearnActions.ADD_STEPS:
	      return {
	        data: action.steps
	      };

	    case _LearnActions.NEXT:
	      return {
	        data: [action.step].concat(_toConsumableArray(state.data))
	      };

	    case _LearnActions.PREVIOUS:
	      return {
	        data: [action.step].concat(_toConsumableArray(state.data))
	      };

	    default:
	      return state;
	  }
	};

	/* Selectors */

	// Get all steps
	var getSteps = exports.getSteps = function getSteps(state) {
	  return state.steps.data;
	};

	// Get post by cuid
	var getStep = exports.getStep = function getStep(state, cuid) {
	  return state.steps.data.filter(function (step) {
	    return step.cuid === cuid;
	  })[0];
	};

	var quarters = exports.quarters = ['00', '15', '30', '45'];

	var audioURL = exports.audioURL = 'http://floe.media/slock/audio/';

	// Export Reducer
	exports.default = LearnReducer;

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = require("react-router");

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = require("react-helmet");

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.RANDOM_SOUND = exports.ADD_STEPS = exports.ADD_STEP = exports.PREV = exports.NEXT = undefined;
	exports.nextStep = nextStep;
	exports.prevStep = prevStep;
	exports.addStep = addStep;
	exports.addStepRequest = addStepRequest;
	exports.addSteps = addSteps;
	exports.fetchSteps = fetchSteps;
	exports.fetchStep = fetchStep;
	exports.randomSound = randomSound;

	var _apiCaller = __webpack_require__(44);

	var _apiCaller2 = _interopRequireDefault(_apiCaller);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// Export Constants
	var NEXT = exports.NEXT = 'NEXT';
	var PREV = exports.PREV = 'PREV';
	var ADD_STEP = exports.ADD_STEP = 'ADD_STEP';
	var ADD_STEPS = exports.ADD_STEPS = 'ADD_STEPS';
	var RANDOM_SOUND = exports.RANDOM_SOUND = 'RANDOM_SOUND';

	// Export Actions
	function nextStep(step) {
	  return {
	    type: NEXT,
	    step: step
	  };
	}

	function prevStep(step) {
	  return {
	    type: PREV,
	    step: step
	  };
	}

	function addStep(step) {
	  return {
	    type: ADD_STEP,
	    step: step
	  };
	}

	function addStepRequest(step) {
	  return function (dispatch) {
	    return (0, _apiCaller2.default)('learn', 'post', {
	      step: {
	        title: step.title,
	        number: step.number,
	        desc: step.desc
	      }
	    }).then(function (res) {
	      return dispatch(addStep(res.step));
	    });
	  };
	}

	function addSteps(steps) {
	  return {
	    type: ADD_STEPS,
	    steps: steps
	  };
	}

	function fetchSteps() {
	  return function (dispatch) {
	    return (0, _apiCaller2.default)('learn').then(function (res) {
	      dispatch(addSteps(res.steps));
	    });
	  };
	}

	function fetchStep(cuid) {
	  return function (dispatch) {
	    return (0, _apiCaller2.default)('/learn/' + cuid).then(function (res) {
	      return dispatch(addStep(res.step));
	    });
	  };
	}

	function randomSound() {
	  return {
	    type: RANDOM_SOUND
	  };
	}

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(0);

	var _react2 = _interopRequireDefault(_react);

	var _reactRedux = __webpack_require__(1);

	var _LearnList = __webpack_require__(41);

	var _LearnList2 = _interopRequireDefault(_LearnList);

	var _LearnActions = __webpack_require__(5);

	var _LearnReducer = __webpack_require__(2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	// Import Components


	// Import Actions


	// Import Selectors


	var LearnListPage = function (_Component) {
	  _inherits(LearnListPage, _Component);

	  function LearnListPage() {
	    _classCallCheck(this, LearnListPage);

	    return _possibleConstructorReturn(this, (LearnListPage.__proto__ || Object.getPrototypeOf(LearnListPage)).apply(this, arguments));
	  }

	  _createClass(LearnListPage, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      this.props.dispatch((0, _LearnActions.fetchSteps)());
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return _jsx(_LearnList2.default, {
	        steps: this.props.steps
	      });
	    }
	  }]);

	  return LearnListPage;
	}(_react.Component);

	// Actions required to provide data for this component to render in sever side.


	LearnListPage.need = [function () {
	  return (0, _LearnActions.fetchSteps)();
	}];

	// Retrieve data from store as props
	function mapStateToProps(state) {
	  return {
	    steps: (0, _LearnReducer.getSteps)(state)
	  };
	}

	LearnListPage.contextTypes = {
	  router: _react2.default.PropTypes.object
	};

	exports.default = (0, _reactRedux.connect)(mapStateToProps)(LearnListPage);

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = require("react-intl");

/***/ },
/* 8 */
/***/ function(module, exports) {

	"use strict";
	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var config = {
	  mongoURL: process.env.MONGO_URL || 'mongodb://localhost:27017/slock',
	  port: process.env.PORT || 8000
	};

	exports.default = config;

/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = require("express");

/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = require("mongoose");

/***/ },
/* 11 */
/***/ function(module, exports) {

	module.exports = require("webpack");

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.localizationData = exports.enabledLanguages = undefined;

	var _reactIntl = __webpack_require__(7);

	var _intl = __webpack_require__(48);

	var _intl2 = _interopRequireDefault(_intl);

	var _intlLocalesSupported = __webpack_require__(49);

	var _intlLocalesSupported2 = _interopRequireDefault(_intlLocalesSupported);

	__webpack_require__(50);

	var _en = __webpack_require__(56);

	var _en2 = _interopRequireDefault(_en);

	var _en3 = __webpack_require__(30);

	var _en4 = _interopRequireDefault(_en3);

	__webpack_require__(51);

	var _fr = __webpack_require__(57);

	var _fr2 = _interopRequireDefault(_fr);

	var _fr3 = __webpack_require__(31);

	var _fr4 = _interopRequireDefault(_fr3);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// list of available languages
	var enabledLanguages = exports.enabledLanguages = ['en', 'fr'];

	// this object will have language-specific data added to it which will be placed in the state when that language is active
	// if localization data get to big, stop importing in all languages and switch to using API requests to load upon switching languages
	var localizationData = exports.localizationData = {};

	// here you bring in 'intl' browser polyfill and language-specific polyfills
	// (needed as safari doesn't have native intl: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl)
	// as well as react-intl's language-specific data
	// be sure to use static imports for language or else every language will be included in your build (adds ~800 kb)


	// need Intl polyfill, Intl not supported in Safari


	if (global.Intl) {
	  // Determine if the built-in `Intl` has the locale data we need.
	  if (!(0, _intlLocalesSupported2.default)(enabledLanguages)) {
	    // `Intl` exists, but it doesn't have the data we need, so load the
	    // polyfill and patch the constructors we need with the polyfill's.
	    global.Intl.NumberFormat = _intl2.default.NumberFormat;
	    global.Intl.DateTimeFormat = _intl2.default.DateTimeFormat;
	  }
	} else {
	  // No `Intl`, so use and load the polyfill.
	  global.Intl = _intl2.default;
	}

	// use this to allow nested messages, taken from docs:
	// https://github.com/yahoo/react-intl/wiki/Upgrade-Guide#flatten-messages-object
	function flattenMessages() {
	  var nestedMessages = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	  var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

	  return Object.keys(nestedMessages).reduce(function (messages, key) {
	    var value = nestedMessages[key];
	    var prefixedKey = prefix ? prefix + '.' + key : key;

	    if (typeof value === 'string') {
	      messages[prefixedKey] = value; // eslint-disable-line no-param-reassign
	    } else {
	      Object.assign(messages, flattenMessages(value, prefixedKey));
	    }

	    return messages;
	  }, {});
	}

	// bring in intl polyfill, react-intl, and app-specific language data

	(0, _reactIntl.addLocaleData)(_en2.default);
	localizationData.en = _en4.default;
	localizationData.en.messages = flattenMessages(localizationData.en.messages);

	(0, _reactIntl.addLocaleData)(_fr2.default);
	localizationData.fr = _fr4.default;
	localizationData.fr.messages = flattenMessages(localizationData.fr.messages);

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();

	var _react = __webpack_require__(0);

	var _react2 = _interopRequireDefault(_react);

	var _reduxDevtools = __webpack_require__(59);

	var _reduxDevtoolsLogMonitor = __webpack_require__(61);

	var _reduxDevtoolsLogMonitor2 = _interopRequireDefault(_reduxDevtoolsLogMonitor);

	var _reduxDevtoolsDockMonitor = __webpack_require__(60);

	var _reduxDevtoolsDockMonitor2 = _interopRequireDefault(_reduxDevtoolsDockMonitor);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = (0, _reduxDevtools.createDevTools)(_jsx(_reduxDevtoolsDockMonitor2.default, {
	  toggleVisibilityKey: 'ctrl-h',
	  changePositionKey: 'ctrl-w'
	}, void 0, _jsx(_reduxDevtoolsLogMonitor2.default, {})));

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.LearnPage = undefined;

	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(0);

	var _react2 = _interopRequireDefault(_react);

	var _reactRedux = __webpack_require__(1);

	var _reactHelmet = __webpack_require__(4);

	var _reactHelmet2 = _interopRequireDefault(_reactHelmet);

	var _Clock = __webpack_require__(39);

	var _Clock2 = _interopRequireDefault(_Clock);

	var _Guesser = __webpack_require__(40);

	var _Guesser2 = _interopRequireDefault(_Guesser);

	var _LearnActions = __webpack_require__(5);

	var _LearnReducer = __webpack_require__(2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	// Import Actions


	// Import Selectors


	var LearnPage = exports.LearnPage = function (_Component) {
	  _inherits(LearnPage, _Component);

	  function LearnPage(props) {
	    _classCallCheck(this, LearnPage);

	    var _this = _possibleConstructorReturn(this, (LearnPage.__proto__ || Object.getPrototypeOf(LearnPage)).call(this, props));

	    _this.updateComponentState = function (time) {
	      _this.setState({
	        time: time
	      });
	    };

	    _this.state = {
	      isMounted: false,
	      time: {
	        hour: '',
	        minutes: ''
	      }
	    };
	    return _this;
	  }

	  _createClass(LearnPage, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      /* this.setState({
	        isMounted: true,
	      }); */ // eslint-disable-line
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return _jsx('div', {}, void 0, _jsx(_reactHelmet2.default, {
	        title: this.props.step.title
	      }), _jsx('div', {}, void 0, _jsx('h3', {}, void 0, this.props.step.title), _jsx('p', {}, void 0, this.props.step.desc), _jsx(_Clock2.default, {
	        onPlay: this.updateComponentState
	      }), _jsx(_Guesser2.default, {
	        time: this.state.time
	      })));
	    }
	  }]);

	  return LearnPage;
	}(_react.Component);

	// Actions required to provide data for this component to render in sever side.


	LearnPage.need = [function (params) {
	  return (0, _LearnActions.fetchStep)(params.cuid);
	}];

	// Retrieve data from store as props
	function mapStateToProps(state, props) {
	  return {
	    step: (0, _LearnReducer.getStep)(state, props.params.cuid)
	  };
	}

	exports.default = (0, _reactRedux.connect)(mapStateToProps)(LearnPage);

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _mongoose = __webpack_require__(10);

	var _mongoose2 = _interopRequireDefault(_mongoose);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Schema = _mongoose2.default.Schema;

	var stepSchema = new Schema({
	  title: { type: 'String', required: true },
	  number: { type: 'Number', required: true },
	  desc: { type: 'String', required: true },
	  slug: { type: 'String', required: true },
	  cuid: { type: 'String', required: true },
	  dateAdded: { type: 'Date', default: Date.now, required: true }
	});

	exports.default = _mongoose2.default.model('Step', stepSchema);

/***/ },
/* 16 */
/***/ function(module, exports) {

	module.exports = require("redux");

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.IntlWrapper = IntlWrapper;

	var _react = __webpack_require__(0);

	var _react2 = _interopRequireDefault(_react);

	var _reactIntl = __webpack_require__(7);

	var _reactRedux = __webpack_require__(1);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function IntlWrapper(props) {
	  return _react2.default.createElement(
	    _reactIntl.IntlProvider,
	    props.intl,
	    props.children
	  );
	}

	// Retrieve data from store as props
	function mapStateToProps(store) {
	  return {
	    intl: store.intl
	  };
	}

	exports.default = (0, _reactRedux.connect)(mapStateToProps)(IntlWrapper);

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }(); /* eslint-disable global-require */


	var _react = __webpack_require__(0);

	var _react2 = _interopRequireDefault(_react);

	var _reactRouter = __webpack_require__(3);

	var _App = __webpack_require__(32);

	var _App2 = _interopRequireDefault(_App);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// require.ensure polyfill for node
	if (false) {
	  require.ensure = function requireModule(deps, callback) {
	    callback(require);
	  };
	}

	/* Workaround for async react routes to work with react-hot-reloader till
	  https://github.com/reactjs/react-router/issues/2182 and
	  https://github.com/gaearon/react-hot-loader/issues/288 is fixed.
	 */
	if (process.env.NODE_ENV !== 'production') {
	  // Require async routes only in development for react-hot-reloader to work.
	  __webpack_require__(6);
	  __webpack_require__(14);
	}

	// react-router setup with code-splitting
	// More info: http://blog.mxstbr.com/2016/01/react-apps-with-pages/
	exports.default = _jsx(_reactRouter.Route, {
	  path: '/',
	  component: _App2.default
	}, void 0, _jsx(_reactRouter.IndexRoute, {
	  getComponent: function getComponent(nextState, cb) {
	    Promise.resolve().catch(function(err) { __webpack_require__.oe(err); }).then((function (require) {
	      cb(null, __webpack_require__(6).default);
	    }).bind(null, __webpack_require__));
	  }
	}), _jsx(_reactRouter.Route, {
	  path: '/learn',
	  getComponent: function getComponent(nextState, cb) {
	    Promise.resolve().catch(function(err) { __webpack_require__.oe(err); }).then((function (require) {
	      cb(null, __webpack_require__(6).default);
	    }).bind(null, __webpack_require__));
	  }
	}), _jsx(_reactRouter.Route, {
	  path: '/learn/:slug-:cuid',
	  getComponent: function getComponent(nextState, cb) {
	    Promise.resolve().catch(function(err) { __webpack_require__.oe(err); }).then((function (require) {
	      cb(null, __webpack_require__(14).default);
	    }).bind(null, __webpack_require__));
	  }
	}));

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.configureStore = configureStore;

	var _redux = __webpack_require__(16);

	var _reduxThunk = __webpack_require__(62);

	var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

	var _DevTools = __webpack_require__(13);

	var _DevTools2 = _interopRequireDefault(_DevTools);

	var _reducers = __webpack_require__(43);

	var _reducers2 = _interopRequireDefault(_reducers);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Main store function
	 */
	function configureStore() {
	  var initialState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	  // Middleware and store enhancers
	  var enhancers = [(0, _redux.applyMiddleware)(_reduxThunk2.default)];

	  if (process.env.CLIENT && process.env.NODE_ENV === 'development') {
	    // Enable DevTools only when rendering on client and during development.
	    enhancers.push(window.devToolsExtension ? window.devToolsExtension() : _DevTools2.default.instrument());
	  }

	  var store = (0, _redux.createStore)(_reducers2.default, initialState, _redux.compose.apply(undefined, enhancers));

	  // For hot reloading reducers
	  if (false) {
	    // Enable Webpack hot module replacement for reducers
	    module.hot.accept('./reducers', function () {
	      var nextReducer = require('./reducers').default; // eslint-disable-line global-require
	      store.replaceReducer(nextReducer);
	    });
	  }

	  return store;
	}

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	exports.default = function () {
	  _step2.default.remove({}, function () {});
	  _step2.default.count().exec(function (err, count) {
	    if (count > 0) {
	      return;
	    }

	    var content1 = 'Learn slocks basics by listening to some times.';

	    var content2 = 'Listen to some times and guess.';

	    var step1 = new _step2.default({ number: 1, title: 'Learn the Basics', slug: 'learn-the-basics', cuid: 'cikqgkv4q01ck7453ualdn3hd', desc: content1 });
	    var step2 = new _step2.default({ number: 2, title: 'Try it Yourself', slug: 'try-it-yourself', cuid: 'cikqgkv4q01ck7453ualdn3hf', desc: content2 });

	    _step2.default.create([step1, step2], function (error) {
	      if (!error) {
	        // console.log('ready to go....');
	      }
	    });
	  });
	};

	var _step = __webpack_require__(15);

	var _step2 = _interopRequireDefault(_step);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _express = __webpack_require__(9);

	var _step = __webpack_require__(45);

	var StepController = _interopRequireWildcard(_step);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	var router = new _express.Router();

	// Get all Posts
	router.route('/learn').get(StepController.getSteps);

	// Get one post by cuid
	router.route('/learn/:cuid').get(StepController.getStep);

	exports.default = router;

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.fetchComponentData = fetchComponentData;

	var _promiseUtils = __webpack_require__(47);

	function fetchComponentData(store, components, params) {
	  var needs = components.reduce(function (prev, current) {
	    return (current.need || []).concat((current.WrappedComponent && current.WrappedComponent.need !== current.need ? current.WrappedComponent.need : []) || []).concat(prev);
	  }, []);

	  return (0, _promiseUtils.sequence)(needs, function (need) {
	    return store.dispatch(need(params, store.getState()));
	  });
	} /*
	  Utility function to fetch required data for component to render in server side.
	  This was inspired from https://github.com/caljrimmer/isomorphic-redux-app/blob/73e6e7d43ccd41e2eb557a70be79cebc494ee54b/src/common/api/fetchComponentDataBeforeRender.js
	  */

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/* WEBPACK VAR INJECTION */(function(__dirname) {'use strict';

	var webpack = __webpack_require__(11);
	var cssnext = __webpack_require__(53);
	var postcssFocus = __webpack_require__(54);
	var postcssReporter = __webpack_require__(55);

	module.exports = {
	  devtool: 'cheap-module-eval-source-map',

	  entry: {
	    app: ['eventsource-polyfill', 'webpack-hot-middleware/client', 'webpack/hot/only-dev-server', 'react-hot-loader/patch', './client/index.js'],
	    vendor: ['react', 'react-dom']
	  },

	  output: {
	    path: __dirname,
	    filename: 'app.js',
	    publicPath: 'http://0.0.0.0:8000/'
	  },

	  resolve: {
	    extensions: ['', '.js', '.jsx'],
	    modules: ['client', 'node_modules']
	  },

	  module: {
	    loaders: [{
	      test: /\.css$/,
	      exclude: /node_modules/,
	      loader: 'style-loader!css-loader?localIdentName=[name]__[local]__[hash:base64:5]&modules&importLoaders=1&sourceMap!postcss-loader'
	    }, {
	      test: /\.css$/,
	      include: /node_modules/,
	      loaders: ['style-loader', 'css-loader']
	    }, {
	      test: /\.jsx*$/,
	      exclude: [/node_modules/, /.+\.config.js/],
	      loader: 'babel'
	    }, {
	      test: /\.(jpe?g|gif|png|svg)$/i,
	      loader: 'url-loader?limit=10000'
	    }, {
	      test: /\.json$/,
	      loader: 'json-loader'
	    }, {
	      test: /\.scss$/,
	      loaders: ["style-loader", "css-loader", "sass-loader"]
	    }]
	  },

	  plugins: [new webpack.HotModuleReplacementPlugin(), new webpack.optimize.CommonsChunkPlugin({
	    name: 'vendor',
	    minChunks: Infinity,
	    filename: 'vendor.js'
	  }), new webpack.DefinePlugin({
	    'process.env': {
	      CLIENT: JSON.stringify(true),
	      'NODE_ENV': JSON.stringify('development')
	    }
	  })],

	  postcss: function postcss() {
	    return [postcssFocus(), cssnext({
	      browsers: ['last 2 versions', 'IE > 10']
	    }), postcssReporter({
	      clearMessages: true
	    })];
	  }
	};
	/* WEBPACK VAR INJECTION */}.call(exports, ""))

/***/ },
/* 24 */
/***/ function(module, exports) {

	module.exports = require("body-parser");

/***/ },
/* 25 */
/***/ function(module, exports) {

	module.exports = require("compression");

/***/ },
/* 26 */
/***/ function(module, exports) {

	module.exports = require("path");

/***/ },
/* 27 */
/***/ function(module, exports) {

	module.exports = require("react-dom/server");

/***/ },
/* 28 */
/***/ function(module, exports) {

	module.exports = require("webpack-dev-middleware");

/***/ },
/* 29 */
/***/ function(module, exports) {

	module.exports = require("webpack-hot-middleware");

/***/ },
/* 30 */
/***/ function(module, exports) {

	"use strict";
	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	  locale: 'en',
	  messages: {
	    siteTitle: 'slock – Worlds best Sound Clock',
	    addPost: 'Add Post',
	    switchLanguage: 'Switch Language',
	    twitterMessage: 'We are on Twitter',
	    by: 'By',
	    deletePost: 'Delete Post',
	    createNewPost: 'Create new post',
	    authorName: 'Author\'s Name',
	    postTitle: 'Post Title',
	    postContent: 'Post Content',
	    submit: 'Submit',
	    comment: 'user {name} {value, plural,\n    \t  =0 {does not have any comments}\n    \t  =1 {has # comment}\n    \t  other {has # comments}\n    \t}',
	    HTMLComment: 'user <b style=\'font-weight: bold\'>{name} </b> {value, plural,\n    \t  =0 {does not have <i style=\'font-style: italic\'>any</i> comments}\n    \t  =1 {has <i style=\'font-style: italic\'>#</i> comment}\n    \t  other {has <i style=\'font-style: italic\'>#</i> comments}\n    \t}',
	    nestedDateComment: 'user {name} {value, plural,\n    \t  =0 {does not have any comments}\n    \t  =1 {has # comment}\n    \t  other {has # comments}\n    \t} as of {date}'
	  }
	};

/***/ },
/* 31 */
/***/ function(module, exports) {

	"use strict";
	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	  locale: 'fr',
	  messages: {
	    siteTitle: 'MERN blog de démarrage',
	    addPost: 'Ajouter Poster',
	    switchLanguage: 'Changer de langue',
	    twitterMessage: 'Nous sommes sur Twitter',
	    by: 'Par',
	    deletePost: 'Supprimer le message',
	    createNewPost: 'Créer un nouveau message',
	    authorName: 'Nom de l\'auteur',
	    postTitle: 'Titre de l\'article',
	    postContent: 'Contenu après',
	    submit: 'Soumettre',
	    comment: 'user {name} {value, plural,\n    \t  =0 {does not have any comments}\n    \t  =1 {has # comment}\n    \t  other {has # comments}\n    \t} (in real app this would be translated to French)',
	    HTMLComment: 'user <b style=\'font-weight: bold\'>{name} </b> {value, plural,\n    \t  =0 {does not have <i style=\'font-style: italic\'>any</i> comments}\n    \t  =1 {has <i style=\'font-style: italic\'>#</i> comment}\n    \t  other {has <i style=\'font-style: italic\'>#</i> comments}\n    \t} (in real app this would be translated to French)',
	    nestedDateComment: 'user {name} {value, plural,\n  \t\t  =0 {does not have any comments}\n  \t\t  =1 {has # comment}\n  \t\t  other {has # comments}\n  \t\t} as of {date} (in real app this would be translated to French)'
	  }
	};

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.App = undefined;

	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(0);

	var _react2 = _interopRequireDefault(_react);

	var _reactRedux = __webpack_require__(1);

	var _reactHelmet = __webpack_require__(4);

	var _reactHelmet2 = _interopRequireDefault(_reactHelmet);

	var _DevTools = __webpack_require__(13);

	var _DevTools2 = _interopRequireDefault(_DevTools);

	var _Header = __webpack_require__(36);

	var _Header2 = _interopRequireDefault(_Header);

	var _Footer = __webpack_require__(35);

	var _Footer2 = _interopRequireDefault(_Footer);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	// Import Style
	// import styles from './App.css';

	// Import Components


	// Import Actions

	var _ref = _jsx(_DevTools2.default, {});

	var _ref2 = _jsx(_Footer2.default, {});

	var App = exports.App = function (_Component) {
	  _inherits(App, _Component);

	  function App(props) {
	    _classCallCheck(this, App);

	    var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

	    _this.state = { isMounted: false };
	    return _this;
	  }

	  _createClass(App, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      this.setState({ isMounted: true }); // eslint-disable-line
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return _jsx('div', {}, void 0, this.state.isMounted && !window.devToolsExtension && process.env.NODE_ENV === 'development' && _ref, _jsx('div', {}, void 0, _jsx(_reactHelmet2.default, {
	        title: 'slock \u2013 Worlds best Sound Clock',
	        titleTemplate: '%s - Blog App',
	        meta: [{ charset: 'utf-8' }, {
	          'http-equiv': 'X-UA-Compatible',
	          content: 'IE=edge'
	        }, {
	          name: 'viewport',
	          content: 'width=device-width, initial-scale=1'
	        }]
	      }), _jsx(_Header2.default, {
	        intl: this.props.intl
	      }), _jsx('main', {
	        className: 'container'
	      }, void 0, this.props.children), _ref2));
	    }
	  }]);

	  return App;
	}(_react.Component);

	// Retrieve data from store as props
	function mapStateToProps(store) {
	  return {
	    intl: store.intl
	  };
	}

	exports.default = (0, _reactRedux.connect)(mapStateToProps)(App);

/***/ },
/* 33 */
/***/ function(module, exports) {

	"use strict";
	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.toggleAddPost = toggleAddPost;
	// Export Constants
	var TOGGLE_ADD_POST = exports.TOGGLE_ADD_POST = 'TOGGLE_ADD_POST';

	// Export Actions
	function toggleAddPost() {
	  return {
	    type: TOGGLE_ADD_POST
	  };
	}

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _AppActions = __webpack_require__(33);

	// Initial State
	var initialState = {
	  showAddPost: false
	}; // Import Actions


	var AppReducer = function AppReducer() {
	  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
	  var action = arguments[1];

	  switch (action.type) {
	    case _AppActions.TOGGLE_ADD_POST:
	      return {
	        showAddPost: !state.showAddPost
	      };

	    default:
	      return state;
	  }
	};

	/* Selectors */

	// Get showAddPost
	// export const getShowAddPost = state => state.app.showAddPost;

	// Export Reducer
	exports.default = AppReducer;

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();

	exports.Footer = Footer;

	var _react = __webpack_require__(0);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// Import Style
	// import styles from './Footer.css';

	var _ref = _jsx("footer", {
	  className: "footer"
	}, void 0, _jsx("p", {}, void 0, "slock \u2013 Worlds best Sound Clock"));

	function Footer() {
	  return _ref;
	}

	exports.default = Footer;

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();

	exports.Header = Header;

	var _react = __webpack_require__(0);

	var _react2 = _interopRequireDefault(_react);

	var _reactRouter = __webpack_require__(3);

	var _reactIntl = __webpack_require__(7);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// Import Style
	// import styles from './Header.css';

	var _ref = _jsx('h1', {}, void 0, _jsx(_reactRouter.Link, {
	  to: '/'
	}, void 0, _jsx(_reactIntl.FormattedMessage, {
	  id: 'siteTitle'
	})));

	function Header(props, context) {
	  return _jsx('header', {}, void 0, _ref, context.router.isActive('/', true) ? '' : null);
	}

	Header.contextTypes = {
	  router: _react2.default.PropTypes.object
	};

	exports.default = Header;

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.SWITCH_LANGUAGE = undefined;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports.switchLanguage = switchLanguage;

	var _setup = __webpack_require__(12);

	// Export Constants
	var SWITCH_LANGUAGE = exports.SWITCH_LANGUAGE = 'SWITCH_LANGUAGE';

	function switchLanguage(newLang) {
	  return _extends({
	    type: SWITCH_LANGUAGE
	  }, _setup.localizationData[newLang]);
	}

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _setup = __webpack_require__(12);

	var _IntlActions = __webpack_require__(37);

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	var initLocale = global.navigator && global.navigator.language || 'en';

	var initialState = _extends({
	  locale: initLocale,
	  enabledLanguages: _setup.enabledLanguages
	}, _setup.localizationData[initLocale] || {});

	var IntlReducer = function IntlReducer() {
	  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
	  var action = arguments[1];

	  switch (action.type) {
	    case _IntlActions.SWITCH_LANGUAGE:
	      {
	        var type = action.type,
	            actionWithoutType = _objectWithoutProperties(action, ['type']); // eslint-disable-line


	        return _extends({}, state, actionWithoutType);
	      }

	    default:
	      return state;
	  }
	};

	exports.default = IntlReducer;

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Clock = undefined;

	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(0);

	var _react2 = _interopRequireDefault(_react);

	var _LearnReducer = __webpack_require__(2);

	var _reactRedux = __webpack_require__(1);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	// import { Sound } from 'react-sound';
	var isBrowser = typeof window !== 'undefined';
	var Sound = isBrowser ? __webpack_require__(58) : undefined;

	var Clock = exports.Clock = function (_Component) {
	  _inherits(Clock, _Component);

	  function Clock(props) {
	    _classCallCheck(this, Clock);

	    var _this = _possibleConstructorReturn(this, (Clock.__proto__ || Object.getPrototypeOf(Clock)).call(this, props));

	    _this.playRandomSound = function (e) {
	      e.preventDefault();

	      var randomNumber = Math.floor(Math.random() * 11 + 1);
	      var randomNumberQ = Math.floor(Math.random() * 3);

	      var hour = _this.state.hour;
	      hour.status = Sound.status.STOPPED;

	      _this.props.onPlay({
	        hour: randomNumber,
	        minutes: _LearnReducer.quarters[randomNumberQ]
	      });

	      _this.setState({
	        hour: hour,
	        minutes: {
	          url: _LearnReducer.audioURL + 'quarters/' + _LearnReducer.quarters[randomNumberQ] + '.wav',
	          number: _LearnReducer.quarters[randomNumberQ],
	          status: Sound.status.PLAYING
	        }
	      });

	      setTimeout(function () {
	        _this.setState({
	          hour: {
	            url: '' + _LearnReducer.audioURL + randomNumber + '.wav',
	            number: randomNumber,
	            status: Sound.status.PLAYING
	          }
	        });
	      }, 1800);
	    };

	    _this.render = function () {
	      return _jsx('div', {}, void 0, _jsx('button', {
	        id: 'play',
	        className: 'btn btn-default',
	        onClick: _this.playRandomSound
	      }, void 0, 'Random'), _jsx(Sound, {
	        url: _this.state.hour.url,
	        playStatus: _this.state.hour.status
	      }), _jsx(Sound, {
	        url: _this.state.minutes.url,
	        playStatus: _this.state.minutes.status
	      }));
	    };

	    _this.state = {
	      isMounted: false,
	      hour: {
	        url: '',
	        status: Sound.status.STOPPED
	      },
	      minutes: {
	        url: '',
	        status: Sound.status.STOPPED
	      }
	    };
	    return _this;
	  }

	  _createClass(Clock, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      /* this.setState({
	        isMounted: true,
	      }); */ // eslint-disable-line
	    }
	  }]);

	  return Clock;
	}(_react.Component);

	// Retrieve data from store as props
	function mapStateToProps(props) {
	  return props;
	}

	exports.default = (0, _reactRedux.connect)(mapStateToProps)(Clock);

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Guesser = undefined;

	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(0);

	var _react2 = _interopRequireDefault(_react);

	var _reactRedux = __webpack_require__(1);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _ref = _jsx('label', {
	  htmlFor: 'hour'
	}, void 0, 'Hour:');

	var _ref2 = _jsx('label', {
	  htmlFor: 'quarters'
	}, void 0, 'Minutes:');

	var _ref3 = _jsx('option', {}, void 0, '00');

	var _ref4 = _jsx('option', {}, void 0, '15');

	var _ref5 = _jsx('option', {}, void 0, '30');

	var _ref6 = _jsx('option', {}, void 0, '45');

	var _ref7 = _jsx('label', {
	  htmlFor: 'guess'
	}, void 0, '\xA0');

	var Guesser = exports.Guesser = function (_Component) {
	  _inherits(Guesser, _Component);

	  function Guesser(props) {
	    _classCallCheck(this, Guesser);

	    var _this = _possibleConstructorReturn(this, (Guesser.__proto__ || Object.getPrototypeOf(Guesser)).call(this, props));

	    _this.guess = function () {
	      if (_this.props.time.hour === _this.refs.select_hour.value && _this.props.time.minutes === _this.refs.select_minutes.value) {
	        // alert("guessed correct!");
	      } else {
	          // alert("guessed incorrect...");
	        }
	    };

	    _this.render = function () {
	      var options = [];
	      for (var i = 1; i <= 12; i++) {
	        options.push(_jsx('option', {}, i, i));
	      }
	      return _jsx('div', {}, void 0, _jsx('div', {
	        className: 'row'
	      }, void 0, _jsx('div', {
	        className: 'form-group col-md-4'
	      }, void 0, _ref, _react2.default.createElement(
	        'select',
	        { ref: 'select_hour', className: 'form-control', id: 'hour', name: 'hour', placeholder: '' },
	        options
	      )), _jsx('div', {
	        className: 'form-group col-md-4'
	      }, void 0, _ref2, _react2.default.createElement(
	        'select',
	        { ref: 'select_minutes', className: 'form-control', id: 'minutes', name: 'minutes', placeholder: '' },
	        _ref3,
	        _ref4,
	        _ref5,
	        _ref6
	      )), _jsx('div', {
	        className: 'form-group col-md-4'
	      }, void 0, _ref7, _jsx('button', {
	        type: 'button',
	        id: 'guess',
	        className: 'form-control btn btn-success',
	        onClick: _this.guess
	      }, void 0, 'Guess'))), _jsx('span', {
	        className: 'correct-time'
	      }, void 0, _this.props.time.hour < 10 ? '0' + _this.props.time.hour : _this.props.time.hour, ':', _this.props.time.minutes));
	    };

	    _this.state = {
	      isMounted: false
	    };
	    return _this;
	  }

	  _createClass(Guesser, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      /* this.setState({
	        isMounted: true,
	      }); */ // eslint-disable-line
	    }
	  }]);

	  return Guesser;
	}(_react.Component);

	// Retrieve data from store as props
	function mapStateToProps(props) {
	  return props;
	}

	exports.default = (0, _reactRedux.connect)(mapStateToProps)(Guesser);

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();

	// Import Components


	var _react = __webpack_require__(0);

	var _react2 = _interopRequireDefault(_react);

	var _LearnStep = __webpack_require__(42);

	var _LearnStep2 = _interopRequireDefault(_LearnStep);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function LearnList(props) {
	  return _jsx('div', {
	    className: 'listView row'
	  }, void 0, props.steps.map(function (step) {
	    return _jsx(_LearnStep2.default, {
	      step: step
	    }, step.cuid);
	  }));
	}

	exports.default = LearnList;

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.LearnStep = undefined;

	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(0);

	var _react2 = _interopRequireDefault(_react);

	var _reactRouter = __webpack_require__(3);

	var _LearnReducer = __webpack_require__(2);

	var _reactRedux = __webpack_require__(1);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _ref = _jsx('div', {
	  className: 'learn-step-progress'
	});

	var _ref2 = _jsx('div', {
	  className: 'learn-step-score'
	});

	var LearnStep = exports.LearnStep = function (_Component) {
	  _inherits(LearnStep, _Component);

	  function LearnStep(props) {
	    _classCallCheck(this, LearnStep);

	    var _this = _possibleConstructorReturn(this, (LearnStep.__proto__ || Object.getPrototypeOf(LearnStep)).call(this, props));

	    _this.state = { isMounted: false };
	    return _this;
	  }

	  _createClass(LearnStep, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      (0, _LearnReducer.initAudio)(this.state);
	      this.setState({ isMounted: true }); // eslint-disable-line
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return _jsx('div', {
	        className: 'learn-step col-md'
	      }, void 0, _jsx('h3', {
	        className: 'learn-step-title'
	      }, void 0, _jsx(_reactRouter.Link, {
	        to: '/learn/' + this.props.step.slug + '-' + this.props.step.cuid
	      }, void 0, this.props.step.title)), _jsx('p', {
	        className: 'learn-step-desc'
	      }, void 0, this.props.step.desc), _ref, _ref2);
	    }
	  }]);

	  return LearnStep;
	}(_react.Component);

	// Retrieve data from store as props
	function mapStateToProps(props) {
	  return props;
	}

	exports.default = (0, _reactRedux.connect)(mapStateToProps)(LearnStep);

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _redux = __webpack_require__(16);

	var _AppReducer = __webpack_require__(34);

	var _AppReducer2 = _interopRequireDefault(_AppReducer);

	var _LearnReducer = __webpack_require__(2);

	var _LearnReducer2 = _interopRequireDefault(_LearnReducer);

	var _IntlReducer = __webpack_require__(38);

	var _IntlReducer2 = _interopRequireDefault(_IntlReducer);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// Combine all reducers into one root reducer
	/**
	 * Root Reducer
	 */
	exports.default = (0, _redux.combineReducers)({
	  app: _AppReducer2.default,
	  steps: _LearnReducer2.default,
	  intl: _IntlReducer2.default
	});

	// Import Reducers

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.API_URL = undefined;
	exports.default = callApi;

	var _isomorphicFetch = __webpack_require__(52);

	var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);

	var _config = __webpack_require__(8);

	var _config2 = _interopRequireDefault(_config);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var API_URL = exports.API_URL = typeof window === 'undefined' || process.env.NODE_ENV === 'test' ? process.env.BASE_URL || 'http://localhost:' + (process.env.PORT || _config2.default.port) + '/api' : '/api';

	function callApi(endpoint) {
	  var method = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'get';
	  var body = arguments[2];

	  return (0, _isomorphicFetch2.default)(API_URL + '/' + endpoint, {
	    headers: { 'content-type': 'application/json' },
	    method: method,
	    body: JSON.stringify(body)
	  }).then(function (response) {
	    return response.json().then(function (json) {
	      return { json: json, response: response };
	    });
	  }).then(function (_ref) {
	    var json = _ref.json,
	        response = _ref.response;

	    if (!response.ok) {
	      return Promise.reject(json);
	    }

	    return json;
	  }).then(function (response) {
	    return response;
	  }, function (error) {
	    return error;
	  });
	}

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.getSteps = getSteps;
	exports.getStep = getStep;

	var _step = __webpack_require__(15);

	var _step2 = _interopRequireDefault(_step);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Get all posts
	 * @param req
	 * @param res
	 * @returns void
	 */
	function getSteps(req, res) {
	  _step2.default.find().sort('number').exec(function (err, steps) {
	    if (err) {
	      res.status(500).send(err);
	    }
	    res.json({ steps: steps });
	  });
	}

	/**
	 * Get a single step
	 * @param req
	 * @param res
	 * @returns void
	 */
	function getStep(req, res) {
	  _step2.default.findOne({ cuid: req.params.cuid }).exec(function (err, step) {
	    if (err) {
	      res.status(500).send(err);
	    }
	    res.json({ step: step });
	  });
	}

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/* WEBPACK VAR INJECTION */(function(__dirname) {'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();

	// Webpack Requirements


	var _express = __webpack_require__(9);

	var _express2 = _interopRequireDefault(_express);

	var _compression = __webpack_require__(25);

	var _compression2 = _interopRequireDefault(_compression);

	var _mongoose = __webpack_require__(10);

	var _mongoose2 = _interopRequireDefault(_mongoose);

	var _bodyParser = __webpack_require__(24);

	var _bodyParser2 = _interopRequireDefault(_bodyParser);

	var _path = __webpack_require__(26);

	var _path2 = _interopRequireDefault(_path);

	var _IntlWrapper = __webpack_require__(17);

	var _IntlWrapper2 = _interopRequireDefault(_IntlWrapper);

	var _webpack = __webpack_require__(11);

	var _webpack2 = _interopRequireDefault(_webpack);

	var _webpackConfig = __webpack_require__(23);

	var _webpackConfig2 = _interopRequireDefault(_webpackConfig);

	var _webpackDevMiddleware = __webpack_require__(28);

	var _webpackDevMiddleware2 = _interopRequireDefault(_webpackDevMiddleware);

	var _webpackHotMiddleware = __webpack_require__(29);

	var _webpackHotMiddleware2 = _interopRequireDefault(_webpackHotMiddleware);

	var _store = __webpack_require__(19);

	var _reactRedux = __webpack_require__(1);

	var _react = __webpack_require__(0);

	var _react2 = _interopRequireDefault(_react);

	var _server = __webpack_require__(27);

	var _reactRouter = __webpack_require__(3);

	var _reactHelmet = __webpack_require__(4);

	var _reactHelmet2 = _interopRequireDefault(_reactHelmet);

	var _routes = __webpack_require__(18);

	var _routes2 = _interopRequireDefault(_routes);

	var _fetchData = __webpack_require__(22);

	var _step = __webpack_require__(21);

	var _step2 = _interopRequireDefault(_step);

	var _dummyData = __webpack_require__(20);

	var _dummyData2 = _interopRequireDefault(_dummyData);

	var _config = __webpack_require__(8);

	var _config2 = _interopRequireDefault(_config);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// Initialize the Express App
	var app = new _express2.default();

	// Run Webpack dev server in development mode
	if (process.env.NODE_ENV === 'development') {
	  var compiler = (0, _webpack2.default)(_webpackConfig2.default);
	  app.use((0, _webpackDevMiddleware2.default)(compiler, { noInfo: true, publicPath: _webpackConfig2.default.output.publicPath }));
	  app.use((0, _webpackHotMiddleware2.default)(compiler));
	}

	// React And Redux Setup


	// Import required modules


	// Set native promises as mongoose promise
	_mongoose2.default.Promise = global.Promise;

	var db = _mongoose2.default.connection;

	// db.on('error', console.error);
	db.once('open', function () {
	  (0, _dummyData2.default)();
	});

	// MongoDB Connection
	_mongoose2.default.connect(_config2.default.mongoURL, function (error) {
	  if (error) {
	    console.error('Please make sure Mongodb is installed and running!'); // eslint-disable-line no-console
	    throw error;
	  }

	  // feed some dummy data in DB.
	  // dummyData();
	});

	// Apply body Parser and server public assets and routes
	app.use((0, _compression2.default)());
	app.use(_bodyParser2.default.json({ limit: '20mb' }));
	app.use(_bodyParser2.default.urlencoded({ limit: '20mb', extended: false }));
	app.use(_express2.default.static(_path2.default.resolve(__dirname, '../dist')));
	app.use('/api', _step2.default);

	// Render Initial HTML
	var renderFullPage = function renderFullPage(html, initialState) {
	  var head = _reactHelmet2.default.rewind();

	  // Import Manifests
	  var assetsManifest = process.env.webpackAssets && JSON.parse(process.env.webpackAssets);
	  var chunkManifest = process.env.webpackChunkAssets && JSON.parse(process.env.webpackChunkAssets);

	  return '\n    <!doctype html>\n    <html>\n      <head>\n        ' + head.base.toString() + '\n        ' + head.title.toString() + '\n        ' + head.meta.toString() + '\n        ' + head.link.toString() + '\n        ' + head.script.toString() + '\n\n        ' + (process.env.NODE_ENV === 'production' ? '<link rel=\'stylesheet\' href=\'' + assetsManifest['/app.css'] + '\' />' : '') + '\n        <link href=\'https://fonts.googleapis.com/css?family=Lato:400,300,700\' rel=\'stylesheet\' type=\'text/css\'/>\n        <link rel="shortcut icon" href="http://res.cloudinary.com/hashnode/image/upload/v1455629445/static_imgs/mern/mern-favicon-circle-fill.png" type="image/png" />\n      </head>\n      <body>\n        <div id="root">' + html + '</div>\n        <script>\n          window.__INITIAL_STATE__ = ' + JSON.stringify(initialState) + ';\n          ' + (process.env.NODE_ENV === 'production' ? '//<![CDATA[\n          window.webpackManifest = ' + JSON.stringify(chunkManifest) + ';\n          //]]>' : '') + '\n        </script>\n        <script src=\'' + (process.env.NODE_ENV === 'production' ? assetsManifest['/vendor.js'] : '/vendor.js') + '\'></script>\n        <script src=\'' + (process.env.NODE_ENV === 'production' ? assetsManifest['/app.js'] : '/app.js') + '\'></script>\n      </body>\n    </html>\n  ';
	};

	var renderError = function renderError(err) {
	  var softTab = '&#32;&#32;&#32;&#32;';
	  var errTrace = process.env.NODE_ENV !== 'production' ? ':<br><br><pre style="color:red">' + softTab + err.stack.replace(/\n/g, '<br>' + softTab) + '</pre>' : '';
	  return renderFullPage('Server Error' + errTrace, {});
	};

	// Server Side Rendering based on routes matched by React-router.
	app.use(function (req, res, next) {
	  (0, _reactRouter.match)({ routes: _routes2.default, location: req.url }, function (err, redirectLocation, renderProps) {
	    if (err) {
	      return res.status(500).end(renderError(err));
	    }

	    if (redirectLocation) {
	      return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
	    }

	    if (!renderProps) {
	      return next();
	    }

	    var store = (0, _store.configureStore)();

	    return (0, _fetchData.fetchComponentData)(store, renderProps.components, renderProps.params).then(function () {
	      var initialView = (0, _server.renderToString)(_jsx(_reactRedux.Provider, {
	        store: store
	      }, void 0, _jsx(_IntlWrapper2.default, {}, void 0, _react2.default.createElement(_reactRouter.RouterContext, renderProps))));
	      var finalState = store.getState();

	      res.set('Content-Type', 'text/html').status(200).end(renderFullPage(initialView, finalState));
	    }).catch(function (error) {
	      return next(error);
	    });
	  });
	});

	// start app
	app.listen(_config2.default.port, function (error) {
	  if (!error) {
	    console.log('MERN is running on port: ' + _config2.default.port + '! Build something amazing!'); // eslint-disable-line
	  }
	});

	exports.default = app;
	/* WEBPACK VAR INJECTION */}.call(exports, "server"))

/***/ },
/* 47 */
/***/ function(module, exports) {

	"use strict";
	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.sequence = sequence;
	/**
	 * Throw an array to it and a function which can generate promises
	 * and it will call them sequentially, one after another
	 */
	function sequence(items, consumer) {
	  var results = [];
	  var runner = function runner() {
	    var item = items.shift();
	    if (item) {
	      return consumer(item).then(function (result) {
	        results.push(result);
	      }).then(runner);
	    }

	    return Promise.resolve(results);
	  };

	  return runner();
	}

/***/ },
/* 48 */
/***/ function(module, exports) {

	module.exports = require("intl");

/***/ },
/* 49 */
/***/ function(module, exports) {

	module.exports = require("intl-locales-supported");

/***/ },
/* 50 */
/***/ function(module, exports) {

	module.exports = require("intl/locale-data/jsonp/en");

/***/ },
/* 51 */
/***/ function(module, exports) {

	module.exports = require("intl/locale-data/jsonp/fr");

/***/ },
/* 52 */
/***/ function(module, exports) {

	module.exports = require("isomorphic-fetch");

/***/ },
/* 53 */
/***/ function(module, exports) {

	module.exports = require("postcss-cssnext");

/***/ },
/* 54 */
/***/ function(module, exports) {

	module.exports = require("postcss-focus");

/***/ },
/* 55 */
/***/ function(module, exports) {

	module.exports = require("postcss-reporter");

/***/ },
/* 56 */
/***/ function(module, exports) {

	module.exports = require("react-intl/locale-data/en");

/***/ },
/* 57 */
/***/ function(module, exports) {

	module.exports = require("react-intl/locale-data/fr");

/***/ },
/* 58 */
/***/ function(module, exports) {

	module.exports = require("react-sound");

/***/ },
/* 59 */
/***/ function(module, exports) {

	module.exports = require("redux-devtools");

/***/ },
/* 60 */
/***/ function(module, exports) {

	module.exports = require("redux-devtools-dock-monitor");

/***/ },
/* 61 */
/***/ function(module, exports) {

	module.exports = require("redux-devtools-log-monitor");

/***/ },
/* 62 */
/***/ function(module, exports) {

	module.exports = require("redux-thunk");

/***/ }
/******/ ]);