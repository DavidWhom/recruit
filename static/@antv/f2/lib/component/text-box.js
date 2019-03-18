var Util = require('../util/common');

var _require = require('../graphic/index'),
    Group = _require.Group;

var TextBox =
/*#__PURE__*/
function () {
  var _proto = TextBox.prototype;

  _proto.getDefaultCfg = function getDefaultCfg() {
    return {
      x: 0,
      y: 0,
      content: '',
      textStyle: {
        fontSize: 12,
        fill: '#fff',
        textAlign: 'center',
        textBaseline: 'middle'
      },
      background: {
        radius: 1,
        fill: 'rgba(0, 0, 0, 0.65)',
        padding: [3, 5]
      },
      width: 0,
      height: 0,
      className: ''
    };
  };

  function TextBox(cfg) {
    Util.deepMix(this, this.getDefaultCfg(), cfg);

    this._init();

    var content = this.content,
        x = this.x,
        y = this.y;

    if (!Util.isNil(content)) {
      this.updateContent(content);
    }

    this.updatePosition(x, y);
  }

  _proto._init = function _init() {
    var content = this.content,
        textStyle = this.textStyle,
        background = this.background,
        className = this.className,
        visible = this.visible;
    var container = new Group({
      className: className,
      zIndex: 0,
      visible: visible
    });
    var text = container.addShape('Text', {
      className: className + '-text',
      zIndex: 1,
      attrs: Util.mix({
        text: content,
        x: 0,
        y: 0
      }, textStyle)
    });
    var backgroundShape = container.addShape('Rect', {
      className: className + '-bg',
      zIndex: -1,
      attrs: Util.mix({
        x: 0,
        y: 0,
        width: 0,
        height: 0
      }, background)
    });
    container.sort();
    this.container = container;
    this.textShape = text;
    this.backgroundShape = backgroundShape;
  };

  _proto._getBBox = function _getBBox() {
    var textShape = this.textShape;
    var background = this.background;
    var textBBox = textShape.getBBox();
    var padding = Util.parsePadding(background.padding);
    var width = textBBox.width + padding[1] + padding[3];
    var height = textBBox.height + padding[0] + padding[2];
    var x = textBBox.minX - padding[3];
    var y = textBBox.minY - padding[0];
    return {
      x: x,
      y: y,
      width: width,
      height: height
    };
  };

  _proto.updateContent = function updateContent(text) {
    var textShape = this.textShape,
        backgroundShape = this.backgroundShape;

    if (!Util.isNil(text)) {
      if (!Util.isObject(text)) {
        text = {
          text: text
        };
      }

      textShape.attr(text); // update box shape

      var _this$_getBBox = this._getBBox(),
          x = _this$_getBBox.x,
          y = _this$_getBBox.y,
          tipWidth = _this$_getBBox.width,
          tipHeight = _this$_getBBox.height;

      var width = this.width || tipWidth;
      var height = this.height || tipHeight;
      backgroundShape.attr({
        x: x,
        y: y,
        width: width,
        height: height
      });
      this._width = width;
      this._height = height;
      this.content = text.text;
    }
  };

  _proto.updatePosition = function updatePosition(x, y) {
    var container = this.container;

    var _this$_getBBox2 = this._getBBox(),
        xMin = _this$_getBBox2.x,
        yMin = _this$_getBBox2.y;

    container.moveTo(x - xMin, y - yMin);
    this.x = x - xMin;
    this.y = y - yMin;
  };

  _proto.getWidth = function getWidth() {
    return this._width;
  };

  _proto.getHeight = function getHeight() {
    return this._height;
  };

  _proto.show = function show() {
    this.container.show();
  };

  _proto.hide = function hide() {
    this.container.hide();
  };

  _proto.clear = function clear() {
    var container = this.container;
    container.clear();
    container.remove(true);
    this.container = null;
    this.textShape = null;
    this.backgroundShape = null;
  };

  return TextBox;
}();

module.exports = TextBox;