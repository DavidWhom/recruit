/**
 * @fileOverview track f2
 * @author sima.zhang1990@gmail.com
 */
var Global = require('./global');

var Util = require('./util/common');

var SERVER_URL = 'https://kcart.alipay.com/web/bi.do';
setTimeout(function () {
  if (Global.trackable && Util.isBrowser) {
    // Only works for H5 env
    var image = new Image();
    var newObj = {
      pg: document.URL,
      r: new Date().getTime(),
      f2: true,
      version: Global.version,
      page_type: 'syslog'
    };
    var d = encodeURIComponent(JSON.stringify([newObj]));
    image.src = SERVER_URL + "?BIProfile=merge&d=" + d;
  }
}, 3000);