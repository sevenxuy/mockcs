define(function(require, exports, module) {
  'use strict';
  var _view = require('mock.view'),
  notify = require('mock.plugin.notify');

  $.widget('mock.adhomepage', _view, {
    options: {
      addaudiad: 'http://uil.shahe.baidu.com/mock/addaudiad?ua=bd_720_1280_HTC-HTC+One+X-4-0-4_4-2-6-1_j2&cuid=80000000000000000000000000000000|0&fn=?'
    },
    render: function() {
      this.element.append(this._createElem());
      $('#adhomepage-detail').append(this._createDetailElem());
      if (this.element.hasClass('hide')) {
        this.element.removeClass('hide').addClass('current');
      }
    },
    _createElem: function() {
      var h = [];
      h.push('<div class="mock-hd">广告位编辑</div>');
      h.push('<div class="page-content">');
      h.push('<ul class="tabs-nav">');
      h.push('<li class="tab-nav-item tab-nav-item-selected"><a href="#ad/homepage">个人主页</a></li>');
      h.push('<li class="tab-nav-item"><a href="#ad/detail">详情页</a></li>');
      h.push('</ul>');
      h.push('<div class="tabs-content">');
      h.push('<div class="mock-search-box"><input type="search" placeholder="按关键词搜索" class="form-control mock-search"><div class="mock-search-icon"></div></div>');
      h.push('<table class="table table-bordered table-hover">');
      h.push('<thead><tr><th>详情页标题</th><th>UV</th><th>PV</th><th>吐槽数</th><th>点赞数</th><th>上线时间</th><th>状态</th><th>操作</th></tr></thead><tbody>');
      h.push('<tr><td>text</td><td>num</td><td>num</td><td>1245</td><td>2983</td><td>2015-06-06 18:00</td><td>上线中</td><td><div class="mock-btn mock-btn-red  mock-btn-s">查看</div></td></tr>');
      h.push('<tr><td>text</td><td>num</td><td>num</td><td>1245</td><td>2983</td><td>2015-06-06 18:00</td><td>上线中</td><td><div class="mock-btn mock-btn-red  mock-btn-s">查看</div></td></tr>');
      h.push('</tbody></table>');
      h.push('</div>');
      h.push('<div id="adhomepage-detail"></div>');
      h.push('</div>');
      return h.join('');
    },
    _createDetailElem: function() {
      var h = [];
      h.push('<div class="tabs-content">');
      h.push('<div class="mock-search-box"><input type="search" placeholder="按关键词搜索" class="form-control mock-search"><div class="mock-search-icon"></div></div>');
      h.push('<div class="mock-btn mock-btn-red mock-add" data-toggle="modal" data-target="#ad-modal">+ 新增</div>');
      h.push('<div class="modal fade" id="ad-modal" tabindex="-1" role="dialog" aria-hidden="true">');
      h.push('<div class="modal-dialog">');
      h.push('<div class="modal-content">');
      h.push('<div class="modal-header">');
      h.push('<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>');
      h.push('<h4 class="modal-title" id="myModalLabel">广告位</h4>');
      h.push('</div>');
      h.push('<div class="modal-body">');
      h.push('<table class="table table-bordered mock-upload-table mock-aditem"><tbody>');
      h.push('<tr><td>广告图*</td><td><div class="bg-warning">广告图片尺寸要求：宽720px，高140px。</div><div class="upload-img-box"><div class="upload-img">');
      h.push('<textarea placeholder="广告图片链接" class="form-control upload-img-tx" id="ad-img"></textarea><div class="mock-btn mock-btn-red upload-img-btn">上传广告图</div><input type="file" accept="image/gif, image/jpeg, image/png" class="hide"></div>');
      h.push('<div class="upload-img-preivew"></div></div></td></tr>');
      h.push('<tr><td>广告跳转链接*</td><td><textarea class="form-control upload-desc" cols="3" maxlength="100" id="ad-link"></textarea></td></tr>');
      h.push('</tbody></table>');
      h.push('</div>');
      h.push('<div class="modal-footer">');
      h.push('<button type="button" class="btn btn-default data-cancel" data-dismiss="modal">取消</button>');
      h.push('<button type="button" class="btn btn-primary data-save">保存</button>');
      h.push('</div>');
      h.push('</div>');
      h.push('</div>');
      h.push('</div>');
      h.push('<table class="table table-bordered table-hover">');
      h.push('<thead><tr><th>广告图片</th><th>广告链接</th><th>PV</th><th>UV</th><th>上线时间</th><th>状态</th><th>操作</th></tr></thead><tbody>');
      h.push('<tr><td>img</td><td>url</td><td>1245</td><td>2983</td><td>2015-06-06 18:00</td><td>上线中</td><td><div class = "mock-btn mock-btn-red  mock-btn-s" data-toggle="modal" data-target="#ad-modal">修改</div></td></tr>');
      h.push('<tr><td>img</td><td>url</td><td>1245</td><td>2983</td><td>2015-06-06 18:00</td><td>上线中</td><td><div class="mock-btn mock-btn-red  mock-btn-s" data-toggle="modal" data-target="#ad-modal">修改</div></td></tr>');
      h.push('</tbody></table>');
      h.push('</div>');
      return h.join('');
    },
    _bindEvents: function() {
      this._on(this.element, {
        'click div.upload-img-btn': this._triggerUploadImg,
        'change input[type=file]': this._uploadImg,
        'change textarea.upload-img-tx': this._previewImg,
        'click button.data-save': this._saveAd
      });
    },
    _checkImgSize: function($tx, w, h) {
      if ($tx.hasClass('upload-img-tx') && ((w != 720) || (h != 140))) {
        notify({
          tmpl: 'error',
          text: '广告图片尺寸要求：宽720px，高140px。'
        });
        $tx.val('');
        return false;
      }
    },
    _previewImg: function(event) {
      var $tx = $(event.target),
        $imgbox = $tx.closest('div.upload-img-box'),
        imgsrc = $tx.val().trim(),
        $preview = $imgbox.children('div.upload-img-preivew');
      if (!!imgsrc) {
        if (imgsrc.match(/\.(jpeg|jpg|gif|png)$/)) {
          $preview.empty().append('<img src="' + imgsrc + '"/>');
        } else {
          notify({
            tmpl: 'error',
            text: '请检查图片格式，只能上传png, jpeg, gif格式的图片。'
          });
        }
      }
    },
    _saveAd: function(event) {
      var self=this,
      options=this.options,
      img = $('#ad-img').val().trim();
      if (!img.length) {
        notify({
          tmpl: 'error',
          text: '请。'
        });
        return false;
      }
      var link = $('#ad-link').val().trim();
      if (!link.length) {
        notify({
          tmpl: 'error',
          text: '请。'
        });
        return false;
      }
      $.ajax({
        url: options.addaudiad,
        crossDomain: true,
        dataType: 'jsonp',
        data: {
          img: img,
          link: link
        }
      }).done(function(res) {
        if (!res.errno) {
          //prepend
          self.element.find('button.data-cancel').trigger('click');
        } else {
          notify({
            tmpl: 'error',
            text: res.error
          });
        }
      });
    }
  });
  module.exports = $.mock.adhomepage;
});
