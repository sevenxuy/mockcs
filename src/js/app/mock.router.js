define(function(require, exports, module) {
  'use strict';

  require('mock.view.login');
  require('mock.view.homepage');
  require('mock.view.mockme');
  require('mock.view.mocksquare');
  require('mock.view.msg');
  require('mock.view.msglatest');
  require('mock.view.msgall');
  require('mock.view.fanlatest');
  require('mock.view.fanall');
  require('mock.view.rawedit');
  require('mock.view.raws');
  require('mock.view.ad');
  require('mock.view.ads');
  require('mock.view.trafuser');
  require('mock.view.trafad');


  var AppRouter = Backbone.Router.extend({
    routes: {
      '(login)': 'login',
      'homepage': 'homepage',
      'mocks': 'mockme',
      'mocks/(me)': 'mockme',
      'mocks/square': 'mocksquare',
      'msg': 'msg',
      'msgs': 'msglatest',
      'msgs/(latest)': 'msglatest',
      'msgs/all': 'msgall',
      'fans': 'fanlatest',
      'fans/(latest)': 'fanlatest',
      'fans/all': 'fanall',
      'rawedit': 'rawedit',
      'rawedit/:id': 'rawedit',
      'raws': 'raws',
      'raws/(:type)': 'raws',
      'raws/(:type)/': 'raws',
      'raws/(:type)/(:pn)': 'raws',
      'ad': 'ad',
      'ad/(:stype)': 'ad',
      'ad/(:stype)/': 'ad',
      'ad/(:stype)/(:pn)': 'ad',
      'ads': 'ads',
      'ads/(:type)': 'ads',
      'ads/(:type)/': 'ads',
      'ads/(:type)/(:pn)': 'ads',
      'trafad': 'trafad',
      'trafuser': 'trafuser'
    }
  });

  var router = new AppRouter;

  router.on('route:login', function() {
    $('div.current').removeClass('current').addClass('hide');
    if ($('#login').data('widgetCreated')) {
      $('#login').login('reRender');
    } else {
      $('#login').login();
    }
  });

  router.on('route:homepage', function() {
    $('div.current').removeClass('current').addClass('hide');
    if ($('#homepage').data('widgetCreated')) {
      $('#homepage').homepage('reRender');

    } else {
      $('#homepage').homepage();
    }
    showNav();
  });

  router.on('route:mockme', function() {
    $('div.current').removeClass('current').addClass('hide');
    if ($('#mockme').data('widgetCreated')) {
      $('#mockme').mockme('reRender');

    } else {
      $('#mockme').mockme();
    }
    showNav();
  });

  router.on('route:mocksquare', function() {
    $('div.current').removeClass('current').addClass('hide');
    if ($('#mocksquare').data('widgetCreated')) {
      $('#mocksquare').mocksquare('reRender');

    } else {
      $('#mocksquare').mocksquare();
    }
    showNav();
  });

  router.on('route:msg', function() {
    $('div.current').removeClass('current').addClass('hide');
    if ($('#msg').data('widgetCreated')) {
      $('#msg').msg('reRender');

    } else {
      $('#msg').msg();
    }
    showNav();
  });

  router.on('route:msglatest', function() {
    $('div.current').removeClass('current').addClass('hide');
    if ($('#msglatest').data('widgetCreated')) {
      $('#msglatest').msglatest('reRender');

    } else {
      $('#msglatest').msglatest();
    }
    showNav();
  });

  router.on('route:msgall', function() {
    $('div.current').removeClass('current').addClass('hide');
    if ($('#msgall').data('widgetCreated')) {
      $('#msgall').msgall('reRender');

    } else {
      $('#msgall').msgall();
    }
    showNav();
  });

  router.on('route:fanlatest', function() {
    $('div.current').removeClass('current').addClass('hide');
    if ($('#fanlatest').data('widgetCreated')) {
      $('#fanlatest').fanlatest('reRender');

    } else {
      $('#fanlatest').fanlatest();
    }
    showNav();
  });

  router.on('route:fanall', function() {
    $('div.current').removeClass('current').addClass('hide');
    if ($('#fanall').data('widgetCreated')) {
      $('#fanall').fanall('reRender');

    } else {
      $('#fanall').fanall();
    }
    showNav();
  });

  router.on('route:rawedit', function(id) {
    var opt = {
      id: id
    }
    $('div.current').removeClass('current').addClass('hide');
    if ($('#rawedit').data('widgetCreated')) {
      $('#rawedit').rawedit('reRender', opt);
    } else {
      $('#rawedit').rawedit(opt);
    }
    showNav();
  });

  router.on('route:raws', function(type, pn) {
    var opt = {
      type: type || '2',
      pn: pn || 0
    }
    if ($('#raws').hasClass('hide')) {
      $('div.current').removeClass('current').addClass('hide');
      $('#raws').removeClass('hide').addClass('current');

    }
    if ($('#raws').data('widgetCreated')) {
      $('#raws').raws('reRender', opt);
    } else {
      $('#raws').raws(opt);
    }
    showNav();
  });

  router.on('route:ad', function(stype, pn) {
    var opt = {
      stype: stype || '0',
      pn: pn || 0
    }
    if ($('#ad').hasClass('hide')) {
      $('div.current').removeClass('current').addClass('hide');
      $('#ad').removeClass('hide').addClass('current');

    }
    if ($('#ad').data('widgetCreated')) {
      $('#ad').ad('reRender', opt);
    } else {
      $('#ad').ad(opt);
    }
    showNav();
  });

  router.on('route:ads', function(type, pn) {
    var opt = {
      type: type || '2',
      pn: pn || 0
    }
    if ($('#ads').hasClass('hide')) {
      $('div.current').removeClass('current').addClass('hide');
      $('#ads').removeClass('hide').addClass('current');
    }
    if ($('#ads').data('widgetCreated')) {
      $('#ads').ads('reRender', opt);
    } else {
      $('#ads').ads(opt);
    }
    showNav();
  });

  router.on('route:trafad', function() {
    $('div.current').removeClass('current').addClass('hide');
    if ($('#trafad').data('widgetCreated')) {
      $('#trafad').trafad('reRender');
    } else {
      $('#trafad').trafad();
    }
    showNav();
  });

  router.on('route:trafuser', function() {
    $('div.current').removeClass('current').addClass('hide');
    if ($('#trafuser').data('widgetCreated')) {
      $('#trafuser').trafuser('reRender');
    } else {
      $('#trafuser').trafuser();
    }
    showNav();
  });

  var showNav = function() {
    var $nav = $('#nav');
    if ($('#mock-pages').hasClass('hide')) {
      $('#mock-pages').removeClass('hide');
    }
    if ($nav.data('widgetCreated')) {
      if ($nav.hasClass('hide')) {
        $nav.removeClass('hide');
      }
    } else {
      $nav.nav();
    }
    $nav.nav('refreshSelected');
  };

  Backbone.history.start();

  module.exports = $.mock.router;
});
