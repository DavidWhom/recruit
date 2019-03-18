var Util = require('../../util/common');

var KEYWORDS_PERCENT = {
  min: 0,
  median: 0.5,
  max: 1
};

var GuideBase =
/*#__PURE__*/
function () {
  var _proto = GuideBase.prototype;

  _proto._initDefaultCfg = function _initDefaultCfg() {};

  function GuideBase(cfg) {
    this._initDefaultCfg();

    Util.deepMix(this, cfg);
  }

  _proto._getNormalizedValue = function _getNormalizedValue(val, scale) {
    var rst;

    if (Util.isNil(KEYWORDS_PERCENT[val])) {
      rst = scale.scale(val);
    } else {
      rst = KEYWORDS_PERCENT[val];
    }

    return rst;
  };

  _proto.parsePercentPoint = function parsePercentPoint(coord, position) {
    var xPercent = parseFloat(position[0]) / 100;
    var yPercent = parseFloat(position[1]) / 100;
    var start = coord.start;
    var end = coord.end;
    var width = Math.abs(start.x - end.x);
    var height = Math.abs(start.y - end.y);
    var x = width * xPercent + Math.min(start.x, end.x);
    var y = height * yPercent + Math.min(start.y, end.y);
    return {
      x: x,
      y: y
    };
  };

  _proto.parsePoint = function parsePoint(coord, position) {
    var self = this;
    var xScale = self.xScale;
    var yScales = self.yScales;

    if (Util.isFunction(position)) {
      position = position(xScale, yScales); // position 必须是对象
    } // 如果数据格式是 ['50%', '50%'] 的格式


    if (Util.isString(position[0]) && position[0].indexOf('%') !== -1) {
      return this.parsePercentPoint(coord, position);
    }

    var x = self._getNormalizedValue(position[0], xScale);

    var y = self._getNormalizedValue(position[1], yScales[0]);

    var point = coord.convertPoint({
      x: x,
      y: y
    });

    if (self.limitInPlot) {
      // limit in chart plotRange
      if (x >= 0 && x <= 1 && y >= 0 && y <= 1) {
        return point;
      }

      return null;
    }

    return point;
  }
  /**
   * render the guide component
   * @param  {Coord} coord  coordinate instance
   * @param  {Canvas.Group} group the container
   */
  ;

  _proto.render = function render()
  /* coord,group */
  {};

  _proto.repaint = function repaint() {
    this.remove();
    var coord = this.coord,
        container = this.container,
        canvas = this.canvas;

    if (container && !container.isDestroyed()) {
      this.render(coord, container);
      canvas.draw();
    }
  };

  _proto.remove = function remove() {
    var element = this.element;
    element && element.remove(true);
  };

  _proto.changeVisible = function changeVisible(visible) {
    var self = this;
    self.visible = visible;
    var element = self.element;
    if (!element) return;

    if (element.set) {
      element.set('visible', visible);
    } else {
      element.style.display = visible ? '' : 'none';
    }
  };

  return GuideBase;
}();

module.exports = GuideBase;