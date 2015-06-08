define(function(require, exports, module) {
  'use strict';
  var _view = require('mock.view');

  $.widget('mock.msgall', _view, {
    options: {},
    _createElem: function() {
      var h = [];
      h.push('<div class="mock-hd">消息管理</div>');
      h.push('<div class="page-content">');
      h.push('<ul class="tabs-nav">');
      h.push('<li class="tab-nav-item"><a href="#msgs/latest">最新消息</a></li>');
      h.push('<li class="tab-nav-item tab-nav-item-selected"><a href="#msgs/all">全部消息</a></li>');
      h.push('</ul>');
      h.push('<div class="tabs-content">');
      h.push('<div class="mock-search-box"><input type="search" placeholder="按关键词搜索" class="form-control mock-search"><div class="mock-search-icon"></div></div>');
      h.push('<table class="table table-bordered table-hover">');
      h.push('<thead><tr><th><select class="form-control">');
      h.push('<option  selected="selected" disabled="disabled">消息类型</option>');
      h.push('<option value="">个人主页内容审核</option>');
      h.push('<option value="">原创内容审核</option>');
      h.push('</select></th><th>审核内容</th><th>审核结果</th><th>错误类型</th><th>消息时间</th></tr></thead>');
      h.push('<tbody><tr><td>个人主页审核</td><td>个人主页</td><td>通过</td><td class="error">-</td><td>消息时间</td></tr>');
      h.push('<tr><td>个人主页审核</td><td>个人主页</td><td>通过</td><td class="error">个人简介内容不合符要求</td><td>消息时间</td></tr>');
      h.push('<tr><td>个人主页审核</td><td>个人主页</td><td>通过</td><td class="error">个人简介内容不合符要求</td><td>消息时间</td></tr></tbody>');
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
  module.exports = $.mock.msgall;
});
