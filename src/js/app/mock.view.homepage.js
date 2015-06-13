define(function(require, exports, module) {
    'use strict';
    var _view = require('mock.view'),
        notify = require('mock.plugin.notify'),
        _util = require('mock.util');

    $.widget('mock.homepage', _view, {
        options: {
            getaudinewsbyvid: 'http://uil.shahe.baidu.com/mock/getaudinewsbyvid?ua=bd_720_1280_HTC-HTC+One+X-4-0-4_4-2-6-1_j2&cuid=80000000000000000000000000000000|0&fn=?',
            addaudiuser: 'http://uil.shahe.baidu.com/mock/addaudiuser?ua=bd_720_1280_HTC-HTC+One+X-4-0-4_4-2-6-1_j2&cuid=80000000000000000000000000000000|0&fn=?',
            type: 2, //raw online
            ps: 4
        },
        _create: function() {
            this.render();
            this._bindEvents();
            this.element.data('widgetCreated', true);
        },
        render: function() {
            this._createWrapperElem();
            if (this.element.hasClass('hide')) {
                this.element.removeClass('hide').addClass('current');
            }
        },
        _bindEvents: function() {
            this._on(this.element, {
                'change #homnepage-desc': this._updateDesc,
                'click div.page_pre': this._preGoSiblingPage,
                'click div.page_next': this._preGoSiblingPage,
                'click div.page_go': this._preGoSiblingPage
            });
        },
        _createWrapperElem: function() {
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
            h.push('<table class="table table-bordered table-hover" id="hp-rawonline">');
            h.push('</tbody></table>');
            h.push('<div class="paging hide">');
            h.push('<div class="mock-btn mock-btn-white page_pre hide">&lt;</div>');
            h.push('<div class="page_num"><span class="page_current"></span><span class="num_gap">/</span><span class="page_total"></span></div>');
            h.push('<div class="mock-btn mock-btn-white page_next hide">&gt;</div>');
            h.push('<input type="text" class="form-control goto_page">');
            h.push('<div class="mock-btn mock-btn-white page-go">跳转</div>');
            h.push('</div>');
            h.push('</div>');
            this.element.append(h.join(''));
            this.renderTable();
        },
        renderTable: function() {
            var self = this,
                options = this.options;
            this._updateWrapperElemStatus(options.type);
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
                    options.allcount = res.data.allcount;
                    options.totalpage = Math.ceil(options.allcount / options.ps);
                    self._updatePagingStatus();
                    $('#hp-rawonline').addClass('hide').empty().append(self._createOnlineTable(res.data.list)).removeClass('hide');
                } else {
                    notify({
                        tmpl: 'error',
                        text: res.error
                    })
                }
            });
        },
        _createOnlineTable: function(data) {
            var h = [];
            h.push('<thead><tr><th>id</th><th>内容标题</th><th>上线时间</th><th>是否置顶</th></tr></thead>');
            h.push('<tbody>');
            if (!_.isEmpty(data)) {
                _.each(data, function(item, index) {
                    h.push('<tr><td>' + item.id + '</td><td>' + item.title + '</td><td>' + _util.dateFormat(item.uptime * 1000, 'yyyy-MM-dd hh:mm') + '</td><td><input type="checkbox"></td></tr>');
                });
            } else {
                h.push('<tr><td colspan="4">没有数据</td></tr>');
            }
            h.push('</tbody>');
            return h.join('');
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
        },
        _goSiblingPage: function(pn) {
            var router = new Backbone.Router;
            router.navigate('homepage/' + pn, {
                trigger: true
            });
            return false;
        },
    });
    module.exports = $.mock.homepage;
});
