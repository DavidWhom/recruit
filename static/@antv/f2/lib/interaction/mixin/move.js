var Util = require('../../util/common');

var Helper = require('../helper');

var TOUCH_EVENTS = ['touchstart', 'touchmove', 'touchend', 'touchStart', 'touchMove', 'touchEnd'];
var DAY_TIMESTAMPS = 86400000;
module.exports = {
  _handleMove: function _handleMove(e) {
    if (e.type === 'swipe' && e.deltaTime > 350) {
      // 区分 pan 操作和 swipe 操作
      return null;
    }

    var currentDeltaX = this.currentDeltaX,
        currentDeltaY = this.currentDeltaY,
        lastPoint = this.lastPoint;
    var deltaX;
    var deltaY;

    if (TOUCH_EVENTS.indexOf(e.type) !== -1) {
      // support touch and miniprogram
      var currentPoint = e.touches[0];
      deltaX = currentPoint.x - lastPoint.x;
      deltaY = currentPoint.y - lastPoint.y;
      this.lastPoint = currentPoint;
    } else if (currentDeltaX !== null && currentDeltaY !== null) {
      deltaX = e.deltaX - currentDeltaX;
      deltaY = e.deltaY - currentDeltaY;
      this.currentDeltaX = e.deltaX;
      this.currentDeltaY = e.deltaY;
    }

    if (Math.abs(deltaX) > 0 || Math.abs(deltaY) > 0) {
      var lastTimestamp = this._timestamp;
      var now = +new Date();

      if (now - lastTimestamp > 16) {
        this._doMove(deltaX, deltaY);

        this._timestamp = now;
      }
    }
  },
  _doMove: function _doMove(deltaX, deltaY) {
    var self = this;
    var mode = self.mode,
        chart = self.chart,
        limitRange = self.limitRange;
    var coord = chart.get('coord');
    var start = coord.start,
        end = coord.end;
    var data = chart.get('data');

    if (Util.directionEnabled(mode, 'x') && deltaX !== 0) {
      var xScale = chart.getXScale();
      var xField = xScale.field;

      if (!limitRange[xField]) {
        limitRange[xField] = Helper.getLimitRange(data, xScale);
      }

      var coordWidth = end.x - start.x;

      if (xScale.isCategory) {
        self._handleCatScale(xScale, deltaX, coordWidth);
      } else if (xScale.isLinear) {
        self._handleLinearScale(xScale, deltaX, coordWidth, 'x');
      }

      var xDef = Helper.getColDef(chart, xField);
      self.xRange = Helper.getFieldRange(xDef, limitRange[xField], xScale.type);
    }

    if (Util.directionEnabled(mode, 'y') && deltaY !== 0) {
      var coordHeight = start.y - end.y;
      var yScales = chart.getYScales();
      Util.each(yScales, function (yScale) {
        var yField = yScale.field;

        if (!limitRange[yField]) {
          limitRange[yField] = Helper.getLimitRange(data, yScale);
        }

        yScale.isLinear && self._handleLinearScale(yScale, deltaY, coordHeight, 'y');
      });
      var yDef = Helper.getColDef(chart, yScales[0].field);
      self.yRange = Helper.getFieldRange(yDef, limitRange[yScales[0].field], yScales[0].type);
    }

    chart.repaint();
  },
  _handleLinearScale: function _handleLinearScale(scale, delta, range, flag) {
    var field = scale.field,
        min = scale.min,
        max = scale.max;
    var limitRange = this.limitRange;
    if (min === limitRange[field].min && max === limitRange[field].max) return;
    var ratio = delta / range;
    var panValue = ratio * (max - min);
    var newMax = flag === 'x' ? max - panValue : max + panValue;
    var newMin = flag === 'x' ? min - panValue : min + panValue;

    if (limitRange[field] && !Util.isNil(limitRange[field].min) && newMin <= limitRange[field].min) {
      newMin = limitRange[field].min;
      newMax = max - min + newMin;
    }

    if (limitRange[field] && !Util.isNil(limitRange[field].max) && newMax >= limitRange[field].max) {
      newMax = limitRange[field].max;
      newMin = newMax - (max - min);
    }

    this.updateLinearScale(field, newMin, newMax);
  },
  _handleCatScale: function _handleCatScale(scale, delta, range) {
    var type = scale.type,
        field = scale.field,
        values = scale.values,
        ticks = scale.ticks;
    var originValues = this.limitRange[field];
    var lastValueIndex = originValues.length - 1;
    var currentLength = values.length;
    var speed = this.speed || 1;
    var step = range / (currentLength * speed);
    var firstIndex = originValues.indexOf(values[0]);
    var lastIndex = originValues.indexOf(values[currentLength - 1]);
    var minIndex = firstIndex;
    var maxIndex = lastIndex;
    var ratio = Math.abs(delta / range);
    var panStep = this.step || Math.max(1, parseInt(ratio * currentLength));
    this._panCumulativeDelta += delta;
    minIndex = this._panCumulativeDelta > step ? Math.max(0, minIndex - panStep) : this._panCumulativeDelta < -step ? Math.min(lastValueIndex - currentLength + 1, minIndex + panStep) : minIndex;
    maxIndex = Math.min(lastValueIndex, minIndex + currentLength - 1);

    if (minIndex === firstIndex && maxIndex === lastIndex) {
      return null;
    }

    var newValues = originValues.slice(minIndex, maxIndex + 1);
    var newTicks = null;

    if (type === 'timeCat') {
      var tickGap = ticks.length > 2 ? ticks[1] - ticks[0] : DAY_TIMESTAMPS;

      if (this._panCumulativeDelta > step) {
        for (var i = ticks[0] - tickGap; i >= newValues[0]; i -= tickGap) {
          ticks.unshift(i);
        }
      } else if (this._panCumulativeDelta < -step) {
        for (var _i = ticks[ticks.length - 1] + tickGap; _i <= newValues[newValues.length - 1]; _i += tickGap) {
          ticks.push(_i);
        }
      }

      newTicks = ticks;
    }

    this.updateCatScale(field, newValues, newTicks, originValues, minIndex, maxIndex);
    this._panCumulativeDelta = minIndex !== firstIndex ? 0 : this._panCumulativeDelta;
  }
};