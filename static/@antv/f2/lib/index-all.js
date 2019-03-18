/**
 * all
 */
var F2 = require('./core');

require('./geom/');

require('./geom/adjust/');

require('./coord/polar'); // polar coordinate


require('./component/axis/circle'); // the axis for polar coordinate


require('./scale/time-cat'); // timeCat scale


require('./component/guide'); // guide components


var Tooltip = require('./plugin/tooltip');

var Guide = require('./plugin/guide');

var Legend = require('./plugin/legend');

var Animation = require('./animation/detail');

var ScrollBar = require('./plugin/scroll-bar');

var PieLabel = require('./plugin/pie-label');

F2.Animate = require('./animation/animate'); // register plugins

F2.Chart.plugins.register([Tooltip, Legend, Guide, Animation, ScrollBar, PieLabel]); // add interaction

require('./interaction');

F2.Interaction = require('./interaction/base');
module.exports = F2;