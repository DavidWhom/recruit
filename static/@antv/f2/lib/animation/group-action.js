/**
 * Group animate functions
 * @author sima.zhang1990@gmail.com
 */
var Util = require('./util');

var Helper = require('../util/helper');

var _require = require('../graphic/index'),
    Shape = _require.Shape;

function _groupScaleIn(container, animateCfg, coord, zeroY, type) {
  var _Util$getCoordInfo = Util.getCoordInfo(coord),
      start = _Util$getCoordInfo.start,
      end = _Util$getCoordInfo.end,
      width = _Util$getCoordInfo.width,
      height = _Util$getCoordInfo.height;

  var x;
  var y;
  var clip = new Shape.Rect({
    attrs: {
      x: start.x,
      y: end.y,
      width: width,
      height: height
    }
  });

  if (type === 'y') {
    x = start.x + width / 2;
    y = zeroY.y < start.y ? zeroY.y : start.y;
  } else if (type === 'x') {
    x = zeroY.x > start.x ? zeroY.x : start.x;
    y = start.y + height / 2;
  } else if (type === 'xy') {
    if (coord.isPolar) {
      x = coord.center.x;
      y = coord.center.y;
    } else {
      x = (start.x + end.x) / 2;
      y = (start.y + end.y) / 2;
    }
  }

  var endMatrix = Util.getScaledMatrix(clip, [x, y], type);
  clip.isClip = true;
  clip.endState = {
    matrix: endMatrix
  };
  clip.set('canvas', container.get('canvas'));
  container.attr('clip', clip);

  var onEnd = function onEnd() {
    container.attr('clip', null);
    clip.remove(true);
  };

  Util.doAnimation(clip, clip.endState, animateCfg, onEnd);
}

function _shapeScale(container, animateCfg, type) {
  var shapes = container.get('children');
  var x;
  var y;
  var endMatrix;

  for (var i = 0, len = shapes.length; i < len; i++) {
    var shape = shapes[i];
    var box = shape.getBBox();
    x = (box.minX + box.maxX) / 2;
    y = (box.minY + box.maxY) / 2;
    endMatrix = Util.getScaledMatrix(shape, [x, y], type);
    Util.doAnimation(shape, {
      matrix: endMatrix
    }, animateCfg);
  }
}

function groupScaleInX(container, animateCfg, coord, zeroY) {
  _groupScaleIn(container, animateCfg, coord, zeroY, 'x');
}

function groupScaleInY(container, animateCfg, coord, zeroY) {
  _groupScaleIn(container, animateCfg, coord, zeroY, 'y');
}

function groupScaleInXY(container, animateCfg, coord, zeroY) {
  _groupScaleIn(container, animateCfg, coord, zeroY, 'xy');
}

function shapesScaleInX(container, animateCfg) {
  _shapeScale(container, animateCfg, 'x');
}

function shapesScaleInY(container, animateCfg) {
  _shapeScale(container, animateCfg, 'y');
}

function shapesScaleInXY(container, animateCfg) {
  _shapeScale(container, animateCfg, 'xy');
}

function groupWaveIn(container, animateCfg, coord) {
  var clip = Helper.getClip(coord);
  clip.set('canvas', container.get('canvas'));
  container.attr('clip', clip);

  var onEnd = function onEnd() {
    container.attr('clip', null);
    clip.remove(true);
  };

  var endState = {};

  if (coord.isPolar) {
    var startAngle = coord.startAngle,
        endAngle = coord.endAngle;
    endState.endAngle = endAngle;
    clip.attr('endAngle', startAngle);
  } else {
    var start = coord.start,
        end = coord.end;
    var width = Math.abs(start.x - end.x);
    var height = Math.abs(start.y - end.y);

    if (coord.isTransposed) {
      clip.attr('height', 0);
      endState.height = height;
    } else {
      clip.attr('width', 0);
      endState.width = width;
    }
  }

  Util.doAnimation(clip, endState, animateCfg, onEnd);
}

module.exports = {
  groupWaveIn: groupWaveIn,
  groupScaleInX: groupScaleInX,
  groupScaleInY: groupScaleInY,
  groupScaleInXY: groupScaleInXY,
  shapesScaleInX: shapesScaleInX,
  shapesScaleInY: shapesScaleInY,
  shapesScaleInXY: shapesScaleInXY
};