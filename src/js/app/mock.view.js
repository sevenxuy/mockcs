define(function(require, exports, module) {
  'use strict';

  var notify = require('mock.plugin.notify'),
    autosize = require('mock.plugin.autosize.min');

  $.widget('mock.view', {
    options: {
      uploadfile: '/umis/pushc/uploadfile',
    },
    _create: function() {
      this.render();
      this._bindEvents();
      this.element.data('widgetCreated', true);
    },
    render: function() {
      this.element.append(this._createElem());
      if (this.element.hasClass('hide')) {
        this.element.removeClass('hide').addClass('current');
      }
    },
    reRender: function() {
      this.element.addClass('hide').empty();
      this.render();
    },
    _bindEvents: function() {},
    _createElem: function() {},
    _updateWrapperElemStatus: function(type) {
      var $nav = this.element.find('ul.tabs-nav:eq(0)');
      $nav.children('li.tab-nav-item-selected').removeClass('tab-nav-item-selected');
      $nav.children('li[data-type=' + type + ']').addClass('tab-nav-item-selected');
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
    _compressImg: function($tx, newsrc, w, h) {
      var key = $.md5('wisetimgkey_noexpire_3f60e7362b8c23871c7564327a31d9d70' + newsrc);
      $tx.val('http://cdn01.baidu-img.cn/timg?cbs&quality=60&size=b' + w + '_' + h + '&sec=0&di=' + key + '&src=' + newsrc);
      autosize($tx);
    },
    _checkImgSize: function($tx, w, h) {},
    /*paging*/
    _updatePagingStatus: function() {
      var options = this.options,
        pn = parseInt(options.pn, 10),
        totalpage = options.totalpage,
        $paging = this.element.find('div.paging:eq(0)');
      if (totalpage > 1) {
        var $pre = $paging.children('div.page_pre:eq(0)'),
          $next = $paging.children('div.page_next:eq(0)'),
          $cur = $paging.find('span.page_current:eq(0)'),
          $total = $paging.find('span.page_total:eq(0)');
        if ((pn == 0) && (!$pre.hasClass('hide'))) {
          console.log(1);
          $pre.addClass('hide');
        } else if ((pn > 0) && $pre.hasClass('hide')) {
           console.log(2);
          $pre.removeClass('hide');
        }
        if ((pn == (totalpage - 1)) && (!$next.hasClass('hide'))) {
          $next.addClass('hide');
        } else if ((pn < (totalpage - 1)) && $next.hasClass('hide')) {
          $next.removeClass('hide');
        }
        $cur.text(pn + 1);
        $total.text(totalpage);
        if ($paging.hasClass('hide')) {
          $paging.removeClass('hide');
        }
      } else if (!$paging.hasClass('hide')) {
        $paging.addClass('hide');
      }
      return false;
    },
    _preGoSiblingPage: function(event) {
      var options = this.options,
        pn = parseInt(options.pn, 10),
        totalpage = options.totalpage,
        $btn = $(event.target),
        $paging = this.element.find('div.paging:eq(0)'),
        $pre = $paging.children('div.page_pre:eq(0)'),
        $next = $paging.children('div.page_next:eq(0)'),
        $cur = $paging.find('span.page_current:eq(0)');
      if ($btn.hasClass('page_pre')) {
        pn = pn - 1;
      } else if ($btn.hasClass('page_next')) {
        pn = pn + 1;
      } else if ($btn.hasClass('page_go')) {
        var page = $paging.find('input.goto_page').val().trim();
        if (parseInt(page, 10) && page > 0 && page < totalpage) {
          pn = page - 1;
        } else {
          notify({
            tmpl: 'warning',
            text: '请输入正确的页码。'
          });
          return false;
        }
      }
      if (pn > -1) {
        this._goSiblingPage(pn);
      }
      return false;
    },
    _goSiblingPage: function(pn) {}
  });
  module.exports = $.mock.view;
});
