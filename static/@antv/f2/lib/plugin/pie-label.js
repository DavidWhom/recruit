var Util = require('../util/common');

var _require = require('../graphic/'),
    Group = _require.Group;

var DEFAULT_CFG = {
  anchorOffset: 5,
  // 锚点的偏移量
  inflectionOffset: 15,
  // 拐点的偏移量
  sidePadding: 20,
  // 文本距离画布四边的距离
  lineHeight: 32,
  // 文本的行高
  adjustOffset: 15,
  // 发生调整时的偏移量
  skipOverlapLabels: false,
  // 是否不展示重叠的文本
  triggerOn: 'touchstart',
  // 点击行为触发的时间类型
  activeShape: false,
  // 当有图形被选中的时候，是否激活图形
  activeStyle: {
    offset: 1,
    appendRadius: 8,
    fillOpacity: 0.5
  },
  label1OffsetY: -1,
  label2OffsetY: 1
};

function getEndPoint(center, angle, r) {
  return {
    x: center.x + r * Math.cos(angle),
    y: center.y + r * Math.sin(angle)
  };
} // 计算中间角度


function getMiddleAngle(startAngle, endAngle) {
  if (endAngle < startAngle) {
    endAngle += Math.PI * 2;
  }

  return (endAngle + startAngle) / 2;
} // 判断两个矩形是否相交


function isOverlap(label1, label2) {
  var label1BBox = label1.getBBox();
  var label2BBox = label2.getBBox();
  return Math.max(label1BBox.minX, label2BBox.minX) <= Math.min(label1BBox.maxX, label2BBox.minX) && Math.max(label1BBox.minY, label2BBox.minY) <= Math.min(label1BBox.maxY, label2BBox.maxY);
}

