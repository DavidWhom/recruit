/**
 * The parent class of interaction
 * @author sima.zhang1990@gmail.com
 */
var Util = require('../util/common');

var Chart = require('../chart/chart');

var Hammer;

if (!Util.isWx && !Util.isMy) {
  Hammer = require('hammerjs');
}

var TOUCH_EVENTS = ['touchstart', 'touchmove', 'touchend'];

var Interaction =
/*#__PURE__*/
function () {
  var _proto = Interaction.prototype;

  _proto.getDefaultCfg = function getDefaultCfg() {
    return {
      startEvent: TOUCH_EVENTS[0],
      processEvent: TOUCH_EVENTS[1],
      endEvent: TOUCH_EVENTS[2],
      resetEvent: null
    };
  };

  _proto._start = function _start(ev) {
    this.preStart && this.preStart(ev);
    this.start(ev);
    this.onStart && this.onStart(ev);
  };

  _proto._process = function _process(ev) {
    this.preProcess && this.preProcess(ev);
    this.process(ev);
    this.onProcess && this.onProcess(ev);
  };

  _proto._end = function _end(ev) {
    this.preEnd && this.preEnd(ev);
    this.end(ev);
    this.onEnd && this.onEnd(ev);
  };

  _proto._reset = function _reset(ev) {
    this.preReset && this.preReset(ev);
    this.reset(ev);
    this.onReset && this.onReset(ev);
  } // override
  ;

  _proto.start = function start() {} // override
  ;

  _proto.process = function process() {} // override
  ;

  _proto.end = function end() {} // override
  ;

  _proto.reset = function reset() {};

  function Interaction(cfg, chart) {
    var defaultCfg = this.getDefaultCfg();
    Util.deepMix(this, defaultCfg, cfg);
    this.chart = chart;
    this.canvas = chart.get('canvas');
    this.el = chart.get('canvas').get('el');

    this._bindEvents();
  }

  _proto._bindEvents = function _bindEvents() {
    this._clearEvents(); // clear events


    var startEvent = this.startEvent,
        processEvent = this.processEvent,
        endEvent = this.endEvent,
        resetEvent = this.resetEvent,
        el = this.el;

    if (Hammer) {
      this.hammer = new Hammer(el);
    }

    this._bindEvent(startEvent, '_start');

    this._bindEvent(processEvent, '_process');

    this._bindEvent(endEvent, '_end');

    this._bindEvent(resetEvent, '_reset');
  };

  _proto._clearEvents = function _clearEvents() {
    var startEvent = this.startEvent,
        processEvent = this.processEvent,
        endEvent = this.endEvent,
        resetEvent = this.resetEvent;

    if (this.hammer) {
      this.hammer.destroy();
      this.hammer = null;
    }

    this._clearTouchEvent(startEvent, '_start');

    this._clearTouchEvent(processEvent, '_process');

    this._clearTouchEvent(endEvent, '_end');

    this._clearTouchEvent(resetEvent, '_reset');
  };

  _proto._bindEvent = function _bindEvent(eventName, methodName) {
    var el = this.el;

    if (eventName) {
      if (TOUCH_EVENTS.indexOf(eventName) !== -1) {
        Util.addEventListener(el, eventName, Util.wrapBehavior(this, methodName));
      } else if (this.hammer) {
        this.hammer.on(eventName, Util.wrapBehavior(this, methodName));
      }
    }
  };

  _proto._clearTouchEvent = function _clearTouchEvent(eventName, methodName) {
    var el = this.el;

    if (eventName && TOUCH_EVENTS.indexOf(eventName) !== -1) {
      Util.removeEventListener(el, eventName, Util.getWrapBehavior(this, methodName));
    }
  };

  _proto.destroy = function destroy() {
    this._clearEvents();
  };

  return Interaction;
}();

Chart._Interactions = {};

Chart.registerInteraction = function (type, constructor) {
  Chart._Interactions[type] = constructor;
};

Chart.getInteraction = function (type) {
  return Chart._Interactions[type];
};

Chart.prototype.interaction = function (type, cfg) {
  var interactions = this._interactions || {};

  if (interactions[type]) {
    // if reprated, destroy last
    interactions[type].destroy();
  }

  var Ctor = Chart.getInteraction(type);
  var interact = new Ctor(cfg, this);
  interactions[type] = interact;
  this._interactions = interactions;
  return this;
};

Chart.prototype.clearInteraction = function (type) {
  var interactions = this._interactions;
  if (!interactions) return;

  if (type) {
    interactions[type] && interactions[type].destroy();
    delete interactions[type];
  } else {
    Util.each(interactions, function (interaction, key) {
      interaction.destroy();
      delete interactions[key];
    });
  }

  return this;
};

module.exports = Interaction;