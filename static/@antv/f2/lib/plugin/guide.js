var Util = require('../util/common');

var Guide = require('../component/guide/base');

var Global = require('../global'); // register the default configuration for Guide


Global.guide = Util.deepMix({
  line: {
    style: {
      stroke: '#a3a3a3',
      lineWidth: 1
    },
    top: true
  },
  text: {
    style: {
      fill: '#787878',
      textAlign: 'center',
      textBaseline: 'middle'
    },
    offsetX: 0,
    offsetY: 0,
    top: true
  },
  rect: {
    style: {
      fill: '#fafafa'
    },
    top: false
  },
  arc: {
    style: {
      stroke: '#a3a3a3'
    },
    top: true
  },
  html: {
    offsetX: 0,
    offsetY: 0,
    alignX: 'center',
    alignY: 'middle'
  },
  tag: {
    top: true,
    offsetX: 0,
    offsetY: 0,
    side: 4,
    background: {
      padding: 5,
      radius: 2,
      fill: '#1890FF'
    },
    textStyle: {
      fontSize: 12,
      fill: '#fff',
      textAlign: 'center',
      textBaseline: 'middle'
    }
  },
  point: {
    top: true,
    offsetX: 0,
    offsetY: 0,
    style: {
      fill: '#fff',
      r: 3,
      lineWidth: 2,
      stroke: '#1890ff'
    }
  }
}, Global.guide || {});

var GuideController =
/*#__PURE__*/
function () {
  function GuideController(cfg) {
    this.guides = [];
    this.xScale = null;
    this.yScales = null;
    this.guideShapes = [];
    Util.mix(this, cfg);
  }

  var _proto = GuideController.prototype;

  _proto._toString = function _toString(position) {
    if (Util.isFunction(position)) {
      position = position(this.xScale, this.yScales);
    }

    position = position.toString();
    return position;
  };

  _proto._getId = function _getId(shape, guide) {
    var id = guide.id;

    if (!id) {
      var type = guide.type;

      if (type === 'arc' || type === 'line' || type === 'rect') {
        id = this._toString(guide.start) + '-' + this._toString(guide.end);
      } else {
        id = this._toString(guide.position);
      }
    }

    return id;
  };

  _proto.paint = function paint(coord) {
    var self = this;
    var chart = self.chart,
        guides = self.guides,
        xScale = self.xScale,
        yScales = self.yScales;
    var guideShapes = [];
    Util.each(guides, function (guide, idx) {
      guide.xScale = xScale;
      guide.yScales = yScales;
      var container;

      if (guide.type === 'regionFilter') {
        // TODO: RegionFilter support animation
        guide.chart = chart;
      } else {
        container = guide.top ? self.frontPlot : self.backPlot;
      }

      guide.coord = coord;
      guide.container = container;
      guide.canvas = chart.get('canvas');
      var shape = guide.render(coord, container);

      if (shape) {
        var id = self._getId(shape, guide);

        [].concat(shape).forEach(function (s) {
          s._id = s.get('className') + '-' + id;
          s.set('index', idx);
          guideShapes.push(s);
        });
      }
    });
    self.guideShapes = guideShapes;
  };

  _proto.clear = function clear() {
    this.reset();
    this.guides = [];
    return this;
  };

  _proto.reset = function reset() {
    var guides = this.guides;
    Util.each(guides, function (guide) {
      guide.remove();
    });
  };

  _proto._createGuide = function _createGuide(type, cfg) {
    var ClassName = Util.upperFirst(type);
    var guide = new Guide[ClassName](Util.deepMix({}, Global.guide[type], cfg));
    this.guides.push(guide);
    return guide;
  };

  _proto.line = function line(cfg) {
    if (cfg === void 0) {
      cfg = {};
    }

    return this._createGuide('line', cfg);
  };

  _proto.text = function text(cfg) {
    if (cfg === void 0) {
      cfg = {};
    }

    return this._createGuide('text', cfg);
  };

  _proto.arc = function arc(cfg) {
    if (cfg === void 0) {
      cfg = {};
    }

    return this._createGuide('arc', cfg);
  };

  _proto.html = function html(cfg) {
    if (cfg === void 0) {
      cfg = {};
    }

    return this._createGuide('html', cfg);
  };

  _proto.rect = function rect(cfg) {
    if (cfg === void 0) {
      cfg = {};
    }

    return this._createGuide('rect', cfg);
  };

  _proto.tag = function tag(cfg) {
    if (cfg === void 0) {
      cfg = {};
    }

    return this._createGuide('tag', cfg);
  };

  _proto.point = function point(cfg) {
    if (cfg === void 0) {
      cfg = {};
    }

    return this._createGuide('point', cfg);
  };

  _proto.regionFilter = function regionFilter(cfg) {
    if (cfg === void 0) {
      cfg = {};
    }

    return this._createGuide('regionFilter', cfg);
  };

  return GuideController;
}();

module.exports = {
  init: function init(chart) {
    var guideController = new GuideController({
      frontPlot: chart.get('frontPlot').addGroup({
        zIndex: 20,
        className: 'guideContainer'
      }),
      backPlot: chart.get('backPlot').addGroup({
        className: 'guideContainer'
      })
    });
    chart.set('guideController', guideController);
    /**
     * 为图表添加 guide
     * @return {GuideController} 返回 guide 控制器
     */

    chart.guide = function () {
      return guideController;
    };
  },
  afterGeomDraw: function afterGeomDraw(chart) {
    var guideController = chart.get('guideController');

    if (!guideController.guides.length) {
      return;
    }

    var xScale = chart.getXScale();
    var yScales = chart.getYScales();
    var coord = chart.get('coord');
    guideController.xScale = xScale;
    guideController.yScales = yScales;
    guideController.chart = chart; // for regionFilter

    guideController.paint(coord);
  },
  clear: function clear(chart) {
    chart.get('guideController').clear();
  },
  repaint: function repaint(chart) {
    chart.get('guideController').reset();
  }
};