var controller =
/*#__PURE__*/
function () {
  function controller(cfg) {
    Util.mix(this, cfg);
    var chart = this.chart;
    this.canvasDom = chart.get('canvas').get('el');
  }

  var _proto = controller.prototype;

  _proto.renderLabels = function renderLabels() {
    var self = this;
    var chart = self.chart,
        pieLabelCfg = self.pieLabelCfg,
        labelGroup = self.labelGroup;
    var halves = [[], // left
    [] // right
    ]; // 存储左右 labels

    var geom = chart.get('geoms')[0];
    var shapes = geom.get('container').get('children');
    var anchorOffset = pieLabelCfg.anchorOffset,
        inflectionOffset = pieLabelCfg.inflectionOffset,
        label1 = pieLabelCfg.label1,
        label2 = pieLabelCfg.label2,
        lineHeight = pieLabelCfg.lineHeight,
        skipOverlapLabels = pieLabelCfg.skipOverlapLabels,
        label1OffsetY = pieLabelCfg.label1OffsetY,
        label2OffsetY = pieLabelCfg.label2OffsetY;
    var coord = chart.get('coord');
    var center = coord.center,
        radius = coord.circleRadius;
    shapes.forEach(function (shape) {
      var _shape$_attrs$attrs = shape._attrs.attrs,
          startAngle = _shape$_attrs$attrs.startAngle,
          endAngle = _shape$_attrs$attrs.endAngle;
      var middleAngle = getMiddleAngle(startAngle, endAngle);
      var anchorPoint = getEndPoint(center, middleAngle, radius + anchorOffset);
      var inflectionPoint = getEndPoint(center, middleAngle, radius + inflectionOffset);
      var origin = shape.get('origin');
      var _origin = origin._origin,
          color = origin.color;
      var label = {
        _anchor: anchorPoint,
        _inflection: inflectionPoint,
        _data: _origin,
        x: inflectionPoint.x,
        y: inflectionPoint.y,
        r: radius + inflectionOffset,
        fill: color
      };
      var textGroup = new Group({
        context: chart.get('canvas').get('context'),
        // 兼容 node、小程序环境
        data: _origin // 存储原始数据

      });
      var textAttrs = {
        x: 0,
        y: 0,
        fontSize: 12,
        lineHeight: 12,
        fill: '#808080'
      };

      if (Util.isFunction(label1)) {
        textGroup.addShape('Text', {
          attrs: Util.mix({
            textBaseline: 'bottom'
          }, textAttrs, label1(_origin, color)),
          data: _origin,
          // 存储原始数据
          offsetY: label1OffsetY
        });
      }

      if (Util.isFunction(label2)) {
        textGroup.addShape('Text', {
          attrs: Util.mix({
            textBaseline: 'top'
          }, textAttrs, label2(_origin, color)),
          data: _origin,
          // 存储原始数据
          offsetY: label2OffsetY
        });
      }

      label.textGroup = textGroup; // 判断文本的方向

      if (anchorPoint.x < center.x) {
        label._side = 'left';
        halves[0].push(label);
      } else {
        label._side = 'right';
        halves[1].push(label);
      }
    });
    var drawnLabels = [];

    if (skipOverlapLabels) {
      var lastLabel; // 存储上一个 label 对象，用于检测文本是否重叠

      var labels = halves[1].concat(halves[0]); // 顺时针

      for (var i = 0, len = labels.length; i < len; i++) {
        var label = labels[i];

        var textGroup = self._drawLabel(label);

        if (lastLabel) {
          if (isOverlap(textGroup, lastLabel)) {
            // 重叠了就不绘制
            continue;
          }
        }

        labelGroup.add(textGroup);

        self._drawLabelLine(label);

        lastLabel = textGroup;
        drawnLabels.push(textGroup);
      }
    } else {
      var height = chart.get('height');
      var maxCountForOneSide = parseInt(height / lineHeight, 10);
      halves.forEach(function (half) {
        if (half.length > maxCountForOneSide) {
          half.splice(maxCountForOneSide, half.length - maxCountForOneSide);
        }

        half.sort(function (a, b) {
          return a.y - b.y;
        });

        var labels = self._antiCollision(half);

        drawnLabels = drawnLabels.concat(labels);
      });
    }

    this.drawnLabels = drawnLabels;
  };

  _proto.bindEvents = function bindEvents() {
    var pieLabelCfg = this.pieLabelCfg;
    var triggerOn = pieLabelCfg.triggerOn || 'touchstart';
    var method = Util.wrapBehavior(this, '_handleEvent');
    Util.addEventListener(this.canvasDom, triggerOn, method);
  };

  _proto.unBindEvents = function unBindEvents() {
    var pieLabelCfg = this.pieLabelCfg;
    var triggerOn = pieLabelCfg.triggerOn || 'touchstart';
    var method = Util.getWrapBehavior(this, '_handleEvent');
    Util.removeEventListener(this.canvasDom, triggerOn, method);
  };

  _proto.clear = function clear() {
    this.labelGroup && this.labelGroup.clear();
    this.halo && this.halo.remove(true);
    this.lastSelectedData = null;
    this.drawnLabels = [];
    this.unBindEvents();
  };

  _proto._drawLabel = function _drawLabel(label) {
    var pieLabelCfg = this.pieLabelCfg,
        chart = this.chart;
    var canvasWidth = chart.get('width');
    var sidePadding = pieLabelCfg.sidePadding;
    var y = label.y,
        textGroup = label.textGroup;
    var children = textGroup.get('children');
    var textAttrs = {
      textAlign: label._side === 'left' ? 'left' : 'right',
      x: label._side === 'left' ? sidePadding : canvasWidth - sidePadding
    };
    children.forEach(function (child) {
      child.attr(textAttrs);
      child.attr('y', y + child.get('offsetY'));
    });
    return textGroup;
  };

  _proto._drawLabelLine = function _drawLabelLine(label, maxLabelWidth) {
    var chart = this.chart,
        pieLabelCfg = this.pieLabelCfg,
        labelGroup = this.labelGroup;
    var canvasWidth = chart.get('width');
    var sidePadding = pieLabelCfg.sidePadding,
        adjustOffset = pieLabelCfg.adjustOffset,
        lineStyle = pieLabelCfg.lineStyle,
        anchorStyle = pieLabelCfg.anchorStyle,
        skipOverlapLabels = pieLabelCfg.skipOverlapLabels;
    var _anchor = label._anchor,
        _inflection = label._inflection,
        fill = label.fill,
        y = label.y;
    var lastPoint = {
      x: label._side === 'left' ? sidePadding : canvasWidth - sidePadding,
      y: y
    };
    var points = [_anchor, _inflection, lastPoint];

    if (!skipOverlapLabels && _inflection.y !== y) {
      // 展示全部文本文本位置做过调整
      if (_inflection.y < y) {
        // 文本被调整下去了，则添加拐点连接线
        var point1 = _inflection;
        var point2 = {
          x: label._side === 'left' ? lastPoint.x + maxLabelWidth + adjustOffset : lastPoint.x - maxLabelWidth - adjustOffset,
          y: _inflection.y
        };
        var point3 = {
          x: label._side === 'left' ? lastPoint.x + maxLabelWidth : lastPoint.x - maxLabelWidth,
          y: lastPoint.y
        };
        points = [_anchor, point1, point2, point3, lastPoint];

        if (label._side === 'right' && point2.x < point1.x || label._side === 'left' && point2.x > point1.x) {
          points = [_anchor, point3, lastPoint];
        }
      } else {
        points = [_anchor, {
          x: _inflection.x,
          y: y
        }, lastPoint];
      }
    }

    labelGroup.addShape('Polyline', {
      attrs: Util.mix({
        points: points,
        lineWidth: 1,
        stroke: fill
      }, lineStyle)
    }); // 绘制锚点

    labelGroup.addShape('Circle', {
      attrs: Util.mix({
        x: _anchor.x,
        y: _anchor.y,
        r: 2,
        fill: fill
      }, anchorStyle)
    });
  };

  _proto._antiCollision = function _antiCollision(half) {
    var self = this;
    var chart = self.chart,
        pieLabelCfg = self.pieLabelCfg;
    var coord = chart.get('coord');
    var canvasHeight = chart.get('height');
    var center = coord.center,
        r = coord.circleRadius;
    var inflectionOffset = pieLabelCfg.inflectionOffset,
        lineHeight = pieLabelCfg.lineHeight;
    var startY = center.y - r - inflectionOffset - lineHeight;
    var overlapping = true;
    var totalH = canvasHeight;
    var i;
    var maxY = 0;
    var minY = Number.MIN_VALUE;
    var maxLabelWidth = 0;
    var boxes = half.map(function (label) {
      var labelY = label.y;

      if (labelY > maxY) {
        maxY = labelY;
      }

      if (labelY < minY) {
        minY = labelY;
      }

      var textGroup = label.textGroup;
      var labelWidth = textGroup.getBBox().width;

      if (labelWidth >= maxLabelWidth) {
        maxLabelWidth = labelWidth;
      }

      return {
        size: lineHeight,
        targets: [labelY - startY]
      };
    });

    if (maxY - startY > totalH) {
      totalH = maxY - startY;
    }

    var iteratorBoxed = function iteratorBoxed(boxes) {
      boxes.forEach(function (box) {
        var target = (Math.min.apply(minY, box.targets) + Math.max.apply(minY, box.targets)) / 2;
        box.pos = Math.min(Math.max(minY, target - box.size / 2), totalH - box.size);
      });
    };

    while (overlapping) {
      iteratorBoxed(boxes); // detect overlapping and join boxes

      overlapping = false;
      i = boxes.length;

      while (i--) {
        if (i > 0) {
          var previousBox = boxes[i - 1];
          var box = boxes[i];

          if (previousBox.pos + previousBox.size > box.pos) {
            // overlapping
            previousBox.size += box.size;
            previousBox.targets = previousBox.targets.concat(box.targets); // overflow, shift up

            if (previousBox.pos + previousBox.size > totalH) {
              previousBox.pos = totalH - previousBox.size;
            }

            boxes.splice(i, 1); // removing box

            overlapping = true;
          }
        }
      }
    }

    i = 0;
    boxes.forEach(function (b) {
      var posInCompositeBox = startY; // middle of the label

      b.targets.forEach(function () {
        half[i].y = b.pos + posInCompositeBox + lineHeight / 2;
        posInCompositeBox += lineHeight;
        i++;
      });
    });
    var drawnLabels = [];
    half.forEach(function (label) {
      var textGroup = self._drawLabel(label);

      var labelGroup = self.labelGroup;
      labelGroup.add(textGroup);

      self._drawLabelLine(label, maxLabelWidth);

      drawnLabels.push(textGroup);
    });
    return drawnLabels;
  };

  _proto._handleEvent = function _handleEvent(ev) {
    var self = this;
    var chart = self.chart,
        drawnLabels = self.drawnLabels,
        pieLabelCfg = self.pieLabelCfg;
    var onClick = pieLabelCfg.onClick,
        activeShape = pieLabelCfg.activeShape;
    var canvasEvent = Util.createEvent(ev, chart);
    var x = canvasEvent.x,
        y = canvasEvent.y; // 查找被点击的 label

    var clickedShape;

    for (var i = 0, len = drawnLabels.length; i < len; i++) {
      var shape = drawnLabels[i];
      var bbox = shape.getBBox(); // 通过最小包围盒来判断击中情况

      if (x >= bbox.minX && x <= bbox.maxX && y >= bbox.minY && y <= bbox.maxY) {
        clickedShape = shape;
        break;
      }
    }

    var pieData = chart.getSnapRecords({
      x: x,
      y: y
    });

    if (clickedShape) {
      canvasEvent.data = clickedShape.get('data');
    } else if (pieData.length) {
      // 击中饼图扇形区域
      canvasEvent.data = pieData[0]._origin;
    }

    onClick && onClick(canvasEvent);
    canvasEvent.data && activeShape && this._activeShape(canvasEvent.data);
  };

  _proto._getSelectedShapeByData = function _getSelectedShapeByData(data) {
    var selectedShape = null;
    var chart = this.chart;
    var geom = chart.get('geoms')[0];
    var container = geom.get('container');
    var children = container.get('children');
    Util.each(children, function (child) {
      if (child.get('isShape') && child.get('className') === geom.get('type')) {
        // get geometry's shape
        var shapeData = child.get('origin')._origin;

        if (Util.isObjectValueEqual(shapeData, data)) {
          selectedShape = child;
          return false;
        }
      }
    });
    return selectedShape;
  };

  _proto._activeShape = function _activeShape(data) {
    var chart = this.chart,
        lastSelectedData = this.lastSelectedData,
        pieLabelCfg = this.pieLabelCfg;

    if (data === lastSelectedData) {
      return;
    }

    this.lastSelectedData = data;
    var activeStyle = pieLabelCfg.activeStyle;

    var selectedShape = this._getSelectedShapeByData(data);

    var _selectedShape$_attrs = selectedShape._attrs.attrs,
        x = _selectedShape$_attrs.x,
        y = _selectedShape$_attrs.y,
        startAngle = _selectedShape$_attrs.startAngle,
        endAngle = _selectedShape$_attrs.endAngle,
        r = _selectedShape$_attrs.r,
        fill = _selectedShape$_attrs.fill;
    var frontPlot = chart.get('frontPlot');
    this.halo && this.halo.remove(true);
    var halo = frontPlot.addShape('sector', {
      attrs: Util.mix({
        x: x,
        y: y,
        r: r + activeStyle.offset + activeStyle.appendRadius,
        r0: r + activeStyle.offset,
        fill: fill,
        startAngle: startAngle,
        endAngle: endAngle
      }, activeStyle)
    });
    this.halo = halo;
    chart.get('canvas').draw();
  };

  return controller;
}();

module.exports = {
  init: function init(chart) {
    var frontPlot = chart.get('frontPlot');
    var labelGroup = frontPlot.addGroup({
      className: 'pie-label',
      zIndex: 0
    });
    var pieLabelController = new controller({
      chart: chart,
      labelGroup: labelGroup
    });
    chart.set('pieLabelController', pieLabelController);

    chart.pieLabel = function (cfg) {
      cfg = Util.deepMix({}, DEFAULT_CFG, cfg);
      pieLabelController.pieLabelCfg = cfg;
      return this;
    };
  },
  afterGeomDraw: function afterGeomDraw(chart) {
    var controller = chart.get('pieLabelController');

    if (controller.pieLabelCfg) {
      // 用户配置了饼图文本
      controller.renderLabels();
      controller.bindEvents(); // 绑定事件
    }
  },
  clearInner: function clearInner(chart) {
    var controller = chart.get('pieLabelController');

    if (controller.pieLabelCfg) {
      // 用户配置了饼图文本
      controller.clear();
    }
  }
};