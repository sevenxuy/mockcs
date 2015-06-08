define(function(require, exports, module) {
  'use strict';
  var _view = require('mock.view');

  $.widget('mock.trafad', _view, {
    options: {},
    _createElem: function() {
      var h = [];
      h.push('<div class="mock-hd">广告流量数据分析</div>');
      h.push('<div class="page-content">');
      h.push('<div>待添加</div>');
      h.push('</div>');
      h.push('</div>');
      return h.join('');
    },
    _bindEvents: function() {
      this._on(this.element, {

      });
    }
  });
  module.exports = $.mock.trafad;
});
