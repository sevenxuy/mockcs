define(function(require, exports, module) {
  'use strict';
  var _view = require('mock.view'),
    notify = require('mock.plugin.notify');

  $.widget('mock.rawonline', _view, {
    options: {
      getaudinewsbyvid: 'http://uil.shahe.baidu.com/mock/getaudinewsbyvid?ua=bd_720_1280_HTC-HTC+One+X-4-0-4_4-2-6-1_j2&cuid=80000000000000000000000000000000|0',
      // getaudinewsbyvid: '../../data/getaudinewsbyvid.json',
      type: '2',
      pn: 0,
      ps: 30
    },
    render: function() {
      var self = this,
        options = this.options;
      $.ajax({
        url: options.getaudinewsbyvid,
        crossDomain: true,
        dataType: 'jsonp',
        data: {
          type: options.type,
          pn: options.pn,
          ps: options.ps
        }
      }).done(function(res) {
        if (!res.errno) {
          self.element.append(self._createElem(res.data));
          if (self.element.hasClass('hide')) {
            self.element.removeClass('hide').addClass('current');
          }
        } else {
          notify({
            tmpl: 'error',
            text: res.error
          })
        }
      });
    },
    _createElem: function(data) {
      var h = [];
      h.push('<div class="mock-hd">原始内容管理</div>');
      h.push('<div class="page-content">');
      h.push('<ul class="tabs-nav">');
      h.push('<li class="tab-nav-item tab-nav-item-selected"><a href="#raw/online">已上线</a></li>');
      h.push('<li class="tab-nav-item"><a href="#raw/pending">待审核</a></li>');
      h.push('<li class="tab-nav-item"><a href="#raw/fail">未通过审核</a></li>');
      h.push('<li class="tab-nav-item"><a href="#raw/del">已删除</a></li>');
      h.push('</ul>');
      h.push('<div class="tabs-content">');
      h.push('<div class="mock-search-box"><input type="search" placeholder="按关键词搜索" class="form-control mock-search"><div class="mock-search-icon"></div></div>');
      h.push('<table class="table table-bordered table-hover">');
      h.push('<thead><tr><th>id</th><th>内容标题</th><th>上线时间</th><th>是否置顶</th></tr></thead>');
      h.push('<tbody>');
      _.each(data, function(item, index) {
        h.push('<tr><td>' + item.id + '</td><td>' + item.title + '</td><td>' + item.uptime + '</td><td><input type="checkbox"></td></tr>');
      });
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
  module.exports = $.mock.rawonline;
});
