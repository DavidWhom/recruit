/**
 * @fileOverview Utility for F2
 * @author dxq613 @gmail.com
 * @author sima.zhang1990@gmail.com
 */
var DomUtil = require('./dom');

var Util = {
  upperFirst: require('@antv/util/lib/string/upper-first'),
  lowerFirst: require('@antv/util/lib/string/lower-first'),
  isString: require('@antv/util/lib/type/is-string'),
  isNumber: require('@antv/util/lib/type/is-number'),
  isBoolean: require('@antv/util/lib/type/is-boolean'),
  isFunction: require('@antv/util/lib/type/is-function'),
  isDate: require('@antv/util/lib/type/is-date'),
  isArray: require('@antv/util/lib/type/is-array'),
  isNil: require('@antv/util/lib/type/is-nil'),
  isObject: require('@antv/util/lib/type/is-object'),
  isPlainObject: require('@antv/util/lib/type/is-plain-object'),
  deepMix: require('@antv/util/lib/deep-mix'),
  mix: require('@antv/util/lib/mix'),
  each: require('@antv/util/lib/each'),
  isObjectValueEqual: function isObjectValueEqual(a, b) {
    // for vue.js
    a = Object.assign({}, a);
    b = Object.assign({}, b);
    var aProps = Object.getOwnPropertyNames(a);
    var bProps = Object.getOwnPropertyNames(b);

    if (aProps.length !== bProps.length) {
      return false;
    }

    for (var i = 0, len = aProps.length; i < len; i++) {
      var propName = aProps[i];

      if (a[propName] !== b[propName]) {
        return false;
      }
    }

    return true;
  },
  wrapBehavior: function wrapBehavior(obj, action) {
    if (obj['_wrap_' + action]) {
      return obj['_wrap_' + action];
    }

    var method = function method(e) {
      obj[action](e);
    };

    obj['_wrap_' + action] = method;
    return method;
  },
  getWrapBehavior: function getWrapBehavior(obj, action) {
    return obj['_wrap_' + action];
  },
  parsePadding: function parsePadding(padding) {
    var top;
    var right;
    var bottom;
    var left;

    if (Util.isNumber(padding) || Util.isString(padding)) {
      top = bottom = left = right = padding;
    } else if (Util.isArray(padding)) {
      top = padding[0];
      right = !Util.isNil(padding[1]) ? padding[1] : padding[0];
      bottom = !Util.isNil(padding[2]) ? padding[2] : padding[0];
      left = !Util.isNil(padding[3]) ? padding[3] : right;
    }

    return [top, right, bottom, left];
  },
  directionEnabled: function directionEnabled(mode, dir) {
    if (mode === undefined) {
      return true;
    } else if (typeof mode === 'string') {
      return mode.indexOf(dir) !== -1;
    }

    return false;
  }
};
Util.Array = {
  merge: function merge(dataArray) {
    var rst = [];

    for (var i = 0, len = dataArray.length; i < len; i++) {
      rst = rst.concat(dataArray[i]);
    }

    return rst;
  },
  values: function values(data, name) {
    var rst = [];
    var tmpMap = {};

    for (var i = 0, len = data.length; i < len; i++) {
      var obj = data[i];
      var value = obj[name];

      if (!Util.isNil(value)) {
        if (!Util.isArray(value)) {
          if (!tmpMap[value]) {
            rst.push(value);
            tmpMap[value] = true;
          }
        } else {
          Util.each(value, function (val) {
            if (!tmpMap[val]) {
              rst.push(val);
              tmpMap[val] = true;
            }
          });
        }
      }
    }

    return rst;
  },
  firstValue: function firstValue(data, name) {
    var rst = null;

    for (var i = 0, len = data.length; i < len; i++) {
      var obj = data[i];
      var value = obj[name];

      if (!Util.isNil(value)) {
        if (Util.isArray(value)) {
          rst = value[0];
        } else {
          rst = value;
        }

        break;
      }
    }

    return rst;
  },
  group: function group(data, fields, appendConditions) {
    if (appendConditions === void 0) {
      appendConditions = {};
    }

    if (!fields) {
      return [data];
    }

    var groups = Util.Array.groupToMap(data, fields);
    var array = [];

    if (fields.length === 1 && appendConditions[fields[0]]) {
      var values = appendConditions[fields[0]];
      Util.each(values, function (value) {
        value = '_' + value;
        array.push(groups[value]);
      });
    } else {
      for (var i in groups) {
        array.push(groups[i]);
      }
    }

    return array;
  },
  groupToMap: function groupToMap(data, fields) {
    if (!fields) {
      return {
        0: data
      };
    }

    var callback = function callback(row) {
      var unique = '_';

      for (var i = 0, l = fields.length; i < l; i++) {
        unique += row[fields[i]] && row[fields[i]].toString();
      }

      return unique;
    };

    var groups = {};

    for (var i = 0, len = data.length; i < len; i++) {
      var row = data[i];
      var key = callback(row);

      if (groups[key]) {
        groups[key].push(row);
      } else {
        groups[key] = [row];
      }
    }

    return groups;
  },
  remove: function remove(arr, obj) {
    if (!arr) {
      return;
    }

    var index = arr.indexOf(obj);

    if (index !== -1) {
      arr.splice(index, 1);
    }
  },
  getRange: function getRange(values) {
    if (!values.length) {
      return {
        min: 0,
        max: 0
      };
    }

    var max = Math.max.apply(null, values);
    var min = Math.min.apply(null, values);
    return {
      min: min,
      max: max
    };
  }
};
Util.mix(Util, DomUtil);
module.exports = Util;