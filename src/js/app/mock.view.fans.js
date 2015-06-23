define(function(require, exports, module) {
    'use strict';
    var _view = require('mock.view'),
        notify = require('mock.plugin.notify'),
        _util = require('mock.util');

    $.widget('mock.fans', _view, {
        options: {
            message: 'http://uil.shahe.baidu.com:8050/uil/message/pullmsg?&fn=?',
            type: 1,
            ps: 10,
            loadmore: true
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
                $nomore = $('#msgs-nomore');
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
                    $('#fans-table').addClass('hide').empty().append(self._createTableElem(res.data.list)).removeClass('hide');
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
                    $('#fans-table').append(self._createTableElem(res.data.list));
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
            h.push('<div class="mock-hd">粉丝管理</div>');
            h.push('<div class="page-content">');
            h.push('<ul class="tabs-nav">');
            h.push('<li class="tab-nav-item" data-type="1"><a>最新粉丝</a></li>');
            h.push('<li class="tab-nav-item" data-type="0"><a>全部粉丝</a></li>');
            h.push('</ul>');
            h.push('<div class="tabs-content">');
            h.push('<table class="table table-bordered table-hover">');
            h.push('<thead><tr><th>粉丝头像</th><th>粉丝昵称</th><th>关注时间</th></tr></thead><tbody id="fans-table">');
            h.push('</tbody></table>');
            h.push('<div id="msgs-nomore" class="mock-nomore hide">没有更多数据</div>');
            h.push('</div>');
            this.element.append(h.join(''));
            this.renderTable();
        },
        _createTableElem: function(data) {
            var options = this.options,
                h = [],
                $nomore = $('#msgs-nomore');
            if (!_.isEmpty(data)) {
                _.each(data, function(item, index) {
                    var fan = $.parseJSON(item.content);
                    h.push('<tr><td><div class="hp-avatar"><img src="' + fan.uc + '"></div></td><td>' + fan.username + '</td><td>' + _util.dateFormat(item.timestamp * 1000, 'yyyy-MM-dd hh:mm') + '</td></tr>');
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
                'click li.tab-nav-item': this._goPage
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
            router.navigate('fans/' + type, {
                trigger: true
            });
            return false;
        }
    });
    module.exports = $.mock.fans;
});
