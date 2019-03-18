var Util = require('../../util/common');

var Shape = require('./shape');

var Smooth = require('../../graphic/util/smooth');

var bbox = require('../../graphic/util/bbox');

var Global = require('../../global');

function equals(v1, v2) {
  return Math.abs(v1 - v2) < 0.00001;
}

function notEmpty(value) {
  return !isNaN(value) && !Util.isNil(value);
}

function filterPoints(points) {
  var filteredPoints = []; // filter the point which x or y is NaN

  for (var i = 0, len = points.length; i < len; i++) {
    var point = points[i];

    if (notEmpty(point.x) && notEmpty(point.y)) {
      filteredPoints.push(point);
    }
  }

  return filteredPoints;
}

function equalsCenter(points, center) {
  var eqls = true;
  Util.each(points, function (point) {
    if (!equals(point.x, center.x) || !equals(point.y, center.y)) {
      eqls = false;
      return false;
    }
  });
  return eqls;
}

function drawRectShape(topPoints, bottomPoints, container, style, isSmooth) {
  var shape;
  var points = topPoints.concat(bottomPoints);

  if (isSmooth) {
    shape = container.addShape('Custom', {
      className: 'area',
      attrs: Util.mix({
        points: points
      }, style),
      createPath: function createPath(context) {
        var constaint = [[0, 0], [1, 1]];
        var points = filterPoints(this._attrs.attrs.points);
        var pointsLen = points.length;
        var topPoints = points.slice(0, pointsLen / 2);
        var bottomPoints = points.slice(pointsLen / 2, pointsLen);
        var topSps = Smooth.smooth(topPoints, false, constaint);
        context.beginPath();
        context.moveTo(topPoints[0].x, topPoints[0].y);

        for (var i = 0, n = topSps.length; i < n; i++) {
          var sp = topSps[i];
          context.bezierCurveTo(sp[1], sp[2], sp[3], sp[4], sp[5], sp[6]);
        }

        if (bottomPoints.length) {
          var bottomSps = Smooth.smooth(bottomPoints, false, constaint);
          context.lineTo(bottomPoints[0].x, bottomPoints[0].y);

          for (var _i = 0, _n = bottomSps.length; _i < _n; _i++) {
            var _sp = bottomSps[_i];
            context.bezierCurveTo(_sp[1], _sp[2], _sp[3], _sp[4], _sp[5], _sp[6]);
          }
        }

        context.closePath();
      },
      calculateBox: function calculateBox() {
        var points = filterPoints(this._attrs.attrs.points);
        return bbox.getBBoxFromPoints(points);
      }
    });
  } else {
    shape = container.addShape('Polyline', {
      className: 'area',
      attrs: Util.mix({
        points: points
      }, style)
    });
  }

  return shape;
}

function drawShape(cfg, container, isSmooth) {
  var self = this;
  var points = cfg.points;
  var topPoints = [];
  var bottomPoints = [];
  Util.each(points, function (point) {
    bottomPoints.push(point[0]);
    topPoints.push(point[1]);
  });
  var style = Util.mix({
    fillStyle: cfg.color
  }, Global.shape.area, cfg.style);
  bottomPoints.reverse();
  topPoints = self.parsePoints(topPoints);
  bottomPoints = self.parsePoints(bottomPoints);

  if (cfg.isInCircle) {
    topPoints.push(topPoints[0]);
    bottomPoints.unshift(bottomPoints[bottomPoints.length - 1]);

    if (equalsCenter(bottomPoints, cfg.center)) {
      bottomPoints = [];
    }
  }

  return drawRectShape(topPoints, bottomPoints, container, style, isSmooth);
}

var Area = Shape.registerFactory('area', {
  defaultShapeType: 'area',
  getDefaultPoints: function getDefaultPoints(obj) {
    var x = obj.x;
    var y = obj.y;
    var y0 = obj.y0;
    y = Util.isArray(y) ? y : [y0, y];
    var points = [];
    points.push({
      x: x,
      y: y[0]
    }, {
      x: x,
      y: y[1]
    });
    return points;
  }
});
var SHAPES = ['area', 'smooth'];
Util.each(SHAPES, function (shapeType) {
  Shape.registerShape('area', shapeType, {
    draw: function draw(cfg, container) {
      var smooth = shapeType === 'smooth';
      return drawShape.call(this, cfg, container, smooth);
    }
  });
});
module.exports = Area;