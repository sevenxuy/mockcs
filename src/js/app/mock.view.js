define(function(require, exports, module) {
    'use strict';

    var notify = require('mock.plugin.notify'),
        autosize = require('mock.plugin.autosize.min'),
        util = require('mock.util'),
        updateFransCount = null,
        updateMessageCount = null,
        globalObject = {
            callNewMessageMethods: [],
            callNewFansMethods: []
        },
        apihost = 'http://' + util.getApiHost(),
        /**
        获得新消息的总数的api地址
        * @function
        * @param {int} type - 2:message 1:fans
        * @param {int} status - 0:已读 1:未读
        */
        getMessageCountUrl = function(type, status) {
            return util.getApiUrl({
                name: 'getcount',
                path: 'message',
                params: {
                    type: type,
                    status: status
                }
            });
        },
        getNewMessagesCount = function() {
            $.ajax({
                url: getMessageCountUrl(2, 1),
                crossDomain: true,
                dataType: 'jsonp',
            }).done(function(result) {
                if (!result.errno) {
                    var i;
                    for (i = 0; i < globalObject.callNewMessageMethods.length; i++) {
                        globalObject.callNewMessageMethods[i](+result.data?(+result.data):0);
                    }
                }
            });
        },
        getNewFansCount = function() {
            $.ajax({
                url: getMessageCountUrl(1, 1),
                crossDomain: true,
                dataType: 'jsonp',
            }).done(function(result) {;
                if (!result.errno) {
                    var i;
                    for (i = 0; i < globalObject.callNewFansMethods.length; i++) {
                        globalObject.callNewFansMethods[i](+result.data);
                    }
                }
            });
        },
        getInfoLoop = function() {
            getNewMessagesCount();
            getNewFansCount();
        };
    setInterval(getInfoLoop, 60000);
    getInfoLoop();

    $.widget('mock.view', {
        options: {
            uploadfile: '/umis/pushc/uploadfile',
            getaudinews: apihost + '/mock/getaudinews?ua=bd_720_1280_HTC-HTC+One+X-4-0-4_4-2-6-1_j2&cuid=80000000000000000000000000000000|0&fn=?',
            getaudiadinfo: apihost + '/mock/getaudiadinfo?ua=bd_720_1280_HTC-HTC+One+X-4-0-4_4-2-6-1_j2&cuid=80000000000000000000000000000000|0&fn=?'
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
        getGlobalObject: function() {
            return globalObject;
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
                $tx = $imgbox.find('input.upload-img-tx'),
                $spanerror = $tx.parent().find('.errorinfo').hide().html('');

            if (!img) {
                return false;
            }
            //image can only be png, jpeg or gif.
            if (!img.type.match('image.*') || !img.name.toLowerCase().match(/(?:gif|jpg|png|jpeg)$/)) {
                $spanerror.html('图片格式错误，只能上传png, jpg, jpeg, gif格式的图片。');
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
                    $pre.addClass('hide');
                } else if ((pn > 0) && $pre.hasClass('hide')) {
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
        _goSiblingPage: function(pn) {},
        showError: function(result) {
            if (result.errno != 0) {
                var errorMsg = result.error
                switch (result.errno) {
                    case 10:
                        errorMsg = "尊敬的用户，您的帐户没有大V权限。";
                        break;
                }
                notify({
                    tmpl: 'error',
                    text: errorMsg
                });
            }
        },
        // for msgs and msg
        _showRawModal: function(event) {
            $('#msg-raw-modal-content').empty();
            if ($('#msg-raw-modal-loading').hasClass('hide')) {
                $('#msg-raw-modal-loading').removeClass('hide');
            }
            var self = this,
                options = this.options,
                $a = $(event.target),
                id = $a.attr('data-id');
            $.ajax({
                url: options.getaudinews,
                crossDomain: true,
                dataType: 'json',
                data: {
                    id: id
                }
            }).done(function(res) {
                if (!res.errno) {
                    self._createRawModalContentElem(res.data);
                } else {
                    notify({
                        tmpl: 'error',
                        text: res.error
                    });
                }
            });
        },
        _createRawModalContentElem: function(item) {
            var h = [];
            h.push('<div class="mock-title">吐槽能量池</div>');
            h.push('<table class="table table-bordered mock-upload-table"><tbody>');
            h.push('<tr><td>标题</td><td>' + item.title + '</td></tr>');
            if (!!item.simg) {
                h.push('<tr><td>广场图</td><td><div class="upload-img-preivew mt10 ml0 hide"><img src="' + item.simg + '"></div></td></tr>');
            }
            h.push('<tr><td>摘要</td><td>' + item.desc + '</td></tr>');
            h.push('</tbody></table>');
            h.push('<div class="mock-title">吐槽放大镜</div>');
            h.push('<table class="table table-bordered mock-upload-table"><tbody>');
            if (!!item.img) {
                h.push('<tr><td>主图</td><td><div class="upload-img-preivew mt10 ml0 hide"><img src="' + item.simg + '"></div></td></tr>');
            }
            h.push('<tr><td>正文</td><td>' + _.unescape(item.content) + '</td></tr>');
            h.push('<tr><td>内容类型</td><td>');
            switch (item.type) {
                case '0':
                    h.push('<div>资讯</div>');
                    break;
                case '1':
                    h.push('<div>PK</div>');
                    if ((!!item.ext) && (!_.isEmpty(JSON.parse(item.ext)))) {
                        var ext = JSON.parse(item.ext);
                        h.push('<div class="upload-pk">');
                        h.push('<div class="upload-pk-item">甲方文案: ' + ext[0]['title'] + '</div>');
                        h.push('<div class="upload-pk-item">乙方文案: ' + ext[1]['title'] + '</div>');
                        h.push('</div>');
                    }
                    break;
                case '2':
                    h.push('<div>投票</div>');
                    if ((!!item.ext) && (!_.isEmpty(JSON.parse(item.ext)))) {
                        var ext = JSON.parse(item.ext);
                        h.push('<div class="upload-vote-box">');
                        _.each(ext, function(vote, index) {
                            h.push('<div class="upload-vote-item">' + vote.title + '</div>');
                            if (!!vote.img) {
                                h.push('<div class="upload-img-preivew"><img src="' + vote.img + '"/></div>');
                            }
                        });
                        h.push('</div>');
                    }
                    break;
            }
            h.push('</td></tr>');
            h.push('<tr><td>上线时间</td><td>' + util.dateFormat(item.uptime * 1000, 'yyyy-MM-dd hh:mm') + '</td></tr>');
            h.push('</tbody></table>');
            h.push('');
            $('#msg-raw-modal-loading').addClass('hide');
            $('#msg-raw-modal-content').append(h.join(''));
        },
        _showAdModal: function(event) {
            $('#msg-ad-modal-content').empty();
            if ($('#msg-ad-modal-loading').hasClass('hide')) {
                $('#msg-ad-modal-loading').removeClass('hide');
            }
            var self = this,
                options = this.options,
                $a = $(event.target).closest('div.msg-ad-view'),
                id = $a.attr('data-id');
            $.ajax({
                url: options.getaudiadinfo,
                crossDomain: true,
                dataType: 'json',
                data: {
                    id: id
                }
            }).done(function(res) {
                if (!res.errno) {
                    self._createAdModalContentElem(res.data.info);
                } else {
                    notify({
                        tmpl: 'error',
                        text: res.error
                    });
                }
            });
        },
        _createAdModalContentElem: function(item) {
            var h = [];
            h.push('<table class="table table-bordered mock-upload-table mock-aditem"><tbody>');
            h.push('<tr><td>广告id</td><td>' + item.id + '</td></tr>');
            h.push('<tr><td>广告图</td><td><div class="upload-img-preivew ad-img-preivew"><img src="' + item.img + '"></div></td></tr>');
            h.push('<tr><td>广告跳转链接</td><td>' + item.link + '</td></tr>');
            h.push('<tr><td>有效期(天)</td><td>' + item.expire + '</td></tr>');
            h.push('</tbody></table>');
            $('#msg-ad-modal-loading').addClass('hide');
            $('#msg-ad-modal-content').append(h.join(''));
        }
    });
    module.exports = $.mock.view;
});
