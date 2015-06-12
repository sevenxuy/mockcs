define(function(require, exports, module) {
    'use strict';
    require('mock.view.nav');
    var _view = require('mock.view');

    $.widget('mock.msg', _view, {
        options: {},
        _createElem: function() {
            var h = [];
            h.push('<div class="page-content">');
            h.push('<div class="msg-notify-box">');
            h.push('<div class="msg-notify-item"><div class="msg-notify-msgs">1000</div><div class="msg-notify-title">新消息</div></div>');
            h.push('<div class="msg-notify-item"><div class="msg-notify-funs">1000</div><div class="msg-notify">总粉丝数</div></div>');
            h.push('</div>');
            h.push('<table class="table table-bordered table-hover">');
            h.push('<thead><tr><th><select class="form-control">');
            h.push('<option  selected="selected" disabled="disabled">消息类型</option>');
            h.push('<option value="">个人主页内容审核</option>');
            h.push('<option value="">原创内容审核</option>');
            h.push('</select></th><th>审核内容</th><th>审核结果</th><th>错误类型</th><th>消息时间</th></tr></thead>');
            h.push('<tbody><tr><td>个人主页审核</td><td>个人主页</td><td>通过</td><td class="error">-</td><td>消息时间</td></tr>');
            h.push('<tr><td>个人主页审核</td><td>个人主页</td><td>通过</td><td class="error">个人简介内容不合符要求</td><td>消息时间</td></tr>');
            h.push('<tr><td>个人主页审核</td><td>个人主页</td><td>通过</td><td class="error">个人简介内容不合符要求</td><td>消息时间</td></tr></tbody>');
            h.push('</table>');
            h.push('</div>');
            return h.join('');
        },
        _bindEvents: function() {
            this._on(this.element, {

            });
        }
    });
    module.exports = $.mock.msg;
});
