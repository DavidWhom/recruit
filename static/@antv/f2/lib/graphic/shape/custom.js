function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var Shape = require('../shape');

var Custom =
/*#__PURE__*/
function (_Shape) {
  _inheritsLoose(Custom, _Shape);

  function Custom() {
    return _Shape.apply(this, arguments) || this;
  }

  var _proto = Custom.prototype;

  _proto._initProperties = function _initProperties() {
    _Shape.prototype._initProperties.call(this);

    this._attrs.canFill = true;
    this._attrs.canStroke = true;
    this._attrs.createPath = null;
    this._attrs.type = 'custom';
  };

  _proto.createPath = function createPath(context) {
    var createPath = this.get('createPath');
    createPath && createPath.call(this, context);
  };

  _proto.calculateBox = function calculateBox() {
    var calculateBox = this.get('calculateBox');
    return calculateBox && calculateBox.call(this);
  };

  return Custom;
}(Shape);

Shape.Custom = Custom;
module.exports = Custom;