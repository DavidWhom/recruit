var Util = require('../../util/common');

var Global = require('../../global');

var Shape = {};
var ShapeBase = {
  _coord: null,

  /**
   * draw the shape
   * @param {Object} cfg options
   * @param {Object} container container to store the shapes
   */
  draw: function draw(cfg, container) {
    if (this.drawShape) {
      this.drawShape(cfg, container);
    }
  },

  /**
   * set the coordinate instance
   * @param {Coord} coord coordinate instance
   */
  setCoord: function setCoord(coord) {
    this._coord = coord;
  },

  /**
   * convert the normalized value to the canvas position
   * @param  {point} point the point to convert
   * @return {point} point return the result
   */
  parsePoint: function parsePoint(point) {
    var coord = this._coord;

    if (coord.isPolar) {
      if (point.x === 1) point.x = 0.9999999;
      if (point.y === 1) point.y = 0.9999999;
    }

    return coord.convertPoint(point);
  },

  /**
   * convert the normalized value to the canvas position
   * @param  {points} points the array that store the points
   * @return {points} points return the result
   */
  parsePoints: function parsePoints(points) {
    if (!points) return false;
    var self = this;
    var rst = [];
    points.forEach(function (point) {
      rst.push(self.parsePoint(point));
    });
    return rst;
  }
};
var ShapeFactoryBase = {
  defaultShapeType: null,
  setCoord: function setCoord(coord) {
    this._coord = coord;
  },
  getShape: function getShape(type) {
    var self = this;

    if (Util.isArray(type)) {
      type = type[0];
    }

    var shape = self[type] || self[self.defaultShapeType];
    shape._coord = self._coord;
    return shape;
  },
  getShapePoints: function getShapePoints(type, cfg) {
    var shape = this.getShape(type);
    var fn = shape.getPoints || shape.getShapePoints || this.getDefaultPoints;
    var points = fn(cfg);
    return points;
  },
  getDefaultPoints: function getDefaultPoints()
  /* cfg */
  {
    return [];
  },
  drawShape: function drawShape(type, cfg, container) {
    var shape = this.getShape(type);

    if (!cfg.color) {
      cfg.color = Global.colors[0];
    }

    return shape.draw(cfg, container);
  }
};

Shape.registerFactory = function (factoryName, cfg) {
  var className = Util.upperFirst(factoryName);
  var geomObj = Util.mix({}, ShapeFactoryBase, cfg);
  Shape[className] = geomObj;
  geomObj.name = factoryName;
  return geomObj;
};

Shape.registerShape = function (factoryName, shapeType, cfg) {
  var className = Util.upperFirst(factoryName);
  var factory = Shape[className];
  var shapeObj = Util.mix({}, ShapeBase, cfg);
  factory[shapeType] = shapeObj;
  return shapeObj;
};

Shape.registShape = Shape.registerShape;

Shape.getShapeFactory = function (factoryName) {
  var self = this;
  factoryName = factoryName || 'point';
  var className = Util.upperFirst(factoryName);
  return self[className];
};

module.exports = Shape;