define(function(require, exports, module) {
  'use strict';
  var _view = require('mock.view'),
    notify = require('mock.plugin.notify');

  $.widget('mock.homepage', _view, {
    options: {
      addaudiuser: 'http://uil.shahe.baidu.com/mock/addaudiuser?ua=bd_720_1280_HTC-HTC+One+X-4-0-4_4-2-6-1_j2&cuid=80000000000000000000000000000000|0&fn=?'
    },
    _createElem: function() {
      var h = [];
      h.push('<div class="mock-hd">个人主页设置</div>');
      h.push('<div class="page-content">');
      h.push('<div class="mock-title">公开信息</div>');
      h.push('<table class="table table-bordered mock-upload-table"><tbody>');
      h.push('<tr><td>头像</td><td><div class="hp-avatar"><img src="./mockcs/img/hi.png"></div></td></tr>');
      h.push('<tr><td>名称</td><td>哆啦A梦</td></tr>');
      h.push('<tr><td>个人简介</td><td><div class="mock-textarea-box"><textarea class="form-control upload-desc" cols="3" maxlength="100" id="homnepage-desc"></textarea></div></td>');
      h.push('</tbody>');
      h.push('</table>');
      h.push('<div class="mock-title">个人主页资讯列表</div>');
      h.push('<table class="table table-bordered table-hover">');
      h.push('<thead><tr><th>内容标题</th><th>上线时间</th><th>内容类型</th><th>PV</th><th>UV</th><th>吐槽数</th><th>参与人数</th><th>是否置顶</th></tr></thead><tbody>');
      h.push('<tr><td>Really Angel?</td><td>2015-06-06 18:00</td><td>type</td><td>1245</td><td>2983</td><td>200</td><td>100</td><td><input type="checkbox"></td></tr>');
      h.push('</tbody></table>');
      h.push('</div>');
      return h.join('');
    },
    _bindEvents: function() {
      this._on(this.element, {
        'change #homnepage-desc': this._updateDesc
      });
    },
    _updateDesc: function(event) {
      var desc = _.escape($(event.target).val().trim());
      $.ajax({
        url: options.addaudiuser,
        crossDomain: true,
        dataType: 'jsonp',
        type: 'GET',
        data: {
          desc: desc
        }
      }).done(function(res) {
        if (res.errno) {
          notify({
            tmpl: 'error',
            text: res.error
          });
        }
      });
      return false;
    }
  });
  module.exports = $.mock.homepage;
});
