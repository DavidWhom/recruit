var Shape = require('./shape');

var Util = require('../../util/common');

function _sortValue(value) {
  var sorted = value.sort(function (a, b) {
    return a < b ? 1 : -1;
  });
  var length = sorted.length;

  if (length < 4) {
    var min = sorted[length - 1];

    for (var i = 0; i < 4 - length; i++) {
      sorted.push(min);
    }
  }

  return sorted;
} // from left bottom corner, and clockwise


function getCandlePoints(x, y, width) {
  var yValues = _sortValue(y);

  var points = [{
    x: x,
    y: yValues[0]
  }, {
    x: x,
    y: yValues[1]
  }, {
    x: x - width / 2,
    y: yValues[2]
  }, {
    x: x - width / 2,
    y: yValues[1]
  }, {
    x: x + width / 2,
    y: yValues[1]
  }, {
    x: x + width / 2,
    y: yValues[2]
  }, {
    x: x,
    y: yValues[2]
  }, {
    x: x,
    y: yValues[3]
  }];
  return points;
}

var Schema = Shape.registerFactory('schema', {});
Shape.registerShape('schema', 'candle', {
  getPoints: function getPoints(cfg) {
    return getCandlePoints(cfg.x, cfg.y, cfg.size);
  },
  draw: function draw(cfg, container) {
    var points = this.parsePoints(cfg.points);
    var style = Util.mix({
      stroke: cfg.color,
      fill: cfg.color,
      lineWidth: 1
    }, cfg.style);
    return container.addShape('Custom', {
      className: 'schema',
      attrs: style,
      createPath: function createPath(ctx) {
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        ctx.lineTo(points[1].x, points[1].y);
        ctx.moveTo(points[2].x, points[2].y);

        for (var i = 3; i < 6; i++) {
          ctx.lineTo(points[i].x, points[i].y);
        }

        ctx.closePath();
        ctx.moveTo(points[6].x, points[6].y);
        ctx.lineTo(points[7].x, points[7].y);
      }
    });
  }
});
module.exports = Schema;