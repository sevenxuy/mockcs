define(function(require, exports, module) {
    'use strict';
    var _view = require('mock.view');

    $.widget('mock.nav', _view, {
        options: {},
        _createElem: function() {
            var h = [];
            h.push('<ul class="nav nav-list">');
            h.push('<li class="menu-item">');
            h.push('<div class="menu-text"><i class="icon-menu icon-function"></i> 功能模块</div>');
            h.push('<ul class="submenu">');
            h.push('<li class="submenu-item" data-link="#rawedit">原始内容上传</li>');
            h.push('<li class="submenu-item" data-link="#homepage">个人主页设置</li>');
            h.push('<li class="submenu-item" data-link="#ad">广告位编辑</li>');
            h.push('<li class="submenu-item" data-link="#mocks">快速吐槽</li>');
            h.push('</ul>');
            h.push('</li>');
            h.push('<li class="menu-item">');
            h.push('<div class="menu-text"><i class="icon-menu icon-management"></i> 管理模块</div>');
            h.push('<ul class="submenu">');
            h.push('<li class="submenu-item" data-link="#raws">原始内容管理</li>');
            h.push('<li class="submenu-item" data-link="#ads">广告位状态管理</li>');
            h.push('<li class="submenu-item" data-link="#msgs">消息管理</li>');
            h.push('<li class="submenu-item" data-link="#fans">粉丝管理</li>');
            h.push('</ul>');
            h.push('</li>');
            h.push('<li class="menu-item">');
            h.push('<div class="menu-text"><i class="icon-menu icon-statistics"></i> 统计管理</div>');
            h.push('<ul class="submenu">');
            h.push('<li class="submenu-item" data-link="#trafuser">用户流量数据分析</li>');
            h.push('<li class="submenu-item" data-link="#trafad">广告流量数据分析</li>');
            h.push('</ul>');
            h.push('</li>');
            h.push('</ul>');
            return h.join('');
        },
        _bindEvents: function() {
            this._on(this.element, {
                'click li.submenu-item': this._gotoPage,
            });
        },
        _gotoPage: function(event) {
            this.element.find('li.submenu-item-active').removeClass('submenu-item-active');
            var $li = $(event.target).closest('li.submenu-item');
            $li.addClass('submenu-item-active');
            window.location.href = $li.attr('data-link');
            return false;
        },
        refreshSelected: function() {
            var selected = window.location.hash.split('/')[0];
            this.element.find('li.submenu-item-active').removeClass('submenu-item-active');
            this.element.find('li[data-link=' + selected + ']').addClass('submenu-item-active');
        }
    });
    module.exports = $.mock.nav;
});
