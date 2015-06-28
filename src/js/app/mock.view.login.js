define(function(require, exports, module) {
    'use strict';

    var notify = require('mock.plugin.notify'),
        util = require('mock.util');

    $.widget('mock.login', {
        options: {},
        _create: function() {
            this.render();
            this._bindEvents();
            this.element.data('widgetCreated', true);
        },
        render: function() {
            if (!$('#mock-pages').hasClass('hide')) {
                $('#mock-pages').addClass('hide');
            }
            this.element.append(this._createLoginElem());
            if (this.element.hasClass('hide')) {
                this.element.removeClass('hide').addClass('current');
            }
            passport.use('login', {
                    tangram:true
                }, function(apiMagic) {
                    //实例化登录api
                    var domain
                    var loginInstance = new apiMagic.passport.login({
                        product: 'browser_andr',
                        staticPage: window.location.origin+'/umis/vip/index',
                        u: window.location.origin+'/umis/vip/index?r='+(new Date().getTime())+'#msg',
                        charset: 'utf-8',
                        memberPass: true,
                        safeFlag: 0
                    }
            );
         //渲染表单
         $('#mock-loginbox').html('');
         loginInstance.render('mock-loginbox');
    });
        },
        reRender: function() {
            this.element.addClass('hide').empty();
            this.render();
        },
        _createLoginElem: function() {
            var templateStr = 
'<div class="mock-header">'+
    '<div class="mock-logo">'+
    '</div>'+
    '<div class="mock-headerTitle">百度浏览器<span></span>吐槽开放平台</div>'+
'</div>'+
'<div class="mock-login-content">'+
    '<div id="slideshow" class="slideshow">'+
    '</div>'+
    '<div class="mock-loginbox" id="mock-loginbox">'+
        // '<div class="mock-login-hilogo">'+
        // '</div>'+
        // '<div class="mock-login-inbox">'+
        //     '<div class="mock-login-input">'+
        //         '<div class="icon-login icon-un">'+
        //         '</div>'+
        //         '<input id="mock-name" type="text" placeholder="百度Hi帐号" value="xx">'+
        //     '</div>'+
        //     '<div class="mock-login-input">'+
        //         '<div class="icon-login icon-pwd">'+
        //         '</div>'+
        //         '<input id="mock-pwd" type="password" placeholder="密码" value="xx">'+
        //     '</div>'+
        //     '<div class="mock-login-box">'+
        //         '<div class="mock-keep">'+
        //             '<div class="checkbox">'+
        //                 '<label><input type="checkbox">下次自动登录</label>'+
        //             '</div>'+
        //         '</div>'+
        //         '<a href="https://passport.baidu.com/?getpassindex&amp;tpl=mn&amp;u=http%3A%2F%2Fweb.im.baidu.com"
        //         target="_blank">'+
        //             '<div class="mock-forgetpwd">忘记密码？</div>'+
        //         '</a>'+
        //     '</div>'+
        //     '<div class="mock-btn mock-btn-login">登录</div>'+
        //     '<a hidefocus="true" href="https://passport.baidu.com/v2/?reg&amp;tpl=bd&amp;u="
        //     target="_blank">'+
        //         '<div class="mock-btn mock-btn-register">注册</div>'+
        //     '</a>'+
        // '</div>'+
    '</div>'+
'</div>'+
'<div class="mock-footer">2015 ©Baidu</div>';
            return templateStr;
        },
        _bindEvents: function() {
            
        }
    });
    module.exports = $.mock.login;
});
