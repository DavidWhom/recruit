function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var Util = require('../../util/common');

var Shape = require('../shape');

var textWidthCacheCounter = 0;
var textWidthCache = {};
var TEXT_CACHE_MAX = 5000;

var Text =
/*#__PURE__*/
function (_Shape) {
  _inheritsLoose(Text, _Shape);

  function Text() {
    return _Shape.apply(this, arguments) || this;
  }

  var _proto = Text.prototype;

  _proto._initProperties = function _initProperties() {
    _Shape.prototype._initProperties.call(this);

    this._attrs.canFill = true;
    this._attrs.canStroke = true;
    this._attrs.type = 'text';
  };

  _proto.getDefaultAttrs = function getDefaultAttrs() {
    return {
      lineWidth: 0,
      lineCount: 1,
      fontSize: 12,
      fontFamily: 'sans-serif',
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontVariant: 'normal',
      textAlign: 'start',
      textBaseline: 'bottom',
      lineHeight: null,
      textArr: null
    };
  };

  _proto._getFontStyle = function _getFontStyle() {
    var attrs = this._attrs.attrs;
    var fontSize = attrs.fontSize,
        fontFamily = attrs.fontFamily,
        fontWeight = attrs.fontWeight,
        fontStyle = attrs.fontStyle,
        fontVariant = attrs.fontVariant;
    return fontStyle + " " + fontVariant + " " + fontWeight + " " + fontSize + "px " + fontFamily;
  };

  _proto._afterAttrsSet = function _afterAttrsSet() {
    var attrs = this._attrs.attrs;
    attrs.font = this._getFontStyle();

    if (attrs.text) {
      var text = attrs.text;
      var textArr = null;
      var lineCount = 1;

      if (Util.isString(text) && text.indexOf('\n') !== -1) {
        textArr = text.split('\n');
        lineCount = textArr.length;
      }

      attrs.lineCount = lineCount;
      attrs.textArr = textArr;
    }

    this.set('attrs', attrs);
  };

  _proto._getTextHeight = function _getTextHeight() {
    var attrs = this._attrs.attrs;

    if (attrs.height) {
      return attrs.height;
    }

    var lineCount = attrs.lineCount;
    var fontSize = attrs.fontSize * 1;

    if (lineCount > 1) {
      var spaceingY = this._getSpaceingY();

      return fontSize * lineCount + spaceingY * (lineCount - 1);
    }

    return fontSize;
  };

  _proto._getSpaceingY = function _getSpaceingY() {
    var attrs = this._attrs.attrs;
    var lineHeight = attrs.lineHeight;
    var fontSize = attrs.fontSize * 1;
    return lineHeight ? lineHeight - fontSize : fontSize * 0.14;
  };

  _proto.drawInner = function drawInner(context) {
    var self = this;
    var attrs = self._attrs.attrs;
    var text = attrs.text;
    var x = attrs.x;
    var y = attrs.y;

    if (Util.isNil(text) || isNaN(x) || isNaN(y)) {
      // text will be 0
      return;
    }

    var textArr = attrs.textArr;
    var fontSize = attrs.fontSize * 1;

    var spaceingY = self._getSpaceingY();

    if (attrs.rotate) {
      // do rotation
      context.translate(x, y);
      context.rotate(attrs.rotate);
      x = 0;
      y = 0;
    }

    var textBaseline = attrs.textBaseline;
    var height;

    if (textArr) {
      height = self._getTextHeight();
    }

    var subY; // context.beginPath();

    if (self.hasFill()) {
      var fillOpacity = attrs.fillOpacity;

      if (!Util.isNil(fillOpacity) && fillOpacity !== 1) {
        context.globalAlpha = fillOpacity;
      }

      if (textArr) {
        for (var i = 0, len = textArr.length; i < len; i++) {
          var subText = textArr[i];
          subY = y + i * (spaceingY + fontSize) - height + fontSize; // bottom;

          if (textBaseline === 'middle') {
            subY += height - fontSize - (height - fontSize) / 2;
          }

          if (textBaseline === 'top') {
            subY += height - fontSize;
          }

          context.fillText(subText, x, subY);
        }
      } else {
        context.fillText(text, x, y);
      }
    }

    if (self.hasStroke()) {
      if (textArr) {
        for (var _i = 0, _len = textArr.length; _i < _len; _i++) {
          var _subText = textArr[_i];
          subY = y + _i * (spaceingY + fontSize) - height + fontSize; // bottom;

          if (textBaseline === 'middle') {
            subY += height - fontSize - (height - fontSize) / 2;
          }

          if (textBaseline === 'top') {
            subY += height - fontSize;
          }

          context.strokeText(_subText, x, subY);
        }
      } else {
        context.strokeText(text, x, y);
      }
    }
  };

  _proto.calculateBox = function calculateBox() {
    var self = this;
    var attrs = self._attrs.attrs;
    var x = attrs.x,
        y = attrs.y,
        textAlign = attrs.textAlign,
        textBaseline = attrs.textBaseline;

    var width = self._getTextWidth(); // attrs.width


    if (!width) {
      return {
        minX: x,
        minY: y,
        maxX: x,
        maxY: y
      };
    }

    var height = self._getTextHeight(); // attrs.height


    var point = {
      x: x,
      y: y - height
    }; // default textAlign: start, textBaseline: bottom

    if (textAlign) {
      if (textAlign === 'end' || textAlign === 'right') {
        point.x -= width;
      } else if (textAlign === 'center') {
        point.x -= width / 2;
      }
    }

    if (textBaseline) {
      if (textBaseline === 'top') {
        point.y += height;
      } else if (textBaseline === 'middle') {
        point.y += height / 2;
      }
    }

    return {
      minX: point.x,
      minY: point.y,
      maxX: point.x + width,
      maxY: point.y + height
    };
  };

  _proto._getTextWidth = function _getTextWidth() {
    var attrs = this._attrs.attrs;

    if (attrs.width) {
      return attrs.width;
    }

    var text = attrs.text;
    var context = this.get('context');
    if (Util.isNil(text)) return undefined;
    var font = attrs.font;
    var textArr = attrs.textArr;
    var key = text + '' + font;

    if (textWidthCache[key]) {
      return textWidthCache[key];
    }

    var width = 0;

    if (textArr) {
      for (var i = 0, length = textArr.length; i < length; i++) {
        var subText = textArr[i];
        width = Math.max(width, Util.measureText(subText, font, context).width);
      }
    } else {
      width = Util.measureText(text, font, context).width;
    }

    if (textWidthCacheCounter > TEXT_CACHE_MAX) {
      textWidthCacheCounter = 0;
      textWidthCache = {};
    }

    textWidthCacheCounter++;
    textWidthCache[key] = width;
    return width;
  };

  return Text;
}(Shape);

Shape.Text = Text;
module.exports = Text;