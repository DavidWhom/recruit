function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var Util = require('../util/common');

var Helper = require('../util/helper');

var Interaction = require('./base');

var Chart = require('../chart/chart');

var IntervalSelect =
/*#__PURE__*/
function (_Interaction) {
  _inheritsLoose(IntervalSelect, _Interaction);

  var _proto = IntervalSelect.prototype;

  _proto.getDefaultCfg = function getDefaultCfg() {
    var defaultCfg = _Interaction.prototype.getDefaultCfg.call(this);

    defaultCfg = Util.mix({}, defaultCfg, {
      startEvent: 'tap',
      processEvent: null,
      selectAxis: true,
      selectAxisStyle: {
        fontWeight: 'bold'
      },
      mode: 'shape',
      selectStyle: {
        fillOpacity: 1
      },
      unSelectStyle: {
        fillOpacity: 0.4
      },
      cancelable: true,
      defaultSelected: null // set the default selected shape

    });

    if (Util.isWx || Util.isMy) {
      // 小程序
      defaultCfg.startEvent = 'touchstart';
      defaultCfg.endEvent = 'touchend';
    }

    return defaultCfg;
  };

  function IntervalSelect(cfg, chart) {
    var _this;

    _this = _Interaction.call(this, cfg, chart) || this;
    var defaultSelected = _this.defaultSelected;

    if (Util.isObject(defaultSelected)) {
      var _this$_selectShapesBy = _this._selectShapesByData(defaultSelected),
          selectedShape = _this$_selectShapesBy.selectedShape,
          unSelectedShapes = _this$_selectShapesBy.unSelectedShapes;

      selectedShape && _this._selectShapes(selectedShape, unSelectedShapes);
      _this.selectedShape = selectedShape;
    }

    return _this;
  }

  _proto._getIntervalShapes = function _getIntervalShapes() {
    var children = [];
    var chart = this.chart;
    var geoms = chart.get('geoms');
    geoms.forEach(function (geom) {
      if (geom.get('type') === 'interval') {
        // only works for Interval geometry type
        var container = geom.get('container');
        children = children.concat(container.get('children'));
      }
    });
    return children;
  };

  _proto._resetShape = function _resetShape(shape) {
    var originAttrs = shape.get('_originAttrs');

    if (originAttrs) {
      shape._attrs.attrs = originAttrs;
      shape.set('_originAttrs', null);
    }
  };

  _proto._setEventData = function _setEventData(ev) {
    var selectedShape = this.selectedShape;

    if (selectedShape && !selectedShape.get('destroyed')) {
      ev.data = selectedShape.get('origin')._origin;
      ev.shapeInfo = selectedShape.get('origin');
      ev.shape = selectedShape;
      ev.selected = !!selectedShape.get('_selected');
    }
  };

  _proto._selectShapesByData = function _selectShapesByData(data) {
    var children = this._getIntervalShapes();

    var selectedShape = null;
    var unSelectedShapes = [];
    Util.each(children, function (child) {
      if (child.get('isShape') && child.get('className') === 'interval') {
        // get geometry's shape
        var shapeData = child.get('origin')._origin;

        if (Util.isObjectValueEqual(shapeData, data)) {
          selectedShape = child;
        } else {
          unSelectedShapes.push(child);
        }
      }
    });
    return {
      selectedShape: selectedShape,
      unSelectedShapes: unSelectedShapes
    };
  };

  _proto._selectShapes = function _selectShapes(selectedShape, unSelectedShapes) {
    var selectStyle = this.selectStyle,
        unSelectStyle = this.unSelectStyle,
        selectAxisStyle = this.selectAxisStyle,
        chart = this.chart;

    if (!selectedShape.get('_originAttrs')) {
      var originAttrs = Object.assign({}, selectedShape.attr());
      selectedShape.set('_originAttrs', originAttrs);
    }

    selectedShape.attr(selectStyle);
    Util.each(unSelectedShapes, function (child) {
      if (!child.get('_originAttrs')) {
        var _originAttrs = Object.assign({}, child.attr());

        child.set('_originAttrs', _originAttrs);
      } else {
        child.attr(child.get('_originAttrs'));
      }

      child.set('_selected', false);
      unSelectStyle && child.attr(unSelectStyle);
    });
    selectedShape.set('_selected', true);

    if (this.selectAxis) {
      if (this.selectedAxisShape) {
        this._resetShape(this.selectedAxisShape);
      }

      var xScale = chart.getXScale();

      var origin = selectedShape.get('origin')._origin;

      var _chart$get = chart.get('axisController'),
          frontPlot = _chart$get.frontPlot,
          backPlot = _chart$get.backPlot;

      var axisShape;
      Util.each(frontPlot.get('children').concat(backPlot.get('children')), function (s) {
        if (s.get('value') === xScale.scale(origin[xScale.field])) {
          axisShape = s;
          return false;
        }
      });
      this.selectedAxisShape = axisShape;
      axisShape.set('_originAttrs', Object.assign({}, axisShape.attr()));
      axisShape.attr(selectAxisStyle);
    }

    this.canvas.draw();
  };

  _proto.reset = function reset() {
    var self = this;

    if (!self.selectedShape) {
      return;
    }

    var children = self._getIntervalShapes();

    Util.each(children, function (child) {
      self._resetShape(child);

      child.set('_selected', false);
    });

    if (self.selectedAxisShape) {
      self._resetShape(self.selectedAxisShape);
    }

    self.canvas.draw();
    self.selectedShape = null;
    self.selectedAxisShape = null;
  };

  _proto.start = function start(ev) {
    var chart = this.chart;

    if (ev.type === 'tap') {
      ev.clientX = ev.center.x;
      ev.clientY = ev.center.y;
    }

    var _Util$createEvent = Util.createEvent(ev, chart),
        x = _Util$createEvent.x,
        y = _Util$createEvent.y;

    var mode = this.mode;

    var children = this._getIntervalShapes();

    var selectedShape;
    var unSelectedShapes = [];

    if (mode === 'shape') {
      var plot = chart.get('plotRange');

      if (!Helper.isPointInPlot({
        x: x,
        y: y
      }, plot)) {
        this.reset();
        return;
      }

      Util.each(children, function (child) {
        var box = child.getBBox();

        if (x >= box.x && x <= box.x + box.width && y >= box.y && y <= box.height + box.y) {
          // inbox
          selectedShape = child;
        } else {
          unSelectedShapes.push(child);
        }
      });
    } else if (mode === 'range') {
      var records = chart.getSnapRecords({
        x: x,
        y: y
      });

      if (!records.length) {
        this.reset();
        return;
      }

      var data = records[0]._origin;

      var result = this._selectShapesByData(data);

      selectedShape = result.selectedShape;
      unSelectedShapes = result.unSelectedShapes;
    }

    if (selectedShape) {
      this.selectedShape = selectedShape;

      if (selectedShape.get('_selected')) {
        if (!this.cancelable) {
          this._setEventData(ev);

          return;
        }

        this.reset();
      } else {
        this._selectShapes(selectedShape, unSelectedShapes);
      }
    } else {
      this.reset();
    }

    this._setEventData(ev);
  };

  _proto.end = function end(ev) {
    this._setEventData(ev);
  };

  return IntervalSelect;
}(Interaction);

Chart.registerInteraction('interval-select', IntervalSelect);
module.exports = IntervalSelect;