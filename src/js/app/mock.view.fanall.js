define(function(require, exports, module) {
  'use strict';
  var _view = require('mock.view');

  $.widget('mock.fanall', _view, {
    options: {},
    _createElem: function() {
      var h = [];
      h.push('<div class="mock-hd">粉丝管理</div>');
      h.push('<div class="page-content">');
      h.push('<ul class="tabs-nav">');
      h.push('<li class="tab-nav-item"><a href="#fans/latest">新增粉丝</a></li>');
      h.push('<li class="tab-nav-item tab-nav-item-selected"><a href="#fans/all">全部粉丝</a></li>');
      h.push('</ul>');
      h.push('<div class="tabs-content">');
      h.push('<div class="mock-search-box"><input type="search" placeholder="按关键词搜索" class="form-control mock-search"><div class="mock-search-icon"></div></div>');
      h.push('<table class="table table-bordered table-hover">');
      h.push('<thead><tr><th>粉丝昵称</th><th>粉丝头像</th><th>关注时间</th></tr></thead>');
      h.push('<tbody>');
      h.push('<tr><td>哆啦A梦</td><td>img</td><td>2015-06-06 18:00</td></tr>');
      h.push('<tr><td>哆啦A梦</td><td>img</td><td>2015-06-06 18:00</td></tr>');
      h.push('</tbody>');
      h.push('</table>');
      h.push('<div>待添加分页</div>');
      h.push('</div>');
      h.push('</div>');
      return h.join('');
    },
    _bindEvents: function() {
      this._on(this.element, {

      });
    }
  });
  module.exports = $.mock.fanall;
});
