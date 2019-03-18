var Helper = require('../helper');

var Util = require('../../util/common');

module.exports = {
  updateLinearScale: function updateLinearScale(field, min, max) {
    var chart = this.chart;
    var colDef = Helper.getColDef(chart, field);
    chart.scale(field, Util.mix({}, colDef, {
      min: min,
      max: max,
      nice: false
    }));
  },
  updateCatScale: function updateCatScale(field, newValues, ticks, values, minIndex, maxIndex) {
    var chart = this.chart;
    var colDef = Helper.getColDef(chart, field);
    chart.scale(field, Util.mix({}, colDef, {
      values: newValues,
      ticks: ticks,
      scale: function scale(value) {
        if (this.type === 'timeCat') {
          value = this._toTimeStamp(value);
        }

        var rangeMin = this.rangeMin();
        var rangeMax = this.rangeMax();
        var range = rangeMax - rangeMin;
        var min;
        var max;
        var percent;
        var currentIndex = values.indexOf(value); // 在完整数据集中的索引值

        if (currentIndex >= 0 && currentIndex < minIndex) {
          // 不在范围内，左侧数据
          max = rangeMin > 0 ? -0.1 : rangeMin - 0.1;
          min = max - range;
          percent = currentIndex / minIndex;
        } else if (currentIndex >= 0 && currentIndex > maxIndex) {
          // 不在范围内，右侧数据
          min = rangeMax < 1 ? 1.1 : rangeMax + 0.1;
          max = min + range;
          percent = (currentIndex - maxIndex - 1) / (values.length - 1 - maxIndex);
        } else {
          // 数值在当前 this.values 范围内
          var index = this.translate(value);

          if (this.values.length === 1) {
            percent = index;
          } else {
            percent = index / (this.values.length - 1);
          }

          min = rangeMin;
          max = rangeMax;
        }

        return min + percent * (max - min);
      },
      getTicks: function getTicks() {
        var self = this;
        var ticks = this.ticks;
        var rst = [];
        Util.each(ticks, function (tick) {
          var obj;

          if (Util.isObject(tick)) {
            obj = tick;
          } else {
            var value = self.scale(tick);
            value = value >= 0 && value <= 1 ? value : NaN;
            obj = {
              text: Util.isString(tick) ? tick : self.getText(tick),
              value: value,
              tickValue: tick // 用于坐标轴上文本动画时确定前后帧的对应关系

            };
          }

          rst.push(obj);
        });
        return rst;
      }
    }));
  }
};