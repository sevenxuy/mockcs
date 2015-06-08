define(function(require, exports, module) {
  'use strict';
  var _view = require('mock.view');

  $.widget('mock.addetail', _view, {
    options: {},
    render: function() {
      this.element.append(this._createElem());
      $('#addetail-detail').append(this._createDetailElem());
      if (this.element.hasClass('hide')) {
        this.element.removeClass('hide').addClass('current');
      }
    },
    _createElem: function() {
      var h = [];
      h.push('<div class="mock-hd">广告位编辑</div>');
      h.push('<div class="page-content">');
      h.push('<ul class="tabs-nav">');
      h.push('<li class="tab-nav-item"><a href="#ads/homepage">个人主页</a></li>');
      h.push('<li class="tab-nav-item tab-nav-item-selected"><a href="#ads/detail">详情页</a></li>');
      h.push('</ul>');
      h.push('<div class="tabs-content">');
      h.push('<div class="mock-search-box"><input type="search" placeholder="按关键词搜索" class="form-control mock-search"><div class="mock-search-icon"></div></div>');
      h.push('<table class="table table-bordered table-hover">');
      h.push('<thead><tr><th>详情页标题</th><th>UV</th><th>PV</th><th>吐槽数</th><th>点赞数</th><th>上线时间</th><th>状态</th><th>操作</th></tr></thead><tbody>');
      h.push('<tr><td>text</td><td>num</td><td>num</td><td>1245</td><td>2983</td><td>2015-06-06 18:00</td><td>上线中</td><td><div class="mock-btn mock-btn-red  mock-btn-s">查看</div></td></tr>');
      h.push('<tr><td>text</td><td>num</td><td>num</td><td>1245</td><td>2983</td><td>2015-06-06 18:00</td><td>上线中</td><td><div class="mock-btn mock-btn-red  mock-btn-s">查看</div></td></tr>');
      h.push('</tbody></table>');
      h.push('</div>');
      h.push('<div id="addetail-detail"></div>')
      h.push('</div>');
      return h.join('');
    },
    _createDetailElem: function() {
      var h = [];
      h.push('<div class="tabs-content">');
      h.push('<div class="mock-search-box"><input type="search" placeholder="按关键词搜索" class="form-control mock-search"><div class="mock-search-icon"></div></div>');
      h.push('<div class="mock-btn mock-btn-red mock-add" data-toggle="modal" data-target="#adhomepage-modal">+ 新增</div>');
      h.push('<div class="modal fade" id="adhomepage-modal" tabindex="-1" role="dialog" aria-hidden="true">');
      h.push('<div class="modal-dialog">');
      h.push('<div class="modal-content">');
      h.push('<div class="modal-header">');
      h.push('<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>');
      h.push('<h4 class="modal-title" id="myModalLabel">广告位</h4>');
      h.push('</div>');
      h.push('<div class="modal-body">');
      h.push('<table class="table table-bordered mock-upload-table mock-aditem"><tbody>');
      h.push('<tr><td>广场图*</td><td><div class="bg-warning">建议尺寸（待定，找PM）</div><div class="upload-img-box"><div class="upload-img"><textarea placeholder="广告图片链接" class="form-control upload-img-tx"></textarea><div class="mock-btn mock-btn-red upload-img-btn">上传广场图</div><input type="file" accept="image/gif, image/jpeg, image/png" class="hide"></div><div class="upload-img-preivew"></div></div></td></tr>');
      h.push('<tr><td>广告跳转链接*</td><td><textarea class="form-control upload-desc" cols="3" maxlength="100" id="upload-desc"></textarea></td></tr>');
      h.push('</tbody></table>');
      h.push('</div>');
      h.push('<div class="modal-footer">');
      h.push('<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>');
      h.push('<button type="button" class="btn btn-primary">提交审核</button>');
      h.push('</div>');
      h.push('</div>');
      h.push('</div>');
      h.push('</div>');
      h.push('<table class="table table-bordered table-hover">');
      h.push('<thead><tr><th>广告图片</th><th>广告链接</th><th>PV</th><th>UV</th><th>上线时间</th><th>状态</th><th>操作</th></tr></thead><tbody>');
      h.push('<tr><td>img</td><td>url</td><td>1245</td><td>2983</td><td>2015-06-06 18:00</td><td>上线中</td><td><div class="mock-btn mock-btn-red  mock-btn-s" data-toggle="modal" data-target="#adhomepage-modal">修改</div></td></tr>');
      h.push('<tr><td>img</td><td>url</td><td>1245</td><td>2983</td><td>2015-06-06 18:00</td><td>上线中</td><td><div class="mock-btn mock-btn-red  mock-btn-s" data-toggle="modal" data-target="#adhomepage-modal">修改</div></td></tr>');
      h.push('</tbody></table>');
      h.push('</div>');
      return h.join('');
    },
    _bindEvents: function() {
      this._on(this.element, {

      });
    }
  });
  module.exports = $.mock.addetail;
});
