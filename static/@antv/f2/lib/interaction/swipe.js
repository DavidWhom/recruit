function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var Util = require('../util/common');

var Interaction = require('./base');

var Chart = require('../chart/chart');

var FilterPlugin = require('../plugin/filter');

var MoveMixin = require('./mixin/move');

var UpdateScaleMixin = require('./mixin/update-scale');

var Swipe =
/*#__PURE__*/
function (_Interaction) {
  _inheritsLoose(Swipe, _Interaction);

  var _proto = Swipe.prototype;

  _proto.getDefaultCfg = function getDefaultCfg() {
    var defaultCfg = _Interaction.prototype.getDefaultCfg.call(this);

    defaultCfg = Util.mix({}, defaultCfg, {
      startEvent: 'touchstart',
      processEvent: 'swipe',
      endEvent: 'touchend',
      currentDeltaX: null,
      threshold: 10,
      // Minimal distance required before recognizing.
      velocity: 0.3,
      // Minimal velocity required before recognizing, unit is in px per ms.
      limitRange: {},
      _timestamp: 0,
      _panCumulativeDelta: 0,
      speed: 5
    });
    return defaultCfg;
  };

  function Swipe(cfg, chart) {
    var _this;

    _this = _Interaction.call(this, cfg, chart) || this;

    var self = _assertThisInitialized(_this);

    var hammer = self.hammer,
        threshold = self.threshold,
        velocity = self.velocity;

    if (hammer) {
      hammer.get('swipe').set({
        direction: 6,
        // only support horizontal
        threshold: threshold,
        velocity: velocity
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
    self.mode = 'x';
    Util.mix(self, UpdateScaleMixin, MoveMixin);
    return _this;
  }

  _proto.process = function process(e) {
    this.currentDeltaX = 0;

    this._handleMove(e);
  };

  _proto.end = function end() {
    this.currentDeltaX = null;
    this._panCumulativeDelta = 0;
  };

  return Swipe;
}(Interaction);

Chart.registerInteraction('swipe', Swipe);
module.exports = Swipe;