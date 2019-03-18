/**
 * @fileOverview Utility for calculate the with ratui in x axis
 * @author sima.zhang1990@gmail.com
 * @author dxq613@gmail.com
 */
var Global = require('../../global');

var Util = require('../../util/common');

var SizeMixin = {
  getDefalutSize: function getDefalutSize() {
    var defaultSize = this.get('defaultSize');

    if (!defaultSize) {
      var coord = this.get('coord');
      var xScale = this.getXScale();
      var dataArray = this.get('dataArray');
      var count = xScale.values.length;
      var range = xScale.range;
      var normalizeSize = 1 / count;
      var widthRatio = 1;

      if (coord && coord.isPolar) {
        if (coord.transposed && count > 1) {
          widthRatio = Global.widthRatio.multiplePie;
        } else {
          widthRatio = Global.widthRatio.rose;
        }
      } else {
        if (xScale.isLinear) {
          normalizeSize *= range[1] - range[0];
        }

        widthRatio = Global.widthRatio.column;
      }

      normalizeSize *= widthRatio;

      if (this.hasAdjust('dodge')) {
        normalizeSize = normalizeSize / dataArray.length;
      }

      defaultSize = normalizeSize;
      this.set('defaultSize', defaultSize);
    }

    return defaultSize;
  },
  getDimWidth: function getDimWidth(dimName) {
    var coord = this.get('coord');
    var start = coord.convertPoint({
      x: 0,
      y: 0
    });
    var end = coord.convertPoint({
      x: dimName === 'x' ? 1 : 0,
      y: dimName === 'x' ? 0 : 1
    });
    var width = 0;

    if (start && end) {
      width = Math.sqrt(Math.pow(end.x - start.x, 2) + Math.pow(end.y - start.y, 2));
    }

    return width;
  },
  _getWidth: function _getWidth() {
    var width = this.get('_width');

    if (!width) {
      var coord = this.get('coord');

      if (coord && coord.isPolar && !coord.transposed) {
        width = (coord.endAngle - coord.startAngle) * coord.circleRadius;
      } else {
        width = this.getDimWidth('x');
      }

      this.set('_width', width);
    }

    return width;
  },
  _toNormalizedSize: function _toNormalizedSize(size) {
    var width = this._getWidth();

    return size / width;
  },
  _toCoordSize: function _toCoordSize(normalizeSize) {
    var width = this._getWidth();

    return width * normalizeSize;
  },
  getNormalizedSize: function getNormalizedSize(obj) {
    var size = this.getAttrValue('size', obj);

    if (Util.isNil(size)) {
      size = this.getDefalutSize();
    } else {
      size = this._toNormalizedSize(size);
    }

    return size;
  },
  getSize: function getSize(obj) {
    var size = this.getAttrValue('size', obj);

    if (Util.isNil(size)) {
      var normalizeSize = this.getDefalutSize();
      size = this._toCoordSize(normalizeSize);
    }

    return size;
  }
};
module.exports = SizeMixin;