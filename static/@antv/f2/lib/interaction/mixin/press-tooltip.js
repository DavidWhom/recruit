var Util = require('../../util/common');

module.exports = {
  _bindPress: function _bindPress() {
    var chart = this.chart,
        hammer = this.hammer,
        el = this.el,
        pressThreshold = this.pressThreshold,
        pressTime = this.pressTime;
    var tooltipController = chart.get('tooltipController');

    if (tooltipController && tooltipController.enable) {
      chart.set('_closeTooltip', true); // 用于交互的特殊标示量

      if (hammer) {
        hammer.get('press').set({
          threshold: pressThreshold,
          time: pressTime
        });
        hammer.on('press', Util.wrapBehavior(this, '_handlePress'));
      } else {
        Util.addEventListener(el, 'press', Util.wrapBehavior(this, '_handlePress'));
      }
    }
  },
  reset: function reset() {
    var chart = this.chart;
    var tooltipController = chart.get('tooltipController');

    if (tooltipController) {
      this.pressed = false;
      !tooltipController.cfg.alwaysShow && chart.hideTooltip();
      chart.set('_closeTooltip', true); // 用于交互的特殊标示量
    }
  },
  _handlePress: function _handlePress(e) {
    this.pressed = true;
    var center = e.center || e.touches[0];
    this.chart.set('_closeTooltip', false); // 用于交互的特殊标示量

    this.chart.showTooltip(center);
  }
};