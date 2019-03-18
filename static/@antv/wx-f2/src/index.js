const Renderer = require('./renderer');
const F2 = require('@antv/f2/lib/index-all');


function strLen(str) {
  let len = 0;
  for (let i = 0; i < str.length; i++) {
    if (str.charCodeAt(i) > 0 && str.charCodeAt(i) < 128) {
      len++;
    } else {
      len += 2;
    }
  }

  return len;
}

// override some methods
F2.Util.measureText = function(text, font, ctx) {
  if (!ctx) {
    let fontSize = 12;
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
};

// 适配小程序的事件机制
F2.Util.addEventListener = function (source, type, listener) {
  source.addListener(type, listener);
};

F2.Util.removeEventListener = function (source, type, listener) {
  source.removeListener(type, listener);
};

F2.Util.createEvent = function (event, chart) {
  let x = 0;
  let y = 0;
  const touches = event.touches;
  if (touches && touches.length > 0) {
    x = touches[0].x;
    y = touches[0].y;
  }

  return {
    type: event.type,
    chart,
    x,
    y
  };
};

F2.Renderer = Renderer;

module.exports = F2;
