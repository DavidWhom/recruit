/**
 * Group animation
 * @author sima.zhang1990@gmail.com
 */
var Util = require('../util/common');

var Shape = require('../graphic/shape');

var Timeline = require('../graphic/animate/timeline');

var Animator = require('../graphic/animate/animator');

var timeline;

Shape.prototype.animate = function () {
  var attrs = Util.mix({}, this.get('attrs'));
  return new Animator(this, attrs, timeline);
};

var Animate = require('./animate');

var Action = require('./group-action');

Animate.Action = Action;
Animate.defaultCfg = {
  line: function line(coord) {
    if (coord.isPolar) {
      return Action.groupScaleInXY;
    }

    return Action.groupWaveIn;
  },
  area: function area(coord) {
    if (coord.isPolar) {
      return Action.groupScaleInXY;
    }

    return Action.groupWaveIn;
  },
  path: function path(coord) {
    if (coord.isPolar) {
      return Action.groupScaleInXY;
    }

    return Action.groupWaveIn;
  },
  point: function point() {
    return Action.shapesScaleInXY;
  },
  interval: function interval(coord) {
    var result;

    if (coord.isPolar) {
      result = Action.groupScaleInXY;

      if (coord.transposed) {
        result = Action.groupWaveIn;
      }
    } else {
      result = coord.transposed ? Action.groupScaleInX : Action.groupScaleInY;
    }

    return result;
  },
  schema: function schema() {
    return Action.groupWaveIn;
  }
};

function getAnimate(geomType, coord, animationName) {
  var result;

  if (animationName) {
    result = Animate.Action[animationName];
  } else {
    result = Animate.getAnimation(geomType, coord, 'appear');
  }

  return result;
}

function getAnimateCfg(geomType, animateCfg) {
  var defaultCfg = Animate.getAnimateCfg(geomType, 'appear');

  if (animateCfg && animateCfg.appear) {
    return Util.deepMix({}, defaultCfg, animateCfg.appear);
  }

  return defaultCfg;
}

module.exports = {
  afterCanvasInit: function afterCanvasInit()
  /* chart */
  {
    timeline = new Timeline();
    timeline.play();
  },
  beforeCanvasDraw: function beforeCanvasDraw(chart) {
    if (chart.get('animate') === false) {
      return;
    }

    var geoms = chart.get('geoms');
    var coord = chart.get('coord');
    var animateCfg;
    var animate;
    Util.each(geoms, function (geom) {
      var type = geom.get('type');
      var container = geom.get('container');

      if (geom.get('animateCfg') !== false) {
        animateCfg = getAnimateCfg(type, geom.get('animateCfg'));
        animate = getAnimate(type, coord, animateCfg.animation);

        if (Util.isFunction(animate)) {
          animate(container, animateCfg);
        } else if (Animate.defaultCfg[type]) {
          animate = Animate.defaultCfg[type](coord);
          var yScale = geom.getYScale();
          var zeroY = coord.convertPoint({
            x: 0,
            y: yScale.scale(geom.getYMinValue())
          });
          animate && animate(container, animateCfg, coord, zeroY);
        }
      }
    });
  },
  afterCanvasDestroyed: function afterCanvasDestroyed()
  /* chart */
  {
    timeline.stop();
  }
};