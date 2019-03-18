/**
 * @fileOverview shape util
 * @author dxq613@gmail.com
 */
var Util = require('../../util/common');

var ShapeUtil = {
  splitPoints: function splitPoints(obj) {
    var points = [];
    var x = obj.x;
    var y = obj.y;
    y = Util.isArray(y) ? y : [y];
    y.forEach(function (yItem, index) {
      var point = {
        x: Util.isArray(x) ? x[index] : x,
        y: yItem
      };
      points.push(point);
    });
    return points;
  },
  splitArray: function splitArray(data, yField, connectNulls) {
    if (!data.length) return [];
    var arr = [];
    var tmp = [];
    var yValue;
    Util.each(data, function (obj) {
      yValue = obj._origin ? obj._origin[yField] : obj[yField];

      if (connectNulls) {
        if (!Util.isNil(yValue)) {
          tmp.push(obj);
        }
      } else {
        if (Util.isArray(yValue) && Util.isNil(yValue[0]) || Util.isNil(yValue)) {
          if (tmp.length) {
            arr.push(tmp);
            tmp = [];
          }
        } else {
          tmp.push(obj);
        }
      }
    });

    if (tmp.length) {
      arr.push(tmp);
    }

    return arr;
  }
};
module.exports = ShapeUtil;