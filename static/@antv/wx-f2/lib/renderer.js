function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

var EventEmitter = require('wolfy87-eventemitter');

var CAPITALIZED_ATTRS_MAP = {
  fontSize: 'FontSize',
  opacity: 'GlobalAlpha',
  lineDash: 'LineDash',
  textAlign: 'TextAlign'
};
/**
 * wxapp textAlign align 可选值为 left|center|right
 * 标准canvas textAlign align 可选值为 left|center|right|start|end
 */

var TEXT_ALIGN_MAP = {
  start: 'left',
  end: 'right'
};

var Renderer =
/*#__PURE__*/
function (_EventEmitter) {
  _inheritsLoose(Renderer, _EventEmitter);

  function Renderer(wxCtx) {
    var _this;

    _this = _EventEmitter.call(this) || this;

    var self = _assertThisInitialized(_assertThisInitialized(_this));

    self.ctx = wxCtx;
    self.style = {}; // just mock

    self._initContext(wxCtx);

    return _this;
  }

  var _proto = Renderer.prototype;

  _proto.getContext = function getContext(type) {
    if (type === '2d') {
      return this.ctx;
    }
  };

  _proto._initContext = function _initContext(wxCtx) {
    Object.keys(CAPITALIZED_ATTRS_MAP).map(function (style) {
      Object.defineProperty(wxCtx, style, {
        set: function set(value) {
          if (style === "textAlign") {
            value = TEXT_ALIGN_MAP[value] ? TEXT_ALIGN_MAP[value] : value;
          }

          var name = 'set' + CAPITALIZED_ATTRS_MAP[style];
          wxCtx[name](value);
        }
      });
      return style;
    });
  };

  return Renderer;
}(EventEmitter);

module.exports = Renderer;