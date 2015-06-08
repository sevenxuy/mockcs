define(function(require, exports, module) {
  'use strict';
  var _view = require('mock.view');

  $.widget('mock.homepage', _view, {
    options: {},
    _createElem: function() {
      var h = [];
      h.push('<div class="mock-hd">个人主页设置</div>');
      h.push('<div class="page-content">');
      h.push('<div class="mock-title-border">公开信息</div>');
      h.push('<table class="table table-bordered mock-upload-table"><tbody>');
      h.push('<tr><td>头像</td><td><div class="hp-avatar"><img src="./mockcs/img/hi.png"></div></td></tr>');
       h.push('<tr><td>名称</td><td>哆啦A梦</td></tr>');
      h.push('<tr><td>个人简介</td><td><div class="mock-textarea-box"><textarea class="form-control upload-desc" cols="3" maxlength="100"></textarea></div></td>');
      h.push('</tbody>');
      h.push('</table>');
      h.push('<div class="mock-title-border">个人主页吐槽内容列表</div>');
      h.push('<div class="mock-search-box"><input type="search" placeholder="按关键词搜索" class="form-control mock-search"><div class="mock-search-icon"></div></div>');
      h.push('<table class="table table-bordered table-hover">');
      h.push('<thead><tr><th>内容标题</th><th>上线时间</th><th>内容类型</th><th>PV</th><th>UV</th><th>吐槽数</th><th>参与人数</th><th>是否置顶</th></tr></thead><tbody>');
      h.push('<tr><td>Really Angel?</td><td>2015-06-06 18:00</td><td>type</td><td>1245</td><td>2983</td><td>200</td><td>100</td><td><input type="checkbox"></td></tr>');
      h.push('</tbody></table>');
      h.push('</div>');
      return h.join('');
    },
    _bindEvents: function() {
      this._on(this.element, {

      });
    }
  });
  module.exports = $.mock.homepage;
});
