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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _wxF = __webpack_require__(1);

var _wxF2 = _interopRequireDefault(_wxF);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    canvasId: {
      type: String,
      value: 'f2-canvas'
    },

    opts: {
      type: Object
    }
  },

  /**
   * 组件的初始数据
   */
  data: {},

  ready: function ready() {
    if (!this.data.opts) {
      console.warn('组件需绑定 opts 变量，例：<ff-canvas id="mychart-dom-bar" canvas-id="mychart-bar" opts="{{ opts }}"></ff-canvas>');
      return;
    }

    if (!this.data.opts.lazyLoad) {
      this.init();
    }
  },


  /**
   * 组件的方法列表
   */
  methods: {
    init: function init(callback) {
      var _this = this;

      var version = wx.version.version.split('.').map(function (n) {
        return parseInt(n, 10);
      });
      var isValid = version[0] > 1 || version[0] === 1 && version[1] > 9 || version[0] === 1 && version[1] === 9 && version[2] >= 91;
      if (!isValid) {
        console.error('微信基础库版本过低，需大于等于 1.9.91。');
        return;
      }

      var ctx = wx.createCanvasContext(this.data.canvasId, this); // 获取小程序上下文
      var canvas = new _wxF2.default.Renderer(ctx);
      this.canvas = canvas;

      var query = wx.createSelectorQuery().in(this);
      query.select('.f2-canvas').boundingClientRect(function (res) {
        if (typeof callback === 'function') {
          _this.chart = callback(canvas, res.width, res.height, _wxF2.default);
        } else if (_this.data.opts && _this.data.opts.onInit) {
          _this.chart = _this.data.opts.onInit(canvas, res.width, res.height, _wxF2.default);
        }
      }).exec();
    },
    touchStart: function touchStart(e) {
      if (this.canvas) {
        this.canvas.emitEvent('touchstart', [e]);
      }
    },
    touchMove: function touchMove(e) {
      if (this.canvas) {
        this.canvas.emitEvent('touchmove', [e]);
      }
    },
    touchEnd: function touchEnd(e) {
      if (this.canvas) {
        this.canvas.emitEvent('touchend', [e]);
      }
    },
    press: function press(e) {
      if (this.canvas) {
        this.canvas.emitEvent('press', [e]);
      }
    }
  }
}); // f2-canvas.js

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("@antv/wx-f2");

/***/ })
/******/ ]);