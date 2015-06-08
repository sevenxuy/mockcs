define(function(require, exports, module) {
  'use strict';
  var _view = require('mock.view');

  $.widget('mock.adoppending', _view, {
    options: {},
    _createElem: function() {
      var h = [];
      h.push('<div class="mock-hd">广告位状态管理</div>');
      h.push('<div class="page-content">');
      h.push('<ul class="tabs-nav">');
      h.push('<li class="tab-nav-item"><a href="#adop/online">已上线</a></li>');
      h.push('<li class="tab-nav-item tab-nav-item-selected"><a href="#adop/pending">待审核</a></li>');
      h.push('<li class="tab-nav-item"><a href="#adop/fail">未通过审核</a></li>');
      h.push('</ul>');
      h.push('<div class="tabs-content">');
      h.push('<div class="mock-search-box"><input type="search" placeholder="按关键词搜索" class="form-control mock-search"><div class="mock-search-icon"></div></div>');
      h.push('<table class="table table-bordered table-hover">');
      h.push('<thead><tr><th><select class="form-control">');
      h.push('<option  selected="selected" disabled="disabled">广告位置</option>');
      h.push('<option value="">个人主页</option>');
      h.push('<option value="">详情页</option>');
      h.push('</select></th></th><th>原始内容标题</th><th>上线时间</th><th>广告图片</th><th>广告链接</th><th>错误类型</th></tr></thead>');
      h.push('<tbody>');
      h.push('<tr><td>个人主页</td><td>标题</td><td>2015-06-06 18:00</td><td>img</td><td>url</td><td>error</td></tr>');
      h.push('<tr><td>个人主页</td><td>标题</td><td>2015-06-06 18:00</td><td>img</td><td>url</td><td>error</td></tr>');
      h.push('<tr><td>个人主页</td><td>标题</td><td>2015-06-06 18:00</td><td>img</td><td>url</td><td>error</td></tr>');
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
  module.exports = $.mock.adoppending;
});
