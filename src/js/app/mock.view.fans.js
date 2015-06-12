define(function(require, exports, module) {
  'use strict';
  var _view = require('mock.view');

  $.widget('mock.fans', _view, {
    options: {
      message: 'http://uil.shahe.baidu.com:8050/umis/message/pullmsg?&fn=?',
      ps: 1
    },
    render: function(opt) {
      var options = this.options;
      _.extend(options, opt);
      this._createWrapperElem();
    },
    reRender: function(opt) {
      var options = this.options;
      _.extend(options, opt);
      this.renderTable();
    },
    renderTable: function() {
      var self = this,
        options = this.options;
      this._updateWrapperElemStatus(options.status);
      $.ajax({
        url: options.message,
        crossDomain: true,
        dataType: 'jsonp',
        data: {
          status: options.status,
          pn: options.pn,
          ps: options.ps
        }
      }).done(function(res) {
        if (!res.errno) {
          options.allcount = res.data.allcount;
          options.totalpage = Math.ceil(options.allcount / options.ps);
          self._updatePagingStatus();
           $('#fans-table').addClass('hide').empty().append(self._createTableElem(res.data.list)).removeClass('hide');
        } else {
          notify({
            tmpl: 'error',
            text: res.error
          })
        }
      });
    },
    _createWrapperElem: function() {
      var h = [];
      h.push('<div class="mock-hd">粉丝管理</div>');
      h.push('<div class="page-content">');
      h.push('<ul class="tabs-nav">');
      h.push('<li class="tab-nav-item" data-type="1"><a>最新粉丝</a></li>');
      h.push('<li class="tab-nav-item" data-type="0"><a>全部粉丝</a></li>');
      h.push('</ul>');
      h.push('<div class="tabs-content">');
      h.push('<table class="table table-bordered table-hover">');
      h.push('<thead><tr><th>粉丝昵称</th><th>粉丝头像</th><th>关注时间</th></tr></thead><tbody id="fans-table">');
      h.push('</tbody></table>');
      h.push('</div>');
      h.push('</div>');
      this.element.append(h.join(''));
      this.renderTable();
    },
    _createTableElem: function(data) {
      var h = [];
      if (!_.isEmpty(data)) {
        _.each(data, function(item, index) {
          h.push('<tr><td>哆啦A梦</td><td>img</td><td>2015-06-06 18:00</td></tr>');
        });
      }else{
        h.push('<tr><td colspan="3">没有更多数据</td></tr>');
      }
      return h.join('');
    },
    _bindEvents: function() {
      this._on(this.element, {
        'click li.tab-nav-item': this._goPage
      });
    },
    _goPage: function(event) {
      var type = $(event.target).closest('li.tab-nav-item').attr('data-type');
      var router = new Backbone.Router;
      router.navigate('fans/' + type, {
        trigger: true
      });
      return false;
    }
  });
  module.exports = $.mock.fans;
});
