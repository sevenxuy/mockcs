define(function(require, exports, module) {
  'use strict';
  var _view = require('mock.view');

  $.widget('mock.rawfail', _view, {
    options: {},
    _createElem: function() {
      var h = [];
      h.push('<div class="mock-hd">原始内容管理</div>');
      h.push('<div class="page-content">');
      h.push('<ul class="tabs-nav">');
      h.push('<li class="tab-nav-item"><a href="#raw/online">已上线</a></li>');
      h.push('<li class="tab-nav-item"><a href="#raw/pending">待审核</a></li>');
      h.push('<li class="tab-nav-item tab-nav-item-selected"><a href="#raw/fail">未通过审核</a></li>');
      h.push('<li class="tab-nav-item"><a href="#raw/del">已删除</a></li>');
      h.push('</ul>');
      h.push('<div class="tabs-content">');
      h.push('<div class="mock-search-box"><input type="search" placeholder="按关键词搜索" class="form-control mock-search"><div class="mock-search-icon"></div></div>');
      h.push('<table class="table table-bordered table-hover">');
      h.push('<thead><tr><th>内容标题</th><th>审核状态</th><th>错误信息</th><th>日期</th><th>操作</th></tr></thead>');
      h.push('<tbody>');
      h.push('<tr><td>This is a test</td><td>拒绝</td><td>敏感词</td><td>2015-06-06 18:00</td><td><div class="mock-btn mock-btn-red  mock-btn-s">修改</div></td></tr>');
      h.push('<tr><td>This is a test</td><td>拒绝</td><td>敏感词</td><td>2015-06-06 18:00</td><td><div class="mock-btn mock-btn-red  mock-btn-s">修改</div></td></tr>');
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
  module.exports = $.mock.rawfail;
});
