define(function(require, exports, module) {
  'use strict';
  var _view = require('mock.view'),
    notify = require('mock.plugin.notify'),
    _util = require('mock.util');

  $.widget('mock.ads', _view, {
    options: {
      getmyadlist: 'uil.shahe.baidu.com/mock/getmyadlist?&ua=bd_720_1280_HTC-HTC+One+X-4-0-4_4-2-6-1_j2&cuid=80000000000000000000000000000000|0&fn=?',
      ps: 4
    },
    render: function(opt) {
      var options = this.options;
      _.extend(options, opt);
      this._createWrapperElem();
    },
    renderTable: function() {
      var self = this,
        options = this.options;
      this._updateWrapperElemStatus(options.type);
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
          options.allcount = res.data.allcount;
          options.totalpage = Math.ceil(options.allcount / options.ps);
          self._updatePagingStatus();
          $('#ads-table').addClass('hide').empty().append(self._createTableElem(res.data.list)).removeClass('hide');
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
        'click li.tab-nav-item': this._goPage,
        'change select.ads-stype': this._filterAds,
        'click div.page_pre': this._preGoSiblingPage,
        'click div.page_next': this._preGoSiblingPage,
        'click div.page_go': this._preGoSiblingPage
      });
    },
    _createWrapperElem: function() {
      var h = [];
      h.push('<div class="mock-hd">广告位状态管理</div>');
      h.push('<div class="page-content">');
      h.push('<ul class="tabs-nav" id="ads-nav">');
      h.push('<li class="tab-nav-item" data-type="2"><a>已上线</a></li>');
      h.push('<li class="tab-nav-item" data-type="1"><a>待审核</a></li>');
      h.push('<li class="tab-nav-item" data-type="0"><a>已保存</a></li>');
      h.push('<li class="tab-nav-item" data-type="3"><a>已删除</a></li>');
      h.push('</ul>');
      h.push('<div class="tabs-content">');
      h.push('<table class="table table-bordered table-hover" id="ads-table">');
      h.push('</table>');
      h.push('<div class="paging hide">');
      h.push('<div class="mock-btn mock-btn-white page_pre hide">&lt;</div>');
      h.push('<div class="page_num"><span class="page_current"></span><span class="num_gap">/</span><span class="page_total"></span></div>');
      h.push('<div class="mock-btn mock-btn-white page_next hide">&gt;</div>');
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
        case '1':
        case '2':
        case '3':
          return this._createCommonTable(data);
          break;
      }
    },
    _createCommonTable: function(data) {
      var h = [];
      h.push('<thead><tr><th>id</th><th><select class="form-control ads-stype"><option selected="selected" disabled="disabled">广告位置</option><option value="0">个人主页</option><option value="1">详情页</option></select></th><th>广告图片</th><th>广告链接</th><th>操作时间</th></tr></thead>');
      h.push('<tbody id="ads-table">');
      if (!_.isEmpty(data)) {
        _.each(data, function(item, index) {
          h.push('<tr data-type="' + item.type + '"><td>' + item.id + '</td><td>' + (item.type == 0 ? '个人主页' : '详情页') + '</td><td><div class="ad-img-preivew"><img src="' + item.img + '"/></div></td><td>' + item.link + '</td><td>' + _util.dateFormat(item.stime * 1000, 'yyyy-MM-dd hh:mm') + '</td></tr>');
        });
      } else {
        h.push('<tr><td colspan="6">没有数据</td></tr>');
      }
      h.push('</tbody>');
      return h.join('');
    },
    _goSiblingPage: function(pn) {
      var router = new Backbone.Router;
      router.navigate('ads/' + this.options.type + '/' + pn, {
        trigger: true
      });
      return false;
    },
    _goPage: function(event) {
      var type = $(event.target).closest('li.tab-nav-item').attr('data-type');
      var router = new Backbone.Router;
      router.navigate('ads/' + type, {
        trigger: true
      });
      return false;
    },
    _filterAds: function(event) {
      var selectedType = $(event.target).val(),
        $ads = $('#ads-table');
      console.log(selectedType);
      $ads.children().removeClass('hide');
      $ads.children('tr[data-type=' + selectedType + ']').addClass('hide');
      return false;
    }
  });
  module.exports = $.mock.ads;
});
