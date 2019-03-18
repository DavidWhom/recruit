var Hammer = require('hammerjs'); // http://hammerjs.github.io/


var Util = require('../util/common');

var defaultOptions = {
  useCalculate: true,
  useOffset: false
};

var GestureController =
/*#__PURE__*/
function () {
  function GestureController(_ref) {
    var dom = _ref.dom,
        gesture = _ref.gesture,
        options = _ref.options,
        chart = _ref.chart,
        hammerOptions = _ref.hammerOptions;
    this.Hammer = Hammer;
    this.hammer = new Hammer(dom, hammerOptions);
    this.dom = dom;
    this.gesture = gesture;
    this.options = Util.deepMix({}, defaultOptions, options);
    this.hammerOptions = hammerOptions;
    this.chart = chart;
    this._unbindEvent = {};

    if (!options) {
      this.hammerOptionsHack(gesture, this.hammer);
    }
  }

  var _proto = GestureController.prototype;

  _proto.hammerOptionsHack = function hammerOptionsHack(gesture, hammer) {
    for (var key in gesture) {
      if (key.indexOf('swipe') !== -1 && hammer.get('swipe')) {
        hammer.get('swipe').set({
          enable: true
        });
      }

      if (key.indexOf('pinch') !== -1 && hammer.get('pinch')) {
        hammer.get('pinch').set({
          enable: true
        });
      }
    }
  };

  _proto.bindEvents = function bindEvents() {
    var _this = this;

    var gesture = this.gesture,
        hammer = this.hammer,
        dom = this.dom;
    var useCalculate = this.options.useCalculate;

    if (!hammer) {
      return;
    }

    var _loop = function _loop(key) {
      if (['touchstart', 'touchmove', 'touchend'].indexOf(key) !== -1) {
        var bindEvent = function bindEvent(event) {
          var records = useCalculate ? _this.getEventPostionRecords(event, true) : null;
          gesture[key](records, event);
        };

        Util.addEventListener(dom, key, bindEvent);
        _this._unbindEvent[key] = bindEvent;
      } else {
        hammer.on(key, function (event) {
          var records = useCalculate ? _this.getEventPostionRecords(event, false) : null;
          gesture[key](records, event);
        });
      }
    };

    for (var key in gesture) {
      _loop(key);
    }
  };

  _proto.getEventPostionRecords = function getEventPostionRecords(event, _isOrigin) {
    var useOffset = this.options.useOffset;
    var canvasDom = this.chart.get('canvas').get('el');
    var x;
    var y;

    if (_isOrigin) {
      var positionSource = event.targetTouches.length > 0 ? event.targetTouches[0] : event.changedTouches[0];

      if (useOffset) {
        x = positionSource.clientX - canvasDom.offsetLeft;
        y = positionSource.clientY - canvasDom.offsetTop;
      } else {
        x = positionSource.clientX;
        y = positionSource.clientY;
      }
    } else {
      if (useOffset) {
        x = event.center.x - canvasDom.offsetLeft;
        y = event.center.y - canvasDom.offsetTop;
      } else {
        x = event.center.x;
        y = event.center.y;
      }
    }

    return this.chart.getSnapRecords({
      x: x,
      y: y
    });
  };

  _proto.destroy = function destroy() {
    this.hammer.destroy();

    for (var key in this._unbindEvent) {
      var event = this._unbindEvent[key];
      Util.removeEventListener(this.dom, key, event);
    }
  };

  return GestureController;
}();

module.exports = {
  init: function init(chart) {
    chart.pluginGesture = function (_ref2) {
      var gesture = _ref2.gesture,
          options = _ref2.options,
          hammerOptions = _ref2.hammerOptions;
      var canvasDom = chart.get('canvas').get('el');
      var gestureController = new GestureController({
        dom: canvasDom,
        gesture: gesture,
        options: options,
        hammerOptions: hammerOptions,
        chart: chart
      });
      gestureController.bindEvents();
      chart.set('gestureController', gestureController);
      return gestureController;
    };
  },
  clear: function clear(chart) {
    var gestureController = chart.get('gestureController');
    gestureController && gestureController.destroy();
  }
};