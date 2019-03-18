function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var Util = require('../util/common');

var Interaction = require('./base');

var Chart = require('../chart/chart');

var FilterPlugin = require('../plugin/filter');

var MoveMixin = require('./mixin/move');

var PressTooltipMixin = require('./mixin/press-tooltip');

var UpdateScaleMixin = require('./mixin/update-scale');

var Pan =
/*#__PURE__*/
function (_Interaction) {
  _inheritsLoose(Pan, _Interaction);

  var _proto = Pan.prototype;

  _proto.getDefaultCfg = function getDefaultCfg() {
    var defaultCfg = _Interaction.prototype.getDefaultCfg.call(this);

    defaultCfg = Util.mix({}, defaultCfg, {
      startEvent: 'panstart',
      processEvent: 'panmove',
      endEvent: 'panend',
      resetEvent: 'touchend',
      mode: 'x',
      panThreshold: 10,
      // Minimal pan distance required before recognizing
      pressThreshold: 9,
      // Minimal movement that is allowed while pressing
      pressTime: 251,
      // Minimal press time in ms
      currentDeltaX: null,
      currentDeltaY: null,
      limitRange: {},
      _timestamp: 0,
      lastPoint: null,
      _panCumulativeDelta: 0,
      speed: 5
    });

    if (Util.isWx || Util.isMy) {
      // 小程序
      defaultCfg.startEvent = 'touchstart';
      defaultCfg.processEvent = 'touchmove';
      defaultCfg.endEvent = 'touchend';
    }

    return defaultCfg;
  };

  function Pan(cfg, chart) {
    var _this;

    _this = _Interaction.call(this, cfg, chart) || this;

    var self = _assertThisInitialized(_this);

    var hammer = self.hammer,
        panThreshold = self.panThreshold;

    if (hammer) {
      hammer.get('pan').set({
        threshold: panThreshold
      });
    }

    chart.registerPlugins([FilterPlugin, {
      changeData: function changeData() {
        self.limitRange = {};
      },
      clear: function clear() {
        self.limitRange = {};
      }
    }]);
    Util.mix(_assertThisInitialized(_this), UpdateScaleMixin, MoveMixin, PressTooltipMixin);

    _this._bindPress();

    return _this;
  }

  _proto.start = function start(e) {
    if (this.pressed) return;
    this.currentDeltaX = 0;
    this.currentDeltaY = 0;

    if (e.type === 'touchstart' || e.type === 'touchStart') {
      this.lastPoint = e.touches[0];
    }

    this._handleMove(e);
  };

  _proto.process = function process(e) {
    if (this.pressed) return;

    this._handleMove(e);
  };

  _proto.end = function end() {
    if (this.pressed) return;
    this.currentDeltaX = null;
    this.currentDeltaY = null;
    this.lastPoint = null;
    this._panCumulativeDelta = 0;
  };

  return Pan;
}(Interaction);

Chart.registerInteraction('pan', Pan);
module.exports = Pan;