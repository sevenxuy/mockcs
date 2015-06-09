define(function(require, exports, module) {
  'use strict';
  require('mock.view.nav');

  var
    _view = require('mock.view'),
    _uitl = require('mock.util'),
    notify = require('mock.plugin.notify'),
    autosize = require('mock.plugin.autosize.min');

  $.widget('mock.rawupload', _view, {
    options: {
      uploadfile: '/umis/pushc/uploadfile',
      addaudinews: 'http://uil.shahe.baidu.com/mock/addaudinews?ua=bd_720_1280_HTC-HTC+One+X-4-0-4_4-2-6-1_j2&cuid=80000000000000000000000000000000|0'
    },

    render: function() {
      this.element.append(this._createUploadElem());
      $('#upload-content').jqte();
      $('#upload-uptime').datetimepicker({
        format: 'Y-m-d H:i'
      });
      if (this.element.hasClass('hide')) {
        this.element.removeClass('hide').addClass('current');
      }
    },
    reRender: function() {
      if (this.element.hasClass('hide')) {
        this.element.removeClass('hide').addClass('current');
      }
    },
    _createUploadElem: function() {
      var h = [];
      h.push('<div class="mock-hd">原始内容上传</div>');
      h.push('<div class="page-content">');
      h.push('<div class="mock-title">吐槽能量池</div>');
      h.push('<table class="table table-bordered mock-upload-table"><tbody>');
      h.push('<tr><td>标题*</td><td><div class="mock-input-box"><input type="text" maxlength="18" class="form-control" id="upload-title"><span class="mock-input-tip">最多18字符</span></div></td></tr>');
      h.push('<tr><td>广场图</td><td><div class="bg-warning">图片尺寸要求：最小宽度640px， 最大高度1080px，宽高比在1~2之间， 最佳宽高比是3:2。</div><div class="upload-img-box"><div class="upload-img"><textarea placeholder="图片链接" class="form-control upload-img-tx" id="upload-simg" style="resize: vertical;"></textarea><div class="mock-btn mock-btn-red upload-img-btn">上传广场图</div><input type="file" accept="image/gif, image/jpeg, image/png" class="hide"></div><div class="upload-img-preivew"></div></div></td></tr>');
      h.push('<tr><td>摘要*</td><td><div class="mock-textarea-box"><textarea class="form-control upload-desc" cols="3" maxlength="100" id="upload-desc"></textarea><span class="mock-input-tip">最多100字符</span></div></td>');
      h.push('</tbody>');
      h.push('</table>');
      h.push('<div class="mock-title">吐槽放大镜</div>');
      h.push('<table class="table table-bordered mock-upload-table">');
      h.push('<tr><td>主图</td><td><div class="bg-warning">图片尺寸要求：宽度720px， 高度2048px。</div><div class="upload-img-box"><div class="upload-img"><textarea placeholder="图片链接" class="form-control upload-img-tx" id="upload-img" style="resize: vertical;"></textarea><div class="mock-btn mock-btn-red upload-img-btn">上传主图</div><input type="file" accept="image/gif, image/jpeg, image/png" class="hide"></div><div class="upload-img-preivew"></div></div></td></tr>');
      h.push('<tr><td>正文*</td><td><textarea id="upload-content" class="form-control"></textarea></td></tr>');
      h.push('<tr><td>内容类型</td><td>');
      h.push('<select class="form-control" id="upload-type"><option value="0" selected="selected">资讯</option><option value="1">PK</option><option value="2">投票</option></select>');
      h.push('<div class="upload-pk hide" id="upload-pk">');
      h.push('<div class="upload-pk-item">甲方文案 <div class="mock-input-box"><input type="text" maxlength="7" class="form-control" ><span class="mock-input-tip">最多7字符</span></div></div>');
      h.push('<div class="upload-pk-item">乙方文案 <div class="mock-input-box"><input type="text" maxlength="7" class="form-control" ><span class="mock-input-tip">最多7字符</span></div></div>');
      h.push('</div>');
      h.push('<div class="upload-vote hide" id="upload-vote">');
      h.push('<div class="upload-vote-box" id="upload-vote-box">');
      h.push('<div class="upload-vote-item">');

      h.push('<div class="mock-input-box"><input type="text" maxlength="20" class="form-control" placeholder="若配图限6字符"><span class="mock-input-tip">最多20字符</span></span></span></div><div class="mock-btn mock-btn-red upload-vote-item-addimg">+ 添加图片</div>');
      h.push('<div class="upload-img-box-wrapper hide">');
      h.push('<div class="bg-warning">图片尺寸要求：宽度200px，高度200px。</div>');
      h.push('<div class="upload-img-box"><div class="upload-img"><textarea placeholder="图片链接" class="form-control upload-img-tx upload-vote-img" style="resize: vertical;"></textarea><div class="mock-btn mock-btn-red upload-img-btn">上传图片</div><div class="mock-btn mock-btn-red upload-vote-item-clearimg">- 移除该图片</div><input type="file" accept="image/gif, image/jpeg, image/png" class="hide"></div><div class="upload-img-preivew"></div></div>');
      h.push('</div></div>');
      h.push('<div class="upload-vote-item">');
      h.push('<div class="mock-input-box"><input type="text" maxlength="20" class="form-control" placeholder="若配图限6字符"><span class="mock-input-tip">最多20字符</span></span></span></div><div class="mock-btn mock-btn-red upload-vote-item-addimg">+ 添加图片</div>');
      h.push('<div class="upload-img-box-wrapper hide">');
      h.push('<div class="bg-warning">图片尺寸要求：宽度200px，高度200px。</div>');
      h.push('<div class="upload-img-box"><div class="upload-img"><textarea placeholder="图片链接" class="form-control upload-img-tx upload-vote-img" style="resize: vertical;"></textarea><div class="mock-btn mock-btn-red upload-img-btn">上传图片</div><div class="mock-btn mock-btn-red upload-vote-item-clearimg">- 移除该图片</div><input type="file" accept="image/gif, image/jpeg, image/png" class="hide"></div><div class="upload-img-preivew"></div></div>');
      h.push('</div></div>');
      h.push('<div class="upload-vote-item">');
      h.push('<div class="mock-input-box"><input type="text" maxlength="20" class="form-control" placeholder="若配图限6字符"><span class="mock-input-tip">最多20字符</span></span></span></div><div class="mock-btn mock-btn-red upload-vote-item-addimg">+ 添加图片</div>');
      h.push('<div class="upload-img-box-wrapper hide">');
      h.push('<div class="bg-warning">图片尺寸要求：宽度200px，高度200px。</div>');
      h.push('<div class="upload-img-box"><div class="upload-img"><textarea placeholder="图片链接" class="form-control upload-img-tx upload-vote-img" style="resize: vertical;"></textarea><div class="mock-btn mock-btn-red upload-img-btn">上传图片</div><div class="mock-btn mock-btn-red upload-vote-item-clearimg">- 移除该图片</div><input type="file" accept="image/gif, image/jpeg, image/png" class="hide"></div><div class="upload-img-preivew"></div></div>');
      h.push('</div></div>');
      h.push('</div>');
      h.push('<div class="mock-btn mock-btn-red" id="upload-vote-additem">+ 添加投票观点</div>');
      h.push('</div>');
      h.push('</td></tr>');
      h.push('<tr><td>上线时间*</td><td><input class="form-control" type="text" id="upload-uptime"></td></tr>');
      h.push('</table>');
      h.push('<div class="mock-center-box"><div class="mock-btn mock-btn-red" id="upload-submit">提交审核</div></div>');
      h.push('<img id="upload-img-check" class="upload-img-check" style="width:0;height:0" src="">');
      h.push('</div>');
      return h.join('');
    },
    _bindEvents: function() {
      this._on(this.element, {
        'change #upload-type': this._changeType,
        'click div.upload-vote-item-addimg': this._addImg,
        'click div.upload-vote-item-clearimg': this._clearImg,
        'click #upload-vote-additem': this._addVoteItem,
        'click div.upload-img-btn': this._triggerUploadImg,
        'change input[type=file]': this._uploadImg,
        'change textarea.upload-img-tx': this._previewImg,
        'click #upload-submit': this._submitData
      });
    },
    _changeType: function(event) {
      var type = $(event.target).val(),
        $pk = $('#upload-pk'),
        $vote = $('#upload-vote');
      switch (type) {
        case '0':
          if (!$pk.hasClass('hide')) {
            $pk.addClass('hide');
          }
          if (!$vote.hasClass('hide')) {
            $vote.addClass('hide');
          }
          break;
          //pk
        case '1':
          if ($pk.hasClass('hide')) {
            $pk.removeClass('hide');
          }
          if (!$vote.hasClass('hide')) {
            $vote.addClass('hide');
          }
          break;
          //vote
        case '2':
          if (!$pk.hasClass('hide')) {
            $pk.addClass('hide');
          }
          if ($vote.hasClass('hide')) {
            $vote.removeClass('hide');
          }
          break;
      }
      return false;
    },
    _addImg: function(event) {
      var
        $item = $(event.target).closest('div.upload-vote-item'),
        $imgbox = $item.children('div.upload-img-box-wrapper');
      if ($imgbox.hasClass('hide')) {
        $imgbox.removeClass('hide');
      }
      return false;
    },
    _clearImg: function(event) {
      var $imgbox = $(event.target).closest('div.upload-img-box');
      $imgbox.find('textarea').val('');
      $imgbox.children('div.upload-img-preivew').empty();
      return false;
    },
    _addVoteItem: function() {
      var h = [];
      h.push('<div class="upload-vote-item">');
      h.push('<div class="mock-input-box"><input type="text" maxlength="20" class="form-control" placeholder="若配图限6字符"><span class="mock-input-tip">最多20字符</span></div><div class="mock-btn mock-btn-red upload-vote-item-addimg">+ 添加图片</div>');
      h.push('<div class="upload-img-box-wrapper hide">');
      h.push('<div class="bg-warning">图片尺寸要求：宽度200px，高度200px。</div>');
      h.push('<div class="upload-img-box"><div class="upload-img"><textarea placeholder="图片链接" class="form-control upload-vote-img" style="resize: vertical;"></textarea><div class="mock-btn mock-btn-red">上传图片</div><div class="mock-btn mock-btn-red upload-vote-item-clearimg">- 移除该图片</div><input type="file" class="hide"></div><div class="upload-img-preivew"></div></div>');
      h.push('</div></div>');
      $('#upload-vote-box').append(h.join(''));
    },
    _triggerUploadImg: function(event) {
      var $input = $(event.target).closest('div.upload-img').children('input');
      $input.trigger('click');
      return false;
    },
    _uploadImg: function(event) {
      var
        self = this,
        options = this.options,
        data = new FormData(),
        img = event.target.files[0],
        $imgbox = $(event.target).closest('div.upload-img-box'),
        $tx = $imgbox.find('textarea.upload-img-tx'),
        $preview = $imgbox.children('div.upload-img-preivew');

      if (!img) {
        return false;
      }
      //image can only be png, jpeg or gif.
      if (!_.contains(['image/png', 'image/jpeg', 'image/gif'], img.type)) {
        notify({
          tmpl: 'error',
          text: '请检查图片格式，只能上传png, jpeg, gif格式的图片。'
        });
        return false;
      }
      // 如果图片尺寸大于100K， 就按照60的质量进行压缩
      var bNeedCompress = false;
      if (img.size > 100 * 1024) {
        bNeedCompress = true;
      }
      if (('' + img.name).match(/\.gif$/i)) {
        // GIF一定需要压缩， 为了获取到第一帧
        bNeedCompress = true;
      }

      data.append('file', img);
      $.ajax({
        url: options.uploadfile,
        data: data,
        cache: false,
        contentType: false,
        processData: false,
        type: 'POST'
      }).done(function(res) {
        if (!res.errno) {
          var newsrc = res.data;
          $tx.val(newsrc);
          autosize($tx);

          var newImg = new Image(),
            w, h;
          newImg.onload = function() {
            h = newImg.height;
            w = newImg.width;

            self._checkImgSize($tx, w, h);

            if (bNeedCompress) {
              self._compressImg($tx, newsrc, w, h);
            }
            $tx.trigger('change');
          }
          newImg.src = newsrc;
        } else {
          notify({
            tmpl: 'error',
            text: res.error
          });
        }
      }).fail(function() {});
      return false;
    },
    _checkImgSize: function($tx, w, h) {
      var options = this.options;
      if (($tx.attr('id') == 'upload-simg') && ((w < 640) || (h > 1080) || (w / h > 2) || (w / h < 1))) {
        notify({
          tmpl: 'error',
          text: '广场图尺寸要求是：最小宽度640px， 最大高度1080px，宽高比在1~2之间，最佳宽高比是3:2。'
        });
        $tx.val('');
        return false;
      } else {
        options.img_w = w;
        options.img_h = h;
      }
      if (($tx.attr('id') == 'upload-img') && ((w != 720) || (h != 2048))) {
        notify({
          tmpl: 'error',
          text: '主图尺寸要求是：尺寸要求：宽度720px， 高度2048px。'
        });
        $tx.val('');
        return false;
      }
      if ($tx.hasClass('upload-vote-img') && ((w != 200) || (h != 200))) {
        notify({
          tmpl: 'error',
          text: '投票观点配图要求是：尺寸要求：宽度720px， 高度2048px。'
        });
        $tx.val('');
        return false;
      }
    },
    _compressImg: function($tx, newsrc, w, h) {
      var key = $.md5('wisetimgkey_noexpire_3f60e7362b8c23871c7564327a31d9d70' + newsrc);
      $tx.val('http://cdn01.baidu-img.cn/timg?cbs&quality=60&size=b' + w + '_' + h + '&sec=0&di=' + key + '&src=' + newsrc);
      autosize($tx);
    },
    _previewImg: function(event) {
      var
        $tx = $(event.target),
        $imgbox = $tx.closest('div.upload-img-box'),
        imgsrc = $tx.val().trim(),
        $preview = $imgbox.children('div.upload-img-preivew');
      if (!!imgsrc) {
        if (imgsrc.match(/\.(jpeg|jpg|gif|png)$/)) {
          $preview.empty().append('<img src="' + imgsrc + '"/>');
          if ($tx.hasClass('upload-vote-img')) {
            var $voteitem = $tx.closest('div.upload-vote-item'),
              $input = $voteitem.find('input[type=text]'),
              desc = $input.val().trim(),
              $tip = $voteitem.find('span.mock-input-tip');
            if (!!desc) {
              $input.val(desc.slice(0, 6));
            }
            $input.attr({
              'maxlength': 6
            });
            $tip.text('最多6字符');
          }
        } else {
          notify({
            tmpl: 'error',
            text: '请检查图片格式，只能上传png, jpeg, gif格式的图片。'
          });
        }
      } else {
        if ($tx.hasClass('upload-vote-img')) {
          var $voteitem = $tx.closest('div.upload-vote-item'),
            $input = $voteitem.find('input[type=text]'),
            $tip = $voteitem.find('span.mock-input-tip');
          if (!desc) {
            $input.attr({
              'maxlength': 20
            });
            $tip.text('最多20字符');
          }
        }
      }
    },
    _submitData: function(event) {
      var options = this.options;
      var title = $('#upload-title').val().trim();
      if (!title.length) {
        notify({
          tmpl: 'error',
          text: '请输入标题。'
        });
        return false;
      }

      var simg = $('#upload-simg').val().trim();

      var desc = $('#upload-desc').val().trim();
      if (!desc.length) {
        notify({
          tmpl: 'error',
          text: '请输入摘要。'
        });
        return false;
      }

      var img = $('#upload-img').val().trim();

      var content = $('#upload-content').val().trim();
      if (!content.length) {
        notify({
          tmpl: 'error',
          text: '请输入正文。'
        });
        return false;
      } else {
        content = _.escape(content);
      }

      var type = $('#upload-type').val();
      var ext;

      switch (type) {
        //pk
        case '1':
          ext = [];
          $('#upload-pk').find('input').each(function() {
            var title = $(this).val();
            if (!title.length) {
              return false;
            } else {
              ext.push({
                title: title
              });
            }
          });
          if (ext.length == 2) {
            ext = JSON.stringify(ext);
          } else {
            notify({
              tmpl: 'error',
              text: '内容类型 为 PK 的甲方文案和乙方文案都需要输入完整。'
            });
            return false;
          }
          break;
          //vote
        case '2':
          ext = [];
          $('#upload-vote-box').children('div.upload-vote-item').each(function() {
            var
              title = $(this).find('input[type=text]').val().trim(),
              img = $(this).find('textarea').val().trim();
            if (!!title) {
              ext.push({
                title: title,
                img: img
              });
            }
          });
          if ((ext.length > 2) && (ext.length < 7)) {
            ext = JSON.stringify(ext);
          } else {
            notify({
              tmpl: 'error',
              text: '内容类型 为 投票 的观点个数最少3个，最多6个。'
            });
            return false;
          }
          break;

        case '0':
        default:
          ext = '';
      }
      var uptime = $('#upload-uptime').val().trim();
      if (!uptime.length) {
        notify({
          tmpl: 'error',
          text: '请选择上线时间。'
        });
        return false;
      }
      var rawdata = {
        img: img,
        img_w: '' + (options.img_w || 0),
        img_h: '' + (options.img_h || 0),
        simg: simg,
        title: title,
        desc: desc,
        content: content,
        type: type,
        uptime: uptime,
        ext: ext
      };

      $.ajax({
        url: options.addaudinews,
        crossDomain: true,
        dataType: 'jsonp',
        data: {
          data: JSON.stringify(rawdata)
        }
      }).done(function(res) {
        if (!res.errno) {
          var router = new Backbone.Router;
          router.navigate('raw/pending', {
            trigger: true
          });
        } else {
          notify({
            tmpl: 'error',
            text: res.error
          });
        }
      }).fail(function(res) {});
      return false;
    }
  });
  module.exports = $.mock.rawupload;
});
