define(function(require, exports, module) {
    'use strict';
    var _view = require('mock.view'),
        notify = require('mock.plugin.notify'),
        _util = require('mock.util');

    $.widget('mock.msg', _view, {
        options: {
            message: 'http://uil.shahe.baidu.com:8050/uil/message/pullmsg?&fn=?',
            type: 2,
            ps: 10
        },
        _create: function() {
            this.render();
            this._bindEvents();
            this._bindWindowEvent();
            this.element.data('widgetCreated', true);
        },
        render: function(opt) {
            var options = this.options;
            _.extend(options, opt);
            this._createWrapperElem();
        },
        reRender: function(opt) {
            var options = this.options,
                $nomore = $('#fans-nomore');
            _.extend(options, opt);
            options.loadmore = true;
            if (!$nomore.hasClass('hide')) {
                $nomore.addClass('hide');
            }
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
                    type: options.type,
                    ps: options.ps
                }
            }).done(function(res) {
                if (!res.errno) {
                    $('#msgs-table').addClass('hide').empty().append(self._createTableElem(res.data.list)).removeClass('hide');
                } else {
                    notify({
                        tmpl: 'error',
                        text: res.error
                    })
                }
            });
        },
        _loadMore: function() {
            var self = this,
                options = this.options;
            if (!options.loadmore) {
                return false;
            }
            $.ajax({
                url: options.message,
                crossDomain: true,
                dataType: 'jsonp',
                data: {
                    status: options.status,
                    type: options.type,
                    ps: options.ps,
                    startid: options.startid
                }
            }).done(function(res) {
                if (!res.errno) {
                    $('#msgs-table').append(self._createTableElem(res.data.list));
                } else {
                    notify({
                        tmpl: 'error',
                        text: res.error
                    });
                }
            });
        },
        _createWrapperElem: function() {
            var h = [];
            h.push('<div class="mock-hd">消息管理</div>');
            h.push('<div class="page-content">');
            h.push('<div class="tabs-content">');
            h.push('<div class="msg-notify-box">');
            h.push('<div class="msg-notify-item"><div class="msg-notify-msgs">1000</div><div class="msg-notify-title">新消息</div></div>');
            h.push('<div class="msg-notify-item"><div class="msg-notify-funs">1000</div><div class="msg-notify">总粉丝数</div></div>');
            h.push('</div>');
            h.push('<table class="table table-bordered table-hover">');
            h.push('<thead><tr><th><select class="form-control" id="msg-type-filter">');
            h.push('<option selected="selected" value="0">全部消息</option>');
            h.push('<option value="1">资讯审核</option>');
            h.push('<option value="2">广告审核</option>');
            h.push('<option value="3">个人主页审核</option>');
            h.push('</select></th><th>审核内容</th><th>审核结果</th><th>错误类型</th><th>消息时间</th></tr></thead><tbody id="msgs-table">');
            h.push('</tbody></table>');
            h.push('<div id="fans-nomore" class="mock-nomore hide">没有更多数据</div>');
            h.push('<div class="modal fade" id="msg-ad-modal" tabindex="-1" role="dialog" aria-hidden="true">');
            h.push('<div class="modal-dialog">');
            h.push('<div class="modal-content">');
            h.push('<div class="modal-header">');
            h.push('<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>');
            h.push('<h4 class="modal-title" id="myModalLabel">广告位</h4>');
            h.push('</div>');
            h.push('<div class="modal-body">');
            h.push('<table class="table table-bordered mock-upload-table mock-aditem"><tbody>');
            h.push('<tr><td>广告图</td><td><div class="upload-img-preivew ad-img-preivew"></div></td></tr>');
            h.push('<tr><td>广告跳转链接</td><td></td></tr>');
            h.push('<tr><td>有效期</td><td></td></tr>');
            h.push('</tbody></table>');
            h.push('</div>');
            h.push('</div>');
            h.push('</div>');
            h.push('</div>');
            h.push('</div>');
            h.push('<div class="modal fade" id="msg-raw-modal" tabindex="-1" role="dialog" aria-hidden="true">');
            h.push('<div class="modal-dialog">');
            h.push('<div class="modal-content">');
            h.push('<div class="modal-header">');
            h.push('<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>');
            h.push('<h4 class="modal-title" id="myModalLabel">资讯</h4>');
            h.push('</div>');
            h.push('<div class="modal-body">');
            h.push('<div class="mock-title">吐槽能量池</div>');
            h.push('<div>UI请参考#rawedit, 仅查看，不可编辑。</div>')
            h.push('</div>');
            h.push('</div>');
            h.push('</div>');
            h.push('</div>');
            h.push('</div>');
            this.element.append(h.join(''));
            this.renderTable();
        },
        _createTableElem: function(data) {
            var options = this.options,
                h = [],
                $nomore = $('#fans-nomore');
            if (!_.isEmpty(data)) {
                _.each(data, function(item, index) {
                    var msg = $.parseJSON(item.content);
                    h.push('<tr data-type="' + msg.type + '"><td>');
                    switch (msg.type) {
                        case 1:
                            h.push('资讯审核');
                            break;
                        case 2:
                            h.push('广告审核');
                            break;
                        case 3:
                            h.push('个人主页审核');
                            break;
                    }
                    h.push('</td><td>');
                    switch (msg.type) {
                        case 1:
                            h.push('<a class="msg-raw-view" data-id="' + msg.id + '"  data-toggle="modal" data-target="#msg-raw-modal">' + msg.title + '</a>');
                            break;
                        case 2:
                            h.push('<div class="ad-img-preivew msg-ad-view" data-id="' + msg.id + '"  data-toggle="modal" data-target="#msg-ad-modal"><img src="' + msg.title + '"/></div>');
                            break;
                        case 3:
                            h.push(msg.title);
                    }
                    h.push('</td><td>' + (msg.isok == 0 ? '通过' : '拒绝') + '</td><td class="error">' + msg.reason + '</td><td>' + _util.dateFormat(msg.stime * 1000, 'yyyy-MM-dd hh:mm') + '</td></tr>');
                });
                if (data.length < options.ps) {
                    options.loadmore = false;
                    if ($nomore.hasClass('hide')) {
                        $nomore.removeClass('hide');
                    }
                }
                options.startid = _.last(data).id;
            } else {
                if ($nomore.hasClass('hide')) {
                    $nomore.removeClass('hide');
                }
            }
            return h.join('');
        },
        _bindEvents: function() {
            this._on(this.element, {
                'click li.tab-nav-item': this._goPage,
                'change #msg-type-filter': this._filterMsgs
            });
        },
        _bindWindowEvent: function() {
            var self = this;
            $(window).on('scroll', function() {
                if ($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
                    self._loadMore();
                }
            });
        },
        _goPage: function(event) {
            var type = $(event.target).closest('li.tab-nav-item').attr('data-type');
            var router = new Backbone.Router;
            router.navigate('msgs/' + type, {
                trigger: true
            });
            return false;
        },
        _filterMsgs: function(event) {
            var selectedType = $(event.target).val(),
                $ads = $('#msgs-table');
            switch (selectedType) {
                case '1':
                case '2':
                case '3':
                    $ads.children('tr').addClass('hide');
                    $ads.children('tr[data-type=' + selectedType + ']').removeClass('hide');
                    break;
                case '0':
                default:
                    $ads.children('tr').removeClass('hide');
            }

            return false;
        }
    });
    module.exports = $.mock.msg;
});