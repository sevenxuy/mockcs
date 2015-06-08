define(function(require, exports, module) {
  'use strict';
  var _view = require('mock.view');

  $.widget('mock.mockme', _view, {
    options: {},
    _createElem: function() {
      var h = [];
      h.push('<div class="mock-hd">快速吐槽</div>');
      h.push('<div class="page-content">');
      h.push('<ul class="tabs-nav">');
      h.push('<li class="tab-nav-item tab-nav-item-selected"><a href="#mocks/me">我</a></li>');
      h.push('<li class="tab-nav-item"><a href="#mocks/square">吐槽广场</a></li>');
      h.push('</ul>');
      h.push('<div class="tabs-content">');
      h.push('<div class="mock-search-box"><input type="search" placeholder="按关键词搜索" class="form-control mock-search"><div class="mock-search-icon"></div></div>');
      h.push('<table class="table table-bordered table-hover">');
      h.push('<thead><tr><th>内容标题</th><th>上线时间</th><th>吐槽数</th><th>点击数</th><th>参与人数</th><th>操作</th></tr></thead>');
      h.push('<tbody>');
      h.push('<tr><td>This is a test</td><td>2015-06-06 18:00</td><td>100</td><td>1000</td><td>50</td><td><div class="mock-btn mock-btn-red  mock-btn-s">展开</div></td></tr>');
      h.push('</tbody>');
      h.push('</table>');
      h.push('<div>是否分页？</div>');
      h.push('<div class="mock-search-box"><input type="search" placeholder="按关键词搜索" class="form-control mock-search"><div class="mock-search-icon"></div></div>');
      h.push('<div class="mock-btn mock-btn-red mock-add" data-toggle="modal" data-target="#mockme-modal">+ 新增</div>');
      h.push('<div class="modal fade" id="mockme-modal" tabindex="-1" role="dialog" aria-hidden="true">');
      h.push('<div class="modal-dialog">');
      h.push('<div class="modal-content">');
      h.push('<div class="modal-header">');
      h.push('<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>');
      h.push('<h4 class="modal-title" id="myModalLabel">//据操作确定</h4>');
      h.push('</div>');
      h.push('<div class="modal-body">');
      h.push('<textarea placeholder="回复吐槽" class="form-control"></textarea>');
      h.push('<div class="checkbox"><label><input type="checkbox"> 匿名发表</label></div>');
      h.push('</div>');
      h.push('<div class="modal-footer">');
      h.push('<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>');
      h.push('<button type="button" class="btn btn-primary">发表</button>');
      h.push('</div>');
      h.push('</div>');
      h.push('</div>');
      h.push('</div>');
      h.push('<table class="table table-bordered table-hover">');
      h.push('<thead><tr><th>用户</th><th>点赞数</th><th>回复内容</th><th>上线时间</th><th>操作</th></tr></thead>');
      h.push('<tbody>');
      h.push('<tr><td>Anglina</td><td>2000</td><td>You are really an anglel.</td><td>2015-06-06 18:00</td><td><div class="mock-btn mock-btn-red  mock-btn-s">回复</div></td></tr>');
      h.push('</tbody>');
      h.push('</table>');
      h.push('<div>是否分页？</div>');

      h.push('</div>');
      h.push('</div>');
      return h.join('');
    },
    _bindEvents: function() {
      this._on(this.element, {

      });
    }
  });
  module.exports = $.mock.mockme;
});
