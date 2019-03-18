/**
 * Animate configuration and register
 * @author sima.zhang1990@gmail.com
 */
var Util = require('../util/common');

var defaultAnimationCfg = {
  appear: {
    duration: 450,
    easing: 'quadraticOut'
  },
  // 'appear' animation options
  update: {
    duration: 300,
    easing: 'quadraticOut'
  },
  // 'update' animation options
  enter: {
    duration: 300,
    easing: 'quadraticOut'
  },
  // 'enter' animation options
  leave: {
    duration: 350,
    easing: 'quadraticIn' // 'leave' animation options

  }
};
var Animate = {
  defaultCfg: {},
  Action: {},
  getAnimation: function getAnimation(geomType, coord, animationType) {
    var geomAnimateCfg = this.defaultCfg[geomType];

    if (geomAnimateCfg) {
      var animation = geomAnimateCfg[animationType];

      if (Util.isFunction(animation)) {
        return animation(coord);
      }
    }

    return false;
  },
  getAnimateCfg: function getAnimateCfg(geomType, animationType) {
    var defaultCfg = defaultAnimationCfg[animationType];
    var geomConfig = this.defaultCfg[geomType];

    if (geomConfig && geomConfig.cfg && geomConfig.cfg[animationType]) {
      return Util.deepMix({}, defaultCfg, geomConfig.cfg[animationType]);
    }

    return defaultCfg;
  },
  registerAnimation: function registerAnimation(animationName, animationFun) {
    if (!this.Action) {
      this.Action = {};
    }

    this.Action[animationName] = animationFun;
  }
};
module.exports = Animate;