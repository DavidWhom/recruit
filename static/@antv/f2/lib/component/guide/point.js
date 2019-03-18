function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var Util = require('../../util/common');

var GuideBase = require('./base');

var Point =
/*#__PURE__*/
function (_GuideBase) {
  _inheritsLoose(Point, _GuideBase);

  function Point() {
    return _GuideBase.apply(this, arguments) || this;
  }

  var _proto = Point.prototype;

  _proto._initDefaultCfg = function _initDefaultCfg() {
    this.type = 'point';
    this.position = null;
    this.offsetX = 0;
    this.offsetY = 0;
    this.style = {
      fill: '#1890FF',
      r: 3,
      lineWidth: 1,
      stroke: '#fff'
    };
  };

  _proto.render = function render(coord, container) {
    var position = this.parsePoint(coord, this.position);
    if (!position) return null;
    var shape = container.addShape('Circle', {
      className: 'guide-point',
      attrs: Util.mix({
        x: position.x + this.offsetX,
        y: position.y + this.offsetY
      }, this.style)
    });
    this.element = shape;
    return shape;
  };

  return Point;
}(GuideBase);

GuideBase.Point = Point;
module.exports = Point;