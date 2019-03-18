var Renderer = require('./renderer');

var F2 = require('@antv/f2/lib/index-all');

function strLen(str) {
  var len = 0;

  for (var i = 0; i < str.length; i++) {
    if (str.charCodeAt(i) > 0 && str.charCodeAt(i) < 128) {
      len++;
    } else {
      len += 2;
    }
  }

  return len;
} // override some methods


F2.Util.measureText = function (text, font, ctx) {
  if (!ctx) {
    var fontSize = 12;

    if (font) {
      fontSize = parseInt(font.split(' ')[3], 10);
    }

    fontSize /= 2;
    return {
      width: strLen(text) * fontSize
    };
  }

  ctx.font = font || '12px sans-serif';
  return ctx.measureText(text);
}; // 适配小程序的事件机制


F2.Util.addEventListener = function (source, type, listener) {
  source.addListener(type, listener);
};

F2.Util.removeEventListener = function (source, type, listener) {
  source.removeListener(type, listener);
};

F2.Util.createEvent = function (event, chart) {
  var x = 0;
  var y = 0;
  var touches = event.touches;

  if (touches && touches.length > 0) {
    x = touches[0].x;
    y = touches[0].y;
  }

  return {
    type: event.type,
    chart: chart,
    x: x,
    y: y
  };
};

F2.Renderer = Renderer;
module.exports = F2;