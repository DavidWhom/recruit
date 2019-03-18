function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var Util = require('../../util/common');

var Abstract = require('./abstract');

var Circle =
/*#__PURE__*/
function (_Abstract) {
  _inheritsLoose(Circle, _Abstract);

  function Circle() {
    return _Abstract.apply(this, arguments) || this;
  }

  var _proto = Circle.prototype;

  _proto._initDefaultCfg = function _initDefaultCfg() {
    _Abstract.prototype._initDefaultCfg.call(this);

    this.startAngle = -Math.PI / 2; // start angle，in radian

    this.endAngle = Math.PI * 3 / 2; // end angle, in radian

    this.radius = null; // radius

    this.center = null; // center
  };

  _proto.getOffsetPoint = function getOffsetPoint(value) {
    var startAngle = this.startAngle,
        endAngle = this.endAngle;
    var angle = startAngle + (endAngle - startAngle) * value;
    return this._getCirclePoint(angle);
  };

  _proto._getCirclePoint = function _getCirclePoint(angle, radius) {
    var self = this;
    var center = self.center;
    radius = radius || self.radius;
    return {
      x: center.x + Math.cos(angle) * radius,
      y: center.y + Math.sin(angle) * radius
    };
  };

  _proto.getTextAlignInfo = function getTextAlignInfo(point, offset) {
    var self = this;
    var offsetVector = self.getOffsetVector(point, offset);
    var align;
    var baseLine = 'middle';

    if (offsetVector[0] > 0) {
      align = 'left';
    } else if (offsetVector[0] < 0) {
      align = 'right';
    } else {
      align = 'center';

      if (offsetVector[1] > 0) {
        baseLine = 'top';
      } else if (offsetVector[1] < 0) {
        baseLine = 'bottom';
      }
    }

    return {
      textAlign: align,
      textBaseline: baseLine
    };
  };

  _proto.getAxisVector = function getAxisVector(point) {
    var center = this.center;
    var factor = this.offsetFactor;
    return [(point.y - center.y) * factor, (point.x - center.x) * -1 * factor];
  };

  _proto.drawLine = function drawLine(lineCfg) {
    var center = this.center,
        radius = this.radius,
        startAngle = this.startAngle,
        endAngle = this.endAngle;
    var container = this.getContainer(lineCfg.top);
    container.addShape('arc', {
      className: 'axis-line',
      attrs: Util.mix({
        x: center.x,
        y: center.y,
        r: radius,
        startAngle: startAngle,
        endAngle: endAngle
      }, lineCfg)
    });
  };

  return Circle;
}(Abstract);

Abstract.Circle = Circle;
module.exports = Circle;