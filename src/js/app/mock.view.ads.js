define(function(require, exports, module) {
  'use strict';
  var _view = require('mock.view');

  $.widget('mock.ads', _view, {
    options: {
      getmyadlist: 'http://uil.shahe.baidu.com/mock/getmyadlist?ua=bd_720_1280_HTC-HTC+One+X-4-0-4_4-2-6-1_j2&cuid=80000000000000000000000000000000|0&fn=?',
      ps: 30
    },
    render: function(opt) {
      var options = this.options;
      _.extend(options, opt);
      this._createWrapperElem();
    },
    renderTable: function() {
      var self = this,
        options = this.options;
      this.updateNavStatus();
      $.ajax({
        url: options.getmyadlist,
        crossDomain: true,
        dataType: 'jsonp',
        type: 'GET',
        data: {
          type: options.type,
          pn: options.pn,
          ps: options.ps
        }
      }).done(function(res) {
        if (!res.errno) {
          $('#ads-table').addClass('hide').empty().append(self._createTableElem(res.data)).removeClass('hide');
        } else {
          notify({
            tmpl: 'error',
            text: res.error
          })
        }
      });
    },
    reRender: function(opt) {
      var options = this.options;
      _.extend(options, opt);
      this.renderTable();
    },
    _bindEvents: function() {
      this._on(this.element, {
        'click li.tab-nav-item': this._goPage
      });
    },
    _createWrapperElem: function() {
      var h = [];
      h.push('<div class="mock-hd">广告位状态管理</div>');
      h.push('<div class="page-content">');
      h.push('<ul class="tabs-nav" id="ads-nav">');
      h.push('<li class="tab-nav-item" data-type="2"><a>已上线</a></li>');
      h.push('<li class="tab-nav-item" data-type="1"><a>待审核</a></li>');
      h.push('<li class="tab-nav-item" data-type="0"><a>未通过审核</a></li>');
      h.push('<li class="tab-nav-item" data-type="3"><a>已删除</a></li>');
      h.push('</ul>');
      h.push('<div class="tabs-content">');
      h.push('<div class="mock-search-box"><input type="search" placeholder="按关键词搜索" class="form-control mock-search"><div class="mock-search-icon"></div></div>');
      h.push('<table class="table table-bordered table-hover" id="ads-table">');
      h.push('</table>');
      h.push('<div class="paging hide">');
      h.push('<div class="mock-btn mock-btn-white page_pre">&lt;</div>');
      h.push('<div class="page_num"><span class="page_current"></span><span class="num_gap">/</span><span class="page_total"></span>');
      h.push('</div>');
      h.push('<div class="mock-btn mock-btn-white page_next">&gt;</div>');
      h.push('<input type="text" class="form-control goto_page">');
      h.push('<div class="mock-btn mock-btn-white page-go">跳转</div>');
      h.push('</div>');
      h.push('</div>');
      h.push('</div>');
      this.element.append(h.join(''));
      this.renderTable();
    },
    _createTableElem: function(data) {
      var options = this.options;
      switch (options.type) {
        case '0':
          return this._createFailTable(data);
          break;
        case '1':
        case '2':
        case '3':
          return this._createCommonTable(data);
          break;
      }
    },
    _createFailTable: function(data) {
      var h = [];
      h.push('<thead><tr><th><select class="form-control"><option selected="selected" disabled="disabled">广告位置</option><option value="">个人主页</option><option value="">详情页</option></select></th><th>原始内容标题</th><th>上线时间</th><th>广告图片</th><th>广告链接</th><th>错误类型</th><th>操作</th></tr></thead>');
      h.push('<tbody>');
      if (!_.isEmpty(data)) {
        _.each(data, function(item, index) {
          h.push('<tr><td>个人主页</td><td>标题</td><td>2015-06-06 18:00</td><td>img</td><td>url</td><td>error</td><td><div class="mock-btn mock-btn-red  mock-btn-s" data-toggle="modal" data-target="#adhomepage-modal">修改</div></td></tr>');
        });
      } else {
        h.push('<tr><td colspan="7">没有数据</td></tr>');
      }
      h.push('</tbody>');
      return h.join('');
    },
    _createCommonTable: function(data) {
      var h = [];
      h.push('<thead><tr><th><select class="form-control"><option selected="selected" disabled="disabled">广告位置</option><option value="">个人主页</option><option value="">详情页</option></select></th><th>原始内容标题</th><th>上线时间</th><th>广告图片</th><th>广告链接</th><th>错误类型</th></tr></thead>');
      h.push('<tbody>');
      if (!_.isEmpty(data)) {
        _.each(data, function(item, index) {
          h.push('<tr><td>个人主页</td><td>标题</td><td>2015-06-06 18:00</td><td>img</td><td>url</td><td>error</td></tr>');
        });
      } else {
        h.push('<tr><td colspan="6">没有数据</td></tr>');
      }
      h.push('</tbody>');
      return h.join('');
    },
    _goPage: function(event) {
      var type = $(event.target).closest('li.tab-nav-item').attr('data-type');
      var router = new Backbone.Router;
      router.navigate('ads/' + type, {
        trigger: true
      });
      return false;
    },
    updateNavStatus: function() {
      var options = this.options,
        $nav = $('#ads-nav');
      $nav.children('li.tab-nav-item-selected').removeClass('tab-nav-item-selected');
      $nav.children('li[data-type=' + options.type + ']').addClass('tab-nav-item-selected');
    }
  });
  module.exports = $.mock.ads;
});
