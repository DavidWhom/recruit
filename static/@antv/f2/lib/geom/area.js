function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

/**
 * @fileOverview area geometry
 * @author dxq613 @gmail.com
 * @author sima.zhang1990@gmail.com
 */
var Geom = require('./base');

var ShapeUtil = require('./shape/util');

var Util = require('../util/common');

require('./shape/area');

var Area =
/*#__PURE__*/
function (_Geom) {
  _inheritsLoose(Area, _Geom);

  function Area() {
    return _Geom.apply(this, arguments) || this;
  }

  var _proto = Area.prototype;

  /**
   * get the default configuration
   * @protected
   * @return {Object} return the result
   */
  _proto.getDefaultCfg = function getDefaultCfg() {
    var cfg = _Geom.prototype.getDefaultCfg.call(this);

    cfg.type = 'area';
    cfg.shapeType = 'area';
    cfg.generatePoints = true;
    cfg.sortable = true;
    return cfg;
  };

  _proto.draw = function draw(data, shapeFactory) {
    var self = this;
    var container = self.get('container');
    var cfg = this.getDrawCfg(data[0]);
    var yScale = self.getYScale();
    var connectNulls = self.get('connectNulls');
    var splitArray = ShapeUtil.splitArray(data, yScale.field, connectNulls);
    cfg.origin = data;
    Util.each(splitArray, function (subData, splitedIndex) {
      cfg.splitedIndex = splitedIndex;
      var points = subData.map(function (obj) {
        return obj.points;
      });
      cfg.points = points;
      self.drawShape(cfg.shape, data[0], cfg, container, shapeFactory);
    });
  };

  return Area;
}(Geom);

Geom.Area = Area;
module.exports = Area;