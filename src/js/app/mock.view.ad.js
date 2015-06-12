define(function(require, exports, module) {
    'use strict';
    var _view = require('mock.view'),
        notify = require('mock.plugin.notify'),
        _util = require('mock.util');

    $.widget('mock.ad', _view, {
        options: {
            addaudiad: 'http://uil.shahe.baidu.com/mock/addaudiad?ua=bd_720_1280_HTC-HTC+One+X-4-0-4_4-2-6-1_j2&cuid=80000000000000000000000000000000|0&fn=?',
            getmyadlist: 'http://uil.shahe.baidu.com/mock/getmyadlist?&ua=bd_720_1280_HTC-HTC+One+X-4-0-4_4-2-6-1_j2&cuid=80000000000000000000000000000000|0&fn=?',
            type: 0, //saved ad list
            ps: 2
        },
        render: function(opt) {
            var options = this.options;
            _.extend(options, opt);
            this._createWrapperElem();
        },
        renderTable: function() {
            var self = this,
                options = this.options;
            this._updateWrapperElemStatus(options.stype);
            $.ajax({
                url: options.getmyadlist,
                crossDomain: true,
                dataType: 'jsonp',
                type: 'GET',
                data: {
                    stype: options.stype,
                    type: options.type,
                    pn: options.pn,
                    ps: options.ps
                }
            }).done(function(res) {
                if (!res.errno) {
                    options.allcount = res.data.allcount;
                    options.totalpage = Math.ceil(options.allcount / options.ps);
                    self._updatePagingStatus();
                    $('#ad-table').addClass('hide').empty().append(self._createTableElem(res.data.list)).removeClass('hide');
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
        _createWrapperElem: function() {
            var h = [];
            h.push('<div class="mock-hd">广告位编辑</div>');
            h.push('<div class="page-content">');
            h.push('<ul class="tabs-nav">');
            h.push('<li class="tab-nav-item" data-type="0"><a>个人主页</a></li>');
            h.push('<li class="tab-nav-item" data-type="1"><a>详情页</a></li>');
            h.push('</ul>');
            h.push('<div class="tabs-content">');
            h.push('<div class="mock-btn mock-btn-red mock-add" data-toggle="modal" data-target="#ad-modal-new">+ 新增</div>');
            h.push('<div class="modal fade" id="ad-modal-new" tabindex="-1" role="dialog" aria-hidden="true">');
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
            h.push('<div class="ad-img-preivew"></div></div></td></tr>');
            h.push('<tr><td>广告跳转链接*</td><td><textarea class="form-control upload-desc" cols="3" maxlength="100" id="ad-link"></textarea></td></tr>');
            h.push('<tr><td>有效期</td><td></td></tr>');
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
            h.push('<thead><tr><th>id</th><th>广告图片</th><th>广告链接</th><th>操作时间</th></tr></thead><tbody id="ad-table">');
            h.push('</tbody></table>');
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
            var self = this,
                h = [];
            if (!_.isEmpty(data)) {
                _.each(data, function(item, index) {
                    h.push(self._createItemElem(item));
                });
            } else {
                h.push('<tr><td colspan="7">没有更多数据</td></tr>');
            }
            return h.join('');
        },
        _createItemElem: function(item) {
            return '<tr><td>' + item.id + '</td><td><div class="ad-img-preivew"><img src="' + item.img + '"></div></td><td>' + item.link + '</td><td>' + _util.dateFormat(item.stime * 1000, 'yyyy-MM-dd hh:mm') + '</td></tr>';
        },
        _bindEvents: function() {
            this._on(this.element, {
                'click li.tab-nav-item': this._goPage,
                'click div.upload-img-btn': this._triggerUploadImg,
                'change input[type=file]': this._uploadImg,
                'change textarea.upload-img-tx': this._previewImg,
                'click button.data-save': this._saveAd,
                'click div.page_pre': this._preGoSiblingPage,
                'click div.page_next': this._preGoSiblingPage,
                'click div.page_go': this._preGoSiblingPage
            });
        },
        _goSiblingPage: function(pn) {
            var router = new Backbone.Router;
            router.navigate('ad/' + this.options.type + '/' + pn, {
                trigger: true
            });
            return false;
        },
        _goPage: function(event) {
            var stype = $(event.target).closest('li.tab-nav-item').attr('data-type');
            var router = new Backbone.Router;
            router.navigate('ad/' + stype, {
                trigger: true
            });
            return false;
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
            var self = this,
                options = this.options,
                img = $('#ad-img').val().trim();
            if (!img.length) {
                notify({
                    tmpl: 'error',
                    text: '请上传广告图片。'
                });
                return false;
            }
            var link = $('#ad-link').val().trim();
            if (!link.length) {
                notify({
                    tmpl: 'error',
                    text: '请输入广告链接。'
                });
                return false;
            }
            $.ajax({
                url: options.addaudiad,
                crossDomain: true,
                dataType: 'jsonp',
                data: {
                    img: img,
                    link: link,
                    stype: options.stype,
                    stime: Date.now()
                }
            }).done(function(res) {
                if (!res.errno) {
                    var id = res.data.id;
                    $('#ad-table').prepend(self._createItemElem({
                        id: id,
                        img: img,
                        link: link
                    }));
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
    module.exports = $.mock.ad;
});
