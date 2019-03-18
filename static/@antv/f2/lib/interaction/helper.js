var TimeUtil = require('@antv/scale/lib/time-util');

var Util = require('../util/common');

module.exports = {
  getColDef: function getColDef(chart, field) {
    var colDef;

    if (chart.get('colDefs') && chart.get('colDefs')[field]) {
      colDef = chart.get('colDefs')[field];
    }

    return colDef;
  },
  getFieldRange: function getFieldRange(scale, limitRange, type) {
    if (!scale) return [0, 1];
    var minRatio = 0;
    var maxRatio = 0;

    if (type === 'linear') {
      var min = limitRange.min,
          max = limitRange.max;
      minRatio = (scale.min - min) / (max - min);
      maxRatio = (scale.max - min) / (max - min);
    } else {
      var originValues = limitRange;
      var values = scale.values || [];
      var firstIndex = originValues.indexOf(values[0]);
      var lastIndex = originValues.indexOf(values[values.length - 1]);
      minRatio = firstIndex / (originValues.length - 1);
      maxRatio = lastIndex / (originValues.length - 1);
    }

    return [minRatio, maxRatio];
  },
  getLimitRange: function getLimitRange(data, scale) {
    var result;
    var field = scale.field,
        type = scale.type;
    var values = Util.Array.values(data, field);

    if (type === 'linear') {
      result = Util.Array.getRange(values);

      if (scale.min < result.min) {
        result.min = scale.min;
      }

      if (scale.max > result.max) {
        result.max = scale.max;
      }
    } else if (type === 'timeCat') {
      Util.each(values, function (v, i) {
        values[i] = TimeUtil.toTimeStamp(v);
      });
      values.sort(function (v1, v2) {
        return v1 - v2;
      });
      result = values;
    } else {
      result = values;
    }

    return result;
  }
};