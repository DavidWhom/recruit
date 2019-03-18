function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var Util = require('../util/common');

var Helper = require('./helper');

var Interaction = require('./base');

var Chart = require('../chart/chart');

var FilterPlugin = require('../plugin/filter');

var PressTooltipMixin = require('./mixin/press-tooltip');

var updateScaleMixin = require('./mixin/update-scale');

var Pinch =
/*#__PURE__*/
function (_Interaction) {
  _inheritsLoose(Pinch, _Interaction);

  var _proto = Pinch.prototype;

  _proto.getDefaultCfg = function getDefaultCfg() {
    var defaultCfg = _Interaction.prototype.getDefaultCfg.call(this);

    return Util.mix({}, defaultCfg, {
      startEvent: 'pinchstart',
      processEvent: 'pinch',
      endEvent: 'pinchend',
      resetEvent: 'touchend',
      pressThreshold: 9,
      // Minimal movement that is allowed while pressing
      pressTime: 251,
      // Minimal press time in ms
      mode: 'x',
      currentPinchScaling: null,
      originValues: null,
      minScale: null,
      maxScale: null,
      limitRange: {},
      sensitivity: 1,
      _pinchCumulativeDelta: 0,
      _timestamp: 0
    });
  };

  function Pinch(cfg, chart) {
    var _this;

    _this = _Interaction.call(this, cfg, chart) || this;

    var self = _assertThisInitialized(_this);

    var hammer = self.hammer;
    hammer.get('pinch').set({
      // open pinch recognizer
      enable: true
    });
    chart.registerPlugins([FilterPlugin, {
      changeData: function changeData() {
        self.limitRange = {};
        self.originTicks = null;
      },
      clear: function clear() {
        self.limitRange = {};
        self.originTicks = null;
      }
    }]);
    Util.mix(self, PressTooltipMixin, updateScaleMixin);

    self._bindPress();

    return _this;
  }

  _proto.start = function start() {
    if (this.pressed) return;
    this.currentPinchScaling = 1;
  };

  _proto.process = function process(e) {
    if (this.pressed) return;

    this._handlePinch(e);
  };

  _proto.end = function end(e) {
    if (this.pressed) return;

    this._handlePinch(e);

    this.currentPinchScaling = null; // reset

    this.pinchCumulativeDelta = 0;
  };

  _proto._handlePinch = function _handlePinch(e) {
    var currentPinchScaling = this.currentPinchScaling;
    var diff = 1 / currentPinchScaling * e.scale;
    var rect = e.target.getBoundingClientRect();
    var offsetX = e.center.x - rect.left;
    var offsetY = e.center.y - rect.top;
    var center = {
      x: offsetX,
      y: offsetY
    }; // fingers position difference

    var x = Math.abs(e.pointers[0].clientX - e.pointers[1].clientX);
    var y = Math.abs(e.pointers[0].clientY - e.pointers[1].clientY); // diagonal fingers will change both (xy) axes

    var p = x / y;
    var xy;

    if (p > 0.3 && p < 1.7) {
      xy = 'xy';
    } else if (x > y) {
      xy = 'x';
    } else {
      xy = 'y';
    }

    var lastTimestamp = this._timestamp;
    var now = +new Date();

    if (now - lastTimestamp > 16) {
      this._doZoom(diff, center, xy);

      this._timestamp = now;
    } // Keep track of overall scale


    this.currentPinchScaling = e.scale;
  };

  _proto._doZoom = function _doZoom(diff, center, whichAxes) {
    var self = this;
    var mode = self.mode,
        chart = self.chart,
        limitRange = self.limitRange; // Which axe should be modified when figers were used.

    var _whichAxes;

    if (mode === 'xy' && whichAxes !== undefined) {
      // based on fingers positions
      _whichAxes = whichAxes;
    } else {
      _whichAxes = 'xy';
    }

    var data = chart.get('data');

    if (Util.directionEnabled(mode, 'x') && Util.directionEnabled(_whichAxes, 'x')) {
      // x
      var xScale = chart.getXScale();
      var xField = xScale.field;

      if (!limitRange[xField]) {
        limitRange[xField] = Helper.getLimitRange(data, xScale);
      }

      if (xScale.isCategory) {
        // 横轴为分类类型
        self._zoomCatScale(xScale, diff, center);
      } else if (xScale.isLinear) {
        self._zoomLinearScale(xScale, diff, center, 'x');
      }

      var xDef = Helper.getColDef(chart, xField);
      this.xRange = Helper.getFieldRange(xDef, limitRange[xField], xScale.type);
    }

    if (Util.directionEnabled(mode, 'y') && Util.directionEnabled(_whichAxes, 'y')) {
      // y
      var yScales = chart.getYScales();
      Util.each(yScales, function (yScale) {
        var yField = yScale.field;

        if (!limitRange[yField]) {
          limitRange[yField] = Helper.getLimitRange(data, yScale);
        }

        yScale.isLinear && self._zoomLinearScale(yScale, diff, center, 'y');
      });
      var yDef = Helper.getColDef(chart, yScales[0].field);
      this.yRange = Helper.getFieldRange(yDef, limitRange[yScales[0].field], yScales[0].type);
    }

    chart.repaint();
  };

  _proto._zoomLinearScale = function _zoomLinearScale(scale, zoom, center, flag) {
    var chart = this.chart;
    var min = scale.min,
        max = scale.max,
        field = scale.field;
    var valueRange = max - min;
    var limitRange = this.limitRange;
    var originRange = limitRange[field].max - limitRange[field].min;
    var coord = chart.get('coord');
    var newDiff = valueRange * (zoom - 1);

    if (this.minScale && zoom < 1) {
      // zoom in
      var maxRange = originRange / this.minScale;
      newDiff = Math.max(valueRange - maxRange, newDiff);
    }

    if (this.maxScale && zoom >= 1) {
      // zoom out
      var minRange = originRange / this.maxScale;
      newDiff = Math.min(valueRange - minRange, newDiff);
    }

    var offsetPoint = coord.invertPoint(center);
    var percent = flag === 'x' ? offsetPoint.x : offsetPoint.y;
    var minDelta = newDiff * percent;
    var maxDelta = newDiff * (1 - percent);
    var newMax = max - maxDelta;
    var newMin = min + minDelta;
    this.updateLinearScale(field, newMin, newMax);
  } // 针对分类类型
  ;

  _proto._zoomCatScale = function _zoomCatScale(scale, zoom, center) {
    var pinchCumulativeDelta = this._pinchCumulativeDelta;
    var sensitivity = this.sensitivity;
    pinchCumulativeDelta = zoom > 1 ? pinchCumulativeDelta + 1 : pinchCumulativeDelta - 1;
    this._pinchCumulativeDelta = pinchCumulativeDelta;
    var field = scale.field,
        values = scale.values;
    var chart = this.chart;
    var coord = chart.get('coord');

    if (!this.originTicks) {
      this.originTicks = scale.ticks;
    }

    var originValues = this.limitRange[field];
    var originValuesLen = originValues.length;
    var minScale = this.minScale || 1;
    var maxScale = this.maxScale || 5;
    var minCount = parseInt(originValuesLen / maxScale);
    var maxCount = parseInt(originValuesLen / minScale);
    var currentLen = values.length;

    if (pinchCumulativeDelta > 0 && currentLen <= minCount) {
      return null;
    }

    if (pinchCumulativeDelta < 0 && currentLen >= maxCount) {
      return null;
    }

    var lastLabelIndex = originValuesLen - 1;
    var firstValue = values[0];
    var lastValue = values[currentLen - 1];
    var minIndex = originValues.indexOf(firstValue);
    var maxIndex = originValues.indexOf(lastValue);
    var chartCenter = (coord.start.x + coord.end.x) / 2;
    var centerPointer = center.x;

    if (Math.abs(pinchCumulativeDelta) > sensitivity) {
      var deltaCount = Math.max(1, parseInt(currentLen * Math.abs(zoom - 1)));

      if (pinchCumulativeDelta < 0) {
        if (centerPointer >= chartCenter) {
          if (minIndex <= 0) {
            maxIndex = Math.min(lastLabelIndex, maxIndex + deltaCount);
          } else {
            minIndex = Math.max(0, minIndex - deltaCount);
          }
        } else if (centerPointer < chartCenter) {
          if (maxIndex >= lastLabelIndex) {
            minIndex = Math.max(0, minIndex - deltaCount);
          } else {
            maxIndex = Math.min(lastLabelIndex, maxIndex + deltaCount);
          }
        }

        this._pinchCumulativeDelta = 0;
      } else if (pinchCumulativeDelta > 0) {
        if (centerPointer >= chartCenter) {
          minIndex = minIndex < maxIndex ? minIndex = Math.min(maxIndex, minIndex + deltaCount) : minIndex;
        } else if (centerPointer < chartCenter) {
          maxIndex = maxIndex > minIndex ? maxIndex = Math.max(minIndex, maxIndex - deltaCount) : maxIndex;
        }

        this._pinchCumulativeDelta = 0;
      }

      var newValues = originValues.slice(minIndex, maxIndex + 1);
      this.updateCatScale(field, newValues, this.originTicks, originValues, minIndex, maxIndex);
    }
  };

  return Pinch;
}(Interaction);

Chart.registerInteraction('pinch', Pinch);
module.exports = Pinch;