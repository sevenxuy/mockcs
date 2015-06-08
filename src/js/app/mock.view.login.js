define(function(require, exports, module) {
  'use strict';

  var notify = require('mock.plugin.notify');

  $.widget('mock.login', {
    options: {},
    _create: function() {
      this.render();
      this._initSlideshow();
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
    },
    reRender: function() {
      this.element.addClass('hide').empty();
      this.render();
    },
    _createLoginElem: function() {
      var h = [];
      h.push('<div class="mock-header"><div class="mock-logo"></div><div class="mock-headerTitle">百度浏览器<span></span>吐槽开放平台</div></div>');
      h.push('<div class="mock-login-content">');
      h.push('<div id="slideshow" class="slideshow">');
      h.push('<div><img src="./mockcs/img/s1.jpg" alt=""></div>');
      h.push('<div><img src="./mockcs/img/s2.jpg" alt=""></div>');
      h.push('<div><img src="./mockcs/img/s3.jpg" alt=""></div>');
      h.push('</div>');
      h.push('<div class="mock-loginbox">');
      h.push('<div class="mock-login-hilogo"></div>');
      h.push('<div class="mock-login-inbox">');
      h.push('<div class="mock-login-input"><div class="icon-login icon-un"></div><input id="mock-name" type="text" placeholder="百度Hi帐号" value="xx"></div>');
      h.push('<div class="mock-login-input"><div class="icon-login icon-pwd"></div><input id="mock-pwd" type="password" placeholder="密码" value="xx"></div>');
      h.push('<div class="mock-login-box">');
      h.push('<div class="mock-keep"><div class="checkbox"><label><input type="checkbox">下次自动登录</label></div></div>');
      h.push('<a href="https://passport.baidu.com/?getpassindex&amp;tpl=mn&amp;u=http%3A%2F%2Fweb.im.baidu.com" target="_blank"><div class="mock-forgetpwd">忘记密码？</div></a>');
      h.push('</div>');
      h.push('<div class="mock-btn mock-btn-login">登录</div>');
      h.push('<a hidefocus="true" href="https://passport.baidu.com/v2/?reg&amp;tpl=bd&amp;u=" target="_blank"><div class="mock-btn mock-btn-register">注册</div></a>');
      h.push('</div>');
      h.push('</div>');
      h.push('</div>');
      h.push('<div class="mock-footer">2015 ©Baidu</div>');
      return h.join('');
    },
    _bindEvents: function() {
      this._on(this.element, {
        'click div.mock-btn-login': this._login
      });
    },
    _initSlideshow: function() {
      $("#slideshow > div:gt(0)").hide();
      setInterval(function() {
        $('#slideshow > div:first')
          .fadeOut(1000)
          .next()
          .fadeIn(1000)
          .end()
          .appendTo('#slideshow');
      }, 3000);
    },
    _login: function() {
      var name = $('#mock-name').val().trim(),
        pwd = $('#mock-pwd').val().trim();
      if (name && pwd) {
        window.location.href = "#msg";
      } else {
        notify({
          tmpl: 'warning',
          text: '请确认用户名和密码输入完整。'
        });
      }
    }
  });
  module.exports = $.mock.login;
});
