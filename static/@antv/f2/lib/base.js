/**
 * @fileOverview Base class of chart and geometry
 * @author dxq613@gmail.com
 */
var Util = require('./util/common');

var Base =
/*#__PURE__*/
function () {
  var _proto = Base.prototype;

  _proto.getDefaultCfg = function getDefaultCfg() {
    return {};
  };

  function Base(cfg) {
    var attrs = {};
    var defaultCfg = this.getDefaultCfg();
    this._attrs = attrs;
    Util.mix(attrs, defaultCfg, cfg);
  }

  _proto.get = function get(name) {
    return this._attrs[name];
  };

  _proto.set = function set(name, value) {
    this._attrs[name] = value;
  };

  _proto.destroy = function destroy() {
    this._attrs = {};
    this.destroyed = true;
  };

  return Base;
}();

module.exports = Base;